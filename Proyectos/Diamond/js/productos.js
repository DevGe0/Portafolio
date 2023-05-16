/*const mediaquery = matchMedia("(max-width: 992px)");
const changesize = mql => {
	if (mediaquery.matches) {//moviles
$(document).ready(function(){
	$('.ir-abajo').click(function(){
		$('body, html').animate({
		scrollTop: '6500px'
		}, 500);
	});
});	
}else {//pc
	$(document).ready(function(){
	$('.ir-abajo').click(function(){
		$('body, html').animate({
		scrollTop: '3700px'
		}, 500);
	});
});	
}
}

mediaquery.addListener(changesize);
changesize(mediaquery);