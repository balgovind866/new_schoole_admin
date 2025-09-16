import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { CourtsWrapper } from "./CourtsWrapper";

const courtsBreadCrumbs: Array<PageLink> = [
  {
    title: "Courts",
    path: "/courts",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const CourtsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={courtsBreadCrumbs}>
                Courts
              </PageTitle>
              <CourtsWrapper />
            </>
          }
        />

        <Route index element={<Navigate to="/courts/list" />} />
      </Route>
    </Routes>
  );
};

export default CourtsPage;
