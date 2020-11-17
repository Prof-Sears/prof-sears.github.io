/*
   tennis.js
   
   Copyright 2019  <>
   
   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
   MA 02110-1301, USA.
*/

var debug_tournament = false;
var debug_match = false;
var debug_set = false;
var debug_game = false;
var debug_point = false;

var points_won, games_won, sets_won, matches_won, tournaments_won;
var points_played, games_playes, sets_played, matches_played, tournaments_played;

var winningSets = 0;
var numOfTourn = 0;
var tournMatches = [0,0,0,0,0,0,0,0];

var outStr = "".concat("<table><tr><th>Probabilty of Point</th>",
	"<th>Proportion of Points</th>",
	"<th>Proportion of Games</th>",
	"<th>Proportion of Sets</th>",
	"<th>Proportion of Matches</th>",
	"<th>Proportion of Tounr.</th>",
	"<th>0 Match Tourn.</th>",
	"<th>1 Match Tourn.</th>",
	"<th>2 Match Tourn.</th>",
	"<th>3 Match Tourn.</th>",
	"<th>4 Match Tourn.</th>",
	"<th>5 Match Tourn.</th>",
	"<th>6 Match Tourn.</th>",
	"<th>7 Match Tourn.</th></tr>");

var probPoint = 0.5;

/* Runs multiple simulations of a tennis tournament.
 */
function simulate() {
	clear_output();
	
	winningSets = Number(document.getElementById("setstowin").value);
	numOfTourn = Number(document.getElementById("numberoftourn").value);
	console.log("Sets to win: " + winningSets + " Simulations: " + numOfTourn);
	
	document.getElementById("status").innerHTML = "<b>Running!</b>";
	
	for(probPoint = 0.5; probPoint <=1.005; probPoint = probPoint + 0.01) {
		clear_data();
		console.log("Probability of winning point: " + probPoint);
		var i = 0;
		for(i = 0; i < numOfTourn; i++) tournMatches[simulate_tournament()]++;
		
		output_results();
	}
		
	outStr = outStr.concat("</table>");
	
	document.getElementById("output").innerHTML = outStr;
	document.getElementById("status").innerHTML = "<b>Done!</b>"
	
}

/* Simulates one point in tennis.
 * Assumes you win the point with probability 0.55.
 * Returns true if you win.
 * 
 * Note: This could be one line, but I want to make the code more readable.
 * Note: I an allergic to multiple return statements in a function.
 */
function simulate_point() {
	var retValue = false;
	
	if(Math.random() <= probPoint) retValue = true;
	/* Used for debugging purposes. */
	if(debug_point) {
		if(retValue) console.log("\t\t\tI win");
		else console.log("\t\t\tI lose");
	}
	points_played++;
	if(retValue) points_won++;
	return retValue;
}

/* Simulates one game in tennis.
 * Returns true if you win.
 */
function simulate_game() {
	var retValue = false;
	var keep_playing = true;
	var my_score = 0;
	var your_score = 0;
	
	if(debug_set) console.log("\t\tNew Game");
	while(keep_playing) {
		if(simulate_point()) my_score++;
		else your_score++;
		if(debug_game) console.log("\t\t\tmy score: " + my_score + " your score:" + your_score);
		if((my_score > 3 || your_score > 3) && Math.abs(my_score - your_score) > 1) keep_playing = false;
	}
	if(my_score > your_score) retValue = true;
	
	if(debug_set) {
		if(retValue) console.log("\t\tI win\t" + my_score + " to " + your_score);
		else console.log("\t\tYou win\t" + my_score + " to " + your_score);
	}
	
	games_played++;
	if(retValue) games_won++;
		
	return retValue;
}

/* Simulates a tiebreak game.
 * Returns true if you win.
 */
function simulate_tiebreak() {
	var retValue = false;
	var keep_playing = true;
	var my_score = 0;
	var your_score = 0;
	
	if(debug_set) console.log("\t\tNew Tiebreak Game");
	while(keep_playing) {
		if(simulate_point()) my_score++;
		else your_score++;
		if(debug_game) console.log("\t\t\tmy score: " + my_score + " your score:" + your_score);
		if((my_score > 6 || your_score > 6) && Math.abs(my_score - your_score) > 1) keep_playing = false;
	}
	if(my_score > your_score) retValue = true;
	
	if(debug_set) {
		if(retValue) console.log("\t\tI win\t" + my_score + " to " + your_score);
		else console.log("\t\tYou win\t" + my_score + " to " + your_score);
	}
	
	return retValue;
}

/* Simulates one set in tennis.
 * Returns true if you win.
 */
function simulate_set() {
	var retValue = false;
	var keep_playing = true;
	var my_score = 0;
	var your_score = 0;
	
	if(debug_match) console.log("\tNew Set");
	while(keep_playing) {
		if(simulate_game()) my_score++;
		else your_score++;
		if(debug_set) console.log("\tmy score: " + my_score + " your score: " + your_score);
		if((my_score > 5 || your_score > 5) && (Math.abs(my_score - your_score) > 1)) {
			keep_playing = false;
			if(my_score > your_score) retValue = true;
		}
		if(my_score == 6 && your_score ==6) {
			keep_playing = false;
			retValue = simulate_tiebreak();
			if(retValue) my_score++;
			else your_score++;
		}
	}
		
	/* output game results for debugging purposes. */
	if(debug_match) {
		if(retValue) console.log("\tI win " + my_score + " to " + your_score);
		else console.log("\tYou win " + my_score + " to " + your_score);
	}
	
	sets_played++;
	if(retValue) sets_won++;
	
	return retValue;
}

/* Simulate a tennis match.
 */
function simulate_match() {
	var retValue = false;
	var my_score = 0;
	var your_score = 0;
	var keep_playing = true;
	
	if(debug_tournament) console.log("New Match");
	while(keep_playing) {
		if(simulate_set()) my_score++;
		else your_score++;
		if(debug_match) console.log("\tmy score: " + my_score + " your score: " + your_score);
		if((my_score == winningSets) || (your_score == winningSets)) keep_playing = false;
	}
	if(my_score > your_score) retValue = true;
	matches_played++;
	if(retValue) matches_won++;
	
	if(debug_tournament) {
		if(retValue) console.log("I win " + my_score + " to " + your_score);
		else console.log("You win " + my_score + " to " + your_score);
	}
	
	return retValue;
}

function simulate_tournament() {
	var matches_won = 0;
	var keep_playing = true;
	
	if(debug_tournament) console.log("New Tournament");
	while(keep_playing) {
		if(simulate_match()) {
			matches_won++;
		} else {
			keep_playing = false;
		}
		if(matches_won == 7) {
			tournaments_won++;
			keep_playing = false;
		}
	}
	if(debug_tournament)console.log("Matches won " + matches_won);
	tournaments_played++;
	
	return matches_won;
}

function clear_data() {
	points_won = 0;
	points_played = 0;
	games_won = 0;
	games_played = 0;
	sets_won = 0;
	sets_played = 0;
	matches_won = 0;
	matches_played = 0;
	tournaments_won = 0;
	tournaments_played = 0;
	
	var i;
	for(i = 0; i < 8; i++) tournMatches[i] = 0;
}

function clear_output() {
	console.clear();
	document.getElementById("status").innerHTML = "";
	document.getElementById("output").innerHTML = "";
	document.getElementById("work").innerHTML = "";
}

function output_results() {
	outStr = outStr.concat("<tr><td>", probPoint, "</td><td>", 
	(points_won/points_played), "</td><td>", 
	(games_won/games_played), "</td><td>", 
	(sets_won/sets_played), "</td><td>", 
	(matches_won/matches_played), "</td>",
	"<td>", (tournaments_won/tournaments_played), "</td>");
	
	var i;
	for(i = 0; i < 8; i++) outStr = outStr.concat("<td>", (tournMatches[i]/numOfTourn), "</td>");
	
	outStr = outStr.concat("</tr>");
}
