import header from '../../../components/header/header'
import { Indicator,MessageBox } from 'mint-ui';
import picker from '../../../components/picker/picker'
import calendar from '../../../components/calendar.vue'
export default {
  name: 'home',
  methods :{
    
  },
  created() {
    if(this.$route.query.id){
      this.getData(1)
    }else{
      this.stateEdit=true;
      this.headerConfig.rightBtn=this.lang.save
    }
    this.getCategorys()

  },
  data(){
    return{
        loading:false,
        dateBox:'',
        vuexData: this.$store.state.user.userinfo,
        headerConfig:{
          title:this.lang.user + this.lang.commodity,
          rightBtn:this.lang.edit,
          rightShow:true,
        },
        dataBox:{},
        rule_data: {
          name : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
          sub_type : [{
              required: true,
              message : this.lang.NoneNull,
          }],
          price : [{
              required: true,
              message : this.lang.NoneNull,
          },{
              pattern: /^[0-9]*$/,
              message : this.lang.onlyNum,
          }],
          ticket_type : [{
              required: true,
              message : this.lang.NoneNull,
          }],
          departure : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
          arrival : [{
              required: true,
              message : this.lang.NoneNull,
              trigger : 'blur'
          }],
        },
        stateEdit :false,
        categorys:[],
        categoryBoo:false,
        pickerConfig:{//选择框配置
          state:0,//选中状态 0.国家 1.城市 2.货币
          dataBox:[],//数据
          selectBox:[],//选中状态
          title:'',//标题
          name:'name'//选中的key
        },
        pickerBoo:false,
        // 多选
        calendar5:{
            display:"",
            multi:true,
            show:false,
            zero:true,
            value:[], //默认日期
            // disabled:[[2017,12,24],[2017,12,25]], //默认日期
            lunar:true, //显示农历
            select:(value)=>{
                let displayValue=[]
                value.forEach(v=>{
                    displayValue.push(v[0]+"."+(v[1])+"."+v[2])
                })
                this.calendar5.display=displayValue.join(",");
                this.calendar5.value=value;
            },
        },
    }
  },
  methods: {
  	format(str){
        return str.split(',').map((item)=>{
            return item.split('.').join(',')
        })
    },
    //获取列表数据
    getData:function(num){
      Indicator.open(this.lang.loading);
      this.$$api_user_goodsDetail({
         data     : this.$route.query,
         fn       : data => {
            Indicator.close();
            this.dataBox = data
            //把返回的字符串处理成数组 供日期组件显示
            if(this.dataBox.holidays){
              // let holidaysArry = this.dataBox.holidays.split(",")
              // let holidaysString = holidaysArry[0] + holidaysArry[3]
              // let holidayData = []
              // holidayData.push(this.getDate(holidaysArry[0].replace(/\./g,"-")))
              // holidayData.push(this.getDate(holidaysArry[holidaysArry.length-2].replace(/\./g,"-")))
              // this.$set(this.dataBox,'holidays2',holidayData)
              let num =  this.dataBox.holidays.length-1
              if(this.dataBox.holidays[num]==','){
              	this.calendar5.display = this.dataBox.holidays.substring(0, num); 
              }else{
              	this.calendar5.display = this.dataBox.holidays
              }
              this.calendar5.display.split(",").map((item)=>{
              	let arryBox = item.split('.').join(',')
              	let numm = this.format(arryBox)
              	let numArray = numm.map((value)=>{
  	                return  parseInt(value);
  	            }) 
              	this.calendar5.value.push(numArray)
              })
            }
            if(this.dataBox.price){
              this.dataBox.price = this.dataBox.price/100
            }
            if(this.dataBox.children_price){
              this.dataBox.children_price = this.dataBox.children_price/100
            }
            if(this.dataBox.holiday_price){
              this.dataBox.holiday_price = this.dataBox.holiday_price/100
            }
            if(this.dataBox.ticket_type){
              let ticket_type_name = ''
              switch(parseInt(this.dataBox.ticket_type)){
                case 1:
                ticket_type_name=this.lang.electronicTicket
                break;
                case 2:
                ticket_type_name=this.lang.electronicCode
                break;
                case 3:
                ticket_type_name=this.lang.code
                break;
              }
              this.$set(this.dataBox,'ticket_type_name',ticket_type_name)
              this.$set(this.dataBox,'logistics_type_name',this.dataBox.logistics_type==1 ? this.lang.Express : this.lang.Bringing)
            }
            this.$set(this.dataBox,'type_name',`${this.categorys[this.dataBox.type].title} > ${this.categorys[this.dataBox.type].sub[this.dataBox.sub_type]}`)
            this.$set(this.dataBox,'child','0')
         },
         errFn    : (err) => {
            Indicator.close();
            this.$message.error(err.msg)
         }
      })
    },
    getCategorys : function(){
      this.$$api_user_categorys({//获取分类
         data     : {},
         fn       : data => {
            this.categorys=data
            // this.categorys.unshift({id:0,title:this.lang.allOrder})
            this.categorys.forEach((item)=>{
              this.$set(item,'status',false)
              if(item.id==1){
                this.$set(item,'status',true)
              }
            })
         },
         errFn    : (err) => {
            this.$message.error(err.msg)
         }
      })
    },
    //打开分类
    categorysFun:function(){
      this.categoryBoo=true;
    },
    //选择分类
    setType:function(id){
      this.categorys.forEach((item)=>{
        item.status=false
        if(item.id == id){
          item.status=true
        }
      })
    },
    setSubType:function(item,index){
      this.dataBox = Object.assign({}, this.dataBox, {
          type: item.id,
          sub_type: index,
          type_name : `${item.title}>${item.sub[index]} `,
          child:index
      })
      this.categoryBoo=false;
    },
    //取货方式
    logistics:function(){
      this.pickerConfig={//选择框配置
        state:0,//选中状态 0.取货方式 1.验证方式
        dataBox:[{
          values:[{
            name:this.lang.Express,
            id:1,
          },{
            name:this.lang.Bringing,
            id:2,
          }]
        }],
        selectBox:[],//选中状态
        title:this.lang.role,//标题
        name:'name'//选中的key
      }
      this.pickerBoo=true;
    },
    Verification:function(){
      this.pickerConfig={//选择框配置
        state:1,//选中状态 0.取货方式 1.验证方式
        dataBox:[{
          values:[{
            name:this.lang.electronicCode,
            id:2,
          },{
            name:this.lang.code,
            id:3,
          }]
        }],
        selectBox:[],//选中状态
        title:this.lang.role,//标题
        name:'name'//选中的key
      }
      this.pickerBoo=true;
    },
    
    //回填方法
    selectPicker:function(data,state){
      switch(parseInt(state)){
        case 0:
          this.dataBox = Object.assign({}, this.dataBox, {
              logistics_type_name: data[0].name,
              logistics_type: data[0].id,
          })
        break;
        case 1:
          this.dataBox = Object.assign({}, this.dataBox, {
              ticket_type_name: data[0].name,
              ticket_type: data[0].id,
          })
      }
      this.pickerBoo=false;
    },
    closePicker:function(){
      this.pickerBoo=false;
    },
    getDate:function(datestr){  
      let temp = datestr.split("-");  
      let date = new Date(temp[0],temp[1]-1,temp[2]);  
      return date;  
    },
    getTime:function(time){
      let date = time.split("~");
      let i=0; 
      let start = date[0];  
      let end = date[1];  
      let startTime = this.getDate(start);  
      let endTime = this.getDate(end);  
      while((endTime.getTime()-startTime.getTime())>=0){  
        let year = startTime.getFullYear();  
        let month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();  
        let day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();  
        this.dateBox+=year+"."+month+"."+day+',';  
        startTime.setDate(startTime.getDate()+1);  
        i+=1;  
      }  
    },
    //编辑状态
    edit:function(ref){
      if(this.stateEdit!=false){
        //提交
        this.$refs[ref].validate((valid) => {
            if (valid) {
              this.dataBox.price = this.dataBox.price*100
              if(this.dataBox.holiday_price!=''){
                this.dataBox.holiday_price = this.dataBox.holiday_price*100
              }
              if(this.dataBox.children_price!=''){
                this.dataBox.children_price = this.dataBox.children_price*100
              }
              this.dataBox.holidays = this.calendar5.display;
              Indicator.open(`${this.lang.loading}...`);
              this.$$api_user_goodsEdit_goods({//获取分类
                 data     : this.dataBox,
                 fn       : data => {
                    Indicator.close();
                    this.stateEdit=false;
                    this.headerConfig.rightBtn=this.lang.edit
                    this.$message.success(this[ref].id ? this.lang.modifySuccess : this.lang.ApplicantsHaveApplied)
                    this.$router.push('/product')
                 },
                 errFn    : (err) => {
                    Indicator.close();
                    this.dataBox.price = this.dataBox.price/100
                    if(this.dataBox.children_price!=''){
                      this.dataBox.children_price = this.dataBox.children_price/100
                    }
                    if(this.dataBox.holiday_price!=''){
                      this.dataBox.holiday_price = this.dataBox.holiday_price/100
                    }
                    this.$message.error(err.msg)
                 }
              })
            }
        })
      }else{
        this.stateEdit=true;
        this.headerConfig.rightBtn=this.lang.save

      }
    },
    //日期选择打开
    openMultiByDrop(e){
        this.calendar5.show=true;
        e.stopPropagation();
        window.setTimeout(()=>{
            document.addEventListener("click",(e)=>{
                this.calendar5.show=false;
                document.removeEventListener("click",()=>{},false);
            },false);
        },1000)
    },
    //日期选择
    dataSub(){
    	this.calendar5.show = false
    },
    //下架
    drop(){
      MessageBox.confirm(`${this.lang.removeThisProduct}?`,`${this.lang.tips}`).then(action => {
        Indicator.open(this.lang.loading);
          this.$$api_user_goodsApply_offline({
             data     : {id:this.dataBox.id},
             fn       : data => {
                Indicator.close();
                this.$router.push('/product')
                this.$message.success(this.lang.subSuccess)
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
      });
    }
  },
  computed: {
    adultPrice:function(){
      if(this.dataBox.type == 2){
        return this.lang.peakDay
      }else if(this.dataBox.type == 6){
        return this.lang.adultPrice
      }else{
        return this.lang.productPrice
      }
    },
    childPrice:function(){
      if(this.dataBox.type == 2){
        return this.lang.holidayPrice
      }else if(this.dataBox.type == 6){
        return this.lang.childPrice
      }else{
        return this.lang.productPrice
      }
    },
  },
  watch:{
    categorys:{  
        handler:function(val,oldval){  
        },  
        deep:true//对象内部的属性监听，也叫深度监听  
    },  
  },
  components: {
      'v-header' : header,
      'v-picker' : picker,
     'v-calendar': calendar
  }
}