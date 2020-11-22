function buildCalendars() {
	console.log("Building Calendar.");
	var output = '<table>';
	output += outputHeaders();
	
	for(let i = 0; i < 4; i++) {
		let calendar = buildCalendar(i+1);
		output += outputCalendar(i+1,calendar);
	}
	output += '</table>';
	
	document.getElementById('builderout').innerHTML = output;
	document.getElementById('buildbutton').disabled = true;
	document.getElementById('reducebutton').disabled = false;
}

/**
 * This function builds a four-year calendar containing the days of the years for all 13ths of each month.
 * @param leapYear - The position of the leap year in the calendar. Leap year positions range from 1 to 4. I'm pretty sure this won't matter in the long run.
 */
function buildCalendar(leapYear) {
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var calendar = [13];
	var currentDay = 13;
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 12; j++) {
			if(((i+1) == leapYear) &&(j == 1)) currentDay += 29;
			else currentDay += daysInMonth[j];
			calendar.push(currentDay);
		}
	}
	// We get an extra day, so remove the last day in the list.
	calendar.pop();
	return calendar;
}

/**
 * This function builds the header for the output tables.
 */
function outputHeaders() {
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var output = '<tr><th>Leap Year Position</th>';
	for(let i = 0; i < 48; i++) output += '<th>' + months[i % 12] + '</th>';
	output += '</tr>';
	return output
}

/**
 * This function outputs the contents of a calendar.
 */
function outputCalendar(position, calendar) {
	var output = '<tr><td style="text-align:center">' + position + '</td>';
	for(let i = 0; i < calendar.length; i++) output += '<td>' + calendar[i] + '</td>';
	output += '</tr>';
	return output;
}

/**
 * This function reduces the calendar dates mod 7.
 */
function reduceCalendars() {
	console.log("Reduceing Calendar.");
	var output = '<table>';
	output += outputHeaders();
	
	for(let i = 0; i < 4; i++) {
		let calendar = buildCalendar(i+1);
		for(let j = 0; j < calendar.length; j++) calendar[j] = calendar[j] % 7;
		output += outputCalendar(i+1,calendar);
	}
	output += '</table>';
	
	document.getElementById('reducerout').innerHTML = output;
	document.getElementById('reducebutton').disabled = true;
	document.getElementById('countbutton').disabled = false;
}

/** 
 * This function counts the occurances of each equivalence class mod n.
 */
 function countDays() {
	 console.log("Counting Days.");
	 
	 var output = '<table>';
	output += '<tr><th>Leap Year Position</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>';
	
	for(let i = 0; i < 4; i++) {
		let calendar = buildCalendar(i+1);
		let counts = [0,0,0,0,0,0,0];
		for(let j = 0; j < calendar.length; j++) {
			calendar[j] = calendar[j] % 7;
			counts[calendar[j]]++;
		}
		output += outputCalendar(i+1,counts);
	}
	output += '</table>';
	
	document.getElementById('counterout').innerHTML = output;
	
	document.getElementById('countbutton').disabled = true;
	
	document.getElementById('firstcon').innerHTML = outputConclusion();
 }

function outputConclusion() {
	return '<p>From the table above, we see that day 6, when the leap year is first, occurs the most. Making day 6 a Friday means that day 1 is a Sunday. Thus, the most Friday the 13ths in a four-year period is when January 1st is a Sunday and the first day of a leap year.';
}

/**
 * This function runs the extra credit portion of the problem.
 */
function extraCredit() {
	console.log("Running Extra Credit.");
	
	var skip = document.getElementById('skipbox').checked;
	
	var maxCount = 0;
	var output = '<h2>Results:</h2>';
	output += '<table><tr><th>Start Date</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>';
	
	/* Loop through the possible positions for a leap year. */
	for(let sYear = 0; sYear < 4; sYear++) {
		/* Loop through the possible months. */
		for(let sMonth = 0; sMonth < 12; sMonth++) {
			/* Build a calendar containing the days of the year for the 13th of every month with the 13th of month j as Day 1. */
			let calendar = [1];
			for(let i = 1; i < 48; i++) {
				let cMonth = (i + sMonth) % 12;
				let cYear = sYear + Math.floor((i + sMonth) / 12);
				calendar.push(calendar[i-1] + daysInMonth(cMonth, ((cYear % 4) == 0) && !skip));
			}
			
			/* Reduce all days of the year modulo 7 and count the equivalence classes in the calendar.*/
			let counts = [0,0,0,0,0,0,0];
			for(let i = 0; i < calendar.length; i++) counts[calendar[i] % 7]++;
			
			/* Output results. */
			output += '<tr><td>13 ' + monthText(sMonth) + ' Year ' + (sYear + 1) + '</td>'
			for(let i = 0; i < counts.length; i++) {
				output += '<td>' + counts[i] + '</td>';
				if(counts[i] > maxCount) maxCount = counts[i];
			}
			output += '</tr>';
			
		}
		
	}
		
	output += '</table>';
	output += '<h2>Maximum number of 13ths with the same day of the week: ' + maxCount + '</h2>';
	document.getElementById('extraout').innerHTML = output;
}

/**
 * This function returns the days in a month. There is probably a build-in
 * version of this in JavaScript. Coding it will probably be just as fast
 * as doing an internet search.
 * 
 * @param monthNumber - The number of the month. January is month 0.
 * @param leapYear - <code>true</code> if the year is a leap year.
 */
function daysInMonth(monthNumber,leapYear) {
	var retValue = 30;
	switch(monthNumber) {
		case 1:
			if(leapYear) retValue = 29;
			else retValue = 28;
			break;
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			retValue = 31;
			break;
	}
	return retValue;
}

function monthText(monthNum) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return months[monthNum];
}
