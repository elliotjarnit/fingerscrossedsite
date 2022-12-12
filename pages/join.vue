<template>
    <form>
        <inputbox value="Email" v-model="email" required email></inputbox>
        <inputbox value="First Name" v-model="firstName" required></inputbox>
        <inputbox value="Last Name" v-model="lastName" required></inputbox>
        <inputbox value="Phone Number" v-model="phone" required></inputbox>
        <inputbox value="Address" v-model="address" required></inputbox>
        <inputbox value="Apartment" v-model="apartment"></inputbox>
        <inputbox value="City" v-model="city" required></inputbox>
        <stateselector v-model="state" required></stateselector>
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
            zip: "",
            state: ""
        }
    },
    methods: {
        test() {
            console.log(this.email);
        },
        async submit() {
            let response = await $fetch('/api/users', {
                method: 'POST',
                body: {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phone,
                    address: this.address,
                    apartment: this.apartment,
                    city: this.city,
                    state: this.state,
                    zip: parseInt(this.zip)
                }
            })
            console.log(response);
        }
    }
}
</script>