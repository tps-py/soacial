// Generated by LiveScript 1.3.1
var slice$ = [].slice;
(function(){
  var make, handler, preset, ldBar;
  make = {
    head: function(viewBox){
      return "data:image/svg+xml,<?xml version=\"1.0\"?><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"" + viewBox + "\">";
    },
    gradient: function(dir, dur){
      var colors, ret, len, x, y, i$, i, idx;
      dir == null && (dir = 45);
      dur == null && (dur = 1);
      colors = slice$.call(arguments, 2);
      ret = [this.head("60 33.3 60 33.3")];
      len = colors.length * 3 + 1;
      dir = dir * Math.PI / 180;
      x = Math.cos(dir);
      y = Math.sin(dir);
      ret.push("<defs><linearGradient id=\"gradient\" x1=\"0\" x2=\"" + x + "\" y1=\"0\" y2=\"" + y + "\">");
      for (i$ = 0; i$ < len; ++i$) {
        i = i$;
        idx = i * 100 / (len - 1);
        ret.push("<stop offset=\"" + idx + "%\" stop-color=\"" + colors[i % colors.length] + "\"/>");
      }
      ret.push(["</linearGradient></defs>", "<rect x=\"0\" y=\"0\" width=\"180\" height=\"100\" fill=\"url(#gradient)\">", "<animateTransform attributeName=\"transform\" type=\"translate\" from=\"-" + x * 30 + ",-" + y * 16.7 + "\" ", "to=\"" + x * 30 + "," + y * 16.7 + "\" dur=\"" + dur + "s\" repeatCount=\"indefinite\"/></rect></svg>"].join(""));
      return ret.join("");
    },
    stripe: function(c1, c2, dur){
      var ret, i;
      c1 == null && (c1 = '#b4b4b4');
      c2 == null && (c2 = '#e6e6e6');
      dur == null && (dur = 1);
      ret = [this.head("0 0 200 100")];
      ret = ret.concat([
        "<rect fill=\"" + c2 + "\" width=\"300\" height=\"100\"/>", "<g><g>", (function(){
          var i$, results$ = [];
          for (i$ = 0; i$ < 13; ++i$) {
            i = i$;
            results$.push(("<polygon fill=\"" + c1 + "\" ") + ("points=\"" + (-90 + i * 20) + ",100 " + (-100 + i * 20) + ",") + ("100 " + (-60 + i * 20) + ",0 " + (-50 + i * 20) + ",0 \"/>"));
          }
          return results$;
        }()).join(""), "</g><animateTransform attributeName=\"transform\" type=\"translate\" ", "from=\"0,0\" to=\"20,0\" dur=\"" + dur + "s\" repeatCount=\"indefinite\"/></g></svg>"
      ].join(""));
      return ret;
    },
    bubble: function(c1, c2, count, dur){
      var ret, i$, i, idx, x, r;
      c1 == null && (c1 = '#39d');
      c2 == null && (c2 = '#9cf');
      count == null && (count = 10);
      dur == null && (dur = 1);
      ret = [this.head("0 0 200 200"), "<rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"" + c1 + "\"/>"];
      for (i$ = 0; i$ < count; ++i$) {
        i = i$;
        idx = -(i / count) * dur;
        x = Math.random() * 184 + 8;
        r = Math.random() * 6 + 2;
        ret.push(["<circle cx=\"" + x + "\" cy=\"0\" r=\"" + r + "\" fill=\"none\" stroke=\"" + c2 + "\" stroke-width=\"1\">", "<animate attributeName=\"cy\" values=\"208;-8\" times=\"0;1\" ", "dur=\"" + dur * (1 + Math.random() * 0.5) + "s\" begin=\"" + idx + "s\" repeatCount=\"indefinite\"/>", "</circle>"].join(""));
      }
      return ret.join("") + "</svg>";
    }
  };
  handler = {
    queue: {},
    running: false,
    main: function(timestamp){
      var keepon, removed, k, ref$, func, ret, this$ = this;
      keepon = false;
      removed = [];
      for (k in ref$ = this.queue) {
        func = ref$[k];
        ret = func(timestamp);
        if (!ret) {
          removed.push(func);
        }
        keepon = keepon || ret;
      }
      for (k in ref$ = this.queue) {
        func = ref$[k];
        if (removed.indexOf(func) >= 0) {
          delete this.queue[k];
        }
      }
      if (keepon) {
        return requestAnimationFrame(function(it){
          return this$.main(it);
        });
      } else {
        return this.running = false;
      }
    },
    add: function(key, f){
      var this$ = this;
      if (!this.queue[key]) {
        this.queue[key] = f;
      }
      if (!this.running) {
        this.running = true;
        return requestAnimationFrame(function(it){
          return this$.main(it);
        });
      }
    }
  };
  preset = {
    rainbow: {
      "type": 'stroke',
      "path": 'M10 10L90 10',
      "stroke": 'data:ldbar/res,gradient(0,1,#a551df,#fd51ad,#ff7f82,#ffb874,#ffeb90)'
    },
    energy: {
      "type": 'fill',
      "path": 'M15 5L85 5A5 5 0 0 1 85 15L15 15A5 5 0 0 1 15 5',
      "stroke": '#f00',
      "fill": 'data:ldbar/res,gradient(45,2,#4e9,#8fb,#4e9)',
      "fill-dir": "ltr",
      "fill-background": '#444',
      "fill-background-extrude": 1
    },
    stripe: {
      "type": 'fill',
      "path": 'M15 5L85 5A5 5 0 0 1 85 15L15 15A5 5 0 0 1 15 5',
      "stroke": '#f00',
      "fill": 'data:ldbar/res,stripe(#25b,#58e,1)',
      "fill-dir": "ltr",
      "fill-background": '#ddd',
      "fill-background-extrude": 1
    },
    text: {
      "type": 'fill',
      "img": "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"20\"><text x=\"35\" y=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\" font-family=\"arial\">LOADING</text></svg>",
      "fill-background-extrude": 1.3,
      "fill-dir": "ltr"
    },
    line: {
      "type": 'stroke',
      "path": 'M10 10L90 10',
      "stroke": '#25b',
      "stroke-width": 3,
      "stroke-trail": '#ddd',
      "stroke-trail-width": 1
    },
    fan: {
      "type": 'stroke',
      "path": 'M10 90A40 40 0 0 1 90 90',
      "fill-dir": 'btt',
      "fill": '#25b',
      "fill-background": '#ddd',
      "fill-background-extrude": 3,
      "stroke-dir": 'normal',
      "stroke": '#25b',
      "stroke-width": '3',
      "stroke-trail": '#ddd',
      "stroke-trail-width": 0.5
    },
    circle: {
      "type": 'stroke',
      "path": 'M50 10A40 40 0 0 1 50 90A40 40 0 0 1 50 10',
      "fill-dir": 'btt',
      "fill": '#25b',
      "fill-background": '#ddd',
      "fill-background-extrude": 3,
      "stroke-dir": 'normal',
      "stroke": '#25b',
      "stroke-width": '3',
      "stroke-trail": '#ddd',
      "stroke-trail-width": 0.5
    },
    bubble: {
      "type": 'fill',
      "path": 'M50 10A40 40 0 0 1 50 90A40 40 0 0 1 50 10',
      "fill-dir": 'btt',
      "fill": 'data:ldbar/res,bubble(#39d,#cef)',
      "fill-background": '#ddd',
      "fill-background-extrude": 3,
      "stroke-dir": 'normal',
      "stroke": '#25b',
      "stroke-width": '3',
      "stroke-trail": '#ddd',
      "stroke-trail-width": 0.5
    }
  };
  window.ldBar = ldBar = function(selector, option){
    var root, that, cls, id, domTree, newNode, x$, config, k, v, isStroke, parseRes, dom, svg, text, group, length, path0, path1, patimg, this$ = this;
    option == null && (option = {});
    root = typeof selector === typeof "" ? document.querySelector(selector) : selector;
    if (that = root.ldBar) {
      return that;
    }
    cls = root.getAttribute('class');
    if (!cls.indexOf('ldBar')) {
      root.setAttribute('class', cls + " ldBar");
    }
    id = "ldBar-" + Math.random().toString(16).substring(2);
    id = {
      key: id,
      clip: id + "-clip",
      filter: id + "-filter",
      pattern: id + "-pattern",
      mask: id + "-mask",
      maskPath: id + "-mask-path"
    };
    domTree = function(n, o){
      var k, v;
      n = newNode(n);
      for (k in o) {
        v = o[k];
        if (k !== 'attr') {
          n.appendChild(domTree(k, v || {}));
        }
      }
      n.attrs(o.attr || {});
      return n;
    };
    newNode = function(n){
      return document.createElementNS("http://www.w3.org/2000/svg", n);
    };
    x$ = document.body.__proto__.__proto__.__proto__;
    x$.text = function(t){
      return this.appendChild(document.createTextNode(t));
    };
    x$.attrs = function(o){
      var k, v, results$ = [];
      for (k in o) {
        v = o[k];
        results$.push(this.setAttribute(k, v));
      }
      return results$;
    };
    x$.styles = function(o){
      var k, v, results$ = [];
      for (k in o) {
        v = o[k];
        results$.push(this.style[k] = v);
      }
      return results$;
    };
    x$.append = function(n){
      var r;
      return this.appendChild(r = document.createElementNS("http://www.w3.og/2000/svg", n));
    };
    x$.attr = function(n, v){
      if (v != null) {
        return this.setAttribute(n, v);
      } else {
        return this.getAttribute(n);
      }
    };
    config = {
      "type": 'stroke',
      "img": '',
      "path": 'M10 10L90 10',
      "fill-dir": 'btt',
      "fill": '#25b',
      "fill-background": '#ddd',
      "fill-background-extrude": 3,
      "stroke-dir": 'normal',
      "stroke": '#25b',
      "stroke-width": '3',
      "stroke-trail": '#ddd',
      "stroke-trail-width": 0.5,
      "duration": 1,
      "easing": 'linear',
      "value": 0
    };
    config.preset = root.attr("data-preset") || option["preset"];
    if (config.preset != null) {
      import$(config, preset[config.preset]);
    }
    (function(){
      var ref$, results$ = [];
      for (k in ref$ = config) {
        v = ref$[k];
        results$.push({
          k: k,
          v: v
        });
      }
      return results$;
    }()).map(function(it){
      return [it.k, root.attr("data-" + it.k)];
    }).filter(function(it){
      return it[1];
    }).map(function(it){
      return config[it[0]] = it[1];
    });
    if (config.img) {
      config.path = null;
    }
    import$(config, option);
    isStroke = config.type === 'stroke';
    parseRes = function(v){
      var parser, ret;
      parser = /data:ldbar\/res,([^()]+)\(([^)]+)\)/;
      ret = parser.exec(v);
      if (!ret) {
        return v;
      }
      return ret = make[ret[1]].apply(make, ret[2].split(','));
    };
    config.fill = parseRes(config.fill);
    config.stroke = parseRes(config.stroke);
    dom = {
      attr: {
        "xmlns:xlink": 'http://www.w3.org/1999/xlink',
        preserveAspectRatio: 'xMidYMid'
      },
      defs: {
        filter: {
          attr: {
            id: id.filter,
            x: -1,
            y: -1,
            width: 3,
            height: 3
          },
          feMorphology: {
            attr: {
              operator: +config["fill-background-extrude"] >= 0 ? 'dilate' : 'erode',
              radius: Math.abs(+config["fill-background-extrude"])
            }
          },
          feColorMatrix: {
            attr: {
              values: '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0',
              result: "cm"
            }
          }
        },
        mask: {
          attr: {
            id: id.mask
          },
          image: {
            attr: {
              href: config.img,
              filter: "url(#" + id.filter + ")"
            }
          }
        },
        g: {
          mask: {
            attr: {
              id: id.maskPath
            },
            path: {
              attr: {
                d: config.path || "",
                fill: '#fff',
                stroke: '#fff',
                filter: "url(#" + id.filter + ")"
              }
            }
          }
        },
        clipPath: {
          attr: {
            id: id.clip
          },
          rect: {
            attr: {
              'class': 'mask'
            }
          }
        },
        pattern: {
          attr: {
            id: id.pattern,
            patternUnits: 'userSpaceOnUse'
          },
          image: {}
        }
      }
    };
    svg = domTree('svg', dom);
    text = document.createElement('div');
    text.setAttribute('class', 'ldBar-label');
    root.appendChild(svg);
    root.appendChild(text);
    group = [0, 0];
    length = 0;
    this.fit = function(){
      var box, d, rect;
      box = group[1].getBBox();
      d = Math.max.apply(null, ['stroke-width', 'stroke-trail-width', 'fill-background-extrude'].map(function(it){
        return config[it];
      })) * 1.5;
      svg.attrs({
        viewBox: [box.x - d, box.y - d, box.width + d * 2, box.height + d * 2].join(" ")
      });
      if (!root.style.width) {
        root.styles({
          width: (box.width + 3 * d) + "px"
        });
      }
      if (!root.style.height) {
        root.styles({
          height: (box.height + 3 * d) + "px"
        });
      }
      rect = group[0].querySelector('rect');
      if (rect) {
        return rect.attrs({
          x: box.x - d,
          y: box.y - d,
          width: box.width + d * 2,
          height: box.height + d * 2
        });
      }
    };
    if (config.path) {
      if (isStroke) {
        group[0] = domTree('g', {
          path: {
            attr: {
              d: config.path,
              fill: 'none',
              'class': 'baseline'
            }
          }
        });
      } else {
        group[0] = domTree('g', {
          rect: {
            attr: {
              x: 0,
              y: 0,
              width: '100%',
              height: '100%',
              mask: "url(#" + id.maskPath + ")",
              fill: config["fill-background"],
              'class': 'frame'
            }
          }
        });
      }
      svg.appendChild(group[0]);
      group[1] = domTree('g', {
        path: {
          attr: {
            d: config.path,
            'class': isStroke ? 'mainline' : 'solid',
            "clip-path": config.type === 'fill' ? "url(#" + id.clip + ")" : ''
          }
        }
      });
      svg.appendChild(group[1]);
      path0 = group[0].querySelector(isStroke ? 'path' : 'rect');
      path1 = group[1].querySelector('path');
      if (isStroke) {
        path1.attrs({
          fill: 'none'
        });
      }
      patimg = svg.querySelector('pattern image');
      patimg.addEventListener('load', function(){
        var box;
        box = patimg.getBBox();
        svg.querySelector('pattern').attrs({
          width: box.width,
          height: box.height
        });
        return patimg.attrs({
          width: box.width,
          height: box.height
        });
      });
      if (/.+\..+/.exec(!isStroke
        ? config.fill
        : config.stroke)) {
        patimg.attrs({
          href: !isStroke
            ? config.fill
            : config.stroke
        });
      }
      if (isStroke) {
        path0.attrs({
          stroke: config["stroke-trail"],
          "stroke-width": config["stroke-trail-width"]
        });
        path1.attrs({
          "stroke-width": config["stroke-width"],
          stroke: /.+\..+/.exec(config.stroke)
            ? "url(#" + id.pattern + ")"
            : config.stroke
        });
      }
      if (config.fill && !isStroke) {
        path1.styles({
          fill: /.+\..+/.exec(config.fill)
            ? "url(#" + id.pattern + ")"
            : config.fill
        });
      }
      length = path1.getTotalLength();
      this.fit();
      this.inited = true;
    } else if (config.img) {
      group[0] = domTree('g', {
        rect: {
          attr: {
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            mask: "url(#" + id.mask + ")",
            fill: config["fill-background"]
          }
        }
      });
      group[1] = domTree('g', {
        image: {
          attr: {
            href: config.img,
            'class': 'solid',
            "clip-path": config.type === 'fill' ? "url(#" + id.clip + ")" : ''
          }
        }
      });
      group[1].querySelector('image').addEventListener('load', function(){
        this$.fit();
        this$.set(undefined, false);
        return this$.inited = true;
      });
      svg.appendChild(group[0]);
      svg.appendChild(group[1]);
    }
    svg.attrs({
      width: '100%',
      height: '100%'
    });
    this.transition = {
      value: {
        src: 0,
        des: 0
      },
      time: {},
      handler: function(time){
        var ref$, dv, dt;
        if (this.time.src == null) {
          this.time.src = time;
        }
        ref$ = [this.value.des - this.value.src, time - this.time.src], dv = ref$[0], dt = ref$[1];
        text.textContent = Math.round(dv * dt / 1000 + this.value.src);
        if (dt > (+config["duration"] || 1) * 1000) {
          delete this.time.src;
          return false;
        }
        return true;
      },
      start: function(src, des){
        var ref$, this$ = this;
        ref$ = this.value;
        ref$.src = src;
        ref$.des = des;
        return handler.add(id.key, function(time){
          return this$.handler(time);
        });
      }
    };
    this.set = function(v, doTransition){
      var src, box, des, node, style, dir;
      doTransition == null && (doTransition = true);
      src = this.value || 0;
      box = group[1].getBBox();
      if (v != null) {
        this.value = v;
      } else {
        v = this.value;
      }
      des = this.value;
      if (isStroke) {
        node = path1;
        style = {
          "stroke-dasharray": config["stroke-dir"] === 'reverse'
            ? "0 " + length * (100 - v) * 0.01 + " " + length * v * 0.01 + " 0"
            : v * 0.01 * length + " " + ((100 - v) * 0.01 * length + 1)
        };
      } else {
        dir = config["fill-dir"];
        style = dir === 'btt' || !dir
          ? {
            y: box.y + box.height * (100 - v) * 0.01,
            height: box.height * v * 0.01,
            x: box.x,
            width: box.width
          }
          : dir === 'ttb'
            ? {
              y: box.y,
              height: box.height * v * 0.01,
              x: box.x,
              width: box.width
            }
            : dir === 'ltr'
              ? {
                y: box.y,
                height: box.height,
                x: box.x,
                width: box.width * v * 0.01
              }
              : dir === 'rtl' ? {
                y: box.y,
                height: box.height,
                x: box.x + box.width * (100 - v) * 0.01,
                width: box.width * v * 0.01
              } : void 8;
        node = svg.querySelector('rect');
      }
      if (!doTransition) {
        node.attrs({
          'class': node.attr('class') + ' notransition'
        });
      }
      node.styles(style);
      if (!doTransition) {
        svg.parentNode.offsetHeight;
      }
      if (!doTransition) {
        node.attrs({
          'class': node.attr('class').replace(/notransition/g, '').trim()
        });
      }
      return this.transition.start(src, des);
    };
    this.set(+config.value || 0, false);
    return this;
  };
  return window.addEventListener('load', function(){
    return Array.from(document.querySelectorAll('.ldBar')).forEach(function(it){
      return it.ldBar = new ldBar(it);
    });
  }, false);
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}