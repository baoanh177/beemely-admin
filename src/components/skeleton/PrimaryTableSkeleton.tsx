import { Skeleton } from "antd";

const PrimaryTableSkeleton = () => {
  return <Skeleton.Node fullSize children={false} className="!h-[60dvh] !w-full" />;
};

export default PrimaryTableSkeleton;
