import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as NewService from "../../services/NewService";
import { WrapperNewDetail } from "./styles";

function NewDetailPage() {
  const [dataDetailNew, setDataDetailNew] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDetailNew = async () => {
    const res = await NewService.getDetailNew(id);
    setDataDetailNew(res?.data);
  };

  useEffect(() => {
    fetchDetailNew();
  }, []);

  return (
    <WrapperNewDetail>
      <div className="w-[1285px] h-[100%] mx-auto my-0">
        <div className="text-base py-4">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </span>
          <span>
            {" "}
            /{" "}
            <span className="cursor-pointer" onClick={() => navigate("/news")}>
              Tin tức
            </span>{" "}
            / Chi tiết bài viết / {dataDetailNew?.title}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: dataDetailNew?.ckeditor }}
        ></div>
      </div>
    </WrapperNewDetail>
  );
}

export default NewDetailPage;
