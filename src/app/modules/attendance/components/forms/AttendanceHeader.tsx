import { useNavigate } from "react-router-dom"
import { KTIcon } from "../../../../../_metronic/helpers"
import { useListView } from "../../core/ListViewProvider"

const AttendanceHeader = () => {
    const navigate = useNavigate()
    const { setItemIdForUpdate, setAlertForDrawer } = useListView()

    const cancel = () => {
        navigate(`/attendance/list`)
        setItemIdForUpdate(undefined)
        setAlertForDrawer({ alertType: undefined, alertHeading: undefined, alertMessage: undefined })
    }

    return (
        <div className='card-header pe-5' id='kt_drawer_attendance_form_header'>
            <div className='card-title'>
                <span className="fs-4 fw-bolder text-gray-900">Attendance Record</span>
            </div>
            <div className='card-toolbar'>
                <div className='btn btn-sm btn-icon btn-active-light-primary' id='kt_drawer_attendance_close' onClick={cancel}>
                    <KTIcon iconName='cross' className='fs-2' />
                </div>
            </div>
        </div>
    )
}

export { AttendanceHeader }
