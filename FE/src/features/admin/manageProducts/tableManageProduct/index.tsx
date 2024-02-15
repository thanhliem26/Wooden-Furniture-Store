import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { statusCode } from "@/constants/index";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/index";
import ModalConfirm from "@/components/confirm";
import { eventEmitter } from "@/utils/index";
import Notification from "@/components/notificationSend";
import InputSearchField from "@/components/admin/inputSearch";
import {
  setPagination,
  deleteProduct,
} from "@/store/manageProducts";
import {searchProduct, setProductSelected} from '@/store/manageProducts';
import ModalProduct from "../modalProduct"; 
import productApi from "@/api/product";
import { ProductContext } from "../constant";
import { useContext } from "react";

interface Props {
  loading?: boolean;
  productList: ProductState[];
  pagination: basePagination;
  total: number;
}

const TableManageCategory = ({
  loading = false,
  productList = [],
  pagination,
  total,
}: Props) => {
  const categoryContext = useContext(ProductContext);
  const dispatch = useAppDispatch();

  const handleGetCategory = (id) => {
    const [result] = categoryContext.categoryList.filter((category) => {
      return category.id === id;
    })

    return result || {};
  }

  const handleDeleteProduct = async ({ id }) => {
    try {
      const { message, status } = await productApi.deleteProduct(id);

      if (status === statusCode.DELETED) {
        dispatch(deleteProduct(id));

        eventEmitter.emit("submit_modal");

        Notification({
          message: message,
          description: 'Notify delete succes',
        });
      }
    } catch (e: unknown) {
      throw new Error((e as Error).message);
    }
  };

  const columns: ColumnsType<ProductState> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (name: string) => {
        return (
          <div className="content__name">
            <div className="content__name-info">
              <h5>{name}</h5>
            </div>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 140,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
      width: 100,
      render: (price: number) => {
        return <> {price}</>;
      },
    },
    {
      title: "Stock quantity",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
      sorter: true,
      width: 70,
      render: (stock_quantity: number) => {
        return <> {stock_quantity}</>;
      },
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      width: 70,
      render: (category_id: number) => {
        const category = handleGetCategory(category_id);
      
        return <b>{category.name}</b>;
      },
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      width: 130,
      render: (action: unknown, row: ProductState) => (
        <>
          <ModalProduct
            destroyOnClose={true}
            title="Edit Category"
            width={800}
            isEdit={true}
            content={
              <Tag
                color="blue"
                className="tag__action"
                onClick={() => dispatch(setProductSelected(row))}
              >
                <EditOutlined /> EDIT
              </Tag>
            }
          />
          <ModalConfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            handleConfirm={() => handleDeleteProduct(row)}
          >
            <Tag color="red" className="tag__action">
              <DeleteOutlined /> DELETE
            </Tag>
          </ModalConfirm>
        </>
      ),
    },
  ];
  const onChangePagination = (page: number, size: number) => {
    dispatch(setPagination({ current: page, pageSize: size }));
  };

  return (
    <div className="table__manage-product">
      <div className="table__title">
        <InputSearchField
          placeholder="Search product"
          pagination={pagination}
          setFieldSearch={searchProduct}
          setPagination={setPagination}
        />
      </div>
      <Table
        // size="large"
        pagination={{
          ...pagination,
          total: total,
          showSizeChanger: true,
          onChange: onChangePagination,
        }}
        loading={loading}
        columns={columns}
        dataSource={productList}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default TableManageCategory;
