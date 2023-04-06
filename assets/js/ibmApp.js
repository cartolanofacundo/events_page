const $button = document.getElementById("btnSubmit");
const classification = [
    {
        minNum: 0,
        maxNum: 16,
        text: "Severe Thinness",
        alert: "alert-danger"
    },
    {
        minNum: 16,
        maxNum: 17,
        text: "Moderate Thinness",
        alert: "alert-warning"
    },
    {
        minNum: 17,
        maxNum: 18.5,
        text: "Mild Thinness",
        alert: "alert-warning"
    },
    {
        minNum: 18.5,
        maxNum: 25,
        text: "Normal",
        alert: "alert-success"
    },
    {
        minNum: 25,
        maxNum: 30,
        text: "Overweight",
        alert: "alert-warning"
    },
    {
        minNum: 30,
        maxNum: 1000,
        text: "Obese",
        alert: "alert-danger"
    },
]
$button.addEventListener("click", ((e) => {
    e.preventDefault();
    let height = document.getElementById("heightInput").value
    let weight = document.getElementById("weightInput").value
    if (!isNaN(height) && height > 0 && !isNaN(weight) && weight) {
        height = height / 100;
        let result = weight / (height ** 2);
        createResult(result);
        createError(false);
    } else {
        createError(true);
    }
}))
function createError(show) {
    document.getElementById("errorContainer").classList.toggle("visible", show);
    if(show){
        document.getElementById("result-container").innerHTML = ""
    }

}
function createResult(result) {
    const $container = document.getElementById("result-container");
    const BMI = getBMI(result);
    let template = `<hr>
                    <div class="data-container">
                        <h4>Result:</h4>
                        <p class="fs-1">${result.toFixed(2)}</p>
                    </div>
                    <div class="alert-container">
                        <div class="alert ${BMI.alert}" role="alert">
                            Your classification is: ${BMI.text}
                        </div>
                    </div>`;
    $container.innerHTML = template
}
function getBMI(result) {
    for (let BMI of classification) {
        if (result >= BMI.minNum && result < BMI.maxNum) {
            return BMI
        }
    }
}