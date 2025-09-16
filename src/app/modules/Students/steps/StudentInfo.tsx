import { useFormikContext, Field, ErrorMessage } from "formik";
import { ICreateStudent } from "../CreateStudentWizartHelper";

export const PersonalInfo = () => {
  const { values } = useFormikContext<ICreateStudent>();

  return (
    <>
      <h4 className="mb-4">Student Personal Info</h4>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Registration Number</label>
          <Field name="personal_info.registration_number" className="form-control" />
          <ErrorMessage name="personal_info.registration_number" component="div" className="text-danger" />
        </div>

        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <Field name="personal_info.first_name" className="form-control" />
          <ErrorMessage name="personal_info.first_name" component="div" className="text-danger" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Middle Name</label>
          <Field name="personal_info.middle_name" className="form-control" />
          <ErrorMessage name="personal_info.middle_name" component="div" className="text-danger" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <Field name="personal_info.last_name" className="form-control" />
          <ErrorMessage name="personal_info.last_name" component="div" className="text-danger" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <Field name="personal_info.email" type="email" className="form-control" />
          <ErrorMessage name="personal_info.email" component="div" className="text-danger" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <Field name="personal_info.phone_number" className="form-control" />
          <ErrorMessage name="personal_info.phone_number" component="div" className="text-danger" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <Field as="select" name="personal_info.gender" className="form-control">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>
          <ErrorMessage name="personal_info.gender" component="div" className="text-danger" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Aadhar Number</label>
          <Field name="personal_info.aadhar_number" className="form-control" />
          <ErrorMessage name="personal_info.aadhar_number" component="div" className="text-danger" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <Field name="personal_info.date_of_birth" type="date" className="form-control" />
          <ErrorMessage name="personal_info.date_of_birth" component="div" className="text-danger" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Admission Date</label>
          <Field name="personal_info.admission_date" type="date" className="form-control" />
          <ErrorMessage name="personal_info.admission_date" component="div" className="text-danger" />
        </div>
      </div>
    </>
  );
};
