import { FC, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { StudentViewModel } from "../../../../modules/studentfileupload/_models.tsx";
import DropzoneModal from "../../../../../app/modules/Dropzone/reactdropzone";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { OptionListResponse } from "../../models/_models.ts";
import { getAcademicYearOption, getClassOption } from "../../../studentclass/core/_requests.ts";
import { CustomHeaderColumn } from "../../../studentfileupload/CustomHeaderColumn.tsx";
import { CustomRow } from "../../../studentfileupload/CustomRow.tsx";
import { KTCardBody } from "../../../../../_metronic/helpers/index.ts";
import { useReactTable, Row, getCoreRowModel } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { studentssColumns } from "../../../studentfileupload/_columns.tsx";

interface ExportToExcelProps {
  submittedData: StudentViewModel[];
  setSubmittedData: React.Dispatch<React.SetStateAction<StudentViewModel[]>>;
}

const ExportToExcel: FC<ExportToExcelProps> = ({ submittedData, setSubmittedData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [academicOptions, setAcademicOptions] = useState<OptionListResponse | null>(null);
  const [classOptions, setClassOptions] = useState<OptionListResponse | null>(null);
  const [classOptionsFetched, setClassOptionsFetched] = useState(false);

  const data = useMemo(() => submittedData, [submittedData]);
  const columns = useMemo(() => studentssColumns, []);
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const validationSchema = Yup.object({
    academic_year_id: Yup.string().required("Academic Year is required"),
    class_id: Yup.string().required("Class is required"),
  });

  useEffect(() => {
    // Fetch academic year options when component mounts
    getAcademicYearOption().then(setAcademicOptions).catch(console.error);
  }, []);

  // Read Excel file and map data
  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: true });

      const mappedData: StudentViewModel[] = parsedData.map((row) => {
        const rollNoKey = Object.keys(row).find((key) => key.trim().toLowerCase() === "roll no");

        return {
          gr_number: row["GR Number"] || "",
          student_name: row["Student Name"] || "",
          roll_no: rollNoKey ? Number(row[rollNoKey]) || 0 : 0,
        };
      });

      setSubmittedData(mappedData);
      closeModal();
    };
  };

  const closeModal = () => setIsModalOpen(false);

  const formik = useFormik({
    initialValues: {
      academic_year_id: "",
      class_id: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
    
      // Transform student data to the required format
      const transformedStudents = submittedData.map(student => ({
        student_id: student.gr_number,
        class_id: Number(values.class_id),
        roll_number: student.roll_no
      }));
    
      // Include academic_year_id and class_id in the main submission object
      const dataToSubmit = {
        academic_year_id: Number(values.academic_year_id),
        class_id: Number(values.class_id),
        students: transformedStudents
      };
    
      console.log("Bulk Upload :", {students: transformedStudents});
      console.log("Data to submit:", dataToSubmit);
    
      formik.resetForm(); // resets academic_year_id & class_id
      setSubmittedData([]);
      setClassOptions(null);
      setClassOptionsFetched(false);
    
      setSubmitting(false);
    }
  });

  useEffect(() => {
    const yearId = formik.values.academic_year_id;

    if (yearId && !classOptionsFetched) {
      getClassOption(yearId)
        .then(data => {
          setClassOptions(data);
          setClassOptionsFetched(true);
        })
        .catch(console.error);
    } else if (!yearId) {
      setClassOptions(null);
      setClassOptionsFetched(false);
    }
  }, [formik.values.academic_year_id, classOptionsFetched]);

  // Reset classOptionsFetched when academic year changes
  useEffect(() => {
    if (formik.values.academic_year_id) {
      setClassOptionsFetched(false);
    }
  }, [formik.values.academic_year_id]);

  return (
    <div className="w-100" style={{ padding: "20px" }}>
      <h4 className="text-start mb-4">Student Class Enrollment </h4>
      <form id="class_form" className="form" onSubmit={formik.handleSubmit} noValidate>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="required fs-5 fw-semibold mb-2">Academic Year</label>
            <Select
              options={academicOptions?.data?.data || []}
              value={academicOptions?.data?.data?.find((option) => option.value === formik.values.academic_year_id) || null}
              onChange={(selectedOption) => {
                formik.setFieldValue("academic_year_id", selectedOption?.value || "");
                // Reset class_id when academic year changes
                formik.setFieldValue("class_id", "");
                setClassOptionsFetched(false);
              }}
              className="react-select-styled react-select-solid"
              classNamePrefix="react-select"
              placeholder="Select an Academic Year"
              isDisabled={formik.isSubmitting}
            />
            {formik.touched.academic_year_id && formik.errors.academic_year_id && (
              <div className="fv-plugins-message-container">
                <span className="fv-help-block">{formik.errors.academic_year_id}</span>
              </div>
            )}
          </div>

          <div className="col-md-6 mb-4">
            <label className="required fs-5 fw-semibold mb-2">Class</label>
            <Select
              options={classOptions?.data?.data || []}
              className="react-select-styled react-select-solid"
              classNamePrefix="react-select"
              placeholder="Select a Class"
              value={classOptions?.data?.data?.find((option) => option.value === formik.values.class_id) || null}
              onChange={(selectedOption) =>
                formik.setFieldValue("class_id", selectedOption?.value || "")
              }
              isDisabled={formik.isSubmitting || !formik.values.academic_year_id}
            />
            {formik.touched.class_id && formik.errors.class_id && (
              <div className="fv-plugins-message-container">
                <span className="fv-help-block">{formik.errors.class_id}</span>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            disabled={
              !formik.values.academic_year_id ||
              !formik.values.class_id
            }
          >
            Upload Excel File
          </button>

          <section>
            {submittedData.length > 0 && (
              <div className="card m-4">
                <KTCardBody className="py-4">
                  <div className="table-responsive">
                    <table
                      id="kt_table_users"
                      className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                    >
                      <thead>
                        {table.getHeaderGroups().map((columnGroup) => (
                          <tr
                            key={columnGroup.id}
                            className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0"
                          >
                            {columnGroup.headers.map((header) => (
                              <CustomHeaderColumn key={header.id} header={header} />
                            ))}
                          </tr>
                        ))}
                      </thead>

                      <tbody className="text-gray-600 fw-bold">
                        {table.getRowModel().rows.length > 0 ? (
                          table.getRowModel().rows.map((row: Row<StudentViewModel>) => (
                            <CustomRow
                              key={row.id}
                              row={row}
                              onRemove={() =>
                                setSubmittedData((prev) =>
                                  prev.filter(
                                    (student) => student.gr_number !== row.original.gr_number
                                  )
                                )
                              }
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan={columns.length}>
                              <div className="d-flex text-center w-100 align-content-center justify-content-center">
                                No records found
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </KTCardBody>
              </div>
            )}
          </section>

          {submittedData.length > 0 && (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
        </div>
      </form>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropzoneModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onFileUpload={readExcel}
            studentData={submittedData}
            setSubmittedData={setSubmittedData}
          />
        </div>
      )}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-light" onClick={() => navigate("/studentclass")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExportToExcel;