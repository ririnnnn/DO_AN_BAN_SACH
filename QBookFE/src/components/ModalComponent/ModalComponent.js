import { Modal } from "antd";

const ModalComponent = ({
  title = "Modal",
  open = false,
  onCancel,
  footer,
  children,
  onOk,
  ...rests
}) => {
  return (
    <Modal title={title} open={open} onCancel={onCancel} onOk={onOk} footer={footer} {...rests}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
