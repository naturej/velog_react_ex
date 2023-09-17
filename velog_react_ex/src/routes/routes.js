import MobileSelectPage from "pages/library/mobile-select/mobile-select";
import MainPage from "pages/main-page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/mobile-select",
      element: <MobileSelectPage />,
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
