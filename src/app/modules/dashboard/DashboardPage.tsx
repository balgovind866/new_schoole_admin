// src/pages/dashboard/DashboardPage.jsx
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import DashboardWrapper from "./DashboardWrapper";
import { Search, SearchInner } from "../../../_metronic/partials";

// Breadcrumb configuration for Dashboard
const masterBreadCrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/dashboard",
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

const DashboardPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="overview"
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>
                Dashboard Overview
              </PageTitle>
              <DashboardWrapper /> {/* Your custom Dashboard component */}
              
            
            </>
          }
        />
        <Route index element={<Navigate to="/dashboard/overview" />} />
      </Route>
    </Routes>
  );
};

export  {DashboardPage};
