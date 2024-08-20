import clsx from "clsx";

interface ILabelProps {
  text?: string;
  htmlFor?: string;
  className?: string;
  isRequired?: boolean;
}

const Label = ({ text, htmlFor, className, isRequired = false }: ILabelProps) => {
  if (!text) return;
  return (
    <label className={clsx("text-m-medium flex gap-1 text-black-300", className)} htmlFor={htmlFor}>
      <span>{text}</span>
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
