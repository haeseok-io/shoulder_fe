<template>
    <div class="input-wrap">
        <label :for="id">
            <p v-if="label">{{ label }}</p>
            <input
                :id="id"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                :tabindex="tabindex"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
        </label>
        <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
    export default {
        name: "BaseInput",
        props: {
            id: String,
            name: String,
            label: String,
            type: {
                type: String,
                default: "text",
            },
            placeholder: String,
            tabindex: Number,
            modelValue: [String, Number],
            errorMessage: String,
        },
        emits: ['update:modelValue']
    }
</script>

<style scoped>
    .input-wrap { width: 100%; }
    .input-wrap label { width: 100%; }
    .input-wrap label p { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 14px; font-weight: 600; }
    .input-wrap label input { width: 100%; height: 60px; padding: 5px 10px; background: #1d2432; border: 1px solid #343A47; border-radius: 5px; color: #eee; }
    .input-wrap label input::placeholder { color: #888; }
    .input-wrap label input:focus { border: 2px solid #6366f1; }

    .input-wrap .errorMessage { margin-top: 10px; color: #cc0000; }
</style>