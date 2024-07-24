import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
  };


// get razorpay id
export const getRazorPayId = createAsyncThunk("/razorpay/getId" , async()=>{
    try {
        const response = await axios.get("http://localhost:3000/api/v1/payment/razorpay-key" , {headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
        return response?.data
    } catch (error) {
        toast.error("failed to load data...")
    }
})

// purchase course bundle
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse" , async()=>{
    try {
        const response = await axios.post("http://localhost:3000/api/v1/payment/subscribe" , {} ,  {headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
        return response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

// verify user payment
export const verifyUserPayment = createAsyncThunk("/verifyCourse" , async(data)=>{
    try {
        const response = await axios.post("http://localhost:3000/api/v1/payment/verify" ,{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_signature:data.razorpay_signature,
            razorpay_subscription_id:data.razorpay_subscription_id
        } ,   {headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
        return response?.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


// get payment record
export const getPaymentRecord = createAsyncThunk("/paymentRecord" , async()=>{
    try {
        const response =  axios.get("http://localhost:3000/api/v1/payment/" ,   {headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
        toast.promise(response,{
            loading:"Getting the payment records",
            success:(data)=>{
                return "Payment records fetched successfully"
            },
            error:(error)=>{
                 return "Failed to get payment records"
            }

        })
        return awaitresponse?.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


//cancel course
export const cancelSubscription = createAsyncThunk("/cancelSubscription" , async()=>{
    try {
        const response =  axios.post("http://localhost:3000/api/v1/payment/unsubscribe" ,   {headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }})
        toast.promise(response,{
            loading:"unsubscribing the course",
            success:(data)=>{
                return "unsubscribed successfully"
            },
            error:(error)=>{
                 return "Failed to unsubscribed"
            }

        })
        return awaitresponse?.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const razorPaySlice = createSlice({
    name: "razorPaySlice",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getRazorPayId.rejected, () => {
            toast.error("Failed to get razor pay id");
          })
          .addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
          })
          .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
          })
          .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
          })
          .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.error(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
          })
          .addCase(getPaymentRecord.fulfilled, (state, action) => {
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
          });
      },
})

export const {} = razorPaySlice.actions

export default razorPaySlice.reducer