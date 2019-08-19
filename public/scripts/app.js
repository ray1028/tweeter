/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  function will render the tweet page to user
const renderTweets = function(tweets) {
  let tweetsPosts = createTweetElement(tweets).join("");
  $(".tweet-container").append(tweetsPosts);
  return;
}; 

// function to determine day differences from creation date
const getCurrentTime = function(created_at) {
  let tweetCreate = 0;
  let today = new Date().getTime();

  tweetCreate = Math.floor(created_at / (60 * 60 * 24 * 1000));
  today = Math.floor(today / (60 * 60 * 24 * 1000));
  let daysDiff = today - tweetCreate;
  return daysDiff;
}

// helper function to read tweet from the data object and creates the tweet element 
// with html tags
const createTweetElement = function(tweetPosts) {
  let result = [];
  // reverse the sorting order
  tweetPosts = tweetPosts.sort((x, y) => y.created_at - x.created_at);

  for (let tweet of tweetPosts) {
    result.push(`          
      <article class="tweet">
      <header class="tweet-header">
       <div class="image-container">
          <img src=${tweet.user.avatars}/> 
          <p>${tweet.user.name}</p>
        </div>
        <div class="tweet-username">${tweet.user.handle}</div>
      </header>
      <p class="tweet-content">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
      <div>
        ${getCurrentTime(tweet.created_at)} days ago
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

// tweet submit function, once the submit button is clicked, override the
// original submission behaviour instead use AJAX for post. reset the input
// box to empty 
const submitTweets = () => {
  const submitForm = $(".submit-form");
  $(submitForm).on("submit", function(event) {
    event.preventDefault();
    ajaxPost();
    $(".input-text").val('');
  });
};

// function for tweet posting using ajax, validates the tweet send the post the 
// serialized object to /tweets

const ajaxPost = () => {
  const submitForm = $(".submit-form");
  let tweetContents = $(submitForm).serialize();
  tweetContents = tweetContents.split("=")[1];

  if (isValidTweet(tweetContents)) {
    $.post("/tweets", $(submitForm).serialize())
      .done(function() {
        loadTweets();
      })
  } else {
    $('.input-text').focus();
  }
};

// function to load tweets once the page is loaded / new tweet is submitted

const loadTweets = () => {
  $.get("/tweets", function(data) {
    $(".tweet-container").empty();
    renderTweets(data);
  })
};

// helper function to validates the tweet validation rules
// 1 tweet cannot be empty
// 2 tweet cannot be exceed 140 characters

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

// add function to display tweet input box once users clicked on write a new tweet arrow
const newTweet = () => {
  $(".arrow").on("click", function() {
    $(".new-tweet").slideToggle(function(){
      $('.input-text').focus();
    });
    $(".arrow").css("cursor", "pointer");
  });
};

// helper function to display tweet error message 
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

// Sanitize the tweet when creating new tweet
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
 }

// main driver function
const mainProgram = () => {
  newTweet();
  submitTweets();
  loadTweets();
}

// main
$(document).ready(function() {
  mainProgram();
});


