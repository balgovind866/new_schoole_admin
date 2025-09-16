import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useThemeMode } from '../../../_metronic/partials';

interface DropzoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  studentData: any[];
  setSubmittedData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DropzoneModals: React.FC<DropzoneModalProps> = ({
  isOpen,
  onClose,
  onFileUpload,
  studentData,
  setSubmittedData,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { mode } = useThemeMode(); // 'light' | 'dark' | 'system'

  const isDark = mode === 'dark';

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
  });

  const handleSubmit = () => {
    if (studentData.length > 0) {
      setSubmittedData(studentData);
      setFiles([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        padding: 20,
        border: '1px solid #ccc',
        width: 400,
        margin: '20px auto',
        backgroundColor: isDark ? '#1e1e2f' : '#fff',
        color: isDark ? '#f1f1f1' : '#000',
        borderRadius: 8,
        boxShadow: isDark
          ? '0 0 12px rgba(255, 255, 255, 0.1)'
          : '0 0 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3>Upload Excel Files</h3>

      <a
        href="/statics/StudentClassMapping.xlsx"
        download="StudentClassMapping.xlsx"
        style={{
          display: 'block',
          marginBottom: 10,
          color: isDark ? '#4fc3f7' : '#1976d2',
        }}
      >
        Download Excel Template
      </a>

      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDark ? '#aaa' : '#888'}`,
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDark ? '#2c2c3c' : '#f9f9f9',
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop Excel files here, or click to select files</p>
      </div>

      <div style={{ marginTop: 10 }}>
        {files.map((file) => (
          <div
            key={file.name}
            style={{
              padding: 10,
              border: `1px solid ${isDark ? '#555' : '#ddd'}`,
              marginTop: 5,
              backgroundColor: isDark ? '#2a2a3a' : '#fff',
              color: isDark ? '#fff' : '#000',
            }}
          >
            {file.name}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <button
          onClick={onClose}
          style={{
            marginRight: 10,
            padding: '6px 12px',
            backgroundColor: isDark ? '#555' : '#eee',
            color: isDark ? '#fff' : '#000',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        {studentData.length > 0 && (
          <button
            onClick={handleSubmit}
            style={{
              padding: '6px 12px',
              backgroundColor: isDark ? '#2196f3' : '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default DropzoneModals;
