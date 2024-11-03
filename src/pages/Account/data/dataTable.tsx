import StatusBadge from "@/components/common/StatusBadge";
import ImageTable from "@/components/table/ImageTable";
import { SUPER_ADMIN_NAME } from "@/services/config/constants";
import { AppDispatch } from "@/services/store";
import { IAccount } from "@/services/store/account/account.model";
import { deleteAccount, updateAccount } from "@/services/store/account/account.thunk";
import { IUserProfile } from "@/services/store/auth/auth.model";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { EActiveStatus, EStatusName } from "@/shared/enums/status";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { NavigateFunction } from "react-router-dom";

export const getGridButtons = (dispatch: AppDispatch, navigate: NavigateFunction): IGridButton[] => {
  return [
    {
      type: EButtonTypes.ACTIVE,
      onClick(record) {
        dispatch(
          updateAccount({
            body: { status: record.status === EActiveStatus.ACTIVE ? EActiveStatus.INACTIVE : EActiveStatus.ACTIVE },
            param: record.key,
          }),
        );
      },
      permission: EPermissions.UPDATE_ACCOUNT,
    },
    {
      type: EButtonTypes.VIEW,
      onClick(record) {
        navigate(`/accounts/detail/${record.key}`);
      },
      permission: EPermissions.READ_ACCOUNT,
    },
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/accounts/update/${record.key}`);
      },
      permission: EPermissions.UPDATE_ACCOUNT,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteAccount({ param: record.key }));
      },
      permission: EPermissions.DELETE_ACCOUNT,
    },
  ];
};

export const getColumnsData = (): ColumnsType => {
  return [
    {
      dataIndex: "info",
      title: "Thông tin",
      width: 800,
    },
    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "phone",
      title: "Số điện thoại",
    },
    {
      dataIndex: "roles",
      title: "Vai trò",
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      align: "center",
      render(_, record) {
        return record.status === EActiveStatus.ACTIVE ? (
          <StatusBadge text={EStatusName.ACTIVE} color="green" />
        ) : (
          <StatusBadge text={EStatusName.INACTIVE} color="red" />
        );
      },
    },
  ];
};

export const getAccountsData = (accounts: IAccount[], currentUser: IUserProfile) => {
  return accounts.map((acc) => {
    const isSuperAdmin = acc.roles.some((role) => role.name === SUPER_ADMIN_NAME);
    const isCurrentUser = acc.id === currentUser.id;
    return {
      key: acc.id,
      info: <ImageTable title={acc.fullName} imageSrc={acc.avatarUrl} description={acc.gender ? acc.gender.name : ""} />,
      email: acc.email,
      phone: acc.phone,
      roles: acc.roles.map((role, index) => (
        <div key={index} className="text-nowrap">
          {role.name}
        </div>
      )),
      status: acc.status,
      actions: {
        hides: {
          [EButtonTypes.ACTIVE]: isSuperAdmin || isCurrentUser,
          [EButtonTypes.UPDATE]: isSuperAdmin || isCurrentUser,
          [EButtonTypes.DELETE]: isSuperAdmin || isCurrentUser,
        },
      },
    };
  });
};
