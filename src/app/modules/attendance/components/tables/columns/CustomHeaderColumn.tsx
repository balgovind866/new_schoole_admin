import { flexRender, Header } from "@tanstack/react-table"
import { AttendanceViewModel } from "../../../core/_model"
import { FC } from "react"

type Props = {
    header: Header<AttendanceViewModel, unknown>
}

const CustomHeaderColumn: FC<Props> = ({ header }) => {
    return flexRender(
        header.column.columnDef.header,
        header.getContext()
    )
}

export default CustomHeaderColumn
