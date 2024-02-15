import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Controller } from "react-hook-form";
import { Form } from "antd";
import styled from "./index.module.scss";
import getBase64 from "@/utils/file";
import { ORIGIN_UPLOAD } from "@/constants/index";
import ImageComponent from "../imageComponent";
import lodash from "lodash";
import ModalPreview from "./modalPreview";

interface uploadFileS3 extends UploadFile {
  origin?: string;
  is_delete?: boolean;
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
  defaultValue?: any;
}

const dummyRequest = async ({ file, onSuccess = (txt) => txt }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

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
  defaultValue,
  id,
  ...props
}: typeInpuUploadComponent) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileCompress, setFileCompress] = useState<any>(null);
  const [fileList, setFileList] = useState<uploadFileS3[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const countVisible = useMemo(() => {
    return fileList.filter((image) => {
      return image.is_delete === false;
    }).length;
  }, [fileList]);

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
    file,
  }) => {
    if (file.status === "uploading") {
      setShowModal(true);
      setLoading(true);
      return;
    }

    if (file.status === "done") {
      setShowModal(true);
      setFileCompress(file.originFileObj);
      setLoading(false);
    }
  };

  const handleDelete = (uid) => {
    const cloneImages = lodash.cloneDeep(fileList);

    const newFiles = cloneImages.map((image) => {
      if (image.uid === uid) {
        image.is_delete = true;
      }

      return image;
    });

    setFileList(newFiles);
    setValue(name, newFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const setChange = async (file) => {
    const index = fileList.findIndex((item) => item.uid === file.uid);

    if (index === -1) {
      let newFiles = lodash.cloneDeep(fileList);
      const thumbUrl = await getBase64(file);
      newFiles.push({
        originFileObj: file,
        origin: ORIGIN_UPLOAD.NORMAL,
        is_delete: false,
        name: file.name,
        type: file.type,
        uid: file.uid,
        thumbUrl: thumbUrl,
      });

      setFileList(newFiles);
      setValue(name, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const renderFileList = (fileList, action, disabled = false) => {
    return fileList.map((file, index) => {
      if (file.is_delete === true) {
        return null;
      }

      return (
        <ImageComponent
          key={index}
          file={file}
          onDelete={() => handleDelete(file.uid)}
        />
      );
    });
  };

  const btnUploadComponent = (
    <div className="item__image">
      <button className="btn__image" type="button">
        <label htmlFor="upload__images">
          <PlusOutlined /> Upload
        </label>
      </button>
    </div>
  );

  useEffect(() => {
    if (defaultValue && !lodash.isEmpty(defaultValue)) {
      setFileList(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={`${styled["upload__component"]}`}>
      <div className="image__list">
        {uploadSelf ? null : renderFileList(fileList, false, false)}
        {uploadSelf ? (
          btnUploadComponent
        ) : countVisible >= maxCount ? null : (
          btnUploadComponent
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label} className={`${className} upload__self`}>
            <Upload
              id={id ? id : "upload__images"}
              listType={"picture"}
              customRequest={dummyRequest}
              // fileList={fileList}
              // beforeUpload={() => false}
              // maxCount={maxCount}
              className={"upload-area"}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChange}
              {...props}
            >
              {uploadSelf
                ? btnUploadComponent
                : countVisible >= maxCount
                ? null
                : btnUploadComponent}
            </Upload>
            {errors?.[name] && (
              <div className="ant-form-item-explain-error">
                {errors?.[name]?.message}
              </div>
            )}
          </Form.Item>
        )}
      />
      <ModalPreview
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        title="Preview Image"
        fileCompress={fileCompress}
        loading={loading}
        setChange={setChange}
      />
    </div>
  );
};

export default UploadComponent;
