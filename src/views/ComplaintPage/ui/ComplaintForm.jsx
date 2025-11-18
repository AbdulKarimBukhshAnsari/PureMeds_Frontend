import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@clerk/clerk-react";
import InputField from "../../../components/ui/Form/InputField";
import SelectField from "../../../components/ui/Form/SelectField";
import SuccessMessage from "./SuccessMessage";
import FileUpload from "./FileUpload";
import { createComplaint } from "../../../apis/complaint.api";
import DatePicker from "../../../components/ui/DatePicker/DatePicker";
import CustomDropdown from "../../../components/ui/DropDownMenu/CustomDropdown";

const schema = Yup.object({
  medicineName: Yup.string().required("Medicine name is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  batchId: Yup.string().required("Batch ID is required"),
  manufacturerDate: Yup.string().required("Manufacturing date is required"),
  expiryDate: Yup.string().required("Expiry date is required"),
  medicineDose: Yup.string().required("Medicine dose is required"),
  store: Yup.string().required("Store name is required"),
  city: Yup.string().required("City is required"),
  qrCode: Yup.mixed().required("QR Code is required"),
  description: Yup.string().required("Description is required"),
});
function ComplaintForm({ onSubmitForm }) {
  const { getToken } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("medicineName", data.medicineName);
      formData.append("medicineDose", data.medicineDose);
      formData.append("manufacturer", data.manufacturer);
      formData.append("batchId", data.batchId);
      formData.append("manufacturerDate", data.manufacturerDate);
      formData.append("expiryDate", data.expiryDate);
      formData.append("store", data.store);
      formData.append("city", data.city);
      formData.append("description", data.description);

      if (data.qrCode) {
        formData.append("qrCode", data.qrCode);
      }

      await createComplaint(formData, token);
      setSubmitted(true);
      onSubmitForm();
      reset();
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to submit complaint. Please try again."
      );
    }
  };

  // if (submitted) return <SuccessMessage onReset={() => setSubmitted(false)} />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface  p-8">
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
            placeholder="e.g. PM-12345"
          />
          <Controller
            name="manufacturerDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Manufacturing Date"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                error={errors.manufacturerDate}
                placeholder="Manufacturing date"
              />
            )}
          />

          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Expiry Date"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                error={errors.expiryDate}
                placeholder="Expiry date"
                minDate={watch("manufacturerDate")} // optional: expiry must be after manufacturing date
              />
            )}
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
          <CustomDropdown
            id="city"
            label="City"
            value={watch("city")} // current selected value
            onChange={(val) => setValue("city", val)} // update react-hook-form
            options={[
              { value: "karachi", label: "Karachi" },
              { value: "lahore", label: "Lahore" },
              { value: "islamabad", label: "Islamabad" },
              { value: "rawalpindi", label: "Rawalpindi" },
              { value: "faisalabad", label: "Faisalabad" },
              { value: "multan", label: "Multan" },
              { value: "peshawar", label: "Peshawar" },
              { value: "quetta", label: "Quetta" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select City"
            error={errors.city}
          />
        </div>

        <div className="mb-6">
          <InputField
            label="Description"
            name="description"
            register={register}
            error={errors.description}
            placeholder="Describe the issue with the medicine..."
            type="textarea"
          />
        </div>

        <Controller
          name="qrCode"
          control={control}
          render={({ field }) => (
            <FileUpload onFileSelect={field.onChange} error={errors.qrCode} />
          )}
        />
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-primary hover:to-orange-400 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComplaintForm;
