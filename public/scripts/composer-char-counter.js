$("#tweetText").on("input", function () {
  const count = 140;// $(counter).val
  const tweetCount = $(this).val().length;
  $(".counter").text(count - tweetCount);
  if ($(".counter").val() < 0) {
    $(".counter").css("color", "red")
  } else {
    $(".counter").css("color", "black")
  }
})