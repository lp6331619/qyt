<template>
    <div class="form">
      <mt-header fixed :title="headerConfig.title" v-if="headStatus">
          <mt-button slot="left" @click="categorysFun()">{{lang.classification}}</mt-button>
          <router-link :to="headerConfig.rightBtnUrl" slot="right" v-if="headerConfig.rightShow">
              <mt-button >{{headerConfig.rightBtn}}</mt-button>
          </router-link>
      </mt-header>
      <div class="container pb55" ref="container" :style="mainHeight">
          <mt-loadmore 
            v-if="dataBox.length>0"
            :bottom-method="loadBottom" 
            :bottom-all-loaded="allLoaded" 
            :max-distance="150"
            :auto-fill="false"
            ref="loadmore">
                <ul class="orderList productList mt10" >
                    <li v-for="(item,index) in dataBox" :key="index" @click="item.status!=2 ? toDetail(item.id) : ''" >
                      <mt-cell :title="item.name" class="item borderNone" :label="`${categorys[item.type].title} > ${categorys[item.type].sub[item.sub_type]}`">
                          <div class="price red" v-if="item.status!=2">{{item.price/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></div>
                          <div class="price" v-if="item.status==2">{{lang.toBeLeft}}</div>
                      </mt-cell>
                    </li>
                </ul>
          </mt-loadmore>
          <div class="noContent" v-else>
            {{lang.noData}}
          </div>
      </div>
      <div class="categorys active" v-if="categoryBoo">
        <ul>
          <li v-for="(item,index) in categorys" :key="index">
              <div class="btnBox" :class="{'active':item.status}" @click="setType(item.id)">{{item.title}}</div>
          </li>
        </ul>
      </div>
      <div class="bgBox" v-if="categoryBoo"></div>
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
        this.getData(1)
        this.getCategorys()
        this.mainHeight.height = document.documentElement.clientHeight +'px';
      },
      data(){
        return{
            mainHeight:{
              height:'0',
              overflow:'auto'
            },
            vuexData: this.$store.state.user.userinfo,
            headerConfig:{
              title:this.lang.user + this.lang.commodity,
              rightBtn:this.lang.addTo,
              rightShow:true,
              rightBtnUrl:'/product/detail'
            },
            selected:'1',
            queryLoading: false,
            moreLoading: false,
            allLoaded: false,
            totalNum: 0,
            pageSize: 20,
            pageNum: 2,
            dataBox:[],
            categorys:[],
            type:0,
            categoryBoo:false,
            cateChild:false,
        }
      },
      methods: {
          loadBottom: function () { // 加载更多数据的操作
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$$api_user_goodsLists({
               data     : {type:this.type,page:this.pageNum},
               fn       : data => {
                  if(data.length>0){
                    this.allLoaded = false;
                    this.pageNum++;
                    this.dataBox.push(...data)
                    this.$refs.loadmore.onBottomLoaded();
                  }else{
                    this.allLoaded = true;
                  }
               },
               errFn    : (err) => {
                  this.allLoaded = false;
               }
            })
          },
        //获取列表数据
        getData:function(num){
          Indicator.open('加载中...');
          this.$$api_user_goodsLists({
             data     : {page:num,type:this.type},
             fn       : data => {
                Indicator.close();
                this.dataBox = data
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
          
        },
        getCategorys : function(){
          this.$$api_user_categorys({//获取分类
             data     : {},
             fn       : data => {
                Indicator.close();
                this.categorys=data
                this.categorys.forEach((item)=>{
                  this.$set(item,'status',false)
                  if(item.id==1){
                    item.status=true
                  }
                })
                this.categorys.unshift({id:0,title:this.lang.allOrder})
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
        setType:function(id){
            this.categorys.forEach((item)=>{
              item.status = false
              if(item.id == id){
                item.status = true
              }
            })
            this.type = id
            this.getData(1)
            this.categoryBoo=false
        },
        setSubType:function(item,index){
          console.log(item,index) 
        },
        //去详情页
        toDetail:function(id){
          this.$router.push(`/product/detail?id=${id}`)
        },
        //打开分类
        categorysFun:function(){
          this.categoryBoo=true;
        }
      },
      computed: {
         
      },
      components: {
          'v-menu' : menu,
          'v-header' : header,
      }
    }
    </script>
</script>
<style >
    
</style>
