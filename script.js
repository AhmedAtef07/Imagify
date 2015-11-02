// This file is owned to Ahmed Atef [AhmedAtef07 @github, @fb, @twitter and @gmail]
// Created on 31 Oct 2015 10:54 PM.

var canvas = {};
var ctx = {};
var app = {};

function runOnce() {
  initApp();

  $('input').bind("propertychange change click keyup input paste", function(event) {draw();});
  $('textarea').bind("propertychange change click keyup input paste", function(event) {draw();});

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  addCustomColors($('#bg-color-picker'), COLORS, "bgcolor");
  addCustomColors($('#font-color-picker'), COLORS, "fontcolor");

  draw();
}

function addCustomColors(parent, colors, target) {
  for(var i in colors) {
    $(parent).append($('<button/>', {
        text: "7", 
        title: colors[i].name,
        target: target,
        value: colors[i].value,
        class: "btn",
        click: function (event) { colorButtonClicked(event); }
    }).css({
      "background-color": colors[i].value,
      "color": colors[i].value,
      "border-width": 0,
    }));

  }
}

function colorButtonClicked(event) {
  var srcElement = event.target || event.srcElement;
  app[$(srcElement).attr("target")] = srcElement.value;

  draw();
}


function draw() {
  var width = canvas.width;
  var height = canvas.height;

  ctx.fillStyle = app.bgcolor;
  ctx.fillRect(0, 0, width, height);

  ctx.textBaseline = 'bottom';
  ctx.fillStyle = app.fontcolor;
  
  app.font.size = parseInt(app.font.size);

  ctx.font = app.font.toString();

  var text = $("#text").val();
  var textHeight = getTextHeight(app.font).height;
  wrapText(ctx, text, 50, 50, width - 50 - 50, textHeight);
}


function wrapText(ctx, text, x, y, maxWidth, fontHeight) {
  var lines = [],
      line = '',
      lineTest = '',
      words = text.split(' '),
      currentY = 0;

  for (var i = 0, len = words.length; i < len; i++) {
    lineTest = line + words[i] + ' ';
    
    if (ctx.measureText(lineTest).width > maxWidth) {
      currentY = lines.length * fontHeight + fontHeight;
      lines.push({ text: line, height: currentY });
      line = words[i] + ' ';
    } else {
      line = lineTest;
    }
  }

  if (line.length > 0) {
    currentY = lines.length * fontHeight + fontHeight;
    lines.push({ text: line.trim(), height: currentY });
  }

  for (var i = 0, len = lines.length; i < len; i++) {
    ctx.fillText(lines[i].text, x, lines[i].height + y);
  }
}


var getTextHeight = function(font) {

  var text = $('<span>Hg</span>').css({ font: font.toString() });
  var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

  var div = $('<div></div>');
  div.append(text, block);

  var body = $('body');
  body.append(div);

  var result = {};
  try {

    block.css({ verticalAlign: 'baseline' });
    result.ascent = block.offset().top - text.offset().top;

    block.css({ verticalAlign: 'bottom' });
    result.height = block.offset().top - text.offset().top;

    result.descent = result.height - result.ascent;

  } finally {
    div.remove();
  }

  return result;
};

function addFotor(thinkness, color) {
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(width, height);
  ctx.lineWidth = thinkness;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function convertCanvasToImage() {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}


function downloadCanvasAsImage() {
  var a = $("<a>")
      .attr("href", canvas.toDataURL("image/png"))
      .attr("download", "textimagify.png")
      .appendTo("body");

  a[0].click();

  a.remove();
}


function initApp() {
  app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!',
      width: 0,
      height: 0,
      font: {
        family: "Source Sans Pro, Amiri",
        size: 70,
        wight: 300,
        toString: function() {
          return this.wight + " " + this.size + "px " + this.family;
        }
      },
      bgcolor: "#FBFBFB",
      fontcolor: "#34495e",
    }
  });
}


// Constants

var COLORS = [
  { value: "#1abc9c", name: "Turquoise" },
  { value: "#16a085", name: "Greensea" },
  { value: "#2ecc71", name: "Emerland" },
  { value: "#27ae60", name: "Nephritis" },
  { value: "#3498db", name: "Peterriver" },
  { value: "#2980b9", name: "Belizehole" },
  { value: "#9b59b6", name: "Amethyst" },
  { value: "#8e44ad", name: "Wisteria" },
  { value: "#34495e", name: "Wetasphalt" },
  { value: "#2c3e50", name: "Midnightblue" },
  { value: "#f1c40f", name: "Sunflower" },
  { value: "#f39c12", name: "Orange" },
  { value: "#e67e22", name: "Carrot" },
  { value: "#d35400", name: "Pumpkin" },
  { value: "#e74c3c", name: "Alizarin" },
  { value: "#c0392b", name: "Pomegranate" },
  { value: "#FFFFFF", name: "White" },
  { value: "#FBFBFB", name: "Lightgray" },
  { value: "#ecf0f1", name: "Clouds" },
  { value: "#bdc3c7", name: "Silver" },
  { value: "#95a5a6", name: "Concrete" },
  { value: "#7f8c8d", name: "Asbestos," },
  { value: "#000000", name: "Black," },
];