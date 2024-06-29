import { ReactNode } from "react";
import Badge from "./Badge";

const IconHasBadge = ({ icon, badge }: { icon: ReactNode; badge: number }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <div className="relative cursor-pointer">
        {icon}
        {badge != 0 && <Badge number={badge} className="absolute -right-2 -top-2" />}
      </div>
    </div>
  );
};

export default IconHasBadge;
