import { useEffect, useMemo } from "react"
import { KTCardBody } from "../../../../../_metronic/helpers"
import { ListLoading } from "../../../shared/components/ListLoading"
import { VendorListPagination } from "./VendorListPagination"
import { getCoreRowModel, Row, useReactTable } from "@tanstack/react-table"
import { staffColumns } from "../../../staff/components/table/columns/StaffColumn"
import { useQueryResponseData, useQueryResponseLoading } from "../../core/QueryResponseProvider"
import CustomHeaderColumn from "./columns/CustomHeaderColumn"
import { VendorViewModel } from "../../core/_models"
import { CustomRow } from "./columns/CustomRow"


const VendorsTable = () => {
    const vendor = useQueryResponseData()

    // Check if data is loading
    const isLoading = useQueryResponseLoading()
  
    // Memoize the data and columns
    const data = useMemo(() => vendor, [vendor])
    const columns = useMemo(() => staffColumns, [])
  
    // Initialize the table with react-table
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
  
    useEffect(() => {
      console.log(table);
    }, [table])
    return(
        <KTCardBody className="mx-10 py-4">
            <div className='table-responsive'>
        <table
          id='kt_table_staff'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            {table.getHeaderGroups().map((columnGroup) => (
              <tr key={columnGroup.id} className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {columnGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr> 
            ))}
          </thead>
          <tbody className='text-gray-600 fw-bold'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<VendorViewModel>) => {
                return <CustomRow key={row.id} row={row} />
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <VendorListPagination /> {/* Make sure you have this pagination component */}
      {isLoading && <ListLoading />}
        </KTCardBody>
    )
}

export {VendorsTable}