<template>
    <div class="homepage">
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
            <div class="carousel">
                <img class="carousel-item active" src="~/assets/carousel/1.jpg" ref="carousel-1" />
                <img class="carousel-item" src="~/assets/carousel/2.jpg" ref="carousel-2" />
                <img class="carousel-item lastactive" src="~/assets/carousel/3.jpg" ref="carousel-3" />
                <button class="waitlist" @click="waitlistRedirect">Join Waitlist</button>
            </div>
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

<style>
body {
    overflow-x: hidden;
}
</style>

<style lang="scss" scoped>
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

.carousel {
    height: 100%;
    width: 100%;
    .carousel-item {
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: absolute;
        border: 0;
        transform: translateX(-100%);
        transition: transform 0.5s ease;
        opacity: 0;
    }
    .active {
        transform: translateX(0);
        z-index: 100;
        opacity: 1;
    }
    .lastactive {
        transform: translateX(100%);
        opacity: 1;
    }
    .waitlist {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 200;
        transform: translate(-50%, -50%);
        background-color: #F2F2F2;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-family: "Lato";
        font-weight: 300;
        font-size: 1rem;
        color: #525356;
        cursor: pointer;
        &:hover {
            background-color: #E5E5E5;
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
    mounted() {
        let item1 = this.$refs["carousel-1"];
        let item2 = this.$refs["carousel-2"];
        let item3 = this.$refs["carousel-3"];
        let items = [item1, item2, item3];

        let i = 0;
        setInterval(() => {
            for (let item of items) {
                item.classList.remove("active");
                item.classList.remove("lastactive");
            }
            items[i].classList.add("lastactive");
            i++;
            if (i >= items.length) {
                i = 0;
            }
            items[i].classList.add("active");
        }, 3000);
    },
    methods: {
        waitlistRedirect() {
            this.$router.push("/join");
        }
    }
}
</script>