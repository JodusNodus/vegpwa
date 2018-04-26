import { observable, flow } from "mobx";

import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

export default class HomeStore {
	@observable newProducts = [];
	@observable highRatingProducts = [];
	@observable popularProducts = [];
}
