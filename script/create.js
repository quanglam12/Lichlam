var currentDate = new Date()
currentDate.setDate(currentDate.getDate() + 1)
var day = ("0" + currentDate.getDate()).slice(-2)
var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
var year = currentDate.getFullYear();
var inputday = document.getElementById("dayschedule")
    inputday.setAttribute("value", year + "-" + month + "-" + day)

const modeToggleBtn = document.getElementById('createBtn')

window.onload = function() {
    const savedMode = localStorage.getItem('mode') || 'modeperson'
    setMode(savedMode)
    displaymode()
};

function toggleMode() {
    const currentMode = localStorage.getItem('mode')
    const newMode = currentMode === 'modeperson' ? 'modetime' : 'modeperson'
    setMode(newMode)
    displaymode()
}
function setMode(mode) {
    if (mode === 'modeperson') {
        document.body.classList.add('modeperson')
        modeToggleBtn.setAttribute('id', "modeperson")
        modeToggleBtn.textContent = 'Người'
    } else {
        document.body.classList.remove('modetime')
        modeToggleBtn.setAttribute('id', "modetime")
        modeToggleBtn.textContent = 'Thời gian'
    }
    localStorage.setItem('mode', mode)
}

modeToggleBtn.addEventListener('click', toggleMode);


function addRowEventListeners() {
    document.querySelectorAll('#tableFemale tr:not(:first-child), #tableMale tr:not(:first-child)').forEach(row => {
        row.addEventListener('click', function() {

            const firstCellText = row.cells[0].textContent
            const currentMode = localStorage.getItem('mode')
            if (currentMode === 'modeperson') {
                const storedItems = localStorage.getItem('person')
                let itemsArray = storedItems ? JSON.parse(storedItems) : []
                const newItem = { name: firstCellText, st: "0", en:"0" }
                const isIdExists = itemsArray.some(item => item.name === newItem.name)

                    if (!isIdExists) {
                        itemsArray.push(newItem);
                        const updatedItemsJSON = JSON.stringify(itemsArray)
                        localStorage.setItem('person', updatedItemsJSON)
                    }
            }
            if(currentMode === 'modetime'){
                const storedItems = localStorage.getItem('time')
                let itemsArray = storedItems ? JSON.parse(storedItems) : []
                const stvl = document.getElementById("modetime1").value
                const envl = document.getElementById("modetime2").value
                const newItem = { name: firstCellText, st: stvl, en: envl }
                const isIdExists = itemsArray.some(item => item.name === newItem.name)
                    if (!isIdExists) {
                        itemsArray.push(newItem);
                        const updatedItemsJSON = JSON.stringify(itemsArray)
                        localStorage.setItem('time', updatedItemsJSON)
                    }
            }

            displayItems()
        });
    });
}

const observer = new MutationObserver(() => {
    addRowEventListeners()
});

observer.observe(document.getElementById('tableschedules'), { childList: true, subtree: true })

function displaymode(){
    const currentMode = localStorage.getItem('mode');
    const container = document.getElementById('createmode')
    container.innerHTML = ''
    if (currentMode == "modetime"){
        const input1 = document.createElement("input")
        input1.setAttribute("type", "number")
        input1.setAttribute("id", "modetime1")
        input1.setAttribute("min", "0")
        input1.setAttribute("max", "24")
        const input2 = document.createElement("input")
        input2.setAttribute("type", "number")
        input2.setAttribute("id", "modetime2")
        input2.setAttribute("min", "0")
        input2.setAttribute("max", "24")
        container.appendChild(input1)
        container.appendChild(input2)
    }
    displayItems()
}
function displayItems() {
    const container = document.getElementById('createshedules')
    container.innerHTML = ''
    const Modeperson = localStorage.getItem('person')
    const Modetime = localStorage.getItem('time')
    let personArray = Modeperson ? JSON.parse(Modeperson) : []
    let timeArray = Modetime ? JSON.parse(Modetime) : []

    personArray.forEach( per => {
        const div = document.createElement("div")
            div.setAttribute("class", "modeperson")
            div.innerHTML = `
                <p>${per.name}</p>
                <input type ="number" class="stInput" value ="${per.st}" min="0" max="24">
                <input type ="number" class="enInput" value ="${per.en}" min="0" max="24">
                <button data-key="person" data-name="${per.name}">Xóa</button>
            `
            
            container.appendChild(div)

            const stInput = div.querySelector('.stInput');
            const enInput = div.querySelector('.enInput');
            stInput.addEventListener('blur', () => {
                updateItem("person", per.name, stInput.value, enInput.value)
            })

            enInput.addEventListener('blur', () => {
                updateItem("person", per.name, stInput.value, enInput.value)
            })
    })

    timeArray.forEach(time => {
        const div = document.createElement("div")

        div.setAttribute("class", "modetime")
        div.innerHTML = `
        <p>${time.name}: ${time.st} - ${time.en}</p>
        <button data-key="time" data-name="${time.name}">Xóa</button>
        `
        container.appendChild(div)
    })
}
document.getElementById('createshedules').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const key = event.target.getAttribute('data-key')
        const name = event.target.getAttribute('data-name')
        deletelocal(key,name)
        displayItems()
    }
})

function deletelocal(key, name){
    const storedItems = localStorage.getItem(key)
    let itemsArray =storedItems ? JSON.parse(storedItems) : []
    itemsArray = itemsArray.filter(item => item.name !== name)
    localStorage.setItem(key, JSON.stringify(itemsArray))
}
function updateItem(key, name, newSt, newEn) {
    const storedItems = localStorage.getItem(key)
    let itemsArray =storedItems ? JSON.parse(storedItems) : []
    itemsArray.forEach(item => {
        if (item.name === name) {
          item.st = newSt
          item.en = newEn
        }
      })
    localStorage.setItem(key, JSON.stringify(itemsArray))
}
var modal = document.getElementById("myModal")
var btn = document.getElementById("openModalBtn")
var span = document.getElementById("close")
var divschedule = document.getElementById("displayschedule")

btn.onclick = function() {
    const divcontent = document.getElementById("displayschedule")
    divcontent.innerHTML = ``
    const getdatesche = document.getElementById("dayschedule").value

    const Modeperson = localStorage.getItem('person')
    const Modetime = localStorage.getItem('time')
    let personArray = JSON.parse(Modeperson)
    let timeArray = JSON.parse(Modetime)

    const displayday = document.createElement("h3")
    displayday.textContent = `Lịch làm ngày ${formatDate(getdatesche)}`
    divcontent.appendChild(displayday)
    personArray.forEach(person =>{
        const div = document.createElement("div")
            div.innerHTML = `
            <p>${person.name} : ${person.st}h - ${person.en}h
            `
        divcontent.appendChild(div)
    })
    timeArray.forEach(time =>{
        const div = document.createElement("div")
        div.innerHTML = `
        <p>${time.name} : ${time.st}h - ${time.en}h
        `
        divcontent.appendChild(div)
    })

    modal.style.display = "block"
}
span.onclick = function() {
    modal.style.display = "none"
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}
function formatDate(dateString) {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)

    return `${day}/${month}/${year}`
}
const minisize = document.getElementById("minisize")

minisize.onclick = function() {
    const dis = document.getElementById("displaycreate")
    if(dis.style.display === "none"){
        dis.style.display = "block"
        minisize.innerHTML = `&minus;`
    }
    else {
        dis.style.display = "none"
        minisize.innerHTML = "&lArr;"
    }
}
