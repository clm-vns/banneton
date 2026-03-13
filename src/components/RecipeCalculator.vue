<script setup>
import {ref, computed} from 'vue'

// État réactif
const flour = ref(1000)
const water = ref(800)
const salt = ref(18)
const seed = ref(0)
const sourdough = ref(118)
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
</script>

<template>
    <div class="o-recipe-calculator">
        <h2 class="u-mb-3">Calculateur de proportions</h2>
        <p>Toutes les valeurs sont en grammes.</p>
        <div class="row">
            <div class="col-sm-6 col-md-12">
                <form class="o-form u-m-0" id="recipeCalculator">
                    <fieldset class="o-form__fieldset">
                        <legend class="u-text-size-lg u-margin-x-auto">Recette de base</legend>
                        <div class="o-form__field">
                            <label class="o-form__label" for="flour">🌾 Farine (g) :</label>
                            <input class="o-form__input" v-model.number="flour" type="number" name="flour"
                                   id="flour" min="0">
                        </div>

                        <div class="o-form__field">
                            <label class="o-form__label" for="water">💧 Eau (g) :</label>
                            <input class="o-form__input" v-model.number="water" type="number" name="water"
                                   id="water" min="0">
                        </div>

                        <div class="o-form__field">
                            <label class="o-form__label" for="salt">🧂 Sel (g) :</label>
                            <input class="o-form__input" v-model.number="salt" type="number" name="salt"
                                   id="salt" min="0">
                        </div>

                        <div class="o-form__field">
                            <label class="o-form__label" for="seed">🌻 Graines (g) :</label>
                            <input class="o-form__input" v-model.number="seed" type="number" name="seed"
                                   id="seed" min="0">
                        </div>
                        <div class="o-form__field">
                            <label class="o-form__label" for="sourdough">Levure (g) :</label>
                            <input class="o-form__input" v-model.number="sourdough" type="number"
                                   name="sourdough" id="sourdough" min="0">
                        </div>
                    </fieldset>

                    <div class="o-form__field">
                        <label class="o-form__label" for="weightWanted">Poids de pâte souhaité :</label>
                        <input class="o-form__input" v-model.number="weightWanted" type="number"
                               name="weightWanted" id="weightWanted" min="100">
                    </div>
                </form>
            </div>
            <div class="col-sm-6 col-md-12">
                <p>
                    <strong>Taux d'hydratation:</strong> {{ hydratationRate }}%<br>
                    <strong>Taux de levain:</strong> {{ sourdoughRate }}%<br>
                    <strong>Poids total de la pâte:</strong> {{ totalWeight }}g<br>
                </p>
                <hr>
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
        </div>
    </div>
</template>
