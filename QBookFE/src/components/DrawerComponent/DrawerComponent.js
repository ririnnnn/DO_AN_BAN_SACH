import { Drawer } from "antd";

const DrawerComponent = ({
  title = "Chi tiết sản phẩm",
  placement = "right",
  children,
  onClose,
  open = false,
  ...rests
}) => {
  return (
    <Drawer title={title} placement={placement} onClose={onClose} open={open} {...rests}>
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
