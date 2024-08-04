import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore,  collection, getDocs, addDoc, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVF77T6TcOjpvO6fIeXgvEmuBLAqFyf1k",
    authDomain: "data-ddc19.firebaseapp.com",
    projectId: "data-ddc19",
    storageBucket: "data-ddc19.appspot.com",
    messagingSenderId: "485174947848",
    appId: "1:485174947848:web:f7e76e9b9267aaa4b7a1bd",
    measurementId: "G-WT1BSW6587"
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


const currentDate = new Date()
const displayDate = 7 // Days display

function createTabday(){
    var tab = document.getElementById("tabdays")
    for (let index = 0; index < displayDate; index++) {
        const day = new Date(currentDate)
        day.setDate(currentDate.getDate() + index)
        const tabday = document.createElement("a")
        tabday.setAttribute('id', index)
        tabday.textContent = day.toLocaleDateString()
        tab.appendChild(tabday)
    }
    const t = document.getElementById("gender")

}

async function querydatatime(queryday) {
    const times = 17
    //const querytimestart = document.getElementById("timestart").value //7 - 20
    //const querytimeend = document.getElementById("timeend").value // 10 -23
    const querygender = document.getElementById("gender").value // all / female / male

    const tableFemale = document.getElementById("tableFemale")
    const tableMale = document.getElementById("tableMale")

    const removeFemale = document.querySelectorAll('.classmember')
                removeFemale.forEach(element => {
                    element.remove();
                })
    if((querygender == "all") || (querygender == "female")){
        const queryDataFemale = await getDocs(collection(db, "Datafemale"));
            queryDataFemale.forEach(async (female) => {
                const trFemale = document.createElement("tr")
                    trFemale.setAttribute('class', "classmember")
                const tdFemale = document.createElement("td")
                    tdFemale.textContent = female.data().name
                trFemale.appendChild(tdFemale)

                const querydataday = await getDoc(doc(db,"Datafemale", female.id, "schedules", queryday ))
                var timestart1 = 7, timestart2 = 0
                var timeend1 = 23, timeend2 = 0
                
                if(querydataday.data().start1 > 7){
                    timestart1 = querydataday.data().start1
                }
                if(querydataday.data().end1 <= 23){
                    if(querydataday.data().end1 == 0){
                        timeend1 = 23
                    }
                    else{
                    timeend1 = querydataday.data().end1
                    }
                }
                if(timeend1 <8){
                    timeend1 = 7
                }
                if(querydataday.data().more == true){
                    if(querydataday.data().start2 > 7){
                        timestart2 = querydataday.data().start2
                    }
                    if(querydataday.data().end2 <= 23){
                        if(querydataday.data().end2 == 0){
                            timeend2 = 23
                        }
                        else{
                        timeend2 = querydataday.data().end2
                        }
                    }
                    if(timeend2 <8){
                        timeend2 = 7
                    }

                }

                
                for (let index = 0; index < times; index++) {
                    const td = document.createElement('td')
                    if (querydataday.data().off == false){
                        if((timestart1 - 7 == index) && (timeend1 - 7 > index)){
                            td.setAttribute("class", "canwork")
                            ++timestart1
                        }
                        if(querydataday.data().more == true){
                            if((timestart2 - 7 == index) && (timeend2 - 7 > index)){
                                td.setAttribute("class", "canwork")
                                ++timestart2
                            }
                        }
                    }
                    else{
                        td.setAttribute("class", "cantwork")
                    }
                    trFemale.appendChild(td)
                    
                }
                tableFemale.appendChild(trFemale)
            });
    }

    if((querygender == "all") || (querygender == "male")){
        const queryDataMale = await getDocs(collection(db, "Datamale"));
            queryDataMale.forEach(async (male) => {
                const trMale = document.createElement("tr")
                    trMale.setAttribute('class', "classmember")
                const tdMale = document.createElement("td")
                    tdMale.textContent = male.data().name
                trMale.appendChild(tdMale)

                const querydataday = await getDoc(doc(db,"Datamale", male.id, "schedules", queryday ))
                var timestart1 = 7, timestart2 = 0
                var timeend1 = 23, timeend2 = 0
                
                if(querydataday.data().start1 > 7){
                    timestart1 = querydataday.data().start1
                }
                if(querydataday.data().end1 <= 23){
                    if(querydataday.data().end1 == 0){
                        timeend1 = 23
                    }
                    else{
                    timeend1 = querydataday.data().end1
                    }
                }
                if(timeend1 <8){
                    timeend1 = 7
                }
                if(querydataday.data().more == true){
                    if(querydataday.data().start2 > 7){
                        timestart2 = querydataday.data().start2
                    }
                    if(querydataday.data().end2 <= 23){
                        if(querydataday.data().end2 == 0){
                            timeend2 = 23
                        }
                        else{
                        timeend2 = querydataday.data().end2
                        }
                    }
                    if(timeend2 <8){
                        timeend2 = 7
                    }

                }

                
                for (let index = 0; index < times; index++) {
                    const td = document.createElement('td')
                    if (querydataday.data().off == false){
                        if((timestart1 - 7 == index) && (timeend1 - 7 > index)){
                            td.setAttribute("class", "canwork")
                            ++timestart1
                        }
                        if(querydataday.data().more == true){
                            if((timestart2 - 7 == index) && (timeend2 - 7 > index)){
                                td.setAttribute("class", "canwork")
                                ++timestart2
                            }
                        }
                    }
                    else{
                        td.setAttribute("class", "cantwork")
                    }
                    trMale.appendChild(td)
                    
                }
                tableMale.appendChild(trMale)
            });
    }
}

window.queryclick = async function queryclick() {
    const tab = document.querySelector('.tabdays a.active');
    querydatatime(tab.id)
}


createTabday()


const tabs = document.querySelectorAll('.tabdays a')
    const tabContent = document.getElementById('1010')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'))
            
            tab.classList.add('active')

            querydatatime(tab.id)
        });
    });

tabs[0].click()
