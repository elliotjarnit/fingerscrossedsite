<template>
    <div>
        <div class="header">
            <div class="header-section">
                <SVGIcon icon="instagram"></SVGIcon>
            </div>
            <img class="logo" src="~/assets/logo.png"/>
        </div>
        <button class="waitlist" @click="waitlistRedirect">Join Waitlist</button>
    </div>
</template>

<style lang="scss">
.header {
    width: 100vw;
    height: 75px;
    line-height: 75px;
    padding: 0 5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: auto;
        height: 70%;
    }
}
</style>

<script>
export default {
    methods: {
        waitlistRedirect() {
            window.location.href = "/join";
        }
    }
}
</script>