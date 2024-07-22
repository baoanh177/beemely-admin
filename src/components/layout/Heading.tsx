import Breadcrumb from "@/components/Breadcrumb";
import Button, { IButtonProps } from "@/components/common/Button";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { EPermissions } from "@/shared/enums/permissions";
import { Col, Row } from "antd";

interface IHeadingButton extends IButtonProps {
  permission?: EPermissions;
}

interface IHeadingProps {
  title: string;
  hasBreadcrumb?: boolean;
  buttons?: IHeadingButton[];
}

const Heading = ({ title, hasBreadcrumb, buttons = [] }: IHeadingProps) => {
  const { state } = useArchive<IAuthInitialState>("auth");
  return (
    <Row className="flex items-end justify-between gap-6">
    <Col className="flex shrink-0 flex-col gap-2">
      <h3 className="display-m-semibold text-black-500">{title}</h3>
      {hasBreadcrumb && <Breadcrumb />}
    </Col>

    <Col className="flex shrink-0 gap-4">
      {buttons?.map((btn, index) => {
        if (btn.permission) {
          const userPermissions = state.profile?.listNamePermission;
          const canAccess = userPermissions?.includes(btn.permission);
          return canAccess && <Button key={index} {...btn} />;
        }
        return <Button key={index} {...btn} />;
      })}
    </Col>
  </Row>
  );
};

export default Heading;
