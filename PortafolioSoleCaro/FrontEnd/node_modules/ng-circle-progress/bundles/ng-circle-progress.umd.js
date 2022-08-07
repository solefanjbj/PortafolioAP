(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-circle-progress', ['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng-circle-progress'] = {}, global.ng.core, global.ng.common, global.rxjs));
}(this, (function (exports, core, common, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var CircleProgressOptions = /** @class */ (function () {
        function CircleProgressOptions() {
            this.class = '';
            this.backgroundGradient = false;
            this.backgroundColor = 'transparent';
            this.backgroundGradientStopColor = 'transparent';
            this.backgroundOpacity = 1;
            this.backgroundStroke = 'transparent';
            this.backgroundStrokeWidth = 0;
            this.backgroundPadding = 5;
            this.percent = 0;
            this.radius = 90;
            this.space = 4;
            this.toFixed = 0;
            this.maxPercent = 1000;
            this.renderOnClick = true;
            this.units = '%';
            this.unitsFontSize = '10';
            this.unitsFontWeight = 'normal';
            this.unitsColor = '#444444';
            this.outerStrokeGradient = false;
            this.outerStrokeWidth = 8;
            this.outerStrokeColor = '#78C000';
            this.outerStrokeGradientStopColor = 'transparent';
            this.outerStrokeLinecap = 'round';
            this.innerStrokeColor = '#C7E596';
            this.innerStrokeWidth = 4;
            this.titleFormat = undefined;
            this.title = 'auto';
            this.titleColor = '#444444';
            this.titleFontSize = '20';
            this.titleFontWeight = 'normal';
            this.subtitleFormat = undefined;
            this.subtitle = 'progress';
            this.subtitleColor = '#A9A9A9';
            this.subtitleFontSize = '10';
            this.subtitleFontWeight = 'normal';
            this.imageSrc = undefined;
            this.imageHeight = undefined;
            this.imageWidth = undefined;
            this.animation = true;
            this.animateTitle = true;
            this.animateSubtitle = false;
            this.animationDuration = 500;
            this.showTitle = true;
            this.showSubtitle = true;
            this.showUnits = true;
            this.showImage = false;
            this.showBackground = true;
            this.showInnerStroke = true;
            this.clockwise = true;
            this.responsive = false;
            this.startFromZero = true;
            this.showZeroOuterStroke = true;
            this.lazy = false;
        }
        return CircleProgressOptions;
    }());
    /** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
    var CircleProgressComponent = /** @class */ (function () {
        function CircleProgressComponent(defaultOptions, elRef, document) {
            var _this = this;
            this.elRef = elRef;
            this.document = document;
            this.onClick = new core.EventEmitter();
            // <svg> of component
            this.svgElement = null;
            // whether <svg> is in viewport
            this.isInViewport = false;
            // event for notifying viewport change caused by scrolling or resizing
            this.onViewportChanged = new core.EventEmitter;
            this._viewportChangedSubscriber = null;
            this.options = new CircleProgressOptions();
            this.defaultOptions = new CircleProgressOptions();
            this._lastPercent = 0;
            this._gradientUUID = null;
            this.render = function () {
                _this.applyOptions();
                if (_this.options.lazy) {
                    // Draw svg if it doesn't exist
                    _this.svgElement === null && _this.draw(_this._lastPercent);
                    // Draw it only when it's in the viewport
                    if (_this.isInViewport) {
                        // Draw it at the latest position when I am in.
                        if (_this.options.animation && _this.options.animationDuration > 0) {
                            _this.animate(_this._lastPercent, _this.options.percent);
                        }
                        else {
                            _this.draw(_this.options.percent);
                        }
                        _this._lastPercent = _this.options.percent;
                    }
                }
                else {
                    if (_this.options.animation && _this.options.animationDuration > 0) {
                        _this.animate(_this._lastPercent, _this.options.percent);
                    }
                    else {
                        _this.draw(_this.options.percent);
                    }
                    _this._lastPercent = _this.options.percent;
                }
            };
            this.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
                var angleInRadius = angleInDegrees * Math.PI / 180;
                var x = centerX + Math.sin(angleInRadius) * radius;
                var y = centerY - Math.cos(angleInRadius) * radius;
                return { x: x, y: y };
            };
            this.draw = function (percent) {
                var _a, _b, e_1, _c, e_2, _d;
                // make percent reasonable
                percent = (percent === undefined) ? _this.options.percent : Math.abs(percent);
                // circle percent shouldn't be greater than 100%.
                var circlePercent = (percent > 100) ? 100 : percent;
                // determine box size
                var boxSize = _this.options.radius * 2 + _this.options.outerStrokeWidth * 2;
                if (_this.options.showBackground) {
                    boxSize += (_this.options.backgroundStrokeWidth * 2 + _this.max(0, _this.options.backgroundPadding * 2));
                }
                // the centre of the circle
                var centre = { x: boxSize / 2, y: boxSize / 2 };
                // the start point of the arc
                var startPoint = { x: centre.x, y: centre.y - _this.options.radius };
                // get the end point of the arc
                var endPoint = _this.polarToCartesian(centre.x, centre.y, _this.options.radius, 360 * (_this.options.clockwise ?
                    circlePercent :
                    (100 - circlePercent)) / 100); // ####################
                // We'll get an end point with the same [x, y] as the start point when percent is 100%, so move x a little bit.
                if (circlePercent === 100) {
                    endPoint.x = endPoint.x + (_this.options.clockwise ? -0.01 : +0.01);
                }
                // largeArcFlag and sweepFlag
                var largeArcFlag, sweepFlag;
                if (circlePercent > 50) {
                    _a = __read(_this.options.clockwise ? [1, 1] : [1, 0], 2), largeArcFlag = _a[0], sweepFlag = _a[1];
                }
                else {
                    _b = __read(_this.options.clockwise ? [0, 1] : [0, 0], 2), largeArcFlag = _b[0], sweepFlag = _b[1];
                }
                // percent may not equal the actual percent
                var titlePercent = _this.options.animateTitle ? percent : _this.options.percent;
                var titleTextPercent = titlePercent > _this.options.maxPercent ?
                    _this.options.maxPercent.toFixed(_this.options.toFixed) + "+" : titlePercent.toFixed(_this.options.toFixed);
                var subtitlePercent = _this.options.animateSubtitle ? percent : _this.options.percent;
                // get title object
                var title = {
                    x: centre.x,
                    y: centre.y,
                    textAnchor: 'middle',
                    color: _this.options.titleColor,
                    fontSize: _this.options.titleFontSize,
                    fontWeight: _this.options.titleFontWeight,
                    texts: [],
                    tspans: []
                };
                // from v0.9.9, both title and titleFormat(...) may be an array of string.
                if (_this.options.titleFormat !== undefined && _this.options.titleFormat.constructor.name === 'Function') {
                    var formatted = _this.options.titleFormat(titlePercent);
                    if (formatted instanceof Array) {
                        title.texts = __spread(formatted);
                    }
                    else {
                        title.texts.push(formatted.toString());
                    }
                }
                else {
                    if (_this.options.title === 'auto') {
                        title.texts.push(titleTextPercent);
                    }
                    else {
                        if (_this.options.title instanceof Array) {
                            title.texts = __spread(_this.options.title);
                        }
                        else {
                            title.texts.push(_this.options.title.toString());
                        }
                    }
                }
                // get subtitle object
                var subtitle = {
                    x: centre.x,
                    y: centre.y,
                    textAnchor: 'middle',
                    color: _this.options.subtitleColor,
                    fontSize: _this.options.subtitleFontSize,
                    fontWeight: _this.options.subtitleFontWeight,
                    texts: [],
                    tspans: []
                };
                // from v0.9.9, both subtitle and subtitleFormat(...) may be an array of string.
                if (_this.options.subtitleFormat !== undefined && _this.options.subtitleFormat.constructor.name === 'Function') {
                    var formatted = _this.options.subtitleFormat(subtitlePercent);
                    if (formatted instanceof Array) {
                        subtitle.texts = __spread(formatted);
                    }
                    else {
                        subtitle.texts.push(formatted.toString());
                    }
                }
                else {
                    if (_this.options.subtitle instanceof Array) {
                        subtitle.texts = __spread(_this.options.subtitle);
                    }
                    else {
                        subtitle.texts.push(_this.options.subtitle.toString());
                    }
                }
                // get units object
                var units = {
                    text: "" + _this.options.units,
                    fontSize: _this.options.unitsFontSize,
                    fontWeight: _this.options.unitsFontWeight,
                    color: _this.options.unitsColor
                };
                // get total count of text lines to be shown
                var rowCount = 0, rowNum = 1;
                _this.options.showTitle && (rowCount += title.texts.length);
                _this.options.showSubtitle && (rowCount += subtitle.texts.length);
                // calc dy for each tspan for title
                if (_this.options.showTitle) {
                    try {
                        for (var _e = __values(title.texts), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var span = _f.value;
                            title.tspans.push({ span: span, dy: _this.getRelativeY(rowNum, rowCount) });
                            rowNum++;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                // calc dy for each tspan for subtitle
                if (_this.options.showSubtitle) {
                    try {
                        for (var _g = __values(subtitle.texts), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var span = _h.value;
                            subtitle.tspans.push({ span: span, dy: _this.getRelativeY(rowNum, rowCount) });
                            rowNum++;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                // create ID for gradient element
                if (null === _this._gradientUUID) {
                    _this._gradientUUID = _this.uuid();
                }
                // Bring it all together
                _this.svg = {
                    viewBox: "0 0 " + boxSize + " " + boxSize,
                    // Set both width and height to '100%' if it's responsive
                    width: _this.options.responsive ? '100%' : boxSize,
                    height: _this.options.responsive ? '100%' : boxSize,
                    backgroundCircle: {
                        cx: centre.x,
                        cy: centre.y,
                        r: _this.options.radius + _this.options.outerStrokeWidth / 2 + _this.options.backgroundPadding,
                        fill: _this.options.backgroundColor,
                        fillOpacity: _this.options.backgroundOpacity,
                        stroke: _this.options.backgroundStroke,
                        strokeWidth: _this.options.backgroundStrokeWidth,
                    },
                    path: {
                        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y (https://developer.mozilla.org/en/docs/Web/SVG/Tutorial/Paths#Arcs)
                        d: "M " + startPoint.x + " " + startPoint.y + "\n        A " + _this.options.radius + " " + _this.options.radius + " 0 " + largeArcFlag + " " + sweepFlag + " " + endPoint.x + " " + endPoint.y,
                        stroke: _this.options.outerStrokeColor,
                        strokeWidth: _this.options.outerStrokeWidth,
                        strokeLinecap: _this.options.outerStrokeLinecap,
                        fill: 'none'
                    },
                    circle: {
                        cx: centre.x,
                        cy: centre.y,
                        r: _this.options.radius - _this.options.space - _this.options.outerStrokeWidth / 2 - _this.options.innerStrokeWidth / 2,
                        fill: 'none',
                        stroke: _this.options.innerStrokeColor,
                        strokeWidth: _this.options.innerStrokeWidth,
                    },
                    title: title,
                    units: units,
                    subtitle: subtitle,
                    image: {
                        x: centre.x - _this.options.imageWidth / 2,
                        y: centre.y - _this.options.imageHeight / 2,
                        src: _this.options.imageSrc,
                        width: _this.options.imageWidth,
                        height: _this.options.imageHeight,
                    },
                    outerLinearGradient: {
                        id: 'outer-linear-' + _this._gradientUUID,
                        colorStop1: _this.options.outerStrokeColor,
                        colorStop2: _this.options.outerStrokeGradientStopColor === 'transparent' ? '#FFF' : _this.options.outerStrokeGradientStopColor,
                    },
                    radialGradient: {
                        id: 'radial-' + _this._gradientUUID,
                        colorStop1: _this.options.backgroundColor,
                        colorStop2: _this.options.backgroundGradientStopColor === 'transparent' ? '#FFF' : _this.options.backgroundGradientStopColor,
                    }
                };
            };
            this.getAnimationParameters = function (previousPercent, currentPercent) {
                var MIN_INTERVAL = 10;
                var times, step, interval;
                var fromPercent = _this.options.startFromZero ? 0 : (previousPercent < 0 ? 0 : previousPercent);
                var toPercent = currentPercent < 0 ? 0 : _this.min(currentPercent, _this.options.maxPercent);
                var delta = Math.abs(Math.round(toPercent - fromPercent));
                if (delta >= 100) {
                    // we will finish animation in 100 times
                    times = 100;
                    if (!_this.options.animateTitle && !_this.options.animateSubtitle) {
                        step = 1;
                    }
                    else {
                        // show title or subtitle animation even if the arc is full, we also need to finish it in 100 times.
                        step = Math.round(delta / times);
                    }
                }
                else {
                    // we will finish in as many times as the number of percent.
                    times = delta;
                    step = 1;
                }
                // Get the interval of timer
                interval = Math.round(_this.options.animationDuration / times);
                // Readjust all values if the interval of timer is extremely small.
                if (interval < MIN_INTERVAL) {
                    interval = MIN_INTERVAL;
                    times = _this.options.animationDuration / interval;
                    if (!_this.options.animateTitle && !_this.options.animateSubtitle && delta > 100) {
                        step = Math.round(100 / times);
                    }
                    else {
                        step = Math.round(delta / times);
                    }
                }
                // step must be greater than 0.
                if (step < 1) {
                    step = 1;
                }
                return { times: times, step: step, interval: interval };
            };
            this.animate = function (previousPercent, currentPercent) {
                if (_this._timerSubscription && !_this._timerSubscription.closed) {
                    _this._timerSubscription.unsubscribe();
                }
                var fromPercent = _this.options.startFromZero ? 0 : previousPercent;
                var toPercent = currentPercent;
                var _a = _this.getAnimationParameters(fromPercent, toPercent), step = _a.step, interval = _a.interval;
                var count = fromPercent;
                if (fromPercent < toPercent) {
                    _this._timerSubscription = rxjs.timer(0, interval).subscribe(function () {
                        count += step;
                        if (count <= toPercent) {
                            if (!_this.options.animateTitle && !_this.options.animateSubtitle && count >= 100) {
                                _this.draw(toPercent);
                                _this._timerSubscription.unsubscribe();
                            }
                            else {
                                _this.draw(count);
                            }
                        }
                        else {
                            _this.draw(toPercent);
                            _this._timerSubscription.unsubscribe();
                        }
                    });
                }
                else {
                    _this._timerSubscription = rxjs.timer(0, interval).subscribe(function () {
                        count -= step;
                        if (count >= toPercent) {
                            if (!_this.options.animateTitle && !_this.options.animateSubtitle && toPercent >= 100) {
                                _this.draw(toPercent);
                                _this._timerSubscription.unsubscribe();
                            }
                            else {
                                _this.draw(count);
                            }
                        }
                        else {
                            _this.draw(toPercent);
                            _this._timerSubscription.unsubscribe();
                        }
                    });
                }
            };
            this.emitClickEvent = function (event) {
                if (_this.options.renderOnClick) {
                    _this.animate(0, _this.options.percent);
                }
                _this.onClick.emit(event);
            };
            this.applyOptions = function () {
                var e_3, _a;
                try {
                    // the options of <circle-progress> may change already
                    for (var _b = __values(Object.keys(_this.options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var name = _c.value;
                        if (_this.hasOwnProperty(name) && _this[name] !== undefined) {
                            _this.options[name] = _this[name];
                        }
                        else if (_this.templateOptions && _this.templateOptions[name] !== undefined) {
                            _this.options[name] = _this.templateOptions[name];
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                // make sure key options valid
                _this.options.radius = Math.abs(+_this.options.radius);
                _this.options.space = +_this.options.space;
                _this.options.percent = +_this.options.percent > 0 ? +_this.options.percent : 0;
                _this.options.maxPercent = Math.abs(+_this.options.maxPercent);
                _this.options.animationDuration = Math.abs(_this.options.animationDuration);
                _this.options.outerStrokeWidth = Math.abs(+_this.options.outerStrokeWidth);
                _this.options.innerStrokeWidth = Math.abs(+_this.options.innerStrokeWidth);
                _this.options.backgroundPadding = +_this.options.backgroundPadding;
            };
            this.getRelativeY = function (rowNum, rowCount) {
                // why '-0.18em'? It's a magic number when property 'alignment-baseline' equals 'baseline'. :)
                var initialOffset = -0.18, offset = 1;
                return (initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2) + 'em';
            };
            this.min = function (a, b) {
                return a < b ? a : b;
            };
            this.max = function (a, b) {
                return a > b ? a : b;
            };
            this.uuid = function () {
                // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
                var dt = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (dt + Math.random() * 16) % 16 | 0;
                    dt = Math.floor(dt / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            };
            this.findSvgElement = function () {
                if (this.svgElement === null) {
                    var tags = this.elRef.nativeElement.getElementsByTagName('svg');
                    if (tags.length > 0) {
                        this.svgElement = tags[0];
                    }
                }
            };
            this.checkViewport = function () {
                _this.findSvgElement();
                var previousValue = _this.isInViewport;
                _this.isInViewport = _this.isElementInViewport(_this.svgElement);
                if (previousValue !== _this.isInViewport) {
                    _this.onViewportChanged.emit({ oldValue: previousValue, newValue: _this.isInViewport });
                }
            };
            this.onScroll = function (event) {
                _this.checkViewport();
            };
            this.loadEventsForLazyMode = function () {
                if (_this.options.lazy) {
                    _this.document.addEventListener('scroll', _this.onScroll, true);
                    _this.window.addEventListener('resize', _this.onScroll, true);
                    if (_this._viewportChangedSubscriber === null) {
                        _this._viewportChangedSubscriber = _this.onViewportChanged.subscribe(function (_a) {
                            var oldValue = _a.oldValue, newValue = _a.newValue;
                            newValue ? _this.render() : null;
                        });
                    }
                    // svgElement must be created in DOM before being checked.
                    // Is there a better way to check the existence of svgElemnt?
                    var _timer_1 = rxjs.timer(0, 50).subscribe(function () {
                        _this.svgElement === null ? _this.checkViewport() : _timer_1.unsubscribe();
                    });
                }
            };
            this.unloadEventsForLazyMode = function () {
                // Remove event listeners
                _this.document.removeEventListener('scroll', _this.onScroll, true);
                _this.window.removeEventListener('resize', _this.onScroll, true);
                // Unsubscribe onViewportChanged
                if (_this._viewportChangedSubscriber !== null) {
                    _this._viewportChangedSubscriber.unsubscribe();
                    _this._viewportChangedSubscriber = null;
                }
            };
            this.document = document;
            this.window = this.document.defaultView;
            Object.assign(this.options, defaultOptions);
            Object.assign(this.defaultOptions, defaultOptions);
        }
        CircleProgressComponent.prototype.isDrawing = function () {
            return (this._timerSubscription && !this._timerSubscription.closed);
        };
        CircleProgressComponent.prototype.isElementInViewport = function (el) {
            // Return false if el has not been created in page.
            if (el === null || el === undefined)
                return false;
            // Check if the element is out of view due to a container scrolling
            var rect = el.getBoundingClientRect(), parent = el.parentNode, parentRect;
            do {
                parentRect = parent.getBoundingClientRect();
                if (rect.top >= parentRect.bottom)
                    return false;
                if (rect.bottom <= parentRect.top)
                    return false;
                if (rect.left >= parentRect.right)
                    return false;
                if (rect.right <= parentRect.left)
                    return false;
                parent = parent.parentNode;
            } while (parent != this.document.body);
            // Check its within the document viewport
            if (rect.top >= (this.window.innerHeight || this.document.documentElement.clientHeight))
                return false;
            if (rect.bottom <= 0)
                return false;
            if (rect.left >= (this.window.innerWidth || this.document.documentElement.clientWidth))
                return false;
            if (rect.right <= 0)
                return false;
            return true;
        };
        CircleProgressComponent.prototype.ngOnInit = function () {
            this.loadEventsForLazyMode();
        };
        CircleProgressComponent.prototype.ngOnDestroy = function () {
            this.unloadEventsForLazyMode();
        };
        CircleProgressComponent.prototype.ngOnChanges = function (changes) {
            this.render();
            if ('lazy' in changes) {
                changes.lazy.currentValue ? this.loadEventsForLazyMode() : this.unloadEventsForLazyMode();
            }
        };
        return CircleProgressComponent;
    }());
    CircleProgressComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'circle-progress',
                    template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"svg\"\n             [attr.viewBox]=\"svg.viewBox\" preserveAspectRatio=\"xMidYMid meet\"\n             [attr.height]=\"svg.height\" [attr.width]=\"svg.width\" (click)=\"emitClickEvent($event)\" [attr.class]=\"options.class\">\n            <defs>\n                <linearGradient *ngIf=\"options.outerStrokeGradient\" [attr.id]=\"svg.outerLinearGradient.id\">\n                    <stop offset=\"5%\" [attr.stop-color]=\"svg.outerLinearGradient.colorStop1\"  [attr.stop-opacity]=\"1\"/>\n                    <stop offset=\"95%\" [attr.stop-color]=\"svg.outerLinearGradient.colorStop2\" [attr.stop-opacity]=\"1\"/>\n                </linearGradient>\n                <radialGradient *ngIf=\"options.backgroundGradient\" [attr.id]=\"svg.radialGradient.id\">\n                    <stop offset=\"5%\" [attr.stop-color]=\"svg.radialGradient.colorStop1\" [attr.stop-opacity]=\"1\"/>\n                    <stop offset=\"95%\" [attr.stop-color]=\"svg.radialGradient.colorStop2\" [attr.stop-opacity]=\"1\"/>\n                </radialGradient>\n            </defs>\n            <ng-container *ngIf=\"options.showBackground\">\n                <circle *ngIf=\"!options.backgroundGradient\"\n                        [attr.cx]=\"svg.backgroundCircle.cx\"\n                        [attr.cy]=\"svg.backgroundCircle.cy\"\n                        [attr.r]=\"svg.backgroundCircle.r\"\n                        [attr.fill]=\"svg.backgroundCircle.fill\"\n                        [attr.fill-opacity]=\"svg.backgroundCircle.fillOpacity\"\n                        [attr.stroke]=\"svg.backgroundCircle.stroke\"\n                        [attr.stroke-width]=\"svg.backgroundCircle.strokeWidth\"/>\n                <circle *ngIf=\"options.backgroundGradient\"\n                        [attr.cx]=\"svg.backgroundCircle.cx\"\n                        [attr.cy]=\"svg.backgroundCircle.cy\"\n                        [attr.r]=\"svg.backgroundCircle.r\"\n                        attr.fill=\"url(#{{svg.radialGradient.id}})\"\n                        [attr.fill-opacity]=\"svg.backgroundCircle.fillOpacity\"\n                        [attr.stroke]=\"svg.backgroundCircle.stroke\"\n                        [attr.stroke-width]=\"svg.backgroundCircle.strokeWidth\"/>\n            </ng-container>            \n            <circle *ngIf=\"options.showInnerStroke\"\n                    [attr.cx]=\"svg.circle.cx\"\n                    [attr.cy]=\"svg.circle.cy\"\n                    [attr.r]=\"svg.circle.r\"\n                    [attr.fill]=\"svg.circle.fill\"\n                    [attr.stroke]=\"svg.circle.stroke\"\n                    [attr.stroke-width]=\"svg.circle.strokeWidth\"/>\n            <ng-container *ngIf=\"+options.percent!==0 || options.showZeroOuterStroke\">\n                <path *ngIf=\"!options.outerStrokeGradient\"\n                        [attr.d]=\"svg.path.d\"\n                        [attr.stroke]=\"svg.path.stroke\"\n                        [attr.stroke-width]=\"svg.path.strokeWidth\"\n                        [attr.stroke-linecap]=\"svg.path.strokeLinecap\"\n                        [attr.fill]=\"svg.path.fill\"/>\n                <path *ngIf=\"options.outerStrokeGradient\"\n                        [attr.d]=\"svg.path.d\"\n                        attr.stroke=\"url(#{{svg.outerLinearGradient.id}})\"\n                        [attr.stroke-width]=\"svg.path.strokeWidth\"\n                        [attr.stroke-linecap]=\"svg.path.strokeLinecap\"\n                        [attr.fill]=\"svg.path.fill\"/>\n            </ng-container>\n            <text *ngIf=\"!options.showImage && (options.showTitle || options.showUnits || options.showSubtitle)\"\n                  alignment-baseline=\"baseline\"\n                  [attr.x]=\"svg.circle.cx\"\n                  [attr.y]=\"svg.circle.cy\"\n                  [attr.text-anchor]=\"svg.title.textAnchor\">\n                <ng-container *ngIf=\"options.showTitle\">\n                    <tspan *ngFor=\"let tspan of svg.title.tspans\"\n                           [attr.x]=\"svg.title.x\"\n                           [attr.y]=\"svg.title.y\"\n                           [attr.dy]=\"tspan.dy\"\n                           [attr.font-size]=\"svg.title.fontSize\"\n                           [attr.font-weight]=\"svg.title.fontWeight\"\n                           [attr.fill]=\"svg.title.color\">{{tspan.span}}</tspan>\n                </ng-container>\n                <tspan *ngIf=\"options.showUnits\"\n                       [attr.font-size]=\"svg.units.fontSize\"\n                       [attr.font-weight]=\"svg.units.fontWeight\"\n                       [attr.fill]=\"svg.units.color\">{{svg.units.text}}</tspan>\n                <ng-container *ngIf=\"options.showSubtitle\">\n                    <tspan *ngFor=\"let tspan of svg.subtitle.tspans\"\n                           [attr.x]=\"svg.subtitle.x\"\n                           [attr.y]=\"svg.subtitle.y\"\n                           [attr.dy]=\"tspan.dy\"\n                           [attr.font-size]=\"svg.subtitle.fontSize\"\n                           [attr.font-weight]=\"svg.subtitle.fontWeight\"\n                           [attr.fill]=\"svg.subtitle.color\">{{tspan.span}}</tspan>\n                </ng-container>\n            </text>\n            <image *ngIf=\"options.showImage\" preserveAspectRatio=\"none\" \n                [attr.height]=\"svg.image.height\"\n                [attr.width]=\"svg.image.width\"\n                [attr.xlink:href]=\"svg.image.src\"\n                [attr.x]=\"svg.image.x\"\n                [attr.y]=\"svg.image.y\"\n            />\n        </svg>\n    "
                },] }
    ];
    CircleProgressComponent.ctorParameters = function () { return [
        { type: CircleProgressOptions },
        { type: core.ElementRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    CircleProgressComponent.propDecorators = {
        onClick: [{ type: core.Output }],
        name: [{ type: core.Input }],
        class: [{ type: core.Input }],
        backgroundGradient: [{ type: core.Input }],
        backgroundColor: [{ type: core.Input }],
        backgroundGradientStopColor: [{ type: core.Input }],
        backgroundOpacity: [{ type: core.Input }],
        backgroundStroke: [{ type: core.Input }],
        backgroundStrokeWidth: [{ type: core.Input }],
        backgroundPadding: [{ type: core.Input }],
        radius: [{ type: core.Input }],
        space: [{ type: core.Input }],
        percent: [{ type: core.Input }],
        toFixed: [{ type: core.Input }],
        maxPercent: [{ type: core.Input }],
        renderOnClick: [{ type: core.Input }],
        units: [{ type: core.Input }],
        unitsFontSize: [{ type: core.Input }],
        unitsFontWeight: [{ type: core.Input }],
        unitsColor: [{ type: core.Input }],
        outerStrokeGradient: [{ type: core.Input }],
        outerStrokeWidth: [{ type: core.Input }],
        outerStrokeColor: [{ type: core.Input }],
        outerStrokeGradientStopColor: [{ type: core.Input }],
        outerStrokeLinecap: [{ type: core.Input }],
        innerStrokeColor: [{ type: core.Input }],
        innerStrokeWidth: [{ type: core.Input }],
        titleFormat: [{ type: core.Input }],
        title: [{ type: core.Input }],
        titleColor: [{ type: core.Input }],
        titleFontSize: [{ type: core.Input }],
        titleFontWeight: [{ type: core.Input }],
        subtitleFormat: [{ type: core.Input }],
        subtitle: [{ type: core.Input }],
        subtitleColor: [{ type: core.Input }],
        subtitleFontSize: [{ type: core.Input }],
        subtitleFontWeight: [{ type: core.Input }],
        imageSrc: [{ type: core.Input }],
        imageHeight: [{ type: core.Input }],
        imageWidth: [{ type: core.Input }],
        animation: [{ type: core.Input }],
        animateTitle: [{ type: core.Input }],
        animateSubtitle: [{ type: core.Input }],
        animationDuration: [{ type: core.Input }],
        showTitle: [{ type: core.Input }],
        showSubtitle: [{ type: core.Input }],
        showUnits: [{ type: core.Input }],
        showImage: [{ type: core.Input }],
        showBackground: [{ type: core.Input }],
        showInnerStroke: [{ type: core.Input }],
        clockwise: [{ type: core.Input }],
        responsive: [{ type: core.Input }],
        startFromZero: [{ type: core.Input }],
        showZeroOuterStroke: [{ type: core.Input }],
        lazy: [{ type: core.Input }],
        templateOptions: [{ type: core.Input, args: ['options',] }]
    };

    var NgCircleProgressModule = /** @class */ (function () {
        function NgCircleProgressModule() {
        }
        NgCircleProgressModule.forRoot = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: NgCircleProgressModule,
                providers: [
                    { provide: CircleProgressOptions, useValue: options }
                ]
            };
        };
        return NgCircleProgressModule;
    }());
    NgCircleProgressModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [CircleProgressComponent],
                    imports: [
                        common.CommonModule
                    ],
                    exports: [CircleProgressComponent]
                },] }
    ];

    /*
     * Public API Surface of ng-circle-progress
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CircleProgressComponent = CircleProgressComponent;
    exports.CircleProgressOptions = CircleProgressOptions;
    exports.NgCircleProgressModule = NgCircleProgressModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-circle-progress.umd.js.map
