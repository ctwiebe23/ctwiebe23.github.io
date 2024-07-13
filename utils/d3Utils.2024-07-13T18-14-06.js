import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 * scales the given coord (in the range [0, 100]) to the range used by HTML
 */
var px = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 400]);

const CANVAS = d3.select("#canvas");
const RADIUS = 5;
const COLOR = "grey";

/**
 * clears the canvas
 */
function clearCanvas() {
  CANVAS.selectAll('*').remove();
}

/**
 * draws a circle made from the given node using d3
 */
function drawCircle(node) {
  var group = CANVAS.append("g");

  group.append("circle")
    .attr("cx", px(node.x))
    .attr("cy", px(node.y))
    .attr("r", px(RADIUS))
    .style("fill", COLOR);

  group.append("text")
    .attr("x", px(node.x))
    .attr("y", px(node.y))
    .attr("stroke", "#fff")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .text(node.item);

  return group;
}

/**
 * draws a line connecting the 2 given nodes using d3
 */
function drawLine(node1, node2) {
  var line = CANVAS.append("line")
    .style("stroke", "black")
    .attr("x1", px(node1.x))
    .attr("y1", px(node1.y))
    .attr("x2", px(node2.x))
    .attr("y2", px(node2.y))

    return line;
}

/**
 * draws the given hasse diagram
 */
export function drawHasse(hasse) {
  clearCanvas();

  for (let i = 0; i < hasse.length; i++) {
    for (let j = 0; j < hasse[i].length; j++) {
      for (let k = 0; k < hasse[i][j].children.length; k++) {
        drawLine(hasse[i][j], hasse[i][j].children[k]);
      }
      drawCircle(hasse[i][j]);
    }
  }
}
