//Elements For Adding New Comment//
const newComment = document.getElementById('newComment');
const commentForm = document.getElementById('form');
const sCommentBtn = document.getElementById('sBtn');
let visible = false;

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
    let newTime = new Date();
    let date_created = moment(newTime).format("M/D/Y H:mm A");
    let post_id = document.getElementById('post_id').textContent;
    

    const response = await fetch ("/api/comment", {
        method: 'POST',
        body: JSON.stringify({comment, date_created, post_id}),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok) {
        location.reload();
    } else {
        alert("Something went wrong, please try again");
    }
}

//Make comment form visible/invisible event Listener
newComment.addEventListener("click", addComment);
sCommentBtn.addEventListener('click', createComment);

