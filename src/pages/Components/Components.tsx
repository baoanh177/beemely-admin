import Button from "@/components/Button";
import FormCheck from "@/components/form/FormCheck";
import FormDate from "@/components/form/FormDate";
import FormInput from "@/components/form/FormInput";
import FormInputArea from "@/components/form/FormInputArea";
import FormSelect from "@/components/form/FormSelect";
import { tableData, tableColumns, onSelectChange } from "./table-data";

import Heading from "@/layouts/Default/Heading";

import UpdateImage from "@/components/form/FormUpload";

import { IoSaveOutline } from "react-icons/io5";
import { Table } from "antd";
import ImageTable from "@/components/table/ImageTable";
import StatusTable from "@/components/table/StatusTable";

const Components = () => {
  return (
    <>
      <Heading title="Components" hasBreadcrumb />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="display-s-regular">FormInput: Form input text and number</div>
          <div className="flex flex-col gap-2">
            <FormInput placeholder="Đây là input number" type="number" />
            <FormInput placeholder="Đây là input number bị disabled" isDisabled type="number" />
            <FormInput placeholder="Đây là input text" type="text" />
            <FormInput error="error!!!" placeholder="Đây là input text bị lỗi" type="text" />
            <FormInput placeholder="Đây là input text bị readonly" isReadonly type="text" />
            <FormInput placeholder="Đây là input text có label" label="This is label" type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
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
        <div className="flex flex-col gap-5">
          <div className="display-s-regular">FormCheck: Check box</div>
          <div className="flex flex-col gap-2">
            <FormCheck label="Đây là check box thường" />
            <FormCheck isDefaultChecked label="Đây là check box có isDefauultChecked" />
            <FormCheck isDisable label="Đây là check box có isDiable" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
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
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="display-s-regular mb-2">FormDate</h1>
          <FormDate />
          <h1 className="display-s-regular mb-2">FormInputArea</h1>
          <FormInputArea label="Description" />
          <FormInputArea label="Description" defaultValue="Example text" />
          <FormInputArea error="error" label="Description err" />
          <FormInputArea isReadonly label="Description Readonly" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="display-s-regular mb-2">FormUpload</h1>
          <UpdateImage />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="display-s-regular mb-2">Table</h1>
          <Table
            rowSelection={{
              onChange: onSelectChange,
            }}
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="display-s-regular mb-2">Image-table</h1>
          <ImageTable imageSrc="https://picsum.photos/200/300" title="Handmade Pouch" description="+3 other products" />
          <ImageTable imageSrc="https://picsum.photos/200/300sdfrg" title="Smartwatch E2" description="+1 other products" />
          <ImageTable imageSrc="" title="No Image" description="No image" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="display-s-regular mb-2">Status-table</h1>
          <StatusTable text="Processing" type="processing" />
          <StatusTable text="Shiped" type="shipped" />
          <StatusTable text="Delivered" type="delivered" />
        </div>
      </div>
    </>
  );
};

export default Components;
