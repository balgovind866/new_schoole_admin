import { useMemo, useState } from "react"
import {
    useReactTable,
    Row,
    getCoreRowModel,
    ColumnDef,
    getFilteredRowModel,
} from "@tanstack/react-table"

import { useQueryResponseData, useQueryResponseLoading } from "../../core/QueryResponseProvider"

import { CourtColumns } from "./columns/_columns"
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn"
import { CustomRow } from "./columns/CustomRow"

import { KTCardBody } from "../../../../../_metronic/helpers"
import SearchBar from "../../../../../_metronic/layout/components/searchbar/SearchBar"
import { ListLoading } from "../../../shared/components/ListLoading"
import { CourtModel } from "../../core/_model"
import { CourtsPagination } from "./CourtsPagination"

const CourtsTable = () => {
    const courtRecords = useQueryResponseData()
    const isLoading = useQueryResponseLoading()

    const [globalFilter, setGlobalFilter] = useState("")

    const data = useMemo(() => courtRecords as CourtModel[], [courtRecords])
    const columns: ColumnDef<CourtModel>[] = useMemo(() => CourtColumns, [])

    const table = useReactTable<CourtModel>({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <KTCardBody className="py-4">
            {/* Search and Export Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <SearchBar
                    value={globalFilter}
                    onChange={setGlobalFilter}
                    placeholder="Search Courts"
                />

                <a className="btn btn-light btn-active-light-primary btn-sm">
                    <i className="ki-duotone ki-exit-up fs-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                </a>
            </div>

            <div className="table-responsive">
                <table
                    id="kt_drawer_courts"
                    className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                >
                    <thead>
                        {table.getHeaderGroups().map((columnGroup) => (
                            <tr
                                key={columnGroup.id}
                                className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0"
                            >
                                {columnGroup.headers.map((header) => (
                                    <CustomHeaderColumn key={header.id} header={header} />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-gray-600 fw-bold">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row: Row<CourtModel>) => (
                                <CustomRow key={row.id} row={row} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className="d-flex text-center w-100 align-content-center justify-content-center">
                                        No Records Found
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <CourtsPagination />

            {/* Loading Spinner */}
            {isLoading && <ListLoading />}
        </KTCardBody>
    )
}

export { CourtsTable }
