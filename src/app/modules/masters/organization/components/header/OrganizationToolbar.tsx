import { DrawerComponent } from "../../../../../../_metronic/assets/ts/components"
import { useListView } from "../../core/ListViewProvider"


const OrganizationToolbar = () => {

    const { setItemIdForUpdate } = useListView()

    const openCreateDrawer = () => {
        setItemIdForUpdate(undefined)

        const drawer = DrawerComponent.getInstance("kt_drawer_organization")
        drawer?.show()
    }

    return (
        <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <a
                href='#'
                onClick={openCreateDrawer}
                className='btn btn-sm fw-bold btn-primary'
            >
                Create
            </a>
        </div>
    )
}

export { OrganizationToolbar }
