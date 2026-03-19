<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue'

// État réactif
const flour = ref(1000)
const water = ref(700)
const salt = ref(18)
const seed = ref(0)
const sourdough = ref(110)

const weightWanted = ref(1200)

const totalWeight = computed(() =>
    (flour.value + water.value + salt.value + sourdough.value).toFixed(0)
)

const hydratationRate = computed(() =>
    flour.value > 0 ? ((water.value / flour.value) * 100).toFixed(1) : 0
)

const sourdoughRate = computed(() =>
    sourdough.value > 0 ? ((sourdough.value / totalWeight.value) * 100).toFixed(1) : 0
)

const multiplier = computed(() =>
    weightWanted.value > 0 ? ((weightWanted.value / totalWeight.value) * 100).toFixed(0) / 100 : 0
)

const flourNeeded = computed(() => (flour.value * multiplier.value).toFixed(0))
const waterNeeded = computed(() => (water.value * multiplier.value).toFixed(0))
const saltNeeded = computed(() => (salt.value * multiplier.value).toFixed(0))
const seedNeeded = computed(() => (seed.value * multiplier.value).toFixed(0))
const sourdoughNeeded = computed(() => (sourdough.value * multiplier.value).toFixed(0))

const totalNeeded = computed(() => {
    return (Number(flourNeeded.value) + Number(waterNeeded.value) +
        Number(saltNeeded.value) + Number(sourdoughNeeded.value)).toFixed(0)
})

interface Recipe {
    id: number
    name: string
    flour: number
    water: number
    salt: number
    seed: number
    sourdough: number
}

const recipes = ref<Recipe[]>([])

const recipeName = ref('')

watch(recipes, (newRecipe) => {
    localStorage.setItem('banneton.recipes', JSON.stringify(newRecipe))
}, {deep: true})

onMounted(() => {
    const saved = localStorage.getItem('banneton.recipes')
    if (saved && saved !== 'undefined') {
        try {
            recipes.value = JSON.parse(saved)
        } catch {
            console.warn('Recettes corrompues, reset')
        }
    }
})

function saveCurrentRecipe() {
    if (!recipeName.value.trim()) return

    recipes.value.push({
        id: Date.now(),
        name: recipeName.value.trim(),
        flour: flour.value,
        water: water.value,
        salt: salt.value,
        seed: seed.value,
        sourdough: sourdough.value,
    })

    recipeName.value = ''
}

function loadRecipe(recipe: Recipe) {
    flour.value = recipe.flour
    water.value = recipe.water
    salt.value = recipe.salt
    seed.value = recipe.seed
    sourdough.value = recipe.sourdough
}

function deleteRecipe(id: number) {
    recipes.value = recipes.value.filter(recipe => recipe.id !== id)
}

</script>

<template>
    <div class="o-recipe-calculator">
        <h2 class="u-mb-3">Calculateur de proportions</h2>
        <p>Toutes les valeurs sont en grammes.</p>
        <ul class="c-list c-list--no-bullet u-flex u-flex--wrap u-flex--row-gap-4 u-flex--column-gap-4" v-if="recipes.length > 0">
            <li class="c-list__item" v-for="recipe in recipes" :key="recipe.id">
                <button class="has-icon u-padding-0 u-padding-left-1" type="button" @click="loadRecipe(recipe)">
                    {{ recipe.name }}
                    <span class="c-icon c-icon--close c-icon--background u-color-danger" @click="deleteRecipe(recipe.id)"></span>
                </button>
            </li>
        </ul>
        <div class="row">
            <div class="col-sm-6 col-md-12">
                <form class="o-form u-m-0" id="recipeCalculator">
                    <fieldset class="o-form__fieldset">
                        <legend class="u-text-size-lg u-margin-x-auto">Recette de base</legend>
                        <div class="o-form__field">
                            <label class="o-form__label" for="flour">🌾 Farine (g) :</label>
                            <input class="o-form__input" v-model.number="flour" type="number" name="flour"
                                   id="flour" min="0" placeholder="1000">
                        </div>

                        <div class="o-form__field">
                            <label class="o-form__label" for="water">💧 Eau (g) :</label>
                            <input class="o-form__input" v-model.number="water" type="number" name="water"
                                   id="water" min="0" placeholder="700">
                        </div>

                        <div class="o-form__field">
                            <label class="o-form__label" for="salt">🧂 Sel (g) :</label>
                            <input class="o-form__input" v-model.number="salt" type="number" name="salt"
                                   id="salt" min="0" placeholder="18">
                        </div>

                        <div class="o-form__field">
                            <label class="o-form__label" for="seed">🌻 Graines (g) :</label>
                            <input class="o-form__input" v-model.number="seed" type="number" name="seed"
                                   id="seed" min="0" placeholder="0">
                        </div>
                        <div class="o-form__field">
                            <label class="o-form__label" for="sourdough">Levain (g) :</label>
                            <input class="o-form__input" v-model.number="sourdough" type="number"
                                   name="sourdough" id="sourdough" min="0" placeholder="110">
                        </div>
                    </fieldset>

                    <div class="o-form__field">
                        <label class="o-form__label" for="weightWanted">Poids de pâte souhaité :</label>
                        <input class="o-form__input" v-model.number="weightWanted" type="number"
                               name="weightWanted" id="weightWanted" min="100" max="99999">
                    </div>


                </form>
            </div>
            <div class="col-sm-6 col-md-12"><p>
                <strong>Taux d'hydratation:</strong> {{ hydratationRate }}%<br>
                <strong>Taux de levain:</strong> {{ sourdoughRate }}%<br>
                <strong>Poids total de la pâte:</strong> {{ totalWeight }}g<br>
            </p>
                <hr>
                <div class="o-recipe-calculator__result">
                    <div class="u-flex__no-shrink">
                        <p class="u-text-size-lg u-text-bold">Recette finale</p>
                        <p>
                            <strong>Coefficient:</strong> {{ multiplier }}<br>
                            <strong>🌾 Farine:</strong> {{ flourNeeded }}g<br>
                            <strong>💧 Eau:</strong> {{ waterNeeded }}g<br>
                            <strong>🧂 Sel:</strong> {{ saltNeeded }}g<br>
                            <strong>🌻 Graines:</strong> {{ seedNeeded }}g<br>
                            <strong>Levain:</strong> {{ sourdoughNeeded }}g<br>
                            <strong>Poids total:</strong> {{ totalNeeded }}g
                        </p>
                    </div>
                    <div>
                        <label for="recipeName">Nom de la recette :</label>
                        <input id="recipeName" v-model="recipeName" type="text" placeholder="Pain au levain">
                        <button class="u-margin-top-4" type="button" @click="saveCurrentRecipe">
                            Enregistrer la recette*
                        </button>
                        <p class="u-text-size-xs u-margin-top-1">* Sauvegarde localement la recette de base</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
