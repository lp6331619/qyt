<template>
    <div class="form">
      <v-header :headerConfig="headerConfig"></v-header>
      <div class="container containerTab">
        <mt-navbar class="orderTab" v-model="selected" fixed >
          <mt-tab-item id="1">{{lang.confirmed}}</mt-tab-item>
          <mt-tab-item id="2">{{lang.treats}}</mt-tab-item>
          <mt-tab-item id="3">{{lang.expended}}</mt-tab-item>
          <mt-tab-item id="-1">{{lang.allOrder}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container class="orderList" v-model="selected"> 
          <mt-tab-container-item id="1">
            <div class="mainHeight" :style="mainHeight">
              <mt-loadmore 
                :bottom-method="loadBottom" 
                :bottom-all-loaded="allLoaded" 
                :max-distance="150"
                :auto-fill="false"
                @top-status-change="handleBottomChange" 
                ref="loadmoreOne">
                  <ul class="scroll-wrapper">
                      <li v-for="(item,index) in dataBox" :key="index">
                        <mt-cell :title="item.title" class="item" :label="`${lang.buyName}：${item.consumer}`" is-link>
                            <div class="orderId">{{lang.orderId}}：{{item.order_sn}}</div>
                            <time>{{item.ctime}}</time>
                            <div class="price red">{{item.supplier_total_price/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></div>
                            <div class="num">{{lang.num}}：{{item.num}}</div>
                        </mt-cell>
                        <el-button @click="toDetail(item.id)" type="danger" class="btn" size="small">{{lang.seeDetail}}</el-button>
                      </li>
                  </ul>
              </mt-loadmore>
              <div class="noContent" v-if="dataBox.length==0">
                {{lang.noData}}
              </div>
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="2">  
            <div class="mainHeight" :style="mainHeight">
              <mt-loadmore 
                :bottom-method="loadBottom" 
                :bottom-all-loaded="allLoaded" 
                :max-distance="150"
                :auto-fill="false"
                @top-status-change="handleBottomChange" 
                ref="loadmoreTwo">
                  <ul class="scroll-wrapper">
                      <li v-for="(item,index) in dataBox2" :key="index" >
                        <mt-cell :title="item.title" class="item" :label="`${lang.buyName}：${item.consumer}`" is-link>
                            <div class="orderId">{{lang.orderId}}：{{item.order_sn}}</div>
                            <time>{{item.ctime}}</time>
                            <div class="price red">{{item.supplier_total_price/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></div>
                            <div class="num">{{lang.num}}：{{item.num}}</div>
                            <el-button @click="toDetail(item.id)" type="danger" class="btn" size="mini">{{lang.seeDetail}}</el-button>
                        </mt-cell>
                      </li>
                  </ul>
              </mt-loadmore>
              <div class="noContent" v-if="dataBox2.length==0">
                {{lang.noData}}
              </div>
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="3">  
            <div class="mainHeight" :style="mainHeight">
              <mt-loadmore 
                :bottom-method="loadBottom" 
                :bottom-all-loaded="allLoaded" 
                :max-distance="150"
                :auto-fill="false"
                @top-status-change="handleBottomChange" 
                ref="loadmoreThree">
                  <ul class="scroll-wrapper">
                      <li v-for="(item,index) in dataBox3" :key="index" >
                        <mt-cell :title="item.title" class="item" :label="`${lang.buyName}：${item.consumer}`" is-link>
                            <div class="orderId">{{lang.orderId}}：{{item.order_sn}}</div>
                            <time>{{item.ctime}}</time>
                            <div class="price red">{{item.supplier_total_price/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></div>
                            <div class="num">{{lang.num}}：{{item.num}}</div>
                            <el-button @click="toDetail(item.id)" type="danger" class="btn" size="mini">{{lang.seeDetail}}</el-button>
                        </mt-cell>
                      </li>
                  </ul>
              </mt-loadmore>
              <div class="noContent" v-if="dataBox3.length==0">
                {{lang.noData}}
              </div>
            </div>
          </mt-tab-container-item> 
          <mt-tab-container-item id="-1">  
            <div class="mainHeight" :style="mainHeight">
              <mt-loadmore 
                :bottom-method="loadBottom" 
                :bottom-all-loaded="allLoaded" 
                :max-distance="150"
                :auto-fill="false"
                @top-status-change="handleBottomChange" 
                ref="loadmoreThree">
                  <ul class="scroll-wrapper">
                      <li v-for="(item,index) in dataBox4" :key="index" >
                        <mt-cell :title="item.title" class="item" :label="`${lang.buyName}：${item.consumer}`" is-link>
                            <div class="orderId">{{lang.orderId}}：{{item.order_sn}}</div>
                            <time>{{item.ctime}}</time>
                            <div class="price red">{{item.supplier_total_price/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></div>
                            <div class="num">{{lang.num}}：{{item.num}}</div>
                            <el-button @click="toDetail(item.id)" type="danger" class="btn" size="mini">{{lang.seeDetail}}</el-button>
                        </mt-cell>
                      </li>
                  </ul>
              </mt-loadmore>
              <div class="noContent" v-if="dataBox4.length==0">
                {{lang.noData}}
              </div>
            </div>
          </mt-tab-container-item>   
        </mt-tab-container>  
      </div>
      <v-menu></v-menu>
    </div>
</template>
<script>
    // import HomeJs from './Home.js';
    // export default HomeJs;
    import header from '../../../components/header/header'
    import menu from '../../../components/menu/menu'
    import { Indicator } from 'mint-ui';
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        this.getData()
        this.mainHeight.height = document.documentElement.clientHeight-133 +'px';
        if(this.$route.query.status){
          this.selected=this.$route.query.status
        }
      },
      data(){
        return{
            mainHeight:{
              height:'0',
              overflow:'auto'
            },
            vuexData: this.$store.state.user.userinfo,
            headerConfig:{
              leftBtnUrl:'/home',
              title:this.lang.user + this.lang.order,
              rightShow:false,
            },
            selected: this.$route.query.status ? this.$route.query.status : '1',
            queryLoading: false,
            moreLoading: false,
            allLoaded: false,
            totalNum: 0,
            pageSize: 20,
            pageNum: 1,
            dataBox:[],
            dataBox2:[],
            dataBox3:[],
            dataBox4:[],
            topStatus:'',
        }
      },
      methods: {
        handleBottomChange:function(){

        },
        loadBottom: function () { // 加载更多数据的操作
           this.allLoaded = true;// 若数据已全部获取完毕
           this.pageNum++;
           this.$$api_user_ordersLists({
              data     : {status:this.selected,page:this.pageNum},
              fn       : data => {
                 if(data.length>0){
                   this.allLoaded = false;
                   switch(parseInt(this.selected)){
                     case -1:
                      this.dataBox4.push(...data)
                      break;
                     case 3:
                      this.dataBox3.push(...data)
                      break;
                     case 1:
                      this.dataBox.push(...data)
                      break;
                     case 2:
                      this.dataBox2.push(...data)
                      break;
                   }
                 }else{
                   this.allLoaded = true;
                 }
                 this.$refs.loadmoreOne.onBottomLoaded();
                 this.$refs.loadmoreTwo.onBottomLoaded();
                 this.$refs.loadmoreThree.onBottomLoaded();
              },
              errFn    : (err) => {
                 this.allLoaded = false;
              }
           })
        },
        //获取列表数据
        getData:function(num){
          Indicator.open('加载中...');
          this.$$api_user_ordersLists({
             data     : {page:1,status:this.selected},
             fn       : data => {
                switch(parseInt(this.selected)){
                  case -1:
                    this.dataBox4 = data
                    break;
                  case 3:
                    this.dataBox3 = data
                    break;
                  case 1:
                    this.dataBox = data
                    break;
                  case 2:
                    this.dataBox2 = data
                    break;
                }
                Indicator.close();
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
        //去详情页
        toDetail:function(id){
          this.$router.push(`/order/detail?id=${id}`)
        },
      },
      watch: {
        selected:{  
            handler:function(val,oldval){  
                this.pageNum=1
                this.getData()
                this.allLoaded=false;
            },  
            deep:true//对象内部的属性监听，也叫深度监听  
        },  
      },
      components: {
          'v-menu' : menu,
          'v-header' : header,
      }
    }
    </script>
</script>
<style lang="less" scoped>
  .scroll-wrapper{
    li{position: relative;}
  }
</style>
