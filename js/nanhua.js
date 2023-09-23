window=this;
self=window;
(function() {
    var t = {
        3504: function(e, t, n) {
            "use strict";
            e.exports = n(8473)
        },
        8473: function(e, t, n) {
            "use strict";
            var i = t;
            function r() {
                i.util._configure(),
                i.Writer._configure(i.BufferWriter),
                i.Reader._configure(i.BufferReader)
            }
            i.build = "minimal",
            i.Writer = n(5993),
            i.BufferWriter = n(9189),
            i.Reader = n(6534),
            i.BufferReader = n(279),
            i.util = n(8568),
            i.rpc = n(658),
            i.roots = n(6854),
            i.configure = r,
            r()
        },
        5993: function(e, t, n) {
            "use strict";
            e.exports = h;
            var i, r = n(8568), o = r.LongBits, a = r.base64, s = r.utf8;
            function l(e, t, n) {
                this.fn = e,
                this.len = t,
                this.next = void 0,
                this.val = n
            }
            function u() {}
            function c(e) {
                this.head = e.head,
                this.tail = e.tail,
                this.len = e.len,
                this.next = e.states
            }
            function h() {
                this.len = 0,
                this.head = new l(u,0,0),
                this.tail = this.head,
                this.states = null
            }
            var d = function() {
                return r.Buffer ? function() {
                    return (h.create = function() {
                        return new i
                    }
                    )()
                }
                : function() {
                    return new h
                }
            };
            function f(e, t, n) {
                t[n] = 255 & e
            }
            function p(e, t, n) {
                while (e > 127)
                    t[n++] = 127 & e | 128,
                    e >>>= 7;
                t[n] = e
            }
            function m(e, t) {
                this.len = e,
                this.next = void 0,
                this.val = t
            }
            function v(e, t, n) {
                while (e.hi)
                    t[n++] = 127 & e.lo | 128,
                    e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0,
                    e.hi >>>= 7;
                while (e.lo > 127)
                    t[n++] = 127 & e.lo | 128,
                    e.lo = e.lo >>> 7;
                t[n++] = e.lo
            }
            function g(e, t, n) {
                t[n] = 255 & e,
                t[n + 1] = e >>> 8 & 255,
                t[n + 2] = e >>> 16 & 255,
                t[n + 3] = e >>> 24
            }
            h.create = d(),
            h.alloc = function(e) {
                return new r.Array(e)
            }
            ,
            r.Array !== Array && (h.alloc = r.pool(h.alloc, r.Array.prototype.subarray)),
            h.prototype._push = function(e, t, n) {
                return this.tail = this.tail.next = new l(e,t,n),
                this.len += t,
                this
            }
            ,
            m.prototype = Object.create(l.prototype),
            m.prototype.fn = p,
            h.prototype.uint32 = function(e) {
                return this.len += (this.tail = this.tail.next = new m((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5,e)).len,
                this
            }
            ,
            h.prototype.int32 = function(e) {
                return e < 0 ? this._push(v, 10, o.fromNumber(e)) : this.uint32(e)
            }
            ,
            h.prototype.sint32 = function(e) {
                return this.uint32((e << 1 ^ e >> 31) >>> 0)
            }
            ,
            h.prototype.uint64 = function(e) {
                var t = o.from(e);
                return this._push(v, t.length(), t)
            }
            ,
            h.prototype.int64 = h.prototype.uint64,
            h.prototype.sint64 = function(e) {
                var t = o.from(e).zzEncode();
                return this._push(v, t.length(), t)
            }
            ,
            h.prototype.bool = function(e) {
                return this._push(f, 1, e ? 1 : 0)
            }
            ,
            h.prototype.fixed32 = function(e) {
                return this._push(g, 4, e >>> 0)
            }
            ,
            h.prototype.sfixed32 = h.prototype.fixed32,
            h.prototype.fixed64 = function(e) {
                var t = o.from(e);
                return this._push(g, 4, t.lo)._push(g, 4, t.hi)
            }
            ,
            h.prototype.sfixed64 = h.prototype.fixed64,
            h.prototype.float = function(e) {
                return this._push(r.float.writeFloatLE, 4, e)
            }
            ,
            h.prototype.double = function(e) {
                return this._push(r.float.writeDoubleLE, 8, e)
            }
            ;
            var y = r.Array.prototype.set ? function(e, t, n) {
                t.set(e, n)
            }
            : function(e, t, n) {
                for (var i = 0; i < e.length; ++i)
                    t[n + i] = e[i]
            }
            ;
            h.prototype.bytes = function(e) {
                var t = e.length >>> 0;
                if (!t)
                    return this._push(f, 1, 0);
                if (r.isString(e)) {
                    var n = h.alloc(t = a.length(e));
                    a.decode(e, n, 0),
                    e = n
                }
                return this.uint32(t)._push(y, t, e)
            }
            ,
            h.prototype.string = function(e) {
                var t = s.length(e);
                return t ? this.uint32(t)._push(s.write, t, e) : this._push(f, 1, 0)
            }
            ,
            h.prototype.fork = function() {
                return this.states = new c(this),
                this.head = this.tail = new l(u,0,0),
                this.len = 0,
                this
            }
            ,
            h.prototype.reset = function() {
                return this.states ? (this.head = this.states.head,
                this.tail = this.states.tail,
                this.len = this.states.len,
                this.states = this.states.next) : (this.head = this.tail = new l(u,0,0),
                this.len = 0),
                this
            }
            ,
            h.prototype.ldelim = function() {
                var e = this.head
                  , t = this.tail
                  , n = this.len;
                return this.reset().uint32(n),
                n && (this.tail.next = e.next,
                this.tail = t,
                this.len += n),
                this
            }
            ,
            h.prototype.finish = function() {
                var e = this.head.next
                  , t = this.constructor.alloc(this.len)
                  , n = 0;
                while (e)
                    e.fn(e.val, t, n),
                    n += e.len,
                    e = e.next;
                return t
            }
            ,
            h._configure = function(e) {
                i = e,
                h.create = d(),
                i._configure()
            }
        },
        8568: function(e, t, n) {
            "use strict";
            var i = t;
            function r(e, t, n) {
                for (var i = Object.keys(t), r = 0; r < i.length; ++r)
                    void 0 !== e[i[r]] && n || (e[i[r]] = t[i[r]]);
                return e
            }
            function o(e) {
                function t(e, n) {
                    if (!(this instanceof t))
                        return new t(e,n);
                    Object.defineProperty(this, "message", {
                        get: function() {
                            return e
                        }
                    }),
                    Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
                        value: (new Error).stack || ""
                    }),
                    n && r(this, n)
                }
                return (t.prototype = Object.create(Error.prototype)).constructor = t,
                Object.defineProperty(t.prototype, "name", {
                    get: function() {
                        return e
                    }
                }),
                t.prototype.toString = function() {
                    return this.name + ": " + this.message
                }
                ,
                t
            }
            i.asPromise = n(4433),
            i.base64 = n(7995),
            i.EventEmitter = n(861),
            i.float = n(2484),
            i.inquire = n(442),
            i.utf8 = n(3523),
            i.pool = n(3168),
            i.LongBits = n(1448),
            i.isNode = Boolean("undefined" !== typeof n.g && n.g && n.g.process && n.g.process.versions && n.g.process.versions.node),
            i.global = i.isNode && n.g || "undefined" !== typeof window && window || "undefined" !== typeof self && self || this,
            i.emptyArray = Object.freeze ? Object.freeze([]) : [],
            i.emptyObject = Object.freeze ? Object.freeze({}) : {},
            i.isInteger = Number.isInteger || function(e) {
                return "number" === typeof e && isFinite(e) && Math.floor(e) === e
            }
            ,
            i.isString = function(e) {
                return "string" === typeof e || e instanceof String
            }
            ,
            i.isObject = function(e) {
                return e && "object" === typeof e
            }
            ,
            i.isset = i.isSet = function(e, t) {
                var n = e[t];
                return !(null == n || !e.hasOwnProperty(t)) && ("object" !== typeof n || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0)
            }
            ,
            i.Buffer = function() {
                try {
                    var e = i.inquire("buffer").Buffer;
                    return e.prototype.utf8Write ? e : null
                } catch (t) {
                    return null
                }
            }(),
            i._Buffer_from = null,
            i._Buffer_allocUnsafe = null,
            i.newBuffer = function(e) {
                return "number" === typeof e ? i.Buffer ? i._Buffer_allocUnsafe(e) : new i.Array(e) : i.Buffer ? i._Buffer_from(e) : "undefined" === typeof Uint8Array ? e : new Uint8Array(e)
            }
            ,
            i.Array = "undefined" !== typeof Uint8Array ? Uint8Array : Array,
            i.Long = i.global.dcodeIO && i.global.dcodeIO.Long || i.global.Long || i.inquire("long"),
            i.key2Re = /^true|false|0|1$/,
            i.key32Re = /^-?(?:0|[1-9][0-9]*)$/,
            i.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,
            i.longToHash = function(e) {
                return e ? i.LongBits.from(e).toHash() : i.LongBits.zeroHash
            }
            ,
            i.longFromHash = function(e, t) {
                var n = i.LongBits.fromHash(e);
                return i.Long ? i.Long.fromBits(n.lo, n.hi, t) : n.toNumber(Boolean(t))
            }
            ,
            i.merge = r,
            i.lcFirst = function(e) {
                return e.charAt(0).toLowerCase() + e.substring(1)
            }
            ,
            i.newError = o,
            i.ProtocolError = o("ProtocolError"),
            i.oneOfGetter = function(e) {
                for (var t = {}, n = 0; n < e.length; ++n)
                    t[e[n]] = 1;
                return function() {
                    for (var e = Object.keys(this), n = e.length - 1; n > -1; --n)
                        if (1 === t[e[n]] && void 0 !== this[e[n]] && null !== this[e[n]])
                            return e[n]
                }
            }
            ,
            i.oneOfSetter = function(e) {
                return function(t) {
                    for (var n = 0; n < e.length; ++n)
                        e[n] !== t && delete this[e[n]]
                }
            }
            ,
            i.toJSONOptions = {
                longs: String,
                enums: String,
                bytes: String,
                json: !0
            },
            i._configure = function() {
                var e = i.Buffer;
                e ? (i._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, n) {
                    return new e(t,n)
                }
                ,
                i._Buffer_allocUnsafe = e.allocUnsafe || function(t) {
                    return new e(t)
                }
                ) : i._Buffer_from = i._Buffer_allocUnsafe = null
            }
        },
        4433: function(e) {
            "use strict";
            function t(e, t) {
                var n = new Array(arguments.length - 1)
                  , i = 0
                  , r = 2
                  , o = !0;
                while (r < arguments.length)
                    n[i++] = arguments[r++];
                return new Promise((function(r, a) {
                    n[i] = function(e) {
                        if (o)
                            if (o = !1,
                            e)
                                a(e);
                            else {
                                var t = new Array(arguments.length - 1)
                                  , n = 0;
                                while (n < t.length)
                                    t[n++] = arguments[n];
                                r.apply(null, t)
                            }
                    }
                    ;
                    try {
                        e.apply(t || null, n)
                    } catch (s) {
                        o && (o = !1,
                        a(s))
                    }
                }
                ))
            }
            e.exports = t
        },
        7995: function(e, t, n) {
            "use strict";
            n(7658);
            var i = t;
            i.length = function(e) {
                var t = e.length;
                if (!t)
                    return 0;
                var n = 0;
                while (--t % 4 > 1 && "=" === e.charAt(t))
                    ++n;
                return Math.ceil(3 * e.length) / 4 - n
            }
            ;
            for (var r = new Array(64), o = new Array(123), a = 0; a < 64; )
                o[r[a] = a < 26 ? a + 65 : a < 52 ? a + 71 : a < 62 ? a - 4 : a - 59 | 43] = a++;
            i.encode = function(e, t, n) {
                var i, o = null, a = [], s = 0, l = 0;
                while (t < n) {
                    var u = e[t++];
                    switch (l) {
                    case 0:
                        a[s++] = r[u >> 2],
                        i = (3 & u) << 4,
                        l = 1;
                        break;
                    case 1:
                        a[s++] = r[i | u >> 4],
                        i = (15 & u) << 2,
                        l = 2;
                        break;
                    case 2:
                        a[s++] = r[i | u >> 6],
                        a[s++] = r[63 & u],
                        l = 0;
                        break
                    }
                    s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, a)),
                    s = 0)
                }
                return l && (a[s++] = r[i],
                a[s++] = 61,
                1 === l && (a[s++] = 61)),
                o ? (s && o.push(String.fromCharCode.apply(String, a.slice(0, s))),
                o.join("")) : String.fromCharCode.apply(String, a.slice(0, s))
            }
            ;
            var s = "invalid encoding";
            i.decode = function(e, t, n) {
                for (var i, r = n, a = 0, l = 0; l < e.length; ) {
                    var u = e.charCodeAt(l++);
                    if (61 === u && a > 1)
                        break;
                    if (void 0 === (u = o[u]))
                        throw Error(s);
                    switch (a) {
                    case 0:
                        i = u,
                        a = 1;
                        break;
                    case 1:
                        t[n++] = i << 2 | (48 & u) >> 4,
                        i = u,
                        a = 2;
                        break;
                    case 2:
                        t[n++] = (15 & i) << 4 | (60 & u) >> 2,
                        i = u,
                        a = 3;
                        break;
                    case 3:
                        t[n++] = (3 & i) << 6 | u,
                        a = 0;
                        break
                    }
                }
                if (1 === a)
                    throw Error(s);
                return n - r
            }
            ,
            i.test = function(e) {
                return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)
            }
        },
        7658: function(e, t, n) {
            "use strict";
            var i = n(2109)
              , r = n(7908)
              , o = n(6244)
              , a = n(3658)
              , s = n(7207)
              , l = n(7293)
              , u = l((function() {
                return 4294967297 !== [].push.call({
                    length: 4294967296
                }, 1)
            }
            ))
              , c = !function() {
                try {
                    Object.defineProperty([], "length", {
                        writable: !1
                    }).push()
                } catch (e) {
                    return e instanceof TypeError
                }
            }();
            i({
                target: "Array",
                proto: !0,
                arity: 1,
                forced: u || c
            }, {
                push: function(e) {
                    var t = r(this)
                      , n = o(t)
                      , i = arguments.length;
                    s(n + i);
                    for (var l = 0; l < i; l++)
                        t[n] = arguments[l],
                        n++;
                    return a(t, n),
                    n
                }
            })
        },
        2109: function(e, t, n) {
            var i = n(7854)
              , r = n(1236).f
              , o = n(8880)
              , a = n(8052)
              , s = n(3072)
              , l = n(9920)
              , u = n(4705);
            e.exports = function(e, t) {
                var n, c, h, d, f, p, m = e.target, v = e.global, g = e.stat;
                if (c = v ? i : g ? i[m] || s(m, {}) : (i[m] || {}).prototype,
                c)
                    for (h in t) {
                        if (f = t[h],
                        e.dontCallGetSet ? (p = r(c, h),
                        d = p && p.value) : d = c[h],
                        n = u(v ? h : m + (g ? "." : "#") + h, e.forced),
                        !n && void 0 !== d) {
                            if (typeof f == typeof d)
                                continue;
                            l(f, d)
                        }
                        (e.sham || d && d.sham) && o(f, "sham", !0),
                        a(c, h, f, e)
                    }
            }
        },
        7854: function(e, t, n) {
            var i = function(e) {
                return e && e.Math == Math && e
            };
            e.exports = i("object" == typeof globalThis && globalThis) || i("object" == typeof window && window) || i("object" == typeof self && self) || i("object" == typeof n.g && n.g) || function() {
                return this
            }() || Function("return this")()
        },
        1236: function(e, t, n) {
            var i = n(9781)
              , r = n(6916)
              , o = n(5296)
              , a = n(9114)
              , s = n(5656)
              , l = n(4948)
              , u = n(2597)
              , c = n(4664)
              , h = Object.getOwnPropertyDescriptor;
            t.f = i ? h : function(e, t) {
                if (e = s(e),
                t = l(t),
                c)
                    try {
                        return h(e, t)
                    } catch (n) {}
                if (u(e, t))
                    return a(!r(o.f, e, t), e[t])
            }
        },
        9781: function(e, t, n) {
            var i = n(7293);
            e.exports = !i((function() {
                return 7 != Object.defineProperty({}, 1, {
                    get: function() {
                        return 7
                    }
                })[1]
            }
            ))
        },
        7293: function(e) {
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (t) {
                    return !0
                }
            }
        },
        6916: function(e, t, n) {
            var i = n(4374)
              , r = Function.prototype.call;
            e.exports = i ? r.bind(r) : function() {
                return r.apply(r, arguments)
            }
        },
        4374: function(e, t, n) {
            var i = n(7293);
            e.exports = !i((function() {
                var e = function() {}
                .bind();
                return "function" != typeof e || e.hasOwnProperty("prototype")
            }
            ))
        },
        5296: function(e, t) {
            "use strict";
            var n = {}.propertyIsEnumerable
              , i = Object.getOwnPropertyDescriptor
              , r = i && !n.call({
                1: 2
            }, 1);
            t.f = r ? function(e) {
                var t = i(this, e);
                return !!t && t.enumerable
            }
            : n
        },
        9114: function(e) {
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        },
        5656: function(e, t, n) {
            var i = n(8361)
              , r = n(4488);
            e.exports = function(e) {
                return i(r(e))
            }
        },
        8361: function(e, t, n) {
            var i = n(1702)
              , r = n(7293)
              , o = n(4326)
              , a = Object
              , s = i("".split);
            e.exports = r((function() {
                return !a("z").propertyIsEnumerable(0)
            }
            )) ? function(e) {
                return "String" == o(e) ? s(e, "") : a(e)
            }
            : a
        },
        1702: function(e, t, n) {
            var i = n(4374)
              , r = Function.prototype
              , o = r.call
              , a = i && r.bind.bind(o, o);
            e.exports = i ? a : function(e) {
                return function() {
                    return o.apply(e, arguments)
                }
            }
        },
        4326: function(e, t, n) {
            var i = n(1702)
              , r = i({}.toString)
              , o = i("".slice);
            e.exports = function(e) {
                return o(r(e), 8, -1)
            }
        },
        4488: function(e, t, n) {
            var i = n(8554)
              , r = TypeError;
            e.exports = function(e) {
                if (i(e))
                    throw r("Can't call method on " + e);
                return e
            }
        },
        8554: function(e) {
            e.exports = function(e) {
                return null === e || void 0 === e
            }
        },
        4948: function(e, t, n) {
            var i = n(7593)
              , r = n(2190);
            e.exports = function(e) {
                var t = i(e, "string");
                return r(t) ? t : t + ""
            }
        },
        7593: function(e, t, n) {
            var i = n(6916)
              , r = n(111)
              , o = n(2190)
              , a = n(8173)
              , s = n(2140)
              , l = n(5112)
              , u = TypeError
              , c = l("toPrimitive");
            e.exports = function(e, t) {
                if (!r(e) || o(e))
                    return e;
                var n, l = a(e, c);
                if (l) {
                    if (void 0 === t && (t = "default"),
                    n = i(l, e, t),
                    !r(n) || o(n))
                        return n;
                    throw u("Can't convert object to primitive value")
                }
                return void 0 === t && (t = "number"),
                s(e, t)
            }
        },
        111: function(e, t, n) {
            var i = n(614)
              , r = n(4154)
              , o = r.all;
            e.exports = r.IS_HTMLDDA ? function(e) {
                return "object" == typeof e ? null !== e : i(e) || e === o
            }
            : function(e) {
                return "object" == typeof e ? null !== e : i(e)
            }
        },
        614: function(e, t, n) {
            var i = n(4154)
              , r = i.all;
            e.exports = i.IS_HTMLDDA ? function(e) {
                return "function" == typeof e || e === r
            }
            : function(e) {
                return "function" == typeof e
            }
        },
        4154: function(e) {
            var t = "object" == typeof document && document.all
              , n = "undefined" == typeof t && void 0 !== t;
            e.exports = {
                all: t,
                IS_HTMLDDA: n
            }
        },
        2190: function(e, t, n) {
            var i = n(5005)
              , r = n(614)
              , o = n(7976)
              , a = n(3307)
              , s = Object;
            e.exports = a ? function(e) {
                return "symbol" == typeof e
            }
            : function(e) {
                var t = i("Symbol");
                return r(t) && o(t.prototype, s(e))
            }
        },
        5005: function(e, t, n) {
            var i = n(7854)
              , r = n(614)
              , o = function(e) {
                return r(e) ? e : void 0
            };
            e.exports = function(e, t) {
                return arguments.length < 2 ? o(i[e]) : i[e] && i[e][t]
            }
        },
        7976: function(e, t, n) {
            var i = n(1702);
            e.exports = i({}.isPrototypeOf)
        },
        3307: function(e, t, n) {
            var i = n(6293);
            e.exports = i && !Symbol.sham && "symbol" == typeof Symbol.iterator
        },
        6293: function(e, t, n) {
            var i = n(7392)
              , r = n(7293);
            e.exports = !!Object.getOwnPropertySymbols && !r((function() {
                var e = Symbol();
                return !String(e) || !(Object(e)instanceof Symbol) || !Symbol.sham && i && i < 41
            }
            ))
        },
        7392: function(e, t, n) {
            var i, r, o = n(7854), a = n(8113), s = o.process, l = o.Deno, u = s && s.versions || l && l.version, c = u && u.v8;
            c && (i = c.split("."),
            r = i[0] > 0 && i[0] < 4 ? 1 : +(i[0] + i[1])),
            !r && a && (i = a.match(/Edge\/(\d+)/),
            (!i || i[1] >= 74) && (i = a.match(/Chrome\/(\d+)/),
            i && (r = +i[1]))),
            e.exports = r
        },
        8113: function(e, t, n) {
            var i = n(5005);
            e.exports = i("navigator", "userAgent") || ""
        },
        8173: function(e, t, n) {
            var i = n(9662)
              , r = n(8554);
            e.exports = function(e, t) {
                var n = e[t];
                return r(n) ? void 0 : i(n)
            }
        },
        9662: function(e, t, n) {
            var i = n(614)
              , r = n(6330)
              , o = TypeError;
            e.exports = function(e) {
                if (i(e))
                    return e;
                throw o(r(e) + " is not a function")
            }
        },
        6330: function(e) {
            var t = String;
            e.exports = function(e) {
                try {
                    return t(e)
                } catch (n) {
                    return "Object"
                }
            }
        },
        2140: function(e, t, n) {
            var i = n(6916)
              , r = n(614)
              , o = n(111)
              , a = TypeError;
            e.exports = function(e, t) {
                var n, s;
                if ("string" === t && r(n = e.toString) && !o(s = i(n, e)))
                    return s;
                if (r(n = e.valueOf) && !o(s = i(n, e)))
                    return s;
                if ("string" !== t && r(n = e.toString) && !o(s = i(n, e)))
                    return s;
                throw a("Can't convert object to primitive value")
            }
        },
        5112: function(e, t, n) {
            var i = n(7854)
              , r = n(2309)
              , o = n(2597)
              , a = n(9711)
              , s = n(6293)
              , l = n(3307)
              , u = r("wks")
              , c = i.Symbol
              , h = c && c["for"]
              , d = l ? c : c && c.withoutSetter || a;
            e.exports = function(e) {
                if (!o(u, e) || !s && "string" != typeof u[e]) {
                    var t = "Symbol." + e;
                    s && o(c, e) ? u[e] = c[e] : u[e] = l && h ? h(t) : d(t)
                }
                return u[e]
            }
        },
        2309: function(e, t, n) {
            var i = n(1913)
              , r = n(5465);
            (e.exports = function(e, t) {
                return r[e] || (r[e] = void 0 !== t ? t : {})
            }
            )("versions", []).push({
                version: "3.26.1",
                mode: i ? "pure" : "global",
                copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
                license: "https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE",
                source: "https://github.com/zloirock/core-js"
            })
        },
        1913: function(e) {
            e.exports = !1
        },
        5465: function(e, t, n) {
            var i = n(7854)
              , r = n(3072)
              , o = "__core-js_shared__"
              , a = i[o] || r(o, {});
            e.exports = a
        },
        3072: function(e, t, n) {
            var i = n(7854)
              , r = Object.defineProperty;
            e.exports = function(e, t) {
                try {
                    r(i, e, {
                        value: t,
                        configurable: !0,
                        writable: !0
                    })
                } catch (n) {
                    i[e] = t
                }
                return t
            }
        },
        2597: function(e, t, n) {
            var i = n(1702)
              , r = n(7908)
              , o = i({}.hasOwnProperty);
            e.exports = Object.hasOwn || function(e, t) {
                return o(r(e), t)
            }
        },
        7908: function(e, t, n) {
            var i = n(4488)
              , r = Object;
            e.exports = function(e) {
                return r(i(e))
            }
        },
        9711: function(e, t, n) {
            var i = n(1702)
              , r = 0
              , o = Math.random()
              , a = i(1..toString);
            e.exports = function(e) {
                return "Symbol(" + (void 0 === e ? "" : e) + ")_" + a(++r + o, 36)
            }
        },
        4664: function(e, t, n) {
            var i = n(9781)
              , r = n(7293)
              , o = n(317);
            e.exports = !i && !r((function() {
                return 7 != Object.defineProperty(o("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }
            ))
        },
        317: function(e, t, n) {
            var i = n(7854)
              , r = n(111)
              , o = i.document
              , a = r(o) && r(o.createElement);
            e.exports = function(e) {
                return a ? o.createElement(e) : {}
            }
        },
        8880: function(e, t, n) {
            var i = n(9781)
              , r = n(3070)
              , o = n(9114);
            e.exports = i ? function(e, t, n) {
                return r.f(e, t, o(1, n))
            }
            : function(e, t, n) {
                return e[t] = n,
                e
            }
        },
        3070: function(e, t, n) {
            var i = n(9781)
              , r = n(4664)
              , o = n(3353)
              , a = n(9670)
              , s = n(4948)
              , l = TypeError
              , u = Object.defineProperty
              , c = Object.getOwnPropertyDescriptor
              , h = "enumerable"
              , d = "configurable"
              , f = "writable";
            t.f = i ? o ? function(e, t, n) {
                if (a(e),
                t = s(t),
                a(n),
                "function" === typeof e && "prototype" === t && "value"in n && f in n && !n[f]) {
                    var i = c(e, t);
                    i && i[f] && (e[t] = n.value,
                    n = {
                        configurable: d in n ? n[d] : i[d],
                        enumerable: h in n ? n[h] : i[h],
                        writable: !1
                    })
                }
                return u(e, t, n)
            }
            : u : function(e, t, n) {
                if (a(e),
                t = s(t),
                a(n),
                r)
                    try {
                        return u(e, t, n)
                    } catch (i) {}
                if ("get"in n || "set"in n)
                    throw l("Accessors not supported");
                return "value"in n && (e[t] = n.value),
                e
            }
        },
        3353: function(e, t, n) {
            var i = n(9781)
              , r = n(7293);
            e.exports = i && r((function() {
                return 42 != Object.defineProperty((function() {}
                ), "prototype", {
                    value: 42,
                    writable: !1
                }).prototype
            }
            ))
        },
        9670: function(e, t, n) {
            var i = n(111)
              , r = String
              , o = TypeError;
            e.exports = function(e) {
                if (i(e))
                    return e;
                throw o(r(e) + " is not an object")
            }
        },
        8052: function(e, t, n) {
            var i = n(614)
              , r = n(3070)
              , o = n(6339)
              , a = n(3072);
            e.exports = function(e, t, n, s) {
                s || (s = {});
                var l = s.enumerable
                  , u = void 0 !== s.name ? s.name : t;
                if (i(n) && o(n, u, s),
                s.global)
                    l ? e[t] = n : a(t, n);
                else {
                    try {
                        s.unsafe ? e[t] && (l = !0) : delete e[t]
                    } catch (c) {}
                    l ? e[t] = n : r.f(e, t, {
                        value: n,
                        enumerable: !1,
                        configurable: !s.nonConfigurable,
                        writable: !s.nonWritable
                    })
                }
                return e
            }
        },
        6339: function(e, t, n) {
            var i = n(7293)
              , r = n(614)
              , o = n(2597)
              , a = n(9781)
              , s = n(6530).CONFIGURABLE
              , l = n(2788)
              , u = n(9909)
              , c = u.enforce
              , h = u.get
              , d = Object.defineProperty
              , f = a && !i((function() {
                return 8 !== d((function() {}
                ), "length", {
                    value: 8
                }).length
            }
            ))
              , p = String(String).split("String")
              , m = e.exports = function(e, t, n) {
                "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
                n && n.getter && (t = "get " + t),
                n && n.setter && (t = "set " + t),
                (!o(e, "name") || s && e.name !== t) && (a ? d(e, "name", {
                    value: t,
                    configurable: !0
                }) : e.name = t),
                f && n && o(n, "arity") && e.length !== n.arity && d(e, "length", {
                    value: n.arity
                });
                try {
                    n && o(n, "constructor") && n.constructor ? a && d(e, "prototype", {
                        writable: !1
                    }) : e.prototype && (e.prototype = void 0)
                } catch (r) {}
                var i = c(e);
                return o(i, "source") || (i.source = p.join("string" == typeof t ? t : "")),
                e
            }
            ;
            Function.prototype.toString = m((function() {
                return r(this) && h(this).source || l(this)
            }
            ), "toString")
        },
        6530: function(e, t, n) {
            var i = n(9781)
              , r = n(2597)
              , o = Function.prototype
              , a = i && Object.getOwnPropertyDescriptor
              , s = r(o, "name")
              , l = s && "something" === function() {}
            .name
              , u = s && (!i || i && a(o, "name").configurable);
            e.exports = {
                EXISTS: s,
                PROPER: l,
                CONFIGURABLE: u
            }
        },
        2788: function(e, t, n) {
            var i = n(1702)
              , r = n(614)
              , o = n(5465)
              , a = i(Function.toString);
            r(o.inspectSource) || (o.inspectSource = function(e) {
                return a(e)
            }
            ),
            e.exports = o.inspectSource
        },
        9909: function(e, t, n) {
            var i, r, o, a = n(4811), s = n(7854), l = n(111), u = n(8880), c = n(2597), h = n(5465), d = n(6200), f = n(3501), p = "Object already initialized", m = s.TypeError, v = s.WeakMap, g = function(e) {
                return o(e) ? r(e) : i(e, {})
            }, y = function(e) {
                return function(t) {
                    var n;
                    if (!l(t) || (n = r(t)).type !== e)
                        throw m("Incompatible receiver, " + e + " required");
                    return n
                }
            };
            if (a || h.state) {
                var b = h.state || (h.state = new v);
                b.get = b.get,
                b.has = b.has,
                b.set = b.set,
                i = function(e, t) {
                    if (b.has(e))
                        throw m(p);
                    return t.facade = e,
                    b.set(e, t),
                    t
                }
                ,
                r = function(e) {
                    return b.get(e) || {}
                }
                ,
                o = function(e) {
                    return b.has(e)
                }
            } else {
                var _ = d("state");
                f[_] = !0,
                i = function(e, t) {
                    if (c(e, _))
                        throw m(p);
                    return t.facade = e,
                    u(e, _, t),
                    t
                }
                ,
                r = function(e) {
                    return c(e, _) ? e[_] : {}
                }
                ,
                o = function(e) {
                    return c(e, _)
                }
            }
            e.exports = {
                set: i,
                get: r,
                has: o,
                enforce: g,
                getterFor: y
            }
        },
        4811: function(e, t, n) {
            var i = n(7854)
              , r = n(614)
              , o = i.WeakMap;
            e.exports = r(o) && /native code/.test(String(o))
        },
        6200: function(e, t, n) {
            var i = n(2309)
              , r = n(9711)
              , o = i("keys");
            e.exports = function(e) {
                return o[e] || (o[e] = r(e))
            }
        },
        3501: function(e) {
            e.exports = {}
        },
        9920: function(e, t, n) {
            var i = n(2597)
              , r = n(3887)
              , o = n(1236)
              , a = n(3070);
            e.exports = function(e, t, n) {
                for (var s = r(t), l = a.f, u = o.f, c = 0; c < s.length; c++) {
                    var h = s[c];
                    i(e, h) || n && i(n, h) || l(e, h, u(t, h))
                }
            }
        },
        3887: function(e, t, n) {
            var i = n(5005)
              , r = n(1702)
              , o = n(8006)
              , a = n(5181)
              , s = n(9670)
              , l = r([].concat);
            e.exports = i("Reflect", "ownKeys") || function(e) {
                var t = o.f(s(e))
                  , n = a.f;
                return n ? l(t, n(e)) : t
            }
        },
        8006: function(e, t, n) {
            var i = n(6324)
              , r = n(748)
              , o = r.concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function(e) {
                return i(e, o)
            }
        },
        6324: function(e, t, n) {
            var i = n(1702)
              , r = n(2597)
              , o = n(5656)
              , a = n(1318).indexOf
              , s = n(3501)
              , l = i([].push);
            e.exports = function(e, t) {
                var n, i = o(e), u = 0, c = [];
                for (n in i)
                    !r(s, n) && r(i, n) && l(c, n);
                while (t.length > u)
                    r(i, n = t[u++]) && (~a(c, n) || l(c, n));
                return c
            }
        },
        1318: function(e, t, n) {
            var i = n(5656)
              , r = n(1400)
              , o = n(6244)
              , a = function(e) {
                return function(t, n, a) {
                    var s, l = i(t), u = o(l), c = r(a, u);
                    if (e && n != n) {
                        while (u > c)
                            if (s = l[c++],
                            s != s)
                                return !0
                    } else
                        for (; u > c; c++)
                            if ((e || c in l) && l[c] === n)
                                return e || c || 0;
                    return !e && -1
                }
            };
            e.exports = {
                includes: a(!0),
                indexOf: a(!1)
            }
        },
        1400: function(e, t, n) {
            var i = n(9303)
              , r = Math.max
              , o = Math.min;
            e.exports = function(e, t) {
                var n = i(e);
                return n < 0 ? r(n + t, 0) : o(n, t)
            }
        },
        9303: function(e, t, n) {
            var i = n(4758);
            e.exports = function(e) {
                var t = +e;
                return t !== t || 0 === t ? 0 : i(t)
            }
        },
        4758: function(e) {
            var t = Math.ceil
              , n = Math.floor;
            e.exports = Math.trunc || function(e) {
                var i = +e;
                return (i > 0 ? n : t)(i)
            }
        },
        6244: function(e, t, n) {
            var i = n(7466);
            e.exports = function(e) {
                return i(e.length)
            }
        },
        7466: function(e, t, n) {
            var i = n(9303)
              , r = Math.min;
            e.exports = function(e) {
                return e > 0 ? r(i(e), 9007199254740991) : 0
            }
        },
        748: function(e) {
            e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
        },
        5181: function(e, t) {
            t.f = Object.getOwnPropertySymbols
        },
        4705: function(e, t, n) {
            var i = n(7293)
              , r = n(614)
              , o = /#|\.prototype\./
              , a = function(e, t) {
                var n = l[s(e)];
                return n == c || n != u && (r(t) ? i(t) : !!t)
            }
              , s = a.normalize = function(e) {
                return String(e).replace(o, ".").toLowerCase()
            }
              , l = a.data = {}
              , u = a.NATIVE = "N"
              , c = a.POLYFILL = "P";
            e.exports = a
        },
        3658: function(e, t, n) {
            "use strict";
            var i = n(9781)
              , r = n(3157)
              , o = TypeError
              , a = Object.getOwnPropertyDescriptor
              , s = i && !function() {
                if (void 0 !== this)
                    return !0;
                try {
                    Object.defineProperty([], "length", {
                        writable: !1
                    }).length = 1
                } catch (e) {
                    return e instanceof TypeError
                }
            }();
            e.exports = s ? function(e, t) {
                if (r(e) && !a(e, "length").writable)
                    throw o("Cannot set read only .length");
                return e.length = t
            }
            : function(e, t) {
                return e.length = t
            }
        },
        3157: function(e, t, n) {
            var i = n(4326);
            e.exports = Array.isArray || function(e) {
                return "Array" == i(e)
            }
        },
        7207: function(e) {
            var t = TypeError
              , n = 9007199254740991;
            e.exports = function(e) {
                if (e > n)
                    throw t("Maximum allowed index exceeded");
                return e
            }
        },
        861: function(e, t, n) {
            "use strict";
            function i() {
                this._listeners = {}
            }
            n(7658),
            e.exports = i,
            i.prototype.on = function(e, t, n) {
                return (this._listeners[e] || (this._listeners[e] = [])).push({
                    fn: t,
                    ctx: n || this
                }),
                this
            }
            ,
            i.prototype.off = function(e, t) {
                if (void 0 === e)
                    this._listeners = {};
                else if (void 0 === t)
                    this._listeners[e] = [];
                else
                    for (var n = this._listeners[e], i = 0; i < n.length; )
                        n[i].fn === t ? n.splice(i, 1) : ++i;
                return this
            }
            ,
            i.prototype.emit = function(e) {
                var t = this._listeners[e];
                if (t) {
                    for (var n = [], i = 1; i < arguments.length; )
                        n.push(arguments[i++]);
                    for (i = 0; i < t.length; )
                        t[i].fn.apply(t[i++].ctx, n)
                }
                return this
            }
        },
        2484: function(e) {
            "use strict";
            function t(e) {
                return "undefined" !== typeof Float32Array ? function() {
                    var t = new Float32Array([-0])
                      , n = new Uint8Array(t.buffer)
                      , i = 128 === n[3];
                    function r(e, i, r) {
                        t[0] = e,
                        i[r] = n[0],
                        i[r + 1] = n[1],
                        i[r + 2] = n[2],
                        i[r + 3] = n[3]
                    }
                    function o(e, i, r) {
                        t[0] = e,
                        i[r] = n[3],
                        i[r + 1] = n[2],
                        i[r + 2] = n[1],
                        i[r + 3] = n[0]
                    }
                    function a(e, i) {
                        return n[0] = e[i],
                        n[1] = e[i + 1],
                        n[2] = e[i + 2],
                        n[3] = e[i + 3],
                        t[0]
                    }
                    function s(e, i) {
                        return n[3] = e[i],
                        n[2] = e[i + 1],
                        n[1] = e[i + 2],
                        n[0] = e[i + 3],
                        t[0]
                    }
                    e.writeFloatLE = i ? r : o,
                    e.writeFloatBE = i ? o : r,
                    e.readFloatLE = i ? a : s,
                    e.readFloatBE = i ? s : a
                }() : function() {
                    function t(e, t, n, i) {
                        var r = t < 0 ? 1 : 0;
                        if (r && (t = -t),
                        0 === t)
                            e(1 / t > 0 ? 0 : 2147483648, n, i);
                        else if (isNaN(t))
                            e(2143289344, n, i);
                        else if (t > 34028234663852886e22)
                            e((r << 31 | 2139095040) >>> 0, n, i);
                        else if (t < 11754943508222875e-54)
                            e((r << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, n, i);
                        else {
                            var o = Math.floor(Math.log(t) / Math.LN2)
                              , a = 8388607 & Math.round(t * Math.pow(2, -o) * 8388608);
                            e((r << 31 | o + 127 << 23 | a) >>> 0, n, i)
                        }
                    }
                    function a(e, t, n) {
                        var i = e(t, n)
                          , r = 2 * (i >> 31) + 1
                          , o = i >>> 23 & 255
                          , a = 8388607 & i;
                        return 255 === o ? a ? NaN : r * (1 / 0) : 0 === o ? 1401298464324817e-60 * r * a : r * Math.pow(2, o - 150) * (a + 8388608)
                    }
                    e.writeFloatLE = t.bind(null, n),
                    e.writeFloatBE = t.bind(null, i),
                    e.readFloatLE = a.bind(null, r),
                    e.readFloatBE = a.bind(null, o)
                }(),
                "undefined" !== typeof Float64Array ? function() {
                    var t = new Float64Array([-0])
                      , n = new Uint8Array(t.buffer)
                      , i = 128 === n[7];
                    function r(e, i, r) {
                        t[0] = e,
                        i[r] = n[0],
                        i[r + 1] = n[1],
                        i[r + 2] = n[2],
                        i[r + 3] = n[3],
                        i[r + 4] = n[4],
                        i[r + 5] = n[5],
                        i[r + 6] = n[6],
                        i[r + 7] = n[7]
                    }
                    function o(e, i, r) {
                        t[0] = e,
                        i[r] = n[7],
                        i[r + 1] = n[6],
                        i[r + 2] = n[5],
                        i[r + 3] = n[4],
                        i[r + 4] = n[3],
                        i[r + 5] = n[2],
                        i[r + 6] = n[1],
                        i[r + 7] = n[0]
                    }
                    function a(e, i) {
                        return n[0] = e[i],
                        n[1] = e[i + 1],
                        n[2] = e[i + 2],
                        n[3] = e[i + 3],
                        n[4] = e[i + 4],
                        n[5] = e[i + 5],
                        n[6] = e[i + 6],
                        n[7] = e[i + 7],
                        t[0]
                    }
                    function s(e, i) {
                        return n[7] = e[i],
                        n[6] = e[i + 1],
                        n[5] = e[i + 2],
                        n[4] = e[i + 3],
                        n[3] = e[i + 4],
                        n[2] = e[i + 5],
                        n[1] = e[i + 6],
                        n[0] = e[i + 7],
                        t[0]
                    }
                    e.writeDoubleLE = i ? r : o,
                    e.writeDoubleBE = i ? o : r,
                    e.readDoubleLE = i ? a : s,
                    e.readDoubleBE = i ? s : a
                }() : function() {
                    function t(e, t, n, i, r, o) {
                        var a = i < 0 ? 1 : 0;
                        if (a && (i = -i),
                        0 === i)
                            e(0, r, o + t),
                            e(1 / i > 0 ? 0 : 2147483648, r, o + n);
                        else if (isNaN(i))
                            e(0, r, o + t),
                            e(2146959360, r, o + n);
                        else if (i > 17976931348623157e292)
                            e(0, r, o + t),
                            e((a << 31 | 2146435072) >>> 0, r, o + n);
                        else {
                            var s;
                            if (i < 22250738585072014e-324)
                                s = i / 5e-324,
                                e(s >>> 0, r, o + t),
                                e((a << 31 | s / 4294967296) >>> 0, r, o + n);
                            else {
                                var l = Math.floor(Math.log(i) / Math.LN2);
                                1024 === l && (l = 1023),
                                s = i * Math.pow(2, -l),
                                e(4503599627370496 * s >>> 0, r, o + t),
                                e((a << 31 | l + 1023 << 20 | 1048576 * s & 1048575) >>> 0, r, o + n)
                            }
                        }
                    }
                    function a(e, t, n, i, r) {
                        var o = e(i, r + t)
                          , a = e(i, r + n)
                          , s = 2 * (a >> 31) + 1
                          , l = a >>> 20 & 2047
                          , u = 4294967296 * (1048575 & a) + o;
                        return 2047 === l ? u ? NaN : s * (1 / 0) : 0 === l ? 5e-324 * s * u : s * Math.pow(2, l - 1075) * (u + 4503599627370496)
                    }
                    e.writeDoubleLE = t.bind(null, n, 0, 4),
                    e.writeDoubleBE = t.bind(null, i, 4, 0),
                    e.readDoubleLE = a.bind(null, r, 0, 4),
                    e.readDoubleBE = a.bind(null, o, 4, 0)
                }(),
                e
            }
            function n(e, t, n) {
                t[n] = 255 & e,
                t[n + 1] = e >>> 8 & 255,
                t[n + 2] = e >>> 16 & 255,
                t[n + 3] = e >>> 24
            }
            function i(e, t, n) {
                t[n] = e >>> 24,
                t[n + 1] = e >>> 16 & 255,
                t[n + 2] = e >>> 8 & 255,
                t[n + 3] = 255 & e
            }
            function r(e, t) {
                return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0
            }
            function o(e, t) {
                return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0
            }
            e.exports = t(t)
        },
        442: function(module) {
            "use strict";
            function inquire(moduleName) {
                try {
                    var mod = eval("quire".replace(/^/, "re"))(moduleName);
                    if (mod && (mod.length || Object.keys(mod).length))
                        return mod
                } catch (e) {}
                return null
            }
            module.exports = inquire
        },
        3523: function(e, t, n) {
            "use strict";
            n(7658);
            var i = t;
            i.length = function(e) {
                for (var t = 0, n = 0, i = 0; i < e.length; ++i)
                    n = e.charCodeAt(i),
                    n < 128 ? t += 1 : n < 2048 ? t += 2 : 55296 === (64512 & n) && 56320 === (64512 & e.charCodeAt(i + 1)) ? (++i,
                    t += 4) : t += 3;
                return t
            }
            ,
            i.read = function(e, t, n) {
                var i = n - t;
                if (i < 1)
                    return "";
                var r, o = null, a = [], s = 0;
                while (t < n)
                    r = e[t++],
                    r < 128 ? a[s++] = r : r > 191 && r < 224 ? a[s++] = (31 & r) << 6 | 63 & e[t++] : r > 239 && r < 365 ? (r = ((7 & r) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536,
                    a[s++] = 55296 + (r >> 10),
                    a[s++] = 56320 + (1023 & r)) : a[s++] = (15 & r) << 12 | (63 & e[t++]) << 6 | 63 & e[t++],
                    s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, a)),
                    s = 0);
                return o ? (s && o.push(String.fromCharCode.apply(String, a.slice(0, s))),
                o.join("")) : String.fromCharCode.apply(String, a.slice(0, s))
            }
            ,
            i.write = function(e, t, n) {
                for (var i, r, o = n, a = 0; a < e.length; ++a)
                    i = e.charCodeAt(a),
                    i < 128 ? t[n++] = i : i < 2048 ? (t[n++] = i >> 6 | 192,
                    t[n++] = 63 & i | 128) : 55296 === (64512 & i) && 56320 === (64512 & (r = e.charCodeAt(a + 1))) ? (i = 65536 + ((1023 & i) << 10) + (1023 & r),
                    ++a,
                    t[n++] = i >> 18 | 240,
                    t[n++] = i >> 12 & 63 | 128,
                    t[n++] = i >> 6 & 63 | 128,
                    t[n++] = 63 & i | 128) : (t[n++] = i >> 12 | 224,
                    t[n++] = i >> 6 & 63 | 128,
                    t[n++] = 63 & i | 128);
                return n - o
            }
        },
        3168: function(e) {
            "use strict";
            function t(e, t, n) {
                var i = n || 8192
                  , r = i >>> 1
                  , o = null
                  , a = i;
                return function(n) {
                    if (n < 1 || n > r)
                        return e(n);
                    a + n > i && (o = e(i),
                    a = 0);
                    var s = t.call(o, a, a += n);
                    return 7 & a && (a = 1 + (7 | a)),
                    s
                }
            }
            e.exports = t
        },
        1448: function(e, t, n) {
            "use strict";
            e.exports = r;
            var i = n(8568);
            function r(e, t) {
                this.lo = e >>> 0,
                this.hi = t >>> 0
            }
            var o = r.zero = new r(0,0);
            o.toNumber = function() {
                return 0
            }
            ,
            o.zzEncode = o.zzDecode = function() {
                return this
            }
            ,
            o.length = function() {
                return 1
            }
            ;
            var a = r.zeroHash = "\0\0\0\0\0\0\0\0";
            r.fromNumber = function(e) {
                if (0 === e)
                    return o;
                var t = e < 0;
                t && (e = -e);
                var n = e >>> 0
                  , i = (e - n) / 4294967296 >>> 0;
                return t && (i = ~i >>> 0,
                n = ~n >>> 0,
                ++n > 4294967295 && (n = 0,
                ++i > 4294967295 && (i = 0))),
                new r(n,i)
            }
            ,
            r.from = function(e) {
                if ("number" === typeof e)
                    return r.fromNumber(e);
                if (i.isString(e)) {
                    if (!i.Long)
                        return r.fromNumber(parseInt(e, 10));
                    e = i.Long.fromString(e)
                }
                return e.low || e.high ? new r(e.low >>> 0,e.high >>> 0) : o
            }
            ,
            r.prototype.toNumber = function(e) {
                if (!e && this.hi >>> 31) {
                    var t = 1 + ~this.lo >>> 0
                      , n = ~this.hi >>> 0;
                    return t || (n = n + 1 >>> 0),
                    -(t + 4294967296 * n)
                }
                return this.lo + 4294967296 * this.hi
            }
            ,
            r.prototype.toLong = function(e) {
                return i.Long ? new i.Long(0 | this.lo,0 | this.hi,Boolean(e)) : {
                    low: 0 | this.lo,
                    high: 0 | this.hi,
                    unsigned: Boolean(e)
                }
            }
            ;
            var s = String.prototype.charCodeAt;
            r.fromHash = function(e) {
                return e === a ? o : new r((s.call(e, 0) | s.call(e, 1) << 8 | s.call(e, 2) << 16 | s.call(e, 3) << 24) >>> 0,(s.call(e, 4) | s.call(e, 5) << 8 | s.call(e, 6) << 16 | s.call(e, 7) << 24) >>> 0)
            }
            ,
            r.prototype.toHash = function() {
                return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
            }
            ,
            r.prototype.zzEncode = function() {
                var e = this.hi >> 31;
                return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0,
                this.lo = (this.lo << 1 ^ e) >>> 0,
                this
            }
            ,
            r.prototype.zzDecode = function() {
                var e = -(1 & this.lo);
                return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0,
                this.hi = (this.hi >>> 1 ^ e) >>> 0,
                this
            }
            ,
            r.prototype.length = function() {
                var e = this.lo
                  , t = (this.lo >>> 28 | this.hi << 4) >>> 0
                  , n = this.hi >>> 24;
                return 0 === n ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : n < 128 ? 9 : 10
            }
        },
        9189: function(e, t, n) {
            "use strict";
            e.exports = o;
            var i = n(5993);
            (o.prototype = Object.create(i.prototype)).constructor = o;
            var r = n(8568);
            function o() {
                i.call(this)
            }
            function a(e, t, n) {
                e.length < 40 ? r.utf8.write(e, t, n) : t.utf8Write ? t.utf8Write(e, n) : t.write(e, n)
            }
            o._configure = function() {
                o.alloc = r._Buffer_allocUnsafe,
                o.writeBytesBuffer = r.Buffer && r.Buffer.prototype instanceof Uint8Array && "set" === r.Buffer.prototype.set.name ? function(e, t, n) {
                    t.set(e, n)
                }
                : function(e, t, n) {
                    if (e.copy)
                        e.copy(t, n, 0, e.length);
                    else
                        for (var i = 0; i < e.length; )
                            t[n++] = e[i++]
                }
            }
            ,
            o.prototype.bytes = function(e) {
                r.isString(e) && (e = r._Buffer_from(e, "base64"));
                var t = e.length >>> 0;
                return this.uint32(t),
                t && this._push(o.writeBytesBuffer, t, e),
                this
            }
            ,
            o.prototype.string = function(e) {
                var t = r.Buffer.byteLength(e);
                return this.uint32(t),
                t && this._push(a, t, e),
                this
            }
            ,
            o._configure()
        },
        6534: function(e, t, n) {
            "use strict";
            e.exports = l;
            var i, r = n(8568), o = r.LongBits, a = r.utf8;
            function s(e, t) {
                return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len)
            }
            function l(e) {
                this.buf = e,
                this.pos = 0,
                this.len = e.length
            }
            var u = "undefined" !== typeof Uint8Array ? function(e) {
                if (e instanceof Uint8Array || Array.isArray(e))
                    return new l(e);
                throw Error("illegal buffer")
            }
            : function(e) {
                if (Array.isArray(e))
                    return new l(e);
                throw Error("illegal buffer")
            }
              , c = function() {
                return r.Buffer ? function(e) {
                    return (l.create = function(e) {
                        return r.Buffer.isBuffer(e) ? new i(e) : u(e)
                    }
                    )(e)
                }
                : u
            };
            function h() {
                var e = new o(0,0)
                  , t = 0;
                if (!(this.len - this.pos > 4)) {
                    for (; t < 3; ++t) {
                        if (this.pos >= this.len)
                            throw s(this);
                        if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0,
                        this.buf[this.pos++] < 128)
                            return e
                    }
                    return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0,
                    e
                }
                for (; t < 4; ++t)
                    if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0,
                    this.buf[this.pos++] < 128)
                        return e;
                if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0,
                e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0,
                this.buf[this.pos++] < 128)
                    return e;
                if (t = 0,
                this.len - this.pos > 4) {
                    for (; t < 5; ++t)
                        if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0,
                        this.buf[this.pos++] < 128)
                            return e
                } else
                    for (; t < 5; ++t) {
                        if (this.pos >= this.len)
                            throw s(this);
                        if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0,
                        this.buf[this.pos++] < 128)
                            return e
                    }
                throw Error("invalid varint encoding")
            }
            function d(e, t) {
                return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0
            }
            function f() {
                if (this.pos + 8 > this.len)
                    throw s(this, 8);
                return new o(d(this.buf, this.pos += 4),d(this.buf, this.pos += 4))
            }
            l.create = c(),
            l.prototype._slice = r.Array.prototype.subarray || r.Array.prototype.slice,
            l.prototype.uint32 = function() {
                var e = 4294967295;
                return function() {
                    if (e = (127 & this.buf[this.pos]) >>> 0,
                    this.buf[this.pos++] < 128)
                        return e;
                    if (e = (e | (127 & this.buf[this.pos]) << 7) >>> 0,
                    this.buf[this.pos++] < 128)
                        return e;
                    if (e = (e | (127 & this.buf[this.pos]) << 14) >>> 0,
                    this.buf[this.pos++] < 128)
                        return e;
                    if (e = (e | (127 & this.buf[this.pos]) << 21) >>> 0,
                    this.buf[this.pos++] < 128)
                        return e;
                    if (e = (e | (15 & this.buf[this.pos]) << 28) >>> 0,
                    this.buf[this.pos++] < 128)
                        return e;
                    if ((this.pos += 5) > this.len)
                        throw this.pos = this.len,
                        s(this, 10);
                    return e
                }
            }(),
            l.prototype.int32 = function() {
                return 0 | this.uint32()
            }
            ,
            l.prototype.sint32 = function() {
                var e = this.uint32();
                return e >>> 1 ^ -(1 & e) | 0
            }
            ,
            l.prototype.bool = function() {
                return 0 !== this.uint32()
            }
            ,
            l.prototype.fixed32 = function() {
                if (this.pos + 4 > this.len)
                    throw s(this, 4);
                return d(this.buf, this.pos += 4)
            }
            ,
            l.prototype.sfixed32 = function() {
                if (this.pos + 4 > this.len)
                    throw s(this, 4);
                return 0 | d(this.buf, this.pos += 4)
            }
            ,
            l.prototype.float = function() {
                if (this.pos + 4 > this.len)
                    throw s(this, 4);
                var e = r.float.readFloatLE(this.buf, this.pos);
                return this.pos += 4,
                e
            }
            ,
            l.prototype.double = function() {
                if (this.pos + 8 > this.len)
                    throw s(this, 4);
                var e = r.float.readDoubleLE(this.buf, this.pos);
                return this.pos += 8,
                e
            }
            ,
            l.prototype.bytes = function() {
                var e = this.uint32()
                  , t = this.pos
                  , n = this.pos + e;
                if (n > this.len)
                    throw s(this, e);
                return this.pos += e,
                Array.isArray(this.buf) ? this.buf.slice(t, n) : t === n ? new this.buf.constructor(0) : this._slice.call(this.buf, t, n)
            }
            ,
            l.prototype.string = function() {
                var e = this.bytes();
                return a.read(e, 0, e.length)
            }
            ,
            l.prototype.skip = function(e) {
                if ("number" === typeof e) {
                    if (this.pos + e > this.len)
                        throw s(this, e);
                    this.pos += e
                } else
                    do {
                        if (this.pos >= this.len)
                            throw s(this)
                    } while (128 & this.buf[this.pos++]);return this
            }
            ,
            l.prototype.skipType = function(e) {
                switch (e) {
                case 0:
                    this.skip();
                    break;
                case 1:
                    this.skip(8);
                    break;
                case 2:
                    this.skip(this.uint32());
                    break;
                case 3:
                    while (4 !== (e = 7 & this.uint32()))
                        this.skipType(e);
                    break;
                case 5:
                    this.skip(4);
                    break;
                default:
                    throw Error("invalid wire type " + e + " at offset " + this.pos)
                }
                return this
            }
            ,
            l._configure = function(e) {
                i = e,
                l.create = c(),
                i._configure();
                var t = r.Long ? "toLong" : "toNumber";
                r.merge(l.prototype, {
                    int64: function() {
                        return h.call(this)[t](!1)
                    },
                    uint64: function() {
                        return h.call(this)[t](!0)
                    },
                    sint64: function() {
                        return h.call(this).zzDecode()[t](!1)
                    },
                    fixed64: function() {
                        return f.call(this)[t](!0)
                    },
                    sfixed64: function() {
                        return f.call(this)[t](!1)
                    }
                })
            }
        },
        279: function(e, t, n) {
            "use strict";
            e.exports = o;
            var i = n(6534);
            (o.prototype = Object.create(i.prototype)).constructor = o;
            var r = n(8568);
            function o(e) {
                i.call(this, e)
            }
            o._configure = function() {
                r.Buffer && (o.prototype._slice = r.Buffer.prototype.slice)
            }
            ,
            o.prototype.string = function() {
                var e = this.uint32();
                return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e, this.len))
            }
            ,
            o._configure()
        },
        658: function(e, t, n) {
            "use strict";
            var i = t;
            i.Service = n(8796)
        },
        8796: function(e, t, n) {
            "use strict";
            e.exports = r;
            var i = n(8568);
            function r(e, t, n) {
                if ("function" !== typeof e)
                    throw TypeError("rpcImpl must be a function");
                i.EventEmitter.call(this),
                this.rpcImpl = e,
                this.requestDelimited = Boolean(t),
                this.responseDelimited = Boolean(n)
            }
            (r.prototype = Object.create(i.EventEmitter.prototype)).constructor = r,
            r.prototype.rpcCall = function e(t, n, r, o, a) {
                if (!o)
                    throw TypeError("request must be specified");
                var s = this;
                if (!a)
                    return i.asPromise(e, s, t, n, r, o);
                if (s.rpcImpl)
                    try {
                        return s.rpcImpl(t, n[s.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), (function(e, n) {
                            if (e)
                                return s.emit("error", e, t),
                                a(e);
                            if (null !== n) {
                                if (!(n instanceof r))
                                    try {
                                        n = r[s.responseDelimited ? "decodeDelimited" : "decode"](n)
                                    } catch (e) {
                                        return s.emit("error", e, t),
                                        a(e)
                                    }
                                return s.emit("data", n, t),
                                a(null, n)
                            }
                            s.end(!0)
                        }
                        ))
                    } catch (l) {
                        return s.emit("error", l, t),
                        void setTimeout((function() {
                            a(l)
                        }
                        ), 0)
                    }
                else
                    setTimeout((function() {
                        a(Error("already ended"))
                    }
                    ), 0)
            }
            ,
            r.prototype.end = function(e) {
                return this.rpcImpl && (e || this.rpcImpl(null, null, null),
                this.rpcImpl = null,
                this.emit("end").off()),
                this
            }
        },
        6854: function(e) {
            "use strict";
            e.exports = {}
        },
        1184: function(e, t, n) {
            "use strict";
            n(7658);
            var i = function(e, t) {
                return i = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                ,
                i(e, t)
            };
            function r(e, t) {
                function n() {
                    this.constructor = e
                }
                i(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            function o(e) {
                var t = "function" === typeof Symbol && e[Symbol.iterator]
                  , n = 0;
                return t ? t.call(e) : {
                    next: function() {
                        return e && n >= e.length && (e = void 0),
                        {
                            value: e && e[n++],
                            done: !e
                        }
                    }
                }
            }
            function a(e, t) {
                var n = "function" === typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var i, r, o = n.call(e), a = [];
                try {
                    while ((void 0 === t || t-- > 0) && !(i = o.next()).done)
                        a.push(i.value)
                } catch (s) {
                    r = {
                        error: s
                    }
                } finally {
                    try {
                        i && !i.done && (n = o["return"]) && n.call(o)
                    } finally {
                        if (r)
                            throw r.error
                    }
                }
                return a
            }
            function s() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(a(arguments[t]));
                return e
            }
            var l = function() {
                function e(e, t) {
                    this.target = t,
                    this.type = e
                }
                return e
            }()
              , u = function(e) {
                function t(t, n) {
                    var i = e.call(this, "error", n) || this;
                    return i.message = t.message,
                    i.error = t,
                    i
                }
                return r(t, e),
                t
            }(l)
              , c = function(e) {
                function t(t, n, i) {
                    void 0 === t && (t = 1e3),
                    void 0 === n && (n = "");
                    var r = e.call(this, "close", i) || this;
                    return r.wasClean = !0,
                    r.code = t,
                    r.reason = n,
                    r
                }
                return r(t, e),
                t
            }(l)
              , h = function() {
                if ("undefined" !== typeof WebSocket)
                    return WebSocket
            }
              , d = function(e) {
                return "undefined" !== typeof e && !!e && 2 === e.CLOSING
            }
              , f = {
                maxReconnectionDelay: 1e4,
                minReconnectionDelay: 1e3 + 4e3 * Math.random(),
                minUptime: 5e3,
                reconnectionDelayGrowFactor: 1.3,
                connectionTimeout: 4e3,
                maxRetries: 1 / 0,
                maxEnqueuedMessages: 1 / 0,
                startClosed: !1,
                debug: !1
            }
              , p = function() {
                function e(e, t, n) {
                    var i = this;
                    void 0 === n && (n = {}),
                    this._listeners = {
                        error: [],
                        message: [],
                        open: [],
                        close: []
                    },
                    this._retryCount = -1,
                    this._shouldReconnect = !0,
                    this._connectLock = !1,
                    this._binaryType = "blob",
                    this._closeCalled = !1,
                    this._messageQueue = [],
                    this.onclose = null,
                    this.onerror = null,
                    this.onmessage = null,
                    this.onopen = null,
                    this._handleOpen = function(e) {
                        i._debug("open event");
                        var t = i._options.minUptime
                          , n = void 0 === t ? f.minUptime : t;
                        clearTimeout(i._connectTimeout),
                        i._uptimeTimeout = setTimeout((function() {
                            return i._acceptOpen()
                        }
                        ), n),
                        i._ws.binaryType = i._binaryType,
                        i._messageQueue.forEach((function(e) {
                            return i._ws.send(e)
                        }
                        )),
                        i._messageQueue = [],
                        i.onopen && i.onopen(e),
                        i._listeners.open.forEach((function(t) {
                            return i._callEventListener(e, t)
                        }
                        ))
                    }
                    ,
                    this._handleMessage = function(e) {
                        i._debug("message event"),
                        i.onmessage && i.onmessage(e),
                        i._listeners.message.forEach((function(t) {
                            return i._callEventListener(e, t)
                        }
                        ))
                    }
                    ,
                    this._handleError = function(e) {
                        i._debug("error event", e.message),
                        i._disconnect(void 0, "TIMEOUT" === e.message ? "timeout" : void 0),
                        i.onerror && i.onerror(e),
                        i._debug("exec error listeners"),
                        i._listeners.error.forEach((function(t) {
                            return i._callEventListener(e, t)
                        }
                        )),
                        i._connect()
                    }
                    ,
                    this._handleClose = function(e) {
                        i._debug("close event"),
                        i._clearTimeouts(),
                        i._shouldReconnect && i._connect(),
                        i.onclose && i.onclose(e),
                        i._listeners.close.forEach((function(t) {
                            return i._callEventListener(e, t)
                        }
                        ))
                    }
                    ,
                    this._url = e,
                    this._protocols = t,
                    this._options = n,
                    this._options.startClosed && (this._shouldReconnect = !1),
                    this._connect()
                }
                return Object.defineProperty(e, "CONNECTING", {
                    get: function() {
                        return 0
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e, "OPEN", {
                    get: function() {
                        return 1
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e, "CLOSING", {
                    get: function() {
                        return 2
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e, "CLOSED", {
                    get: function() {
                        return 3
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "CONNECTING", {
                    get: function() {
                        return e.CONNECTING
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "OPEN", {
                    get: function() {
                        return e.OPEN
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "CLOSING", {
                    get: function() {
                        return e.CLOSING
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "CLOSED", {
                    get: function() {
                        return e.CLOSED
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "binaryType", {
                    get: function() {
                        return this._ws ? this._ws.binaryType : this._binaryType
                    },
                    set: function(e) {
                        this._binaryType = e,
                        this._ws && (this._ws.binaryType = e)
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "retryCount", {
                    get: function() {
                        return Math.max(this._retryCount, 0)
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "bufferedAmount", {
                    get: function() {
                        var e = this._messageQueue.reduce((function(e, t) {
                            return "string" === typeof t ? e += t.length : t instanceof Blob ? e += t.size : e += t.byteLength,
                            e
                        }
                        ), 0);
                        return e + (this._ws ? this._ws.bufferedAmount : 0)
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "extensions", {
                    get: function() {
                        return this._ws ? this._ws.extensions : ""
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "protocol", {
                    get: function() {
                        return this._ws ? this._ws.protocol : ""
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "readyState", {
                    get: function() {
                        return this._ws ? this._ws.readyState : this._options.startClosed ? e.CLOSED : e.CONNECTING
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                Object.defineProperty(e.prototype, "url", {
                    get: function() {
                        return this._ws ? this._ws.url : ""
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                e.prototype.close = function(e, t) {
                    void 0 === e && (e = 1e3),
                    this._closeCalled = !0,
                    this._shouldReconnect = !1,
                    this._clearTimeouts(),
                    this._ws ? this._ws.readyState !== this.CLOSED ? this._ws.close(e, t) : this._debug("close: already closed") : this._debug("close enqueued: no ws instance")
                }
                ,
                e.prototype.reconnect = function(e, t) {
                    this._shouldReconnect = !0,
                    this._closeCalled = !1,
                    this._retryCount = -1,
                    this._ws && this._ws.readyState !== this.CLOSED ? (this._disconnect(e, t),
                    this._connect()) : this._connect()
                }
                ,
                e.prototype.send = function(e) {
                    if (this._ws && this._ws.readyState === this.OPEN)
                        this._debug("send", e),
                        this._ws.send(e);
                    else {
                        var t = this._options.maxEnqueuedMessages
                          , n = void 0 === t ? f.maxEnqueuedMessages : t;
                        this._messageQueue.length < n && (this._debug("enqueue", e),
                        this._messageQueue.push(e))
                    }
                }
                ,
                e.prototype.addEventListener = function(e, t) {
                    this._listeners[e] && this._listeners[e].push(t)
                }
                ,
                e.prototype.dispatchEvent = function(e) {
                    var t, n, i = this._listeners[e.type];
                    if (i)
                        try {
                            for (var r = o(i), a = r.next(); !a.done; a = r.next()) {
                                var s = a.value;
                                this._callEventListener(e, s)
                            }
                        } catch (l) {
                            t = {
                                error: l
                            }
                        } finally {
                            try {
                                a && !a.done && (n = r.return) && n.call(r)
                            } finally {
                                if (t)
                                    throw t.error
                            }
                        }
                    return !0
                }
                ,
                e.prototype.removeEventListener = function(e, t) {
                    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((function(e) {
                        return e !== t
                    }
                    )))
                }
                ,
                e.prototype._debug = function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    this._options.debug && console.log.apply(console, s(["RWS>"], e))
                }
                ,
                e.prototype._getNextDelay = function() {
                    var e = this._options
                      , t = e.reconnectionDelayGrowFactor
                      , n = void 0 === t ? f.reconnectionDelayGrowFactor : t
                      , i = e.minReconnectionDelay
                      , r = void 0 === i ? f.minReconnectionDelay : i
                      , o = e.maxReconnectionDelay
                      , a = void 0 === o ? f.maxReconnectionDelay : o
                      , s = 0;
                    return this._retryCount > 0 && (s = r * Math.pow(n, this._retryCount - 1),
                    s > a && (s = a)),
                    this._debug("next delay", s),
                    s
                }
                ,
                e.prototype._wait = function() {
                    var e = this;
                    return new Promise((function(t) {
                        setTimeout(t, e._getNextDelay())
                    }
                    ))
                }
                ,
                e.prototype._getNextUrl = function(e) {
                    if ("string" === typeof e)
                        return Promise.resolve(e);
                    if ("function" === typeof e) {
                        var t = e();
                        if ("string" === typeof t)
                            return Promise.resolve(t);
                        if (t.then)
                            return t
                    }
                    throw Error("Invalid URL")
                }
                ,
                e.prototype._connect = function() {
                    var e = this;
                    if (!this._connectLock && this._shouldReconnect) {
                        this._connectLock = !0;
                        var t = this._options
                          , n = t.maxRetries
                          , i = void 0 === n ? f.maxRetries : n
                          , r = t.connectionTimeout
                          , o = void 0 === r ? f.connectionTimeout : r
                          , a = t.WebSocket
                          , s = void 0 === a ? h() : a;
                        if (this._retryCount >= i)
                            this._debug("max retries reached", this._retryCount, ">=", i);
                        else {
                            if (this._retryCount++,
                            this._debug("connect", this._retryCount),
                            this._removeListeners(),
                            !d(s))
                                throw Error("No valid WebSocket class provided");
                            this._wait().then((function() {
                                return e._getNextUrl(e._url)
                            }
                            )).then((function(t) {
                                e._closeCalled || (e._debug("connect", {
                                    url: t,
                                    protocols: e._protocols
                                }),
                                e._ws = e._protocols ? new s(t,e._protocols) : new s(t),
                                e._ws.binaryType = e._binaryType,
                                e._connectLock = !1,
                                e._addListeners(),
                                e._connectTimeout = setTimeout((function() {
                                    return e._handleTimeout()
                                }
                                ), o))
                            }
                            ))
                        }
                    }
                }
                ,
                e.prototype._handleTimeout = function() {
                    this._debug("timeout event"),
                    this._handleError(new u(Error("TIMEOUT"),this))
                }
                ,
                e.prototype._disconnect = function(e, t) {
                    if (void 0 === e && (e = 1e3),
                    this._clearTimeouts(),
                    this._ws) {
                        this._removeListeners();
                        try {
                            this._ws.close(e, t),
                            this._handleClose(new c(e,t,this))
                        } catch (n) {}
                    }
                }
                ,
                e.prototype._acceptOpen = function() {
                    this._debug("accept open"),
                    this._retryCount = 0
                }
                ,
                e.prototype._callEventListener = function(e, t) {
                    "handleEvent"in t ? t.handleEvent(e) : t(e)
                }
                ,
                e.prototype._removeListeners = function() {
                    this._ws && (this._debug("removeListeners"),
                    this._ws.removeEventListener("open", this._handleOpen),
                    this._ws.removeEventListener("close", this._handleClose),
                    this._ws.removeEventListener("message", this._handleMessage),
                    this._ws.removeEventListener("error", this._handleError))
                }
                ,
                e.prototype._addListeners = function() {
                    this._ws && (this._debug("addListeners"),
                    this._ws.addEventListener("open", this._handleOpen),
                    this._ws.addEventListener("close", this._handleClose),
                    this._ws.addEventListener("message", this._handleMessage),
                    this._ws.addEventListener("error", this._handleError))
                }
                ,
                e.prototype._clearTimeouts = function() {
                    clearTimeout(this._connectTimeout),
                    clearTimeout(this._uptimeTimeout)
                }
                ,
                e
            }();
            t["Z"] = p
        },
        7168: function(e, t, n) {
            n(7658),
            function(t, n) {
                e.exports = n()
            }(0, (function() {
                "use strict";
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1,
                        i.configurable = !0,
                        "value"in i && (i.writable = !0),
                        Object.defineProperty(e, i.key, i)
                    }
                }
                var t = {
                    ECB: 0,
                    CBC: 1
                }
                  , n = {
                    PKCS5: 0,
                    ONE_AND_ZEROS: 1,
                    LAST_BYTE: 2,
                    NULL: 3,
                    SPACES: 4
                }
                  , i = {
                    STRING: 0,
                    UINT8_ARRAY: 1,
                    JSON_OBJECT: 2
                }
                  , r = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731]
                  , o = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946]
                  , a = [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055]
                  , s = [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504]
                  , l = [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462];
                function u(e) {
                    for (var t = 0, n = ""; t < e.length; ) {
                        var i = e[t++];
                        if (127 < i)
                            if (191 < i && i < 224) {
                                if (t >= e.length)
                                    return console.error("Incomplete 2-byte sequence"),
                                    n;
                                i = (31 & i) << 6 | 63 & e[t++]
                            } else if (223 < i && i < 240) {
                                if (t + 1 >= e.length)
                                    return console.error("Incomplete 3-byte sequence"),
                                    n;
                                i = (15 & i) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]
                            } else {
                                if (!(239 < i && i < 248))
                                    return console.error("Unknown multibyte start 0x" + i.toString(16) + " at index " + (t - 1)),
                                    n;
                                if (t + 2 >= e.length)
                                    return console.error("Incomplete 4-byte sequence"),
                                    n;
                                i = (7 & i) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]
                            }
                        if (i <= 65535)
                            n += String.fromCharCode(i);
                        else {
                            if (!(i <= 1114111))
                                return console.error("Code point 0x" + i.toString(16) + " exceeds UTF-16 reach"),
                                n;
                            i -= 65536,
                            n = (n += String.fromCharCode(i >> 10 | 55296)) + String.fromCharCode(1023 & i | 56320)
                        }
                    }
                    return n
                }
                function c(e) {
                    e = u(e);
                    try {
                        return JSON.parse(e)
                    } catch (n) {
                        try {
                            var t = e.replace(/(\w+:)|(\w+ :)/g, (function(e) {
                                return '"' + e.substring(0, e.length - 1) + '":'
                            }
                            )).replace(/'/g, '"');
                            return 125 === (t = 125 === t[0].charCodeAt(0) ? t.slice(0, 1) : t)[t.length - 2].charCodeAt(0) && (t = t.slice(0, -2) + "}"),
                            JSON.parse(t)
                        } catch (n) {
                            throw new Error("Invalid JSON")
                        }
                    }
                }
                function h(e) {
                    return e >>> 0
                }
                function d(e, t) {
                    return h(e ^ t)
                }
                function f(e, t) {
                    return h(e + t | 0)
                }
                function p(e, t, n, i) {
                    return h(e << 24 | t << 16 | n << 8 | i)
                }
                function m(e) {
                    return [e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e]
                }
                function v(e) {
                    return "string" == typeof e
                }
                function g(e) {
                    return "object" == typeof e && "byteLength"in e
                }
                function y(e) {
                    return e instanceof Uint8Array
                }
                function b(e) {
                    return v(e) || g(e)
                }
                function _(e, t) {
                    var n = !1;
                    return Object.keys(e).forEach((function(i) {
                        e[i] === t && (n = !0)
                    }
                    )),
                    n
                }
                function w(e) {
                    if (v(e)) {
                        for (var t = e, n = new Uint8Array(4 * t.length), i = 0, r = 0; r !== t.length; r++) {
                            var o = t.charCodeAt(r);
                            if (o < 128)
                                n[i++] = o;
                            else {
                                if (o < 2048)
                                    n[i++] = o >> 6 | 192;
                                else {
                                    if (55295 < o && o < 56320) {
                                        if (++r >= t.length)
                                            return console.error("Incomplete surrogate pair"),
                                            n.subarray(0, i);
                                        var a = t.charCodeAt(r);
                                        if (a < 56320 || 57343 < a)
                                            return console.error("Second surrogate character 0x" + a.toString(16) + " at index " + r + " out of range"),
                                            n.subarray(0, i);
                                        n[i++] = (o = 65536 + ((1023 & o) << 10) + (1023 & a)) >> 18 | 240,
                                        n[i++] = o >> 12 & 63 | 128
                                    } else
                                        n[i++] = o >> 12 | 224;
                                    n[i++] = o >> 6 & 63 | 128
                                }
                                n[i++] = 63 & o | 128
                            }
                        }
                        return n.subarray(0, i)
                    }
                    if (g(e))
                        return new Uint8Array(e);
                    if (y(e))
                        return e;
                    throw new Error("Unsupported type")
                }
                function x(e, t) {
                    for (var n, i, r, o = e.replace(/[^A-Za-z0-9+/]/g, ""), a = o.length, s = t ? Math.ceil((3 * a + 1 >> 2) / t) * t : 3 * a + 1 >> 2, l = new Uint8Array(s), u = 0, c = 0, h = 0; h < a; h++)
                        if (i = 3 & h,
                        u |= (64 < (r = o.charCodeAt(h)) && r < 91 ? r - 65 : 96 < r && r < 123 ? r - 71 : 47 < r && r < 58 ? r + 4 : 43 === r ? 62 : 47 === r ? 63 : 0) << 6 * (3 - i),
                        3 == i || a - h == 1) {
                            for (n = 0; n < 3 && c < s; )
                                l[c] = u >>> (16 >>> n & 24) & 255,
                                n++,
                                c++;
                            u = 0
                        }
                    return l
                }
                return function() {
                    function h(e, i, u) {
                        if (void 0 === i && (i = t.ECB),
                        void 0 === u && (u = n.PKCS5),
                        !b(e))
                            throw new Error("Key should be a string or an ArrayBuffer / Buffer");
                        if (!_(t, i))
                            throw new Error("Unsupported mode");
                        if (!_(n, u))
                            throw new Error("Unsupported padding");
                        this.mode = i,
                        this.padding = u,
                        this.iv = null,
                        this.p = r.slice(),
                        this.s = [o.slice(), a.slice(), s.slice(), l.slice()],
                        e = function(e) {
                            if (72 <= e.length)
                                return e;
                            for (var t = []; t.length < 72; )
                                for (var n = 0; n < e.length; n++)
                                    t.push(e[n]);
                            return new Uint8Array(t)
                        }(w(e));
                        for (var c = 0, h = 0; c < 18; c++,
                        h += 4) {
                            var f = p(e[h], e[h + 1], e[h + 2], e[h + 3]);
                            this.p[c] = d(this.p[c], f)
                        }
                        for (var m = 0, v = 0, g = 0; g < 18; g += 2) {
                            var y = this._encryptBlock(m, v);
                            m = y[0],
                            v = y[1];
                            this.p[g] = m,
                            this.p[g + 1] = v
                        }
                        for (var x = 0; x < 4; x++)
                            for (var C = 0; C < 256; C += 2) {
                                var k = this._encryptBlock(m, v);
                                m = k[0],
                                v = k[1],
                                this.s[x][C] = m,
                                this.s[x][C + 1] = v
                            }
                    }
                    var v, g, C = h.prototype;
                    return C.setIv = function(e) {
                        if (!b(e))
                            throw new Error("IV should be a string or an ArrayBuffer / Buffer");
                        if (8 !== (e = w(e)).length)
                            throw new Error("IV should be 8 byte length");
                        this.iv = e
                    }
                    ,
                    C.encode = function(e) {
                        if (!b(e))
                            throw new Error("Encode data should be a string or an ArrayBuffer / Buffer");
                        if (this.mode === t.ECB || this.iv)
                            return e = function(e, t) {
                                var i = 8 - e.length % 8;
                                if (8 == i && 0 < e.length && t !== n.PKCS5)
                                    return e;
                                var r = new Uint8Array(e.length + i)
                                  , o = []
                                  , a = i
                                  , s = 0;
                                switch (t) {
                                case n.PKCS5:
                                    s = i;
                                    break;
                                case n.ONE_AND_ZEROS:
                                    o.push(128),
                                    a--;
                                    break;
                                case n.SPACES:
                                    s = 32
                                }
                                for (; 0 < a; ) {
                                    if (t === n.LAST_BYTE && 1 === a) {
                                        o.push(i);
                                        break
                                    }
                                    o.push(s),
                                    a--
                                }
                                return r.set(e),
                                r.set(o, e.length),
                                r
                            }(w(e), this.padding),
                            this.mode === t.ECB ? this._encodeECB(e) : this.mode === t.CBC ? this._encodeCBC(e) : void 0;
                        throw new Error("IV is not set")
                    }
                    ,
                    C.encodeToBase64 = function(e) {
                        return this.encodeToBuffer(e).toString("base64")
                    }
                    ,
                    C.encodeToBuffer = function(e) {
                        return Buffer.from(this.encode(e))
                    }
                    ,
                    C._decodeB64 = function(e) {
                        return e = 32 < e.length && "string" == typeof e ? x(e) : e,
                        e = this.decode(e),
                        "object" != typeof e && "string" == typeof e && ("{" === e[0] && "}" === e[e.length - 1] || "[" === e[0] && "]" === e[e.length - 1]) ? JSON.parse(e) : e
                    }
                    ,
                    C.decode = function(e, r) {
                        if (void 0 === r && (r = i.STRING),
                        !b(e))
                            throw new Error("Decode data should be a string or an ArrayBuffer / Buffer");
                        if (this.mode !== t.ECB && !this.iv)
                            throw new Error("IV is not set");
                        if ((e = (r !== i.JSON_OBJECT || y(e) ? w : x)(e)).length % 8 != 0)
                            throw new Error("Decoded data should be multiple of 8 bytes");
                        switch (this.mode) {
                        case t.ECB:
                            e = this._decodeECB(e);
                            break;
                        case t.CBC:
                            e = this._decodeCBC(e)
                        }
                        switch (e = function(e, t) {
                            var i = 0;
                            switch (t) {
                            case n.LAST_BYTE:
                            case n.PKCS5:
                                var r = e[e.length - 1];
                                r <= 8 && (i = r);
                                break;
                            case n.ONE_AND_ZEROS:
                                for (var o = 1; o <= 8; ) {
                                    var a = e[e.length - o];
                                    if (128 === a) {
                                        i = o;
                                        break
                                    }
                                    if (0 !== a)
                                        break;
                                    o++
                                }
                                break;
                            case n.NULL:
                            case n.SPACES:
                                for (var s = t === n.SPACES ? 32 : 0, l = 1; l <= 8; ) {
                                    if (e[e.length - l] !== s) {
                                        i = l - 1;
                                        break
                                    }
                                    l++
                                }
                            }
                            return e.subarray(0, e.length - i)
                        }(e, this.padding),
                        r) {
                        case i.UINT8_ARRAY:
                            return e;
                        case i.STRING:
                            return u(e);
                        case i.JSON_OBJECT:
                            return c(e);
                        default:
                            throw new Error("Unsupported return type")
                        }
                    }
                    ,
                    C._encryptBlock = function(e, t) {
                        for (var n = 0; n < 16; n++) {
                            e = d(e, this.p[n]);
                            var i = [t = d(t, this._f(e)), e];
                            e = i[0],
                            t = i[1]
                        }
                        var r = [t, e];
                        return t = d(t = r[1], this.p[16]),
                        [e = d(e = r[0], this.p[17]), t]
                    }
                    ,
                    C._decryptBlock = function(e, t) {
                        for (var n = 17; 1 < n; n--) {
                            e = d(e, this.p[n]);
                            var i = [t = d(t, this._f(e)), e];
                            e = i[0],
                            t = i[1]
                        }
                        var r = [t, e];
                        return t = d(t = r[1], this.p[1]),
                        [e = d(e = r[0], this.p[0]), t]
                    }
                    ,
                    C._f = function(e) {
                        var t = f(this.s[0][e >>> 24 & 255], this.s[1][e >>> 16 & 255]);
                        return f(d(t, this.s[2][e >>> 8 & 255]), this.s[3][255 & e])
                    }
                    ,
                    C._encodeECB = function(e) {
                        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n += 8) {
                            var i = p(e[n], e[n + 1], e[n + 2], e[n + 3])
                              , r = p(e[n + 4], e[n + 5], e[n + 6], e[n + 7])
                              , o = this._encryptBlock(i, r);
                            i = o[0],
                            r = o[1];
                            t.set(m(i), n),
                            t.set(m(r), n + 4)
                        }
                        return t
                    }
                    ,
                    C._encodeCBC = function(e) {
                        for (var t = new Uint8Array(e.length), n = p(this.iv[0], this.iv[1], this.iv[2], this.iv[3]), i = p(this.iv[4], this.iv[5], this.iv[6], this.iv[7]), r = 0; r < e.length; r += 8) {
                            var o = p(e[r], e[r + 1], e[r + 2], e[r + 3])
                              , a = p(e[r + 4], e[r + 5], e[r + 6], e[r + 7])
                              , s = [d(n, o), d(i, a)];
                            s = this._encryptBlock(s[0], s[1]);
                            o = s[0],
                            i = a = s[1],
                            t.set(m(n = o), r),
                            t.set(m(a), r + 4)
                        }
                        return t
                    }
                    ,
                    C._decodeECB = function(e) {
                        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n += 8) {
                            var i = p(e[n], e[n + 1], e[n + 2], e[n + 3])
                              , r = p(e[n + 4], e[n + 5], e[n + 6], e[n + 7])
                              , o = this._decryptBlock(i, r);
                            i = o[0],
                            r = o[1];
                            t.set(m(i), n),
                            t.set(m(r), n + 4)
                        }
                        return t
                    }
                    ,
                    C._decodeCBC = function(e) {
                        for (var t = new Uint8Array(e.length), n = p(this.iv[0], this.iv[1], this.iv[2], this.iv[3]), i = p(this.iv[4], this.iv[5], this.iv[6], this.iv[7]), r = 0; r < e.length; r += 8) {
                            var o = l = p(e[r], e[r + 1], e[r + 2], e[r + 3])
                              , a = u = p(e[r + 4], e[r + 5], e[r + 6], e[r + 7])
                              , s = this._decryptBlock(l, u)
                              , l = s[0]
                              , u = s[1];
                            s = [d(n, l), d(i, u)];
                            u = s[1],
                            n = o,
                            i = a,
                            t.set(m(s[0]), r),
                            t.set(m(u), r + 4)
                        }
                        return t
                    }
                    ,
                    C = h,
                    g = [{
                        key: "MODE",
                        get: function() {
                            return t
                        }
                    }, {
                        key: "PADDING",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "TYPE",
                        get: function() {
                            return i
                        }
                    }],
                    (v = null) && e(C.prototype, v),
                    g && e(C, g),
                    Object.defineProperty(C, "prototype", {
                        writable: !1
                    }),
                    h
                }()
            }
            ))
        },
    }
      , e = {};
    function a(i) {
        var r = e[i];
        if (void 0 !== r)
            return r.exports;
        var n = e[i] = {
            id: i,
            loaded: !1,
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, a),
        n.loaded = !0,
        n.exports

    }
    window.guan_ = a;
    a.m = t,
    function() {
        var t = [];
        a.O = function(e, i, r, n) {
            if (!i) {
                var s = 1 / 0;
                for (u = 0; u < t.length; u++) {
                    i = t[u][0],
                    r = t[u][1],
                    n = t[u][2];
                    for (var o = !0, h = 0; h < i.length; h++)
                        (!1 & n || s >= n) && Object.keys(a.O).every((function(t) {
                            return a.O[t](i[h])
                        }
                        )) ? i.splice(h--, 1) : (o = !1,
                        n < s && (s = n));
                    if (o) {
                        t.splice(u--, 1);
                        var l = r();
                        void 0 !== l && (e = l)
                    }
                }
                return e
            }
            n = n || 0;
            for (var u = t.length; u > 0 && t[u - 1][2] > n; u--)
                t[u] = t[u - 1];
            t[u] = [i, r, n]
        }
    }(),
    function() {
        a.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t["default"]
            }
            : function() {
                return t
            }
            ;
            return a.d(e, {
                a: e
            }),
            e
        }
    }(),
    function() {
        a.d = function(t, e) {
            for (var i in e)
                a.o(e, i) && !a.o(t, i) && Object.defineProperty(t, i, {
                    enumerable: !0,
                    get: e[i]
                })
        }
    }(),
    function() {
        a.g = function() {
            if ("object" === typeof globalThis)
                return globalThis;
            try {
                return this || new Function("return this")()
            } catch (t) {
                if ("object" === typeof window)
                    return window
            }
        }()
    }(),
    function() {
        a.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
    }(),
    function() {
        a.r = function(t) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
    }(),
    function() {
        a.nmd = function(t) {
            return t.paths = [],
            t.children || (t.children = []),
            t
        }
    }(),
    function() {
        var t = {
            179: 0,
            532: 0
        };
        a.O.j = function(e) {
            return 0 === t[e]
        }
        ;
        var e = function(e, i) {
            var r, n, s = i[0], o = i[1], h = i[2], l = 0;
            if (s.some((function(e) {
                return 0 !== t[e]
            }
            ))) {
                for (r in o)
                    a.o(o, r) && (a.m[r] = o[r]);
                if (h)
                    var u = h(a)
            }
            for (e && e(i); l < s.length; l++)
                n = s[l],
                a.o(t, n) && t[n] && t[n][0](),
                t[n] = 0;
            return a.O(u)
        }
          , i = self["webpackChunkquota_kline"] = self["webpackChunkquota_kline"] || [];
        i.forEach(e.bind(null, 0)),
        i.push = e.bind(null, i.push.bind(i))
    }();
    var r = a.O(void 0, [736, 532], (function() {
        return a(8498)
    }
    ));
    //r = a.O(r)
}
)();
function jiami(msgid,seq) {
    var M = window.guan_(3504);
    const E = M.Reader
      , w = M.Writer
      , A = M.util
      , O = M.roots["default"] || (M.roots["default"] = {});
    O.jadegold = (()=>{

        const t = {};
        return t.msg = function() {
            const t = {};
            return t.quotation = function() {
                const t = {};
                return t.pbv2 = function() {
                    const t = {};
                    return t.QuoteMsgID = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "quotation_broadcast"] = 0,
                        e[t[1] = "status_broadcast"] = 1,
                        e[t[16] = "heart_beat"] = 16,
                        e[t[18] = "latestQuotation"] = 18,
                        e[t[20] = "qryQuotation"] = 20,
                        e[t[24] = "unsubscribe"] = 24,
                        e[t[28] = "qry_status"] = 28,
                        e[t[30] = "qry_gold_delivery"] = 30,
                        e[t[32] = "auth"] = 32,
                        e[t[34] = "waring"] = 34,
                        e[t[36] = "qry_waring"] = 36,
                        e[t[64] = "codes_category_json"] = 64,
                        e[t[66] = "codes_info_json"] = 66,
                        e[t[68] = "codes_f10_json"] = 68,
                        e[t[70] = "qry_all_settle"] = 70,
                        e[t[80] = "qry_option_info"] = 80,
                        e[t[82] = "qry_cbond_yield"] = 82,
                        e
                    }(),
                    t.QuotationMsg = function() {
                        function t(t) {
                            if (this.response = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.msgid = 0,
                        t.prototype.seq = 0,
                        t.prototype.request = null,
                        t.prototype.response = A.emptyArray,
                        t.prototype.jsonReq = "",
                        t.prototype.jsonResp = "",
                        t.prototype.errMsg = "",
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.msgid && Object.hasOwnProperty.call(t, "msgid") && e.uint32(8).int32(t.msgid),
                            null != t.seq && Object.hasOwnProperty.call(t, "seq") && e.uint32(16).sint32(t.seq),
                            null != t.request && Object.hasOwnProperty.call(t, "request") && O.jadegold.msg.quotation.pbv2.QuotationRequest.encode(t.request, e.uint32(34).fork()).ldelim(),
                            null != t.response && t.response.length)
                                for (let a = 0; a < t.response.length; ++a)
                                    O.jadegold.msg.quotation.pbv2.QuotationResponse.encode(t.response[a], e.uint32(42).fork()).ldelim();
                            return null != t.jsonReq && Object.hasOwnProperty.call(t, "jsonReq") && e.uint32(66).string(t.jsonReq),
                            null != t.jsonResp && Object.hasOwnProperty.call(t, "jsonResp") && e.uint32(74).string(t.jsonResp),
                            null != t.errMsg && Object.hasOwnProperty.call(t, "errMsg") && e.uint32(138).string(t.errMsg),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationMsg;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.msgid = t.int32();
                                    break;
                                case 2:
                                    i.seq = t.sint32();
                                    break;
                                case 4:
                                    i.request = O.jadegold.msg.quotation.pbv2.QuotationRequest.decode(t, t.uint32());
                                    break;
                                case 5:
                                    i.response && i.response.length || (i.response = []),
                                    i.response.push(O.jadegold.msg.quotation.pbv2.QuotationResponse.decode(t, t.uint32()));
                                    break;
                                case 8:
                                    i.jsonReq = t.string();
                                    break;
                                case 9:
                                    i.jsonResp = t.string();
                                    break;
                                case 17:
                                    i.errMsg = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.msgid && t.hasOwnProperty("msgid"))
                                switch (t.msgid) {
                                default:
                                    return "msgid: enum value expected";
                                case 0:
                                case 1:
                                case 16:
                                case 18:
                                case 20:
                                case 24:
                                case 28:
                                case 30:
                                case 32:
                                case 34:
                                case 36:
                                case 64:
                                case 66:
                                case 68:
                                case 70:
                                case 80:
                                case 82:
                                    break
                                }
                            if (null != t.seq && t.hasOwnProperty("seq") && !A.isInteger(t.seq))
                                return "seq: integer expected";
                            if (null != t.request && t.hasOwnProperty("request")) {
                                let e = O.jadegold.msg.quotation.pbv2.QuotationRequest.verify(t.request);
                                if (e)
                                    return "request." + e
                            }
                            if (null != t.response && t.hasOwnProperty("response")) {
                                if (!Array.isArray(t.response))
                                    return "response: array expected";
                                for (let e = 0; e < t.response.length; ++e) {
                                    let a = O.jadegold.msg.quotation.pbv2.QuotationResponse.verify(t.response[e]);
                                    if (a)
                                        return "response." + a
                                }
                            }
                            return null != t.jsonReq && t.hasOwnProperty("jsonReq") && !A.isString(t.jsonReq) ? "jsonReq: string expected" : null != t.jsonResp && t.hasOwnProperty("jsonResp") && !A.isString(t.jsonResp) ? "jsonResp: string expected" : null != t.errMsg && t.hasOwnProperty("errMsg") && !A.isString(t.errMsg) ? "errMsg: string expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationMsg)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationMsg;
                            switch (t.msgid) {
                            case "quotation_broadcast":
                            case 0:
                                e.msgid = 0;
                                break;
                            case "status_broadcast":
                            case 1:
                                e.msgid = 1;
                                break;
                            case "heart_beat":
                            case 16:
                                e.msgid = 16;
                                break;
                            case "latestQuotation":
                            case 18:
                                e.msgid = 18;
                                break;
                            case "qryQuotation":
                            case 20:
                                e.msgid = 20;
                                break;
                            case "unsubscribe":
                            case 24:
                                e.msgid = 24;
                                break;
                            case "qry_status":
                            case 28:
                                e.msgid = 28;
                                break;
                            case "qry_gold_delivery":
                            case 30:
                                e.msgid = 30;
                                break;
                            case "auth":
                            case 32:
                                e.msgid = 32;
                                break;
                            case "waring":
                            case 34:
                                e.msgid = 34;
                                break;
                            case "qry_waring":
                            case 36:
                                e.msgid = 36;
                                break;
                            case "codes_category_json":
                            case 64:
                                e.msgid = 64;
                                break;
                            case "codes_info_json":
                            case 66:
                                e.msgid = 66;
                                break;
                            case "codes_f10_json":
                            case 68:
                                e.msgid = 68;
                                break;
                            case "qry_all_settle":
                            case 70:
                                e.msgid = 70;
                                break;
                            case "qry_option_info":
                            case 80:
                                e.msgid = 80;
                                break;
                            case "qry_cbond_yield":
                            case 82:
                                e.msgid = 82;
                                break
                            }
                            if (null != t.seq && (e.seq = 0 | t.seq),
                            null != t.request) {
                                if ("object" !== typeof t.request)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationMsg.request: object expected");
                                e.request = O.jadegold.msg.quotation.pbv2.QuotationRequest.fromObject(t.request)
                            }
                            if (t.response) {
                                if (!Array.isArray(t.response))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationMsg.response: array expected");
                                e.response = [];
                                for (let a = 0; a < t.response.length; ++a) {
                                    if ("object" !== typeof t.response[a])
                                        throw TypeError(".jadegold.msg.quotation.pbv2.QuotationMsg.response: object expected");
                                    e.response[a] = O.jadegold.msg.quotation.pbv2.QuotationResponse.fromObject(t.response[a])
                                }
                            }
                            return null != t.jsonReq && (e.jsonReq = String(t.jsonReq)),
                            null != t.jsonResp && (e.jsonResp = String(t.jsonResp)),
                            null != t.errMsg && (e.errMsg = String(t.errMsg)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.response = []),
                            e.defaults && (a.msgid = e.enums === String ? "quotation_broadcast" : 0,
                            a.seq = 0,
                            a.request = null,
                            a.jsonReq = "",
                            a.jsonResp = "",
                            a.errMsg = ""),
                            null != t.msgid && t.hasOwnProperty("msgid") && (a.msgid = e.enums === String ? O.jadegold.msg.quotation.pbv2.QuoteMsgID[t.msgid] : t.msgid),
                            null != t.seq && t.hasOwnProperty("seq") && (a.seq = t.seq),
                            null != t.request && t.hasOwnProperty("request") && (a.request = O.jadegold.msg.quotation.pbv2.QuotationRequest.toObject(t.request, e)),
                            t.response && t.response.length) {
                                a.response = [];
                                for (let i = 0; i < t.response.length; ++i)
                                    a.response[i] = O.jadegold.msg.quotation.pbv2.QuotationResponse.toObject(t.response[i], e)
                            }
                            return null != t.jsonReq && t.hasOwnProperty("jsonReq") && (a.jsonReq = t.jsonReq),
                            null != t.jsonResp && t.hasOwnProperty("jsonResp") && (a.jsonResp = t.jsonResp),
                            null != t.errMsg && t.hasOwnProperty("errMsg") && (a.errMsg = t.errMsg),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.SubscribeFlag = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "SUBSCRIBE"] = 0,
                        e[t[1] = "KEEP"] = 1,
                        e
                    }(),
                    t.QuotationRequest = function() {
                        function t(t) {
                            if (this.codes = [],
                            this.freq = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.codes = A.emptyArray,
                        t.prototype.freq = A.emptyArray,
                        t.prototype.queryCondition = null,
                        t.prototype.subscribeFlag = 0,
                        t.prototype.auth = null,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.codes && t.codes.length)
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.uint32(10).string(t.codes[a]);
                            if (null != t.freq && t.freq.length) {
                                e.uint32(18).fork();
                                for (let a = 0; a < t.freq.length; ++a)
                                    e.int32(t.freq[a]);
                                e.ldelim()
                            }
                            return null != t.queryCondition && Object.hasOwnProperty.call(t, "queryCondition") && O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.encode(t.queryCondition, e.uint32(26).fork()).ldelim(),
                            null != t.subscribeFlag && Object.hasOwnProperty.call(t, "subscribeFlag") && e.uint32(32).int32(t.subscribeFlag),
                            null != t.auth && Object.hasOwnProperty.call(t, "auth") && O.jadegold.msg.quotation.pbv2.AuthReq.encode(t.auth, e.uint32(42).fork()).ldelim(),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationRequest;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.codes && i.codes.length || (i.codes = []),
                                    i.codes.push(t.string());
                                    break;
                                case 2:
                                    if (i.freq && i.freq.length || (i.freq = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.freq.push(t.int32())
                                    } else
                                        i.freq.push(t.int32());
                                    break;
                                case 3:
                                    i.queryCondition = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.decode(t, t.uint32());
                                    break;
                                case 4:
                                    i.subscribeFlag = t.int32();
                                    break;
                                case 5:
                                    i.auth = O.jadegold.msg.quotation.pbv2.AuthReq.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.codes && t.hasOwnProperty("codes")) {
                                if (!Array.isArray(t.codes))
                                    return "codes: array expected";
                                for (let e = 0; e < t.codes.length; ++e)
                                    if (!A.isString(t.codes[e]))
                                        return "codes: string[] expected"
                            }
                            if (null != t.freq && t.hasOwnProperty("freq")) {
                                if (!Array.isArray(t.freq))
                                    return "freq: array expected";
                                for (let e = 0; e < t.freq.length; ++e)
                                    switch (t.freq[e]) {
                                    default:
                                        return "freq: enum value[] expected";
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                    case 7:
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 11:
                                    case 12:
                                        break
                                    }
                            }
                            if (null != t.queryCondition && t.hasOwnProperty("queryCondition")) {
                                let e = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.verify(t.queryCondition);
                                if (e)
                                    return "queryCondition." + e
                            }
                            if (null != t.subscribeFlag && t.hasOwnProperty("subscribeFlag") && !A.isInteger(t.subscribeFlag))
                                return "subscribeFlag: integer expected";
                            if (null != t.auth && t.hasOwnProperty("auth")) {
                                let e = O.jadegold.msg.quotation.pbv2.AuthReq.verify(t.auth);
                                if (e)
                                    return "auth." + e
                            }
                            return null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationRequest)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationRequest;
                            if (t.codes) {
                                if (!Array.isArray(t.codes))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.codes: array expected");
                                e.codes = [];
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.codes[a] = String(t.codes[a])
                            }
                            if (t.freq) {
                                if (!Array.isArray(t.freq))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.freq: array expected");
                                e.freq = [];
                                for (let a = 0; a < t.freq.length; ++a)
                                    switch (t.freq[a]) {
                                    default:
                                    case "REALTIME":
                                    case 0:
                                        e.freq[a] = 0;
                                        break;
                                    case "INFO":
                                    case 1:
                                        e.freq[a] = 1;
                                        break;
                                    case "TICK":
                                    case 2:
                                        e.freq[a] = 2;
                                        break;
                                    case "MIN1":
                                    case 3:
                                        e.freq[a] = 3;
                                        break;
                                    case "MIN5":
                                    case 4:
                                        e.freq[a] = 4;
                                        break;
                                    case "MIN15":
                                    case 5:
                                        e.freq[a] = 5;
                                        break;
                                    case "MIN30":
                                    case 6:
                                        e.freq[a] = 6;
                                        break;
                                    case "MIN60":
                                    case 7:
                                        e.freq[a] = 7;
                                        break;
                                    case "MIN120":
                                    case 8:
                                        e.freq[a] = 8;
                                        break;
                                    case "MIN240":
                                    case 9:
                                        e.freq[a] = 9;
                                        break;
                                    case "DAY1":
                                    case 10:
                                        e.freq[a] = 10;
                                        break;
                                    case "WEEK1":
                                    case 11:
                                        e.freq[a] = 11;
                                        break;
                                    case "MONTH1":
                                    case 12:
                                        e.freq[a] = 12;
                                        break
                                    }
                            }
                            if (null != t.queryCondition) {
                                if ("object" !== typeof t.queryCondition)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.queryCondition: object expected");
                                e.queryCondition = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.fromObject(t.queryCondition)
                            }
                            if (null != t.subscribeFlag && (e.subscribeFlag = 0 | t.subscribeFlag),
                            null != t.auth) {
                                if ("object" !== typeof t.auth)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.auth: object expected");
                                e.auth = O.jadegold.msg.quotation.pbv2.AuthReq.fromObject(t.auth)
                            }
                            return e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.codes = [],
                            a.freq = []),
                            e.defaults && (a.queryCondition = null,
                            a.subscribeFlag = 0,
                            a.auth = null),
                            t.codes && t.codes.length) {
                                a.codes = [];
                                for (let e = 0; e < t.codes.length; ++e)
                                    a.codes[e] = t.codes[e]
                            }
                            if (t.freq && t.freq.length) {
                                a.freq = [];
                                for (let i = 0; i < t.freq.length; ++i)
                                    a.freq[i] = e.enums === String ? O.jadegold.msg.quotation.pbv2.QuotationFreq[t.freq[i]] : t.freq[i]
                            }
                            return null != t.queryCondition && t.hasOwnProperty("queryCondition") && (a.queryCondition = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.toObject(t.queryCondition, e)),
                            null != t.subscribeFlag && t.hasOwnProperty("subscribeFlag") && (a.subscribeFlag = t.subscribeFlag),
                            null != t.auth && t.hasOwnProperty("auth") && (a.auth = O.jadegold.msg.quotation.pbv2.AuthReq.toObject(t.auth, e)),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuotationResponse = function() {
                        function t(t) {
                            if (this.quotation = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.quotation = A.emptyArray,
                        t.prototype.earliestfreq = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.errCode = 0,
                        t.prototype.auth = null,
                        t.prototype.tradeStatus = null,
                        t.prototype.msg = "",
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.quotation && t.quotation.length)
                                for (let a = 0; a < t.quotation.length; ++a)
                                    O.jadegold.msg.quotation.pbv2.QuotationField.encode(t.quotation[a], e.uint32(10).fork()).ldelim();
                            return null != t.earliestfreq && Object.hasOwnProperty.call(t, "earliestfreq") && e.uint32(16).int64(t.earliestfreq),
                            null != t.errCode && Object.hasOwnProperty.call(t, "errCode") && e.uint32(24).sint32(t.errCode),
                            null != t.auth && Object.hasOwnProperty.call(t, "auth") && O.jadegold.msg.quotation.pbv2.AuthResp.encode(t.auth, e.uint32(42).fork()).ldelim(),
                            null != t.tradeStatus && Object.hasOwnProperty.call(t, "tradeStatus") && O.jadegold.msg.quotation.pbv2.TradeStatusMsg.encode(t.tradeStatus, e.uint32(50).fork()).ldelim(),
                            null != t.msg && Object.hasOwnProperty.call(t, "msg") && e.uint32(130).string(t.msg),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationResponse;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.quotation && i.quotation.length || (i.quotation = []),
                                    i.quotation.push(O.jadegold.msg.quotation.pbv2.QuotationField.decode(t, t.uint32()));
                                    break;
                                case 2:
                                    i.earliestfreq = t.int64();
                                    break;
                                case 3:
                                    i.errCode = t.sint32();
                                    break;
                                case 5:
                                    i.auth = O.jadegold.msg.quotation.pbv2.AuthResp.decode(t, t.uint32());
                                    break;
                                case 6:
                                    i.tradeStatus = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.decode(t, t.uint32());
                                    break;
                                case 16:
                                    i.msg = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.quotation && t.hasOwnProperty("quotation")) {
                                if (!Array.isArray(t.quotation))
                                    return "quotation: array expected";
                                for (let e = 0; e < t.quotation.length; ++e) {
                                    let a = O.jadegold.msg.quotation.pbv2.QuotationField.verify(t.quotation[e]);
                                    if (a)
                                        return "quotation." + a
                                }
                            }
                            if (null != t.earliestfreq && t.hasOwnProperty("earliestfreq") && !A.isInteger(t.earliestfreq) && !(t.earliestfreq && A.isInteger(t.earliestfreq.low) && A.isInteger(t.earliestfreq.high)))
                                return "earliestfreq: integer|Long expected";
                            if (null != t.errCode && t.hasOwnProperty("errCode") && !A.isInteger(t.errCode))
                                return "errCode: integer expected";
                            if (null != t.auth && t.hasOwnProperty("auth")) {
                                let e = O.jadegold.msg.quotation.pbv2.AuthResp.verify(t.auth);
                                if (e)
                                    return "auth." + e
                            }
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus")) {
                                let e = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.verify(t.tradeStatus);
                                if (e)
                                    return "tradeStatus." + e
                            }
                            return null != t.msg && t.hasOwnProperty("msg") && !A.isString(t.msg) ? "msg: string expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationResponse)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationResponse;
                            if (t.quotation) {
                                if (!Array.isArray(t.quotation))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.quotation: array expected");
                                e.quotation = [];
                                for (let a = 0; a < t.quotation.length; ++a) {
                                    if ("object" !== typeof t.quotation[a])
                                        throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.quotation: object expected");
                                    e.quotation[a] = O.jadegold.msg.quotation.pbv2.QuotationField.fromObject(t.quotation[a])
                                }
                            }
                            if (null != t.earliestfreq && (A.Long ? (e.earliestfreq = A.Long.fromValue(t.earliestfreq)).unsigned = !1 : "string" === typeof t.earliestfreq ? e.earliestfreq = parseInt(t.earliestfreq, 10) : "number" === typeof t.earliestfreq ? e.earliestfreq = t.earliestfreq : "object" === typeof t.earliestfreq && (e.earliestfreq = new A.LongBits(t.earliestfreq.low >>> 0,t.earliestfreq.high >>> 0).toNumber())),
                            null != t.errCode && (e.errCode = 0 | t.errCode),
                            null != t.auth) {
                                if ("object" !== typeof t.auth)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.auth: object expected");
                                e.auth = O.jadegold.msg.quotation.pbv2.AuthResp.fromObject(t.auth)
                            }
                            if (null != t.tradeStatus) {
                                if ("object" !== typeof t.tradeStatus)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.tradeStatus: object expected");
                                e.tradeStatus = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.fromObject(t.tradeStatus)
                            }
                            return null != t.msg && (e.msg = String(t.msg)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.quotation = []),
                            e.defaults) {
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.earliestfreq = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.earliestfreq = e.longs === String ? "0" : 0;
                                a.errCode = 0,
                                a.auth = null,
                                a.tradeStatus = null,
                                a.msg = ""
                            }
                            if (t.quotation && t.quotation.length) {
                                a.quotation = [];
                                for (let i = 0; i < t.quotation.length; ++i)
                                    a.quotation[i] = O.jadegold.msg.quotation.pbv2.QuotationField.toObject(t.quotation[i], e)
                            }
                            return null != t.earliestfreq && t.hasOwnProperty("earliestfreq") && ("number" === typeof t.earliestfreq ? a.earliestfreq = e.longs === String ? String(t.earliestfreq) : t.earliestfreq : a.earliestfreq = e.longs === String ? A.Long.prototype.toString.call(t.earliestfreq) : e.longs === Number ? new A.LongBits(t.earliestfreq.low >>> 0,t.earliestfreq.high >>> 0).toNumber() : t.earliestfreq),
                            null != t.errCode && t.hasOwnProperty("errCode") && (a.errCode = t.errCode),
                            null != t.auth && t.hasOwnProperty("auth") && (a.auth = O.jadegold.msg.quotation.pbv2.AuthResp.toObject(t.auth, e)),
                            null != t.tradeStatus && t.hasOwnProperty("tradeStatus") && (a.tradeStatus = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.toObject(t.tradeStatus, e)),
                            null != t.msg && t.hasOwnProperty("msg") && (a.msg = t.msg),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.TradeStatus = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "INIT"] = 0,
                        e[t[7] = "INIT_FINISH"] = 7,
                        e[t[10] = "OPEN"] = 10,
                        e[t[20] = "CALL_AUCTION"] = 20,
                        e[t[27] = "CALL_AUCTION_FINISH"] = 27,
                        e[t[30] = "TRADING"] = 30,
                        e[t[40] = "PAUSE"] = 40,
                        e[t[50] = "DELIVERY_CALL"] = 50,
                        e[t[60] = "DELIVERY"] = 60,
                        e[t[67] = "DELIVERY_FINISH"] = 67,
                        e[t[70] = "NEUTRAL_WAREHOUSE"] = 70,
                        e[t[99] = "CLOSE"] = 99,
                        e
                    }(),
                    t.TradeStatusMsg = function() {
                        function t(t) {
                            if (this.codes = [],
                            this.commodites = [],
                            this.markets = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.tradeStatus = 0,
                        t.prototype.codes = A.emptyArray,
                        t.prototype.commodites = A.emptyArray,
                        t.prototype.markets = A.emptyArray,
                        t.prototype.quotetime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.tradeStatus && Object.hasOwnProperty.call(t, "tradeStatus") && e.uint32(8).int32(t.tradeStatus),
                            null != t.codes && t.codes.length)
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.uint32(18).string(t.codes[a]);
                            if (null != t.commodites && t.commodites.length)
                                for (let a = 0; a < t.commodites.length; ++a)
                                    e.uint32(26).string(t.commodites[a]);
                            if (null != t.markets && t.markets.length)
                                for (let a = 0; a < t.markets.length; ++a)
                                    e.uint32(34).string(t.markets[a]);
                            return null != t.quotetime && Object.hasOwnProperty.call(t, "quotetime") && e.uint32(40).int64(t.quotetime),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.TradeStatusMsg;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.tradeStatus = t.int32();
                                    break;
                                case 2:
                                    i.codes && i.codes.length || (i.codes = []),
                                    i.codes.push(t.string());
                                    break;
                                case 3:
                                    i.commodites && i.commodites.length || (i.commodites = []),
                                    i.commodites.push(t.string());
                                    break;
                                case 4:
                                    i.markets && i.markets.length || (i.markets = []),
                                    i.markets.push(t.string());
                                    break;
                                case 5:
                                    i.quotetime = t.int64();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus"))
                                switch (t.tradeStatus) {
                                default:
                                    return "tradeStatus: enum value expected";
                                case 0:
                                case 7:
                                case 10:
                                case 20:
                                case 27:
                                case 30:
                                case 40:
                                case 50:
                                case 60:
                                case 67:
                                case 70:
                                case 99:
                                    break
                                }
                            if (null != t.codes && t.hasOwnProperty("codes")) {
                                if (!Array.isArray(t.codes))
                                    return "codes: array expected";
                                for (let e = 0; e < t.codes.length; ++e)
                                    if (!A.isString(t.codes[e]))
                                        return "codes: string[] expected"
                            }
                            if (null != t.commodites && t.hasOwnProperty("commodites")) {
                                if (!Array.isArray(t.commodites))
                                    return "commodites: array expected";
                                for (let e = 0; e < t.commodites.length; ++e)
                                    if (!A.isString(t.commodites[e]))
                                        return "commodites: string[] expected"
                            }
                            if (null != t.markets && t.hasOwnProperty("markets")) {
                                if (!Array.isArray(t.markets))
                                    return "markets: array expected";
                                for (let e = 0; e < t.markets.length; ++e)
                                    if (!A.isString(t.markets[e]))
                                        return "markets: string[] expected"
                            }
                            return null == t.quotetime || !t.hasOwnProperty("quotetime") || A.isInteger(t.quotetime) || t.quotetime && A.isInteger(t.quotetime.low) && A.isInteger(t.quotetime.high) ? null : "quotetime: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.TradeStatusMsg)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.TradeStatusMsg;
                            switch (t.tradeStatus) {
                            case "INIT":
                            case 0:
                                e.tradeStatus = 0;
                                break;
                            case "INIT_FINISH":
                            case 7:
                                e.tradeStatus = 7;
                                break;
                            case "OPEN":
                            case 10:
                                e.tradeStatus = 10;
                                break;
                            case "CALL_AUCTION":
                            case 20:
                                e.tradeStatus = 20;
                                break;
                            case "CALL_AUCTION_FINISH":
                            case 27:
                                e.tradeStatus = 27;
                                break;
                            case "TRADING":
                            case 30:
                                e.tradeStatus = 30;
                                break;
                            case "PAUSE":
                            case 40:
                                e.tradeStatus = 40;
                                break;
                            case "DELIVERY_CALL":
                            case 50:
                                e.tradeStatus = 50;
                                break;
                            case "DELIVERY":
                            case 60:
                                e.tradeStatus = 60;
                                break;
                            case "DELIVERY_FINISH":
                            case 67:
                                e.tradeStatus = 67;
                                break;
                            case "NEUTRAL_WAREHOUSE":
                            case 70:
                                e.tradeStatus = 70;
                                break;
                            case "CLOSE":
                            case 99:
                                e.tradeStatus = 99;
                                break
                            }
                            if (t.codes) {
                                if (!Array.isArray(t.codes))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.TradeStatusMsg.codes: array expected");
                                e.codes = [];
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.codes[a] = String(t.codes[a])
                            }
                            if (t.commodites) {
                                if (!Array.isArray(t.commodites))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.TradeStatusMsg.commodites: array expected");
                                e.commodites = [];
                                for (let a = 0; a < t.commodites.length; ++a)
                                    e.commodites[a] = String(t.commodites[a])
                            }
                            if (t.markets) {
                                if (!Array.isArray(t.markets))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.TradeStatusMsg.markets: array expected");
                                e.markets = [];
                                for (let a = 0; a < t.markets.length; ++a)
                                    e.markets[a] = String(t.markets[a])
                            }
                            return null != t.quotetime && (A.Long ? (e.quotetime = A.Long.fromValue(t.quotetime)).unsigned = !1 : "string" === typeof t.quotetime ? e.quotetime = parseInt(t.quotetime, 10) : "number" === typeof t.quotetime ? e.quotetime = t.quotetime : "object" === typeof t.quotetime && (e.quotetime = new A.LongBits(t.quotetime.low >>> 0,t.quotetime.high >>> 0).toNumber())),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.codes = [],
                            a.commodites = [],
                            a.markets = []),
                            e.defaults)
                                if (a.tradeStatus = e.enums === String ? "INIT" : 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.quotetime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.quotetime = e.longs === String ? "0" : 0;
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus") && (a.tradeStatus = e.enums === String ? O.jadegold.msg.quotation.pbv2.TradeStatus[t.tradeStatus] : t.tradeStatus),
                            t.codes && t.codes.length) {
                                a.codes = [];
                                for (let e = 0; e < t.codes.length; ++e)
                                    a.codes[e] = t.codes[e]
                            }
                            if (t.commodites && t.commodites.length) {
                                a.commodites = [];
                                for (let e = 0; e < t.commodites.length; ++e)
                                    a.commodites[e] = t.commodites[e]
                            }
                            if (t.markets && t.markets.length) {
                                a.markets = [];
                                for (let e = 0; e < t.markets.length; ++e)
                                    a.markets[e] = t.markets[e]
                            }
                            return null != t.quotetime && t.hasOwnProperty("quotetime") && ("number" === typeof t.quotetime ? a.quotetime = e.longs === String ? String(t.quotetime) : t.quotetime : a.quotetime = e.longs === String ? A.Long.prototype.toString.call(t.quotetime) : e.longs === Number ? new A.LongBits(t.quotetime.low >>> 0,t.quotetime.high >>> 0).toNumber() : t.quotetime),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuoteQueryCondition = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.size = 0,
                        t.prototype.begintime = 0,
                        t.prototype.endtime = 0,
                        t.prototype.infoDays = 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.size && Object.hasOwnProperty.call(t, "size") && e.uint32(8).int32(t.size),
                            null != t.begintime && Object.hasOwnProperty.call(t, "begintime") && e.uint32(21).fixed32(t.begintime),
                            null != t.endtime && Object.hasOwnProperty.call(t, "endtime") && e.uint32(29).fixed32(t.endtime),
                            null != t.infoDays && Object.hasOwnProperty.call(t, "infoDays") && e.uint32(32).int32(t.infoDays),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuoteQueryCondition;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.size = t.int32();
                                    break;
                                case 2:
                                    i.begintime = t.fixed32();
                                    break;
                                case 3:
                                    i.endtime = t.fixed32();
                                    break;
                                case 4:
                                    i.infoDays = t.int32();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.size && t.hasOwnProperty("size") && !A.isInteger(t.size) ? "size: integer expected" : null != t.begintime && t.hasOwnProperty("begintime") && !A.isInteger(t.begintime) ? "begintime: integer expected" : null != t.endtime && t.hasOwnProperty("endtime") && !A.isInteger(t.endtime) ? "endtime: integer expected" : null != t.infoDays && t.hasOwnProperty("infoDays") && !A.isInteger(t.infoDays) ? "infoDays: integer expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuoteQueryCondition)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuoteQueryCondition;
                            return null != t.size && (e.size = 0 | t.size),
                            null != t.begintime && (e.begintime = t.begintime >>> 0),
                            null != t.endtime && (e.endtime = t.endtime >>> 0),
                            null != t.infoDays && (e.infoDays = 0 | t.infoDays),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            return e.defaults && (a.size = 0,
                            a.begintime = 0,
                            a.endtime = 0,
                            a.infoDays = 0),
                            null != t.size && t.hasOwnProperty("size") && (a.size = t.size),
                            null != t.begintime && t.hasOwnProperty("begintime") && (a.begintime = t.begintime),
                            null != t.endtime && t.hasOwnProperty("endtime") && (a.endtime = t.endtime),
                            null != t.infoDays && t.hasOwnProperty("infoDays") && (a.infoDays = t.infoDays),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.AuthReq = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.apptype = "",
                        t.prototype.token = A.newBuffer([]),
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.apptype && Object.hasOwnProperty.call(t, "apptype") && e.uint32(10).string(t.apptype),
                            null != t.token && Object.hasOwnProperty.call(t, "token") && e.uint32(18).bytes(t.token),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.AuthReq;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.apptype = t.string();
                                    break;
                                case 2:
                                    i.token = t.bytes();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.apptype && t.hasOwnProperty("apptype") && !A.isString(t.apptype) ? "apptype: string expected" : null != t.token && t.hasOwnProperty("token") && !(t.token && "number" === typeof t.token.length || A.isString(t.token)) ? "token: buffer expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.AuthReq)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.AuthReq;
                            return null != t.apptype && (e.apptype = String(t.apptype)),
                            null != t.token && ("string" === typeof t.token ? A.base64.decode(t.token, e.token = A.newBuffer(A.base64.length(t.token)), 0) : t.token.length && (e.token = t.token)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            return e.defaults && (a.apptype = "",
                            e.bytes === String ? a.token = "" : (a.token = [],
                            e.bytes !== Array && (a.token = A.newBuffer(a.token)))),
                            null != t.apptype && t.hasOwnProperty("apptype") && (a.apptype = t.apptype),
                            null != t.token && t.hasOwnProperty("token") && (a.token = e.bytes === String ? A.base64.encode(t.token, 0, t.token.length) : e.bytes === Array ? Array.prototype.slice.call(t.token) : t.token),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.AuthResp = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.serverInfo = A.newBuffer([]),
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.serverInfo && Object.hasOwnProperty.call(t, "serverInfo") && e.uint32(10).bytes(t.serverInfo),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.AuthResp;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.serverInfo = t.bytes();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.serverInfo && t.hasOwnProperty("serverInfo") && !(t.serverInfo && "number" === typeof t.serverInfo.length || A.isString(t.serverInfo)) ? "serverInfo: buffer expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.AuthResp)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.AuthResp;
                            return null != t.serverInfo && ("string" === typeof t.serverInfo ? A.base64.decode(t.serverInfo, e.serverInfo = A.newBuffer(A.base64.length(t.serverInfo)), 0) : t.serverInfo.length && (e.serverInfo = t.serverInfo)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            return e.defaults && (e.bytes === String ? a.serverInfo = "" : (a.serverInfo = [],
                            e.bytes !== Array && (a.serverInfo = A.newBuffer(a.serverInfo)))),
                            null != t.serverInfo && t.hasOwnProperty("serverInfo") && (a.serverInfo = e.bytes === String ? A.base64.encode(t.serverInfo, 0, t.serverInfo.length) : e.bytes === Array ? Array.prototype.slice.call(t.serverInfo) : t.serverInfo),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuotationFreq = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "REALTIME"] = 0,
                        e[t[1] = "INFO"] = 1,
                        e[t[2] = "TICK"] = 2,
                        e[t[3] = "MIN1"] = 3,
                        e[t[4] = "MIN5"] = 4,
                        e[t[5] = "MIN15"] = 5,
                        e[t[6] = "MIN30"] = 6,
                        e[t[7] = "MIN60"] = 7,
                        e[t[8] = "MIN120"] = 8,
                        e[t[9] = "MIN240"] = 9,
                        e[t[10] = "DAY1"] = 10,
                        e[t[11] = "WEEK1"] = 11,
                        e[t[12] = "MONTH1"] = 12,
                        e
                    }(),
                    t.RealtimeField = function() {
                        function t(t) {
                            if (this.askPrice = [],
                            this.askVol = [],
                            this.bidPrice = [],
                            this.bidVol = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.last = 0,
                        t.prototype.askPrice = A.emptyArray,
                        t.prototype.askVol = A.emptyArray,
                        t.prototype.bidPrice = A.emptyArray,
                        t.prototype.bidVol = A.emptyArray,
                        t.prototype.tag = 0,
                        t.prototype.posiDelta = 0,
                        t.prototype.highLimit = 0,
                        t.prototype.lowLimit = 0,
                        t.prototype.tickVolume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.updown = 0,
                        t.prototype.updownRate = 0,
                        t.prototype.average = 0,
                        t.prototype.tradeday = 0,
                        t.prototype.infoVolume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.last && Object.hasOwnProperty.call(t, "last") && e.uint32(9).double(t.last),
                            null != t.askPrice && t.askPrice.length) {
                                e.uint32(18).fork();
                                for (let a = 0; a < t.askPrice.length; ++a)
                                    e.double(t.askPrice[a]);
                                e.ldelim()
                            }
                            if (null != t.askVol && t.askVol.length) {
                                e.uint32(26).fork();
                                for (let a = 0; a < t.askVol.length; ++a)
                                    e.int64(t.askVol[a]);
                                e.ldelim()
                            }
                            if (null != t.bidPrice && t.bidPrice.length) {
                                e.uint32(34).fork();
                                for (let a = 0; a < t.bidPrice.length; ++a)
                                    e.double(t.bidPrice[a]);
                                e.ldelim()
                            }
                            if (null != t.bidVol && t.bidVol.length) {
                                e.uint32(42).fork();
                                for (let a = 0; a < t.bidVol.length; ++a)
                                    e.int64(t.bidVol[a]);
                                e.ldelim()
                            }
                            return null != t.tag && Object.hasOwnProperty.call(t, "tag") && e.uint32(48).int32(t.tag),
                            null != t.posiDelta && Object.hasOwnProperty.call(t, "posiDelta") && e.uint32(57).double(t.posiDelta),
                            null != t.highLimit && Object.hasOwnProperty.call(t, "highLimit") && e.uint32(65).double(t.highLimit),
                            null != t.lowLimit && Object.hasOwnProperty.call(t, "lowLimit") && e.uint32(73).double(t.lowLimit),
                            null != t.tickVolume && Object.hasOwnProperty.call(t, "tickVolume") && e.uint32(80).int64(t.tickVolume),
                            null != t.updown && Object.hasOwnProperty.call(t, "updown") && e.uint32(89).double(t.updown),
                            null != t.updownRate && Object.hasOwnProperty.call(t, "updownRate") && e.uint32(97).double(t.updownRate),
                            null != t.average && Object.hasOwnProperty.call(t, "average") && e.uint32(105).double(t.average),
                            null != t.tradeday && Object.hasOwnProperty.call(t, "tradeday") && e.uint32(112).int32(t.tradeday),
                            null != t.infoVolume && Object.hasOwnProperty.call(t, "infoVolume") && e.uint32(120).int64(t.infoVolume),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.RealtimeField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.last = t.double();
                                    break;
                                case 2:
                                    if (i.askPrice && i.askPrice.length || (i.askPrice = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.askPrice.push(t.double())
                                    } else
                                        i.askPrice.push(t.double());
                                    break;
                                case 3:
                                    if (i.askVol && i.askVol.length || (i.askVol = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.askVol.push(t.int64())
                                    } else
                                        i.askVol.push(t.int64());
                                    break;
                                case 4:
                                    if (i.bidPrice && i.bidPrice.length || (i.bidPrice = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.bidPrice.push(t.double())
                                    } else
                                        i.bidPrice.push(t.double());
                                    break;
                                case 5:
                                    if (i.bidVol && i.bidVol.length || (i.bidVol = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.bidVol.push(t.int64())
                                    } else
                                        i.bidVol.push(t.int64());
                                    break;
                                case 6:
                                    i.tag = t.int32();
                                    break;
                                case 7:
                                    i.posiDelta = t.double();
                                    break;
                                case 8:
                                    i.highLimit = t.double();
                                    break;
                                case 9:
                                    i.lowLimit = t.double();
                                    break;
                                case 10:
                                    i.tickVolume = t.int64();
                                    break;
                                case 11:
                                    i.updown = t.double();
                                    break;
                                case 12:
                                    i.updownRate = t.double();
                                    break;
                                case 13:
                                    i.average = t.double();
                                    break;
                                case 14:
                                    i.tradeday = t.int32();
                                    break;
                                case 15:
                                    i.infoVolume = t.int64();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.last && t.hasOwnProperty("last") && "number" !== typeof t.last)
                                return "last: number expected";
                            if (null != t.askPrice && t.hasOwnProperty("askPrice")) {
                                if (!Array.isArray(t.askPrice))
                                    return "askPrice: array expected";
                                for (let e = 0; e < t.askPrice.length; ++e)
                                    if ("number" !== typeof t.askPrice[e])
                                        return "askPrice: number[] expected"
                            }
                            if (null != t.askVol && t.hasOwnProperty("askVol")) {
                                if (!Array.isArray(t.askVol))
                                    return "askVol: array expected";
                                for (let e = 0; e < t.askVol.length; ++e)
                                    if (!A.isInteger(t.askVol[e]) && !(t.askVol[e] && A.isInteger(t.askVol[e].low) && A.isInteger(t.askVol[e].high)))
                                        return "askVol: integer|Long[] expected"
                            }
                            if (null != t.bidPrice && t.hasOwnProperty("bidPrice")) {
                                if (!Array.isArray(t.bidPrice))
                                    return "bidPrice: array expected";
                                for (let e = 0; e < t.bidPrice.length; ++e)
                                    if ("number" !== typeof t.bidPrice[e])
                                        return "bidPrice: number[] expected"
                            }
                            if (null != t.bidVol && t.hasOwnProperty("bidVol")) {
                                if (!Array.isArray(t.bidVol))
                                    return "bidVol: array expected";
                                for (let e = 0; e < t.bidVol.length; ++e)
                                    if (!A.isInteger(t.bidVol[e]) && !(t.bidVol[e] && A.isInteger(t.bidVol[e].low) && A.isInteger(t.bidVol[e].high)))
                                        return "bidVol: integer|Long[] expected"
                            }
                            return null != t.tag && t.hasOwnProperty("tag") && !A.isInteger(t.tag) ? "tag: integer expected" : null != t.posiDelta && t.hasOwnProperty("posiDelta") && "number" !== typeof t.posiDelta ? "posiDelta: number expected" : null != t.highLimit && t.hasOwnProperty("highLimit") && "number" !== typeof t.highLimit ? "highLimit: number expected" : null != t.lowLimit && t.hasOwnProperty("lowLimit") && "number" !== typeof t.lowLimit ? "lowLimit: number expected" : null == t.tickVolume || !t.hasOwnProperty("tickVolume") || A.isInteger(t.tickVolume) || t.tickVolume && A.isInteger(t.tickVolume.low) && A.isInteger(t.tickVolume.high) ? null != t.updown && t.hasOwnProperty("updown") && "number" !== typeof t.updown ? "updown: number expected" : null != t.updownRate && t.hasOwnProperty("updownRate") && "number" !== typeof t.updownRate ? "updownRate: number expected" : null != t.average && t.hasOwnProperty("average") && "number" !== typeof t.average ? "average: number expected" : null != t.tradeday && t.hasOwnProperty("tradeday") && !A.isInteger(t.tradeday) ? "tradeday: integer expected" : null == t.infoVolume || !t.hasOwnProperty("infoVolume") || A.isInteger(t.infoVolume) || t.infoVolume && A.isInteger(t.infoVolume.low) && A.isInteger(t.infoVolume.high) ? null : "infoVolume: integer|Long expected" : "tickVolume: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.RealtimeField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.RealtimeField;
                            if (null != t.last && (e.last = Number(t.last)),
                            t.askPrice) {
                                if (!Array.isArray(t.askPrice))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.askPrice: array expected");
                                e.askPrice = [];
                                for (let a = 0; a < t.askPrice.length; ++a)
                                    e.askPrice[a] = Number(t.askPrice[a])
                            }
                            if (t.askVol) {
                                if (!Array.isArray(t.askVol))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.askVol: array expected");
                                e.askVol = [];
                                for (let a = 0; a < t.askVol.length; ++a)
                                    A.Long ? (e.askVol[a] = A.Long.fromValue(t.askVol[a])).unsigned = !1 : "string" === typeof t.askVol[a] ? e.askVol[a] = parseInt(t.askVol[a], 10) : "number" === typeof t.askVol[a] ? e.askVol[a] = t.askVol[a] : "object" === typeof t.askVol[a] && (e.askVol[a] = new A.LongBits(t.askVol[a].low >>> 0,t.askVol[a].high >>> 0).toNumber())
                            }
                            if (t.bidPrice) {
                                if (!Array.isArray(t.bidPrice))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.bidPrice: array expected");
                                e.bidPrice = [];
                                for (let a = 0; a < t.bidPrice.length; ++a)
                                    e.bidPrice[a] = Number(t.bidPrice[a])
                            }
                            if (t.bidVol) {
                                if (!Array.isArray(t.bidVol))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.bidVol: array expected");
                                e.bidVol = [];
                                for (let a = 0; a < t.bidVol.length; ++a)
                                    A.Long ? (e.bidVol[a] = A.Long.fromValue(t.bidVol[a])).unsigned = !1 : "string" === typeof t.bidVol[a] ? e.bidVol[a] = parseInt(t.bidVol[a], 10) : "number" === typeof t.bidVol[a] ? e.bidVol[a] = t.bidVol[a] : "object" === typeof t.bidVol[a] && (e.bidVol[a] = new A.LongBits(t.bidVol[a].low >>> 0,t.bidVol[a].high >>> 0).toNumber())
                            }
                            return null != t.tag && (e.tag = 0 | t.tag),
                            null != t.posiDelta && (e.posiDelta = Number(t.posiDelta)),
                            null != t.highLimit && (e.highLimit = Number(t.highLimit)),
                            null != t.lowLimit && (e.lowLimit = Number(t.lowLimit)),
                            null != t.tickVolume && (A.Long ? (e.tickVolume = A.Long.fromValue(t.tickVolume)).unsigned = !1 : "string" === typeof t.tickVolume ? e.tickVolume = parseInt(t.tickVolume, 10) : "number" === typeof t.tickVolume ? e.tickVolume = t.tickVolume : "object" === typeof t.tickVolume && (e.tickVolume = new A.LongBits(t.tickVolume.low >>> 0,t.tickVolume.high >>> 0).toNumber())),
                            null != t.updown && (e.updown = Number(t.updown)),
                            null != t.updownRate && (e.updownRate = Number(t.updownRate)),
                            null != t.average && (e.average = Number(t.average)),
                            null != t.tradeday && (e.tradeday = 0 | t.tradeday),
                            null != t.infoVolume && (A.Long ? (e.infoVolume = A.Long.fromValue(t.infoVolume)).unsigned = !1 : "string" === typeof t.infoVolume ? e.infoVolume = parseInt(t.infoVolume, 10) : "number" === typeof t.infoVolume ? e.infoVolume = t.infoVolume : "object" === typeof t.infoVolume && (e.infoVolume = new A.LongBits(t.infoVolume.low >>> 0,t.infoVolume.high >>> 0).toNumber())),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.askPrice = [],
                            a.askVol = [],
                            a.bidPrice = [],
                            a.bidVol = []),
                            e.defaults) {
                                if (a.last = 0,
                                a.tag = 0,
                                a.posiDelta = 0,
                                a.highLimit = 0,
                                a.lowLimit = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.tickVolume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.tickVolume = e.longs === String ? "0" : 0;
                                if (a.updown = 0,
                                a.updownRate = 0,
                                a.average = 0,
                                a.tradeday = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.infoVolume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.infoVolume = e.longs === String ? "0" : 0
                            }
                            if (null != t.last && t.hasOwnProperty("last") && (a.last = e.json && !isFinite(t.last) ? String(t.last) : t.last),
                            t.askPrice && t.askPrice.length) {
                                a.askPrice = [];
                                for (let i = 0; i < t.askPrice.length; ++i)
                                    a.askPrice[i] = e.json && !isFinite(t.askPrice[i]) ? String(t.askPrice[i]) : t.askPrice[i]
                            }
                            if (t.askVol && t.askVol.length) {
                                a.askVol = [];
                                for (let i = 0; i < t.askVol.length; ++i)
                                    "number" === typeof t.askVol[i] ? a.askVol[i] = e.longs === String ? String(t.askVol[i]) : t.askVol[i] : a.askVol[i] = e.longs === String ? A.Long.prototype.toString.call(t.askVol[i]) : e.longs === Number ? new A.LongBits(t.askVol[i].low >>> 0,t.askVol[i].high >>> 0).toNumber() : t.askVol[i]
                            }
                            if (t.bidPrice && t.bidPrice.length) {
                                a.bidPrice = [];
                                for (let i = 0; i < t.bidPrice.length; ++i)
                                    a.bidPrice[i] = e.json && !isFinite(t.bidPrice[i]) ? String(t.bidPrice[i]) : t.bidPrice[i]
                            }
                            if (t.bidVol && t.bidVol.length) {
                                a.bidVol = [];
                                for (let i = 0; i < t.bidVol.length; ++i)
                                    "number" === typeof t.bidVol[i] ? a.bidVol[i] = e.longs === String ? String(t.bidVol[i]) : t.bidVol[i] : a.bidVol[i] = e.longs === String ? A.Long.prototype.toString.call(t.bidVol[i]) : e.longs === Number ? new A.LongBits(t.bidVol[i].low >>> 0,t.bidVol[i].high >>> 0).toNumber() : t.bidVol[i]
                            }
                            return null != t.tag && t.hasOwnProperty("tag") && (a.tag = t.tag),
                            null != t.posiDelta && t.hasOwnProperty("posiDelta") && (a.posiDelta = e.json && !isFinite(t.posiDelta) ? String(t.posiDelta) : t.posiDelta),
                            null != t.highLimit && t.hasOwnProperty("highLimit") && (a.highLimit = e.json && !isFinite(t.highLimit) ? String(t.highLimit) : t.highLimit),
                            null != t.lowLimit && t.hasOwnProperty("lowLimit") && (a.lowLimit = e.json && !isFinite(t.lowLimit) ? String(t.lowLimit) : t.lowLimit),
                            null != t.tickVolume && t.hasOwnProperty("tickVolume") && ("number" === typeof t.tickVolume ? a.tickVolume = e.longs === String ? String(t.tickVolume) : t.tickVolume : a.tickVolume = e.longs === String ? A.Long.prototype.toString.call(t.tickVolume) : e.longs === Number ? new A.LongBits(t.tickVolume.low >>> 0,t.tickVolume.high >>> 0).toNumber() : t.tickVolume),
                            null != t.updown && t.hasOwnProperty("updown") && (a.updown = e.json && !isFinite(t.updown) ? String(t.updown) : t.updown),
                            null != t.updownRate && t.hasOwnProperty("updownRate") && (a.updownRate = e.json && !isFinite(t.updownRate) ? String(t.updownRate) : t.updownRate),
                            null != t.average && t.hasOwnProperty("average") && (a.average = e.json && !isFinite(t.average) ? String(t.average) : t.average),
                            null != t.tradeday && t.hasOwnProperty("tradeday") && (a.tradeday = t.tradeday),
                            null != t.infoVolume && t.hasOwnProperty("infoVolume") && ("number" === typeof t.infoVolume ? a.infoVolume = e.longs === String ? String(t.infoVolume) : t.infoVolume : a.infoVolume = e.longs === String ? A.Long.prototype.toString.call(t.infoVolume) : e.longs === Number ? new A.LongBits(t.infoVolume.low >>> 0,t.infoVolume.high >>> 0).toNumber() : t.infoVolume),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.ExtraField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.preSettle = 0,
                        t.prototype.sequenceNo = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.amplitude = 0,
                        t.prototype.currDelta = 0,
                        t.prototype.preDelta = 0,
                        t.prototype.market = "",
                        t.prototype.exchangeId = "",
                        t.prototype.prePosi = 0,
                        t.prototype.name = "",
                        t.prototype.commodityCode = "",
                        t.prototype.tradeStatus = 0,
                        t.prototype.openTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.closeTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.goldDelivery = null,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.preSettle && Object.hasOwnProperty.call(t, "preSettle") && e.uint32(9).double(t.preSettle),
                            null != t.sequenceNo && Object.hasOwnProperty.call(t, "sequenceNo") && e.uint32(16).int64(t.sequenceNo),
                            null != t.amplitude && Object.hasOwnProperty.call(t, "amplitude") && e.uint32(25).double(t.amplitude),
                            null != t.currDelta && Object.hasOwnProperty.call(t, "currDelta") && e.uint32(33).double(t.currDelta),
                            null != t.preDelta && Object.hasOwnProperty.call(t, "preDelta") && e.uint32(41).double(t.preDelta),
                            null != t.market && Object.hasOwnProperty.call(t, "market") && e.uint32(50).string(t.market),
                            null != t.exchangeId && Object.hasOwnProperty.call(t, "exchangeId") && e.uint32(58).string(t.exchangeId),
                            null != t.prePosi && Object.hasOwnProperty.call(t, "prePosi") && e.uint32(65).double(t.prePosi),
                            null != t.name && Object.hasOwnProperty.call(t, "name") && e.uint32(74).string(t.name),
                            null != t.commodityCode && Object.hasOwnProperty.call(t, "commodityCode") && e.uint32(82).string(t.commodityCode),
                            null != t.tradeStatus && Object.hasOwnProperty.call(t, "tradeStatus") && e.uint32(88).int32(t.tradeStatus),
                            null != t.openTime && Object.hasOwnProperty.call(t, "openTime") && e.uint32(136).int64(t.openTime),
                            null != t.closeTime && Object.hasOwnProperty.call(t, "closeTime") && e.uint32(144).int64(t.closeTime),
                            null != t.goldDelivery && Object.hasOwnProperty.call(t, "goldDelivery") && O.jadegold.msg.quotation.pbv2.GoldDeliveryField.encode(t.goldDelivery, e.uint32(514).fork()).ldelim(),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.ExtraField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.preSettle = t.double();
                                    break;
                                case 2:
                                    i.sequenceNo = t.int64();
                                    break;
                                case 3:
                                    i.amplitude = t.double();
                                    break;
                                case 4:
                                    i.currDelta = t.double();
                                    break;
                                case 5:
                                    i.preDelta = t.double();
                                    break;
                                case 6:
                                    i.market = t.string();
                                    break;
                                case 7:
                                    i.exchangeId = t.string();
                                    break;
                                case 8:
                                    i.prePosi = t.double();
                                    break;
                                case 9:
                                    i.name = t.string();
                                    break;
                                case 10:
                                    i.commodityCode = t.string();
                                    break;
                                case 11:
                                    i.tradeStatus = t.int32();
                                    break;
                                case 17:
                                    i.openTime = t.int64();
                                    break;
                                case 18:
                                    i.closeTime = t.int64();
                                    break;
                                case 64:
                                    i.goldDelivery = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.preSettle && t.hasOwnProperty("preSettle") && "number" !== typeof t.preSettle)
                                return "preSettle: number expected";
                            if (null != t.sequenceNo && t.hasOwnProperty("sequenceNo") && !A.isInteger(t.sequenceNo) && !(t.sequenceNo && A.isInteger(t.sequenceNo.low) && A.isInteger(t.sequenceNo.high)))
                                return "sequenceNo: integer|Long expected";
                            if (null != t.amplitude && t.hasOwnProperty("amplitude") && "number" !== typeof t.amplitude)
                                return "amplitude: number expected";
                            if (null != t.currDelta && t.hasOwnProperty("currDelta") && "number" !== typeof t.currDelta)
                                return "currDelta: number expected";
                            if (null != t.preDelta && t.hasOwnProperty("preDelta") && "number" !== typeof t.preDelta)
                                return "preDelta: number expected";
                            if (null != t.market && t.hasOwnProperty("market") && !A.isString(t.market))
                                return "market: string expected";
                            if (null != t.exchangeId && t.hasOwnProperty("exchangeId") && !A.isString(t.exchangeId))
                                return "exchangeId: string expected";
                            if (null != t.prePosi && t.hasOwnProperty("prePosi") && "number" !== typeof t.prePosi)
                                return "prePosi: number expected";
                            if (null != t.name && t.hasOwnProperty("name") && !A.isString(t.name))
                                return "name: string expected";
                            if (null != t.commodityCode && t.hasOwnProperty("commodityCode") && !A.isString(t.commodityCode))
                                return "commodityCode: string expected";
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus"))
                                switch (t.tradeStatus) {
                                default:
                                    return "tradeStatus: enum value expected";
                                case 0:
                                case 7:
                                case 10:
                                case 20:
                                case 27:
                                case 30:
                                case 40:
                                case 50:
                                case 60:
                                case 67:
                                case 70:
                                case 99:
                                    break
                                }
                            if (null != t.openTime && t.hasOwnProperty("openTime") && !A.isInteger(t.openTime) && !(t.openTime && A.isInteger(t.openTime.low) && A.isInteger(t.openTime.high)))
                                return "openTime: integer|Long expected";
                            if (null != t.closeTime && t.hasOwnProperty("closeTime") && !A.isInteger(t.closeTime) && !(t.closeTime && A.isInteger(t.closeTime.low) && A.isInteger(t.closeTime.high)))
                                return "closeTime: integer|Long expected";
                            if (null != t.goldDelivery && t.hasOwnProperty("goldDelivery")) {
                                let e = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.verify(t.goldDelivery);
                                if (e)
                                    return "goldDelivery." + e
                            }
                            return null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.ExtraField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.ExtraField;
                            switch (null != t.preSettle && (e.preSettle = Number(t.preSettle)),
                            null != t.sequenceNo && (A.Long ? (e.sequenceNo = A.Long.fromValue(t.sequenceNo)).unsigned = !1 : "string" === typeof t.sequenceNo ? e.sequenceNo = parseInt(t.sequenceNo, 10) : "number" === typeof t.sequenceNo ? e.sequenceNo = t.sequenceNo : "object" === typeof t.sequenceNo && (e.sequenceNo = new A.LongBits(t.sequenceNo.low >>> 0,t.sequenceNo.high >>> 0).toNumber())),
                            null != t.amplitude && (e.amplitude = Number(t.amplitude)),
                            null != t.currDelta && (e.currDelta = Number(t.currDelta)),
                            null != t.preDelta && (e.preDelta = Number(t.preDelta)),
                            null != t.market && (e.market = String(t.market)),
                            null != t.exchangeId && (e.exchangeId = String(t.exchangeId)),
                            null != t.prePosi && (e.prePosi = Number(t.prePosi)),
                            null != t.name && (e.name = String(t.name)),
                            null != t.commodityCode && (e.commodityCode = String(t.commodityCode)),
                            t.tradeStatus) {
                            case "INIT":
                            case 0:
                                e.tradeStatus = 0;
                                break;
                            case "INIT_FINISH":
                            case 7:
                                e.tradeStatus = 7;
                                break;
                            case "OPEN":
                            case 10:
                                e.tradeStatus = 10;
                                break;
                            case "CALL_AUCTION":
                            case 20:
                                e.tradeStatus = 20;
                                break;
                            case "CALL_AUCTION_FINISH":
                            case 27:
                                e.tradeStatus = 27;
                                break;
                            case "TRADING":
                            case 30:
                                e.tradeStatus = 30;
                                break;
                            case "PAUSE":
                            case 40:
                                e.tradeStatus = 40;
                                break;
                            case "DELIVERY_CALL":
                            case 50:
                                e.tradeStatus = 50;
                                break;
                            case "DELIVERY":
                            case 60:
                                e.tradeStatus = 60;
                                break;
                            case "DELIVERY_FINISH":
                            case 67:
                                e.tradeStatus = 67;
                                break;
                            case "NEUTRAL_WAREHOUSE":
                            case 70:
                                e.tradeStatus = 70;
                                break;
                            case "CLOSE":
                            case 99:
                                e.tradeStatus = 99;
                                break
                            }
                            if (null != t.openTime && (A.Long ? (e.openTime = A.Long.fromValue(t.openTime)).unsigned = !1 : "string" === typeof t.openTime ? e.openTime = parseInt(t.openTime, 10) : "number" === typeof t.openTime ? e.openTime = t.openTime : "object" === typeof t.openTime && (e.openTime = new A.LongBits(t.openTime.low >>> 0,t.openTime.high >>> 0).toNumber())),
                            null != t.closeTime && (A.Long ? (e.closeTime = A.Long.fromValue(t.closeTime)).unsigned = !1 : "string" === typeof t.closeTime ? e.closeTime = parseInt(t.closeTime, 10) : "number" === typeof t.closeTime ? e.closeTime = t.closeTime : "object" === typeof t.closeTime && (e.closeTime = new A.LongBits(t.closeTime.low >>> 0,t.closeTime.high >>> 0).toNumber())),
                            null != t.goldDelivery) {
                                if ("object" !== typeof t.goldDelivery)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.ExtraField.goldDelivery: object expected");
                                e.goldDelivery = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.fromObject(t.goldDelivery)
                            }
                            return e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (a.preSettle = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.sequenceNo = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.sequenceNo = e.longs === String ? "0" : 0;
                                if (a.amplitude = 0,
                                a.currDelta = 0,
                                a.preDelta = 0,
                                a.market = "",
                                a.exchangeId = "",
                                a.prePosi = 0,
                                a.name = "",
                                a.commodityCode = "",
                                a.tradeStatus = e.enums === String ? "INIT" : 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.openTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.openTime = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.closeTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.closeTime = e.longs === String ? "0" : 0;
                                a.goldDelivery = null
                            }
                            return null != t.preSettle && t.hasOwnProperty("preSettle") && (a.preSettle = e.json && !isFinite(t.preSettle) ? String(t.preSettle) : t.preSettle),
                            null != t.sequenceNo && t.hasOwnProperty("sequenceNo") && ("number" === typeof t.sequenceNo ? a.sequenceNo = e.longs === String ? String(t.sequenceNo) : t.sequenceNo : a.sequenceNo = e.longs === String ? A.Long.prototype.toString.call(t.sequenceNo) : e.longs === Number ? new A.LongBits(t.sequenceNo.low >>> 0,t.sequenceNo.high >>> 0).toNumber() : t.sequenceNo),
                            null != t.amplitude && t.hasOwnProperty("amplitude") && (a.amplitude = e.json && !isFinite(t.amplitude) ? String(t.amplitude) : t.amplitude),
                            null != t.currDelta && t.hasOwnProperty("currDelta") && (a.currDelta = e.json && !isFinite(t.currDelta) ? String(t.currDelta) : t.currDelta),
                            null != t.preDelta && t.hasOwnProperty("preDelta") && (a.preDelta = e.json && !isFinite(t.preDelta) ? String(t.preDelta) : t.preDelta),
                            null != t.market && t.hasOwnProperty("market") && (a.market = t.market),
                            null != t.exchangeId && t.hasOwnProperty("exchangeId") && (a.exchangeId = t.exchangeId),
                            null != t.prePosi && t.hasOwnProperty("prePosi") && (a.prePosi = e.json && !isFinite(t.prePosi) ? String(t.prePosi) : t.prePosi),
                            null != t.name && t.hasOwnProperty("name") && (a.name = t.name),
                            null != t.commodityCode && t.hasOwnProperty("commodityCode") && (a.commodityCode = t.commodityCode),
                            null != t.tradeStatus && t.hasOwnProperty("tradeStatus") && (a.tradeStatus = e.enums === String ? O.jadegold.msg.quotation.pbv2.TradeStatus[t.tradeStatus] : t.tradeStatus),
                            null != t.openTime && t.hasOwnProperty("openTime") && ("number" === typeof t.openTime ? a.openTime = e.longs === String ? String(t.openTime) : t.openTime : a.openTime = e.longs === String ? A.Long.prototype.toString.call(t.openTime) : e.longs === Number ? new A.LongBits(t.openTime.low >>> 0,t.openTime.high >>> 0).toNumber() : t.openTime),
                            null != t.closeTime && t.hasOwnProperty("closeTime") && ("number" === typeof t.closeTime ? a.closeTime = e.longs === String ? String(t.closeTime) : t.closeTime : a.closeTime = e.longs === String ? A.Long.prototype.toString.call(t.closeTime) : e.longs === Number ? new A.LongBits(t.closeTime.low >>> 0,t.closeTime.high >>> 0).toNumber() : t.closeTime),
                            null != t.goldDelivery && t.hasOwnProperty("goldDelivery") && (a.goldDelivery = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.toObject(t.goldDelivery, e)),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.ServerInnerField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.beginVolume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.beginTurnover = 0,
                        t.prototype.tradeUnit = 0,
                        t.prototype.priorno = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.tradeDay = "",
                        t.prototype.updateTime = "",
                        t.prototype.updateMs = 0,
                        t.prototype.actionDay = "",
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.beginVolume && Object.hasOwnProperty.call(t, "beginVolume") && e.uint32(8).int64(t.beginVolume),
                            null != t.beginTurnover && Object.hasOwnProperty.call(t, "beginTurnover") && e.uint32(17).double(t.beginTurnover),
                            null != t.tradeUnit && Object.hasOwnProperty.call(t, "tradeUnit") && e.uint32(25).double(t.tradeUnit),
                            null != t.priorno && Object.hasOwnProperty.call(t, "priorno") && e.uint32(33).fixed64(t.priorno),
                            null != t.tradeDay && Object.hasOwnProperty.call(t, "tradeDay") && e.uint32(66).string(t.tradeDay),
                            null != t.updateTime && Object.hasOwnProperty.call(t, "updateTime") && e.uint32(74).string(t.updateTime),
                            null != t.updateMs && Object.hasOwnProperty.call(t, "updateMs") && e.uint32(80).int32(t.updateMs),
                            null != t.actionDay && Object.hasOwnProperty.call(t, "actionDay") && e.uint32(90).string(t.actionDay),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.ServerInnerField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.beginVolume = t.int64();
                                    break;
                                case 2:
                                    i.beginTurnover = t.double();
                                    break;
                                case 3:
                                    i.tradeUnit = t.double();
                                    break;
                                case 4:
                                    i.priorno = t.fixed64();
                                    break;
                                case 8:
                                    i.tradeDay = t.string();
                                    break;
                                case 9:
                                    i.updateTime = t.string();
                                    break;
                                case 10:
                                    i.updateMs = t.int32();
                                    break;
                                case 11:
                                    i.actionDay = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null == t.beginVolume || !t.hasOwnProperty("beginVolume") || A.isInteger(t.beginVolume) || t.beginVolume && A.isInteger(t.beginVolume.low) && A.isInteger(t.beginVolume.high) ? null != t.beginTurnover && t.hasOwnProperty("beginTurnover") && "number" !== typeof t.beginTurnover ? "beginTurnover: number expected" : null != t.tradeUnit && t.hasOwnProperty("tradeUnit") && "number" !== typeof t.tradeUnit ? "tradeUnit: number expected" : null == t.priorno || !t.hasOwnProperty("priorno") || A.isInteger(t.priorno) || t.priorno && A.isInteger(t.priorno.low) && A.isInteger(t.priorno.high) ? null != t.tradeDay && t.hasOwnProperty("tradeDay") && !A.isString(t.tradeDay) ? "tradeDay: string expected" : null != t.updateTime && t.hasOwnProperty("updateTime") && !A.isString(t.updateTime) ? "updateTime: string expected" : null != t.updateMs && t.hasOwnProperty("updateMs") && !A.isInteger(t.updateMs) ? "updateMs: integer expected" : null != t.actionDay && t.hasOwnProperty("actionDay") && !A.isString(t.actionDay) ? "actionDay: string expected" : null : "priorno: integer|Long expected" : "beginVolume: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.ServerInnerField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.ServerInnerField;
                            return null != t.beginVolume && (A.Long ? (e.beginVolume = A.Long.fromValue(t.beginVolume)).unsigned = !1 : "string" === typeof t.beginVolume ? e.beginVolume = parseInt(t.beginVolume, 10) : "number" === typeof t.beginVolume ? e.beginVolume = t.beginVolume : "object" === typeof t.beginVolume && (e.beginVolume = new A.LongBits(t.beginVolume.low >>> 0,t.beginVolume.high >>> 0).toNumber())),
                            null != t.beginTurnover && (e.beginTurnover = Number(t.beginTurnover)),
                            null != t.tradeUnit && (e.tradeUnit = Number(t.tradeUnit)),
                            null != t.priorno && (A.Long ? (e.priorno = A.Long.fromValue(t.priorno)).unsigned = !1 : "string" === typeof t.priorno ? e.priorno = parseInt(t.priorno, 10) : "number" === typeof t.priorno ? e.priorno = t.priorno : "object" === typeof t.priorno && (e.priorno = new A.LongBits(t.priorno.low >>> 0,t.priorno.high >>> 0).toNumber())),
                            null != t.tradeDay && (e.tradeDay = String(t.tradeDay)),
                            null != t.updateTime && (e.updateTime = String(t.updateTime)),
                            null != t.updateMs && (e.updateMs = 0 | t.updateMs),
                            null != t.actionDay && (e.actionDay = String(t.actionDay)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.beginVolume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.beginVolume = e.longs === String ? "0" : 0;
                                if (a.beginTurnover = 0,
                                a.tradeUnit = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.priorno = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.priorno = e.longs === String ? "0" : 0;
                                a.tradeDay = "",
                                a.updateTime = "",
                                a.updateMs = 0,
                                a.actionDay = ""
                            }
                            return null != t.beginVolume && t.hasOwnProperty("beginVolume") && ("number" === typeof t.beginVolume ? a.beginVolume = e.longs === String ? String(t.beginVolume) : t.beginVolume : a.beginVolume = e.longs === String ? A.Long.prototype.toString.call(t.beginVolume) : e.longs === Number ? new A.LongBits(t.beginVolume.low >>> 0,t.beginVolume.high >>> 0).toNumber() : t.beginVolume),
                            null != t.beginTurnover && t.hasOwnProperty("beginTurnover") && (a.beginTurnover = e.json && !isFinite(t.beginTurnover) ? String(t.beginTurnover) : t.beginTurnover),
                            null != t.tradeUnit && t.hasOwnProperty("tradeUnit") && (a.tradeUnit = e.json && !isFinite(t.tradeUnit) ? String(t.tradeUnit) : t.tradeUnit),
                            null != t.priorno && t.hasOwnProperty("priorno") && ("number" === typeof t.priorno ? a.priorno = e.longs === String ? String(t.priorno) : t.priorno : a.priorno = e.longs === String ? A.Long.prototype.toString.call(t.priorno) : e.longs === Number ? new A.LongBits(t.priorno.low >>> 0,t.priorno.high >>> 0).toNumber() : t.priorno),
                            null != t.tradeDay && t.hasOwnProperty("tradeDay") && (a.tradeDay = t.tradeDay),
                            null != t.updateTime && t.hasOwnProperty("updateTime") && (a.updateTime = t.updateTime),
                            null != t.updateMs && t.hasOwnProperty("updateMs") && (a.updateMs = t.updateMs),
                            null != t.actionDay && t.hasOwnProperty("actionDay") && (a.actionDay = t.actionDay),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuotationField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.code = "",
                        t.prototype.freq = 0,
                        t.prototype.quoteTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.volume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.freqTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.turnOver = 0,
                        t.prototype.rt = null,
                        t.prototype.open = 0,
                        t.prototype.high = 0,
                        t.prototype.low = 0,
                        t.prototype.close = 0,
                        t.prototype.posi = 0,
                        t.prototype.preClose = 0,
                        t.prototype.settle = 0,
                        t.prototype.extra = null,
                        t.prototype.inner = null,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.code && Object.hasOwnProperty.call(t, "code") && e.uint32(10).string(t.code),
                            null != t.freq && Object.hasOwnProperty.call(t, "freq") && e.uint32(16).int32(t.freq),
                            null != t.quoteTime && Object.hasOwnProperty.call(t, "quoteTime") && e.uint32(25).fixed64(t.quoteTime),
                            null != t.volume && Object.hasOwnProperty.call(t, "volume") && e.uint32(32).int64(t.volume),
                            null != t.freqTime && Object.hasOwnProperty.call(t, "freqTime") && e.uint32(40).int64(t.freqTime),
                            null != t.turnOver && Object.hasOwnProperty.call(t, "turnOver") && e.uint32(49).double(t.turnOver),
                            null != t.rt && Object.hasOwnProperty.call(t, "rt") && O.jadegold.msg.quotation.pbv2.RealtimeField.encode(t.rt, e.uint32(58).fork()).ldelim(),
                            null != t.open && Object.hasOwnProperty.call(t, "open") && e.uint32(65).double(t.open),
                            null != t.high && Object.hasOwnProperty.call(t, "high") && e.uint32(73).double(t.high),
                            null != t.low && Object.hasOwnProperty.call(t, "low") && e.uint32(81).double(t.low),
                            null != t.close && Object.hasOwnProperty.call(t, "close") && e.uint32(89).double(t.close),
                            null != t.posi && Object.hasOwnProperty.call(t, "posi") && e.uint32(97).double(t.posi),
                            null != t.preClose && Object.hasOwnProperty.call(t, "preClose") && e.uint32(105).double(t.preClose),
                            null != t.settle && Object.hasOwnProperty.call(t, "settle") && e.uint32(113).double(t.settle),
                            null != t.extra && Object.hasOwnProperty.call(t, "extra") && O.jadegold.msg.quotation.pbv2.ExtraField.encode(t.extra, e.uint32(122).fork()).ldelim(),
                            null != t.inner && Object.hasOwnProperty.call(t, "inner") && O.jadegold.msg.quotation.pbv2.ServerInnerField.encode(t.inner, e.uint32(1026).fork()).ldelim(),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.code = t.string();
                                    break;
                                case 2:
                                    i.freq = t.int32();
                                    break;
                                case 3:
                                    i.quoteTime = t.fixed64();
                                    break;
                                case 4:
                                    i.volume = t.int64();
                                    break;
                                case 5:
                                    i.freqTime = t.int64();
                                    break;
                                case 6:
                                    i.turnOver = t.double();
                                    break;
                                case 7:
                                    i.rt = O.jadegold.msg.quotation.pbv2.RealtimeField.decode(t, t.uint32());
                                    break;
                                case 8:
                                    i.open = t.double();
                                    break;
                                case 9:
                                    i.high = t.double();
                                    break;
                                case 10:
                                    i.low = t.double();
                                    break;
                                case 11:
                                    i.close = t.double();
                                    break;
                                case 12:
                                    i.posi = t.double();
                                    break;
                                case 13:
                                    i.preClose = t.double();
                                    break;
                                case 14:
                                    i.settle = t.double();
                                    break;
                                case 15:
                                    i.extra = O.jadegold.msg.quotation.pbv2.ExtraField.decode(t, t.uint32());
                                    break;
                                case 128:
                                    i.inner = O.jadegold.msg.quotation.pbv2.ServerInnerField.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.code && t.hasOwnProperty("code") && !A.isString(t.code))
                                return "code: string expected";
                            if (null != t.freq && t.hasOwnProperty("freq"))
                                switch (t.freq) {
                                default:
                                    return "freq: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                case 10:
                                case 11:
                                case 12:
                                    break
                                }
                            if (null != t.quoteTime && t.hasOwnProperty("quoteTime") && !A.isInteger(t.quoteTime) && !(t.quoteTime && A.isInteger(t.quoteTime.low) && A.isInteger(t.quoteTime.high)))
                                return "quoteTime: integer|Long expected";
                            if (null != t.volume && t.hasOwnProperty("volume") && !A.isInteger(t.volume) && !(t.volume && A.isInteger(t.volume.low) && A.isInteger(t.volume.high)))
                                return "volume: integer|Long expected";
                            if (null != t.freqTime && t.hasOwnProperty("freqTime") && !A.isInteger(t.freqTime) && !(t.freqTime && A.isInteger(t.freqTime.low) && A.isInteger(t.freqTime.high)))
                                return "freqTime: integer|Long expected";
                            if (null != t.turnOver && t.hasOwnProperty("turnOver") && "number" !== typeof t.turnOver)
                                return "turnOver: number expected";
                            if (null != t.rt && t.hasOwnProperty("rt")) {
                                let e = O.jadegold.msg.quotation.pbv2.RealtimeField.verify(t.rt);
                                if (e)
                                    return "rt." + e
                            }
                            if (null != t.open && t.hasOwnProperty("open") && "number" !== typeof t.open)
                                return "open: number expected";
                            if (null != t.high && t.hasOwnProperty("high") && "number" !== typeof t.high)
                                return "high: number expected";
                            if (null != t.low && t.hasOwnProperty("low") && "number" !== typeof t.low)
                                return "low: number expected";
                            if (null != t.close && t.hasOwnProperty("close") && "number" !== typeof t.close)
                                return "close: number expected";
                            if (null != t.posi && t.hasOwnProperty("posi") && "number" !== typeof t.posi)
                                return "posi: number expected";
                            if (null != t.preClose && t.hasOwnProperty("preClose") && "number" !== typeof t.preClose)
                                return "preClose: number expected";
                            if (null != t.settle && t.hasOwnProperty("settle") && "number" !== typeof t.settle)
                                return "settle: number expected";
                            if (null != t.extra && t.hasOwnProperty("extra")) {
                                let e = O.jadegold.msg.quotation.pbv2.ExtraField.verify(t.extra);
                                if (e)
                                    return "extra." + e
                            }
                            if (null != t.inner && t.hasOwnProperty("inner")) {
                                let e = O.jadegold.msg.quotation.pbv2.ServerInnerField.verify(t.inner);
                                if (e)
                                    return "inner." + e
                            }
                            return null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationField;
                            switch (null != t.code && (e.code = String(t.code)),
                            t.freq) {
                            case "REALTIME":
                            case 0:
                                e.freq = 0;
                                break;
                            case "INFO":
                            case 1:
                                e.freq = 1;
                                break;
                            case "TICK":
                            case 2:
                                e.freq = 2;
                                break;
                            case "MIN1":
                            case 3:
                                e.freq = 3;
                                break;
                            case "MIN5":
                            case 4:
                                e.freq = 4;
                                break;
                            case "MIN15":
                            case 5:
                                e.freq = 5;
                                break;
                            case "MIN30":
                            case 6:
                                e.freq = 6;
                                break;
                            case "MIN60":
                            case 7:
                                e.freq = 7;
                                break;
                            case "MIN120":
                            case 8:
                                e.freq = 8;
                                break;
                            case "MIN240":
                            case 9:
                                e.freq = 9;
                                break;
                            case "DAY1":
                            case 10:
                                e.freq = 10;
                                break;
                            case "WEEK1":
                            case 11:
                                e.freq = 11;
                                break;
                            case "MONTH1":
                            case 12:
                                e.freq = 12;
                                break
                            }
                            if (null != t.quoteTime && (A.Long ? (e.quoteTime = A.Long.fromValue(t.quoteTime)).unsigned = !1 : "string" === typeof t.quoteTime ? e.quoteTime = parseInt(t.quoteTime, 10) : "number" === typeof t.quoteTime ? e.quoteTime = t.quoteTime : "object" === typeof t.quoteTime && (e.quoteTime = new A.LongBits(t.quoteTime.low >>> 0,t.quoteTime.high >>> 0).toNumber())),
                            null != t.volume && (A.Long ? (e.volume = A.Long.fromValue(t.volume)).unsigned = !1 : "string" === typeof t.volume ? e.volume = parseInt(t.volume, 10) : "number" === typeof t.volume ? e.volume = t.volume : "object" === typeof t.volume && (e.volume = new A.LongBits(t.volume.low >>> 0,t.volume.high >>> 0).toNumber())),
                            null != t.freqTime && (A.Long ? (e.freqTime = A.Long.fromValue(t.freqTime)).unsigned = !1 : "string" === typeof t.freqTime ? e.freqTime = parseInt(t.freqTime, 10) : "number" === typeof t.freqTime ? e.freqTime = t.freqTime : "object" === typeof t.freqTime && (e.freqTime = new A.LongBits(t.freqTime.low >>> 0,t.freqTime.high >>> 0).toNumber())),
                            null != t.turnOver && (e.turnOver = Number(t.turnOver)),
                            null != t.rt) {
                                if ("object" !== typeof t.rt)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationField.rt: object expected");
                                e.rt = O.jadegold.msg.quotation.pbv2.RealtimeField.fromObject(t.rt)
                            }
                            if (null != t.open && (e.open = Number(t.open)),
                            null != t.high && (e.high = Number(t.high)),
                            null != t.low && (e.low = Number(t.low)),
                            null != t.close && (e.close = Number(t.close)),
                            null != t.posi && (e.posi = Number(t.posi)),
                            null != t.preClose && (e.preClose = Number(t.preClose)),
                            null != t.settle && (e.settle = Number(t.settle)),
                            null != t.extra) {
                                if ("object" !== typeof t.extra)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationField.extra: object expected");
                                e.extra = O.jadegold.msg.quotation.pbv2.ExtraField.fromObject(t.extra)
                            }
                            if (null != t.inner) {
                                if ("object" !== typeof t.inner)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationField.inner: object expected");
                                e.inner = O.jadegold.msg.quotation.pbv2.ServerInnerField.fromObject(t.inner)
                            }
                            return e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (a.code = "",
                                a.freq = e.enums === String ? "REALTIME" : 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.quoteTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.quoteTime = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.volume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.volume = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.freqTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.freqTime = e.longs === String ? "0" : 0;
                                a.turnOver = 0,
                                a.rt = null,
                                a.open = 0,
                                a.high = 0,
                                a.low = 0,
                                a.close = 0,
                                a.posi = 0,
                                a.preClose = 0,
                                a.settle = 0,
                                a.extra = null,
                                a.inner = null
                            }
                            return null != t.code && t.hasOwnProperty("code") && (a.code = t.code),
                            null != t.freq && t.hasOwnProperty("freq") && (a.freq = e.enums === String ? O.jadegold.msg.quotation.pbv2.QuotationFreq[t.freq] : t.freq),
                            null != t.quoteTime && t.hasOwnProperty("quoteTime") && ("number" === typeof t.quoteTime ? a.quoteTime = e.longs === String ? String(t.quoteTime) : t.quoteTime : a.quoteTime = e.longs === String ? A.Long.prototype.toString.call(t.quoteTime) : e.longs === Number ? new A.LongBits(t.quoteTime.low >>> 0,t.quoteTime.high >>> 0).toNumber() : t.quoteTime),
                            null != t.volume && t.hasOwnProperty("volume") && ("number" === typeof t.volume ? a.volume = e.longs === String ? String(t.volume) : t.volume : a.volume = e.longs === String ? A.Long.prototype.toString.call(t.volume) : e.longs === Number ? new A.LongBits(t.volume.low >>> 0,t.volume.high >>> 0).toNumber() : t.volume),
                            null != t.freqTime && t.hasOwnProperty("freqTime") && ("number" === typeof t.freqTime ? a.freqTime = e.longs === String ? String(t.freqTime) : t.freqTime : a.freqTime = e.longs === String ? A.Long.prototype.toString.call(t.freqTime) : e.longs === Number ? new A.LongBits(t.freqTime.low >>> 0,t.freqTime.high >>> 0).toNumber() : t.freqTime),
                            null != t.turnOver && t.hasOwnProperty("turnOver") && (a.turnOver = e.json && !isFinite(t.turnOver) ? String(t.turnOver) : t.turnOver),
                            null != t.rt && t.hasOwnProperty("rt") && (a.rt = O.jadegold.msg.quotation.pbv2.RealtimeField.toObject(t.rt, e)),
                            null != t.open && t.hasOwnProperty("open") && (a.open = e.json && !isFinite(t.open) ? String(t.open) : t.open),
                            null != t.high && t.hasOwnProperty("high") && (a.high = e.json && !isFinite(t.high) ? String(t.high) : t.high),
                            null != t.low && t.hasOwnProperty("low") && (a.low = e.json && !isFinite(t.low) ? String(t.low) : t.low),
                            null != t.close && t.hasOwnProperty("close") && (a.close = e.json && !isFinite(t.close) ? String(t.close) : t.close),
                            null != t.posi && t.hasOwnProperty("posi") && (a.posi = e.json && !isFinite(t.posi) ? String(t.posi) : t.posi),
                            null != t.preClose && t.hasOwnProperty("preClose") && (a.preClose = e.json && !isFinite(t.preClose) ? String(t.preClose) : t.preClose),
                            null != t.settle && t.hasOwnProperty("settle") && (a.settle = e.json && !isFinite(t.settle) ? String(t.settle) : t.settle),
                            null != t.extra && t.hasOwnProperty("extra") && (a.extra = O.jadegold.msg.quotation.pbv2.ExtraField.toObject(t.extra, e)),
                            null != t.inner && t.hasOwnProperty("inner") && (a.inner = O.jadegold.msg.quotation.pbv2.ServerInnerField.toObject(t.inner, e)),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.GoldDeliveryField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.date = "",
                        t.prototype.direction = "",
                        t.prototype.buy = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.sell = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.midBuy = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.midSell = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.date && Object.hasOwnProperty.call(t, "date") && e.uint32(10).string(t.date),
                            null != t.direction && Object.hasOwnProperty.call(t, "direction") && e.uint32(18).string(t.direction),
                            null != t.buy && Object.hasOwnProperty.call(t, "buy") && e.uint32(24).int64(t.buy),
                            null != t.sell && Object.hasOwnProperty.call(t, "sell") && e.uint32(32).int64(t.sell),
                            null != t.midBuy && Object.hasOwnProperty.call(t, "midBuy") && e.uint32(40).int64(t.midBuy),
                            null != t.midSell && Object.hasOwnProperty.call(t, "midSell") && e.uint32(48).int64(t.midSell),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.GoldDeliveryField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.date = t.string();
                                    break;
                                case 2:
                                    i.direction = t.string();
                                    break;
                                case 3:
                                    i.buy = t.int64();
                                    break;
                                case 4:
                                    i.sell = t.int64();
                                    break;
                                case 5:
                                    i.midBuy = t.int64();
                                    break;
                                case 6:
                                    i.midSell = t.int64();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.date && t.hasOwnProperty("date") && !A.isString(t.date) ? "date: string expected" : null != t.direction && t.hasOwnProperty("direction") && !A.isString(t.direction) ? "direction: string expected" : null == t.buy || !t.hasOwnProperty("buy") || A.isInteger(t.buy) || t.buy && A.isInteger(t.buy.low) && A.isInteger(t.buy.high) ? null == t.sell || !t.hasOwnProperty("sell") || A.isInteger(t.sell) || t.sell && A.isInteger(t.sell.low) && A.isInteger(t.sell.high) ? null == t.midBuy || !t.hasOwnProperty("midBuy") || A.isInteger(t.midBuy) || t.midBuy && A.isInteger(t.midBuy.low) && A.isInteger(t.midBuy.high) ? null == t.midSell || !t.hasOwnProperty("midSell") || A.isInteger(t.midSell) || t.midSell && A.isInteger(t.midSell.low) && A.isInteger(t.midSell.high) ? null : "midSell: integer|Long expected" : "midBuy: integer|Long expected" : "sell: integer|Long expected" : "buy: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.GoldDeliveryField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.GoldDeliveryField;
                            return null != t.date && (e.date = String(t.date)),
                            null != t.direction && (e.direction = String(t.direction)),
                            null != t.buy && (A.Long ? (e.buy = A.Long.fromValue(t.buy)).unsigned = !1 : "string" === typeof t.buy ? e.buy = parseInt(t.buy, 10) : "number" === typeof t.buy ? e.buy = t.buy : "object" === typeof t.buy && (e.buy = new A.LongBits(t.buy.low >>> 0,t.buy.high >>> 0).toNumber())),
                            null != t.sell && (A.Long ? (e.sell = A.Long.fromValue(t.sell)).unsigned = !1 : "string" === typeof t.sell ? e.sell = parseInt(t.sell, 10) : "number" === typeof t.sell ? e.sell = t.sell : "object" === typeof t.sell && (e.sell = new A.LongBits(t.sell.low >>> 0,t.sell.high >>> 0).toNumber())),
                            null != t.midBuy && (A.Long ? (e.midBuy = A.Long.fromValue(t.midBuy)).unsigned = !1 : "string" === typeof t.midBuy ? e.midBuy = parseInt(t.midBuy, 10) : "number" === typeof t.midBuy ? e.midBuy = t.midBuy : "object" === typeof t.midBuy && (e.midBuy = new A.LongBits(t.midBuy.low >>> 0,t.midBuy.high >>> 0).toNumber())),
                            null != t.midSell && (A.Long ? (e.midSell = A.Long.fromValue(t.midSell)).unsigned = !1 : "string" === typeof t.midSell ? e.midSell = parseInt(t.midSell, 10) : "number" === typeof t.midSell ? e.midSell = t.midSell : "object" === typeof t.midSell && (e.midSell = new A.LongBits(t.midSell.low >>> 0,t.midSell.high >>> 0).toNumber())),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (a.date = "",
                                a.direction = "",
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.buy = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.buy = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.sell = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.sell = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.midBuy = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.midBuy = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.midSell = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.midSell = e.longs === String ? "0" : 0
                            }
                            return null != t.date && t.hasOwnProperty("date") && (a.date = t.date),
                            null != t.direction && t.hasOwnProperty("direction") && (a.direction = t.direction),
                            null != t.buy && t.hasOwnProperty("buy") && ("number" === typeof t.buy ? a.buy = e.longs === String ? String(t.buy) : t.buy : a.buy = e.longs === String ? A.Long.prototype.toString.call(t.buy) : e.longs === Number ? new A.LongBits(t.buy.low >>> 0,t.buy.high >>> 0).toNumber() : t.buy),
                            null != t.sell && t.hasOwnProperty("sell") && ("number" === typeof t.sell ? a.sell = e.longs === String ? String(t.sell) : t.sell : a.sell = e.longs === String ? A.Long.prototype.toString.call(t.sell) : e.longs === Number ? new A.LongBits(t.sell.low >>> 0,t.sell.high >>> 0).toNumber() : t.sell),
                            null != t.midBuy && t.hasOwnProperty("midBuy") && ("number" === typeof t.midBuy ? a.midBuy = e.longs === String ? String(t.midBuy) : t.midBuy : a.midBuy = e.longs === String ? A.Long.prototype.toString.call(t.midBuy) : e.longs === Number ? new A.LongBits(t.midBuy.low >>> 0,t.midBuy.high >>> 0).toNumber() : t.midBuy),
                            null != t.midSell && t.hasOwnProperty("midSell") && ("number" === typeof t.midSell ? a.midSell = e.longs === String ? String(t.midSell) : t.midSell : a.midSell = e.longs === String ? A.Long.prototype.toString.call(t.midSell) : e.longs === Number ? new A.LongBits(t.midSell.low >>> 0,t.midSell.high >>> 0).toNumber() : t.midSell),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t
                }(),
                t
            }(),
            t
        }(),
        t
    }
    )();
    /*'{"msgid":32,"seq":0,"request":{"auth":{"apptype":"nhwebquo","token":new Uint8Array([58, 218, 114, 202, 157, 116, 222, 214, 236, 3, 231, 135, 212, 193, 194, 108, 232, 12, 187, 173, 103, 219, 118, 115, 41, 120, 121, 10, 93, 179, 186, 251])}},"jsonReq":null}'*/
/*
{
            "auth": {
                "apptype": "nhwebquo",
                "token": token()
            }
        }
		*/
    let {QuoteMsgID: Y, QuotationFreq: X, QuotationMsg: _} = O.jadegold.msg.quotation.pbv2;
    //解构

	if (msgid == 66) {
    var s = {
        "msgid": msgid,
        "seq": seq,
        "jsonReq": "{}"
    };
} else if (msgid == 64) {
    var s = {
        "msgid": msgid,
        "seq": seq,
        "jsonReq": "{}"
    };
} else if (msgid == 32) {
    var s = {
        "msgid": msgid,
        "seq": seq,
        "request": {
            "auth": {
                "apptype": "nhwebquo",
                "token": token()
            }
        },
        "jsonReq": null
    };
} else if (msgid == 18) {
    var s = {
        "msgid": msgid,
        "seq": 3,
        "request": {
            "codes": ["NHAI","NHCI","NHECI","NHFI","NHII","NHMI","NHNFI","NHPMI","NHEI","NHPCI","NHCCI","NHFMI","NHBMI","NHOOI","NHAECI","NHCIMi","TA_NH","M_NH","RB_NH","MA_NH","SA_NH","AG_NH","V_NH","P_NH","FU_NH","I_NH","FG_NH","RM_NH","BU_NH","Y_NH","PP_NH","CF_NH","EG_NH","C_NH","L_NH","OI_NH","HC_NH","SR_NH","SF_NH","EB_NH","RU_NH","PF_NH","SC_NH","LU_NH","SM_NH","NI_NH","AL_NH","SP_NH","CS_NH","UR_NH","ZN_NH","AP_NH","A_NH","CU_NH","AU_NH","SN_NH","PG_NH","SS_NH","JD_NH","PK_NH","B_NH","NR_NH","JM_NH","PB_NH","LH_NH","J_NH","BC_NH","CJ_NH","RR_NH","CY_NH","FB_NH","WR_NH","RS_NH","BB_NH","JR_NH","LR_NH","RI_NH","WH_NH","ZC_NH"],
            "freq": [0]
        },
        "jsonReq": null
    };
} else if (msgid == 16) {
    var s = {
        "msgid": msgid,
        "seq": seq,
		"request" :{},
        "jsonReq": null
    };
}

    var h = _.create(s);
    var l = _.encode(h).finish();
	
    return l
}
function token(time) {
    var P = window.guan_(1184)
      , R = window.guan_(7168)
      , B = window.guan_.n(R);

    t = new (B())("6eZYTeUf4{A3ZyG>",B().MODE.CBC,B().PADDING.PKCS5);
    t.setIv("4W!?EEPb");
    e = t.encode(`${"funbird"}${"nhwebquo"}${Date.now()}`);
    return e
}
function decode(tt){
	    var M = window.guan_(3504);
    const E = M.Reader
      , w = M.Writer
      , A = M.util
      , O = M.roots["default"] || (M.roots["default"] = {});
    O.jadegold = (()=>{

        const t = {};
        return t.msg = function() {
            const t = {};
            return t.quotation = function() {
                const t = {};
                return t.pbv2 = function() {
                    const t = {};
                    return t.QuoteMsgID = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "quotation_broadcast"] = 0,
                        e[t[1] = "status_broadcast"] = 1,
                        e[t[16] = "heart_beat"] = 16,
                        e[t[18] = "latestQuotation"] = 18,
                        e[t[20] = "qryQuotation"] = 20,
                        e[t[24] = "unsubscribe"] = 24,
                        e[t[28] = "qry_status"] = 28,
                        e[t[30] = "qry_gold_delivery"] = 30,
                        e[t[32] = "auth"] = 32,
                        e[t[34] = "waring"] = 34,
                        e[t[36] = "qry_waring"] = 36,
                        e[t[64] = "codes_category_json"] = 64,
                        e[t[66] = "codes_info_json"] = 66,
                        e[t[68] = "codes_f10_json"] = 68,
                        e[t[70] = "qry_all_settle"] = 70,
                        e[t[80] = "qry_option_info"] = 80,
                        e[t[82] = "qry_cbond_yield"] = 82,
                        e
                    }(),
                    t.QuotationMsg = function() {
                        function t(t) {
                            if (this.response = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.msgid = 0,
                        t.prototype.seq = 0,
                        t.prototype.request = null,
                        t.prototype.response = A.emptyArray,
                        t.prototype.jsonReq = "",
                        t.prototype.jsonResp = "",
                        t.prototype.errMsg = "",
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.msgid && Object.hasOwnProperty.call(t, "msgid") && e.uint32(8).int32(t.msgid),
                            null != t.seq && Object.hasOwnProperty.call(t, "seq") && e.uint32(16).sint32(t.seq),
                            null != t.request && Object.hasOwnProperty.call(t, "request") && O.jadegold.msg.quotation.pbv2.QuotationRequest.encode(t.request, e.uint32(34).fork()).ldelim(),
                            null != t.response && t.response.length)
                                for (let a = 0; a < t.response.length; ++a)
                                    O.jadegold.msg.quotation.pbv2.QuotationResponse.encode(t.response[a], e.uint32(42).fork()).ldelim();
                            return null != t.jsonReq && Object.hasOwnProperty.call(t, "jsonReq") && e.uint32(66).string(t.jsonReq),
                            null != t.jsonResp && Object.hasOwnProperty.call(t, "jsonResp") && e.uint32(74).string(t.jsonResp),
                            null != t.errMsg && Object.hasOwnProperty.call(t, "errMsg") && e.uint32(138).string(t.errMsg),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationMsg;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.msgid = t.int32();
                                    break;
                                case 2:
                                    i.seq = t.sint32();
                                    break;
                                case 4:
                                    i.request = O.jadegold.msg.quotation.pbv2.QuotationRequest.decode(t, t.uint32());
                                    break;
                                case 5:
                                    i.response && i.response.length || (i.response = []),
                                    i.response.push(O.jadegold.msg.quotation.pbv2.QuotationResponse.decode(t, t.uint32()));
                                    break;
                                case 8:
                                    i.jsonReq = t.string();
                                    break;
                                case 9:
                                    i.jsonResp = t.string();
                                    break;
                                case 17:
                                    i.errMsg = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.msgid && t.hasOwnProperty("msgid"))
                                switch (t.msgid) {
                                default:
                                    return "msgid: enum value expected";
                                case 0:
                                case 1:
                                case 16:
                                case 18:
                                case 20:
                                case 24:
                                case 28:
                                case 30:
                                case 32:
                                case 34:
                                case 36:
                                case 64:
                                case 66:
                                case 68:
                                case 70:
                                case 80:
                                case 82:
                                    break
                                }
                            if (null != t.seq && t.hasOwnProperty("seq") && !A.isInteger(t.seq))
                                return "seq: integer expected";
                            if (null != t.request && t.hasOwnProperty("request")) {
                                let e = O.jadegold.msg.quotation.pbv2.QuotationRequest.verify(t.request);
                                if (e)
                                    return "request." + e
                            }
                            if (null != t.response && t.hasOwnProperty("response")) {
                                if (!Array.isArray(t.response))
                                    return "response: array expected";
                                for (let e = 0; e < t.response.length; ++e) {
                                    let a = O.jadegold.msg.quotation.pbv2.QuotationResponse.verify(t.response[e]);
                                    if (a)
                                        return "response." + a
                                }
                            }
                            return null != t.jsonReq && t.hasOwnProperty("jsonReq") && !A.isString(t.jsonReq) ? "jsonReq: string expected" : null != t.jsonResp && t.hasOwnProperty("jsonResp") && !A.isString(t.jsonResp) ? "jsonResp: string expected" : null != t.errMsg && t.hasOwnProperty("errMsg") && !A.isString(t.errMsg) ? "errMsg: string expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationMsg)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationMsg;
                            switch (t.msgid) {
                            case "quotation_broadcast":
                            case 0:
                                e.msgid = 0;
                                break;
                            case "status_broadcast":
                            case 1:
                                e.msgid = 1;
                                break;
                            case "heart_beat":
                            case 16:
                                e.msgid = 16;
                                break;
                            case "latestQuotation":
                            case 18:
                                e.msgid = 18;
                                break;
                            case "qryQuotation":
                            case 20:
                                e.msgid = 20;
                                break;
                            case "unsubscribe":
                            case 24:
                                e.msgid = 24;
                                break;
                            case "qry_status":
                            case 28:
                                e.msgid = 28;
                                break;
                            case "qry_gold_delivery":
                            case 30:
                                e.msgid = 30;
                                break;
                            case "auth":
                            case 32:
                                e.msgid = 32;
                                break;
                            case "waring":
                            case 34:
                                e.msgid = 34;
                                break;
                            case "qry_waring":
                            case 36:
                                e.msgid = 36;
                                break;
                            case "codes_category_json":
                            case 64:
                                e.msgid = 64;
                                break;
                            case "codes_info_json":
                            case 66:
                                e.msgid = 66;
                                break;
                            case "codes_f10_json":
                            case 68:
                                e.msgid = 68;
                                break;
                            case "qry_all_settle":
                            case 70:
                                e.msgid = 70;
                                break;
                            case "qry_option_info":
                            case 80:
                                e.msgid = 80;
                                break;
                            case "qry_cbond_yield":
                            case 82:
                                e.msgid = 82;
                                break
                            }
                            if (null != t.seq && (e.seq = 0 | t.seq),
                            null != t.request) {
                                if ("object" !== typeof t.request)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationMsg.request: object expected");
                                e.request = O.jadegold.msg.quotation.pbv2.QuotationRequest.fromObject(t.request)
                            }
                            if (t.response) {
                                if (!Array.isArray(t.response))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationMsg.response: array expected");
                                e.response = [];
                                for (let a = 0; a < t.response.length; ++a) {
                                    if ("object" !== typeof t.response[a])
                                        throw TypeError(".jadegold.msg.quotation.pbv2.QuotationMsg.response: object expected");
                                    e.response[a] = O.jadegold.msg.quotation.pbv2.QuotationResponse.fromObject(t.response[a])
                                }
                            }
                            return null != t.jsonReq && (e.jsonReq = String(t.jsonReq)),
                            null != t.jsonResp && (e.jsonResp = String(t.jsonResp)),
                            null != t.errMsg && (e.errMsg = String(t.errMsg)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.response = []),
                            e.defaults && (a.msgid = e.enums === String ? "quotation_broadcast" : 0,
                            a.seq = 0,
                            a.request = null,
                            a.jsonReq = "",
                            a.jsonResp = "",
                            a.errMsg = ""),
                            null != t.msgid && t.hasOwnProperty("msgid") && (a.msgid = e.enums === String ? O.jadegold.msg.quotation.pbv2.QuoteMsgID[t.msgid] : t.msgid),
                            null != t.seq && t.hasOwnProperty("seq") && (a.seq = t.seq),
                            null != t.request && t.hasOwnProperty("request") && (a.request = O.jadegold.msg.quotation.pbv2.QuotationRequest.toObject(t.request, e)),
                            t.response && t.response.length) {
                                a.response = [];
                                for (let i = 0; i < t.response.length; ++i)
                                    a.response[i] = O.jadegold.msg.quotation.pbv2.QuotationResponse.toObject(t.response[i], e)
                            }
                            return null != t.jsonReq && t.hasOwnProperty("jsonReq") && (a.jsonReq = t.jsonReq),
                            null != t.jsonResp && t.hasOwnProperty("jsonResp") && (a.jsonResp = t.jsonResp),
                            null != t.errMsg && t.hasOwnProperty("errMsg") && (a.errMsg = t.errMsg),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.SubscribeFlag = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "SUBSCRIBE"] = 0,
                        e[t[1] = "KEEP"] = 1,
                        e
                    }(),
                    t.QuotationRequest = function() {
                        function t(t) {
                            if (this.codes = [],
                            this.freq = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.codes = A.emptyArray,
                        t.prototype.freq = A.emptyArray,
                        t.prototype.queryCondition = null,
                        t.prototype.subscribeFlag = 0,
                        t.prototype.auth = null,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.codes && t.codes.length)
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.uint32(10).string(t.codes[a]);
                            if (null != t.freq && t.freq.length) {
                                e.uint32(18).fork();
                                for (let a = 0; a < t.freq.length; ++a)
                                    e.int32(t.freq[a]);
                                e.ldelim()
                            }
                            return null != t.queryCondition && Object.hasOwnProperty.call(t, "queryCondition") && O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.encode(t.queryCondition, e.uint32(26).fork()).ldelim(),
                            null != t.subscribeFlag && Object.hasOwnProperty.call(t, "subscribeFlag") && e.uint32(32).int32(t.subscribeFlag),
                            null != t.auth && Object.hasOwnProperty.call(t, "auth") && O.jadegold.msg.quotation.pbv2.AuthReq.encode(t.auth, e.uint32(42).fork()).ldelim(),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationRequest;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.codes && i.codes.length || (i.codes = []),
                                    i.codes.push(t.string());
                                    break;
                                case 2:
                                    if (i.freq && i.freq.length || (i.freq = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.freq.push(t.int32())
                                    } else
                                        i.freq.push(t.int32());
                                    break;
                                case 3:
                                    i.queryCondition = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.decode(t, t.uint32());
                                    break;
                                case 4:
                                    i.subscribeFlag = t.int32();
                                    break;
                                case 5:
                                    i.auth = O.jadegold.msg.quotation.pbv2.AuthReq.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.codes && t.hasOwnProperty("codes")) {
                                if (!Array.isArray(t.codes))
                                    return "codes: array expected";
                                for (let e = 0; e < t.codes.length; ++e)
                                    if (!A.isString(t.codes[e]))
                                        return "codes: string[] expected"
                            }
                            if (null != t.freq && t.hasOwnProperty("freq")) {
                                if (!Array.isArray(t.freq))
                                    return "freq: array expected";
                                for (let e = 0; e < t.freq.length; ++e)
                                    switch (t.freq[e]) {
                                    default:
                                        return "freq: enum value[] expected";
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                    case 7:
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 11:
                                    case 12:
                                        break
                                    }
                            }
                            if (null != t.queryCondition && t.hasOwnProperty("queryCondition")) {
                                let e = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.verify(t.queryCondition);
                                if (e)
                                    return "queryCondition." + e
                            }
                            if (null != t.subscribeFlag && t.hasOwnProperty("subscribeFlag") && !A.isInteger(t.subscribeFlag))
                                return "subscribeFlag: integer expected";
                            if (null != t.auth && t.hasOwnProperty("auth")) {
                                let e = O.jadegold.msg.quotation.pbv2.AuthReq.verify(t.auth);
                                if (e)
                                    return "auth." + e
                            }
                            return null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationRequest)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationRequest;
                            if (t.codes) {
                                if (!Array.isArray(t.codes))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.codes: array expected");
                                e.codes = [];
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.codes[a] = String(t.codes[a])
                            }
                            if (t.freq) {
                                if (!Array.isArray(t.freq))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.freq: array expected");
                                e.freq = [];
                                for (let a = 0; a < t.freq.length; ++a)
                                    switch (t.freq[a]) {
                                    default:
                                    case "REALTIME":
                                    case 0:
                                        e.freq[a] = 0;
                                        break;
                                    case "INFO":
                                    case 1:
                                        e.freq[a] = 1;
                                        break;
                                    case "TICK":
                                    case 2:
                                        e.freq[a] = 2;
                                        break;
                                    case "MIN1":
                                    case 3:
                                        e.freq[a] = 3;
                                        break;
                                    case "MIN5":
                                    case 4:
                                        e.freq[a] = 4;
                                        break;
                                    case "MIN15":
                                    case 5:
                                        e.freq[a] = 5;
                                        break;
                                    case "MIN30":
                                    case 6:
                                        e.freq[a] = 6;
                                        break;
                                    case "MIN60":
                                    case 7:
                                        e.freq[a] = 7;
                                        break;
                                    case "MIN120":
                                    case 8:
                                        e.freq[a] = 8;
                                        break;
                                    case "MIN240":
                                    case 9:
                                        e.freq[a] = 9;
                                        break;
                                    case "DAY1":
                                    case 10:
                                        e.freq[a] = 10;
                                        break;
                                    case "WEEK1":
                                    case 11:
                                        e.freq[a] = 11;
                                        break;
                                    case "MONTH1":
                                    case 12:
                                        e.freq[a] = 12;
                                        break
                                    }
                            }
                            if (null != t.queryCondition) {
                                if ("object" !== typeof t.queryCondition)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.queryCondition: object expected");
                                e.queryCondition = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.fromObject(t.queryCondition)
                            }
                            if (null != t.subscribeFlag && (e.subscribeFlag = 0 | t.subscribeFlag),
                            null != t.auth) {
                                if ("object" !== typeof t.auth)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationRequest.auth: object expected");
                                e.auth = O.jadegold.msg.quotation.pbv2.AuthReq.fromObject(t.auth)
                            }
                            return e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.codes = [],
                            a.freq = []),
                            e.defaults && (a.queryCondition = null,
                            a.subscribeFlag = 0,
                            a.auth = null),
                            t.codes && t.codes.length) {
                                a.codes = [];
                                for (let e = 0; e < t.codes.length; ++e)
                                    a.codes[e] = t.codes[e]
                            }
                            if (t.freq && t.freq.length) {
                                a.freq = [];
                                for (let i = 0; i < t.freq.length; ++i)
                                    a.freq[i] = e.enums === String ? O.jadegold.msg.quotation.pbv2.QuotationFreq[t.freq[i]] : t.freq[i]
                            }
                            return null != t.queryCondition && t.hasOwnProperty("queryCondition") && (a.queryCondition = O.jadegold.msg.quotation.pbv2.QuoteQueryCondition.toObject(t.queryCondition, e)),
                            null != t.subscribeFlag && t.hasOwnProperty("subscribeFlag") && (a.subscribeFlag = t.subscribeFlag),
                            null != t.auth && t.hasOwnProperty("auth") && (a.auth = O.jadegold.msg.quotation.pbv2.AuthReq.toObject(t.auth, e)),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuotationResponse = function() {
                        function t(t) {
                            if (this.quotation = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.quotation = A.emptyArray,
                        t.prototype.earliestfreq = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.errCode = 0,
                        t.prototype.auth = null,
                        t.prototype.tradeStatus = null,
                        t.prototype.msg = "",
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.quotation && t.quotation.length)
                                for (let a = 0; a < t.quotation.length; ++a)
                                    O.jadegold.msg.quotation.pbv2.QuotationField.encode(t.quotation[a], e.uint32(10).fork()).ldelim();
                            return null != t.earliestfreq && Object.hasOwnProperty.call(t, "earliestfreq") && e.uint32(16).int64(t.earliestfreq),
                            null != t.errCode && Object.hasOwnProperty.call(t, "errCode") && e.uint32(24).sint32(t.errCode),
                            null != t.auth && Object.hasOwnProperty.call(t, "auth") && O.jadegold.msg.quotation.pbv2.AuthResp.encode(t.auth, e.uint32(42).fork()).ldelim(),
                            null != t.tradeStatus && Object.hasOwnProperty.call(t, "tradeStatus") && O.jadegold.msg.quotation.pbv2.TradeStatusMsg.encode(t.tradeStatus, e.uint32(50).fork()).ldelim(),
                            null != t.msg && Object.hasOwnProperty.call(t, "msg") && e.uint32(130).string(t.msg),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationResponse;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.quotation && i.quotation.length || (i.quotation = []),
                                    i.quotation.push(O.jadegold.msg.quotation.pbv2.QuotationField.decode(t, t.uint32()));
                                    break;
                                case 2:
                                    i.earliestfreq = t.int64();
                                    break;
                                case 3:
                                    i.errCode = t.sint32();
                                    break;
                                case 5:
                                    i.auth = O.jadegold.msg.quotation.pbv2.AuthResp.decode(t, t.uint32());
                                    break;
                                case 6:
                                    i.tradeStatus = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.decode(t, t.uint32());
                                    break;
                                case 16:
                                    i.msg = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.quotation && t.hasOwnProperty("quotation")) {
                                if (!Array.isArray(t.quotation))
                                    return "quotation: array expected";
                                for (let e = 0; e < t.quotation.length; ++e) {
                                    let a = O.jadegold.msg.quotation.pbv2.QuotationField.verify(t.quotation[e]);
                                    if (a)
                                        return "quotation." + a
                                }
                            }
                            if (null != t.earliestfreq && t.hasOwnProperty("earliestfreq") && !A.isInteger(t.earliestfreq) && !(t.earliestfreq && A.isInteger(t.earliestfreq.low) && A.isInteger(t.earliestfreq.high)))
                                return "earliestfreq: integer|Long expected";
                            if (null != t.errCode && t.hasOwnProperty("errCode") && !A.isInteger(t.errCode))
                                return "errCode: integer expected";
                            if (null != t.auth && t.hasOwnProperty("auth")) {
                                let e = O.jadegold.msg.quotation.pbv2.AuthResp.verify(t.auth);
                                if (e)
                                    return "auth." + e
                            }
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus")) {
                                let e = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.verify(t.tradeStatus);
                                if (e)
                                    return "tradeStatus." + e
                            }
                            return null != t.msg && t.hasOwnProperty("msg") && !A.isString(t.msg) ? "msg: string expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationResponse)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationResponse;
                            if (t.quotation) {
                                if (!Array.isArray(t.quotation))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.quotation: array expected");
                                e.quotation = [];
                                for (let a = 0; a < t.quotation.length; ++a) {
                                    if ("object" !== typeof t.quotation[a])
                                        throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.quotation: object expected");
                                    e.quotation[a] = O.jadegold.msg.quotation.pbv2.QuotationField.fromObject(t.quotation[a])
                                }
                            }
                            if (null != t.earliestfreq && (A.Long ? (e.earliestfreq = A.Long.fromValue(t.earliestfreq)).unsigned = !1 : "string" === typeof t.earliestfreq ? e.earliestfreq = parseInt(t.earliestfreq, 10) : "number" === typeof t.earliestfreq ? e.earliestfreq = t.earliestfreq : "object" === typeof t.earliestfreq && (e.earliestfreq = new A.LongBits(t.earliestfreq.low >>> 0,t.earliestfreq.high >>> 0).toNumber())),
                            null != t.errCode && (e.errCode = 0 | t.errCode),
                            null != t.auth) {
                                if ("object" !== typeof t.auth)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.auth: object expected");
                                e.auth = O.jadegold.msg.quotation.pbv2.AuthResp.fromObject(t.auth)
                            }
                            if (null != t.tradeStatus) {
                                if ("object" !== typeof t.tradeStatus)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationResponse.tradeStatus: object expected");
                                e.tradeStatus = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.fromObject(t.tradeStatus)
                            }
                            return null != t.msg && (e.msg = String(t.msg)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.quotation = []),
                            e.defaults) {
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.earliestfreq = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.earliestfreq = e.longs === String ? "0" : 0;
                                a.errCode = 0,
                                a.auth = null,
                                a.tradeStatus = null,
                                a.msg = ""
                            }
                            if (t.quotation && t.quotation.length) {
                                a.quotation = [];
                                for (let i = 0; i < t.quotation.length; ++i)
                                    a.quotation[i] = O.jadegold.msg.quotation.pbv2.QuotationField.toObject(t.quotation[i], e)
                            }
                            return null != t.earliestfreq && t.hasOwnProperty("earliestfreq") && ("number" === typeof t.earliestfreq ? a.earliestfreq = e.longs === String ? String(t.earliestfreq) : t.earliestfreq : a.earliestfreq = e.longs === String ? A.Long.prototype.toString.call(t.earliestfreq) : e.longs === Number ? new A.LongBits(t.earliestfreq.low >>> 0,t.earliestfreq.high >>> 0).toNumber() : t.earliestfreq),
                            null != t.errCode && t.hasOwnProperty("errCode") && (a.errCode = t.errCode),
                            null != t.auth && t.hasOwnProperty("auth") && (a.auth = O.jadegold.msg.quotation.pbv2.AuthResp.toObject(t.auth, e)),
                            null != t.tradeStatus && t.hasOwnProperty("tradeStatus") && (a.tradeStatus = O.jadegold.msg.quotation.pbv2.TradeStatusMsg.toObject(t.tradeStatus, e)),
                            null != t.msg && t.hasOwnProperty("msg") && (a.msg = t.msg),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.TradeStatus = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "INIT"] = 0,
                        e[t[7] = "INIT_FINISH"] = 7,
                        e[t[10] = "OPEN"] = 10,
                        e[t[20] = "CALL_AUCTION"] = 20,
                        e[t[27] = "CALL_AUCTION_FINISH"] = 27,
                        e[t[30] = "TRADING"] = 30,
                        e[t[40] = "PAUSE"] = 40,
                        e[t[50] = "DELIVERY_CALL"] = 50,
                        e[t[60] = "DELIVERY"] = 60,
                        e[t[67] = "DELIVERY_FINISH"] = 67,
                        e[t[70] = "NEUTRAL_WAREHOUSE"] = 70,
                        e[t[99] = "CLOSE"] = 99,
                        e
                    }(),
                    t.TradeStatusMsg = function() {
                        function t(t) {
                            if (this.codes = [],
                            this.commodites = [],
                            this.markets = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.tradeStatus = 0,
                        t.prototype.codes = A.emptyArray,
                        t.prototype.commodites = A.emptyArray,
                        t.prototype.markets = A.emptyArray,
                        t.prototype.quotetime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.tradeStatus && Object.hasOwnProperty.call(t, "tradeStatus") && e.uint32(8).int32(t.tradeStatus),
                            null != t.codes && t.codes.length)
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.uint32(18).string(t.codes[a]);
                            if (null != t.commodites && t.commodites.length)
                                for (let a = 0; a < t.commodites.length; ++a)
                                    e.uint32(26).string(t.commodites[a]);
                            if (null != t.markets && t.markets.length)
                                for (let a = 0; a < t.markets.length; ++a)
                                    e.uint32(34).string(t.markets[a]);
                            return null != t.quotetime && Object.hasOwnProperty.call(t, "quotetime") && e.uint32(40).int64(t.quotetime),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.TradeStatusMsg;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.tradeStatus = t.int32();
                                    break;
                                case 2:
                                    i.codes && i.codes.length || (i.codes = []),
                                    i.codes.push(t.string());
                                    break;
                                case 3:
                                    i.commodites && i.commodites.length || (i.commodites = []),
                                    i.commodites.push(t.string());
                                    break;
                                case 4:
                                    i.markets && i.markets.length || (i.markets = []),
                                    i.markets.push(t.string());
                                    break;
                                case 5:
                                    i.quotetime = t.int64();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus"))
                                switch (t.tradeStatus) {
                                default:
                                    return "tradeStatus: enum value expected";
                                case 0:
                                case 7:
                                case 10:
                                case 20:
                                case 27:
                                case 30:
                                case 40:
                                case 50:
                                case 60:
                                case 67:
                                case 70:
                                case 99:
                                    break
                                }
                            if (null != t.codes && t.hasOwnProperty("codes")) {
                                if (!Array.isArray(t.codes))
                                    return "codes: array expected";
                                for (let e = 0; e < t.codes.length; ++e)
                                    if (!A.isString(t.codes[e]))
                                        return "codes: string[] expected"
                            }
                            if (null != t.commodites && t.hasOwnProperty("commodites")) {
                                if (!Array.isArray(t.commodites))
                                    return "commodites: array expected";
                                for (let e = 0; e < t.commodites.length; ++e)
                                    if (!A.isString(t.commodites[e]))
                                        return "commodites: string[] expected"
                            }
                            if (null != t.markets && t.hasOwnProperty("markets")) {
                                if (!Array.isArray(t.markets))
                                    return "markets: array expected";
                                for (let e = 0; e < t.markets.length; ++e)
                                    if (!A.isString(t.markets[e]))
                                        return "markets: string[] expected"
                            }
                            return null == t.quotetime || !t.hasOwnProperty("quotetime") || A.isInteger(t.quotetime) || t.quotetime && A.isInteger(t.quotetime.low) && A.isInteger(t.quotetime.high) ? null : "quotetime: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.TradeStatusMsg)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.TradeStatusMsg;
                            switch (t.tradeStatus) {
                            case "INIT":
                            case 0:
                                e.tradeStatus = 0;
                                break;
                            case "INIT_FINISH":
                            case 7:
                                e.tradeStatus = 7;
                                break;
                            case "OPEN":
                            case 10:
                                e.tradeStatus = 10;
                                break;
                            case "CALL_AUCTION":
                            case 20:
                                e.tradeStatus = 20;
                                break;
                            case "CALL_AUCTION_FINISH":
                            case 27:
                                e.tradeStatus = 27;
                                break;
                            case "TRADING":
                            case 30:
                                e.tradeStatus = 30;
                                break;
                            case "PAUSE":
                            case 40:
                                e.tradeStatus = 40;
                                break;
                            case "DELIVERY_CALL":
                            case 50:
                                e.tradeStatus = 50;
                                break;
                            case "DELIVERY":
                            case 60:
                                e.tradeStatus = 60;
                                break;
                            case "DELIVERY_FINISH":
                            case 67:
                                e.tradeStatus = 67;
                                break;
                            case "NEUTRAL_WAREHOUSE":
                            case 70:
                                e.tradeStatus = 70;
                                break;
                            case "CLOSE":
                            case 99:
                                e.tradeStatus = 99;
                                break
                            }
                            if (t.codes) {
                                if (!Array.isArray(t.codes))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.TradeStatusMsg.codes: array expected");
                                e.codes = [];
                                for (let a = 0; a < t.codes.length; ++a)
                                    e.codes[a] = String(t.codes[a])
                            }
                            if (t.commodites) {
                                if (!Array.isArray(t.commodites))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.TradeStatusMsg.commodites: array expected");
                                e.commodites = [];
                                for (let a = 0; a < t.commodites.length; ++a)
                                    e.commodites[a] = String(t.commodites[a])
                            }
                            if (t.markets) {
                                if (!Array.isArray(t.markets))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.TradeStatusMsg.markets: array expected");
                                e.markets = [];
                                for (let a = 0; a < t.markets.length; ++a)
                                    e.markets[a] = String(t.markets[a])
                            }
                            return null != t.quotetime && (A.Long ? (e.quotetime = A.Long.fromValue(t.quotetime)).unsigned = !1 : "string" === typeof t.quotetime ? e.quotetime = parseInt(t.quotetime, 10) : "number" === typeof t.quotetime ? e.quotetime = t.quotetime : "object" === typeof t.quotetime && (e.quotetime = new A.LongBits(t.quotetime.low >>> 0,t.quotetime.high >>> 0).toNumber())),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.codes = [],
                            a.commodites = [],
                            a.markets = []),
                            e.defaults)
                                if (a.tradeStatus = e.enums === String ? "INIT" : 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.quotetime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.quotetime = e.longs === String ? "0" : 0;
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus") && (a.tradeStatus = e.enums === String ? O.jadegold.msg.quotation.pbv2.TradeStatus[t.tradeStatus] : t.tradeStatus),
                            t.codes && t.codes.length) {
                                a.codes = [];
                                for (let e = 0; e < t.codes.length; ++e)
                                    a.codes[e] = t.codes[e]
                            }
                            if (t.commodites && t.commodites.length) {
                                a.commodites = [];
                                for (let e = 0; e < t.commodites.length; ++e)
                                    a.commodites[e] = t.commodites[e]
                            }
                            if (t.markets && t.markets.length) {
                                a.markets = [];
                                for (let e = 0; e < t.markets.length; ++e)
                                    a.markets[e] = t.markets[e]
                            }
                            return null != t.quotetime && t.hasOwnProperty("quotetime") && ("number" === typeof t.quotetime ? a.quotetime = e.longs === String ? String(t.quotetime) : t.quotetime : a.quotetime = e.longs === String ? A.Long.prototype.toString.call(t.quotetime) : e.longs === Number ? new A.LongBits(t.quotetime.low >>> 0,t.quotetime.high >>> 0).toNumber() : t.quotetime),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuoteQueryCondition = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.size = 0,
                        t.prototype.begintime = 0,
                        t.prototype.endtime = 0,
                        t.prototype.infoDays = 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.size && Object.hasOwnProperty.call(t, "size") && e.uint32(8).int32(t.size),
                            null != t.begintime && Object.hasOwnProperty.call(t, "begintime") && e.uint32(21).fixed32(t.begintime),
                            null != t.endtime && Object.hasOwnProperty.call(t, "endtime") && e.uint32(29).fixed32(t.endtime),
                            null != t.infoDays && Object.hasOwnProperty.call(t, "infoDays") && e.uint32(32).int32(t.infoDays),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuoteQueryCondition;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.size = t.int32();
                                    break;
                                case 2:
                                    i.begintime = t.fixed32();
                                    break;
                                case 3:
                                    i.endtime = t.fixed32();
                                    break;
                                case 4:
                                    i.infoDays = t.int32();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.size && t.hasOwnProperty("size") && !A.isInteger(t.size) ? "size: integer expected" : null != t.begintime && t.hasOwnProperty("begintime") && !A.isInteger(t.begintime) ? "begintime: integer expected" : null != t.endtime && t.hasOwnProperty("endtime") && !A.isInteger(t.endtime) ? "endtime: integer expected" : null != t.infoDays && t.hasOwnProperty("infoDays") && !A.isInteger(t.infoDays) ? "infoDays: integer expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuoteQueryCondition)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuoteQueryCondition;
                            return null != t.size && (e.size = 0 | t.size),
                            null != t.begintime && (e.begintime = t.begintime >>> 0),
                            null != t.endtime && (e.endtime = t.endtime >>> 0),
                            null != t.infoDays && (e.infoDays = 0 | t.infoDays),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            return e.defaults && (a.size = 0,
                            a.begintime = 0,
                            a.endtime = 0,
                            a.infoDays = 0),
                            null != t.size && t.hasOwnProperty("size") && (a.size = t.size),
                            null != t.begintime && t.hasOwnProperty("begintime") && (a.begintime = t.begintime),
                            null != t.endtime && t.hasOwnProperty("endtime") && (a.endtime = t.endtime),
                            null != t.infoDays && t.hasOwnProperty("infoDays") && (a.infoDays = t.infoDays),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.AuthReq = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.apptype = "",
                        t.prototype.token = A.newBuffer([]),
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.apptype && Object.hasOwnProperty.call(t, "apptype") && e.uint32(10).string(t.apptype),
                            null != t.token && Object.hasOwnProperty.call(t, "token") && e.uint32(18).bytes(t.token),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.AuthReq;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.apptype = t.string();
                                    break;
                                case 2:
                                    i.token = t.bytes();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.apptype && t.hasOwnProperty("apptype") && !A.isString(t.apptype) ? "apptype: string expected" : null != t.token && t.hasOwnProperty("token") && !(t.token && "number" === typeof t.token.length || A.isString(t.token)) ? "token: buffer expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.AuthReq)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.AuthReq;
                            return null != t.apptype && (e.apptype = String(t.apptype)),
                            null != t.token && ("string" === typeof t.token ? A.base64.decode(t.token, e.token = A.newBuffer(A.base64.length(t.token)), 0) : t.token.length && (e.token = t.token)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            return e.defaults && (a.apptype = "",
                            e.bytes === String ? a.token = "" : (a.token = [],
                            e.bytes !== Array && (a.token = A.newBuffer(a.token)))),
                            null != t.apptype && t.hasOwnProperty("apptype") && (a.apptype = t.apptype),
                            null != t.token && t.hasOwnProperty("token") && (a.token = e.bytes === String ? A.base64.encode(t.token, 0, t.token.length) : e.bytes === Array ? Array.prototype.slice.call(t.token) : t.token),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.AuthResp = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.serverInfo = A.newBuffer([]),
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.serverInfo && Object.hasOwnProperty.call(t, "serverInfo") && e.uint32(10).bytes(t.serverInfo),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.AuthResp;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.serverInfo = t.bytes();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.serverInfo && t.hasOwnProperty("serverInfo") && !(t.serverInfo && "number" === typeof t.serverInfo.length || A.isString(t.serverInfo)) ? "serverInfo: buffer expected" : null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.AuthResp)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.AuthResp;
                            return null != t.serverInfo && ("string" === typeof t.serverInfo ? A.base64.decode(t.serverInfo, e.serverInfo = A.newBuffer(A.base64.length(t.serverInfo)), 0) : t.serverInfo.length && (e.serverInfo = t.serverInfo)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            return e.defaults && (e.bytes === String ? a.serverInfo = "" : (a.serverInfo = [],
                            e.bytes !== Array && (a.serverInfo = A.newBuffer(a.serverInfo)))),
                            null != t.serverInfo && t.hasOwnProperty("serverInfo") && (a.serverInfo = e.bytes === String ? A.base64.encode(t.serverInfo, 0, t.serverInfo.length) : e.bytes === Array ? Array.prototype.slice.call(t.serverInfo) : t.serverInfo),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuotationFreq = function() {
                        const t = {}
                          , e = Object.create(t);
                        return e[t[0] = "REALTIME"] = 0,
                        e[t[1] = "INFO"] = 1,
                        e[t[2] = "TICK"] = 2,
                        e[t[3] = "MIN1"] = 3,
                        e[t[4] = "MIN5"] = 4,
                        e[t[5] = "MIN15"] = 5,
                        e[t[6] = "MIN30"] = 6,
                        e[t[7] = "MIN60"] = 7,
                        e[t[8] = "MIN120"] = 8,
                        e[t[9] = "MIN240"] = 9,
                        e[t[10] = "DAY1"] = 10,
                        e[t[11] = "WEEK1"] = 11,
                        e[t[12] = "MONTH1"] = 12,
                        e
                    }(),
                    t.RealtimeField = function() {
                        function t(t) {
                            if (this.askPrice = [],
                            this.askVol = [],
                            this.bidPrice = [],
                            this.bidVol = [],
                            t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.last = 0,
                        t.prototype.askPrice = A.emptyArray,
                        t.prototype.askVol = A.emptyArray,
                        t.prototype.bidPrice = A.emptyArray,
                        t.prototype.bidVol = A.emptyArray,
                        t.prototype.tag = 0,
                        t.prototype.posiDelta = 0,
                        t.prototype.highLimit = 0,
                        t.prototype.lowLimit = 0,
                        t.prototype.tickVolume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.updown = 0,
                        t.prototype.updownRate = 0,
                        t.prototype.average = 0,
                        t.prototype.tradeday = 0,
                        t.prototype.infoVolume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            if (e || (e = w.create()),
                            null != t.last && Object.hasOwnProperty.call(t, "last") && e.uint32(9).double(t.last),
                            null != t.askPrice && t.askPrice.length) {
                                e.uint32(18).fork();
                                for (let a = 0; a < t.askPrice.length; ++a)
                                    e.double(t.askPrice[a]);
                                e.ldelim()
                            }
                            if (null != t.askVol && t.askVol.length) {
                                e.uint32(26).fork();
                                for (let a = 0; a < t.askVol.length; ++a)
                                    e.int64(t.askVol[a]);
                                e.ldelim()
                            }
                            if (null != t.bidPrice && t.bidPrice.length) {
                                e.uint32(34).fork();
                                for (let a = 0; a < t.bidPrice.length; ++a)
                                    e.double(t.bidPrice[a]);
                                e.ldelim()
                            }
                            if (null != t.bidVol && t.bidVol.length) {
                                e.uint32(42).fork();
                                for (let a = 0; a < t.bidVol.length; ++a)
                                    e.int64(t.bidVol[a]);
                                e.ldelim()
                            }
                            return null != t.tag && Object.hasOwnProperty.call(t, "tag") && e.uint32(48).int32(t.tag),
                            null != t.posiDelta && Object.hasOwnProperty.call(t, "posiDelta") && e.uint32(57).double(t.posiDelta),
                            null != t.highLimit && Object.hasOwnProperty.call(t, "highLimit") && e.uint32(65).double(t.highLimit),
                            null != t.lowLimit && Object.hasOwnProperty.call(t, "lowLimit") && e.uint32(73).double(t.lowLimit),
                            null != t.tickVolume && Object.hasOwnProperty.call(t, "tickVolume") && e.uint32(80).int64(t.tickVolume),
                            null != t.updown && Object.hasOwnProperty.call(t, "updown") && e.uint32(89).double(t.updown),
                            null != t.updownRate && Object.hasOwnProperty.call(t, "updownRate") && e.uint32(97).double(t.updownRate),
                            null != t.average && Object.hasOwnProperty.call(t, "average") && e.uint32(105).double(t.average),
                            null != t.tradeday && Object.hasOwnProperty.call(t, "tradeday") && e.uint32(112).int32(t.tradeday),
                            null != t.infoVolume && Object.hasOwnProperty.call(t, "infoVolume") && e.uint32(120).int64(t.infoVolume),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.RealtimeField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.last = t.double();
                                    break;
                                case 2:
                                    if (i.askPrice && i.askPrice.length || (i.askPrice = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.askPrice.push(t.double())
                                    } else
                                        i.askPrice.push(t.double());
                                    break;
                                case 3:
                                    if (i.askVol && i.askVol.length || (i.askVol = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.askVol.push(t.int64())
                                    } else
                                        i.askVol.push(t.int64());
                                    break;
                                case 4:
                                    if (i.bidPrice && i.bidPrice.length || (i.bidPrice = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.bidPrice.push(t.double())
                                    } else
                                        i.bidPrice.push(t.double());
                                    break;
                                case 5:
                                    if (i.bidVol && i.bidVol.length || (i.bidVol = []),
                                    2 === (7 & e)) {
                                        let e = t.uint32() + t.pos;
                                        while (t.pos < e)
                                            i.bidVol.push(t.int64())
                                    } else
                                        i.bidVol.push(t.int64());
                                    break;
                                case 6:
                                    i.tag = t.int32();
                                    break;
                                case 7:
                                    i.posiDelta = t.double();
                                    break;
                                case 8:
                                    i.highLimit = t.double();
                                    break;
                                case 9:
                                    i.lowLimit = t.double();
                                    break;
                                case 10:
                                    i.tickVolume = t.int64();
                                    break;
                                case 11:
                                    i.updown = t.double();
                                    break;
                                case 12:
                                    i.updownRate = t.double();
                                    break;
                                case 13:
                                    i.average = t.double();
                                    break;
                                case 14:
                                    i.tradeday = t.int32();
                                    break;
                                case 15:
                                    i.infoVolume = t.int64();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.last && t.hasOwnProperty("last") && "number" !== typeof t.last)
                                return "last: number expected";
                            if (null != t.askPrice && t.hasOwnProperty("askPrice")) {
                                if (!Array.isArray(t.askPrice))
                                    return "askPrice: array expected";
                                for (let e = 0; e < t.askPrice.length; ++e)
                                    if ("number" !== typeof t.askPrice[e])
                                        return "askPrice: number[] expected"
                            }
                            if (null != t.askVol && t.hasOwnProperty("askVol")) {
                                if (!Array.isArray(t.askVol))
                                    return "askVol: array expected";
                                for (let e = 0; e < t.askVol.length; ++e)
                                    if (!A.isInteger(t.askVol[e]) && !(t.askVol[e] && A.isInteger(t.askVol[e].low) && A.isInteger(t.askVol[e].high)))
                                        return "askVol: integer|Long[] expected"
                            }
                            if (null != t.bidPrice && t.hasOwnProperty("bidPrice")) {
                                if (!Array.isArray(t.bidPrice))
                                    return "bidPrice: array expected";
                                for (let e = 0; e < t.bidPrice.length; ++e)
                                    if ("number" !== typeof t.bidPrice[e])
                                        return "bidPrice: number[] expected"
                            }
                            if (null != t.bidVol && t.hasOwnProperty("bidVol")) {
                                if (!Array.isArray(t.bidVol))
                                    return "bidVol: array expected";
                                for (let e = 0; e < t.bidVol.length; ++e)
                                    if (!A.isInteger(t.bidVol[e]) && !(t.bidVol[e] && A.isInteger(t.bidVol[e].low) && A.isInteger(t.bidVol[e].high)))
                                        return "bidVol: integer|Long[] expected"
                            }
                            return null != t.tag && t.hasOwnProperty("tag") && !A.isInteger(t.tag) ? "tag: integer expected" : null != t.posiDelta && t.hasOwnProperty("posiDelta") && "number" !== typeof t.posiDelta ? "posiDelta: number expected" : null != t.highLimit && t.hasOwnProperty("highLimit") && "number" !== typeof t.highLimit ? "highLimit: number expected" : null != t.lowLimit && t.hasOwnProperty("lowLimit") && "number" !== typeof t.lowLimit ? "lowLimit: number expected" : null == t.tickVolume || !t.hasOwnProperty("tickVolume") || A.isInteger(t.tickVolume) || t.tickVolume && A.isInteger(t.tickVolume.low) && A.isInteger(t.tickVolume.high) ? null != t.updown && t.hasOwnProperty("updown") && "number" !== typeof t.updown ? "updown: number expected" : null != t.updownRate && t.hasOwnProperty("updownRate") && "number" !== typeof t.updownRate ? "updownRate: number expected" : null != t.average && t.hasOwnProperty("average") && "number" !== typeof t.average ? "average: number expected" : null != t.tradeday && t.hasOwnProperty("tradeday") && !A.isInteger(t.tradeday) ? "tradeday: integer expected" : null == t.infoVolume || !t.hasOwnProperty("infoVolume") || A.isInteger(t.infoVolume) || t.infoVolume && A.isInteger(t.infoVolume.low) && A.isInteger(t.infoVolume.high) ? null : "infoVolume: integer|Long expected" : "tickVolume: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.RealtimeField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.RealtimeField;
                            if (null != t.last && (e.last = Number(t.last)),
                            t.askPrice) {
                                if (!Array.isArray(t.askPrice))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.askPrice: array expected");
                                e.askPrice = [];
                                for (let a = 0; a < t.askPrice.length; ++a)
                                    e.askPrice[a] = Number(t.askPrice[a])
                            }
                            if (t.askVol) {
                                if (!Array.isArray(t.askVol))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.askVol: array expected");
                                e.askVol = [];
                                for (let a = 0; a < t.askVol.length; ++a)
                                    A.Long ? (e.askVol[a] = A.Long.fromValue(t.askVol[a])).unsigned = !1 : "string" === typeof t.askVol[a] ? e.askVol[a] = parseInt(t.askVol[a], 10) : "number" === typeof t.askVol[a] ? e.askVol[a] = t.askVol[a] : "object" === typeof t.askVol[a] && (e.askVol[a] = new A.LongBits(t.askVol[a].low >>> 0,t.askVol[a].high >>> 0).toNumber())
                            }
                            if (t.bidPrice) {
                                if (!Array.isArray(t.bidPrice))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.bidPrice: array expected");
                                e.bidPrice = [];
                                for (let a = 0; a < t.bidPrice.length; ++a)
                                    e.bidPrice[a] = Number(t.bidPrice[a])
                            }
                            if (t.bidVol) {
                                if (!Array.isArray(t.bidVol))
                                    throw TypeError(".jadegold.msg.quotation.pbv2.RealtimeField.bidVol: array expected");
                                e.bidVol = [];
                                for (let a = 0; a < t.bidVol.length; ++a)
                                    A.Long ? (e.bidVol[a] = A.Long.fromValue(t.bidVol[a])).unsigned = !1 : "string" === typeof t.bidVol[a] ? e.bidVol[a] = parseInt(t.bidVol[a], 10) : "number" === typeof t.bidVol[a] ? e.bidVol[a] = t.bidVol[a] : "object" === typeof t.bidVol[a] && (e.bidVol[a] = new A.LongBits(t.bidVol[a].low >>> 0,t.bidVol[a].high >>> 0).toNumber())
                            }
                            return null != t.tag && (e.tag = 0 | t.tag),
                            null != t.posiDelta && (e.posiDelta = Number(t.posiDelta)),
                            null != t.highLimit && (e.highLimit = Number(t.highLimit)),
                            null != t.lowLimit && (e.lowLimit = Number(t.lowLimit)),
                            null != t.tickVolume && (A.Long ? (e.tickVolume = A.Long.fromValue(t.tickVolume)).unsigned = !1 : "string" === typeof t.tickVolume ? e.tickVolume = parseInt(t.tickVolume, 10) : "number" === typeof t.tickVolume ? e.tickVolume = t.tickVolume : "object" === typeof t.tickVolume && (e.tickVolume = new A.LongBits(t.tickVolume.low >>> 0,t.tickVolume.high >>> 0).toNumber())),
                            null != t.updown && (e.updown = Number(t.updown)),
                            null != t.updownRate && (e.updownRate = Number(t.updownRate)),
                            null != t.average && (e.average = Number(t.average)),
                            null != t.tradeday && (e.tradeday = 0 | t.tradeday),
                            null != t.infoVolume && (A.Long ? (e.infoVolume = A.Long.fromValue(t.infoVolume)).unsigned = !1 : "string" === typeof t.infoVolume ? e.infoVolume = parseInt(t.infoVolume, 10) : "number" === typeof t.infoVolume ? e.infoVolume = t.infoVolume : "object" === typeof t.infoVolume && (e.infoVolume = new A.LongBits(t.infoVolume.low >>> 0,t.infoVolume.high >>> 0).toNumber())),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if ((e.arrays || e.defaults) && (a.askPrice = [],
                            a.askVol = [],
                            a.bidPrice = [],
                            a.bidVol = []),
                            e.defaults) {
                                if (a.last = 0,
                                a.tag = 0,
                                a.posiDelta = 0,
                                a.highLimit = 0,
                                a.lowLimit = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.tickVolume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.tickVolume = e.longs === String ? "0" : 0;
                                if (a.updown = 0,
                                a.updownRate = 0,
                                a.average = 0,
                                a.tradeday = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.infoVolume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.infoVolume = e.longs === String ? "0" : 0
                            }
                            if (null != t.last && t.hasOwnProperty("last") && (a.last = e.json && !isFinite(t.last) ? String(t.last) : t.last),
                            t.askPrice && t.askPrice.length) {
                                a.askPrice = [];
                                for (let i = 0; i < t.askPrice.length; ++i)
                                    a.askPrice[i] = e.json && !isFinite(t.askPrice[i]) ? String(t.askPrice[i]) : t.askPrice[i]
                            }
                            if (t.askVol && t.askVol.length) {
                                a.askVol = [];
                                for (let i = 0; i < t.askVol.length; ++i)
                                    "number" === typeof t.askVol[i] ? a.askVol[i] = e.longs === String ? String(t.askVol[i]) : t.askVol[i] : a.askVol[i] = e.longs === String ? A.Long.prototype.toString.call(t.askVol[i]) : e.longs === Number ? new A.LongBits(t.askVol[i].low >>> 0,t.askVol[i].high >>> 0).toNumber() : t.askVol[i]
                            }
                            if (t.bidPrice && t.bidPrice.length) {
                                a.bidPrice = [];
                                for (let i = 0; i < t.bidPrice.length; ++i)
                                    a.bidPrice[i] = e.json && !isFinite(t.bidPrice[i]) ? String(t.bidPrice[i]) : t.bidPrice[i]
                            }
                            if (t.bidVol && t.bidVol.length) {
                                a.bidVol = [];
                                for (let i = 0; i < t.bidVol.length; ++i)
                                    "number" === typeof t.bidVol[i] ? a.bidVol[i] = e.longs === String ? String(t.bidVol[i]) : t.bidVol[i] : a.bidVol[i] = e.longs === String ? A.Long.prototype.toString.call(t.bidVol[i]) : e.longs === Number ? new A.LongBits(t.bidVol[i].low >>> 0,t.bidVol[i].high >>> 0).toNumber() : t.bidVol[i]
                            }
                            return null != t.tag && t.hasOwnProperty("tag") && (a.tag = t.tag),
                            null != t.posiDelta && t.hasOwnProperty("posiDelta") && (a.posiDelta = e.json && !isFinite(t.posiDelta) ? String(t.posiDelta) : t.posiDelta),
                            null != t.highLimit && t.hasOwnProperty("highLimit") && (a.highLimit = e.json && !isFinite(t.highLimit) ? String(t.highLimit) : t.highLimit),
                            null != t.lowLimit && t.hasOwnProperty("lowLimit") && (a.lowLimit = e.json && !isFinite(t.lowLimit) ? String(t.lowLimit) : t.lowLimit),
                            null != t.tickVolume && t.hasOwnProperty("tickVolume") && ("number" === typeof t.tickVolume ? a.tickVolume = e.longs === String ? String(t.tickVolume) : t.tickVolume : a.tickVolume = e.longs === String ? A.Long.prototype.toString.call(t.tickVolume) : e.longs === Number ? new A.LongBits(t.tickVolume.low >>> 0,t.tickVolume.high >>> 0).toNumber() : t.tickVolume),
                            null != t.updown && t.hasOwnProperty("updown") && (a.updown = e.json && !isFinite(t.updown) ? String(t.updown) : t.updown),
                            null != t.updownRate && t.hasOwnProperty("updownRate") && (a.updownRate = e.json && !isFinite(t.updownRate) ? String(t.updownRate) : t.updownRate),
                            null != t.average && t.hasOwnProperty("average") && (a.average = e.json && !isFinite(t.average) ? String(t.average) : t.average),
                            null != t.tradeday && t.hasOwnProperty("tradeday") && (a.tradeday = t.tradeday),
                            null != t.infoVolume && t.hasOwnProperty("infoVolume") && ("number" === typeof t.infoVolume ? a.infoVolume = e.longs === String ? String(t.infoVolume) : t.infoVolume : a.infoVolume = e.longs === String ? A.Long.prototype.toString.call(t.infoVolume) : e.longs === Number ? new A.LongBits(t.infoVolume.low >>> 0,t.infoVolume.high >>> 0).toNumber() : t.infoVolume),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.ExtraField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.preSettle = 0,
                        t.prototype.sequenceNo = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.amplitude = 0,
                        t.prototype.currDelta = 0,
                        t.prototype.preDelta = 0,
                        t.prototype.market = "",
                        t.prototype.exchangeId = "",
                        t.prototype.prePosi = 0,
                        t.prototype.name = "",
                        t.prototype.commodityCode = "",
                        t.prototype.tradeStatus = 0,
                        t.prototype.openTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.closeTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.goldDelivery = null,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.preSettle && Object.hasOwnProperty.call(t, "preSettle") && e.uint32(9).double(t.preSettle),
                            null != t.sequenceNo && Object.hasOwnProperty.call(t, "sequenceNo") && e.uint32(16).int64(t.sequenceNo),
                            null != t.amplitude && Object.hasOwnProperty.call(t, "amplitude") && e.uint32(25).double(t.amplitude),
                            null != t.currDelta && Object.hasOwnProperty.call(t, "currDelta") && e.uint32(33).double(t.currDelta),
                            null != t.preDelta && Object.hasOwnProperty.call(t, "preDelta") && e.uint32(41).double(t.preDelta),
                            null != t.market && Object.hasOwnProperty.call(t, "market") && e.uint32(50).string(t.market),
                            null != t.exchangeId && Object.hasOwnProperty.call(t, "exchangeId") && e.uint32(58).string(t.exchangeId),
                            null != t.prePosi && Object.hasOwnProperty.call(t, "prePosi") && e.uint32(65).double(t.prePosi),
                            null != t.name && Object.hasOwnProperty.call(t, "name") && e.uint32(74).string(t.name),
                            null != t.commodityCode && Object.hasOwnProperty.call(t, "commodityCode") && e.uint32(82).string(t.commodityCode),
                            null != t.tradeStatus && Object.hasOwnProperty.call(t, "tradeStatus") && e.uint32(88).int32(t.tradeStatus),
                            null != t.openTime && Object.hasOwnProperty.call(t, "openTime") && e.uint32(136).int64(t.openTime),
                            null != t.closeTime && Object.hasOwnProperty.call(t, "closeTime") && e.uint32(144).int64(t.closeTime),
                            null != t.goldDelivery && Object.hasOwnProperty.call(t, "goldDelivery") && O.jadegold.msg.quotation.pbv2.GoldDeliveryField.encode(t.goldDelivery, e.uint32(514).fork()).ldelim(),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.ExtraField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.preSettle = t.double();
                                    break;
                                case 2:
                                    i.sequenceNo = t.int64();
                                    break;
                                case 3:
                                    i.amplitude = t.double();
                                    break;
                                case 4:
                                    i.currDelta = t.double();
                                    break;
                                case 5:
                                    i.preDelta = t.double();
                                    break;
                                case 6:
                                    i.market = t.string();
                                    break;
                                case 7:
                                    i.exchangeId = t.string();
                                    break;
                                case 8:
                                    i.prePosi = t.double();
                                    break;
                                case 9:
                                    i.name = t.string();
                                    break;
                                case 10:
                                    i.commodityCode = t.string();
                                    break;
                                case 11:
                                    i.tradeStatus = t.int32();
                                    break;
                                case 17:
                                    i.openTime = t.int64();
                                    break;
                                case 18:
                                    i.closeTime = t.int64();
                                    break;
                                case 64:
                                    i.goldDelivery = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.preSettle && t.hasOwnProperty("preSettle") && "number" !== typeof t.preSettle)
                                return "preSettle: number expected";
                            if (null != t.sequenceNo && t.hasOwnProperty("sequenceNo") && !A.isInteger(t.sequenceNo) && !(t.sequenceNo && A.isInteger(t.sequenceNo.low) && A.isInteger(t.sequenceNo.high)))
                                return "sequenceNo: integer|Long expected";
                            if (null != t.amplitude && t.hasOwnProperty("amplitude") && "number" !== typeof t.amplitude)
                                return "amplitude: number expected";
                            if (null != t.currDelta && t.hasOwnProperty("currDelta") && "number" !== typeof t.currDelta)
                                return "currDelta: number expected";
                            if (null != t.preDelta && t.hasOwnProperty("preDelta") && "number" !== typeof t.preDelta)
                                return "preDelta: number expected";
                            if (null != t.market && t.hasOwnProperty("market") && !A.isString(t.market))
                                return "market: string expected";
                            if (null != t.exchangeId && t.hasOwnProperty("exchangeId") && !A.isString(t.exchangeId))
                                return "exchangeId: string expected";
                            if (null != t.prePosi && t.hasOwnProperty("prePosi") && "number" !== typeof t.prePosi)
                                return "prePosi: number expected";
                            if (null != t.name && t.hasOwnProperty("name") && !A.isString(t.name))
                                return "name: string expected";
                            if (null != t.commodityCode && t.hasOwnProperty("commodityCode") && !A.isString(t.commodityCode))
                                return "commodityCode: string expected";
                            if (null != t.tradeStatus && t.hasOwnProperty("tradeStatus"))
                                switch (t.tradeStatus) {
                                default:
                                    return "tradeStatus: enum value expected";
                                case 0:
                                case 7:
                                case 10:
                                case 20:
                                case 27:
                                case 30:
                                case 40:
                                case 50:
                                case 60:
                                case 67:
                                case 70:
                                case 99:
                                    break
                                }
                            if (null != t.openTime && t.hasOwnProperty("openTime") && !A.isInteger(t.openTime) && !(t.openTime && A.isInteger(t.openTime.low) && A.isInteger(t.openTime.high)))
                                return "openTime: integer|Long expected";
                            if (null != t.closeTime && t.hasOwnProperty("closeTime") && !A.isInteger(t.closeTime) && !(t.closeTime && A.isInteger(t.closeTime.low) && A.isInteger(t.closeTime.high)))
                                return "closeTime: integer|Long expected";
                            if (null != t.goldDelivery && t.hasOwnProperty("goldDelivery")) {
                                let e = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.verify(t.goldDelivery);
                                if (e)
                                    return "goldDelivery." + e
                            }
                            return null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.ExtraField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.ExtraField;
                            switch (null != t.preSettle && (e.preSettle = Number(t.preSettle)),
                            null != t.sequenceNo && (A.Long ? (e.sequenceNo = A.Long.fromValue(t.sequenceNo)).unsigned = !1 : "string" === typeof t.sequenceNo ? e.sequenceNo = parseInt(t.sequenceNo, 10) : "number" === typeof t.sequenceNo ? e.sequenceNo = t.sequenceNo : "object" === typeof t.sequenceNo && (e.sequenceNo = new A.LongBits(t.sequenceNo.low >>> 0,t.sequenceNo.high >>> 0).toNumber())),
                            null != t.amplitude && (e.amplitude = Number(t.amplitude)),
                            null != t.currDelta && (e.currDelta = Number(t.currDelta)),
                            null != t.preDelta && (e.preDelta = Number(t.preDelta)),
                            null != t.market && (e.market = String(t.market)),
                            null != t.exchangeId && (e.exchangeId = String(t.exchangeId)),
                            null != t.prePosi && (e.prePosi = Number(t.prePosi)),
                            null != t.name && (e.name = String(t.name)),
                            null != t.commodityCode && (e.commodityCode = String(t.commodityCode)),
                            t.tradeStatus) {
                            case "INIT":
                            case 0:
                                e.tradeStatus = 0;
                                break;
                            case "INIT_FINISH":
                            case 7:
                                e.tradeStatus = 7;
                                break;
                            case "OPEN":
                            case 10:
                                e.tradeStatus = 10;
                                break;
                            case "CALL_AUCTION":
                            case 20:
                                e.tradeStatus = 20;
                                break;
                            case "CALL_AUCTION_FINISH":
                            case 27:
                                e.tradeStatus = 27;
                                break;
                            case "TRADING":
                            case 30:
                                e.tradeStatus = 30;
                                break;
                            case "PAUSE":
                            case 40:
                                e.tradeStatus = 40;
                                break;
                            case "DELIVERY_CALL":
                            case 50:
                                e.tradeStatus = 50;
                                break;
                            case "DELIVERY":
                            case 60:
                                e.tradeStatus = 60;
                                break;
                            case "DELIVERY_FINISH":
                            case 67:
                                e.tradeStatus = 67;
                                break;
                            case "NEUTRAL_WAREHOUSE":
                            case 70:
                                e.tradeStatus = 70;
                                break;
                            case "CLOSE":
                            case 99:
                                e.tradeStatus = 99;
                                break
                            }
                            if (null != t.openTime && (A.Long ? (e.openTime = A.Long.fromValue(t.openTime)).unsigned = !1 : "string" === typeof t.openTime ? e.openTime = parseInt(t.openTime, 10) : "number" === typeof t.openTime ? e.openTime = t.openTime : "object" === typeof t.openTime && (e.openTime = new A.LongBits(t.openTime.low >>> 0,t.openTime.high >>> 0).toNumber())),
                            null != t.closeTime && (A.Long ? (e.closeTime = A.Long.fromValue(t.closeTime)).unsigned = !1 : "string" === typeof t.closeTime ? e.closeTime = parseInt(t.closeTime, 10) : "number" === typeof t.closeTime ? e.closeTime = t.closeTime : "object" === typeof t.closeTime && (e.closeTime = new A.LongBits(t.closeTime.low >>> 0,t.closeTime.high >>> 0).toNumber())),
                            null != t.goldDelivery) {
                                if ("object" !== typeof t.goldDelivery)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.ExtraField.goldDelivery: object expected");
                                e.goldDelivery = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.fromObject(t.goldDelivery)
                            }
                            return e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (a.preSettle = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.sequenceNo = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.sequenceNo = e.longs === String ? "0" : 0;
                                if (a.amplitude = 0,
                                a.currDelta = 0,
                                a.preDelta = 0,
                                a.market = "",
                                a.exchangeId = "",
                                a.prePosi = 0,
                                a.name = "",
                                a.commodityCode = "",
                                a.tradeStatus = e.enums === String ? "INIT" : 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.openTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.openTime = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.closeTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.closeTime = e.longs === String ? "0" : 0;
                                a.goldDelivery = null
                            }
                            return null != t.preSettle && t.hasOwnProperty("preSettle") && (a.preSettle = e.json && !isFinite(t.preSettle) ? String(t.preSettle) : t.preSettle),
                            null != t.sequenceNo && t.hasOwnProperty("sequenceNo") && ("number" === typeof t.sequenceNo ? a.sequenceNo = e.longs === String ? String(t.sequenceNo) : t.sequenceNo : a.sequenceNo = e.longs === String ? A.Long.prototype.toString.call(t.sequenceNo) : e.longs === Number ? new A.LongBits(t.sequenceNo.low >>> 0,t.sequenceNo.high >>> 0).toNumber() : t.sequenceNo),
                            null != t.amplitude && t.hasOwnProperty("amplitude") && (a.amplitude = e.json && !isFinite(t.amplitude) ? String(t.amplitude) : t.amplitude),
                            null != t.currDelta && t.hasOwnProperty("currDelta") && (a.currDelta = e.json && !isFinite(t.currDelta) ? String(t.currDelta) : t.currDelta),
                            null != t.preDelta && t.hasOwnProperty("preDelta") && (a.preDelta = e.json && !isFinite(t.preDelta) ? String(t.preDelta) : t.preDelta),
                            null != t.market && t.hasOwnProperty("market") && (a.market = t.market),
                            null != t.exchangeId && t.hasOwnProperty("exchangeId") && (a.exchangeId = t.exchangeId),
                            null != t.prePosi && t.hasOwnProperty("prePosi") && (a.prePosi = e.json && !isFinite(t.prePosi) ? String(t.prePosi) : t.prePosi),
                            null != t.name && t.hasOwnProperty("name") && (a.name = t.name),
                            null != t.commodityCode && t.hasOwnProperty("commodityCode") && (a.commodityCode = t.commodityCode),
                            null != t.tradeStatus && t.hasOwnProperty("tradeStatus") && (a.tradeStatus = e.enums === String ? O.jadegold.msg.quotation.pbv2.TradeStatus[t.tradeStatus] : t.tradeStatus),
                            null != t.openTime && t.hasOwnProperty("openTime") && ("number" === typeof t.openTime ? a.openTime = e.longs === String ? String(t.openTime) : t.openTime : a.openTime = e.longs === String ? A.Long.prototype.toString.call(t.openTime) : e.longs === Number ? new A.LongBits(t.openTime.low >>> 0,t.openTime.high >>> 0).toNumber() : t.openTime),
                            null != t.closeTime && t.hasOwnProperty("closeTime") && ("number" === typeof t.closeTime ? a.closeTime = e.longs === String ? String(t.closeTime) : t.closeTime : a.closeTime = e.longs === String ? A.Long.prototype.toString.call(t.closeTime) : e.longs === Number ? new A.LongBits(t.closeTime.low >>> 0,t.closeTime.high >>> 0).toNumber() : t.closeTime),
                            null != t.goldDelivery && t.hasOwnProperty("goldDelivery") && (a.goldDelivery = O.jadegold.msg.quotation.pbv2.GoldDeliveryField.toObject(t.goldDelivery, e)),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.ServerInnerField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.beginVolume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.beginTurnover = 0,
                        t.prototype.tradeUnit = 0,
                        t.prototype.priorno = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.tradeDay = "",
                        t.prototype.updateTime = "",
                        t.prototype.updateMs = 0,
                        t.prototype.actionDay = "",
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.beginVolume && Object.hasOwnProperty.call(t, "beginVolume") && e.uint32(8).int64(t.beginVolume),
                            null != t.beginTurnover && Object.hasOwnProperty.call(t, "beginTurnover") && e.uint32(17).double(t.beginTurnover),
                            null != t.tradeUnit && Object.hasOwnProperty.call(t, "tradeUnit") && e.uint32(25).double(t.tradeUnit),
                            null != t.priorno && Object.hasOwnProperty.call(t, "priorno") && e.uint32(33).fixed64(t.priorno),
                            null != t.tradeDay && Object.hasOwnProperty.call(t, "tradeDay") && e.uint32(66).string(t.tradeDay),
                            null != t.updateTime && Object.hasOwnProperty.call(t, "updateTime") && e.uint32(74).string(t.updateTime),
                            null != t.updateMs && Object.hasOwnProperty.call(t, "updateMs") && e.uint32(80).int32(t.updateMs),
                            null != t.actionDay && Object.hasOwnProperty.call(t, "actionDay") && e.uint32(90).string(t.actionDay),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.ServerInnerField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.beginVolume = t.int64();
                                    break;
                                case 2:
                                    i.beginTurnover = t.double();
                                    break;
                                case 3:
                                    i.tradeUnit = t.double();
                                    break;
                                case 4:
                                    i.priorno = t.fixed64();
                                    break;
                                case 8:
                                    i.tradeDay = t.string();
                                    break;
                                case 9:
                                    i.updateTime = t.string();
                                    break;
                                case 10:
                                    i.updateMs = t.int32();
                                    break;
                                case 11:
                                    i.actionDay = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null == t.beginVolume || !t.hasOwnProperty("beginVolume") || A.isInteger(t.beginVolume) || t.beginVolume && A.isInteger(t.beginVolume.low) && A.isInteger(t.beginVolume.high) ? null != t.beginTurnover && t.hasOwnProperty("beginTurnover") && "number" !== typeof t.beginTurnover ? "beginTurnover: number expected" : null != t.tradeUnit && t.hasOwnProperty("tradeUnit") && "number" !== typeof t.tradeUnit ? "tradeUnit: number expected" : null == t.priorno || !t.hasOwnProperty("priorno") || A.isInteger(t.priorno) || t.priorno && A.isInteger(t.priorno.low) && A.isInteger(t.priorno.high) ? null != t.tradeDay && t.hasOwnProperty("tradeDay") && !A.isString(t.tradeDay) ? "tradeDay: string expected" : null != t.updateTime && t.hasOwnProperty("updateTime") && !A.isString(t.updateTime) ? "updateTime: string expected" : null != t.updateMs && t.hasOwnProperty("updateMs") && !A.isInteger(t.updateMs) ? "updateMs: integer expected" : null != t.actionDay && t.hasOwnProperty("actionDay") && !A.isString(t.actionDay) ? "actionDay: string expected" : null : "priorno: integer|Long expected" : "beginVolume: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.ServerInnerField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.ServerInnerField;
                            return null != t.beginVolume && (A.Long ? (e.beginVolume = A.Long.fromValue(t.beginVolume)).unsigned = !1 : "string" === typeof t.beginVolume ? e.beginVolume = parseInt(t.beginVolume, 10) : "number" === typeof t.beginVolume ? e.beginVolume = t.beginVolume : "object" === typeof t.beginVolume && (e.beginVolume = new A.LongBits(t.beginVolume.low >>> 0,t.beginVolume.high >>> 0).toNumber())),
                            null != t.beginTurnover && (e.beginTurnover = Number(t.beginTurnover)),
                            null != t.tradeUnit && (e.tradeUnit = Number(t.tradeUnit)),
                            null != t.priorno && (A.Long ? (e.priorno = A.Long.fromValue(t.priorno)).unsigned = !1 : "string" === typeof t.priorno ? e.priorno = parseInt(t.priorno, 10) : "number" === typeof t.priorno ? e.priorno = t.priorno : "object" === typeof t.priorno && (e.priorno = new A.LongBits(t.priorno.low >>> 0,t.priorno.high >>> 0).toNumber())),
                            null != t.tradeDay && (e.tradeDay = String(t.tradeDay)),
                            null != t.updateTime && (e.updateTime = String(t.updateTime)),
                            null != t.updateMs && (e.updateMs = 0 | t.updateMs),
                            null != t.actionDay && (e.actionDay = String(t.actionDay)),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.beginVolume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.beginVolume = e.longs === String ? "0" : 0;
                                if (a.beginTurnover = 0,
                                a.tradeUnit = 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.priorno = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.priorno = e.longs === String ? "0" : 0;
                                a.tradeDay = "",
                                a.updateTime = "",
                                a.updateMs = 0,
                                a.actionDay = ""
                            }
                            return null != t.beginVolume && t.hasOwnProperty("beginVolume") && ("number" === typeof t.beginVolume ? a.beginVolume = e.longs === String ? String(t.beginVolume) : t.beginVolume : a.beginVolume = e.longs === String ? A.Long.prototype.toString.call(t.beginVolume) : e.longs === Number ? new A.LongBits(t.beginVolume.low >>> 0,t.beginVolume.high >>> 0).toNumber() : t.beginVolume),
                            null != t.beginTurnover && t.hasOwnProperty("beginTurnover") && (a.beginTurnover = e.json && !isFinite(t.beginTurnover) ? String(t.beginTurnover) : t.beginTurnover),
                            null != t.tradeUnit && t.hasOwnProperty("tradeUnit") && (a.tradeUnit = e.json && !isFinite(t.tradeUnit) ? String(t.tradeUnit) : t.tradeUnit),
                            null != t.priorno && t.hasOwnProperty("priorno") && ("number" === typeof t.priorno ? a.priorno = e.longs === String ? String(t.priorno) : t.priorno : a.priorno = e.longs === String ? A.Long.prototype.toString.call(t.priorno) : e.longs === Number ? new A.LongBits(t.priorno.low >>> 0,t.priorno.high >>> 0).toNumber() : t.priorno),
                            null != t.tradeDay && t.hasOwnProperty("tradeDay") && (a.tradeDay = t.tradeDay),
                            null != t.updateTime && t.hasOwnProperty("updateTime") && (a.updateTime = t.updateTime),
                            null != t.updateMs && t.hasOwnProperty("updateMs") && (a.updateMs = t.updateMs),
                            null != t.actionDay && t.hasOwnProperty("actionDay") && (a.actionDay = t.actionDay),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.QuotationField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.code = "",
                        t.prototype.freq = 0,
                        t.prototype.quoteTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.volume = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.freqTime = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.turnOver = 0,
                        t.prototype.rt = null,
                        t.prototype.open = 0,
                        t.prototype.high = 0,
                        t.prototype.low = 0,
                        t.prototype.close = 0,
                        t.prototype.posi = 0,
                        t.prototype.preClose = 0,
                        t.prototype.settle = 0,
                        t.prototype.extra = null,
                        t.prototype.inner = null,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.code && Object.hasOwnProperty.call(t, "code") && e.uint32(10).string(t.code),
                            null != t.freq && Object.hasOwnProperty.call(t, "freq") && e.uint32(16).int32(t.freq),
                            null != t.quoteTime && Object.hasOwnProperty.call(t, "quoteTime") && e.uint32(25).fixed64(t.quoteTime),
                            null != t.volume && Object.hasOwnProperty.call(t, "volume") && e.uint32(32).int64(t.volume),
                            null != t.freqTime && Object.hasOwnProperty.call(t, "freqTime") && e.uint32(40).int64(t.freqTime),
                            null != t.turnOver && Object.hasOwnProperty.call(t, "turnOver") && e.uint32(49).double(t.turnOver),
                            null != t.rt && Object.hasOwnProperty.call(t, "rt") && O.jadegold.msg.quotation.pbv2.RealtimeField.encode(t.rt, e.uint32(58).fork()).ldelim(),
                            null != t.open && Object.hasOwnProperty.call(t, "open") && e.uint32(65).double(t.open),
                            null != t.high && Object.hasOwnProperty.call(t, "high") && e.uint32(73).double(t.high),
                            null != t.low && Object.hasOwnProperty.call(t, "low") && e.uint32(81).double(t.low),
                            null != t.close && Object.hasOwnProperty.call(t, "close") && e.uint32(89).double(t.close),
                            null != t.posi && Object.hasOwnProperty.call(t, "posi") && e.uint32(97).double(t.posi),
                            null != t.preClose && Object.hasOwnProperty.call(t, "preClose") && e.uint32(105).double(t.preClose),
                            null != t.settle && Object.hasOwnProperty.call(t, "settle") && e.uint32(113).double(t.settle),
                            null != t.extra && Object.hasOwnProperty.call(t, "extra") && O.jadegold.msg.quotation.pbv2.ExtraField.encode(t.extra, e.uint32(122).fork()).ldelim(),
                            null != t.inner && Object.hasOwnProperty.call(t, "inner") && O.jadegold.msg.quotation.pbv2.ServerInnerField.encode(t.inner, e.uint32(1026).fork()).ldelim(),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.QuotationField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.code = t.string();
                                    break;
                                case 2:
                                    i.freq = t.int32();
                                    break;
                                case 3:
                                    i.quoteTime = t.fixed64();
                                    break;
                                case 4:
                                    i.volume = t.int64();
                                    break;
                                case 5:
                                    i.freqTime = t.int64();
                                    break;
                                case 6:
                                    i.turnOver = t.double();
                                    break;
                                case 7:
                                    i.rt = O.jadegold.msg.quotation.pbv2.RealtimeField.decode(t, t.uint32());
                                    break;
                                case 8:
                                    i.open = t.double();
                                    break;
                                case 9:
                                    i.high = t.double();
                                    break;
                                case 10:
                                    i.low = t.double();
                                    break;
                                case 11:
                                    i.close = t.double();
                                    break;
                                case 12:
                                    i.posi = t.double();
                                    break;
                                case 13:
                                    i.preClose = t.double();
                                    break;
                                case 14:
                                    i.settle = t.double();
                                    break;
                                case 15:
                                    i.extra = O.jadegold.msg.quotation.pbv2.ExtraField.decode(t, t.uint32());
                                    break;
                                case 128:
                                    i.inner = O.jadegold.msg.quotation.pbv2.ServerInnerField.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            if ("object" !== typeof t || null === t)
                                return "object expected";
                            if (null != t.code && t.hasOwnProperty("code") && !A.isString(t.code))
                                return "code: string expected";
                            if (null != t.freq && t.hasOwnProperty("freq"))
                                switch (t.freq) {
                                default:
                                    return "freq: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                case 10:
                                case 11:
                                case 12:
                                    break
                                }
                            if (null != t.quoteTime && t.hasOwnProperty("quoteTime") && !A.isInteger(t.quoteTime) && !(t.quoteTime && A.isInteger(t.quoteTime.low) && A.isInteger(t.quoteTime.high)))
                                return "quoteTime: integer|Long expected";
                            if (null != t.volume && t.hasOwnProperty("volume") && !A.isInteger(t.volume) && !(t.volume && A.isInteger(t.volume.low) && A.isInteger(t.volume.high)))
                                return "volume: integer|Long expected";
                            if (null != t.freqTime && t.hasOwnProperty("freqTime") && !A.isInteger(t.freqTime) && !(t.freqTime && A.isInteger(t.freqTime.low) && A.isInteger(t.freqTime.high)))
                                return "freqTime: integer|Long expected";
                            if (null != t.turnOver && t.hasOwnProperty("turnOver") && "number" !== typeof t.turnOver)
                                return "turnOver: number expected";
                            if (null != t.rt && t.hasOwnProperty("rt")) {
                                let e = O.jadegold.msg.quotation.pbv2.RealtimeField.verify(t.rt);
                                if (e)
                                    return "rt." + e
                            }
                            if (null != t.open && t.hasOwnProperty("open") && "number" !== typeof t.open)
                                return "open: number expected";
                            if (null != t.high && t.hasOwnProperty("high") && "number" !== typeof t.high)
                                return "high: number expected";
                            if (null != t.low && t.hasOwnProperty("low") && "number" !== typeof t.low)
                                return "low: number expected";
                            if (null != t.close && t.hasOwnProperty("close") && "number" !== typeof t.close)
                                return "close: number expected";
                            if (null != t.posi && t.hasOwnProperty("posi") && "number" !== typeof t.posi)
                                return "posi: number expected";
                            if (null != t.preClose && t.hasOwnProperty("preClose") && "number" !== typeof t.preClose)
                                return "preClose: number expected";
                            if (null != t.settle && t.hasOwnProperty("settle") && "number" !== typeof t.settle)
                                return "settle: number expected";
                            if (null != t.extra && t.hasOwnProperty("extra")) {
                                let e = O.jadegold.msg.quotation.pbv2.ExtraField.verify(t.extra);
                                if (e)
                                    return "extra." + e
                            }
                            if (null != t.inner && t.hasOwnProperty("inner")) {
                                let e = O.jadegold.msg.quotation.pbv2.ServerInnerField.verify(t.inner);
                                if (e)
                                    return "inner." + e
                            }
                            return null
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.QuotationField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.QuotationField;
                            switch (null != t.code && (e.code = String(t.code)),
                            t.freq) {
                            case "REALTIME":
                            case 0:
                                e.freq = 0;
                                break;
                            case "INFO":
                            case 1:
                                e.freq = 1;
                                break;
                            case "TICK":
                            case 2:
                                e.freq = 2;
                                break;
                            case "MIN1":
                            case 3:
                                e.freq = 3;
                                break;
                            case "MIN5":
                            case 4:
                                e.freq = 4;
                                break;
                            case "MIN15":
                            case 5:
                                e.freq = 5;
                                break;
                            case "MIN30":
                            case 6:
                                e.freq = 6;
                                break;
                            case "MIN60":
                            case 7:
                                e.freq = 7;
                                break;
                            case "MIN120":
                            case 8:
                                e.freq = 8;
                                break;
                            case "MIN240":
                            case 9:
                                e.freq = 9;
                                break;
                            case "DAY1":
                            case 10:
                                e.freq = 10;
                                break;
                            case "WEEK1":
                            case 11:
                                e.freq = 11;
                                break;
                            case "MONTH1":
                            case 12:
                                e.freq = 12;
                                break
                            }
                            if (null != t.quoteTime && (A.Long ? (e.quoteTime = A.Long.fromValue(t.quoteTime)).unsigned = !1 : "string" === typeof t.quoteTime ? e.quoteTime = parseInt(t.quoteTime, 10) : "number" === typeof t.quoteTime ? e.quoteTime = t.quoteTime : "object" === typeof t.quoteTime && (e.quoteTime = new A.LongBits(t.quoteTime.low >>> 0,t.quoteTime.high >>> 0).toNumber())),
                            null != t.volume && (A.Long ? (e.volume = A.Long.fromValue(t.volume)).unsigned = !1 : "string" === typeof t.volume ? e.volume = parseInt(t.volume, 10) : "number" === typeof t.volume ? e.volume = t.volume : "object" === typeof t.volume && (e.volume = new A.LongBits(t.volume.low >>> 0,t.volume.high >>> 0).toNumber())),
                            null != t.freqTime && (A.Long ? (e.freqTime = A.Long.fromValue(t.freqTime)).unsigned = !1 : "string" === typeof t.freqTime ? e.freqTime = parseInt(t.freqTime, 10) : "number" === typeof t.freqTime ? e.freqTime = t.freqTime : "object" === typeof t.freqTime && (e.freqTime = new A.LongBits(t.freqTime.low >>> 0,t.freqTime.high >>> 0).toNumber())),
                            null != t.turnOver && (e.turnOver = Number(t.turnOver)),
                            null != t.rt) {
                                if ("object" !== typeof t.rt)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationField.rt: object expected");
                                e.rt = O.jadegold.msg.quotation.pbv2.RealtimeField.fromObject(t.rt)
                            }
                            if (null != t.open && (e.open = Number(t.open)),
                            null != t.high && (e.high = Number(t.high)),
                            null != t.low && (e.low = Number(t.low)),
                            null != t.close && (e.close = Number(t.close)),
                            null != t.posi && (e.posi = Number(t.posi)),
                            null != t.preClose && (e.preClose = Number(t.preClose)),
                            null != t.settle && (e.settle = Number(t.settle)),
                            null != t.extra) {
                                if ("object" !== typeof t.extra)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationField.extra: object expected");
                                e.extra = O.jadegold.msg.quotation.pbv2.ExtraField.fromObject(t.extra)
                            }
                            if (null != t.inner) {
                                if ("object" !== typeof t.inner)
                                    throw TypeError(".jadegold.msg.quotation.pbv2.QuotationField.inner: object expected");
                                e.inner = O.jadegold.msg.quotation.pbv2.ServerInnerField.fromObject(t.inner)
                            }
                            return e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (a.code = "",
                                a.freq = e.enums === String ? "REALTIME" : 0,
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.quoteTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.quoteTime = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.volume = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.volume = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.freqTime = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.freqTime = e.longs === String ? "0" : 0;
                                a.turnOver = 0,
                                a.rt = null,
                                a.open = 0,
                                a.high = 0,
                                a.low = 0,
                                a.close = 0,
                                a.posi = 0,
                                a.preClose = 0,
                                a.settle = 0,
                                a.extra = null,
                                a.inner = null
                            }
                            return null != t.code && t.hasOwnProperty("code") && (a.code = t.code),
                            null != t.freq && t.hasOwnProperty("freq") && (a.freq = e.enums === String ? O.jadegold.msg.quotation.pbv2.QuotationFreq[t.freq] : t.freq),
                            null != t.quoteTime && t.hasOwnProperty("quoteTime") && ("number" === typeof t.quoteTime ? a.quoteTime = e.longs === String ? String(t.quoteTime) : t.quoteTime : a.quoteTime = e.longs === String ? A.Long.prototype.toString.call(t.quoteTime) : e.longs === Number ? new A.LongBits(t.quoteTime.low >>> 0,t.quoteTime.high >>> 0).toNumber() : t.quoteTime),
                            null != t.volume && t.hasOwnProperty("volume") && ("number" === typeof t.volume ? a.volume = e.longs === String ? String(t.volume) : t.volume : a.volume = e.longs === String ? A.Long.prototype.toString.call(t.volume) : e.longs === Number ? new A.LongBits(t.volume.low >>> 0,t.volume.high >>> 0).toNumber() : t.volume),
                            null != t.freqTime && t.hasOwnProperty("freqTime") && ("number" === typeof t.freqTime ? a.freqTime = e.longs === String ? String(t.freqTime) : t.freqTime : a.freqTime = e.longs === String ? A.Long.prototype.toString.call(t.freqTime) : e.longs === Number ? new A.LongBits(t.freqTime.low >>> 0,t.freqTime.high >>> 0).toNumber() : t.freqTime),
                            null != t.turnOver && t.hasOwnProperty("turnOver") && (a.turnOver = e.json && !isFinite(t.turnOver) ? String(t.turnOver) : t.turnOver),
                            null != t.rt && t.hasOwnProperty("rt") && (a.rt = O.jadegold.msg.quotation.pbv2.RealtimeField.toObject(t.rt, e)),
                            null != t.open && t.hasOwnProperty("open") && (a.open = e.json && !isFinite(t.open) ? String(t.open) : t.open),
                            null != t.high && t.hasOwnProperty("high") && (a.high = e.json && !isFinite(t.high) ? String(t.high) : t.high),
                            null != t.low && t.hasOwnProperty("low") && (a.low = e.json && !isFinite(t.low) ? String(t.low) : t.low),
                            null != t.close && t.hasOwnProperty("close") && (a.close = e.json && !isFinite(t.close) ? String(t.close) : t.close),
                            null != t.posi && t.hasOwnProperty("posi") && (a.posi = e.json && !isFinite(t.posi) ? String(t.posi) : t.posi),
                            null != t.preClose && t.hasOwnProperty("preClose") && (a.preClose = e.json && !isFinite(t.preClose) ? String(t.preClose) : t.preClose),
                            null != t.settle && t.hasOwnProperty("settle") && (a.settle = e.json && !isFinite(t.settle) ? String(t.settle) : t.settle),
                            null != t.extra && t.hasOwnProperty("extra") && (a.extra = O.jadegold.msg.quotation.pbv2.ExtraField.toObject(t.extra, e)),
                            null != t.inner && t.hasOwnProperty("inner") && (a.inner = O.jadegold.msg.quotation.pbv2.ServerInnerField.toObject(t.inner, e)),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t.GoldDeliveryField = function() {
                        function t(t) {
                            if (t)
                                for (let e = Object.keys(t), a = 0; a < e.length; ++a)
                                    null != t[e[a]] && (this[e[a]] = t[e[a]])
                        }
                        return t.prototype.date = "",
                        t.prototype.direction = "",
                        t.prototype.buy = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.sell = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.midBuy = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.prototype.midSell = A.Long ? A.Long.fromBits(0, 0, !1) : 0,
                        t.create = function(e) {
                            return new t(e)
                        }
                        ,
                        t.encode = function(t, e) {
                            return e || (e = w.create()),
                            null != t.date && Object.hasOwnProperty.call(t, "date") && e.uint32(10).string(t.date),
                            null != t.direction && Object.hasOwnProperty.call(t, "direction") && e.uint32(18).string(t.direction),
                            null != t.buy && Object.hasOwnProperty.call(t, "buy") && e.uint32(24).int64(t.buy),
                            null != t.sell && Object.hasOwnProperty.call(t, "sell") && e.uint32(32).int64(t.sell),
                            null != t.midBuy && Object.hasOwnProperty.call(t, "midBuy") && e.uint32(40).int64(t.midBuy),
                            null != t.midSell && Object.hasOwnProperty.call(t, "midSell") && e.uint32(48).int64(t.midSell),
                            e
                        }
                        ,
                        t.encodeDelimited = function(t, e) {
                            return this.encode(t, e).ldelim()
                        }
                        ,
                        t.decode = function(t, e) {
                            t instanceof E || (t = E.create(t));
                            let a = void 0 === e ? t.len : t.pos + e
                              , i = new O.jadegold.msg.quotation.pbv2.GoldDeliveryField;
                            while (t.pos < a) {
                                let e = t.uint32();
                                switch (e >>> 3) {
                                case 1:
                                    i.date = t.string();
                                    break;
                                case 2:
                                    i.direction = t.string();
                                    break;
                                case 3:
                                    i.buy = t.int64();
                                    break;
                                case 4:
                                    i.sell = t.int64();
                                    break;
                                case 5:
                                    i.midBuy = t.int64();
                                    break;
                                case 6:
                                    i.midSell = t.int64();
                                    break;
                                default:
                                    t.skipType(7 & e);
                                    break
                                }
                            }
                            return i
                        }
                        ,
                        t.decodeDelimited = function(t) {
                            return t instanceof E || (t = new E(t)),
                            this.decode(t, t.uint32())
                        }
                        ,
                        t.verify = function(t) {
                            return "object" !== typeof t || null === t ? "object expected" : null != t.date && t.hasOwnProperty("date") && !A.isString(t.date) ? "date: string expected" : null != t.direction && t.hasOwnProperty("direction") && !A.isString(t.direction) ? "direction: string expected" : null == t.buy || !t.hasOwnProperty("buy") || A.isInteger(t.buy) || t.buy && A.isInteger(t.buy.low) && A.isInteger(t.buy.high) ? null == t.sell || !t.hasOwnProperty("sell") || A.isInteger(t.sell) || t.sell && A.isInteger(t.sell.low) && A.isInteger(t.sell.high) ? null == t.midBuy || !t.hasOwnProperty("midBuy") || A.isInteger(t.midBuy) || t.midBuy && A.isInteger(t.midBuy.low) && A.isInteger(t.midBuy.high) ? null == t.midSell || !t.hasOwnProperty("midSell") || A.isInteger(t.midSell) || t.midSell && A.isInteger(t.midSell.low) && A.isInteger(t.midSell.high) ? null : "midSell: integer|Long expected" : "midBuy: integer|Long expected" : "sell: integer|Long expected" : "buy: integer|Long expected"
                        }
                        ,
                        t.fromObject = function(t) {
                            if (t instanceof O.jadegold.msg.quotation.pbv2.GoldDeliveryField)
                                return t;
                            let e = new O.jadegold.msg.quotation.pbv2.GoldDeliveryField;
                            return null != t.date && (e.date = String(t.date)),
                            null != t.direction && (e.direction = String(t.direction)),
                            null != t.buy && (A.Long ? (e.buy = A.Long.fromValue(t.buy)).unsigned = !1 : "string" === typeof t.buy ? e.buy = parseInt(t.buy, 10) : "number" === typeof t.buy ? e.buy = t.buy : "object" === typeof t.buy && (e.buy = new A.LongBits(t.buy.low >>> 0,t.buy.high >>> 0).toNumber())),
                            null != t.sell && (A.Long ? (e.sell = A.Long.fromValue(t.sell)).unsigned = !1 : "string" === typeof t.sell ? e.sell = parseInt(t.sell, 10) : "number" === typeof t.sell ? e.sell = t.sell : "object" === typeof t.sell && (e.sell = new A.LongBits(t.sell.low >>> 0,t.sell.high >>> 0).toNumber())),
                            null != t.midBuy && (A.Long ? (e.midBuy = A.Long.fromValue(t.midBuy)).unsigned = !1 : "string" === typeof t.midBuy ? e.midBuy = parseInt(t.midBuy, 10) : "number" === typeof t.midBuy ? e.midBuy = t.midBuy : "object" === typeof t.midBuy && (e.midBuy = new A.LongBits(t.midBuy.low >>> 0,t.midBuy.high >>> 0).toNumber())),
                            null != t.midSell && (A.Long ? (e.midSell = A.Long.fromValue(t.midSell)).unsigned = !1 : "string" === typeof t.midSell ? e.midSell = parseInt(t.midSell, 10) : "number" === typeof t.midSell ? e.midSell = t.midSell : "object" === typeof t.midSell && (e.midSell = new A.LongBits(t.midSell.low >>> 0,t.midSell.high >>> 0).toNumber())),
                            e
                        }
                        ,
                        t.toObject = function(t, e) {
                            e || (e = {});
                            let a = {};
                            if (e.defaults) {
                                if (a.date = "",
                                a.direction = "",
                                A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.buy = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.buy = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.sell = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.sell = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.midBuy = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.midBuy = e.longs === String ? "0" : 0;
                                if (A.Long) {
                                    let t = new A.Long(0,0,!1);
                                    a.midSell = e.longs === String ? t.toString() : e.longs === Number ? t.toNumber() : t
                                } else
                                    a.midSell = e.longs === String ? "0" : 0
                            }
                            return null != t.date && t.hasOwnProperty("date") && (a.date = t.date),
                            null != t.direction && t.hasOwnProperty("direction") && (a.direction = t.direction),
                            null != t.buy && t.hasOwnProperty("buy") && ("number" === typeof t.buy ? a.buy = e.longs === String ? String(t.buy) : t.buy : a.buy = e.longs === String ? A.Long.prototype.toString.call(t.buy) : e.longs === Number ? new A.LongBits(t.buy.low >>> 0,t.buy.high >>> 0).toNumber() : t.buy),
                            null != t.sell && t.hasOwnProperty("sell") && ("number" === typeof t.sell ? a.sell = e.longs === String ? String(t.sell) : t.sell : a.sell = e.longs === String ? A.Long.prototype.toString.call(t.sell) : e.longs === Number ? new A.LongBits(t.sell.low >>> 0,t.sell.high >>> 0).toNumber() : t.sell),
                            null != t.midBuy && t.hasOwnProperty("midBuy") && ("number" === typeof t.midBuy ? a.midBuy = e.longs === String ? String(t.midBuy) : t.midBuy : a.midBuy = e.longs === String ? A.Long.prototype.toString.call(t.midBuy) : e.longs === Number ? new A.LongBits(t.midBuy.low >>> 0,t.midBuy.high >>> 0).toNumber() : t.midBuy),
                            null != t.midSell && t.hasOwnProperty("midSell") && ("number" === typeof t.midSell ? a.midSell = e.longs === String ? String(t.midSell) : t.midSell : a.midSell = e.longs === String ? A.Long.prototype.toString.call(t.midSell) : e.longs === Number ? new A.LongBits(t.midSell.low >>> 0,t.midSell.high >>> 0).toNumber() : t.midSell),
                            a
                        }
                        ,
                        t.prototype.toJSON = function() {
                            return this.constructor.toObject(this, M.util.toJSONOptions)
                        }
                        ,
                        t
                    }(),
                    t
                }(),
                t
            }(),
            t
        }(),
        t
    }
    )();
    /*'{"msgid":32,"seq":0,"request":{"auth":{"apptype":"nhwebquo","token":new Uint8Array([58, 218, 114, 202, 157, 116, 222, 214, 236, 3, 231, 135, 212, 193, 194, 108, 232, 12, 187, 173, 103, 219, 118, 115, 41, 120, 121, 10, 93, 179, 186, 251])}},"jsonReq":null}'*/

    let {QuoteMsgID: Y, QuotationFreq: X, QuotationMsg: _} = O.jadegold.msg.quotation.pbv2;
	
	let e = t=>_.toObject(_.decode(new Uint8Array(tt)), {longs: Number});
	
				
                  let  i = e(tt);
                        let {msgid: r, seq: n, response: s=[], jsonResp: o} = i;
                        //console.log(msgid);
				return JSON.stringify(i)
}