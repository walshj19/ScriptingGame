// Generated by CoffeeScript 1.9.1
(function() {
  var Building, Drawable, GameObject, Hut, Person, Resource, Stockpile, Wood, canvas, canvas_ctx, colours, drawLoop, drawables, gameLoop_ref, root, setupCanvas, updateLoop,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  colours = {
    person: "#FFFF99"
  };

  canvas = null;

  canvas_ctx = null;

  gameLoop_ref = null;

  drawables = [];

  setupCanvas = function() {
    canvas = document.getElementById('viewport');
    return canvas_ctx = canvas.getContext('2d');
  };

  drawLoop = function() {
    var i, item, len, results;
    results = [];
    for (i = 0, len = drawables.length; i < len; i++) {
      item = drawables[i];
      results.push(item.draw());
    }
    return results;
  };

  updateLoop = function() {
    var i, item, len, results;
    results = [];
    for (i = 0, len = drawables.length; i < len; i++) {
      item = drawables[i];
      results.push(item.update());
    }
    return results;
  };

  root.gameLoop = function() {
    updateLoop();
    drawLoop();
    return console.log("game loop done");
  };

  GameObject = (function() {
    function GameObject() {}

    GameObject.prototype.update = function() {};

    return GameObject;

  })();

  Drawable = (function(superClass) {
    extend(Drawable, superClass);

    function Drawable(x_pos1, y_pos1, x_dim1, y_dim1, colour) {
      this.x_pos = x_pos1;
      this.y_pos = y_pos1;
      this.x_dim = x_dim1;
      this.y_dim = y_dim1;
      this.colour = colour;
    }

    Drawable.prototype.draw = function() {
      canvas_ctx.fillStyle = this.colour;
      return canvas_ctx.fillRect(this.x_pos, this.y_pos, this.x_dim, this.y_dim);
    };

    return Drawable;

  })(GameObject);

  Person = (function(superClass) {
    extend(Person, superClass);

    function Person(x_pos, y_pos) {
      Person.__super__.constructor.call(this, x_pos, y_pos, 4, 4, colours.person);
      this.hitpoints = 20;
      this.move_speed = 10;
      this.max_carry_weight = 20;
      this.equipped_head = null;
      this.equipped_chest = null;
      this.equipped_arms = null;
      this.equipped_hands = null;
      this.equipped_legs = null;
      this.equipped_boots = null;
      this.gender = Math.random();
      this.age = 20;
      this.sexual_preference = Math.random();
    }

    return Person;

  })(Drawable);

  Building = (function(superClass) {
    extend(Building, superClass);

    function Building(x_pos, y_pos, x_dim, y_dim, hitpoints, capacity_people) {
      this.hitpoints = hitpoints;
      this.capacity_people = capacity_people;
    }

    return Building;

  })(Drawable);

  Hut = (function(superClass) {
    extend(Hut, superClass);

    function Hut(x_pos, y_pos) {
      Hut.__super__.constructor.call(this, 10, 10, x_pos, y_pos, 100, 3);
    }

    return Hut;

  })(Building);

  Stockpile = (function(superClass) {
    extend(Stockpile, superClass);

    function Stockpile(x_pos, y_pos, x_dim, y_dim) {
      Stockpile.__super__.constructor.call(this, x_dim, y_dim, xpos, ypos, 200, 0);
    }

    return Stockpile;

  })(Building);

  Resource = (function() {
    function Resource(unit_weight) {
      this.unit_weight = unit_weight;
    }

    return Resource;

  })();

  Wood = (function(superClass) {
    extend(Wood, superClass);

    function Wood() {
      Wood.__super__.constructor.call(this, 5);
    }

    return Wood;

  })(Resource);

  root.startup = function() {
    console.log("Starting app");
    setupCanvas();
    drawables.push(new Person(10, 10));
    drawables.push(new Person(10, 20));
    drawables.push(new Person(10, 30));
    return gameLoop_ref = setInterval(gameLoop, 1000);
  };

  root.stopGame = function() {
    return clearInterval(gameLoop_ref);
  };

}).call(this);