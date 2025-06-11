import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home";
import Loading from "../components/Loading";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddArtifact from "../pages/AddArtifact";
import AllArtifacts from "../pages/AllArtifacts";
import PrivateRoute from "../pages/PrivateRoute";
import ArtifactDetails from "../pages/ArtifactDetails";
import LikedArtifacts from "../pages/LikedArtifacts";
import MyArtifacts from "../pages/MyArtifacts";
import UpdateArtifact from "../pages/UpdateArtifact";
import ErrorPage from "../pages/ErrorPage";
import Blogs from "../components/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "add-artifact",
        Component: AddArtifact,
      },
      {
        path: "artifact/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetails></ArtifactDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/artifacts",
        element: <AllArtifacts></AllArtifacts>,
      },
      {
        path: "/artifacts/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetails></ArtifactDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "update-artifact/:id",
        element: (
          <PrivateRoute>
            <UpdateArtifact />
          </PrivateRoute>
        ),
      },
      {
        path: "all-artifacts",
        Component: AllArtifacts,
      },
      {
        path: "liked-artifacts",
        Component: LikedArtifacts,
      },
      {
        path: "my-artifacts",
        element: (
          <PrivateRoute>
            <MyArtifacts />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
       {
        path: "blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
    {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
