// Elements In For Adding New Post//
const showPost = document.getElementById('newPost');
const postForm = document.getElementById('postForm')
const postBtn = document.getElementById('postBtn')
let visible = false;

//Function to make the Post Form Visible or Invisible
const addPost = () => {

    if (!visible){
        postForm.style.display = "block";
        visible = true;
    } else {
        postForm.style.display = "none";
        visible = false;
    }
}

// Function to set up POST Route to Add new Post
const createPost = async (event) => {
    event.preventDefault();

    let title = document.getElementById('title').value.trim();
    let contents = document.getElementById('content').value.trim();
    let user_id = document.getElementById('user_id').textContent;
    
    let newTime = new Date();
    let date_created = moment(newTime).format("M/D/Y H:mm A");
    
    

    const response = await fetch ("/api/post", {
        method: 'POST',
        body: JSON.stringify({title, contents, date_created, user_id}),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok) {
        location.reload();
    } else {
        alert("Something went wrong");
    }
}

//Make post form visible/invisible event Listener
showPost.addEventListener("click", addPost);
postBtn.addEventListener('click', createPost)