<template>
    <div class="regist" >
        <v-header :headerConfig="headerConfig"></v-header>
        <div class="container">
            <el-form 
                    class="formeBox" 
                    label-position="left" 
                    label-width="105px"
                    v-loading="loading"
                    :element-loading-text="`${lang.loading}${lang.regist}`"
                    :model='registData'
                    :rules="rule_data"
                    ref='registData'>
                <el-form-item
                        :label="lang.oldPassword"
                        prop='old_pwd'>
                    <el-input 
                            type="text" 
                            auto-complete="off" 
                            :autofocus="autofocus"
                            :placeholder="`${lang.pleaseInput}${lang.oldPassword}`"
                            ref="user_name_box"
                            v-model='registData.old_pwd'></el-input>
                </el-form-item>
                <el-form-item
                        :label="`${lang.newPassword}`"
                        prop='new_pwd'>
                    <el-input 
                            type="password" 
                            auto-complete="off" 
                            :placeholder="`${lang.pleaseInput}${lang.newPassword}`"
                            ref="user_name_box"
                            @keyup.native.enter="onRegist('registData')"
                            v-model='registData.new_pwd'></el-input>
                </el-form-item>
                <el-form-item
                        :label="`${lang.repeatPassword}`"
                        prop='confirm_pwd'>
                    <el-input 
                            type="password" 
                            auto-complete="off" 
                            :placeholder="`${lang.confirm}${lang.repeatPassword}`"
                            ref="user_name_box"
                            @keyup.native.enter="onRegist('registData')"
                            v-model='registData.confirm_pwd'></el-input>
                </el-form-item>
                <el-form-item class="mt10 btnBox">
                    <el-button type="danger" @click="onRegist('registData')">{{lang.SubmitBtn}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import header from '../../../components/header/header'
import { Indicator } from 'mint-ui';
export default {
  name   : 'login',
  created() {
    
  },
  data() {
    return {
      headerConfig:{
        leftBtnUrl:'/user',
        title:this.lang.modifyPassword,
        rightShow:false,
      },
      autofocus:true,
      registData:{
        username:'',//3848488@qq.com
        password:'',//123123
        password_confirm:'',
      },
      rule_data: {
        old_pwd : [{
            required: true,
            pattern : /^.{6,6}$/,
            message : this.lang.emailError,
            trigger : 'blur'
        }],
        new_pwd  : [{
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error(this.lang.passwordError));
            } else {
              if (!(/^.{6,6}$/.test(value))) {
                callback(new Error(this.lang.passwordBits));
              } else {
                if (this.register === true) {
                  if (this.registData.confirm_pwd !== '') {
                    this.$refs.registData.validateField('confirm_pwd');
                  }
                }
                callback();
              }
            }
          },
          trigger  : 'blur'
        }],
        confirm_pwd: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error(this.lang.passwordAga));
            } else if (value !== this.registData.new_pwd) {
              callback(new Error(this.lang.passwordNo+'!'));
            } else {
              callback();
            }
          },
          trigger  : 'blur'
        }]
      }
    }
  },
  methods: {
    onRegist:function(ref){
      Indicator.open('加载中...');
      this.$$api_user_change_pwd({
           data     : this[ref],
           fn       : data => {
              Indicator.close();
              this.$message.success(this.lang.modifySuccess)
              this.$router.push('/home')
           },
           errFn    : (err) => {
              Indicator.close();
              this.$message.error(err.msg)
           }
      })

    }
  },
  components: {
    'v-header' : header,
  },
}
</script>

<style scoped lang='less'>
    
</style>
