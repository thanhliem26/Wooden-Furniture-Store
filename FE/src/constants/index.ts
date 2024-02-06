import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
  } from "@ant-design/icons";

export const STAFF_MANAGE_USER: string = 'STAFF_MANAGE_USER';
export const STAFF_REFRESH_MANAGE_USER: string = 'refreshToken';
export const STAFF_MANAGE_TOKEN: string = 'token';

export const iconMenu = {
    sale_contract_management: PieChartOutlined,
    expense: DesktopOutlined,
    progress: ContainerOutlined,
    manage_service_contract: AppstoreOutlined,
}

export const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "Authorization",
  REFRESHTOKEN: "x-rtoken-id",
  CONTENT_TYPE: "Content-Type"
};

export const ROlE = {
    1: 'ADMIN',
    2: 'USER',
    3: 'SHIPPER',
}

export const TAG_ROLE = {
  1: 'cyan',
  2: 'blue',
  3: 'magenta'
}

export const statusCode = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 201,
  DELETED: 201,
  NO_CONTENT: 204,
}