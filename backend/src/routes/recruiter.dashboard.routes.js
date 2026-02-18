import { Router } from "express";
import { verifyJWT, isRecruiter } from "../middleware/auth.middleware.js";
import { getRecruiterStats, getRecentApplicants } from "../controllers/recruiter.dashboard.controller.js";

c
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of the 5 most recent applications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *       '401':
 *         description: Unauthorized.
 *       '403':
 *         description: Access denied. User is not a recruiter.
 */
router.route("/recent-applicants").get(getRecentApplicants); 

export default router;