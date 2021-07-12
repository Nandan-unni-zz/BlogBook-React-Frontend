export const routes = {
  FEED: "/feed/",
  SEARCH: "/search/",
  LOGIN: "/",
  HOME: "/",
  SIGNUP: "/signup",
  LOGOUT: "/logout/",

  CREATE_WRITER: "/writer/create/",
  SETUP_WRITER: (username) => `/writer/setup/${username}`,
  VIEW_WRITER: (username) => `/writer/view/${username}`,
  EDIT_WRITER: (username) => `/writer/edit/${username}`,
  DELETE_WRITER: (username) => `/writer/delete/${username}`,

  CREATE_BLOG: "/blog/create/",
  VIEW_BLOG: (blogId) => `/blog/view/${blogId}`,
  EDIT_BLOG: (blogId) => `/blog/edit/${blogId}`,
  DELETE_BLOG: (blogId) => `/blog/delete/${blogId}`,

  SUCCESS: "/success/",
  INVALID: "/invalid/",
};
