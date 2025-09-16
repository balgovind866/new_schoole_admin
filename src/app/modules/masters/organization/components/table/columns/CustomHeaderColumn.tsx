import { flexRender, Header } from "@tanstack/react-table"
import { Organization } from "../../../core/_models"
import { FC } from "react"

type Props = {
    header: Header<Organization, unknown>
}

const CustomHeaderColumn: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export { CustomHeaderColumn }