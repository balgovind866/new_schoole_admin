import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { PageLink, PageTitle } from "../../../_metronic/layout/core"
import { OrganizationListWrapper } from "./organization/OrganizationListWrapper"



const masterBreadCrumbs: Array<PageLink> = [
    {
        title: "Masters",
        path: "/masters/organization",
        isSeparator: false,
        isActive: false
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const MasterPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path="organization"
                    element={
                        <>
                            <PageTitle breadcrumbs={masterBreadCrumbs}>Demo Master Example</PageTitle>
                            <OrganizationListWrapper />
                        </>
                    }
                />
                <Route index element={<Navigate to="masters/organization" />} />
            </Route>
        </Routes>
    )
}

export default MasterPage