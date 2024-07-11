import { ConfigProvider, Tree, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { useState } from "react";

export interface ITreeDataProps {
  treeData: DataNode[]
  expanded?: React.Key[]
  isDisable?: boolean
  checkedKeys: React.Key[]
  onCheck: TreeProps["onCheck"]
}

const TreeData = ({ treeData, expanded = [], isDisable, checkedKeys, onCheck }: ITreeDataProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(expanded);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            colorPrimary: "#883DCF",
            nodeSelectedBg: "#F4ECFB",
            colorPrimaryHover: "#883DCF"
          }
        }
      }}
    >
      <Tree
        checkable
        disabled={isDisable}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
      />
    </ConfigProvider>
  );
};

export default TreeData;
