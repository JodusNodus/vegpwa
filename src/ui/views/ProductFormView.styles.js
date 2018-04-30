export default theme => ({
  root: {
    justifyContent: "center",
    flexGrow: 1
  },
  coverContainer: {
    position: "relative",
    width: "100%",
    paddingBottom: "75%"
  },
  coverSubContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
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
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: "linear-gradient(to bottom,transparent,#000)",
    opacity: 0.4
  },
  productTitle: {
    textTransform: "capitalize",
    color: "white",
    fontSize: "1.6rem",
    top: "-1.6rem",
    left: 20,
    position: "absolute",
    marginTop: -20,
    bottom: 0
  },
  paper: {
    position: "absolute",
    margin: 10,
    marginTop: "-15%",
    maxWidth: 360,
    padding: 25
  },
  input: {
    marginTop: 10,
    width: "100%",
    display: "inline-flex"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  btn: {
    marginTop: 20
  }
});
