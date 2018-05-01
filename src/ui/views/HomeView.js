import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import AppBar from "../components/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Button from "material-ui/Button";

import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import AddIcon from "@material-ui/icons/Add";
import sizeMe from "react-sizeme";

import * as navigate from "../../services/navigation";
import styles from "./HomeView.styles";

const GridListContainer = sizeMe({
  monitorHeight: true,
  monitorWidth: false,
  refreshRate: 1000,
  refreshMode: "debounce"
})(props => (
  <div className={props.className}>
    <div style={{ height: props.size.height }}>{props.children}</div>
  </div>
));

const TABTYPE = {
  new: "nieuw",
  highestRated: "top",
  popular: "populair"
};

@inject("homeStore")
@observer
class HomeView extends React.Component {
  state = {
    currentTab: 0,
    tabs: [
      TABTYPE.new,
      TABTYPE.highestRated,
      TABTYPE.popular,
      "vleesvervanger",
      "snack"
    ]
  };

  componentDidMount() {
    this.switchTab(0);
  }

  handleChange = (event, value) => {
    this.switchTab(value);
  };

  getTabProducts = i => {
    const { homeStore } = this.props;
    switch (this.state.tabs[i]) {
      case TABTYPE.new:
        return homeStore.newProducts;
      case TABTYPE.highestRated:
        return homeStore.highestRatedProducts;
      case TABTYPE.popular:
        return homeStore.popularProducts;
      default:
        return [];
    }
  };

  switchTab = i => {
    const { homeStore } = this.props;
    switch (this.state.tabs[i]) {
      case TABTYPE.new:
        homeStore.fetchNewProducts();
        break;
      case TABTYPE.highestRated:
        homeStore.fetchHighestRatedProducts();
        break;
      case TABTYPE.popular:
        homeStore.fetchPopularProducts();
        break;
      default:
        break;
    }
    this.setState({ currentTab: i });
  };

  handleProductClick = event => {
    try {
      const ean = parseInt(event.currentTarget.getAttribute("dataean"), 10);
      navigate.toProduct(ean);
    } catch (error) {}
  };

  handleCreateProductClick = event => {
    navigate.toCreateProduct();
  };

  render() {
    const { classes } = this.props;
    const { currentTab, tabs } = this.state;

    return (
      <div className={classes.root}>
        <AppBar title="Home">
          <Tabs value={currentTab} onChange={this.handleChange} scrollable>
            {tabs.map(label => <Tab key={label} label={label} />)}
          </Tabs>
        </AppBar>

        <GridListContainer className={classes.gridContainer}>
          <GridList cellHeight={180} className={classes.gridList}>
            {this.getTabProducts(currentTab).map(p => (
              <GridListTile
                key={p.ean}
                dataean={p.ean}
                onClick={this.handleProductClick}
              >
                <img
                  src={
                    "https://storage.googleapis.com/vegstorage/thumb-" + p.ean
                  }
                  alt={p.name}
                />
                <GridListTileBar title={p.brand.name + " " + p.name} />
              </GridListTile>
            ))}
          </GridList>
        </GridListContainer>

        <Button
          variant="fab"
          color="secondary"
          aria-label="create product"
          className={classes.createProductBtn}
          onClick={this.handleCreateProductClick}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(HomeView);
