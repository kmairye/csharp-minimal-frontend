// ELEMENTS
let inputForm = document.getElementById("inputForm");
let inputArea = document.getElementById("inputArea");

// TEMPLATES
let paragraphTemplate = document.getElementById("paragraphTemplate");
let predictionTemplate = document.getElementById("predictionTemplate");

// CONTAINERS, receivers for templat elms
let storyContainer = document.getElementById("storyContainer");
let predictionsContainer = document.getElementById("predictionsContainer");


// PROGRAM, functions and listeners
inputForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let templateClone = paragraphTemplate.content.cloneNode(true);
    let newParagraph = templateClone.querySelector('p')
    newParagraph.textContent = inputArea.value; 
    storyContainer.appendChild(newParagraph)
    inputArea.value = ''
})

inputArea.addEventListener('keyup', (e)=>{
    const pathToMinimalApi = "INSERT_LOCAL_PATH_HERE"
    console.log(inputArea.value)
    fetch(`${pathToMinimalApi}${inputArea.value}`)
    .then(async (res)=>{
        let resJ = await res.json()
        handleSuggestions(resJ)
    })
    .catch((err)=>{
        console.log("error: ", err.message)
    })
})

function handleSuggestions(jPredictions){
    predictionsContainer.innerHTML = "";
    jPredictions.forEach(sPrediction => {
        let templateClone = predictionTemplate.content.cloneNode(true);
        let newPrediction = templateClone.querySelector('.prediction');
        newPrediction.textContent = sPrediction;
        newPrediction.attr
        predictionsContainer.appendChild(templateClone)
    });

    enablePredictionChoice()
}

function enablePredictionChoice() {
    let predictions = document.querySelectorAll('.prediction')
    predictions.forEach(prediction=>{
        prediction.addEventListener('click', (e)=>{
            let suggestion = e.currentTarget.textContent
            inputArea.value += ` ${suggestion.toLowerCase()}`

        })
    })
}
