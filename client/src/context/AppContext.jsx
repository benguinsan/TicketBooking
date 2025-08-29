import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    const [shows, setShows] = useState([]);
    const [favoritesMovies, setFavoritesMovies] = useState([]);

    console.log(isAdmin);
    console.log(shows);
    console.log(favoritesMovies);

    const {user} = useUser();
    const {getToken} = useAuth();
    const location = useLocation();

    // Call API to check if user is admin
    const fetchIsAdmin = async () => {
        try {
            setIsAdminLoading(true);
            const {data} = await axios.get("/api/admin/is-admin", 
                {headers: {Authorization: `Bearer ${await getToken()}`}
            });
            setIsAdmin(data.isAdmin);

            if(!data.isAdmin && location.pathname.startsWith("/admin")) {
                navigate("/");
                toast.error("You are not authorized to access admin page");
            }   
        } catch (error) {
            console.log(error);
            setIsAdmin(false);
        } finally {
            setIsAdminLoading(false);
        }
    }

    // Call API to fetch shows
    const fetchShows = async () => {
        try {
            const {data} = await axios.get("/api/show/all");
            if(data.success) {
                setShows(data.shows);
            } else {
                toast.error(data.message || "Fetch shows failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Call API to fetch favorites
    const fetchFavoriteMovies = async () => {
        try {
            const {data} = await axios.get("/api/user/favorites", 
                {headers: {Authorization: `Bearer ${await getToken()}`}
            });

            if(data.success) {
                setFavoritesMovies(data.movies);
            } else {
                toast.error(data.message || "Fetch favorites failed");
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchShows();
    },[])

    // When user is logged in, fetch isAdmin to check permission
    useEffect(() => {
        if(user) {
            fetchIsAdmin();
            fetchFavoriteMovies();
        } else {
            // Reset admin state when user logs out
            setIsAdmin(false);
            setIsAdminLoading(false);
        }
    },[user])
    
    const value = {
        axios,
        isAdmin,
        isAdminLoading,
        shows,
        user,
        getToken,
        fetchShows,
        fetchFavoriteMovies,
        fetchIsAdmin,
        navigate,
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);