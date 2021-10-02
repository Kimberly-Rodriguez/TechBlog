async function editPostHandler(event) {
  event.preventDefault();
  const post_title = document.querySelector('#post_title').value;
  const contents = document.querySelector('#contents').value;
  

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_title,
      contents,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the post was updated successfully. 
  if (response.ok) {
    document.location.replace(`/post/${id}`);
  } else {
    alert('Failed to edit post');
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);