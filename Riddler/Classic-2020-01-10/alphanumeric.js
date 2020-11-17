/* Global variables */

// These are the word forms for the numbers under twenty. Take "digits" very generally.
const digits = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
// These are the word forms of the tens place.
const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

// This will hold the output results.
var results = [];

/**
 * This is the main function. It is called from the HTML document.
 */
function run() {
  
  console.log("Program running.");
  
  results = [];
  var wName = "";
  var val, tBound;
  
  for(var i = 1; i < 2000; i++) {
    wName = wordName(i);
    val = alphanumeric(wName);
    tBound = 936*Math.floor(Math.log10(i) / 3) + 624;
    if(val > i) results.push({value: i, name: wName, alphaVal: val, bound: tBound});
  }
  
  output();
  
  console.log("Program complete.");
}

/**
 * This function outputs the results.
 */
function output() {
  
  console.log("Results output.");
  
  var outputStr = '<table><tr><th>Number</th><th>Name</th><th>Value</th><th>Theoretical Bound</tr>';
  
  for(var i = 0; i < results.length; i++) outputStr += '<tr><td>' + results[i].value + '</td><td>' + results[i].name + '</td><td>' + results[i].alphaVal + '</td><td>' + results[i].bound + '</td></tr>';
  
  outputStr += '</table>';
  
  document.getElementById("output").innerHTML = outputStr;
  
  console.log("Output complete.");
}

/**
 * This function converts a whole number into a string containing its word name.
 * WARNING: I am assuming that the number is positive and less than one million.
 */
function wordName(n) {
  var thousands = 0;
  var ones = 0;
  var name = "";
  
  /* If the number is over 1000, we will find the numbers of thousands in the number. */
  if (n > 999) {
    thousands = Math.floor(n / 1000);
    ones = n - (thousands * 1000);
    name = name += wordNameHundred(thousands) + " thousand " + wordNameHundred(ones);
  } else {
    ones = n;
    name = name += wordNameHundred(ones);
  }
  
  return name;
}

/**
 * This function converts a positive whole number less than 1000 to a word name.
 */
function wordNameHundred(n) {
  var name = "";
  
  /* Calculate each digit in the number. */
  var hundred = Math.floor(n / 100);
  var ten = Math.floor((n - hundred*100) / 10);
  var one = n - hundred*100 - ten*10
  
  if(hundred > 0) name += digits[hundred] + " hundred ";
  
  if(ten > 1) {
    name += tens[ten];
    if(one > 0) name += "-" + digits[one];
  } else {
    name += digits[ten*10 + one];
  }
  
  return name;
}

/**
 * This function converts a string into its alphanumeric value.
 * Warning: This function assumes that all letters are lower-case.
 */
function alphanumeric(word) {
  
  var value = 0;
  
  for(var i = 0; i < word.length; i++) {
    if((word.charCodeAt(i) > 96) && (word.charCodeAt(i) < 123)) value += word.charCodeAt(i) - 96;
  }
  
  return value;
}