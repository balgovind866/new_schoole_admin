import clsx from "clsx"
import { flexRender, Row } from "@tanstack/react-table"
import { FC } from "react"
import { CourtModel } from "../../../core/_model"

type Props = {
    row: Row<CourtModel>
}

const CustomRow: FC<Props> = ({ row }) => (
    <tr>
        {row.getVisibleCells().map((cell) => {
            return (
                <td
                    key={cell.id}
                    className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            )
        })}
    </tr>
)

export { CustomRow }