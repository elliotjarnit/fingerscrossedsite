<template>
    <div :style="{width: increasePX(size, 10), height: increasePX(size, 10)}" class="icon">
        <div class="clickable" :style="{width: increasePX(size, 10), height: increasePX(size, 10)}" v-if="clickable" @click="goToLink"></div>
        <object class="icon-svg" :data="'/svgs/' + icon + '.svg'" type="image/svg+xml" :style="{width: size, height: size}"></object>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        clickable: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            required: false,
            default: "20px"
        },
        link: {
            type: String,
            required: false,
        }
    },
    methods: {
        increasePX(initial, px) {
            initial = Number(initial.replace('px', ''));
            return (initial + px) + 'px';
        },
        goToLink() {
            if (this.link) window.location.href = this.link;
        }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;

    &:hover > .icon-svg {
        transform: scale(1.2);
    }
    .icon-svg {
        z-index: 1;
        transition: all 0.2s ease-in-out;
    }
}

.clickable {
    position: absolute;
    z-index: 100;
    &:hover {
        cursor: pointer;
    }
}
</style>