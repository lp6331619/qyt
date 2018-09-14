/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
    {
        name  : '登录',
        method: 'login',
        path  : '/public/login',
        type  : 'post',
    },
    {
        name  : '注册',
        method: 'register',
        path  : '/public/register',
        type  : 'post',
    },{
        name  : '修改密码',
        method: 'change_pwd',
        path  : '/user/change_pwd',
        type  : 'post',
    },{
        name  : '获取用户信息',
        method: 'user',
        path  : '/user/user',
        type  : 'get',
    },{
        name  : '获取店铺信息',
        method: 'shop',
        path  : '/shop/shop',
        type  : 'get',
    },{
        name  : '获取国家',
        method: 'countrys',
        path  : '/public/countrys',
        type  : 'get',
    },{
        name  : '获取城市',
        method: 'citys',
        path  : '/public/citys',
        type  : 'get',
    },{
        name  : '获取城市',
        method: 'edit_shop',
        path  : '/shop/edit_shop',
        type  : 'post',
    },{
        name  : '首页三合一接口',
        method: 'ordersIndex',
        path  : '/orders/index',
        type  : 'get',
    },{
        name  : '图片上传接口',
        method: 'oss_upload',
        path  : '/public/oss_upload',
        type  : 'post',
    },{
        name  : '订单列表',
        method: 'ordersLists',
        path  : '/orders/lists',
        type  : 'get',
    },{
        name  : '订单详情',
        method: 'ordersDetail',
        path  : '/orders/detail',
        type  : 'get',
    },{
        name  : '资金明细',
        method: 'money_log',
        path  : '/user/money_log',
        type  : 'get',
    },{
        name  : '提现列表',
        method: 'withdraw_list',
        path  : '/user/withdraw_list',
        type  : 'get',
    },{
        name  : '提现接口',
        method: 'withdraw',
        path  : '/user/withdraw',
        type  : 'post',
    },{
        name  : '确认订单',
        method: 'ordersConfirm',
        path  : '/orders/confirm',
        type  : 'post',
    },{
        name  : '提现详情',
        method: 'withdraw_detail',
        path  : '/user/withdraw_detail',
        type  : 'get',
    },{
        name  : '店员列表',
        method: 'userUsers',
        path  : '/user/users',
        type  : 'get',
    },{
        name  : '删除店员',
        method: 'del_user',
        path  : '/user/del_user',
        type  : 'post',
    },{
        name  : '添加／编辑店员',
        method: 'edit_user',
        path  : '/user/edit_user',
        type  : 'post',
    },{
        name  : '商品列表',
        method: 'goodsLists',
        path  : '/goods/lists',
        type  : 'get',
    },{
        name  : '商品添加修改',
        method: 'goodsEdit_goods',
        path  : '/goods/edit_goods',
        type  : 'post',
    },{
        name  : '商品详情',
        method: 'goodsDetail',
        path  : '/goods/detail',
        type  : 'get',
    },{
        name  : '商品分类',
        method: 'categorys',
        path  : '/goods/categorys',
        type  : 'get',
    },{
        name  : '商品分类',
        method: 'orders_nconfirm',
        path  : '/orders/unconfirm',
        type  : 'post',
    },{
        name  : '商品下架',
        method: 'goodsApply_offline',
        path  : '/goods/apply_offline',
        type  : 'post',
    }


    

];