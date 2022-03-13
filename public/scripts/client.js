$(document).ready(function () {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]



  const renderTweets = (tweets) => {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend($tweet);
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

  $("#tweet-form").submit(function (event) {
    // Prevent change of page to /tweets
    event.preventDefault();
    // AJAX Request w/ POST method

    if (isDataValid($("#tweet-form-text"))) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
        .then(function () {
          $(".new-tweet-error").hide();
          $("#tweet-form-text").val("");
          loadTweets()
        })
    }

  });

  const isDataVal = (data) => {

    if (data.val().length > 140) {
      $(".new-tweet-error").text("This tweet has gone beyond the character limit.").show();
      return false;
    } else if (data.val().length === 0) {
      $(".new-tweet-error").text("This tweet is empty.").show();
      return false;
    }
    return true;
  }

});

