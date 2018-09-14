<template>
    <div class="regist" >
        <v-header :headerConfig="headerConfig"></v-header>
        <div class="container">
            <el-form 
                    class="formeBox" 
                    label-position="left" 
                    label-width="105px"
                    v-loading="loading"
                    :element-loading-text="`${lang.loading}${lang.regist}`"
                    :model='registData'
                    :rules="rule_data"
                    ref='registData'>
                <el-form-item
                        :label="lang.email"
                        prop='username'>
                    <el-input 
                            type="text" 
                            auto-complete="off" 
                            :autofocus="autofocus"
                            :placeholder="`${lang.pleaseInput}${lang.email}`"
                            ref="user_name_box"
                            v-model='registData.username'></el-input>
                </el-form-item>
                <el-form-item
                        :label="`${lang.pleaseInput}${lang.password}`"
                        prop='password'>
                    <el-input 
                            type="password" 
                            auto-complete="off" 
                            :placeholder="`${lang.pleaseInput}${lang.password}`"
                            ref="user_name_box"
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
                            ref="user_name_box"
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
    import RegistJs from './Regist.js';
    export default RegistJs;
</script>

<style scoped lang='less'>
    
</style>
