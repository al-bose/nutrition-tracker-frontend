import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    const user : IUser | undefined = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

  }, [showMobileMenu]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }

  return (
    <div>
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" onClick={toggleMobileMenu} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {!showMobileMenu ? (
                  <svg className="block h-6 w-6 sm:none" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" id="mobile-menu-closed">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 sm:none" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" id="mobile-menu-opened">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              )}

 
            </button>
          </div>
          <div className="flex flex-1 items-center justify-left hidden sm:block sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
                {currentUser &&
                <div>
                </div>
                }
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                 {currentUser ? (
                  <div>
                      <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium" onClick={logOut}>
                        Log Out
                      </a>
                  </div>
                ) : (
                  <div>
                      <Link to={"/login"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
                        Log In
                      </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMobileMenu && (      
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {currentUser &&
              <div>
              </div>
            }
          </div>
        </div>
      )}         

    </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
};

export default App;