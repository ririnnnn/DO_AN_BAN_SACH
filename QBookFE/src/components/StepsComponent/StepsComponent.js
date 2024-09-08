import { Steps } from "antd";

const StepsComponent = ({ current = 0, items = [] }) => {
  return <Steps current={current} items={items} />;
};

export default StepsComponent;
