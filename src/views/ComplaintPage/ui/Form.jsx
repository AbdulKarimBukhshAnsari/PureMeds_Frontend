import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SuccessMessage from "./SuccessMessage";
import FileUpload from "./FileUpload";
import { Info } from "lucide-react";

const schema = Yup.object({
  medicineName: Yup.string().required("Medicine name is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  batchId: Yup.string().required("Batch ID is required"),
  manufacturerDate: Yup.string().required("Manufacturing date is required"),
  expiryDate: Yup.string().required("Expiry date is required"),
  medicineDose: Yup.string().required("Medicine dose is required"),
  store: Yup.string().required("Store name is required"),
  city: Yup.string().required("City is required"),
  qrCode: Yup.string().required("QR Code is required"),
});
function Form() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Complaint Data:", data);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API call
    setSubmitted(true);
    reset();
  };

  if (submitted) return <SuccessMessage onReset={() => setSubmitted(false)} />;

  return <div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface  p-8"
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <InputField
          label="Medicine Name"
          name="medicineName"
          register={register}
          error={errors.medicineName}
          placeholder="e.g. Paracetamol"
        />
        <InputField
            label="Medicine Dose"
            name="medicineDose"
            register={register}
            error={errors.medicineDose}
            placeholder="e.g. 250mg / 5ml"
          />
        <InputField
          label="Manufacturer"
          name="manufacturer"
          register={register}
          error={errors.manufacturer}
          placeholder="e.g. ABC Pharmaceuticals"
        />
        <InputField
          label="Batch ID"
          name="batchId"
          register={register}
          error={errors.batchId}
          placeholder="e.g. PMD-12345"
        />
        <InputField
            type="date"
            label="Manufacturing Date"
            name="manufacturerDate"
            register={register}
            error={errors.manufacturerDate}
          />

        <InputField
          type="date"
          label="Expiry Date"
          name="expiryDate"
          register={register}
          error={errors.expiryDate}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <InputField
          label="Store Name"
          name="store"
          register={register}
          error={errors.store}
          placeholder="e.g. City Medical Store"
        />
        <SelectField
          label="City"
          name="city"
          register={register}
          error={errors.city}
          options={[
            "Karachi",
            "Lahore",
            "Islamabad",
            "Rawalpindi",
            "Faisalabad",
            "Multan",
            "Peshawar",
            "Quetta",
            "Other",
          ]}
        />
      </div>

      <Controller
        name="qrCode"
        control={control}
        render={({ field }) => <FileUpload onFileSelect={field.onChange} error={errors.qrCode} />}
      />
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </div>
    </form>
  </div>;
}

export default Form;
