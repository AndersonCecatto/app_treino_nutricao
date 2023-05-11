<template>
    <v-app>
        <v-main class="background">
            <login-component/>
        </v-main>
    </v-app>
</template>

<script>

import LoginComponent from '@/components/Telas/LoginComponent.vue'

export default {
  components: { LoginComponent },
    name: "LoginView"
}
</script>

<style>
    .background {
        background-color: #0D47A1;
    }
</style>