import PublicLayout from '@/layouts/PublicLayout';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { isUserLoggedIn } from '@/utils/index';
import SingInPage from '@/features/auth/singIn';
import SingUpPage from '@/features/auth/singUp';
import AdminLayout from '@/layouts/AdminLayout';

import PublicLayoutUser from '@/layouts/PublicLayoutUser';
import MainPage from '@/features/user/main';

import NotFound from '@/features/misc/NotFound';
import Admin from '@/features/admin';
import Introduce from '@/features/user/introduce';
import Forbidden from '@/features/misc/Forbidden';
import ManageUsers from '@/features/admin/manageUser';
import ManageCategory from '@/features/admin/manageCategory';
import ManageProduct from '@/features/admin/manageProducts';
import SettingStatic from '@/features/admin/settingStatic';
import CartOrder from '@/features/user/cart';
import Products from '@/features/user/products';
import ProductDetail from '@/features/user/productDetail';

function RouterComponent() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayoutUser />,
      children: [
        {
          index: true,
          element: <MainPage />
        },
        {
          path: '/introduce',
          element: <Introduce />
        },
        {
          path: '/cart/:id',
          element: <CartOrder />
        },
        {
          path: '/product',
          element: <Products />
        },
        {
          path: '/product/:id',
          element: <ProductDetail />
        },
      ]
    },
    {
      path: "/login",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <SingInPage />
        },
        {
          path: "sing-up",
          element: <SingUpPage />,
        },
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Admin />
        },
        {
          path: "manage-users",
          element: <ManageUsers />
        },
        {
          path: "manage-category",
          element: <ManageCategory />
        },
        {
          path: "manage-products",
          element: <ManageProduct />
        },
        {
          path: "setting_static",
          element: <SettingStatic />
        },
      ]
    },
    {
      path: "/Forbidden",
      element: <Forbidden />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default RouterComponent
