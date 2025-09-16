import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { TeacherWrapper } from "./teacherWrapper";

const TeacherBreadCrumbs: Array<PageLink> = [
  {
    title: "All teacher",
    path: "/allstaff",
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

const TeacherPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={TeacherBreadCrumbs}>
              All Student
              </PageTitle>
              <TeacherWrapper/>
            </>
          }
        />

        <Route index element={<Navigate to="/Student/list" />} />
      </Route>
    </Routes>
  );
};

export default TeacherPage;