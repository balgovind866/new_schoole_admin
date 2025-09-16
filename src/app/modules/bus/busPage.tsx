import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { AllBusWrapper } from "./BusWrapper";

const AllBusBreadCrumbs: Array<PageLink> = [
  {
    title: "All Bus",
    path: "/allbus",
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

const AllBusPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={AllBusBreadCrumbs}>
                Hero Slider 
              </PageTitle>
              <AllBusWrapper />
            </>
          }
        />

        <Route index element={<Navigate to="/allbus/list" />} />
      </Route>
    </Routes>
  );
};

export default AllBusPage;