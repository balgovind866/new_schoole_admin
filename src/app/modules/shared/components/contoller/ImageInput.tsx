import React, { FC, useState, useRef } from 'react';
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

interface ImageUploadProps {
  onUpload: (file: File) => void; 
}

const ImageUploadController: FC<ImageUploadProps> = ({ onUpload }) => {
  const [avatar, setAvatar] = useState<File | null>(null); 
  const [preview, setPreview] = useState<string>(toAbsoluteUrl('media/avatars/blank.png'));
  const [error, setError] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); 

  const fileInputRef = useRef<HTMLInputElement>(null); 

  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) { 
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      setError('');
      setPreview(URL.createObjectURL(file)); 
      setAvatar(file); 
      onUpload(file);
      await uploadImage(file);
    }
  };


  const uploadImage = async (file: File) => {
    setLoading(true);
    setUploadSuccess(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${API_URL}/students/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      const data = await response.json();
      console.log('Upload successful', data);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadSuccess(false); 
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setAvatar(null); 
    setPreview(toAbsoluteUrl('media/avatars/blank.png')); 
    setError(''); 
    setUploadSuccess(null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  
  const handleCancelAvatar = () => {
    setAvatar(null);
    setPreview(toAbsoluteUrl('media/avatars/blank.png')); 
    setError(''); 
    setUploadSuccess(null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <div className="col-lg-8">
      <h2 className='py-4'>Image Upload</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display validation error */}
      {loading && <p>Uploading...</p>} {/* Display loading state */}
      {uploadSuccess !== null && (
        <p style={{ color: uploadSuccess ? 'green' : 'red' }}>
          {uploadSuccess ? 'Upload successful!' : 'Upload failed'}
        </p>
      )}

      {/* Image Input */}
      <div
        className="image-input image-input-outline"
        data-kt-image-input="true"
        style={{
          backgroundImage: `url(${preview})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Preview existing avatar */}
        <div
          className="image-input-wrapper w-125px h-125px"
          style={{
            backgroundImage: `url(${preview})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius:'60px',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        {/* Label for changing avatar */}
        <label
          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          aria-label="Change avatar"
        >
          <i className="ki-duotone ki-pencil fs-7">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          {/* File input */}
          <input
            ref={fileInputRef}
            type="file"
            name="avatar"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
          />
          <input type="hidden" name="avatar_remove" />
        </label>

        {/* Cancel button */}
        <span
          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="cancel"
          data-bs-toggle="tooltip"
          aria-label="Cancel avatar"
          onClick={handleCancelAvatar}
        >
          <i className="ki-duotone ki-cross fs-2">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
        </span>

        {/* Remove button */}
        <span
          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="remove"
          data-bs-toggle="tooltip"
          aria-label="Remove avatar"
          onClick={handleRemoveImage}
        >
          <i className="ki-duotone ki-cross fs-2">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
        </span>
      </div>

      {/* Hint */}
      <div className="form-text">Allowed file types: png, jpg, jpeg. Max size: 5MB</div>

      {/* Remove image button below if image is selected */}
      {avatar && !loading && !uploadSuccess && (
        <button onClick={handleRemoveImage} style={{ marginTop: '10px' }}>
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUploadController;

