import { EditorState } from "draft-js";

export const initialState = {
  blog: {},
  title: "",
  content: EditorState.createEmpty(),
  submitType: "",
  loading: true,
  isPublishing: false,
  isArchiving: false,
};
