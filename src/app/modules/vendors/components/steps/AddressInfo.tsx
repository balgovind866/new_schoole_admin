import { FC } from "react";
import { Field, ErrorMessage } from "formik";

const AddressInfo: FC = () => (
  <div className="w-100">
    <div className="pb-10 pb-lg-15">
      <h2 className="fw-bolder text-gray-900">Address Details</h2>
      <div className="text-gray-500 fw-bold fs-6">Communication Address</div>
    </div>

    {/* Street Address 1 */}
    <div className="d-flex flex-column mb-7 fv-row">
      <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
        <span className="required">Address 1</span>
        <i
          className="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="tooltip"
          title="House No, Building name"
        ></i>
      </label>
      <Field
        type="text"
        name="address_info.street_address_1"
        className="form-control form-control-solid"
        placeholder="Enter Address 1"
      />
      <div className="text-danger mt-2">
        <ErrorMessage name="address_info.street_address_1" />
      </div>
    </div>

    {/* Street Address 2 */}
    <div className="d-flex flex-column mb-7 fv-row">
      <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
        <span className="required">Address 2</span>
        <i
          className="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="tooltip"
          title="Street name"
        ></i>
      </label>
      <Field
        type="text"
        name="address_info.street_address_2"
        className="form-control form-control-solid"
        placeholder="Enter Address 2"
      />
      <div className="text-danger mt-2">
        <ErrorMessage name="address_info.street_address_2" />
      </div>
    </div>

    {/* City and State */}
    <div className="row fv-row mb-7">
      <div className="col-6">
        <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
          <span className="required">City</span>
        </label>
        <Field
          type="text"
          name="address_info.city"
          className="form-control form-control-solid"
          placeholder="Enter City"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="address_info.city" />
        </div>
      </div>
      <div className="col-6">
        <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
          <span className="required">State</span>
        </label>
        <Field
          type="text"
          name="address_info.state"
          className="form-control form-control-solid"
          placeholder="Enter State"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="address_info.state" />
        </div>
      </div>
    </div>

    {/* Zip Code and Country */}
    <div className="row fv-row mb-7">
      <div className="col-6">
        <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
          <span className="required">Zip Code</span>
        </label>
        <Field
          type="text"
          name="address_info.zip_code"
          className="form-control form-control-solid"
          placeholder="Enter Zip Code"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="address_info.zip_code" />
        </div>
      </div>
      <div className="col-6">
        <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
          <span className="required">Country</span>
        </label>
        <Field
          type="text"
          name="address_info.country"
          className="form-control form-control-solid"
          placeholder="Enter Country"
        />
        <div className="text-danger mt-2">
          <ErrorMessage name="address_info.country" />
        </div>
      </div>
    </div>
  </div>
);

export { AddressInfo };
