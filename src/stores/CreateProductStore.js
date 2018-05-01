import { observable, action, computed, flow } from "mobx";

import { find, findIndex } from "lodash";
import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

const asAutoCompleteOptions = list => list.map(x => ({ text: x.name }));

export default class CreateProductStore {
  @observable ean = -1;
  @observable productLabels = [];
  @observable productName = "";
  @observable brandname = "";
  @observable placeid = null;

  @observable alreadyExists = false;
  @observable pictureTaken = false;
  @observable pictureUploaded = false;
  @observable labels = [];
  @observable labelSuggestions = [];
  @observable brands = [];
  @observable supermarkets = [];

  @action.bound
  setEan(ean) {
    this.ean = ean;
  }

  @action.bound
  setPlaceid(placeid) {
    this.placeid = placeid;
  }

  @action.bound
  pictureIsTaken() {
    this.pictureTaken = true;
  }

  @action.bound
  setBrandName(brandname) {
    this.brandname = brandname;
  }

  @action.bound
  setProductName(name) {
    this.productName = name;
  }

  isFormComplete() {
    return this.brandname.length > 1 && this.productName.length > 3;
  }

  checkAlreadyExists = flow(function*() {
    try {
      const product = yield api.fetchProduct(this.ean);

      if (product) {
        this.alreadyExists = true;
      } else {
        this.alreadyExists = false;
      }
    } catch (error) {
      this.alreadyExists = false;
    }
  });

  @action.bound
  pictureIsUploaded() {
    this.pictureUploaded = true;
  }

  uploadPicture = flow(function*(file) {
    try {
      const {
        labelSuggestions,
        brandSuggestions
      } = yield api.uploadProductPicture(this.ean, file);

      this.labelSuggestions = labelSuggestions;
      this.brandname =
        brandSuggestions.length > 0 ? brandSuggestions[0].name : "";

      setTimeout(this.pictureIsUploaded, 1000);
    } catch (error) {
      console.error(error);
      this.pictureUploaded = false;
    }
  });

  fetchFormData = flow(function*() {
    try {
      const { brands } = yield api.fetchBrands();
      this.brands.replace(asAutoCompleteOptions(brands));
      const { labels } = yield api.fetchLabels();
      this.labels.replace(asAutoCompleteOptions(labels));
    } catch (error) {
      console.error(error);
    }
  });

  fetchSupermarkets = flow(function*() {
    try {
      const { supermarkets } = yield api.fetchSupermarkets();
      this.supermarkets.replace(supermarkets);
    } catch (error) {
      console.error(error);
    }
  });

  @action.bound
  addLabel(label) {
    this.removeLabel(label);
    this.productLabels.push(label);
  }

  @action.bound
  removeLabel(label) {
    const i = this.productLabels.indexOf(label);
    if (i > -1) {
      this.productLabels.splice(i, 1);
    }
  }

  @action.bound
  removeLabelSuggestion(label) {
    const i = this.labelSuggestions.indexOf(label);
    if (i > -1) {
      this.labelSuggestions.splice(i, 1);
    }
  }
}
