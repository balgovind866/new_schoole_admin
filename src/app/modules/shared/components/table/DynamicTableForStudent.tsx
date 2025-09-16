import { FC } from "react";
import { KTIcon } from "../../../../../_metronic/helpers";

type TableProps = {
  data: { [key: string]: any }[]; // Array of student objects
  schema: { label: string; key: string }[]; // Defines table columns
  onDelete?: (id: string | number) => void;
  onEdit?: (row: { [key: string]: any }) => void;
  onSubmitAll?: (submittedData: { [key: string]: any }[]) => void;
  closeModal: () => void;
};

const DynamicTableForStudent: FC<TableProps> = ({
  data,
  schema,
  onDelete,
  onEdit,
  onSubmitAll,
  closeModal,
}) => {
  const handleSubmit = () => {
    if (onSubmitAll) {
      onSubmitAll(data);
      closeModal(); // Send all table data to the parent
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
        <thead>
          <tr>
            {schema.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            {onDelete && <th>Remove</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {schema.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.key] ?? "N/A"}</td>
                ))}
                {onDelete && (
                  <td>
                    {/* <button onClick={() => onDelete(row.aadharNumber)}>
                      🗑️
                    </button> */}

                    <button
                      onClick={() => onDelete(row.aadharNumber)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                )}
                {/* Actions Dropdown */}
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-active-light-primary btn-sm dropdown-toggle"
                      type="button"
                      id={`dropdownMenuButton-${index}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Actions
                      <KTIcon iconName="down" className="fs-5 m-0" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${index}`}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => onEdit && onEdit(row)}
                        >
                          <i className=" ki-duotone ki-pencil fs-3">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={schema.length + 2} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-primary"
        style={{ marginLeft: "80rem", width: "15rem", fontSize: "1.3rem" }}
        onClick={handleSubmit}
      >
        Submit Document
      </button>
    </div>
  );
};

export default DynamicTableForStudent;
