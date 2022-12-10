import { Route, Routes } from "react-router-dom";
import { HomeType } from "../interfaces/Home.types";
import Home from "../pages/Home";
import Search from "../pages/Search";
import SignIn from "../pages/Sign-in";
import Video from "../pages/Video";

export const AppRouter = () => {
  return (
    <Routes>
      {/* main route which renders HomePage */}
      <Route path="/">
        {/* fijate que esta un Route dentro de otro */}
        <Route index element={<Home type={HomeType.RANDOM} />} />
        <Route path="trending" element={<Home type={HomeType.TRENDING} />} />
        <Route path="subscriptions" element={<Home type={HomeType.SUBSCRIPTIONS} />} />
        <Route path="search" element={<Search />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="video">
          {/* este está aún más anidado */}
          <Route path=":id" element={<Video />} />
        </Route>
      </Route>
    </Routes>
  );
};
