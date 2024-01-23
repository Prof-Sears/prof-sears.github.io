PDF = Lesson_01.pdf\
	Lesson_02.pdf\
	Lesson_03.pdf\
	Lesson_27.pdf\
	Lesson_30.pdf\
	Final_Exam.pdf

HTML = Lesson_01.html\
	Lesson_03.html\

DOCX = Lesson_01.docx\
	Lesson_03.docx

LATEX=pdflatex

%.pdf: %.tex ../sears.tex
	$(LATEX) $<
	$(LATEX) $<

%.html: %.tex ../sears.tex
	pandoc -t html -o $@ -s --mathjax=https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js -A footer.html -f latex $<

%.docx: %.tex ../sears.tex
	pandoc -t docx -o $@ --reference-doc=reference.docx -f latex $<

all: $(PDF) $(HTML) $(DOCX)

clean:
	rm *.out *.bak *.log *.aux *.synctex.gz *.tex~
