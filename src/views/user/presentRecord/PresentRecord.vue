<template>
    <div class="form">
        <v-header :headerConfig="headerConfig" ></v-header>
        <div class="container ">
            <div @click="toDetail(item)" v-for="(item,index) in dataBox" :key="index" >
              <mt-cell :title="item.bank_name " :label="item.bank_account" class="item mt10 p10 borderNone">
                  <div class="price red">
                    {{item.money/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em> <small class="pop" :class="{'green':item.status==2,'gray':item.status==3}">{{statusBox(item.status)}}</small></div>
              </mt-cell>
            </div>
            <div class="noContent" v-if="dataBox.length==0">
              暂无内容
            </div>
        </div>
    </div>
</template>
<script>
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
              title:this.lang.presentRecord,
              rightShow:false,
            },
            dataBox:[],
        }
      },
      methods: {
        getData:function(){
          Indicator.open('加载中...');
          this.$$api_user_withdraw_list({
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
        },
        statusBox:function(state){
          switch(parseInt(state)){
            case 1:
            return this.lang.Application
            break;
            case 2:

            return this.lang.bringSuccess
            break;
            case 3:

            return this.lang.bringerror
            break;
          }
        },
        toDetail:function(item){
          this.$router.push({path:`/user/presentStatus?id=${item.id}`})
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
<style  lang="scss">
  
   .mint-cell-label{color: #999;}
</style>
