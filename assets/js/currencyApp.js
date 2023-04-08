let dataCurrency = undefined
let currency = {}
fetch('https://api.bluelytics.com.ar/v2/latest')
    .then(response => response.json())
    .then(data => dataCurrency = data);

setTimeout(() => {
    currency = {
        usd: dataCurrency.oficial.value_sell,
        usdBlue: dataCurrency.blue.value_sell,
        euro: dataCurrency.oficial_euro.value_sell,
        euroBlue: dataCurrency.blue_euro.value_sell,
        peso: 1
    }
  }, 1000);


const $sourceInput = document.getElementById("sourceInput");
const $sourceSelect = document.getElementById("sourceSelect");
const $targetInput = document.getElementById("targetInput");
const $targetSelect = document.getElementById("targetSelect");

console.log($sourceInput.value+ "input value")
console.log($sourceSelect.value+ " input select value")


$sourceInput.addEventListener("keyup", () => {
    convertCurrency($sourceInput.value, $sourceSelect.value, $targetSelect.value, false)
})
$targetInput.addEventListener("keyup", () => {
    convertCurrency($targetInput.value, $targetSelect.value, $sourceSelect.value, true)
});
$sourceSelect.addEventListener("click", () =>{
    convertCurrency($sourceInput.value, $sourceSelect.value, $targetSelect.value, false)
});
$targetSelect.addEventListener("click", () => {
    convertCurrency($sourceInput.value, $sourceSelect.value, $targetSelect.value, false)
});

function convertCurrency(amount, sourceCurrency, targetCurrency, invert) {
    const amountInBaseCurrency = convertToBaseCurrency(amount, currency, sourceCurrency)
    const convertedAmount = convertFromBaseCurrency(amountInBaseCurrency, currency, targetCurrency, invert)
    printResult(invert,convertedAmount);
}

function convertToBaseCurrency(amount, currency, sourceCurrency) {
    let conversionRate = 1 / currency[sourceCurrency]
    return amount / conversionRate;
}
function convertFromBaseCurrency(amountInBaseCurrency, currency, targetCurrency) {
    let convertedAmount = amountInBaseCurrency * 1/currency[targetCurrency];
    return convertedAmount;

}
function printResult(invert, convertedAmount) {
    console.log(convertedAmount);
    if (!invert) {
        $targetInput.value = convertedAmount.toFixed(2);
        return
    }
    console.log("llege aca")
    $sourceInput.value = convertedAmount.toFixed(2)
}




