import { ITag } from "@/services/store/tag/tag.model";
import lodash from "lodash";

export interface ITreeTag extends Omit<ITag, "parentId"> {
  children: ITreeTag[];
  key?: string;
  parentId?: string | null;
}

export const handleConvertTags = (tags: ITag[]): ITreeTag[] => {
  const tagMap = new Map<string, ITreeTag>();

  tags.forEach((tag) => {
    tagMap.set(tag.id, {
      ...lodash.omit(tag, ["parentId"]),
      children: [],
      key: tag.id,
      parentId: tag.parentId ? tag.parentId.id : null,
    });
  });

  const rootTags: ITreeTag[] = [];
  tagMap.forEach((treeTag) => {
    if (treeTag.parentId) {
      const parentTag = tagMap.get(treeTag.parentId);
      if (parentTag) {
        if (!parentTag.children.some((child) => child.id === treeTag.id)) {
          parentTag.children.push(treeTag);
        }
      } else {
        if (!rootTags.some((root) => root.id === treeTag.id)) {
          rootTags.push(treeTag);
        }
      }
    } else {
      if (!rootTags.some((root) => root.id === treeTag.id)) {
        rootTags.push(treeTag);
      }
    }
  });
  const sortTags = (tags: ITreeTag[]): ITreeTag[] => {
    return tags
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((tag) => ({
        ...tag,
        children: sortTags(tag.children),
      }));
  };

  return sortTags(rootTags);
};
