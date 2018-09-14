<template>
    <mt-header fixed :title="headerConfig.title" v-if="headStatus">
        <router-link :to="headerConfig.leftBtnUrl" slot="left">
            <mt-button icon="back">{{lang.back}}</mt-button>
        </router-link>
        <router-link :to="headerConfig.rightBtnUrl" slot="right" v-if="headerConfig.rightShow">
            <mt-button >{{headerConfig.rightBtn}}</mt-button>
        </router-link>
    </mt-header>
</template> 
<script>
export default {
  name: 'hello',
  props: {
    headerConfig:{
      leftBtnUrl:String,
      title:String,
      rightShow:Boolean,
      rightBtnUrl:String,
      rightBtn:String,
    }
  },
  created(){

  },
  methods:{
  },
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
    
</style>
