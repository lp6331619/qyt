import * as types from './mutations_types'

import {
    store
} from 'utils/';

export default {// 可设置根据父类获取子类方法
    [types.SET_LANG](state, result) {
        state.lang = result.lang;
		store.set('lang', result.lang);
    },
	[types.SET_CATEGORY](state, result) {
        state.categories = result;
        store.set('categories', result);
    },
    [types.SET_REGEX_ARRAY](state, result) {
        state.regex_array = result;
        store.set('regex_array', result);
    },

};
