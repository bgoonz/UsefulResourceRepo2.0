import pygame, random
<<<<<<< HEAD
 
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Define some colors and other constants
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (25, 25, 25)
WIN_SIZE = 500

pygame.init()
<<<<<<< HEAD
 
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Set the width and height of the screen [width, height]
size = (WIN_SIZE, WIN_SIZE)
screen = pygame.display.set_mode(size)

# Add a title
pygame.display.set_caption("Conway's Game of Life")
<<<<<<< HEAD
 
# Loop until the user clicks the close button.
done = False
 
# Used to manage how fast the screen updates
clock = pygame.time.Clock()
 
=======

# Loop until the user clicks the close button.
done = False

# Used to manage how fast the screen updates
clock = pygame.time.Clock()

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# -------- Main Program Loop -----------
while not done:
    # --- Main event loop
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
<<<<<<< HEAD
 
    # --- Game logic should go here
    

 
    # --- Screen-clearing code goes here
 
    # Here, we clear the screen to gray. Don't put other drawing commands
    # above this, or they will be erased with this command.
    screen.fill(GRAY)
 
    # --- Drawing code should go here
   

    # --- Go ahead and update the screen with what we've drawn.
    pygame.display.flip()
 
    # --- Limit to 5 frames per second
    clock.tick(5)
 
=======

    # --- Game logic should go here

    # --- Screen-clearing code goes here

    # Here, we clear the screen to gray. Don't put other drawing commands
    # above this, or they will be erased with this command.
    screen.fill(GRAY)

    # --- Drawing code should go here

    # --- Go ahead and update the screen with what we've drawn.
    pygame.display.flip()

    # --- Limit to 5 frames per second
    clock.tick(5)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# Close the window and quit.
pygame.quit()
