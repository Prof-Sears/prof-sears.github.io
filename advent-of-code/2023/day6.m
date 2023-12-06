infile = fopen('input6.txt','r');
input = textscan(infile,'%s %s','delimiter',':');

times = str2double(regexp(input{2}{1},'[0-9]+','match'));
records = str2double(regexp(input{2}{2}, '[0-9]+', 'match'));
victories = zeros(1, columns(times));

for i = 1:columns(times)
  for j = 0:times(i)
    if j*(times(i) - j) > records(i)
      victories(i)++;
    endif
  endfor
  disp(victories(i))
endfor
printf('Part 1: %d\n', prod(victories));

grand_t = '';
grand_r = '';
for i = 1:columns(times)
  grand_t = strcat(grand_t, num2str(times(i)));
  grand_r = strcat(grand_r, num2str(records(i)));
endfor
grand_t = str2double(grand_t);
grand_r = str2double(grand_r);

x_0 = ceil((grand_t - sqrt(grand_t * grand_t - 4*grand_r))/2);
x_1 = floor((grand_t + sqrt(grand_t * grand_t - 4*grand_r))/2);
printf('bounds: %d %d\n', x_0, x_1)
printf('Part 2: %d\n', x_1 - x_0 + 1)
