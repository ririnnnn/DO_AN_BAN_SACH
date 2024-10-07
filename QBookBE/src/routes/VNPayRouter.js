const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const OrderService = require("../services/OrderService");
function formatDateToYYYYMMDDHHMMSS(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
function formatTimeToHHMMSS(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}
function sortObject(obj) {
  // Lấy danh sách các key và sắp xếp theo thứ tự chữ cái
  const sortedKeys = Object.keys(obj).sort();

  // Tạo object mới với các key đã sắp xếp
  const sortedObj = {};
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
}
router.post(
  "/create_payment_url",
  async function (req, res, next) {
    const orderData = req.body.orderData;
    const createOrderResponse = await OrderService.createOrder(orderData);
    const newOrderID = createOrderResponse["orderID"];

    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.VNP_TMNCCODE;
    var secretKey = process.env.VNP_HASHSECRET;
    var vnpUrl = process.env.VNP_URL;
    var returnUrl = process.env.VNP_RETURNURL;

    var date = new Date();

    var createDate = formatDateToYYYYMMDDHHMMSS(date);

    var orderId = formatTimeToHHMMSS(date);
    date.setMinutes(date.getMinutes() + 30);
    var expireDate = formatDateToYYYYMMDDHHMMSS(date);
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderInfo;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = encodeURIComponent(newOrderID);
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = encodeURIComponent(returnUrl);
    vnp_Params["vnp_IpAddr"] = "127.0.0.1";
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_ExpireDate"] = expireDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json({ url: vnpUrl });
  },
  authUserMiddleware
);
// Vui lòng tham khảo thêm tại code demo

//router.route("/delete-many").post(NewController.deleteManyNew);

router.get("/vnpay_ipn", async function (req, res, next) {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var config = require("config");
  var secretKey = config.get("vnp_HashSecret");
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    const orderDetail = await OrderService.getOrderDetail(
      vnp_Params["vnp_OrderInfo"]
    );
    orderDetail.isPaid = true;
    const updateOrderRes = await OrderService.updateOrder(
      vnp_Params["vnp_OrderInfo"],
      orderDetail
    );
    if (updateOrderRes.ok)
      res.status(200).json({ RspCode: "00", Message: "success" });
    else {
      await OrderService.deleteOrder(vnp_Params["vnp_OrderInfo"], orderDetail);
      res.status(200).json({ RspCode: "02", Message: "deleted order" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
});

router.get("/vnpay_return", async function (req, res, next) {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = process.env.VNP_TMNCCODE;
  var secretKey = process.env.VNP_HASHSECRET;

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const orderDetail = await OrderService.getOrderDetail(
      vnp_Params["vnp_OrderInfo"]
    );
    if (vnp_Params["vnp_ResponseCode"] == "00") {
      orderDetail.data.isPaid = true;

      const updateOrderRes = await OrderService.updateOrder(
        vnp_Params["vnp_OrderInfo"],
        orderDetail.data
      );
      console.log("updated ", updateOrderRes);
      if (updateOrderRes.status == "OK") {
        res.redirect(
          "http://localhost:3000/order-detail/" + vnp_Params["vnp_OrderInfo"]
        );
      } else {
        const deleteresult = await OrderService.deleteOrder(
          vnp_Params["vnp_OrderInfo"],
          orderDetail.data
        );
        res.redirect("http://localhost:3000/order");
      }
    } else {
      console.log("here 1");
      const deleteresultawait = await OrderService.deleteOrder(
        vnp_Params["vnp_OrderInfo"],
        orderDetail.data
      );
      console.log("here 2");
      res.redirect("http://localhost:3000/order");
    }
  } else {
    res.render("success", { code: "97" });
  }
});

module.exports = router;
