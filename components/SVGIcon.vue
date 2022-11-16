<template>
    <object :data="'/svgs/' + icon + '.svg'" type="image/svg+xml"></object>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>