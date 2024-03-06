import React, { useEffect, useMemo, useState } from "react";
import Images from "@/constants/images";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import {
  AddCommentChildren,
  PushCommentChildren,
  addCommentToList,
  deleteComment,
  getListComment,
  setIdSelected,
  setLoading,
  setOpenChildrenList,
  updateComment,
} from "@/store/comments";
import { NotificationError, getInfoData, isJson, removeElement } from "@/utils/index";
import moment from "moment";
import { Popover, Spin } from "antd";
import PopoverContent from "./popoverContent";
import InputContent from "../inputContent";
import commentApi from "@/api/comment";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import lodash from "lodash";

interface Props {
  product: ProductState;
}

type StateIdReply = {
  id: number;
  type: string;
};

const TYPE_REPLY_COMMENT = {
  REPLY: 'reply',
  UPDATE: 'update',
}

const ListComment = ({ product }: Props) => {
  const commentList = useAppSelector(
    (state: RootState) => state.comments.commentList
  );

  const user = useAppSelector((state: RootState) => state.user);
  const idSelected = useAppSelector(
    (state: RootState) => state.comments.idSelected
  );
  const [ids_update, setIds_update] = useState<number[]>([]);
  const [idReply, setIdReply] = useState<StateIdReply[]>([]);

  const avatar = useMemo(() => {
    if (!user || !user.avatar) return Images.AvatarDefault;
    return isJson(user?.avatar) && JSON.parse(user?.avatar).url;
  }, [user]);

  const dispatch = useAppDispatch();

  const handleGetUrl = (avatar) => {
    if (!avatar) return Images.AvatarDefault;
    return avatar && isJson(avatar) && JSON.parse(avatar).url;
  };

  const removeIdUpdate = (id) => {
    const ids_new = ids_update.filter((id_update) => id_update !== id);
    setIds_update(ids_new);
  };

  const handleReplyComment = async ({ content, id, parent_id = null, type = 'update' }) => {
    if (type === TYPE_REPLY_COMMENT.REPLY) {
      handleReplyCommentParent({ content, parent_id: id })
    } else {
      handleCommentUpdate({content, id, parent_id})
    }
  };

  const handleCommentUpdate = async ({ content, id, parent_id = null }) => {
    try {
      dispatch(setLoading(true));

      const { metadata } = await commentApi.updateProduct({ content, id });
      dispatch(
        updateComment({
          id: metadata.id,
          content: metadata.content,
          parent_id: parent_id,
        })
      );
      handleRemoveReply(id);
      dispatch(setLoading(false));

      return true;
    } catch (error) {
      NotificationError(error);
      dispatch(setLoading(false));
      return false;
    }
  }

  const handleReplyCommentParent = async ({ content, parent_id }) => {
    const param = {
      content: content,
      user_id: user.id,
      product_id: product.id,
    };

    if (parent_id) param["parent_id"] = parent_id;

    try {
      const { metadata } = await commentApi.createComment(param);

      const comment_store = removeElement({ field: ['left', 'right'], object: metadata });
      const user_comment = getInfoData({ field: ['avatar', 'avatar_support', 'id', 'fullName', 'role_user'], object: user });

      comment_store.countChild_low = 0;
      comment_store.countChild_total = 0;
      comment_store.user_comment = user_comment;

      dispatch(PushCommentChildren({ parent_id: parent_id, commentChildren: comment_store }));
      handleRemoveReply(parent_id)
      return true;
    } catch (error) {
      NotificationError(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      dispatch(setLoading(true));

      const { metadata } = await commentApi.deleteComment(id);
      dispatch(deleteComment(metadata.id));
      handleRemoveReply(id);
      dispatch(setLoading(false));

      return true;
    } catch (error) {
      NotificationError(error);
      dispatch(setLoading(false));
      return false;
    }
  };

  const handleAddUpdate = (id) => {
    if (ids_update.includes(id)) return;

    setIds_update([...ids_update, id]);
  };

  const handleGetListChildren = async (comment) => {
    try {
      dispatch(setIdSelected(comment.id));
      if (
        comment.commentChildren &&
        comment.commentChildren.length !== comment.countChild_total
      ) {
        const { metadata } = await commentApi.getListChildrenComment({
          parent_id: comment.id,
        });

        dispatch(
          AddCommentChildren({ id: comment.id, children_list: metadata })
        );
      }

      dispatch(setIdSelected(null));
      dispatch(setOpenChildrenList({ id: comment.id, show: true }));
    } catch (error) {
      NotificationError(error);
      dispatch(setIdSelected(null));
    }
  };

  //reply
  const handleRemoveReply = (id) => {
    const cloneIdReply = lodash.cloneDeep(idReply);
    const removeItemReply = cloneIdReply.filter((item) => {
      return item.id !== id;
    })

    setIdReply(removeItemReply);
  }

  const checkIsExistReply = (id) => {
    return idReply.some((item) => item.id === id);
  }

  const getItemReply = (id) => {
    return idReply.find((item) => item.id === id)
  }

  const handleReplyIds = ({ type = TYPE_REPLY_COMMENT.REPLY, id }: StateIdReply) => {
    const cloneIdReply = lodash.cloneDeep(idReply);
    const idReplyNew = cloneIdReply.map((item) => {
      if (item.id === id) {
        item.type = type;
      }

      return item;
    });

    setIdReply(!checkIsExistReply(id) ? [...cloneIdReply, { type, id }] : idReplyNew);
  };

  useEffect(() => {
    dispatch(getListComment({ product_id: product.id }));
  }, [product]);

  return (
    <div className="main__comment">
      <div className="main__comment-list">
        {commentList.map((comment, index) => {
          const urlImage = handleGetUrl(comment.user_comment.avatar);

          return (
            <div className="comment__list-item" key={index}>
              <div className="comment__item-context">
                <div className="comment__item-image">
                  <img src={urlImage} alt="image user" />
                </div>
                <div className="comment__item-content">
                  <div className="item__content-field">
                    <div className="item__content-name">
                      <span>{comment.user_comment.fullName}</span>
                    </div>
                    <div className="item__content-text">
                      <p> {comment.content}</p>
                    </div>
                  </div>
                  <div className="main__comment-reply">
                    <div className="comment__reply-action">
                      <div className="main__comment-like">
                        <button>
                          <span>Like</span>
                        </button>
                        .
                        <button
                          onClick={() =>
                            handleReplyIds({ type: TYPE_REPLY_COMMENT.REPLY, id: comment.id })
                          }
                        >
                          <span>Trả lời</span>
                        </button>
                        .
                      </div>
                      <div className="main__comment-createdAt">
                        <span>{moment(comment.createdAt).fromNow(true)}</span>
                        {comment.user_id === user.id ? (
                          <PopoverContent
                            onClickUpdate={() => handleReplyIds({ type: TYPE_REPLY_COMMENT.UPDATE, id: comment.id })}
                            onClickDelete={() => handleDelete(comment.id)}
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="comment__reply-update">
                      {checkIsExistReply(comment.id) ? (
                        <div className="reply__update-input">
                          <InputContent
                            defaultValue={getItemReply(comment.id)?.type === TYPE_REPLY_COMMENT.UPDATE ? comment.content : ''}
                            className="update__input-field"
                            titleSubmit={getItemReply(comment.id)?.type === TYPE_REPLY_COMMENT.UPDATE ? 'Sửa' : 'Trả lời'}
                            avatar={avatar}
                            handleCancel={() => handleRemoveReply(comment.id)}
                            callback={(payload) =>
                              handleReplyComment({
                                content: payload.content,
                                id: comment.id,
                                type: getItemReply(comment.id)?.type,
                              })
                            }
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {comment.countChild_total >= 1 &&
                    comment.parent_id === null ? (
                    <div className="main__comment-children">
                      <div className="comment__children-title">
                        {!comment.openChildren ? (
                          <p onClick={() => handleGetListChildren(comment)}>
                            Xem thêm {comment.countChild_total} câu trả lời{" "}
                            {idSelected === comment.id ? (
                              <Spin />
                            ) : (
                              <DownOutlined />
                            )}
                          </p>
                        ) : (
                          <p
                            onClick={() => {
                              dispatch(
                                setOpenChildrenList({
                                  id: comment.id,
                                  show: false,
                                })
                              );
                            }}
                          >
                            Ẩn câu trả lời <UpOutlined />
                          </p>
                        )}
                      </div>
                      {comment.openChildren ? (
                        <>
                          <div className="comment__children-list">
                            {comment.commentChildren &&
                              comment.commentChildren.map(
                                (commentChildren, index) => {
                                  const urlImage = handleGetUrl(
                                    commentChildren.user_comment.avatar
                                  );
                                  return (
                                    <div
                                      className="comment__list-item"
                                      key={index}
                                    >
                                      <div className="comment__item-context">
                                        <div className="comment__item-image">
                                          <img
                                            src={urlImage}
                                            alt="image user"
                                          />
                                        </div>
                                        <div className="comment__item-content">
                                          <div className="item__content-field">
                                            <div className="item__content-name">
                                              <span>
                                                {
                                                  commentChildren.user_comment
                                                    .fullName
                                                }
                                              </span>
                                            </div>
                                            <div className="item__content-text">
                                              <p> {commentChildren.content}</p>
                                            </div>
                                          </div>
                                          <div className="main__comment-reply">
                                            <div className="comment__reply-action">
                                              <div className="main__comment-like">
                                                <button>
                                                  <span>Like</span>
                                                </button>
                                                .
                                                <button onClick={() =>
                                                  handleReplyIds({ type: TYPE_REPLY_COMMENT.REPLY, id: commentChildren.id })
                                                }>
                                                  <span>Trả lời</span>
                                                </button>
                                                .
                                              </div>
                                              <div className="main__comment-createdAt">
                                                <span>
                                                  {moment(
                                                    commentChildren.createdAt
                                                  ).fromNow(true)}
                                                </span>
                                                {commentChildren.user_id ===
                                                  user.id ? (
                                                  <PopoverContent
                                                    onClickUpdate={() => handleReplyIds({ type: TYPE_REPLY_COMMENT.UPDATE, id: commentChildren.id })}
                                                    onClickDelete={() => handleDelete(commentChildren.id)}
                                                  />
                                                ) : null}
                                              </div>
                                            </div>
                                            <div className="comment__reply-update">
                                              {checkIsExistReply(commentChildren.id) ? (
                                                <div className="reply__update-input">
                                                  <InputContent
                                                    defaultValue={getItemReply(commentChildren.id)?.type === TYPE_REPLY_COMMENT.UPDATE ? commentChildren.content : ''}
                                                    className="update__input-field"
                                                    titleSubmit={getItemReply(commentChildren.id)?.type === TYPE_REPLY_COMMENT.UPDATE ? 'Sửa' : 'Trả lời'}
                                                    avatar={avatar}
                                                    handleCancel={() => handleRemoveReply(commentChildren.id)}
                                                    callback={(payload) =>
                                                      handleReplyComment({
                                                        content: payload.content,
                                                        id: commentChildren.id,
                                                        type: getItemReply(commentChildren.id)?.type,
                                                        //@ts-ignore
                                                        parent_id: comment.id,
                                                      })
                                                    }
                                                  />
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListComment;
