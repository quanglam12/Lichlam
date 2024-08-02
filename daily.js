
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
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function autochangeday(){
  const queryfemale = await getDocs(collection(db, "Datafemale"));
  for (const female of queryfemale.docs){
    
    for (let index = 0; index < 6; index++) {
      const nextday = index + 1;
      const queryid = await getDoc(doc(db,"Datafemale", female.id, "schedules", nextday.toString()))

      await updateDoc(doc(db, "Datafemale", female.id, "schedules", index.toString()),{
        start1 : queryid.data().start1,
        end1 : queryid.data().end1,
        more : queryid.data().more,
        start2 : queryid.data().start2,
        end2 : queryid.data().end2
    })
    }

    await updateDoc(doc(db, "Datafemale", female.id, "schedules", "6"),{
      start1 : 0,
      end1 : 0,
      more : false,
      start2 : 0,
      end2 : 0
  })
    
  }

  const querymale = await getDocs(collection(db, "Datamale"));
  for (const male of querymale.docs){
    
    for (let index = 0; index < 6; index++) {
      const nextday = index + 1;
      const queryid = await getDoc(doc(db,"Datamale", male.id, "schedules", nextday.toString()))

      await updateDoc(doc(db, "Datamale", male.id, "schedules", index.toString()),{
        start1 : queryid.data().start1,
        end1 : queryid.data().end1,
        more : queryid.data().more,
        start2 : queryid.data().start2,
        end2 : queryid.data().end2
    })
    }

    await updateDoc(doc(db, "Datamale", male.id, "schedules", "6"),{
      start1 : 0,
      end1 : 0,
      more : false,
      start2 : 0,
      end2 : 0
  })
    
  }

}

autochangeday()
