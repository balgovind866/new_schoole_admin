import { FC, useState, useEffect } from "react";

type TableProps = {
  studentId: string | number;
  data: { [key: string]: any }[];
  schema: { label: string; key: string }[];
  onDelete?: (studentId: string | number, parentId: string | number) => void;
  onEdit?: (index: number) => void;
};

const DynamicTable: FC<TableProps> = ({ studentId, data, schema, onDelete, onEdit }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleDelete = (parentId: string | number) => {
    if (!studentId || !parentId) {
      console.error("Invalid IDs:", { studentId, parentId });
      return;
    }
    if (onDelete) {
      onDelete(studentId, parentId);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
        <thead className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
          <tr className="border-bottom-2 border-gray-200">
            {schema.map((col, index) => (
              <th key={index} className="pt-7">
                <span>{col.label}</span>
              </th>
            ))}
            {onDelete && <th>Remove</th>}
            {onEdit && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, index) => (
              <tr key={index} className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                {schema.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.key]}</td>
                ))}
                {onDelete && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-icon btn-flex btn-active-light-danger"
                      onClick={() => {
                        if (row.parent_id) {
                          handleDelete(row.parent_id);
                        } else {
                          console.error("Missing parent_id in row:", row);
                        }
                      }}
                    >
                      <i className="ki-duotone ki-trash fs-3">
                        <span className="path1" />
                        <span className="path2" />
                        <span className="path3" />
                        <span className="path4" />
                        <span className="path5" />
                      </i>
                    </button>
                  </td>
                )}
                {onEdit && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-icon btn-flex btn-active-light-primary"
                      onClick={() => onEdit(index)}
                    >
                      <i className="ki-duotone ki-pencil fs-3">
                        <span className="path1" />
                        <span className="path2" />
                      </i>
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={schema.length + (onDelete ? 1 : 0) + (onEdit ? 1 : 0)}>
                <div className="d-flex text-center w-100 align-content-center justify-content-center">
                  No records found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
