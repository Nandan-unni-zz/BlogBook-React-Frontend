export const routes = {
  LOGIN: "/",
  SIGNUP: "/signup/",
  SIGNUP_SUCCESS: "/signup/success/",

  FEED: "/feed/",
  SEARCH: "/search/",
  SETTINGS: "/settings/",
  PROFILE: (userId) => `/writer/${userId}/`,

  CREATE_BLOG: "/blog/create/",
  VIEW_BLOG: (blogId) => `/blog/${blogId}/`,
  EDIT_BLOG: (blogId) => `/blog/${blogId}/edit/`,
};
