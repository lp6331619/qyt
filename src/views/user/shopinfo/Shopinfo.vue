<template>
    <div class="lang">
      <v-header :headerConfig="headerConfig"></v-header>
      <div class="container">
        <div class="cert-tip" v-if="shopinfoVuex.shopinfo.auth_status==1"><i class="iconfont icon-tip"></i>{{lang.WaitHint}}</div>
        <div class="form-textr" :class="{'active': shopinfoVuex.shopinfo.auth_status==1}">
          <el-form 
                  class="formeBox right clearfix" 
                  label-position="left" 
                  label-width="105px"
                  v-loading="loading"
                  :model='shopinfo'
                  :rules="rule_data"
                  ref='shopinfo'>
              <el-form-item
                  class="lineInput right"
                  prop="avatar"
                  :label="lang.headPortrait">
                  <i></i>
                  <el-upload
                    v-if="shopinfoVuex.shopinfo.auth_status!=1"
                    style="float:right"
                    class="user-head"
                    action="http://merchant-api.quitang.com/public/oss_upload"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img :src="shopinfo.avatar ? shopinfo.avatar : img" class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div v-else class="user-head pull-right">
                      <img :src="shopinfo.avatar ? shopinfo.avatar : img" class="avatar">
                  </div>
                  <el-input 
                      type="text" 
                      v-show="false"
                      v-model='shopinfo.avatar'></el-input>
              </el-form-item>
              <!--店铺-->
              <el-form-item
                  :label="lang.shopName"
                  prop='name'>
                  <el-input 
                    type="text" 
                    :placeholder="`${lang.pleaseInput}${lang.shopName}`"
                    :disabled="shopinfoVuex.shopinfo.auth_status==1"
                    v-model='shopinfo.name'></el-input>
              </el-form-item>
              <!--国家-->
              <el-form-item
                      :label="lang.country"
                      class="right"
                      prop='country'>
                      <i></i>
                  <div @click="shopinfoVuex.shopinfo.auth_status!=1 ? countrys() : ''" class="textRight">{{shopinfo.country_name ? shopinfo.country_name : `${lang.set}${lang.country}`}}</div>
                  <el-input 
                          type="text" 
                          v-show="false"
                          v-model='shopinfo.country'></el-input>
              </el-form-item>
              <!--城市-->
              <el-form-item
                      :label="lang.city"
                      class="right"
                      prop='city'>
                      <i></i>
                  <div @click="shopinfoVuex.shopinfo.auth_status!=1 ? city() : ''" class="textRight">{{shopinfo.city_name ? shopinfo.city_name : `${lang.set}${lang.city}`}}</div>
                  <el-input 
                          type="text" 
                          v-show="false"
                          v-model='shopinfo.city'></el-input>
              </el-form-item>
              <!--地址-->
              <el-form-item
                      :label="lang.address"
                      class="textarea">
                  <el-input 
                          type="textarea" 
                          :placeholder="`${lang.pleaseInput}${lang.address}`"
                          :disabled="shopinfoVuex.shopinfo.auth_status==1"
                          v-model='shopinfo.address'></el-input>
              </el-form-item>
              <!--单位-->
              <el-form-item
                      :label="lang.unit"
                      class="right"
                      prop='currency'>
                      <i></i>
                  <div @click="shopinfoVuex.shopinfo.auth_status!=1 && shopinfoVuex.shopinfo.auth_status!=2 ? unit() : ''" class="textRight">{{shopinfo.currency_name ? shopinfo.currency_name : `${lang.set}${lang.unit}`}}</div>
                  <el-input 
                          type="text" 
                          v-show="false"
                          v-model='shopinfo.currency'></el-input>
              </el-form-item>
              <!--负责人-->
              <el-form-item
                      :label="lang.personCharge"
                      prop='contact'>
                  <el-input 
                          type="text" 
                          :disabled="shopinfoVuex.shopinfo.auth_status==1"
                          :placeholder="`${lang.pleaseInput}${lang.personCharge}`"
                          v-model='shopinfo.contact'></el-input>
              </el-form-item>
              <!--联系电话-->
              <el-form-item
                      :label="lang.tel"
                      prop='tel'>
                  <el-input 
                          type="text" 
                          :disabled="shopinfoVuex.shopinfo.auth_status==1"
                          :placeholder="`${lang.pleaseInput}${lang.tel}`"
                          v-model='shopinfo.tel'></el-input>
              </el-form-item>
              <el-form-item class="mt10 btnBox" v-if="shopinfoVuex.shopinfo.auth_status!=1">
                  <el-button type="danger" @click="submint('shopinfo')">{{lang.SubmitBtn}}</el-button>
              </el-form-item>
          </el-form>
          <div class="pickerBox" v-if="pickerBoo" >
              <v-picker :config="pickerConfig" @selectPicker="selectPicker" @closePicker="closePicker"></v-picker>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import ShopinfoJs from './Shopinfo.js';
    export default ShopinfoJs;
</script>
</script>
<style scoped>
    
</style>
