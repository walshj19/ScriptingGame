# This handles exporting to the global context
root = exports ? this

# object to store colour values in one place
colours =
	person: "#FFFF99"

# the canvas context
canvas = null
canvas_ctx = null

# reference to the game loop caller
gameLoop_ref = null

# array to keep track of everyting which has to be drawn
drawables = []

# Get a reference to the canvas and set it to a 2D context
setupCanvas = () ->
	# setup for the canvas
	canvas = document.getElementById('viewport')
	canvas_ctx = canvas.getContext('2d')

# draw everything in the game
drawLoop = () ->
	item.draw() for item in drawables

# perform all object updates for this loop
updateLoop = () ->
	item.update() for item in drawables

# The main game loop
root.gameLoop = () ->
	updateLoop()
	drawLoop()
	console.log("game loop done")

# Class for any object which needs to be updated on every game loop
class GameObject
	constructor: () ->

	#whatever updates need to be done in the game loop
	update: () ->

# Class for drawables, anything which can have a drawn representation in the world
class Drawable extends GameObject
	constructor: (@x_pos, @y_pos, @x_dim, @y_dim, @colour) ->

	draw: () ->
		canvas_ctx.fillStyle = @colour
		canvas_ctx.fillRect(@x_pos, @y_pos, @x_dim, @y_dim)

# Class for a single townsperson
class Person extends Drawable
	constructor:(x_pos, y_pos) ->
		super(x_pos, y_pos, 4, 4, colours.person)
		@hitpoints = 20
		@move_speed = 10
		@max_carry_weight = 20
		
		@equipped_head = null
		@equipped_chest = null
		@equipped_arms = null
		@equipped_hands = null
		@equipped_legs = null
		@equipped_boots = null

		@gender = Math.random()
		@age = 20
		@sexual_preference = Math.random()

# Class for a building
# Building -> Drawable -> GameObject
# This is an abstract class and should not be instantiated directly
class Building extends Drawable
	constructor: (x_pos, y_pos, x_dim, y_dim, @hitpoints, @capacity_people) ->

# Class for a house
class Hut extends Building
	constructor: (x_pos, y_pos) ->
		super(10, 10, x_pos, y_pos, 100, 3)

# Class for a stockpile
class Stockpile extends Building
	constructor: (x_pos, y_pos, x_dim, y_dim) ->
		super(x_dim, y_dim, xpos, ypos, 200, 0)

# Class for resource
class Resource
	constructor: (@unit_weight) ->

class Wood extends Resource
	constructor: () ->
		super(5)

# This function is run when the page is loaded
root.startup = () ->
	console.log("Starting app")
	setupCanvas()

	#create some people to be drawn
	drawables.push(new Person(10, 10))
	drawables.push(new Person(10, 20))
	drawables.push(new Person(10, 30))

	#set the game loop to be called 30 times a second
	gameLoop_ref = setInterval(gameLoop, 1000)

root.stopGame = () ->
	clearInterval(gameLoop_ref)