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
      <header>
        <span class="user">
          <img class="userAvatar" src=${tweet.user.avatars}>
          <p class="username">${tweet.user.name}</p>
        </span>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <span>${timeago.format(tweet.created_at, 'pt_BR')}</span>
        <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
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
          loadTweets()
        })
    }

  });

  const isDataVal = (data) => {

    if (data.val().length > 140) {
      alert("too many characters");
      return false;
    } else if (data.val().length === 0) {
      alert("Message is empty");
      return false;
    }
    return true;
  }

});

