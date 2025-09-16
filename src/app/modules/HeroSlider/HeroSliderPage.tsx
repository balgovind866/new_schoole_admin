import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { HeroSliderWrapper } from "./HeroSliderWrapper";

const HeroSlidersBreadCrumbs: Array<PageLink> = [
  {
    title: "Hero Sliders",
    path: "/herosliders",
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

const HeroSliderPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={HeroSlidersBreadCrumbs}>
                Hero Slider 
              </PageTitle>
              <HeroSliderWrapper />
            </>
          }
        />

        <Route index element={<Navigate to="/herosliders/list" />} />
      </Route>
    </Routes>
  );
};

export default HeroSliderPage;