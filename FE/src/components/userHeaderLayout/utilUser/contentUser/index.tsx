import { useEffect, useState } from "react";
import styled from "./index.module.scss";
import { Dropdown, MenuProps } from "antd";
import Images from "@/constants/images";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { isJson } from "@/utils/index";
import {
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ModalChangeInfoUser from "@/components/modal/modalChangeInfoUser";
import ModalChangePassword from "./ModelChangePassword";
import { setUserSelected } from "@/store/manageUser";
import { fetchUserInfo } from "@/store/user";
import authApi from "@/api/auth";
import * as authUtil from "@/utils/index";
import { HEADER, statusCode } from "@/constants/index";
import { removeHeader } from "@/api/axiosService";
import Notification from "@/components/notificationSend";

const ContentUser = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const [avatar, setAvatar] = useState<string>(Images.AvatarDefault);

  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const refreshToken = authUtil.getRefreshToken();

    const { status, message } = await authApi.logOut({ user_id: user.id, refreshToken });

    if (status === statusCode.SUCCESS) {
      Notification({
        message: 'Notify success',
        description: message,
      })

      removeHeader(HEADER.AUTHORIZATION);
      authUtil.removeToken();
      authUtil.removeUser();
      authUtil.removeRefreshToken();
      window.location.href = "/login";
      window.location.reload();
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <ModalChangeInfoUser
          title="Edit user"
          destroyOnClose={true}
          isEdit={true}
          onSuccess={() => dispatch(fetchUserInfo())}
          setNullWhenCancel={false}
          width={800}
          content={
            <div className="user__info">
              <SettingOutlined className="icon__dropdown" />
              Change User Info
            </div>
          }
        ></ModalChangeInfoUser>
      ),
    },
    {
      key: "2",
      label: (
        <ModalChangePassword
          title="Change Password"
          destroyOnClose={true}
          width={800}
          content={
            <div className="user__password">
              <EditOutlined className="icon__dropdown" />
              Change Password
            </div>
          }
        ></ModalChangePassword>
      ),
    },
    {
      key: "3",
      label: (
        <div className="user__logOut" onClick={handleLogOut}>
          <LogoutOutlined className="icon__dropdown" />
          Logout
        </div>
      ),
    },
  ];

  useEffect(() => {
    const { avatar } = user;

    if (isJson(avatar) && JSON.parse(avatar).url) {
      setAvatar(JSON.parse(avatar).url);
    }
  }, [user.avatar]);

  useEffect(() => {
    dispatch(setUserSelected(user));
  }, [user]);

  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      overlayClassName={styled["content__user"]}
    >
       <img src={avatar} alt="avatar" />
    </Dropdown>
  );
};

export default ContentUser;
