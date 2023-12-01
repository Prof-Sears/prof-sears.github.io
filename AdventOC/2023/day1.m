infile = fopen('input1.txt','r');
a = textscan(infile, '%s');

printf("Input size: %d\n", rows(a{1}))

total = 0;
value = 0;

for i = 1:rows(a{1})
  tokens = regexp(a{1}{i}, '\d','match');
  value = 10 * str2double(tokens{1,1}) + str2double(tokens{1,columns(tokens)});
  total += value;
endfor

printf("Part 1 total: %d\n",total)

total = 0;

for i = 1:rows(a{1})
  tokens = regexp(a{1}{i}, '\d|one|two|three|four|five|six|seven|eight|nine|','match');

  switch( tokens{1,1})
    case {"1", "2", "3", "4", "5", "6", "7", "8", "9"}
      value = 10 * str2double(tokens{1,1});
    case "one"
      value = 10;
    case "two"
      value = 20;
    case "three"
      value = 30;
    case "four"
      value = 40;
    case "five"
      value = 50;
    case "six"
      value = 60;
    case "seven"
      value = 70;
    case "eight"
      value = 80;
    case "nine"
      value = 90;
    otherwise
      value = 0;
  endswitch

  tokens = regexp(flip(a{1}{i}), '\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin','match');

  switch( tokens{1,1})
    case {"1", "2", "3", "4", "5", "6", "7", "8", "9"}
      value += str2double(tokens{1,1});
    case "eno"
      value += 1;
    case "owt"
      value += 2;
    case "eerht"
      value += 3;
    case "ruof"
      value += 4;
    case "evif"
      value += 5;
    case "xis"
      value += 6;
    case "neves"
      value += 7;
    case "thgie"
      value += 8;
    case "enin"
      value += 9;
    otherwise
      value += 0;
  endswitch

  total += value;

endfor

printf("Part 2 total: %d\n",total)
