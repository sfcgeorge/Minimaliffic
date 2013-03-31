//Mark posts with click

//Clicking a link doesn't select the post
$('ol').on('click', 'li:not(a)', function(e) { 
  //Deselect all other posts but only in this list
  $(this).parent().find('li').not(this).removeClass('selected'); 
	$(this).toggleClass('selected'); //Select this post only
});