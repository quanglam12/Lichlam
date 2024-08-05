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
        const weekDayDiv = document.createElement("div")
            const em = document.createElement("em")
            em.textContent = day.toLocaleDateString('vi-VN', { weekday: 'long' })
            weekDayDiv.appendChild(em)
        tabday.textContent = day.toLocaleDateString()
        tabday.appendChild(weekDayDiv)
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

        const schedulesPromises = queryDataFemale.docs.map(async (female) => {
            const data = female.data();
            const femaleId = female.id;
            const name = data.name;
            
            const scheduleDoc = await getDoc(doc(db, "Datafemale", femaleId, "schedules", queryday));
            const scheduleData = scheduleDoc.data();

            let timestart1 = 7, timestart2 = 0;
            let timeend1 = 23, timeend2 = 0;

            if (scheduleData.start1 > 7) timestart1 = scheduleData.start1;
            if (scheduleData.end1 <= 23) timeend1 = scheduleData.end1 === 0 ? 23 : scheduleData.end1;
            if (timeend1 < 8) timeend1 = 7;
            
            if (scheduleData.more === true) {
                if (scheduleData.start2 > 7) timestart2 = scheduleData.start2;
                if (scheduleData.end2 <= 23) timeend2 = scheduleData.end2 === 0 ? 23 : scheduleData.end2;
                if (timeend2 < 8) timeend2 = 7;
            }

            const tdCells = Array.from({ length: times }, (_, index) => {
                const td = document.createElement('td');
                
                if (scheduleData.off === false) {
                    if ((timestart1 - 7 === index) && (timeend1 - 7 > index)) {
                        td.setAttribute("class", "canwork");
                        ++timestart1;
                    }
                    if (scheduleData.more === true) {
                        if ((timestart2 - 7 === index) && (timeend2 - 7 > index)) {
                            td.setAttribute("class", "canwork");
                            ++timestart2;
                        }
                    }
                } else {
                    td.setAttribute("class", "cantwork");
                }

                return td.outerHTML;
            }).join('');

            return `
                <tr class="classmember">
                    <td>${name}</td>
                    ${tdCells}
                </tr>
            `;
        });

        const rowsHtml = (await Promise.all(schedulesPromises)).join('');

        tableFemale.innerHTML += rowsHtml;
    }

    if((querygender == "all") || (querygender == "male")){
        const queryDataMale = await getDocs(collection(db, "Datamale"));

        const schedulesPromises = queryDataMale.docs.map(async (male) => {
            const data = male.data();
            const maleId = male.id;
            const name = data.name;
            
            const scheduleDoc = await getDoc(doc(db, "Datamale", maleId, "schedules", queryday));
            const scheduleData = scheduleDoc.data();

            let timestart1 = 7, timestart2 = 0;
            let timeend1 = 23, timeend2 = 0;

            if (scheduleData.start1 > 7) timestart1 = scheduleData.start1;
            if (scheduleData.end1 <= 23) timeend1 = scheduleData.end1 === 0 ? 23 : scheduleData.end1;
            if (timeend1 < 8) timeend1 = 7;
            
            if (scheduleData.more === true) {
                if (scheduleData.start2 > 7) timestart2 = scheduleData.start2;
                if (scheduleData.end2 <= 23) timeend2 = scheduleData.end2 === 0 ? 23 : scheduleData.end2;
                if (timeend2 < 8) timeend2 = 7;
            }

            const tdCells = Array.from({ length: times }, (_, index) => {
                const td = document.createElement('td');
                
                if (scheduleData.off === false) {
                    if ((timestart1 - 7 === index) && (timeend1 - 7 > index)) {
                        td.setAttribute("class", "canwork");
                        ++timestart1;
                    }
                    if (scheduleData.more === true) {
                        if ((timestart2 - 7 === index) && (timeend2 - 7 > index)) {
                            td.setAttribute("class", "canwork");
                            ++timestart2;
                        }
                    }
                } else {
                    td.setAttribute("class", "cantwork");
                }

                return td.outerHTML;
            }).join('');

            return `
                <tr class="classmember">
                    <td>${name}</td>
                    ${tdCells}
                </tr>
            `;
        });

        const rowsHtml = (await Promise.all(schedulesPromises)).join('');

        tableMale.innerHTML += rowsHtml;
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
