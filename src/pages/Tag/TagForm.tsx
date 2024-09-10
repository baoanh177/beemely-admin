import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { ITagInitialState } from "@/services/store/tag/tag.slice";
import { createTag, getAllTags, updateTag } from "@/services/store/tag/tag.thunk";
import { ITag } from "@/services/store/tag/tag.model";
import UploadImage from "@/components/form/UploadImage";
import FormSwitch from "@/components/form/FormSwitch";
import { useEffect } from "react";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Col, Row } from "antd";
import { EActiveStatus } from "@/shared/enums/status";
import FormTreeSelect from "@/components/form/FormTreeSelect";
import Label from "@/components/form/Label";

interface ITagFormProps {
  formikRef?: FormikRefType<ITagFormInitialValues>;
  type: "create" | "update";
  tag?: ITag;
  isFormLoading?: boolean;
}

export interface ITagFormInitialValues {
  id?: string;
  name: string;
  description?: string;
  slug: string;
  image: string;
  parentId: string | null;
  status: EActiveStatus;
}

const TagForm = ({ formikRef, type, tag, isFormLoading = false }: ITagFormProps) => {
  const { dispatch, state } = useArchive<ITagInitialState>("tag");

  useEffect(() => {
    dispatch(getAllTags({}));
  }, [dispatch]);
  const convertToTreeData = (tags: ITag[], parentId: string | null = null): any[] => {
    return tags
      .filter((tag) => (parentId === null ? !tag.parentId : tag.parentId?.id === parentId))
      .map((tag) => ({
        value: tag.id,
        title: tag.name,
        children: convertToTreeData(tags, tag.id),
      }));
  };

  const allTags = state.tags || [];
  const treeData = [{ value: "", title: "Không có parent" }, ...convertToTreeData(allTags.filter((t) => t.id !== tag?.id))];
  const initialValues: ITagFormInitialValues = {
    name: tag?.name || "",
    description: tag?.description || "",
    slug: tag?.slug || "",
    image: tag?.image || "",
    parentId: tag?.parentId?.id || null,
    status: tag?.status || EActiveStatus.INACTIVE,
  };
  const tagSchema = object().shape({
    name: string().required("Vui lòng nhập tên thẻ"),
    image: string().required("Vui lòng chọn hình ảnh"),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={tagSchema}
      onSubmit={(data) => {
        const { parentId, ...rest } = data;
        const apiData = {
          ...rest,
          parent_id: parentId === "" ? null : parentId,
        };
        const filteredData = type === "create" ? lodash.omit(apiData, ["id", "slug", "status"]) : lodash.omit(apiData, ["slug"]);

        if (type === "create") {
          dispatch(createTag({ body: filteredData }));
        } else if (type === "update" && tag?.id) {
          dispatch(updateTag({ body: filteredData, param: tag.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6} lg={6}>
            <FormGroup title="Ảnh thẻ">
              <Label text="Ảnh" isRequired />
              <UploadImage
                isMultiple={false}
                onImageUpload={(imageURL) => {
                  const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
                  setFieldValue("image", url);
                }}
                currentImageUrl={values.image ? [values.image] : []}
                error={touched.image ? errors.image : ""}
              />
            </FormGroup>
          </Col>
          <Col xs={24} md={18} lg={18}>
            <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
              <Label text="Tên thẻ" isRequired />
              <FormInput
                placeholder="Nhập tên thẻ ở đây..."
                name="name"
                value={values.name}
                error={touched.name ? errors.name : ""}
                onChange={(e) => setFieldValue("name", e)}
                onBlur={handleBlur}
              />
              <Label text="Thẻ gốc" />
              <FormTreeSelect
                value={values.parentId || ""}
                error={touched.parentId ? errors.parentId : ""}
                onChange={(value) => setFieldValue("parentId", value)}
                treeData={treeData}
                placeholder="Chọn parent tag"
              />
              {type === "update" && (
                <FormSwitch uncheckedText="" checked={values.status === EActiveStatus.ACTIVE} onChange={(e) => setFieldValue("status", e)} />
              )}
              <Label text="Mô tả" />
              <FormInput
                placeholder="Nhập mô tả ở đây..."
                name="description"
                value={values.description}
                error={touched.description ? errors.description : ""}
                onChange={(e) => setFieldValue("description", e)}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default TagForm;
