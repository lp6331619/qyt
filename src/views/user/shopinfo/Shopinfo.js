import header from '../../../components/header/header'
import picker from '../../../components/picker/picker'
import { Indicator } from 'mint-ui';
export default {
  created() {
    this.getList()
    this.shopinfo = this.shopinfoVuex.shopinfo
  },
  data(){
    return{
        img : require('../../../assets/images/default-head.jpg'),
        headerConfig:{
          leftBtnUrl:'/user',
          title:this.lang.storeInformationAudit,
          rightShow:false,
        },
        loading:false,
        shopinfoVuex: this.$store.state.user.userinfo,
        shopinfo:{},
        shopName:{
          shopName:'',
          countryName:'',
          currencyName:''
        },
        rule_data: {
          avatar : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
          name : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
          country : [{
              required: true,
              message : this.lang.NoneNull,
          }],
          city : [{
              required: true,
              message : this.lang.NoneNull,
          }],
          address : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
          currency : [{
              required: true,
              message : this.lang.NoneNull,
          }],
          contact : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
          tel : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          },{
            pattern : /^1[34578]\d{9}$/,
            message : this.lang.photoFormat,
            trigger : 'blur'
          }],
        },
        getArry:[],//获取数据
        countrysArry:[],//国家数据
        citysArry:[],//城市数据
        pickerBoo:false,//选择弹框打开状态
        state:0,
        pickerConfig:{//选择框配置
          state:0,//选中状态 0.国家 1.城市 2.货币
          dataBox:[],//数据
          selectBox:[],//选中状态
          title:'',//标题
        },
        imgUrl:'',
        imageBase:{
          'Content-Type':'multipart/form-data'
        }
    }
  },
  methods: {
      getList:function(){
        this.$$api_user_countrys({
           data     : {},
           fn       : data => {
              this.countrysArry = data
           },
           errFn    : (err) => {
           }
        })
      },
      countrys:function(){
        this.$set(this.getArry,0,{})
        this.$set(this.getArry[0],'values',this.countrysArry)
        // console.log(this.getArry,1111)
        this.pickerConfig={//选择框配置
          state:0,//选中状态 0.国家 1.城市 2.货币
          dataBox : this.getArry,//数据
          selectBox:[],//选中状态
          title:this.lang.country,//标题
          name:'name'//选中的key
        }
        this.pickerBoo=true;
      },
      city:function(){
        if(this.shopinfo.country){
          Indicator.open(this.lang.loading);
          let key ={
            country_id : this.shopinfo.country
          }
          this.$$api_user_citys({
             data     : key,
             fn       : data => {
                Indicator.close()
                this.$set(this.getArry[0],'values',[])
                data.forEach((item)=>{
                  this.$set(item,'name',item.name_cn) 
                  this.getArry[0].values.push(item)
                })
                this.pickerConfig={//选择框配置
                  state:1,//选中状态 0.国家 1.城市 2.货币
                  dataBox : this.getArry,//数据
                  selectBox:[],//选中状态
                  title:this.lang.city,//标题
                  name:'name'//选中的key
                }
                this.pickerBoo=true;
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        }else{
          this.$message.error(this.lang.firstCountry+'!')
        }
      },
      unit:function(){
        this.$set(this.getArry,0,{})
        this.$set(this.getArry[0],'values',this.countrysArry)
        this.pickerConfig={//选择框配置
          state:2,//选中状态 0.国家 1.城市 2.货币
          dataBox : this.getArry,//数据
          selectBox:[],//选中状态
          title:this.lang.unit,//标题
          name:'currency'//选中的key
        }
        this.pickerBoo=true;
      },
      //组件返回数据
      selectPicker:function(data,state){
        if(data[0]!=undefined){
          switch(state){
            case 0:
            this.shopinfo = Object.assign({}, this.shopinfo, {
                country: data[0].id,
                currency: data[0].id,
                country_name: data[0].name,
                currency_name:data[0].currency,
            })
            break;
            case 1:
            this.shopinfo = Object.assign({}, this.shopinfo, {
                city: data[0].id,
                city_name: data[0].name,
            })
         
            break;
            case 2:
            this.shopinfo = Object.assign({}, this.shopinfo, {
                currency: data[0].id,
                currency_name:data[0].currency,
            })
            break;
          }
        }
        this.pickerBoo=false
        // this.$forceUpdate()
      },
      submint:function(ref){//表单提交
        this.$refs[ref].validate((valid) => {
          if (valid) {
            this.loading=true
            this.$$api_user_edit_shop({
               data     : this[ref],
               fn       : data => {
                  this.$$api_user_shop({
                     data     : {},
                     fn       : data => {
                        this.$set(data,'shopName',this.shopName)
                        this.$store.dispatch('update_userinfo', {
                            userinfo: {
                                token: this.shopinfoVuex.token,
                                state:2,
                                shopinfo:data,
                                userinfo:this.shopinfoVuex.userinfo
                            }
                        }).then(()=>{
                            this.loading=false;
                            this.$message.success(this.lang.subSuccess+'!')
                            this.$router.push('/home')
                        })
                     },
                     errFn    : (err) => {
                        this.loading=false
                        this.$message.error(err.msg)
                     }
                  })
               },
               errFn    : (err) => {
                  this.loading=false
                  this.$message.error(err.msg)
               }
            })
          }
        })
      },
      handleAvatarSuccess(res, file) {//头像上传
        this.shopinfo.avatar =  'http://img.quitang.com/' + res.data.img;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 2048 / 2048 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      closePicker:function(){//关闭图片
        this.pickerBoo=false
      }
      
  },
  components: {
    'v-header' : header,
    'v-picker' : picker
  }
}