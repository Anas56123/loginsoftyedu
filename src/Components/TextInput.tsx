import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Inputs } from "@/type";

interface TextInputProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  label: string;
  registerType: "email" | "full_name";
  placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({
  register,
  errors,
  label,
  registerType,
  placeholder,
}) => {
  return (
    <div className="relative">
      <p className="mb-2">{label}</p>
      <input
        type={registerType == "full_name" ? "text" : "email"}
        {...register(registerType, {
          required: `${label} is required`,
        })}
        className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {errors.password && (
        <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
      )}
    </div>
  );
};

export default TextInput;
