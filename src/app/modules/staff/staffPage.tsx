import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { AllStaffWrapper } from "./staffWrapper";

const AllStaffBreadCrumbs: Array<PageLink> = [
  {
    title: "All Staff",
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

const AllStaffPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={AllStaffBreadCrumbs}>
              All staff
              </PageTitle>
              <AllStaffWrapper />
            </>
          }
        />

        <Route index element={<Navigate to="/allstaff/list" />} />
      </Route>
    </Routes>
  );
};

export default AllStaffPage;