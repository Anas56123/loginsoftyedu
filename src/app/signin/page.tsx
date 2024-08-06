"use client";
import PasswordInput from "@/Components/PasswordInput";
import TextInput from "@/Components/TextInput";
import { Inputs } from "@/type";
import Image from "next/image";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleLogo from "@/../public/GoogleLogo.svg";
import FacebookLogo from "@/../public/FacebookLogo.svg";
import SoftyEduLogo from "@/../public/SoftyEduLogo.svg";
import Salt from "@/../public/Saly-10.png";
import Link from "next/link";

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-[#EBEBFF] xs:hidden md:flex md:s md:w-1/2 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl font-medium">
            Don{"'"}t have an account yet?{" "}
          </h2>
          <br />
          <Link
            href="/signup"
            className="xs:mt-4 xs:bg-blue-500 xs:text-white xs:py-2 xs:px-10 xs:rounded-full xs:hover:bg-blue-600 xs:focus:outline-none xs:focus:ring-2 xs:focus:ring-blue-500 xs:focus:ring-offset-2 text-center w-5/12"
          >
            Create an account
          </Link>
          <Image src={Salt} alt="" />
        </div>
      </div>
      <div className="xs:w-full md:w-1/2 xs:mt-4 md:mt-14">
        <div className="w-full">
          <div className="flex justify-center items-center h-full">
            <Image src={SoftyEduLogo} alt="" />
          </div>
          <br />
          <div className="xs:flex xs:justify-center">
            <h2 className="xs:text-3xl xs:font-medium">
              Sign up to your account
            </h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xs:max-w-md xs:mx-auto xs:mt-8 xs:px-7"
        >
          <TextInput
            register={register}
            errors={errors}
            label="Email"
            registerType="email"
            placeholder="Your Email address"
          />
          <br />
          <PasswordInput
            register={register}
            errors={errors}
            label="Password"
            registerType="password"
          />
          <div className="xs:flex xs:justify-end xs:mb-3">
            <a className="xs:text-gray-400 xs:text-sm" href="#">
              Forgot password?
            </a>
          </div>
          <div className="xs:flex xs:justify-around xs:items-center">
            <div className="xs:w-1/2 xs:flex xs:items-center xs:translate-y-1">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="xs:w-4 xs:h-4 xs:text-blue-600 xs:bg-gray-100 xs:border-gray-300 xs:rounded xs:focus:ring-blue-500 xs:dark:focus:ring-blue-600 xs:dark:ring-offset-gray-800 xs:focus:ring-2 xs:dark:bg-gray-700 xs:dark:border-gray-600"
              />
              <label className="xs:ms-2 xs:font-medium xs:text-gray-400">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="xs:mt-4 xs:w-1/2 xs:bg-blue-500 xs:text-white xs:py-2 xs:px-4 xs:rounded-full xs:hover:bg-blue-600 xs:focus:outline-none xs:focus:ring-2 xs:focus:ring-blue-500 fxs:ocus:ring-offset-2"
            >
              Log in
            </button>
          </div>
        </form>
        <br />
        <div className="flex justify-center items-center text-center">
          <hr className="xs:bg-black xs:w-4/5" />
        </div>
        <br />
        <div className="xs:flex xs:justify-center">
          <div className="xs:w-2/3">
            <button className="xs:w-full xs:h-12 xs:border-gray-300 xs:border xs:rounded-full xs:flex xs:justify-center xs:items-center">
              <Image src={GoogleLogo} alt="" />
              <p className="xs:ml-3">Sign in with Google</p>
            </button>
            <br />
            <button className="xs:w-full xs:h-12 xs:border-gray-300 xs:border xs:rounded-full xs:flex xs:justify-center xs:items-center">
              <Image src={FacebookLogo} alt="" />
              <p className="xs:ml-3">Sign in with Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
