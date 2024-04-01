import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={
    databaseURL:"https://we-are-the-champions-627b0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")
const endorseInput = document.getElementById("endorse-input")
const publishButton = document.getElementById("publish-button")
const endorseContainer = document.getElementById("endorsements-container")
const fromInput = document.getElementById("from-input")
const toInput = document.getElementById("to-input")


//Okay so imma try a new method
publishButton.addEventListener("click",function(){
    if(endorseInput.value && fromInput.value && toInput.value){
        let endorseData = {
            from: fromInput.value,
            to: toInput.value,
            endorsement:endorseInput.value

        } ///we created and object here
        push(endorsementListInDB,endorseData)//HERE WE PUSH THE OBJECT
        endorseInput.value = ""
        fromInput.value=""
        toInput.value = ""
        
    }

})

onValue(endorsementListInDB,function(snapshot){
    if(snapshot.exists()){
        let endorseArrays = Object.entries(snapshot.val())
        console.log(endorseArrays)
        clearEndorseContainer()

        for (let i = 0; i < endorseArrays.length; i++) {
            let currentEndorse = endorseArrays[i]
            console.log(endorseArrays[i])
            //This is very interesting endorseArray[i] will give méthe current array
            //that current array is structured like this:
        /*
        [the id, {The object with endorsement, from, and to}]
        
        */
            createBoxes(currentEndorse)
        }
        
    } else{
        endorseContainer.innerHTML="nothing yet"
    }
})

function clearEndorseContainer(){
    endorseContainer.innerHTML= ""
}
function createBoxes(endorsement){
    let endorseId= endorsement[0] //the id
    let endorseValue = endorsement[1] //the object cotaining the 3 values we need
    let fullBox = document.createElement("div")
    fullBox.classList.add("fullbox-class")
    endorseContainer.append(fullBox)
    let fullBoxP = document.createElement("p")
    fullBoxP.classList.add("endorseP-class")
    let fullBoxDelete = document.createElement("button")
    fullBoxDelete.classList.add("delete-buttonClass")
    let bottomOfBox= document.createElement("div")
    bottomOfBox.classList.add("bottom-sec")

    let fullBoxTo = document.createElement("h3")
    fullBoxTo.textContent = `To: ${endorseValue.to}`

    let fullBoxFrom = document.createElement("h3")
    fullBoxFrom.textContent = `From: ${endorseValue.from}`
console.log("WE ARE HERE",fullBox.textContent)

    fullBoxDelete.textContent= "X"
    fullBoxDelete.addEventListener("click",function(){
        let exactLocationOfEndorseID = ref(database,`endorsements/${endorseId}`)
        remove(exactLocationOfEndorseID)
    })
    fullBoxP.textContent = endorseValue.endorsement
    fullBox.append(fullBoxTo,fullBoxP,bottomOfBox)
    bottomOfBox.append(fullBoxFrom,fullBoxDelete)
  
    
}

