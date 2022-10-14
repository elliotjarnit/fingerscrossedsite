<template>
    <div class="input-field">
        <label :for="value">{{ value }}</label>
        <input :type="type" :value="modelValue" :id="value" :placeholder="placeholder" :disabled="disabled"
            @input="updateValue" ref="input" />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: '',
        value: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        hidden: {
            type: Boolean,
            required: false
        },
        email: {
            type: Boolean,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        },
    },
    data: function () {
        return {
            type: 'text'
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    },
    mounted() {
        if (this.email) {
            this.type = 'email'
        } else if (this.hidden) {
            this.type = 'password'
        }
        setInterval(() => {
            this.$emit('update:modelValue', this.$refs.input.value);
        }, 50);
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
    -moz-osx-font-smoothing: grayscale;
}

.input-field label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.93rem;
    font-weight: 400;
}

.input-field input {
    padding: 1rem;
    border-radius: 12px;
    background-color: #f1f1f1;
    display: block;
    width: 100%;
    color: rgb(48, 49, 61);
    outline: none;
    border: none;
    font-size: 16px;
    box-sizing: border-box;
    transition: background 0.15s ease, border 0.15s ease, box-shadow 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.input-field input:focus {
    box-shadow: rgba(0, 123, 255, 0.25) 0px 0px 0px 3px, rgba(0, 123, 255, 0.5) 0px 0px 0px 1px;
}

input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>