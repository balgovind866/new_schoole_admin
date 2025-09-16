// import { FC, useEffect, useState } from "react";
// import Select from "react-select";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { formatISO } from "date-fns";

// import { getAcademicYearOption, getClassOption } from "../../../studentclass/core/_requests";
// import { getStudentClassOption } from "../../../students/core/_requests";
// import { AttendanceModel } from "../../core/_model";

// // Static dropdown options
// const modeOptions = [
//   { label: "Manual", value: "Manual" },
//   { label: "QR", value: "QR" },
//   { label: "Self", value: "Self" },
// ];

// const statusOptions = [
//   { label: "Active", value: "active" },
//   { label: "Inactive", value: "inactive" },
//   { label: "Suspended", value: "suspended" },
// ];

// const AttendanceForm: FC = () => {
//   const [yearOptions, setYearOptions] = useState<{ label: string; value: string }[]>([]);
//   const [classOptions, setClassOptions] = useState<{ label: string; value: string }[]>([]);
//   const [studentClassOptions, setStudentClassOptions] = useState<{ label: string; value: number }[]>([]);
//   const [loading, setLoading] = useState(false);

// const validationSchema = Yup.object({
//   academic_year_id: Yup.string()
//     .required("Academic year is required")
//     .min(1, "Please select a valid academic year"),

//   class_id: Yup.string()
//     .required("Class is required")
//     .min(1, "Please select a valid class"),

//   student_class_id: Yup.number()
//     .typeError("Student selection is required")
//     .moreThan(0, "Please select a student")
//     .required("Student is required"),

//   mode: Yup.string()
//     .oneOf(["Manual", "QR", "Self"], "Invalid mode selected")
//     .required("Mode is required"),

//   present_absent: Yup.boolean()
//     .required("Attendance status is required")
//     .typeError("Please select Present or Absent"),

//   attendance_captured: Yup.string()
//     .required("Date/time is required")
//     .test("valid-date", "Invalid date/time format", value => {
//       return !isNaN(Date.parse(value || ""));
//     }),

//   remarks: Yup.string()
//     .max(250, "Remarks cannot exceed 250 characters"),

//   status: Yup.string()
//     .oneOf(["active", "inactive", "suspended"], "Invalid status")
//     .required("Status is required"),
// });


//   const formik = useFormik<AttendanceModel>({
//     initialValues: {
//       academic_year_id: "",
//       class_id: "",
//       student_class_id: 0,
//       mode: "Manual",
//       present_absent: false,
//       attendance_captured: formatISO(new Date()),
//       remarks: "",
//       status: "active",
//     },
//     validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       setSubmitting(true);
//       console.log("Attendance form data:", values);

//       // TODO: Replace this with actual API call
//       alert("Attendance data submitted!");
//       resetForm();
//       setSubmitting(false);
//     },
//   });

//   // Load academic years and student classes
//   useEffect(() => {
//     setLoading(true);
//     Promise.all([getAcademicYearOption(), getStudentClassOption()])
//       .then(([years, studentClasses]) => {
//         setYearOptions(years.data?.data || []);
//         setStudentClassOptions(studentClasses.data || []);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   // Load classes when academic year changes
//   useEffect(() => {
//     if (formik.values.academic_year_id) {
//       setLoading(true);
//       getClassOption(formik.values.academic_year_id)
//         .then((res) => {
//           setClassOptions(res.data?.data || []);
//         })
//         .catch(console.error)
//         .finally(() => setLoading(false));
//     } else {
//       setClassOptions([]);
//       formik.setFieldValue("class_id", "");
//     }
//   }, [formik.values.academic_year_id]);

//   // Get academic year label
//   const academicYearLabel = yearOptions.find(y => y.value === formik.values.academic_year_id)?.label || formik.values.academic_year_id;

//   return (
//     <div className="card-body">
//       <form id="attendance_form" className="form" onSubmit={formik.handleSubmit} noValidate>

//         {/* Academic Year */}
//         <div className="fv-row mb-7">
//           <label className="required fs-5 fw-semibold mb-2">Academic Year</label>
//           <Select
//             options={yearOptions}
//             className="react-select-styled react-select-solid"
//             classNamePrefix="react-select"
//             placeholder="Select Academic Year"
//             value={yearOptions.find(o => o.value === formik.values.academic_year_id) || null}
//             onChange={(selected) => {
//               formik.setFieldValue("academic_year_id", selected?.value || "");
//               formik.setFieldValue("class_id", "");
//             }}
//             isDisabled={formik.isSubmitting || loading}
//           />
//           {formik.touched.academic_year_id && formik.errors.academic_year_id && (
//             <div className="text-danger">{formik.errors.academic_year_id}</div>
//           )}
//         </div>

//         {/* Class */}
//         <div className="fv-row mb-7">
//           <label className="required fs-5 fw-semibold mb-2">Class</label>
//           <Select
//             options={classOptions}
//             className="react-select-styled react-select-solid"
//             classNamePrefix="react-select"
//             placeholder="Select Class"
//             value={classOptions.find(o => o.value === formik.values.class_id) || null}
//             onChange={(selected) => {
//               formik.setFieldValue("class_id", selected?.value || "");
//             }}
//             isDisabled={!formik.values.academic_year_id || formik.isSubmitting || loading}
//           />
//           {formik.touched.class_id && formik.errors.class_id && (
//             <div className="text-danger">{formik.errors.class_id}</div>
//           )}
//         </div>

//         {/* Student */}
// <div className="fv-row mb-7">
//   <label className="required fs-5 fw-semibold mb-2">Student</label>
//   <Select
//     options={studentClassOptions} // Assuming studentClassOptions is set with data from API or static options
//     value={studentClassOptions.find(opt => opt.value === formik.values.student_class_id) || null}
//     onChange={(selected) => {
//       formik.setFieldValue("student_class_id", selected?.value || 0);
//     }}
//     placeholder="Select Student"
//     className="react-select-styled react-select-solid"
//     classNamePrefix="react-select"
//     isDisabled={formik.isSubmitting || loading}
//     isSearchable={true}  // Enables the search bar
//   />
//   {formik.touched.student_class_id && formik.errors.student_class_id && (
//     <div className="text-danger">{formik.errors.student_class_id}</div>
//   )}
// </div>


//         {/* Attendance Mode */}
//         <div className="fv-row mb-7">
//           <label className="required fs-5 fw-semibold mb-2">Attendance Mode</label>
//           <Select
//             options={modeOptions}
//             className="react-select-styled react-select-solid"
//             classNamePrefix="react-select"
//             placeholder="Select Mode"
//             value={modeOptions.find(o => o.value === formik.values.mode) || null}
//             onChange={selected => formik.setFieldValue("mode", selected?.value || "Manual")}
//             isDisabled={formik.isSubmitting || loading}
//           />
//           {formik.touched.mode && formik.errors.mode && (
//             <div className="text-danger">{formik.errors.mode}</div>
//           )}
//         </div>

//         {/* Present/Absent */}
//         <div className="fv-row mb-7">
//           <label className="required fs-5 fw-semibold mb-2">Attendance Status</label>
//           <Select
//             options={[
//               { label: "Present", value: true },
//               { label: "Absent", value: false },
//             ]}
//             className="react-select-styled react-select-solid"
//             classNamePrefix="react-select"
//             placeholder="Select Attendance Status"
//             value={
//               formik.values.present_absent
//                 ? { label: "Present", value: true }
//                 : { label: "Absent", value: false }
//             }
//             onChange={selected => formik.setFieldValue("present_absent", selected?.value || false)}
//             isDisabled={formik.isSubmitting || loading}
//           />
//           {formik.touched.present_absent && formik.errors.present_absent && (
//             <div className="text-danger">{formik.errors.present_absent}</div>
//           )}
//         </div>

//         {/* Attendance Captured */}
//         <div className="fv-row mb-7">
//           <label className="required fs-5 fw-semibold mb-2">Attendance Captured</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             value={formik.values.attendance_captured.slice(0, 16)}
//             onChange={e => {
//               const val = new Date(e.target.value).toISOString();
//               formik.setFieldValue("attendance_captured", val);
//             }}
//             disabled={formik.isSubmitting || loading}
//           />
//           {formik.touched.attendance_captured && formik.errors.attendance_captured && (
//             <div className="text-danger">{formik.errors.attendance_captured}</div>
//           )}
//         </div>

//         {/* Remarks */}
//         <div className="fv-row mb-7">
//           <label className="fs-5 fw-semibold mb-2">Remarks</label>
//           <textarea
//             className="form-control"
//             rows={3}
//             value={formik.values.remarks || ""}
//             onChange={e => formik.setFieldValue("remarks", e.target.value)}
//             disabled={formik.isSubmitting || loading}
//           />
//         </div>

//         {/* Status */}
//         <div className="fv-row mb-7">
//           <label className="required fs-5 fw-semibold mb-2">Status</label>
//           <Select
//             options={statusOptions}
//             className="react-select-styled react-select-solid"
//             classNamePrefix="react-select"
//             placeholder="Select Status"
//             value={statusOptions.find(o => o.value === formik.values.status) || null}
//             onChange={selected => formik.setFieldValue("status", selected?.value || "active")}
//             isDisabled={formik.isSubmitting || loading}
//           />
//           {formik.touched.status && formik.errors.status && (
//             <div className="text-danger">{formik.errors.status}</div>
//           )}
//         </div>

//         {/* Student Info Card */}
//         {formik.values.student_class_id !== 0 && (
//           <div className="border border-purple-500 rounded-lg p-4 mt-5 text-sm text-purple-400 bg-[#1e1e2f]">
//             <div className="mb-1">
//               Student Class ID: <span className="font-semibold text-white">{formik.values.student_class_id}</span>
//             </div>
//             <div>
//               Academic Year: <span className="font-semibold text-white">{academicYearLabel}</span>
//             </div>
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="pt-15">
//           <button
//             type="reset"
//             onClick={() => formik.resetForm()}
//             className="btn btn-light me-3"
//             disabled={formik.isSubmitting || loading}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={formik.isSubmitting || loading}
//           >
//             <span className="indicator-label">Submit</span>
//             {(formik.isSubmitting || loading) && (
//               <span className="indicator-progress">
//                 Please wait...
//                 <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//               </span>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export { AttendanceForm };
import React from 'react'

const AttendanceForm = () => {
  return (
    <div>AttendanceForm</div>
  )
}

export default AttendanceForm