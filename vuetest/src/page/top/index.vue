<template>
    <div style="background-color: #3e3e3e;font-size: 14px;">
      <div style="width: 60%;height: 40px;margin: 0 auto;display: flex;">
        <div style="display: flex;flex: 1;">
          <div class="active">小米商城</div>
          <div class="active">MUI</div>
          <div class="active">LOT</div>
          <div class="active">云服务</div>
          <div class="active">金融</div>
          <div class="active">有品</div>
          <div class="active">小爱开发平台</div>
          <div class="active">政企服务</div>
          <div class="active">下载app</div>
          <div class="active">Select Region</div>
        </div>
        <div style="width: 258px;text-align: right;display: flex;">
          <div class="active" @click="loginModal">登录</div>
          <div class="active">注册</div>
          <div class="active">消息通知</div>
          <div class="shop-car">购物车（0）</div>
        </div>
      </div>
   
      <!-- 登录弹窗 -->
      <el-dialog
        title="User Login"
        :visible.sync="box"
        width="400px"
        center>
        <div>
          <el-form class="login-form"
                   status-icon
                   :rules="loginRules"
                   ref="loginForm"
                   :model="loginForm"
                   label-width="0">
            <el-form-item prop="username">
              <el-input size="small"
                        @blur="handleLogin"
                        v-model="loginForm.username"
                        auto-complete="off"
                        placeholder="用户名">
                <i slot="prefix" class="el-icon-user el-icon--right"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input size="small"
                        @blur="handleLogin"
                        :type="passwordType"
                        v-model="loginForm.password"
                        auto-complete="off"
                        placeholder="密码">
                <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"/>
                <i slot="prefix" class="el-icon-lock el-icon--right"/>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-row :span="24">
                <el-col :span="12">
                  <el-checkbox v-model="loginForm.autoLogin">下次自动登录</el-checkbox>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                  <el-button type="primary"
                             style="width: 100px;"
                             @click.native.prevent="handleLogin"
                             class="login-submit">
                             登录
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
   
          </el-form>
        </div>
      </el-dialog>
   
    </div>
  </template>
   
  <script>
    export default {
        data() {
          return {
             activeIndex: '1',
            activeIndex2: '1',
            box: false,
            loginForm: {
              username: "",
              //密码
              password: "",
              autoLogin: false
            },
            loginRules: {
              username: [
                {required: true, message: "请输入用户名", trigger: "blur"}
              ],
              password: [
                {required: true, message: "请输入密码", trigger: "blur"},
                {min: 1, message: "密码长度最少为6位", trigger: "blur"}
              ]
            },
            passwordType: "password"
          };
        },
        mounted() {
        },
        methods: {
           homePage(){
             this.$router.push({path: '/home/index'});
           },
           handleSelect(key, keyPath) {
             console.log(key);
             if(key == '1'){
               this.$router.push({path: '/home/index'});
             }else{
               this.$router.push({path: '/test/index'});
             }
   
          },
          loginModal(){
            this.box = true;
          },
          showPassword() {
            this.passwordType === ""
              ? (this.passwordType = "password")
              : (this.passwordType = "");
          },
          handleLogin() {//登录
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                const loading = this.$loading({
                  lock: true,
                  text: '登录中,请稍后。。。',
                  spinner: "el-icon-loading"
                });
                setTimeout(function(){
                  loading.close();
                },1000)
   
              }
            });
          },
        }
      };
  </script>
   
  <style>
    .active{
      line-height: 40px;
      color: #cfcfcf;
      margin-right: 20px;
      font-size: 12px;
    }
    .active:hover{
      cursor: pointer;
      color: #FFFFFF;
    }
    .shop-car{
      text-align: center;
      cursor: pointer;
      width: 100px;
      line-height: 40px;
      height: 40px;
      display: inline-block;
      background-color: #8f8f8f;
    }
    .shop-car:hover{
      background-color: #00FFFF;
    }
  </style>