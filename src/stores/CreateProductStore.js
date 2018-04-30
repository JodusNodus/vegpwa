import { observable, action, computed } from "mobx";

import { find, findIndex } from "lodash";
import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

export default class CreateProductStore {
  @observable ean = -1;
  @observable originalPictureData = "";
  @observable croppedPictureData = "";

  @action.bound
  setEan(ean) {
    this.ean = ean;
  }

  @action.bound
  setCroppedPictureData(pictureData) {
    this.croppedPictureData = pictureData;
  }

  @action.bound
  setOriginalPictureData(pictureData) {
    this.originalPictureData = pictureData;
  }
}
