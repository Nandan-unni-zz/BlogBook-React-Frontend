import { ContentState, EditorState } from "draft-js";
import htmlToDraftjs from "html-to-draftjs";

export const initialState = {
  title: "",
  content: EditorState.createEmpty(),
  submitType: "",
  loading: true,
  isPublishing: false,
  isArchiving: false,
};
