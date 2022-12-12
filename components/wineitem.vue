<template>
    <div class="item">
        <div class="image">
            <img :src="data.image" />
        </div>
        <div class="text">
            <div class="name">
                #{{data.id}}: {{ data.name }}
            </div>
            <div class="description">
                {{ data.description }}
            </div>
            <div class="price">
                ${{ data.price }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.item {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
    .image {
        img {
            aspect-ratio : 1 / 1;
            width: 100%;
            object-fit: cover;
        }
    }
    .text {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 7px;
        .name {
            font-size: 17px;
            font-weight: 600;
        }
    }
}
</style>