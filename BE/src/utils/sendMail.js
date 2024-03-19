const nodemailer = require("nodemailer");
const {google} = require('googleapis');
require('dotenv');

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = process.env.SECRET_KEY_GOOGLE;
const REDIRECT_URL = process.env.REDIRECT_URL_GOOGLE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_OAUTH2;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendMailOauth2 = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: "phamvanliem26122002@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return transporter;
  } catch (error) {
    console.log("error", error)
  }
}

sendMailOauth2();

export const sendMailSingUP = async ({data, token}) => {
  // send mail with defined transport object
  try {
    const transporter = await sendMailOauth2();
    
    await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <phamvanliem26122002@gmail.com>', 
      to: data.email, 
      subject: "Verify Email ✔", 
      html: `<!DOCTYPE html>
      <html>
      <head>
          <title>Xác minh địa chỉ email của bạn</title>
      </head>
      <body>
          <h1>Xin chào, ${data.fullName}</h1>
          <p>Cảm ơn bạn đã đăng ký! Chúng tôi chỉ cần bạn xác minh địa chỉ email của mình để hoàn tất quá trình đăng ký.</p>
          <p>Vui lòng nhấp vào liên kết dưới đây để xác minh địa chỉ email của bạn:</p>
          <a href="${process.env.URL_FE_VERIFY}?token=${token}">Xác minh email</a>
          <p>Nếu bạn không yêu cầu đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
          <p>Trân trọng</p>
          <p>Đội ngũ hỗ trợ của bạn</p>
      </body>
      </html>
      `,
    });
  } catch(error) {
    console.log("error email signup", error)
  }
};
