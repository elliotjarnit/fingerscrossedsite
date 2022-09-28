<template>
    <form>
        <inputbox value="Email" v-model="email" required email></inputbox>
        <inputbox value="First Name" v-model="firstName" required></inputbox>
        <inputbox value="Last Name" v-model="lastName" required></inputbox>
        <inputbox value="Phone Number" v-model="phone" required></inputbox>
        <inputbox value="Street" v-model="street" required></inputbox>
        <inputbox value="Apartment" v-model="apartment"></inputbox>
        <inputbox value="City" v-model="city" required></inputbox>
        <inputbox value="Zip Code" v-model="zip" required></inputbox>
        <button type="submit" v-on:click.prevent="submit">Submit</button>
    </form>
</template>

<script lang="ts">
export default {
    data() {
        return {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            street: "",
            apartment: "",
            city: "",
            zip: ""
        }
    },
    methods: {
        test() {
            console.log(this.email);
        },
        async submit() {
            console.log(this.email)
        }
    }
}
</script>