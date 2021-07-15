import userStorage from "./userStorage";

const blogMapper = (blogs) => {
  const userPk = userStorage.getUser().pk;
  if (blogs instanceof Array) {
    let mappedData = [];
    blogs.forEach((blog) => {
      mappedData.push({
        ...blog,
        noOfLikes: blog.no_of_likes,
        isPublished: blog.is_published,
        isLiked: blog.likes.some((like) => like.pk === userPk),
        isSaved: blog.saves.some((save) => save.pk === userPk),
      });
    });
    return mappedData;
  } else {
    return {
      ...blogs,
      noOfLikes: blogs.no_of_likes,
      isPublished: blogs.is_published,
      isLiked: blogs.likes.some((like) => like.pk === userPk),
      isSaved: blogs.saves.some((save) => save.pk === userPk),
    };
  }
};

export default blogMapper;
