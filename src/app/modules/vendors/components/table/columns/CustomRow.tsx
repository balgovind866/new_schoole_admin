import { flexRender, Row } from "@tanstack/react-table"
import { FC } from "react";
import { VendorViewModel } from "../../../core/_models";
import clsx from "clsx";

type Props = {
    row :Row<VendorViewModel>;
}



const CustomRow: FC<Props> = ({row}) => (
    <tr>
        {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={clsx({
                'text-end min-w-100px':cell.column.id === 'actions',
              })}
            >
                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
        ))}
    </tr>
);

export {CustomRow}