/**
 * This function starts the test of a scatterplot.
 */
function testScatterplot() {
    var el = document.createElement('div')
    document.body.appendChild(el);
  
    var data = [];
    for (var d = 0; d < 10; d += 1) {
      data.push({
        a: d,
        b: d
      });
    }
  
    var vis = new candela.components.ScatterPlot(el, {
      data: data,
      x: 'a',
      y: 'b',
      width: 700,
      height: 400
    });
    vis.render();
}

/**
 * This function builds a scatterplot.
 * @param x - An array containing the x-coordinates
 * @param y - An array containing the y-coordinates
 * 
 */
function buildScatterPlot() {

}