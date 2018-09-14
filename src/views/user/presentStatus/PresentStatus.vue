<template>
    <div class="form">
        <v-header :headerConfig="headerConfig" ></v-header>
        <div class="container ">
          <div class="cashprogress">
            <ul class="clearfix">
              <li class="active"><span><i class="iconfont icon-progress"></i></span>{{lang.application}}<p>{{dataBox.ctime}}</p></li>
              <li :class="{'active': dataBox.status!=1}"><span><i class="iconfont icon-progress"></i></span>{{lang.waitSuccess}}<p>{{dataBox.waitExamine}}</p></li>
              <li :class="{'active': dataBox.status!=1 && dataBox.status!=2 , 'error' : dataBox.status==-1}"><span><i class="iconfont icon-progress"></i></span>{{dataBox.status == -1 ? lang.withdrawalsError : lang.withdrawalsSuccess}}<p>{{dataBox.withdraw_time}}</p></li>
            </ul>
          </div>
          <div class="cash-fail" v-if="dataBox.remark">
            {{lang.causeCailure}}:{{dataBox.remark}}
          </div>
          <hr class="separator">
          <mt-cell :title="lang.PresentInformation"></mt-cell>
          <mt-cell :title="lang.money"><span>{{dataBox.money/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></span></mt-cell>
          <mt-cell :title="lang.name">{{dataBox.bank_owner}}</mt-cell>
          <mt-cell :title="lang.bank_account">{{dataBox.bank_account}}</mt-cell>
          <mt-cell :title="lang.bank">{{dataBox.bank_name}}</mt-cell>
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
              leftBtnUrl:'/user/presentRecord',
              title:this.lang.presentStatus,
              rightShow:false,
            },
            dataBox:{},
        }
      },
      methods: {
       getData:function(){
         this.$$api_user_withdraw_detail({
            data     : {id:this.$route.query.id},
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
<style  lang="scss">
  
   .mint-cell-label{color: #999;}
</style>
