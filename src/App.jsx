import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";
import Offers from "./pages/Offers";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/Offers" element={<Offers />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </BrowserRouter>
  );
}

export default App;
