import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button, Select, Switch, Image } from "antd";
import AsidePopup from "./AsidePopup";
import { Mail, User } from "lucide-react";
import ANS from "@/../public/AddNewStudent.svg";
import DUPP from "@/../public/DUPP.svg";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface FormValues {
  name: string;
  email: string;
  job_title: string;
  address: string;
  phone_number: string;
  nationality: string;
}

interface AsidePopupProps {
  setClose: () => void;
  isOpen: boolean;
  handleOk: Function;
  iUE: boolean;
  setIUE: (value: boolean) => void;
  defaultValues: FormValues;
  btnName: "Add" | "Edit";
}

const AsidePop: React.FC<AsidePopupProps> = ({
  setClose,
  isOpen,
  handleOk,
  iUE,
  setIUE,
  defaultValues,
  btnName,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    job_title: yup.string().required("Job title is required"),
    address: yup.string().required("Address is required"),
    phone_number: yup.string().required("Phone number is required"),
    nationality: yup.string().required("Nationality is required"),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  console.log({ defaultValues });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    handleOk(data);
    reset({
      name: "",
      email: "",
      job_title: "",
      address: "",
      phone_number: "",
      nationality: "",
    });
  };

  const formInputs: {
    type: "input" | "select";
    realType?: "text" | "email";
    name:
      | "name"
      | "email"
      | "job_title"
      | "address"
      | "phone_number"
      | "nationality";
    label: string;
    placeholder: string;
    options?: { label: string; value: string }[];
    prefix?: ReactNode;
    errors: string | undefined;
  }[] = [
    {
      type: "input",
      realType: "text",
      name: "name",
      label: "Name",
      prefix: <User className="text-gray-300" size={22} />,
      placeholder: "Enter your name",
      errors: errors?.name?.message,
    },
    {
      type: "input",
      realType: "email",
      name: "email",
      label: "Email",
      prefix: <Mail className="text-gray-300" size={20} />,
      placeholder: "Enter your email",
      errors: errors?.email?.message,
    },
    {
      type: "select",
      name: "job_title",
      label: "Job Title",
      placeholder: "Choose title",
      options: [
        { value: "front-end", label: "front-end" },
        { value: "back-end", label: "back-end" },
        { value: "ai", label: "ai" },
        { value: "student", label: "student" },
      ],
      errors: errors?.job_title?.message,
    },
    {
      type: "input",
      realType: "text",
      name: "address",
      label: "Address",
      placeholder: "Choose title",
      errors: errors?.address?.message,
    },
    {
      type: "input",
      realType: "text",
      name: "phone_number",
      label: "Phone Number",
      placeholder: "55 200 800",
      errors: errors?.phone_number?.message,
    },
    {
      type: "select",
      name: "nationality",
      label: "Nationality",
      placeholder: "Choose title",
      options: [
        { value: "tunisia", label: "🇹🇳" },
        { value: "algeria", label: "🇩🇿" },
        { value: "republic of congo", label: "🇨🇩" },
        { value: "unknown", label: "Unknown" },
      ],
      errors: errors?.nationality?.message,
    },
  ];

  return (
    <AsidePopup setClose={setClose} isOpen={isOpen}>
      <div className="flex flex-row-reverse items-center justify-center gap-3 h-24 border-b border-b-gray-300">
        <div>
          <h2 className="text-xl">Add new Student</h2>
          <p className="font-light text-[#475467]">
            Choose a username and complete all user details.
          </p>
        </div>
        <Image src={ANS} alt="" className="h-full" />
      </div>
      <br />
      <div className="flex flex-row-reverse items-center justify-center gap-3 h-24">
        <div className="flex flex-col gap-1">
          <p>{"Importer  l'image de profil"}</p>
          <div className="flex flex-row-reverse items-center gap-2 p-2 h-20 text-sm font-extralight border-[#98CBF8] border border-dashed bg-[#F0F7FE] rounded-xl">
            <div>
              <p>
                <span className="font-bold">Click to upload</span> or drag and
                drop
              </p>
              <p>{"SVG, PNG, JPG or GIF (max. 800x400px)"}</p>
            </div>
            {/* <Image src={UIcon} alt="" className="h-full" /> */}
          </div>
        </div>
        <Image src={DUPP} alt="" className="h-full" />
      </div>
      <br />
      <div className="aside-rec-design w-full py-2 pl-4 text-[#254CA8] font-medium">
        <h3>Information</h3>
      </div>
      <div className="w-full flex justify-center">
        <form className="w-11/12" onSubmit={handleSubmit(onSubmit)} id="si">
          {formInputs?.map((formInput, index) => (
            <>
              <div className="flex flex-col gap-2" key={index}>
                <label className="text-sm font-light ml-1">
                  {formInput?.label}
                  {` ${
                    formInput?.errors
                      ? '{<p className="text-red-600">*</p>}'
                      : ""
                  }`}
                </label>
                <Controller
                  name={formInput.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    if (formInput.type == "select") {
                      return (
                        <Select
                          {...field}
                          size="large"
                          placeholder={formInput.placeholder}
                          options={formInput.options}
                        />
                      );
                    } else {
                      return (
                        <Input
                          {...field}
                          type={formInput.type}
                          prefix={formInput?.prefix}
                          placeholder={formInput.placeholder}
                          size="large"
                        />
                      );
                    }
                  }}
                />
              </div>
              <br />
            </>
          ))}
        </form>
      </div>
      <div className="aside-rec-design w-full py-2 pl-4 text-[#254CA8] font-medium">
        <h3>Invitation</h3>
      </div>
      <div className="w-11/12 flex justify-between items-center p-3">
        <span className="text-gray-500">Invite User by email</span>
        <div className="flex flex-row-reverse gap-2 items-center">
          <Switch onChange={() => setIUE(!iUE)} />
          <span className="text-sm font-medium text-gray-300">
            {iUE ? "On" : "Off"}
          </span>
        </div>
      </div>
      <div className="absolute w-full bottom-0 flex justify-center">
        <Button
          className="text-lg font-semibold py-6 w-11/12 mb-2"
          type="primary"
          htmlType="submit"
          form="si"
          onClick={() => toast.success(`${btnName}ed successfuly`)}
        >
          {btnName}
        </Button>
      </div>
    </AsidePopup>
  );
};

export default AsidePop;
