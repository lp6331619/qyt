<template>
    <div class="form">
        <v-header :headerConfig="headerConfig"></v-header>
        <div class="container ">
            <mt-cell  v-for="(item,index) in dataBox" :key="index" :title="item.title" :label="item.ctime" class="item mt10 p10 borderNone">
                <div class="price red" :class="{'green':item.type==2}">
                  <i class="mr5">{{item.type == 1 ? '+' :'-'}}</i>{{item.money/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></div>
            </mt-cell>
            <div class="noContent" v-if="dataBox.length==0">
              暂无内容
            </div>
        </div>
    </div>
</template>
<script>
    // import HomeJs from './Home.js';
    // export default HomeJs;
    import header from '../../../components/header/header'
    import { Indicator } from 'mint-ui';
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        this.getData()
      },
      data(){
        return{
            vuexData: this.$store.state.user.userinfo,
            headerConfig:{
              leftBtnUrl:'/user/wallet',
              title:this.lang.accountDetails,
              rightShow:false,
            },
            dataBox:[]
        }
      },
      methods: {
        getData:function(){
          Indicator.open('加载中...');
          this.$$api_user_money_log({
             data     : {},
             fn       : data => {
                Indicator.close();
                this.dataBox= data
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        }
      },
      computed: {
         
      },
      components: {
          'v-header' : header,
      }
    }
    </script>
</script>
<style lang="scss">
   .mint-cell-label{color: #999;}
</style>
