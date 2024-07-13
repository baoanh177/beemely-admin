import Breadcrumb from "@/components/Breadcrumb";
import Button, { IButtonProps } from "@/components/common/Button";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { Permissions } from "@/shared/enums/permissions";

interface IHeadingButton extends IButtonProps {
  permission?: Permissions;
}

interface IHeadingProps {
  title: string;
  hasBreadcrumb?: boolean;
  buttons?: IHeadingButton[];
}

const Heading = ({ title, hasBreadcrumb, buttons = [] }: IHeadingProps) => {
  const { state } = useArchive<IAuthInitialState>("auth");
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="display-m-semibold text-black-500">{title}</h3>
        {hasBreadcrumb && <Breadcrumb />}
      </div>

      <div className="flex shrink-0 gap-4">
        {buttons?.map((btn, index) => {
          if (btn.permission) {
            const userPermissions = state.profile?.listNamePermission;
            const canAccess = userPermissions?.includes(btn.permission) || userPermissions?.includes(Permissions.ALL);
            return canAccess && <Button key={index} {...btn} />;
          }
          return <Button key={index} {...btn} />;
        })}
      </div>
    </div>
  );
};

export default Heading;
