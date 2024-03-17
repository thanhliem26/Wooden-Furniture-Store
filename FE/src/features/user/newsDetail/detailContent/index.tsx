import { Link } from "react-router-dom";
import styled from "./index.module.scss";
import Images from "@/constants/images";
import moment from "moment";
import { handleURL } from "@/utils/index";
import { useMemo } from "react";
import Markdown from "react-markdown";
import CommentNews from "../comments";

interface Props {
  news: NewsState;
}

const DetailContent = ({ news }: Props) => {
  const image = useMemo(() => {
    return handleURL(news?.image);
  }, [news?.image]);

  return (
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
        <CommentNews />
      </div>
    </div>
  );
};

export default DetailContent;
