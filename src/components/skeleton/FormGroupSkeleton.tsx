import { Skeleton } from "antd";

const FormGroupSkeleton = () => {
  return <Skeleton.Node fullSize children={false} className="!h-[200px] !w-full" />;
};

export default FormGroupSkeleton;
