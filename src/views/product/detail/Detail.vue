<template>
    <div class="form">
      <mt-header fixed :title="headerConfig.title" v-if="headStatus">
          <router-link to="/product" slot="left">
            <mt-button icon="back">{{lang.back}}</mt-button>
          </router-link>
          <!-- <mt-button @click="edit('dataBox')" slot="right">{{headerConfig.rightBtn}}</mt-button> -->
      </mt-header>
      <div class="container form-textr" :class="{'active' : !stateEdit}">
          <el-form 
                class="formeBox mt10" 
                label-position="left" 
                label-width="105px"
                v-loading="loading"
                :element-loading-text="`${lang.loading}${lang.SubmitBtn}`"
                :model='dataBox'
                :rules="rule_data"
                ref='dataBox'>
                <!--商品名称-->
                <el-form-item
                    :label="lang.productName"
                    prop='name'>
                    <el-input 
                        type="text" 
                        :placeholder="`${lang.pleaseInput}${lang.productName}`"
                        :disabled="!stateEdit"
                        v-model='dataBox.name'></el-input>
                </el-form-item>
                <!--商品类型-->
                <el-form-item
                    :label="lang.productType"
                    class="right"
                    prop='sub_type'>
                    <i></i>
                    <div @click="stateEdit ? categorysFun() : ''" class="textRight">{{dataBox.type_name ? dataBox.type_name : `${lang.set}${lang.productType}`}}</div>
                    <el-input 
                        type="text" 
                        v-show="false"
                        v-model='dataBox.sub_type'></el-input>
                </el-form-item>
                <!--成人价格-->
                 <el-form-item
                    :label="adultPrice"
                    class="priceBox"
                    prop='price'>
                    <el-input 
                        type="number" 
                        :disabled="!stateEdit"
                        :placeholder="`${lang.pleaseInput}${lang.price}`"
                        v-model='dataBox.price'></el-input>
                    <span>{{vuexData.shopinfo.currency_name}}</span>
                </el-form-item>
                <!--节假日价格-->
                <el-form-item
                    v-if="dataBox.type==2 || dataBox.type==4 || dataBox.type==6 || dataBox.child== 0|| dataBox.child== 1|| dataBox.child== 2|| dataBox.child== 5"
                    :label="lang.holidayPrice"
                    class="priceBox">
                    <el-input 
                        type="number" 
                        :disabled="!stateEdit"
                        :placeholder="`${lang.pleaseInput}${lang.price}`"
                        v-model='dataBox.holiday_price'></el-input>
                    <span>{{vuexData.shopinfo.currency_name}}</span>
                </el-form-item>
                <!--儿童价格-->
                <el-form-item
                    v-if="dataBox.type==6"
                    :label="lang.childPrice"
                    class="priceBox">
                    <el-input 
                        type="number" 
                        :disabled="!stateEdit"
                        :placeholder="`${lang.pleaseInput}${lang.price}`"
                        v-model='dataBox.children_price'></el-input>
                    <span>{{vuexData.shopinfo.currency_name}}</span>
                </el-form-item>
                <!--取货方式-->
                <el-form-item
                    :label="lang.takingGoods"
                    v-if="dataBox.type==5"
                    class="right"
                    prop='logistics_type'>
                    <i></i>
                    <div @click="stateEdit ? logistics() : ''" class="textRight">{{dataBox.logistics_type_name ? dataBox.logistics_type_name : `${lang.set}${lang.takingGoods}`}}</div>
                    <el-input 
                        type="text" 
                        v-show="false"
                        v-model='dataBox.logistics_type'></el-input>
                </el-form-item>
                <!--目的地-->
                <el-form-item
                    :label="lang.Destination"
                    v-if="dataBox.type==3"
                    prop='arrival'>
                    <el-input 
                        type="text" 
                        :disabled="!stateEdit"
                        :placeholder="`${lang.pleaseInput}${lang.Destination}`"
                        v-model='dataBox.arrival'></el-input>
                </el-form-item>
                <!--出发地-->
                <el-form-item
                    :label="lang.placeDeparture"
                    v-if="dataBox.type==3"
                    prop='departure'>
                    <el-input 
                        type="text" 
                        :disabled="!stateEdit"
                        :placeholder="`${lang.pleaseInput}${lang.placeDeparture}`"
                        v-model='dataBox.departure'></el-input>
                </el-form-item>
                <!--验证方式-->
               <!--  <el-form-item
                        :label="lang.Verification"
                        class="right"
                        prop='ticket_type'>
                    <i></i>
                    <div @click="stateEdit ? Verification() : ''" class="textRight">{{dataBox.ticket_type_name ? dataBox.ticket_type_name : `${lang.set}${lang.Verification}`}}</div>
                    <el-input 
                        type="text" 
                        v-show="false"
                        v-model='dataBox.ticket_type'></el-input>
                </el-form-item> -->
                <!--节假日选择-->
               <!--  <el-form-item
                    :label="lang.holidayDelection"
                    v-if="dataBox.type==2"
                    prop='holidays'>
                    <el-date-picker
                        v-model="dataBox.holidays2"
                        align="right"
                        range-separator="~"
                        type="daterange"
                        :disabled="!stateEdit"
                        @change="getTime"
                        :placeholder="`${lang.pleaseInput}${lang.holidayDelection}`">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item
                    :label="lang.holidayDelection"
                    v-if="dataBox.type==2 || dataBox.type==4 || dataBox.type==6 || dataBox.child== 0|| dataBox.child== 1|| dataBox.child== 2|| dataBox.child== 5"
                    prop='holidays'>
                    <input type="text" class="data" 
                    :disabled="!stateEdit" @click="openMultiByDrop($event)" v-model="calendar5.display" readonly>
                    <i class="el-input__icon el-icon-date"></i>
                </el-form-item>
          </el-form>
          <div class="categorys" v-if="categoryBoo">
            <ul>
              <li v-for="(item,index) in categorys" :key="index">
                  <div class="btnBox" :class="{'active':item.status}" @click="setType(item.id)">{{item.title}}</div> 
                  <div class="moreBox" v-if="item.status">
                    <div class="item" @click="setSubType(item,indexChild)" v-for="(itemChild,indexChild) in item.sub" :key="indexChild">{{itemChild}}</div>
                  </div>
              </li>
            </ul>
          </div>
          <div class="bgBox" v-if="categoryBoo"></div>
          <div class="noContent" v-if="dataBox.length==0">
            {{lang.noData}}
          </div>
      </div>
      <div class="btnBoxBottom" >
        <el-button type="success" v-if="$route.query.id && !stateEdit" @click="drop()">{{lang.drop}}</el-button>
        <el-button type="danger" v-if="!$route.query.id" @click="edit('dataBox')">{{headerConfig.rightBtn}}</el-button>
      </div>
      <div class="pickerBox" v-if="pickerBoo" >
          <v-picker :config="pickerConfig" @selectPicker="selectPicker" @closePicker="closePicker"></v-picker>
      </div>
      <!--日期插件-->
      <el-dialog
        :visible.sync="calendar5.show"
        :show-close="false"
        size="full">
        <v-calendar :zero="calendar5.zero" :lunar="calendar5.lunar" :value="calendar5.value" :multi="calendar5.multi" @select="calendar5.select"></v-calendar>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="calendar5.show = false">取 消</el-button> -->
          <el-button type="primary" style="width:100%;text-align: center;" @click="dataSub()">{{lang.ok}}</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
    import DetailJs from './Detail.js';
    export default DetailJs;
</script>
<style scoped>
    .data{text-align: right;width: 100%;line-height: 38px;padding-right: 35px!important;}
    .btnBoxBottom{padding: 20px;}
    .btnBoxBottom .el-button{display: block;width: 100%;margin-bottom: 20px;margin-left: 0;}
    .formeBox.formeBox input{background: #fff}
</style>
