import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as ContactService from "../../services/ContactService";
import { sortDate } from "../../utils/sorts";
import { convertDate } from "../../utils/utils";
import {
  WrapperContainer,
  WrapperFooterItem,
  WrapperItemContact,
  WrapperListContact,
  WrapperMyOrderPage,
  WrapperStatus,
  WrapperStatusContent,
  WrapperStatusTitle,
  WrapperStyleTitle,
} from "./styles";

function MyContactPage() {
  const location = useLocation();
  const { id } = location.state;

  const fetchAllContactById = async () => {
    const res = await ContactService.getContactUser(id);
    return res.data;
  };

  const queryContactUser = useQuery({
    queryKey: ["contactUser"],
    queryFn: fetchAllContactById,
  });

  const { data: dataContactUser, isLoading: isLoadingContactUser } =
    queryContactUser;

  const mutationDelete = useMutationHook(({ id }) => {
    const res = ContactService.deleteContact(id);
    return res;
  });

  const {
    data: dataDeleteContact,
    isSuccess: isSuccessDelete,
    isLoading: isLoadingDelete,
  } = mutationDelete;

  useEffect(() => {
    if (isSuccessDelete && dataDeleteContact?.status === "OK") {
      Message.success("Xóa liên hệ thành công!");
    } else if (dataContactUser?.status === "ERROR") {
      Message.error("Xóa liên hệ thất bại!");
    }
  }, [isSuccessDelete]);

  const handleDeleteContact = (contactId) => {
    if (window.confirm(`Bạn có muốn xóa liên hệ có id ${contactId} không?`)) {
      mutationDelete.mutate(
        {
          id: contactId,
        },
        {
          onSuccess: () => {
            queryContactUser.refetch();
          },
        }
      );
    }
  };

  return (
    <LoadingComponent isLoading={isLoadingContactUser || isLoadingDelete}>
      <WrapperContainer>
        <WrapperMyOrderPage>
          <WrapperStyleTitle>Liên hệ của tôi</WrapperStyleTitle>
          <WrapperListContact>
            {dataContactUser?.length > 0 ? (
              sortDate(dataContactUser)?.map((item, index) => (
                <WrapperItemContact key={index}>
                  <WrapperStatus>
                    <WrapperStatusTitle>Liên hệ</WrapperStatusTitle>
                    <WrapperStatusContent>
                      <span>Mã liên hệ: </span>
                      <span>{item?._id}</span>
                    </WrapperStatusContent>
                    <WrapperStatusContent>
                      <span>Ngày gửi liên hệ: </span>
                      <span>{convertDate(item?.createdAt)}</span>
                    </WrapperStatusContent>
                    <WrapperStatusContent>
                      <span>Tên người gửi: </span>
                      <span>{item?.userName}</span>
                    </WrapperStatusContent>
                    <WrapperStatusContent>
                      <span>Email: </span>
                      <span>{item?.email}</span>
                    </WrapperStatusContent>
                    <WrapperStatusContent>
                      <span>Địa chỉ: </span>
                      <span>{item?.address}</span>
                    </WrapperStatusContent>
                    <WrapperStatusContent>
                      <span>Nội dung: </span>
                      <span>{item?.content}</span>
                    </WrapperStatusContent>
                  </WrapperStatus>
                  <WrapperFooterItem>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleDeleteContact(item?._id)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid rgb(11, 116, 229)",
                          borderRadius: "4px",
                        }}
                        buttonText="Xóa liên hệ"
                        styleTextButton={{
                          color: "rgb(11, 116, 229)",
                          fontSize: "14px",
                        }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemContact>
              ))
            ) : (
              <span>Chưa có liên hệ nào...</span>
            )}
          </WrapperListContact>
        </WrapperMyOrderPage>
      </WrapperContainer>
    </LoadingComponent>
  );
}

export default MyContactPage;
