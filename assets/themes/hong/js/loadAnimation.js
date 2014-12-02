/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		if (GetUrlRelativePath() != "/"){
			document.getElementById('ip-header').style.display="none";
			classie.remove( container, 'loading' );
			classie.add( container, 'loaded' );
			isLoadingEnd = true;

			classie.add( document.body, 'layout-switch' );
			window.removeEventListener( 'scroll', noscroll );
			// document.getElementById('ip-header').style.display="none";
		}else{
			var onEndInitialAnimation = function() {
				if( support.animations ) {
					this.removeEventListener( animEndEventName, onEndInitialAnimation );
				}

				startLoading();
			};

			// disable scrolling
			window.addEventListener( 'scroll', noscroll );

			// initial animation
			classie.add( container, 'loading' );

			if( support.animations ) {
				container.addEventListener( animEndEventName, onEndInitialAnimation );
			}
			else {
				onEndInitialAnimation();
			}
		}
	}

	function GetUrlRelativePath(){
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");

　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
　　}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0,
			interval = setInterval( function() {
				progress = Math.min( progress + Math.random() * 0.1, 1 );

				instance.setProgress( progress );

				var onEndHeaderAnimation = function(ev) {
					if( support.animations ) {
						if( ev.target !== header ) return;
						this.removeEventListener( animEndEventName, onEndHeaderAnimation );
					}

					classie.add( document.body, 'layout-switch' );
					window.removeEventListener( 'scroll', noscroll );
					document.getElementById('ip-header').style.display="none";
				};

				if (GetUrlRelativePath() != "/"){
					classie.remove( container, 'loading' );
					classie.add( container, 'loaded' );
					clearInterval( interval );
					isLoadingEnd = true;

					if( support.animations ) {
						header.addEventListener( animEndEventName, onEndHeaderAnimation );
					}
					else {
						onEndHeaderAnimation();
					}
				}

				// reached the end
				if( progress === 1 ) {
					classie.remove( container, 'loading' );
					classie.add( container, 'loaded' );
					clearInterval( interval );
					isLoadingEnd = true;

					if( support.animations ) {
						header.addEventListener( animEndEventName, onEndHeaderAnimation );
					}
					else {
						onEndHeaderAnimation();
					}
				}
			}, 50);
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}


	init();

})();