// This file is owned to Ahmed Atef [AhmedAtef07 @github, @fb, @twitter and @gmail]
// Created on 31 Oct 2015 10:54 PM.

var canvas = {};
var ctx = {};

var options = {
  bgcolor: "#FBFBFB",
  fontcolor: "#34495e",
  font: {
      family: "Source Sans Pro",
      size: 70,
      wight: 300,

      string: function() {
        return this.wight + " " + this.size + "px " + this.family;
      }
    }
};

var colors = [
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

function runOnce() {
  $('#text').bind("propertychange change click keyup input paste", function(event) {
    draw();
  });  
  $('.demo2').colorpicker();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // setColorPicker($('#bg-color-picker'));
  addCustomColors($('#bg-color-picker'), colors, "bgcolor");
  addCustomColors($('#font-color-picker'), colors, "fontcolor");
  draw();
}

function setColorPicker(parent) {
  parent.children().each(function(index, el) {
    console.log(el);
     $(el).css({
      "background-color": el.value,
      "color": el.value,
      "border-width": 0,

    });
  });
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
  options[$(srcElement).attr("target")] = srcElement.value;

  draw();
}


function draw() {
  var width = canvas.width;
  var height = canvas.height;

  ctx.fillStyle = options.bgcolor;
  ctx.fillRect(0, 0, width, height);

  ctx.textBaseline = 'bottom';
  ctx.fillStyle = options.fontcolor;
  
  ctx.font = options.font.string();

  var text = $("#text").val();
  var textHeight = getTextHeight(options.font).height;
  console.log(textHeight);
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
    
    // Check total width of line or last word
    if (ctx.measureText(lineTest).width > maxWidth) {
      // Calculate the new height
      currentY = lines.length * fontHeight + fontHeight;

      // Record and reset the current line
      lines.push({ text: line, height: currentY });
      line = words[i] + ' ';
    } else {
      line = lineTest;
    }
  }

  // Catch last line in-case something is left over
  if (line.length > 0) {
    currentY = lines.length * fontHeight + fontHeight;
    lines.push({ text: line.trim(), height: currentY });
  }

  // Visually output text
  // ctx.clearRect(0, 0, 500, 500);
  for (var i = 0, len = lines.length; i < len; i++) {
    ctx.fillText(lines[i].text, x, lines[i].height + y);
  }
}


var getTextHeight = function(font) {

  var text = $('<span>Hg</span>').css({ font: font.string() });
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


