import React, { useState } from 'react'
import { useCart } from '../../context/Cart/CartContext';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

function Checkout() {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("jazzcash");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shipping = 150;
  const total = subtotal + shipping;

  const schema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone must be 11 digits")
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string()
      .matches(/^\d{5}$/, "Postal Code must be 5 digits")
      .required("Postal code is required"),
  });
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

   const onSubmit = async (data) => {
    console.log("Order Data:", { ...data, paymentMethod, cartItems, total });
    // handle stripe payment logic 
  };
  return (
    <div>
      Checkout Page
    </div>
  )
}

export default Checkout
