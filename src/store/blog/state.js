import { EditorState } from "draft-js";

export const initialState = {
  title: "",
  content: EditorState.createEmpty(),
  submitType: "",
  loading: true,
  isPublishing: false,
  isArchiving: false,
};
