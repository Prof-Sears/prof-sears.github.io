TARGETS = Lesson_01.pdf\
	Lesson_02.pdf\
	Lesson_03.pdf\
	Lesson_27.pdf\
	Lesson_30.pdf\
	Final_Exam.pdf
LATEX=pdflatex

%.pdf: %.tex ../sears.tex
	$(LATEX) $<
	$(LATEX) $<

all: $(TARGETS)

clean:
	rm *.out *.bak *.log *.aux *.synctex.gz *.tex~
