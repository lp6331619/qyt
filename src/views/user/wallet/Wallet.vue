<template>
    <div class="form">
        <v-header :headerConfig="headerConfig"></v-header>
        <div class="container ">
            <mt-cell class="walletPl" :title="lang.accountDetails" to="/user/accountDetails" is-link></mt-cell>
            <mt-cell class="walletPl" :title="lang.accountMoney" to="/user/wallet" >
              <span>{{vuexData.shopinfo.total_money/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></span>
            </mt-cell>
            <mt-cell class="withdrawals" to="/user/withdrawals" >
              <div><span class="iconfont icon-wallet"></span>{{lang.Withdrawals}}</div>
            </mt-cell>
            <hr class="separator">
            <mt-cell to="/user/presentRecord" :title="lang.presentRecord" is-link>
            </mt-cell>
         <!--    <hr class="separator">
            <mt-cell to="/user/bankManagement" :title="lang.bankManagement" is-link>
            </mt-cell> -->
        </div>
    </div>
</template>
<script>
    // import HomeJs from './Home.js';
    // export default HomeJs;
    import header from '../../../components/header/header'
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
            vuexData: this.$store.state.user.userinfo,
            headerConfig:{
              leftBtnUrl:'/user',
              title:this.lang.myWallet,
              rightShow:false,
            },
        }
      },
      methods: {
      },
      computed: {
         
      },
      components: {
          'v-header' : header,
      }
    }
    </script>
</script>
<style scoped lang="scss">
  
   
</style>
