const $noteContainer = document.getElementById("notesContainer")
const $createNote = document.getElementById("createNote")
const $showDoneButton = document.getElementById("showDoneLabel");
const $searchBar = document.getElementById("searchBar");
const $addNote = document.getElementById("addNote");
let $showDoneInput = document.getElementById("showDone");
let idGlobal = 0;
let lastColor = 0;
let colors = ["green", "red", "blue", "yellow"]
let color = "green"
let notes = [{
    id: getId(),
    title: "Sacar la basura",
    text: "mi mama me va a retar si no lo hago",
    color: getColor(),
    done: false
}];

//init
printNotes(notes);
resetCheckBox();
function resetCheckBox(){
    $showDoneInput.value ="false";
}

//EVENTLISTENERS
$addNote.addEventListener("click", () => {
    document.getElementById("titleInput").value = ""
    document.getElementById("textInput").value = ""
})
$searchBar.addEventListener("keyup", () => {
    printNotes(filterNotes(notes));
})
$showDoneButton.addEventListener("click", () =>{
    if($showDoneInput.value === "on"){
        $showDoneInput.value = "true";
    }else{
        $showDoneInput.value = $showDoneInput.value === "true" ? "false" : "true";
    }
    printNotes(filterNotes(notes));
})
$createNote.addEventListener("click", (e) =>{
    e.preventDefault()
    let title = document.getElementById("titleInput").value
    let text = document.getElementById("textInput").value;
    createNote(title, text)
    printNotes(filterNotes(notes));
})

//FUNCIONES
function createNote(title, text){
    let note = {
        id: getId(),
        title: title,
        text: text,
        color: getColor(),
        done: false
    }
    notes.push(note)
    return note
}
function deleteNote(id){
    notes = notes.filter((element) => element.id !== id);
    printNotes(filterNotes(notes));
}
function checkDoneNote(id){
    for(let note of notes){
       if(note.id === id){
        note.done = !note.done
       } 
    }
    printNotes(filterNotes(notes));
}
function filterNotes(notes){
    let $showDoneInput = document.getElementById("showDone");
    let showChecked = $showDoneInput.value;
    let filterString = $searchBar.value;
    let filteredArray = notes;
    filteredArray = filterDone(showChecked,filterText(filterString,notes));
    return filteredArray;
}
function filterText(filterString, notes){
    let filteredTextArray = notes
    if(filterString && filterString !== ""){
        filteredTextArray = notes.filter((note) => foundText(note.title, note.text, filterString))
    }
    return filteredTextArray;
}
function foundText(title, text, filterString){
    if(title.toLowerCase().includes(filterString.toLowerCase()) || text.toLowerCase().includes(filterString.toLowerCase())){
        return true;
    }else{
        return false;
    }
}
function filterDone(done, notes){
    let filteredDoneArray = notes;
    if(done === "false"){
        filteredDoneArray = notes.filter((note) => note.done !== true);
    }
    return filteredDoneArray;
}
function printNotes(notes) {
    let template = ""
    if(notes.length === 0){
        template = `<div class="container text-center">
        <p class="text-muted fs-4">No notes to show</p>
        <p class="text-muted fs-5">
            you can create them using the add note button or check the filters</p>
    </div>`
    }
    for (let note of notes) {
        template += createNoteTemplate(note);
    }
    $noteContainer.innerHTML = template
    
}

function createNoteTemplate(note) {
    let checked = note.done ? "checked" : "";
    return `<div class="col col-md-6 col-lg-3 col-xl-3">
                <div class="card  p-0 ${colors[note.color]} shadow">
                    <div class="card-header d-flex justify-content-evenly align-items-center">
                        <h3 class="flex-grow-1 m-0">${note.title}</h3>
                        <div class="me-2">
                            <input type="checkbox" class="btn-check done-btn" id="taskDone${note.id}" autocomplete="off" ${checked} ">
                            <label class="btn btn-outline-primary" for="taskDone${note.id}" onclick="checkDoneNote(${note.id})"><i class="bi bi-check-circle"></i></label>
                        </div>
                        <div class="vr me-2"></div>
                        <button type="button" onclick="deleteNote(${note.id})" class="btn btn-outline-primary"><i class="bi bi-trash"></i></button>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${note.text}</p>
                    </div>
                </div>
            </div>`
}
function getId(){
    idGlobal ++;
    return idGlobal;
}
function getColor(){
    if(lastColor === 3){
        lastColor = 0;
    }else{
        lastColor++;
    }
    return lastColor
}



