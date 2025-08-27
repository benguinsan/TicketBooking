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