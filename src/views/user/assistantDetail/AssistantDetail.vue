<template>
    <div class="form">
        <mt-header fixed :title="headerConfig.title" v-if="headStatus">
            <router-link to="/user/shopAssistant" slot="left">
                <mt-button icon="back">{{lang.back}}</mt-button>
            </router-link>
            <mt-button @click="del(dataBox.id)" slot="right" v-if="this.$route.query.id">{{headerConfig.rightBtn}}</mt-button>
        </mt-header>
        <div class="container ">
            <el-form 
                  class="formeBox right clearfix" 
                  label-position="left" 
                  label-width="105px"
                  v-loading="loading2"
                  :model='dataBox'
                  :rules="rule_data"
                  ref='dataBox'>
              <!--邮箱-->
              <el-form-item
                :label="$route.query.id ? lang.bank_account :lang.email"
                :prop="$route.query.id ? '' : 'email'">
                  <el-input 
                    type="text" 
                    :placeholder="`${lang.pleaseInput}${lang.email}`"
                    :disabled="!!$route.query.id"
                    v-model='dataBox.email'></el-input>
              </el-form-item>
              <!--苏大夫邓帅分-->
              <el-form-item
                  :label="lang.realName"
                  class="topK"
                  prop='realname'>
                  <div class="text">{{lang.infoSetting}}</div>
                  <el-input 
                    type="text" 
                    :placeholder="`${lang.pleaseInput}${lang.realName}`"
                    v-model='dataBox.realname'></el-input>
              </el-form-item>
              <!--角色-->
              <el-form-item
                    :label="lang.roleSetting"
                    class="right"
                    prop='role'>
                    <i></i>
                  <div @click="roleSetting()" class="textRight">{{dataBox.roleName ? dataBox.roleName : `${lang.set}${lang.role}`}}</div>
                <el-input 
                        type="text" 
                        v-show="false"
                        v-model='dataBox.role'></el-input>
              </el-form-item>
              <el-form-item class="mt10 btnBox">
                  <el-button type="danger" @click="submint('dataBox')">{{lang.SubmitBtn}}</el-button>
              </el-form-item>
        </el-form> 
            <div class="pickerBox" v-if="pickerBoo" >
                <v-picker :config="pickerConfig" @selectPicker="selectPicker" @closePicker="closePicker"></v-picker>
            </div>
        </div>
    </div>
</template>
<script>
    import header from '../../../components/header/header'
    import picker from '../../../components/picker/picker'
    import { Indicator } from 'mint-ui';
    export default {
      name: 'home',
      methods :{
      },
      created() {
        if(this.$route.query.id){
          this.dataBox =  this.$route.query
        }
      },
      data(){
        return{
            loading2:false,
            shopinfoVuex:this.$store.state.user.userinfo,
            headerConfig:{
              title:this.lang.assistantDetail,
              rightShow:true,
              rightBtnUrl:'',
              rightBtn:this.lang.del,
            },
            pickerBoo:false,
            dataBox:{
              email:'',
              realname:'',
              role:'',
              roleName:'',
            },
            rule_data:{
              email : [{
                required: true,
                pattern : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                message : this.lang.emailError,
                trigger : 'blur'
              }],
              realname : [{
                required: true,
                message : this.lang.NoneNull,
                trigger : 'blur'
              }],
              role  : [{
                required: true,
                message : this.lang.NoneNull,
              }]
            }
        }
      },
      methods: {
        getData:function(){
          Indicator.open('加载中...');
        },
        roleSetting:function(){
          this.pickerConfig={//选择框配置
            state:0,//选中状态 0.国家 1.城市 2.货币
            dataBox:[{
              values:[{
                name:"管理员",
                id:2,
              },{
                name:"财务",
                id:3,
              },{
                name:"前台",
                id:4,
              }]
            }],
            selectBox:[],//选中状态
            title:this.lang.role,//标题
            name:'name'//选中的key
          }
          this.pickerBoo=true;
        },
        //组件返回数据
        selectPicker:function(data,state){
          this.dataBox = Object.assign({}, this.dataBox, {
              roleName: data[0].name,
              role: data[0].id,
          })
          this.pickerBoo=false
        },
        closePicker:function(){//关闭图片
          this.pickerBoo=false
        },
        del:function(id){
          this.$confirm(`${this.lang.confirmDel}?`, `${this.lang.tips}`, {
             confirmButtonText:`${this.lang.ok}`,
             cancelButtonText:`${this.lang.cancel}` ,
             type: 'warning'
           }).then(() => {
             this.$$api_user_del_user({
                data     : {id:id},
                fn       : data => {
                   this.$message.success(this.lang.delSuccess)
                   this.$router.push('/user/shopAssistant')
                },
                errFn    : (err) => {
                   this.loading2=false
                   this.$message.error(err.msg)
                }
             })
           }).catch(() => {
           });
        },
        submint:function(ref){
          this.$refs[ref].validate((valid) => {
            if (valid) {
              this.loading2=true
              this.$$api_user_edit_user({
                 data     : this[ref],
                 fn       : data => {
                    let text = '';
                    if(this.dataBox.id){
                      text = this.lang.modifySuccess
                    }else{
                      text = this.lang.addSuccess
                    }
                    this.$message.success(text)
                    this.$router.push('/user/shopAssistant')
                 },
                 errFn    : (err) => {
                    this.loading2=false
                    this.$message.error(err.msg)
                 }
              })
            }
          })
        }
      },
      computed: {
         
      },
      components: {
          'v-header' : header,
          'v-picker' : picker
      }
    }
    </script>
</script>
<style  lang="scss">
   .mint-cell-label{color: #999;}
</style>
