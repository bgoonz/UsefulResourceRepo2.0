# Cellular-Automata

Over the next few days, you will be implementing your own version of Conway's Game of Life - a popular ***cellular automata***. 

![example](https://tk-assets.lambdaschool.com/9af0f576-7f21-4133-91df-907515912df5_conway.gif)

Your application, when finished, should include:
## MVP
- [ ] a grid of squares (cells) that can be in at least 2 states (alive, dead)
- [ ] cells correctly update state based on the rules of Conway's Game of Life
  - _birth_ - a "dead" cell with exactly 3 live neighbors will "come to life"
  - _life_ - a "live" cell with exactly 2 or 3 live neighbors will "stay alive"
  - _death_ - a "live" cell with a single OR 4+ live neighbors will "die"
- [ ] ability to pause, resume, and restart the simulation
- [ ] display that identifies which generation (#) is currently being displayed
- [ ] ability to change the time step to change the speed at which new generations are born
## Stretch
- [ ] allow the user to customize the size of their grid
- [ ] add additional states
- [ ] create some premade starting states with some well-known automata formations

![examples](https://tk-assets.lambdaschool.com/c5f785fc-6b29-4c77-88d3-52947984f1ac_ScreenShot2019-07-11at5.41.11PM.png) - From [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)


Included in this repository is some starter Pygame code that will create a blank window for you. Your instructor will help you get started, adding a few essential constants and pieces. Your job will be to implement the main logic and create an appealing visualization. Be creative!
