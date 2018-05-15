import { observable, action, flow, toJS } from "mobx";
import { STATE } from "../constants";

import _ from "lodash";
import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

const asAutoCompleteOptions = list => list.map(x => ({ text: x.name }));

export default class CreateProductStore {
  @observable ean = -1;
  @observable productLabels = [];
  @observable productName = "";
  @observable brandname = "";
  @observable placeid = null;

  @observable coverPicture = null;
  @observable alreadyExists = false;
  @observable pictureTaken = false;
  @observable pictureUploaded = false;
  @observable labels = [];
  @observable labelSuggestions = [];
  @observable brands = [];
  @observable supermarkets = [];

  @observable creationState = STATE.none;

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

  uploadPicture = flow(function*(blob) {
    try {
      const {
        labelSuggestions,
        brandSuggestions
      } = yield api.uploadProductPicture(this.ean, blob);
      this.coverPicture = URL.createObjectURL(blob);

      this.labelSuggestions = _.uniq(labelSuggestions);
      this.brandname =
        brandSuggestions.length > 0 ? brandSuggestions[0].name : "";

      this.pictureUploaded = true;
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

  createProduct = flow(function*() {
    try {
      this.creationState = STATE.pending;
      const product = {
        ean: this.ean,
        labels: toJS(this.productLabels),
        name: this.productName,
        brandname: this.brandname,
        placeid: this.placeid
      };
      yield api.createProduct(product);
      this.creationState = STATE.done;
      navigate.toProduct(this.ean);
    } catch (error) {
      this.creationState = STATE.error;
      console.error(error);
    }
    this.clear();
  });

  @action.bound
  clear() {
    this.ean = -1;
    this.productLabels = [];
    this.productName = "";
    this.brandname = "";
    this.placeid = null;

    this.alreadyExists = false;
    this.pictureTaken = false;
    this.pictureUploaded = false;
    this.labels = [];
    this.labelSuggestions = [];
    this.brands = [];
    this.supermarkets = [];
  }
}
