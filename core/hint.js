'use strict';

goog.provide('Blockly.Hint');

goog.require('Blockly.Bubble');
goog.require('Blockly.Events.Ui');
goog.require('Blockly.Icon');


/**
 * Class for a hint.
 * @param {!Blockly.Block} block The block associated with this hint.
 * @extends {Blockly.Icon}
 * @constructor
 */
Blockly.Hint = function(block) {
  Blockly.Hint.superClass_.constructor.call(this, block);
  let iconGroup_ = this.iconGroup_ = Blockly.utils.createSvgElement('g', {'class': 'blocklyIconGroup'}, null);
  let WIDTH_ = 8*Blockly.BlockSvg.GRID_UNIT;
  let HEIGHT_ = 8*Blockly.BlockSvg.GRID_UNIT;
  let lightbulbSvgPath = '/icons/set-led_yellow.svg';
  var lightbulbSvg = Blockly.utils.createSvgElement(
      'image',
      {
        'width': WIDTH_,
        'height': HEIGHT_
      },
      iconGroup_
    );
  lightbulbSvg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
    block.workspace.options.pathToMedia + lightbulbSvgPath);
  
  let scale = block.workspace.scale;
  let bBox = {width: block.width, height: block.height};
  bBox.width *= scale;
  bBox.height *= scale;
  let offset = 9 * Blockly.BlockSvg.GRID_UNIT;
  let left = bBox.width+offset;
  let top = bBox.height/2-HEIGHT_/2;

  iconGroup_.setAttribute('transform',
    'translate(' + left + ',' + top + ')'); 
  iconGroup_.setAttribute('x',left);
  
  block.getSvgRoot().appendChild(iconGroup_);
  this.computeIconLocation();

  Blockly.bindEventWithChecks_(
    this.iconGroup_, 'mouseup', this, this.hintIconClick_);
};
goog.inherits(Blockly.Hint, Blockly.Icon);

Blockly.Icon.prototype.hintIconClick_ = function(e) {
  console.log('todo: show context menu for refactoring');
}

// /**
//  * Create the text for the warning's bubble.
//  * @param {string} text The text to display.
//  * @return {!SVGTextElement} The top-level node of the text.
//  * @private
//  */
// Blockly.Warning.textToDom_ = function(text) {
//   var paragraph = /** @type {!SVGTextElement} */
//       (Blockly.utils.createSvgElement(
//           'text',
//           {
//             'class': 'blocklyText blocklyBubbleText',
//             'y': Blockly.Bubble.BORDER_WIDTH
//           },
//           null)
//       );
//   var lines = text.split('\n');
//   for (var i = 0; i < lines.length; i++) {
//     var tspanElement = Blockly.utils.createSvgElement('tspan',
//         {'dy': '1em', 'x': Blockly.Bubble.BORDER_WIDTH}, paragraph);
//     var textNode = document.createTextNode(lines[i]);
//     tspanElement.appendChild(textNode);
//   }
//   return paragraph;
// };

// /**
//  * Show or hide the warning bubble.
//  * @param {boolean} visible True if the bubble should be visible.
//  */
// Blockly.Warning.prototype.setVisible = function(visible) {
//   if (visible == this.isVisible()) {
//     // No change.
//     return;
//   }
//   Blockly.Events.fire(
//       new Blockly.Events.Ui(this.block_, 'warningOpen', !visible, visible));
//   if (visible) {
//     // Create the bubble to display all warnings.
//     var paragraph = Blockly.Warning.textToDom_(this.getText());
//     this.bubble_ = new Blockly.Bubble(
//         /** @type {!Blockly.WorkspaceSvg} */ (this.block_.workspace),
//         paragraph, this.block_.svgPath_, this.iconXY_, null, null);
//     if (this.block_.RTL) {
//       // Right-align the paragraph.
//       // This cannot be done until the bubble is rendered on screen.
//       var maxWidth = paragraph.getBBox().width;
//       for (var i = 0, textElement; textElement = paragraph.childNodes[i]; i++) {
//         textElement.setAttribute('text-anchor', 'end');
//         textElement.setAttribute('x', maxWidth + Blockly.Bubble.BORDER_WIDTH);
//       }
//     }
//     this.updateColour();
//     // Bump the warning into the right location.
//     var size = this.bubble_.getBubbleSize();
//     this.bubble_.setBubbleSize(size.width, size.height);
//   } else {
//     // Dispose of the bubble.
//     this.bubble_.dispose();
//     this.bubble_ = null;
//     this.body_ = null;
//   }
// };

// /**
//  * Bring the warning to the top of the stack when clicked on.
//  * @param {!Event} _e Mouse up event.
//  * @private
//  */
// Blockly.Warning.prototype.bodyFocus_ = function(_e) {
//   this.bubble_.promote_();
// };

// /**
//  * Set this warning's text.
//  * @param {string} text Warning text (or '' to delete).
//  * @param {string} id An ID for this text entry to be able to maintain
//  *     multiple warnings.
//  */
// Blockly.Warning.prototype.setText = function(text, id) {
//   if (this.text_[id] == text) {
//     return;
//   }
//   if (text) {
//     this.text_[id] = text;
//   } else {
//     delete this.text_[id];
//   }
//   if (this.isVisible()) {
//     this.setVisible(false);
//     this.setVisible(true);
//   }
// };

// /**
//  * Get this warning's texts.
//  * @return {string} All texts concatenated into one string.
//  */
// Blockly.Warning.prototype.getText = function() {
//   var allWarnings = [];
//   for (var id in this.text_) {
//     allWarnings.push(this.text_[id]);
//   }
//   return allWarnings.join('\n');
// };

// /**
//  * Dispose of this warning.
//  */
// Blockly.Warning.prototype.dispose = function() {
//   this.block_.warning = null;
//   Blockly.Icon.prototype.dispose.call(this);
// };
