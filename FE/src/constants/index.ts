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
};

// export const ROlE = {
//     1: 'Admin',
//     2: 'Quản lý tổng',
//     3: 'Quản lý vùng',
//     4: 'Cửa hàng trưởng',
//     5: 'Nhân viên'
// }

// export const roles = {
//     admin: 1,
//     departmentManager: 2,
//     areaManager: 3,
//     shopManager: 4,
//     staff: 5
// }

// export const typesTimesheet = {
//     work: 1,
//     sick: 2,
//     absence: 3,
// }

// export const typesTimesheetLabel = {
//     [typesTimesheet.work]: 'Đi Làm',
//     [typesTimesheet.sick]: 'Nghỉ Ốm',
//     [typesTimesheet.absence]: 'Nghỉ Phép',
// }