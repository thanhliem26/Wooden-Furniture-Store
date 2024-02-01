import { useState } from "react";
import Modal from "@/components/modal";
import ContentInfoChange from "./content";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  isEdit?: boolean;
}

const ModalAddUser = ({ isEdit = false, ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      footer={[]}
      {...props}
    >
      <ContentInfoChange isEdit={isEdit} />
    </Modal>
  );
};

export default ModalAddUser;
