<script setup lang="ts">
import {ref} from "vue";
import {useLocalStorage} from '@vueuse/core'

const emit = defineEmits<{
    (e: 'loadRecipe', recipe: object): void
}>()

const recipes = useLocalStorage('banneton.recipe', {
    0: {
        name: 'Baguette',
        flour: 1000,
        water: 680,
        salt: 15,
        seed: 0,
        sourdough: 10
    }
})
</script>

<template>
    <ul>
        <li v-for="recipe in recipes">
            <button role="button"
                    @click="$emit('loadRecipe', recipe)">
                {{ recipe.name }}
            </button>
        </li>
    </ul>
</template>