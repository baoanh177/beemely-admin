import { commonStaticReducers } from "@/services/shared";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IInitialState, IResponse } from "@/shared/utils/shared-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Itag } from "./tag.model";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "./tag.thunk";

export interface ITagInitialState extends IInitialState {
  tags: Itag[];
  activeTag: Itag | undefined;
}

const initialState: ITagInitialState = {
  status: EFetchStatus.IDLE,
  message: "",
  tags: [],
  activeTag: undefined,
  totalRecords: 0,
  filter: {
    size: 10,
    page: 1,
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
    builder.addCase(getAllTags.fulfilled, (state, { payload }: PayloadAction<IResponse<Itag[]>>) => {
      state.tags = payload.metaData;
    });
    // ? Get tag by id
    builder.addCase(getTagById.fulfilled, (state, { payload }: PayloadAction<IResponse<Itag>>) => {
      state.activeTag = payload.metaData;
    });
    // ? Create tag
    builder
      .addCase(createTag.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(createTag.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Created successfully";
      })
      .addCase(createTag.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Update tag
    builder
      .addCase(updateTag.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Updated successfully";
      })
      .addCase(updateTag.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
    // ? Delete tag
    builder
      .addCase(deleteTag.pending, (state) => {
        state.status = EFetchStatus.PENDING;
      })
      .addCase(deleteTag.fulfilled, (state, { payload }) => {
        state.status = EFetchStatus.FULFILLED;
        state.message = "Deleted successfully";
        state.tags = state.tags.filter((tag) => tag.id !== payload);
      })
      .addCase(deleteTag.rejected, (state) => {
        state.status = EFetchStatus.REJECTED;
      });
  },
});

export const { resetStatus, setFilter } = tagSlice.actions;
export { tagSlice };
