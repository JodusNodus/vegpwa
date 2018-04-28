export default theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  coverContainer: {
    height: 220,
    position: "relative"
  },
  backBtn: {
    color: "white",
    position: "absolute",
    margin: 20,
    left: 0,
    top: 0
  },
  coverPicture: {
    objectFit: "cover",
    height: "100%",
    width: "100%"
  },
  coverOverlay: {
    position: "absolute",
    height: "50%",
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: "linear-gradient(to bottom,transparent,#000)",
    opacity: 0.6
  },
  productTitle: {
    textTransform: "capitalize",
    color: "white",
    position: "absolute",
    margin: 30,
    marginBottom: 20,
    bottom: 0
  },
  paper: {
    position: "relative",
    padding: 20
  },
  favoriteBtn: {
    position: "absolute",
    top: 0,
    transform: "translateY(-50%)",
    right: 20
  },
  labelsContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  btnContainer: {
    margin: "10px 0",
    display: "flex"
  },
  labelChip: {
    marginRight: 5
  },
  btn: {
    margin: 10,
    flex: 1,
    flexBasis: 0
  },
  item: {
    marginTop: 7
  },
  supermarketItem: {
    textDecoration: "none",
    cursor: "pointer"
  }
});
