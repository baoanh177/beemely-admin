import { IDimensions } from "@/services/store/product/product.model";
import { MAX_LEVEL, SHIPPING_RULES } from "@/shared/enums/shippingFee";

export const calculateVolumeWeight = (dimensions: IDimensions): number => {
  return (dimensions.length * dimensions.width * dimensions.height) / SHIPPING_RULES.VOLUME_TO_WEIGHT_RATIO;
};

export const findShippingLevel = (weight: number) => {
  const weightLevels = Object.values(SHIPPING_RULES.WEIGHT);
  return weightLevels.find((level) => weight <= level.MAX);
};

export const calculateExtraCharge = (weight: number): number => {
  const extraWeight = Math.ceil(weight - MAX_LEVEL.MAX);
  return extraWeight > 0 ? extraWeight * SHIPPING_RULES.EXTRA_CHARGE_PER_KG : 0;
};

export const calculateOrderShippingFee = (dimensions: IDimensions): number => {
  const volumeWeight = calculateVolumeWeight(dimensions);
  const finalWeight = Math.max(dimensions.weight, volumeWeight);

  const level = findShippingLevel(finalWeight);

  if (level) {
    return level.PRICE;
  }

  // If weight exceeds maximum level, calculate with extra charge
  return MAX_LEVEL.PRICE + calculateExtraCharge(finalWeight);
};
