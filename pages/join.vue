<template>
    <form>
        <inputbox value="Email" v-model="email" required email></inputbox>
        <inputbox value="First Name" v-model="firstName" required></inputbox>
        <inputbox value="Last Name" v-model="lastName" required></inputbox>
        <inputbox value="Phone Number" v-model="phone" required></inputbox>
        <inputbox value="Address" v-model="address" required></inputbox>
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
            address: "",
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
            let response = await $fetch('/api/mailinglist', {
                method: 'POST',
                body: {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phone,
                    address: this.street,
                    apartment: this.apartment,
                    city: this.city,
                    zip: this.zip
                }
            })
            console.log(response);
        }
    }
}
</script>