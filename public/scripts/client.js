$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]



  const renderTweets = (tweets) => {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      console.log($tweet);
      $("#tweets-container").append($tweet);
      // console.log($("#tweets-container"));
    }
  };

  const createTweetElement = (tweet) => {
    let $tweet = $("<article>").addClass("tweet");
    let $html = `
    <header>
      <span class="user">
        <img class="userAvatar" src=${tweet.user.avatars}>
        <p class="username">${tweet.user.name}</p>
      </span>
      <div class="handle">${tweet.user.handle}</div>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <span>${timeago.format(tweet.created_at, 'pt_BR')}</span>
      <span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
    `;
    $tweet.append($html)
    return $tweet;

  };

  renderTweets(data);

});