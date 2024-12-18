<template>
    <main>
        <div class="inner">
            <div class="login-title">
                <h2>함께 성장하는 어깨동무!</h2>
            </div>
            <div class="login-field">
                <form @submit.prevent="loginForm">
                    <input type="hidden" name="redirect">

                    <div class="field-wrap">
                        <BaseInput 
                            type="text"
                            id="email"
                            name="email"
                            label="이메일"
                            :tabindex="1"
                            placeholder="이메일을 입력해주세요."
                            v-model="data.email"
                            :errorMessage="errors.email"
                        />
                    </div>
                    <div class="field-wrap">
                        <BaseInput 
                            type="password"
                            id="password"
                            name="password"
                            label="비밀번호"
                            :tabindex="2"
                            placeholder="비밀번호를 입력해주세요."
                            v-model="data.password"
                            :errorMessage="errors.password"
                        />
                    </div>
                    <div class="field-action d-grid gap-2">
                        <button type="submit" class="btn btn-main">로그인</button>
                    </div>
                </form>
            </div>
            <div class="login-other">
                <div class="other-join">
                    <span>아직 회원이 아니신가요?</span>
                    <router-link to="/auth/register">회원가입</router-link>
                </div>
                <div class="other-sns">
                    <div class="sns-kakao">
                        <a href="">
                            <img src="../assets/image/kakao.png" alt="">
                        </a>
                    </div>
                    <div class="sns-google">
                        <a href="">
                            <img src="../assets/image/google.png" alt="">
                        </a>
                    </div>
                    <div class="sns-naver">
                        <a href="">
                            <img src="../assets/image/naver.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import { reactive } from 'vue';
    import BaseInput from './BaseInput.vue';
    import axios from 'axios';
    import store from '@/store/store';
import router from '@/router';

    export default {
        name: "Login",
        components: {
            BaseInput
        },
        setup() {
            const data = reactive({
                email: "",
                password: "",
            });

            const errors = reactive({
                email: "",
                password: ""
            });

            const loginForm = () => {
                // Init
                let formData = new FormData();
                clearError();

                // Check
                if( !data.email ) {
                    errors.email = "이메일을 입력해주세요.";
                    return false;
                } else if( !data.password ) {
                    errors.password = "비밀번호를 입력해주세요.";
                    return false;
                }

                // Data
                formData.append("email", data.email);
                formData.append("password", data.password);

                // Result
                // this.store.dispatch('login', formData);
                axios.post("/api/auth/login", formData)
                    .then(( res ) => {
                        const token = res.headers.authorization.split(" ")[1];
                        store.commit('setToken', token);

                        router.push({path: "/"});
                    })
                    .catch(error => {
                        if( error.response.status == 400 ) {
                            errors[error.response.data.target] = error.response.data.message;
                        }
                    });
                
            };

            const clearError = field => {
                if( !field ) {
                    Object.keys(errors).forEach(key => errors[key] = '');
                } else {
                    errors[field] = '';
                }
            };

            return { data, errors, loginForm }
        }
    }
</script>

<style scoped>
    .inner { width: 500px; margin: 0 auto; padding-top: 100px; }

    .login-title { text-align: center; }
    .login-title h2 { font-size: 26px; font-weight: 700; color: #fff; }

    .login-field { margin-top: 50px; }
    .login-field .field-wrap { margin-bottom: 30px; }
    .login-field .field-action button { height: 50px; }

    .login-other { margin-top: 30px; }
    .login-other .other-join { text-align: center; font-size: 16px; }
    .login-other .other-join a { margin-left: 10px; font-size: 16px; color: #6366f1; }
    .login-other .other-join a:hover { color: #6976f7; }

    .login-other .other-sns { display: flex; justify-content: center; margin-top: 30px; }
    .login-other .other-sns div { width: 50px; height: 50px; border-radius: 5px; margin: 0 10px; overflow: hidden; }
    .login-other .other-sns a { display: block; width: 100%; height: 100%;}
    .login-other .other-sns a img { width: 100%; height: auto; }
</style>