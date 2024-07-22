import CustomerCard from "@/components/card/CustomerCard";
import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import { IUserInitialState } from "@/services/store/user/user.slice";
import { getAllUsers } from "@/services/store/user/user.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IUserInitialState>("user");

  useEffect(() => {
    dispatch(getAllUsers({ query: state.filter }));
  }, []);
  return (
    <>
      <Heading
        title="Users"
        hasBreadcrumb
        buttons={[
          {
            text: "Create User",
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_USER,
          },
        ]}
      />
      <div className="flex flex-wrap gap-6">
        {state.users.map((user) => {
          return <CustomerCard
            key={user.id}
            image={user.avatarUrl}
            username={user.userName}
            status={{ text: user.status ?? "Inactive", color: user.status ? "green" : "red" }}
            balance={12}
            orders={2}
            onClick={() => navigate(`/users/detail/${user.id}`)}
          />;
        })}
      </div>
    </>
  );
};

export default Users;
