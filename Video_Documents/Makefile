PDF := Hamilton_Method.pdf \
	Huntington-Hill_Method.pdf

LIPPMAN := Hamilton_Example.docx \
	Huntington-Hill_Example.docx

%.pdf : %.txt
	pandoc -o $@ $<

all: $(PDF) $(LIPPMAN)

$(LIPPMAN): %.docx: %.txt reference-lippman.docx
	pandoc -o $@ --reference-doc reference-lippman.docx $<
