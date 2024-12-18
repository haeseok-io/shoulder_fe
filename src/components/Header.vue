<template>
    <header class="header">
        <div class="header-inner">
            <div class="gnb-wrap">
                <h1 class="logo">
                    <router-link to="/">
                        <img src="../assets/image/logo.png" alt="">
                    </router-link>
                </h1>
                <nav class="gnb">
                    <ul class="gnb-list">
                        <li><router-link to="/moim">모임</router-link></li>
                        <li><router-link to="/user">팀원찾기</router-link></li>
                        <li><a href="">커뮤니티</a></li>
                    </ul>
                </nav>
                <div class="util">
                    <a href="" class="btn btn-primary" v-if="$store.state.token">
                        모임 등록하기
                    </a>
                    <div class="util-alram">
                        <div class="alram-toggle">
                            <i class="bi bi-bell-fill"></i>
                        </div>
                    </div>
                    <div class="util-user">
                        <div class="user-toggle">
                            <router-link to="/auth/login" v-if="!$store.state.token">
                                <i class="bi bi-person-fill"></i>
                            </router-link>
                            <router-link to="/mypage" v-else>
                                <i class="bi bi-person-fill"></i>
                            </router-link>
                            <button @click="logout">로그아웃</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import store from '@/store/store';

    export default {
        name: 'Header',
        setup() {
            const logout = () => {
                store.commit('setToken', null);
            }

            return { logout }
        }
    }
</script>

<style scoped>
    .header { display:flex; align-items: center; width: 100%; height: 100px; min-width: 1600px; }
    .header .header-inner { width: 1440px; margin: 0 auto; }

    .gnb-wrap { display: flex; justify-content: space-between; align-items: center; }

    .logo a { display: flex; }
    .logo a img { width: 150px; height: auto; }

    .gnb { display: flex; align-items: center; }
    .gnb .gnb-list { display: flex; padding: 0 20px; margin: 0; }
    .gnb .gnb-list li a { display: flex; padding: 0 30px; font-weight: 600; font-size: 18px; color: #eee; }

    .util { display: flex; align-items: center; }
    .util .util-alram { margin-left: 30px; }
    .util .util-alram .alram-toggle i { font-size: 24px; color: #aaa; }
    .util .util-user { margin-left: 20px; }
    .util .util-user .user-toggle i { font-size: 24px; color: #aaa; }
</style>