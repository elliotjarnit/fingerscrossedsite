<template>
    <div class="sidebar">
        <div class="sidebar-content-item" style="font-weight: 600; font-size: 1em;">
            FINGERS CROSSED
        </div>
        <div class="sidebar-content">
            <div :class="{ 'sidebar-content-item': true, 'active': active === 0 }">
                <span class="content-title" @click="navigateTo('/dashboard/')">
                    <span class="icon">
                        <user-icon />
                    </span>
                    <span class="text">
                        Home
                    </span>
                </span>
            </div>
            <div :class="{ 'sidebar-content-item': true, 'active': active === 1 }">
                <span class="content-title" @click="navigateTo('/dashboard/users')">
                    <span class="icon">
                        <user-icon />
                    </span>
                    <span class="text">
                        Users
                    </span>
                </span>
            </div>
            <div :class="{ 'sidebar-content-item': true, 'active': active === 2 }">
                <span class="content-title" @click="navigateTo('/dashboard/orders')">
                    <span class="icon">
                        <order-icon />
                    </span>
                    <span class="text">
                        Orders
                    </span>
                </span>
            </div>
            <div class="sidebar-content-item" @click="logout"
                style="position: absolute; bottom:0; padding-bottom: 1em; font-family:Verdana, Geneva, Tahoma, sans-serif">
                Logout
            </div>
        </div>
    </div>
    <div class="rest">
        <slot />
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    mounted() {
        let curroute = this.$route.name
        console.log(curroute)
        if (curroute == 'dashboard') {
            this.active = 0
        } else if (curroute == 'dashboard/users') {
            this.active = 1
        } else if (curroute == 'dashboard/orders') {
            this.active = 2
        }
    },
    methods: {
        logout() {
            let auth = useCookie('auth')
            auth.value = ''
            window.location.href = '/dashboard/login'
        }
    }
}
</script>

<style>
.sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 10%;
    background-color: #f8f9fa;
    z-index: 100;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding-top: 10em;
    padding-left: 1em;
}

.sidebar-content-item {
    padding: 1em;
    font-family: 'Roboto', sans-serif;
}

.sidebar-content-item:hover {
    cursor: pointer;
}

.active {
    border-left: 5px solid #007bff;
}

.icon,
.text {
    vertical-align: middle;
    display: inline-block;
    font-weight: 400;
}

.icon {
    position: relative;
    top: -2px;
}

.icon svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-block;
}

.text {
    margin-left: 0.4em;
}

.rest {
    position: absolute;
    top: 0;
    left: 10%;
    height: 100%;
    width: 90%;
    transition: all 0.5s ease;
}
</style>