const appContainer = document.querySelector('.app-container')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressValue = document.querySelector('.progress-value')
const addGoalBtn = document.querySelector(".btn")

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