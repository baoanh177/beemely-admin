import Button from "@/components/Button"
import FormCheck from "@/components/form/FormCheck"
import FormInput from "@/components/form/FormInput"
import FormSelect from "@/components/form/FormSelect"
import { IoSaveOutline } from "react-icons/io5"

const Components = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
                <div className="display-m-medium">FormInput: Form input text and number</div>
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
                <div className="display-m-medium">FormSelect: Select single and multiple</div>
                <div className="flex flex-col gap-2">
                    <FormSelect placeholder="Đây là select single có label" label="This is label" options={[{ value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4" }]}
                    />
                    <FormSelect placeholder="Đây là select multiple" isMultiple options={[{ value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4" }]}
                    />
                    <FormSelect placeholder="Đây là select multiple" options={[{ value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4" }]}
                    />
                    <FormSelect placeholder="Đây là select multiple" defaultValue={"Option 4"} options={[{ value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4" }]}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="display-m-medium">FormCheck: Check box</div>
                <div className="flex flex-col gap-2">
                    <FormCheck label="Đây là check box thường" />
                    <FormCheck isDefaultChecked label="Đây là check box có isDefauultChecked" />
                    <FormCheck isDisable label="Đây là check box có isDiable" />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="display-m-medium">Button: Button</div>
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
        </div>
    )
}

export default Components