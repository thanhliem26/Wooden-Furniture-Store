import { Link, useParams } from "react-router-dom";
import styled from "./index.module.scss";
import moment from "moment";
import { destroyWS, handleURL, sendingWS } from "@/utils/index";
import { useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";
import CommentNews from "../comments";
import { WebSocketNewsContext } from "../constant";
import { STATUS_WS, TYPE_WS } from "@/constants/index";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import {
  PushCommentChildren,
  addCommentToList,
  deleteComment,
  updateComment,
} from "@/store/comments";

interface Props {
  news: NewsState;
}

const DetailContent = ({ news }: Props) => {
  const image = useMemo(() => {
    return handleURL(news?.image);
  }, [news?.image]);

  const { id } = useParams();
  const is_call = useAppSelector(
    (state: RootState) => state.comments.is_call_api
  );
  const ws = useRef<WebSocket | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // URL của máy chủ WebSocket
    const wsUrl = import.meta.env.VITE_API_URL_WS;
    // Tạo một kết nối WebSocket
    ws.current = new WebSocket(wsUrl);
    // Sự kiện được kích hoạt khi kết nối thành công
    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");

      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws.current, {
          type: TYPE_WS.JOIN_ROOM,
          room_id: `news_${id}`,
        });
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    //xử lí khi websocket đã bị đóng(vd: đóng tab, mất mạng, server mất kết nối, ...),
    //Ko thê gửi đến ws khi đã ở trạng thái close
    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };
    const handleBeforeUnload = () => {
      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        sendingWS(ws.current, { type: TYPE_WS.LEAVE_ROOM, room_id: id });
        destroyWS(ws.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (ws?.current?.readyState === STATUS_WS.OPEN) {
        handleBeforeUnload();
      }
    };
  }, [id]);
  //

  useEffect(() => {
    // Sự kiện được kích hoạt khi nhận được tin nhắn từ máy chủ WebSocket
    if (!ws.current || !is_call) return;

    ws.current.onmessage = (event) => {
      const dataWS = JSON.parse(event.data);

      switch (dataWS.type) {
        case TYPE_WS.ADD_COMMENT: {
          if (dataWS.parent_id) {
            dispatch(
              PushCommentChildren({
                parent_id: dataWS.parent_id,
                commentChildren: dataWS.data,
              })
            );
          } else {
            dispatch(addCommentToList(dataWS.data));
          }
          break;
        }
        case TYPE_WS.UPDATE_COMMENT: {
          dispatch(updateComment(dataWS.data));
          break;
        }
        case TYPE_WS.DELETE_COMMENT: {
          dispatch(deleteComment(dataWS.data));
          break;
        }
        default:
          break;
      }
    };
  }, [id, is_call, ws.current]);

  return (
    <WebSocketNewsContext.Provider
      value={{ ws: ws.current, news_id: `news_${id}` }}
    >
      <div className={styled["detail__content"]}>
        <div className="detail__content-title">
          <div className="content__title">
            <h6>
              <Link to="/news">Tin Tức</Link>
            </h6>
          </div>
          <div className="content__title-name">
            <h1>{news?.name}</h1>
          </div>
          <div className="is__divider"></div>
          <div className="content__title-date">
            <span>
              POSTED ON {moment(news?.createdAt).format("DD")}/
              {moment(news?.createdAt).format("M")},
              {moment(news?.createdAt).format("YYYY")} BY ADMIN
            </span>
          </div>
        </div>
        <div className="detail__content-image">
          <div className="content__image">
            <img src={image.url} alt="image news" />
          </div>
          <div className="content__image-date">
            <div className="badge-inner">
              <span>{moment(news?.createdAt).format("DD")}</span>
              <br />
              <span className="is-xsmall">
                {moment(news?.createdAt).format("MM")}
              </span>
            </div>
          </div>
        </div>
        <div className="detail__content-markdown">
          <Markdown children={news?.contentMarkdown} />
        </div>
        <div className="detail__content-comments">
          <CommentNews news={news} />
        </div>
      </div>
    </WebSocketNewsContext.Provider>
  );
};

export default DetailContent;
