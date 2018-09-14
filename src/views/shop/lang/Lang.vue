<template>
    <div class="lang">
      <v-header :headerConfig="headerConfig"></v-header>
      <div class="container">
        <p @click="toLang(0)"><mt-cell :title="lang.zh" is-link></mt-cell></p>
        <p @click="toLang(1)"><mt-cell :title="lang.en" is-link></mt-cell></p>
      </div>
    </div>
</template>
<script>
    import header from '../../../components/header/header'
    export default {
      name: 'lang',
      methods :{
        
      },
      created() {

      },
      data(){
        return{
            headerConfig:{
              leftBtnUrl:'/home',
              title:this.$store.state.commondata.lang[25],
              rightShow:false,
            },
        }
      },
      methods: {
          toLang:function(state){
            let zh = this.$store.state.commondata.zh
            let en = this.$store.state.commondata.en
            switch(state){//语言切换
                case 0:
                    this.$store.dispatch('get_lang',{
                        lang:zh
                    })
                break;

                case 1:
                    this.$store.dispatch('get_lang',{
                        lang:en
                    })
                break;
            }
            this.$router.push('/home');
            // window.location.reload();
            this.$router.go(0)
          }
      },
      components: {
        'v-header' : header,
      }
    }
    </script>
</script>
<style scoped>
    
</style>
