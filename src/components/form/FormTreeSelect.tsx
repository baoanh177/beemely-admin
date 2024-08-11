import { ConfigProvider, TreeSelect } from "antd";
import { TreeSelectProps } from "antd/lib/tree-select";
interface TreeData {
  value: string;
  title: string;
  children?: TreeData[];
}

interface FormTreeSelectProps extends Omit<TreeSelectProps<string>, "onChange" | "treeData"> {
  label?: string;
  error?: string;
  onChange: (value: string) => void;
  treeData: TreeData[];
}

const FormTreeSelect: React.FC<FormTreeSelectProps> = ({ label, error, value, onChange, treeData, ...props }) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            TreeSelect: {
              nodeSelectedBg: "#f4ecfb",
            },
          },
        }}
      >
        <div className="text-m-medium text-black-300">{label}</div>
        {treeData.length > 0 ? (
          <TreeSelect className={"text-m-medium w-full"} value={value} treeData={treeData} treeDefaultExpandAll onChange={onChange} {...props} />
        ) : (
          <div>No options available</div>
        )}
        {error && <div className="text-sm text-red-500">{error}</div>}
      </ConfigProvider>
    </div>
  );
};

export default FormTreeSelect;
