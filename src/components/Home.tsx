import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import * as AuthService from "../services/auth.service";
import IUser from '../types/user.type';


const Home : React.FC = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
        }
    
      }, []);


    return(
        <div>
        {currentUser ? (
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 px-6 pt-14 lg:px-8">
            <div className="text-center">
              <h1 className="text-white text-4xl font-bold tracking-tight sm:text-6xl">Hello, </h1>
              <p className="text-white mt-6 text-lg leading-8">{currentUser.firstName}</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col gap-10">
                <div className="text-center">
                    <h1 className="text-white text-4xl font-bold tracking-tight sm:text-6xl justify-between">Track Your Nutrition</h1>
                    <p className="text-white mt-6 text-lg leading-8">Personalized tools for tracking meals. nutrition and finding recipes.</p>
                </div>

                <div className="text-center">
                  <Link to={'/login'} className="rounded-md bg-indigo-600 px-3 py-1.5 px-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Get Started
                  </Link>
                </div>
            </div>
          </div>
        )};
        </div>
    );
}

export default Home;