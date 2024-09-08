const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmailCreateOrder = async (email, newOrder) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let listItems = "";
  const attachImage = [];
  newOrder?.orderItems.forEach((item) => {
    listItems += `
    <ul>
      <li>Tên sách: ${item.name}</li>
      <li>Số lượng: ${item.amount}</li>
      <li>Tổng số tiền: ${item.price}</li>
    </ul>
    `;
    attachImage.push({ path: item.image });
  });

  await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng thành công tại QBook!", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div>
      <p>Chào <strong>${newOrder?.shippingAddress?.fullName}</strong>,</p>
      <p>
        Chúng tôi xin chân thành cảm ơn quý khách đã đặt sách tại QBook. Đơn hàng của quý khách đã được xác nhận và chúng tôi đang tiến hành chuẩn bị để gửi đến quý khách trong thời gian sớm nhất.
      </p>
      <p>Chi tiết đơn hàng:</p>
      ${listItems}
      <p>Quý khách có thể kiểm tra tình trạng đơn hàng và theo dõi lộ trình giao hàng qua tài khoản của mình trên website của chúng tôi. Nếu có bất kỳ thắc mắc hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua <a href="mailto:kuroko3105@gmail.com">kuroko3105@gmail.com</a>.</p>
      <p>Chúng tôi hy vọng quý khách sẽ có những trải nghiệm thú vị với cuốn sách đã chọn.</p>
      <p>Trân trọng,<br>
      [Đội Ngũ Hỗ Trợ Khách Hàng]<br>
      QBook Shop</p>
    </div>`, // html body
    attachments: attachImage,
  });
};

const sendEmailDeleteOrder = async (email, order) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: `Đơn hàng có mã DH${order?._id} đã được hủy thành công!`, // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div>
      <p>Chào <strong>${order?.shippingAddress?.fullName}</strong>,</p>
      <p>
        Chúng tôi xin thông báo rằng đơn hàng của bạn với mã số <strong>DH${order?._id}</strong> đã được hủy thành công. Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ thêm, xin vui lòng liên hệ với chúng tôi qua <a href="mailto:kuroko3105@gmail.com">kuroko3105@gmail.com</a>.
      </p>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <p>Trân trọng,<br>
      [Đội Ngũ Hỗ Trợ Khách Hàng]<br>
      QBook Shop</p>
    </div>`, // html body
  });
};

const sendEmailContact = async (newContact) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: newContact?.email, // list of receivers
    subject: `Liên hệ có mã ${newContact?._id} đã được gửi thành công!`, // Subject line
    text: "Hello world?", // plain text body
    html: `
    <div>
      <p>Chào <strong>${newContact?.userName}</strong>,</p>
      <p>
        Chúng tôi xin thông báo rằng liên hệ của bạn với mã số <strong>LH${newContact?._id}</strong> đã được gửi thành công. Chúng tôi sẽ phản hồi ý kiến đóng góp của bạn trong thời gian sớm nhất.
      </p>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <p>Trân trọng,<br>
      [Đội Ngũ Hỗ Trợ Khách Hàng]<br>
      QBook Shop</p>
    </div>`, // html body
  });
};

module.exports = {
  sendEmailCreateOrder,
  sendEmailDeleteOrder,
  sendEmailContact,
};
