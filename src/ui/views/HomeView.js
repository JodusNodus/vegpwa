import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import AppBar from "../components/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Button from "material-ui/Button";

import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";

import ProductTileGrid from "../components/ProductTileGrid";

import * as navigate from "../../services/navigation";
import styles from "./HomeView.styles";

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
      "snack",
      "ice",
      "yoghurt",
      "vleesvervanger"
    ]
  };

  componentDidMount() {
    this.switchTab(0);
  }

  handleChange = (event, value) => {
    this.switchTab(value);
  };

  getTabProducts = i => {
    const { tabs } = this.state;
    const { homeStore } = this.props;
    switch (tabs[i]) {
      case TABTYPE.new:
        return homeStore.newProducts;
      case TABTYPE.highestRated:
        return homeStore.highestRatedProducts;
      case TABTYPE.popular:
        return homeStore.popularProducts;
      default:
        return homeStore.getLabelProducts(tabs[i]);
    }
  };

  switchTab = i => {
    const { homeStore } = this.props;
    const { tabs } = this.state;
    switch (tabs[i]) {
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
        homeStore.fetchLabelProducts(tabs[i]);
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

  handleFavoritesClick = () => {
    navigate.toFavorites();
  };

  handleSearchClick = () => {
    navigate.toSearch();
  };

  render() {
    const { classes } = this.props;
    const { currentTab, tabs } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          title="Home"
          rightButton={[
            <Button
              key="searchBtn"
              onClick={this.handleSearchClick}
              style={{ color: "white" }}
            >
              <SearchIcon />
            </Button>,
            <Button
              key="favBtn"
              onClick={this.handleFavoritesClick}
              style={{ color: "white" }}
            >
              <FavoriteIcon />
            </Button>
          ]}
        >
          <Tabs
            value={currentTab}
            onChange={this.handleChange}
            scrollable
            classes={{
              root: classes.tabsRoot,
              flexContainer: classes.tabsFlexContainer
            }}
          >
            {tabs.map(label => <Tab key={label} label={label} />)}
          </Tabs>
        </AppBar>

        <ProductTileGrid products={this.getTabProducts(currentTab)} />

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
