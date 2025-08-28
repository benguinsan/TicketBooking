/**
 * @swagger
 * /api/booking/create:
 *   post:
 *     summary: Create a new booking
 *     description: Create a booking for selected seats in a show
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showId:
 *                 type: string
 *                 description: The show ID
 *                 example: "show_123"
 *               selectedSeats:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of seat numbers to book
 *                 example: ["A1", "A2", "A3"]
 *     responses:
 *       200:
 *         description: Booking created successfully
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
 *                   example: "Booking created successfully"
 *       400:
 *         description: Seats are not available
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
 *                   example: "Seats are not available"
 */

/**
 * @swagger
 * /api/booking/occupied-seats/{showId}:
 *   get:
 *     summary: Get occupied seats for a show
 *     description: Get list of all occupied seats for a specific show
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: string
 *         description: The show ID
 *         example: "show_123"
 *     responses:
 *       200:
 *         description: List of occupied seats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 occupiedSeats:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of occupied seat numbers
 *                   example: ["A1", "A2", "B1", "B2"]
 */
