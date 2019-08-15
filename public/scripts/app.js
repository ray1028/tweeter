/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  let tweetsPosts = createTweetElement(tweets).join("");
  $(".tweet-container").append(tweetsPosts);
  return;
};

const createTweetElement = function(tweetPosts) {
  let result = [];
  // reverse the sorting order
  tweetPosts = tweetPosts.sort((x, y) => y.created_at - x.created_at);

  for (let tweet of tweetPosts) {
    let tweetCreate = 0;
    let today = new Date().getTime();

    tweetCreate = Math.floor(tweet.created_at / (60 * 60 * 24 * 1000));
    today = Math.floor(today / (60 * 60 * 24 * 1000));
    let daysDiff = today - tweetCreate;

    result.push(`          
      <article class="tweet">
      <header class="tweet-header">
       <div class="image-container">
          <img src=${tweet.user.avatars}/> 
          <p>${tweet.user.name}</p>
        </div>
        <div class="tweet-username">${tweet.user.handle}</div>
      </header>
      <p class="tweet-content">${tweet.content.text}</p>
      <footer class="tweet-footer">
      <div>
        ${daysDiff} days ago
      </div>
      <div class="tweet-footer-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
      </footer>
    </article>`);
  }
  return result;
};

const submitTweets = () => {
  const submitForm = $(".submit-form");
  $(submitForm).on("submit", function(event) {
    event.preventDefault();
    ajaxPost();
  });
};

const ajaxPost = () => {
  const submitForm = $(".submit-form");
  let tweetContents = $(submitForm).serialize();
  tweetContents = tweetContents.split("=")[1];

  if (isValidTweet(tweetContents)) {
    $.post("/tweets", $(submitForm).serialize())
      .done(function() {
        loadTweets();
      })
      .done(function() {
        console.log("post data success");
      })
      .fail(function() {
        console.log("post data failed");
      });
  }
};

const loadTweets = () => {
  $.get("/tweets", function(data) {
    $(".tweet-container").empty();
    renderTweets(data);
  })
    .done(function() {
      console.log("load data success");
    })
    .fail(function() {
      console.log("load data failed");
    });
};

const isValidTweet = tweetContents => {
  if (!tweetContents.split("+").join("")) {
    displayError("blank");
    return false;
  } else if (tweetContents.length > 140) {
    displayError("");
    return false;
  }
  return true;
};

const newTweet = () => {
  $(".arrow").on("click", function() {
    $(".new-tweet").slideToggle();
    $(".arrow").css("cursor", "pointer");
  });
};

const displayError = errorType => {
  const errorMessage = $(".error-message");
  $(errorMessage).slideDown();
  $(errorMessage).css({ border: "solid", "text-align": "center" });
  errorType === "blank"
    ? $(errorMessage).text("Tweet can't not be blank")
    : $(errorMessage).text(`You have exceeded maximum charaters`);
  $(".input-text::-webkit-input-placeholder").text("Something is wrong");
  $(".input-text").css({
    animation: "shake 0.5s",
    "animation-iteration-count": "1"
  });
};

const mainProgram = () => {
  newTweet();
  submitTweets();
  loadTweets();
}

$(document).ready(function() {
  mainProgram();
});
