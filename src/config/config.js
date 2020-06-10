/**
 * Copyright (c) 2020 ~ present Eurostat
 */
import Options from "./Options";
import {isDefined, isObjectType, extend} from "../internals/util";
import Barcode from "../internals/Barcode";

extend(Barcode.prototype, {
	getOptions() {
		return new Options();
	},

	/**
	 * Load configuration option
	 * @param {Object} config User's generation config value
	 * @private
	 */
	loadConfig(config) {
		const thisConfig = this.config;
		let target;
		let keys;
		let read;

		const find = () => {
			const key = keys.shift();

			if (key && target && isObjectType(target) && key in target) {
				target = target[key];
				return find();
			} else if (!key) {
				return target;
			}

			return undefined;
		};

		Object.keys(thisConfig).forEach(key => {
			target = config;
			keys = key.split("_");
			read = find();

			if (isDefined(read)) {
				thisConfig[key] = read;
			}
		});
	}
});