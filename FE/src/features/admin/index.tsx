import React from 'react';
import TableSaleContractManage from './tableSaleContractManage';
import styled from './index.module.scss';

const AdminComponent = () => {
  return (
    <div className={styled["sale_contract_manage"]}>
      AdminComponent edit info user
      <TableSaleContractManage />
    </div>
  )
}

export default AdminComponent