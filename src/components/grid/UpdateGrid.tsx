import { ReactNode, useMemo } from "react";

export interface IUpdateGridProps {
  colNumber?: "1" | "2";
  rate?: "3-1" | "2-2" | "1-3" | "1";
  groups: {
    colLeft?: ReactNode;
    colRight?: ReactNode;
  };
}

const UpdateGrid = ({ colNumber = "1", rate = "1", groups }: IUpdateGridProps) => {
  const [colLeftWidth, colRightWidth] = useMemo(() => {
    const widthRate = rate.split("-");
    if (widthRate.length > 1) {
      return rate.split("-").map((num) => `${(+num / 4) * 100}%`);
    }
    return ["100%", ""];
  }, [rate]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6" style={{ width: colLeftWidth }}>
        {groups?.colLeft}
      </div>
      {colNumber === "2" && (
        <div className="flex flex-col gap-6" style={{ width: colRightWidth }}>
          {groups?.colRight}
        </div>
      )}
    </div>
  );
};

export default UpdateGrid;
