// import { useMemo, useState } from "react"
// import { useReactTable, Row, getCoreRowModel, getFilteredRowModel, ColumnDef } from '@tanstack/react-table'
// import { useQueryResponseData, useQueryResponseLoading } from "../../core/QueryResponseProvider"
// import { KTCardBody } from "../../../../../../_metronic/helpers"
// import { ListLoading } from "../../../../shared/components/ListLoading"
// import { OrganizationListPagination } from "../table/OrganizationListPagination"
// import { organizationsColumns } from "./columns/_columns"
// import { CustomHeaderColumn } from "./columns/CustomHeaderColumn"
// import { CustomRow } from "./columns/CustomRow"
// import SearchBar from "../../../../../../_metronic/layout/components/searchbar/SearchBar" // Assuming you have a SearchBar component
// import { OrganizationModel } from "../../core/_models"

// const OrganizationTable = () => {
//   const organizations = useQueryResponseData()
//   const isLoading = useQueryResponseLoading()
//   const [globalFilter, setGlobalFilter] = useState('')

//   // Memoize the data and columns
//   const data = useMemo(() => organizations, [organizations])
//   const columns: ColumnDef<OrganizationModel>[] = useMemo(() => organizationsColumns, [])

//   // React Table hook with global filtering
//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   })

//   return (
//     <KTCardBody className='py-4'>
//       {/* Search Bar */}
// <div className='d-flex justify-content-between align-items-center mb-4'>
//   <SearchBar
//     value={globalFilter}
//     onChange={setGlobalFilter}
//     placeholder='Search Report'
//   />

//     <a className="btn btn-light btn-active-light-primary btn-sm">
//       <i className=" ki-duotone ki-exit-up fs-3">
//         <span className="path1"></span>
//         <span className="path2"></span>
//       </i>
//     </a>
// </div>
//       <div className='table-responsive'>
//         <table
//           id='kt_table_organizations'
//           className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
//         >
//           <thead>
//             {table.getHeaderGroups().map((columnGroup) => (
//               <tr key={columnGroup.id} className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
//                 {columnGroup.headers.map((header) => (
//                   <CustomHeaderColumn key={header.id} header={header} />
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className='text-gray-600 fw-bold'>
//             {table.getRowModel().rows.length > 0 ? (
//               table.getRowModel().rows.map((row: Row<OrganizationModel>) => (
//                 <CustomRow key={row.id} row={row} />
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length}>
//                   <div className='d-flex text-center w-100 align-content-center justify-content-center'>
//                     No records found
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <OrganizationListPagination />

//       {/* Loading Spinner */}
//       {isLoading && <ListLoading />}
//     </KTCardBody>
//   )
// }

// export { OrganizationTable }
import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  ColumnDef,
} from '@tanstack/react-table'
import { KTCardBody } from '../../../../../../_metronic/helpers'
import { ListLoading } from '../../../../shared/components/ListLoading'
import { OrganizationListPagination } from '../table/OrganizationListPagination'
import { organizationsColumns } from './columns/_columns'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import SearchBar from '../../../../../../_metronic/layout/components/searchbar/SearchBar'
import { OrganizationModel } from '../../core/_models'

const OrganizationTable = () => {
  // Dummy Data
  const dummyOrganizations: OrganizationModel[] = [
    {
      organization_id: '1',
      category_name: 'Education',
      name: 'Open Learning Academy',
      created_at: '2023-01-15T08:00:00Z',
      updated_at: '2023-06-01T12:00:00Z',
    },
    {
      organization_id: '2',
      category_name: 'Healthcare',
      name: 'Health First Clinic',
      created_at: '2022-11-20T10:30:00Z',
      updated_at: '2023-04-10T14:45:00Z',
    },
    {
      organization_id: '3',
      category_name: 'Finance',
      name: 'Smart Finance Group',
      created_at: '2023-03-05T09:00:00Z',
      updated_at: '2023-05-22T17:30:00Z',
    },
  ]

  // You can toggle this to simulate loading
  const isLoading = false
  const [globalFilter, setGlobalFilter] = useState('')

  const data = useMemo(() => dummyOrganizations, [])
  const columns: ColumnDef<OrganizationModel>[] = useMemo(() => organizationsColumns, [])

  const table = useReactTable({
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
    <KTCardBody className='py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <SearchBar
          value={globalFilter}
          onChange={setGlobalFilter}
          placeholder='Search Report'
        />
        <a className='btn btn-light btn-active-light-primary btn-sm'>
          <i className='ki-duotone ki-exit-up fs-3'>
            <span className='path1'></span>
            <span className='path2'></span>
          </i>
        </a>
      </div>

      <div className='table-responsive'>
        <table
          id='kt_table_organizations'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            {table.getHeaderGroups().map((columnGroup) => (
              <tr
                key={columnGroup.id}
                className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'
              >
                {columnGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600 fw-bold'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row: Row<OrganizationModel>) => (
                <CustomRow key={row.id} row={row} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OrganizationListPagination />

      {isLoading && <ListLoading />}
    </KTCardBody>
  )
}

export { OrganizationTable }
