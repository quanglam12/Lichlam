
const currentDate = new Date()
const displayDate = 7 // Days display


function createTable(){
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

            const queryFemale = Backendless.DataQueryBuilder.create()
            queryFemale.setWhereClause("gender = 'female'") 
            //Query condition    
            
            Backendless.Data.of("employees").find(queryFemale)
            .then((employees) => {
                //console.log("Female Employees:", employees);
                employees.forEach(employee => {
                    //console.log(`ID: ${employee.userID}, Name: ${employee.name}, Gender: ${employee.gender}`)
                    const row = document.createElement('tr')
                        row.setAttribute('id', employee.userID)
                    const th = document.createElement('th')
                        th.textContent = employee.name
                        const savebuttonF = document.createElement('button')
                            savebuttonF.textContent = "Lưu"
                            savebuttonF.setAttribute("id", "B" + "-" + employee.userID)
                            savebuttonF.setAttribute('onclick', "saveschedule(this.id)")
                        th.appendChild(savebuttonF)
                        row.appendChild(th)

                            const queryday = Backendless.DataQueryBuilder.create()
                            queryday.setWhereClause(`userID = '${employee.userID}'`)
                            queryday.setSortBy(["day ASC"]);
                            //console.log(employee.userID)
                            Backendless.Data.of("schedules").find(queryday)
                            .then((days) => {
                                //console.log("Days:", days);
                                days.forEach(day => {
                                    const th = document.createElement('th')
                                    th.setAttribute("id", employee.userID + "-" + day.day)

                                    const buttonF = document.createElement('button')
                                    buttonF.setAttribute('id', day.day + "-"+ employee.userID)

                                    const div1 = document.createElement('div')
                                        const timestart1 = document.createElement('input')
                                        timestart1.type = "time"
                                        timestart1.setAttribute("value",inttotime(day.start1))
                                        
                                        const separator = document.createTextNode(" - ")

                                        const timeend1 = document.createElement('input')
                                        timeend1.type = "time"
                                        timeend1.setAttribute("value",inttotime(day.end1))

                                        div1.appendChild(timestart1)
                                        div1.appendChild(separator)
                                        div1.appendChild(timeend1)

                                    th.appendChild(div1)
                                    
                                    if(day.more == true){
                                        const div2 = document.createElement('div')
                                        const timestart2 = document.createElement('input')
                                        timestart2.type = "time"
                                        timestart2.setAttribute("value",inttotime(day.start2))

                                        const separator = document.createTextNode(" - ")

                                        const timeend2 = document.createElement('input')
                                        timeend2.type = "time"
                                        timeend2.setAttribute("value",inttotime(day.end2))

                                        buttonF.textContent = "-"

                                    div2.appendChild(timestart2)
                                    div2.appendChild(separator)
                                    div2.appendChild(timeend2)

                                    th.appendChild(div2)
                                    } else{
                                        buttonF.textContent = "+"
                                    }

                                    
                                    buttonF.setAttribute('onclick', 'changemore(this.id)')
                                    
                                    th.appendChild(buttonF)

                                    row.appendChild(th)
                                });
                            })
                            .catch((error) => {
                                console.error("Error:", error)
                            });
                    tbodyFemale.appendChild(row)
                    });
            })
            .catch((error) => {
                console.error("Error:", error);
            });


    const tbodyMale = document.createElement('tbody')
        tbodyMale.setAttribute('class', 'table-bodyMale')
        const MaleRow = document.createElement('tr')
        const Maleth = document.createElement('th')
            Maleth.setAttribute('class',"malerow")
            Maleth.setAttribute('colspan',displayDate + 1)
            Maleth.textContent = "Male"
            MaleRow.appendChild(Maleth)

        const queryMale = Backendless.DataQueryBuilder.create(); 
        queryMale.setWhereClause("gender = 'male'");       
        //Query condition    
        
        Backendless.Data.of("employees").find(queryMale)
        .then((employees) => {
            //console.log("Male Employees:", employees);
            employees.forEach(employee => {
                //console.log(`ID: ${employee.userID}, Name: ${employee.name}, Gender: ${employee.gender}`);
                const row = document.createElement('tr')
                    row.setAttribute('id', employee.userID)
                const th = document.createElement('th')
                    th.textContent = employee.name
                    const savebuttonM = document.createElement('button')
                            savebuttonM.textContent = "Lưu"
                            savebuttonM.setAttribute("id", "B" + "-" + employee.userID)
                            savebuttonM.setAttribute('onclick', "saveschedule(this.id)")
                    th.appendChild(savebuttonM)
                    row.appendChild(th)

                        const queryday = Backendless.DataQueryBuilder.create(); 
                        queryday.setWhereClause(`userID = '${employee.userID}'`)
                        queryday.setSortBy(["day ASC"]);
                        //console.log(employee.userID)
                        Backendless.Data.of("schedules").find(queryday)
                        .then((days) => {
                            //console.log("Days:", days);
                            days.forEach(day => {
                                const th = document.createElement('th')
                                th.setAttribute("id", employee.userID + "-" + day.day)

                                const buttonF = document.createElement('button')
                                    buttonF.setAttribute('id', day.day + "-"+ employee.userID)
                                
                                const div1 = document.createElement('div')
                                    const timestart1 = document.createElement('input')
                                    timestart1.type = "time"
                                    timestart1.setAttribute("value",inttotime(day.start1))
                                    
                                    const separator = document.createTextNode(" - ")

                                    const timeend1 = document.createElement('input')
                                    timeend1.type = "time"
                                    timeend1.setAttribute("value",inttotime(day.end1))

                                    div1.appendChild(timestart1)
                                    div1.appendChild(separator)
                                    div1.appendChild(timeend1)

                                th.appendChild(div1)
                                
                                if(day.more == true){
                                    const div2 = document.createElement('div')
                                    const timestart2 = document.createElement('input')
                                    timestart2.type = "time"
                                    timestart2.setAttribute("value",inttotime(day.start2))

                                    const separator = document.createTextNode(" - ")

                                    const timeend2 = document.createElement('input')
                                    timeend2.type = "time"
                                    timeend2.setAttribute("value",inttotime(day.end2))

                                    buttonF.textContent = "-"

                                div2.appendChild(timestart2)
                                div2.appendChild(separator)
                                div2.appendChild(timeend2)

                                th.appendChild(div2)
                                } else{
                                    buttonF.textContent = "+"
                                }

                                buttonF.setAttribute('onclick', 'changemore(this.id)')
                                th.appendChild(buttonF)

                                row.appendChild(th)
                            });
                        })
                        .catch((error) => {
                            console.error("Error:", error)
                        });
                tbodyMale.appendChild(row)
                });
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    thead.appendChild(headerRow)
    tbodyFemale.appendChild(FemaleRow)
    tbodyMale.appendChild(MaleRow)

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

function changemore(butid){
    var info = butid.split('-')
    const but = document.getElementById(butid)
    const queryMore = Backendless.DataQueryBuilder.create();
    queryMore.setWhereClause(`userid = ${info[1]} AND day = ${info[0]}`)

    Backendless.Data.of("schedules").find(queryMore)
  .then((employees) => {
   // console.log("Employees found:", employees);

    if (employees.length > 0) {
      employees.forEach(employee => {
        if (employee.more == true){
            employee.more = false
            but.textContent = "+"
        }
        else {
            employee.more = true
            but.textContent = "-"
        }

        
        Backendless.Data.of("schedules").save(employee)
          .then((updatedEmployee) => {
            //console.log("Employee updated:", updatedEmployee);
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
          });
      });
    } else {
      console.log("No employees found with the specified criteria.")
    }
  })
  .catch((error) => {
    console.error("Error fetching employees:", error);
  });
  setTimeout(function() {
    location.reload();
}, 1100);
}

function saveschedule(saveid){
    var sid = saveid.split('-')
    const queryschedule = Backendless.DataQueryBuilder.create();
    queryschedule.setWhereClause(`userid = ${sid[1]}`)
    queryschedule.setSortBy(["day ASC"]);

    Backendless.Data.of("schedules").find(queryschedule)
  .then((employees) => {
    console.log("Employees found:", employees);

    if (employees.length > 0) {
      employees.forEach(employee => {
        
        for (let index = 0; index < displayDate; index++) { 
            const dayschedule = document.getElementById(sid[1] + "-" + index)
            const input = dayschedule.getElementsByTagName("input")
                if(input.length < 3){
                    employee.start1 = timetoint(input[0])
                    employee.end1 = timetoint(input[1])
                }
                else {
                    employee.start1 = timetoint(input[0])
                    employee.end1 = timetoint(input[1])
                    employee.start2 = timetoint(input[2])
                    employee.end2 = timetoint(input[3])
                }
    }
        
        Backendless.Data.of("schedules").save(employee)
          .then((updatedEmployee) => {
            console.log("Employee updated:", updatedEmployee)
          })
          .catch((error) => {
            console.error("Error updating employee:", error)
          });
      });
    } else {
      console.log("No employees found with the specified criteria.")
    }
  })
  .catch((error) => {
    console.error("Error fetching employees:", error)
  });

}

function getData(){
    getDataFemale()
}