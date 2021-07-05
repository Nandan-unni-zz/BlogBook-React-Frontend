const ellipsis = (text, len) => {
  if (text.length > len) return text.substring(0, len) + "...";
  return text;
};

export default ellipsis;
