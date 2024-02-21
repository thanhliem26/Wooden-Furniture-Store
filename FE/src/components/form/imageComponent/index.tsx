import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Image, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  file: any;
  onDelete: any;
}

const ImageComponent = ({ file, onDelete }: Props) => {
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const urlImage = useMemo(() => {
    return file.origin === "aws" ? file.url : file.thumbUrl;
  }, [file]);

  return (
    <div className="item__image">
      <div className="image__contain">
        <img src={urlImage} alt={file.name} />
        {isPreviewVisible && <Image
          width={200}
          preview={{
            visible: isPreviewVisible,
            onVisibleChange: (visible, prevVisible) =>
              setPreviewVisible(visible),
          }}
          src={urlImage}
        />}
        <div className="action__image">
          <span onClick={() => setPreviewVisible(!isPreviewVisible)}>
            <Tooltip title={"Preview image"}>
              <EyeOutlined />
            </Tooltip>
          </span>

          {onDelete && (
            <span onClick={onDelete}>
              <Tooltip title={"Delete image"}>
                <DeleteOutlined />
              </Tooltip>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
