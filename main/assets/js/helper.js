class ElementCollection extends Array {
  ready(cb) {
    const isReady = this.some((e) => {
      return e.readyState != null && e.readyState != "loading";
    });
    if (isReady) {
      cb();
    } else {
      this.on("DOMContentLoaded", cb);
    }
    return this;
  }
  on(event, cbOrSelector, cb) {
    if (typeof cbOrSelector === "function") {
      this.forEach((e) => e.addEventListener(event, cbOrSelector));
    } else {
      this.forEach((elem) => {
        elem.addEventListener(event, (e) => {
          if (e.target.matches(cbOrSelector)) cb(e);
        });
      });
    }
    return this;
  }
  next() {
    return this.map((e) => e.nextElementSibling).filter((e) => e != null);
  }
  prev() {
    return this.map((e) => e.previousElementSibling).filter((e) => e != null);
  }
  removeClass(removeClass) {
    this.forEach((e) => e.classList.remove(removeClass));
    return this;
  }
  addClass(addClass) {
    this.forEach((e) => e.classList.add(addClass));
    return this;
  }
  html(value, single) {
    this.forEach((e) => (single == true ? (e.innerHTML = value) : (e.innerHTML += value)));
    return this;
  }
  css(property, value) {
    this.forEach((e) => e.style.setProperty(property, value));
    return this;
  }
  style(property) {
    this.forEach((e) => e.setAttribute("style", property));
    return this;
  }
  data(dataId, value) {
    const id = dataId?.replace(/(-[a-z])/, (g) => {
      return g.replace("-", "").toUpperCase();
    });
    this.forEach((e) => (e.dataset[id] = value));
    return this;
  }
  scroll(value) {
    this.forEach((e) => e.scrollIntoView({ behavior: value }));
    return this;
  }
  remove() {
    this.forEach((e) => e.remove());
    return this;
  }
  append(innerHTML, append) {
    const insert = append === "first" ? "afterbegin" : "beforeend";
    this.forEach((e) => e.insertAdjacentHTML(insert, innerHTML));
    return this;
  }
  appendAB(innerHTML, append) {
    const insert = append === "before" ? "beforebegin" : "afterend";
    this.forEach((e) => e.insertAdjacentHTML(insert, innerHTML));
    return this;
  }
  appendAoB(child, insert) {
    this.forEach((e) =>
      e.parentNode.insertBefore(child, insert === "before" ? e : e.nextSibling)
    );
    return this;
  }
  createChild(create) {
    this.forEach((e) => {
      if (typeof create != "undefined") {
        var $this = $create(create);
        if (e != null) e.appendChild($this);
      }
    });
    return this;
  }
  children() {
    this.forEach((e) => e.children);
    return this;
  }
  match(selector) {
    this.forEach((e) => e.matches(selector));
    return this;
  }
}
class AjaxPromise {
  constructor(promise) {
    this.promise = promise;
  }
  done(cb) {
    this.promise = this.promise.then((data) => {
      cb(data);
      return data;
    });
    return this;
  }
  fail(cb) {
    this.promise = this.promise.catch(cb);
    return this;
  }
  always(cb) {
    this.promise = this.promise.finally(cb);
    return this;
  }
}
function $Qs(param) {
  if (typeof param === "string" || param instanceof String) {
    return new ElementCollection(...document.querySelectorAll(param));
  } else {
    return new ElementCollection(param);
  }
}
$Qs.get = function ({ url, type, data, dataType, success = () => {} }) {
  const queryString =
    (data != undefined ? "?" : "") +
    Object.entries(data || {})
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

  return new AjaxPromise(
    fetch(url + queryString, {
      method: type || "GET",
      headers: {
        "Content-Type": dataType,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        success(data);
        return data;
      })
  );
};
function appendAOB(attributes, selector, insert = "before", useScrollTop) {
  (Element.prototype.appendAfterOrBefore = function (element) {
    if (element != null) {
      element.appendAoB(this, insert);
    }
  }),
    false;

  var NewElement = $create(attributes),
    $this = $Qs(selector);
  if (useScrollTop) {
    var onScroll = false;
    $Qs(window).on(
      "scroll",
      function () {
        ((0 != document.documentElement.scrollTop && false === onScroll) ||
          (0 != document.body.scrollTop && false === onScroll)) &&
          (!(function () {
            if (attributes?.customElement)
              (attributes?.element).appendAfterOrBefore($this);
            else NewElement.appendAfterOrBefore($this);
          })(),
          (onScroll = true));
      },
      true
    );
  } else {
    if (attributes?.customElement)
      (attributes?.element).appendAfterOrBefore($this);
    else NewElement.appendAfterOrBefore($this);
  }
}
// Element Functions
function $qs(selector) {
  var $this = document.querySelector(selector);
  if ($this != null) return $this;
}
function $qa(selectorAll) {
  var $this = document.querySelectorAll(selectorAll);
  return $this;
}
function getAttr(property, value) {
  return { property, value };
}
function $create(create) {
  const obj = (name) => create?.[name];
  // const iF = (name) => { if(obj(name)) return $this = obj(name) }
  if (typeof create != "undefined") {
    var $this = document.createElement(obj("tagName") || "div");
    if (obj("class")) $this.classList = obj("class");
    if (obj("id")) $this.id = obj("id");
    if (obj("style")) $this.setAttribute("style", obj("style"));
    if (obj("html")) $this.innerHTML = obj("html");
    // var attr = obj("attr");
    // if (typeof attr != "undefined")
    // 	$this.setAttribute(attr?.property, attr?.value);
    if (typeof obj("attr") != "undefined")
      obj("attr")?.map((load) => {
        if (load?.property != undefined)
          $this.setAttribute(load?.property, load?.value || "");
      });

    return $this;
  }
}
// Useful Helper function
function toCapitalized(words = String) {
  return words?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
}
function toUpperCapital(value, upperCase = false) {
  return upperCase == true ? value.toUpperCase() : toCapitalized(value);
}
function contains(value, valueContains) {
  return String(valueContains?.replace(/\,\s+/g, ","))
    .split(",")
    .filter((v) => value.match(v) != null && value.match(v)[0]).length;
}
function toArraySplit(classes, prefix = "", splitValue) {
  return classes.split(splitValue || " ").map((e) => prefix + e);
}
function href(url = "home") {
  var currentUrl = window.location.href,
    pathname = new URL(currentUrl).pathname,
    homeUrl = pathname.split("/")[0];
  return url === "current"
    ? currentUrl
    : url === "pathname"
    ? pathname
    : url === "home"
    ? homeUrl
    : "";
}
//StyleSheets
function StyleSheets(STYLE) {
  function getInlineStyle(inlineStyle) {
    var id = parseInt(Math.random() * 100000),
      getStyle = $create({ tagName: "style" }),
      head = document.getElementsByTagName("head")[0];
    getStyle.id = `pkb-blocks-${id}-inline-style`;
    getStyle.textContent = inlineStyle;
    head.appendChild(getStyle);
  }

  if (typeof STYLE != "undefined") {
    function replaceLTS(str) {
      return str?.replace(/(\r\n|\n|\r|\s\s+)/gi, "");
    }
    getInlineStyle(
      "".concat(
        iF(replaceLTS(STYLE?.xl)),
        iF(
          replaceLTS(STYLE?.lg),
          `@media only screen and (max-width: ${STYLE?.lgWidth || 999.98}px){`,
          "}"
        ),
        iF(
          replaceLTS(STYLE?.md),
          `@media only screen and (max-width: ${STYLE?.mdWidth || 767}px){`,
          "}"
        ),
        iF(
          replaceLTS(STYLE?.sm),
          `@media only screen and (max-width: ${STYLE?.smWidth || 480}px){`,
          "}"
        ),
        iF(
          replaceLTS(STYLE?.ssm),
          `@media only screen and (max-width: ${STYLE?.ssmWidth || 360}px){`,
          "}"
        )
      )
    );
  }
}
//Conditions
function iF(val, p = "", s = "", d = "") {
  return val ? p + val + s : d;
}
function elseIf(val, val2, o) {
  return val ? iF(o?.p) + val2 + iF(o?.s) : iF(o?.d);
}
// Animations
function $scrollToAction(selector, options, remove = true) {
  let qa = $qa(selector),
    style = options?.style,
    toStyle = typeof style != "undefined";
  $Qs(window).on("scroll", fadeIn);
  function fadeIn() {
    for (var i = 0; i < qa.length; i++) {
      var elem = qa[i];
      var distInView =
        elem.getBoundingClientRect().top - window.innerHeight + 20;
      if (distInView < 0) {
        if (options?.class) elem.classList.add(options?.class);
        if (options?.id) elem.id = options?.id;
        if (toStyle) elem.setAttribute("style", style?.add || "");
      } else {
        if (remove == true) {
          if (options?.class) elem.classList.remove(options?.class);
          if (options?.id) elem.id = "";
          if (toStyle) elem.setAttribute("style", style?.rm || "");
        }
      }
    }
  }
  fadeIn();
}
function $animateDelay(selector, ds = 3) {
  let s = String(selector)
      ?.replace(/\,\s+/g, ",")
      .split(/,(?!\d\d)/),
    qa = $qa(s[0]),
    arr = [...Array(qa.length).keys()],
    style = arr
      .map((i) => {
        let a = `#animate-fade-in:nth-child(${i + 1})`,
          $selector = [...s].map((v) => v + a).join(",");
        if (qa.length > 0)
          return (
            `${$selector} {` +
            `-webkit-animation-delay:.${ds + i}s;animation-delay:.${ds + i}s;}`
          );
      })
      .join("");
  return style?.toString();
}
function awaitLoading(func, counter = 5, to = 0) {
  function timeout(numCounter, endCounter) {
    let timerId;

    function run() {
      if (func?.start) {
        var d = $Qs(func?.selector);
        if (func?.useSkip == true)
          d.html(func?.innerHTML || "Skip after " + numCounter-- + "s");
        setTimeout(func?.start, 0);
      } else {
        //console.log(startFrom++);
        numCounter--;
      }

      if (numCounter < endCounter) {
        if (func?.start) {
          if (func?.useSkip == true) d.html("");
          var getFuncs = setTimeout(func?.ended, 0);
        } else {
          getFuncs = setTimeout(func, 0);
        }
        return getFuncs;
      }
      timerId = setTimeout(run, 1000);
    }
    run();
  }
  timeout(counter, to);
}
function getLabels(stringReplace) {
  var $content = String(stringReplace).toLowerCase();
  function replace(regex1, regex2) {
    var str = $content?.replace(regex1, "");
    str = str?.replace(regex2, "");
    return str;
  }
  // replace(/\b(?!anyWord|anyNumber)([^A-Za-z0-9]+|\S+)\b/g, /[^A-Za-z0-9]/g)
  function split(val) {
    var $value = $content.split(val)[1].split(" ")[0].split("</b>")[0];
    return $value?.replace(/\$/g, " ");
  }
  function contain(val) {
    return $content?.includes(val);
  }
  function span(val, className, upperCase) {
    return val.length > 0
      ? '<span class="' +
          className +
          '">' +
          toUpperCapital(val, upperCase) +
          "</span>"
      : "";
  }
  function getValue(valSplit, className, upperCase) {
    return contain(valSplit) ? span(split(valSplit), className, upperCase) : "";
  }
  function getMultiValue(valSplit, className, upperCase) {
    return contain(valSplit)
      ? [...split(valSplit).split(",")]
          .map((value) => span(value, className, upperCase))
          .join("")
      : "";
  }

  var $getBadgeTop =
      contain("{quality}=") || contain("{type}=")
        ? '<div class="absolute flex gap-1 z-[5] left-[5px] top-[5px]">' +
          getMultiValue("{type}=", "type") +
          getMultiValue("{quality}=", "quality", true) +
          "</div>"
        : "",
    file = (file) => span(split("{file}="), "file " + file, true),
    $getBadgeLeft = contain("{file}=dub")
      ? file("dub")
      : contain("{file}=sub")
      ? file("sub")
      : contain("{file}=raw")
      ? file("raw")
      : getValue("{year}=", "release"),
    $getBadgeRight = contain("{duration}=")
      ? span(split("{duration}="), "duration")
      : contain("{rating}=")
      ? span(parseFloat(split("{rating}=")) + "<sub> / 10</sub>", "rating")
      : getValue("{episode}=", "episode"),
    status = (status) => span(status, "ribbon " + status + " is-visible", true),
    $completed = replace(/(?![\{]completed\})./g, ""),
    $ongoing = replace(/(?![\{]ongoing\})./g, ""),
    $upcoming = replace(/(?![\{]upcoming\})./g, ""),
    $kh = replace(/(?![\{]khdub\})./g, ""),
    $cc = replace(/(?![\{]cc\})./g, ""),
    $getRibbon =
      contain("{completed}") && $completed.length > 0
        ? status("completed")
        : contain("{ongoing}") && $ongoing.length > 0
        ? status("ongoing")
        : contain("{upcoming}") && $upcoming.length > 0
        ? status("upcoming")
        : contain("{khdub}") && $kh.length > 0
        ? '<span class="ribbon khmer-dubbed is-visible">និយាយខ្មែរ</span>'
        : contain("{cc}") && $cc.length > 0
        ? '<span class="closed-caption"></span>'
        : "",
    $Labels = [$getBadgeTop, $getBadgeLeft, $getBadgeRight, $getRibbon];
  return $Labels;
}
function removeLabels(selector) {
  $(function () {
    $(selector).each(function () {
      var $this = $(this),
        $label = $this.text().trim(),
        $labels =
          "quality,type,file,year,duration,episode,rating,cc,completed,khdub,ongoing,upcoming";
      if (contains($label, $labels) > 0) return $this.remove();
    });
  });
}
