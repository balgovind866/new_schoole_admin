import { Navigate, Route, Routes } from "react-router-dom"
import { MasterLayout } from "../../_metronic/layout/MasterLayout"
import { WithChildren } from "../../_metronic/helpers"
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils"
import TopBarProgress from "react-topbar-progress-indicator"
import { FC, lazy, Suspense } from "react"

import AttendancePage from "../modules/attendance/Attendancepage"
import { DashboardPage } from "../modules/dashboard/DashboardPage"
import CourtsPage from "../modules/Courts/CourtsPage"
import HeroSliderPage from "../modules/HeroSlider/HeroSliderPage"
import AllStudentPage from "../modules/Students/StudentsPage"
import AllStaffPage from "../modules/staff/staffPage"
// import  Dropzone  from "../modules/Dropzone/dropzonepage"

const PrivateRoutes = () => {


  const VendorsPage = lazy(() => import("../modules/vendors/VendorsPage"))
  const MasterPage = lazy(() => import("../modules/masters/MastersPage"))
  // const StudentsTable = lazy(() => import("../modules/studentfileupload/fileuploads"))
  //  const Dropzone = lazy(() => import("../modules/Dropzone/dropzone"))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        <Route
          path="dashboard/*"
          element={
            <SuspensedView>
              <DashboardPage />
            </SuspensedView>
          }
        />
         <Route
          path="student/*"
          element={
            <SuspensedView>
              <AllStudentPage />
            </SuspensedView>
          }
        />
          <Route
          path="allbus/*"
          element={
            <SuspensedView>
              <AllStudentPage />
            </SuspensedView>
          }
        />
        <Route
          path="teacher/*"
          element={
            <SuspensedView>
              <AllStudentPage />
            </SuspensedView>
          }
        />
         <Route
          path="allstaff/*"
          element={
            <SuspensedView>
              <AllStaffPage />
            </SuspensedView>
          }
        />

        <Route
          path="courts/*"
          element={
            <SuspensedView>
              <CourtsPage />
            </SuspensedView>
          }
        />
        

        <Route
          path="attendance/*"
          element={
            <SuspensedView>
              <AttendancePage />
            </SuspensedView>
          }
        />

        <Route
          path="vendors/*"
          element={
            <SuspensedView>
              <VendorsPage />
            </SuspensedView>
          }
        />

        <Route
          path="masters/*"
          element={
            <SuspensedView>
              <MasterPage />
            </SuspensedView>
          }
        />

        <Route
          path="herosliders/*"
          element={
            <SuspensedView>
              <HeroSliderPage />
            </SuspensedView>
          }
        />



        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
