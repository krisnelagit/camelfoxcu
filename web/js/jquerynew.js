$(function(a, b) {
        function c(a) {
            return K.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }

        function d(a) {
            if (!cl[a]) {
                var b = H.body,
                    c = K("<" + a + ">").appendTo(b),
                    d = c.css("display");
                c.remove();
                if (d === "none" || d === "") {
                    cm || (cm = H.createElement("iframe"), cm.frameBorder = cm.width = cm.height = 0), b.appendChild(cm);
                    if (!cn || !cm.createElement) cn = (cm.contentWindow || cm.contentDocument).document, cn.write((H.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cn.close();
                    c = cn.createElement(a), cn.body.appendChild(c), d = K.css(c, "display"), b.removeChild(cm)
                }
                cl[a] = d
            }
            return cl[a]
        }

        function e(a, b) {
            var c = {};
            return K.each(cr.concat.apply([], cr.slice(0, b)), function() {
                c[this] = a
            }), c
        }

        function f() {
            cs = b
        }

        function g() {
            return setTimeout(f, 0), cs = K.now()
        }

        function h() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {}
        }

        function i() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {}
        }

        function j(a, c) {
            a.dataFilter && (c = a.dataFilter(c, a.dataType));
            var d = a.dataTypes,
                e = {},
                f, g, h = d.length,
                i, j = d[0],
                k, l, m, n, o;
            for (f = 1; f < h; f++) {
                if (f === 1)
                    for (g in a.converters) typeof g == "string" && (e[g.toLowerCase()] = a.converters[g]);
                k = j, j = d[f];
                if (j === "*") j = k;
                else if (k !== "*" && k !== j) {
                    l = k + " " + j, m = e[l] || e["* " + j];
                    if (!m) {
                        o = b;
                        for (n in e) {
                            i = n.split(" ");
                            if (i[0] === k || i[0] === "*") {
                                o = e[i[1] + " " + j];
                                if (o) {
                                    n = e[n], n === !0 ? m = o : o === !0 && (m = n);
                                    break
                                }
                            }
                        }
                    }!m && !o && K.error("No conversion from " + l.replace(" ", " to ")), m !== !0 && (c = m ? m(c) : o(n(c)))
                }
            }
            return c
        }

        function k(a, c, d) {
            var e = a.contents,
                f = a.dataTypes,
                g = a.responseFields,
                h, i, j, k;
            for (i in g) i in d && (c[g[i]] = d[i]);
            while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
            if (h)
                for (i in e)
                    if (e[i] && e[i].test(h)) {
                        f.unshift(i);
                        break
                    }
            if (f[0] in d) j = f[0];
            else {
                for (i in d) {
                    if (!f[0] || a.converters[i + " " + f[0]]) {
                        j = i;
                        break
                    }
                    k || (k = i)
                }
                j = j || k
            }
            if (j) return j !== f[0] && f.unshift(j), d[j]
        }

        function l(a, b, c, d) {
            if (K.isArray(b)) K.each(b, function(b, e) {
                c || bN.test(a) ? d(a, e) : l(a + "[" + (typeof e == "object" || K.isArray(e) ? b : "") + "]", e, c, d)
            });
            else if (!c && b != null && typeof b == "object")
                for (var e in b) l(a + "[" + e + "]", b[e], c, d);
            else d(a, b)
        }

        function m(a, c) {
            var d, e, f = K.ajaxSettings.flatOptions || {};
            for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
            e && K.extend(!0, a, e)
        }

        function n(a, c, d, e, f, g) {
            f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
            var h = a[f],
                i = 0,
                j = h ? h.length : 0,
                k = a === ca,
                l;
            for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = n(a, c, d, e, l, g)));
            return (k || !l) && !g["*"] && (l = n(a, c, d, e, "*", g)), l
        }

        function o(a) {
            return function(b, c) {
                typeof b != "string" && (c = b, b = "*");
                if (K.isFunction(c)) {
                    var d = b.toLowerCase().split(bY),
                        e = 0,
                        f = d.length,
                        g, h, i;
                    for (; e < f; e++) g = d[e], i = /^\+/.test(g), i && (g = g.substr(1) || "*"), h = a[g] = a[g] || [], h[i ? "unshift" : "push"](c)
                }
            }
        }

        function p(a, b, c) {
            var d = b === "width" ? a.offsetWidth : a.offsetHeight,
                e = b === "width" ? bH : bI;
            if (d > 0) return c !== "border" && K.each(e, function() {
                c || (d -= parseFloat(K.css(a, "padding" + this)) || 0), c === "margin" ? d += parseFloat(K.css(a, c + this)) || 0 : d -= parseFloat(K.css(a, "border" + this + "Width")) || 0
            }), d + "px";
            d = bJ(a, b, b);
            if (d < 0 || d == null) d = a.style[b] || 0;
            return d = parseFloat(d) || 0, c && K.each(e, function() {
                d += parseFloat(K.css(a, "padding" + this)) || 0, c !== "padding" && (d += parseFloat(K.css(a, "border" + this + "Width")) || 0), c === "margin" && (d += parseFloat(K.css(a, c + this)) || 0)
            }), d + "px"
        }

        function q(a, b) {
            b.src ? K.ajax({
                url: b.src,
                async: !1,
                dataType: "script"
            }) : K.globalEval((b.text || b.textContent || b.innerHTML || "").replace(by, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
        }

        function r(a) {
            K.nodeName(a, "input") ? s(a) : "getElementsByTagName" in a && K.grep(a.getElementsByTagName("input"), s)
        }

        function s(a) {
            if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
        }

        function t(a) {
            return "getElementsByTagName" in a ? a.getElementsByTagName("*") : "querySelectorAll" in a ? a.querySelectorAll("*") : []
        }

        function u(a, b) {
            var c;
            if (b.nodeType === 1) {
                b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
                if (c === "object") b.outerHTML = a.outerHTML;
                else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                    if (c === "option") b.selected = a.defaultSelected;
                    else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
                } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
                b.removeAttribute(K.expando)
            }
        }

        function v(a, b) {
            if (b.nodeType === 1 && !!K.hasData(a)) {
                var c = K.expando,
                    d = K.data(a),
                    e = K.data(b, d);
                if (d = d[c]) {
                    var f = d.events;
                    e = e[c] = K.extend({}, d);
                    if (f) {
                        delete e.handle, e.events = {};
                        for (var g in f)
                            for (var h = 0, i = f[g].length; h < i; h++) K.event.add(b, g + (f[g][h].namespace ? "." : "") + f[g][h].namespace, f[g][h], f[g][h].data)
                    }
                }
            }
        }

        function w(a, b) {
            return K.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function x(a, b, c) {
            b = b || 0;
            if (K.isFunction(b)) return K.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
            if (b.nodeType) return K.grep(a, function(a, d) {
                return a === b === c
            });
            if (typeof b == "string") {
                var d = K.grep(a, function(a) {
                    return a.nodeType === 1
                });
                if (bl.test(b)) return K.filter(b, d, !c);
                b = K.filter(b, d)
            }
            return K.grep(a, function(a, d) {
                return K.inArray(a, b) >= 0 === c
            })
        }

        function y(a) {
            return !a || !a.parentNode || a.parentNode.nodeType === 11
        }

        function z(a, b) {
            return (a && a !== "*" ? a + "." : "") + b.replace($, "`").replace(_, "&")
        }

        function A(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o = [],
                p = [],
                q = K._data(this, "events");
            if (!(a.liveFired === this || !q || !q.live || a.target.disabled || a.button && a.type === "click")) {
                a.namespace && (m = new RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")), a.liveFired = this;
                var r = q.live.slice(0);
                for (h = 0; h < r.length; h++) f = r[h], f.origType.replace(Y, "") === a.type ? p.push(f.selector) : r.splice(h--, 1);
                e = K(a.target).closest(p, a.currentTarget);
                for (i = 0, j = e.length; i < j; i++) {
                    l = e[i];
                    for (h = 0; h < r.length; h++) {
                        f = r[h];
                        if (l.selector === f.selector && (!m || m.test(f.namespace)) && !l.elem.disabled) {
                            g = l.elem, d = null;
                            if (f.preType === "mouseenter" || f.preType === "mouseleave") a.type = f.preType, d = K(a.relatedTarget).closest(f.selector)[0], d && K.contains(g, d) && (d = g);
                            (!d || d !== g) && o.push({
                                elem: g,
                                handleObj: f,
                                level: l.level
                            })
                        }
                    }
                }
                for (i = 0, j = o.length; i < j; i++) {
                    e = o[i];
                    if (c && e.level > c) break;
                    a.currentTarget = e.elem, a.data = e.handleObj.data, a.handleObj = e.handleObj, n = e.handleObj.origHandler.apply(e.elem, arguments);
                    if (n === !1 || a.isPropagationStopped()) {
                        c = e.level, n === !1 && (b = !1);
                        if (a.isImmediatePropagationStopped()) break
                    }
                }
                return b
            }
        }

        function B(a, c, d) {
            var e = K.extend({}, d[0]);
            e.type = a, e.originalEvent = {}, e.liveFired = b, K.event.handle.call(c, e), e.isDefaultPrevented() && d[0].preventDefault()
        }

        function C() {
            return !0
        }

        function D() {
            return !1
        }

        function E(a, c, d) {
            var e = c + "defer",
                f = c + "queue",
                g = c + "mark",
                h = K.data(a, e, b, !0);
            h && (d === "queue" || !K.data(a, f, b, !0)) && (d === "mark" || !K.data(a, g, b, !0)) && setTimeout(function() {
                !K.data(a, f, b, !0) && !K.data(a, g, b, !0) && (K.removeData(a, e, !0), h.resolve())
            }, 0)
        }

        function F(a) {
            for (var b in a)
                if (b !== "toJSON") return !1;
            return !0
        }

        function G(a, c, d) {
            if (d === b && a.nodeType === 1) {
                var e = "data-" + c.replace(O, "-$1").toLowerCase();
                d = a.getAttribute(e);
                if (typeof d == "string") {
                    try {
                        d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : K.isNaN(d) ? N.test(d) ? K.parseJSON(d) : d : parseFloat(d)
                    } catch (f) {}
                    K.data(a, c, d)
                } else d = b
            }
            return d
        }
        var H = a.document,
            I = a.navigator,
            J = a.location,
            K = function() {
                function c() {
                    if (!d.isReady) {
                        try {
                            H.documentElement.doScroll("left")
                        } catch (a) {
                            setTimeout(c, 1);
                            return
                        }
                        d.ready()
                    }
                }
                var d = function(a, b) {
                        return new d.fn.init(a, b, g)
                    },
                    e = a.jQuery,
                    f = a.$,
                    g, h = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                    i = /\S/,
                    j = /^\s+/,
                    k = /\s+$/,
                    l = /\d/,
                    m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                    n = /^[\],:{}\s]*$/,
                    o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    q = /(?:^|:|,)(?:\s*\[)+/g,
                    r = /(webkit)[ \/]([\w.]+)/,
                    s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    t = /(msie) ([\w.]+)/,
                    u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                    v = /-([a-z]|[0-9])/ig,
                    w = /^-ms-/,
                    x = function(a, b) {
                        return (b + "").toUpperCase()
                    },
                    y = I.userAgent,
                    z, A, B, C = Object.prototype.toString,
                    D = Object.prototype.hasOwnProperty,
                    E = Array.prototype.push,
                    F = Array.prototype.slice,
                    G = String.prototype.trim,
                    J = Array.prototype.indexOf,
                    K = {};
                return d.fn = d.prototype = {
                    constructor: d,
                    init: function(a, c, e) {
                        var f, g, i, j;
                        if (!a) return this;
                        if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                        if (a === "body" && !c && H.body) return this.context = H, this[0] = H.body, this.selector = a, this.length = 1, this;
                        if (typeof a == "string") {
                            a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? f = h.exec(a) : f = [null, a, null];
                            if (f && (f[1] || !c)) {
                                if (f[1]) return c = c instanceof d ? c[0] : c, j = c ? c.ownerDocument || c : H, i = m.exec(a), i ? d.isPlainObject(c) ? (a = [H.createElement(i[1])], d.fn.attr.call(a, c, !0)) : a = [j.createElement(i[1])] : (i = d.buildFragment([f[1]], [j]), a = (i.cacheable ? d.clone(i.fragment) : i.fragment).childNodes), d.merge(this, a);
                                g = H.getElementById(f[2]);
                                if (g && g.parentNode) {
                                    if (g.id !== f[2]) return e.find(a);
                                    this.length = 1, this[0] = g
                                }
                                return this.context = H, this.selector = a, this
                            }
                            return !c || c.jquery ? (c || e).find(a) : this.constructor(c).find(a)
                        }
                        return d.isFunction(a) ? e.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), d.makeArray(a, this))
                    },
                    selector: "",
                    jquery: "1.6.4",
                    length: 0,
                    size: function() {
                        return this.length
                    },
                    toArray: function() {
                        return F.call(this, 0)
                    },
                    get: function(a) {
                        return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                    },
                    pushStack: function(a, b, c) {
                        var e = this.constructor();
                        return d.isArray(a) ? E.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, b === "find" ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")"), e
                    },
                    each: function(a, b) {
                        return d.each(this, a, b)
                    },
                    ready: function(a) {
                        return d.bindReady(), A.done(a), this
                    },
                    eq: function(a) {
                        return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    slice: function() {
                        return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                    },
                    map: function(a) {
                        return this.pushStack(d.map(this, function(b, c) {
                            return a.call(b, c, b)
                        }))
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null)
                    },
                    push: E,
                    sort: [].sort,
                    splice: [].splice
                }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function() {
                    var a, c, e, f, g, h, i = arguments[0] || {},
                        j = 1,
                        k = arguments.length,
                        l = !1;
                    typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !d.isFunction(i) && (i = {}), k === j && (i = this, --j);
                    for (; j < k; j++)
                        if ((a = arguments[j]) != null)
                            for (c in a) {
                                e = i[c], f = a[c];
                                if (i === f) continue;
                                l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f)
                            }
                        return i
                }, d.extend({
                    noConflict: function(b) {
                        return a.$ === d && (a.$ = f), b && a.jQuery === d && (a.jQuery = e), d
                    },
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(a) {
                        a ? d.readyWait++ : d.ready(!0)
                    },
                    ready: function(a) {
                        if (a === !0 && !--d.readyWait || a !== !0 && !d.isReady) {
                            if (!H.body) return setTimeout(d.ready, 1);
                            d.isReady = !0;
                            if (a !== !0 && --d.readyWait > 0) return;
                            A.resolveWith(H, [d]), d.fn.trigger && d(H).trigger("ready").unbind("ready")
                        }
                    },
                    bindReady: function() {
                        if (!A) {
                            A = d._Deferred();
                            if (H.readyState === "complete") return setTimeout(d.ready, 1);
                            if (H.addEventListener) H.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", d.ready, !1);
                            else if (H.attachEvent) {
                                H.attachEvent("onreadystatechange", B), a.attachEvent("onload", d.ready);
                                var b = !1;
                                try {
                                    b = a.frameElement == null
                                } catch (e) {}
                                H.documentElement.doScroll && b && c()
                            }
                        }
                    },
                    isFunction: function(a) {
                        return d.type(a) === "function"
                    },
                    isArray: Array.isArray || function(a) {
                        return d.type(a) === "array"
                    },
                    isWindow: function(a) {
                        return a && typeof a == "object" && "setInterval" in a
                    },
                    isNaN: function(a) {
                        return a == null || !l.test(a) || isNaN(a)
                    },
                    type: function(a) {
                        return a == null ? String(a) : K[C.call(a)] || "object"
                    },
                    isPlainObject: function(a) {
                        if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return !1;
                        try {
                            if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                        } catch (c) {
                            return !1
                        }
                        var e;
                        for (e in a);
                        return e === b || D.call(a, e)
                    },
                    isEmptyObject: function(a) {
                        for (var b in a) return !1;
                        return !0
                    },
                    error: function(a) {
                        throw a
                    },
                    parseJSON: function(b) {
                        if (typeof b != "string" || !b) return null;
                        b = d.trim(b);
                        if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                        if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                        d.error("Invalid JSON: " + b)
                    },
                    parseXML: function(c) {
                        var e, f;
                        try {
                            a.DOMParser ? (f = new DOMParser, e = f.parseFromString(c, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(c))
                        } catch (g) {
                            e = b
                        }
                        return (!e || !e.documentElement || e.getElementsByTagName("parsererror").length) && d.error("Invalid XML: " + c), e
                    },
                    noop: function() {},
                    globalEval: function(b) {
                        b && i.test(b) && (a.execScript || function(b) {
                            a.eval.call(a, b)
                        })(b)
                    },
                    camelCase: function(a) {
                        return a.replace(w, "ms-").replace(v, x)
                    },
                    nodeName: function(a, b) {
                        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                    },
                    each: function(a, c, e) {
                        var f, g = 0,
                            h = a.length,
                            i = h === b || d.isFunction(a);
                        if (e) {
                            if (i) {
                                for (f in a)
                                    if (c.apply(a[f], e) === !1) break
                            } else
                                for (; g < h;)
                                    if (c.apply(a[g++], e) === !1) break
                        } else if (i) {
                            for (f in a)
                                if (c.call(a[f], f, a[f]) === !1) break
                        } else
                            for (; g < h;)
                                if (c.call(a[g], g, a[g++]) === !1) break; return a
                    },
                    trim: G ? function(a) {
                        return a == null ? "" : G.call(a)
                    } : function(a) {
                        return a == null ? "" : (a + "").replace(j, "").replace(k, "")
                    },
                    makeArray: function(a, b) {
                        var c = b || [];
                        if (a != null) {
                            var e = d.type(a);
                            a.length == null || e === "string" || e === "function" || e === "regexp" || d.isWindow(a) ? E.call(c, a) : d.merge(c, a)
                        }
                        return c
                    },
                    inArray: function(a, b) {
                        if (!b) return -1;
                        if (J) return J.call(b, a);
                        for (var c = 0, d = b.length; c < d; c++)
                            if (b[c] === a) return c;
                        return -1
                    },
                    merge: function(a, c) {
                        var d = a.length,
                            e = 0;
                        if (typeof c.length == "number")
                            for (var f = c.length; e < f; e++) a[d++] = c[e];
                        else
                            while (c[e] !== b) a[d++] = c[e++];
                        return a.length = d, a
                    },
                    grep: function(a, b, c) {
                        var d = [],
                            e;
                        c = !!c;
                        for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                        return d
                    },
                    map: function(a, c, e) {
                        var f, g, h = [],
                            i = 0,
                            j = a.length,
                            k = a instanceof d || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || d.isArray(a));
                        if (k)
                            for (; i < j; i++) f = c(a[i], i, e), f != null && (h[h.length] = f);
                        else
                            for (g in a) f = c(a[g], g, e), f != null && (h[h.length] = f);
                        return h.concat.apply([], h)
                    },
                    guid: 1,
                    proxy: function(a, c) {
                        if (typeof c == "string") {
                            var e = a[c];
                            c = a, a = e
                        }
                        if (!d.isFunction(a)) return b;
                        var f = F.call(arguments, 2),
                            g = function() {
                                return a.apply(c, f.concat(F.call(arguments)))
                            };
                        return g.guid = a.guid = a.guid || g.guid || d.guid++, g
                    },
                    access: function(a, c, e, f, g, h) {
                        var i = a.length;
                        if (typeof c == "object") {
                            for (var j in c) d.access(a, j, c[j], f, g, e);
                            return a
                        }
                        if (e !== b) {
                            f = !h && f && d.isFunction(e);
                            for (var k = 0; k < i; k++) g(a[k], c, f ? e.call(a[k], k, g(a[k], c)) : e, h);
                            return a
                        }
                        return i ? g(a[0], c) : b
                    },
                    now: function() {
                        return (new Date).getTime()
                    },
                    uaMatch: function(a) {
                        a = a.toLowerCase();
                        var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                        return {
                            browser: b[1] || "",
                            version: b[2] || "0"
                        }
                    },
                    sub: function() {
                        function a(b, c) {
                            return new a.fn.init(b, c)
                        }
                        d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(c, e) {
                            return e && e instanceof d && !(e instanceof a) && (e = a(e)), d.fn.init.call(this, c, e, b)
                        }, a.fn.init.prototype = a.fn;
                        var b = a(H);
                        return a
                    },
                    browser: {}
                }), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
                    K["[object " + b + "]"] = b.toLowerCase()
                }), z = d.uaMatch(y), z.browser && (d.browser[z.browser] = !0, d.browser.version = z.version), d.browser.webkit && (d.browser.safari = !0), i.test("Â ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(H), H.addEventListener ? B = function() {
                    H.removeEventListener("DOMContentLoaded", B, !1), d.ready()
                } : H.attachEvent && (B = function() {
                    H.readyState === "complete" && (H.detachEvent("onreadystatechange", B), d.ready())
                }), d
            }(),
            L = "done fail isResolved isRejected promise then always pipe".split(" "),
            M = [].slice;
        K.extend({
            _Deferred: function() {
                var a = [],
                    b, c, d, e = {
                        done: function() {
                            if (!d) {
                                var c = arguments,
                                    f, g, h, i, j;
                                b && (j = b, b = 0);
                                for (f = 0, g = c.length; f < g; f++) h = c[f], i = K.type(h), i === "array" ? e.done.apply(e, h) : i === "function" && a.push(h);
                                j && e.resolveWith(j[0], j[1])
                            }
                            return this
                        },
                        resolveWith: function(e, f) {
                            if (!d && !b && !c) {
                                f = f || [], c = 1;
                                try {
                                    while (a[0]) a.shift().apply(e, f)
                                } finally {
                                    b = [e, f], c = 0
                                }
                            }
                            return this
                        },
                        resolve: function() {
                            return e.resolveWith(this, arguments), this
                        },
                        isResolved: function() {
                            return !!c || !!b
                        },
                        cancel: function() {
                            return d = 1, a = [], this
                        }
                    };
                return e
            },
            Deferred: function(a) {
                var b = K._Deferred(),
                    c = K._Deferred(),
                    d;
                return K.extend(b, {
                    then: function(a, c) {
                        return b.done(a).fail(c), this
                    },
                    always: function() {
                        return b.done.apply(b, arguments).fail.apply(this, arguments)
                    },
                    fail: c.done,
                    rejectWith: c.resolveWith,
                    reject: c.resolve,
                    isRejected: c.isResolved,
                    pipe: function(a, c) {
                        return K.Deferred(function(d) {
                            K.each({
                                done: [a, "resolve"],
                                fail: [c, "reject"]
                            }, function(a, c) {
                                var e = c[0],
                                    f = c[1],
                                    g;
                                K.isFunction(e) ? b[a](function() {
                                    g = e.apply(this, arguments), g && K.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject) : d[f + "With"](this === b ? d : this, [g])
                                }) : b[a](d[f])
                            })
                        }).promise()
                    },
                    promise: function(a) {
                        if (a == null) {
                            if (d) return d;
                            d = a = {}
                        }
                        var c = L.length;
                        while (c--) a[L[c]] = b[L[c]];
                        return a
                    }
                }), b.done(c.cancel).fail(b.cancel), delete b.cancel, a && a.call(b, b), b
            },
            when: function(a) {
                function b(a) {
                    return function(b) {
                        c[a] = arguments.length > 1 ? M.call(arguments, 0) : b, --f || g.resolveWith(g, M.call(c, 0))
                    }
                }
                var c = arguments,
                    d = 0,
                    e = c.length,
                    f = e,
                    g = e <= 1 && a && K.isFunction(a.promise) ? a : K.Deferred();
                if (e > 1) {
                    for (; d < e; d++) c[d] && K.isFunction(c[d].promise) ? c[d].promise().then(b(d), g.reject) : --f;
                    f || g.resolveWith(g, c)
                } else g !== a && g.resolveWith(g, e ? [a] : []);
                return g.promise()
            }
        }), K.support = function() {
            var a = H.createElement("div"),
                b = H.documentElement,
                c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            a.setAttribute("className", "t"), a.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", c = a.getElementsByTagName("*"), d = a.getElementsByTagName("a")[0];
            if (!c || !c.length || !d) return {};
            e = H.createElement("select"), f = e.appendChild(H.createElement("option")), g = a.getElementsByTagName("input")[0], i = {
                leadingWhitespace: a.firstChild.nodeType === 3,
                tbody: !a.getElementsByTagName("tbody").length,
                htmlSerialize: !!a.getElementsByTagName("link").length,
                style: /top/.test(d.getAttribute("style")),
                hrefNormalized: d.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(d.style.opacity),
                cssFloat: !!d.style.cssFloat,
                checkOn: g.value === "on",
                optSelected: f.selected,
                getSetAttribute: a.className !== "t",
                submitBubbles: !0,
                changeBubbles: !0,
                focusinBubbles: !1,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0
            }, g.checked = !0, i.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, i.optDisabled = !f.disabled;
            try {
                delete a.test
            } catch (t) {
                i.deleteExpando = !1
            }!a.addEventListener && a.attachEvent && a.fireEvent && (a.attachEvent("onclick", function() {
                i.noCloneEvent = !1
            }), a.cloneNode(!0).fireEvent("onclick")), g = H.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), i.radioValue = g.value === "t", g.setAttribute("checked", "checked"), a.appendChild(g), j = H.createDocumentFragment(), j.appendChild(a.firstChild), i.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, a.innerHTML = "", a.style.width = a.style.paddingLeft = "1px", k = H.getElementsByTagName("body")[0], m = H.createElement(k ? "div" : "body"), n = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, k && K.extend(n, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (r in n) m.style[r] = n[r];
            m.appendChild(a), l = k || b, l.insertBefore(m, l.firstChild), i.appendChecked = g.checked, i.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, i.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", i.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", o = a.getElementsByTagName("td"), s = o[0].offsetHeight === 0, o[0].style.display = "", o[1].style.display = "none", i.reliableHiddenOffsets = s && o[0].offsetHeight === 0, a.innerHTML = "", H.defaultView && H.defaultView.getComputedStyle && (h = H.createElement("div"), h.style.width = "0", h.style.marginRight = "0", a.appendChild(h), i.reliableMarginRight = (parseInt((H.defaultView.getComputedStyle(h, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0), m.innerHTML = "", l.removeChild(m);
            if (a.attachEvent)
                for (r in {
                        submit: 1,
                        change: 1,
                        focusin: 1
                    }) q = "on" + r, s = q in a, s || (a.setAttribute(q, "return;"), s = typeof a[q] == "function"), i[r + "Bubbles"] = s;
            return m = j = e = f = k = h = a = g = null, i
        }(), K.boxModel = K.support.boxModel;
        var N = /^(?:\{.*\}|\[.*\])$/,
            O = /([A-Z])/g;
        K.extend({
            cache: {},
            uuid: 0,
            expando: "jQuery" + (K.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(a) {
                return a = a.nodeType ? K.cache[a[K.expando]] : a[K.expando], !!a && !F(a)
            },
            data: function(a, c, d, e) {
                if (!!K.acceptData(a)) {
                    var f, g, h = K.expando,
                        i = typeof c == "string",
                        j = a.nodeType,
                        k = j ? K.cache : a,
                        l = j ? a[K.expando] : a[K.expando] && K.expando;
                    if ((!l || e && l && k[l] && !k[l][h]) && i && d === b) return;
                    l || (j ? a[K.expando] = l = ++K.uuid : l = K.expando), k[l] || (k[l] = {}, j || (k[l].toJSON = K.noop));
                    if (typeof c == "object" || typeof c == "function") e ? k[l][h] = K.extend(k[l][h], c) : k[l] = K.extend(k[l], c);
                    return f = k[l], e && (f[h] || (f[h] = {}), f = f[h]), d !== b && (f[K.camelCase(c)] = d), c === "events" && !f[c] ? f[h] && f[h].events : (i ? (g = f[c], g == null && (g = f[K.camelCase(c)])) : g = f, g)
                }
            },
            removeData: function(a, b, c) {
                if (!!K.acceptData(a)) {
                    var d, e = K.expando,
                        f = a.nodeType,
                        g = f ? K.cache : a,
                        h = f ? a[K.expando] : K.expando;
                    if (!g[h]) return;
                    if (b) {
                        d = c ? g[h][e] : g[h];
                        if (d) {
                            d[b] || (b = K.camelCase(b)), delete d[b];
                            if (!F(d)) return
                        }
                    }
                    if (c) {
                        delete g[h][e];
                        if (!F(g[h])) return
                    }
                    var i = g[h][e];
                    K.support.deleteExpando || !g.setInterval ? delete g[h] : g[h] = null, i ? (g[h] = {}, f || (g[h].toJSON = K.noop), g[h][e] = i) : f && (K.support.deleteExpando ? delete a[K.expando] : a.removeAttribute ? a.removeAttribute(K.expando) : a[K.expando] = null)
                }
            },
            _data: function(a, b, c) {
                return K.data(a, b, c, !0)
            },
            acceptData: function(a) {
                if (a.nodeName) {
                    var b = K.noData[a.nodeName.toLowerCase()];
                    if (b) return b !== !0 && a.getAttribute("classid") === b
                }
                return !0
            }
        }), K.fn.extend({
            data: function(a, c) {
                var d = null;
                if (typeof a == "undefined") {
                    if (this.length) {
                        d = K.data(this[0]);
                        if (this[0].nodeType === 1) {
                            var e = this[0].attributes,
                                f;
                            for (var g = 0, h = e.length; g < h; g++) f = e[g].name, f.indexOf("data-") === 0 && (f = K.camelCase(f.substring(5)), G(this[0], f, d[f]))
                        }
                    }
                    return d
                }
                if (typeof a == "object") return this.each(function() {
                    K.data(this, a)
                });
                var i = a.split(".");
                return i[1] = i[1] ? "." + i[1] : "", c === b ? (d = this.triggerHandler("getData" + i[1] + "!", [i[0]]), d === b && this.length && (d = K.data(this[0], a), d = G(this[0], a, d)), d === b && i[1] ? this.data(i[0]) : d) : this.each(function() {
                    var b = K(this),
                        d = [i[0], c];
                    b.triggerHandler("setData" + i[1] + "!", d), K.data(this, a, c), b.triggerHandler("changeData" + i[1] + "!", d)
                })
            },
            removeData: function(a) {
                return this.each(function() {
                    K.removeData(this, a)
                })
            }
        }), K.extend({
            _mark: function(a, c) {
                a && (c = (c || "fx") + "mark", K.data(a, c, (K.data(a, c, b, !0) || 0) + 1, !0))
            },
            _unmark: function(a, c, d) {
                a !== !0 && (d = c, c = a, a = !1);
                if (c) {
                    d = d || "fx";
                    var e = d + "mark",
                        f = a ? 0 : (K.data(c, e, b, !0) || 1) - 1;
                    f ? K.data(c, e, f, !0) : (K.removeData(c, e, !0), E(c, d, "mark"))
                }
            },
            queue: function(a, c, d) {
                if (a) {
                    c = (c || "fx") + "queue";
                    var e = K.data(a, c, b, !0);
                    return d && (!e || K.isArray(d) ? e = K.data(a, c, K.makeArray(d), !0) : e.push(d)), e || []
                }
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = K.queue(a, b),
                    d = c.shift(),
                    e;
                d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), d.call(a, function() {
                    K.dequeue(a, b)
                })), c.length || (K.removeData(a, b + "queue", !0), E(a, b, "queue"))
            }
        }), K.fn.extend({
            queue: function(a, c) {
                return typeof a != "string" && (c = a, a = "fx"), c === b ? K.queue(this[0], a) : this.each(function() {
                    var b = K.queue(this, a, c);
                    a === "fx" && b[0] !== "inprogress" && K.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    K.dequeue(this, a)
                })
            },
            delay: function(a, b) {
                return a = K.fx ? K.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function() {
                    var c = this;
                    setTimeout(function() {
                        K.dequeue(c, b)
                    }, a)
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, c) {
                function d() {
                    --h || e.resolveWith(f, [f])
                }
                typeof a != "string" && (c = a, a = b), a = a || "fx";
                var e = K.Deferred(),
                    f = this,
                    g = f.length,
                    h = 1,
                    i = a + "defer",
                    j = a + "queue",
                    k = a + "mark",
                    l;
                while (g--)
                    if (l = K.data(f[g], i, b, !0) || (K.data(f[g], j, b, !0) || K.data(f[g], k, b, !0)) && K.data(f[g], i, K._Deferred(), !0)) h++, l.done(d);
                return d(), e.promise()
            }
        });
        var P = /[\n\t\r]/g,
            Q = /\s+/,
            R = /\r/g,
            S = /^(?:button|input)$/i,
            T = /^(?:button|input|object|select|textarea)$/i,
            U = /^a(?:rea)?$/i,
            V = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            W, X;
        K.fn.extend({
            attr: function(a, b) {
                return K.access(this, a, b, !0, K.attr)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    K.removeAttr(this, a)
                })
            },
            prop: function(a, b) {
                return K.access(this, a, b, !0, K.prop)
            },
            removeProp: function(a) {
                return a = K.propFix[a] || a, this.each(function() {
                    try {
                        this[a] = b, delete this[a]
                    } catch (c) {}
                })
            },
            addClass: function(a) {
                var b, c, d, e, f, g, h;
                if (K.isFunction(a)) return this.each(function(b) {
                    K(this).addClass(a.call(this, b, this.className))
                });
                if (a && typeof a == "string") {
                    b = a.split(Q);
                    for (c = 0, d = this.length; c < d; c++) {
                        e = this[c];
                        if (e.nodeType === 1)
                            if (!e.className && b.length === 1) e.className = a;
                            else {
                                f = " " + e.className + " ";
                                for (g = 0, h = b.length; g < h; g++) ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                                e.className = K.trim(f)
                            }
                    }
                }
                return this
            },
            removeClass: function(a) {
                var c, d, e, f, g, h, i;
                if (K.isFunction(a)) return this.each(function(b) {
                    K(this).removeClass(a.call(this, b, this.className))
                });
                if (a && typeof a == "string" || a === b) {
                    c = (a || "").split(Q);
                    for (d = 0, e = this.length; d < e; d++) {
                        f = this[d];
                        if (f.nodeType === 1 && f.className)
                            if (a) {
                                g = (" " + f.className + " ").replace(P, " ");
                                for (h = 0, i = c.length; h < i; h++) g = g.replace(" " + c[h] + " ", " ");
                                f.className = K.trim(g)
                            } else f.className = ""
                    }
                }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a,
                    d = typeof b == "boolean";
                return K.isFunction(a) ? this.each(function(c) {
                    K(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function() {
                    if (c === "string") {
                        var e, f = 0,
                            g = K(this),
                            h = b,
                            i = a.split(Q);
                        while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e)
                    } else if (c === "undefined" || c === "boolean") this.className && K._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : K._data(this, "__className__") || ""
                })
            },
            hasClass: function(a) {
                var b = " " + a + " ";
                for (var c = 0, d = this.length; c < d; c++)
                    if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(P, " ").indexOf(b) > -1) return !0;
                return !1
            },
            val: function(a) {
                var c, d, e = this[0];
                if (!arguments.length) return e ? (c = K.valHooks[e.nodeName.toLowerCase()] || K.valHooks[e.type], c && "get" in c && (d = c.get(e, "value")) !== b ? d : (d = e.value, typeof d == "string" ? d.replace(R, "") : d == null ? "" : d)) : b;
                var f = K.isFunction(a);
                return this.each(function(d) {
                    var e = K(this),
                        g;
                    if (this.nodeType === 1) {
                        f ? g = a.call(this, d, e.val()) : g = a, g == null ? g = "" : typeof g == "number" ? g += "" : K.isArray(g) && (g = K.map(g, function(a) {
                            return a == null ? "" : a + ""
                        })), c = K.valHooks[this.nodeName.toLowerCase()] || K.valHooks[this.type];
                        if (!c || !("set" in c) || c.set(this, g, "value") === b) this.value = g
                    }
                })
            }
        }), K.extend({
            valHooks: {
                option: {
                    get: function(a) {
                        var b = a.attributes.value;
                        return !b || b.specified ? a.value : a.text
                    }
                },
                select: {
                    get: function(a) {
                        var b, c = a.selectedIndex,
                            d = [],
                            e = a.options,
                            f = a.type === "select-one";
                        if (c < 0) return null;
                        for (var g = f ? c : 0, h = f ? c + 1 : e.length; g < h; g++) {
                            var i = e[g];
                            if (i.selected && (K.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !K.nodeName(i.parentNode, "optgroup"))) {
                                b = K(i).val();
                                if (f) return b;
                                d.push(b)
                            }
                        }
                        return f && !d.length && e.length ? K(e[c]).val() : d
                    },
                    set: function(a, b) {
                        var c = K.makeArray(b);
                        return K(a).find("option").each(function() {
                            this.selected = K.inArray(K(this).val(), c) >= 0
                        }), c.length || (a.selectedIndex = -1), c
                    }
                }
            },
            attrFn: {
                val: !0,
                css: !0,
                html: !0,
                text: !0,
                data: !0,
                width: !0,
                height: !0,
                offset: !0
            },
            attrFix: {
                tabindex: "tabIndex"
            },
            attr: function(a, c, d, e) {
                var f = a.nodeType;
                if (!a || f === 3 || f === 8 || f === 2) return b;
                if (e && c in K.attrFn) return K(a)[c](d);
                if ("getAttribute" in a) {
                    var g, h, i = f !== 1 || !K.isXMLDoc(a);
                    return i && (c = K.attrFix[c] || c, h = K.attrHooks[c], h || (V.test(c) ? h = X : W && (h = W))), d !== b ? d === null ? (K.removeAttr(a, c), b) : h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d) : h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g)
                }
                return K.prop(a, c, d)
            },
            removeAttr: function(a, b) {
                var c;
                a.nodeType === 1 && (b = K.attrFix[b] || b, K.attr(a, b, ""), a.removeAttribute(b), V.test(b) && (c = K.propFix[b] || b) in a && (a[c] = !1))
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (S.test(a.nodeName) && a.parentNode) K.error("type property can't be changed");
                        else if (!K.support.radioValue && b === "radio" && K.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                },
                value: {
                    get: function(a, b) {
                        return W && K.nodeName(a, "button") ? W.get(a, b) : b in a ? a.value : null
                    },
                    set: function(a, b, c) {
                        if (W && K.nodeName(a, "button")) return W.set(a, b, c);
                        a.value = b
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(a, c, d) {
                var e = a.nodeType;
                if (!a || e === 3 || e === 8 || e === 2) return b;
                var f, g, h = e !== 1 || !K.isXMLDoc(a);
                return h && (c = K.propFix[c] || c, g = K.propHooks[c]), d !== b ? g && "set" in g && (f = g.set(a, d, c)) !== b ? f : a[c] = d : g && "get" in g && (f = g.get(a, c)) !== null ? f : a[c]
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        var c = a.getAttributeNode("tabindex");
                        return c && c.specified ? parseInt(c.value, 10) : T.test(a.nodeName) || U.test(a.nodeName) && a.href ? 0 : b
                    }
                }
            }
        }), K.attrHooks.tabIndex = K.propHooks.tabIndex, X = {
            get: function(a, c) {
                var d;
                return K.prop(a, c) === !0 || (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
            },
            set: function(a, b, c) {
                var d;
                return b === !1 ? K.removeAttr(a, c) : (d = K.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
            }
        }, K.support.getSetAttribute || (W = K.valHooks.button = {
            get: function(a, c) {
                var d;
                return d = a.getAttributeNode(c), d && d.nodeValue !== "" ? d.nodeValue : b
            },
            set: function(a, b, c) {
                var d = a.getAttributeNode(c);
                return d || (d = H.createAttribute(c), a.setAttributeNode(d)), d.nodeValue = b + ""
            }
        }, K.each(["width", "height"], function(a, b) {
            K.attrHooks[b] = K.extend(K.attrHooks[b], {
                set: function(a, c) {
                    if (c === "") return a.setAttribute(b, "auto"), c
                }
            })
        })), K.support.hrefNormalized || K.each(["href", "src", "width", "height"], function(a, c) {
            K.attrHooks[c] = K.extend(K.attrHooks[c], {
                get: function(a) {
                    var d = a.getAttribute(c, 2);
                    return d === null ? b : d
                }
            })
        }), K.support.style || (K.attrHooks.style = {
            get: function(a) {
                return a.style.cssText.toLowerCase() || b
            },
            set: function(a, b) {
                return a.style.cssText = "" + b
            }
        }), K.support.optSelected || (K.propHooks.selected = K.extend(K.propHooks.selected, {
            get: function(a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }
        })), K.support.checkOn || K.each(["radio", "checkbox"], function() {
            K.valHooks[this] = {
                get: function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
            }
        }), K.each(["radio", "checkbox"], function() {
            K.valHooks[this] = K.extend(K.valHooks[this], {
                set: function(a, b) {
                    if (K.isArray(b)) return a.checked = K.inArray(K(a).val(), b) >= 0
                }
            })
        });
        var Y = /\.(.*)$/,
            Z = /^(?:textarea|input|select)$/i,
            $ = /\./g,
            _ = / /g,
            ba = /[^\w\s.|`]/g,
            bb = function(a) {
                return a.replace(ba, "\\$&")
            };
        K.event = {
            add: function(a, c, d, e) {
                if (a.nodeType !== 3 && a.nodeType !== 8) {
                    if (d === !1) d = D;
                    else if (!d) return;
                    var f, g;
                    d.handler && (f = d, d = f.handler), d.guid || (d.guid = K.guid++);
                    var h = K._data(a);
                    if (!h) return;
                    var i = h.events,
                        j = h.handle;
                    i || (h.events = i = {}), j || (h.handle = j = function(a) {
                        return typeof K != "undefined" && (!a || K.event.triggered !== a.type) ? K.event.handle.apply(j.elem, arguments) : b
                    }), j.elem = a, c = c.split(" ");
                    var k, l = 0,
                        m;
                    while (k = c[l++]) {
                        g = f ? K.extend({}, f) : {
                            handler: d,
                            data: e
                        }, k.indexOf(".") > -1 ? (m = k.split("."), k = m.shift(), g.namespace = m.slice(0).sort().join(".")) : (m = [], g.namespace = ""), g.type = k, g.guid || (g.guid = d.guid);
                        var n = i[k],
                            o = K.event.special[k] || {};
                        if (!n) {
                            n = i[k] = [];
                            if (!o.setup || o.setup.call(a, e, m, j) === !1) a.addEventListener ? a.addEventListener(k, j, !1) : a.attachEvent && a.attachEvent("on" + k, j)
                        }
                        o.add && (o.add.call(a, g), g.handler.guid || (g.handler.guid = d.guid)), n.push(g), K.event.global[k] = !0
                    }
                    a = null
                }
            },
            global: {},
            remove: function(a, c, d, e) {
                if (a.nodeType !== 3 && a.nodeType !== 8) {
                    d === !1 && (d = D);
                    var f, g, h, i, j = 0,
                        k, l, m, n, o, p, q, r = K.hasData(a) && K._data(a),
                        s = r && r.events;
                    if (!r || !s) return;
                    c && c.type && (d = c.handler, c = c.type);
                    if (!c || typeof c == "string" && c.charAt(0) === ".") {
                        c = c || "";
                        for (g in s) K.event.remove(a, g + c);
                        return
                    }
                    c = c.split(" ");
                    while (g = c[j++]) {
                        q = g, p = null, k = g.indexOf(".") < 0, l = [], k || (l = g.split("."), g = l.shift(), m = new RegExp("(^|\\.)" + K.map(l.slice(0).sort(), bb).join("\\.(?:.*\\.)?") + "(\\.|$)")), o = s[g];
                        if (!o) continue;
                        if (!d) {
                            for (i = 0; i < o.length; i++) {
                                p = o[i];
                                if (k || m.test(p.namespace)) K.event.remove(a, q, p.handler, i), o.splice(i--, 1)
                            }
                            continue
                        }
                        n = K.event.special[g] || {};
                        for (i = e || 0; i < o.length; i++) {
                            p = o[i];
                            if (d.guid === p.guid) {
                                if (k || m.test(p.namespace)) e == null && o.splice(i--, 1), n.remove && n.remove.call(a, p);
                                if (e != null) break
                            }
                        }
                        if (o.length === 0 || e != null && o.length === 1)(!n.teardown || n.teardown.call(a, l) === !1) && K.removeEvent(a, g, r.handle), f = null, delete s[g]
                    }
                    if (K.isEmptyObject(s)) {
                        var t = r.handle;
                        t && (t.elem = null), delete r.events, delete r.handle, K.isEmptyObject(r) && K.removeData(a, b, !0)
                    }
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(c, d, e, f) {
                var g = c.type || c,
                    h = [],
                    i;
                g.indexOf("!") >= 0 && (g = g.slice(0, -1), i = !0), g.indexOf(".") >= 0 && (h = g.split("."), g = h.shift(), h.sort());
                if (!!e && !K.event.customEvent[g] || !!K.event.global[g]) {
                    c = typeof c == "object" ? c[K.expando] ? c : new K.Event(g, c) : new K.Event(g), c.type = g, c.exclusive = i, c.namespace = h.join("."), c.namespace_re = new
                    RegExp("(^|\\.)" + h.join("\\.(?:.*\\.)?") + "(\\.|$)");
                    if (f || !e) c.preventDefault(), c.stopPropagation();
                    if (!e) {
                        K.each(K.cache, function() {
                            var a = K.expando,
                                b = this[a];
                            b && b.events && b.events[g] && K.event.trigger(c, d, b.handle.elem)
                        });
                        return
                    }
                    if (e.nodeType === 3 || e.nodeType === 8) return;
                    c.result = b, c.target = e, d = d != null ? K.makeArray(d) : [], d.unshift(c);
                    var j = e,
                        k = g.indexOf(":") < 0 ? "on" + g : "";
                    do {
                        var l = K._data(j, "handle");
                        c.currentTarget = j, l && l.apply(j, d), k && K.acceptData(j) && j[k] && j[k].apply(j, d) === !1 && (c.result = !1, c.preventDefault()), j = j.parentNode || j.ownerDocument || j === c.target.ownerDocument && a
                    } while (j && !c.isPropagationStopped());
                    if (!c.isDefaultPrevented()) {
                        var m, n = K.event.special[g] || {};
                        if ((!n._default || n._default.call(e.ownerDocument, c) === !1) && (g !== "click" || !K.nodeName(e, "a")) && K.acceptData(e)) {
                            try {
                                k && e[g] && (m = e[k], m && (e[k] = null), K.event.triggered = g, e[g]())
                            } catch (o) {}
                            m && (e[k] = m), K.event.triggered = b
                        }
                    }
                    return c.result
                }
            },
            handle: function(c) {
                c = K.event.fix(c || a.event);
                var d = ((K._data(this, "events") || {})[c.type] || []).slice(0),
                    e = !c.exclusive && !c.namespace,
                    f = Array.prototype.slice.call(arguments, 0);
                f[0] = c, c.currentTarget = this;
                for (var g = 0, h = d.length; g < h; g++) {
                    var i = d[g];
                    if (e || c.namespace_re.test(i.namespace)) {
                        c.handler = i.handler, c.data = i.data, c.handleObj = i;
                        var j = i.handler.apply(this, f);
                        j !== b && (c.result = j, j === !1 && (c.preventDefault(), c.stopPropagation()));
                        if (c.isImmediatePropagationStopped()) break
                    }
                }
                return c.result
            },
            props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
            fix: function(a) {
                if (a[K.expando]) return a;
                var c = a;
                a = K.Event(c);
                for (var d = this.props.length, e; d;) e = this.props[--d], a[e] = c[e];
                a.target || (a.target = a.srcElement || H), a.target.nodeType === 3 && (a.target = a.target.parentNode), !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
                if (a.pageX == null && a.clientX != null) {
                    var f = a.target.ownerDocument || H,
                        g = f.documentElement,
                        h = f.body;
                    a.pageX = a.clientX + (g && g.scrollLeft || h && h.scrollLeft || 0) - (g && g.clientLeft || h && h.clientLeft || 0), a.pageY = a.clientY + (g && g.scrollTop || h && h.scrollTop || 0) - (g && g.clientTop || h && h.clientTop || 0)
                }
                return a.which == null && (a.charCode != null || a.keyCode != null) && (a.which = a.charCode != null ? a.charCode : a.keyCode), !a.metaKey && a.ctrlKey && (a.metaKey = a.ctrlKey), !a.which && a.button !== b && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0), a
            },
            guid: 1e8,
            proxy: K.proxy,
            special: {
                ready: {
                    setup: K.bindReady,
                    teardown: K.noop
                },
                live: {
                    add: function(a) {
                        K.event.add(this, z(a.origType, a.selector), K.extend({}, a, {
                            handler: A,
                            guid: a.handler.guid
                        }))
                    },
                    remove: function(a) {
                        K.event.remove(this, z(a.origType, a.selector), a)
                    }
                },
                beforeunload: {
                    setup: function(a, b, c) {
                        K.isWindow(this) && (this.onbeforeunload = c)
                    },
                    teardown: function(a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }
                }
            }
        }, K.removeEvent = H.removeEventListener ? function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function(a, b, c) {
            a.detachEvent && a.detachEvent("on" + b, c)
        }, K.Event = function(a, b) {
            if (!this.preventDefault) return new K.Event(a, b);
            a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? C : D) : this.type = a, b && K.extend(this, b), this.timeStamp = K.now(), this[K.expando] = !0
        }, K.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = C;
                var a = this.originalEvent;
                !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = C;
                var a = this.originalEvent;
                !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = C, this.stopPropagation()
            },
            isDefaultPrevented: D,
            isPropagationStopped: D,
            isImmediatePropagationStopped: D
        };
        var bc = function(a) {
                var b = a.relatedTarget,
                    c = !1,
                    d = a.type;
                a.type = a.data, b !== this && (b && (c = K.contains(this, b)), c || (K.event.handle.apply(this, arguments), a.type = d))
            },
            bd = function(a) {
                a.type = a.data, K.event.handle.apply(this, arguments)
            };
        K.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(a, b) {
            K.event.special[a] = {
                setup: function(c) {
                    K.event.add(this, b, c && c.selector ? bd : bc, a)
                },
                teardown: function(a) {
                    K.event.remove(this, b, a && a.selector ? bd : bc)
                }
            }
        }), K.support.submitBubbles || (K.event.special.submit = {
            setup: function(a, b) {
                if (!K.nodeName(this, "form")) K.event.add(this, "click.specialSubmit", function(a) {
                    var b = a.target,
                        c = K.nodeName(b, "input") || K.nodeName(b, "button") ? b.type : "";
                    (c === "submit" || c === "image") && K(b).closest("form").length && B("submit", this, arguments)
                }), K.event.add(this, "keypress.specialSubmit", function(a) {
                    var b = a.target,
                        c = K.nodeName(b, "input") || K.nodeName(b, "button") ? b.type : "";
                    (c === "text" || c === "password") && K(b).closest("form").length && a.keyCode === 13 && B("submit", this, arguments)
                });
                else return !1
            },
            teardown: function(a) {
                K.event.remove(this, ".specialSubmit")
            }
        });
        if (!K.support.changeBubbles) {
            var be, bf = function(a) {
                    var b = K.nodeName(a, "input") ? a.type : "",
                        c = a.value;
                    return b === "radio" || b === "checkbox" ? c = a.checked : b === "select-multiple" ? c = a.selectedIndex > -1 ? K.map(a.options, function(a) {
                        return a.selected
                    }).join("-") : "" : K.nodeName(a, "select") && (c = a.selectedIndex), c
                },
                bg = function(a) {
                    var c = a.target,
                        d, e;
                    if (!!Z.test(c.nodeName) && !c.readOnly) {
                        d = K._data(c, "_change_data"), e = bf(c), (a.type !== "focusout" || c.type !== "radio") && K._data(c, "_change_data", e);
                        if (d === b || e === d) return;
                        if (d != null || e) a.type = "change", a.liveFired = b, K.event.trigger(a, arguments[1], c)
                    }
                };
            K.event.special.change = {
                filters: {
                    focusout: bg,
                    beforedeactivate: bg,
                    click: function(a) {
                        var b = a.target,
                            c = K.nodeName(b, "input") ? b.type : "";
                        (c === "radio" || c === "checkbox" || K.nodeName(b, "select")) && bg.call(this, a)
                    },
                    keydown: function(a) {
                        var b = a.target,
                            c = K.nodeName(b, "input") ? b.type : "";
                        (a.keyCode === 13 && !K.nodeName(b, "textarea") || a.keyCode === 32 && (c === "checkbox" || c === "radio") || c === "select-multiple") && bg.call(this, a)
                    },
                    beforeactivate: function(a) {
                        var b = a.target;
                        K._data(b, "_change_data", bf(b))
                    }
                },
                setup: function(a, b) {
                    if (this.type === "file") return !1;
                    for (var c in be) K.event.add(this, c + ".specialChange", be[c]);
                    return Z.test(this.nodeName)
                },
                teardown: function(a) {
                    return K.event.remove(this, ".specialChange"), Z.test(this.nodeName)
                }
            }, be = K.event.special.change.filters, be.focus = be.beforeactivate
        }
        K.support.focusinBubbles || K.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            function c(a) {
                var c = K.event.fix(a);
                c.type = b, c.originalEvent = {}, K.event.trigger(c, null, c.target), c.isDefaultPrevented() && a.preventDefault()
            }
            var d = 0;
            K.event.special[b] = {
                setup: function() {
                    d++ === 0 && H.addEventListener(a, c, !0)
                },
                teardown: function() {
                    --d === 0 && H.removeEventListener(a, c, !0)
                }
            }
        }), K.each(["bind", "one"], function(a, c) {
            K.fn[c] = function(a, d, e) {
                var f;
                if (typeof a == "object") {
                    for (var g in a) this[c](g, d, a[g], e);
                    return this
                }
                if (arguments.length === 2 || d === !1) e = d, d = b;
                c === "one" ? (f = function(a) {
                    return K(this).unbind(a, f), e.apply(this, arguments)
                }, f.guid = e.guid || K.guid++) : f = e;
                if (a === "unload" && c !== "one") this.one(a, d, e);
                else
                    for (var h = 0, i = this.length; h < i; h++) K.event.add(this[h], a, f, d);
                return this
            }
        }), K.fn.extend({
            unbind: function(a, b) {
                if (typeof a == "object" && !a.preventDefault)
                    for (var c in a) this.unbind(c, a[c]);
                else
                    for (var d = 0, e = this.length; d < e; d++) K.event.remove(this[d], a, b);
                return this
            },
            delegate: function(a, b, c, d) {
                return this.live(b, c, d, a)
            },
            undelegate: function(a, b, c) {
                return arguments.length === 0 ? this.unbind("live") : this.die(b, null, c, a)
            },
            trigger: function(a, b) {
                return this.each(function() {
                    K.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                if (this[0]) return K.event.trigger(a, b, this[0], !0)
            },
            toggle: function(a) {
                var b = arguments,
                    c = a.guid || K.guid++,
                    d = 0,
                    e = function(c) {
                        var e = (K.data(this, "lastToggle" + a.guid) || 0) % d;
                        return K.data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                    };
                e.guid = c;
                while (d < b.length) b[d++].guid = c;
                return this.click(e)
            },
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        });
        var bh = {
            focus: "focusin",
            blur: "focusout",
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        K.each(["live", "die"], function(a, c) {
                K.fn[c] = function(a, d, e, f) {
                    var g, h = 0,
                        i, j, k, l = f || this.selector,
                        m = f ? this : K(this.context);
                    if (typeof a == "object" && !a.preventDefault) {
                        for (var n in a) m[c](n, d, a[n], l);
                        return this
                    }
                    if (c === "die" && !a && f && f.charAt(0) === ".") return m.unbind(f), this;
                    if (d === !1 || K.isFunction(d)) e = d || D, d = b;
                    a = (a || "").split(" ");
                    while ((g = a[h++]) != null) {
                        i = Y.exec(g), j = "", i && (j = i[0], g = g.replace(Y, ""));
                        if (g === "hover") {
                            a.push("mouseenter" + j, "mouseleave" + j);
                            continue
                        }
                        k = g, bh[g] ? (a.push(bh[g] + j), g = g + j) : g = (bh[g] || g) + j;
                        if (c === "live")
                            for (var o = 0, p = m.length; o < p; o++) K.event.add(m[o], "live." + z(g, l), {
                                data: d,
                                selector: l,
                                handler: e,
                                origType: g,
                                origHandler: e,
                                preType: k
                            });
                        else m.unbind("live." + z(g, l), e)
                    }
                    return this
                }
            }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
                K.fn[b] = function(a, c) {
                    return c == null && (c = a, a = null), arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
                }, K.attrFn && (K.attrFn[b] = !0)
            }),
            function() {
                function a(a, b, c, d, e, f) {
                    for (var g = 0, h = d.length; g < h; g++) {
                        var i = d[g];
                        if (i) {
                            var j = !1;
                            i = i[a];
                            while (i) {
                                if (i.sizcache === c) {
                                    j = d[i.sizset];
                                    break
                                }
                                if (i.nodeType === 1) {
                                    f || (i.sizcache = c, i.sizset = g);
                                    if (typeof b != "string") {
                                        if (i === b) {
                                            j = !0;
                                            break
                                        }
                                    } else if (k.filter(b, [i]).length > 0) {
                                        j = i;
                                        break
                                    }
                                }
                                i = i[a]
                            }
                            d[g] = j
                        }
                    }
                }

                function c(a, b, c, d, e, f) {
                    for (var g = 0, h = d.length; g < h; g++) {
                        var i = d[g];
                        if (i) {
                            var j = !1;
                            i = i[a];
                            while (i) {
                                if (i.sizcache === c) {
                                    j = d[i.sizset];
                                    break
                                }
                                i.nodeType === 1 && !f && (i.sizcache = c, i.sizset = g);
                                if (i.nodeName.toLowerCase() === b) {
                                    j = i;
                                    break
                                }
                                i = i[a]
                            }
                            d[g] = j
                        }
                    }
                }
                var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                    e = 0,
                    f = Object.prototype.toString,
                    g = !1,
                    h = !0,
                    i = /\\/g,
                    j = /\W/;
                [0, 0].sort(function() {
                    return h = !1, 0
                });
                var k = function(a, b, c, e) {
                    c = c || [], b = b || H;
                    var g = b;
                    if (b.nodeType !== 1 && b.nodeType !== 9) return [];
                    if (!a || typeof a != "string") return c;
                    var h, i, j, n, o, q, r, s, u = !0,
                        v = k.isXML(b),
                        w = [],
                        x = a;
                    do {
                        d.exec(""), h = d.exec(x);
                        if (h) {
                            x = h[3], w.push(h[1]);
                            if (h[2]) {
                                n = h[3];
                                break
                            }
                        }
                    } while (h);
                    if (w.length > 1 && m.exec(a))
                        if (w.length === 2 && l.relative[w[0]]) i = t(w[0] + w[1], b);
                        else {
                            i = l.relative[w[0]] ? [b] : k(w.shift(), b);
                            while (w.length) a = w.shift(), l.relative[a] && (a += w.shift()), i = t(a, i)
                        } else {
                        !e && w.length > 1 && b.nodeType === 9 && !v && l.match.ID.test(w[0]) && !l.match.ID.test(w[w.length - 1]) && (o = k.find(w.shift(), b, v), b = o.expr ? k.filter(o.expr, o.set)[0] : o.set[0]);
                        if (b) {
                            o = e ? {
                                expr: w.pop(),
                                set: p(e)
                            } : k.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && b.parentNode ? b.parentNode : b, v), i = o.expr ? k.filter(o.expr, o.set) : o.set, w.length > 0 ? j = p(i) : u = !1;
                            while (w.length) q = w.pop(), r = q, l.relative[q] ? r = w.pop() : q = "", r == null && (r = b), l.relative[q](j, r, v)
                        } else j = w = []
                    }
                    j || (j = i), j || k.error(q || a);
                    if (f.call(j) === "[object Array]")
                        if (!u) c.push.apply(c, j);
                        else if (b && b.nodeType === 1)
                        for (s = 0; j[s] != null; s++) j[s] && (j[s] === !0 || j[s].nodeType === 1 && k.contains(b, j[s])) && c.push(i[s]);
                    else
                        for (s = 0; j[s] != null; s++) j[s] && j[s].nodeType === 1 && c.push(i[s]);
                    else p(j, c);
                    return n && (k(n, g, c, e), k.uniqueSort(c)), c
                };
                k.uniqueSort = function(a) {
                    if (r) {
                        g = h, a.sort(r);
                        if (g)
                            for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
                    }
                    return a
                }, k.matches = function(a, b) {
                    return k(a, null, null, b)
                }, k.matchesSelector = function(a, b) {
                    return k(b, null, null, [a]).length > 0
                }, k.find = function(a, b, c) {
                    var d;
                    if (!a) return [];
                    for (var e = 0, f = l.order.length; e < f; e++) {
                        var g, h = l.order[e];
                        if (g = l.leftMatch[h].exec(a)) {
                            var j = g[1];
                            g.splice(1, 1);
                            if (j.substr(j.length - 1) !== "\\") {
                                g[1] = (g[1] || "").replace(i, ""), d = l.find[h](g, b, c);
                                if (d != null) {
                                    a = a.replace(l.match[h], "");
                                    break
                                }
                            }
                        }
                    }
                    return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                        set: d,
                        expr: a
                    }
                }, k.filter = function(a, c, d, e) {
                    var f, g, h = a,
                        i = [],
                        j = c,
                        m = c && c[0] && k.isXML(c[0]);
                    while (a && c.length) {
                        for (var n in l.filter)
                            if ((f = l.leftMatch[n].exec(a)) != null && f[2]) {
                                var o, p, q = l.filter[n],
                                    r = f[1];
                                g = !1, f.splice(1, 1);
                                if (r.substr(r.length - 1) === "\\") continue;
                                j === i && (i = []);
                                if (l.preFilter[n]) {
                                    f = l.preFilter[n](f, j, d, i, e, m);
                                    if (!f) g = o = !0;
                                    else if (f === !0) continue
                                }
                                if (f)
                                    for (var s = 0;
                                        (p = j[s]) != null; s++)
                                        if (p) {
                                            o = q(p, f, s, j);
                                            var t = e ^ !!o;
                                            d && o != null ? t ? g = !0 : j[s] = !1 : t && (i.push(p), g = !0)
                                        }
                                if (o !== b) {
                                    d || (j = i), a = a.replace(l.match[n], "");
                                    if (!g) return [];
                                    break
                                }
                            }
                        if (a === h)
                            if (g == null) k.error(a);
                            else break;
                        h = a
                    }
                    return j
                }, k.error = function(a) {
                    throw "Syntax error, unrecognized expression: " + a
                };
                var l = k.selectors = {
                        order: ["ID", "NAME", "TAG"],
                        match: {
                            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                            CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                        },
                        leftMatch: {},
                        attrMap: {
                            "class": "className",
                            "for": "htmlFor"
                        },
                        attrHandle: {
                            href: function(a) {
                                return a.getAttribute("href")
                            },
                            type: function(a) {
                                return a.getAttribute("type")
                            }
                        },
                        relative: {
                            "+": function(a, b) {
                                var c = typeof b == "string",
                                    d = c && !j.test(b),
                                    e = c && !d;
                                d && (b = b.toLowerCase());
                                for (var f = 0, g = a.length, h; f < g; f++)
                                    if (h = a[f]) {
                                        while ((h = h.previousSibling) && h.nodeType !== 1);
                                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                    }
                                e && k.filter(b, a, !0)
                            },
                            ">": function(a, b) {
                                var c, d = typeof b == "string",
                                    e = 0,
                                    f = a.length;
                                if (d && !j.test(b)) {
                                    b = b.toLowerCase();
                                    for (; e < f; e++) {
                                        c = a[e];
                                        if (c) {
                                            var g = c.parentNode;
                                            a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                        }
                                    }
                                } else {
                                    for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                    d && k.filter(b, a, !0)
                                }
                            },
                            "": function(b, d, f) {
                                var g, h = e++,
                                    i = a;
                                typeof d == "string" && !j.test(d) && (d = d.toLowerCase(), g = d, i = c), i("parentNode", d, h, b, g, f)
                            },
                            "~": function(b, d, f) {
                                var g, h = e++,
                                    i = a;
                                typeof d == "string" && !j.test(d) && (d = d.toLowerCase(), g = d, i = c), i("previousSibling", d, h, b, g, f)
                            }
                        },
                        find: {
                            ID: function(a, b, c) {
                                if (typeof b.getElementById != "undefined" && !c) {
                                    var d = b.getElementById(a[1]);
                                    return d && d.parentNode ? [d] : []
                                }
                            },
                            NAME: function(a, b) {
                                if (typeof b.getElementsByName != "undefined") {
                                    var c = [],
                                        d = b.getElementsByName(a[1]);
                                    for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                    return c.length === 0 ? null : c
                                }
                            },
                            TAG: function(a, b) {
                                if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                            }
                        },
                        preFilter: {
                            CLASS: function(a, b, c, d, e, f) {
                                a = " " + a[1].replace(i, "") + " ";
                                if (f) return a;
                                for (var g = 0, h;
                                    (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                                return !1
                            },
                            ID: function(a) {
                                return a[1].replace(i, "")
                            },
                            TAG: function(a, b) {
                                return a[1].replace(i, "").toLowerCase()
                            },
                            CHILD: function(a) {
                                if (a[1] === "nth") {
                                    a[2] || k.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                                    var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                    a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                                } else a[2] && k.error(a[0]);
                                return a[0] = e++, a
                            },
                            ATTR: function(a, b, c, d, e, f) {
                                var g = a[1] = a[1].replace(i, "");
                                return !f && l.attrMap[g] && (a[1] = l.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(i, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a
                            },
                            PSEUDO: function(a, b, c, e, f) {
                                if (a[1] === "not")
                                    if ((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3])) a[3] = k(a[3], null, null, b);
                                    else {
                                        var g = k.filter(a[3], b, c, !0 ^ f);
                                        return c || e.push.apply(e, g), !1
                                    } else if (l.match.POS.test(a[0]) || l.match.CHILD.test(a[0])) return !0;
                                return a
                            },
                            POS: function(a) {
                                return a.unshift(!0), a
                            }
                        },
                        filters: {
                            enabled: function(a) {
                                return a.disabled === !1 && a.type !== "hidden"
                            },
                            disabled: function(a) {
                                return a.disabled === !0
                            },
                            checked: function(a) {
                                return a.checked === !0
                            },
                            selected: function(a) {
                                return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                            },
                            parent: function(a) {
                                return !!a.firstChild
                            },
                            empty: function(a) {
                                return !a.firstChild
                            },
                            has: function(a, b, c) {
                                return !!k(c[3], a).length
                            },
                            header: function(a) {
                                return /h\d/i.test(a.nodeName)
                            },
                            text: function(a) {
                                var b = a.getAttribute("type"),
                                    c = a.type;
                                return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                            },
                            radio: function(a) {
                                return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                            },
                            checkbox: function(a) {
                                return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                            },
                            file: function(a) {
                                return a.nodeName.toLowerCase() === "input" && "file" === a.type
                            },
                            password: function(a) {
                                return a.nodeName.toLowerCase() === "input" && "password" === a.type
                            },
                            submit: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return (b === "input" || b === "button") && "submit" === a.type
                            },
                            image: function(a) {
                                return a.nodeName.toLowerCase() === "input" && "image" === a.type
                            },
                            reset: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return (b === "input" || b === "button") && "reset" === a.type
                            },
                            button: function(a) {
                                var b = a.nodeName.toLowerCase();
                                return b === "input" && "button" === a.type || b === "button"
                            },
                            input: function(a) {
                                return /input|select|textarea|button/i.test(a.nodeName)
                            },
                            focus: function(a) {
                                return a === a.ownerDocument.activeElement
                            }
                        },
                        setFilters: {
                            first: function(a, b) {
                                return b === 0
                            },
                            last: function(a, b, c, d) {
                                return b === d.length - 1
                            },
                            even: function(a, b) {
                                return b % 2 === 0
                            },
                            odd: function(a, b) {
                                return b % 2 === 1
                            },
                            lt: function(a, b, c) {
                                return b < c[3] - 0
                            },
                            gt: function(a, b, c) {
                                return b > c[3] - 0
                            },
                            nth: function(a, b, c) {
                                return c[3] - 0 === b
                            },
                            eq: function(a, b, c) {
                                return c[3] - 0 === b
                            }
                        },
                        filter: {
                            PSEUDO: function(a, b, c, d) {
                                var e = b[1],
                                    f = l.filters[e];
                                if (f) return f(a, c, b, d);
                                if (e === "contains") return (a.textContent || a.innerText || k.getText([a]) || "").indexOf(b[3]) >= 0;
                                if (e === "not") {
                                    var g = b[3];
                                    for (var h = 0, i = g.length; h < i; h++)
                                        if (g[h] === a) return !1;
                                    return !0
                                }
                                k.error(e)
                            },
                            CHILD: function(a, b) {
                                var c = b[1],
                                    d = a;
                                switch (c) {
                                    case "only":
                                    case "first":
                                        while (d = d.previousSibling)
                                            if (d.nodeType === 1) return !1;
                                        if (c === "first") return !0;
                                        d = a;
                                    case "last":
                                        while (d = d.nextSibling)
                                            if (d.nodeType === 1) return !1;
                                        return !0;
                                    case "nth":
                                        var e = b[2],
                                            f = b[3];
                                        if (e === 1 && f === 0) return !0;
                                        var g = b[0],
                                            h = a.parentNode;
                                        if (h && (h.sizcache !== g || !a.nodeIndex)) {
                                            var i = 0;
                                            for (d = h.firstChild; d; d = d.nextSibling) d.nodeType === 1 && (d.nodeIndex = ++i);
                                            h.sizcache = g
                                        }
                                        var j = a.nodeIndex - f;
                                        return e === 0 ? j === 0 : j % e === 0 && j / e >= 0
                                }
                            },
                            ID: function(a, b) {
                                return a.nodeType === 1 && a.getAttribute("id") === b
                            },
                            TAG: function(a, b) {
                                return b === "*" && a.nodeType === 1 || a.nodeName.toLowerCase() === b
                            },
                            CLASS: function(a, b) {
                                return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                            },
                            ATTR: function(a, b) {
                                var c = b[1],
                                    d = l.attrHandle[c] ? l.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                                    e = d + "",
                                    f = b[2],
                                    g = b[4];
                                return d == null ? f === "!=" : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                            },
                            POS: function(a, b, c, d) {
                                var e = b[2],
                                    f = l.setFilters[e];
                                if (f) return f(a, c, b, d)
                            }
                        }
                    },
                    m = l.match.POS,
                    n = function(a, b) {
                        return "\\" + (b - 0 + 1)
                    };
                for (var o in l.match) l.match[o] = new RegExp(l.match[o].source + /(?![^\[]*\])(?![^\(]*\))/.source), l.leftMatch[o] = new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[o].source.replace(/\\(\d+)/g, n));
                var p = function(a, b) {
                    return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
                };
                try {
                    Array.prototype.slice.call(H.documentElement.childNodes, 0)[0].nodeType
                } catch (q) {
                    p = function(a, b) {
                        var c = 0,
                            d = b || [];
                        if (f.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                        else if (typeof a.length == "number")
                            for (var e = a.length; c < e; c++) d.push(a[c]);
                        else
                            for (; a[c]; c++) d.push(a[c]);
                        return d
                    }
                }
                var r, s;
                H.documentElement.compareDocumentPosition ? r = function(a, b) {
                        return a === b ? (g = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
                    } : (r = function(a, b) {
                        if (a === b) return g = !0, 0;
                        if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                        var c, d, e = [],
                            f = [],
                            h = a.parentNode,
                            i = b.parentNode,
                            j = h;
                        if (h === i) return s(a, b);
                        if (!h) return -1;
                        if (!i) return 1;
                        while (j) e.unshift(j), j = j.parentNode;
                        j = i;
                        while (j) f.unshift(j), j = j.parentNode;
                        c = e.length, d = f.length;
                        for (var k = 0; k < c && k < d; k++)
                            if (e[k] !== f[k]) return s(e[k], f[k]);
                        return k === c ? s(a, f[k], -1) : s(e[k], b, 1)
                    }, s = function(a, b, c) {
                        if (a === b) return c;
                        var d = a.nextSibling;
                        while (d) {
                            if (d === b) return -1;
                            d = d.nextSibling
                        }
                        return 1
                    }), k.getText = function(a) {
                        var b = "",
                            c;
                        for (var d = 0; a[d]; d++) c = a[d], c.nodeType === 3 || c.nodeType === 4 ? b += c.nodeValue : c.nodeType !== 8 && (b += k.getText(c.childNodes));
                        return b
                    },
                    function() {
                        var a = H.createElement("div"),
                            c = "script" + (new Date).getTime(),
                            d = H.documentElement;
                        a.innerHTML = "<a name='" + c + "'/>", d.insertBefore(a, d.firstChild), H.getElementById(c) && (l.find.ID = function(a, c, d) {
                            if (typeof c.getElementById != "undefined" && !d) {
                                var e = c.getElementById(a[1]);
                                return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                            }
                        }, l.filter.ID = function(a, b) {
                            var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                            return a.nodeType === 1 && c && c.nodeValue === b
                        }), d.removeChild(a), d = a = null
                    }(),
                    function() {
                        var a = H.createElement("div");
                        a.appendChild(H.createComment("")), a.getElementsByTagName("*").length > 0 && (l.find.TAG = function(a, b) {
                            var c = b.getElementsByTagName(a[1]);
                            if (a[1] === "*") {
                                var d = [];
                                for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                                c = d
                            }
                            return c
                        }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (l.attrHandle.href = function(a) {
                            return a.getAttribute("href", 2)
                        }), a = null
                    }(), H.querySelectorAll && function() {
                        var a = k,
                            b = H.createElement("div"),
                            c = "__sizzle__";
                        b.innerHTML = "<p class='TEST'></p>";
                        if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                            k = function(b, d, e, f) {
                                d = d || H;
                                if (!f && !k.isXML(d)) {
                                    var g = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                    if (g && (d.nodeType === 1 || d.nodeType === 9)) {
                                        if (g[1]) return p(d.getElementsByTagName(b), e);
                                        if (g[2] && l.find.CLASS && d.getElementsByClassName) return p(d.getElementsByClassName(g[2]), e)
                                    }
                                    if (d.nodeType === 9) {
                                        if (b === "body" && d.body) return p([d.body], e);
                                        if (g && g[3]) {
                                            var h = d.getElementById(g[3]);
                                            if (!h || !h.parentNode) return p([], e);
                                            if (h.id === g[3]) return p([h], e)
                                        }
                                        try {
                                            return p(d.querySelectorAll(b), e)
                                        } catch (i) {}
                                    } else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                                        var j = d,
                                            m = d.getAttribute("id"),
                                            n = m || c,
                                            o = d.parentNode,
                                            q = /^\s*[+~]/.test(b);
                                        m ? n = n.replace(/'/g, "\\$&") : d.setAttribute("id", n), q && o && (d = d.parentNode);
                                        try {
                                            if (!q || o) return p(d.querySelectorAll("[id='" + n + "'] " + b), e)
                                        } catch (r) {} finally {
                                            m || j.removeAttribute("id")
                                        }
                                    }
                                }
                                return a(b, d, e, f)
                            };
                            for (var d in a) k[d] = a[d];
                            b = null
                        }
                    }(),
                    function() {
                        var a = H.documentElement,
                            b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                        if (b) {
                            var c = !b.call(H.createElement("div"), "div"),
                                d = !1;
                            try {
                                b.call(H.documentElement, "[test!='']:sizzle")
                            } catch (e) {
                                d = !0
                            }
                            k.matchesSelector = function(a, e) {
                                e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                                if (!k.isXML(a)) try {
                                    if (d || !l.match.PSEUDO.test(e) && !/!=/.test(e)) {
                                        var f = b.call(a, e);
                                        if (f || !c || a.document && a.document.nodeType !== 11) return f
                                    }
                                } catch (g) {}
                                return k(e, null, null, [a]).length > 0
                            }
                        }
                    }(),
                    function() {
                        var a = H.createElement("div");
                        a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                        if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                            a.lastChild.className = "e";
                            if (a.getElementsByClassName("e").length === 1) return;
                            l.order.splice(1, 0, "CLASS"), l.find.CLASS = function(a, b, c) {
                                if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                            }, a = null
                        }
                    }(), H.documentElement.contains ? k.contains = function(a, b) {
                        return a !== b && (a.contains ? a.contains(b) : !0)
                    } : H.documentElement.compareDocumentPosition ? k.contains = function(a, b) {
                        return !!(a.compareDocumentPosition(b) & 16)
                    } : k.contains = function() {
                        return !1
                    }, k.isXML = function(a) {
                        var b = (a ? a.ownerDocument || a : 0).documentElement;
                        return b ? b.nodeName !== "HTML" : !1
                    };
                var t = function(a, b) {
                    var c, d = [],
                        e = "",
                        f = b.nodeType ? [b] : b;
                    while (c = l.match.PSEUDO.exec(a)) e += c[0], a = a.replace(l.match.PSEUDO, "");
                    a = l.relative[a] ? a + "*" : a;
                    for (var g = 0, h = f.length; g < h; g++) k(a, f[g], d);
                    return k.filter(e, d)
                };
                K.find = k, K.expr = k.selectors, K.expr[":"] = K.expr.filters, K.unique = k.uniqueSort, K.text = k.getText, K.isXMLDoc = k.isXML, K.contains = k.contains
            }();
        var bi = /Until$/,
            bj = /^(?:parents|prevUntil|prevAll)/,
            bk = /,/,
            bl = /^.[^:#\[\.,]*$/,
            bm = Array.prototype.slice,
            bn = K.expr.match.POS,
            bo = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        K.fn.extend({
            find: function(a) {
                var b = this,
                    c, d;
                if (typeof a != "string") return K(a).filter(function() {
                    for (c = 0, d = b.length; c < d; c++)
                        if (K.contains(b[c], this)) return !0
                });
                var e = this.pushStack("", "find", a),
                    f, g, h;
                for (c = 0, d = this.length; c < d; c++) {
                    f = e.length, K.find(a, this[c], e);
                    if (c > 0)
                        for (g = f; g < e.length; g++)
                            for (h = 0; h < f; h++)
                                if (e[h] === e[g]) {
                                    e.splice(g--, 1);
                                    break
                                }
                }
                return e
            },
            has: function(a) {
                var b = K(a);
                return this.filter(function() {
                    for (var a = 0, c = b.length; a < c; a++)
                        if (K.contains(this, b[a])) return !0
                })
            },
            not: function(a) {
                return this.pushStack(x(this, a, !1), "not", a)
            },
            filter: function(a) {
                return this.pushStack(x(this, a, !0), "filter", a)
            },
            is: function(a) {
                return !!a && (typeof a == "string" ? K.filter(a, this).length > 0 : this.filter(a).length > 0)
            },
            closest: function(a, b) {
                var c = [],
                    d, e, f = this[0];
                if (K.isArray(a)) {
                    var g, h, i = {},
                        j = 1;
                    if (f && a.length) {
                        for (d = 0, e = a.length; d < e; d++) h = a[d], i[h] || (i[h] = bn.test(h) ? K(h, b || this.context) : h);
                        while (f && f.ownerDocument && f !== b) {
                            for (h in i) g = i[h], (g.jquery ? g.index(f) > -1 : K(f).is(g)) && c.push({
                                selector: h,
                                elem: f,
                                level: j
                            });
                            f = f.parentNode, j++
                        }
                    }
                    return c
                }
                var k = bn.test(a) || typeof a != "string" ? K(a, b || this.context) : 0;
                for (d = 0, e = this.length; d < e; d++) {
                    f = this[d];
                    while (f) {
                        if (k ? k.index(f) > -1 : K.find.matchesSelector(f, a)) {
                            c.push(f);
                            break
                        }
                        f = f.parentNode;
                        if (!f || !f.ownerDocument || f === b || f.nodeType === 11) break
                    }
                }
                return c = c.length > 1 ? K.unique(c) : c, this.pushStack(c, "closest", a)
            },
            index: function(a) {
                return a ? typeof a == "string" ? K.inArray(this[0], K(a)) : K.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
            },
            add: function(a, b) {
                var c = typeof a == "string" ? K(a, b) : K.makeArray(a && a.nodeType ? [a] : a),
                    d = K.merge(this.get(), c);
                return this.pushStack(y(c[0]) || y(d[0]) ? d : K.unique(d))
            },
            andSelf: function() {
                return this.add(this.prevObject)
            }
        }), K.each({
            parent: function(a) {
                var b = a.parentNode;
                return b && b.nodeType !== 11 ? b : null
            },
            parents: function(a) {
                return K.dir(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return K.dir(a, "parentNode", c)
            },
            next: function(a) {
                return K.nth(a, 2, "nextSibling")
            },
            prev: function(a) {
                return K.nth(a, 2, "previousSibling")
            },
            nextAll: function(a) {
                return K.dir(a, "nextSibling")
            },
            prevAll: function(a) {
                return K.dir(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return K.dir(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return K.dir(a, "previousSibling", c)
            },
            siblings: function(a) {
                return K.sibling(a.parentNode.firstChild, a)
            },
            children: function(a) {
                return K.sibling(a.firstChild)
            },
            contents: function(a) {
                return K.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : K.makeArray(a.childNodes)
            }
        }, function(a, b) {
            K.fn[a] = function(c, d) {
                var e = K.map(this, b, c),
                    f = bm.call(arguments);
                return bi.test(a) || (d = c), d && typeof d == "string" && (e = K.filter(d, e)), e = this.length > 1 && !bo[a] ? K.unique(e) : e, (this.length > 1 || bk.test(d)) && bj.test(a) && (e = e.reverse()), this.pushStack(e, a, f.join(","))
            }
        }), K.extend({
            filter: function(a, b, c) {
                return c && (a = ":not(" + a + ")"), b.length === 1 ? K.find.matchesSelector(b[0], a) ? [b[0]] : [] : K.find.matches(a, b)
            },
            dir: function(a, c, d) {
                var e = [],
                    f = a[c];
                while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !K(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c];
                return e
            },
            nth: function(a, b, c, d) {
                b = b || 1;
                var e = 0;
                for (; a; a = a[c])
                    if (a.nodeType === 1 && ++e === b) break;
                return a
            },
            sibling: function(a, b) {
                var c = [];
                for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
                return c
            }
        });
        var bp = / jQuery\d+="(?:\d+|null)"/g,
            bq = /^\s+/,
            br = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            bs = /<([\w:]+)/,
            bt = /<tbody/i,
            bu = /<|&#?\w+;/,
            bv = /<(?:script|object|embed|option|style)/i,
            bw = /checked\s*(?:[^=]|=\s*.checked.)/i,
            bx = /\/(java|ecma)script/i,
            by = /^\s*<!(?:\[CDATA\[|\-\-)/,
            bz = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                area: [1, "<map>", "</map>"],
                _default: [0, "", ""]
            };
        bz.optgroup = bz.option, bz.tbody = bz.tfoot = bz.colgroup = bz.caption = bz.thead, bz.th = bz.td, K.support.htmlSerialize || (bz._default = [1, "div<div>", "</div>"]), K.fn.extend({
            text: function(a) {
                return K.isFunction(a) ? this.each(function(b) {
                    var c = K(this);
                    c.text(a.call(this, b, c.text()))
                }) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || H).createTextNode(a)) : K.text(this)
            },
            wrapAll: function(a) {
                if (K.isFunction(a)) return this.each(function(b) {
                    K(this).wrapAll(a.call(this, b))
                });
                if (this[0]) {
                    var b = K(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                        var a = this;
                        while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            },
            wrapInner: function(a) {
                return K.isFunction(a) ? this.each(function(b) {
                    K(this).wrapInner(a.call(this, b))
                }) : this.each(function() {
                    var b = K(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                return this.each(function() {
                    K(this).wrapAll(a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(a) {
                    this.nodeType === 1 && this.appendChild(a)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(a) {
                    this.nodeType === 1 && this.insertBefore(a, this.firstChild)
                })
            },
            before: function() {
                if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this)
                });
                if (arguments.length) {
                    var a = K(arguments[0]);
                    return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
                }
            },
            after: function() {
                if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
                if (arguments.length) {
                    var a = this.pushStack(this, "after", arguments);
                    return a.push.apply(a, K(arguments[0]).toArray()), a
                }
            },
            remove: function(a, b) {
                for (var c = 0, d;
                    (d = this[c]) != null; c++)
                    if (!a || K.filter(a, [d]).length) !b && d.nodeType === 1 && (K.cleanData(d.getElementsByTagName("*")), K.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
                return this
            },
            empty: function() {
                for (var a = 0, b;
                    (b = this[a]) != null; a++) {
                    b.nodeType === 1 && K.cleanData(b.getElementsByTagName("*"));
                    while (b.firstChild) b.removeChild(b.firstChild)
                }
                return this
            },
            clone: function(a, b) {
                return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                    return K.clone(this, a, b)
                })
            },
            html: function(a) {
                if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(bp, "") : null;
                if (typeof a == "string" && !bv.test(a) && (K.support.leadingWhitespace || !bq.test(a)) && !bz[(bs.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(br, "<$1></$2>");
                    try {
                        for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (K.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                    } catch (e) {
                        this.empty().append(a)
                    }
                } else K.isFunction(a) ? this.each(function(b) {
                    var c = K(this);
                    c.html(a.call(this, b, c.html()))
                }) : this.empty().append(a);
                return this
            },
            replaceWith: function(a) {
                return this[0] && this[0].parentNode ? K.isFunction(a) ? this.each(function(b) {
                    var c = K(this),
                        d = c.html();
                    c.replaceWith(a.call(this, b, d))
                }) : (typeof a != "string" && (a = K(a).detach()), this.each(function() {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    K(this).remove(), b ? K(b).before(a) : K(c).append(a)
                })) : this.length ? this.pushStack(K(K.isFunction(a) ? a() : a), "replaceWith", a) : this
            },
            detach: function(a) {
                return this.remove(a, !0)
            },
            domManip: function(a, c, d) {
                var e, f, g, h, i = a[0],
                    j = [];
                if (!K.support.checkClone && arguments.length === 3 && typeof i == "string" && bw.test(i)) return this.each(function() {
                    K(this).domManip(a, c, d, !0)
                });
                if (K.isFunction(i)) return this.each(function(e) {
                    var f = K(this);
                    a[0] = i.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
                });
                if (this[0]) {
                    h = i && i.parentNode, K.support.parentNode && h && h.nodeType === 11 && h.childNodes.length === this.length ? e = {
                        fragment: h
                    } : e = K.buildFragment(a, this, j), g = e.fragment, g.childNodes.length === 1 ? f = g = g.firstChild : f = g.firstChild;
                    if (f) {
                        c = c && K.nodeName(f, "tr");
                        for (var k = 0, l = this.length, m = l - 1; k < l; k++) d.call(c ? w(this[k], f) : this[k], e.cacheable || l > 1 && k < m ? K.clone(g, !0, !0) : g)
                    }
                    j.length && K.each(j, q)
                }
                return this
            }
        }), K.buildFragment = function(a, b, c) {
            var d, e, f, g;
            return b && b[0] && (g = b[0].ownerDocument || b[0]), g.createDocumentFragment || (g = H), a.length === 1 && typeof a[0] == "string" && a[0].length < 512 && g === H && a[0].charAt(0) === "<" && !bv.test(a[0]) && (K.support.checkClone || !bw.test(a[0])) && (e = !0, f = K.fragments[a[0]], f && f !== 1 && (d = f)), d || (d = g.createDocumentFragment(), K.clean(a, g, d, c)), e && (K.fragments[a[0]] = f ? d : 1), {
                fragment: d,
                cacheable: e
            }
        }, K.fragments = {}, K.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            K.fn[a] = function(c) {
                var d = [],
                    e = K(c),
                    f = this.length === 1 && this[0].parentNode;
                if (f && f.nodeType === 11 && f.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
                for (var g = 0, h = e.length; g < h; g++) {
                    var i = (g > 0 ? this.clone(!0) : this).get();
                    K(e[g])[b](i), d = d.concat(i)
                }
                return this.pushStack(d, a, e.selector)
            }
        }), K.extend({
            clone: function(a, b, c) {
                var d = a.cloneNode(!0),
                    e, f, g;
                if ((!K.support.noCloneEvent || !K.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !K.isXMLDoc(a)) {
                    u(a, d), e = t(a), f = t(d);
                    for (g = 0; e[g]; ++g) f[g] && u(e[g], f[g])
                }
                if (b) {
                    v(a, d);
                    if (c) {
                        e = t(a), f = t(d);
                        for (g = 0; e[g]; ++g) v(e[g], f[g])
                    }
                }
                return e = f = null, d
            },
            clean: function(a, b, c, d) {
                var e;
                b = b || H, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || H);
                var f = [],
                    g;
                for (var h = 0, i;
                    (i = a[h]) != null; h++) {
                    typeof i == "number" && (i += "");
                    if (!i) continue;
                    if (typeof i == "string")
                        if (!bu.test(i)) i = b.createTextNode(i);
                        else {
                            i = i.replace(br, "<$1></$2>");
                            var j = (bs.exec(i) || ["", ""])[1].toLowerCase(),
                                k = bz[j] || bz._default,
                                l = k[0],
                                m = b.createElement("div");
                            m.innerHTML = k[1] + i + k[2];
                            while (l--) m = m.lastChild;
                            if (!K.support.tbody) {
                                var n = bt.test(i),
                                    o = j === "table" && !n ? m.firstChild && m.firstChild.childNodes : k[1] === "<table>" && !n ? m.childNodes : [];
                                for (g = o.length - 1; g >= 0; --g) K.nodeName(o[g], "tbody") && !o[g].childNodes.length && o[g].parentNode.removeChild(o[g])
                            }!K.support.leadingWhitespace && bq.test(i) && m.insertBefore(b.createTextNode(bq.exec(i)[0]), m.firstChild), i = m.childNodes
                        }
                    var p;
                    if (!K.support.appendChecked)
                        if (i[0] && typeof(p = i.length) == "number")
                            for (g = 0; g < p; g++) r(i[g]);
                        else r(i);
                    i.nodeType ? f.push(i) : f = K.merge(f, i)
                }
                if (c) {
                    e = function(a) {
                        return !a.type || bx.test(a.type)
                    };
                    for (h = 0; f[h]; h++)
                        if (d && K.nodeName(f[h], "script") && (!f[h].type || f[h].type.toLowerCase() === "text/javascript")) d.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]);
                        else {
                            if (f[h].nodeType === 1) {
                                var q = K.grep(f[h].getElementsByTagName("script"), e);
                                f.splice.apply(f, [h + 1, 0].concat(q))
                            }
                            c.appendChild(f[h])
                        }
                }
                return f
            },
            cleanData: function(a) {
                var b, c, d = K.cache,
                    e = K.expando,
                    f = K.event.special,
                    g = K.support.deleteExpando;
                for (var h = 0, i;
                    (i = a[h]) != null; h++) {
                    if (i.nodeName && K.noData[i.nodeName.toLowerCase()]) continue;
                    c = i[K.expando];
                    if (c) {
                        b = d[c] && d[c][e];
                        if (b && b.events) {
                            for (var j in b.events) f[j] ? K.event.remove(i, j) : K.removeEvent(i, j, b.handle);
                            b.handle && (b.handle.elem = null)
                        }
                        g ? delete i[K.expando] : i.removeAttribute && i.removeAttribute(K.expando), delete d[c]
                    }
                }
            }
        });
        var bA = /alpha\([^)]*\)/i,
            bB = /opacity=([^)]*)/,
            bC = /([A-Z]|^ms)/g,
            bD = /^-?\d+(?:px)?$/i,
            bE = /^-?\d/,
            bF = /^([\-+])=([\-+.\de]+)/,
            bG = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            bH = ["Left", "Right"],
            bI = ["Top", "Bottom"],
            bJ, bK, bL;
        K.fn.css = function(a, c) {
            return arguments.length === 2 && c === b ? this : K.access(this, a, c, !0, function(a, c, d) {
                return d !== b ? K.style(a, c, d) : K.css(a, c)
            })
        }, K.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = bJ(a, "opacity", "opacity");
                            return c === "" ? "1" : c
                        }
                        return a.style.opacity
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": K.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(a, c, d, e) {
                if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                    var f, g, h = K.camelCase(c),
                        i = a.style,
                        j = K.cssHooks[h];
                    c = K.cssProps[h] || h;
                    if (d === b) return j && "get" in j && (f = j.get(a, !1, e)) !== b ? f : i[c];
                    g = typeof d, g === "string" && (f = bF.exec(d)) && (d = +(f[1] + 1) * +f[2] + parseFloat(K.css(a, c)), g = "number");
                    if (d == null || g === "number" && isNaN(d)) return;
                    g === "number" && !K.cssNumber[h] && (d += "px");
                    if (!j || !("set" in j) || (d = j.set(a, d)) !== b) try {
                        i[c] = d
                    } catch (k) {}
                }
            },
            css: function(a, c, d) {
                var e, f;
                c = K.camelCase(c), f = K.cssHooks[c], c = K.cssProps[c] || c, c === "cssFloat" && (c = "float");
                if (f && "get" in f && (e = f.get(a, !0, d)) !== b) return e;
                if (bJ) return bJ(a, c)
            },
            swap: function(a, b, c) {
                var d = {};
                for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
                c.call(a);
                for (e in b) a.style[e] = d[e]
            }
        }), K.curCSS = K.css, K.each(["height", "width"], function(a, b) {
            K.cssHooks[b] = {
                get: function(a, c, d) {
                    var e;
                    if (c) return a.offsetWidth !== 0 ? p(a, b, d) : (K.swap(a, bG, function() {
                        e = p(a, b, d)
                    }), e)
                },
                set: function(a, b) {
                    if (!bD.test(b)) return b;
                    b = parseFloat(b);
                    if (b >= 0) return b + "px"
                }
            }
        }), K.support.opacity || (K.cssHooks.opacity = {
            get: function(a, b) {
                return bB.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
            },
            set: function(a, b) {
                var c = a.style,
                    d = a.currentStyle,
                    e = K.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1;
                if (b >= 1 && K.trim(f.replace(bA, "")) === "") {
                    c.removeAttribute("filter");
                    if (d && !d.filter) return
                }
                c.filter = bA.test(f) ? f.replace(bA, e) : f + " " + e
            }
        }), K(function() {
            K.support.reliableMarginRight || (K.cssHooks.marginRight = {
                get: function(a, b) {
                    var c;
                    return K.swap(a, {
                        display: "inline-block"
                    }, function() {
                        b ? c = bJ(a, "margin-right", "marginRight") : c = a.style.marginRight
                    }), c
                }
            })
        }), H.defaultView && H.defaultView.getComputedStyle && (bK = function(a, c) {
            var d, e, f;
            c = c.replace(bC, "-$1").toLowerCase();
            if (!(e = a.ownerDocument.defaultView)) return b;
            if (f = e.getComputedStyle(a, null)) d = f.getPropertyValue(c), d === "" && !K.contains(a.ownerDocument.documentElement, a) && (d = K.style(a, c));
            return d
        }), H.documentElement.currentStyle && (bL = function(a, b) {
            var c, d = a.currentStyle && a.currentStyle[b],
                e = a.runtimeStyle && a.runtimeStyle[b],
                f = a.style;
            return !bD.test(d) && bE.test(d) && (c = f.left, e && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : d || 0, d = f.pixelLeft + "px", f.left = c, e && (a.runtimeStyle.left = e)), d === "" ? "auto" : d
        }), bJ = bK || bL, K.expr && K.expr.filters && (K.expr.filters.hidden = function(a) {
            var b = a.offsetWidth,
                c = a.offsetHeight;
            return b === 0 && c === 0 || !K.support.reliableHiddenOffsets && (a.style.display || K.css(a, "display")) === "none"
        }, K.expr.filters.visible = function(a) {
            return !K.expr.filters.hidden(a)
        });
        var bM = /%20/g,
            bN = /\[\]$/,
            bO = /\r?\n/g,
            bP = /#.*$/,
            bQ = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
            bR = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
            bS = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
            bT = /^(?:GET|HEAD)$/,
            bU = /^\/\//,
            bV = /\?/,
            bW = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            bX = /^(?:select|textarea)/i,
            bY = /\s+/,
            bZ = /([?&])_=[^&]*/,
            b$ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
            b_ = K.fn.load,
            ca = {},
            cb = {},
            cc, cd, ce = ["*/"] + ["*"];
        try {
            cc = J.href
        } catch (cf) {
            cc = H.createElement("a"), cc.href = "", cc = cc.href
        }
        cd = b$.exec(cc.toLowerCase()) || [], K.fn.extend({
            load: function(a, c, d) {
                if (typeof a != "string" && b_) return b_.apply(this, arguments);
                if (!this.length) return this;
                var e = a.indexOf(" ");
                if (e >= 0) {
                    var f = a.slice(e, a.length);
                    a = a.slice(0, e)
                }
                var g = "GET";
                c && (K.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = K.param(c, K.ajaxSettings.traditional), g = "POST"));
                var h = this;
                return K.ajax({
                    url: a,
                    type: g,
                    dataType: "html",
                    data: c,
                    complete: function(a, b, c) {
                        c = a.responseText, a.isResolved() && (a.done(function(a) {
                            c = a
                        }), h.html(f ? K("<div>").append(c.replace(bW, "")).find(f) : c)), d && h.each(d, [c, b, a])
                    }
                }), this
            },
            serialize: function() {
                return K.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    return this.elements ? K.makeArray(this.elements) : this
                }).filter(function() {
                    return this.name && !this.disabled && (this.checked || bX.test(this.nodeName) || bR.test(this.type))
                }).map(function(a, b) {
                    var c = K(this).val();
                    return c == null ? null : K.isArray(c) ? K.map(c, function(a, c) {
                        return {
                            name: b.name,
                            value: a.replace(bO, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(bO, "\r\n")
                    }
                }).get()
            }
        }), K.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
            K.fn[b] = function(a) {
                return this.bind(b, a)
            }
        }), K.each(["get", "post"], function(a, c) {
            K[c] = function(a, d, e, f) {
                return K.isFunction(d) && (f = f || e, e = d, d = b), K.ajax({
                    type: c,
                    url: a,
                    data: d,
                    success: e,
                    dataType: f
                })
            }
        }), K.extend({
            getScript: function(a, c) {
                return K.get(a, b, c, "script")
            },
            getJSON: function(a, b, c) {
                return K.get(a, b, c, "json")
            },
            ajaxSetup: function(a, b) {
                return b ? m(a, K.ajaxSettings) : (b = a, a = K.ajaxSettings), m(a, b), a
            },
            ajaxSettings: {
                url: cc,
                isLocal: bS.test(cd[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": ce
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": a.String,
                    "text html": !0,
                    "text json": K.parseJSON,
                    "text xml": K.parseXML
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            },
            ajaxPrefilter: o(ca),
            ajaxTransport: o(cb),
            ajax: function(a, c) {
                function d(a, c, d, n) {
                    if (v !== 2) {
                        v = 2, t && clearTimeout(t), s = b, q = n || "", y.readyState = a > 0 ? 4 : 0;
                        var o, p, r, u = c,
                            x = d ? k(e, y, d) : b,
                            z, A;
                        if (a >= 200 && a < 300 || a === 304) {
                            if (e.ifModified) {
                                if (z = y.getResponseHeader("Last-Modified")) K.lastModified[m] = z;
                                if (A = y.getResponseHeader("Etag")) K.etag[m] = A
                            }
                            if (a === 304) u = "notmodified", o = !0;
                            else try {
                                p = j(e, x), u = "success", o = !0
                            } catch (B) {
                                u = "parsererror", r = B
                            }
                        } else {
                            r = u;
                            if (!u || a) u = "error", a < 0 && (a = 0)
                        }
                        y.status = a, y.statusText = "" + (c || u), o ? h.resolveWith(f, [p, u, y]) : h.rejectWith(f, [y, u, r]), y.statusCode(l), l = b, w && g.trigger("ajax" + (o ? "Success" : "Error"), [y, e, o ? p : r]), i.resolveWith(f, [y, u]), w && (g.trigger("ajaxComplete", [y, e]), --K.active || K.event.trigger("ajaxStop"))
                    }
                }
                typeof a == "object" && (c = a, a = b), c = c || {};
                var e = K.ajaxSetup({}, c),
                    f = e.context || e,
                    g = f !== e && (f.nodeType || f instanceof K) ? K(f) : K.event,
                    h = K.Deferred(),
                    i = K._Deferred(),
                    l = e.statusCode || {},
                    m, o = {},
                    p = {},
                    q, r, s, t, u, v = 0,
                    w, x, y = {
                        readyState: 0,
                        setRequestHeader: function(a, b) {
                            if (!v) {
                                var c = a.toLowerCase();
                                a = p[c] = p[c] || a, o[a] = b
                            }
                            return this
                        },
                        getAllResponseHeaders: function() {
                            return v === 2 ? q : null
                        },
                        getResponseHeader: function(a) {
                            var c;
                            if (v === 2) {
                                if (!r) {
                                    r = {};
                                    while (c = bQ.exec(q)) r[c[1].toLowerCase()] = c[2]
                                }
                                c = r[a.toLowerCase()]
                            }
                            return c === b ? null : c
                        },
                        overrideMimeType: function(a) {
                            return v || (e.mimeType = a), this
                        },
                        abort: function(a) {
                            return a = a || "abort", s && s.abort(a), d(0, a), this
                        }
                    };
                h.promise(y), y.success = y.done, y.error = y.fail, y.complete = i.done, y.statusCode = function(a) {
                    if (a) {
                        var b;
                        if (v < 2)
                            for (b in a) l[b] = [l[b], a[b]];
                        else b = a[y.status], y.then(b, b)
                    }
                    return this
                }, e.url = ((a || e.url) + "").replace(bP, "").replace(bU, cd[1] + "//"), e.dataTypes = K.trim(e.dataType || "*").toLowerCase().split(bY), e.crossDomain == null && (u = b$.exec(e.url.toLowerCase()), e.crossDomain = !(!u || u[1] == cd[1] && u[2] == cd[2] && (u[3] || (u[1] === "http:" ? 80 : 443)) == (cd[3] || (cd[1] === "http:" ? 80 : 443)))), e.data && e.processData && typeof e.data != "string" && (e.data = K.param(e.data, e.traditional)), n(ca, e, c, y);
                if (v === 2) return !1;
                w = e.global, e.type = e.type.toUpperCase(), e.hasContent = !bT.test(e.type), w && K.active++ === 0 && K.event.trigger("ajaxStart");
                if (!e.hasContent) {
                    e.data && (e.url += (bV.test(e.url) ? "&" : "?") + e.data, delete e.data), m = e.url;
                    if (e.cache === !1) {
                        var z = K.now(),
                            A = e.url.replace(bZ, "$1_=" + z);
                        e.url = A + (A === e.url ? (bV.test(e.url) ? "&" : "?") + "_=" + z : "")
                    }
                }(e.data && e.hasContent && e.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", e.contentType), e.ifModified && (m = m || e.url, K.lastModified[m] && y.setRequestHeader("If-Modified-Since", K.lastModified[m]), K.etag[m] && y.setRequestHeader("If-None-Match", K.etag[m])), y.setRequestHeader("Accept", e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + (e.dataTypes[0] !== "*" ? ", " + ce + "; q=0.01" : "") : e.accepts["*"]);
                for (x in e.headers) y.setRequestHeader(x, e.headers[x]);
                if (!e.beforeSend || e.beforeSend.call(f, y, e) !== !1 && v !== 2) {
                    for (x in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) y[x](e[x]);
                    s = n(cb, e, c, y);
                    if (!s) d(-1, "No Transport");
                    else {
                        y.readyState = 1, w && g.trigger("ajaxSend", [y, e]), e.async && e.timeout > 0 && (t = setTimeout(function() {
                            y.abort("timeout")
                        }, e.timeout));
                        try {
                            v = 1, s.send(o, d)
                        } catch (B) {
                            v < 2 ? d(-1, B) : K.error(B)
                        }
                    }
                    return y
                }
                return y.abort(), !1
            },
            param: function(a, c) {
                var d = [],
                    e = function(a, b) {
                        b = K.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                c === b && (c = K.ajaxSettings.traditional);
                if (K.isArray(a) || a.jquery && !K.isPlainObject(a)) K.each(a, function() {
                    e(this.name, this.value)
                });
                else
                    for (var f in a) l(f, a[f], c, e);
                return d.join("&").replace(bM, "+")
            }
        }), K.extend({
            active: 0,
            lastModified: {},
            etag: {}
        });
        var cg = K.now(),
            ch = /(\=)\?(&|$)|\?\?/i;
        K.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                return K.expando + "_" + cg++
            }
        }), K.ajaxPrefilter("json jsonp", function(b, c, d) {
            var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
            if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ch.test(b.url) || e && ch.test(b.data))) {
                var f, g = b.jsonpCallback = K.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                    h = a[g],
                    i = b.url,
                    j = b.data,
                    k = "$1" + g + "$2";
                return b.jsonp !== !1 && (i = i.replace(ch, k), b.url === i && (e && (j = j.replace(ch, k)), b.data === j && (i += (/\?/.test(i) ? "&" : "?") + b.jsonp + "=" + g))), b.url = i, b.data = j, a[g] = function(a) {
                    f = [a]
                }, d.always(function() {
                    a[g] = h, f && K.isFunction(h) && a[g](f[0])
                }), b.converters["script json"] = function() {
                    return f || K.error(g + " was not called"), f[0]
                }, b.dataTypes[0] = "json", "script"
            }
        }), K.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function(a) {
                    return K.globalEval(a), a
                }
            }
        }), K.ajaxPrefilter("script", function(a) {
            a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), K.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var c, d = H.head || H.getElementsByTagName("head")[0] || H.documentElement;
                return {
                    send: function(e, f) {
                        c = H.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, e) {
                            if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success")
                        }, d.insertBefore(c, d.firstChild)
                    },
                    abort: function() {
                        c && c.onload(0, 1)
                    }
                }
            }
        });
        var ci = a.ActiveXObject ? function() {
                for (var a in ck) ck[a](0, 1)
            } : !1,
            cj = 0,
            ck;
        K.ajaxSettings.xhr = a.ActiveXObject ? function() {
                return !this.isLocal && i() || h()
            } : i,
            function(a) {
                K.extend(K.support, {
                    ajax: !!a,
                    cors: !!a && "withCredentials" in a
                })
            }(K.ajaxSettings.xhr()), K.support.ajax && K.ajaxTransport(function(c) {
                if (!c.crossDomain || K.support.cors) {
                    var d;
                    return {
                        send: function(e, f) {
                            var g = c.xhr(),
                                h, i;
                            c.username ? g.open(c.type, c.url, c.async, c.username, c.password) : g.open(c.type, c.url, c.async);
                            if (c.xhrFields)
                                for (i in c.xhrFields) g[i] = c.xhrFields[i];
                            c.mimeType && g.overrideMimeType && g.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                            try {
                                for (i in e) g.setRequestHeader(i, e[i])
                            } catch (j) {}
                            g.send(c.hasContent && c.data || null), d = function(a, e) {
                                var i, j, k, l, m;
                                try {
                                    if (d && (e || g.readyState === 4)) {
                                        d = b, h && (g.onreadystatechange = K.noop, ci && delete ck[h]);
                                        if (e) g.readyState !== 4 && g.abort();
                                        else {
                                            i = g.status, k = g.getAllResponseHeaders(), l = {}, m = g.responseXML, m && m.documentElement && (l.xml = m), l.text = g.responseText;
                                            try {
                                                j = g.statusText
                                            } catch (n) {
                                                j = ""
                                            }!i && c.isLocal && !c.crossDomain ? i = l.text ? 200 : 404 : i === 1223 && (i = 204)
                                        }
                                    }
                                } catch (o) {
                                    e || f(-1, o)
                                }
                                l && f(i, j, l, k)
                            }, !c.async || g.readyState === 4 ? d() : (h = ++cj, ci && (ck || (ck = {}, K(a).unload(ci)), ck[h] = d), g.onreadystatechange = d)
                        },
                        abort: function() {
                            d && d(0, 1)
                        }
                    }
                }
            });
        var cl = {},
            cm, cn, co = /^(?:toggle|show|hide)$/,
            cp = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
            cq, cr = [
                ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                ["opacity"]
            ],
            cs;
        K.fn.extend({
            show: function(a, b, c) {
                var f, g;
                if (a || a === 0) return this.animate(e("show", 3), a, b, c);
                for (var h = 0, i = this.length; h < i; h++) f = this[h], f.style && (g = f.style.display, !K._data(f, "olddisplay") && g === "none" && (g = f.style.display = ""), g === "" && K.css(f, "display") === "none" && K._data(f, "olddisplay", d(f.nodeName)));
                for (h = 0; h < i; h++) {
                    f = this[h];
                    if (f.style) {
                        g = f.style.display;
                        if (g === "" || g === "none") f.style.display = K._data(f, "olddisplay") || ""
                    }
                }
                return this
            },
            hide: function(a, b, c) {
                if (a || a === 0) return this.animate(e("hide", 3), a, b, c);
                for (var d = 0, f = this.length; d < f; d++)
                    if (this[d].style) {
                        var g = K.css(this[d], "display");
                        g !== "none" && !K._data(this[d], "olddisplay") && K._data(this[d], "olddisplay", g)
                    }
                for (d = 0; d < f; d++) this[d].style && (this[d].style.display = "none");
                return this
            },
            _toggle: K.fn.toggle,
            toggle: function(a, b, c) {
                var d = typeof a == "boolean";
                return K.isFunction(a) && K.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                    var b = d ? a : K(this).is(":hidden");
                    K(this)[b ? "show" : "hide"]()
                }) : this.animate(e("toggle", 3), a, b, c), this
            },
            fadeTo: function(a, b, c, d) {
                return this.filter(":hidden").css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, e) {
                var f = K.speed(b, c, e);
                return K.isEmptyObject(a) ? this.each(f.complete, [!1]) : (a = K.extend({}, a), this[f.queue === !1 ? "each" : "queue"](function() {
                    f.queue === !1 && K._mark(this);
                    var b = K.extend({}, f),
                        c = this.nodeType === 1,
                        e = c && K(this).is(":hidden"),
                        g, h, i, j, k, l, m, n, o;
                    b.animatedProperties = {};
                    for (i in a) {
                        g = K.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], K.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                        if (h === "hide" && e || h === "show" && !e) return b.complete.call(this);
                        c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], K.css(this, "display") === "inline" && K.css(this, "float") === "none" && (K.support.inlineBlockNeedsLayout ? (j = d(this.nodeName), j === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1)) : this.style.display = "inline-block"))
                    }
                    b.overflow != null && (this.style.overflow = "hidden");
                    for (i in a) k = new K.fx(this, b, i), h = a[i], co.test(h) ? k[h === "toggle" ? e ? "show" : "hide" : h]() : (l = cp.exec(h), m = k.cur(), l ? (n = parseFloat(l[2]), o = l[3] || (K.cssNumber[i] ? "" : "px"), o !== "px" && (K.style(this, i, (n || 1) + o), m = (n || 1) / k.cur() * m, K.style(this, i, m + o)), l[1] && (n = (l[1] === "-=" ? -1 : 1) * n + m), k.custom(m, n, o)) : k.custom(m, h, ""));
                    return !0
                }))
            },
            stop: function(a, b) {
                return a && this.queue([]), this.each(function() {
                    var a = K.timers,
                        c = a.length;
                    b || K._unmark(!0, this);
                    while (c--) a[c].elem === this && (b && a[c](!0), a.splice(c, 1))
                }), b || this.dequeue(), this
            }
        }), K.each({
            slideDown: e("show", 1),
            slideUp: e("hide", 1),
            slideToggle: e("toggle", 1),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            K.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), K.extend({
            speed: function(a, b, c) {
                var d = a && typeof a == "object" ? K.extend({}, a) : {
                    complete: c || !c && b || K.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !K.isFunction(b) && b
                };
                return d.duration = K.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in K.fx.speeds ? K.fx.speeds[d.duration] : K.fx.speeds._default, d.old = d.complete, d.complete = function(a) {
                    K.isFunction(d.old) && d.old.call(this), d.queue !== !1 ? K.dequeue(this) : a !== !1 && K._unmark(this)
                }, d
            },
            easing: {
                linear: function(a, b, c, d) {
                    return c + d * a
                },
                swing: function(a, b, c, d) {
                    return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
                }
            },
            timers: [],
            fx: function(a, b, c) {
                this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
            }
        }), K.fx.prototype = {
            update: function() {
                this.options.step && this.options.step.call(this.elem, this.now, this), (K.fx.step[this.prop] || K.fx.step._default)(this)
            },
            cur: function() {
                if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
                    var a, b = K.css(this.elem, this.prop);
                    return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
                }
                return this.elem[this.prop]
            },
            custom: function(a, b, c) {
                function d(a) {
                    return e.step(a)
                }
                var e = this,
                    f = K.fx;
                this.startTime = cs || g(), this.start = a, this.end = b, this.unit = c || this.unit || (K.cssNumber[this.prop] ? "" : "px"), this.now = this.start, this.pos = this.state = 0, d.elem = this.elem, d() && K.timers.push(d) && !cq && (cq = setInterval(f.tick, f.interval))
            },
            show: function() {
                this.options.orig[this.prop] = K.style(this.elem, this.prop), this.options.show = !0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), K(this.elem).show()
            },
            hide: function() {
                this.options.orig[this.prop] = K.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
            },
            step: function(a) {
                var b = cs || g(),
                    c = !0,
                    d = this.elem,
                    e = this.options,
                    f, h;
                if (a || b >= e.duration + this.startTime) {
                    this.now = this.end, this.pos = this.state = 1, this.update(), e.animatedProperties[this.prop] = !0;
                    for (f in e.animatedProperties) e.animatedProperties[f] !== !0 && (c = !1);
                    if (c) {
                        e.overflow != null && !K.support.shrinkWrapBlocks && K.each(["", "X", "Y"], function(a, b) {
                            d.style["overflow" + b] = e.overflow[a]
                        }), e.hide && K(d).hide();
                        if (e.hide || e.show)
                            for (var i in e.animatedProperties) K.style(d, i, e.orig[i]);
                        e.complete.call(d)
                    }
                    return !1
                }
                return e.duration == Infinity ? this.now = b : (h = b - this.startTime, this.state = h / e.duration, this.pos = K.easing[e.animatedProperties[this.prop]](this.state, h, 0, 1, e.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
            }
        }, K.extend(K.fx, {
            tick: function() {
                for (var a = K.timers, b = 0; b < a.length; ++b) a[b]() || a.splice(b--, 1);
                a.length || K.fx.stop()
            },
            interval: 13,
            stop: function() {
                clearInterval(cq), cq = null
            },
            speeds: {
                slow: 600,
                fast: 200,
                _default: 400
            },
            step: {
                opacity: function(a) {
                    K.style(a.elem, "opacity", a.now)
                },
                _default: function(a) {
                    a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit : a.elem[a.prop] = a.now
                }
            }
        }), K.expr && K.expr.filters && (K.expr.filters.animated = function(a) {
            return K.grep(K.timers, function(b) {
                return a === b.elem
            }).length
        });
        var ct = /^t(?:able|d|h)$/i,
            cu = /^(?:body|html)$/i;
        "getBoundingClientRect" in H.documentElement ? K.fn.offset = function(a) {
            var b = this[0],
                d;
            if (a) return this.each(function(b) {
                K.offset.setOffset(this, a, b)
            });
            if (!b || !b.ownerDocument) return null;
            if (b === b.ownerDocument.body) return K.offset.bodyOffset(b);
            try {
                d = b.getBoundingClientRect()
            } catch (e) {}
            var f = b.ownerDocument,
                g = f.documentElement;
            if (!d || !K.contains(g, b)) return d ? {
                top: d.top,
                left: d.left
            } : {
                top: 0,
                left: 0
            };
            var h = f.body,
                i = c(f),
                j = g.clientTop || h.clientTop || 0,
                k = g.clientLeft || h.clientLeft || 0,
                l = i.pageYOffset || K.support.boxModel && g.scrollTop || h.scrollTop,
                m = i.pageXOffset || K.support.boxModel && g.scrollLeft || h.scrollLeft,
                n = d.top + l - j,
                o = d.left + m - k;
            return {
                top: n,
                left: o
            }
        } : K.fn.offset = function(a) {
            var b = this[0];
            if (a) return this.each(function(b) {
                K.offset.setOffset(this, a, b)
            });
            if (!b || !b.ownerDocument) return null;
            if (b === b.ownerDocument.body) return K.offset.bodyOffset(b);
            K.offset.initialize();
            var c, d = b.offsetParent,
                e = b,
                f = b.ownerDocument,
                g = f.documentElement,
                h = f.body,
                i = f.defaultView,
                j = i ? i.getComputedStyle(b, null) : b.currentStyle,
                k = b.offsetTop,
                l = b.offsetLeft;
            while ((b = b.parentNode) && b !== h && b !== g) {
                if (K.offset.supportsFixedPosition && j.position === "fixed") break;
                c = i ? i.getComputedStyle(b, null) : b.currentStyle, k -= b.scrollTop, l -= b.scrollLeft, b === d && (k += b.offsetTop, l += b.offsetLeft, K.offset.doesNotAddBorder && (!K.offset.doesAddBorderForTableAndCells || !ct.test(b.nodeName)) && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), K.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), j = c
            }
            if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
            return K.offset.supportsFixedPosition && j.position === "fixed" && (k += Math.max(g.scrollTop, h.scrollTop), l += Math.max(g.scrollLeft, h.scrollLeft)), {
                top: k,
                left: l
            }
        }, K.offset = {
            initialize: function() {
                var a = H.body,
                    b = H.createElement("div"),
                    c, d, e, f, g = parseFloat(K.css(a, "marginTop")) || 0,
                    h = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
                K.extend(b.style, {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    border: 0,
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                }), b.innerHTML = h, a.insertBefore(b, a.firstChild), c = b.firstChild, d = c.firstChild, f = c.nextSibling.firstChild.firstChild, this.doesNotAddBorder = d.offsetTop !== 5, this.doesAddBorderForTableAndCells = f.offsetTop === 5, d.style.position = "fixed", d.style.top = "20px", this.supportsFixedPosition = d.offsetTop === 20 || d.offsetTop === 15, d.style.position = d.style.top = "", c.style.overflow = "hidden", c.style.position = "relative", this.subtractsBorderForOverflowNotVisible = d.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== g, a.removeChild(b), K.offset.initialize = K.noop
            },
            bodyOffset: function(a) {
                var b = a.offsetTop,
                    c = a.offsetLeft;
                return K.offset.initialize(), K.offset.doesNotIncludeMarginInBodyOffset && (b += parseFloat(K.css(a, "marginTop")) || 0, c += parseFloat(K.css(a, "marginLeft")) || 0), {
                    top: b,
                    left: c
                }
            },
            setOffset: function(a, b, c) {
                var d = K.css(a, "position");
                d === "static" && (a.style.position = "relative");
                var e = K(a),
                    f = e.offset(),
                    g = K.css(a, "top"),
                    h = K.css(a, "left"),
                    i = (d === "absolute" || d === "fixed") && K.inArray("auto", [g, h]) > -1,
                    j = {},
                    k = {},
                    l, m;
                i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), K.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
            }
        }, K.fn.extend({
            position: function() {
                if (!this[0]) return null;
                var a = this[0],
                    b = this.offsetParent(),
                    c = this.offset(),
                    d = cu.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                return c.top -= parseFloat(K.css(a, "marginTop")) || 0, c.left -= parseFloat(K.css(a, "marginLeft")) || 0, d.top += parseFloat(K.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(K.css(b[0], "borderLeftWidth")) || 0, {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var a = this.offsetParent || H.body;
                    while (a && !cu.test(a.nodeName) && K.css(a, "position") === "static") a = a.offsetParent;
                    return a
                })
            }
        }), K.each(["Left", "Top"], function(a, d) {
            var e = "scroll" + d;
            K.fn[e] = function(d) {
                var f, g;
                return d === b ? (f = this[0], f ? (g = c(f), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : K.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e]) : null) : this.each(function() {
                    g = c(this), g ? g.scrollTo(a ? K(g).scrollLeft() : d, a ? d : K(g).scrollTop()) : this[e] = d
                })
            }
        }), K.each(["Height", "Width"], function(a, c) {
            var d = c.toLowerCase();
            K.fn["inner" + c] = function() {
                var a = this[0];
                return a && a.style ? parseFloat(K.css(a, d, "padding")) : null
            }, K.fn["outer" + c] = function(a) {
                var b = this[0];
                return b && b.style ? parseFloat(K.css(b, d, a ? "margin" : "border")) : null
            }, K.fn[d] = function(a) {
                var e = this[0];
                if (!e) return a == null ? null : this;
                if (K.isFunction(a)) return this.each(function(b) {
                    var c = K(this);
                    c[d](a.call(this, b, c[d]()))
                });
                if (K.isWindow(e)) {
                    var f = e.document.documentElement["client" + c],
                        g = e.document.body;
                    return e.document.compatMode === "CSS1Compat" && f || g && g["client" + c] || f
                }
                if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
                if (a === b) {
                    var h = K.css(e, d),
                        i = parseFloat(h);
                    return K.isNaN(i) ? h : i
                }
                return this.css(d, typeof a == "string" ? a : a + "px")
            }
        }), a.jQuery = a.$ = K
    })(window),
    function(a, b) {
        function g(a, b) {
            return (new Date(a, b + 1, 0)).getDate()
        }

        function h(a, b) {
            a = "" + a, b = b || 2;
            while (a.length < b) a = "0" + a;
            return a
        }

        function k(a, b, c) {
            var d = a.getDate(),
                e = a.getDay(),
                g = a.getMonth(),
                k = a.getFullYear(),
                l = {
                    d: d,
                    dd: h(d),
                    ddd: f[c].shortDays[e],
                    dddd: f[c].days[e],
                    m: g + 1,
                    mm: h(g + 1),
                    mmm: f[c].shortMonths[g],
                    mmmm: f[c].months[g],
                    yy: String(k).slice(2),
                    yyyy: k
                },
                m = b.replace(i, function(a) {
                    return a in l ? l[a] : a.slice(1, a.length - 1)
                });
            return j.html(m).html()
        }

        function l(a) {
            return parseInt(a, 10)
        }

        function m(a, b) {
            return a.getFullYear() === b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate()
        }

        function n(a) {
            if (a === b) return;
            if (a.constructor == Date) return a;
            if (typeof a == "string") {
                var c = a.split("-");
                if (c.length == 3) return new Date(l(c[0]), l(c[1]) - 1, l(c[2]));
                if (!/^-?\d+$/.test(a)) return;
                a = l(a)
            }
            var d = new Date;
            return d.setDate(d.getDate() + a), d
        }

        function o(d, h) {
            function M(b, c, e) {
                z = b, w = b.getFullYear(), x = b.getMonth(), y = b.getDate(), e = e || a.Event("api"), e.type = "beforeChange", G.trigger(e, [b]);
                if (e.isDefaultPrevented()) return;
                d.val(k(b, c.format, c.lang)), e.type = "change", G.trigger(e), d.data("date", b), i.hide(e)
            }

            function N(b) {
                b.type = "onShow", G.trigger(b), a(document).bind("keydown.d", function(b) {
                    if (b.ctrlKey) return !0;
                    var c = b.keyCode;
                    if (c == 8) return d.val(""), i.hide(b);
                    if (c == 27 || c == 9) return i.hide(b);
                    if (a(e).index(c) >= 0) {
                        if (!C) return i.show(b), b.preventDefault();
                        var f = a("#" + p.weeks + " a"),
                            g = a("." + p.focus),
                            h = f.index(g);
                        g.removeClass(p.focus);
                        if (c == 74 || c == 40) h += 7;
                        else if (c == 75 || c == 38) h -= 7;
                        else if (c == 76 || c == 39) h += 1;
                        else if (c == 72 || c == 37) h -= 1;
                        return h > 41 ? (i.addMonth(), g = a("#" + p.weeks + " a:eq(" + (h - 42) + ")")) : h < 0 ? (i.addMonth(-1), g = a("#" + p.weeks + " a:eq(" + (h + 42) + ")")) : g = f.eq(h), g.addClass(p.focus), b.preventDefault()
                    }
                    return c == 34 ? i.addMonth() : c == 33 ? i.addMonth(-1) : c == 36 ? i.today() : (c == 13 && (a(b.target).is("select") || a("." + p.focus).click()), a([16, 17, 18, 9]).index(c) >= 0)
                }), a(document).bind("click.d", function(b) {
                    var c = b.target;
                    !a(c).parents("#" + p.root).length && c != d[0] && (!t || c != t[0]) && i.hide(b)
                })
            }
            var i = this,
                j = new Date,
                o = j.getFullYear(),
                p = h.css,
                q = f[h.lang],
                r = a("#" + p.root),
                s = r.find("#" + p.title),
                t, u, v, w, x, y, z = d.attr("data-value") || h.value || d.val(),
                A = d.attr("min") || h.min,
                B = d.attr("max") || h.max,
                C, D;
            A === 0 && (A = "0"), z = n(z) || j, A = n(A || new Date(o + h.yearRange[0], 1, 1)), B = n(B || new Date(o + h.yearRange[1] + 1, 1, -1));
            if (!q) throw "Dateinput: invalid language: " + h.lang;
            if (d.attr("type") == "date") {
                var D = d.clone(),
                    E = D.wrap("<div/>").parent().html(),
                    F = a(E.replace(/type/i, "type=text data-orig-type"));
                h.value && F.val(h.value), d.replaceWith(F), d = F
            }
            d.addClass(p.input);
            var G = d.add(i);
            if (!r.length) {
                r = a("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({
                    position: "absolute"
                }).attr("id", p.root), r.children().eq(0).attr("id", p.head).end().eq(1).attr("id", p.body).children().eq(0).attr("id", p.days).end().eq(1).attr("id", p.weeks).end().end().end().find("a").eq(0).attr("id", p.prev).end().eq(1).attr("id", p.next), s = r.find("#" + p.head).find("div").attr("id", p.title);
                if (h.selectors) {
                    var H = a("<select/>").attr("id", p.month),
                        I = a("<select/>").attr("id", p.year);
                    s.html(H.add(I))
                }
                var J = r.find("#" + p.days);
                for (var K = 0; K < 7; K++) J.append(a("<span/>").text(q.shortDays[(K + h.firstDay) % 7]));
                a("body").append(r)
            }
            h.trigger && (t = a("<a/>").attr("href", "#").addClass(p.trigger).click(function(a) {
                return h.toggle ? i.toggle() : i.show(), a.preventDefault()
            }).insertAfter(d));
            var L = r.find("#" + p.weeks);
            I = r.find("#" + p.year), H = r.find("#" + p.month), a.extend(i, {
                show: function(b) {
                    if (d.attr("readonly") || d.attr("disabled") || C) return;
                    b = b || a.Event(), b.type = "onBeforeShow", G.trigger(b);
                    if (b.isDefaultPrevented()) return;
                    a.each(c, function() {
                        this.hide()
                    }), C = !0, H.unbind("change").change(function() {
                        i.setValue(I.val(), a(this).val())
                    }), I.unbind("change").change(function() {
                        i.setValue(a(this).val(), H.val())
                    }), u = r.find("#" + p.prev).unbind("click").click(function(a) {
                        return u.hasClass(p.disabled) || i.addMonth(-1), !1
                    }), v = r.find("#" + p.next).unbind("click").click(function(a) {
                        return v.hasClass(p.disabled) || i.addMonth(), !1
                    }), i.setValue(z);
                    var e = d.offset();
                    return /iPad/i.test(navigator.userAgent) && (e.top -= a(window).scrollTop()), r.css({
                        top: e.top + d.outerHeight({
                            margins: !0
                        }) + h.offset[0],
                        left: e.left + h.offset[1]
                    }), h.speed ? r.show(h.speed, function() {
                        N(b)
                    }) : (r.show(), N(b)), i
                },
                setValue: function(c, d, e) {
                    var f = l(d) >= -1 ? new Date(l(c), l(d), l(e == b || isNaN(e) ? 1 : e)) : c || z;
                    f < A ? f = A : f > B && (f = B), typeof c == "string" && (f = n(c)), c = f.getFullYear(), d = f.getMonth(), e = f.getDate(), d == -1 ? (d = 11, c--) : d == 12 && (d = 0, c++);
                    if (!C) return M(f, h), i;
                    x = d, w = c, y = e;
                    var k = new Date(c, d, 1 - h.firstDay),
                        o = k.getDay(),
                        r = g(c, d),
                        t = g(c, d - 1),
                        D;
                    if (h.selectors) {
                        H.empty(), a.each(q.months, function(b, d) {
                            A < new Date(c, b + 1, 1) && B > new Date(c, b, 0) && H.append(a("<option/>").html(d).attr("value", b))
                        }), I.empty();
                        var E = j.getFullYear();
                        for (var F = E + h.yearRange[0]; F < E + h.yearRange[1]; F++) A < new Date(F + 1, 0, 1) && B > new Date(F, 0, 0) && I.append(a("<option/>").text(F));
                        H.val(d), I.val(c)
                    } else s.html(q.months[d] + " " + c);
                    L.empty(), u.add(v).removeClass(p.disabled);
                    for (var G = o ? 0 : -7, J, K; G < (o ? 42 : 35); G++) J = a("<a/>"), G % 7 === 0 && (D = a("<div/>").addClass(p.week), L.append(D)), G < o ? (J.addClass(p.off), K = t - o + G + 1, f = new Date(c, d - 1, K)) : G >= o + r ? (J.addClass(p.off), K = G - r - o + 1, f = new Date(c, d + 1, K)) : (K = G - o + 1, f = new Date(c, d, K), m(z, f) ? J.attr("id", p.current).addClass(p.focus) : m(j, f) && J.attr("id", p.today)), A && f < A && J.add(u).addClass(p.disabled), B && f > B && J.add(v).addClass(p.disabled), J.attr("href", "#" + K).text(K).data("date", f), D.append(J);
                    return L.find("a").click(function(b) {
                        var c = a(this);
                        return c.hasClass(p.disabled) || (a("#" + p.current).removeAttr("id"), c.attr("id", p.current), M(c.data("date"), h, b)), !1
                    }), p.sunday && L.find(p.week).each(function() {
                        var b = h.firstDay ? 7 - h.firstDay : 0;
                        a(this).children().slice(b, b + 1).addClass(p.sunday)
                    }), i
                },
                setMin: function(a, b) {
                    return A = n(a), b && z < A && i.setValue(A), i
                },
                setMax: function(a, b) {
                    return B = n(a), b && z > B && i.setValue(B), i
                },
                today: function() {
                    return i.setValue(j)
                },
                addDay: function(a) {
                    return this.setValue(w, x, y + (a || 1))
                },
                addMonth: function(a) {
                    var b = x + (a || 1),
                        c = g(w, b),
                        d = y <= c ? y : c;
                    return this.setValue(w, b, d)
                },
                addYear: function(a) {
                    return this.setValue(w + (a || 1), x, y)
                },
                destroy: function() {
                    d.add(document).unbind("click.d").unbind("keydown.d"), r.add(t).remove(), d.removeData("dateinput").removeClass(p.input), D && d.replaceWith(D)
                },
                hide: function(b) {
                    if (C) {
                        b = a.Event(), b.type = "onHide", G.trigger(b), a(document).unbind("click.d").unbind("keydown.d");
                        if (b.isDefaultPrevented()) return;
                        r.hide(), C = !1
                    }
                    return i
                },
                toggle: function() {
                    return i.isOpen() ? i.hide() : i.show()
                },
                getConf: function() {
                    return h
                },
                getInput: function() {
                    return d
                },
                getCalendar: function() {
                    return r
                },
                getValue: function(a) {
                    return a ? k(z, a, h.lang) : z
                },
                isOpen: function() {
                    return C
                }
            }), a.each(["onBeforeShow", "onShow", "change", "onHide"], function(b, c) {
                a.isFunction(h[c]) && a(i).bind(c, h[c]), i[c] = function(b) {
                    return b && a(i).bind(c, b), i
                }
            }), h.editable || d.bind("focus.d click.d", i.show).keydown(function(b) {
                var c = b.keyCode;
                return !C && a(e).index(c) >= 0 ? (i.show(b), b.preventDefault()) : b.shiftKey || b.ctrlKey || b.altKey || c == 9 ? !0 : b.preventDefault()
            }), n(d.val()) && M(z, h)
        }
        a.tools = a.tools || {
            version: "1.2.6"
        };
        var c = [],
            d, e = [75, 76, 38, 39, 74, 72, 40, 37],
            f = {};
        d = a.tools.dateinput = {
            conf: {
                format: "mm/dd/yy",
                selectors: !1,
                yearRange: [-5, 5],
                lang: "en",
                offset: [0, 0],
                speed: 0,
                firstDay: 0,
                min: b,
                max: b,
                trigger: 0,
                toggle: 0,
                editable: 0,
                css: {
                    prefix: "cal",
                    input: "date",
                    root: 0,
                    head: 0,
                    title: 0,
                    prev: 0,
                    next: 0,
                    month: 0,
                    year: 0,
                    days: 0,
                    body: 0,
                    weeks: 0,
                    today: 0,
                    current: 0,
                    week: 0,
                    off: 0,
                    sunday: 0,
                    focus: 0,
                    disabled: 0,
                    trigger: 0
                }
            },
            localize: function(b, c) {
                a.each(c, function(a, b) {
                    c[a] = b.split(",")
                }), f[b] = c
            }
        }, d.localize("en", {
            months: "January,February,March,April,May,June,July,August,September,October,November,December",
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
            days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
            shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat"
        });
        var i = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,
            j = a("<a/>");
        a.expr[":"].date = function(b) {
            var c = b.getAttribute("type");
            return c && c == "date" || !!a(b).data("dateinput")
        }, a.fn.dateinput = function(b) {
            if (this.data("dateinput")) return this;
            b = a.extend(!0, {}, d.conf, b), a.each(b.css, function(a, c) {
                !c && a != "prefix" && (b.css[a] = (b.css.prefix || "") + (c || a))
            });
            var e;
            return this.each(function() {
                var d = new o(a(this), b);
                c.push(d);
                var f = d.getInput().data("dateinput", d);
                e = e ? e.add(f) : f
            }), e ? e : this
        }
    }(jQuery),
    function(a) {
        function d(d, e) {
            var f = this,
                g = d.add(f),
                h = a(window),
                i, j, k, l = a.tools.expose && (e.mask || e.expose),
                m = Math.random().toString().slice(10);
            l && (typeof l == "string" && (l = {
                color: l
            }), l.closeOnClick = l.closeOnEsc = !1);
            var n = e.target || d.attr("rel");
            j = n ? a(n) : null || d;
            if (!j.length) throw "Could not find Overlay: " + n;
            d && d.index(j) == -1 && d.click(function(a) {
                return f.load(a), a.preventDefault()
            }), a.extend(f, {
                load: function(d) {
                    if (f.isOpened()) return f;
                    var i = c[e.effect];
                    if (!i) throw 'Overlay: cannot find effect : "' + e.effect + '"';
                    e.oneInstance && a.each(b, function() {
                        this.close(d)
                    }), d = d || a.Event(), d.type = "onBeforeLoad", g.trigger(d);
                    if (d.isDefaultPrevented()) return f;
                    k = !0, l && a(j).expose(l);
                    var n = e.top,
                        o = e.left,
                        p = j.outerWidth({
                            margin: !0
                        }),
                        q = j.outerHeight({
                            margin: !0
                        });
                    return typeof n == "string" && (n = n == "center" ? Math.max((h.height() - q) / 2, 0) : parseInt(n, 10) / 100 * h.height()), o == "center" && (o = Math.max((h.width() - p) / 2, 0)), i[0].call(f, {
                        top: n,
                        left: o
                    }, function() {
                        k && (d.type = "onLoad", g.trigger(d))
                    }), l && e.closeOnClick && a.mask.getMask().one("click", f.close), e.closeOnClick && a(document).bind("click." + m, function(b) {
                        a(b.target).parents(j).length || f.close(b)
                    }), e.closeOnEsc && a(document).bind("keydown." + m, function(a) {
                        a.keyCode == 27 && f.close(a)
                    }), f
                },
                close: function(b) {
                    if (!f.isOpened()) return f;
                    b = b || a.Event(), b.type = "onBeforeClose", g.trigger(b);
                    if (b.isDefaultPrevented()) return;
                    return k = !1, c[e.effect][1].call(f, function() {
                        b.type = "onClose", g.trigger(b)
                    }), a(document).unbind("click." + m).unbind("keydown." + m), l && a.mask.close(), f
                },
                getOverlay: function() {
                    return j
                },
                getTrigger: function() {
                    return d
                },
                getClosers: function() {
                    return i
                },
                isOpened: function() {
                    return k
                },
                getConf: function() {
                    return e
                }
            }), a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function(b, c) {
                a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                    return b && a(f).bind(c, b), f
                }
            }), i = j.find(e.close || ".close"), !i.length && !e.close && (i = a('<a class="close"></a>'), j.prepend(i)), i.click(function(a) {
                f.close(a)
            }), e.load && f.load()
        }
        a.tools = a.tools || {
            version: "1.2.6"
        }, a.tools.overlay = {
            addEffect: function(a, b, d) {
                c[a] = [b, d]
            },
            conf: {
                close: null,
                closeOnClick: !0,
                closeOnEsc: !0,
                closeSpeed: "fast",
                effect: "default",
                fixed: !a.browser.msie || a.browser.version > 6,
                left: "center",
                load: !1,
                mask: null,
                oneInstance: !0,
                speed: "normal",
                target: null,
                top: "10%"
            }
        };
        var b = [],
            c = {};
        a.tools.overlay.addEffect("default", function(b, c) {
            var d = this.getConf(),
                e = a(window);
            d.fixed || (b.top += e.scrollTop(), b.left += e.scrollLeft()), b.position = d.fixed ? "fixed" : "absolute", this.getOverlay().css(b).fadeIn(d.speed, c)
        }, function(a) {
            this.getOverlay().fadeOut(this.getConf().closeSpeed, a)
        }), a.fn.overlay = function(c) {
            var e = this.data("overlay");
            return e ? e : (a.isFunction(c) && (c = {
                onBeforeLoad: c
            }), c = a.extend(!0, {}, a.tools.overlay.conf, c), this.each(function() {
                e = new d(a(this), c), b.push(e), a(this).data("overlay", e)
            }), c.api ? e : this)
        }
    }(jQuery),
    function(a) {
        function d(a) {
            var b = a.offset();
            return {
                top: b.top + a.height() / 2,
                left: b.left + a.width() / 2
            }
        }
        var b = a.tools.overlay,
            c = a(window);
        a.extend(b.conf, {
            start: {
                top: null,
                left: null
            },
            fadeInSpeed: "fast",
            zIndex: 9999
        });
        var e = function(b, e) {
                var f = this.getOverlay(),
                    g = this.getConf(),
                    h = this.getTrigger(),
                    i = this,
                    j = f.outerWidth({
                        margin: !0
                    }),
                    k = f.data("img"),
                    l = g.fixed ? "fixed" : "absolute";
                if (!k) {
                    var m = f.css("backgroundImage");
                    if (!m) throw "background-image CSS property not set for overlay";
                    m = m.slice(m.indexOf("(") + 1, m.indexOf(")")).replace(/\"/g, ""), f.css("backgroundImage", "none"), k = a('<img src="' + m + '"/>'), k.css({
                        border: 0,
                        display: "none"
                    }).width(j), a("body").append(k), f.data("img", k)
                }
                var n = g.start.top || Math.round(c.height() / 2),
                    o = g.start.left || Math.round(c.width() / 2);
                if (h) {
                    var p = d(h);
                    n = p.top, o = p.left
                }
                g.fixed ? (n -= c.scrollTop(), o -= c.scrollLeft()) : (b.top += c.scrollTop(), b.left += c.scrollLeft()), k.css({
                    position: "absolute",
                    top: n,
                    left: o,
                    width: 0,
                    zIndex: g.zIndex
                }).show(), b.position = l, f.css(b), k.animate({
                    top: f.css("top"),
                    left: f.css("left"),
                    width: j
                }, g.speed, function() {
                    f.css("zIndex", g.zIndex + 1).fadeIn(g.fadeInSpeed, function() {
                        i.isOpened() && !a(this).index(f) ? e.call() : f.hide()
                    })
                }).css("position", l)
            },
            f = function(b) {
                var e = this.getOverlay().hide(),
                    f = this.getConf(),
                    g = this.getTrigger(),
                    h = e.data("img"),
                    i = {
                        top: f.start.top,
                        left: f.start.left,
                        width: 0
                    };
                g && a.extend(i, d(g)), f.fixed && h.css({
                    position: "absolute"
                }).animate({
                    top: "+=" + c.scrollTop(),
                    left: "+=" + c.scrollLeft()
                }, 0), h.animate(i, f.closeSpeed, b)
            };
        b.addEffect("apple", e, f)
    }(jQuery),
    function(a) {
        function e(a, b) {
            var c = Math.pow(10, b);
            return Math.round(a * c) / c
        }

        function f(a, b) {
            var c = parseInt(a.css(b), 10);
            if (c) return c;
            var d = a[0].currentStyle;
            return d && d.width && parseInt(d.width, 10)
        }

        function g(a) {
            var b = a.data("events");
            return b && b.onSlide
        }

        function h(b, c) {
            function y(a, f, g, h) {
                g === undefined ? g = f / m * q : h && (g -= c.min), r && (g = Math.round(g / r) * r);
                if (f === undefined || r) f = g * m / q;
                if (isNaN(g)) return d;
                f = Math.max(0, Math.min(f, m)), g = f / m * q;
                if (h || !j) g += c.min;
                j && (h ? f = m - f : g = c.max - g), g = e(g, s);
                var i = a.type == "click";
                if (x && k !== undefined && !i) {
                    a.type = "onSlide", w.trigger(a, [g, f]);
                    if (a.isDefaultPrevented()) return d
                }
                var l = i ? c.speed : 0,
                    t = i ? function() {
                        a.type = "change", w.trigger(a, [g])
                    } : null;
                return j ? (o.animate({
                    top: f
                }, l, t), c.progress && p.animate({
                    height: m - f + o.height() / 2
                }, l)) : (o.animate({
                    left: f
                }, l, t), c.progress && p.animate({
                    width: f + o.width() / 2
                }, l)), k = g, n = f, b.val(g), d
            }

            function z() {
                j = c.vertical || f(i, "height") > f(i, "width"), j ? (m = f(i, "height") - f(o, "height"), l = i.offset().top + m) : (m = f(i, "width") - f(o, "width"), l = i.offset().left)
            }

            function A() {
                z(), d.setValue(c.value !== undefined ? c.value : c.min)
            }
            var d = this,
                h = c.css,
                i = a("<div><div/><a href='#'/></div>").data("rangeinput", d),
                j, k, l, m, n;
            b.before(i);
            var o = i.addClass(h.slider).find("a").addClass(h.handle),
                p = i.find("div").addClass(h.progress);
            a.each("min,max,step,value".split(","), function(a, d) {
                var e = b.attr(d);
                parseFloat(e) && (c[d] = parseFloat(e, 10))
            });
            var q = c.max - c.min,
                r = c.step == "any" ? 0 : c.step,
                s = c.precision;
            if (s === undefined) try {
                s = r.toString().split(".")[1].length
            } catch (t) {
                s = 0
            }
            if (b.attr("type") == "range") {
                var u = b.clone().wrap("<div/>").parent().html(),
                    v = a(u.replace(/type/i, "type=text data-orig-type"));
                v.val(c.value), b.replaceWith(v), b = v
            }
            b.addClass(h.input);
            var w = a(d).add(b),
                x = !0;
            a.extend(d, {
                getValue: function() {
                    return k
                },
                setValue: function(b, c) {
                    return z(), y(c || a.Event("api"), undefined, b, !0)
                },
                getConf: function() {
                    return c
                },
                getProgress: function() {
                    return p
                },
                getHandle: function() {
                    return o
                },
                getInput: function() {
                    return b
                },
                step: function(b, e) {
                    e = e || a.Event();
                    var f = c.step == "any" ? 1 : c.step;
                    d.setValue(k + f * (b || 1), e)
                },
                stepUp: function(a) {
                    return d.step(a || 1)
                },
                stepDown: function(a) {
                    return d.step(-a || -1)
                }
            }), a.each("onSlide,change".split(","), function(b, e) {
                a.isFunction(c[e]) && a(d).bind(e, c[e]), d[e] = function(b) {
                    return b && a(d).bind(e, b), d
                }
            }), o.drag({
                drag: !1
            }).bind("dragStart", function() {
                z(), x = g(a(d)) || g(b)
            }).bind("drag", function(a, c, d) {
                if (b.is(":disabled")) return !1;
                y(a, j ? c : d)
            }).bind("dragEnd", function(a) {
                a.isDefaultPrevented() || (a.type = "change", w.trigger(a, [k]))
            }).click(function(a) {
                return a.preventDefault()
            }), i.click(function(a) {
                if (b.is(":disabled") || a.target == o[0]) return a.preventDefault();
                z();
                var c = j ? o.height() / 2 : o.width() / 2;
                y(a, j ? m - l - c + a.pageY : a.pageX - l - c)
            }), c.keyboard && b.keydown(function(c) {
                if (b.attr("readonly")) return;
                var e = c.keyCode,
                    f = a([75, 76, 38, 33, 39]).index(e) != -1,
                    g = a([74, 72, 40, 34, 37]).index(e) != -1;
                if ((f || g) && !(c.shiftKey || c.altKey || c.ctrlKey)) return f ? d.step(e == 33 ? 10 : 1, c) : g && d.step(e == 34 ? -10 : -1, c), c.preventDefault()
            }), b.blur(function(b) {
                var c = a(this).val();
                c !== k && d.setValue(c, b)
            }), a.extend(b[0], {
                stepUp: d.stepUp,
                stepDown: d.stepDown
            }), A(), m || a(window).load(A)
        }
        a.tools = a.tools || {
            version: "1.2.6"
        };
        var b;
        b = a.tools.rangeinput = {
            conf: {
                min: 0,
                max: 100,
                step: "any",
                steps: 0,
                value: 0,
                precision: undefined,
                vertical: 0,
                keyboard: !0,
                progress: !1,
                speed: 100,
                css: {
                    input: "range",
                    slider: "slider",
                    progress: "progress",
                    handle: "handle"
                }
            }
        };
        var c, d;
        a.fn.drag = function(b) {
            return document.ondragstart = function() {
                return !1
            }, b = a.extend({
                x: !0,
                y: !0,
                drag: !0
            }, b), c = c || a(document).bind("mousedown mouseup", function(e) {
                var f = a(e.target);
                if (e.type == "mousedown" && f.data("drag")) {
                    var g = f.position(),
                        h = e.pageX - g.left,
                        i = e.pageY - g.top,
                        j = !0;
                    c.bind("mousemove.drag", function(a) {
                        var c = a.pageX - h,
                            e = a.pageY - i,
                            g = {};
                        b.x && (g.left = c), b.y && (g.top = e), j && (f.trigger("dragStart"), j = !1), b.drag && f.css(g), f.trigger("drag", [e, c]), d = f
                    }), e.preventDefault()
                } else try {
                    d && d.trigger("dragEnd")
                } finally {
                    c.unbind("mousemove.drag"), d = null
                }
            }), this.data("drag", !0)
        }, a.expr[":"].range = function(b) {
            var c = b.getAttribute("type");
            return c && c == "range" || !!a(b).filter("input").data("rangeinput")
        }, a.fn.rangeinput = function(c) {
            if (this.data("rangeinput")) return this;
            c = a.extend(!0, {}, b.conf, c);
            var d;
            return this.each(function() {
                var b = new h(a(this), a.extend(!0, {}, c)),
                    e = b.getInput().data("rangeinput", b);
                d = d ? d.add(e) : e
            }), d ? d : this
        }
    }(jQuery),
    function(a) {
        function b(a, b) {
            var c = parseInt(a.css(b), 10);
            if (c) return c;
            var d = a[0].currentStyle;
            return d && d.width && parseInt(d.width, 10)
        }

        function c(b, c) {
            var d = a(c);
            return d.length < 2 ? d : b.parent().find(c)
        }

        function e(b, e) {
            var f = this,
                g = b.add(f),
                h = b.children(),
                i = 0,
                j = e.vertical;
            d || (d = f), h.length > 1 && (h = a(e.items, b)), e.size > 1 && (e.circular = !1), a.extend(f, {
                getConf: function() {
                    return e
                },
                getIndex: function() {
                    return i
                },
                getSize: function() {
                    return f.getItems().size()
                },
                getNaviButtons: function() {
                    return n.add(o)
                },
                getRoot: function() {
                    return b
                },
                getItemWrap: function() {
                    return h
                },
                getItems: function() {
                    return h.find(e.item).not("." + e.clonedClass)
                },
                move: function(a, b) {
                    return f.seekTo(i + a, b)
                },
                next: function(a) {
                    return f.move(e.size, a)
                },
                prev: function(a) {
                    return f.move(-e.size, a)
                },
                begin: function(a) {
                    return f.seekTo(0, a)
                },
                end: function(a) {
                    return f.seekTo(f.getSize() - 1, a)
                },
                focus: function() {
                    return d = f, f
                },
                addItem: function(b) {
                    return b = a(b), e.circular ? (h.children().last().before(b), h.children().first().replaceWith(b.clone().addClass(e.clonedClass))) : (h.append(b), o.removeClass("disabled")), g.trigger("onAddItem", [b]), f
                },
                seekTo: function(b, c, k) {
                    b.jquery || (b *= 1);
                    if (e.circular && b === 0 && i == -1 && c !== 0) return f;
                    if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f;
                    var l = b;
                    b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b);
                    var m = a.Event("onBeforeSeek");
                    if (!k) {
                        g.trigger(m, [b, c]);
                        if (m.isDefaultPrevented() || !l.length) return f
                    }
                    var n = j ? {
                        top: -l.position().top
                    } : {
                        left: -l.position().left
                    };
                    return i = b, d = f, c === undefined && (c = e.speed), h.animate(n, c, e.easing, k || function() {
                        g.trigger("onSeek", [b])
                    }), f
                }
            }), a.each(["onBeforeSeek", "onSeek", "onAddItem"], function(b, c) {
                a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                    return b && a(f).bind(c, b), f
                }
            });
            if (e.circular) {
                var k = f.getItems().slice(-1).clone().prependTo(h),
                    l = f.getItems().eq(1).clone().appendTo(h);
                k.add(l).addClass(e.clonedClass), f.onBeforeSeek(function(a, b, c) {
                    if (a.isDefaultPrevented()) return;
                    if (b == -1) return f.seekTo(k, c, function() {
                        f.end(0)
                    }), a.preventDefault();
                    b == f.getSize() && f.seekTo(l, c, function() {
                        f.begin(0)
                    })
                });
                var m = b.parents().add(b).filter(function() {
                    if (a(this).css("display") === "none") return !0
                });
                m.length ? (m.show(), f.seekTo(0, 0, function() {}), m.hide()) : f.seekTo(0, 0, function() {})
            }
            var n = c(b, e.prev).click(function(a) {
                    a.stopPropagation(), f.prev()
                }),
                o = c(b, e.next).click(function(a) {
                    a.stopPropagation(), f.next()
                });
            e.circular || (f.onBeforeSeek(function(a, b) {
                setTimeout(function() {
                    a.isDefaultPrevented() || (n.toggleClass(e.disabledClass, b <= 0), o.toggleClass(e.disabledClass, b >= f.getSize() - 1))
                }, 1)
            }), e.initialIndex || n.addClass(e.disabledClass)), f.getSize() < 2 && n.add(o).addClass(e.disabledClass), e.mousewheel && a.fn.mousewheel && b.mousewheel(function(a, b) {
                if (e.mousewheel) return f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50), !1
            });
            if (e.touch) {
                var p = {};
                h[0].ontouchstart = function(a) {
                    var b = a.touches[0];
                    p.x = b.clientX, p.y = b.clientY
                }, h[0].ontouchmove = function(a) {
                    if (a.touches.length == 1 && !h.is(":animated")) {
                        var b = a.touches[0],
                            c = p.x - b.clientX,
                            d = p.y - b.clientY;
                        f[j && d > 0 || !j && c > 0 ? "next" : "prev"](), a.preventDefault()
                    }
                }
            }
            e.keyboard && a(document).bind("keydown.scrollable", function(b) {
                if (!e.keyboard || b.altKey || b.ctrlKey || b.metaKey || a(b.target).is(":input")) return;
                if (e.keyboard != "static" && d != f) return;
                var c = b.keyCode;
                if (!(!j || c != 38 && c != 40)) return f.move(c == 38 ? -1 : 1), b.preventDefault();
                if (!j && (c == 37 || c == 39)) return f.move(c == 37 ? -1 : 1), b.preventDefault()
            }), e.initialIndex && f.seekTo(e.initialIndex, 0, function() {})
        }
        a.tools = a.tools || {
            version: "1.2.6"
        }, a.tools.scrollable = {
            conf: {
                activeClass: "active",
                circular: !1,
                clonedClass: "cloned",
                disabledClass: "disabled",
                easing: "swing",
                initialIndex: 0,
                item: "> *",
                items: ".items",
                keyboard: !0,
                mousewheel: !1,
                next: ".next",
                prev: ".prev",
                size: 1,
                speed: 400,
                vertical: !1,
                touch: !0,
                wheelSpeed: 0
            }
        };
        var d;
        a.fn.scrollable = function(b) {
            var c = this.data("scrollable");
            return c ? c : (b = a.extend({}, a.tools.scrollable.conf, b), this.each(function() {
                c = new e(a(this), b), a(this).data("scrollable", c)
            }), b.api ? c : this)
        }
    }(jQuery),
    function(a) {
        var b = a.tools.scrollable;
        b.autoscroll = {
            conf: {
                autoplay: !0,
                interval: 3e3,
                autopause: !0
            }
        }, a.fn.autoscroll = function(c) {
            typeof c == "number" && (c = {
                interval: c
            });
            var d = a.extend({}, b.autoscroll.conf, c),
                e;
            return this.each(function() {
                function h() {
                    f = setTimeout(function() {
                        b.next()
                    }, d.interval)
                }
                var b = a(this).data("scrollable"),
                    c = b.getRoot(),
                    f, g = !1;
                b && (e = b), b.play = function() {
                    if (f) return;
                    g = !1, c.bind("onSeek", h), h()
                }, b.pause = function() {
                    f = clearTimeout(f), c.unbind("onSeek", h)
                }, b.resume = function() {
                    g || b.play()
                }, b.stop = function() {
                    g = !0, b.pause()
                }, d.autopause && c.add(b.getNaviButtons()).hover(b.pause, b.resume), d.autoplay && b.play()
            }), d.api ? e : this
        }
    }(jQuery),
    function(a) {
        function c(b, c) {
            var d = a(c);
            return d.length < 2 ? d : b.parent().find(c)
        }
        var b = a.tools.scrollable;
        b.navigator = {
            conf: {
                navi: ".navi",
                naviItem: null,
                activeClass: "active",
                indexed: !1,
                idPrefix: null,
                history: !1
            }
        }, a.fn.navigator = function(d) {
            typeof d == "string" && (d = {
                navi: d
            }), d = a.extend({}, b.navigator.conf, d);
            var e;
            return this.each(function() {
                function k(a, c, d) {
                    b.seekTo(c), d.preventDefault(), i && history.pushState({
                        i: c
                    })
                }

                function l() {
                    return f.find(d.naviItem || "> *")
                }

                function m(b) {
                    var c = a("<" + (d.naviItem || "a") + "/>").click(function(c) {
                        k(a(this), b, c)
                    });
                    return b === 0 && c.addClass(h), d.indexed && c.text(b + 1), d.idPrefix && c.attr("id", d.idPrefix + b), c.appendTo(f)
                }
                var b = a(this).data("scrollable"),
                    f = d.navi.jquery ? d.navi : c(b.getRoot(), d.navi),
                    g = b.getNaviButtons(),
                    h = d.activeClass,
                    i = d.history && !!history.pushState,
                    j = b.getConf().size;
                b && (e = b), b.getNaviButtons = function() {
                    return g.add(f)
                }, i && (history.pushState({
                    i: 0
                }), a(window).bind("popstate", function(a) {
                    var c = a.originalEvent.state;
                    c && b.seekTo(c.i)
                })), l().length ? l().each(function(b) {
                    a(this).click(function(c) {
                        k(a(this), b, c)
                    })
                }) : a.each(b.getItems(), function(a) {
                    a % j == 0 && m(a)
                }), b.onBeforeSeek(function(a, b) {
                    setTimeout(function() {
                        if (!a.isDefaultPrevented()) {
                            var c = b / j,
                                d = l().eq(c);
                            d.length && l().removeClass(h).eq(c).addClass(h)
                        }
                    }, 1)
                }), b.onAddItem(function(a, c) {
                    var d = b.getItems().index(c);
                    d % j == 0 && m(d)
                })
            }), d.api ? e : this
        }
    }(jQuery),
    function(a) {
        function e(c, d, e) {
            var f = this,
                g = c.add(this),
                h = c.find(e.tabs),
                i = d.jquery ? d : c.children(d),
                j;
            h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
                click: function(c, d) {
                    var i = h.eq(c);
                    typeof c == "string" && c.replace("#", "") && (i = h.filter("[href*=" + c.replace("#", "") + "]"), c = Math.max(h.index(i), 0));
                    if (e.rotate) {
                        var k = h.length - 1;
                        if (c < 0) return f.click(k, d);
                        if (c > k) return f.click(0, d)
                    }
                    if (!i.length) {
                        if (j >= 0) return f;
                        c = e.initialIndex, i = h.eq(c)
                    }
                    if (c === j) return f;
                    d = d || a.Event(), d.type = "onBeforeClick", g.trigger(d, [c]);
                    if (d.isDefaultPrevented()) return;
                    return b[e.effect].call(f, c, function() {
                        j = c, d.type = "onClick", g.trigger(d, [c])
                    }), h.removeClass(e.current), i.addClass(e.current), f
                },
                getConf: function() {
                    return e
                },
                getTabs: function() {
                    return h
                },
                getPanes: function() {
                    return i
                },
                getCurrentPane: function() {
                    return i.eq(j)
                },
                getCurrentTab: function() {
                    return h.eq(j)
                },
                getIndex: function() {
                    return j
                },
                next: function() {
                    return f.click(j + 1)
                },
                prev: function() {
                    return f.click(j - 1)
                },
                destroy: function() {
                    return h.unbind(e.event).removeClass(e.current), i.find("a[href^=#]").unbind("click.T"), f
                }
            }), a.each("onBeforeClick,onClick".split(","), function(b, c) {
                a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                    return b && a(f).bind(c, b), f
                }
            }), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function(b) {
                a(this).bind(e.event, function(a) {
                    return f.click(b, a), a.preventDefault()
                })
            }), i.find("a[href^=#]").bind("click.T", function(b) {
                f.click(a(this).attr("href"), b)
            }), location.hash && e.tabs == "a" && c.find("[href=" + location.hash + "]").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex)
        }
        a.tools = a.tools || {
            version: "1.2.6"
        }, a.tools.tabs = {
            conf: {
                tabs: "a",
                current: "current",
                onBeforeClick: null,
                onClick: null,
                effect: "default",
                initialIndex: 0,
                event: "click",
                rotate: !1,
                slideUpSpeed: 400,
                slideDownSpeed: 400,
                history: !1
            },
            addEffect: function(a, c) {
                b[a] = c
            }
        };
        var b = {
                "default": function(a, b) {
                    this.getPanes().hide().eq(a).show(), b.call()
                },
                fade: function(a, b) {
                    var c = this.getConf(),
                        d = c.fadeOutSpeed,
                        e = this.getPanes();
                    d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
                },
                slide: function(a, b) {
                    var c = this.getConf();
                    this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
                },
                ajax: function(a, b) {
                    this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
                }
            },
            c, d;
        a.tools.tabs.addEffect("horizontal", function(b, e) {
            if (c) return;
            var f = this.getPanes().eq(b),
                g = this.getCurrentPane();
            d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
                width: 0
            }, {
                step: function(a) {
                    f.css("width", d - a)
                },
                complete: function() {
                    a(this).hide(), e.call(), c = !1
                }
            }), g.length || (e.call(), c = !1)
        }), a.fn.tabs = function(b, c) {
            var d = this.data("tabs");
            return d && (d.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = {
                onBeforeClick: c
            }), c = a.extend({}, a.tools.tabs.conf, c), this.each(function() {
                d = new e(a(this), b, c), a(this).data("tabs", d)
            }), c.api ? d : this
        }
    }(jQuery),
    function(a) {
        function c(b, c) {
            function i(c) {
                var d = a(c);
                return d.length < 2 ? d : b.parent().find(c)
            }

            function l() {
                g = setTimeout(function() {
                    f.next()
                }, c.interval)
            }
            var d = this,
                e = b.add(this),
                f = b.data("tabs"),
                g, h = !0,
                j = i(c.next).click(function() {
                    f.next()
                }),
                k = i(c.prev).click(function() {
                    f.prev()
                });
            a.extend(d, {
                getTabs: function() {
                    return f
                },
                getConf: function() {
                    return c
                },
                play: function() {
                    if (g) return d;
                    var b = a.Event("onBeforePlay");
                    return e.trigger(b), b.isDefaultPrevented() ? d : (h = !1, e.trigger("onPlay"), e.bind("onClick", l), l(), d)
                },
                pause: function() {
                    if (!g) return d;
                    var b = a.Event("onBeforePause");
                    return e.trigger(b), b.isDefaultPrevented() ? d : (g = clearTimeout(g), e.trigger("onPause"), e.unbind("onClick", l), d)
                },
                resume: function() {
                    h || d.play()
                },
                stop: function() {
                    d.pause(), h = !0
                }
            }), a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function(b, e) {
                a.isFunction(c[e]) && a(d).bind(e, c[e]), d[e] = function(b) {
                    return a(d).bind(e, b)
                }
            }), c.autopause && f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause, d.resume), c.autoplay && d.play(), c.clickable && f.getPanes().click(function() {
                f.next()
            });
            if (!f.getConf().rotate) {
                var m = c.disabledClass;
                f.getIndex() || k.addClass(m), f.onBeforeClick(function(a, b) {
                    k.toggleClass(m, !b), j.toggleClass(m, b == f.getTabs().length - 1)
                })
            }
        }
        var b;
        b = a.tools.tabs.slideshow = {
            conf: {
                next: ".forward",
                prev: ".backward",
                disabledClass: "disabled",
                autoplay: !1,
                autopause: !0,
                interval: 3e3,
                clickable: !0,
                api: !1
            }
        }, a.fn.slideshow = function(d) {
            var e = this.data("slideshow");
            return e ? e : (d = a.extend({}, b.conf, d), this.each(function() {
                e = new c(a(this), d), a(this).data("slideshow", e)
            }), d.api ? e : this)
        }
    }(jQuery),
    function(a) {
        function c() {
            if (a.browser.msie) {
                var b = a(document).height(),
                    c = a(window).height();
                return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, b - c < 20 ? c : b]
            }
            return [a(document).width(), a(document).height()]
        }

        function d(b) {
            if (b) return b.call(a.mask)
        }
        a.tools = a.tools || {
            version: "1.2.6"
        };
        var b;
        b = a.tools.expose = {
            conf: {
                maskId: "exposeMask",
                loadSpeed: "slow",
                closeSpeed: "fast",
                closeOnClick: !0,
                closeOnEsc: !0,
                zIndex: 9998,
                opacity: .8,
                startOpacity: 0,
                color: "#fff",
                onLoad: null,
                onClose: null
            }
        };
        var e, f, g, h, i;
        a.mask = {
            load: function(j, k) {
                if (g) return this;
                typeof j == "string" && (j = {
                    color: j
                }), j = j || h, h = j = a.extend(a.extend({}, b.conf), j), e = a("#" + j.maskId), e.length || (e = a("<div/>").attr("id", j.maskId), a("body").append(e));
                var l = c();
                return e.css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: l[0],
                    height: l[1],
                    display: "none",
                    opacity: j.startOpacity,
                    zIndex: j.zIndex
                }), j.color && e.css("backgroundColor", j.color), d(j.onBeforeLoad) === !1 ? this : (j.closeOnEsc && a(document).bind("keydown.mask", function(b) {
                    b.keyCode == 27 && a.mask.close(b)
                }), j.closeOnClick && e.bind("click.mask", function(b) {
                    a.mask.close(b)
                }), a(window).bind("resize.mask", function() {
                    a.mask.fit()
                }), k && k.length && (i = k.eq(0).css("zIndex"), a.each(k, function() {
                    var b = a(this);
                    /relative|absolute|fixed/i.test(b.css("position")) || b.css("position", "relative")
                }), f = k.css({
                    zIndex: Math.max(j.zIndex + 1, i == "auto" ? 0 : i)
                })), e.css({
                    display: "block"
                }).fadeTo(j.loadSpeed, j.opacity, function() {
                    a.mask.fit(), d(j.onLoad), g = "full"
                }), g = !0, this)
            },
            close: function() {
                if (g) {
                    if (d(h.onBeforeClose) === !1) return this;
                    e.fadeOut(h.closeSpeed, function() {
                        d(h.onClose), f && f.css({
                            zIndex: i
                        }), g = !1
                    }), a(document).unbind("keydown.mask"), e.unbind("click.mask"), a(window).unbind("resize.mask")
                }
                return this
            },
            fit: function() {
                if (g) {
                    var a = c();
                    e.css({
                        width: a[0],
                        height: a[1]
                    })
                }
            },
            getMask: function() {
                return e
            },
            isLoaded: function(a) {
                return a ? g == "full" : g
            },
            getConf: function() {
                return h
            },
            getExposed: function() {
                return f
            }
        }, a.fn.mask = function(b) {
            return a.mask.load(b), this
        }, a.fn.expose = function(b) {
            return a.mask.load(b, this), this
        }
    }(jQuery),
    function() {
        function f(a, b) {
            if (b)
                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        }

        function g(a, b) {
            var c = [];
            for (var d in a) a.hasOwnProperty(d) && (c[d] = b(a[d]));
            return c
        }

        function j(c, d, e) {
            if (h.isSupported(d.version)) c.innerHTML = h.getHTML(d, e);
            else if (d.expressInstall && h.isSupported([6, 65])) c.innerHTML = h.getHTML(f(d, {
                src: d.expressInstall
            }), {
                MMredirectURL: location.href,
                MMplayerType: "PlugIn",
                MMdoctitle: document.title
            });
            else {
                c.innerHTML.replace(/\s/g, "") || (c.innerHTML = "<h2>Flash version " + d.version + " or greater is required</h2>" + "<h3>" + (i[0] > 0 ? "Your version is " + i : "You have no flash plugin installed") + "</h3>" + (c.tagName == "A" ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='" + b + "'>here</a></p>"), c.tagName == "A" && (c.onclick = function() {
                    location.href = b
                }));
                if (d.onFail) {
                    var g = d.onFail.call(this);
                    typeof g == "string" && (c.innerHTML = g)
                }
            }
            a && (window[d.id] = document.getElementById(d.id)), f(this, {
                getRoot: function() {
                    return c
                },
                getOptions: function() {
                    return d
                },
                getConf: function() {
                    return e
                },
                getApi: function() {
                    return c.firstChild
                }
            })
        }
        var a = document.all,
            b = "http://www.adobe.com/go/getflashplayer",
            c = typeof jQuery == "function",
            d = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
            e = {
                width: "100%",
                height: "100%",
                id: "_" + ("" + Math.random()).slice(9),
                allowfullscreen: !0,
                allowscriptaccess: "always",
                quality: "high",
                version: [3, 0],
                onFail: null,
                expressInstall: null,
                w3c: !1,
                cachebusting: !1
            };
        window.attachEvent && window.attachEvent("onbeforeunload", function() {
            __flash_unloadHandler = function() {}, __flash_savedUnloadHandler = function() {}
        }), window.flashembed = function(a, b, c) {
            typeof a == "string" && (a = document.getElementById(a.replace("#", "")));
            if (!a) return;
            return typeof b == "string" && (b = {
                src: b
            }), new j(a, f(f({}, e), b), c)
        };
        var h = f(window.flashembed, {
                conf: e,
                getVersion: function() {
                    var a, b;
                    try {
                        b = navigator.plugins["Shockwave Flash"].description.slice(16)
                    } catch (c) {
                        try {
                            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a && a.GetVariable("$version")
                        } catch (e) {
                            try {
                                a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = a && a.GetVariable("$version")
                            } catch (f) {}
                        }
                    }
                    return b = d.exec(b), b ? [b[1], b[3]] : [0, 0]
                },
                asString: function(a) {
                    if (a === null || a === undefined) return null;
                    var b = typeof a;
                    b == "object" && a.push && (b = "array");
                    switch (b) {
                        case "string":
                            return a = a.replace(new RegExp('(["\\\\])', "g"), "\\$1"), a = a.replace(/^\s?(\d+\.?\d*)%/, "$1pct"), '"' + a + '"';
                        case "array":
                            return "[" + g(a, function(a) {
                                return h.asString(a)
                            }).join(",") + "]";
                        case "function":
                            return '"function()"';
                        case "object":
                            var c = [];
                            for (var d in a) a.hasOwnProperty(d) && c.push('"' + d + '":' + h.asString(a[d]));
                            return "{" + c.join(",") + "}"
                    }
                    return String(a).replace(/\s/g, " ").replace(/\'/g, '"')
                },
                getHTML: function(b, c) {
                    b = f({}, b);
                    var d = '<object width="' + b.width + '" height="' + b.height + '" id="' + b.id + '" name="' + b.id + '"';
                    b.cachebusting && (b.src += (b.src.indexOf("?") != -1 ? "&" : "?") + Math.random()), b.w3c || !a ? d += ' data="' + b.src + '" type="application/x-shockwave-flash"' : d += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', d += ">";
                    if (b.w3c || a) d += '<param name="movie" value="' + b.src + '" />';
                    b.width = b.height = b.id = b.w3c = b.src = null, b.onFail = b.version = b.expressInstall = null;
                    for (var e in b) b[e] && (d += '<param name="' + e + '" value="' + b[e] + '" />');
                    var g = "";
                    if (c) {
                        for (var i in c)
                            if (c[i]) {
                                var j = c[i];
                                g += i + "=" + encodeURIComponent(/function|object/.test(typeof j) ? h.asString(j) : j) + "&"
                            }
                        g = g.slice(0, -1), d += '<param name="flashvars" value=\'' + g + "' />"
                    }
                    return d += "</object>", d
                },
                isSupported: function(a) {
                    return i[0] > a[0] || i[0] == a[0] && i[1] >= a[1]
                }
            }),
            i = h.getVersion();
        c && (jQuery.tools = jQuery.tools || {
            version: "1.2.6"
        }, jQuery.tools.flashembed = {
            conf: e
        }, jQuery.fn.flashembed = function(a, b) {
            return this.each(function() {
                jQuery(this).data("flashembed", flashembed(this, a, b))
            })
        })
    }(),
    function(a) {
        function f(a) {
            if (a) {
                var b = c.contentWindow.document;
                b.open().close(), b.location.hash = a
            }
        }
        var b, c, d, e;
        a.tools = a.tools || {
            version: "1.2.6"
        }, a.tools.history = {
            init: function(g) {
                if (e) return;
                a.browser.msie && a.browser.version < "8" ? c || (c = a("<iframe/>").attr("src", "javascript:false;").hide().get(0), a("body").prepend(c), setInterval(function() {
                    var d = c.contentWindow.document,
                        e = d.location.hash;
                    b !== e && a(window).trigger("hash", e)
                }, 100), f(location.hash || "#")) : setInterval(function() {
                    var c = location.hash;
                    c !== b && a(window).trigger("hash", c)
                }, 100), d = d ? d.add(g) : g, g.click(function(b) {
                    var d = a(this).attr("href");
                    c && f(d);
                    if (d.slice(0, 1) != "#") return location.href = "#" + d, b.preventDefault()
                }), e = !0
            }
        }, a(window).bind("hash", function(c, e) {
            e ? d.filter(function() {
                var b = a(this).attr("href");
                return b == e || b == e.replace("#", "")
            }).trigger("history", [e]) : d.eq(0).trigger("history", [e]), b = e
        }), a.fn.history = function(b) {
            return a.tools.history.init(this), this.bind("history", b)
        }
    }(jQuery),
    function(a) {
        function c(b) {
            switch (b.type) {
                case "mousemove":
                    return a.extend(b.data, {
                        clientX: b.clientX,
                        clientY: b.clientY,
                        pageX: b.pageX,
                        pageY: b.pageY
                    });
                case "DOMMouseScroll":
                    a.extend(b, b.data), b.delta = -b.detail / 3;
                    break;
                case "mousewheel":
                    b.delta = b.wheelDelta / 120
            }
            return b.type = "wheel", a.event.handle.call(this, b, b.delta)
        }
        a.fn.mousewheel = function(a) {
            return this[a ? "bind" : "trigger"]("wheel", a)
        }, a.event.special.wheel = {
            setup: function() {
                a.event.add(this, b, c, {})
            },
            teardown: function() {
                a.event.remove(this, b, c)
            }
        };
        var b = a.browser.mozilla ? "DOMMouseScroll" + (a.browser.version < "1.9" ? " mousemove" : "") : "mousewheel"
    }(jQuery),
    function(a) {
        function c(b, c, d) {
            var e = d.relative ? b.position().top : b.offset().top,
                f = d.relative ? b.position().left : b.offset().left,
                g = d.position[0];
            e -= c.outerHeight() - d.offset[0], f += b.outerWidth() + d.offset[1], /iPad/i.test(navigator.userAgent) && (e -= a(window).scrollTop());
            var h = c.outerHeight() + b.outerHeight();
            g == "center" && (e += h / 2), g == "bottom" && (e += h), g = d.position[1];
            var i = c.outerWidth() + b.outerWidth();
            return g == "center" && (f -= i / 2), g == "left" && (f -= i), {
                top: e,
                left: f
            }
        }

        function d(d, e) {
            var f = this,
                g = d.add(f),
                h, i = 0,
                j = 0,
                k = d.attr("title"),
                l = d.attr("data-tooltip"),
                m = b[e.effect],
                n, o = d.is(":input"),
                p = o && d.is(":checkbox, :radio, select, :button, :submit"),
                q = d.attr("type"),
                r = e.events[q] || e.events[o ? p ? "widget" : "input" : "def"];
            if (!m) throw 'Nonexistent effect "' + e.effect + '"';
            r = r.split(/,\s*/);
            if (r.length != 2) throw "Tooltip: bad events configuration for " + q;
            d.bind(r[0], function(a) {
                clearTimeout(i), e.predelay ? j = setTimeout(function() {
                    f.show(a)
                }, e.predelay) : f.show(a)
            }).bind(r[1], function(a) {
                clearTimeout(j), e.delay ? i = setTimeout(function() {
                    f.hide(a)
                }, e.delay) : f.hide(a)
            }), k && e.cancelDefault && (d.removeAttr("title"), d.data("title", k)), a.extend(f, {
                show: function(b) {
                    if (!h) {
                        l ? h = a(l) : e.tip ? h = a(e.tip).eq(0) : k ? h = a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k) : (h = d.next(), h.length || (h = d.parent().next()));
                        if (!h.length) throw "Cannot find tooltip for " + d
                    }
                    if (f.isShown()) return f;
                    h.stop(!0, !0);
                    var o = c(d, h, e);
                    e.tip && h.html(d.data("title")), b = a.Event(), b.type = "onBeforeShow", g.trigger(b, [o]);
                    if (b.isDefaultPrevented()) return f;
                    o = c(d, h, e), h.css({
                        position: "absolute",
                        top: o.top,
                        left: o.left
                    }), n = !0, m[0].call(f, function() {
                        b.type = "onShow", n = "full", g.trigger(b)
                    });
                    var p = e.events.tooltip.split(/,\s*/);
                    return h.data("__set") || (h.unbind(p[0]).bind(p[0], function() {
                        clearTimeout(i), clearTimeout(j)
                    }), p[1] && !d.is("input:not(:checkbox, :radio), textarea") && h.unbind(p[1]).bind(p[1], function(a) {
                        a.relatedTarget != d[0] && d.trigger(r[1].split(" ")[0])
                    }), e.tip || h.data("__set", !0)), f
                },
                hide: function(c) {
                    if (!h || !f.isShown()) return f;
                    c = a.Event(), c.type = "onBeforeHide", g.trigger(c);
                    if (c.isDefaultPrevented()) return;
                    return n = !1, b[e.effect][1].call(f, function() {
                        c.type = "onHide", g.trigger(c)
                    }), f
                },
                isShown: function(a) {
                    return a ? n == "full" : n
                },
                getConf: function() {
                    return e
                },
                getTip: function() {
                    return h
                },
                getTrigger: function() {
                    return d
                }
            }), a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(b, c) {
                a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                    return b && a(f).bind(c, b), f
                }
            })
        }
        a.tools = a.tools || {
            version: "1.2.6"
        }, a.tools.tooltip = {
            conf: {
                effect: "toggle",
                fadeOutSpeed: "fast",
                predelay: 0,
                delay: 30,
                opacity: 1,
                tip: 0,
                fadeIE: !1,
                position: ["top", "center"],
                offset: [0, 0],
                relative: !1,
                cancelDefault: !0,
                events: {
                    def: "mouseenter,mouseleave",
                    input: "focus,blur",
                    widget: "focus mouseenter,blur mouseleave",
                    tooltip: "mouseenter,mouseleave"
                },
                layout: "<div/>",
                tipClass: "tooltip"
            },
            addEffect: function(a, c, d) {
                b[a] = [c, d]
            }
        };
        var b = {
            toggle: [function(a) {
                var b = this.getConf(),
                    c = this.getTip(),
                    d = b.opacity;
                d < 1 && c.css({
                    opacity: d
                }), c.show(), a.call()
            }, function(a) {
                this.getTip().hide(), a.call()
            }],
            fade: [function(b) {
                var c = this.getConf();
                !a.browser.msie || c.fadeIE ? this.getTip().fadeTo(c.fadeInSpeed, c.opacity, b) : (this.getTip().show(), b())
            }, function(b) {
                var c = this.getConf();
                !a.browser.msie || c.fadeIE ? this.getTip().fadeOut(c.fadeOutSpeed, b) : (this.getTip().hide(), b())
            }]
        };
        a.fn.tooltip = function(b) {
            var c = this.data("tooltip");
            return c ? c : (b = a.extend(!0, {}, a.tools.tooltip.conf, b), typeof b.position == "string" && (b.position = b.position.split(/,?\s/)), this.each(function() {
                c = new d(a(this), b), a(this).data("tooltip", c)
            }), b.api ? c : this)
        }
    }(jQuery),
    function(a) {
        function c(b) {
            var c = a(window),
                d = c.width() + c.scrollLeft(),
                e = c.height() + c.scrollTop();
            return [b.offset().top <= c.scrollTop(), d <= b.offset().left + b.width(), e <= b.offset().top + b.height(), c.scrollLeft() >= b.offset().left]
        }

        function d(a) {
            var b = a.length;
            while (b--)
                if (a[b]) return !1;
            return !0
        }
        var b = a.tools.tooltip;
        b.dynamic = {
            conf: {
                classNames: "top right bottom left"
            }
        }, a.fn.dynamic = function(e) {
            typeof e == "number" && (e = {
                speed: e
            }), e = a.extend({}, b.dynamic.conf, e);
            var f = a.extend(!0, {}, e),
                g = e.classNames.split(/\s/),
                h;
            return this.each(function() {
                var b = a(this).tooltip().onBeforeShow(function(b, e) {
                    var i = this.getTip(),
                        j = this.getConf();
                    h || (h = [j.position[0], j.position[1], j.offset[0], j.offset[1], a.extend({}, j)]), a.extend(j, h[4]), j.position = [h[0], h[1]], j.offset = [h[2], h[3]], i.css({
                        visibility: "hidden",
                        position: "absolute",
                        top: e.top,
                        left: e.left
                    }).show();
                    var k = a.extend(!0, {}, f),
                        l = c(i);
                    if (!d(l)) {
                        l[2] && (a.extend(j, k.top), j.position[0] = "top", i.addClass(g[0])), l[3] && (a.extend(j, k.right), j.position[1] = "right", i.addClass(g[1])), l[0] && (a.extend(j, k.bottom), j.position[0] = "bottom", i.addClass(g[2])), l[1] && (a.extend(j, k.left), j.position[1] = "left", i.addClass(g[3]));
                        if (l[0] || l[2]) j.offset[0] *= -1;
                        if (l[1] || l[3]) j.offset[1] *= -1
                    }
                    i.css({
                        visibility: "visible"
                    }).hide()
                });
                b.onBeforeShow(function() {
                    var a = this.getConf(),
                        b = this.getTip();
                    setTimeout(function() {
                        a.position = [h[0], h[1]], a.offset = [h[2], h[3]]
                    }, 0)
                }), b.onHide(function() {
                    var a = this.getTip();
                    a.removeClass(e.classNames)
                }), ret = b
            }), e.api ? ret : this
        }
    }(jQuery),
    function(a) {
        var b = a.tools.tooltip;
        a.extend(b.conf, {
            direction: "up",
            bounce: !1,
            slideOffset: 10,
            slideInSpeed: 200,
            slideOutSpeed: 200,
            slideFade: !a.browser.msie
        });
        var c = {
            up: ["-", "top"],
            down: ["+", "top"],
            left: ["-", "left"],
            right: ["+", "left"]
        };
        b.addEffect("slide", function(a) {
            var b = this.getConf(),
                d = this.getTip(),
                e = b.slideFade ? {
                    opacity: b.opacity
                } : {},
                f = c[b.direction] || c.up;
            e[f[1]] = f[0] + "=" + b.slideOffset, b.slideFade && d.css({
                opacity: 0
            }), d.show().animate(e, b.slideInSpeed, a)
        }, function(b) {
            var d = this.getConf(),
                e = d.slideOffset,
                f = d.slideFade ? {
                    opacity: 0
                } : {},
                g = c[d.direction] || c.up,
                h = "" + g[0];
            d.bounce && (h = h == "+" ? "-" : "+"), f[g[1]] = h + "=" + e, this.getTip().animate(f, d.slideOutSpeed, function() {
                a(this).hide(), b.call()
            })
        })
    }(jQuery),
    function(a) {
        function h(b, c, d) {
            var e = b.offset().top,
                f = b.offset().left,
                g = d.position.split(/,?\s+/),
                h = g[0],
                i = g[1];
            e -= c.outerHeight() - d.offset[0], f += b.outerWidth() + d.offset[1], /iPad/i.test(navigator.userAgent) && (e -= a(window).scrollTop());
            var j = c.outerHeight() + b.outerHeight();
            h == "center" && (e += j / 2), h == "bottom" && (e += j);
            var k = b.outerWidth();
            return i == "center" && (f -= (k + c.outerWidth()) / 2), i == "left" && (f -= k), {
                top: e,
                left: f
            }
        }

        function i(a) {
            function b() {
                return this.getAttribute("type") == a
            }
            return b.key = "[type=" + a + "]", b
        }

        function l(b, c, e) {
            function l(b, c, d) {
                if (!e.grouped && b.length) return;
                var f;
                if (d === !1 || a.isArray(d)) {
                    f = g.messages[c.key || c] || g.messages["*"], f = f[e.lang] || g.messages["*"].en;
                    var h = f.match(/\$\d/g);
                    h && a.isArray(d) && a.each(h, function(a) {
                        f = f.replace(this, d[a])
                    })
                } else f = d[e.lang] || d;
                b.push(f)
            }
            var f = this,
                i = c.add(f);
            b = b.not(":button, :image, :reset, :submit"), c.attr("novalidate", "novalidate"), a.extend(f, {
                getConf: function() {
                    return e
                },
                getForm: function() {
                    return c
                },
                getInputs: function() {
                    return b
                },
                reflow: function() {
                    return b.each(function() {
                        var b = a(this),
                            c = b.data("msg.el");
                        if (c) {
                            var d = h(b, c, e);
                            c.css({
                                top: d.top,
                                left: d.left
                            })
                        }
                    }), f
                },
                invalidate: function(c, d) {
                    if (!d) {
                        var g = [];
                        a.each(c, function(a, c) {
                            var d = b.filter("[name='" + a + "']");
                            d.length && (d.trigger("OI", [c]), g.push({
                                input: d,
                                messages: [c]
                            }))
                        }), c = g, d = a.Event()
                    }
                    return d.type = "onFail", i.trigger(d, [c]), d.isDefaultPrevented() || k[e.effect][0].call(f, c, d), f
                },
                reset: function(c) {
                    return c = c || b, c.removeClass(e.errorClass).each(function() {
                        var b = a(this).data("msg.el");
                        b && (b.remove(), a(this).data("msg.el", null))
                    }).unbind(e.errorInputEvent || ""), f
                },
                destroy: function() {
                    return c.unbind(e.formEvent + ".V").unbind("reset.V"), b.unbind(e.inputEvent + ".V").unbind("change.V"), f.reset()
                },
                checkValidity: function(c, g) {
                    c = c || b, c = c.not(":disabled");
                    if (!c.length) return !0;
                    g = g || a.Event(), g.type = "onBeforeValidate", i.trigger(g, [c]);
                    if (g.isDefaultPrevented()) return g.result;
                    var h = [];
                    c.not(":radio:not(:checked)").each(function() {
                        var b = [],
                            c = a(this).data("messages", b),
                            k = d && c.is(":date") ? "onHide.v" : e.errorInputEvent + ".v";
                        c.unbind(k), a.each(j, function() {
                            var a = this,
                                d = a[0];
                            if (c.filter(d).length) {
                                var h = a[1].call(f, c, c.val());
                                if (h !== !0) {
                                    g.type = "onBeforeFail", i.trigger(g, [c, d]);
                                    if (g.isDefaultPrevented()) return !1;
                                    var j = c.attr(e.messageAttr);
                                    if (j) return b = [j], !1;
                                    l(b, d, h)
                                }
                            }
                        }), b.length && (h.push({
                            input: c,
                            messages: b
                        }), c.trigger("OI", [b]), e.errorInputEvent && c.bind(k, function(a) {
                            f.checkValidity(c, a)
                        }));
                        if (e.singleError && h.length) return !1
                    });
                    var m = k[e.effect];
                    if (!m) throw 'Validator: cannot find effect "' + e.effect + '"';
                    return h.length ? (f.invalidate(h, g), !1) : (m[1].call(f, c, g), g.type = "onSuccess", i.trigger(g, [c]), c.unbind(e.errorInputEvent + ".v"), !0)
                }
            }), a.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","), function(b, c) {
                a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                    return b && a(f).bind(c, b), f
                }
            }), e.formEvent && c.bind(e.formEvent + ".V", function(a) {
                if (!f.checkValidity(null, a)) return a.preventDefault();
                a.target = c, a.type = e.formEvent
            }), c.bind("reset.V", function() {
                f.reset()
            }), b[0] && b[0].validity && b.each(function() {
                this.oninvalid = function() {
                    return !1
                }
            }), c[0] && (c[0].checkValidity = f.checkValidity), e.inputEvent && b.bind(e.inputEvent + ".V", function(b) {
                f.checkValidity(a(this), b)
            }), b.filter(":checkbox, select").filter("[required]").bind("change.V", function(b) {
                var c = a(this);
                (this.checked || c.is("select") && a(this).val()) && k[e.effect][1].call(f, c, b)
            });
            var m = b.filter(":radio").change(function(a) {
                f.checkValidity(m, a)
            });
            a(window).resize(function() {
                f.reflow()
            })
        }
        a.tools = a.tools || {
            version: "1.2.6"
        };
        var b = /\[type=([a-z]+)\]/,
            c = /^-?[0-9]*(\.[0-9]+)?$/,
            d = a.tools.dateinput,
            e = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
            f = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,
            g;
        g = a.tools.validator = {
            conf: {
                grouped: !1,
                effect: "default",
                errorClass: "invalid",
                inputEvent: null,
                errorInputEvent: "keyup",
                formEvent: "submit",
                lang: "en",
                message: "<div/>",
                messageAttr: "data-message",
                messageClass: "error",
                offset: [0, 0],
                position: "center right",
                singleError: !1,
                speed: "normal"
            },
            messages: {
                "*": {
                    en: "Please correct this value"
                }
            },
            localize: function(b, c) {
                a.each(c, function(a, c) {
                    g.messages[a] = g.messages[a] || {}, g.messages[a][b] = c
                })
            },
            localizeFn: function(b, c) {
                g.messages[b] = g.messages[b] || {}, a.extend(g.messages[b], c)
            },
            fn: function(c, d, e) {
                a.isFunction(d) ? e = d : (typeof d == "string" && (d = {
                    en: d
                }), this.messages[c.key || c] = d);
                var f = b.exec(c);
                f && (c = i(f[1])), j.push([c, e])
            },
            addEffect: function(a, b, c) {
                k[a] = [b, c]
            }
        };
        var j = [],
            k = {
                "default": [function(b) {
                    var c = this.getConf();
                    a.each(b, function(b, d) {
                        var e = d.input;
                        e.addClass(c.errorClass);
                        var f = e.data("msg.el");
                        f || (f = a(c.message).addClass(c.messageClass).appendTo(document.body), e.data("msg.el", f)), f.css({
                            visibility: "hidden"
                        }).find("p").remove(), a.each(d.messages, function(b, c) {
                            a("<p/>").html(c).appendTo(f)
                        }), f.outerWidth() == f.parent().width() && f.add(f.find("p")).css({
                            display: "inline"
                        });
                        var g = h(e, f, c);
                        f.css({
                            visibility: "visible",
                            position: "absolute",
                            top: g.top,
                            left: g.left
                        }).fadeIn(c.speed)
                    })
                }, function(b) {
                    var c = this.getConf();
                    b.removeClass(c.errorClass).each(function() {
                        var b = a(this).data("msg.el");
                        b && b.css({
                            visibility: "hidden"
                        })
                    })
                }]
            };
        a.each("email,url,number".split(","), function(b, c) {
            a.expr[":"][c] = function(a) {
                return a.getAttribute("type") === c
            }
        }), a.fn.oninvalid = function(a) {
            return this[a ? "bind" : "trigger"]("OI", a)
        }, g.fn(":email", "Please enter a valid email address", function(a, b) {
            return !b || e.test(b)
        }), g.fn(":url", "Please enter a valid URL", function(a, b) {
            return !b || f.test(b)
        }), g.fn(":number", "Please enter a numeric value.", function(a, b) {
            return c.test(b)
        }), g.fn("[max]", "Please enter a value no larger than $1", function(a, b) {
            if (b === "" || d && a.is(":date")) return !0;
            var c = a.attr("max");
            return parseFloat(b) <= parseFloat(c) ? !0 : [c]
        }), g.fn("[min]", "Please enter a value of at least $1", function(a, b) {
            if (b === "" || d && a.is(":date")) return !0;
            var c = a.attr("min");
            return parseFloat(b) >= parseFloat(c) ? !0 : [c]
        }), g.fn("[required]", "Please complete this mandatory field.", function(a, b) {
            return a.is(":checkbox") ? a.is(":checked") : !!b
        }), g.fn("[pattern]", function(a) {
            var b = new RegExp("^" + a.attr("pattern") + "$");
            return b.test(a.val())
        }), a.fn.validator = function(b) {
            var c = this.data("validator");
            return c && (c.destroy(), this.removeData("validator")), b = a.extend(!0, {}, g.conf, b), this.is("form") ? this.each(function() {
                var d = a(this);
                c = new l(d.find(":input"), d, b), d.data("validator", c)
            }) : (c = new l(this, this.eq(0).closest("form"), b), this.data("validator", c))
        }
    }(jQuery);
  