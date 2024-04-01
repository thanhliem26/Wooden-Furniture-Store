import EvaluateApi from "@/api/evaluate";
import { isJson, NotificationError } from "@/utils/index";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Images from "@/constants/images";
import styled from "./index.module.scss";
import { isEmpty } from "lodash";
import moment from "moment";
import StarFull from "@/components/starFull";
import StarEmpty from "@/components/starEmpty";
import { Progress } from "antd";

const starEmpty = [
  {name: '5 stars', value: 5},
  {name: '4 stars', value: 4},
  {name: '3 stars', value: 3},
  {name: '2 stars', value: 2},
  {name: '2 stars', value: 1},
]

const Stars = () => {
  const { id } = useParams();
  const [evaluateList, setEvaluateList] = useState<EvaluateState[]>([]);
  const [count, setCount] = useState<number>(0);
  const [countReview, setCountReview] = useState<number>(0);
  const [stars, setStar] = useState<countStar[]>([]);

  const handleGetList = async () => {
    try {
      const { metadata } = await EvaluateApi.getListEvaluate({
        product_id: id,
      });
      setEvaluateList(metadata.rows);
      setCount(metadata.count);
      setCountReview(metadata.countReview);
      setStar(metadata.countStar.reverse());
    } catch (error) {
      NotificationError(error);
    }
  };

  const starTotal = useMemo(() => {
    const total = stars.reduce((current, next) => {
      return current + next.count * next.value;
    }, 0);

    return total ? (total / count).toFixed(2) : '0';
  }, [stars, count]);

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <div className={styled["evaluate__main"]}>
      <div className="evaluate__star">
        <div className="evaluate__star-title">
          <h4>Community Reviews</h4>
        </div>
        <div className="evaluate__star-number">
          <div className="star__number-count">
            {!isEmpty(stars) ? stars.map((star, index) => {
              const widthSplit = starTotal.split(".")[1];
              const widthStar =
                Math.floor(Number(starTotal)) === star.value
                  ? widthSplit
                  : Math.floor(Number(starTotal)) > star.value
                  ? 0
                  : 100;

              return (
                <div className="evaluate__item-star" key={index}>
                  <div className="star__full" style={{width: `${widthStar}%`}}>
                    <StarFull />
                  </div>
                  <StarEmpty />
                </div>
              );
            }) : Array.apply(null, Array(5)).map((_, index) => {
              return (
                <div className="evaluate__item-star" key={index}>
                  <div className="star__full">
                    <StarFull />
                  </div>
                </div>
              );
            })}
            <div className="star__number-title">
              {starTotal !== '0' ? Number(starTotal).toFixed(1) : 5}
            </div>
          </div>
          <div className="star__number-countReview">
            <span>{count} ratings</span>
            <span>.</span>
            <span>{countReview} reviews</span>
          </div>
        </div>
        <div className="evaluate__star-progress">
          {!isEmpty(stars) ? stars.map((star, index) => {
            return (
              <div className="star__progress-item" key={index}>
                <div className="progress__item-name">
                  <span>{star.name}</span>
                </div>
                <div className="progress__item-sc">
                  <Progress
                    size={[500, 10]}
                    strokeColor={"#e87400"}
                    percent={Math.round((star.count / count) * 100)}
                    format={(percent) => `${star.count} (${percent}%)`}
                  />
                </div>
              </div>
            );
          }) :  starEmpty.map((_, index) => {
            return (
              <div className="star__progress-item" key={index}>
                <div className="progress__item-name">
                  <span>{_.name}</span>
                </div>
                <div className="progress__item-sc">
                  <Progress
                    size={[500, 10]}
                    strokeColor={"#e87400"}
                    percent={0}
                    format={(percent) => `0 (${percent}%)`}
                  />
                </div>
              </div>
              // <div className="evaluate__star" key={index}>
              // <StarFull /> 
              // </div>
            );
          })}
          {/* <div className="star__progress-item">
            <div className="progress__item-name">
              <span>5 stars</span>
            </div>
            <div className="progress__item-sc">
            <Progress size={[500, 10]} strokeColor={'#e87400'} percent={30} format={(percent) => percent + '% hihi'}/>
           
          
            </div>
          </div> */}
        </div>
      </div>
      <div className="evaluate__list">
        {!isEmpty(evaluateList) &&
          evaluateList.map((evaluate, index) => {
            const { user_evaluate, createdAt, star } = evaluate;
            const image = isJson(user_evaluate?.avatar)
              ? JSON.parse(user_evaluate.avatar).url
              : Images.AvatarDefault;

            return (
              <div className="evaluate__item" key={index}>
                <div className="evaluate__item-image">
                  <img src={image} alt="avatar" />
                </div>
                <div className="evaluate__item-content">
                  <div className="item__content-name">
                    <span>{user_evaluate.fullName}</span>
                  </div>
                  <div className="item__content-star">
                    {Array.apply(null, Array(5)).map((_, index) => {
                      return (
                        <div className="evaluate__star" key={index}>
                          {star >= index + 1 ? <StarFull /> : <StarEmpty />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="item__content-date">
                    <span>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</span>
                  </div>
                  <div className="item__content-description">
                    <p>{evaluate.evaluate}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Stars;
