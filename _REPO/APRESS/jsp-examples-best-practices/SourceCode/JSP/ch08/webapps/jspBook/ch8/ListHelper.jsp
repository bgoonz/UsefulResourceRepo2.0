<!-- Declare tag that we'll use as our helper -->
<%@ taglib uri="/helpers" prefix="helpers" %>

<html>
<head>
	<title>List Examples</title>
</head>

<body>

<basefont face="Arial">

<center>

<h1>List Examples</h1>

<table width="600">
	<tr>
		<td valign="top" width="150">
			<helpers:ListTag format="<%= jspbook.ch8.ListTag.BULLET_ORB %>">
				High Card
				Pair
				Two Pair
				Three of a Kind
				Straight
				Flush
				Full House
				Four of a Kind
				Straight Flush
				Royal Flush
			</helpers:ListTag>
		</td>
		<td valign="top" width="150">
			<helpers:ListTag format="<%= jspbook.ch8.ListTag.BULLET_PLUS %>">
				Milwaukee Bucks
				Detroit Pistons
				Toronto Raptors
				Indiana Pacers
				Charlotte Hornets
				Cleveland Cavaliers
				Atlanta Hawks
				Chicago Bulls
			</helpers:ListTag>
		</td>
		<td valign="top" width="300">
			<helpers:ListTag format="<%= jspbook.ch8.ListTag.BULLET_ARROW %>">
				Chapter 1 - The History of Cheese
				Chapter 2 - The Many Faces of Cheese
				Chapter 3 - Love and Cheese
				Chapter 4 - Not Just for Mice
				Chapter 5 - So You're a Cheesehead...
				Chapter 6 - The Perfect Cheese
				Chapter 7 - Cheddar is Better
				Chapter 8 - The Big Cheese
			</helpers:ListTag>
		</td>
	</tr>
</table>

</center>

</body>
</html>
