
import { DrawerComponent } from "../../../../../_metronic/assets/ts/components"
import { useListView } from "../../core/ListViewProvider"

const CourtsTollbar = () => {
  const { setItemIdForUpdate } = useListView()

  const openCreateDrawer = () => {
    setItemIdForUpdate(undefined)

    const drawer = DrawerComponent.getInstance("kt_drawer_courts")
    drawer?.show()
  }

  return (
    <div className="d-flex align-items-center gap-2 gap-lg-3 flex-wrap">
      {/* Create button */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          openCreateDrawer()
        }}
        className="btn btn-sm fw-bold btn-primary"
      >
        Create
      </a>
    </div>
  )
}

export { CourtsTollbar }

