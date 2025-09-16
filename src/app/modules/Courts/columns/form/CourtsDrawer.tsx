import { FC } from "react"
import { CourtsFormHeader } from "./CourtsFormHeader"
import { CourtFormWrapper } from "./CourtFormWrapper"

const CourtsDrawer: FC = () => {
    return (
        <div
            id="kt_drawer_courts"
            className="bg-body"
            data-kt-drawer="true"
            data-kt-drawer-name="courts"
            data-kt-drawer-activate="true"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'300px', 'md': '500px'}"
            data-kt-drawer-direction="end"
            data-kt-drawer-toggle="#kt_drawer_courts_toggle"
            data-kt-drawer-close="#kt_drawer_courts_close"
        >
            <div className="card w-100 rounded-0" id="kt_drawer_courts_content">
                <CourtsFormHeader />
                <CourtFormWrapper />
            </div>
        </div>
    )
}

export default CourtsDrawer
