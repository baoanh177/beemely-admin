import FormGroup from "@/components/form/FormGroup";
import { Checkbox } from "antd";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";
import { useHookDataProductForm } from "../utils/dataProductForm";

interface ILabelsGroupProps extends FormikProps<IProductFormInitialValues> {}
const LabelsGroup = ({ values, errors, touched, setFieldValue }: ILabelsGroupProps) => {
  const { stateLabel, getAllLabelsLoading, stateTag, getAllTagsLoading } = useHookDataProductForm();
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormGroup title="Nhãn hiệu" isLoading={getAllLabelsLoading}>
        <div>
          <label className="mb-2 block text-[14px]"> Chọn Nhãn hiệu</label>
          <Checkbox.Group
            options={stateLabel?.labels.map((label) => ({ value: label.id, label: label.name }))}
            value={values.labels}
            onChange={(checkedValues) => setFieldValue("labels", checkedValues)}
          />
          {touched.labels && errors.labels && <div className="text-sm text-red-500"> {errors.labels} </div>}
        </div>
      </FormGroup>
      <FormGroup title="Thẻ" isLoading={getAllTagsLoading}>
        <div>
          <label className="mb-2 block text-[14px]"> Chọn thẻ</label>
          <Checkbox.Group
            options={stateTag?.tags.map((tag) => ({ value: tag.id, label: tag.name }))}
            value={values.tags}
            onChange={(checkedValues) => setFieldValue("tags", checkedValues)}
          />
          {touched.tags && errors.tags && <div className="text-sm text-red-500"> {errors.tags} </div>}
        </div>
      </FormGroup>
    </div>
  );
};

export default LabelsGroup;
