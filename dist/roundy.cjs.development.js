'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var reactUseGesture = require('react-use-gesture');
var hexoid = _interopDefault(require('hexoid'));
var styled = _interopDefault(require('styled-components'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n  position: absolute;\n  width: 210px;\n  height: 210px;\n  @media screen and (min-width: 768px) {\n    height: 310px;\n    width: 310px;\n  }\n  top: -10px;\n  svg path {\n    opacity: 0.7;\n  }\n  .sliderHandle {\n    width: 50%;\n    pointer-events: all;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform-origin: 0 50%;\n    &:after {\n      content: '';\n      display: block;\n      width: 15px;\n      height: 15px;\n      border-radius: 30px;\n      position: absolute;\n      right: -5px;\n      background: linear-gradient(to top, #fff, #f2f2f2);\n      border: 1px solid #ccc;\n      top: -10px;\n      transform: all ease 0.4s;\n    }\n    &:hover:after {\n      box-shadow: 0 0 10px rgb(37, 205, 247);\n    }\n  }\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Style = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject(), function (_ref) {
  var overrideStyle = _ref.overrideStyle;
  return overrideStyle;
});

var DEGREE_IN_RADIANS = Math.PI / 180;
var valueToAngle = function valueToAngle(value, props) {
  if (value === void 0) {
    value = 0;
  }

  var max = props.max,
      min = props.min,
      arcSize = props.arcSize;
  var angle = (value - min) / (max - min) * arcSize;
  return angle;
};
var getArc = function getArc(startAngle, endAngle, props) {
  var radius = props.radius,
      strokeWidth = props.strokeWidth;
  var pathRadius = radius - strokeWidth / 2;
  var start = polarToCartesian(pathRadius, startAngle, radius);
  var end = polarToCartesian(pathRadius, endAngle, radius);
  var largeArcFlag = startAngle <= 180 ? 0 : 1;
  return "M " + start + " A " + pathRadius + " " + pathRadius + " 0 " + largeArcFlag + " 0 " + end;
};

var polarToCartesian = function polarToCartesian(pathRadius, angle, radius) {
  var angleInRadians = (angle - 180) * DEGREE_IN_RADIANS;
  var x = radius + pathRadius * Math.cos(angleInRadians);
  var y = radius + pathRadius * Math.sin(angleInRadians);
  return x + ' ' + y;
};

var getCenter = function getCenter(node, radius) {
  var rect = node.current.getBoundingClientRect();
  return {
    top: rect.top + radius,
    left: rect.left + radius
  };
};
var limitValue = function limitValue(value, min, max) {
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
};

var radToDeg = function radToDeg(rad) {
  return rad * (180 / Math.PI);
};

var getAngle = function getAngle(y, x, rotationOffset) {
  var angle = radToDeg(Math.atan2(y, x)) + 180 - rotationOffset;

  if (angle > 360) {
    angle = angle - 360;
  }

  if (angle < 0) {
    angle = 360 + angle;
  }

  return angle;
};
var angleToValue = function angleToValue(angle, props) {
  var min = props.min,
      max = props.max,
      arcSize = props.arcSize;
  var v = angle / arcSize * (max - min) + min;
  return v;
};

var classNamePrefix = 'RoundSlider';
var defaultProps = {
  color: 'purple',
  bgColor: '#ccc',
  max: 100,
  min: 0,
  stepSize: 0,
  // by default we want smooth sliding
  steps: 0,
  sliced: true,
  strokeWidth: 4,
  rotationOffset: 0,
  arcSize: 360,
  value: 50,
  radius: 105
};

function Roundy(optProps) {
  var props = _extends({}, defaultProps, {}, optProps);

  var uniqueId = hexoid(7)();
  var color = props.color,
      bgColor = props.bgColor,
      max = props.max,
      min = props.min,
      steps = props.steps,
      stepSize = props.stepSize,
      strokeWidth = props.strokeWidth,
      radius = props.radius,
      sliced = props.sliced,
      style = props.style,
      arcSize = props.arcSize,
      rotationOffset = props.rotationOffset,
      onAfterChange = props.onAfterChange,
      allowClick = props.allowClick,
      render = props.render,
      onChange = props.onChange;

  var _wrapper = React.useRef(null);

  var _handle = React.useRef(null);

  var isDrag = React.useRef(false);

  var _React$useState = React.useState({
    value: props.value,
    angle: valueToAngle(props.value, props)
  }),
      state = _React$useState[0],
      setAll = _React$useState[1];

  var bind = reactUseGesture.useDrag(function (_ref) {
    var down = _ref.down,
        _ref$xy = _ref.xy,
        x = _ref$xy[0],
        y = _ref$xy[1];
    setValueAndAngle(x, y, !down ? function (newState) {
      isDrag.current = down;
      onAfterChange && onAfterChange(newState, props);
    } : undefined);
  });
  React.useEffect(function () {
    if (props.value !== state.value) {
      var newState = {
        value: props.value,
        angle: valueToAngle(props.value, props)
      };
      setAll(newState);
    }
  }, [props.value]);

  var setState = function setState(obj) {
    return setAll(function (prev) {
      return _extends({}, prev, {}, obj);
    });
  };

  var angle = state.angle;
  var segments = steps || (stepSize ? Math.floor((max - min) / stepSize) : 0);
  var maskName = classNamePrefix + "_" + uniqueId;
  var size = radius * 2;
  var styleRotation = {
    transform: "rotate(" + rotationOffset + "deg)",
    transformOrigin: '50% 50%'
  };

  var setValueAndAngle = function setValueAndAngle(x, y, cb) {
    var _getCenter = getCenter(_wrapper, radius),
        left = _getCenter.left,
        top = _getCenter.top;

    var dX = x - left;
    var dY = y - top;

    var _stepRounding = stepRounding(getAngle(dY, dX, rotationOffset)),
        value = _stepRounding.value,
        angle = _stepRounding.angle;

    var newState = {
      value: value,
      angle: angle
    };
    setState(newState);

    if (cb) {
      cb(newState);
    }

    onChange && onChange(value, props);
  };

  var updateOnClick = function updateOnClick(event) {
    if (isDrag.current) {
      return;
    }

    var clientX = event.clientX,
        clientY = event.clientY;
    var eX = clientX,
        eY = clientY;
    eX = clientX;
    eY = clientY;
    setValueAndAngle(eX, eY, function (newState) {
      onAfterChange && onAfterChange(newState, props);
    });
  };

  var getMaskLine = function getMaskLine(segments, index) {
    var radius = props.radius,
        arcSize = props.arcSize;
    var val = arcSize / segments * index + 180;
    var rotateFunction = 'rotate(' + val.toString() + ',' + radius + ',' + radius + ')';
    return React.createElement("g", {
      key: index,
      transform: rotateFunction
    }, React.createElement("line", {
      x1: radius,
      y1: radius,
      x2: radius * 2,
      y2: radius,
      style: {
        stroke: 'rgb(0,0,0)',
        strokeWidth: 2
      }
    }));
  };

  var stepRounding = function stepRounding(degree) {
    var stepSize = props.stepSize,
        steps = props.steps,
        min = props.min,
        max = props.max,
        arcSize = props.arcSize;
    var step = stepSize || (steps ? (max - min) / steps : 1);
    var oldAngle = state.angle;
    var angToValue = min;

    if (!isDrag.current) {
      angToValue = angleToValue(degree, props);
    } else {
      angToValue = angleToValue(oldAngle > arcSize - 20 && degree < arcSize / 4 ? Math.max(degree, arcSize) : oldAngle < 20 && degree > arcSize - 20 ? Math.min(degree, 0) : degree, props);
    }

    var value;
    var remain = (angToValue - min) % step;
    var currVal = angToValue - remain;
    var nextVal = limitValue(currVal + step, min, max);
    var preVal = limitValue(currVal - step, min, max);
    if (angToValue >= currVal) value = angToValue - currVal < nextVal - angToValue ? currVal : nextVal;else {
      value = currVal - angToValue > angToValue - preVal ? currVal : preVal;
    }
    value = Math.round(value);
    var ang = valueToAngle(value, props);
    return {
      value: value,
      angle: ang
    };
  };

  return React.createElement(Style, {
    className: "roundy",
    onClick: updateOnClick,
    style: allowClick || render ? style : _extends({}, style || {}, {
      pointerEvents: 'none'
    })
  }, render ? React.createElement("div", Object.assign({
    className: "roundyRenderPropsParent",
    ref: _wrapper
  }, bind(), {
    style: {
      width: size,
      height: size,
      display: 'inline-block'
    }
  }), render(state, props)) : React.createElement(React.Fragment, null, React.createElement("svg", {
    ref: _wrapper,
    width: size,
    height: size
  }, sliced && React.createElement("defs", null, React.createElement("mask", {
    id: maskName,
    maskUnits: "userSpaceOnUse",
    style: styleRotation
  }, React.createElement("rect", {
    x: 0,
    y: 0,
    width: size,
    height: size,
    fill: "white"
  }), Array.from({
    length: segments
  }).map(function (_, i) {
    return getMaskLine(segments, i);
  }))), React.createElement("path", {
    fill: "transparent",
    strokeDashoffset: "0",
    strokeWidth: strokeWidth,
    stroke: bgColor,
    mask: sliced ? "url(#" + maskName + ")" : undefined,
    style: styleRotation,
    d: getArc(Math.min(arcSize, 359.9999), 0, props)
  }), React.createElement("path", {
    fill: "none",
    strokeWidth: strokeWidth,
    stroke: color,
    mask: sliced ? "url(#" + maskName + ")" : undefined,
    style: styleRotation,
    d: getArc(Math.min(angle, 359.9999), 0, props)
  })), React.createElement("div", Object.assign({
    ref: _handle,
    className: "sliderHandle"
  }, bind(), {
    style: {
      transform: "rotate(" + (angle + rotationOffset) + "deg) scaleX(-1)"
    }
  }))));
}

exports.default = Roundy;
//# sourceMappingURL=roundy.cjs.development.js.map
