import { FC, useEffect } from "react"
import { ID, KTIcon } from "../../../../../../_metronic/helpers"
import { useNavigate } from "react-router-dom"
import { MenuComponent } from "../../../../../../_metronic/assets/ts/components"




type Props = {
    id:ID
}

const VendorActionsCell: FC<Props> = ({id}) => {
    const navigate = useNavigate();

    useEffect(() => {
        MenuComponent.reinitialization();
    } , [])

    const handleEdit = () => {
        navigate(`/vendor/view/${id}`)
    }

    return(
        <>
        <a
                href="#"
                className="btn btn-light btn-active-light-primary btn-sm"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
            >
                Actions
                <KTIcon iconName="down" className="fs-5 m-0" />
            </a>
            {/* begin::Menu */}
            <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                data-kt-menu="true"
            >
                {/* begin::Menu item */}
                <div className="menu-item px-3">
                    <a
                        className="menu-link px-3"
                        onClick={handleEdit}
                        style={{ cursor: "pointer" }}
                    >
                        <i className=" ki-duotone ki-pencil fs-3">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      </i>
                    </a>
                </div>
                {/* end::Menu item */}
            </div>
        </>
    )

}

export {VendorActionsCell}