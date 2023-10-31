import React from "react";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: "TYPE CONTRACT",
    dataIndex: "firstName",
    key: "firstName",
    fixed: "left",
    width: 130,
  },
  {
    title: "NUMBER CONTRACT",
    dataIndex: "lastName",
    key: "lastName",
    fixed: "left",
    sorter: true,
    width: 170,
  },
  {
    title: "CUSTOMER NAME",
    dataIndex: "firstName",
    key: "firstName",
    width: 140,
  },
  { title: "PACKAGE", dataIndex: "firstName", key: "firstName", width: 100 },
  { title: "PAID", dataIndex: "age", key: "age", width: 100 },
  {
    title: "PRICE CONTRACT",
    dataIndex: "tags",
    key: "8",
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "LINK IMAGE",
    key: "operation",
    fixed: "right",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <a>Invite {record.lastName}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const TableSaleContractManage: React.FC = () => (
  <div className="table__sale-contract">
    <div className="table__title">
      <h4>Sale Contract</h4>
    </div>
    <Table
      // size="large"
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000 }}
    />
  </div>
);

export default TableSaleContractManage;
