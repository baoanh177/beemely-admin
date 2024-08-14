import { IGender } from "../gender/gender.model";

export interface ISize {
  id: string;
  name: string;
  gender: IGender;
}
