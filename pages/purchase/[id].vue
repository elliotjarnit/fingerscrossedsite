<script setup>
// Phase 1 = Ask if address correct
// Phase 2 = Change address
// Phase 3 = Payment form

let idfound = true
let productname = "Unknown"
let productdescription = "Unknown"
let productprice = "0.00"
let productimage = ""

const route = await useRoute();
let { data: pp, error} = await useFetch('/api/users/permittedpurchases/' + route.params.id);
pp = pp.value
if (error.value) idfound = false
else {
    const { data: product } = await useFetch('/api/wines/' + pp.wineId);
    productname = product.value.name
    productdescription = product.value.description || ""
    productimage = product.value.image || "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
    let beforeprice = String(product.value.price)
    let value = Number(beforeprice);
    let res = beforeprice.split(".");     
    if(res.length === 1 || res[1].length < 3) value = value.toFixed(2);
    productprice = value
}
</script>

<template>
    <div class="notfound" v-if="!idfound">
        <h1> Invalid purchase id </h1>
    </div>
    <div v-else>
        <div id="map-container">
            <Transition>
                <Map :address="address1 + ' ' + city" id="map-element" v-if="showmap"></Map>
            </Transition>
            <Transition>
                <div id="product-info" v-if="phase==3">
                    <div id="product-image-div">
                        <img :src="productimage" />
                        <div>
                            <div id="product-title">{{productname}}</div>
                            <div id="product-desc">{{productdescription}}</div>
                        </div>
                    </div>
                    <div id="price">
                        <div class="payment-row">
                            <div style="float:left;">Subtotal</div>
                            <div style="float:right; display:inline;">${{ productprice }}</div>
                        </div>
                        <div class="payment-row">
                            <div style="float:left; color: rgba(26,26,26,.5);">Tax</div>
                            <div style="float:right; display:inline; color: rgba(26,26,26,.5);">$0.00</div>
                        </div>
                        <div class="payment-row" style="border: none;">
                            <div style="float:left;">Total</div>
                            <div style="float:right; display:inline; font-weight: 600;">${{ productprice }}</div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <div id="info-side">
            <Transition>
                <form id="address-form" v-if="phase === 1 || phase === 2">
                    <div class="form-fields">
                        <inputbox value="Address Line 1" placeholder="Street address" :disabled="phase===1"
                            v-model="address1"></inputbox>
                        <inputbox value="Address Line 2" placeholder="Apartment, suite, etc (optional)"
                            :disabled="phase===1" v-model="address2"></inputbox>
                        <inputbox value="City" placeholder="City name" :disabled="phase===1" v-model="city">
                        </inputbox>
                        <stateselector :disabled="phase===1" v-model="state"></stateselector>
                        <inputbox value="ZIP" placeholder="ZIP Code" :disabled="phase===1" v-model="zip">
                        </inputbox>
                        <div class="bigtext" style="margin-top: 20px;" v-if="phase===1">
                            Is this address correct?
                        </div>
                        <div style="display:flex;" v-if="phase===1">
                            <button class="submit" v-on:click.prevent="addressclickyes"
                                style="margin-right: 10px; margin-top: 20px;">
                                <span id="button-text">Yes</span>
                            </button>
                            <button class="submit submit-secondary" v-on:click.prevent="addressclickno"
                                style="margin-left: 10px; margin-top: 20px;">
                                <span id="button-text">No</span>
                            </button>
                        </div>
                        <Transition>
                            <div style="display:flex;" v-if="phase===2">
                                <button class="submit" v-on:click.prevent="addressclickyes" style="margin-top: 20px;">
                                    <span id="button-text">Next</span>
                                </button>
                            </div>
                        </Transition>
                    </div>
                </form>
            </Transition>
            <form id="payment-form" v-if="phase === 3">
                <div id="payment-element"></div>
                <div id="button-cont">
                    <button class="submit" v-on:click.prevent="paymentclick">
                        <div class="spinner hidden" id="spinner"></div>
                        <span id="button-text">Pay</span>
                    </button>
                </div>
                <div id="payment-message" class="hidden"></div>
            </form>
            <div class="attribution">
                <a href="https://stripe.com" target="_blank">Payment powered by Stripe</a>
                <a href="https://www.mapbox.com/" target="_blank">Map
                    provided by Mapbox</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            script: [{src: "https://js.stripe.com/v3/"}],
            title: "Purchase"
        }
    },
    data() {
        return {
            stripe: null,
            elements: null,
            phase: 1,
            address1: "",
            address2: "",
            state: "",
            zip: "",
            city: "",
            showmap: false,
        }
    },
    async mounted() {
        let user = await $fetch('/api/users/' + this.pp.userId, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(":" + this.pp.id)
            }
        })
        this.address1 = user.address || ""
        this.address2 = user.apartment || ""
        this.zip = user.zip || ""
        this.city = user.city || ""
        this.state = user.state || ""
        this.showmap = true
    },
    methods: {
        addressclickno() {
            this.phase = 2
            this.showmap = false
        },
        async addressclickyes() {
            this.phase = 3
            this.showmap = true
            this.stripe = await Stripe("pk_test_51LrloVKguvQ0jeo2Bar4pxtcIdfqVvd6BKRjGKgr0JMfBz2KTIEAj3cwebtuZH1KJs7RbMU9cYcED8FhBuPiIWYD00DSdMNbsl");
            let response = await useFetch("/api/payments/intents", { method: "POST",
                body: JSON.stringify({
                    permittedPurchaseId: this.$route.params.id,
                }),
            });
            const client_secret = response.data.value.client_secret
            const appearance = {
                theme: 'flat',
            };
            this.elements = this.stripe.elements({appearance, clientSecret: client_secret});
            const paymentElement = await this.elements.create("payment", {
                fields: {
                    billingDetails: {
                        address: {
                            country: 'never'
                        }
                    }
                }
            });
            // const addressElement = await elements.create("address");
            // await addressElement.mount("#address-element");
            await paymentElement.mount("#payment-element");
        },
        async paymentclick() {
            let elements = this.elements
            const { error } = await this.stripe.confirmPayment({
                elements,
                confirmParams: {
                return_url: "http://localhost:3000/lit",
                },
            });

            if (error.type === "card_error" || error.type === "validation_error") {
                console.log(error.message)
            } else {
                console.log("An unexpected error occurred.");
            }
        }
    }
}
</script>

<style>
.body {
    background-color: #B6E59E;
}
</style>

<style scoped>
#map-container {
    float: left;
    width: 40%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

#map-element {
    float: left;
    width: 100%;
    object-fit: cover;
    height: 100%;
    position: absolute;
}

#product-info {
    width: 70%;
    height: 80%;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-flow: column;
    z-index: 5;
    padding: 20px;
    text-align: center;
}

#product-image-div {
    width: 100%;
    height: 0;
    display: block;
    flex-grow: 2;
}

#product-title {
    font-family: 'Roboto', sans-serif;
    font-size: 25px;
    font-weight: 600;
    margin-top: 10px;
}

#product-desc {
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    font-weight: 400;
    margin-top: 10px;
}

img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

#price {
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
}

.payment-row {
    display: block;
    margin: 0 40px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(26, 26, 26, .1);
    height: 1em;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.bigtext {
    text-align: center;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 600;
}

#payment-form {
    padding: 60px 150px;
}

#address-form {
    padding: 60px 150px;
}

.form-fields {
    display: flex;
    flex-flow: column;
}

.submit {
    border-radius: 6px;
    width: 100%;
    background-color: #6772e5;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.025em;
    line-height: 44px;
    padding: 0;
    margin: 30px auto;
    display: block;
    transition: all 0.2s ease;
}

.submit-secondary {
    background-color: #808080;
}

.submit-secondary:hover {
    background-color: #A9A9A9 !important;
}

.submit:hover {
    background-color: #7795f8;
}

#info-side {
    position: absolute;
    background-color: white;
    right: 0;
    top: 0;
    overflow: hidden;
    width: 60%;
    height: 100%;
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}

.attribution {
    position: absolute;
    bottom: 3px;
    width: 100%;
    display: block;
    text-align: center;
}

.attribution a {
    color: #999;
    text-decoration: none;
    margin: 10px 40px;
}

.attribution a:hover {
    color: #666;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>