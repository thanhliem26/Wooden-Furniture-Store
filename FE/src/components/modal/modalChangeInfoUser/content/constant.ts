import getBase64 from "@/utils/file";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";

export const handleGetAvatar = async (file, setFile) => { 
    if (!file) return null;
    console.log("file", file)
    const imageURL = (file.url) && file.origin === 'aws' ? file.url : await getBase64(file.originFileObj);
    setFile(imageURL)
};

export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = moment();
    // Trả về true nếu current là ngày trong tương lai
    return current && current > today;
};

export const optionRole = [
    { value: "1", label: "Admin" },
    { value: "2", label: "User" },
    { value: "3", label: "Shipper" },
  ]