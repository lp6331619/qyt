<template>
    <div class="">
        <transition name="fade">
        123123
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'content',
        data () {
            return {
                
            }
        },
        methods:{
            
        },
        created(){
            
        },
        mounted(){

        }
    }
</script>

<style scoped lang='less'>
    .fade-enter-active,
    .fade-leave-active {
        
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
        position: absolute;
    }
</style>
