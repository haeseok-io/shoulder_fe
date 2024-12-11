<template>
    홈 페이지 입니다.

    <ul>
        <li v-for="(item, idx) in state.items" :key="idx">
            {{ item }}
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

    export default {
        name: "Home",
        setup() {
            const state = reactive({
                items: []
            })

            axios.get("/api/auth/test").then(({data}) => state.items = data);

            return { state }
        }
    }
</script>