export interface ITag {
  id?: string;
  description?: string;
  name: string;
  slug: string;
  image: string;
  parentId: string | null;
  status: 0 | 1;
}
