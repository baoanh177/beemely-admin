const PaginationText = (total: number, range: [number, number]) => {
  return <div className="hidden md:block">{`Hiển thị ${range[0]}-${range[1]} từ ${total}`}</div>
};
export default PaginationText;
