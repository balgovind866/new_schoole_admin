// ./steps/DocumentsInfo.tsx
import React from "react";

interface Props {
  studentId: number;
  onUpload: () => void;
}

export const DocumentInfo: React.FC<Props> = ({ studentId, onUpload }) => {
  return (
    <>
      <h4 className="mb-5">Document Upload</h4>
      <input type="file" className="form-control" multiple />
      <div className="mt-3">
        <button type="button" className="btn btn-sm btn-primary" onClick={onUpload}>
          Upload
        </button>
      </div>
    </>
  );
};
