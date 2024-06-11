import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";
import { SignUpRequest } from "../types/requests.type";
import { IsError } from "../types/responses.type";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  let navigate: NavigateFunction = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!")
  });

  const handleRegister = (formValue: SignUpRequest) => {

    register(formValue).then(
      (response) => {

        if (IsError(response))
        {
          setMessage(response.message);
          setSuccessful(false);
        }
        else{
          navigate("/");
          window.location.reload();
        }
      }
    );
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">Create Profile</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
            >
            <Form>
                {!successful && (
                <div className="space-y-6">
                    <div>
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-300"> First Name </label>
                    <Field name="firstName" type="text" className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <ErrorMessage
                        name="firstName"
                        component="div"
                        className="block text-sm font-medium leading-6 text-gray-300"
                    />
                    </div>
                    <div>
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-300"> Last Name </label>
                    <Field name="lastName" type="text" className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <ErrorMessage
                        name="lastName"
                        component="div"
                        className="block text-sm font-medium leading-6 text-gray-300"
                    />
                    </div>
                    <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-300"> Username </label>
                    <Field name="username" type="text" className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="block text-sm font-medium leading-6 text-gray-300"
                    />
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300"> Email </label>
                    <Field name="email" type="email" className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="block text-sm font-medium leading-6 text-gray-300"
                    />
                    </div>

                    <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300"> Password </label>
                    <Field
                        name="password"
                        type="password"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="block text-sm font-medium leading-6 text-gray-300"
                    />
                    </div>

                    <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                    </div>
                </div>
                )}

                {message && (
                <div>
                    <div
                    className={
                        successful ? "block text-sm font-medium leading-6 text-gray-300" : "block text-sm font-medium leading-6 text-gray-300"
                    }
                    role="alert"
                    >
                    {message}
                    </div>
                </div>
                )}
            </Form>
            </Formik>
        
        </div>
    </div>
  );
};

export default Register;