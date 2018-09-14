<template>
    <div class="form">
        <div class="container has-tabbar">
            <div class="merchant-head">
                <a href="userinfo.html" class="user-head">
                    <img :src="vuexData ? vuexData.shopinfo.avatar : img" alt="">
                </a>
                <a class="info-link txthide">{{vuexData.userinfo.email}}<br>{{identity}}</a>
            </div>
            <mt-cell :title="lang.myWallet" to="/user/wallet" is-link><span>{{vuexData.shopinfo.total_money/100}}<em class="ml5">{{vuexData.shopinfo.currency_name}}</em></span></mt-cell>
            <hr class="separator">
            <mt-cell :title="lang.storeInformation" to="/user/shopinfo" is-link><span><em>{{state}}</em></span></mt-cell>
            <mt-cell :title="lang.shopAssistant" to="/user/shopAssistant" is-link></mt-cell>
            <mt-cell :title="lang.modifyPassword" to="/user/ModifyPassword" is-link></mt-cell>
            <div class="btnBox">
              <el-button type="danger" @click="goOut()">{{lang.out}}</el-button>
            </div>
        </div>
        <v-menu></v-menu>
    </div>
</template>
<script>
    // import HomeJs from './Home.js';
    // export default HomeJs;
    import menu from '../../../components/menu/menu'
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        
      },
      data(){
        return{
            img : require('../../../assets/images/default-head.jpg'),
            vuexData: this.$store.state.user.userinfo,
        }
      },
      methods: {
        goOut:function(){
          if(window.vagent){
            window.vagent.logout()
          }
          this.$router.push('/login');
          this.$store.dispatch('remove_userinfo')
        }
      },
      computed: {
         identity:function(){
            if(this.$store.state.user.userinfo.userinfo.role){
              switch(parseInt(this.$store.state.user.userinfo.userinfo.role)){
                case 1:
                return this.lang.adminSupper
                break;
                case 2:
                return this.lang.admin
                break;
                case 3:
                return this.lang.adminWealth
                break;
                case 4:
                return this.lang.adminReception
                break;
              }
            }
         },
         state:function(){
            if(this.$store.state.user.userinfo.shopinfo.auth_status){
              switch(parseInt(this.$store.state.user.userinfo.shopinfo.auth_status)){
                case -1:
                return this.lang.verificationFailure
                break;
                case 0:
                return this.lang.consummation
                break;
                case 1:
                return this.lang.verificationing
                break;
                case 2:
                return this.lang.verificationSuccess
                break;
              }
            }
         }
      },
      components: {
          'v-menu' : menu,
      }
    }
    </script>
</script>
<style scoped lang="scss">
    .btnBox{padding: 20px;
      .el-button{width: 100%}
    }
</style>
