import { razorpay } from "../index.js";
import Payment from "../models/payment.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/index.js";


//get razorpay key
export const getRazorPayKey = async(req,res,next)=>{
    try {

        return res.status(200).json({
            success:true,
            message:"Razorpay API key",
            key:process.env.RAZORPAY_KEY_ID
        })

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}

//buy Subscription
export const buySubscription = async(req,res,next)=>{
    try {
        const {id} = req.user
        const user = await User.findById(id)
        if(!user){
            return next(new ApiError("User not found",404))
        }
        if(user.role ==="ADMIN"){
            return next(new ApiError("Admin cannot buy subscription",403))
        }

        const subscription =  await razorpay.subscriptions.create({
            
            "plan_id": process.env.RAZORPAY_PLAN_ID,
            customer_notify:1,
            total_count:12
        })
        user.subscription.id = subscription.id
        user.subscription.status = subscription.status

        await user.save()

        return res.status(200).json({
            success:true,
            message:"Subscription created successfully",
            subscription_id:subscription.id
        })

    } catch (error) {
        console.error("Error in buySubscription:", error);
        return next(new ApiError(error.message, 500));
    }
}

//verify Subscription
export const verifySubscription = async(req,res,next)=>{
    try {
        const {id} = req.user
        const {razorpay_payment_id , razorpay_signature , razorpay_subscription_id } = req.body
        const user = await User.findById(id)

        if(!user){
            return next(new ApiError("User not found",404))
        }
        const subscription_id = user.subscription.id
        const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest('hex');

    if (generatedSignature !== razorpay_signature) {
        return next(new AppError('Payment not verified, please try again.', 400));
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    });

    user.subscription.status = 'active';

    console.log("use from verifySubscription::"+user);

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
    });     

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}

//cancel Subscription
export const cancelSubscription = async(req,res,next)=>{
    try {
        const {id} = req.user
        const user = await User.findById(id)
        if(!user){
            return next(new ApiError("User not found",404))
        }

        const subscriptionId = user.subscription.id
        const subscription = await razorpay.subscriptions.cancel(subscriptionId)
        user.subscription.status = subscription.status
        await user.save()

        return res.status(200).json({
            success:true,
            message:"Subscription cancelled successfully",
        })

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}


// allPayments
export const allPayments = async(req,res,next)=>{
    try {
        const {count} = req.query
        const subscriptions =  await razorpay.subscriptions.all({
            count:count || 10
        })

        const payments = await Payment

        return res.status(200).json({
            success:true,
            message:"Subscriptions fetched successfully",
            subscriptions
        })

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}