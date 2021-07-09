use BOA::Thermostat;

# tie $thermo to temperator controls for compartment 10, the captain's quarters
tie $thermo, 'BOA::Thermostat', compartment => 10;

# enter infinite loop
while (1) {
   # check temperature
   if ($thermo <= 20) {      # too cool?
      $thermo = 1;           # open the vents
   } elsif ($thermo >= 30) { # too hot?
      $thermo = 0;           # close the vents
   }
   sleep(30);                # pause for 30 seconds
}
