


TweenMax.to(".jumbotron", .5, {
	height: 400, 
	delay: 1, 
	ease: Expo.easeOut
});

// Logo & tag
TweenMax.to(".hdat-tagline", .5, {
	marginTop: 20, 
	delay: 1.5, 
	opacity: 1,
	ease: Expo.easeOut
});
TweenMax.to(".hdat-logo", .5, {
	marginTop: 40, 
	delay: 1.5, 
	opacity: 1,
	ease: Expo.easeOut
});

TweenMax.to(".hdat-zeefakkel", 1.5, {
	// marginTop: 40, 
	delay: 1.5, 
	opacity: 1,
	ease: Expo.easeOut
});

// Content
TweenMax.to(".darkBlock", 1.5, {
	height: 400,
	delay: 1.7, 
	opacity: 1,
	ease: Expo.easeOut
});
TweenMax.to(".videoBlock", 1.5, {
	height: 400,
	delay: 1.8, 
	opacity: 1,
	ease: Expo.easeOut
});

// Timelines
var shipTl = new TimelineMax();

shipTl.to(".lightBlock", 1.5, {height: 400, opacity: 1, ease: Expo.easeOut})
	.from(".hdat-ship", 1, {width: '47%', marginLeft: -50, opacity: 0, ease: Expo.easeOut})
	.to(".vocBlock", 1, {height: 400, opacity: 1, ease: Expo.easeOut}, 0);

// ScrollMagic init
var control = new ScrollMagic.Controller({
	    globalSceneOptions: {
	        triggerHook: 'onLeave'
	    }
	});

// Scrollmagic scenes
var scene = new ScrollMagic.Scene({
	triggerElement: ".videoBlock",
	duration: '30%'
})
.setTween(shipTl)
.addIndicators().loglevel(3)
.addTo(control);

