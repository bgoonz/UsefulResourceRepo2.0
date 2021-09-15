const handleDelete = (tweetId) => {
  return async () => {
    try {
      const res = await fetch(`http://localhost:8080/tweets/${tweetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "TWITTER_LITE_ACCESS_TOKEN"
          )}`,
        },
      });
      if (!res.ok) {
        throw res;
      }
      document.querySelector(`#tweet-${tweetId}`).remove();
    } catch (err) {
      console.error(err);
    }
  };
};

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("TWITTER_LITE_CURRENT_USER_ID");
  try {
    const res = await fetch(`http://localhost:8080/users/${userId}/tweets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "TWITTER_LITE_ACCESS_TOKEN"
        )}`,
      },
    });
    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }
    const { tweets } = await res.json();
    const tweetsContainer = document.querySelector(".tweets-container");
    const tweetsHtml = tweets.map(
      ({ message, id }) => `
      <div class="card" id="tweet-${id}">
        <div class="card-body">
          <p class="card-text">${message}</p>
          <button id="${id}" class="delete-button btn btn-secondary">
            Delete
          </button>
        </div>
      </div>
    `
    );

    tweetsContainer.innerHTML = tweetsHtml.join("");
    const deleteButtons = document.querySelectorAll(".delete-button");
    if (deleteButtons) {
      deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete(button.id));
      });
    }
  } catch (err) {
    console.error(err);
  }
});
