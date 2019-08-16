// Jquery function to change the numbers of remaining words on the tweet post
// if number of remaining words is negative 0, it will switch to red


$(document).ready(function() {
  $(".input-text").on("input", function(e) {
    let remain = 140;
    remain -= $(this).val().length;

    if (remain < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }

    $(".counter").text(remain);
  });

  // To show an error message on top of the textarea

  $(".input-text").on("click", function() {
    $(".error-message").slideUp();
  });

  // adding a clickable button at the bottom if the page is scrolled
  // to take user back to the newest post

  $(window).scroll(function(e) {
    if (scrollY > 0) {
      console.log(scrollY);
      $(".arrow-container > i").css({
        display: "inline",
        float: "right",
        position: "fixed",
        bottom: 10,
        right: 20,
        animation: "blinker 2s linear infinite"
      });
    } else if (scrollY === 0) {
      $(".arrow-container > i").css({
        display: "none"
      });
    }
  });

  $(".arrow-container").on("click", function() {
    $("html").animate({ scrollTop: 0 }, 700);
  });

  // hide the tweet input box once the page is loaded 

  $(window).load(function() {
    $(".new-tweet").css({ display: "none" });
  });
});
