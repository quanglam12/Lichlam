    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
    import { getFirestore,  collection, getDocs, addDoc, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBVF77T6TcOjpvO6fIeXgvEmuBLAqFyf1k",
      authDomain: "data-ddc19.firebaseapp.com",
      projectId: "data-ddc19",
      storageBucket: "data-ddc19.appspot.com",
      messagingSenderId: "485174947848",
      appId: "1:485174947848:web:f7e76e9b9267aaa4b7a1bd",
      measurementId: "G-WT1BSW6587"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

async function getDataFemale() {
const querySnapshot = await getDocs(collection(db, "Datafemale"));
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
});
}   

async function getDataMale() {
    const querySnapshot = await getDocs(collection(db, "Datamale"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}   

async function addFemale(userID, ten) {
    try {
      const docRef = await setDoc(doc(db, "Datafemale", userID), {
        name: ten,
      });
      console.log("Document written with ID: ", userID);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

async function adddateFemale(userID, day) {
  try {
    const docRef = await setDoc(doc(collection(doc(db, "Datafemale", userID), "schedules"), day), {
      more : false,
      start1 : 7,
      start2: 0,
      end1: 15,
      end2: 0
    });
    console.log("Document written with ID: ", userID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }

async function newFemale(userID, ten){
    const check = await getDoc(doc(db,"Datafemale", userID))
    if (check.exists()){
        alert("ID đã tồn tại")
        return

    }
  

    await setDoc(doc(db,"Datafemale", userID), {
        name: ten
    })
    for (let index = 0; index < displayDate; index++) {
        await setDoc(doc(db, "Datafemale", userID, "schedules", index.toString()), {
            more: false,
            off:false,
            start1: 0,
            start2: 0,
            end1: 0,
            end2: 0
        })
    }
      
}

async function newMale(userID, ten){
    const check = await getDoc(doc(db,"Datamale", userID))
    if (check.exists()){
        alert("ID đã tồn tại")
        return

    }
  

    await setDoc(doc(db,"Datamale", userID), {
        name: ten
    })
    for (let index = 0; index < displayDate; index++) {
        await setDoc(doc(db, "Datamale", userID, "schedules", index.toString()), {
            more: false,
            off: false,
            start1: 0,
            start2: 0,
            end1: 0,
            end2: 0
        })
    }
      
}



  // **************************************************************************************************HTML*****************************************************************************************************************************************
    const currentDate = new Date()
    const displayDate = 7 // Days display

window.createTable = async function createTable(){
        const table = document.createElement('table') //Tạo bảng
            table.setAttribute('id', "table-schedules")
    
        const thead = document.createElement('thead') // Ngày tháng năm
            thead.setAttribute('id', 'headRow')
            const headerRow = document.createElement('tr')
            const headth = document.createElement('th')
                headth.textContent = 'Ngày'
                headerRow.appendChild(headth)
    
                for (let index = 0; index < displayDate; index++) {
                    const iDate = new Date(currentDate);
                    iDate.setDate(currentDate.getDate() + index)
                    const th = document.createElement('th')
                    th.setAttribute("id",index)
                    const dayOfWeek = iDate.getDay()
                    const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]

                    const dateDiv = document.createElement('div')                
                    dateDiv.textContent = iDate.toLocaleDateString()

                    const dayDiv = document.createElement('div')
                    const em = document.createElement('em')
                    em.textContent = dayNames[dayOfWeek]
                    dayDiv.appendChild(em)
                    th.appendChild(dateDiv)
                    th.appendChild(dayDiv)
                    headerRow.appendChild(th)
                    
                }
    
        const tbodyFemale = document.createElement('tbody')
            tbodyFemale.setAttribute('class', 'table-bodyFemale')
            const FemaleRow = document.createElement('tr')
            const Femaleth = document.createElement('th')
                Femaleth.setAttribute('class',"femalerow")
                Femaleth.setAttribute('colspan',displayDate + 1)
                Femaleth.textContent = "Female"
                FemaleRow.appendChild(Femaleth)
                tbodyFemale.appendChild(FemaleRow)

                const getnameFemale = await getDocs(collection(db, "Datafemale"));
        
        const schedulesPromisesF = getnameFemale.docs.map(docuser => 
            getDocs(collection(db, "Datafemale", docuser.id, "schedules"))
                .then(querySnapshot => ({
                    id: docuser.id,
                    name: docuser.data().name,
                    schedules: querySnapshot.docs.map(docday => ({
                        id: docday.id,
                        ...docday.data()
                    }))
                }))
        )

        const schedulesDataF = await Promise.all(schedulesPromisesF)

        const rowsHtmlF = schedulesDataF.map(({ id, name, schedules }) => {
            const scheduleHtml = schedules.map(({ id: scheduleId, start1, end1, start2, end2, more, off }) => {
                const buttonFClass = more ? "-" : "+"
                const buttonFText = more ? "-" : "+"
                const buttonFOffText = off ? "On" : "Off"
                const buttonFOffClass = off ? "off" : ""

                return `
                    <th id="${id}-${scheduleId}">
                        <div>
                            <input type="time" value="${inttotime(start1)}">
                            <span> - </span>
                            <input type="time" value="${inttotime(end1)}">
                        </div>
                        ${more ? `
                            <div>
                                <input type="time" value="${inttotime(start2)}">
                                <span> - </span>
                                <input type="time" value="${inttotime(end2)}">
                            </div>
                        ` : ''}
                        <button id="B-${scheduleId}-${id}" onclick="changemore(this.id)">${buttonFText}</button>
                        <button id="Off-${scheduleId}-${id}" class="${buttonFOffClass}" onclick="changeoff(this.id)">${buttonFOffText}</button>
                    </th>
                `;
            }).join('');

            return `
                <tr id="${id}">
                    <th class="name">
                        ${name}
                        <button id="B-${id}" onclick="saveschedule(this.id)">Lưu</button>
                    </th>
                    ${scheduleHtml}
                </tr>
            `;
        }).join('');

                tbodyFemale.innerHTML = rowsHtmlF;
    
                
    
    
        const tbodyMale = document.createElement('tbody')
            tbodyMale.setAttribute('class', 'table-bodyMale')
            const MaleRow = document.createElement('tr')
            const Maleth = document.createElement('th')
                Maleth.setAttribute('class',"malerow")
                Maleth.setAttribute('colspan',displayDate + 1)
                Maleth.textContent = "Male"
                MaleRow.appendChild(Maleth)
                tbodyMale.appendChild(MaleRow)

                const getnameMale = await getDocs(collection(db, "Datamale"));
                const schedulesPromisesM = getnameMale.docs.map(docuser => 
                    getDocs(collection(db, "Datamale", docuser.id, "schedules"))
                        .then(querySnapshot => ({
                            id: docuser.id,
                            name: docuser.data().name,
                            schedules: querySnapshot.docs.map(docday => ({
                                id: docday.id,
                                ...docday.data()
                            }))
                        }))
                );
        
                const schedulesDataM = await Promise.all(schedulesPromisesM);
        
                const rowsHtmlM = schedulesDataM.map(({ id, name, schedules }) => {
                    const scheduleHtml = schedules.map(({ id: scheduleId, start1, end1, start2, end2, more, off }) => {
                        const buttonFClass = more ? "-" : "+"
                        const buttonFText = more ? "-" : "+"
                        const buttonFOffText = off ? "On" : "Off"
                        const buttonFOffClass = off ? "off" : ""
        
                        return `
                            <th id="${id}-${scheduleId}">
                                <div>
                                    <input type="time" value="${inttotime(start1)}">
                                    <span> - </span>
                                    <input type="time" value="${inttotime(end1)}">
                                </div>
                                ${more ? `
                                    <div>
                                        <input type="time" value="${inttotime(start2)}">
                                        <span> - </span>
                                        <input type="time" value="${inttotime(end2)}">
                                    </div>
                                ` : ''}
                                <button id="B-${scheduleId}-${id}" onclick="changemore(this.id)">${buttonFText}</button>
                                <button id="Off-${scheduleId}-${id}" class="${buttonFOffClass}" onclick="changeoff(this.id)">${buttonFOffText}</button>
                            </th>
                        `;
                    }).join('');
        
                    return `
                        <tr id="${id}">
                            <th class="name">
                                ${name}
                                <button id="B-${id}" onclick="saveschedule(this.id)">Lưu</button>
                            </th>
                            ${scheduleHtml}
                        </tr>
                    `;
                }).join('');
        
                tbodyMale.innerHTML = rowsHtmlM
            
    
        thead.appendChild(headerRow)
    
        table.appendChild(thead)
        table.appendChild(tbodyFemale)
        table.appendChild(tbodyMale)
    
        const addtable = document.getElementById("table")
        addtable.appendChild(table)
    }
    
    function inttotime(inttime){
        const time = `${inttime < 10 ? '0' : ''}${inttime}:00`
    return time
    }
    
    function timetoint(time){
        const hour = parseInt(time.split(":")[0], 10)
    return hour
    }
window.changemore = async function changemore(buttonid){
    var info = buttonid.split('-')
    const but = document.getElementById(buttonid)
    var checkFM
    if (info[2] < 100){
        checkFM = "Datafemale"
    }
    else {
        checkFM = "Datamale"
    }

    const querydays = await getDocs(collection(doc(db, checkFM, info[2]), "schedules"))
    const getday = querydays.docs[info[1]]


    if (getday.data().more == true){
         but.textContent = "+"
        await updateDoc(doc(db, checkFM, info[2], "schedules", getday.id),{
            more : false
        })
       
    }
    else {
        but.textContent = "-"
        await updateDoc(doc(db, checkFM, info[2], "schedules", getday.id), {
            more : true
        })
        
    }
}

window.saveschedule = async function saveschedule(saveid){
    var sid = saveid.split('-')
    var checkFM
    if (sid[1] < 100){
        checkFM = "Datafemale"
    }
    else {
        checkFM = "Datamale"
    }
    for (let index = 0; index < displayDate; index++) {
        const dayschedule = document.getElementById(sid[1] + "-" + index)
        const input = dayschedule.getElementsByTagName("input")
        if(input.length < 3){

            await updateDoc(doc(db, checkFM, sid[1], "schedules", index.toString()),{
                start1 : timetoint(input[0].value),
                end1 : timetoint(input[1].value)
            })
        }
        else {
            await updateDoc(doc(db, checkFM, sid[1], "schedules", index.toString()),{
                start1 : timetoint(input[0].value),
                end1 : timetoint(input[1].value),
                start2 : timetoint(input[2].value),
                end2 : timetoint(input[3].value)
            })
        }
        
    }
    const name = await getDoc(doc(db, checkFM, sid[1]))
    alert("Đã lưu lịch làm của " + name.data().name)
}

window.changeoff = async function changeoff(buttonID) {
    var info = buttonID.split('-')
    const but = document.getElementById(buttonID)
    var checkFM
    if (info[2] < 100){
        checkFM = "Datafemale"
    }
    else {
        checkFM = "Datamale"
    }
    const querydays = await getDocs(collection(doc(db, checkFM, info[2]), "schedules"))
    const getday = querydays.docs[info[1]]


    if (getday.data().off == true){
         but.textContent = "On"
        await updateDoc(doc(db, checkFM, info[2], "schedules", getday.id),{
            off : false
        })
       
    }
    else {
        but.textContent = "Off"
        but.setAttribute('class', "on")
        await updateDoc(doc(db, checkFM, info[2], "schedules", getday.id), {
            off : true
        })
        
    }
}
