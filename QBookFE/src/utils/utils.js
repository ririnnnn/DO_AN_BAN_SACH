export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export function convertPrice(price) {
  try {
    if (price) {
      return price.toLocaleString().replaceAll(",", ".");
    }
  } catch (error) {
    return error;
  }
}

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID, // You App ID
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: "v8.6", // use version 2.1
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

export const convertDataChart = (dataChart, type) => {
  const object = {};
  Array.isArray(dataChart) &&
    dataChart.forEach((item) => {
      if (!object[item[type]]) {
        object[item[type]] = 1;
      } else {
        object[item[type]] += 1;
      }
    });
  const result =
    Array.isArray(Object.keys(object)) &&
    Object.keys(object).map((item, index) => {
      return {
        name: item,
        value: object[item],
      };
    });
  return result;
};

export const convertDate = (inputDateRaw) => {
  // Tạo một đối tượng ngày từ chuỗi
  const inputDate = new Date(inputDateRaw);

  // Lấy các thành phần ngày tháng
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
  const year = inputDate.getUTCFullYear();

  // Tạo chuỗi ngày tháng mới
  const outputDateString = day + "/" + month + "/" + year;
  return outputDateString;
};

export const convertMonth = (inputDateRaw) => {
  // Tạo một đối tượng ngày từ chuỗi
  const inputDate = new Date(inputDateRaw);

  // Lấy các thành phần tháng
  const month = inputDate.getUTCMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1

  return month;
};

export const convertYear = (inputDateRaw) => {
  const inputDate = new Date(inputDateRaw);

  const year = inputDate.getUTCFullYear();

  return year;
};

export const convertDataContentOfTooltip = (dataContent, month, year) => {
  const totalPriceOfMonth = dataContent?.reduce((total, item) => {
    return (total =
      total +
      (item?.isPaid === true &&
      item?.isDelivered === "Đã giao hàng" &&
      convertMonth(item?.createdAt) === month &&
      (convertYear(item?.createdAt) + "") === year
        ? item?.totalPrice
        : 0));
  }, 0);

  return totalPriceOfMonth;
};

export const SmoothHorizontalScrolling = (e, time, amount, start) => {
  var eAmt = amount / 100;
  var curTime = 0;
  var scrollCounter = 0;
  const y = window.scrollY;
  while (curTime <= time) {
    window.setTimeout(SHS_B, curTime, e, scrollCounter, eAmt, start, y);
    curTime += time / 100;
    scrollCounter++;
  }
  window.scrollTo(0, y);
};

const SHS_B = (e, sc, eAmt, start, y) => {
  e.scrollLeft = eAmt * sc + start;
};
