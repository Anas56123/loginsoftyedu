"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input, Modal, Select, Switch } from "antd";
import { ReactNode } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormValues = {
  title: string;
  formation: string;
  chapter: number;
  repeated: boolean;
  repeat_wrong_answer: boolean;
  has_time: boolean;
  time: number;
  has_hearts: boolean;
  num_hearts: number;
};

const AddQuiz = ({
  isModalOpen,
  setIsModalOpen,
  handleOk,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleOk: (data: FormValues) => void;
}) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    formation: yup.string().required(),
    chapter: yup.number().required(),
    repeated: yup.boolean().required(),
    repeat_wrong_answer: yup.boolean().required(),
    has_time: yup.boolean().required(),
    time: yup.number().required(),
    has_hearts: yup.boolean().required(),
    num_hearts: yup.number().required(),
  });

  const defaultValues = {
    title: "",
    formation: "",
    chapter: 1,
    repeated: false,
    repeat_wrong_answer: false,
    has_time: false,
    time: 15,
    has_hearts: false,
    num_hearts: 10,
  };

  const times: string[] = ["15", "20", "30", "40"];
  const num_hearts_options: string[] = ["10", "20", "30", "50"];

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  console.log({ errors });
  console.log("helloooooooooooooo", watch());

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    handleOk(data);
    // reset({
    //   title: "",
    //   formation: "",
    //   chapter: 1,
    //   repeated: false,
    //   repeat_wrong_answer: false,
    //   has_time: false,
    //   time: 15,
    //   has_hearts: false,
    //   num_hearts: 10,
    // });
  };

  const formInputs: {
    type: "input" | "select" | "switch";
    realType?: "text" | "number";
    name: keyof FormValues;
    label: string;
    placeholder?: string;
    switchContent?: ReactNode;
    options?: { label: string; value: string }[];
    errors: string | undefined;
  }[] = [
    {
      type: "input",
      realType: "text",
      name: "title",
      label: "Quiz Name",
      placeholder: "Add Name",
      errors: errors?.title?.message,
    },
    {
      type: "select",
      name: "formation",
      label: "Formation",
      placeholder: "Formartion",
      options: [
        { label: "Supabase", value: "supadase" },
        { label: "React", value: "react" },
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "Python", value: "python" },
        { label: "Next.js", value: "nextjs" },
      ],
      errors: errors?.formation?.message,
    },
    {
      type: "input",
      realType: "number",
      name: "chapter",
      label: "Chapter",
      placeholder: "Chapter",
      errors: errors?.chapter?.message,
    },
    {
      type: "switch",
      name: "repeated",
      label: "Repeated",
      errors: errors?.repeated?.message,
    },
    {
      type: "switch",
      name: "repeat_wrong_answer",
      label: "Repeat Wrong Answer",
      errors: errors?.repeated?.message,
    },
    {
      type: "switch",
      name: "has_time",
      label: "Time of quiz",
      switchContent: (
        <div className={`${watch("has_time") ? "flex gap-2" : "hidden"}`}>
          {times?.map((time, index) => {
            console.log(watch("time"), time);
            return (
              <Button
                name={time}
                className={`w-16 flex-1 ${
                  watch("time") == Number(time)
                    ? "border-blue-500 text-blue-500"
                    : ""
                }`}
                size="large"
                onClick={(e) => setValue("time", Number(time))}
                key={index}
              >
                {time}min
              </Button>
            );
          })}
        </div>
      ),
      errors: errors?.has_time?.message,
    },
    {
      type: "switch",
      name: "has_hearts",
      label: "Number of heart",
      switchContent: (
        <div className={`${watch("has_hearts") ? "flex gap-2" : "hidden"}`}>
          {num_hearts_options?.map((heart_options, index) => {
            console.log(watch("num_hearts"), heart_options);
            return (
              <Button
                name={heart_options}
                className={`w-16 flex-1 ${
                  watch("num_hearts") == Number(heart_options)
                    ? "border-blue-500 text-blue-500"
                    : ""
                }`}
                size="large"
                onClick={(e) => setValue("num_hearts", Number(heart_options))}
                key={index}
              >
                {heart_options}
              </Button>
            );
          })}
        </div>
      ),
      errors: errors?.has_time?.message,
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal title="Add Quiz" open={isModalOpen} onCancel={handleCancel} onOk={handleSubmit(onSubmit)}>
        <form className="w-11/12" onSubmit={handleSubmit(onSubmit)}>
          {formInputs?.map((formInput, index) => {
            if (formInput.switchContent) {
              return (
                <Controller
                  name={formInput.name}
                  control={control}
                  rules={{ required: true }}
                  key={index}
                  render={({ field }) => (
                    <div
                      className={`flex flex-col gap-3 ${
                        watch(formInput.name) ? "mb-5" : "mb-0"
                      }`}
                    >
                      <div className="flex justify-between">
                        <label className="text-sm font-light ml-1">
                          {formInput.label}
                        </label>
                        <Switch
                          size="default"
                          checked={field.value as boolean}
                          className="w-[25px]"
                          onChange={(checked) =>
                            setValue(formInput.name, checked)
                          }
                        />
                      </div>
                      <div className="mt-2">{formInput.switchContent}</div>
                    </div>
                  )}
                />
              );
            } else
              return (
                <>
                  <div
                    className={`${
                      formInput.type != "switch"
                        ? "flex flex-col gap-2"
                        : " flex justify-between"
                    }`}
                    key={index}
                  >
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
                        } else if (formInput.type == "switch") {
                          return (
                            <div className="flex flex-col gap-2">
                              <Switch
                                size="default"
                                // {...field}
                                checked={field.value as boolean}
                                className="w-[25px]"
                                onChange={(checked) =>
                                  setValue(formInput.name, checked)
                                }
                              />
                            </div>
                          );
                        } else if (formInput.type == "input") {
                          return (
                            <Input
                              {...field}
                              type={formInput?.realType}
                              placeholder={formInput.placeholder}
                              size="large"
                              value={field.value as string | number}
                            />
                          );
                        } else {
                          return <></>;
                        }
                      }}
                    />
                  </div>
                  <br />
                </>
              );
          })}
        </form>
      </Modal>
    </div>
  );
};

export default AddQuiz;
