import { FC } from "react";
import {KTIcon , toAbsoluteUrl } from "../../../../../_metronic/helpers"
import { Link , useLocation } from "react-router-dom";


type Props = {
    id: string;
}

const VendorProfileHeader : FC<Props> = ({id}) => {
    const location = useLocation();

    const vendorData = {
        first_name : "jane",
        last_name : "smith",
        phone_number : "+09876456637",
        email : "jane.smith@company.com"
    }

    return(
<div className="card mb-5 mb-xl-10">
      <div className="card-body pt-9 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div className="me-7 mb-4">
            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
              <img src={toAbsoluteUrl('../media/avatars/download.jpg')} alt="Staff Profile" />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                    {vendorData.first_name} {vendorData.last_name}
                  </a>
                </div>
                <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <a href="#" className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2">
                    <KTIcon iconName="geolocation" className="fs-4 me-1" />
                    {vendorData.phone_number}
                  </a>
                  <a href="#" className="d-flex align-items-center text-gray-500 text-hover-primary mb-2">
                    <KTIcon iconName="sms" className="fs-4 me-1" />
                    {vendorData.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex overflow-auto h-55px">
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
            <li className="nav-item">
              <Link
                className={`nav-link text-active-primary me-6 ${location.pathname === `/vendors/editvendorinfo/${id}` ? 'active' : ''}`}
                to={`/vendors/editvendorinfo/${id}`}
              >
                Vendors Info
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-active-primary me-6 ${location.pathname === `/vendors/editaddressinfo/${id}` ? 'active' : ''}`}
                to={`/vendors/editaddressinfo/${id}`}
              >
                Address Info
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-active-primary me-6 ${location.pathname === `/staff/feesdetails/${id}` ? 'active' : ''}`}
                to={`/staff/feesdetails/${id}`}
              >
                Details
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-active-primary me-6 ${location.pathname === `/staffs/documents/${id}` ? 'active' : ''}`}
                to={`/staffs/documents/${id}`}
              >
                Documents
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    )
}

export {VendorProfileHeader}