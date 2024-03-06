import { useState } from "react";
import Modal from "@/components/modal";
import styled from "./index.module.scss";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose: boolean;
  onClickDelete?: any;
}

const ModalConfirm = ({ onClickDelete, ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Modal
      footer={
        <div className="modal__footer">
          <button className="btn__cancel" onClick={() => setIsModalOpen(false)}>Hủy bỏ</button>
          <button className="btn__submit" onClick={() => {
            onClickDelete();
            setIsModalOpen(false)
          }}>Đồng ý</button>
        </div>
      }
      className={styled["modal__comment-delete"]}
      title="Thông báo"
      centered
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      {...props}
    >
      <p>Bạn có chắc chắn muốn xóa bình luận này</p>
    </Modal>
  );
};

export default ModalConfirm;
