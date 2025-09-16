// ./steps/AddressInfo.tsx
import { Field } from "formik";

export const AddressInfo = () => {
  return (
    <>
      <h4 className="mb-5">Address Info</h4>
      <div className="mb-3">
        <label className="form-label">Street Address 1</label>
        <Field name="address_info.street_address_1" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Street Address 2</label>
        <Field name="address_info.street_address_2" className="form-control" />
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">City</label>
          <Field name="address_info.city" className="form-control" />
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <Field name="address_info.state" className="form-control" />
        </div>
        <div className="col-md-4">
          <label className="form-label">ZIP Code</label>
          <Field name="address_info.zip_code" className="form-control" />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Country</label>
        <Field name="address_info.country" className="form-control" />
      </div>
    </>
  );
};
