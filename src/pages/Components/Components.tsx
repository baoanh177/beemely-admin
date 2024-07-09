import Button from "@/components/Button";
import FormCheck from "@/components/form/FormCheck";
import FormDate from "@/components/form/FormDate";
import FormInput from "@/components/form/FormInput";
import FormInputArea from "@/components/form/FormInputArea";
import FormSelect from "@/components/form/FormSelect";
import Heading from "@/layouts/Default/Heading";
import UpdateImage from "@/components/form/FormUpload";
import { IoBagOutline, IoSaveOutline } from "react-icons/io5";
import ImageTable from "@/components/table/ImageTable";
import PrimaryTable from "@/components/table/PrimaryTable";
import { tableColumns, tableData } from "./table-data";
import StatusBadge from "@/components/table/StatusBadge";
import SecondaryTable, { columns, data } from "@/components/table/SecondaryTable";
import CustomerCard, { customerData } from "@/components/CardCustomer";
import OrderInForCard, { dataItemsOrderInforCard } from "@/components/OrderInforCard";
import DateRangePicker from "@/components/form/FormDateRangePicker";
import RoundedIcon from "@/components/RoundedIcon";
import CustomerDetailCard from "@/components/CustomerDetailCard";
import { FaShoppingCart, FaTrophy, FaMoneyBill } from "react-icons/fa";
import StatCard from "@/components/StatCards";
import OrderStatusCard, { stepsData } from "@/components/OrderStatusCard";
const Components = () => {
  return (
    <>
      <Heading title="Components" hasBreadcrumb />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-5">
          <div className="display-s-regular">FormInput: Form input text and number</div>
          <div className="flex flex-col gap-2">
            <FormInput placeholder="Đây là input number" type="number" />
            <FormInput placeholder="Đây là input number bị disabled" isDisabled type="number" />
            <FormInput placeholder="Đây là input text" type="text" />
            <FormInput error="error!!!" placeholder="Đây là input text bị lỗi" type="text" />
            <FormInput placeholder="Đây là input text bị readonly" isReadonly type="text" />
            <FormInput placeholder="Đây là input text có label" label="This is label" type="text" />
            <FormInput placeholder="Đây là input password" label="This is label" type="password" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <div className="display-s-regular">FormSelect: Select single and multiple</div>
          <div className="flex flex-col gap-2">
            <FormSelect
              placeholder="Đây là select single có label"
              label="This is label"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
              ]}
            />
            <FormSelect
              placeholder="Đây là select multiple"
              isMultiple
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
              ]}
            />
            <FormSelect
              placeholder="Đây là select single"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
              ]}
            />
            <FormSelect
              placeholder="Đây là select single có default value"
              defaultValue={"Option 4"}
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
              ]}
            />
            <FormSelect
              placeholder="Đây là select multiple có default value"
              isMultiple
              defaultValue={"Option 4"}
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
              ]}
            />
            <FormSelect
              placeholder="Đây là select multiple có isDisabled"
              isDisabled
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4" },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <div className="display-s-regular">FormCheck: Check box</div>
          <div className="flex flex-col gap-2">
            <FormCheck label="Đây là check box thường" />
            <FormCheck isDefaultChecked label="Đây là check box có isDefauultChecked" />
            <FormCheck isDisable label="Đây là check box có isDiable" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <div className="display-s-regular">Button: Button</div>
          <div className="flex flex-col gap-2">
            <Button text="Đây là button primary" />
            <Button isLoading text="Đây là button primary có isLoading" />
            <Button isDisabled text="Đây là button primary có isDisabled" />
            <Button icon={<IoSaveOutline />} text="Đây là button primary có icon" />
            <Button type="secondary" text="Đây là button secondary" />
            <Button type="secondary" isLoading text="Đây là button secondary có isLoading" />
            <Button type="secondary" isDisabled text="Đây là button secondary có isDisabled" />
            <Button type="secondary" icon={<IoSaveOutline />} text="Đây là button secondary có icon" />
            <Button type="ghost" text="Đây là button ghost" />
            <Button type="ghost" isLoading text="Đây là button ghost có isLoading" />
            <Button type="ghost" isDisabled text="Đây là button ghost có isDisabled" />
            <Button type="ghost" icon={<IoSaveOutline />} text="Đây là button ghost có icon" />
            <Button size="full" text="Đây là button có w-full" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="display-s-regular mb-2">FormDate</h1>
          <FormDate />
          <label>{"FormDate RangePicker"}</label>
          <DateRangePicker />
          <h1 className="display-s-regular mb-2">FormInputArea</h1>
          <FormInputArea label="Description" />
          <FormInputArea label="Description" defaultValue="Example text" />
          <FormInputArea error="error" label="Description err" />
          <FormInputArea isReadonly label="Description Readonly" />
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="display-s-regular mb-2">FormUpload</h1>
          <UpdateImage />
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="display-s-regular mb-2">Table</h1>
          <PrimaryTable
            search={{ status: [{ value: "lnog", label: "123" }] }}
            columns={tableColumns}
            pagination={{ current: 1, pageSize: 5, total: tableData.length }}
            data={tableData}
          />
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="display-s-regular mb-2">Image-table</h1>
          <ImageTable imageSrc="https://picsum.photos/200/300" title="Handmade Pouch" description="+3 other products" />
          <ImageTable imageSrc="https://picsum.photos/200/300sdfrg" title="Smartwatch E2" description="+1 other products" />
          <ImageTable imageSrc="" title="No Image" description="No image" />
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="display-s-regular mb-2">Status-table</h1>
          <StatusBadge text="Processing" color="orange" />
          <StatusBadge text="Shiped" color="blue" />
          <StatusBadge text="Delivered" color="green" />
          <StatusBadge text="Draft" color="gray" />
          <StatusBadge text="Out of Stock" color="red" />
        </div>
        <SecondaryTable columns={columns} title="SeconderyTable" data={data} />
      </div>

      {customerData.map((customer, index) => (
        <CustomerCard
          key={index}
          image={customer.image}
          title={customer.title}
          status={customer.status}
          orders={customer.orders}
          balance={customer.balance}
        />
      ))}

      <div className="flex flex-col items-start gap-5">
        <OrderInForCard title={"Shipping"} icon={IoBagOutline} status={{ color: "orange", text: "Processing" }} items={dataItemsOrderInforCard} />
      </div>
      <div className="flex flex-col items-start gap-5">
        <RoundedIcon icon={IoBagOutline} color="red" shape="square" size="large" />
      </div>
      <div className="flex flex-col items-start gap-5">
        <CustomerDetailCard items={dataItemsOrderInforCard} name="Linda Blair" status={{ color: "green", text: "Active" }} />
      </div>
      <div className="flex items-start gap-4">
        <StatCard
          title="Total Orders"
          value={2400}
          percentageChange={1}
          changeValue="+24 this month"
          icon={<RoundedIcon icon={FaShoppingCart} color="orange" size="large" shape="square" />}
        />
        <StatCard
          title="Total Balance"
          value="$100.00"
          percentageChange={10}
          changeValue="+$10 today"
          icon={<RoundedIcon icon={FaMoneyBill} color="primary" size="large" shape="square" />}
        />
        <StatCard
          title="Reward Points"
          value={1200}
          percentageChange={-5}
          changeValue="-60 today"
          icon={<RoundedIcon icon={FaTrophy} color="green" size="large" shape="square" />}
        />
      </div>
      <div className="flex flex-col items-start gap-5">
        <OrderStatusCard itemSteps={stepsData} currentStep={2} />
      </div>
    </>
  );
};
export default Components;
