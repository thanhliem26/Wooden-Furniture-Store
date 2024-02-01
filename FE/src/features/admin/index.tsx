import React, { useEffect } from 'react';
import TableSaleContractManage from './tableSaleContractManage';
import styled from './index.module.scss';
import userApi from '@/api/user';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { fetchAllUser } from '@/store/manageUser';
import AddUser from './addUser';

const AdminComponent = () => {

  const disptach = useAppDispatch();

  const userList = useAppSelector((state) => state.manageUser.userList);
  const loading = useAppSelector((state) => state.manageUser.loading);

  useEffect(() => {
    disptach(fetchAllUser())
  }, [])


  return (
    <div className={styled["sale_contract_manage"]}>
      <AddUser />
      <TableSaleContractManage loading={loading} userList={userList}/>
    </div>
  )
}

export default AdminComponent