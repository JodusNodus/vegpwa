export default theme => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  cropper: {
    height: "100%",
    width: "100%"
  },
  fileInput: {
    display: "none"
  },
  rightBtnIcon: {
    marginLeft: theme.spacing.unit
  }
});
