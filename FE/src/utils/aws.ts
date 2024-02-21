import AWS from "aws-sdk";

interface UploadResult {
    Location: string;
    Bucket: string;
    key: string;
    Key: string
}

AWS.config.update({
    accessKeyId: import.meta.env.VITE_AWS_ACCESSKEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRETKEY,
});

const myBucket = new AWS.S3({
    params: { Bucket: import.meta.env.VITE_AWS_S3_BUCKET },
    region: import.meta.env.VITE_AWS_REGION,
});

export const uploadFileS3 = (file: any, nameFile: string): Promise<UploadResult> => {
    const params = {
        ACL: "public-read",
        Body: file,
        Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
        Key: nameFile,
        ContentType: "image/jpeg",
    };

    return new Promise((resolve, reject) => {
        try {
            myBucket.upload(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    // data.Location chứa URL của file tải lên
                    resolve(data)
                }
            });
        } catch (err) {
            reject(err)
        }
    })
};

export const deleteFileS3 = (keyFile: string) => {
    const params = {
        Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
        Key: keyFile,
    };

    return new Promise((resolve, reject) => {
        try {
            myBucket.deleteObject(params, (err, data) => {
                if (err) {
                    console.log("🚀 ~ err:", err)
                    reject(err)
                } else {
                    // data.Location chứa URL của file tải lên
                    resolve(true)
                }
            });
        } catch (err) {
            console.log("🚀 ~ err:", err)
            reject(err)
        }
    })
}