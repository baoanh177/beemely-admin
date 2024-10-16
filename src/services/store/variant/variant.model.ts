import { IColor } from "../color/color.model";
import { ISize } from "../size/size.model";

export interface IVariant {
  id: string;
  color?: IColor;
  stock: number;
  price: number;
  size: ISize;
}
