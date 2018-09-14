/**
 * Created by sailengsi on 2017/5/11.
 */
import header from '../../components/header/header'
export default {
	name   : 'login',
	created() {
		if(this.$store.state.user.userinfo.state && this.$store.state.user.userinfo.state==2){
			this.$router.push('/home');//登录状态
		}
	},
	data() {
		return {
			headerConfig:{
				title:this.lang.regist,
				rightShow:true,
				rightBtnUrl:'/login',
				rightBtn:this.lang.login,
			},
            loginState:1,
			loading:false,
			autofocus:true,
			registData:{
			  username:'',//3848488@qq.com
			  password:'',//123123
			  password_confirm:'',
			},
			rule_data: {
				username : [{
					required: true,
                    pattern : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message : this.lang.emailError,
                    trigger : 'blur'
                }],
				password  : [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error(this.lang.passwordError));
						} else {
							if (!(/^.{6,6}$/.test(value))) {
								callback(new Error(this.lang.passwordBits));
							} else {
								if (this.register === true) {
									if (this.registData.password_confirm !== '') {
										this.$refs.registData.validateField('password_confirm');
									}
								}
								callback();
							}
						}
					},
					trigger  : 'blur'
				}],
				password_confirm: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error(this.lang.passwordAga));
						} else if (value !== this.registData.password) {
							callback(new Error(this.lang.passwordNo+'!'));
						} else {
							callback();
						}
					},
					trigger  : 'blur'
				}]
			}
		}
	},
	methods: {
		onRegist:function(ref){
			this.$refs[ref].validate((valid) => {
			    if (valid) {
			    	this.loading=true;
			    	this.$$api_user_register({
                         data     : this[ref],
                         fn       : data => {
                         	var token = data.token
                         	this.loading=false;
                         	this.$message.success(this.lang.registSuccess+'!')
                         	this.$store.dispatch('update_userinfo', {
                         	    userinfo: {
                         	        token: token,
                         	        state:2,
                         	    }
                         	}).then(()=>{
     					    	this.$$api_user_shop({
                                     data     : {},
                                     fn       : data => {
                                        var shopinfo = data
                                        this.$$api_user_user({
                                             data     : {},
                                             fn       : data => {
                                                this.$store.dispatch('update_userinfo', {
                                                    userinfo: {
                                                        token: token,
                                                        state:2,
                                                        shopinfo:shopinfo,
                                                        userinfo:data
                                                    }
                                                }).then(()=>{
                                                    this.$router.push('/user/shopinfo')
                                                })
                                             },
                                             errFn    : (err) => {
                                                 this.loading=false;
                                                 this.$message.error(err.msg)
                                             }
                                        })
                                     },
                                     errFn    : (err) => {
                                         this.loading=false;
                                         this.$message.error(err.msg)
                                     }
                                })
                         	})
                         },
                         errFn    : (err) => {
                             this.loading=false;
                             this.$message.error(err.msg)
                         }
                    })
			    }
			})
		}
	},
	mounted() {
		
	},
	components: {
	    'v-header' : header,
	}
}
