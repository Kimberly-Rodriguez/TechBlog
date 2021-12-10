//Elements For Adding New Comment//
const createBtn = document.getElementById('createBtn');
let visible = false;

console.log(createBtn);

// Function to Make the Add Comment Form Visibile Or Invisible
const addComment = () => {
    
    if (!visible){
        commentForm.style.display = "block";
        visible = true;
    } else {
        commentForm.style.display = "none";
        visible = false;
    }
}

// Function to set up POST Route to Add new Comment
const createComment = async (event) => {
    event.preventDefault();

    let comment = document.getElementById('comment').value.trim();
    console.log(comment);
  
    const response = await fetch ("/api/comment", {
        method: 'POST',
        body: JSON.stringify({comment}),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok) {
        location.reload();
    } else {
        alert("Something went wrong, please try again");
    }
}

//Make comment form visible/invisible event Listener
// newComment.addEventListener("click", addComment);
createBtn.addEventListener('click', createComment);

