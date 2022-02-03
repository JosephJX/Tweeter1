$(document).ready(function () {
  $("#tweet-text").on('keyup', function () {
    let tweetCounter = $(this).val().length;
    console.log(tweetCounter)
    $("output").text(140 - tweetCounter);
    let $tc = $(this).parent().find('.counter');
    console.log("tc test", $(this).parent());
    if (tweetCounter <= 140) {
      $tc.removeClass('error');
    } else {
      $tc.removeClass("invalid");
      $tc.addClass('error');
    }
  });
})


// $(document).ready(function () {
//   // --- our code goes here ---
//   console.log(`here I am`)
//   console.log(`Character counter loaded`)

//   $(`#tweetText`).on('keyup', function () {
//     // alert(`Text box clicked ✅`)
//     let tweetLength = $(this).val().length;
//     // let counter = $(`#counter`).val()
//     let counter = $(`#counter`);

//     if (tweetLength <= 140) {
//       // console.log(`Tweet length: ${tweetLength}`);
//       // console.log($(`#counter`).val()-tweetLength);
//       $(`#counter`).text(140 - tweetLength)
//       counter.text(140 - tweetLength)
//     } else {
//       console.log(`TOO LONG`);
//       $(`#counter`).text(0 + (tweetLength - 140))
//       counter.text(`-${0 + (tweetLength - 140)}`).css("color", "red");
//       // NOTE: functional, but move colour change to CSS
//     }
//   })
// });


// document.addEventListener("click", () => {
//   console.log("You just clicked somewhere on this page.");
//   alert(`hi!👋🏽`)
// }); 