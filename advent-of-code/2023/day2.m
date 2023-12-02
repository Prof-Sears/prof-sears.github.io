infile = fopen('input2.txt','r');
% Game 1: 4 blue, 7 red, 5 green; 3 blue, 4 red, 16 green; 3 red, 11 green
input = textscan(infile, 'Game %d %s','Delimiter',':');

total = 0;
totalPower = 0;

for i = 1:rows(input{2})
  valid = 1;
  reds = regexp(input{2}{i}, '[0-9]* red','match');
  maxRed = 0;
  for j = 1:columns(reds);
    red = str2double(strtok(reds{1,j}));
    if red > 12
      valid = 0;
    endif
    if red > maxRed
      maxRed = red;
    endif
  endfor

  greens = regexp(input{2}{i}, '[0-9]* green','match');
  maxGreen = 0;
  for j = 1:columns(greens)
    green = str2double(strtok(greens{1,j}));
    if green > 13
      valid = 0;
    endif
    if green > maxGreen
      maxGreen = green;
    endif
  endfor

  blues = regexp(input{2}{i}, '[0-9]* blue', 'match');
  maxBlue = 0;
  for j = 1:columns(blues)
    blue = str2double(strtok(blues{1,j}));
    if blue > 14
      valid = 0;
    endif
    if blue > maxBlue
      maxBlue = blue;
    endif
  endfor

  if valid
    total += i;
  endif

  totalPower += maxRed * maxGreen * maxBlue;

endfor

printf('Total: %d\n',total)
printf('Total Power: %d\n', totalPower)

