$(function () {
  //On Page Load
  //The following event handlers are loaded
  mainNav();
  portoclick();
  backToTop();
});

window.addEventListener('popstate', function(event)
{
    var location = document.location.hash;

    if(location == '#portfolio' || location == '#about') {
      scrollToLink(location);
    }
});

function scrollToLink(link) {
  if ($('body').hasClass('preview-open')) {
    $('body').toggleClass('preview-open');
    $('.preview-box').removeClass('open');
  }
  $('html, body').animate({
    scrollTop: $(link).offset().top
  }, 1000);
}

function mainNav() {
  $('.primary-header .menu').click(function () {
    toggleMainNav();
  });

  $("[href='#about']").click(function (){
    toggleMainNav();
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 2000);
  });

  $("[href='#portfolio']").click(function (){
    toggleMainNav();
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top
    }, 2000);
  });
}

function toggleMainNav() {
  $('body').toggleClass('main-menu-open');
}

function portoclick() {
  $('.portfolio article').click(function () {
    var previewWindow = $(this).attr('data-preview');
    window.location.hash = previewWindow;
    openPreview();
    $('.' + previewWindow).addClass('open');
  });

  $('.primary-header .close').click(function () {
    $('body').toggleClass('preview-open');
    $('.preview-box').removeClass('open');
    window.location.hash = '';
  });
}

function openPreview() {
  $('body').toggleClass('preview-open');
}

function backToTop() {
  $(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('.back-to-top').stop(true, true).fadeIn();
    } else {
        $('.back-to-top').stop(true, true).fadeOut();
    }
});
}