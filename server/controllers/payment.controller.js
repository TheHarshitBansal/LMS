import razorpay from '../config/razorpayConfig.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import AppError from '../utils/error.js';
import crypto from 'crypto'
import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import { config } from 'dotenv';
config();

const getAPIKey = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay API Key",
        key: process.env.RAZORPAY_KEY_ID,
    })
})

const subscribe = asyncHandler(async (req, res, next) => {
    try{
        const {id} = req.user;
        const user = await User.findById(id);

        if(!user){
            return next(new AppError(400, 'User does not exists'))
        }

        if(user.role === 'ADMIN'){
            return next(new AppError(406, 'Admin cannot purchase a subscription'));
        }

        if(user.subscription.status === "ACTIVE"){
            return next(new AppError(400, 'Subscription already active'))
        }

        const subscriptionDetails = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12,
        })

        user.subscription.id = subscriptionDetails.id;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Subscribed',
            subscription_id: subscriptionDetails.id,
            subscriptionDetails,
        })}
    catch(e){
        return next(new AppError(e.status, e.message))
    }
})

const verifySubscription = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    const {razorpay_payment_id, razorpay_signature, razorpay_subscription_id} = req.body;

    const user = await User.findById(id);

    if(!user){
        return next(new AppError(400, 'User does not exists'))
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id
    })

    user.subscription.status = 'ACTIVE';
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
    })
})

const unsubscribe = asyncHandler(async (req, res, next) => {
    const {id} = req.user;
    const user = await User.findById(id);

    if(!user){
        return next(new AppError(400, 'User does not exists'))
    }

    if(user.role === 'ADMIN'){
        return next(new AppError(406, 'Admin cannot cancel a subscription'));
    }

    if(user.subscription.status === "INACTIVE"){
        return next(new AppError(400, 'Subscription not active'))
    }

    await razorpay.subscriptions.cancel(user.subscription.id);

    user.subscription.id = null;
    user.subscription.status = 'INACTIVE';

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Subscription cancelled successfully'
    })

})

const getPaymentInfo = asyncHandler(async (req, res, next) => {
    const { count, skip } = req.query;

  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 10,
    skip: skip ? skip : 0,
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = allPayments.items.map((payment) => {
    const monthsInNumbers = new Date(payment.start_at * 1000);
    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  res.status(200).json({
    success: true,
    message: 'All payments',
    allPayments,
    finalMonths,
    monthlySalesRecord,
  });
})

export{
    getAPIKey,
    subscribe,
    verifySubscription,
    unsubscribe,
    getPaymentInfo
}