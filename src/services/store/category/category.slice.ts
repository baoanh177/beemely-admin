import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { ICategory } from "./category.model";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./category.thunk";

export interface ICategoryInitialState extends IInitialState {
  categorys: ICategory[];
  activeCategory: ICategory | undefined;
}

const initialState: ICategoryInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  categorys: [],
  activeCategory: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    ...commonStaticReducers<ICategoryInitialState>(),
  },
  extraReducers(builder) {
    // Get all categories
    builder.addCase(getAllCategories.fulfilled, (state, { payload }: PayloadAction<IResponse<ICategory[]>>) => {
      state.categorys = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // Get category by id
    builder.addCase(getCategoryById.fulfilled, (state, { payload }: PayloadAction<IResponse<ICategory>>) => {
      state.activeCategory = payload.metaData;
    });
    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createCategory.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateCategory.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // Delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.categorys = state.categorys.filter((category) => category.id !== payload);
      })
      .addCase(deleteCategory.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
  },
});

export const { resetStatus, setFilter } = categorySlice.actions;
export { categorySlice };
