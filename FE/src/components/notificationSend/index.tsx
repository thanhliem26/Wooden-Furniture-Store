import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { notificationType } from "./constant";

const Notification = ({
  message = "",
  description = "",
  type = "success",
  icon,
  duration = 2,
}: notificationType) => {
  notification?.[type]({
    message: message,
    description: description,
    icon: icon,
    duration: duration,
  });
};

export default Notification;
