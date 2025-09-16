import { useEffect, useState } from "react";
import { KTCard } from "../../../../../_metronic/helpers";
import { getClassOption } from "../../../academic/class/core/_requests";
import { OptionListResponse } from "../../models/_models";
import Select from "react-select";
import { getDivisionOption } from "../../../academic/division/core/_requests";
import { useFormik } from "formik";
import * as Yup from 'yup';

// Initial values for the form
const classForEdit = {
  class_id: null,  // Assuming class_id is initially null
  division_id: null,  // Assuming division_id is initially null
};

// Validation schema using Yup
const classSchema = Yup.object({
  class_id: Yup.string().required('Class is required'),  // Ensures class_id is selected
  division_id: Yup.string().required('Division is required'),  // Ensures division_id is selected
});

// Define the type for student data
interface Student {
  student_class_id: number;
  class_id: number;
  division_id?: number;
  student_id: number;
  roll_number: number;
  student_name: string;
  division_name: string;
}

const GetClassAndDivisionStudent = () => {
  const [classIdOption, setClassIdOptions] = useState<OptionListResponse | null>(null);
  const [divisionOptions, setDivisionOptions] = useState<OptionListResponse | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);

  // Sample student data (replace with your API data)
  const studentJsonData: Student[] = [
    { student_class_id: 12, class_id: 2, student_id: 18, roll_number: 123, student_name: "abhishek ramant yadav", division_name: "A", division_id: 1 },
    { student_class_id: 22, class_id: 2, student_id: 18, roll_number: 1, student_name: "abhishek2 ramant yadav", division_name: "A", division_id: 1 },
    { student_class_id: 33, class_id: 2, student_id: 19, roll_number: 2, student_name: "rohan1 karan pal", division_name: "A", division_id: 1 },
    { student_class_id: 11, class_id: 2, student_id: 20, roll_number: 11, student_name: "rohan2 karan pal", division_name: "A", division_id: 1 },
    { student_class_id: 34, class_id: 2, student_id: 19, roll_number: 3, student_name: "rohan3 karan pal", division_name: "A", division_id: 1 },
    { student_class_id: 13, class_id: 2, student_id: 15, roll_number: 9, student_name: "Karan123 kumar Patel", division_name: "A", division_id: 1 },
    { student_class_id: 35, class_id: 2, student_id: 19, roll_number: 4, student_name: "rohan4 karan pal", division_name: "A", division_id: 1 },
  ];

  useEffect(() => {
    console.log("Fetching class and division options...");
    // Fetch class and division options
    getClassOption()
      .then((data) => {
        console.log("Class options loaded:", data);
        setClassIdOptions(data);
      })
      .catch((error) => console.error("Error fetching class options:", error));

    getDivisionOption()
      .then((data) => {
        console.log("Division options loaded:", data);
        setDivisionOptions(data);
      })
      .catch((error) => console.error("Error fetching division options:", error));

    // Initially set the student data
    setStudentData(studentJsonData);
  }, []);

  const formik = useFormik({
    initialValues: classForEdit,
    validationSchema: classSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);
      setSubmitting(true);

      const { class_id, division_id } = values;
      console.log("Filtering students with class_id:", class_id, "and division_id:", division_id);

      const filteredStudents = studentData.filter((student) => {
        console.log('Comparing:', class_id, student.class_id, division_id, student.division_id);  // Debug log
        const matchesClass = class_id ? student.class_id === parseInt(class_id) : true;
        const matchesDivision = division_id ? student.division_id === parseInt(division_id) : true;  // Corrected here
        return matchesClass && matchesDivision;
      });

      console.log("Filtered students:", filteredStudents);
      setFilteredData(filteredStudents);

      setSubmitting(false);
    },
  });

  const clearForm = () => {
    formik.resetForm();  // Reset form values to initial values
    setFilteredData([]); // Clear the displayed student data
  };

  return (
    <KTCard className="my-5">
      <form id='organization_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className="row fv-row mb-7 m-2">
          <div className="col-4">
            <label className="required fs-5 fw-semibold mb-2">Class Id</label>
            <Select
              options={classIdOption?.data || []}
              className="react-select-styled react-select-solid"
              classNamePrefix="react-select"
              placeholder="Select a class"
              value={classIdOption?.data?.find((option) => option.value === formik.values.class_id) || null}
              onChange={(selectedOption) => {
                console.log("Class selected:", selectedOption);
                formik.setFieldValue("class_id", selectedOption?.value || null);
              }}
              isDisabled={formik.isSubmitting}
            />
            {formik.touched.class_id && formik.errors.class_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span>{formik.errors.class_id}</span>
                </div>
              </div>
            )}
          </div>

          <div className="col-4">
            <label className="required fs-5 fw-semibold mb-2">Division</label>
            <Select
              options={divisionOptions?.data || []}
              className="react-select-styled react-select-solid"
              classNamePrefix="react-select"
              placeholder="Select a division"
              value={divisionOptions?.data?.find((option) => option.value === formik.values.division_id) || null}
              onChange={(selectedOption) => {
                console.log("Division selected:", selectedOption);
                formik.setFieldValue("division_id", selectedOption?.value || null);
              }}
              isDisabled={formik.isSubmitting}
            />
            {formik.touched.division_id && formik.errors.division_id && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span>{formik.errors.division_id}</span>
                </div>
              </div>
            )}
          </div>

          <div className="col-4 py-10">
            <button
              type="reset"
              onClick={() => clearForm()}
              className="btn btn-light me-3"
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              <span className="indicator-label">Submit</span>
              {formik.isSubmitting && (
                <span className="indicator-progress">
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Display filtered students in a table (DataGrid) */}
      {filteredData.length > 0 && (
        <div className="student-table mx-5">
          <h3>Filtered Students</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Division</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.sort((a, b) => a.roll_number - b.roll_number).map((student) => (
                <tr key={`${student.student_id}-${student.roll_number}`}>
                  <td>{student.roll_number}</td>
                  <td>{student.student_name}</td>
                  <td>{student.class_id}</td>
                  <td>{student.division_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </KTCard>
  );
};

export { GetClassAndDivisionStudent };
