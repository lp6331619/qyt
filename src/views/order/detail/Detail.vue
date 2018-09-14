<template>
    <div class="form">
      <v-header :headerConfig="headerConfig"></v-header>
      <div class="container">
        <div class="orderdetail-wrap">
            <div class="orderdetail-item">
                <h3 class="txthide">{{dataBox.title}}<p class="orderdetail-price">{{dataBox.supplier_total_price/100}} <em class="ml5 f12">{{vuexData.shopinfo.currency_name}}</em></p></h3>
                <span  class="orderdetail-status" :class="{'no3':dataBox.status==1,'no2':dataBox.status==3,'no4':dataBox.status==5,'no5':dataBox.status==6}"></span>
                <div class="orderdetail-info noneline">
                    <ul>
                        <li><label>{{lang.orderId}}：</label>{{dataBox.order_sn}}</li>
                        <li><label>{{lang.orderDate}}：</label>{{dataBox.ctime}}</li>
                        <li><label>{{lang.buyName}}：</label>{{dataBox.consumer}}</li>
                        <li><label>{{lang.buyNum}}：</label>{{dataBox.num}}</li>
                        <li><label>{{lang.productPrice}}：</label>{{dataBox.supplier_price/100}} <em class="ml5">{{vuexData.shopinfo.currency_name}}</em></li>
                        <li v-if="dataBox.ticket_type==1"><label>{{lang.electronicTicket}}：</label> {{dataBox.ticket}}</li>
                        <li v-if="dataBox.ticket_type==2"><label>{{lang.recognitionCoding}}：</label><img v-for="(item,index) in urlBox" :key="index" :src="item"></li>
                        <li v-if="dataBox.ticket_type==3"><label>{{lang.code}}：</label><img v-for="(item,index) in urlBox" :key="index" :src="item"></li>
                    </ul>
                    <div class="btnBox" >
                      <mt-button type="danger" v-if="dataBox.ticket_type==1" @click="dialogVisible=true" size="small">{{lang.confirm}}</mt-button>
                      <mt-button class="m10" v-if="dataBox.status==1" @click="refund()" size="small">{{lang.refund}}</mt-button>
                      <mt-button class="m10" v-if="dataBox.status==1" type="danger" @click="subOrder()" size="small">{{lang.confirm}}</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <p class="ticket-term">{{lang.userDate}}：<span>{{dataBox.expired}}</span></p>
        <el-dialog
          :title="lang.electronicCode"
          :visible.sync="dialogVisible"
          size="tiny"
          class="popTip">
          <mt-navbar class="orderTab" v-model="selected">
            <mt-tab-item id="1">{{lang.electronicTicket}}</mt-tab-item>
            <mt-tab-item id="2">{{lang.recognitionCoding}}</mt-tab-item>
          </mt-navbar>
          <div class="popText">
              <mt-tab-container  v-model="selected">  
                <mt-tab-container-item id="1">
                    <el-upload
                      class="upload-demo"
                      action="http://merchant-api.quitang.com/public/oss_upload"
                      :on-success="handlePreview"
                      :on-remove="handleRemove"
                      :before-upload="handleBefore"
                      :on-error="handEorro"
                      :file-list="fileList2"
                      list-type="picture">
                      <el-button size="small" class="photoAdd iconfont icon-xiangji"></el-button>
                    </el-upload>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <textarea name="" id="" cols="30" v-model="textArea" rows="4"></textarea>
                </mt-tab-container-item>
            </mt-tab-container>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="danger" @click="SubmitBtn()">{{lang.SubmitBtn}}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>
<script>
    // import HomeJs from './Home.js';
    // export default HomeJs;
    import header from '../../../components/header/header'
    import { Indicator,MessageBox } from 'mint-ui';
    export default {
      name: 'home',
      methods :{
        
      },
      created() {
        if(this.$route.query.id){
          this.getInfo(this.$route.query)
        }
      },
      data(){
        return{
            vuexData: this.$store.state.user.userinfo,
            headerConfig:{
              leftBtnUrl:'/order',
              title:this.lang.orderInfo,
              rightShow:false,
            },
            dataBox:{},
            textArea:'',
            selected:'1',
            fileList2:[],
            urlBox:[],
            dialogVisible:false,
        }
      },
      methods: {
        getInfo:function(id){
          Indicator.open(this.lang.loading);
          this.$$api_user_ordersDetail({
             data     : id,
             fn       : data => {
                Indicator.close();
                this.dataBox = data
                this.urlBox = this.dataBox.ticket.split(',')
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
        handlePreview:function(response, file, fileList) {
          if(fileList.length<=6){
            file.url= 'http://img.quitang.com/' + response.data.img;
            this.fileList2.push(file)
          }
        },
        handleRemove:function(file, fileList){
          this.fileList2 = fileList
        },
        handleBefore:function(file){
          if(this.fileList2.length>=6){
            this.$message.error(this.lang.maxImg)
            return false
          }
        },
        handEorro:function(){
          this.$message.success(this.lang.photoEorro)
        },
        SubmitBtn:function(){
          if(this.fileList2.length>0 || !!this.textArea){
            let ticket = '';
            if(this.selected==1){
              this.fileList2.forEach((item)=>{
                ticket+=item.url+',';
              })
            }else{
              if(!!this.textArea){
                ticket=this.textArea
              }
            }
            this.$$api_user_ordersConfirm({
               data     : {id:this.$route.query.id,ticket:ticket},
               fn       : data => {
                  Indicator.close();
                  this.dialogVisible=false
                  this.$router.push('/order')
                  this.$message.success(this.lang.subSuccess)
               },
               errFn    : (err) => {
                  Indicator.close();
                  this.dialogVisible=false
                  this.$message.error(err.msg)
               }
            })
          }else{
            this.$message.error(this.lang.pleasrTips)
          }
        },
        //退款
        refund(){
          MessageBox.confirm('无法服务该笔订单，确认后将全额退款！','退款提示').then(action => {
              this.$$api_user_orders_nconfirm({
                 data     : {id:this.$route.query.id},
                 fn       : data => {
                    Indicator.close();
                    this.$router.push('/order')
                    this.$message.success(this.lang.subSuccess)
                 },
                 errFn    : (err) => {
                    this.$message.error(err.msg)
                 }
              })
          });
        },
        //确认订单
        subOrder(){
          MessageBox.confirm('是否确认接单？','提示').then(action => {
              this.$$api_user_ordersConfirm({
                 data     : {id:this.dataBox.id,ticket:this.dataBox.ticket},
                 fn       : data => {
                    Indicator.close();
                    this.$router.push('/order')
                    this.$message.success(this.lang.subSuccess)
                 },
                 errFn    : (err) => {
                    this.$message.error(err.msg)
                 }
              })
          });
        },

      },
      computed: {

      },
      components: {
          'v-header' : header,
      }
    }
    </script>
</script>
<style scoped lang="less">
    .m10{margin:0 10px}
    .btnBox{padding-bottom: 20px;
      button{padding:0 24px;margin-top: 20px;}
    }
    .popTip{
      .popText{padding:20px 10px 0;
        textarea{width: 100%; border: 1px solid #ddd; background: #f5f5f5;padding: 10px;}
        .photoAdd{border: 1px dashed #ccc;padding:0;width: 60px;height: 60px;text-align: center;line-height: 60px;
          &:before{font-size:26px;color: #aaa;}
        }
      }
    }
</style>
