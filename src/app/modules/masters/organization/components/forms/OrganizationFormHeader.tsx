import { KTIcon } from "../../../../../../_metronic/helpers"
import { useListView } from "../../core/ListViewProvider"

const OrganizationFormHeader = () => {

    const { setItemIdForUpdate } = useListView()

    return (
        <div className='card-header pe-5' id='kt_drawer_organization_form_header'>
            <div className='card-title'>
                <div className='d-flex justify-content-center flex-column me-3'>
                    <span className="fs-4 fw-bolder text-gray-900 me-1 mb-2 lh-1">Organization</span>
                </div>
            </div>
            <div className='card-toolbar'>
                <div className='me-2'>
                    <div
                        className='btn btn-sm btn-icon btn-active-light-primary'
                        id='kt_drawer_organization_close'
                        onClick={() => setItemIdForUpdate(undefined)}>
                        <KTIcon iconName='cross' className='fs-2' />
                    </div>
                </div>
            </div>
        </div>
    )

}

export { OrganizationFormHeader }