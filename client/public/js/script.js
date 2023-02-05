let pdfPath = '../test.pdf';
        // Loading a document.
        var loadingTask = pdfjsLib.getDocument(pdfPath);
        loadingTask.promise
            .then(function(pdfDocument) {
                // Request a first page
                return pdfDocument.getPage(1).then(async function(pdfPage) {
                    // Set scale (zoom) level
                    var scale = 1;

                    // Get viewport (dimensions)
                    var viewport = pdfPage.getViewport({ scale: 1.5 });

                    // Get div#the-svg
                    var container = document.getElementById('the-svg');

                    // Set dimensions
                    container.style.width = viewport.width;
                    container.style.height = viewport.height;
                    console.log(viewport);

                    // SVG rendering by PDF.js
                    pdfPage
                        .getOperatorList()
                        .then(function(opList) {
                            var svgGfx = new pdfjsLib.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
                            return svgGfx.getSVG(opList, viewport);
                        })
                        .then(function(svg) {
                            container.appendChild(svg);
                        });

                    let textCont = document.getElementById('textLayer');
                    pdfPage.getTextContent().then((textContent) => {
                        pdfjsLib.renderTextLayer({
                            textContent,
                            container: textCont,
                            viewport,
                            textDivs: []
                        });
                    });
                    await pdfPage.getAnnotations();
                    return renderTask.promise;
                });
            })
            .catch(function(reason) {
                console.error('Error: ' + reason);
            });