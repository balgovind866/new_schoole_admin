import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { attendanceColumns } from './columns/AttendanceColumn'
import { KTCardBody } from '../../../../../_metronic/helpers'
import { AttendanceModel } from '../../core/_model'
import CustomHeaderColumn from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import SearchBar from '../../../../../_metronic/layout/components/searchbar/SearchBar'
import { AttendanceListPagination } from './AttendanceListPagination'
import AttendanceForm from '../forms/AttendanceForm'

const AttendanceTable = () => {
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceModel | null>(null)
  const [searchText, setSearchText] = useState('')

  const attendance = useMemo<AttendanceModel[]>(() => [
    {
      attendance_id: 1,
      student_class_id: 101,
      mode: 'Manual',
      present_absent: true,
      attendance_captured: '2025-05-01T09:00:00Z',
      remarks: 'On time',
      status: 'active',
      academic_year_id: 2024,
      class_name: 'Class 1A',
      student_name: 'John Doe',
    },
    {
      attendance_id: 2,
      student_class_id: 102,
      mode: 'QR',
      present_absent: false,
      attendance_captured: '2025-05-01T09:05:00Z',
      remarks: 'Was sick',
      status: 'active',
      academic_year_id: 2024,
      class_name: 'Class 2B',
      student_name: 'Jane Smith',
    },
    // Add more dummy records if needed
  ], [])

  const columns = useMemo(() => attendanceColumns, [])

  // ✅ Filter specific fields only
  const filteredData = useMemo(() => {
  if (!searchText) return attendance

  return attendance.filter((row) => {
    const presentAbsentText = row.present_absent ? 'present' : 'absent'

    const searchableFields = [
      row.student_name,
      row.class_name,
      row.remarks,
      row.mode,
      row.status,
      String(row.student_class_id),
      presentAbsentText,
      new Date(row.attendance_captured).toLocaleString(),
    ]

    return searchableFields.some((field) =>
      String(field || '').toLowerCase().includes(searchText.toLowerCase())
    )
  })
}, [attendance, searchText])

  const table = useReactTable<AttendanceModel>({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleEditClick = (attendanceItem: AttendanceModel) => {
    setSelectedAttendance(attendanceItem)
  }

  const handleCancel = () => {
    setSelectedAttendance(null)
  }

  return (
    <KTCardBody className='py-4'>
      {/* Search Bar */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder='Search Attendance'
        />
        <a className='btn btn-light btn-active-light-primary btn-sm'>
          <i className='ki-duotone ki-exit-up fs-3'>
            <span className='path1'></span>
            <span className='path2'></span>
          </i>
        </a>
      </div>

      {/* Attendance Table */}
      <div className='table-responsive'>
        <table
          id='kt_table_attendance'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'
              >
                {headerGroup.headers.map((header) => (
                  <CustomHeaderColumn key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600 fw-bold'>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <CustomRow
                  key={row.id}
                  row={row}
                  onEdit={() => handleEditClick(row.original)}
                />
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

      <AttendanceListPagination />

      {/* Edit Form */}
      {selectedAttendance && (
        <AttendanceForm
          attendance={selectedAttendance}
          onCancel={handleCancel}
        />
      )}
    </KTCardBody>
  )
}

export { AttendanceTable }
