$("#tweet-form-text").on("input", function () {
  const count = 140;// $(tweet-form-counter).val
  const tweetCount = $(this).val().length;
  $(".tweet-form-counter").text(count - tweetCount);
  if (tweetCount > 140) {
    $(".tweet-form-counter").css("color", "red");
  } else {
    $(".tweet-form-counter").css("color", "black");
  }
})