<template>
    <label>
        <div>{{ required ? value : value + " (Optional)" }}</div>
        <input :type="type" :value="modelValue" @input="updateValue" ref="input" />
    </label>
</template>

<script lang="ts">
export default {
    props: {
        modelValue: '',
        value: {
            type: String,
            required: true
        },
        hidden: {
            type: Boolean,
            required: false
        },
        required: {
            type: Boolean,
            required: false
        },
        email: {
            type: Boolean,
            required: false
        }
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
div {
    margin-top: 10px;
}
</style>