import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { nextApi } from "@config/index";
import { AxiosRequestConfig } from 'axios';

type Context = {
  user: {
    username: string,
    email: string,
    password: string
  },
  error: any,
  register: (user) => any,
  logIn: (user) => any,
  logOut: () => any,
}

const AuthContext = createContext({} as Context);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), [])

  // Register user
  const register = async (user: {
    username: string;
    email: string;
    password: string;
  }) => {
    const config: AxiosRequestConfig = {
      url: 'api/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      }
    }

    const res = await nextApi.request(config).catch((e) => {
      setError(e.response.data.message);
      setError(null);
    });

    if (res) {
       setUser(res.data.user);
       router.push('/');
    }
  };

  //Login user
  const logIn = async (user: { email: string; password: string }) => {
    const config: AxiosRequestConfig = {
      url: 'api/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        identifier: user.email,
        password: user.password,
      }
    }

    const res = await nextApi.request(config).catch((e) => {
      setError(e.response.data.message);
      setError(null);
    });

    if (res) {
       setUser(res.data.user);
       router.push('/');
    }
  };

  //logout user
  const logOut = async () => {
    const res = await nextApi.post('api/logout');
    if (res) {
      setUser(null);
      router.push('/');
    }
  };

  //check if user is logged in
  const checkUserLoggedIn = async () => {
    try {
       const res = await nextApi.get('api/user');
      if (res) {
        setUser(res.data.user);
        router.push('/account/dashboard');
      }
      else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
