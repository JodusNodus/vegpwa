export default theme => ({
  root: {
    width: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1
  },
  favoriteBtn: {
    position: "absolute",
    top: 0,
    transform: "translateY(-50%)",
    color: "white",
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
