import { HeaderContext } from "@tanstack/react-table";
import { VendorViewModel } from "../../../core/_models";
import { FC, useMemo } from "react";
import clsx from "clsx";
import { useVendorQueryRequest } from "../../../core/VendorQueryRequestProvider";
import { initialQueryState } from "../../../../../../_metronic/helpers";


type Props = {
    className?: string;
    title?: string;
    tableProps: HeaderContext<VendorViewModel , unknown>;
}

const VendorCustomHeader : FC<Props> = ({className , title , tableProps})  => {
    const id = tableProps.column.id;
    const { state , updateState} = useVendorQueryRequest();

    const isSelectedForSorting = useMemo(() => {
         return state.sort && state.sort === id;
    } , [state , id])

    const order: 'asc' | 'desc' | undefined = useMemo(() => state.order , [state])
    
    const sortColumn = () => {
        if(id === 'actions' || id === 'selection') {
            return;
        }
        if(!isSelectedForSorting){
            updateState({sort: id , order: 'asc' , ...initialQueryState});
            return;
        }
        if(isSelectedForSorting && order !== undefined) {
            if(order === 'asc') {
                updateState({sort: id , order: 'desc'  , ...initialQueryState});
                return;
            }
            updateState({sort: id , order: 'desc' , ...initialQueryState})
        }
    }


    return(
        <>
          <th
                    className={clsx(
                        className,
                        isSelectedForSorting && order !== undefined && `table-sort-${order}`
                    )}
                    style={{ cursor: 'pointer' }}
                    onClick={sortColumn}
                >
                    {title}
                </th>
        </>
    )
}

export {VendorCustomHeader}