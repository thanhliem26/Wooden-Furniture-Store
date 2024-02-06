// import React, { useMemo, useEffect } from 'react';
// import style from './index.scss';
// import { Row, Col, Image, Spin, Upload } from 'antd';
// import type { RcFile, UploadProps } from 'antd/es/upload/interface';
// import { cloneDeep } from 'lodash';
// import ModalQuality from './ModalQuality';
// import { Button } from 'react-bootstrap';
// import { ATTACH_FILE_STATUS } from 'common/helpers/const';
// import { createToast } from 'components/ui/notification';
// import ImageComponent from './ImageComponent';
// import moment from 'moment';
// export interface IImageFileFormItem {
//   input: any;
//   label?: string;
//   required?: boolean;
//   btnName?: string;
//   initialFiles?
//   meta: {
//     error?: string;
//   };
//   disabled?: boolean
// }

// const accept = ['image/png', 'image/jpeg', 'image/jpg'];

// const dummyRequest = async ({ file, onSuccess = txt => txt }) => {
//   setTimeout(() => {
//     onSuccess('ok');
//   }, 0);
// };


// const renderFileList = (fileList, action, disabled = false) => {
//   return fileList.map((file, index) => {

//     if (file.isUrlFile && +file.status === ATTACH_FILE_STATUS.DELETE) {
//       return null
//     }

//     return (
//       <ImageComponent key={index} disabled={disabled} action={action} style={style} file={file}/>
//     )
//   })
// }

// const ImageFileFormItem = ({
//   label = 'Upload file',
//   required = false,
//   meta,
//   input,
//   initialFiles,
//   btnName = '参照',
//   disabled = false
// }: IImageFileFormItem) => {
//   const [fileList, setFileList] = React.useState<any[]>([]);
//   const [showModal, setShowModal] = React.useState<boolean>(false);
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const error = useMemo(() => meta.error, [meta]);
//   const [fileCompress, setFileCompress] = React.useState<any>(null);

//   const onHide = () => {
//     setShowModal(false);
//     setFileCompress(null);
//   };

//   const beforeUpload = (file: RcFile) => {
//     const isAccept = accept.includes(file.type);

//     const acceptLimit = file.size / 1024 / 1024 <= 5;

//     const acceptFileLength = fileList.length < 5

//     if (!acceptLimit) {
//       createToast({ type: 'error', message: '5MB以上のファイルをアップロードできません。' })
//     }

//     if (!acceptFileLength) {
//       createToast({ type: 'error', message: '5個以上のファイルをアップロードできません。' })
//     }

//     if (!isAccept) {
//       createToast({ type: 'error', message: '拡張子が.jpeg, .jpg , .pngのファイルをアップロードしてください。' })
//     }

//     return isAccept && acceptLimit && acceptFileLength;
//   };

//   const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);
//   };

//   const handleChange: UploadProps['onChange'] = (info: any) => {
//     if (info.file.status === 'uploading') {
//       setShowModal(true);
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       getBase64(info.file.originFileObj as RcFile, url => {
//         setLoading(false);
//         info.file.src = url;
//         info.file.name =  moment().format() + info.file.name
//         setFileCompress(info.file);
//       });
//     }
//   };

//   const removeImage = (file: any) => {

//     let newFileList = [];

//     if (file.isUrlFile) {
//       newFileList = [...fileList].map(f => {
//         if (f.name === file.name) {
//           return { ...f, status: ATTACH_FILE_STATUS.DELETE };
//         }
//         return { ...f };
//       })
//     } else {
//       newFileList = fileList.filter(item => item.uid !== file.uid);
//     }

//     // const newFilesForm = input.value.filter((item) => item.uid !== file.uid);
//     setFileList(newFileList);
//     input.onChange(newFileList);
//   };


//   // console.log(fileList, 'heresssss')

//   const setChange = (file) => {
//     const index = fileList.findIndex((item) => item.uid === file.uid);
//     if (index === -1) {
//       let newFiles = cloneDeep(fileList);
//       newFiles.push(file);
//       setFileList(newFiles);
//       input.onChange(newFiles);
//     }
//   };


//   useEffect(() => {
//     if (Array.isArray(initialFiles) && initialFiles.length > 0 && fileList.length === 0) {
//       setFileList(initialFiles);
//       input.onChange(initialFiles);
//     }

//   }, [initialFiles, fileList]);

//   useEffect(() => {
//     setFileList(initialFiles || [])
//     input.onChange(initialFiles || []);
//   }, [initialFiles]);

//   return (
//     <>
//       <label className="form-control-label font-weight-bold">
//         {label}
//         {required && <span className="ml-1 text-danger">*</span>}
//       </label>
//       <Row gutter={24}>
//         {renderFileList(fileList, removeImage, disabled)}
//         <Col xs={24} sm={8} lg={4}>
//           <div className={style['card-add']}>
//             <Upload
//               customRequest={dummyRequest}
//               className={style['upload-area']}
//               listType="picture"
//               accept="image/png, image/jpeg, image/jpg"
//               beforeUpload={beforeUpload}
//               onChange={handleChange}
//               maxCount={1}
//             >
//               {!disabled && <Button variant="light">
//                 <div className="circle-icon">
//                   <img src="../../../assets/images/upload-image.svg" />
//                 </div>
//                 {btnName}
//               </Button>}
//             </Upload>
//           </div>
//         </Col>
//         <Col span={24}>{error && <small className="text-danger">{error}</small>}</Col>
//         <ModalQuality
//           loading={loading}
//           file={fileCompress}
//           onChange={setChange}
//           show={showModal}
//           onHide={onHide} />
//       </Row>
//     </>
//   );
// };

// export default ImageFileFormItem;