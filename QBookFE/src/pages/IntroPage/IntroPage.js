import React from "react";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f5fa]">
      <div className="w-[1285px] mx-auto my-0 pb-5">
        <div className="text-base py-4">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </span>
          <span> / Giới thiệu</span>
        </div>

        <div>
          <h2 className="text-base">Giới thiệu nhà sách QBook</h2>
          <div className="text-base">
            <br />
            QBook.com là trang thương mại điện tử của Nhà Sách QBook, hệ thống
            nhà sách thân thuộc của nhiều gia đình Việt.
            <br />
            <br />
            Đến với không gian mua sắm trực tuyến QBook.com, khách hàng có thể
            dễ dàng tìm thấy những cuốn sách hay, đa thể loại của nhiều nhà xuất
            bản, công ty sách trong và ngoài nước cùng nhiều dụng cụ học tập,
            văn phòng phẩm, quà lưu niệm, đồ chơi giáo dục chính hãng của những
            thương hiệu uy tín. Cùng tiêu chí không ngừng hoàn thiện, nâng cao
            chất lượng sản phẩm, dịch vụ, Nhà Sách QBook cam kết mang đến cho
            khách hàng trải nghiệm mua sắm trực tuyến an toàn, tiện lợi: cách
            đặt hàng đơn giản, phương thức thanh toán đa dạng, dịch vụ chăm sóc
            khách hàng tận tình, chu đáo.
            <br />
            <br />
            Ngoài danh mục sách đa dạng và phong phú của nhiều nhà xuất bản,
            công ty sách lớn nhỏ cả nước, QBook còn chủ động khai thác bản quyền
            và liên kết xuất bản hàng ngàn đầu sách hay và giá trị với thương
            hiệu QBook, trong đó nhiều tựa được đánh giá cao và lọt vào danh mục
            bán chạy của các hệ thống phát hành sách lớn nhất Việt Nam.
            <br />
            <br />
            Nhà Sách QBook chủ động chọn lọc và phát hành tại Việt Nam danh mục
            sách tiếng Anh đa dạng của những nhà xuất bản lớn trên thế giới như
            Penguin Random House, Hachette Livre, HarperCollins, Macmillan
            Publishers, Simon & Schuster,… Nhiều tựa chỉ có duy nhất tại Nhà
            Sách QBook, nhiều tựa được phát hành cùng thời điểm ra mắt của sách
            tại Anh và Mỹ.
            <br />
            <br />
            QBook là thương hiệu hàng đầu trong ngành Phát hành sách Việt Nam,
            ngay từ thời bao cấp cho đến thời kỳ kinh tế thị trường, đổi mới,
            hội nhập quốc tế, Nhà sách QBook luôn khẳng định vị thế đầu ngành và
            được đánh giá cao trong quá trình xây dựng đời sống văn hóa, trước
            hết là văn hóa đọc của nước nhà. Là doanh nghiệp kinh doanh trên
            lĩnh vực văn hóa, Nhà sách QBook có vai trò và vị thế trong việc giữ
            vững định hướng tư tưởng văn hóa của Nhà nước, góp phần tích cực vào
            việc đáp ứng nhu cầu đọc sách của Nhân dân Thành phố Hà Nội và cả
            nước; thể hiện toàn diện các chức năng kinh tế - văn hóa - xã hội.
            Thông qua các chủ trương và hoạt động như: duy trì một số Nhà sách ở
            các tỉnh có nền kinh tế chưa phát triển, công trình Xe sách Lưu động
            QBook phục vụ bạn đọc ngoại thành tại các huyện vùng sâu, vùng xa,
            định kỳ tổ chức các Hội sách với nhiều quy mô lớn nhỏ khác nhau…
            chứng minh rằng QBook không chỉ quan tâm đến việc kinh doanh mà còn
            mang đến mọi người nguồn tri thức quý báu, góp phần không ngừng nâng
            cao dân trí cho người dân ở mọi miền đất nước, thể hiện sự hài hòa
            giữa các mục tiêu kinh doanh và hoạt động phục vụ xã hội của QBook.
            <br />
            <br />
            Hi vọng với trang thương mại điện tử QBook.com, Nhà Sách QBook có
            thể gia tăng tiện ích cho khách hàng, đồng thời mang những sản phẩm
            của hệ thống nhà sách đến với mọi khách hàng trên cả nước.
            <br />
            <br />
            Quý khách hàng có nhu cầu liên lạc, đóng góp ý kiến, phản hồi về sản
            phẩm dịch vụ, vui lòng liên hệ:
            <br />
            <br />
            Hotline:{" "}
            <span style={{ color: "#ff0000", fontWeight: "bold" }}>
              03912345678
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
