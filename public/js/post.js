// Elements In For Adding New Post//
const showPost = document.getElementById('createBtn');
const postForm = document.getElementById('postForm');
const deleteBtn = document.querySelector('.post-list');
// const postBtn = document.getElementById('postBtn')
let visible = false;

//Function to make the Post Form Visible or Invisible
const addPost = () => {
  if (!visible) {
    postForm.style.display = 'block';
    visible = true;
  } else {
    postForm.style.display = 'none';
    visible = false;
  }
};

// Function to set up POST Route to Add new Post
const createPost = async (event) => {
  event.preventDefault();

  let title = document.getElementById('title').value.trim();
  let contents = document.getElementById('contents').value.trim();

  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({ title, contents }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    location.reload();
  } else {
    alert('Something went wrong');
  }
};

//delete post
const deletePost = async (event) => {
  event.preventDefault();
  console.log("I am trying to delete")
if (event.target.matches("button")) {
    console.log("I am in the if statement")
  let response = await fetch(`/api/post/${event.target.dataset.id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert(response.statusText);
  }
}};

//delete post//
deleteBtn.addEventListener('click', deletePost);

//Make post form visible/invisible event Listener
showPost.addEventListener('click', createPost);
// postBtn.addEventListener('click', addPost)
