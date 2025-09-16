import { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { KTCard } from "../../../../_metronic/helpers";
import { Content } from "../../../../_metronic/layout/components/content";
import ImageUploadController from "../../shared/components/contoller/ImageInput";

const validationSchema = Yup.object({
  personal_info: Yup.object({
    registration_number: Yup.string().required("Registration Number is required"),
    first_name: Yup.string().required("First Name is required"),
    middle_name: Yup.string().required("Middle Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .required("Phone is required")
      .matches(/^(?:\+91|91)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
    gender: Yup.string().required("Gender is required"),
    aadhar_number: Yup.string()
      .required("Aadhar is required")
      .matches(/^\d{12}$/, "Aadhar must be exactly 12 digits"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    admission_date: Yup.date().required("Admission Date is required"),
  }),
});

const capitalizeEachWord = (value: string): string => {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const EditPersonalInfo: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  return (
    <Content>
      <KTCard>
        <Formik
          initialValues={{
            personal_info: {
              registration_number: "",
              first_name: "",
              middle_name: "",
              last_name: "",
              email: "",
              phone_number: "",
              gender: "",
              aadhar_number: "",
              date_of_birth: "",
              admission_date: "",
              status: "active",
              image_url: imageUrl || "",
            },
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
            alert("Form submitted — UI only, no API connected.");
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit} className="w-70 mx-auto p-10">
              <div className="mb-4">
                <ImageUploadController onUpload={handleImageUpload} />
              </div>

              <div className="row mb-7">
                <div className="col-4">
                  <label className="required form-label mb-2">Registration Number</label>
                  <Field
                    type="text"
                    name="personal_info.registration_number"
                    className="form-control form-control-solid"
                  />
                  <ErrorMessage
                    name="personal_info.registration_number"
                    component="div"
                    className="text-danger mt-2"
                  />
                </div>
              </div>

              <div className="row mb-7">
                {["first_name", "middle_name", "last_name"].map((fieldKey, idx) => {
                  const label = fieldKey
                    .split("_")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ");
                  return (
                    <div className="col-4" key={idx}>
                      <label className="required form-label mb-2">{label}</label>
                      <Field name={`personal_info.${fieldKey}`}>
                        {({ field }: any) => (
                          <input
                            {...field}
                            type="text"
                            className="form-control form-control-solid"
                            onChange={(e) => {
                              const capitalized = capitalizeEachWord(e.target.value);
                              setFieldValue(`personal_info.${fieldKey}`, capitalized);
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name={`personal_info.${fieldKey}`}
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="row mb-7">
                <div className="col-4">
                  <label className="required form-label mb-2">Email</label>
                  <Field
                    type="email"
                    name="personal_info.email"
                    className="form-control form-control-solid"
                  />
                  <ErrorMessage name="personal_info.email" component="div" className="text-danger mt-2" />
                </div>
                <div className="col-4">
                  <label className="required form-label mb-2">Phone Number</label>
                  <Field
                    type="text"
                    name="personal_info.phone_number"
                    className="form-control form-control-solid"
                  />
                  <ErrorMessage name="personal_info.phone_number" component="div" className="text-danger mt-2" />
                </div>
                <div className="col-4">
                  <label className="required form-label mb-2">Gender</label>
                  <Field as="select" name="personal_info.gender" className="form-select form-select-solid">
                    <option value="" label="Select Gender" disabled />
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="personal_info.gender" component="div" className="text-danger mt-2" />
                </div>
              </div>

              <div className="row mb-7">
                <div className="col-4">
                  <label className="required form-label mb-2">Aadhar Number</label>
                  <Field
                    type="text"
                    name="personal_info.aadhar_number"
                    className="form-control form-control-solid"
                  />
                  <ErrorMessage name="personal_info.aadhar_number" component="div" className="text-danger mt-2" />
                </div>
                <div className="col-4">
                  <label className="required form-label mb-2">Date of Birth</label>
                  <Flatpickr
                    className="form-control form-control-solid"
                    value={values.personal_info.date_of_birth}
                    options={{ dateFormat: "Y-m-d" }}
                    onChange={(date) =>
                      setFieldValue("personal_info.date_of_birth", date[0]?.toLocaleDateString("en-CA"))
                    }
                  />
                  <ErrorMessage name="personal_info.date_of_birth" component="div" className="text-danger mt-2" />
                </div>
                <div className="col-4">
                  <label className="required form-label mb-2">Admission Date</label>
                  <Flatpickr
                    className="form-control form-control-solid"
                    value={values.personal_info.admission_date}
                    options={{ dateFormat: "Y-m-d" }}
                    onChange={(date) =>
                      setFieldValue("personal_info.admission_date", date[0]?.toLocaleDateString("en-CA"))
                    }
                  />
                  <ErrorMessage name="personal_info.admission_date" component="div" className="text-danger mt-2" />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-light mt-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary mt-2">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </KTCard>
    </Content>
  );
};

export { EditPersonalInfo };

