import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/status";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITag } from "./tag.model";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "./tag.thunk";

export interface ITagInitialState extends IInitialState {
  tags: ITag[];
  activeTag: ITag | undefined;
}

const initialState: ITagInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  tags: [],
  activeTag: undefined,
  totalRecords: 0,
  filter: {
    _limit: 10,
    _page: 1,
  },
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    ...commonStaticReducers<ITagInitialState>(),
  },
  extraReducers(builder) {
    // ? Get all tags
    builder.addCase(getAllTags.fulfilled, (state, { payload }: PayloadAction<IResponse<ITag[]>>) => {
      state.tags = payload.metaData;
      state.totalRecords = payload.totalDocs ?? 0;
    });
    // ? Get tag by id
    builder.addCase(getTagById.fulfilled, (state, { payload }: PayloadAction<IResponse<ITag>>) => {
      state.activeTag = payload.metaData;
    });
    // ? Create tag
    builder
      .addCase(createTag.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createTag.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Tạo mới thành công";
      })
      .addCase(createTag.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.message;
      });
    // ? Update tag
    builder
      .addCase(updateTag.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateTag.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.tags = state.tags.map((tag) => (tag.id === payload.metaData.id ? payload.metaData : tag));
        state.status = EFetchStatus.FULFILLED;
        state.message = "Cập nhật thành công";
      })
      .addCase(updateTag.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể cập nhật tag";
      });
    // ? Delete tag
    builder
      .addCase(deleteTag.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteTag.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Xóa thành công";
        state.tags = state.tags.filter((tag) => tag.id !== payload);
      })
      .addCase(deleteTag.rejected, (state, { payload }: PayloadAction<any>) => {
        state.status = EFetchStatus.REJECTED;
        state.message = payload.errors.message || "Không thể xóa tag";
      });
  },
});

export const { resetStatus, setFilter } = tagSlice.actions;
export { tagSlice };
