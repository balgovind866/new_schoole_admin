import { flexRender, Header } from "@tanstack/react-table"
import { FC } from "react"
import { CourtModel } from "../../../core/_model"

type Props = {
    header: Header<CourtModel, unknown>
}

const CustomHeaderColumn: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export { CustomHeaderColumn }