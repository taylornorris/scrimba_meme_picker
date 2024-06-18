import { catsData } from "/data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")

getImageBtn.addEventListener("click", getMatchingCatsArray)


emotionRadios.addEventListener("change", highlightCheckedOption)

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio")
    
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function getMatchingCatsArray() {
    if (document.querySelector("input[type='radio']:checked")) {
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else {
                return cat.emotionTags.includes(selectedEmotion)  
            }

            
        })
        return matchingCatsArray
    }
}

function getEmotionsArray(cats) {
    const emotionsArray = []

    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ""

    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)