<template>
    <div class="form">
        <v-header :headerConfig="headerConfig"></v-header>
        <div class="container ">
            <div @click="toDetail(item)" v-for="(item,index) in dataBox" :key="index">
              <mt-cell :title="item.realname" :label="item.roleName" class="item mt10 shopAssistant" is-link>
                  {{item.email}}
              </mt-cell>
            </div>
            <div class="noContent" v-if="dataBox.length==0">
              暂无内容
            </div>
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
        this.getData()
      },
      data(){
        return{
            headerConfig:{
              leftBtnUrl:'/user',
              title:this.lang.shopAssistant,
              rightShow:true,
              rightBtnUrl:'/user/assistantDetail',
              rightBtn:this.lang.addTo,
            },
            dataBox:[]
        }
      },
      methods: {
        getData:function(){
          Indicator.open('加载中...');
          this.$$api_user_userUsers({
             data     : {},
             fn       : data => {
                Indicator.close();
                this.dataBox= data
                this.dataBox.forEach((item)=>{
                  let name = ''
                  switch(parseInt(item.role)){
                    case 1:
                    name=this.lang.adminSupper
                    break;
                    case 2:
                    name=this.lang.admin
                    break;
                    case 3:
                    name=this.lang.adminWealth
                    break;
                    case 4:
                    name=this.lang.adminReception
                    break;
                  }
                  this.$set(item,'roleName',name)
                })
             },
             errFn    : (err) => {
                Indicator.close();
                this.$message.error(err.msg)
             }
          })
        },
        toDetail:function(item){
          this.$router.push({path:'/user/assistantDetail',query:item})
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
<style  lang="scss">
   .mint-cell-label{color: #999;}
   .shopAssistant .mint-cell-wrapper{padding: 10px;}
</style>
