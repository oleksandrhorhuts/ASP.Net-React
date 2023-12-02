import { useRoutes } from "react-router-dom";
import {
  Dashboard,
  Accounts,
  Carriers,
  Customers,
  Users,
} from "../pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/accounts",
      element: <Accounts />,
    },
    {
      path: "/carriers",
      element: <Carriers />,
    },
    {
      path: "/customers",
      element: <Customers />,
    },
    {
      path: "/users",
      element: <Users />,
    }
  ]);
}
