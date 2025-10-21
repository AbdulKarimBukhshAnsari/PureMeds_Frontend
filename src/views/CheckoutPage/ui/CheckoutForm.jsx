import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../../../components/ui/Form/InputField";
import SelectField from "../../../components/ui/Form/SelectField";
import Button from "../../../components/ui/Buttons/Button";
import PaymentSection from "./PaymentSection";

function CheckoutForm({ cartItems, onSubmitSuccess }) {
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
    console.log("Order Data:", { ...data, cartItems });
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    reset();
    onSubmitSuccess();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:col-span-2 space-y-8"
      >
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
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              register={register}
              error={errors.phone}
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
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="City"
                name="city"
                register={register}
                error={errors.city}
              />
              <InputField
                label="State"
                name="state"
                register={register}
                error={errors.state}
              />
              <InputField
                label="ZIP Code"
                name="zip"
                register={register}
                error={errors.zip}
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
        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium text-primary mb-4">
            Payment Method
          </h2>
          <PaymentSection cartItems={cartItems} />
        </div>
        {/* SUBMIT */}
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
}

export default CheckoutForm;
