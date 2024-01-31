import React from "react";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ROlE } from "@/constants/index";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import images from "@/constants/images";
import ModalEdit from "./modalEdit";
import { useAppDispatch } from "@/store/index";
import { setUserSelected } from "@/store/manageUser";

interface Props {
  loading?: boolean;
  userList: UserState[];
}

const TableSaleContractManage = ({ loading = false, userList = [] }: Props) => {
  const dispatch = useAppDispatch();

  const columns: ColumnsType<UserState> = [
  {
    title: "NAME",
    dataIndex: "fullName",
    key: "fullName",
    width: 130,
    render: (name: string, row: UserState) => {
      return (
        <div className="content__name">
          <div className="content__name-image">
            <img src={images.HauntedHouseForeground} alt="image description" />
          </div>
          <div className="content__name-info">
            <h5>{name}</h5>
            <span>{row.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: "ADDRESS",
    dataIndex: "address",
    key: "address",
    width: 140,
  },
  {
    title: "DATE OF BIRTH",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    sorter: true,
    width: 100,
    render: (date: string) => {
      return <> {moment(date).format("DD-MM-YYYY")}</>;
    },
  },
  {
    title: "PHONE NUMBER",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 70,
  },
  {
    title: "ROLE",
    dataIndex: "role_user",
    key: "role_user",
    width: 30,
    render: (role: string) => {
      return ROlE[role];
    },
  },
  {
    title: "ACTION",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (action: unknown, row: UserState) => (
      <>
        <ModalEdit
          destroyOnClose={true}
          title="Edit user"
          width={800}
          content={
            <Tag color="blue" className="tag__action" onClick={() =>dispatch(setUserSelected(row))}>
              <EditOutlined /> EDIT
            </Tag>
          }
        />
        <Tag color="red" className="tag__action">
          <DeleteOutlined /> DELETE
        </Tag>
      </>
    ),
  },
];

  return (
    <div className="table__sale-contract">
      <div className="table__title">
        <h4>Sale Contract</h4>
      </div>
      <Table
        // size="large"
        loading={loading}
        columns={columns}
        dataSource={userList}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default TableSaleContractManage;
