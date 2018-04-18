/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

var test = 'test';

$(document).ready(function(){

  // Sticky footer
  var bumpIt = function() {
      $('body').css('margin-bottom', $('.page__footer').outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if(didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  // FitVids init
  $("#main").fitVids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  $(document).on('scroll', function(d){

      var currTop = $(this).scrollTop();

      if ( currTop > 150 ){
          $('.site-title img').addClass('little');
      } else {
          $('.site-title img').removeClass('little')
      }
  });

  $('#site-nav.greedy-nav .visible-links li.has-children span').on({

    click: function(){
      $(this).parent().find('ul').toggleClass('show');
    }

  });

  // data = $.ajax({ url: 'https://www.instagram.com/fpsbookarts/' })
  // var cont = document.createElement('div');
  // cont.innerHTML = data.responseText
  // parsed = $.parseHTML(cont)
  // data = parsed.find('script')[2].innerHTML
  // data = data.substring(20, data.length - 1)
  // igjson = JSON.parse(data)

  $.ajax({
    url: 'https://www.instagram.com/fpsbookarts/',
    dataType: 'html'
  }).done(function(data){
    var container = document.createElement('div');
    container.innerHTML = data;
    var igjson = $(container).find('script')[2].innerHTML;
    igjson = igjson.substring(20,igjson.length-1);
    igjson = JSON.parse(igjson);
    igjson = igjson.entry_data.ProfilePage[0];
    
    var el = $('#instagram-feed');          
    var thumbs = igjson.graphql.user.edge_owner_to_timeline_media.edges;

    thumbs.forEach(function(v,i) {

      var thumb_url = v.node.thumbnail_resources[1].src;
      var post_url = "https://instagram.com/p/" + v.node.shortcode;

      var post = $('<a>').attr('href', post_url)
          .addClass('post');
          post.append('<div>').find('div')
          .css('background-image', 'url(' + '"' + thumb_url + '")');

      el.append(post);
    });
  });

  // $.ajax({
  //     url: "https://www.instagram.com/fpsbookarts/?__a=1",
  //     dataType: 'json'
  //   }).done(function( data ){

  //       var el = $('#instagram-feed');          
  //       var thumbs = data.graphql.user.edge_owner_to_timeline_media.edges;

  //       thumbs.forEach(function(v,i) {

  //         var thumb_url = v.node.thumbnail_resources[1].src;
  //         var post_url = "https://instagram.com/p/" + v.node.shortcode;

  //         var post = $('<a>').attr('href', post_url)
  //             .addClass('post');
  //             post.append('<div>').find('div')
  //             .css('background-image', 'url(' + '"' + thumb_url + '")');

  //         el.append(post);

  //       });
  //     });

    $('.vimeo').not('.custom-thumbnail').each(function(){

      var el = $(this);

      $.ajax({
        url:"https://vimeo.com/api/oembed.json",
        data: { url: "http://vimeo.com/" + el.data('vimeoid') }
      }).done(function( data ){
        data.thumbnail_url
        el.css('background-image', 'url("' + data.thumbnail_url + '")');
      });

    });

});
