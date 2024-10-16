import { IColor } from "../color/color.model";

export interface IProductColor {
  id: string;
  colorId?: IColor;
  imageUrl: string;
}
