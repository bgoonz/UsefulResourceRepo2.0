/* ---------
 * Challenge
 * ---------

 Two teams of 5 members will face off, the strongest of which will prevail. 
 Each team member will be assigned a strength rating (1-9), with the most 
 powerful members having a rating of 9. Your goal is to determine, based on 
 the cumulative strength of the members of each team, which team will win the war.

 The teams will be represented by an array of arrays:

 [[5,0,3,2,1], [1,6,8,2,9]]  // 11 < 26 ; "Team 2 wins!"

 If team one is stronger, return the string "Team 1 wins!" If team two is stronger, 
 return the string "Team 2 wins!"

 If the two teams are of equal strength, the team with the strongest Anchor (the member 
 furthest from the center of the rope) will win. In the above example, the member with 
 strength 5 is team one's Anchor and strength 9 is team two's Anchor. If the teams and 
 the Anchors are both of equal strength, return the string "It's a tie!"
*/

function tug_o_war(teams) {
  //Code
  var team1 = teams[0].reduce((a, b) => a + b);
  var team2 = teams[1].reduce((a, b) => a + b);
   
  if (team1 > team2) {
    return "Team 1 wins!";
  }
  
  else if (team1 < team2) {
    return "Team 2 wins!";
  }
  
  else {
    var max1 = Math.max(teams[0]);
    var max2 = Math.max(teams[1]);
    if(max1 < max2) {
      return "Team 2 wins!";
    } 
    else if(max2 < max1) {
      return "Team 1 wins!"; 
    } else {
      return "It's a tie!";
    }
  }
}