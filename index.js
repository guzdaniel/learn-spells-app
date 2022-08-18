const init = () => {

    const BASE_URL = "https://fedeperin-harry-potter-api-en.herokuapp.com/spells"
    const spellsList = document.getElementById("spells-list")
    const spellForm = document.querySelector("form")
    const spellNodes = () => document.querySelectorAll(".spell-name")
    const sortButton = document.querySelector("#sort")
    const randUseElem = document.querySelector("#random-spell-action")
   

    renderSpellsList()
    attachSubmitEventToForm()
    attachClickEventToSortButton()
    renderRandomSpell()

    randUseElem.addEventListener("mouseover", () => {
        randUseElem.style = "text-decoration: underline"
        console.log(randUseElem.dataset.name)
    })

    randUseElem.addEventListener("mouseout", () => {
        randUseElem.style = "text-decoration: none"
    })

    function attachClickEventsToSpells() {
        spellsList.addEventListener("click", renderSpellUses)
    }

    function attachSubmitEventToForm() {
        spellForm.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("form input:", event.target["new-spell"].value)
        })
    }
   
    function attachMouseOverEventsToSpells() {
        spellNodes().forEach(spell => {
            spell.addEventListener("mouseover", () => {
                spell.style.color = "rgb(168, 0, 0)"
            })
            spell.addEventListener("mouseout", () => {
                spell.style.color = "black"
            })
        })
    
    }

    function attachClickEventToSortButton() {
        sortButton.addEventListener("click", sortSpells)
    }
   
    function renderSpellsList() {
        let spellsArr = []
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                data.forEach(spellObj => {
                    if (spellObj.spell.includes("/")) {
                        spellsArr = spellObj.spell.split("/")
                        spellsList.innerHTML +=
                            `<div class="spell-container">
                            <ul class="spell-name" data-id="${spellObj.id}">${spellsArr[0]} OR ${spellsArr[1]}</ul> 
                            </div>`
                    }
                    else {
                        spellsList.innerHTML +=
                            `<div class="spell-container">
                            <ul class="spell-name" data-id="${spellObj.id}">${spellObj.spell}</ul>
                            </div>`
                    }
                })

                attachClickEventsToSpells()
                attachMouseOverEventsToSpells()

            })
    }

    function renderSpellUses(event) {
        if (event.target.classList.contains("spell-name")) {
            fetch(BASE_URL + `/${event.target.dataset.id}`)
                .then(res => res.json())
                .then(spellObj => {
                    const spellName = event.target
                    const spellContainer = event.target.parentNode
                    const spellAction = spellContainer.querySelector('.spell-action')

                    if (spellAction === null) {
                        spellName.style.color = "rgb(168, 0, 0)"
                        spellContainer.innerHTML += `
                         <ul class="spell-action">${spellObj.use}</ul>`
                    }
                    else {
                        spellAction.remove()
                        spellName.style.color = "black"
                    }
                })
        }
    }

    function sortSpells() {
        const spellsElemsArray = Array.from(spellNodes());
        const sortedSpellElemsArray = sortSpellElemsAlphab(spellsElemsArray)
    
        spellsList.innerHTML = ""
    
        sortedSpellElemsArray.forEach(e => {
            spellsList.appendChild(e.parentNode) // append div container of each spell
        })
        sortButton.remove()
    }

    function renderRandomSpell() {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                const randomSpellObj = getRandomElemFromArray(data)
                randUseElem.innerText = randomSpellObj.use
                randUseElem.setAttribute("data-name", randomSpellObj.spell)
            })
    }

    // sort spell ul elements by spell name, then return sorted ul elements
    function sortSpellElemsAlphab(spellsElemsArray) {
        const sortedArr = spellsElemsArray.sort((a, b) => {
            if (a.innerText < b.innerText) {
                return -1;
            }
            if (b.innerText > a.innerText) {
                return 1;
            }
            return 0;
        })
        return sortedArr
    }

    function getRandomElemFromArray(arr) {
        const valueAtRandmIndexOfArr = arr[Math.floor(Math.random() * arr.length)]
        return valueAtRandmIndexOfArr
    }

}
document.addEventListener("DOMContentLoaded", init)
