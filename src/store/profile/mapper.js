const mapper = (data = {}) => {
  return {
    pk: data?.pk,
    name: data?.name,
    username: data?.username,
    email: data?.email,
    bio: data?.bio,
    dp: data?.dp,
  };
};

export default mapper;
