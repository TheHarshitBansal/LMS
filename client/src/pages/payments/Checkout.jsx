import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout.jsx";
import { getRazorpayId, subscribeCourse, verifySubscription } from "../../Redux/Slices/paymentSlice.js";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const key = useSelector((state) => state?.payment?.key);
  const subscription_id = useSelector((state) => state?.payment?.subscription_id);
  const userData = useSelector((state) => state?.auth?.data);
  
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_signature: "",
    razorpay_subscription_id: ""
  };

  const loadDetails = async () => {
    await dispatch(getRazorpayId());
    await dispatch(subscribeCourse());
  };

  const getSubscription = async (e) => {
    e.preventDefault();
    if (!key || !subscription_id) {
      enqueueSnackbar("Something went wrong, Please try again", { variant: "error" });
      return;
    }
    const options = {
      key: key,
      subscription_id: subscription_id,
      name: "Learnify Pvt. Ltd.",
      description: "Purchase Subscription",
      theme: {
        color: 'F37254'
      },
      prefill: {
        email: userData.email,
        name: userData.name
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response?.razorpay_payment_id;
        paymentDetails.razorpay_signature = response?.razorpay_signature;
        paymentDetails.razorpay_subscription_id = response?.razorpay_subscription_id;

        enqueueSnackbar("Payment Successful", { variant: 'success' });

        await dispatch(verifySubscription(paymentDetails));
        navigate('/')
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    loadDetails();
    console.log(key);
    console.log(subscription_id);
  }, []);

  return (
    <HomeLayout>
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white h-[90vh] flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Subscription Bundle</h2>
        <p className="mb-4">This purchase will allow you to access all available courses on our platform for <span className="font-bold text-yellow-500">1 Year</span> duration. All the existing and new launched courses will also be available.</p>
        <p className="text-4xl font-bold mb-4">₹ 999/month only</p>
        <p className="mb-4">100% refund on cancellation</p>
        <p className="text-sm mb-6">* Terms and conditions applied *</p>
        <button
          onClick={getSubscription}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
        >
          Buy Now
        </button>
      </div>
    </div>
    </HomeLayout>
  );
}

export default Checkout;