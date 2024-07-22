import CustomerDetailCard from "@/components/card/CustomerDetailCard";
import StatCard from "@/components/card/StatCards";
import RoundedIcon from "@/components/common/RoundedIcon";
import StatusBadge from "@/components/common/StatusBadge";
import Heading from "@/components/layout/Heading";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import SecondaryTable from "@/components/table/SecondaryTable";
import { useArchive } from "@/hooks/useArchive";
import { IUserInitialState } from "@/services/store/user/user.slice";
import { getUserById } from "@/services/store/user/user.thunk";
import { Col, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { FaPlane } from "react-icons/fa";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useArchive<IUserInitialState>("user");
  console.log("🦎 ~ CustomerDetail ~ state:", state);

  useEffect(() => {
    dispatch(getUserById(id as string));
  }, []);

  const columns: ColumnsType = [
    {
      dataIndex: "orderId",
      title: "Order ID",
    },
    {
      dataIndex: "product",
      title: "Product",
    },
    {
      dataIndex: "total",
      title: "Total",
    },
    {
      dataIndex: "status",
      title: "Status",
    },
    {
      dataIndex: "date",
      title: "Date",
    },
  ];

  const data: ITableData[] = [
    {
      key: 1,
      orderId: "00001",
      product: <ImageTable imageSrc="" title="Handmade Pouch" description="+3 other products" />,
      total: "$128",
      status: <StatusBadge color="orange" text="Processing" />,
      date: "12 Dec 2023",
    },
    {
      key: 2,
      orderId: "00002",
      product: <ImageTable imageSrc="" title="Handmade Pouch" description="+3 other products" />,
      total: "$228",
      status: <StatusBadge color="orange" text="Processing" />,
      date: "12 Dec 2023",
    },
    {
      key: 3,
      orderId: "00003",
      product: <ImageTable imageSrc="" title="Handmade Pouch" description="+3 other products" />,
      total: "$128",
      status: <StatusBadge color="orange" text="Processing" />,
      date: "12 Dec 2023",
    },
    {
      key: 4,
      orderId: "00004",
      product: <ImageTable imageSrc="" title="Handmade Pouch" description="+3 other products" />,
      total: "$128",
      status: <StatusBadge color="orange" text="Processing" />,
      date: "12 Dec 2023",
    },
  ];

  return (
    <>
      <Heading title="User Detail" hasBreadcrumb />
      <Row gutter={[24, 24]}>
        <Col xl={{ span: 6 }}>
          <CustomerDetailCard
            avatar={state.activeUser?.avatarUrl}
            name={state.activeUser?.userName ?? "Unknown"}
            status={{ text: state.activeUser?.status ?? "Unknown", color: "green" }}
            items={[
              { title: state.activeUser?.id ?? "", label: "Customer ID", icon: FaPlane },
              { title: state.activeUser?.email ?? "", label: "Email", icon: FaPlane },
              { title: state.activeUser?.sex ?? "", label: "Gender", icon: FaPlane },
              { title: state.activeUser?.phone ?? "", label: "Phone", icon: FaPlane },
              { title: state.activeUser?.birthDay ?? "", label: "Birthday", icon: FaPlane },
            ]}
          />
        </Col>
        <Col span={18} className="flex flex-col gap-6">
          <Row gutter={[24, 24]}>
            <Col xl={{ span: 8 }}>
              <StatCard
                icon={<RoundedIcon icon={FaPlane} shape="square" color="green" size="medium" />}
                title="Total Orders"
                value={2400}
                percentageChange={12}
                changeValue="+ 120 this month"
              />
            </Col>
            <Col xl={{ span: 8 }}>
              <StatCard
                icon={<RoundedIcon icon={FaPlane} shape="square" color="orange" size="medium" />}
                title="Total Orders"
                value={2400}
                percentageChange={12}
                changeValue="+ 10 today"
              />
            </Col>
            <Col xl={{ span: 8 }}>
              <StatCard
                icon={<RoundedIcon icon={FaPlane} shape="square" color="primary" size="medium" />}
                title="Total Orders"
                value={2400}
                percentageChange={12}
                changeValue="+ 32 this week"
              />
            </Col>
          </Row>
          <SecondaryTable columns={columns} data={data} title="Transaction History" />
        </Col>
      </Row>
    </>
  );
};

export default CustomerDetail;
