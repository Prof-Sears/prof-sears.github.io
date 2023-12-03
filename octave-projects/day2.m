%%%
% Advent of Code 2023, Day 2
% Updated and revised version
%%%

% Import the input and parse the data
% Result is a column containing the game id's and a column containint the day information.
infile = fopen('input2.txt','r');
input = textscan(infile, 'Game %d %s','Delimiter',':');

total = 0;
totalPower = 0;

for i = 1:rows(input{2})
  % Find the maximum number of red dice for each game.
  % 1) Find each red die mention with a regular expression.
  % 2) Pull the number from the die mention.
  % 3) Convert the number from a string to a number.
  % 4) Find the maximum of the numbers.
  maxRed = max(str2double(strtok(regexp(input{2}{i}, '[0-9]* red', 'match'))));

  % Green and blue dice are similar.
  maxGreen = max(str2double(strtok(regexp(input{2}{i}, '[0-9]* green', 'match'))));
  maxBlue = max(str2double(strtok(regexp(input{2}{i}, '[0-9]* blue', 'match'))));

  % Test if the games are valid. If valid, add the game ID to the total.
  if maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14
    total += i;
  endif

  % Add the power to the total power
  totalPower += maxRed * maxGreen * maxBlue;

endfor

% Output results
printf('Total: %d\n',total)
printf('Total Power: %d\n', totalPower)

