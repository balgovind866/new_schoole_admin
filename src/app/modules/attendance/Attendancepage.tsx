import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle} from "../../../_metronic/layout/core";
import { AttendanceListWrapper } from "./AttendanceList";

const attendanceBreadCrumbs: Array<PageLink> = [
  {
    title: "Attendance",
    path: "/attendance",
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

const AttendancePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={attendanceBreadCrumbs}>
                Demo Example
              </PageTitle>
              <AttendanceListWrapper />
            </>
          }
        />

        <Route index element={<Navigate to="/attendance/list" />} />
      </Route>
    </Routes>
  );
};

export default AttendancePage;
