function isSmallDevice() {
  if (typeof window !== "undefined") {
    // detect window screen width function
    if (window.screen.availWidth <= 425) {
      return false
    } else {
      return true
    }
  }
  return true;
}

export default isSmallDevice;
