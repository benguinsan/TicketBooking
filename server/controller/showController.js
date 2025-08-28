import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

// Get now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`,{
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        const movies = data.results;
        res.json({success: true, movies});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Add a new show to database
export const addShow = async (req, res) => {
    try {
        const {movieId, showsInput, showPrice } = req.body;

        let movie = await Movie.findById(movieId);

        // If movie is not found, fetch it from TMDB API and add to database 
        if(!movie) {
            // Fetch movie details and credits from TMDB API
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,{
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                })
            ])

            const movieApiData = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            // Movie details to be stored in database
            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                genres: movieApiData.genres,
                casts: movieCreditsData.cast,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime,
            }

            // Add movie to database
            movie = await Movie.create(movieDetails);
        }

        // Array of shows to be created
        // value of ShowsToCreate = [{ movie: "123", showDateTime: "2024-01-15T14:00:00.000Z", showsPrice: 10, occupiedSeats: {} }]
        const showsToCreate = [];

        // Create shows for each date and time
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                })
            })
        })

        // if there are shows to create, create them
        if(showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }

        res.json({success: true, message: "Shows Add successfully"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// get all movies that have shows
export const getMovieHasShow = async (req, res) => {
    try{
        // Get shows have showDateTime >= current date and time ({showDateTime: {$gte: new Date()}})
        // Populate movie field with movie details (populate("movie"))
        // Sort shows by showDateTime in ascending order ({showDateTime: 1})
        const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate("movie").sort({showDateTime: 1});
        
        // Filter Unique Shows
        const uniqueShows = new Set(shows.map(show => show.movie))

        res.json({success: true, shows: Array.from(uniqueShows)});
    } catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// get single show from database
export const getMovieSchedule = async (req, res) => {
    try{
        const {movieId} = req.params;

        // get all upcomming shows for the movie
        const shows = await Show.find({movie: movieId, showDateTime: {$gte: new Date()}});

        // get movie details
        const movie = await Movie.findById(movieId);

        // create a object to store date and time of shows
        const dateTime = {};

        shows.forEach(show => {
            const date = show.showDateTime.toISOString().split("T")[0];
            if(!dateTime[date]){
                dateTime[date] = [];
            }
            dateTime[date].push({time: show.showDateTime, showId: show._id});
        })

        res.json({success: true, movie, dateTime});
    } catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}