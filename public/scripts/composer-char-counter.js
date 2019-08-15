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

  $(".tweet").hover(
    function() {
      $(this).css({ opacity: "1", "box-shadow": "10px 10px lightblue" });
      $(".tweet-username").css({ opacity: "1", color: "lightblue" });
    },
    function() {
      $(this).css({ opacity: "0.75", "box-shadow": "0px 0px white" });
      $(".tweet-username").css({ opacity: 100, color: "#f4f1ec" });
    }
  );

  $(".input-text").on("click", function() {
    $(".error-message").slideUp();
  });

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

  $(".arrow-container").hover(function() {
    $(this).css({ cursor: "pointer" });
  });

  $(".arrow-container").on("click", function() {
    $("html").animate({ scrollTop: 0 }, 700);
  });

  $(window).load(function() {
    $(".new-tweet").css({ display: "none" });
  });
});
