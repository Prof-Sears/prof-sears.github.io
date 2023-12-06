infile = fopen("input3.txt","r");
input = textscan(infile, '%s');

% pull out the locations and values of the numbers
for i = 1:1
  trow = input{1}{i};
  disp(trow)
  disp(regexp(trow,'[0-9]*'))
  disp(regexp(trow,'[0-9]*','match'))
endfor

fclose(infile);
