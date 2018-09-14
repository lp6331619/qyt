import axios from 'axios'
import * as types from './mutations_types';
import store from 'store';
import Vue from 'vue';
import Router from 'vue-router';

export default {
	get_lang: ({
		commit
	}, {
		lang
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SET_LANG, {
				lang
			});
			resolve()
		});
	},
};
