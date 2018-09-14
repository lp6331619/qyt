/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
import {Login,Regist,Shop,User,Order,Product} from 'views/';

export default new Router({
	// mode: 'history',
	// base: '/gl/',
	routes: [
		{
			path     : '/',
			name     : '商铺',
			redirect: '/home'
		}, {
			path     : '/login',
			name     : '登录',
			component: Login
		}
		,{
			path     : '/regist',
			name     : '注册',
			component: Regist
		},{
			path     : '/home',
			name     : '商铺',
			component: Content,
			children:[{
				path     : '',
				name     : '商铺',
				component: Shop.HomeBox,
				
			},{
				path     : 'lang',
				name     : '语言',
				component: Shop.Lang,
			}]
		},{
			path     : '/order',
			name     : '商铺',
			component: Content,
			children:[{
				path     : '',
				name     : '商铺',
				component: Order.OrderList,
			},{
				path     : 'detail',
				name     : '详情',
				component: Order.Detail,
			}]
		},{
			path     : '/product',
			name     : '商品',
			component: Content,
			children:[{
				path     : '',
				name     : '商品',
				component: Product.Home,
			},{
				path     : 'detail',
				name     : '详情',
				component: Product.Detail,
			}]
		},
		{
			path     : '/user',
			name     : '商铺',
			component: Content,
			children:[{
				path     : '',
				name     : '我的',
				component: User.HomeBox,
			},{
				path     : 'shopinfo',
				name     : '店铺信息',
				component: User.Shopinfo,
			},{
				path     : 'wallet',
				name     : '我的钱包',
				component: User.Wallet,
			},{
				path     : 'accountDetails',
				name     : '账户明细',
				component: User.AccountDetails,
			},{
				path     : 'presentRecord',
				name     : '提现记录',
				component: User.PresentRecord,
			},{
				path     : 'modifyPassword',
				name     : '修改密码',
				component: User.ModifyPassword,
			},{
				path     : 'shopAssistant',
				name     : '店员管理',
				component: User.ShopAssistant,
			},{
				path     : 'assistantDetail',
				name     : '店员信息',
				component: User.AssistantDetail,
			},{
				path     : 'presentStatus',
				name     : '提现状态',
				component: User.PresentStatus,
			},{
				path     : 'withdrawals',
				name     : '提现接口',
				component: User.Withdrawals,
			}]
		},
	]
})