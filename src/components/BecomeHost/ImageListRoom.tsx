import { Button } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageListMUI from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// Định nghĩa một interface để mô tả đối tượng file
interface FileObject {
  name: string;
  type: string;
  size: number;
}

// Component để tải lên nhiều tệp
const ImageListRoom: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);

  // Hàm kiểm tra xem một tệp đã tồn tại trong danh sách chưa
  const fileExists = (fileName: string): boolean => {
    return selectedFiles.some(file => file.name === fileName);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFileList = Array.from(files);

      // Lọc ra các tệp mới không trùng tên
      const newFiles: FileObject[] = selectedFileList.filter(file => !fileExists(file.name));

      if (newFiles.length > 0) {
        // Thêm các tệp mới vào danh sách
        setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...newFiles]);
      }
    };
  }
  const handleReset = () => {
    setSelectedFiles([]);
  };
  console.log("File anh dc upload: ",selectedFiles);
  return (
    <div>
      <h2>THÊM ẢNH ĐỂ QUẢNG BÁ PHÒNG CỦA BẠN</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} multiple id="contained-button-file" style={{ display: 'none' }} />
      {/* <button onClick={handleUpload}>Upload Images</button> */}
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Images
        </Button>
      </label>
      <Button variant="contained" color="secondary" onClick={handleReset} style={{marginLeft:'10px'}}> Reset</Button>
      <div>
        {selectedFiles.length > 0 && (
          <div>
            
            <h3>Selected Images:</h3>
            <ImageListMUI
              sx={{ height: 700 }}
              variant="quilted"
              cols={2}
              rowHeight={800}
            >
              {selectedFiles.map((file, index) => (
                <ImageListItem key={index} >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageListMUI>
          </div>
        )}
      </div>
    </div>
  );
}
export default ImageListRoom;