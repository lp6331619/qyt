<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'home',
        components:{
        }
    }
</script>
<style scoped lang='less'>
    .content{
        margin-top: 60px;
        /*background: #f1f2f7;*/
        background: #FFF;
        padding: 16px;
    }
    .right-content{
        margin-bottom: 60px;
    }
</style>
