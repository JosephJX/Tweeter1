$(document).ready(function () {
  const retweet = document.getElementsByClassName("i.fas.fa-retweet");

  $(retweet).on("mouseover", function () {
    if (M) {
      $(retweet).css("color", "yellow")
    } else {
      $(retweet).css("color", "#2980b9")
    }
  })
})