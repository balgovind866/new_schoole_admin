// src/app/modules/attendance/core/_model.ts

export type AttendanceViewModel = {
    attendance_id?: number
    student_id?: string
    student_name?: string
    class_id?: string
    class_name?: string
    subject_id?: string
    subject_name?: string
    status?: string
    date?: string
  }
  
  export const initialAttendanceModel: AttendanceViewModel = {
    attendance_id: undefined,
    student_id: '',
    student_name: '',
    class_id: '',
    class_name: '',
    subject_id: '',
    subject_name: '',
    status: '',
    date: ''
  }
  