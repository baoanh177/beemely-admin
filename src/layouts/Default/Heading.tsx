import Breadcrumb from "@/components/Breadcrumb";
import Button, { IButtonProps } from "@/components/Button";

interface IHeadingProps {
  title: string;
  hasBreadcrumb?: boolean;
  buttons?: IButtonProps[];
}

const Heading = ({ title, hasBreadcrumb, buttons = [] }: IHeadingProps) => {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="display-m-semibold text-black-500">{title}</h3>
        {hasBreadcrumb && <Breadcrumb />}
      </div>

      <div className="flex gap-4">{buttons?.map((btn) => <Button {...btn} />)}</div>
    </div>
  );
};

export default Heading;
