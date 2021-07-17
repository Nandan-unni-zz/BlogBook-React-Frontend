import userStorage from "./userStorage";

const getList = (data = [], ft = "") => {
  let likesList = "";
  if (data.length >= 1) {
    likesList += data[0]?.name;
    data.slice(1, 4).map((like) => (likesList += `, ${like?.name}`));
    likesList +=
      (data.length > 4 ? ` and ${data.length - 4} others` : ``) +
      `\n ${ft}d this blog`;
  } else {
    likesList += `No ${ft}s`;
  }
  return likesList;
};

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
        likesList: getList(blog?.likes, "like"),
        savesList: getList(blog?.saves, "save"),
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
      likesList: getList(blogs?.likes, "like"),
      savesList: getList(blogs?.saves, "save"),
    };
  }
};

export default blogMapper;
