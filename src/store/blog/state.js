import { EditorState } from "draft-js";

export const initialState = {
  blog: {},
  title: "",
  titleChanged: false,
  content: EditorState.createEmpty(),
  submitType: "",
  loading: true,
  isPublishing: false,
  isArchiving: false,
};
