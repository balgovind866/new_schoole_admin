import { Field, ErrorMessage, Formik, Form } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AlertManager } from "../../../shared/components/AlertManager";

// Static data for staff
const staticStaffAddressData = {
  address_id: "67890", // Static ID for staff
  street_address_1: "456 Elm St",
  street_address_2: "Suite 5A",
  city: "Sample City",
  state: "Sample State",
  zip_code: "654321",
  country: "Sample Country",
};

// Validation schema using Yup
const validationSchema = Yup.object({
  address_info: Yup.object({
    street_address_1: Yup.string().required("Address 1 is required"),
    street_address_2: Yup.string().required("Address 2 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string()
      .matches(/^[0-9]{6}$/, "Zip Code must be 6 digits")
      .required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
  }),
});

const EditVendorAddressInfo: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [alertForDrawer, setAlertForDrawer] = useState<any>(null);

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Formik
      initialValues={{
        address_info: {
          street_address_1: staticStaffAddressData.street_address_1 || "",
          street_address_2: staticStaffAddressData.street_address_2 || "",
          city: staticStaffAddressData.city || "",
          state: staticStaffAddressData.state || "",
          zip_code: staticStaffAddressData.zip_code || "",
          country: staticStaffAddressData.country || "",
        },
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        setLoading(true); // Start loading when the form is submitted

        const addressId = staticStaffAddressData?.address_id;
        console.log(addressId, "address_Id");

        // Simulating an API request with a delay
        setTimeout(() => {
          console.log("API Response (Simulated):", { addressId, values });
          setAlertForDrawer({
            alertType: 'success',
            alertMessage: "Staff address information updated successfully!",
          });
          resetForm(); // Clear the form after a successful update
          navigate(-1); // Navigate back after updating
          setLoading(false); // Stop loading after the request completes
        }, 1000); // Simulating API response time (1 second)
      }}
    >
      {({ handleSubmit }) => (
        <div>
          {alertForDrawer?.alertType && (
            <AlertManager
              type={alertForDrawer.alertType}
              message={alertForDrawer.alertMessage ?? ''}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <div className="w-70 mx-auto p-15">
              <div className="pb-10 pb-lg-15">
                <h2 className="fw-bolder text-gray-900">Staff Address Details</h2>
                <div className="text-gray-500 fw-bold fs-6">Communication Address</div>
              </div>

              <div className="row fv-row mb-7">
                <div className="col-12">
                  <label className="required fs-6 fw-bold form-label mb-2">
                    Address 1
                  </label>
                  <Field
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Address 1"
                    name="address_info.street_address_1"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="address_info.street_address_1" />
                  </div>
                </div>
              </div>

              <div className="row fv-row mb-7">
                <div className="col-12">
                  <label className="required fs-6 fw-bold form-label mb-2">
                    Address 2
                  </label>
                  <Field
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Address 2"
                    name="address_info.street_address_2"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="address_info.street_address_2" />
                  </div>
                </div>
              </div>

              <div className="row fv-row mb-7">
                <div className="col-6">
                  <label className="required fs-6 fw-bold form-label mb-2">City</label>
                  <Field
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter City"
                    name="address_info.city"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="address_info.city" />
                  </div>
                </div>
                <div className="col-6">
                  <label className="required fs-6 fw-bold form-label mb-2">State</label>
                  <Field
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter State"
                    name="address_info.state"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="address_info.state" />
                  </div>
                </div>
              </div>

              <div className="row fv-row mb-7">
                <div className="col-6">
                  <label className="required fs-6 fw-bold form-label mb-2">Zip Code</label>
                  <Field
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Zip Code"
                    name="address_info.zip_code"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="address_info.zip_code" />
                  </div>
                </div>
                <div className="col-6">
                  <label className="required fs-6 fw-bold form-label mb-2">Country</label>
                  <Field
                    type="text"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Country"
                    name="address_info.country"
                  />
                  <div className="text-danger mt-2">
                    <ErrorMessage name="address_info.country" />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between py-4 px-9">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={goBack}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export { EditVendorAddressInfo };
