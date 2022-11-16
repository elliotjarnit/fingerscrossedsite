<template>
    <div :class="{ 'sidebar-content-item': true, 'active': $route.name === routename }" @click="navigateTo(route)">
        <span class="content-title" >
            <span class="icon">
                <SVGIcon :icon="icon" />
            </span>
            <span class="text">
                {{ title }}
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        route: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            routename: ''
        }
    },
    mounted() {
        this.routename = this.route.split('/').join('-').slice(1);
        console.log(this.routename)
    },
}
</script>