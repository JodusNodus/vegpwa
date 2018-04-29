export default theme => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default
  },
  screenContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  }
});
