<template>
    <div :style="{width: increasePX(size, 10), height: increasePX(size, 10)}" class="icon" :class="{'icon-clickable': clickable}">
        <div class="clickable" :style="{width: increasePX(size, 10), height: increasePX(size, 10)}" v-if="clickable" @click="goToLink"></div>
        <object class="icon-svg" :class="{flipped: flipped}" :data="'/svgs/' + icon + '.svg'" type="image/svg+xml" :style="{width: size, height: size}"></object>
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
        },
        flipped: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        increasePX(initial, px) {
            initial = Number(initial.replace('px', ''));
            return (initial + px) + 'px';
        },
    }
}
</script>

<style lang="scss" scoped>
.icon {
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;
    .icon-svg {
        z-index: 1;
        transition: all 0.2s ease-in-out;
    }
}

.icon-clickable {
    &:hover > .icon-svg {
        transform: scale(1.2);
    }
}

.flipped {
    transform: scaleY(-1);
}

.clickable {
    position: absolute;
    z-index: 100;
    &:hover {
        cursor: pointer;
    }
}
</style>