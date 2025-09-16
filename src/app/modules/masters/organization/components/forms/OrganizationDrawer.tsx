import { FC } from "react";
import { OrganizationFormHeader } from "./OrganizationFormHeader";
import { OrganizationFormWrapper } from "./OrganizationFormWrapper";

const OrganizationDrawer: FC = () => {
    return (
        <div
            id='kt_drawer_organization'
            className='bg-body'
            data-kt-drawer='true'
            data-kt-drawer-name='organization'
            data-kt-drawer-activate='true'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'80%'}"
            data-kt-drawer-direction='end'
            data-kt-drawer-toggle='#kt_drawer_organization_toggle'
            data-kt-drawer-close='#kt_drawer_organization_close'

        >
            <div className='card w-100 rounded-0' id='kt_drawer_organization_form'>
                <OrganizationFormHeader />
                <OrganizationFormWrapper />
            </div>
        </div>
    )
}

export { OrganizationDrawer }