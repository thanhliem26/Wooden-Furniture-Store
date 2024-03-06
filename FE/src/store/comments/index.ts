import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import lodash from "lodash";
import commentApi from "@/api/comment";

//redux thunk
export const getListComment = createAsyncThunk(
  "comment/get_list_comment",
  async (params: paramGetListComment): Promise<typeMetadataComment> => {
    const { metadata } = await commentApi.getListComment(params);
    return metadata;
  }
);

const initialState: state_reducer_comments = {
  commentList: [],
  loading: true,
  idSelected: null,
  // pagination: {
  //     current: 1,
  //     pageSize: 10,
  // },
  total: 0,
};

export const manageCommentSlice = createSlice({
  name: "manage_comments",
  initialState,
  reducers: {
    addCommentToList: (state, action: PayloadAction<CommentStateReducer[]>) => {
      const newComment = lodash.cloneDeep(action.payload);

      state.commentList = [
        { ...newComment, openChildren: false, commentChildren: [] },
        ...state.commentList,
      ];
      state.total += 1;

      return state;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateComment: (state, action: PayloadAction<paramUpdateComment>) => {
      const { id, content, parent_id } = action.payload;
      const idSelect = parent_id || id;

      state.commentList = state.commentList.map((comment) => {
        if (idSelect === comment.id) {
          return {
            ...comment,
            content: parent_id ? comment.content : content,
            commentChildren: parent_id
              ? comment.commentChildren?.map((commentChildren) => {
                  return commentChildren.id === id
                    ? {
                        ...commentChildren,
                        content: content,
                      }
                    : commentChildren;
                })
              : comment.commentChildren,
          };
        }

        return comment;
      });

      return state;
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      const id = action.payload;
    
      //@ts-ignore
      state.commentList = state.commentList.reduce((acc, comment) => {
        if (comment.id === id) {
            return acc;
        }
        
        const filteredChildren = (comment.commentChildren || []).filter(item => item.id !== id);

        return [...acc, {
            ...comment,
            commentChildren: filteredChildren
        }];
    }, []);
    
      state.total = state.total - 1;

      return state;
    },
    AddCommentChildren: (
      state,
      action: PayloadAction<typeAddListChildrenComment>
    ) => {
      const { id, children_list } = action.payload;
      const cloneList = lodash.cloneDeep(children_list);

      state.commentList = state.commentList.map((comment) => {
        if (id === comment.id) {
          comment.commentChildren = cloneList;
        }

        return comment;
      });

      return state;
    },
    PushCommentChildren: (
      state,
      action: PayloadAction<typePushChildrenComment>
    ) => {
      const { parent_id, commentChildren } = action.payload;
      const cloneList = lodash.cloneDeep(commentChildren);

      state.commentList = state.commentList.map((comment) => {
        if (parent_id === comment.id || comment.commentChildren?.some((item) => item.id === parent_id)) {
          const listChildren = comment.commentChildren ? comment.commentChildren : []
          comment.commentChildren = [...listChildren, cloneList]
          comment.countChild_total += 1;
        }

        return comment;
      });

      return state;
    },
    setOpenChildrenList: (
      state,
      action: PayloadAction<setOpenCommentChildrenList>
    ) => {
      const { id, show } = action.payload;

      state.commentList = state.commentList.map((comment) => {
        if (id === comment.id) {
          comment.openChildren = show;
        }

        return comment;
      });

      return state;
    },
    setIdSelected: (state, action: PayloadAction<number | null>) => {
      state.idSelected = action.payload;

      return state;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getListComment.fulfilled, (state, action) => {
        const { count, rows } = action.payload;
        state = {
          ...state,
          loading: false,
          total: count,
          commentList: rows.map((item, index) => ({
            ...item,
            commentChildren: [],
            openChildren: false,
            key: index,
          })),
        };

        return state;
      })
      .addCase(getListComment.pending, (state, action) => {
        state = { ...state, total: 0, loading: true };

        return state;
      })
      .addCase(getListComment.rejected, (state, action) => {
        state = { ...state, total: 0, loading: false };

        return state;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addCommentToList,
  setLoading,
  updateComment,
  deleteComment,
  AddCommentChildren,
  setOpenChildrenList,
  setIdSelected,
  PushCommentChildren,
} = manageCommentSlice.actions;
export default manageCommentSlice.reducer;
