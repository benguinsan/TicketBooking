/**
 * @swagger
 * /api/admin/is-admin:
 *   get:
 *     summary: Check if user is admin
 *     description: Verify if the authenticated user has admin privileges
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin status confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 isAdmin:
 *                   type: boolean
 *                   example: true
 */

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     description: Get comprehensive dashboard statistics including bookings, revenue, shows, and users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 dashboardData:
 *                   type: object
 *                   properties:
 *                     totalBookings:
 *                       type: number
 *                       description: Total number of paid bookings
 *                       example: 150
 *                     totalRevenue:
 *                       type: number
 *                       description: Total revenue from all paid bookings
 *                       example: 15000
 *                     activeShows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "show_123"
 *                           showDateTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T14:00:00.000Z"
 *                           movie:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: "550"
 *                               title:
 *                                 type: string
 *                                 example: "Fight Club"
 *                               poster_path:
 *                                 type: string
 *                                 example: "/poster.jpg"
 *                     totalUsers:
 *                       type: number
 *                       description: Total number of registered users
 *                       example: 500
 */

/**
 * @swagger
 * /api/admin/shows:
 *   get:
 *     summary: Get all active shows
 *     description: Get all upcoming shows with movie details, sorted by show date
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Active shows retrieved successfully
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
 *                         example: "show_123"
 *                       showDateTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T14:00:00.000Z"
 *                       showPrice:
 *                         type: number
 *                         example: 10
 *                       occupiedSeats:
 *                         type: object
 *                         example:
 *                           "A1": "user_123"
 *                           "A2": "user_456"
 *                       movie:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "550"
 *                           title:
 *                             type: string
 *                             example: "Fight Club"
 *                           poster_path:
 *                             type: string
 *                             example: "/poster.jpg"
 *                           overview:
 *                             type: string
 *                             example: "A movie about..."
 */

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Get all bookings with user details, sorted by creation date (newest first)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: All bookings retrieved successfully
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
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "user_456"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "john@example.com"
 *                           image:
 *                             type: string
 *                             example: "https://..."
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
