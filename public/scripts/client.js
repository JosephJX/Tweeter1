/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = (tweets) => {
    const container = $('.tweet-container').html('')
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      container.prepend($tweet);
    }
  };

  const createTweetElement = (tweet) => {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    return `
    <article class="tweet">
    <header class="tweet-header">
        <div class="tweet-header-user">
          <div class="tweet-header-user-avatar">
            <img src="${tweet.user.avatars}" alt="user avatar">
          </div>
          <p>${tweet.user.name}</p>
        </div>
        <p class="tweet-header-handle">${tweet.user.handle}</p>
      </header>
      <p class="tweet-content">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
        <p class="tweet-footer-timestamp">${timeago.format(tweet.created_at, 'pt_BR')}</p>
        <div class="tweet-footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
          </div>
          </footer>
        </article>
    `;
  };
  // renderTweets(data);

  const loadTweets = (tweets) => {
    $.ajax("/tweets", { method: "GET" })
      .then(function (tweets) {
        renderTweets(tweets);
        console.log("success", tweets)
      })
  };
  loadTweets();

  // checks tweet criteria
  const isDataValid = (data) => {

    if (data.val().length > 140) {
      $(".new-tweet-error").text("This tweet has gone beyond the character limit.").show();
      return false;
    } else if (data.val().length === 0) {
      $(".new-tweet-error").text("This tweet is empty.").show();
      return false;
    }
    return true;
  }

  $("#tweet-form").on('submit', function (event) {
    // Prevent change of page to /tweets
    event.preventDefault();
    // AJAX Request w/ POST method

    if (isDataValid($("#tweet-form-text"))) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
        // refreshes with submission
        .then(function () {
          console.log('works');
          $(".new-tweet-error").hide();
          $("#tweet-form-text").val("");
          $(".tweet-form-counter").text("140")
          loadTweets()
        })
    }

  });



});

