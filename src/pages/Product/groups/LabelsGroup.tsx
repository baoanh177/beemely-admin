import FormGroup from "@/components/form/FormGroup";
import FormSelect from "@/components/form/FormSelect";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";

interface ILabelsGroupProps extends FormikProps<IProductFormInitialValues> {
  props: any;
}
const LabelsGroup = ({ values, errors, touched, setFieldValue, props }: ILabelsGroupProps) => {
  const { stateLabel, getAllLabelsLoading, stateTag, getAllTagsLoading } = props;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormGroup title="Nhãn hiệu" isLoading={getAllLabelsLoading}>
        <div>
          <label className="mb-2 block text-[14px]"> Chọn Nhãn hiệu</label>

          <FormSelect
            placeholder="Nhấn vào đây để chọn nhãn hiệu"
            isMultiple
            options={stateLabel?.labels.map((label: any) => ({ value: label.id, label: label.name }))}
            value={values.labels}
            onChange={(checkedValues) => setFieldValue("labels", checkedValues)}
          />
          {touched.labels && errors.labels && <div className="text-sm text-red-500"> {errors.labels} </div>}
        </div>
      </FormGroup>
      <FormGroup title="Thẻ" isLoading={getAllTagsLoading}>
        <div>
          <label className="mb-2 block text-[14px]"> Chọn thẻ</label>
          <FormSelect
            placeholder="Nhấn vào đây để chọn thẻ"
            isMultiple
            options={stateTag?.tags.map((tag: any) => ({ value: tag.id, label: tag.name }))}
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
