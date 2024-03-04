/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  font-family: 'Inter', sans-serif;\n}\n\n:root {\n  --main-bg-color: #FBFFFF;\n  --sec-bg-color: #404040;\n  --main-acc-color: #FAA916;\n  --sec-acc-color: #96031A;\n  --main-text-color: #1B1B1E;\n  --sec-text-color: #FBFFFF;\n  --rounded-border: 12px;\n  --border-style: #1B1B1E solid 1px;\n  --drop-shadow: drop-shadow(0px 2px 10px #404040);\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  background: var(--main-bg-color);\n  margin: 0;\n}\n\n#login-page {\n  height: 100vh;\n  background: url('https://static.showit.co/file/t5GazwUVQneNSlBu7psHQw/161366/video-gif-mobile.gif');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n#login-form {\n  margin: auto;\n  border-radius: var(--rounded-border);\n  padding: 10px;\n  position: relative;\n  top: 200px;\n  width: fit-content;\n  background: rgba(251, 255, 255, .8);\n  text-align: center;\n  & legend {\n    font-size: 2rem;\n  }\n  & label {\n    padding-top: 10px;\n  }\n  & input {\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n\nheader {\n  background: var(--main-acc-color);\n  filter: var(--drop-shadow);\n  & h1 {\n    text-align: right;\n    padding-right: 10px;\n  }\n}\n\nmain {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 30px;\n  padding: 0 20px;\n}\n\n#plan-trip-container {\n  max-width: 416px;\n  background: var(--main-bg-color);\n  padding-right: 30px;\n  & h2 {\n    background: var(--sec-bg-color);\n    color: var(--sec-text-color);\n    height: 130px;\n    margin: 0;\n    padding-top: 50px;\n    text-align: center;\n  }\n  & .buttons {\n    margin-top: 20px;\n  }\n}\n\nlabel, input {\n  display: block;\n}\n\nlabel:not(:first-of-type) {\n  padding-top: 10px;\n}\n\ninput {\n  background: var(--main-bg-color);\n  border-radius: var(--rounded-border);\n  border: var(--border-style);\n  min-width: 320px;\n  min-height: 40px;\n  padding: 0 20px;\n}\n\n.buttons {\n  margin: 10px;\n  background: var(--sec-acc-color);\n  color: var(--sec-text-color);\n  border-radius: var(--rounded-border);\n  border: var(--border-style);\n  height: 40px;\n  &:hover {\n    cursor: pointer;\n  }\n}\n\n#trip-stats-container {\n  background: var(--sec-bg-color);\n  color: var(--sec-text-color);\n  width: 80%;\n  min-height: 500px;\n  & h2 {\n    padding: 30px 50px;\n    margin-bottom: 0;\n  }\n  & h3 {\n    margin: 0;\n  }\n  & div{\n    padding-left: 50px;\n  }\n  & div:last-of-type {\n    font-size: 2rem;\n    & p {\n      margin-top: 10px;\n    }\n  }\n}\n\n#trip-details-container {\n  background: var(--sec-bg-color);\n  /* min-height: 1340px; */\n  min-height: 940px;\n  padding: 10px 0;\n  & section {\n    background: var(--main-bg-color);\n    margin: 40px 20px;\n    min-height: 400px;\n    &  h2 {\n      position: relative;\n      left: -10px;\n      top: -25px;\n      background: var(--main-acc-color);\n      filter: var(--drop-shadow);\n      width: 250px;\n      text-align: center;\n      padding: 10px 0;\n      position: relative;\n    }\n  }\n}\n\n.trips {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  & img {\n    width: 280px;\n    height: 180px;\n  }\n  & h3 {\n    margin-left: auto;\n    margin-right: auto;\n    font-size: 3rem;\n  }\n}\n\n.trip-card {\n  text-align: center;\n  /* width: 40%; */\n  /* width: 250px; */\n  padding: 0 10px;\n}\n\n#search-results {\n  background: var(--sec-bg-color);\n  padding-bottom: 30px;\n  & h2 {\n    position: relative;\n    left: 20px;\n    top: 60px;\n    background: var(--main-acc-color);\n    font-size: 2.5rem;\n    filter: var(--drop-shadow);\n    width: 300px;\n    text-align: center;\n    padding: 10px 0;\n    position: relative;\n  }\n}\n\n.close-button {\n  float: right;\n}\n\n#results-container {\n  background: var(--main-bg-color);\n  width: 90%;\n  padding: 30px 0;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.result-card {\n  border-radius: var(--rounded-border);\n  border: var(--border-style);\n  margin: 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n}\n\ndialog {\n  text-align: center;\n  & p {\n    line-height: 1.7rem;\n  }\n}\n\n.hidden {\n  display: none;\n}\n\n\n\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;;;EAGE,sBAAsB;EACtB,gCAAgC;AAClC;;AAEA;EACE,wBAAwB;EACxB,uBAAuB;EACvB,yBAAyB;EACzB,wBAAwB;EACxB,0BAA0B;EAC1B,yBAAyB;EACzB,sBAAsB;EACtB,iCAAiC;EACjC,gDAAgD;AAClD;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mGAAmG;EACnG,4BAA4B;EAC5B,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,oCAAoC;EACpC,aAAa;EACb,kBAAkB;EAClB,UAAU;EACV,kBAAkB;EAClB,mCAAmC;EACnC,kBAAkB;EAClB;IACE,eAAe;EACjB;EACA;IACE,iBAAiB;EACnB;EACA;IACE,iBAAiB;IACjB,kBAAkB;EACpB;AACF;;AAEA;EACE,iCAAiC;EACjC,0BAA0B;EAC1B;IACE,iBAAiB;IACjB,mBAAmB;EACrB;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,gCAAgC;EAChC,mBAAmB;EACnB;IACE,+BAA+B;IAC/B,4BAA4B;IAC5B,aAAa;IACb,SAAS;IACT,iBAAiB;IACjB,kBAAkB;EACpB;EACA;IACE,gBAAgB;EAClB;AACF;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,gCAAgC;EAChC,oCAAoC;EACpC,2BAA2B;EAC3B,gBAAgB;EAChB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,gCAAgC;EAChC,4BAA4B;EAC5B,oCAAoC;EACpC,2BAA2B;EAC3B,YAAY;EACZ;IACE,eAAe;EACjB;AACF;;AAEA;EACE,+BAA+B;EAC/B,4BAA4B;EAC5B,UAAU;EACV,iBAAiB;EACjB;IACE,kBAAkB;IAClB,gBAAgB;EAClB;EACA;IACE,SAAS;EACX;EACA;IACE,kBAAkB;EACpB;EACA;IACE,eAAe;IACf;MACE,gBAAgB;IAClB;EACF;AACF;;AAEA;EACE,+BAA+B;EAC/B,wBAAwB;EACxB,iBAAiB;EACjB,eAAe;EACf;IACE,gCAAgC;IAChC,iBAAiB;IACjB,iBAAiB;IACjB;MACE,kBAAkB;MAClB,WAAW;MACX,UAAU;MACV,iCAAiC;MACjC,0BAA0B;MAC1B,YAAY;MACZ,kBAAkB;MAClB,eAAe;MACf,kBAAkB;IACpB;EACF;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf;IACE,YAAY;IACZ,aAAa;EACf;EACA;IACE,iBAAiB;IACjB,kBAAkB;IAClB,eAAe;EACjB;AACF;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,+BAA+B;EAC/B,oBAAoB;EACpB;IACE,kBAAkB;IAClB,UAAU;IACV,SAAS;IACT,iCAAiC;IACjC,iBAAiB;IACjB,0BAA0B;IAC1B,YAAY;IACZ,kBAAkB;IAClB,eAAe;IACf,kBAAkB;EACpB;AACF;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,UAAU;EACV,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,oCAAoC;EACpC,2BAA2B;EAC3B,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,kBAAkB;EAClB;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,aAAa;AACf","sourcesContent":["*,\n*::before,\n*::after {\n  box-sizing: border-box;\n  font-family: 'Inter', sans-serif;\n}\n\n:root {\n  --main-bg-color: #FBFFFF;\n  --sec-bg-color: #404040;\n  --main-acc-color: #FAA916;\n  --sec-acc-color: #96031A;\n  --main-text-color: #1B1B1E;\n  --sec-text-color: #FBFFFF;\n  --rounded-border: 12px;\n  --border-style: #1B1B1E solid 1px;\n  --drop-shadow: drop-shadow(0px 2px 10px #404040);\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  background: var(--main-bg-color);\n  margin: 0;\n}\n\n#login-page {\n  height: 100vh;\n  background: url('https://static.showit.co/file/t5GazwUVQneNSlBu7psHQw/161366/video-gif-mobile.gif');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n#login-form {\n  margin: auto;\n  border-radius: var(--rounded-border);\n  padding: 10px;\n  position: relative;\n  top: 200px;\n  width: fit-content;\n  background: rgba(251, 255, 255, .8);\n  text-align: center;\n  & legend {\n    font-size: 2rem;\n  }\n  & label {\n    padding-top: 10px;\n  }\n  & input {\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n\nheader {\n  background: var(--main-acc-color);\n  filter: var(--drop-shadow);\n  & h1 {\n    text-align: right;\n    padding-right: 10px;\n  }\n}\n\nmain {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin-bottom: 30px;\n  padding: 0 20px;\n}\n\n#plan-trip-container {\n  max-width: 416px;\n  background: var(--main-bg-color);\n  padding-right: 30px;\n  & h2 {\n    background: var(--sec-bg-color);\n    color: var(--sec-text-color);\n    height: 130px;\n    margin: 0;\n    padding-top: 50px;\n    text-align: center;\n  }\n  & .buttons {\n    margin-top: 20px;\n  }\n}\n\nlabel, input {\n  display: block;\n}\n\nlabel:not(:first-of-type) {\n  padding-top: 10px;\n}\n\ninput {\n  background: var(--main-bg-color);\n  border-radius: var(--rounded-border);\n  border: var(--border-style);\n  min-width: 320px;\n  min-height: 40px;\n  padding: 0 20px;\n}\n\n.buttons {\n  margin: 10px;\n  background: var(--sec-acc-color);\n  color: var(--sec-text-color);\n  border-radius: var(--rounded-border);\n  border: var(--border-style);\n  height: 40px;\n  &:hover {\n    cursor: pointer;\n  }\n}\n\n#trip-stats-container {\n  background: var(--sec-bg-color);\n  color: var(--sec-text-color);\n  width: 80%;\n  min-height: 500px;\n  & h2 {\n    padding: 30px 50px;\n    margin-bottom: 0;\n  }\n  & h3 {\n    margin: 0;\n  }\n  & div{\n    padding-left: 50px;\n  }\n  & div:last-of-type {\n    font-size: 2rem;\n    & p {\n      margin-top: 10px;\n    }\n  }\n}\n\n#trip-details-container {\n  background: var(--sec-bg-color);\n  /* min-height: 1340px; */\n  min-height: 940px;\n  padding: 10px 0;\n  & section {\n    background: var(--main-bg-color);\n    margin: 40px 20px;\n    min-height: 400px;\n    &  h2 {\n      position: relative;\n      left: -10px;\n      top: -25px;\n      background: var(--main-acc-color);\n      filter: var(--drop-shadow);\n      width: 250px;\n      text-align: center;\n      padding: 10px 0;\n      position: relative;\n    }\n  }\n}\n\n.trips {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  & img {\n    width: 280px;\n    height: 180px;\n  }\n  & h3 {\n    margin-left: auto;\n    margin-right: auto;\n    font-size: 3rem;\n  }\n}\n\n.trip-card {\n  text-align: center;\n  /* width: 40%; */\n  /* width: 250px; */\n  padding: 0 10px;\n}\n\n#search-results {\n  background: var(--sec-bg-color);\n  padding-bottom: 30px;\n  & h2 {\n    position: relative;\n    left: 20px;\n    top: 60px;\n    background: var(--main-acc-color);\n    font-size: 2.5rem;\n    filter: var(--drop-shadow);\n    width: 300px;\n    text-align: center;\n    padding: 10px 0;\n    position: relative;\n  }\n}\n\n.close-button {\n  float: right;\n}\n\n#results-container {\n  background: var(--main-bg-color);\n  width: 90%;\n  padding: 30px 0;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.result-card {\n  border-radius: var(--rounded-border);\n  border: var(--border-style);\n  margin: 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n}\n\ndialog {\n  text-align: center;\n  & p {\n    line-height: 1.7rem;\n  }\n}\n\n.hidden {\n  display: none;\n}\n\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _traveler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _trips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _destinations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);





// QUERY SELECTORS
const loginPage = document.querySelector('#login-page');
const loginButton = document.querySelector('#login-button');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const header = document.querySelector('header');
const main = document.querySelector('main');
const travelerName = document.querySelector('#traveler-name');
const tripDetailsSection = document.querySelector('#trip-details-container');
const planTripForm = document.querySelector('#plan-trip-form');
const dateInput = document.querySelector('#date-input');
const durationInput = document.querySelector('#duration-input');
const numTravelersInput = document.querySelector('#num-travelers-input');
const searchButton = document.querySelector('#trip-search-button');
const lodgingTotal = document.querySelector('#lodging-total');
const airfareTotal = document.querySelector('#airfare-total');
const agentFeesTotal = document.querySelector('#agent-fee-total');
const grandTotal = document.querySelector('#grand-total');
const pendingTrips = document.querySelector('#pending-trips');
const pastTrips = document.querySelector('#past-trips');
const pendingPlaceholder = document.querySelector('#no-pending');
const pastPlaceholder = document.querySelector('#no-past');
const searchResultsSection = document.querySelector('#search-results');
const searchCloseButton = document.querySelector('#close-button');
const resultsContainer = document.querySelector('#results-container');
const tripConfirmation = document.querySelector('#trip-confirmation');
const tripConfirmationMessage = document.querySelector('#trip-confirmation-message');
const tripCosts = document.querySelector('#trip-costs');
const tripConfirmationButton = document.querySelector('#trip-confirmation-button');
const errorDisplay = document.querySelector('#error-display');
const errorText = document.querySelector('#error-text');
const errorCloseButton = document.querySelector('#error-message-button');




// EVENT LISTENERS
loginButton.addEventListener('click', function(e) {
    handleLogin(e)
});
loginPage.addEventListener('input', checkFields)
planTripForm.addEventListener('input', checkFields)
searchButton.addEventListener('click', handleSearch);
searchCloseButton.addEventListener('click', backToHome);
resultsContainer.addEventListener('click', function(e) {
    if (e.target.className === 'buttons') {
        planTrip(tripInput, e.target.value)
    }
})
tripConfirmationButton.addEventListener('click', handleConfirmation)
errorCloseButton.addEventListener('click', function() {
    errorDisplay.close()
})

// GLOBAL VARIABLES
let travelersData;
let tripsData;
let destinationsData;
let currentTraveler;
let tripInput;

function checkFields() {
    if (usernameInput.value && passwordInput.value) {
        loginButton.disabled = false
    } else {
        loginButton.disabled = true
    }

    if (dateInput.value && durationInput.value && numTravelersInput.value) {
        searchButton.disabled = false
    } else {
        searchButton.disabled = true
    }
};

function handleLogin(e) {
    e.preventDefault();
    let credentials = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    const loginSuccessful = (0,_traveler__WEBPACK_IMPORTED_MODULE_0__.checkLogin)(credentials);
    if (loginSuccessful) {
        console.log('credentials', credentials);
        const userID = Number(credentials.username.replace('traveler', ''))
        setData(userID);
        loginPage.classList.add('hidden');
        main.classList.remove('hidden');
        tripDetailsSection.classList.remove('hidden');
    } else {
        displayErrorMessage('Please submit valid credentials');
    }
}

function setData(userID) {
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.fetchData)()
    .then(({travelers, destinations, trips}) => {
        travelersData =travelers;
        tripsData = trips;
        destinationsData = destinations;
        renderDom(userID)
    })
    .catch(error => {
        displayErrorMessage(error)
    })
}



function renderDom(userID) {
    // console.log('trips data', tripsData)
    currentTraveler = (0,_traveler__WEBPACK_IMPORTED_MODULE_0__.setTraveler)(userID, travelersData);
    // console.log('currentTraveler', currentTraveler)
    let trips = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.filterTrips)(currentTraveler, tripsData);
    // console.log('trips', trips);
    let organizedTrips = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.organizeTrips)(trips);
    // console.log('organizedTrips', organizedTrips);
    let tripDisplayDetails = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.getTripDisplayInfo)(organizedTrips, destinationsData);
    // console.log('Trip Display Info', tripDisplayDetails)
    let currentYear = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.findCurrentYear)(organizedTrips);
    let stats = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.calculateStats)(organizedTrips, tripsData, destinationsData, currentYear);
    // console.log('stats', stats);
    setMinDate();
    displayCurrentTraveler(currentTraveler);
    displayTrips(tripDisplayDetails);
    displayStats(stats);
}

function displayCurrentTraveler({name}) {
    const firstName = name.split(' ')[0];
    travelerName.innerText = `Hi there, ${firstName}!`
}

function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today)
}

function displayTrips({past, pending}) {
    if (typeof past === 'object') {
        pastPlaceholder.classList.add('hidden');
        pastTrips.innerHTML = ''
        past.forEach(trip => {
            pastTrips.innerHTML += `
            <div class="trip-card">
                <img alt="${trip.alt}" src="${trip.image}">
                <p>${trip.name}</p>
            </div>`
        })
    };
    if (typeof pending === 'object') {
        pendingPlaceholder.classList.add('hidden');
        pendingTrips.innerHTML = ''
        const reversedPending = pending.reverse()
        reversedPending.forEach(trip => {
            pendingTrips.innerHTML += `
            <div class="trip-card">
                <img alt="${trip.alt}" src="${trip.image}">
                <p>${trip.name}</p>
            </div>`
        })
    }; 
};

function displayStats(statsObj) {
    lodgingTotal.innerText = `$ ${statsObj.lodging}`;
    airfareTotal.innerText = `$ ${statsObj.airfare}`;
    agentFeesTotal.innerText = `$ ${statsObj.agentFee}`;
    grandTotal.innerText = `$ ${statsObj.grandTotal}`;

};

function handleSearch(e) {
    e.preventDefault();
    const dateValidation = checkTripDate()
    if (dateValidation) {
    const input = captureInput();
    clearForm()
    renderResults(destinationsData);
    displayResults(e);
    } else {
        displayErrorMessage('You already have a trip planned for that day! Please choose a different day.')
    }
}

function checkTripDate() {
    const tripDates = tripsData.map(trip => trip.date)
    const inputDate = dateInput.value.split('-').join('/')
    if (tripDates.includes(inputDate)) {
        return false
    } else {
        return true
    }

}

function captureInput() {
    const input = {
        date: dateInput.value,
        duration: durationInput.value,
        travelers: numTravelersInput.value
    }
    tripInput = input
    return input
}

function renderResults(destinationsArray) {
    resultsContainer.innerHTML = ''
    destinationsArray.forEach(dest => {
        resultsContainer.innerHTML += `
        <div class="result-card">
            <h3>${dest.destination}</h3>
            <p>Lodging: $${dest.estimatedLodgingCostPerDay} per day</p>
            <p>Airfare: $${dest.estimatedFlightCostPerPerson} per person</p>
            <button class="buttons" id="select-destination-button" value="${dest.id}">Select</button>
        </div>`
    })
}

function planTrip(inputObj, destinationID) {
    tripConfirmation.showModal()
    const destID = Number(destinationID)
    const dest = (0,_destinations__WEBPACK_IMPORTED_MODULE_2__.findDestination)(destID, destinationsData)
    const tripObj = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.createTrip)(inputObj, dest, currentTraveler)
    ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.postData)(tripObj)
        .then(data => {
            const newTrip = data.newTrip;
            displayNewTrip(newTrip);
        })
        .catch(error => {
            displayErrorMessage(error);
        })
}

function displayNewTrip(tripObj) {
    const dest = (0,_destinations__WEBPACK_IMPORTED_MODULE_2__.findDestination)(tripObj.destinationID, destinationsData)
    const costs = (0,_trips__WEBPACK_IMPORTED_MODULE_1__.calculateEstimate)(tripObj, destinationsData)
    tripConfirmationMessage.innerText = `You've planned a trip to ${dest.destination}!`;
    tripCosts.innerHTML = `
    Lodging: $${costs.totalLodging}<br>
    Airfare: $${costs.totalAirfare}<br>
    Subtotal: $${costs.subtotal}<br>
    10% Agent Fee: $${costs.agentFee}<br>
    Total Estimate: $${costs.grandTotal}`
}

function clearForm() {
    planTripForm.reset()
}

function displayResults(e) {
    e.preventDefault();
    header.classList.add('hidden');
    main.classList.add('hidden');
    tripDetailsSection.classList.add('hidden');
    searchResultsSection.classList.remove('hidden');
};


function backToHome() {
    header.classList.remove('hidden');
    main.classList.remove('hidden');
    tripDetailsSection.classList.remove('hidden');
    searchResultsSection.classList.add('hidden');
    tripConfirmation.close();
};

function handleConfirmation() {
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.fetchTrips)()
    .then(({trips}) => {
        tripsData = trips;
        renderDom(currentTraveler.id);
    })
    .catch(error => {
        displayErrorMessage(error)
    })
    backToHome()
}

function displayErrorMessage(error) {
    errorText.innerText = error;
    errorDisplay.showModal();
}





/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkLogin: () => (/* binding */ checkLogin),
/* harmony export */   setTraveler: () => (/* binding */ setTraveler)
/* harmony export */ });
function setTraveler(id, travelerArray) {
    if (id > travelerArray.length || id === 0) {
        return false
    } else {
        const currentTraveler = travelerArray.find(traveler => id === traveler.id);
    return currentTraveler;
    }
}

function checkLogin({username, password}) {
    const id = Number(username.replace('traveler', ''))
    if (password === 'travel' && id > 0 && id < 51 && username.includes('traveler')) {
        return true
    } else {
        return false
    }

}



/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateEstimate: () => (/* binding */ calculateEstimate),
/* harmony export */   calculateStats: () => (/* binding */ calculateStats),
/* harmony export */   calculateTripCost: () => (/* binding */ calculateTripCost),
/* harmony export */   createTrip: () => (/* binding */ createTrip),
/* harmony export */   filterTrips: () => (/* binding */ filterTrips),
/* harmony export */   findCurrentYear: () => (/* binding */ findCurrentYear),
/* harmony export */   getTripDisplayInfo: () => (/* binding */ getTripDisplayInfo),
/* harmony export */   organizeTrips: () => (/* binding */ organizeTrips)
/* harmony export */ });
/* harmony import */ var _destinations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


function filterTrips({id}, tripsArray) {
    const trips = tripsArray.filter(trip => trip.userID === id)
    return trips
}

function organizeTrips(userTrips) {
    const tripsObject = userTrips.reduce((obj, trip) => {
        if (trip.status === "approved") {
            obj.approved.push(trip)
        } else {
            obj.pending.push(trip)
        }
        return obj
    }, {
        approved: [],
        pending: []
    })
    return tripsObject
}

function calculateTripCost(tripID, tripsArray, destinationsArray) {
    const tripIDs = tripsArray.map(trip => trip.id);
    if (!tripIDs.includes(tripID)) {
        return false
    } else {
        const foundTrip = tripsArray.find(trip => trip.id === tripID);
        const year = foundTrip.date.split('/')[0];
        const tripDest = destinationsArray.find(dest => foundTrip.destinationID === dest.id);
        const totalLodging = tripDest.estimatedLodgingCostPerDay * foundTrip.duration;
        const totalAirfare = tripDest.estimatedFlightCostPerPerson * foundTrip.travelers;
        const subtotal = totalLodging + totalAirfare;
        const agentFee = Math.round(subtotal * .1);
        const grandTotal = Math.round(subtotal + agentFee)
        const tripCost = {
            year,
            totalLodging,
            totalAirfare,
            subtotal,
            agentFee,
            grandTotal
        }
        return tripCost
    }
}

function findCurrentYear({approved}) {
    const dates = approved.map(trip => trip.date)
    const years = [];
    dates.forEach(date => {
        years.push((date.split('/')[0]))
    })
    const sortedYears = years.sort((a, b) => b - a)
    return sortedYears[0]

}

function calculateStats({approved}, tripsArray, destinationsArray, year) {
    const tripCosts = approved.map(trip => calculateTripCost(trip.id, tripsArray, destinationsArray));
    const travStats = tripCosts.reduce((obj, trip) => {
        if (trip.year === year) {
            obj.lodging += trip.totalLodging;
            obj.airfare += trip.totalAirfare;
            obj.subtotal += trip.subtotal;
            obj.agentFee += trip.agentFee;
            obj.grandTotal += trip.grandTotal;
            obj.tripsTaken ++;
            obj.year = year;
        }
        return obj
    }, {
        lodging: 0,
        airfare: 0,
        subtotal: 0,
        agentFee: 0,
        grandTotal: 0,
        tripsTaken: 0,
        year: ''
    })
    return travStats

}

function getTripDisplayInfo({approved, pending}, destinationsArray) {
    const pastDestinations = approved.map(trip => (0,_destinations__WEBPACK_IMPORTED_MODULE_0__.findDestination)(trip.destinationID, destinationsArray));
    const pendingDestinations = pending.map(trip => (0,_destinations__WEBPACK_IMPORTED_MODULE_0__.findDestination)(trip.destinationID, destinationsArray));
    const allDisplayInfo = {
        past: pastDestinations.length ? pastDestinations.map(dest => (0,_destinations__WEBPACK_IMPORTED_MODULE_0__.getDestDisplayInfo)(dest)) : 'No Trips 🌍',
        pending: pendingDestinations.length ? pendingDestinations.map(dest => (0,_destinations__WEBPACK_IMPORTED_MODULE_0__.getDestDisplayInfo)(dest)) : 'No Pending Trips 🌍'
    }
    return allDisplayInfo
}

function createTrip({date, duration, travelers}, {id}, traveler) {
    const formattedDate = date.split('-').join('/');
    const newTrip = {
        date: formattedDate,
        destinationID: id,
        duration: Number(duration),
        id: null,
        status: 'pending',
        suggestedActivities: [],
        travelers: Number(travelers),
        userID: traveler.id
    }
    return newTrip
}

function calculateEstimate(newTripObj, destinationsArray) {
    const tripDest = destinationsArray.find(dest => newTripObj.destinationID === dest.id);
    const totalLodging = tripDest.estimatedLodgingCostPerDay * newTripObj.duration;
    const totalAirfare = tripDest.estimatedFlightCostPerPerson * newTripObj.travelers;
    const subtotal = totalLodging + totalAirfare;
    const agentFee = Math.round(subtotal * .1);
    const grandTotal = Math.round(subtotal + agentFee)
    const tripEstimate = {
        totalLodging,
        totalAirfare,
        subtotal,
        agentFee,
        grandTotal
    }
    return tripEstimate
}



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findDestination: () => (/* binding */ findDestination),
/* harmony export */   getDestDisplayInfo: () => (/* binding */ getDestDisplayInfo)
/* harmony export */ });
function findDestination(locationID, destinationsArray) {
    const destinationIDs = destinationsArray.map(dest => dest.id);
    if (!destinationIDs.includes(locationID)) {
        return false
    } else {
        const destination = destinationsArray.find(dest => dest.id === locationID)
        return destination
    }
}
//refactor to destructure locationID parameter to {destinationID} and pass trip object instead?

function getDestDisplayInfo(destination) {
    const displayInfo = {
        name: destination.destination,
        image: destination.image,
        alt: destination.alt,
        // lodging: destination.estimatedLodgingCostPerDay,
        // airfare: destination.estimatedFlightCostPerPerson,
    }
    return displayInfo
}




/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchData: () => (/* binding */ fetchData),
/* harmony export */   fetchTrips: () => (/* binding */ fetchTrips),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const allData = [
    fetch('http://localhost:3001/api/v1/travelers/'),
    fetch('http://localhost:3001/api/v1/trips'),
    fetch('http://localhost:3001/api/v1/destinations')
];

function fetchData() {
    return Promise.all(allData)
    .then(responses => {
        if (responses.every(response => response.ok)) {
            return responses
        } else {
            let responseText = responses.find(response => !response.ok).statusText
            let responseCode = responses.find(response => !response.ok).status
            console.log('API GET error')
            throw new Error(`${responseCode} : ${responseText}`)
        }
    })
    .then(res => {
        return Promise.all(res.map(obj => obj.json()))
    })
    .then(arr => {
        let dataObject = arr.reduce((obj, set) => {
            let key = Object.keys(set)[0]
            obj[key] = set[key]
            return obj
        }, {})
        return dataObject
    })
    .catch(error => {
        console.log('API GET error caught')
        throw new Error(`${error.message}. Please reload page!`)
    })
};

function postData(tripObj) {
    tripObj.id = Date.now();
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(tripObj),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        } else {
            let responseText = response.statusText
            let responseCode = response.status
            console.log('API POST error')
            throw new Error(`${responseCode} : ${responseText}`)
        }
    })
    .then(res => res.json())
    .catch(error => {
        throw new Error(`${error.message}. Please try again!`)
    })
};

function fetchTrips() {
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => {
        if (response.ok) {
            return response
        } else {
            let responseText = response.statusText
            let responseCode = response.status
            console.log('API GET Trips error')
            throw new Error(`${responseCode} : ${responseText}.`)
        }
    })
    .then(res => res.json())
    .catch(error => {
        throw new Error(error.message)
    })
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)




console.log('This is the JavaScript entry file - your code begins here.');

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map