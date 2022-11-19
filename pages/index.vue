<template>
    <div>
        <div class="header">
            <div class="section">
                <SVGIcon icon="instagram" size="23px" link="http://instagram.com/fingerscrossedwine" clickable />
                <SVGIcon icon="twitter" size="23px" link="http://twitter.com/@NikolasKrankl" clickable />
            </div>
            <img class="logo" src="~/assets/logo.png"/>
            <div class="section">

            </div>
        </div>
        <div class="page">
            <button class="waitlist" @click="waitlistRedirect">Join Waitlist</button>
        </div>
        <div class="footer">
            <div class="footer-items">
                <div class="row">
                    <div class="links">
                        <SVGIcon v-for="link in footerLinks" :key="link.icon" :icon="link.icon" :link="link.link" clickable />
                    </div>
                    <div class="copyright">
                        © 2022 Fingers Crossed Wine
                    </div>
                </div>
                <div class="row">
                    <div style="padding: 0 5px;">
                        <!-- TODO: Make contact us page -->
                        <NuxtLink to="/contact-us" class="strong">Contact Us</NuxtLink>
                        <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
                        <NuxtLink to="/tos">Terms of Service</NuxtLink>
                    </div>
                    <div class="credits">
                        Made with &lt;3 by&nbsp;<a href="https://elliotjarnit.xyz/" target="_blank">Elliot Jarnit</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.header {
    width: 100vw;
    height: 75px;
    line-height: 75px;
    padding: 0 150px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 50;
    .section {
        display: flex;
        gap: 30px;
        width: 10%;
    }
    img {
        width: auto;
        height: 70%;
    }
}

.page {
    box-sizing: border-box;
    padding: 150px;
    width: 100vw;
    height: 100vh;
    z-index: 1;
}

.footer {
    width: 100vw;
    height: 150px;
    box-sizing: border-box;
    background-color: #F2F2F2;
    display: flex;
    align-items: center;
    justify-content: center;
    .footer-items {
        height: calc(100% - 80px);
        width: 80vw;
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        .row {
            flex-basis: 100vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
                height: 100%;
            }
            .links {
                display: flex;
                gap: 10px;
            }
        }
        div {
            font-family: "Lato";
            font-weight: 300;
            font-size: 0.9rem;
            color: #525356;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            a {
                text-decoration: none;
                color: #525356;
                &:hover {
                    text-decoration: underline #525356 2px;
                    text-underline-offset: 5px;
                }
            }
        }
    }
}

.credits {
    gap: 0px !important;
    font-weight: 200;
    font-size: 0.8rem !important;
}

.strong {
    font-weight: 600;
}
</style>

<script>
export default {
    data() {
        return {
            footerLinks: [
                {icon: "instagram", link: "http://instagram.com/fingerscrossedwine"},
                {icon: "twitter", link: "http://twitter.com/@NikolasKrankl"},
            ]
        }
    },
    methods: {
        waitlistRedirect() {
            this.$router.push("/join");
        }
    }
}
</script>