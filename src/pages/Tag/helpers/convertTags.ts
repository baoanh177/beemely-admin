import { ITag } from "@/services/store/tag/tag.model";
import lodash from "lodash";

interface ITreeTag extends Omit<ITag, "parentId"> {
  children: ITreeTag[];
}

export const handleConvertTags = (tags: ITag[]) => {
  const rootTags: ITreeTag[] = [];

  // * Chưa tối ưu
  for (const tag of tags) {
    if (!tag.parentId) rootTags.push({ ...lodash.omit(tag, ["parentId"]), children: [] });
  }

  // * Chưa tối ưu
  for (const tag of tags) {
    if (tag.parentId) {
      for (const hihi of rootTags) {
        if (hihi.id === tag.parentId.id) hihi.children.push({ ...lodash.omit(tag, ["parentId"]), children: [] });
      }
    }
  }

  return rootTags;
};
