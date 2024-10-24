const formatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number): string => {
  return `${formatter.format(price)} VND`;
};
