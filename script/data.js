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
            thead.setAttribute('class', 'headRow')
            const headerRow = document.createElement('tr')
            const headth = document.createElement('th')
                headth.textContent = 'Ngày'
                headerRow.appendChild(headth)
    
                for (let index = 0; index < displayDate; index++) {
                    const iDate = new Date(currentDate);
                    iDate.setDate(currentDate.getDate() + index)
                    const th = document.createElement('th')
                    th.setAttribute("id",index)
                    th.textContent = iDate.toLocaleDateString()
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

            const getnameFemale = await getDocs(collection(db, "Datafemale"))
                getnameFemale.forEach(async(docuser) => {
                    const name = docuser.data().name
                    const id = docuser.id
                    const row = document.createElement('tr')
                        row.setAttribute('id', id)
                    const th = document.createElement('th')
                        th.setAttribute('class', "name")
                        th.textContent = name
                        const savebuttonF = document.createElement('button')
                        savebuttonF.textContent = "Lưu"
                        savebuttonF.setAttribute("id", "B" + "-" + id)
                        savebuttonF.setAttribute('onclick', "saveschedule(this.id)")
                    
                    th.appendChild(savebuttonF)
                    row.appendChild(th)
                    
                    const queryday = await getDocs(collection(doc(db, "Datafemale", id), "schedules"))
                    queryday.forEach((docday) => {
                        const date = docday.data()
                        const th = document.createElement('th')
                            th.setAttribute("id", id + "-" + docday.id)

                        const buttonF = document.createElement('button')
                            buttonF.setAttribute('id',"B-" + docday.id + "-"+ id)
                            buttonF.setAttribute('onclick', 'changemore(this.id)')
                        const buttonFoff = document.createElement('button')
                            buttonFoff.setAttribute("id", "Off" + "-" + docday.id + "-" + id)
                            buttonFoff.setAttribute('onclick', 'changeoff(this.id)')

                        if (date.off == true){
                            buttonFoff.textContent = "On"
                            buttonFoff.setAttribute("class", "off")
                        }
                        else {
                            buttonFoff.textContent = "Off"
                        }

                        const div1 = document.createElement('div')

                        const timestart1 = document.createElement('input')
                            timestart1.type = "time"
                            timestart1.setAttribute("value",inttotime(date.start1))
                        
                        const separator = document.createTextNode(" - ")

                        const timeend1 = document.createElement('input')
                            timeend1.type = "time"
                            timeend1.setAttribute("value",inttotime(date.end1))

                        div1.appendChild(timestart1)
                        div1.appendChild(separator)
                        div1.appendChild(timeend1)
                        th.appendChild(div1)

                        if(date.more == true){
                            const div2 = document.createElement('div')
                            const timestart2 = document.createElement('input')
                            timestart2.type = "time"
                            timestart2.setAttribute("value",inttotime(date.start2))

                            const separator = document.createTextNode(" - ")

                            const timeend2 = document.createElement('input')
                            timeend2.type = "time"
                            timeend2.setAttribute("value",inttotime(date.end2))

                            buttonF.textContent = "-"

                        div2.appendChild(timestart2)
                        div2.appendChild(separator)
                        div2.appendChild(timeend2)

                        th.appendChild(div2)
                        } else{
                            buttonF.textContent = "+"
                        }
                   
                    th.appendChild(buttonF)
                    th.appendChild(buttonFoff)
                    row.appendChild(th)
                    })
                    
                    tbodyFemale.appendChild(row)
                  })
    
                
    
    
        const tbodyMale = document.createElement('tbody')
            tbodyMale.setAttribute('class', 'table-bodyMale')
            const MaleRow = document.createElement('tr')
            const Maleth = document.createElement('th')
                Maleth.setAttribute('class',"malerow")
                Maleth.setAttribute('colspan',displayDate + 1)
                Maleth.textContent = "Male"
                MaleRow.appendChild(Maleth)
                tbodyMale.appendChild(MaleRow)

            const getnameMale = await getDocs(collection(db, "Datamale"))
            getnameMale.forEach(async(docuser) => {
                const name = docuser.data().name
                const id = docuser.id
                const row = document.createElement('tr')
                    row.setAttribute('id', id)
                const th = document.createElement('th')
                    th.setAttribute('class', "name")
                    th.textContent = name
                    const savebuttonF = document.createElement('button')
                    savebuttonF.textContent = "Lưu"
                    savebuttonF.setAttribute("id", "B" + "-" + id)
                    savebuttonF.setAttribute('onclick', "saveschedule(this.id)")
                
                th.appendChild(savebuttonF)
                row.appendChild(th)
                
                const queryday = await getDocs(collection(doc(db, "Datamale", id), "schedules"))
                queryday.forEach((docday) => {
                    const date = docday.data()
                    const th = document.createElement('th')
                        th.setAttribute("id", id + "-" + docday.id)

                    const buttonF = document.createElement('button')
                        buttonF.setAttribute('id',"B-" + docday.id + "-"+ id)
                        buttonF.setAttribute('onclick', 'changemore(this.id)')
                    const buttonMoff = document.createElement('button')
                    buttonMoff.setAttribute("id", "Off" + "-"+ docday.id + "-" + id)
                    buttonMoff.setAttribute('onclick', 'changeoff(this.id)')

                    if (date.off == true){
                        buttonMoff.textContent = "On"
                        buttonMoff.setAttribute("class", "off")
                    }
                    else {
                        buttonMoff.textContent = "Off"
                    }

                    const div1 = document.createElement('div')

                    const timestart1 = document.createElement('input')
                        timestart1.type = "time"
                        timestart1.setAttribute("value",inttotime(date.start1))
                    
                    const separator = document.createTextNode(" - ")

                    const timeend1 = document.createElement('input')
                        timeend1.type = "time"
                        timeend1.setAttribute("value",inttotime(date.end1))

                    div1.appendChild(timestart1)
                    div1.appendChild(separator)
                    div1.appendChild(timeend1)
                    th.appendChild(div1)

                    if(date.more == true){
                        const div2 = document.createElement('div')
                        const timestart2 = document.createElement('input')
                        timestart2.type = "time"
                        timestart2.setAttribute("value",inttotime(date.start2))

                        const separator = document.createTextNode(" - ")

                        const timeend2 = document.createElement('input')
                        timeend2.type = "time"
                        timeend2.setAttribute("value",inttotime(date.end2))

                        buttonF.textContent = "-"

                    div2.appendChild(timestart2)
                    div2.appendChild(separator)
                    div2.appendChild(timeend2)

                    th.appendChild(div2)
                    } else{
                        buttonF.textContent = "+"
                    }

                
                th.appendChild(buttonF)
                th.appendChild(buttonMoff)
                row.appendChild(th)
                })
                tbodyMale.appendChild(row)
                })
    
            
    
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
    console.log(getday.id)


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
    location.reload()
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
            console.log(dayschedule)
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
    location.reload()
}
