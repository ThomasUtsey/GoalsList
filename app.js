const form = document.querySelector("#task-form")
const list = document.querySelector(".collection")
const clear = document.querySelector(".clear-task")
const filter  = document.querySelector("#filter")
const input = document.querySelector("#task")

loadEventListeners();


function loadEventListeners (){
    form.addEventListener('submit',addTask)
    list.addEventListener('click',removeTask)
    clear.addEventListener("click",clearTask)
    filter.addEventListener('keyup',filterTask)
}


function addTask (e) {
    if(input.value === ""){
        return alert('Add a goal')
    }

const li = document.createElement('li')

li.className='collection-item'
li.appendChild(document.createTextNode(input.value))

const link = document.createElement('a')
link.className ='delete-item secondary-content'
link.innerHTML='<i class= "fa fa-remove"> </i>'

li.appendChild(link)
list.appendChild(li)

input.value = '';

    e.preventDefault();
}

function removeTask (e){
    if(e.target.parentElement.classList.contains("delete-item")){
        console.log('clicked')
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove()
    }
    }
}

function clearTask (e){

while(list.firstChild){
    list.removeChild(list.firstChild)
}
}

function filterTask (e){
    text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)){

        }else{
            
        }
    })
}