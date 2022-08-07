import { Component, EventEmitter, Input, Output, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer } from 'rxjs';
export class CircleProgressOptions {
    constructor() {
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
}
/** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
export class CircleProgressComponent {
    constructor(defaultOptions, elRef, document) {
        this.elRef = elRef;
        this.document = document;
        this.onClick = new EventEmitter();
        // <svg> of component
        this.svgElement = null;
        // whether <svg> is in viewport
        this.isInViewport = false;
        // event for notifying viewport change caused by scrolling or resizing
        this.onViewportChanged = new EventEmitter;
        this._viewportChangedSubscriber = null;
        this.options = new CircleProgressOptions();
        this.defaultOptions = new CircleProgressOptions();
        this._lastPercent = 0;
        this._gradientUUID = null;
        this.render = () => {
            this.applyOptions();
            if (this.options.lazy) {
                // Draw svg if it doesn't exist
                this.svgElement === null && this.draw(this._lastPercent);
                // Draw it only when it's in the viewport
                if (this.isInViewport) {
                    // Draw it at the latest position when I am in.
                    if (this.options.animation && this.options.animationDuration > 0) {
                        this.animate(this._lastPercent, this.options.percent);
                    }
                    else {
                        this.draw(this.options.percent);
                    }
                    this._lastPercent = this.options.percent;
                }
            }
            else {
                if (this.options.animation && this.options.animationDuration > 0) {
                    this.animate(this._lastPercent, this.options.percent);
                }
                else {
                    this.draw(this.options.percent);
                }
                this._lastPercent = this.options.percent;
            }
        };
        this.polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
            let angleInRadius = angleInDegrees * Math.PI / 180;
            let x = centerX + Math.sin(angleInRadius) * radius;
            let y = centerY - Math.cos(angleInRadius) * radius;
            return { x: x, y: y };
        };
        this.draw = (percent) => {
            // make percent reasonable
            percent = (percent === undefined) ? this.options.percent : Math.abs(percent);
            // circle percent shouldn't be greater than 100%.
            let circlePercent = (percent > 100) ? 100 : percent;
            // determine box size
            let boxSize = this.options.radius * 2 + this.options.outerStrokeWidth * 2;
            if (this.options.showBackground) {
                boxSize += (this.options.backgroundStrokeWidth * 2 + this.max(0, this.options.backgroundPadding * 2));
            }
            // the centre of the circle
            let centre = { x: boxSize / 2, y: boxSize / 2 };
            // the start point of the arc
            let startPoint = { x: centre.x, y: centre.y - this.options.radius };
            // get the end point of the arc
            let endPoint = this.polarToCartesian(centre.x, centre.y, this.options.radius, 360 * (this.options.clockwise ?
                circlePercent :
                (100 - circlePercent)) / 100); // ####################
            // We'll get an end point with the same [x, y] as the start point when percent is 100%, so move x a little bit.
            if (circlePercent === 100) {
                endPoint.x = endPoint.x + (this.options.clockwise ? -0.01 : +0.01);
            }
            // largeArcFlag and sweepFlag
            let largeArcFlag, sweepFlag;
            if (circlePercent > 50) {
                [largeArcFlag, sweepFlag] = this.options.clockwise ? [1, 1] : [1, 0];
            }
            else {
                [largeArcFlag, sweepFlag] = this.options.clockwise ? [0, 1] : [0, 0];
            }
            // percent may not equal the actual percent
            let titlePercent = this.options.animateTitle ? percent : this.options.percent;
            let titleTextPercent = titlePercent > this.options.maxPercent ?
                `${this.options.maxPercent.toFixed(this.options.toFixed)}+` : titlePercent.toFixed(this.options.toFixed);
            let subtitlePercent = this.options.animateSubtitle ? percent : this.options.percent;
            // get title object
            let title = {
                x: centre.x,
                y: centre.y,
                textAnchor: 'middle',
                color: this.options.titleColor,
                fontSize: this.options.titleFontSize,
                fontWeight: this.options.titleFontWeight,
                texts: [],
                tspans: []
            };
            // from v0.9.9, both title and titleFormat(...) may be an array of string.
            if (this.options.titleFormat !== undefined && this.options.titleFormat.constructor.name === 'Function') {
                let formatted = this.options.titleFormat(titlePercent);
                if (formatted instanceof Array) {
                    title.texts = [...formatted];
                }
                else {
                    title.texts.push(formatted.toString());
                }
            }
            else {
                if (this.options.title === 'auto') {
                    title.texts.push(titleTextPercent);
                }
                else {
                    if (this.options.title instanceof Array) {
                        title.texts = [...this.options.title];
                    }
                    else {
                        title.texts.push(this.options.title.toString());
                    }
                }
            }
            // get subtitle object
            let subtitle = {
                x: centre.x,
                y: centre.y,
                textAnchor: 'middle',
                color: this.options.subtitleColor,
                fontSize: this.options.subtitleFontSize,
                fontWeight: this.options.subtitleFontWeight,
                texts: [],
                tspans: []
            };
            // from v0.9.9, both subtitle and subtitleFormat(...) may be an array of string.
            if (this.options.subtitleFormat !== undefined && this.options.subtitleFormat.constructor.name === 'Function') {
                let formatted = this.options.subtitleFormat(subtitlePercent);
                if (formatted instanceof Array) {
                    subtitle.texts = [...formatted];
                }
                else {
                    subtitle.texts.push(formatted.toString());
                }
            }
            else {
                if (this.options.subtitle instanceof Array) {
                    subtitle.texts = [...this.options.subtitle];
                }
                else {
                    subtitle.texts.push(this.options.subtitle.toString());
                }
            }
            // get units object
            let units = {
                text: `${this.options.units}`,
                fontSize: this.options.unitsFontSize,
                fontWeight: this.options.unitsFontWeight,
                color: this.options.unitsColor
            };
            // get total count of text lines to be shown
            let rowCount = 0, rowNum = 1;
            this.options.showTitle && (rowCount += title.texts.length);
            this.options.showSubtitle && (rowCount += subtitle.texts.length);
            // calc dy for each tspan for title
            if (this.options.showTitle) {
                for (let span of title.texts) {
                    title.tspans.push({ span: span, dy: this.getRelativeY(rowNum, rowCount) });
                    rowNum++;
                }
            }
            // calc dy for each tspan for subtitle
            if (this.options.showSubtitle) {
                for (let span of subtitle.texts) {
                    subtitle.tspans.push({ span: span, dy: this.getRelativeY(rowNum, rowCount) });
                    rowNum++;
                }
            }
            // create ID for gradient element
            if (null === this._gradientUUID) {
                this._gradientUUID = this.uuid();
            }
            // Bring it all together
            this.svg = {
                viewBox: `0 0 ${boxSize} ${boxSize}`,
                // Set both width and height to '100%' if it's responsive
                width: this.options.responsive ? '100%' : boxSize,
                height: this.options.responsive ? '100%' : boxSize,
                backgroundCircle: {
                    cx: centre.x,
                    cy: centre.y,
                    r: this.options.radius + this.options.outerStrokeWidth / 2 + this.options.backgroundPadding,
                    fill: this.options.backgroundColor,
                    fillOpacity: this.options.backgroundOpacity,
                    stroke: this.options.backgroundStroke,
                    strokeWidth: this.options.backgroundStrokeWidth,
                },
                path: {
                    // A rx ry x-axis-rotation large-arc-flag sweep-flag x y (https://developer.mozilla.org/en/docs/Web/SVG/Tutorial/Paths#Arcs)
                    d: `M ${startPoint.x} ${startPoint.y}
        A ${this.options.radius} ${this.options.radius} 0 ${largeArcFlag} ${sweepFlag} ${endPoint.x} ${endPoint.y}`,
                    stroke: this.options.outerStrokeColor,
                    strokeWidth: this.options.outerStrokeWidth,
                    strokeLinecap: this.options.outerStrokeLinecap,
                    fill: 'none'
                },
                circle: {
                    cx: centre.x,
                    cy: centre.y,
                    r: this.options.radius - this.options.space - this.options.outerStrokeWidth / 2 - this.options.innerStrokeWidth / 2,
                    fill: 'none',
                    stroke: this.options.innerStrokeColor,
                    strokeWidth: this.options.innerStrokeWidth,
                },
                title: title,
                units: units,
                subtitle: subtitle,
                image: {
                    x: centre.x - this.options.imageWidth / 2,
                    y: centre.y - this.options.imageHeight / 2,
                    src: this.options.imageSrc,
                    width: this.options.imageWidth,
                    height: this.options.imageHeight,
                },
                outerLinearGradient: {
                    id: 'outer-linear-' + this._gradientUUID,
                    colorStop1: this.options.outerStrokeColor,
                    colorStop2: this.options.outerStrokeGradientStopColor === 'transparent' ? '#FFF' : this.options.outerStrokeGradientStopColor,
                },
                radialGradient: {
                    id: 'radial-' + this._gradientUUID,
                    colorStop1: this.options.backgroundColor,
                    colorStop2: this.options.backgroundGradientStopColor === 'transparent' ? '#FFF' : this.options.backgroundGradientStopColor,
                }
            };
        };
        this.getAnimationParameters = (previousPercent, currentPercent) => {
            const MIN_INTERVAL = 10;
            let times, step, interval;
            let fromPercent = this.options.startFromZero ? 0 : (previousPercent < 0 ? 0 : previousPercent);
            let toPercent = currentPercent < 0 ? 0 : this.min(currentPercent, this.options.maxPercent);
            let delta = Math.abs(Math.round(toPercent - fromPercent));
            if (delta >= 100) {
                // we will finish animation in 100 times
                times = 100;
                if (!this.options.animateTitle && !this.options.animateSubtitle) {
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
            interval = Math.round(this.options.animationDuration / times);
            // Readjust all values if the interval of timer is extremely small.
            if (interval < MIN_INTERVAL) {
                interval = MIN_INTERVAL;
                times = this.options.animationDuration / interval;
                if (!this.options.animateTitle && !this.options.animateSubtitle && delta > 100) {
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
        this.animate = (previousPercent, currentPercent) => {
            if (this._timerSubscription && !this._timerSubscription.closed) {
                this._timerSubscription.unsubscribe();
            }
            let fromPercent = this.options.startFromZero ? 0 : previousPercent;
            let toPercent = currentPercent;
            let { step: step, interval: interval } = this.getAnimationParameters(fromPercent, toPercent);
            let count = fromPercent;
            if (fromPercent < toPercent) {
                this._timerSubscription = timer(0, interval).subscribe(() => {
                    count += step;
                    if (count <= toPercent) {
                        if (!this.options.animateTitle && !this.options.animateSubtitle && count >= 100) {
                            this.draw(toPercent);
                            this._timerSubscription.unsubscribe();
                        }
                        else {
                            this.draw(count);
                        }
                    }
                    else {
                        this.draw(toPercent);
                        this._timerSubscription.unsubscribe();
                    }
                });
            }
            else {
                this._timerSubscription = timer(0, interval).subscribe(() => {
                    count -= step;
                    if (count >= toPercent) {
                        if (!this.options.animateTitle && !this.options.animateSubtitle && toPercent >= 100) {
                            this.draw(toPercent);
                            this._timerSubscription.unsubscribe();
                        }
                        else {
                            this.draw(count);
                        }
                    }
                    else {
                        this.draw(toPercent);
                        this._timerSubscription.unsubscribe();
                    }
                });
            }
        };
        this.emitClickEvent = (event) => {
            if (this.options.renderOnClick) {
                this.animate(0, this.options.percent);
            }
            this.onClick.emit(event);
        };
        this.applyOptions = () => {
            // the options of <circle-progress> may change already
            for (let name of Object.keys(this.options)) {
                if (this.hasOwnProperty(name) && this[name] !== undefined) {
                    this.options[name] = this[name];
                }
                else if (this.templateOptions && this.templateOptions[name] !== undefined) {
                    this.options[name] = this.templateOptions[name];
                }
            }
            // make sure key options valid
            this.options.radius = Math.abs(+this.options.radius);
            this.options.space = +this.options.space;
            this.options.percent = +this.options.percent > 0 ? +this.options.percent : 0;
            this.options.maxPercent = Math.abs(+this.options.maxPercent);
            this.options.animationDuration = Math.abs(this.options.animationDuration);
            this.options.outerStrokeWidth = Math.abs(+this.options.outerStrokeWidth);
            this.options.innerStrokeWidth = Math.abs(+this.options.innerStrokeWidth);
            this.options.backgroundPadding = +this.options.backgroundPadding;
        };
        this.getRelativeY = (rowNum, rowCount) => {
            // why '-0.18em'? It's a magic number when property 'alignment-baseline' equals 'baseline'. :)
            let initialOffset = -0.18, offset = 1;
            return (initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2) + 'em';
        };
        this.min = (a, b) => {
            return a < b ? a : b;
        };
        this.max = (a, b) => {
            return a > b ? a : b;
        };
        this.uuid = () => {
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
                let tags = this.elRef.nativeElement.getElementsByTagName('svg');
                if (tags.length > 0) {
                    this.svgElement = tags[0];
                }
            }
        };
        this.checkViewport = () => {
            this.findSvgElement();
            let previousValue = this.isInViewport;
            this.isInViewport = this.isElementInViewport(this.svgElement);
            if (previousValue !== this.isInViewport) {
                this.onViewportChanged.emit({ oldValue: previousValue, newValue: this.isInViewport });
            }
        };
        this.onScroll = (event) => {
            this.checkViewport();
        };
        this.loadEventsForLazyMode = () => {
            if (this.options.lazy) {
                this.document.addEventListener('scroll', this.onScroll, true);
                this.window.addEventListener('resize', this.onScroll, true);
                if (this._viewportChangedSubscriber === null) {
                    this._viewportChangedSubscriber = this.onViewportChanged.subscribe(({ oldValue, newValue }) => {
                        newValue ? this.render() : null;
                    });
                }
                // svgElement must be created in DOM before being checked.
                // Is there a better way to check the existence of svgElemnt?
                let _timer = timer(0, 50).subscribe(() => {
                    this.svgElement === null ? this.checkViewport() : _timer.unsubscribe();
                });
            }
        };
        this.unloadEventsForLazyMode = () => {
            // Remove event listeners
            this.document.removeEventListener('scroll', this.onScroll, true);
            this.window.removeEventListener('resize', this.onScroll, true);
            // Unsubscribe onViewportChanged
            if (this._viewportChangedSubscriber !== null) {
                this._viewportChangedSubscriber.unsubscribe();
                this._viewportChangedSubscriber = null;
            }
        };
        this.document = document;
        this.window = this.document.defaultView;
        Object.assign(this.options, defaultOptions);
        Object.assign(this.defaultOptions, defaultOptions);
    }
    isDrawing() {
        return (this._timerSubscription && !this._timerSubscription.closed);
    }
    isElementInViewport(el) {
        // Return false if el has not been created in page.
        if (el === null || el === undefined)
            return false;
        // Check if the element is out of view due to a container scrolling
        let rect = el.getBoundingClientRect(), parent = el.parentNode, parentRect;
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
    }
    ngOnInit() {
        this.loadEventsForLazyMode();
    }
    ngOnDestroy() {
        this.unloadEventsForLazyMode();
    }
    ngOnChanges(changes) {
        this.render();
        if ('lazy' in changes) {
            changes.lazy.currentValue ? this.loadEventsForLazyMode() : this.unloadEventsForLazyMode();
        }
    }
}
CircleProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'circle-progress',
                template: `
        <svg xmlns="http://www.w3.org/2000/svg" *ngIf="svg"
             [attr.viewBox]="svg.viewBox" preserveAspectRatio="xMidYMid meet"
             [attr.height]="svg.height" [attr.width]="svg.width" (click)="emitClickEvent($event)" [attr.class]="options.class">
            <defs>
                <linearGradient *ngIf="options.outerStrokeGradient" [attr.id]="svg.outerLinearGradient.id">
                    <stop offset="5%" [attr.stop-color]="svg.outerLinearGradient.colorStop1"  [attr.stop-opacity]="1"/>
                    <stop offset="95%" [attr.stop-color]="svg.outerLinearGradient.colorStop2" [attr.stop-opacity]="1"/>
                </linearGradient>
                <radialGradient *ngIf="options.backgroundGradient" [attr.id]="svg.radialGradient.id">
                    <stop offset="5%" [attr.stop-color]="svg.radialGradient.colorStop1" [attr.stop-opacity]="1"/>
                    <stop offset="95%" [attr.stop-color]="svg.radialGradient.colorStop2" [attr.stop-opacity]="1"/>
                </radialGradient>
            </defs>
            <ng-container *ngIf="options.showBackground">
                <circle *ngIf="!options.backgroundGradient"
                        [attr.cx]="svg.backgroundCircle.cx"
                        [attr.cy]="svg.backgroundCircle.cy"
                        [attr.r]="svg.backgroundCircle.r"
                        [attr.fill]="svg.backgroundCircle.fill"
                        [attr.fill-opacity]="svg.backgroundCircle.fillOpacity"
                        [attr.stroke]="svg.backgroundCircle.stroke"
                        [attr.stroke-width]="svg.backgroundCircle.strokeWidth"/>
                <circle *ngIf="options.backgroundGradient"
                        [attr.cx]="svg.backgroundCircle.cx"
                        [attr.cy]="svg.backgroundCircle.cy"
                        [attr.r]="svg.backgroundCircle.r"
                        attr.fill="url(#{{svg.radialGradient.id}})"
                        [attr.fill-opacity]="svg.backgroundCircle.fillOpacity"
                        [attr.stroke]="svg.backgroundCircle.stroke"
                        [attr.stroke-width]="svg.backgroundCircle.strokeWidth"/>
            </ng-container>            
            <circle *ngIf="options.showInnerStroke"
                    [attr.cx]="svg.circle.cx"
                    [attr.cy]="svg.circle.cy"
                    [attr.r]="svg.circle.r"
                    [attr.fill]="svg.circle.fill"
                    [attr.stroke]="svg.circle.stroke"
                    [attr.stroke-width]="svg.circle.strokeWidth"/>
            <ng-container *ngIf="+options.percent!==0 || options.showZeroOuterStroke">
                <path *ngIf="!options.outerStrokeGradient"
                        [attr.d]="svg.path.d"
                        [attr.stroke]="svg.path.stroke"
                        [attr.stroke-width]="svg.path.strokeWidth"
                        [attr.stroke-linecap]="svg.path.strokeLinecap"
                        [attr.fill]="svg.path.fill"/>
                <path *ngIf="options.outerStrokeGradient"
                        [attr.d]="svg.path.d"
                        attr.stroke="url(#{{svg.outerLinearGradient.id}})"
                        [attr.stroke-width]="svg.path.strokeWidth"
                        [attr.stroke-linecap]="svg.path.strokeLinecap"
                        [attr.fill]="svg.path.fill"/>
            </ng-container>
            <text *ngIf="!options.showImage && (options.showTitle || options.showUnits || options.showSubtitle)"
                  alignment-baseline="baseline"
                  [attr.x]="svg.circle.cx"
                  [attr.y]="svg.circle.cy"
                  [attr.text-anchor]="svg.title.textAnchor">
                <ng-container *ngIf="options.showTitle">
                    <tspan *ngFor="let tspan of svg.title.tspans"
                           [attr.x]="svg.title.x"
                           [attr.y]="svg.title.y"
                           [attr.dy]="tspan.dy"
                           [attr.font-size]="svg.title.fontSize"
                           [attr.font-weight]="svg.title.fontWeight"
                           [attr.fill]="svg.title.color">{{tspan.span}}</tspan>
                </ng-container>
                <tspan *ngIf="options.showUnits"
                       [attr.font-size]="svg.units.fontSize"
                       [attr.font-weight]="svg.units.fontWeight"
                       [attr.fill]="svg.units.color">{{svg.units.text}}</tspan>
                <ng-container *ngIf="options.showSubtitle">
                    <tspan *ngFor="let tspan of svg.subtitle.tspans"
                           [attr.x]="svg.subtitle.x"
                           [attr.y]="svg.subtitle.y"
                           [attr.dy]="tspan.dy"
                           [attr.font-size]="svg.subtitle.fontSize"
                           [attr.font-weight]="svg.subtitle.fontWeight"
                           [attr.fill]="svg.subtitle.color">{{tspan.span}}</tspan>
                </ng-container>
            </text>
            <image *ngIf="options.showImage" preserveAspectRatio="none" 
                [attr.height]="svg.image.height"
                [attr.width]="svg.image.width"
                [attr.xlink:href]="svg.image.src"
                [attr.x]="svg.image.x"
                [attr.y]="svg.image.y"
            />
        </svg>
    `
            },] }
];
CircleProgressComponent.ctorParameters = () => [
    { type: CircleProgressOptions },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CircleProgressComponent.propDecorators = {
    onClick: [{ type: Output }],
    name: [{ type: Input }],
    class: [{ type: Input }],
    backgroundGradient: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    backgroundGradientStopColor: [{ type: Input }],
    backgroundOpacity: [{ type: Input }],
    backgroundStroke: [{ type: Input }],
    backgroundStrokeWidth: [{ type: Input }],
    backgroundPadding: [{ type: Input }],
    radius: [{ type: Input }],
    space: [{ type: Input }],
    percent: [{ type: Input }],
    toFixed: [{ type: Input }],
    maxPercent: [{ type: Input }],
    renderOnClick: [{ type: Input }],
    units: [{ type: Input }],
    unitsFontSize: [{ type: Input }],
    unitsFontWeight: [{ type: Input }],
    unitsColor: [{ type: Input }],
    outerStrokeGradient: [{ type: Input }],
    outerStrokeWidth: [{ type: Input }],
    outerStrokeColor: [{ type: Input }],
    outerStrokeGradientStopColor: [{ type: Input }],
    outerStrokeLinecap: [{ type: Input }],
    innerStrokeColor: [{ type: Input }],
    innerStrokeWidth: [{ type: Input }],
    titleFormat: [{ type: Input }],
    title: [{ type: Input }],
    titleColor: [{ type: Input }],
    titleFontSize: [{ type: Input }],
    titleFontWeight: [{ type: Input }],
    subtitleFormat: [{ type: Input }],
    subtitle: [{ type: Input }],
    subtitleColor: [{ type: Input }],
    subtitleFontSize: [{ type: Input }],
    subtitleFontWeight: [{ type: Input }],
    imageSrc: [{ type: Input }],
    imageHeight: [{ type: Input }],
    imageWidth: [{ type: Input }],
    animation: [{ type: Input }],
    animateTitle: [{ type: Input }],
    animateSubtitle: [{ type: Input }],
    animationDuration: [{ type: Input }],
    showTitle: [{ type: Input }],
    showSubtitle: [{ type: Input }],
    showUnits: [{ type: Input }],
    showImage: [{ type: Input }],
    showBackground: [{ type: Input }],
    showInnerStroke: [{ type: Input }],
    clockwise: [{ type: Input }],
    responsive: [{ type: Input }],
    startFromZero: [{ type: Input }],
    showZeroOuterStroke: [{ type: Input }],
    lazy: [{ type: Input }],
    templateOptions: [{ type: Input, args: ['options',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2lyY2xlLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy96ZXRhbC90bXAvbmctY2lyY2xlLXByb2dyZXNzLWxpYnJhcnkvcHJvamVjdHMvbmctY2lyY2xlLXByb2dyZXNzL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9uZy1jaXJjbGUtcHJvZ3Jlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxFQUFxQixVQUFVLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQTBEM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUFsQztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0Isb0JBQWUsR0FBRyxhQUFhLENBQUM7UUFDaEMsZ0NBQTJCLEdBQUcsYUFBYSxDQUFDO1FBQzVDLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0QixxQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDakMsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUN0QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsb0JBQWUsR0FBRyxRQUFRLENBQUM7UUFDM0IsZUFBVSxHQUFHLFNBQVMs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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgSW5qZWN0LCBPbkluaXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENpcmNsZVByb2dyZXNzT3B0aW9uc0ludGVyZmFjZSB7XG4gICAgY2xhc3M/OiBzdHJpbmc7XG4gICAgYmFja2dyb3VuZEdyYWRpZW50PzogYm9vbGVhbjtcbiAgICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gICAgYmFja2dyb3VuZEdyYWRpZW50U3RvcENvbG9yPzogc3RyaW5nO1xuICAgIGJhY2tncm91bmRPcGFjaXR5PzogbnVtYmVyO1xuICAgIGJhY2tncm91bmRTdHJva2U/OiBzdHJpbmc7XG4gICAgYmFja2dyb3VuZFN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAgIGJhY2tncm91bmRQYWRkaW5nPzogbnVtYmVyO1xuICAgIHBlcmNlbnQ/OiBudW1iZXI7XG4gICAgcmFkaXVzPzogbnVtYmVyO1xuICAgIHNwYWNlPzogbnVtYmVyO1xuICAgIHRvRml4ZWQ/OiBudW1iZXI7XG4gICAgbWF4UGVyY2VudD86IG51bWJlcjtcbiAgICByZW5kZXJPbkNsaWNrPzogYm9vbGVhbjtcbiAgICB1bml0cz86IHN0cmluZztcbiAgICB1bml0c0ZvbnRTaXplPzogc3RyaW5nO1xuICAgIHVuaXRzRm9udFdlaWdodD86IHN0cmluZztcbiAgICB1bml0c0NvbG9yPzogc3RyaW5nO1xuICAgIG91dGVyU3Ryb2tlR3JhZGllbnQ/OiBib29sZWFuO1xuICAgIG91dGVyU3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gICAgb3V0ZXJTdHJva2VDb2xvcj86IHN0cmluZztcbiAgICBvdXRlclN0cm9rZUdyYWRpZW50U3RvcENvbG9yPzogc3RyaW5nO1xuICAgIG91dGVyU3Ryb2tlTGluZWNhcD86IHN0cmluZztcbiAgICBpbm5lclN0cm9rZUNvbG9yPzogc3RyaW5nO1xuICAgIGlubmVyU3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gICAgdGl0bGVGb3JtYXQ/OiBGdW5jdGlvbjtcbiAgICB0aXRsZT86IHN0cmluZyB8IEFycmF5PFN0cmluZz47XG4gICAgdGl0bGVDb2xvcj86IHN0cmluZztcbiAgICB0aXRsZUZvbnRTaXplPzogc3RyaW5nO1xuICAgIHRpdGxlRm9udFdlaWdodD86IHN0cmluZztcbiAgICBzdWJ0aXRsZUZvcm1hdD86IEZ1bmN0aW9uO1xuICAgIHN1YnRpdGxlPzogc3RyaW5nIHwgQXJyYXk8U3RyaW5nPjtcbiAgICBzdWJ0aXRsZUNvbG9yPzogc3RyaW5nO1xuICAgIHN1YnRpdGxlRm9udFNpemU/OiBzdHJpbmc7XG4gICAgc3VidGl0bGVGb250V2VpZ2h0Pzogc3RyaW5nO1xuICAgIGltYWdlU3JjPzogc3RyaW5nO1xuICAgIGltYWdlSGVpZ2h0PzogbnVtYmVyO1xuICAgIGltYWdlV2lkdGg/OiBudW1iZXI7XG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbjtcbiAgICBhbmltYXRlVGl0bGU/OiBib29sZWFuO1xuICAgIGFuaW1hdGVTdWJ0aXRsZT86IGJvb2xlYW47XG4gICAgYW5pbWF0aW9uRHVyYXRpb24/OiBudW1iZXI7XG4gICAgc2hvd1RpdGxlPzogYm9vbGVhbjtcbiAgICBzaG93U3VidGl0bGU/OiBib29sZWFuO1xuICAgIHNob3dVbml0cz86IGJvb2xlYW47XG4gICAgc2hvd0ltYWdlPzogYm9vbGVhbjtcbiAgICBzaG93QmFja2dyb3VuZD86IGJvb2xlYW47XG4gICAgc2hvd0lubmVyU3Ryb2tlPzogYm9vbGVhbjtcbiAgICBjbG9ja3dpc2U/OiBib29sZWFuO1xuICAgIHJlc3BvbnNpdmU/OiBib29sZWFuO1xuICAgIHN0YXJ0RnJvbVplcm8/OiBib29sZWFuO1xuICAgIHNob3daZXJvT3V0ZXJTdHJva2U/OiBib29sZWFuO1xuICAgIGxhenk/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zIGltcGxlbWVudHMgQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zSW50ZXJmYWNlIHtcbiAgICBjbGFzcyA9ICcnO1xuICAgIGJhY2tncm91bmRHcmFkaWVudCA9IGZhbHNlO1xuICAgIGJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgYmFja2dyb3VuZEdyYWRpZW50U3RvcENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICBiYWNrZ3JvdW5kT3BhY2l0eSA9IDE7XG4gICAgYmFja2dyb3VuZFN0cm9rZSA9ICd0cmFuc3BhcmVudCc7XG4gICAgYmFja2dyb3VuZFN0cm9rZVdpZHRoID0gMDtcbiAgICBiYWNrZ3JvdW5kUGFkZGluZyA9IDU7XG4gICAgcGVyY2VudCA9IDA7XG4gICAgcmFkaXVzID0gOTA7XG4gICAgc3BhY2UgPSA0O1xuICAgIHRvRml4ZWQgPSAwO1xuICAgIG1heFBlcmNlbnQgPSAxMDAwO1xuICAgIHJlbmRlck9uQ2xpY2sgPSB0cnVlO1xuICAgIHVuaXRzID0gJyUnO1xuICAgIHVuaXRzRm9udFNpemUgPSAnMTAnO1xuICAgIHVuaXRzRm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIHVuaXRzQ29sb3IgPSAnIzQ0NDQ0NCc7XG4gICAgb3V0ZXJTdHJva2VHcmFkaWVudCA9IGZhbHNlO1xuICAgIG91dGVyU3Ryb2tlV2lkdGggPSA4O1xuICAgIG91dGVyU3Ryb2tlQ29sb3IgPSAnIzc4QzAwMCc7XG4gICAgb3V0ZXJTdHJva2VHcmFkaWVudFN0b3BDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgb3V0ZXJTdHJva2VMaW5lY2FwID0gJ3JvdW5kJztcbiAgICBpbm5lclN0cm9rZUNvbG9yID0gJyNDN0U1OTYnO1xuICAgIGlubmVyU3Ryb2tlV2lkdGggPSA0O1xuICAgIHRpdGxlRm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgIHRpdGxlOiBzdHJpbmcgfCBBcnJheTxTdHJpbmc+ID0gJ2F1dG8nO1xuICAgIHRpdGxlQ29sb3IgPSAnIzQ0NDQ0NCc7XG4gICAgdGl0bGVGb250U2l6ZSA9ICcyMCc7XG4gICAgdGl0bGVGb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gICAgc3VidGl0bGVGb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgc3VidGl0bGU6IHN0cmluZyB8IEFycmF5PFN0cmluZz4gPSAncHJvZ3Jlc3MnO1xuICAgIHN1YnRpdGxlQ29sb3IgPSAnI0E5QTlBOSc7XG4gICAgc3VidGl0bGVGb250U2l6ZSA9ICcxMCc7XG4gICAgc3VidGl0bGVGb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gICAgaW1hZ2VTcmMgPSB1bmRlZmluZWQ7XG4gICAgaW1hZ2VIZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgaW1hZ2VXaWR0aCA9IHVuZGVmaW5lZDtcbiAgICBhbmltYXRpb24gPSB0cnVlO1xuICAgIGFuaW1hdGVUaXRsZSA9IHRydWU7XG4gICAgYW5pbWF0ZVN1YnRpdGxlID0gZmFsc2U7XG4gICAgYW5pbWF0aW9uRHVyYXRpb24gPSA1MDA7XG4gICAgc2hvd1RpdGxlID0gdHJ1ZTtcbiAgICBzaG93U3VidGl0bGUgPSB0cnVlO1xuICAgIHNob3dVbml0cyA9IHRydWU7XG4gICAgc2hvd0ltYWdlID0gZmFsc2U7XG4gICAgc2hvd0JhY2tncm91bmQgPSB0cnVlO1xuICAgIHNob3dJbm5lclN0cm9rZSA9IHRydWU7XG4gICAgY2xvY2t3aXNlID0gdHJ1ZTtcbiAgICByZXNwb25zaXZlID0gZmFsc2U7XG4gICAgc3RhcnRGcm9tWmVybyA9IHRydWU7XG4gICAgc2hvd1plcm9PdXRlclN0cm9rZSA9IHRydWU7XG4gICAgbGF6eSA9IGZhbHNlO1xufVxuXG4vKiogQGR5bmFtaWMgUHJldmVudCBjb21waWxpbmcgZXJyb3Igd2hlbiB1c2luZyB0eXBlIGBEb2N1bWVudGAgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjAzNTEgKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2lyY2xlLXByb2dyZXNzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAqbmdJZj1cInN2Z1wiXG4gICAgICAgICAgICAgW2F0dHIudmlld0JveF09XCJzdmcudmlld0JveFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBtZWV0XCJcbiAgICAgICAgICAgICBbYXR0ci5oZWlnaHRdPVwic3ZnLmhlaWdodFwiIFthdHRyLndpZHRoXT1cInN2Zy53aWR0aFwiIChjbGljayk9XCJlbWl0Q2xpY2tFdmVudCgkZXZlbnQpXCIgW2F0dHIuY2xhc3NdPVwib3B0aW9ucy5jbGFzc1wiPlxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50ICpuZ0lmPVwib3B0aW9ucy5vdXRlclN0cm9rZUdyYWRpZW50XCIgW2F0dHIuaWRdPVwic3ZnLm91dGVyTGluZWFyR3JhZGllbnQuaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNSVcIiBbYXR0ci5zdG9wLWNvbG9yXT1cInN2Zy5vdXRlckxpbmVhckdyYWRpZW50LmNvbG9yU3RvcDFcIiAgW2F0dHIuc3RvcC1vcGFjaXR5XT1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjk1JVwiIFthdHRyLnN0b3AtY29sb3JdPVwic3ZnLm91dGVyTGluZWFyR3JhZGllbnQuY29sb3JTdG9wMlwiIFthdHRyLnN0b3Atb3BhY2l0eV09XCIxXCIvPlxuICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgICAgICAgPHJhZGlhbEdyYWRpZW50ICpuZ0lmPVwib3B0aW9ucy5iYWNrZ3JvdW5kR3JhZGllbnRcIiBbYXR0ci5pZF09XCJzdmcucmFkaWFsR3JhZGllbnQuaWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNSVcIiBbYXR0ci5zdG9wLWNvbG9yXT1cInN2Zy5yYWRpYWxHcmFkaWVudC5jb2xvclN0b3AxXCIgW2F0dHIuc3RvcC1vcGFjaXR5XT1cIjFcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjk1JVwiIFthdHRyLnN0b3AtY29sb3JdPVwic3ZnLnJhZGlhbEdyYWRpZW50LmNvbG9yU3RvcDJcIiBbYXR0ci5zdG9wLW9wYWNpdHldPVwiMVwiLz5cbiAgICAgICAgICAgICAgICA8L3JhZGlhbEdyYWRpZW50PlxuICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wdGlvbnMuc2hvd0JhY2tncm91bmRcIj5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlICpuZ0lmPVwiIW9wdGlvbnMuYmFja2dyb3VuZEdyYWRpZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmN4XT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLmN4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmN5XT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLmN5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnJdPVwic3ZnLmJhY2tncm91bmRDaXJjbGUuclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5maWxsXT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLmZpbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZmlsbC1vcGFjaXR5XT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLmZpbGxPcGFjaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJzdmcuYmFja2dyb3VuZENpcmNsZS5zdHJva2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLnN0cm9rZVdpZHRoXCIvPlxuICAgICAgICAgICAgICAgIDxjaXJjbGUgKm5nSWY9XCJvcHRpb25zLmJhY2tncm91bmRHcmFkaWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5jeF09XCJzdmcuYmFja2dyb3VuZENpcmNsZS5jeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5jeV09XCJzdmcuYmFja2dyb3VuZENpcmNsZS5jeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5yXT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLnJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ci5maWxsPVwidXJsKCN7e3N2Zy5yYWRpYWxHcmFkaWVudC5pZH19KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5maWxsLW9wYWNpdHldPVwic3ZnLmJhY2tncm91bmRDaXJjbGUuZmlsbE9wYWNpdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cInN2Zy5iYWNrZ3JvdW5kQ2lyY2xlLnN0cm9rZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3ZnLmJhY2tncm91bmRDaXJjbGUuc3Ryb2tlV2lkdGhcIi8+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxjaXJjbGUgKm5nSWY9XCJvcHRpb25zLnNob3dJbm5lclN0cm9rZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmN4XT1cInN2Zy5jaXJjbGUuY3hcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5jeV09XCJzdmcuY2lyY2xlLmN5XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIucl09XCJzdmcuY2lyY2xlLnJcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5maWxsXT1cInN2Zy5jaXJjbGUuZmlsbFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJzdmcuY2lyY2xlLnN0cm9rZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdmcuY2lyY2xlLnN0cm9rZVdpZHRoXCIvPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIitvcHRpb25zLnBlcmNlbnQhPT0wIHx8IG9wdGlvbnMuc2hvd1plcm9PdXRlclN0cm9rZVwiPlxuICAgICAgICAgICAgICAgIDxwYXRoICpuZ0lmPVwiIW9wdGlvbnMub3V0ZXJTdHJva2VHcmFkaWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kXT1cInN2Zy5wYXRoLmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cInN2Zy5wYXRoLnN0cm9rZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3ZnLnBhdGguc3Ryb2tlV2lkdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuc3Ryb2tlLWxpbmVjYXBdPVwic3ZnLnBhdGguc3Ryb2tlTGluZWNhcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5maWxsXT1cInN2Zy5wYXRoLmZpbGxcIi8+XG4gICAgICAgICAgICAgICAgPHBhdGggKm5nSWY9XCJvcHRpb25zLm91dGVyU3Ryb2tlR3JhZGllbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZF09XCJzdmcucGF0aC5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIuc3Ryb2tlPVwidXJsKCN7e3N2Zy5vdXRlckxpbmVhckdyYWRpZW50LmlkfX0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdmcucGF0aC5zdHJva2VXaWR0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zdHJva2UtbGluZWNhcF09XCJzdmcucGF0aC5zdHJva2VMaW5lY2FwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpbGxdPVwic3ZnLnBhdGguZmlsbFwiLz5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHRleHQgKm5nSWY9XCIhb3B0aW9ucy5zaG93SW1hZ2UgJiYgKG9wdGlvbnMuc2hvd1RpdGxlIHx8IG9wdGlvbnMuc2hvd1VuaXRzIHx8IG9wdGlvbnMuc2hvd1N1YnRpdGxlKVwiXG4gICAgICAgICAgICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJiYXNlbGluZVwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci54XT1cInN2Zy5jaXJjbGUuY3hcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIueV09XCJzdmcuY2lyY2xlLmN5XCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInN2Zy50aXRsZS50ZXh0QW5jaG9yXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wdGlvbnMuc2hvd1RpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0c3BhbiAqbmdGb3I9XCJsZXQgdHNwYW4gb2Ygc3ZnLnRpdGxlLnRzcGFuc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci54XT1cInN2Zy50aXRsZS54XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnldPVwic3ZnLnRpdGxlLnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZHldPVwidHNwYW4uZHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZm9udC1zaXplXT1cInN2Zy50aXRsZS5mb250U2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5mb250LXdlaWdodF09XCJzdmcudGl0bGUuZm9udFdlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5maWxsXT1cInN2Zy50aXRsZS5jb2xvclwiPnt7dHNwYW4uc3Bhbn19PC90c3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8dHNwYW4gKm5nSWY9XCJvcHRpb25zLnNob3dVbml0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZvbnQtc2l6ZV09XCJzdmcudW5pdHMuZm9udFNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5mb250LXdlaWdodF09XCJzdmcudW5pdHMuZm9udFdlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpbGxdPVwic3ZnLnVuaXRzLmNvbG9yXCI+e3tzdmcudW5pdHMudGV4dH19PC90c3Bhbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwib3B0aW9ucy5zaG93U3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRzcGFuICpuZ0Zvcj1cImxldCB0c3BhbiBvZiBzdmcuc3VidGl0bGUudHNwYW5zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnhdPVwic3ZnLnN1YnRpdGxlLnhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIueV09XCJzdmcuc3VidGl0bGUueVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5keV09XCJ0c3Bhbi5keVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5mb250LXNpemVdPVwic3ZnLnN1YnRpdGxlLmZvbnRTaXplXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZvbnQtd2VpZ2h0XT1cInN2Zy5zdWJ0aXRsZS5mb250V2VpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmZpbGxdPVwic3ZnLnN1YnRpdGxlLmNvbG9yXCI+e3t0c3Bhbi5zcGFufX08L3RzcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgICAgPGltYWdlICpuZ0lmPVwib3B0aW9ucy5zaG93SW1hZ2VcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiIFxuICAgICAgICAgICAgICAgIFthdHRyLmhlaWdodF09XCJzdmcuaW1hZ2UuaGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbYXR0ci53aWR0aF09XCJzdmcuaW1hZ2Uud2lkdGhcIlxuICAgICAgICAgICAgICAgIFthdHRyLnhsaW5rOmhyZWZdPVwic3ZnLmltYWdlLnNyY1wiXG4gICAgICAgICAgICAgICAgW2F0dHIueF09XCJzdmcuaW1hZ2UueFwiXG4gICAgICAgICAgICAgICAgW2F0dHIueV09XCJzdmcuaW1hZ2UueVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICA8L3N2Zz5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIENpcmNsZVByb2dyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKSBiYWNrZ3JvdW5kR3JhZGllbnQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYmFja2dyb3VuZEdyYWRpZW50U3RvcENvbG9yOiBTdHJpbmc7XG4gICAgQElucHV0KCkgYmFja2dyb3VuZE9wYWNpdHk6IG51bWJlcjtcbiAgICBASW5wdXQoKSBiYWNrZ3JvdW5kU3Ryb2tlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYmFja2dyb3VuZFN0cm9rZVdpZHRoOiBudW1iZXI7XG4gICAgQElucHV0KCkgYmFja2dyb3VuZFBhZGRpbmc6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHJhZGl1czogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHNwYWNlOiBudW1iZXI7XG4gICAgQElucHV0KCkgcGVyY2VudDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHRvRml4ZWQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBtYXhQZXJjZW50OiBudW1iZXI7XG4gICAgQElucHV0KCkgcmVuZGVyT25DbGljazogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHVuaXRzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdW5pdHNGb250U2l6ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHVuaXRzRm9udFdlaWdodDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHVuaXRzQ29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG91dGVyU3Ryb2tlR3JhZGllbnQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgb3V0ZXJTdHJva2VXaWR0aDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG91dGVyU3Ryb2tlQ29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSBvdXRlclN0cm9rZUdyYWRpZW50U3RvcENvbG9yOiBTdHJpbmc7XG4gICAgQElucHV0KCkgb3V0ZXJTdHJva2VMaW5lY2FwOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbm5lclN0cm9rZUNvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaW5uZXJTdHJva2VXaWR0aDogc3RyaW5nIHwgbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdGl0bGVGb3JtYXQ6IEZ1bmN0aW9uO1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgfCBBcnJheTxTdHJpbmc+O1xuICAgIEBJbnB1dCgpIHRpdGxlQ29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSB0aXRsZUZvbnRTaXplOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdGl0bGVGb250V2VpZ2h0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdWJ0aXRsZUZvcm1hdDogRnVuY3Rpb247XG4gICAgQElucHV0KCkgc3VidGl0bGU6IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIHN1YnRpdGxlQ29sb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdWJ0aXRsZUZvbnRTaXplOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3VidGl0bGVGb250V2VpZ2h0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbWFnZVNyYzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGltYWdlSGVpZ2h0OiBudW1iZXI7XG4gICAgQElucHV0KCkgaW1hZ2VXaWR0aDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGFuaW1hdGVUaXRsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBhbmltYXRlU3VidGl0bGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHNob3dUaXRsZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93U3VidGl0bGU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc2hvd1VuaXRzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNob3dJbWFnZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93QmFja2dyb3VuZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93SW5uZXJTdHJva2U6IGJvb2xlYW47XG4gICAgQElucHV0KCkgY2xvY2t3aXNlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmU6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc3RhcnRGcm9tWmVybzogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzaG93WmVyb091dGVyU3Ryb2tlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgnb3B0aW9ucycpIHRlbXBsYXRlT3B0aW9uczogQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zO1xuXG4gICAgLy8gPHN2Zz4gb2YgY29tcG9uZW50XG4gICAgc3ZnRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICAgIC8vIHdoZXRoZXIgPHN2Zz4gaXMgaW4gdmlld3BvcnRcbiAgICBpc0luVmlld3BvcnQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyBldmVudCBmb3Igbm90aWZ5aW5nIHZpZXdwb3J0IGNoYW5nZSBjYXVzZWQgYnkgc2Nyb2xsaW5nIG9yIHJlc2l6aW5nXG4gICAgb25WaWV3cG9ydENoYW5nZWQ6IEV2ZW50RW1pdHRlcjx7IG9sZFZhbHVlOiBCb29sZWFuLCBuZXdWYWx1ZTogQm9vbGVhbiB9PiA9IG5ldyBFdmVudEVtaXR0ZXI7XG4gICAgd2luZG93OiBXaW5kb3c7XG4gICAgX3ZpZXdwb3J0Q2hhbmdlZFN1YnNjcmliZXI6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG5cbiAgICBzdmc6IGFueTtcblxuICAgIG9wdGlvbnM6IENpcmNsZVByb2dyZXNzT3B0aW9ucyA9IG5ldyBDaXJjbGVQcm9ncmVzc09wdGlvbnMoKTtcbiAgICBkZWZhdWx0T3B0aW9uczogQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zID0gbmV3IENpcmNsZVByb2dyZXNzT3B0aW9ucygpO1xuICAgIF9sYXN0UGVyY2VudDogbnVtYmVyID0gMDtcbiAgICBfZ3JhZGllbnRVVUlEOiBzdHJpbmcgPSBudWxsO1xuICAgIHJlbmRlciA9ICgpID0+IHtcblxuICAgICAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGF6eSkge1xuICAgICAgICAgICAgLy8gRHJhdyBzdmcgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgICAgICAgICAgdGhpcy5zdmdFbGVtZW50ID09PSBudWxsICYmIHRoaXMuZHJhdyh0aGlzLl9sYXN0UGVyY2VudCk7XG4gICAgICAgICAgICAvLyBEcmF3IGl0IG9ubHkgd2hlbiBpdCdzIGluIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJblZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgLy8gRHJhdyBpdCBhdCB0aGUgbGF0ZXN0IHBvc2l0aW9uIHdoZW4gSSBhbSBpbi5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbiAmJiB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLl9sYXN0UGVyY2VudCwgdGhpcy5vcHRpb25zLnBlcmNlbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyh0aGlzLm9wdGlvbnMucGVyY2VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RQZXJjZW50ID0gdGhpcy5vcHRpb25zLnBlcmNlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbiAmJiB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMuX2xhc3RQZXJjZW50LCB0aGlzLm9wdGlvbnMucGVyY2VudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhdyh0aGlzLm9wdGlvbnMucGVyY2VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sYXN0UGVyY2VudCA9IHRoaXMub3B0aW9ucy5wZXJjZW50O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwb2xhclRvQ2FydGVzaWFuID0gKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgYW5nbGVJbkRlZ3JlZXM6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgYW5nbGVJblJhZGl1cyA9IGFuZ2xlSW5EZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgbGV0IHggPSBjZW50ZXJYICsgTWF0aC5zaW4oYW5nbGVJblJhZGl1cykgKiByYWRpdXM7XG4gICAgICAgIGxldCB5ID0gY2VudGVyWSAtIE1hdGguY29zKGFuZ2xlSW5SYWRpdXMpICogcmFkaXVzO1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG4gICAgfTtcbiAgICBkcmF3ID0gKHBlcmNlbnQ6IG51bWJlcikgPT4ge1xuICAgICAgICAvLyBtYWtlIHBlcmNlbnQgcmVhc29uYWJsZVxuICAgICAgICBwZXJjZW50ID0gKHBlcmNlbnQgPT09IHVuZGVmaW5lZCkgPyB0aGlzLm9wdGlvbnMucGVyY2VudCA6IE1hdGguYWJzKHBlcmNlbnQpO1xuICAgICAgICAvLyBjaXJjbGUgcGVyY2VudCBzaG91bGRuJ3QgYmUgZ3JlYXRlciB0aGFuIDEwMCUuXG4gICAgICAgIGxldCBjaXJjbGVQZXJjZW50ID0gKHBlcmNlbnQgPiAxMDApID8gMTAwIDogcGVyY2VudDtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGJveCBzaXplXG4gICAgICAgIGxldCBib3hTaXplID0gdGhpcy5vcHRpb25zLnJhZGl1cyAqIDIgKyB0aGlzLm9wdGlvbnMub3V0ZXJTdHJva2VXaWR0aCAqIDI7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd0JhY2tncm91bmQpIHtcbiAgICAgICAgICAgIGJveFNpemUgKz0gKHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kU3Ryb2tlV2lkdGggKiAyICsgdGhpcy5tYXgoMCwgdGhpcy5vcHRpb25zLmJhY2tncm91bmRQYWRkaW5nICogMikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZSBjZW50cmUgb2YgdGhlIGNpcmNsZVxuICAgICAgICBsZXQgY2VudHJlID0geyB4OiBib3hTaXplIC8gMiwgeTogYm94U2l6ZSAvIDIgfTtcbiAgICAgICAgLy8gdGhlIHN0YXJ0IHBvaW50IG9mIHRoZSBhcmNcbiAgICAgICAgbGV0IHN0YXJ0UG9pbnQgPSB7IHg6IGNlbnRyZS54LCB5OiBjZW50cmUueSAtIHRoaXMub3B0aW9ucy5yYWRpdXMgfTtcbiAgICAgICAgLy8gZ2V0IHRoZSBlbmQgcG9pbnQgb2YgdGhlIGFyY1xuICAgICAgICBsZXQgZW5kUG9pbnQgPSB0aGlzLnBvbGFyVG9DYXJ0ZXNpYW4oY2VudHJlLngsIGNlbnRyZS55LCB0aGlzLm9wdGlvbnMucmFkaXVzLCAzNjAgKiAodGhpcy5vcHRpb25zLmNsb2Nrd2lzZSA/XG4gICAgICAgICAgICBjaXJjbGVQZXJjZW50IDpcbiAgICAgICAgICAgICgxMDAgLSBjaXJjbGVQZXJjZW50KSkgLyAxMDApOyAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAgICAgLy8gV2UnbGwgZ2V0IGFuIGVuZCBwb2ludCB3aXRoIHRoZSBzYW1lIFt4LCB5XSBhcyB0aGUgc3RhcnQgcG9pbnQgd2hlbiBwZXJjZW50IGlzIDEwMCUsIHNvIG1vdmUgeCBhIGxpdHRsZSBiaXQuXG4gICAgICAgIGlmIChjaXJjbGVQZXJjZW50ID09PSAxMDApIHtcbiAgICAgICAgICAgIGVuZFBvaW50LnggPSBlbmRQb2ludC54ICsgKHRoaXMub3B0aW9ucy5jbG9ja3dpc2UgPyAtMC4wMSA6ICswLjAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsYXJnZUFyY0ZsYWcgYW5kIHN3ZWVwRmxhZ1xuICAgICAgICBsZXQgbGFyZ2VBcmNGbGFnOiBhbnksIHN3ZWVwRmxhZzogYW55O1xuICAgICAgICBpZiAoY2lyY2xlUGVyY2VudCA+IDUwKSB7XG4gICAgICAgICAgICBbbGFyZ2VBcmNGbGFnLCBzd2VlcEZsYWddID0gdGhpcy5vcHRpb25zLmNsb2Nrd2lzZSA/IFsxLCAxXSA6IFsxLCAwXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFtsYXJnZUFyY0ZsYWcsIHN3ZWVwRmxhZ10gPSB0aGlzLm9wdGlvbnMuY2xvY2t3aXNlID8gWzAsIDFdIDogWzAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIC8vIHBlcmNlbnQgbWF5IG5vdCBlcXVhbCB0aGUgYWN0dWFsIHBlcmNlbnRcbiAgICAgICAgbGV0IHRpdGxlUGVyY2VudCA9IHRoaXMub3B0aW9ucy5hbmltYXRlVGl0bGUgPyBwZXJjZW50IDogdGhpcy5vcHRpb25zLnBlcmNlbnQ7XG4gICAgICAgIGxldCB0aXRsZVRleHRQZXJjZW50ID0gdGl0bGVQZXJjZW50ID4gdGhpcy5vcHRpb25zLm1heFBlcmNlbnQgP1xuICAgICAgICAgICAgYCR7dGhpcy5vcHRpb25zLm1heFBlcmNlbnQudG9GaXhlZCh0aGlzLm9wdGlvbnMudG9GaXhlZCl9K2AgOiB0aXRsZVBlcmNlbnQudG9GaXhlZCh0aGlzLm9wdGlvbnMudG9GaXhlZCk7XG4gICAgICAgIGxldCBzdWJ0aXRsZVBlcmNlbnQgPSB0aGlzLm9wdGlvbnMuYW5pbWF0ZVN1YnRpdGxlID8gcGVyY2VudCA6IHRoaXMub3B0aW9ucy5wZXJjZW50O1xuICAgICAgICAvLyBnZXQgdGl0bGUgb2JqZWN0XG4gICAgICAgIGxldCB0aXRsZSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRyZS54LFxuICAgICAgICAgICAgeTogY2VudHJlLnksXG4gICAgICAgICAgICB0ZXh0QW5jaG9yOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLm9wdGlvbnMudGl0bGVDb2xvcixcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGlzLm9wdGlvbnMudGl0bGVGb250U2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHRoaXMub3B0aW9ucy50aXRsZUZvbnRXZWlnaHQsXG4gICAgICAgICAgICB0ZXh0czogW10sXG4gICAgICAgICAgICB0c3BhbnM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIC8vIGZyb20gdjAuOS45LCBib3RoIHRpdGxlIGFuZCB0aXRsZUZvcm1hdCguLi4pIG1heSBiZSBhbiBhcnJheSBvZiBzdHJpbmcuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGl0bGVGb3JtYXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMudGl0bGVGb3JtYXQuY29uc3RydWN0b3IubmFtZSA9PT0gJ0Z1bmN0aW9uJykge1xuICAgICAgICAgICAgbGV0IGZvcm1hdHRlZCA9IHRoaXMub3B0aW9ucy50aXRsZUZvcm1hdCh0aXRsZVBlcmNlbnQpO1xuICAgICAgICAgICAgaWYgKGZvcm1hdHRlZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGl0bGUudGV4dHMgPSBbLi4uZm9ybWF0dGVkXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGl0bGUudGV4dHMucHVzaChmb3JtYXR0ZWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0cy5wdXNoKHRpdGxlVGV4dFBlcmNlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUudGV4dHMgPSBbLi4udGhpcy5vcHRpb25zLnRpdGxlXVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnRleHRzLnB1c2godGhpcy5vcHRpb25zLnRpdGxlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBnZXQgc3VidGl0bGUgb2JqZWN0XG4gICAgICAgIGxldCBzdWJ0aXRsZSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRyZS54LFxuICAgICAgICAgICAgeTogY2VudHJlLnksXG4gICAgICAgICAgICB0ZXh0QW5jaG9yOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLm9wdGlvbnMuc3VidGl0bGVDb2xvcixcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGlzLm9wdGlvbnMuc3VidGl0bGVGb250U2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHRoaXMub3B0aW9ucy5zdWJ0aXRsZUZvbnRXZWlnaHQsXG4gICAgICAgICAgICB0ZXh0czogW10sXG4gICAgICAgICAgICB0c3BhbnM6IFtdXG4gICAgICAgIH1cbiAgICAgICAgLy8gZnJvbSB2MC45LjksIGJvdGggc3VidGl0bGUgYW5kIHN1YnRpdGxlRm9ybWF0KC4uLikgbWF5IGJlIGFuIGFycmF5IG9mIHN0cmluZy5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdWJ0aXRsZUZvcm1hdCAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9ucy5zdWJ0aXRsZUZvcm1hdC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnRnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBsZXQgZm9ybWF0dGVkID0gdGhpcy5vcHRpb25zLnN1YnRpdGxlRm9ybWF0KHN1YnRpdGxlUGVyY2VudCk7XG4gICAgICAgICAgICBpZiAoZm9ybWF0dGVkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZS50ZXh0cyA9IFsuLi5mb3JtYXR0ZWRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZS50ZXh0cy5wdXNoKGZvcm1hdHRlZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3VidGl0bGUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLnRleHRzID0gWy4uLnRoaXMub3B0aW9ucy5zdWJ0aXRsZV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VidGl0bGUudGV4dHMucHVzaCh0aGlzLm9wdGlvbnMuc3VidGl0bGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2V0IHVuaXRzIG9iamVjdFxuICAgICAgICBsZXQgdW5pdHMgPSB7XG4gICAgICAgICAgICB0ZXh0OiBgJHt0aGlzLm9wdGlvbnMudW5pdHN9YCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGlzLm9wdGlvbnMudW5pdHNGb250U2l6ZSxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHRoaXMub3B0aW9ucy51bml0c0ZvbnRXZWlnaHQsXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5vcHRpb25zLnVuaXRzQ29sb3JcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZ2V0IHRvdGFsIGNvdW50IG9mIHRleHQgbGluZXMgdG8gYmUgc2hvd25cbiAgICAgICAgbGV0IHJvd0NvdW50ID0gMCwgcm93TnVtID0gMTtcbiAgICAgICAgdGhpcy5vcHRpb25zLnNob3dUaXRsZSAmJiAocm93Q291bnQgKz0gdGl0bGUudGV4dHMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLnNob3dTdWJ0aXRsZSAmJiAocm93Q291bnQgKz0gc3VidGl0bGUudGV4dHMubGVuZ3RoKTtcbiAgICAgICAgLy8gY2FsYyBkeSBmb3IgZWFjaCB0c3BhbiBmb3IgdGl0bGVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93VGl0bGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHNwYW4gb2YgdGl0bGUudGV4dHMpIHtcbiAgICAgICAgICAgICAgICB0aXRsZS50c3BhbnMucHVzaCh7IHNwYW46IHNwYW4sIGR5OiB0aGlzLmdldFJlbGF0aXZlWShyb3dOdW0sIHJvd0NvdW50KSB9KTtcbiAgICAgICAgICAgICAgICByb3dOdW0rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxjIGR5IGZvciBlYWNoIHRzcGFuIGZvciBzdWJ0aXRsZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dTdWJ0aXRsZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBzdWJ0aXRsZS50ZXh0cykge1xuICAgICAgICAgICAgICAgIHN1YnRpdGxlLnRzcGFucy5wdXNoKHsgc3Bhbjogc3BhbiwgZHk6IHRoaXMuZ2V0UmVsYXRpdmVZKHJvd051bSwgcm93Q291bnQpIH0pXG4gICAgICAgICAgICAgICAgcm93TnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY3JlYXRlIElEIGZvciBncmFkaWVudCBlbGVtZW50XG4gICAgICAgIGlmIChudWxsID09PSB0aGlzLl9ncmFkaWVudFVVSUQpIHtcbiAgICAgICAgICAgIHRoaXMuX2dyYWRpZW50VVVJRCA9IHRoaXMudXVpZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJyaW5nIGl0IGFsbCB0b2dldGhlclxuICAgICAgICB0aGlzLnN2ZyA9IHtcbiAgICAgICAgICAgIHZpZXdCb3g6IGAwIDAgJHtib3hTaXplfSAke2JveFNpemV9YCxcbiAgICAgICAgICAgIC8vIFNldCBib3RoIHdpZHRoIGFuZCBoZWlnaHQgdG8gJzEwMCUnIGlmIGl0J3MgcmVzcG9uc2l2ZVxuICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy5yZXNwb25zaXZlID8gJzEwMCUnIDogYm94U2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLnJlc3BvbnNpdmUgPyAnMTAwJScgOiBib3hTaXplLFxuICAgICAgICAgICAgYmFja2dyb3VuZENpcmNsZToge1xuICAgICAgICAgICAgICAgIGN4OiBjZW50cmUueCxcbiAgICAgICAgICAgICAgICBjeTogY2VudHJlLnksXG4gICAgICAgICAgICAgICAgcjogdGhpcy5vcHRpb25zLnJhZGl1cyArIHRoaXMub3B0aW9ucy5vdXRlclN0cm9rZVdpZHRoIC8gMiArIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kUGFkZGluZyxcbiAgICAgICAgICAgICAgICBmaWxsOiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5OiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZE9wYWNpdHksXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZFN0cm9rZSxcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogdGhpcy5vcHRpb25zLmJhY2tncm91bmRTdHJva2VXaWR0aCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoOiB7XG4gICAgICAgICAgICAgICAgLy8gQSByeCByeSB4LWF4aXMtcm90YXRpb24gbGFyZ2UtYXJjLWZsYWcgc3dlZXAtZmxhZyB4IHkgKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL1NWRy9UdXRvcmlhbC9QYXRocyNBcmNzKVxuICAgICAgICAgICAgICAgIGQ6IGBNICR7c3RhcnRQb2ludC54fSAke3N0YXJ0UG9pbnQueX1cbiAgICAgICAgQSAke3RoaXMub3B0aW9ucy5yYWRpdXN9ICR7dGhpcy5vcHRpb25zLnJhZGl1c30gMCAke2xhcmdlQXJjRmxhZ30gJHtzd2VlcEZsYWd9ICR7ZW5kUG9pbnQueH0gJHtlbmRQb2ludC55fWAsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiB0aGlzLm9wdGlvbnMub3V0ZXJTdHJva2VDb2xvcixcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogdGhpcy5vcHRpb25zLm91dGVyU3Ryb2tlV2lkdGgsXG4gICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcDogdGhpcy5vcHRpb25zLm91dGVyU3Ryb2tlTGluZWNhcCxcbiAgICAgICAgICAgICAgICBmaWxsOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaXJjbGU6IHtcbiAgICAgICAgICAgICAgICBjeDogY2VudHJlLngsXG4gICAgICAgICAgICAgICAgY3k6IGNlbnRyZS55LFxuICAgICAgICAgICAgICAgIHI6IHRoaXMub3B0aW9ucy5yYWRpdXMgLSB0aGlzLm9wdGlvbnMuc3BhY2UgLSB0aGlzLm9wdGlvbnMub3V0ZXJTdHJva2VXaWR0aCAvIDIgLSB0aGlzLm9wdGlvbnMuaW5uZXJTdHJva2VXaWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogdGhpcy5vcHRpb25zLmlubmVyU3Ryb2tlQ29sb3IsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IHRoaXMub3B0aW9ucy5pbm5lclN0cm9rZVdpZHRoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIHVuaXRzOiB1bml0cyxcbiAgICAgICAgICAgIHN1YnRpdGxlOiBzdWJ0aXRsZSxcbiAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgeDogY2VudHJlLnggLSB0aGlzLm9wdGlvbnMuaW1hZ2VXaWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgeTogY2VudHJlLnkgLSB0aGlzLm9wdGlvbnMuaW1hZ2VIZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIHNyYzogdGhpcy5vcHRpb25zLmltYWdlU3JjLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9wdGlvbnMuaW1hZ2VXaWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMub3B0aW9ucy5pbWFnZUhlaWdodCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRlckxpbmVhckdyYWRpZW50OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdvdXRlci1saW5lYXItJyArIHRoaXMuX2dyYWRpZW50VVVJRCxcbiAgICAgICAgICAgICAgICBjb2xvclN0b3AxOiB0aGlzLm9wdGlvbnMub3V0ZXJTdHJva2VDb2xvcixcbiAgICAgICAgICAgICAgICBjb2xvclN0b3AyOiB0aGlzLm9wdGlvbnMub3V0ZXJTdHJva2VHcmFkaWVudFN0b3BDb2xvciA9PT0gJ3RyYW5zcGFyZW50JyA/ICcjRkZGJyA6IHRoaXMub3B0aW9ucy5vdXRlclN0cm9rZUdyYWRpZW50U3RvcENvbG9yLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhZGlhbEdyYWRpZW50OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdyYWRpYWwtJyArIHRoaXMuX2dyYWRpZW50VVVJRCxcbiAgICAgICAgICAgICAgICBjb2xvclN0b3AxOiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgICAgIGNvbG9yU3RvcDI6IHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kR3JhZGllbnRTdG9wQ29sb3IgPT09ICd0cmFuc3BhcmVudCcgPyAnI0ZGRicgOiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZEdyYWRpZW50U3RvcENvbG9yLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgZ2V0QW5pbWF0aW9uUGFyYW1ldGVycyA9IChwcmV2aW91c1BlcmNlbnQ6IG51bWJlciwgY3VycmVudFBlcmNlbnQ6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBNSU5fSU5URVJWQUwgPSAxMDtcbiAgICAgICAgbGV0IHRpbWVzOiBudW1iZXIsIHN0ZXA6IG51bWJlciwgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICAgICAgbGV0IGZyb21QZXJjZW50ID0gdGhpcy5vcHRpb25zLnN0YXJ0RnJvbVplcm8gPyAwIDogKHByZXZpb3VzUGVyY2VudCA8IDAgPyAwIDogcHJldmlvdXNQZXJjZW50KTtcbiAgICAgICAgbGV0IHRvUGVyY2VudCA9IGN1cnJlbnRQZXJjZW50IDwgMCA/IDAgOiB0aGlzLm1pbihjdXJyZW50UGVyY2VudCwgdGhpcy5vcHRpb25zLm1heFBlcmNlbnQpO1xuICAgICAgICBsZXQgZGVsdGEgPSBNYXRoLmFicyhNYXRoLnJvdW5kKHRvUGVyY2VudCAtIGZyb21QZXJjZW50KSk7XG5cbiAgICAgICAgaWYgKGRlbHRhID49IDEwMCkge1xuICAgICAgICAgICAgLy8gd2Ugd2lsbCBmaW5pc2ggYW5pbWF0aW9uIGluIDEwMCB0aW1lc1xuICAgICAgICAgICAgdGltZXMgPSAxMDA7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbmltYXRlVGl0bGUgJiYgIXRoaXMub3B0aW9ucy5hbmltYXRlU3VidGl0bGUpIHtcbiAgICAgICAgICAgICAgICBzdGVwID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc2hvdyB0aXRsZSBvciBzdWJ0aXRsZSBhbmltYXRpb24gZXZlbiBpZiB0aGUgYXJjIGlzIGZ1bGwsIHdlIGFsc28gbmVlZCB0byBmaW5pc2ggaXQgaW4gMTAwIHRpbWVzLlxuICAgICAgICAgICAgICAgIHN0ZXAgPSBNYXRoLnJvdW5kKGRlbHRhIC8gdGltZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2Ugd2lsbCBmaW5pc2ggaW4gYXMgbWFueSB0aW1lcyBhcyB0aGUgbnVtYmVyIG9mIHBlcmNlbnQuXG4gICAgICAgICAgICB0aW1lcyA9IGRlbHRhO1xuICAgICAgICAgICAgc3RlcCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IHRoZSBpbnRlcnZhbCBvZiB0aW1lclxuICAgICAgICBpbnRlcnZhbCA9IE1hdGgucm91bmQodGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uIC8gdGltZXMpO1xuICAgICAgICAvLyBSZWFkanVzdCBhbGwgdmFsdWVzIGlmIHRoZSBpbnRlcnZhbCBvZiB0aW1lciBpcyBleHRyZW1lbHkgc21hbGwuXG4gICAgICAgIGlmIChpbnRlcnZhbCA8IE1JTl9JTlRFUlZBTCkge1xuICAgICAgICAgICAgaW50ZXJ2YWwgPSBNSU5fSU5URVJWQUw7XG4gICAgICAgICAgICB0aW1lcyA9IHRoaXMub3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbiAvIGludGVydmFsO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYW5pbWF0ZVRpdGxlICYmICF0aGlzLm9wdGlvbnMuYW5pbWF0ZVN1YnRpdGxlICYmIGRlbHRhID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgc3RlcCA9IE1hdGgucm91bmQoMTAwIC8gdGltZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGVwID0gTWF0aC5yb3VuZChkZWx0YSAvIHRpbWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdGVwIG11c3QgYmUgZ3JlYXRlciB0aGFuIDAuXG4gICAgICAgIGlmIChzdGVwIDwgMSkge1xuICAgICAgICAgICAgc3RlcCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdGltZXM6IHRpbWVzLCBzdGVwOiBzdGVwLCBpbnRlcnZhbDogaW50ZXJ2YWwgfTtcbiAgICB9O1xuICAgIGFuaW1hdGUgPSAocHJldmlvdXNQZXJjZW50OiBudW1iZXIsIGN1cnJlbnRQZXJjZW50OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyU3Vic2NyaXB0aW9uICYmICF0aGlzLl90aW1lclN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZyb21QZXJjZW50ID0gdGhpcy5vcHRpb25zLnN0YXJ0RnJvbVplcm8gPyAwIDogcHJldmlvdXNQZXJjZW50O1xuICAgICAgICBsZXQgdG9QZXJjZW50ID0gY3VycmVudFBlcmNlbnQ7XG4gICAgICAgIGxldCB7IHN0ZXA6IHN0ZXAsIGludGVydmFsOiBpbnRlcnZhbCB9ID0gdGhpcy5nZXRBbmltYXRpb25QYXJhbWV0ZXJzKGZyb21QZXJjZW50LCB0b1BlcmNlbnQpO1xuICAgICAgICBsZXQgY291bnQgPSBmcm9tUGVyY2VudDtcbiAgICAgICAgaWYgKGZyb21QZXJjZW50IDwgdG9QZXJjZW50KSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lclN1YnNjcmlwdGlvbiA9IHRpbWVyKDAsIGludGVydmFsKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50ICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50IDw9IHRvUGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbmltYXRlVGl0bGUgJiYgIXRoaXMub3B0aW9ucy5hbmltYXRlU3VidGl0bGUgJiYgY291bnQgPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcodG9QZXJjZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KHRvUGVyY2VudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lclN1YnNjcmlwdGlvbiA9IHRpbWVyKDAsIGludGVydmFsKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50IC09IHN0ZXA7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IHRvUGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbmltYXRlVGl0bGUgJiYgIXRoaXMub3B0aW9ucy5hbmltYXRlU3VidGl0bGUgJiYgdG9QZXJjZW50ID49IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KHRvUGVyY2VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyh0b1BlcmNlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBlbWl0Q2xpY2tFdmVudCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVuZGVyT25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlKDAsIHRoaXMub3B0aW9ucy5wZXJjZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XG4gICAgfTtcbiAgICBwcml2YXRlIF90aW1lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgYXBwbHlPcHRpb25zID0gKCkgPT4ge1xuICAgICAgICAvLyB0aGUgb3B0aW9ucyBvZiA8Y2lyY2xlLXByb2dyZXNzPiBtYXkgY2hhbmdlIGFscmVhZHlcbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB0aGlzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbbmFtZV0gPSB0aGlzW25hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRlbXBsYXRlT3B0aW9ucyAmJiB0aGlzLnRlbXBsYXRlT3B0aW9uc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW25hbWVdID0gdGhpcy50ZW1wbGF0ZU9wdGlvbnNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWFrZSBzdXJlIGtleSBvcHRpb25zIHZhbGlkXG4gICAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMgPSBNYXRoLmFicygrdGhpcy5vcHRpb25zLnJhZGl1cyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zcGFjZSA9ICt0aGlzLm9wdGlvbnMuc3BhY2U7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wZXJjZW50ID0gK3RoaXMub3B0aW9ucy5wZXJjZW50ID4gMCA/ICt0aGlzLm9wdGlvbnMucGVyY2VudCA6IDA7XG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXhQZXJjZW50ID0gTWF0aC5hYnMoK3RoaXMub3B0aW9ucy5tYXhQZXJjZW50KTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uID0gTWF0aC5hYnModGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLm91dGVyU3Ryb2tlV2lkdGggPSBNYXRoLmFicygrdGhpcy5vcHRpb25zLm91dGVyU3Ryb2tlV2lkdGgpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuaW5uZXJTdHJva2VXaWR0aCA9IE1hdGguYWJzKCt0aGlzLm9wdGlvbnMuaW5uZXJTdHJva2VXaWR0aCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kUGFkZGluZyA9ICt0aGlzLm9wdGlvbnMuYmFja2dyb3VuZFBhZGRpbmc7XG4gICAgfTtcbiAgICBwcml2YXRlIGdldFJlbGF0aXZlWSA9IChyb3dOdW06IG51bWJlciwgcm93Q291bnQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgIC8vIHdoeSAnLTAuMThlbSc/IEl0J3MgYSBtYWdpYyBudW1iZXIgd2hlbiBwcm9wZXJ0eSAnYWxpZ25tZW50LWJhc2VsaW5lJyBlcXVhbHMgJ2Jhc2VsaW5lJy4gOilcbiAgICAgICAgbGV0IGluaXRpYWxPZmZzZXQgPSAtMC4xOCwgb2Zmc2V0ID0gMTtcbiAgICAgICAgcmV0dXJuIChpbml0aWFsT2Zmc2V0ICsgb2Zmc2V0ICogKHJvd051bSAtIHJvd0NvdW50IC8gMikpLnRvRml4ZWQoMikgKyAnZW0nO1xuICAgIH07XG5cbiAgICBwcml2YXRlIG1pbiA9IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyBhIDogYjtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBtYXggPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIGEgPiBiID8gYSA6IGI7XG4gICAgfTtcblxuICAgIHByaXZhdGUgdXVpZCA9ICgpID0+IHtcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cudzNyZXNvdXJjZS5jb20vamF2YXNjcmlwdC1leGVyY2lzZXMvamF2YXNjcmlwdC1tYXRoLWV4ZXJjaXNlLTIzLnBocFxuICAgICAgICB2YXIgZHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIHV1aWQgPSAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICB2YXIgciA9IChkdCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XG4gICAgICAgICAgICBkdCA9IE1hdGguZmxvb3IoZHQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRHJhd2luZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl90aW1lclN1YnNjcmlwdGlvbiAmJiAhdGhpcy5fdGltZXJTdWJzY3JpcHRpb24uY2xvc2VkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZFN2Z0VsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN2Z0VsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCB0YWdzID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmcnKTtcbiAgICAgICAgICAgIGlmICh0YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z0VsZW1lbnQgPSB0YWdzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0VsZW1lbnRJblZpZXdwb3J0KGVsKTogQm9vbGVhbiB7XG4gICAgICAgIC8vIFJldHVybiBmYWxzZSBpZiBlbCBoYXMgbm90IGJlZW4gY3JlYXRlZCBpbiBwYWdlLlxuICAgICAgICBpZiAoZWwgPT09IG51bGwgfHwgZWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZWxlbWVudCBpcyBvdXQgb2YgdmlldyBkdWUgdG8gYSBjb250YWluZXIgc2Nyb2xsaW5nXG4gICAgICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHBhcmVudCA9IGVsLnBhcmVudE5vZGUsIHBhcmVudFJlY3Q7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHBhcmVudFJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAocmVjdC50b3AgPj0gcGFyZW50UmVjdC5ib3R0b20pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyZWN0LmJvdHRvbSA8PSBwYXJlbnRSZWN0LnRvcCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHJlY3QubGVmdCA+PSBwYXJlbnRSZWN0LnJpZ2h0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAocmVjdC5yaWdodCA8PSBwYXJlbnRSZWN0LmxlZnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9IHdoaWxlIChwYXJlbnQgIT0gdGhpcy5kb2N1bWVudC5ib2R5KTtcbiAgICAgICAgLy8gQ2hlY2sgaXRzIHdpdGhpbiB0aGUgZG9jdW1lbnQgdmlld3BvcnRcbiAgICAgICAgaWYgKHJlY3QudG9wID49ICh0aGlzLndpbmRvdy5pbm5lckhlaWdodCB8fCB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChyZWN0LmJvdHRvbSA8PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChyZWN0LmxlZnQgPj0gKHRoaXMud2luZG93LmlubmVyV2lkdGggfHwgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChyZWN0LnJpZ2h0IDw9IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY2hlY2tWaWV3cG9ydCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5maW5kU3ZnRWxlbWVudCgpO1xuICAgICAgICBsZXQgcHJldmlvdXNWYWx1ZSA9IHRoaXMuaXNJblZpZXdwb3J0O1xuICAgICAgICB0aGlzLmlzSW5WaWV3cG9ydCA9IHRoaXMuaXNFbGVtZW50SW5WaWV3cG9ydCh0aGlzLnN2Z0VsZW1lbnQpO1xuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSAhPT0gdGhpcy5pc0luVmlld3BvcnQpIHtcbiAgICAgICAgICAgIHRoaXMub25WaWV3cG9ydENoYW5nZWQuZW1pdCh7IG9sZFZhbHVlOiBwcmV2aW91c1ZhbHVlLCBuZXdWYWx1ZTogdGhpcy5pc0luVmlld3BvcnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNjcm9sbCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja1ZpZXdwb3J0KCk7XG4gICAgfVxuXG4gICAgbG9hZEV2ZW50c0ZvckxhenlNb2RlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWV3cG9ydENoYW5nZWRTdWJzY3JpYmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld3BvcnRDaGFuZ2VkU3Vic2NyaWJlciA9IHRoaXMub25WaWV3cG9ydENoYW5nZWQuc3Vic2NyaWJlKCh7IG9sZFZhbHVlLCBuZXdWYWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID8gdGhpcy5yZW5kZXIoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdmdFbGVtZW50IG11c3QgYmUgY3JlYXRlZCBpbiBET00gYmVmb3JlIGJlaW5nIGNoZWNrZWQuXG4gICAgICAgICAgICAvLyBJcyB0aGVyZSBhIGJldHRlciB3YXkgdG8gY2hlY2sgdGhlIGV4aXN0ZW5jZSBvZiBzdmdFbGVtbnQ/XG4gICAgICAgICAgICBsZXQgX3RpbWVyID0gdGltZXIoMCwgNTApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdmdFbGVtZW50ID09PSBudWxsID8gdGhpcy5jaGVja1ZpZXdwb3J0KCkgOiBfdGltZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvYWRFdmVudHNGb3JMYXp5TW9kZSA9ICgpID0+IHtcbiAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICAgICAgICB0aGlzLndpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgb25WaWV3cG9ydENoYW5nZWRcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdwb3J0Q2hhbmdlZFN1YnNjcmliZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdwb3J0Q2hhbmdlZFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdwb3J0Q2hhbmdlZFN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZEV2ZW50c0ZvckxhenlNb2RlKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5sb2FkRXZlbnRzRm9yTGF6eU1vZGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICBpZiAoJ2xhenknIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGNoYW5nZXMubGF6eS5jdXJyZW50VmFsdWUgPyB0aGlzLmxvYWRFdmVudHNGb3JMYXp5TW9kZSgpIDogdGhpcy51bmxvYWRFdmVudHNGb3JMYXp5TW9kZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0T3B0aW9uczogQ2lyY2xlUHJvZ3Jlc3NPcHRpb25zLCBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICB0aGlzLndpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0T3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgIH1cblxufVxuIl19