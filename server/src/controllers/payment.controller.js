import { razorpay } from "../index.js";
import Payment from "../models/payment.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/index.js";



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

        const subscription = await razorpay.subscriptions.create({
            
            "plan_id": process.env.RAZORPAY_PLAN_ID,
            customer_notify:1
        })

        console.log("subscription from buySubscription:", subscription);

        user.subscription.id = subscription.id
        user.subscription.status = subscription.status

        await user.save()

        return res.status(200).json({
            success:true,
            message:"Subscription created successfully",
            subscription_id:subscription.id
        })

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}


export const verifySubscription = async(req,res,next)=>{
    try {
        const {id} = req.user
        const {razorpay_payment_id , razorpay_signature , razorpay_subscription_id } = req.body

        const user = await User.findById(id)

        if(!user){
            return next(new ApiError("User not found",404))
        }
        const subscription_id = user.subscription.id

    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}

export const cancelSubscription = async(req,res,next)=>{
    try {
        
    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}

export const allPayments = async(req,res,next)=>{
    try {
        
    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}