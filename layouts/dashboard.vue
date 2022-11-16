<template>
    <div>
        <div class="sidebar">
            <div class="sidebar-content-item" style="font-weight: 600; font-size: 1em;">
                FINGERS CROSSED
            </div>
            <div class="sidebar-content">
                <SidebarItem icon="user" title="Home" route="/dashboard" />
                <SidebarItem icon="user" title="Users" route="/dashboard/users" />
                <SidebarItem icon="order" title="Orders" route="/dashboard/orders" />
                <div class="sidebar-content-item" @click="logout"
                    style="position: absolute; bottom:0; padding-bottom: 1em; font-family:Verdana, Geneva, Tahoma, sans-serif">
                    Logout
                </div>
            </div>
        </div>
        <div class="rest">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            let auth = useCookie('auth')
            auth.value = ''
            window.location.href = '/dashboard/login'
        }
    }
}
</script>

<style lang="scss">
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
}

.icon object {
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