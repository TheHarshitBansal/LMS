import { Router } from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { getAPIKey, getPaymentInfo, subscribe, unsubscribe, verifySubscription } from "../controllers/payment.controller.js";

const router = Router();

router.get('/key', getAPIKey);
router.post('/subscribe', subscribe);
router.post('/verify', verifySubscription);
router.post('/unsubscribe', unsubscribe);
router.get('/', isAdmin, getPaymentInfo);

export default router;