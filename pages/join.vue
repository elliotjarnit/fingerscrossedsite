<template>
    <div class="page">
        <form class="input-container" :style="{display: section === 1 ? 'flex' : 'none'}">
            <h1>Contact Info</h1>
            <inputbox value="First Name" v-model="firstName" required></inputbox>
            <inputbox value="Last Name" v-model="lastName" required></inputbox>
            <inputbox value="Email" v-model="email" required email></inputbox>
            <inputbox value="Phone Number" v-model="phone" required></inputbox>
            <button type="submit" v-on:click.prevent="nextPage">Next</button>
        </form>
        <form class="input-container" :style="{display: section === 2 ? 'flex' : 'none'}">
            <h1>Shipping Info</h1>
            <inputbox value="Address" v-model="address" required></inputbox>
            <inputbox value="Apartment" v-model="apartment"></inputbox>
            <inputbox value="City" v-model="city" required></inputbox>
            <stateselector v-model="state" required></stateselector>
            <inputbox value="Zip Code" v-model="zip" required></inputbox>
            <button type="submit" v-on:click.prevent="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            section: 1,
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
        async nextPage() {
            this.section++;
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
            
            if (response !== undefined) {
                this.$router.push('/')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    justify-content: center;
    font-family: "Lato";
    align-items: center;
}

.input-container {
    display: flex;
    flex-direction: column;
    width: 20em;
    h1 {
        text-align: center;
    }
}

button {
    padding: 1em;
    margin-top: 1em;
    font-size: 0.9em;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 0.4em;
    background-color: #F2F2F2;
    &:hover {
        cursor: pointer;
        background-color: #E5E5E5;
    }
}
</style>