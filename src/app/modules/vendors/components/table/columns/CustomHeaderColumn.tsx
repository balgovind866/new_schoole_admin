import {flexRender , Header} from "@tanstack/react-table"
import { VendorViewModel } from "../../../core/_models"
import { FC } from "react";


type Props = {
    header:Header<VendorViewModel , unknown>;
}

const CustomHeaderColumn:FC<Props> = ({header}) => {
    return(
        <>
        {flexRender(header.column.columnDef.header,
            header.getContext() )}
        </>
    )
}

export default CustomHeaderColumn;