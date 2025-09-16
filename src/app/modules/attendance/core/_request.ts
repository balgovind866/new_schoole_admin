import axios, { AxiosResponse } from "axios";
import { AttendanceModel, AttendanceQueryResponse } from "./_model";
import { ResponseModel } from "../../shared/models/_models";
import { ID, Response } from "../../../../_metronic/helpers";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
const ATTENDANCE_URL = `${API_URL}/attendance`;

// ✅ Toggle this to use mock API
const USE_MOCK_API = true;

// ✅ MOCKED GET LIST
const getAttendanceList = async (query: string): Promise<AttendanceQueryResponse> => {
  if (!USE_MOCK_API) {
    console.log(`Fetching: ${ATTENDANCE_URL}?${query}`);
    return axios
      .get(`${ATTENDANCE_URL}?${query}`)
      .then((res: AxiosResponse<AttendanceQueryResponse>) => res.data)
      .catch((err) => {
        console.error("Error fetching attendance list:", err);
        throw err;
      });
  }

  // Mocked response
  console.warn("⚠️ Using mock data for getAttendanceList");
  const mockData: AttendanceModel[] = [
    {
      attendance_id: 1,
      academic_year_id: "2025",
      class_id: "10",
      division_id: "A",
      student_id: "123",
      status: "present",
      date: "2025-04-29",
    },
    {
      attendance_id: 2,
      academic_year_id: "2025",
      class_id: "10",
      division_id: "A",
      student_id: "124",
      status: "absent",
      date: "2025-04-29",
    },
  ];

  return Promise.resolve({
    data: mockData,
    meta: {
      page: 1,
      items_per_page: 10,
      total: mockData.length,
    },
  });
};

// ✅ MOCKED GET BY ID
const getAttendanceById = async (id: ID): Promise<ResponseModel<AttendanceModel>> => {
  if (!USE_MOCK_API) {
    return axios
      .get(`${ATTENDANCE_URL}/${id}`)
      .then((res: AxiosResponse<Response<ResponseModel<AttendanceModel>>>) => res.data)
      .then((res: Response<ResponseModel<AttendanceModel>>) => res.data);
  }

  console.warn("⚠️ Using mock data for getAttendanceById");
  return Promise.resolve({
    attendance_id: Number(id),
    academic_year_id: "2025",
    class_id: "10",
    division_id: "A",
    student_id: "123",
    status: "present",
    date: "2025-04-29",
  });
};

// ✅ MOCKED CREATE
const createAttendance = async (
  attendance: AttendanceModel
): Promise<ResponseModel<AttendanceModel>> => {
  if (!USE_MOCK_API) {
    return axios
      .post(ATTENDANCE_URL, attendance)
      .then((res: AxiosResponse<Response<ResponseModel<AttendanceModel>>>) => res.data)
      .then((res: Response<ResponseModel<AttendanceModel>>) => res.data);
  }

  console.warn("⚠️ Simulated createAttendance — returning submitted data");
  return Promise.resolve(attendance);
};

// ✅ MOCKED UPDATE
const updateAttendance = async (
  attendance: AttendanceModel
): Promise<ResponseModel<AttendanceModel>> => {
  if (!USE_MOCK_API) {
    return axios
      .put(`${ATTENDANCE_URL}/${attendance.attendance_id}`, attendance)
      .then((res: AxiosResponse<Response<ResponseModel<AttendanceModel>>>) => res.data)
      .then((res: Response<ResponseModel<AttendanceModel>>) => res.data);
  }

  console.warn("⚠️ Simulated updateAttendance — returning updated data");
  return Promise.resolve(attendance);
};

const getStudentClassId = async (
  student_id: string,
  class_id: string,
  division_id: string
): Promise<string> => {
  if (!USE_MOCK_API) {
    try {
      const response = await axios.get(`${STUDENTS_URL}/student-class-id`, {
        params: { student_id, class_id, division_id },
      });
      // Assuming response.data = { student_class_id: string }
      return response.data.student_class_id;
    } catch (error) {
      console.error("Error fetching student_class_id:", error);
      throw error;
    }
  }

  console.warn("⚠️ Using mock data for getStudentClassId");
  // Mocked logic: generate a fake student_class_id combining inputs
  return Promise.resolve(`scid-${student_id}-${class_id}-${division_id}`);
};

export {
  getAttendanceList,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  getStudentClassId
};
