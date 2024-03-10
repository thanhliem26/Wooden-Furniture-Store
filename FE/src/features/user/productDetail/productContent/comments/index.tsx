import { useContext, useMemo, useState } from "react";
import Modal from "@/components/modal";
import styled from "./index.module.scss";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { setProductSelected } from "@/store/manageProducts";
import Images from "@/constants/images";
import {
  NotificationError,
  getInfoData,
  isJson,
  removeElement,
  sendingWS,
} from "@/utils/index";
import InputContent from "./inputContent";
import ListComment from "./listComment";
import { Spin } from "antd";
import commentApi from "@/api/comment";
import { addCommentToList, setLoading } from "@/store/comments";
import { WebSocketContext } from "../../constant";
import { STATUS_WS, TYPE_WS } from "@/constants/index";

interface Props {
  content: any;
  title?: string;
  width?: number;
  destroyOnClose?: boolean;
  product: ProductState;
}

const ModalComment = ({ product, ...props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAppSelector((state: RootState) => state.user);
  const { ws, product_id } = useContext(WebSocketContext);

  const total = useAppSelector((state: RootState) => state.comments.total);
  const loading = useAppSelector((state: RootState) => state.comments.loading);

  const avatar = useMemo(() => {
    if (!user || !user.avatar) return Images.AvatarDefault;
    return isJson(user?.avatar) && JSON.parse(user?.avatar).url;
  }, [user]);

  const dispatch = useAppDispatch();

  const handleSubmit = async ({ parent_id, content }) => {
    dispatch(setLoading(true));

    const param = {
      content: content,
      user_id: user.id,
      product_id: product.id,
    };

    if (parent_id) param["parent_id"] = parent_id;

    try {
      const { metadata } = await commentApi.createComment(param);

      const comment_store = removeElement({
        field: ["left", "right"],
        object: metadata,
      });
      const user_comment = getInfoData({
        field: ["avatar", "avatar_support", "id", "fullName", "role_user"],
        object: user,
      });

      comment_store.countChild_low = 0;
      comment_store.countChild_total = 0;
      comment_store.user_comment = user_comment;

      dispatch(addCommentToList(comment_store));
      dispatch(setLoading(false));

      if (ws?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws, {
          type: TYPE_WS.ADD_COMMENT,
          room_id: product_id,
          data_ws: { parent_id: null, data: comment_store },
        });
      }

      return true;
    } catch (error) {
      NotificationError(error);
      dispatch(setLoading(false));
      return false;
    }
  };

  return (
    <Modal
      footer={[]}
      className={styled["modal__comment"]}
      title=""
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      //   onCancelModal={() => dispatch(setProductSelected(null))}
      {...props}
    >
      <div className="modal__comment-title">
        {loading ? (
          <h3>
            <Spin /> hỏi đáp
          </h3>
        ) : (
          <>
            <h3>{total} hỏi đáp</h3>
            <p>(Nếu thấy bình luận spam hãy report với admin nhé!)</p>
          </>
        )}
      </div>
      <div className="input__content-field">
        <InputContent avatar={avatar} callback={handleSubmit} />
      </div>

      <div className="modal__comment-list">
        <ListComment product={product} />
      </div>
    </Modal>
  );
};

export default ModalComment;