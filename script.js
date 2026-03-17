const appContainer = document.querySelector('.app-container')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressValue = document.querySelector('.progress-value')
const addGoalBtn = document.querySelector(".btn")
const deleteButton=document.querySelectorAll(".delete")

const allQuotes = [
  'Raise the bar by completing your goals',
  'Well begun is half done',
  'Just a step away, keep going',
  'Whoa! You just completed all the goals, time for chill dude'
]

// YOU SHOULD Load stored goals..
const allGoals = JSON.parse(localStorage.getItem('DATA')) || {}


// -----------------PROGRESS-BAR  LOGIC

function updateProgress(){

  const totalInputs = document.querySelectorAll('.goal-input').length
  const completedGoalsCount =
  Object.values(allGoals).filter(goal => goal.completed).length

  progressValue.style.width =
  `${(completedGoalsCount/totalInputs) * 100}%`

  progressValue.firstElementChild.innerText =
  `${completedGoalsCount}/${totalInputs} completed`


const progressPercent = (completedGoalsCount/totalInputs) * 100

if(progressPercent === 100){
  progressLabel.innerText = allQuotes[3]
}
else if(progressPercent >= 70){
  progressLabel.innerText = allQuotes[2]
}
else if(progressPercent >= 30){
  progressLabel.innerText = allQuotes[1]
}
else{
  progressLabel.innerText = allQuotes[0]
}

}


appContainer.addEventListener('focusin', function(e){

  if(e.target.classList.contains('goal-input')){
    errorLabel.style.visibility = 'hidden'
  }

})


//------------------------------CHECKBOX LOGIC

appContainer.addEventListener('click', function(e){

  ///=-----------------DELETE LOGIC
 const deleteBtn=e.target.closest('.delete')
 if(deleteBtn){
  const goalContainer=deleteBtn.parentElement
  const input=goalContainer.querySelector('.goal-input')
  const id=input.id

  goalContainer.remove()

  delete allGoals[id]

  localStorage.setItem('DATA',JSON.stringify(allGoals))
  updateProgress()
  return

 }
  

  const checkbox = e.target.closest('.custom-checkbox')
  if(!checkbox) return

  const input = checkbox.nextElementSibling

  if(!input.value){
    errorLabel.style.visibility = 'visible'
    return
  }

  checkbox.parentElement.classList.toggle('completed')

  const inputID = input.id

  if(allGoals[inputID]){
    allGoals[inputID].completed = !allGoals[inputID].completed
  }

  localStorage.setItem('DATA', JSON.stringify(allGoals))

  updateProgress()

})


// -----------------------------INPUT LOGIC

appContainer.addEventListener('input', function(e){

  if(!e.target.classList.contains('goal-input')) return

  const input = e.target
  const id = input.id

  if(allGoals[id] && allGoals[id].completed){
    input.value = allGoals[id].name
    return
  }

  if(allGoals[id]){
    allGoals[id].name = input.value
  }
  else{
    allGoals[id] = {
      name: input.value,
      completed:false
    }
  }

  localStorage.setItem('DATA', JSON.stringify(allGoals))

})


//-----------ADD NEW GOAL LOGIC IS HERE

addGoalBtn.addEventListener("click", function(e){

  e.preventDefault()

  const goalContainer = document.createElement("div")
  goalContainer.classList.add("goal-container")

  const newGoalId = "goal-" + Date.now()

  goalContainer.innerHTML = `
    <div class="custom-checkbox">
      <img class="check-icon" src="Vector 1 (1).svg">
    </div>
    <input id="${newGoalId}" class="goal-input"
    type="text" placeholder="Add a New Goal">
    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
  `

  const buttonContainer =
  document.querySelector(".button-container")

  buttonContainer.parentElement
  .insertBefore(goalContainer, buttonContainer)

  updateProgress()

})


//----------------------RESTORING GOALS FROM LOCAL-STORAGE 

Object.keys(allGoals).forEach((goalID)=>{

  if(!document.getElementById(goalID)){

    const goalContainer = document.createElement("div")
    goalContainer.classList.add("goal-container")

    goalContainer.innerHTML = `
      <div class="custom-checkbox">
        <img class="check-icon" src="Vector 1 (1).svg">
      </div>
      <input id="${goalID}" class="goal-input"
      type="text"
      value="${allGoals[goalID].name}"
      placeholder="Add a New Goal">
       type="text" placeholder="Add a New Goal">
    <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
    `

    if(allGoals[goalID].completed){
      goalContainer.classList.add("completed")
    }

    const buttonContainer =
    document.querySelector(".button-container")

    buttonContainer.parentElement
    .insertBefore(goalContainer, buttonContainer)

  }

})




//----------------------------INITIAL PROGRESS  SECTION

document.querySelectorAll('.goal-input').forEach((input) => {

  if(allGoals[input.id]){

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
      input.parentElement.classList.add('completed')
    }

  }

})

updateProgress()




