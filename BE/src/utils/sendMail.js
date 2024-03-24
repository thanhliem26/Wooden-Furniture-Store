import { formatCurrency } from ".";

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv");

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = process.env.SECRET_KEY_GOOGLE;
const REDIRECT_URL = process.env.REDIRECT_URL_GOOGLE;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_OAUTH2;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMailOauth2 = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ROOT,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return transporter;
  } catch (error) {
    console.log("error", error);
  }
};

sendMailOauth2();

export const sendMailSingUP = async ({ data, token }) => {
  // send mail with defined transport object
  try {
    const transporter = await sendMailOauth2();

    await transporter.sendMail({
      from: `"Đồ gỗ Thành Lành 👻"<${process.env.EMAIL_ROOT}>`,
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
  } catch (error) {
    console.log("error email signup", error);
  }
};

export const sendMailWhenOrder = async ({ orderDetail, order }) => {
  // send mail with defined transport object
  try {
    const transporter = await sendMailOauth2();

    let htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <title>Xác nhận Đơn hàng Sản phẩm </title>
    </head>
      <body>
        <p>Kính gửi Quý khách hàng thân mến,</p>
        <p>Chúng tôi hy vọng email này tìm được Quý khách trong tình trạng tốt lành.</p>
        <p>Cảm ơn Quý khách đã lựa chọn <strong>[Đồ gỗ Thành Lành]</strong> 
        để đáp ứng nhu cầu về sản phẩm đồ gỗ của mình. 
        Chúng tôi rất vui mừng xác nhận việc nhận được đơn hàng gần đây của Quý khách. 
        Sự ưu tiên của Quý khách đối với sự tinh tế và thiết kế sang trọng đã được thể hiện, 
        và chúng tôi rất hạnh phúc khi được tham gia cùng Quý khách trong việc nâng cao không gian sống của mình.
        </p>
        <p>Chi tiết đơn hàng của Quý khách như sau:</p>
        <ul>`;

    orderDetail.forEach((item) => {
      htmlContent += `<li><strong>Sản phẩm:</strong> ${item.name} - ${
        item.quantity
      } - ${formatCurrency(item.price)}</li>`;
    });

    htmlContent += `<li><strong>Tổng số tiền:</strong> ${formatCurrency(
      orderDetail.reduce(
        (current, next) => current + next.price * next.quantity,
        0
      )
    )}</li>
        </ul>
        <p>Hãy yên tâm, đội ngũ của chúng tôi đang làm việc chăm chỉ để đảm bảo quá trình giao hàng của đơn hàng của Quý khách diễn ra một cách thuận lợi và không gặp trục trặc. 
        Chúng tôi hiểu rõ về sự quan trọng của sự chính xác và giao hàng đúng hẹn, 
        và cam kết đáp ứng và vượt qua mong đợi của Quý khách.
        </p>
        <p>Là một phần của cam kết với dịch vụ xuất sắc, 
        một thành viên của đội ngũ của chúng tôi sẽ liên hệ với Quý khách trong thời gian sớm nhất để xác nhận tất cả các thông tin cần thiết liên quan đến đơn hàng của Quý khách. 
        Điều này bao gồm xác nhận thông tin vận chuyển, 
        đảm bảo các thông số kỹ thuật của sản phẩm và giải quyết mọi thắc mắc hoặc lo lắng mà Quý khách có thể gặp phải.</p>
        <p>Nếu Quý khách có bất kỳ thắc mắc hoặc cần hỗ trợ thêm, 
        xin vui lòng liên hệ với đội ngũ dịch vụ khách hàng của chúng tôi qua email <strong>[Địa chỉ Email ########]</strong> 
        hoặc số điện thoại <strong>[Số Điện thoại ###########]</strong>.</p>
        <p>Một lần nữa, chúng tôi xin chân thành cảm ơn Quý khách đã lựa chọn <strong>
        [Đồ gỗ Thành Lành]</strong>. Chúng tôi chân thành đánh giá cao sự hợp tác của Quý khách và rất mong được phục vụ Quý khách.</p>
        <p>Trân trọng,</p>
        <br>Đồ gỗ Thành Lành
      </body>
    </html>
    `;

    await transporter.sendMail({
      from: `"Đồ gỗ Thành Lành👻"<${process.env.EMAIL_ROOT}>`,
      to: order.email,
      subject: "Xác nhận Đơn hàng Sản phẩm ",
      html: htmlContent,
    });
  } catch (error) {
    console.log("error email signup", error);
  }
};

export const sendMailOrderForShop = async ({ orderDetail, order }) => {
  // send mail with defined transport object
  try {
    const transporter = await sendMailOauth2();

    let htmlContent = `<!DOCTYPE html>
     <html lang="vi">
     <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Thông báo: Đơn hàng mới từ Khách hàng</title>
     </head>
     <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
     <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
     <p><strong>Kính gửi [Đồ gỗ Thành Lành],</strong></p>
     <p>Chúng tôi gửi đến bạn một thông báo về đơn hàng mới từ một khách hàng. Dưới đây là thông tin chi tiết:</p>
     <ul>
     <li><strong>Tên khách hàng:</strong> ${order.name}</li>
     <li><strong>Email:</strong> ${order.email}</li>
     <li><strong>Số điện thoại:</strong> ${order.phone_number}</li>
     <li><strong>Địa chỉ giao hàng:</strong> ${order.address}</li>
     </ul>
     <p><strong>Danh sách sản phẩm trong đơn hàng:</strong></p>
     <ul>`;

    orderDetail.forEach((item) => {
      htmlContent += `<li><strong>Sản phẩm:</strong> ${item.name} - Số lượng: ${
        item.quantity
      } - Giá: ${formatCurrency(item.price)}</li>`;
    });

    htmlContent += `<li><strong>Tổng số tiền:</strong> ${formatCurrency(
      orderDetail.reduce(
        (current, next) => current + next.price * next.quantity,
        0
      )
    )}</li>
     </ul>
     <p>Vui lòng liên hệ với khách hàng sớm nhất có thể để xác nhận đơn hàng và sắp xếp giao hàng. Nếu cần thêm thông tin, đừng ngần ngại liên hệ với khách hàng qua email hoặc số điện thoại được cung cấp.</p>
     <p>Xin cảm ơn và chúc bạn một ngày làm việc hiệu quả!</p>
     <p>Trân trọng,</p>
     <p>[Đồ gỗ Thành Lành]</p>
     </div>
     </body>
     </html>
     `;

    await transporter.sendMail({
      from: `"Đồ gỗ Thành Lành👻"<${process.env.EMAIL_ROOT}>`,
      to: process.env.EMAIL_ROOT,
      subject: "Xác nhận Đơn hàng Sản phẩm",
      html: htmlContent,
    });
  } catch (error) {
    console.log("error email signup", error);
  }
};
