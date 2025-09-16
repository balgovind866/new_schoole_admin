import React, { useMemo } from 'react'
import { KTCardBody } from '../../../../../_metronic/helpers'
import SearchBar from '../../../../../_metronic/layout/components/searchbar/SearchBar'

// Dummy Components for UI
const StudentFilter = () => {
  return (
    <div className="d-flex gap-3">
      <select className="form-select form-select-sm w-auto">
        <option>Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <input type="date" className="form-control form-control-sm w-auto" placeholder="Admission Date" />
      <button className="btn btn-sm btn-light-primary">Export</button>
    </div>
  )
}

const StudentsListPagination = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div>Showing 1 to 10 of 50 entries</div>
      <ul className="pagination mb-0">
        <li className="page-item disabled">
          <span className="page-link">‹</span>
        </li>
        <li className="page-item active">
          <span className="page-link">1</span>
        </li>
        <li className="page-item">
          <span className="page-link">2</span>
        </li>
        <li className="page-item">
          <span className="page-link">›</span>
        </li>
      </ul>
    </div>
  )
}

const dummyStudents = [
  { name: 'John Doe', regNo: 'REG001', admissionDate: '2023-01-10', status: 'Active' },
  { name: 'Jane Smith', regNo: 'REG002', admissionDate: '2023-02-15', status: 'Inactive' },
  { name: 'Amit Kumar', regNo: 'REG003', admissionDate: '2023-03-20', status: 'Active' },
]

const StudentsTableUI: React.FC = () => {
  const columns = useMemo(
    () => ['Name', 'Registration No', 'Admission Date', 'Status', 'Actions'],
    []
  )

  return (
    <KTCardBody className="py-4">
      {/* Top Search + Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <SearchBar placeholder="Search report..." value="" onChange={() => {}} />
        <StudentFilter />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table align-middle table-row-dashed fs-6 gy-5">
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold">
            {dummyStudents.map((student, idx) => (
              <tr key={idx}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.admissionDate}</td>
                <td>
                  <span
                    className={`badge ${
                      student.status === 'Active' ? 'badge-light-success' : 'badge-light-danger'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-light-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-light-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <StudentsListPagination />
    </KTCardBody>
  )
}

export { StudentsTableUI }