import Grid from "@/components/Grid";
import { useArchive } from "@/hooks/useArchive";
import { ButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { RootStateType } from "@/stores/reducers";
import {
  IAccountInitialState,
  setFilter,
} from "@/stores/actions/account.action";
import { TableColumnsType, Tooltip } from "antd";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  email: string;
  address: string;
}

const fakeData: DataType[] = [
  {
    key: "name",
    age: 20,
    name: "Bao Anh",
    email: "baoanh27042004@gmail.com",
    address: "Ha Noi",
  },
];

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Email",
    width: 100,
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    width: 100,
    dataIndex: "address",
    key: "address",
  },
];

const Accounts = () => {
  // Defines
  const { dispatch, selector, state } =
    useArchive<IAccountInitialState>("account");
  // console.log(state.)

  // States

  // Effects

  // Functions

  // Other
  const buttons: IGridButton[] = [
    {
      type: ButtonTypes.ADD,
      onClick() {},
    },
    {
      type: ButtonTypes.VIEW,
      onClick(record) {
        console.log(record);
      },
    },
    {
      type: ButtonTypes.UPDATE,
      onClick(record) {
        console.log(record);
      },
    },
    {
      type: ButtonTypes.DELETE,
      onClick(record) {
        console.log(record);
      },
    },
  ];


  return (
    <>
      <Grid
        buttons={buttons}
        title="Accounts Management"
        columns={columns}
        data={fakeData}
        state={state!}
        setFilter={setFilter}
      />
    </>
  );
};

export default Accounts;
