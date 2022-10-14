<template>
    <div class="input-field">
        <label :for="state">State</label>
        <select :id="state" :disabled="disabled" :value="modelValue" @input="updateValue" ref="input" selected>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: '',
        disabled: {
            type: Boolean,
            required: false
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>
.input-field {
    margin-bottom: 20px;
    height: auto;
    display: inline-block;
    vertical-align: top;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -moz-osx-font-smoothing: grayscale
}

.input-field label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.93rem;
    font-weight: 400;
}

.input-field select {
    padding: 1rem;
    border-radius: 12px;
    background-color: #f1f1f1;
    display: block;
    width: 100%;
    color: rgb(48, 49, 61);
    outline: none;
    border: none;
    font-size: 16px;
    transition: background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

.input-field select option {
    color: rgb(48, 49, 61);
}

.input-field input:focus {
    box-shadow: rgba(0, 123, 255, 0.25) 0px 0px 0px 3px, rgba(0, 123, 255, 0.5) 0px 0px 0px 1px;
}

option:disabled,
select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>