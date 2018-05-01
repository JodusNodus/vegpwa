export default theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: 500
  },
  coverContainer: {
    width: "100%",
    position: "relative",
    paddingBottom: "75%"
  },
  backBtn: {
    color: "white",
    position: "absolute",
    margin: 20,
    left: 0,
    top: 0,
    zIndex: 100
  },
  coverPicture: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  coverOverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundImage: "linear-gradient(to bottom,transparent,#000)",
    opacity: 0.4
  },
  productTitle: {
    top: "-1.6rem",
    paddingLeft: 15,
    paddingRight: 80,
    left: 0,
    color: "white",
    bottom: 0,
    position: "absolute",
    fontSize: "1.6rem",
    marginTop: -20,
    textTransform: "capitalize",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    width: "100%"
  },
  paper: {
    position: "relative",
    marginTop: "-15%",
    padding: 25,
    width: "calc(100% - 20px)",
    maxWidth: 450,
    boxSizing: "border-box"
  }
});
