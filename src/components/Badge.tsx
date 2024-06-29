import clsx from "clsx";

const Badge = ({ number, className }: { number: number; className?: string }) => {
  return (
    <div
      className={clsx("h-[18px] min-w-[18px] rounded bg-cyan-500 px-[6px] py-[2px] text-[10px] text-white", className)}
    >
      {number > 99 ? "99+" : number}
    </div>
  );
};

export default Badge;
