(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width/50; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        setTimeout(animate, 10000);
        // requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
            //console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = 200 - Math.random()*200;
            _this.alpha = 0.3+Math.random()*0.7;
            //0.25 ~ 1 like star
            _this.scale = 0.25+Math.random() * 0.75;
            _this.velocity = 0.06 + Math.random() * 0.09;

            _this.r = Math.floor(Math.random() * 50) + 175;
            _this.g = Math.floor(Math.random() * 50) + 175;
            _this.b = Math.floor(Math.random() * 70) + 125;
        }

        function relife() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = - Math.random()*50;
            _this.alpha = 0.3+Math.random()*0.7;
            //0.25 ~ 1 like star
            _this.scale = 0.25+Math.random() * 0.75;
            _this.velocity = 0.06 + Math.random() * 0.09;

            _this.r = Math.floor(Math.random() * 50) + 175;
            _this.g = Math.floor(Math.random() * 50) + 175;
            _this.b = Math.floor(Math.random() * 70) + 125;
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                relife();
            }
            _this.pos.y += _this.velocity;
            _this.alpha -= 0.0003;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale, 0, 2 * Math.PI, false);
            
            ctx.fillStyle = 'rgba('+ _this.r +',' + _this.g + ',' + _this.b + ','+ _this.alpha+')';
            ctx.fill();
        };
    }

})();