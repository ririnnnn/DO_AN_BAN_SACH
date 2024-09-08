import { Col, Image, Row } from "antd";
import Link from "antd/es/typography/Link";
import atm from "../../assets/images/atm.png";
import delivery from "../../assets/images/delivery.png";
import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import paypal from "../../assets/images/paypal.png";
import visa from "../../assets/images/visa.png";
import vnpay from "../../assets/images/vnpay.png";
import zalo from "../../assets/images/zalo.png";

const FOOTER_COL_BODY_STYLE = "text-sm mb-2 cursor-pointer";
const FOOTER_COL_IMAGE_STYLE = "inline-block mr-4 w-[32px] h-[32px] mb-2";

const FooterComponent = () => {
  return (
    <div className="w-full h-[250px] bg-[#f5f5fa]">
      <div className="w-[1285px] h-full flex mx-auto my-0 bg-white">
        <Row className="w-full flex justify-between p-[10px]">
          <Col span={4}>
            <div className="text-lg mb-3">Hỗ trợ khách hàng</div>
            <div className={FOOTER_COL_BODY_STYLE}>
              <div>
                Hotline: <b style={{ color: "rgb(56, 56, 61)" }}>0369554336</b>
              </div>
              <div>(1000 đ/phút, 8-21h kể cả T7, CN)</div>
            </div>
            <div className={FOOTER_COL_BODY_STYLE}>Các câu hỏi thường gặp</div>
            <div className={FOOTER_COL_BODY_STYLE}>Hướng dẫn đặt hàng</div>
            <div className={FOOTER_COL_BODY_STYLE}>Chính sách đổi trả</div>
            <div className={FOOTER_COL_BODY_STYLE}>Gửi yêu cầu hỗ trợ</div>
          </Col>
          <Col span={4}>
            <div className="text-lg mb-3">Về QBook</div>
            <div className={FOOTER_COL_BODY_STYLE}>Giới thiệu về QBook</div>
            <div className={FOOTER_COL_BODY_STYLE}>Tuyển dụng</div>
            <div className={FOOTER_COL_BODY_STYLE}>
              Chính sách bảo mật thanh toán
            </div>
            <div className={FOOTER_COL_BODY_STYLE}>
              Chính sách bảo mật thông tin cá nhân
            </div>
          </Col>
          <Col span={4}>
            <div className="text-lg mb-3">Hợp tác và liên kết</div>
            <div className={FOOTER_COL_BODY_STYLE}>
              Quy chế hoạt động Sàn GDTMĐT
            </div>
            <div className={FOOTER_COL_BODY_STYLE}>Bán hàng cùng QBook</div>
          </Col>
          <Col span={4}>
            <div className="text-lg mb-3">Phương thức thanh toán</div>
            <div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Image preview={false} src={paypal} alt="paypal" />
              </div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Image preview={false} src={visa} alt="visa" />
              </div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Image preview={false} src={delivery} alt="delivery" />
              </div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Image preview={false} src={atm} alt="atm" />
              </div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Image preview={false} src={vnpay} alt="vnpay" />
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className="text-lg mb-3">Kết nối với chúng tôi</div>
            <div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Link href="" target="_blank">
                  <Image preview={false} src={facebook} alt="facebook" />
                </Link>
              </div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Link href="" target="_blank">
                  <Image preview={false} src={github} alt="github" />
                </Link>
              </div>
              <div className={FOOTER_COL_IMAGE_STYLE}>
                <Link href="" target="_blank">
                  <Image preview={false} src={zalo} alt="zalo" />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="text-base w-full h-[60px] flex items-center justify-center">
        Copyright © 2024 (Powered by ReactJS & Ant Design)
      </div>
    </div>
  );
};

export default FooterComponent;
