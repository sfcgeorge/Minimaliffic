$.fx.speeds._default = 250;
$scroller = $('body');

//Add bar to top that scrolls timeline to top on click
$(function() {
  $('body').addClass('top-scroller').prepend('<div id="top-scroller"></div>');
  $('#sidebar, body').css({ paddingTop: 9 });
  $('#top-scroller').on('click', function() {
    $scroller.animate({ scrollTop: 0 });
  });
});

//Select posts with click
$('ol').on('click', 'li:not(a)', function(e) { //Clicking a link doesn't select the post
  //Deselect all other posts but only in this list
  $(this).parent().find('li').not(this).removeClass('selected'); 
	$(this).toggleClass('selected'); //Select this post only
});

//Use up and down arrow keys to move selection and page if necessary
$(document).keydown(function(e) { 
  if (e.keyCode == 38 || e.keyCode == 40) { //Up or Down arrow key
    e.preventDefault();
    var thus = $('.timeline:visible, .conversation:visible, .mentions:visible').find('.selected'); //Treat each tab separately
    var el = e.keyCode == 38 ? thus.prev() : thus.next();
    if (el.length) {
      el.addClass('selected');
      thus.removeClass('selected');
      
      //Scrolls page if necessary to keep post in view
      var elOffset = el.offset().top;
      var currScroll = $scroller.scrollTop();
      var docHeight = $(window).height();
      var elHeight = el.outerHeight(false);
      var topScrollerHeight = $('#top-scroller').height();
      $scroller.stop(true); //Forces any previous scrolling to complete imediately
      if (currScroll > elOffset-topScrollerHeight) {
        $scroller.animate({ scrollTop: elOffset-topScrollerHeight }); //Scroll up
      }
      else if (elOffset-currScroll+elHeight > docHeight) {
        $scroller.animate({ scrollTop: elOffset+elHeight-docHeight }); //Scroll down
      }
    }
    return false;
  }
});

//Mark posts with a double click
$('ol').on('dblclick', 'li:not(a)', function(e) { 
  //Deselect this post as the intention was to mark it
  $(this).removeClass('selected'); 
	$(this).toggleClass('marked'); //Mark this post only
});