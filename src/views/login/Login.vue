<template>
    <div class="login">
        <mt-header fixed :title="headerConfig.title" v-if="headStatus">
            <!-- <router-link to="/" slot="left">
                <mt-button icon="back">{{lang.back}}</mt-button>
            </router-link> -->
            <router-link  to="#" slot="right" v-if="headerConfig.rightShow">
                <mt-button  @click="stateLogin()">{{headerConfig.rightBtn}}</mt-button>
            </router-link>
            <span class="pull-right"></span>
        </mt-header>
        <div class="container">
            <el-form 
                    class="formeBox" 
                    v-if="loginState==1"
                    label-position="left" 
                    label-width="105px"
                    v-loading="loading"
                    :element-loading-text="`${lang.loading}${lang.login}`"
                    :model='loginData'
                    :rules="rule_data"
                    ref='loginData'>
                <el-form-item
                        :label="lang.email"
                        prop='username'>
                    <el-input 
                            type="text" 
                            :placeholder="`${lang.pleaseInput}${lang.email}`"
                            v-model='loginData.username'></el-input>
                </el-form-item>
                <el-form-item
                        :label="lang.password"
                        prop='password'>
                    <el-input 
                            type="password" 
                            :placeholder="`${lang.pleaseInput}${lang.password}`"
                            @keyup.native.enter="onLogin('loginData')"
                            v-model='loginData.password'></el-input>
                </el-form-item>
                <el-form-item class="mt10 btnBox">
                    <el-button type="danger" @click="onLogin('loginData')">{{lang.login}}</el-button>
                </el-form-item>
            </el-form>

            <el-form 
                    class="formeBox" 
                    v-if="loginState==2"
                    label-position="left" 
                    label-width="105px"
                    v-loading="loading"
                    :element-loading-text="`${lang.loading}${lang.regist}`"
                    :model='registData'
                    :rules="rule_dataR"
                    ref='registData'>
                <el-form-item
                        :label="lang.email"
                        prop='username'>
                    <el-input 
                            type="text" 
                            :placeholder="`${lang.pleaseInput}${lang.email}`"
                            v-model='registData.username'></el-input>
                </el-form-item>
                <el-form-item
                        :label="`${lang.pleaseInput}${lang.password}`"
                        prop='password'>
                    <el-input 
                            type="password" 
                            :placeholder="`${lang.pleaseInput}${lang.password}`"
                            @keyup.native.enter="onRegist('registData')"
                            v-model='registData.password'></el-input>
                </el-form-item>
                <el-form-item
                        :label="`${lang.confirm}${lang.password}`"
                        prop='password_confirm'>
                    <el-input 
                            type="password" 
                            auto-complete="off" 
                            :placeholder="`${lang.confirm}${lang.password}`"
                            @keyup.native.enter="onRegist('registData')"
                            v-model='registData.password_confirm'></el-input>
                </el-form-item>
                <el-form-item class="mt10 btnBox">
                    <el-button type="danger" @click="onRegist('registData')">{{lang.regist}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
	import LoginJs from './Login.js';
	export default LoginJs;
</script>

<style scoped lang='less'>
    @import url(Login.less);
    .login{transform: translateZ(0);}
</style>
