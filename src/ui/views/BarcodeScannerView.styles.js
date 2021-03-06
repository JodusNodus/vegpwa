export default theme => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    width: 290,
    padding: 15,
    margin: 10
  },
  barcodeImg: {
    width: 290,
    marginLeft: 4,
    marginBottom: -35
  },
  input: {
    fontSize: "23pt",
    fontFamily: "monospace"
  },
  hiddenInput: {
    position: "absolute",
    left: 0,
    opacity: 0
  }
});
