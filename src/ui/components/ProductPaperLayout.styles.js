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
    position: "relative",
    margin: 10,
    marginTop: "-15%",
    padding: 25
  }
});
