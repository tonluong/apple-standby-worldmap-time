const fs = require('fs');

const DottedMap = require('dotted-map').default;

const map = new DottedMap(
{
	height: 40,									// number of lines
	grid: 'vertical'							// grid style: 'vertical' or 'diagonal'
});

// create a highlighted location
map.addPin(
{
	lat: 52.5069386,							// coordinates of the highlighted location
	lng: 13.2599276,
	svgOptions:
	{
		radius: 0.6,							// dot size
		color: '#F6A300'						// dot color
	}
});

const svgMap = map.getSVG(
{
	radius: 0.3,								// dot size
	shape: 'circle',							// dot style: 'circle' or 'hexagon'
	color: '#827670',							// dot color
	backgroundColor: '#020300',			// background color
});

// fix viewBox, add 1 to all sides, otherwise dots at the edge get cut off
const svgMapFixed = svgMap.replace(/viewBox=\"(\d+) (\d+) (\d+) (\d+)\"/,
	function(val, part1, part2, part3, part4)
	{
		return 'viewBox="'+(parseInt(part1)-1)+' '+(parseInt(part2)-1)+' '+(parseInt(part3)+1)+' '+(parseInt(part4)+1)+'"';
	});

fs.writeFileSync('./map.svg', svgMapFixed);
