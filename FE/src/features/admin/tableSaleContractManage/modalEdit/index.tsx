import { useState } from "react";
import Modal from "@/components/modal";
import {
  FileProtectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styled from "./index.module.scss";
import ChangePassword from "./changePassword";
import ContentInfoChange from "@/components/modal/modalChangeInfoUser/content";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean
}

const ModalEdit = ({ ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Modal
      footer={[]}
      className={styled["modal__edit"]}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      {...props}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <>
                <UserOutlined />
                Profile
              </>
            ),
            children: <ContentInfoChange isEdit={true} />,
          },
          {
            key: "2",
            label: (
              <>
                <FileProtectOutlined />
                Change Password
              </>
            ),
            children: <ChangePassword />,
          },
        ]}
      />
    </Modal>
  );
};

export default ModalEdit;
