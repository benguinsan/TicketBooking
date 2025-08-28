/**
 * @swagger
 * /api/show/now-playing:
 *   get:
 *     summary: Get now playing movies
 *     description: Get now playing movies
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: Returns a list of now playing movies.
 */

/**
 * @swagger
 * /api/show/add-show:
 *   post:
 *     summary: Add new shows for a movie
 *     tags: [Shows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: "550"
 *               showsInput:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: "2024-01-15"
 *                     time:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["14:00", "17:00", "20:00"]
 *               showsPrice:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Shows added successfully
 */

/**
 * @swagger
 * /api/show/all:
 *   get:
 *     summary: Get all movies that have shows
 *     description: Get unique movies that have upcoming shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: Returns unique movies with shows
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 shows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "550"
 *                       title:
 *                         type: string
 *                         example: "Fight Club"
 *                       poster_path:
 *                         type: string
 *                         example: "/poster.jpg"
 */

/**
 * @swagger
 * /api/show/{movieId}:
 *   get:
 *     summary: Get shows grouped by date for a specific movie
 *     description: Get all upcoming shows for a movie, grouped by date
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *         example: "550"
 *     responses:
 *       200:
 *         description: Returns movie details and shows grouped by date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 movie:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "550"
 *                     title:
 *                       type: string
 *                       example: "Fight Club"
 *                     poster_path:
 *                       type: string
 *                       example: "/poster.jpg"
 *                 dateTime:
 *                   type: object
 *                   example:
 *                     "2024-01-15":
 *                       - time: "2024-01-15T14:00:00.000Z"
 *                         showId: "show1"
 *                       - time: "2024-01-15T17:00:00.000Z"
 *                         showId: "show2"
 *                     "2024-01-16":
 *                       - time: "2024-01-16T14:00:00.000Z"
 *                         showId: "show3"
 */ 