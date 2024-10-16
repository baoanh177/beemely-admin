export const generateVariantCombinations = (variants: any[], variantOptions?: any) => {
  if (variants.length === 0) return [];

  const [first, ...rest] = variants;
  if (rest.length === 0) {
    return first.options.map((optionId: string) => {
      const option = variantOptions[first.name].find((opt) => opt.id === optionId);
      return {
        [first.name]: option ? option.name : optionId,
        [`${first.name}Id`]: optionId,
      };
    });
  }

  const subCombinations = generateVariantCombinations(rest, variantOptions);

  return first.options.flatMap((optionId: string) => {
    const option = variantOptions[first.name].find((opt) => opt.id === optionId);
    return subCombinations.map((subCombo: any) => ({
      [first.name]: option ? option.name : optionId,
      [`${first.name}Id`]: optionId,
      ...subCombo,
    }));
  });
};
