import { ColumnDef } from "@tanstack/react-table"
import { AttendanceCustomHeader } from "./AttendanceCustomHeader"
import { AttendanceActionsCell } from "./AttendanceActionsCell"
import { AttendanceViewModel } from "../../../core/_model"

const attendanceColumns: ColumnDef<AttendanceViewModel>[] = [

  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Student Class ID" className="min-w-125px" />,
    id: 'student_class_id',
    cell: (info) => <span>{info.row.original.student_class_id || "N/A"}</span>,
  },
  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Mode" className="min-w-125px" />,
    id: 'mode',
    cell: (info) => <span>{info.row.original.mode || "N/A"}</span>,
  },
  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Present/Absent" className="min-w-125px" />,
    id: 'present_absent',
    cell: (info) => <span>{info.row.original.present_absent ? "Present" : "Absent"}</span>,
  },
  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Captured At" className="min-w-150px" />,
    id: 'attendance_captured',
    cell: (info) => <span>{info.row.original.attendance_captured || "N/A"}</span>,
  },
  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Remarks" className="min-w-150px" />,
    id: 'remarks',
    cell: (info) => <span>{info.row.original.remarks || "N/A"}</span>,
  },
  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Status" className="min-w-125px" />,
    id: 'status',
    cell: (info) => <span>{info.row.original.status || "N/A"}</span>,
  },
  {
    header: (props) => <AttendanceCustomHeader tableProps={props} title="Actions" className="text-end min-w-100px" />,
    id: 'actions',
    cell: (info) => {
      const attendanceId = info.row.original.attendance_id ?? ""
      return <AttendanceActionsCell id={attendanceId.toString()} />
    },
  },
]

export { attendanceColumns }
