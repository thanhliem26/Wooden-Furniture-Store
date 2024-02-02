import TableSaleContractManage from './tableSaleContractManage';
import styled from './index.module.scss';
import { useAppSelector } from '@/store/index';
import AddUser from './addUser';

const AdminComponent = () => {
  const userList = useAppSelector((state) => state.manageUser.userList);
  const loading = useAppSelector((state) => state.manageUser.loading);
  const pagination = useAppSelector((state) => state.manageUser.pagination);
  const total = useAppSelector((state) => state.manageUser.total);

  return (
    <div className={styled["sale_contract_manage"]}>
      <AddUser />
      <TableSaleContractManage total={total} loading={loading} userList={userList} pagination={pagination}/>
    </div>
  )
}

export default AdminComponent