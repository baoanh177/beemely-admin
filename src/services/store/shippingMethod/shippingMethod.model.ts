export interface IShippingMethod {
  id?: string;
  name: string;
  cost?: number;
  estimatedDeliveryTime?: string;
}
export interface IShippingMethodResponse {
  message: string;
  statusCode: number;
  metaData: IShippingMethod[];
}
