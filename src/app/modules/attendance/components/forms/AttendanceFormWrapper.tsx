// import { isNotEmpty, QUERIES } from "../../../../.././_metronic/helpers";
// import { useListView } from "../../core/ListViewProvider";
// import { useEffect } from "react";
// import { useQueries } from "@tanstack/react-query";
// import { AttendanceModel, initialAttendanceModel } from "../../../attendance/core/_model.ts";
// import { getStudentClassOption } from "../../../students/core/_requests.ts";
// import { getAttendanceById } from "../../../attendance/core/_request.ts";
// import { AttendanceForm } from "./AttendanceForm.tsx";

// interface AttendanceFormWrapperProps {}

// const AttendanceFormWrapper: React.FC<AttendanceFormWrapperProps> = () => {
//   const { itemIdForUpdate } = useListView();
//   const enabledQuery = isNotEmpty(itemIdForUpdate);

//   useEffect(() => {
//     console.log("Component Mounted");
//     console.log("Current itemIdForUpdate:", itemIdForUpdate);
//   }, [itemIdForUpdate]);

//   const [attendanceQuery, studentOptionQuery] = useQueries({
//     queries: [
//       {
//         queryKey: [`${QUERIES.ATTENDANCE_URL}/${itemIdForUpdate}`],
//         queryFn: () => getAttendanceById(itemIdForUpdate),
//         enabled: enabledQuery,
//       },
//       {
//         queryKey: [`${QUERIES.STUDENT_OPTION_LIST}/all`],
//         queryFn: () => getStudentClassOption(),
//       },
//     ],
//   });

//   const { data: attendanceData, error: attendanceError, isLoading: attendanceLoading } = attendanceQuery;
//   const { data: studentOptionList, error: studentError, isLoading: studentLoading } = studentOptionQuery;

//   useEffect(() => {
//     console.log("Fetched attendanceData:", attendanceData);
//   }, [attendanceData]);

//   // Show loading if either query is loading
//   if (attendanceLoading || studentLoading) {
//     return <div>Loading attendance data...</div>;
//   }

//   // Show error if either query failed
//   if (attendanceError) {
//     return <div>Error loading attendance data.</div>;
//   }

//   if (studentError) {
//     return <div>Error loading student options.</div>;
//   }

//   // If no itemIdForUpdate, render form with initial model and student options loaded
//   if (!itemIdForUpdate && studentOptionList) {
//     return (
//       <AttendanceForm
//         isAttendanceLoading={false}
//         attendance={initialAttendanceModel}
//         studentOptions={studentOptionList.data} // pass student options to form for dropdown
//       />
//     );
//   }

//   // If editing existing attendance and data available, pass it down
//   if (attendanceData && studentOptionList) {
//     return (
//       <AttendanceForm
//         isAttendanceLoading={false}
//         attendance={attendanceData}
//         studentOptions={studentOptionList.data}
//       />
//     );
//   }

//   // Fallback UI
//   return <div>No data to display.</div>;
// };

// export { AttendanceFormWrapper };
import React from 'react'

const AttendanceFormWrapper = () => {
  return (
    <div>AttendanceFormWrapper</div>
  )
}

export default AttendanceFormWrapper