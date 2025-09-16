import { useNavigate } from "react-router-dom"
import { useListView } from "../../core/ListViewProvider"
import { KTIcon } from "../../../../../_metronic/helpers"

const CourtsFormHeader = () => {
    const navigate = useNavigate()
    const { setItemIdForUpdate, setAlertForDrawer } = useListView()

    const cancel = () => {
        navigate(`/visitors-management/visit`) // Navigate to the visits list page
        setItemIdForUpdate(undefined)
        setAlertForDrawer({
            alertType: undefined,
            alertHeading: undefined,
            alertMessage: undefined,
        })
    }

    return (
        <div className="card-header pe-5" id="kt_drawer_visit_form_header">
            <div className="card-title">
                <div className="d-flex justify-content-center flex-column me-3">
                    <span className="fs-4 fw-bolder text-gray-900 me-1 mb-2 lh-1">
                        Court
                    </span>
                </div>
            </div>
            <div className="card-toolbar">
                <div className="me-2">
                    <div
                        className="btn btn-sm btn-icon btn-active-light-primary"
                        id="kt_drawer_visit_close"
                        onClick={cancel}
                    >
                        <KTIcon iconName="cross" className="fs-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CourtsFormHeader }
