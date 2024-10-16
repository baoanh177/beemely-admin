import { useArchive } from "@/hooks/useArchive";
import { useEffect, useMemo, useState } from "react";

import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { IGenderInitialState } from "@/services/store/gender/gender.slice";
import { ILabelInitialState } from "@/services/store/label/label.slice";
import { IProductTypeInitialState } from "@/services/store/productType/productType.slice";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { ITagInitialState } from "@/services/store/tag/tag.slice";
import { getAllSizes } from "@/services/store/size/size.thunk";
import { getAllColors } from "@/services/store/color/color.thunk";
import { getAllProductTypes } from "@/services/store/productType/productType.thunk";
import { getAllBrands } from "@/services/store/brand/brand.thunk";
import { getAllGenders } from "@/services/store/gender/gender.thunk";
import { getAllLabels } from "@/services/store/label/label.thunk";
import { getAllTags } from "@/services/store/tag/tag.thunk";

export const useHookDataProductForm = () => {
  const { state: stateSize, dispatch: dispatchSize } = useArchive<ISizeInitialState>("size");
  const { state: stateColor, dispatch: dispatchColor } = useArchive<IColorInitialState>("color");
  const { state: stateProductType, dispatch: dispatchProductType } = useArchive<IProductTypeInitialState>("productType");
  const { state: stateBrand, dispatch: dispatchBrand } = useArchive<IBrandInitialState>("brand");
  const { state: stateGender, dispatch: dispatchGender } = useArchive<IGenderInitialState>("gender");
  const { state: stateLabel, dispatch: dispatchLabel } = useArchive<ILabelInitialState>("label");
  const { state: stateTag, dispatch: dispatchTag } = useArchive<ITagInitialState>("tag");

  const [variantOptions, setVariantOptions] = useState({ color: [], size: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatchSize(getAllSizes({ query: stateSize.filter })),
          dispatchColor(getAllColors({ query: stateColor.filter })),
          dispatchProductType(getAllProductTypes({ query: stateProductType.filter })),
          dispatchBrand(getAllBrands({ query: stateBrand.filter })),
          dispatchGender(getAllGenders({ query: stateGender.filter })),
          dispatchLabel(getAllLabels({ query: stateLabel.filter })),
          dispatchTag(getAllTags({ query: stateTag.filter })),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    dispatchSize,
    dispatchColor,
    dispatchProductType,
    dispatchBrand,
    dispatchGender,
    dispatchLabel,
    dispatchTag,
    stateSize.filter,
    stateColor.filter,
    stateProductType.filter,
    stateBrand.filter,
    stateGender.filter,
    stateLabel.filter,
    stateTag.filter,
  ]);

  const memoizedStateSize = useMemo(() => stateSize, [stateSize]);
  const memoizedStateColor = useMemo(() => stateColor, [stateColor]);
  const memoizedStateProductType = useMemo(() => stateProductType, [stateProductType]);
  const memoizedStateBrand = useMemo(() => stateBrand, [stateBrand]);
  const memoizedStateGender = useMemo(() => stateGender, [stateGender]);
  const memoizedStateLabel = useMemo(() => stateLabel, [stateLabel]);
  const memoizedStateTag = useMemo(() => stateTag, [stateTag]);
  return {
    stateSize: memoizedStateSize,
    getAllSizesLoading: loading,
    stateColor: memoizedStateColor,
    getAllColorsLoading: loading,
    stateProductType: memoizedStateProductType,
    getAllProductTypesLoading: loading,
    stateBrand: memoizedStateBrand,
    getAllBrandsLoading: loading,
    stateGender: memoizedStateGender,
    getAllGendersLoading: loading,
    stateLabel: memoizedStateLabel,
    getAllLabelsLoading: loading,
    stateTag: memoizedStateTag,
    getAllTagsLoading: loading,
  };
};
