
import menu from '../../../components/menu/menu'
export default {
    name: 'adv-edit-article',
    created() {
        if(this.$store.state.user.userinfo.state!=2){
           this.$router.push('/login')
           return false
        }
        this.getData()
        this.pushBox()
    },
    data() {
        return {
            vuexData: this.$store.state.user.userinfo,
            tabData:{
                income:0,
                unconsumed:0,
                consumed:0,
                expired:0
            },
        }
    },
    methods: {
        getData:function(){
            this.$$api_user_ordersIndex({
               data     : {},
               fn       : data => {
                    this.tabData = data
               },
               errFn    : (err) => {
                    this.$message.error(err.msg);
               }
            })
        },
        pushBox:function(){
            if(window.api){
                var push = api.require('push');
                var that = this;
                push.bind({
                    userName:that.$store.state.user.userinfo.userinfo.realname || that.$store.state.user.userinfo.userinfo.email,
                    userId:that.$store.state.user.userinfo.userinfo.id
                },function(ret,err){
                    if(ret.status){
                        api.alert({msg:'绑定成功'});
                    }else{
                        api.alert({msg:err.msg});
                    }
                });
            }
        },
        toDetail:function(id){
            this.$router.push(`/order/detail?id=${id}`)
        },
        sweep(){
            // if(window.vagent){
                // window.vagent.scanQR()
                alert('点击成功！')
                if(window.api){
                    alert('判断成功！')
                    var FNScanner = api.require('FNScanner');
                    FNScanner.openScanner({
                        autorotation: true
                    }, function(ret, err) {
                        if (ret) {
                            alert('11111'+JSON.stringify(ret));
                        } else {
                            alert('22222'+JSON.stringify(err));
                        }
                    });
                }
            // }
        }
    },
    components: {
        'v-menu' : menu,
    },
}