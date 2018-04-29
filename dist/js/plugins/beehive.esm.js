/**
    * v0.0.1
    * (c) 2018 Baianat
    * @license MIT
    */
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var beehive = function () {
  function beehive(flow, settings) {
    classCallCheck(this, beehive);

    this.flow = flow;
    this.settings = settings;
  }

  createClass(beehive, [{
    key: 'init',
    value: function init() {
      this.beehive = document.createElement('div');
      var fragment = document.createDocumentFragment();
      var radius = 200;
      var xShift = radius + radius / 2;
      var yShift = radius / 2;
      var cellPerWidth = Math.round(this.flow.sliderWidth / (radius * 1.5) + 1);
      var cellPerHeight = this.flow.sliderHeight / radius;
      var cellsCount = cellPerWidth * cellPerHeight * 2 + cellPerWidth;

      this.beehive.classList.add('beehive');
      this.beehive.insertAdjacentHTML('afterbegin', '<div class="beehive-cell"></div>'.repeat(cellsCount));
      this.cells = Array.from(this.beehive.querySelectorAll('.beehive-cell'));
      this.cells.forEach(function (cell, i) {
        var x = i % cellPerWidth + 0.5 * (Math.floor(i / cellPerWidth) % 2);
        var y = Math.floor(i / cellPerWidth);
        var deltaX = x * xShift;
        var deltaY = y * yShift;
        cell.style.transitionDelay = i * 0.02 + 's';
        cell.style.clipPath = 'polygon(\n        ' + deltaX + 'px                    ' + (deltaY + radius * -0.50) + 'px,\n        ' + (deltaX + radius * 0.50) + 'px  ' + (deltaY + radius * -0.50) + 'px,\n        ' + (deltaX + radius * 0.75) + 'px  ' + deltaY + 'px,\n        ' + (deltaX + radius * 0.50) + 'px  ' + (deltaY + radius * 0.50) + 'px,\n        ' + deltaX + 'px                    ' + (deltaY + radius * 0.50) + 'px,\n        ' + (deltaX + radius * -0.25) + 'px ' + deltaY + 'px\n      )';
      });
      fragment.appendChild(this.beehive);
      this.flow.el.appendChild(fragment);
      this.updateBackground();
    }
  }, {
    key: 'updateSlide',
    value: function updateSlide(slideNumber) {
      var _this = this;

      this.flow.activeSlide.classList.remove('is-active');
      this.flow.slides[slideNumber].classList.add('is-active');
      this.beehive.classList.add('is-active');
      this.flow.updating = true;
      window.requestAnimationFrame(function () {
        _this.cells.forEach(function (cell) {
          cell.classList.add('is-hidden');
        });
        var lastCell = _this.cells[_this.cells.length - 1];
        var transitionEndCallback = function transitionEndCallback() {
          _this.flow.activeSlide = _this.flow.slides[slideNumber];
          _this.flow.updating = false;
          _this.beehive.classList.remove('is-active');
          _this.updateBackground();
          lastCell.removeEventListener('transitionend', transitionEndCallback);
        };
        lastCell.addEventListener('transitionend', transitionEndCallback);
      });
    }
  }, {
    key: 'updateBackground',
    value: function updateBackground() {
      var currentImage = this.flow.imagesSrc[this.flow.activeIndex];
      this.cells.forEach(function (cell) {
        cell.style.backgroundImage = 'url(' + currentImage + ')';
        cell.classList.remove('is-hidden');
      });
    }
  }]);
  return beehive;
}();

export default beehive;
