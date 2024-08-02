import { EActiveStatus } from "@/shared/enums/status";

export interface ITag {
  id: string;
  description?: string;
  name: string;
  slug: string;
  image: string;
  parentId: ITag;
  status: EActiveStatus;
}
