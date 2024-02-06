import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Controller } from "react-hook-form";
import { Form } from "antd";
import styled from "./index.module.scss";
import getBase64 from "@/utils/file";

interface uploadFileS3 extends UploadFile {
  origin?: string,
  is_delete?: boolean,
}

interface typeInpuUploadComponent extends UploadProps {
  name: string;
  control: any;
  errors?: any;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  setValue: any;
  maxCount?: number;
  listType?: "text" | "picture" | "picture-card" | "picture-circle";
  uploadSelf?: boolean;
}

const UploadComponent = ({
  name,
  control,
  errors,
  label = "",
  className = "",
  icon,
  setValue,
  maxCount = 5,
  listType = "picture-circle",
  uploadSelf = false,
  children,
  ...props
}: typeInpuUploadComponent) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<uploadFileS3[]>([]);
  // console.log("🚀 ~ fileList:", fileList)

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: uploadFileS3) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList([{...newFileList[0], origin: 'normal', is_delete: false}]);

    setValue(name, newFileList, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const renderFileList = (fileList, action, disabled = false) => {
    return fileList.map((file, index) => {
      // if (file.isUrlFile && +file.status === ATTACH_FILE_STATUS.DELETE) {
      //   return null
      // }

      return (
        <div className="custom-item-render" key={index}>
          {/* {originNode} */}
          {/* <img src={file.url || file.thumbUrl} alt="" /> */}
          <Button
            size="small"
            onClick={() => console.log("Custom button clicked")}
          >
            Custom Button
          </Button>
        </div>
      );
    });
  };
  
  return (
    <div className={`${styled["upload__component"]}`}>
      <div>{uploadSelf ? null : renderFileList(fileList, false, false)}</div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label} className={`${className} upload__self`}>
            <Upload
              listType={"picture"}
              // {...field}
              fileList={fileList}
              onPreview={handlePreview}
              beforeUpload={() => false}
              maxCount={maxCount}
              className={"upload-area"}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChange}
              {...props}
            >
              {uploadSelf
                ? uploadButton
                : fileList.length >= maxCount
                ? null
                : uploadButton}
            </Upload>
            {errors?.[name] && (
              <div className="ant-form-item-explain-error">
                {errors?.[name]?.message}
              </div>
            )}
          </Form.Item>
        )}
      />

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default UploadComponent;
