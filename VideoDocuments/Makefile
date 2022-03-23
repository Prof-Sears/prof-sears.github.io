PDF := Hamilton_Method.pdf \
	Huntington-Hill_Method.pdf \
	Measuring_Fairness.pdf \

LIPPMAN := Hamilton_Example.docx \
	Huntington-Hill_Example.docx

SEARS := Kentucky_Ohio_Fairness.docx

%.pdf : %.txt
	pandoc -o $@ $<

all: $(PDF) $(LIPPMAN) $(SEARS)

$(LIPPMAN): %.docx: %.txt reference-lippman.docx
	pandoc -o $@ --reference-doc reference-lippman.docx $<

$(SEARS): %.docx: %.txt reference-sears.docx
	pandoc -o $@ --reference-doc reference-sears.docx $<
