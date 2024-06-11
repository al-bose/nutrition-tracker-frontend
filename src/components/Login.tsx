import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";
import { LoginRequest } from "../types/requests.type";
import { IsError } from "../types/responses.type";

const Login: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues : LoginRequest = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue : LoginRequest) => {
    setMessage("");
    setLoading(true);

    login(formValue).then(
      (response) => {
        if(IsError(response))
        {
          setLoading(false);
          setMessage(response.message);
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
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">Sign in to your account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-300">Username</label>
              <Field name="username" type="text" className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <ErrorMessage
                name="username"
                component="div"
                className="block text-sm font-medium leading-6 text-gray-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">Password</label>
              <Field name="password" type="password" className="mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <ErrorMessage
                name="password"
                component="div"
                className="block text-sm font-medium leading-6 text-gray-300"
              />
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={loading}>
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div>
                <div className="block text-sm font-medium leading-6 text-gray-300" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
        <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? 
            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create An Account</Link>
        </p>
        </div>
    </div> 
  );
};

export default Login;