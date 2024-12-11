<template>
    <main>
        <div class="inner">
            <div class="register-title">
                <h2>회원가입</h2>
                <p>회원이 되어 다양한 프로젝트에 참여해보세요!</p>
            </div>
            <div class="register-field">
                <form @submit.prevent="registerForm">
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
                    <div class="field-wrap">
                        <BaseInput 
                            type="password"
                            id="passwordChk"
                            name="passwordChk"
                            label="비밀번호 확인"
                            :tabindex="3"
                            placeholder="비밀번호를 입력해주세요."
                            v-model="data.passwordChk"
                            :errorMessage="errors.passwordChk"
                        />
                    </div>
                    <div class="field-wrap">
                        <BaseInput 
                            type="text"
                            id="nickname"
                            name="nickname"
                            label="닉네임"
                            :tabindex="4"
                            placeholder="닉네임을 입력해주세요."
                            v-model="data.nickname"
                            :errorMessage="errors.nickname"
                        />
                    </div>

                    <div class="field-action d-grid gap-2">
                        <button type="submit" class="btn btn-main">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
    import { reactive, watch } from 'vue';
    import BaseInput from './BaseInput.vue';
    import { isEmailDuplicate, isEmailValid, isPasswordValid } from '../services/authFormUtils.js';
    import router from '@/router';
    import axios from 'axios';

    export default {
        name: "Register",
        components: {
            BaseInput
        },
        setup() {
            const data = reactive({
                email: "",
                password: "",
                passwordChk: "",
                nickname: "",
            })

            const errors = reactive({
                email: "",
                password: "",
                passwordChk: "",
                nickname: "",
            });

            const registerForm = () => {
                // Init
                let formData = new FormData();
                clearError();

                // Check
                if( !data.email ) {
                    errors.email = "이메일을 입력해주세요.";
                    return false;
                } else if( !isEmailValid(data.email) ) {
                    errors.email = "유효하지 않은 이메일 형식입니다.";
                    return false;
                } else if( !data.password ) {
                    errors.password = "비밀번호를 입력해주세요.";
                    return false;
                } else if( !isPasswordValid(data.password) ) {
                    errors.password = "8자 이상 영문,숫자,특수문자를 포함한 비밀번호를 입력해주세요.";
                    return false;
                } else if( data.password!==data.passwordChk ) {
                    errors.passwordChk = "비밀번호가 일치하지 않습니다.";
                    return false;
                } else if( !data.nickname ) {
                    errors.nickname = "닉네임을 입력해주세요.";
                    return false;
                }

                // Data
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("nickname", data.nickname);

                // Result
                axios.post("/api/auth/register", formData).then(() => {
                    alert("회원가입이 완료되었습니다.");
                    router.push({path: "/auth/login"});
                }).catch(error => {
                    if( error.response.status == 400 ) {
                        error.response.data.forEach(obj => errors[obj.field] = obj.defaultMessage);
                    } else if ( error.response.status==404 || error.response.status==409 ){
                        errors.email = error.response.data;
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

            // 이메일 입력시
            watch(()=>data.email, async value => {
                if( !value ) {
                    errors.email = "이메일을 입력해주세요."
                } else {
                    if( !isEmailValid(value) ) {
                        errors.email = "이메일 형식을 확인해주세요.";
                    } else {
                        const duplicate = await isEmailDuplicate(value);
                        if( duplicate )     errors.email = duplicate;
                        else                errors.email = '';
                    }
                }
            });

            // 비밀번호 입력시
            watch(()=>data.password, value => {
                if( !value ) {
                    errors.password = "비밀번호를 입력해주세요.";
                } else {
                    if( !isPasswordValid(value) ) {
                        errors.password = "8자 이상 영문,숫자,특수문자를 포함한 비밀번호를 입력해주세요.";
                    } else {
                        clearError("password");
                    }
                }
            });

            // 비밀번호 확인 입력시
            watch(()=>data.passwordChk, value => {
                if( data.password!==value ) {
                    errors.passwordChk = "비밀번호가 일치하지 않습니다.";
                } else {
                    clearError("passwordChk");
                }
            });

            return { data, errors, registerForm }
        }
    }
</script>

<style scoped>
    .inner { width: 500px; margin: 0 auto; padding-top: 100px; }

    .register-title { text-align: center; }
    .register-title h2 { font-size: 24px; font-weight: 600; }
    .register-title p { margin-top: 10px; font-size: 14px; color: #aaa; }

    .register-field { margin-top: 50px; }
    .register-field .field-wrap { margin-top: 20px; }

    .register-field .field-action { margin-top: 50px; }
    .register-field .field-action button { height: 50px; }
</style>