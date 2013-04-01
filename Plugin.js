$.fx.speeds._default = 250;

//Select posts with click
$('ol').on('click', 'li:not(a)', function(e) { //Clicking a link doesn't select the post
  //Deselect all other posts but only in this list
  $(this).parent().find('li').not(this).removeClass('selected'); 
	$(this).toggleClass('selected'); //Select this post only
});

//Use up and down arrow keys to move selection and page if necessary
$(document).keydown(function(e) { 
  if (e.keyCode == 38 || e.keyCode == 40) { //Up or Down arrow key
    var thus = $('.timeline:visible, .conversation:visible, .mentions:visible').find('.selected'); //Treat each tab separately
    var el = e.keyCode == 38 ? thus.prev() : thus.next();
    if (el.length) {
      el.addClass('selected');
      thus.removeClass('selected');
      
      //Scrolls page if necessary to keep post in view
      var elOffset = el.position().top;
      var currScroll = $('#content').scrollTop();
      var docHeight = $(window).height();
      var elHeight = el.outerHeight(false);
      $('#content').stop(true); //Forces any previous scrolling to complete imediately
      if (currScroll > currScroll+elOffset) {
        $('#content').animate({ scrollTop: currScroll + elOffset }); //Scroll up
      }
      else if (elOffset+elHeight > docHeight) {
        $('#content').animate({ scrollTop: currScroll + elOffset + elHeight - docHeight }); //Scroll down
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