<template>
    <form>
        <inputbox value="Dashboard Password" v-model="password" required hidden></inputbox>
        <button type="submit" v-on:click.prevent="submit">Login</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            password: ""
        }
    },
    mounted() {
        
    },
    methods: {
        async submit() {
            let response = await $fetch('/api/dashboard/auth', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa("admin:" + this.password)
                }
            })
            console.log(response)
            if (response) {
                
                let auth = useCookie('auth');
                auth.value = btoa("admin:" + this.password);
                this.$router.push('/dashboard');
            }
        }
    }
}
</script>