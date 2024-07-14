import express from "express";
import { allPayments, buySubscription, cancelSubscription, getRazorPayKey, verifySubscription } from "../controllers/payment.controller.js";

import { isLoggedIn , adminMiddleware  } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.route("/razorpay-key")
    .get(isLoggedIn , getRazorPayKey)

router.route('/subscribe')
    .post(isLoggedIn , buySubscription)

router.route("/verify ")
    .post(isLoggedIn , verifySubscription)

router.route('/unsubscribe')
.post(isLoggedIn , cancelSubscription)


router.route("/")
    .get(isLoggedIn , adminMiddleware ,  allPayments)

export default router