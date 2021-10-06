const editBtn = document.getElementById("editBtn");
let userId = document.getElementById("userId").textContent;
let id = document.getElementById("EoDid").textContent;
//deleting a post//
const deleteBtn = document.getElementById('deleteBtn');

//update post//
const editPost = async (event) => {
    event.preventDefault();
   

    let title = document.getElementById('editTitle').value.trim();
    let contents = document.getElementById('editContent').value.trim();
    
    const response = await fetch(`/api/post/u/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' }
    })
       
    
    if (response.ok) {
        document.location.replace(`/dashboard/${userId}`)
      } else {
        alert(response.statusText);
      }
}
//delete button
const deletePost = async (event) => {
  event.preventDefault();

  let response = await fetch(`/api/post/${event.target.dataset.id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/dashboard/${userId}`);
  } else {
    alert(response.statusText);
  }
};

//delete post//
deleteBtn.addEventListener('click', deletePost);

//update post//
editBtn.addEventListener('click', editPost)


