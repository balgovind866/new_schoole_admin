import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import ImageUploadController from "../../../shared/components/contoller/ImageInput";
import { useNavigate } from "react-router-dom";
import { AlertManager } from "../../../shared/components/AlertManager";

const EditVendorInfo: FC = () => {
    const navigate = useNavigate();
    const id = "123";
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: string, message: string } | null>(null);

    const handleImageUpload = (file: File) => {
        console.log(file, 'Image uploaded');
        setImageUrl(URL.createObjectURL(file));
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div>
                {alert && <AlertManager type={alert.type} message={alert.message} />}
                <Formik
                    initialValues={{
                        vendor_info: {
                            company_name: "",
                            representative_name: "",
                            contact_number: "",
                            email: "",
                            address: "",
                            vendor_type: "",
                            registration_number: "",
                            gst_number: "",
                            contract_start_date: "",
                            contract_end_date: "",
                        },
                    }}
                    onSubmit={(values) => {
                        // Replace this with actual API logic
                        console.log("Vendor Info Submitted for ID:", id, values);
                        setAlert({
                            type: 'success',
                            message: 'Vendor information updated successfully',
                        });
                        navigate(-1); // Navigate back after submission
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="w-70 mx-auto p-10">
                                <div className="pb-10 pb-lg-15">
                                    <h2 className="fw-bolder text-gray-900">Edit Vendor Info</h2>
                                </div>

                                {/* Image Upload */}
                                <div className="row fv-row mb-7">
                                    <div className="col-12 mb-4">
                                        <ImageUploadController onUpload={handleImageUpload} />
                                        {/* {imageUrl && <img src={imageUrl} alt="Vendor Image" style={{ maxWidth: '200px', marginTop: '10px' }} />} */}
                                    </div>
                                </div>

                                {/* Vendor's Company Name, Representative Name, Contact Number */}
                                <div className="row fv-row mb-7">
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Company Name</label>
                                        <Field
                                            type="text"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.company_name"
                                            placeholder="Enter Company Name"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.company_name" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Vendor Representative Name</label>
                                        <Field
                                            type="text"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.representative_name"
                                            placeholder="Enter Vendor Representative Name"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.representative_name" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Contact Number</label>
                                        <Field
                                            type="text"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.contact_number"
                                            placeholder="Enter Contact Number"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.contact_number" />
                                        </div>
                                    </div>
                                </div>

                                {/* Email, Address, Vendor Type */}
                                <div className="row fv-row mb-7">
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Email</label>
                                        <Field
                                            type="email"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.email"
                                            placeholder="Enter Email"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.email" />
                                        </div>
                                    </div>
                                  
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Vendor Type</label>
                                        <Field as="select" name="vendor_info.vendor_type" className="form-select form-select-solid">
                                            <option value="">Select Vendor Type</option>
                                            <option value="Wholesale">Wholesale</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Service">Service</option>
                                        </Field>
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.vendor_type" />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Company Registration Number</label>
                                        <Field
                                            type="text"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.registration_number"
                                            placeholder="Enter Company Registration Number"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.registration_number" />
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Number, GST Number, Contract Dates */}
                                <div className="row fv-row mb-7">
                                 
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">GST Number</label>
                                        <Field
                                            type="text"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.gst_number"
                                            placeholder="Enter GST Number"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.gst_number" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Contract Start Date</label>
                                        <Field
                                            type="date"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.contract_start_date"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.contract_start_date" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label className="required fs-6 fw-bold form-label mb-2">Contract End Date</label>
                                        <Field
                                            type="date"
                                            className="form-control form-control-lg form-control-solid"
                                            name="vendor_info.contract_end_date"
                                        />
                                        <div className="text-danger mt-2">
                                            <ErrorMessage name="vendor_info.contract_end_date" />
                                        </div>
                                    </div>
                                </div>

                                

                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-light m-2" onClick={goBack}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export { EditVendorInfo };
