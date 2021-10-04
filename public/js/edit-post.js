async function newPostHandler(event) {
  event.preventDefault();
  const post_title = document.querySelector('#post_title').value.trim();
  const contents = document.querySelector('#contents').value.trim();
  // const contents = document.querySelector('input[name="contents"]').value;
 
  // Send fetch request to add a new post
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

  //if the post is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add post');
  }


if (post_title && contents) {
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({ post_title, contents }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to create post');
  }
}
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-important-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);


document.querySelector('.new-important-post-form').addEventListener('submit', newPostHandler);

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);




// TRYING TO UPDATE
  // // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];

  // // What part of our application will handle this 'put' request?
  // // The Controller will handle this 'put' request.

  // const response = await fetch(`/api/post/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify({
  //     post_title,
  //     contents,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // // What happens if the response is ok?
  // // If the response is ok, that means that the post was updated successfully. 
  // if (response.ok) {
  //   document.location.replace(`/post/${id}`);
  // } else {
  //   alert('Failed to edit post');
  // }