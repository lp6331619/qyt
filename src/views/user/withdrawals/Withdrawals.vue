<template>
    <div class="form">
        <v-header :headerConfig="headerConfig"></v-header>
        <div class="container ">
          <el-form 
            class="formeBox" 
            label-position="left" 
            label-width="105px" 
            v-loading="loading" 
            :element-loading-text="`${lang.loading}${lang.login}`" 
            :model='dataBox' 
            :rules="rule_data" 
            ref='dataBox'>
                <el-form-item 
                    :label="lang.name" 
                    prop='bank_owner'>
                    <el-input type="text" auto-complete="off" :placeholder="`${lang.pleaseInput}${lang.name}`" ref="user_name_box" v-model='dataBox.bank_owner'></el-input>
                </el-form-item>
                <el-form-item 
                    :label="lang.bank_account" 
                    prop='bank_account'>
                    <el-input type="text" auto-complete="off" :placeholder="`${lang.pleaseInput}${lang.bank_account}`" ref="user_name_box" v-model='dataBox.bank_account'></el-input>
                </el-form-item>
                <el-form-item 
                    :label="lang.bank" 
                    prop='bank_name'>
                    <el-input type="text" auto-complete="off" :placeholder="`${lang.pleaseInput}${lang.bank}`" ref="user_name_box" v-model='dataBox.bank_name'></el-input>
                </el-form-item>
                <el-form-item 
                    class="monyBox"
                    label-width="0" 
                    prop='money'>
                    <div class="item-money">
                        <h3>{{lang.amountCash}}</h3>
                        <div class="input-money">
                            <el-input :placeholder="`${lang.pleaseInput}${lang.money}`" type="number" v-model="dataBox.money"></el-input>
                            <label>{{vuexData.shopinfo.currency_name}}</label></div>
                        <div class="input-money-tip">{{lang.sureAmountCash}}{{vuexData.shopinfo.total_money/100}}{{vuexData.shopinfo.currency_name}}
                            <a @click="allMoney()">{{lang.fullPresentation}}</a></div>
                    </div>
                    <p class="cash-tip">{{lang.topTime}}</p>
                    <div class="pd10wrap">
                        <mt-button type="danger" size="large" @click="SubmitBtn('dataBox')">{{lang.SubmitBtn}}</mt-button></div>
                </el-form-item>
            </el-form>
             
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
        this.$$api_user_shop({
             data     : {},
             fn       : data => {}
         })
      },
      data(){
        return{
            vuexData: this.$store.state.user.userinfo,
            headerConfig:{
                leftBtnUrl:'/user/wallet',
                title:this.lang.Withdrawals,
                rightShow:false,
            },
            loading:false,
            dataBox:{},
            rule_data:{
                bank_owner:[{
                    required: true,
                    message : this.lang.NoneNull,
                    trigger : 'blur'
                }],
                bank_account:[{
                    required: true,
                    message : this.lang.NoneNull,
                    trigger : 'blur'
                }],
                bank_name:[{
                    required: true,
                    message : this.lang.NoneNull,
                    trigger : 'blur'
                }],
                money:[{
                    required: true,
                    message : this.lang.NoneNull,
                    trigger : 'blur'
                }],
            }
        }
      },
      methods: {
        SubmitBtn:function(ref){
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.dataBox.money = this.dataBox.money*100
                    Indicator.open(this.lang.loading)
                    this.$$api_user_withdraw({
                         data     : this.dataBox,
                         fn       : data => {
                            this.$$api_user_shop({
                                 data     : {},
                                 fn       : data => {
                                    this.$store.dispatch('update_userinfo', {
                                        userinfo: {
                                            token: this.vuexData.token,
                                            state:2,
                                            shopinfo:data,
                                            userinfo:this.vuexData.userinfo
                                        }
                                    }).then(()=>{
                                        this.$message.success(this.lang.bringSuccess+'!')
                                        Indicator.close();
                                        this.$router.push('/user')
                                    })
                                 }
                            })
                         },
                         errFn    : (err) => {
                            Indicator.close()
                            this.dataBox.money = this.dataBox.money/100
                            this.$message.error(err.msg)
                         }
                    })
                }
            })
        },
        allMoney(){
            this.dataBox = Object.assign({}, this.dataBox, {
                money: this.vuexData.shopinfo.total_money/100
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
<style  lang="scss" >
  
</style>
