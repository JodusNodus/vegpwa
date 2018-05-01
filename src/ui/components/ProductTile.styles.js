export default theme => ({
  root: {
    width: "50%",
    boxSizing: "border-box",
    padding: 1,
    [theme.breakpoints.up("sm")]: {
      width: "33.333333%"
    }
  },
  aspectRatio: {
    width: "100%",
    position: "relative",
    paddingBottom: "75%"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  tile: {
    listStyle: "none",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
