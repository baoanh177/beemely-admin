import { IInitialState } from "@/shared/utils/shared-interfaces";
import { IGender } from "../gender/gender.model";
import { IProductColor } from "../productColor/productColor.model";
import { IVariant } from "../variant/variant.model";
import { ISize } from "../size/size.model";
import { ITag } from "../tag/tag.model";
import { ILabel } from "../label/label.model";
import { IBrand } from "../brand/brand.model";
import { IProductType } from "../productType/productType.model";

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  regularPrice: number;
  discountPrice: number;
  thumbnail: string;
  images: string[];
  tags: ITag[];
  gender: IGender;
  variants: IVariant[];
  labels: ILabel[];
  brand: IBrand;
  productColors: IProductColor[];
  productSizes: ISize[];
  productType: string;
  status: number;
}

export interface IProductFilter {
  _page?: number;
  _limit?: number;
  _name?: string;
}

export interface IProductInitialState extends IInitialState {
  products: IProduct[];
  activeProduct: IProduct | undefined;
}
