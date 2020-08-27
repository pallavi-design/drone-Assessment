class Player {
  constructor(settings) {

    var playerElement = null;

    function wall() {

      var playerRect = playerElement.getBoundingClientRect();
      console.log(playerRect);
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);
      console.log(h);

      if (playerRect.bottom > h) {
        playerElement.style.top = (h - 224) + 'px';
      }

      if (playerRect.top < 0) {
        playerElement.style.top = '0px';
      }

      if (playerRect.left < 0) {
        playerElement.style.left = '0px';
      }

      if (playerRect.right > w) {
        playerElement.style.left = (w - playerRect.width) + 'px';
      }
    }

    function move(interactions) {

      if (interactions.up) {
        playerElement.style.top = parseInt(playerElement.style.top) - 10 + "px";
      }

      if (interactions.down) {
        playerElement.style.top = parseInt(playerElement.style.top) + 10 + "px";
      }

      if (interactions.left) {
        playerElement.style.left = parseInt(playerElement.style.left) - 10 + "px";
      }

      if (interactions.right) {
        playerElement.style.left = parseInt(playerElement.style.left) + 10 + "px";
      }

      if (settings.walls) { 
        wall();
      }
    }

    function create() {
  
      playerElement = document.getElementById('drone');
      playerElement.style.top = '424px';
      playerElement.style.left = '0px';
      playerElement.style.height = '100px';
    }

    function init() {
      create(); 
    }
    this.render = function (interactions) {
      move(interactions);
    };

    init();
  }
}

class Game {
  constructor() {

    var settings = {}; 
    settings.playerSpeed = 8; 
    settings.walls = true; 
    settings.automatic = false;
    settings.godmode = false;

    var assets = []; 
    var player = new Player(settings);
    assets[0] = player;
    var frame = 0;

    var interactions = {};
    interactions.up = false; 
    interactions.down = false;
    interactions.left = false;
    interactions.right = false;
    interactions.space = false;

    function setupEvents() {

      document.addEventListener('keyup', function (event) {
        var keyName = event.key;

        switch (keyName) {
          case "ArrowRight":
            interactions.right = false;
            break;
          case "ArrowLeft":
            interactions.left = false;
            break;
          case "ArrowUp":
            interactions.up = false;
            break;
          case "ArrowDown":
            interactions.down = false;
            break;
          default:
            break;
        }
      });

      document.addEventListener('keydown', function (event) {
        var keyName = event.key;

        switch (keyName) {
          case "ArrowRight":
            interactions.right = true;
            break;
          case "ArrowLeft":
            interactions.left = true;
            break;
          case "ArrowUp":
            interactions.up = true;
            break;
          case "ArrowDown":
            interactions.down = true;
            break;
          default:
            break;
        }
      });
    }

    function init() {
      setupEvents();
    }

    this.render = function () {
      for (var i = 0; i < assets.length; i++) {
        assets[i].render(interactions);
      }

      frame++;
    };

    var self = this;
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    (function animloop() {
      requestAnimFrame(animloop);
      self.render();
    })();

    init();
  }
}

var g = new Game();

var $p1 = $("#l-prop1");
var $p2 = $("#l-prop2");
var $p3 = $("#r-prop1");
var $p4 = $("#r-prop2");
var $drone = $("#drone-container");
var blade;
var speed = .01;
var $delay = 1;

rotateBladeLeft($p1, speed)
rotateBladeRight($p2, speed)

rotateBladeLeft($p4, speed)
rotateBladeRight($p3, speed)

TweenMax.to(light1, .5, {opacity:".7", ease:Power2.easeNone, repeat:-1, yoyo:true});

TweenMax.to(light2, .5, {opacity:".7", ease:Power2.easeNone, repeat:-1, yoyo:true});

function rotateBladeLeft(blade, speed) {
var spin = "230px";
TweenMax.to(blade, speed, {x:spin, scaleX:".1", ease:Power2.easeNone, repeat:-1, yoyo:true});
}

function rotateBladeRight(blade, speed) {
var spin = "-35px";
TweenMax.to(blade, speed, {x:spin, scaleX:".1", ease:Power2.easeNone, repeat:-1, yoyo:true});
}