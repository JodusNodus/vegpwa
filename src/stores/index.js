import { configure } from "mobx";

import UserStore from "./user";
import HomeStore from "./home";

configure({ enforceActions: true });

export default {
	userStore: new UserStore(),
	homeStore: new HomeStore()
};
