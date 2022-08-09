// I want good control flow and function encapsulation for this project. 
// I don't want just lines and lines of code written in the global scope or in one huge function.

// When page loads, make a get request that gets all users and creates divs for each user. 
    // Each user div should have the users name, username, and city they are located in.
    // when a div is clicked on, it should fetch all posts associated with the user id.



// example()

// function example() {
//     $.get([some url here], [some callback function that gets access to data here])
// }



const container = document.querySelector('#container')

loadEventListeners()

function loadEventListeners(){
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', getAllUsers)
}

function getAllUsers(){
    $.get('https://jsonplaceholder.typicode.com/users', function(data){
        createUser(data)
    })
        
function createUser(arr){
    for (let i = 0; i < arr.length; i++){
        let current = arr[i]
        createUserDiv(current)    // Now create a div for each of the users
        console.log(current)
    }
}
    
}

function createUserDiv(obj){
    const div = document.createElement('div')
    div.className = 'card'
    const name = document.createElement('h1')
    name.id = obj.id
    name.className = 'name'
    name.textContent = obj.name
    div.appendChild(name)
    name.addEventListener('click', getPosts)  //see getPosts function below
    const userName = document.createElement('h2')
    userName.textContent = obj.userName
    div.appendChild(userName)
    const city = document.createElement('p')
    city.textContent = obj.address.city
    div.appendChild(city)
    appendDivToContainer(div)
}

function getPosts(e){
    $.get(`https://jsonplaceholder.typicode.com/users/${e.target.id}/posts`, logPosts)
}
function logPosts(data){
    createDivsForPosts(data)
}

function createDivsForPosts(data){
    $('#container').empty()   //empty the original container
    createPosts()
    const postDiv = document.querySelector('#postDiv')
    data.forEach((elem) => {     //for each elem in the new div/container(postDiv)
        const div = document.createElement('div')  //create a new div inside postDiv
        div.className = 'card'
        const h1 = document.createElement('h1')  //create a new header
        h1.textContent = elem.title
        h1.addEventListener('click', getSinglePost)
        div.appendChild(h1)      // append the new header to the new div
        postDiv.appendChild(div)  // append the new div to postDiv, which is appended to container
    })
    createHomeButton()
}

function createHomeButton() {
    const homeBtn = document.createElement('button')
    container.appendChild(homeBtn)
    homeBtn.textContent = 'Back'
    homeBtn.className = 'btn'
    homeBtn.addEventListener('click', goHome)
}

function goHome(){
    $('#container').empty()
    $.get('https://jsonplaceholder.typicode.com/users', loadUsers)
}

function loadUsers(data){
    data.forEach((elem) => {
        createUserDiv(elem)
    })
}

function appendDivToContainer(node){
    container.appendChild(node)
}

function createPosts(){
    const postDiv = document.createElement('div')
    postDiv.id = 'postDiv'
    container.appendChild(postDiv)
}

function getSinglePost(e){
    console.log(e.target.id)
}
    



