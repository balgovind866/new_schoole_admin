import { DrawerComponent } from "../../../_metronic/assets/ts/components"


const DashboardToolbar = () => {

    // const { setItemIdForUpdate } = useListView()

    // Opens the dashboard drawer
    const openCreateDrawer = () => {
         //setItemIdForUpdate(undefined)

        const drawer = DrawerComponent.getInstance("kt_drawer_dashboard")
        drawer?.show()
    }

    return (
        <div className='d-flex align-items-center gap-2 gap-lg-3'>
            {/* <a
                href='#'
                onClick={openCreateDrawer}
                className='btn btn-sm fw-bold btn-primary'
            >
                Create Dashboard
            </a> */}

            
        </div>
    )
}

export { DashboardToolbar }
