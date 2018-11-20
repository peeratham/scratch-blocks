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
  let WIDTH_ =this.WIDTH_ = 8*Blockly.BlockSvg.GRID_UNIT;
  let HEIGHT_ =this.HEIGHT_ = 8*Blockly.BlockSvg.GRID_UNIT;
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
  this.block_.workspace.options.pathToMedia + lightbulbSvgPath);
  
  this.recomputeIconLocation();
  
  this.block_.getSvgRoot().appendChild(iconGroup_);

  Blockly.bindEventWithChecks_(
    this.iconGroup_, 'mouseup', this, this.hintIconClick_);
};
goog.inherits(Blockly.Hint, Blockly.Icon);

Blockly.Hint.prototype.hintIconClick_ = function(e) {
  console.log('todo: show context menu for refactoring');
};

Blockly.Hint.prototype.recomputeIconLocation = function(){
  let bBox = {width: this.block_.width, height: this.block_.height};
  let offset = 2 * Blockly.BlockSvg.GRID_UNIT;
  let left = bBox.width+offset;
  let top = bBox.height/2-this.HEIGHT_/2;

  this.iconGroup_.setAttribute('transform',
    'translate(' + left + ',' + top + ')'); 
};