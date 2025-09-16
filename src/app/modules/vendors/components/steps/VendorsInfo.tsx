import { Field, ErrorMessage } from "formik";
import { FC } from "react";

const VendorsInfo: FC = () => {
    return (
        <div className='w-100'>
            <div className='pb-10 pb-lg-15'>
                <h2 className='fw-bolder text-gray-900'>Vendors Info</h2>
            </div>
            <div className='row fv-row mb-7'>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Company Name</label>
                    <Field
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder="Enter Company Name"
                        name='vendor_info.company_name'
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.company_name" />
                    </div>
                </div>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Vendor Representative Name</label>
                    <Field
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder="Enter Vendor Representative Name"
                        name='vendor_info.representative_name'
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.representative_name" />
                    </div>
                </div>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Contact Number</label>
                    <Field
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder="Enter Contact Number"
                        name='vendor_info.contact_number'
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.contact_number" />
                    </div>
                </div>
            </div>
            <div className='row fv-row mb-7'>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Email</label>
                    <Field
                        type='email'
                        className='form-control form-control-lg form-control-solid'
                        placeholder="Enter Email"
                        name='vendor_info.email'
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.email" />
                    </div>
                </div>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Vendor Type</label>
                    <Field as='select' name='vendor_info.vendor_type' className='form-select form-select-solid'>
                        <option></option>
                        <option value='Wholesale'>Wholesale</option>
                        <option value='Retail'>Retail</option>
                        <option value='Service'>Service</option>
                    </Field>
                    <div className='text-danger mt-2'>
                        <ErrorMessage name='vendor_info.vendor_type' />
                    </div>
                </div>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Company Registration Number</label>
                    <Field
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        name='vendor_info.registration_number'
                        placeholder="Enter Company Registration Number"
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.registration_number" />
                    </div>
                </div>
            </div>
            <div className='row fv-row mb-7'>
                
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>GST Number</label>
                    <Field
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        name='vendor_info.gst_number'
                        placeholder="Enter GST Number"
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.gst_number" />
                    </div>
                </div>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Contract Start Date</label>
                    <Field
                        type='date'
                        className='form-control form-control-lg form-control-solid'
                        name='vendor_info.contract_start_date'
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.contract_start_date" />
                    </div>
                </div>
                <div className='col-4'>
                    <label className='required fs-6 fw-bold form-label mb-2'>Contract End Date</label>
                    <Field
                        type='date'
                        className='form-control form-control-lg form-control-solid'
                        name='vendor_info.contract_end_date'
                    />
                    <div className="text-danger mt-2">
                        <ErrorMessage name="vendor_info.contract_end_date" />
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export { VendorsInfo };
