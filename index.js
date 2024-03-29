// const list=document.querySelectorAll(".container .list ul li");
// const listitems=[];
// list.forEach(i => {
//     listitems.push(i.textContent);
// });
// console.log(list[0].textContent);
// console.log(listitems);

// list2 = document.getElementsByClassName("fg");
// console.log('list2__________##');
// for(item of list2){
//     listitems.push(item.textContent);
// }
// console.log(listitems);

const todoitems = document.querySelector(".list ul");
const input = document.querySelector(".input input"); // added later, after line 39

// console.log("todoitems = " + todoitems);

// const listitems=["Eat at 9am", "Play Cricket", "Go to Dance Class"];
let listitems=[];

// It is meant to render all the items on the web page.
const render=()=>{
    listitems=JSON.parse(localStorage.getItem("listitems"));
    listitems=(listitems===null) ? []  : [...listitems];
    // console.log(listitems);
    todoitems.innerHTML="";
    if(listitems.length===0){
        todoitems.textContent="Create Today's Work";
    }
    else{
        listitems.forEach(item=>{
            // console.log(item);
            const newElement=document.createElement("li");
            newElement.innerHTML=`<span id=${item.id} class="span"></span><p>${item.data}</p> <i id=${item.id} class="icon fas fa-trash"></i>`;
            if(item.isFinished === true){
                newElement.classList.add("change");
            }
            todoitems.append(newElement);
            // todoitems.push()
        });
    }
}
render();

// function to add new task
// console.log('input -> ' + input.length);
input.addEventListener("keypress", (event)=>{
    if(event.key=="Enter"){
        const task = {
            data : event.target.value,
            id : Date.now(),
            isFinished : false
        };
        listitems.push(task);
        // console.log(listitems);
        localStorage.setItem("listitems", JSON.stringify(listitems));
        render();
        event.target.value="";
    }
});

// function to delete the li from the tasks
document.body.addEventListener("click", (e)=>{
    if(e.target.classList.contains("icon")){
        // console.log(e.target.parentNode);
        const newlistitems = listitems.filter((item)=>{    // returns array
            return item.id != e.target.id
        });
        listitems = [...newlistitems];
        localStorage.setItem("listitems", JSON.stringify(listitems));
        render();
    }
});

// function to change list color to
// determine if the task is completed
document.body.addEventListener("click", (e)=>{
    if(e.target.classList.contains("span")){
        // console.log('Span is clicked');
        e.target.parentNode.classList.toggle("change");
        listitems.forEach((item)=>{
            if(item.id == e.target.id && e.target.parentNode.classList.contains("change")){
                item.isFinished=true;
            }
            else if(item.id == e.target.id && e.target.parentNode.classList.contains("change") == false){
                item.isFinished=false;
            }
            // console.log(item);
        });
        localStorage.setItem("listitems", JSON.stringify(listitems));
        render();
    }
});

// implementation of local storage
// localStorage.setItem("name", "Jay");
// localStorage.setItem("name2", "Aditya");
// console.log('My name is ' + localStorage.getItem("name"));