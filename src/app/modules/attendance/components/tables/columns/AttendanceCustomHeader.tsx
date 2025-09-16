import { HeaderContext } from "@tanstack/react-table"
import { AttendanceViewModel } from "../../../core/_model"
import { FC, useMemo } from "react"


import clsx from "clsx"
import { initialQueryState } from "../../../../../../_metronic/helpers"
import { useAttendanceQueryRequest } from "../../../core/AttendanceQueryRequestProvider"

type Props = {
    className?: string
    title?: string
    tableProps: HeaderContext<AttendanceViewModel, unknown>
}

const AttendanceCustomHeader: FC<Props> = ({ className, title, tableProps }) => {
    const id = tableProps.column.id
    const { state, updateState } = useAttendanceQueryRequest()

    const isSelectedForSorting = useMemo(() => {
        return state.sort && state.sort === id
    }, [state, id])

    const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

    const sortColumn = () => {
        if (id === 'actions' || id === 'selection') {
            return
        }

        if (!isSelectedForSorting) {
            updateState({ sort: id, order: 'asc', ...initialQueryState })
            return
        }

        if (isSelectedForSorting && order !== undefined) {
            if (order === 'asc') {
                updateState({ sort: id, order: 'desc', ...initialQueryState })
                return
            }

            updateState({ sort: undefined, order: undefined, ...initialQueryState })
        }
    }

    return (
        <td
            className={clsx(
                className,
                isSelectedForSorting && order !== undefined && `table-sort-${order}`
            )}
            style={{ cursor: 'pointer' }}
            onClick={sortColumn}
        >
            {title}
        </td>
    )
}

export { AttendanceCustomHeader }
