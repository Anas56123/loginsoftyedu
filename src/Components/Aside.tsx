import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button, Select, Switch, Image, Form } from "antd";
import AsidePopup from "./AsidePopup";
import ANS from "@/../public/AddNewStudent.svg";
import DUPP from "@/../public/DUPP.svg";
import UploadIcon from "@/../public/Uplaod icon.svg";

// Define types for the form data
interface FormValues {
  name: string;
  email: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  nationality: string;
}

interface AsidePopupProps {
  setClose: () => void;
  isOpen: boolean;
  handleOk: () => void;
  iUE: boolean;
  setIUE: (value: boolean) => void;
}

const AsidePop: React.FC<AsidePopupProps> = ({
  setClose,
  isOpen,
  handleOk,
  iUE,
  setIUE,
}) => {
  const defaultValues: FormValues = {
    name: "",
    email: "",
    jobTitle: "",
    address: "",
    phoneNumber: "",
    nationality: "",
  };

  // Validation schema using Yup
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    jobTitle: yup.string().required("Job title is required"),
    address: yup.string().required("Address is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    nationality: yup.string().required("Nationality is required"),
  });
  const [form] = Form.useForm();
  // Hook form with typed form values
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  console.log(watch());

  // Submit handler with typed form values
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    handleOk(); // Trigger any other logic you have for the OK button
  };

  const inputField = (placeHolder: string) => (
    <Input placeholder={placeHolder} />
  );

  return (
    <AsidePopup isOpen={isOpen} setClose={setClose}>
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
      <form
        // form={form}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center"
      >
        <div className="w-11/12">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-light ml-1">Name</label>
            <Controller
              name={"name"}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type={"text"}
                  placeholder={"hello"}
                  size='large'
                  className={
                    fieldState.invalid ? "custom-input error" : "custom-input"
                  }
                />
              )}
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <br />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-light ml-1">Email Address</label>
            <Controller
              name={"email"}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type={"text"}
                  placeholder={"hello"}
                  size='large'
                  className={
                    fieldState.invalid ? "custom-input error" : "custom-input"
                  }
                />
              )}
            />

            <Controller
              name={"jobTitle"}
              control={control}
              //   rules={rest.rules}

              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  options={[
                    { value: "front-end", label: "Front-end" },
                    { value: "back-end", label: "Back-end" },
                    { value: "ai", label: "AI" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
              )}
            />

            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-light ml-1">Job Title</label>
            <Select
              {...register("jobTitle")}
              options={[
                { value: "front-end", label: "Front-end" },
                { value: "back-end", label: "Back-end" },
                { value: "ai", label: "AI" },
                { value: "unknown", label: "Unknown" },
              ]}
            />
            <p className="text-red-500">{errors.jobTitle?.message}</p>
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-light ml-1">Address</label>
            <Controller
              name={"address"}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type={"text"}
                  placeholder={"hello"}
                  size='large'
                  className={
                    fieldState.invalid ? "custom-input error" : "custom-input"
                  }
                />
              )}
            />
            <p className="text-red-500">{errors.address?.message}</p>
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-light ml-1">Phone Number</label>
            <Input
              size="large"
              placeholder="50 222 800"
              {...register("phoneNumber")}
            />
            <p className="text-red-500">{errors.phoneNumber?.message}</p>
          </div>
          <br />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-light ml-1">Nationality</label>
            <Select
              defaultValue="tunisia"
              {...register("nationality")}
              options={[
                { value: "tunisia", label: "🇹🇳" },
                { value: "algeria", label: "🇩🇿" },
                { value: "republic of congo", label: "🇨🇩" },
                { value: "unknown", label: "Unknown" },
              ]}
            />
            <p className="text-red-500">{errors.nationality?.message}</p>
          </div>
          <br />
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
              htmlType="submit"
              type="primary"
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </AsidePopup>
  );
};

export default AsidePop;
