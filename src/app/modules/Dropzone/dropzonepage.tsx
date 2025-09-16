import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import DropzoneModals from "./reactdropzone"; // ✅ Fixed import name

const studentBreadcrumbs: Array<PageLink> = [
  {
    title: "DropzoneForStudentFileUploads",
    path: "/dropzone",
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

const StudentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="dropzone"
          element={
            <>
              <PageTitle breadcrumbs={studentBreadcrumbs}>
                Students List
              </PageTitle>
              <DropzoneModals /> {/* ✅ Fixed component reference */}
            </>
          }
        />
      </Route>

      {/* ✅ Corrected the redirection path */}
      <Route index element={<Navigate to="/dropzone" />} />
    </Routes>
  );
};

export default StudentPage;
