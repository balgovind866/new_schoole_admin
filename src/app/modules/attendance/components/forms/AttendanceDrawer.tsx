import { FC } from "react"
import { AttendanceHeader } from "./AttendanceHeader"
import AttendanceFormWrapper from "./AttendanceFormWrapper"

const AttendanceDrawer: FC = () => {
    return (
        <div
            id='kt_drawer_attendance'
            className='bg-body'
            data-kt-drawer='true'
            data-kt-drawer-name='attendance'
            data-kt-drawer-activate='true'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'300px', 'md': '500px'}"
            data-kt-drawer-direction='end'
            data-kt-drawer-toggle='#kt_drawer_attendance_toggle'
            data-kt-drawer-close='#kt_drawer_attendance_close'
        >
            <div className='card w-100 rounded-0' id='kt_drawer_attendance_form'>
                <AttendanceHeader />
                <AttendanceFormWrapper />
            </div>
        </div>
    )
}

export { AttendanceDrawer }
