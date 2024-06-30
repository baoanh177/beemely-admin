import React, { ReactNode } from "react";


interface FormCheckProps {
  label?: string;
  icon?: ReactNode;
  onChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
}

const FormCheck = ({ label, icon, onChange, isChecked }: FormCheckProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-1">
      <input type="checkbox" checked={isChecked} onChange={handleChange} className="mr-2 rounded-md" />
      {icon && <span className="icon-container">{icon}</span>}
      {label && <label className="text-m-semibold text-primary-500">{label}</label>}
    </div>
  );
};

export default FormCheck;
