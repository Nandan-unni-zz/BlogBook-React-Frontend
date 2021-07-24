export const routes = {
  LOGIN: "/",
  SIGNUP: "/signup/",
  SIGNUP_SUCCESS: "/signup/success/",
  EMAIL_SUCCESS: (userId) => `/emailconfirmation/success/${userId}/`,
  EMAIL_FAILURE: "/emailconfirmation/failure/",
  FEED: "/feed/",
  SEARCH: "/search/",
  SETTINGS: "/settings/",
  PROFILE: (userId) => `/writer/${userId}/`,

  CREATE_BLOG: "/blog/create/",
  READ_BLOG: (blogId) => `/blog/${blogId}/`,
  EDIT_BLOG: (blogId) => `/blog/${blogId}/edit/`,
};
