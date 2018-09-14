<template>
    <div class="form">
        <div class="container has-tabbar">
            <div class="distributor-hd">
                <div class="hd-title clearfix">
                    <router-link to="/home/lang" class="language">{{lang.language}}</router-link>
                    <span class="sweep-opr" @click="sweep()"><i class="iconfont icon-sweep"></i>{{lang.sweeps}}</span>
                </div>
                <strong class="commission">{{tabData.income/100}}</strong>
                <p>{{lang.entersDeposits}}（{{vuexData.shopinfo.currency_name}}）</p>
            </div>
            <div class="merchant-data">
                <ul class="clearfix">
                    <li @click="$router.push('/order?status=2')">
                        <router-link to=""><strong>{{tabData.unconsumed}}</strong><p>{{lang.treats}}</p></router-link>
                    </li>
                    <li @click="$router.push('/order?status=3')">
                        <router-link to=""><strong>{{tabData.consumed}}</strong><p>{{lang.expended}}</p></router-link>
                    </li>
                    <li @click="$router.push('/order?status=-1')">
                        <router-link to=""><strong>{{tabData.total}}</strong><p>{{lang.allOrder}}</p></router-link>
                    </li>
                </ul>
            </div>
            <hr class="separator">
            <div class="merchant-mng">
                <ul class="clearfix">
                    <li>
                        <router-link to="/order?status=1"><span><i class="iconfont icon-index-order"></i></span><p>{{lang.orderManagement}}</p></router-link>
                    </li>
                    <li>
                        <router-link to="/product"><span><i class="iconfont icon-index-product"></i></span><p>{{lang.merchandise}}</p></router-link>
                    </li>
                    <li>
                        <router-link to="/user/shopinfo"><span><i class="iconfont icon-index-shop"></i></span><p>{{lang.shopInfo}}</p></router-link>
                    </li>
                </ul>
            </div>
            <hr class="separator">
            <mt-cell :title="lang.recentOrders"></mt-cell>
            <div class="indexMt" v-for="(item,index) in tabData.uncomfirm" :key="index" >
                <mt-cell :title="item.title" :label="`${lang.num}：${item.num}`" is-link><span style="color: #f5343c">{{item.supplier_price / 100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></span></mt-cell>
                <el-button @click="toDetail(item.id)" type="danger" class="btn" size="mini">{{lang.seeDetail}}</el-button>
            </div>
        </div>
        <v-menu :lang="lang"></v-menu>
    </div>
</template>
<script>
    import HomeJs from './Home.js';
    export default HomeJs;
</script>
</script>
<style scoped lang="less">
   
</style>
