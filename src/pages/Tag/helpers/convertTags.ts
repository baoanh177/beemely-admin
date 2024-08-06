import { ITag } from "@/services/store/tag/tag.model";
import lodash from "lodash";

interface ITreeTag extends Omit<ITag, "parentId"> {
  children: ITreeTag[];
  key?: string;
}

export const handleConvertTags = (tags: ITag[]): ITreeTag[] => {
  const tagMap = new Map<string, ITreeTag>();

  tags.forEach((tag) => {
    tagMap.set(tag.id, { ...lodash.omit(tag, ["parentId"]), children: [], key: tag.id });
  });

  const rootTags: ITreeTag[] = [];

  tags.forEach((tag) => {
    const treeTag = tagMap.get(tag.id)!;
    if (tag.parentId) {
      const parentTag = tagMap.get(tag.parentId.id);
      if (parentTag) {
        parentTag.children.push(treeTag);
      }
    } else {
      rootTags.push(treeTag);
    }
  });

  return rootTags;
};
