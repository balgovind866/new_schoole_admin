import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { AllStudentWrapper } from "./studentsWrapper"
import { CreateStudentUI } from "./component/CreateStudentUI"
import { EditPersonalInfo } from "./component/EditPersonalInfo"

const allStudentBreadcrumbs: Array<PageLink> = [
  {
    title: "All Students",
    path: "/student",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
]

const AllStudentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={allStudentBreadcrumbs}>All Students</PageTitle>
              <AllStudentWrapper />
            </>
          }
        />
           <Route
                    path="editpersonslinfo"
                    element={
                        <>
                            <PageTitle breadcrumbs={[...allStudentBreadcrumbs , {
                                title: "Edit PersonslInfo", isActive: false,
                                path: "editpersonslinfo"
                            }]}>Personsl Info</PageTitle>
                            <EditPersonalInfo />
                        </>
                    }
                />
         <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={allStudentBreadcrumbs}>Student Create</PageTitle>
                            < CreateStudentUI />
                        </>
                    }
                />
        <Route index element={<Navigate to="/student/list" />} />
      </Route>
    </Routes>
  )
}

export default AllStudentPage