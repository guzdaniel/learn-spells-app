const init = () => {

    const BASE_URL = "https://fedeperin-harry-potter-api-en.herokuapp.com/spells"

    renderSpellsList()

    const spellsList = document.getElementById("spells-list")

   

    function renderSpellsList() {
        let spellsArr = []
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                data.forEach(spellObj => {
                    if (spellObj.spell.includes("/")) {
                        spellsArr = spellObj.spell.split("/")
                        spellsList.innerHTML +=
                            `<div id=spell-container>
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

                //attachClickEventsToSpells()
            })
    }


}


document.addEventListener("DOMContentLoaded", init)
