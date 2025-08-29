/**
 * @swagger
 * /api/user/bookings:
 *   get:
 *     summary: Get user's booking history
 *     description: Retrieve all bookings for the authenticated user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "booking_123"
 *                       show:
 *                         type: string
 *                         example: "show_789"
 *                       amount:
 *                         type: number
 *                         example: 100
 *                       bookedSeats:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["A1", "A2"]
 *                       isPaid:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00.000Z"
 */

/**
 * @swagger
 * /api/user/update-favorite:
 *   post:
 *     summary: Update user's favorite movies
 *     description: Add or remove movies from user's favorites list using Clerk metadata
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: The movie ID to add/remove from favorites
 *                 example: "550"
 *               action:
 *                 type: string
 *                 enum: [add, remove]
 *                 description: Action to perform on favorites
 *                 example: "add"
 *     responses:
 *       200:
 *         description: Favorite movies updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Movie added to favorites"
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Updated list of favorite movie IDs
 *                   example: ["550", "551", "552"]
 *       400:
 *         description: Invalid action or movie ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid action"
 */

/**
 * @swagger
 * /api/user/favorites:
 *   get:
 *     summary: Get user's favorite movies
 *     description: Retrieve list of favorite movie IDs from Clerk metadata
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Favorite movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of favorite movie IDs
 *                   example: ["550", "551", "552"]
 *                 count:
 *                   type: number
 *                   description: Number of favorite movies
 *                   example: 3
 */
