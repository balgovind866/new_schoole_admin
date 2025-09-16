import { FC, useEffect, useRef, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { StepperComponent } from "../../../../_metronic/assets/ts/components";
import { Form, Formik, FormikValues } from "formik";
import { KTIcon } from "../../../../_metronic/helpers";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import * as Yup from "yup";
import { VendorsInfo } from "./steps/VendorsInfo"; // Import VendorsInfo
import { AddressInfo } from "./steps/AddressInfo"; // Same Address Info step

// Vendors info validation schema
const vendorsInfoSchema = Yup.object({
  vendor_info: Yup.object({
    company_name: Yup.string().required("Company Name is required"),
    representative_name: Yup.string().required("Vendor Representative Name is required"),
    contact_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Contact number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    vendor_type: Yup.string().oneOf(["Wholesale", "Retail", "Service"], "Invalid vendor type").required("Vendor type is required"),
    registration_number: Yup.string().required("Company Registration Number is required"),
    gst_number: Yup.string().required("GST Number is required"),
    contract_start_date: Yup.date().required("Contract Start Date is required"),
    contract_end_date: Yup.date().required("Contract End Date is required"),
  }),
});

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Dummy API function to create vendor
const createVendorAPI = async (vendorData: any) => {
  try {
    const response = await fetch(`${API_URL}/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    });

    if (!response.ok) {
      throw new Error("Failed to create vendor");
    }
    return await response.json(); // Return response data (like vendor ID, etc.)
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const CreateVendors: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const [stepper, setStepper] = useState<StepperComponent | null>(null);
  const [isSubmitButton, setSubmitButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage loading state

  // Initial values for vendor info
  const initialValues = {
    vendor_info: {
      company_name: '',
      representative_name: '',
      contact_number: '',
      email: '',
      vendor_type: '',
      registration_number: '',
      gst_number: '',
      contract_start_date: '',
      contract_end_date: '',
    },
    address_info: {
      street_address_1: "",
      street_address_2: "",
      city: "",
      state: "",
      zip_code: "",
      country: ""
    }
  };

  const loadStepper = () => {
    setStepper(StepperComponent.createInsance(stepperRef.current as HTMLDivElement));
  };

  const prevStep = () => {
    if (!stepper) return;

    stepper.goPrev();
    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber);
  };

  const submitStep = async (values: any, actions: FormikValues) => {
    if (!stepper) return;

    setIsSubmitting(true); // Show loader or disable button during submission

    if (stepper.currentStepIndex !== stepper.totalStepsNumber) {
      stepper.goNext();
    } else {
      console.log("Vendor Info Submitted", values);
      console.log(JSON.stringify(values), "vendor");

      // Call API to create the vendor
      try {
        const response = await createVendorAPI(values);
        console.log("Vendor created successfully:", response);

        actions.resetForm(); // Reset form after successful submission
        stepper.goto(1); // Go back to the first step
      } catch (error: any) {
        console.error("Error creating vendor:", error.message);
      }
    }

    setIsSubmitting(false); // Hide loader or enable button after submission
    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber);
  };

  useEffect(() => {
    if (!stepperRef.current) return;
    loadStepper();
  }, [stepperRef]);

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="card">
          <div className="card-body">
            <div ref={stepperRef} className="stepper stepper-links d-flex flex-column pt-15" id="kt_create_vendor_stepper">
              <div className="stepper-nav mb-5">
                <div className="stepper-item current" data-kt-stepper-element="nav">
                  <h3 className="stepper-title">Vendor Info</h3>
                </div>
                <div className="stepper-item" data-kt-stepper-element="nav">
                  <h3 className="stepper-title">Address Info</h3>
                </div>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={vendorsInfoSchema} // Use vendors validation schema
                onSubmit={submitStep}
              >
                {({ isSubmitting }) => (
                  <Form className="mx-auto mw-800px w-100 pt-15 pb-10" id="kt_create_vendor_form">
                    {/* Vendor Info Step */}
                    <div className="current" data-kt-stepper-element="content">
                      <VendorsInfo />
                    </div>
                    <div data-kt-stepper-element="content">
                      <AddressInfo />
                    </div>

                    {/* Stepper Navigation */}
                    <div className="d-flex flex-stack pt-15">
                      <div className="mr-2">
                        <button
                          onClick={prevStep}
                          type="button"
                          className="btn btn-lg btn-light-primary me-3"
                          data-kt-stepper-action="previous"
                        >
                          <KTIcon iconName="arrow-left" className="fs-4 me-1" />
                          Back
                        </button>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary me-3"
                          disabled={isSubmitting || isSubmitting} // Disable while submitting
                        >
                          <span className="indicator-label">
                            {!isSubmitButton && "Continue"}
                            {isSubmitButton && "Submit"}
                            <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export { CreateVendors };
