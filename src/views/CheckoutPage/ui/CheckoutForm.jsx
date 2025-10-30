import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../../../components/ui/Form/InputField";
import SelectField from "../../../components/ui/Form/SelectField";
import Button from "../../../components/ui/Buttons/Button";
import { useCheckout } from "../../../context/Checkout/CheckoutDetailsContext";

function CheckoutForm({ cartItems, onShowPayment }) {
  const {setCheckoutDetails} = useCheckout()
  const schema = Yup.object({
    // personal
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10,11}$/, "Phone must be 10–11 digits")
      .required("Phone is required"),

    // Shipping
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string()
      .matches(/^\d{5}$/, "ZIP code must be 5 digits")
      .required("ZIP code is required"),
    country: Yup.string().required("Country is required"),
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
     setCheckoutDetails({
      customerInfo: data,
    });
    console.log("Order Data:", { ...data, cartItems });
    onShowPayment(true)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-8">
      {/* PERSONAL INFORMATION */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium text-[#156874] mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            placeholder={"e.g John"}
          />
          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            placeholder={"e.g Max"}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder={"e.g johnMax24@gmail.com"}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            register={register}
            error={errors.phone}
            placeholder={"e.g 03312546789"}
          />
        </div>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium text-[#156874] mb-4">
          Shipping Address
        </h2>
        <div className="space-y-4">
          <InputField
            label="Address"
            name="address"
            register={register}
            error={errors.address}
            placeholder={"e.g A-1 Apartment Name floor No."}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="City"
              name="city"
              register={register}
              error={errors.city}
              placeholder={"e.g Karachi"}
            />
            <InputField
              label="State"
              name="state"
              register={register}
              error={errors.state}
              placeholder={"e.g Sindh"}
            />
            <InputField
              label="ZIP Code"
              name="zip"
              register={register}
              error={errors.zip}
              placeholder={"e.g 1234"}
            />
          </div>
          <SelectField
            label="Country"
            name="country"
            register={register}
            error={errors.country}
            options={[
              "United States",
              "Canada",
              "United Kingdom",
              "Australia",
              "Pakistan",
            ]}
          />
        </div>
      </div>
      {/* SUBMIT */}
      <Button
        variant="primary"
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Proceed to Payment"}
      </Button>
    </form>
  );
}

export default CheckoutForm;
