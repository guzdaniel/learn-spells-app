const init = () => {

    const BASE_URL = "https://fedeperin-harry-potter-api-en.herokuapp.com/spells"

    renderSpellsList()

    const spellsList = document.getElementById("spells-list")


    function attachClickEventsToSpells() {
        spellsList.addEventListener("click", renderSpellActions)
    }

    function renderSpellActions(event) {
        if (event.target.classList.contains("spell-name")) {
            fetch(BASE_URL + `/${event.target.dataset.id}`)
                .then(res => res.json())
                .then(spellObj => {
                    const spellName = event.target
                    const spellContainer = event.target.parentNode
                    const spellAction = spellContainer.querySelector('.spell-action')

                    if (spellAction !== null) {
                        spellAction.remove()
                        spellName.style.color = "black"
                    }
                    else {
                        spellName.style.color = "rgb(168, 0, 0)"
                        spellContainer.innerHTML += `
                         <ul class="spell-action">${spellObj.use}</ul>`
                    }
                })
        }
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
                            `<div class=spell-container>
                            <ul class="spell-name" data-id="${spellObj.id}">${spellsArr[0]} OR ${spellsArr[1]}</ul> 
                            </div>`
                    }
                    else {
                        spellsList.innerHTML +=
                            `<div class=spell-container>
                            <ul class="spell-name" data-id="${spellObj.id}">${spellObj.spell}</ul>
                            </div>`
                    }
                })

                //const spellNodes = document.querySelectorAll('.spell-container')

                attachClickEventsToSpells()
            })
    }


}


document.addEventListener("DOMContentLoaded", init)
