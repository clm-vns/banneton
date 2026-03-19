<script setup lang="ts">
import Header from "./components/Header.vue";
import RecipeCalculator from "./components/RecipeCalculator.vue";
import Footer from "./components/Footer.vue";
</script>
<template>
    <Header></Header>
    <main class="u-pt-md-6 u-pb-md-6" role="main">
        <div class="container">
            <div class="row">
                <div class="col-md-6 u-mb-4 u-mb-md-0">
                    <RecipeCalculator></RecipeCalculator>
                </div>
                <div class="col-md-6">
                    <h2>Quelques explications</h2>
                    <ol>
                        <li class="u-mb-3">Le taux d'hydratation est le rapport eau/farine, arrondi au dixième. Les
                            autres ingrédients
                            sont considérés comme négligeables dans ce calcul.
                        </li>
                        <li class="u-mb-3">Le taux de levain est le rapport levain/poids total de la pâte, arrondi au
                            dixième.
                        </li>
                        <li class="u-mb-3">Le coefficient multiplicateur est arrondi au centième et les ingrédients sont
                            arrondis à
                            l'unité. Cela provoque parfois un léger écart sur le poids total.
                        </li>
                        <li class="u-mb-3">Lors de la cuisson, l'évaporation est ~10%. Ainsi pour une baguette de 250g,
                            le poids de la
                            pâte doit d'être environ 270g.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>
