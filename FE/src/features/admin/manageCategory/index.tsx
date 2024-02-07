import React from "react";
import styled from "./index.module.scss";
import TableManageCategory from "./tableManageCategory";

const ManageCategory = () => {
  return (
    <div className={styled["manage__category"]}>
      ManageCategory
      <TableManageCategory />
    </div>
  );
};

export default ManageCategory;
