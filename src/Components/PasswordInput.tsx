import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Inputs } from "@/type";

interface PasswordInputProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  label: string;
  registerType: "password" | "confirmPassword";
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  errors,
  label,
  registerType,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <p className="mb-2">{label}</p>
      <div className="flex">
        <input
          type={showPassword ? "text" : "password"}
          {...register(registerType, { required: `${label} is required` })}
          className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={"Password"}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="eyes"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      {(registerType == "password"
        ? errors.password
        : errors.confirmPassword) && (
            <p className="mt-1 text-red-500 text-sm">
              {registerType == "password"
                ? errors.password?.message
                : errors.confirmPassword?.message}
            </p>
          )}
    </div>
  );
};

export default PasswordInput;
