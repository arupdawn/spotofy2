function truncateText(text) {
  if (typeof window !== "undefined" && typeof text === "string") {
    if (text?.length > 18) {
      let newtext = text.splice(0,17);
      newtext = newtext + "...";
      return newtext;
    }
    return text;
  }
  return text;
}

export default truncateText;
