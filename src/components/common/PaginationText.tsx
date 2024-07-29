const PaginationText = (total: number, range: [number, number]) => {
  return `Hiển thị ${range[0]}-${range[1]} từ ${total}`;
};
export default PaginationText;
