// Import ID and Response types
import { ID, Response } from "../../../../_metronic/helpers"

// 1. Core Attendance Table Model (Based only on image columns)
export type AttendanceModel = {
  class_name: any
  student_name: any
  academic_year_id: any
  attendance_id?: ID
  student_class_id: number
  mode: 'Manual' | 'QR' | 'Self'
  present_absent: boolean
  attendance_captured: string // ISO string format for date-time
  remarks?: string
  status?: 'active' | 'inactive' | 'suspended'
  created_at?: string
  updated_at?: string
}

// 2. API Response Wrapper for Attendance List
export type AttendanceQueryResponse = Response<Array<AttendanceModel>>

// 3. Initial Model for Form States or New Entries
export const initialAttendanceModel: AttendanceModel = {
  attendance_id: undefined,
  student_class_id: 0,
  mode: 'Manual',
  present_absent: false,
  attendance_captured: '',
  remarks: '',
  status: 'active',
  created_at: undefined,
  updated_at: undefined,
  academic_year_id: undefined,
  class_name: undefined,
  student_name: undefined
}
