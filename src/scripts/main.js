


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
TweenMax.from(".darkBlock", 1.5, {
	height: 0,
	delay: 1.7, 
	opacity: 0,
	ease: Expo.easeOut
});
TweenMax.from(".videoBlock", 1.5, {
	height: 0,
	delay: 1.8, 
	opacity: 0,
	ease: Expo.easeOut
});

// Methodology
var methodology = TweenMax.from(".methodology", 1, {
	opacity: 0
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
var vocScene = new ScrollMagic.Scene({
	triggerElement: ".firstBlock",
	duration: '30%'
})
.setTween(shipTl)
.addIndicators().loglevel(3)
.addTo(control);

var methodologyScene = new ScrollMagic.Scene({
	triggerElement: ".vocBlock",
	duration: '30%'
})
.setTween(methodology)
.addIndicators().loglevel(3)
.addTo(control);

