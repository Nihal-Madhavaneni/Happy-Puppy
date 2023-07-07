import * as React from "react";
import LoginPage from "../pages/Login";
import { useRoutes } from "react-router-dom";
import HomePage from '../components/HomePage/Main'

export default function Router() {
  let element = useRoutes([
    {
      path: "/",
      element: <LoginPage/>,
      //   children: [
      //     {
      //       path: "messages",
      //       element: <h1>Dashboard Child</h1>,
      //     },
      //   ],
    },

    {
      path: "/home",
      element: <HomePage />,
      //   children: [
      //     {
      //       path: "messages",
      //       element: <h1>Dashboard Child</h1>,
      //     },
      //   ],
    },
  ]);

  return element;
}
