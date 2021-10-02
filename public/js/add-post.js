async function newPostHandler(event) {
  event.preventDefault();
  const post_title = document.querySelector('#post_title').value;
  // const contents = document.querySelector('#contents').value;
  const contents = document.querySelector('input[name="contents"]').value;
 
  // Send fetch request to add a new dish
  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      post_title,
      contents,

    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(2)
  //if the dish is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add post');
  }
}

document.querySelector('.new-important-post-form').addEventListener('submit', newPostHandler);
  