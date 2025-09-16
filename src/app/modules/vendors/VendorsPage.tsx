import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CreateVendors } from "./components/CreateVendors"; // Change to CreateVendors
import { VendorsViewWrapper } from "./VendorView";
import { EditVendorInfo } from "./components/view/EditVendorInfo";
import { EditVendorAddressInfo } from "./components/view/EditVendorAddressInfo";
import { VendorListWrapper } from "./VendorList";
// import { VendorsViewWrapper } from "./VendorsView"; // Create VendorsViewWrapper component
// import { EditVendorInfo } from "./components/view/EditVendorInfo"; // Create EditVendorInfo
// import { EditVendorAddressInfo } from "./components/view/EditVendorAddressInfo"; // Create EditVendorAddressInfo
// import { Documents } from "./components/view/Documents"; // Reuse or create Documents component

// Vendors breadcrumbs
const vendorsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Vendors',
        path: '/vendors',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: false,
        isActive: false,
    }
];

const VendorsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                {/* Vendor List Route */}
                <Route
                    path="list"
                    element={
                        <>
                            <PageTitle breadcrumbs={vendorsBreadcrumbs}>Vendor List</PageTitle>
                            <VendorListWrapper />
                        </>
                    }
                />
                {/* Vendor View Route */}
                <Route
                    path="view/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={vendorsBreadcrumbs}>Vendor View</PageTitle>
                            <VendorsViewWrapper />
                        </>
                    }
                />
                {/* Edit Vendor Info Route */}
                <Route
                    path="editvendorinfo/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={vendorsBreadcrumbs}>Edit Vendor Info</PageTitle>
                            <EditVendorInfo />
                        </>
                    }
                />
                {/* Edit Vendor Address Info Route */}
                <Route
                    path="editaddressinfo/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={vendorsBreadcrumbs}>Edit Address Info</PageTitle>
                            <EditVendorAddressInfo />
                        </>
                    }
                />
                {/* Vendor Documents Route */}
                <Route
                    path="documents/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={vendorsBreadcrumbs}>Documents</PageTitle>
                            {/* <Documents /> */}
                        </>
                    }
                />
                {/* Create Vendor Route */}
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={vendorsBreadcrumbs}>Create Vendor</PageTitle>
                            <CreateVendors />
                        </>
                    }
                />
            </Route>
            {/* Default Route */}
            <Route index element={<Navigate to='/vendors/list' />} />
        </Routes>
    );
};

export default VendorsPage;
