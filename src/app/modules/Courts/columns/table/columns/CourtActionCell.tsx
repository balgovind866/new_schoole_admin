import { FC, useEffect } from "react"
import { useListView } from "../../../core/ListViewProvider"
import { DrawerComponent, MenuComponent } from "../../../../../../_metronic/assets/ts/components"
import { ID, KTIcon } from "../../../../../../_metronic/helpers"

type Props = {
  id: ID
}

const CourtActionCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditDrawer = () => {
    console.log("ID", id)
    setItemIdForUpdate(id)
    const drawer = DrawerComponent.getInstance("kt_drawer_courts")
    drawer?.show()
  }

  return (
    <>
      <a
        href="#"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        onClick={(e) => e.preventDefault()}
      >
        Actions
        <KTIcon iconName="down" className="fs-5 m-0" />
      </a>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-80px h-40px py-4 justify-content-center align-items-center"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); openEditDrawer() }}>
            <i className="ki-duotone ki-pencil fs-3">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export { CourtActionCell }
