document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById('flourBase').addEventListener('change', calcQuantity);
    document.getElementById('waterBase').addEventListener('change', calcQuantity);
    document.getElementById('saltBase').addEventListener('change', calcQuantity);
    document.getElementById('seedsBase').addEventListener('change', calcQuantity);
    document.getElementById('sourdoughBase').addEventListener('change', calcQuantity);
    document.getElementById('wanted').addEventListener('change', calcQuantity);
    document.getElementById('recipeCalculator').addEventListener('submit', calcQuantity)

    initVal(1000, 800, 18, 0, 118, 1200);
});

function calcQuantity(e) {
    e.preventDefault();
    const baseRecipeForm = document.getElementById('recipeCalculator');
    const formData = new FormData(baseRecipeForm);
    const flourBase = parseInt(formData.get('flourBase'));
    const waterBase = parseInt(formData.get('waterBase'));
    const saltBase = parseInt(formData.get('saltBase'));
    const seedsBase = parseInt(formData.get('seedsBase'));
    const sourdoughBase = parseInt(formData.get('sourdoughBase'));
    const sumBase = flourBase + waterBase + saltBase + seedsBase + sourdoughBase;
    document.getElementById('sumBase').innerHTML = sumBase;
    document.getElementById('hydrationRate').innerHTML = Math.round(waterBase/flourBase * 1000) / 10;
    document.getElementById('sourdoughRate').innerHTML = Math.round(sourdoughBase/sumBase * 1000) / 10;
    const multiplier = Math.round(parseInt(formData.get('wanted')) / (sumBase) * 100) / 100;
    const flourRequired = Math.round(flourBase * multiplier);
    const waterRequired = Math.round(waterBase * multiplier);
    const saltRequired = Math.round(saltBase * multiplier);
    const seedsRequired = Math.round(seedsBase * multiplier);
    const sourdoughRequired = Math.round(sourdoughBase * multiplier);
    document.getElementById('multiplier').innerHTML = multiplier;
    document.getElementById('flourRequired').innerHTML = flourRequired;
    document.getElementById('waterRequired').innerHTML = waterRequired;
    document.getElementById('saltRequired').innerHTML = saltRequired;
    document.getElementById('seedsRequired').innerHTML = seedsRequired;
    document.getElementById('sourdoughRequired').innerHTML = sourdoughRequired;
    document.getElementById('sumRequired').innerHTML = Math.round(flourRequired + waterRequired + saltRequired + seedsRequired + sourdoughRequired);
}

function initVal(flour, water, salt, seeds, sourdough, wanted) {
    var event = new Event('change');

    document.getElementById('flourBase').value = flour;
    document.getElementById('waterBase').value = water;
    document.getElementById('saltBase').value = salt;
    document.getElementById('seedsBase').value = seeds;
    document.getElementById('sourdoughBase').value = sourdough;
    document.getElementById('wanted').value = wanted;
    document.getElementById('wanted').dispatchEvent(event);
}
