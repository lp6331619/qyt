<template>
    <menu class="bar bar-tab">
        <router-link to="/home" class="tab-item" :class="{'active' : state == `/home`}"> 
            <i class="iconfont icon-shop"></i>
            <span class="tab-label">{{lang.shop}}</span>
        </router-link>
        <router-link to="/order" class="tab-item" :class="{'active' : state == `/order`}"> 
            <i class="iconfont icon-order"></i>
            <span class="tab-label">{{lang.order}}</span>
        </router-link>
        <router-link to="/product" class="tab-item" :class="{'active' : state == `/product`}"> 
            <i class="iconfont icon-product"></i>
            <span class="tab-label">{{lang.commodity}}</span>
        </router-link>
        <router-link to="/user" class="tab-item" :class="{'active' : state == `/user`}"> 
            <i class="iconfont icon-usercenter"></i>
            <span class="tab-label">{{lang.user}}</span>
        </router-link>
    </menu>
</template> 

<script>
export default {
  name: 'menu',
  created(){

  },
  data () {
    return {
        state : this.$router.history.current.path
    }
  },
  methods: {
    
  },
  components: {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
    
</style>
