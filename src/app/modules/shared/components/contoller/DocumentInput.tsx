import { FC, useState, useRef } from "react";
import DynamicTable from "../table/DynamicTable";
import { AlertManager } from "../../../shared/components/AlertManager"; // Ensure you adjust the import path accordingly
import { AlertType } from "../../../shared/models/_models"; // Adjust the import path if needed

// Define props type to accept onUpload prop
interface DocumentContollerProps {
  onUpload: (files: File[]) => void; // Define onUpload function to handle file uploads
}

const DocumentContoller: FC<DocumentContollerProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileList, setFileList] = useState<{ name: string; id: number | string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to track modal visibility
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: AlertType;
    headingText?: string;
  }>({
    show: false,
    message: "",
    type: "processing",
    headingText: "",
  });

  const supportedFileTypes = [
    "application/pdf",
    "text/plain",
    "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg", 
    "image/png",  
    "image/gif",  
    "image/bmp",  
    "image/svg+xml",
  ];

  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(
        (file) =>
          supportedFileTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
      );
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeletePreview = (idx: number) => {
    const updatedFiles = files.filter((_, index) => index !== idx);
    setFiles(updatedFiles);
  };

  const handleDelete = (id: string | number) => {
    const updatedFileList = fileList.filter((_, index) => index !== (Number(id)));
    setFileList(updatedFileList);
    const updatedFiles = files.filter((_, index) => index !== (Number(id)));
    setFiles(updatedFiles);
  };

  const handleSubmit = () => {
    // Show processing alert
    setAlert({
      show: true,
      message: "Processing your request...",
      type: "processing",
      headingText: "Please wait",
    });

    const newFileList = files.map((file, index) => ({
      name: file.name,
      id: fileList.length + index,
    }));

    // Simulate file submission (you can replace with your API call)
    setTimeout(() => {
      try {
        setFileList((prevList) => [...prevList, ...newFileList]);
        setFiles([]); // Clear the files after submission
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setIsModalOpen(false); // Close the modal after submission

        // Call onUpload to send files to parent
        onUpload(files); // Call the onUpload prop with the files

        // Show success alert
        setAlert({
          show: true,
          message: "Documents uploaded successfully!",
          type: "success",
          headingText: "Success",
        });

        // Automatically close the success alert after 3 seconds
        setTimeout(() => {
          setAlert((prevState) => ({
            ...prevState,
            show: false,
          }));
        }, 3000); // Close alert after 3 seconds

      } catch (error :any) {
        console.log(error , "error");
        // Show error alert
        setAlert({
          show: true,
          message: error.message || "Failed to upload documents.",
          type: "danger",
          headingText: "Error",
        });
      }
    }, 1500);
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState); // Toggle modal visibility
    setFiles([]); // Clear the file list when opening the modal
  };

  const schema = [
    { label: "File Name", key: "name" },
  ];

  return (
    <div className="container">
      <h6 className="p-2">Add Multiple Files</h6>

      {/* Button to open the modal */}
      <button
        onClick={toggleModal}
        type="button"
        className="btn btn-flex btn-primary my-2"
      >
        <i className="ki-duotone ki-folder-up fs-2">
          <span className="path1"></span>
          <span className="path2"></span>
        </i>
        {isModalOpen ? "Upload Files" : "Upload Files"}
      </button>

      {/* Overlay for background dimming */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent black
            zIndex: 1040,  // Place it below the modal
            pointerEvents: "all",  // Ensures overlay can receive events like clicks
          }}
          onClick={toggleModal}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            marginTop: "50px",
            zIndex: 1050,  // Ensures modal is above the overlay
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Documents</h5>
                <div
                  className="btn btn-icon btn-sm btn-active-icon-primary"
                  data-bs-dismiss="modal"
                  onClick={toggleModal}
                >
                  <i className="ki-duotone ki-cross fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                  </i>
                </div>
              </div>
              <div className="modal-body">
                <div className="my-2">
                  {/* Trigger file input */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-primary"
                  >
                    Attach Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="form-control"
                    style={{ display: "none" }}  // Hidden file input
                  />
                </div>
                <span className="text-danger mt-2">Max file size is 1MB per file.</span>
                <div className="my-2">
                  {files.length > 0 && (
                    <div>
                      <h5>Selected Files:</h5>
                      <ul className="list-group file-list-container" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {files.map((file, index) => (
                          <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <span>{file.name}</span>
                            <button
                              onClick={() => handleDeletePreview(index)}
                              className="btn btn-danger btn-sm"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="my-4">
                  <button
                  type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    disabled={files.length === 0}
                  >
                    Submit Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display the alert */}
      <div style={{ position: "fixed", top: "80px", right: "20px", zIndex: 9999 }}>
        {alert.show && (
          <AlertManager
            message={alert.message}
            type={alert.type}
            headingText={alert.headingText}
          />
        )}
      </div>

      <div className="my-4">
        <DynamicTable
          data={fileList}
          schema={schema}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DocumentContoller;
