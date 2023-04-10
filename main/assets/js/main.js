$Qs("head").createChild({
  tagName: "link",
  attr: [
    getAttr("rel", "stylesheet"),
    getAttr("type", "text/css"),
    getAttr(
      "href",
      "https://fonts.googleapis.com/css2?family=".concat(
        iF(
          settings("fontFamily"),
          "",
          "",
          "Poppins:wght@400;500;600;700;800;900"
        ),
        "&display=swap"
      )
    ),
  ],
});
function shortCodeHelper(a, e, s) {
  if (Array.isArray(a)) {
    for (e = 0, s = Array(a.length); e < a.length; e++) s[e] = a[e];
    return s;
  }
  return Array.from(a);
}
function preShortCode(a, e, s) {
  return (
    !!(a = []
      .concat(shortCodeHelper(a.matchAll(/(?:(#[a-zA-Z]{0,})=\(([^\)]+)\))/g)))
      .find(function (a) {
        return a[1].split("#")[1] === e;
      })) && a[2]
  );
}
function scrollToElement(element, cb) {
  $(window)
    .on("load resize scroll", function global() {
      $(window).scrollTop() + $(window).height() >= element.offset().top &&
        ($(window).off("load resize scroll", global), cb);
    })
    .trigger("scroll");
}
function selectorOjb(selector, cloneSelector) {
  return { selector, cloneSelector };
}
function settings(name, postNumber) {
  return postNumber == true
    ? themeSettings?.postNumber?.[name]
    : themeSettings?.[name];
}
function message(name) {
  return messages?.[name];
}
function timeout(func, second) {
  setTimeout(func, Number(second || 5) * 1000);
}
function slider(selector) {
  if ($qs(selector) != null) slider();
  async function slider() {
    const showScroll = (slidesToShow, slidesToScroll) => ({
      slidesToShow,
      slidesToScroll,
    });
    const includes = (val) => selector?.includes(val);
    const responsive = (lg, md, sm) => ({
      responsive: [
        {
          breakpoint: 999.98,
          settings: {
            ...(lg || showScroll(4, 4)),
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            ...(md || showScroll(3, 3)),
          },
        },
        {
          breakpoint: 480,
          settings: {
            ...(sm || showScroll(2, 2)),
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
    const slideOption = includes(".responsive")
      ? {
          dots: true,
          infinite: false,
          speed: 300,
          ...showScroll(4, 4),
          arrows: false,
          ...responsive(),
        }
      : includes(".autoplay")
      ? {
          ...showScroll(4, 1),
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
        }
      : includes(".multiple")
      ? {
          infinite: true,
          ...showScroll(5, 1),
          arrows: false,
          ...responsive(showScroll(5, 5), showScroll(5, 5), showScroll(4, 4)),
        }
      : "";
    await $(selector).slick(slideOption);
  }
}
$(function () {
  function cloneElement(selector, cloneSelector) {
    $(selector).each(function () {
      var a = $(this);
      $(cloneSelector).clone().appendTo(a);
    });
  }
  function noResults() {
    return (
      '<span class="error-status"><b>Error:</b>&nbsp;' +
      message("noResults") +
      "</span>"
    );
  }
  function getLink(feed, i) {
    return feed[i].link;
  }
  function getTitle(feed, i) {
    return feed[i].title;
  }
  function getThumb(feed, i) {
    return feed[i].thumbnail.src;
  }
  function getAuthorImg(feed, i) {
    return feed[i].authorimage;
  }
  function getThumbType(feed, i) {
    return feed[i].thumbnail.type;
  }
  function getDate(feed, i) {
    return feed[i].date;
  }
  function getDateTime(feed, i) {
    return feed[i].datetime;
  }
  function getAuthor(feed, i) {
    return feed[i].author;
  }
  function getCate(feed, i) {
    return feed[i].category;
  }
  function getId(feed, i) {
    return feed[i]?.id;
  }
  function getSnippet(feed, i) {
    return feed[i]?.snippet;
  }
  function avatar(feed, i, s) {
    return (
      (s = feed[i].author[0].gd$image.src.replace(
        "/s220",
        "/w55-h55-p-k-no-nu"
      )),
      (blankImg =
        "//1.bp.blogspot.com/-QN2lgvtYZco/YN3mUSryAVI/AAAAAAAAADs/KrR-etCcvUMcPl06jopTs9pzq59IAXhMQCLcBGAsYHQ/w72-h72-p-k-no-nu/avatar.jpg"),
      (s = s
        .replace("//img1.blogblog.com/img/blank.gif", blankImg)
        .replace("//img1.blogblog.com/img/b16-rounded.gif", blankImg))
    );
  }
  function searchPosts() {
    $(".search-section").each(function (a, e, s, t, i) {
      var o = $(this);
      (s = "search"),
        (i =
          "/search/?q=" +
          (t = $(".search-form .search-input").val().trim()) +
          "&max-results=6");
      "" != t &&
        t != localStorage.search_id &&
        ((localStorage.search_id = t), b(o, "4", "search", s, t, i));
    });
  }
  function postCard() {
    $(".post-body a").each(function (a, e, s, t) {
      var $this = $(this);
      "post" == preShortCode((t = $this.text()).toLowerCase().trim(), "type") &&
        ($this.removeAttr("href"),
        (t = 0 != (t = preShortCode(t, "title")) ? t : "You Might Like"),
        $(window)
          .on("load resize scroll", function global() {
            $(window).scrollTop() + $(window).height() >= i.offset().top &&
              ($(window).off("load resize scroll", global),
              v($this, "1", "random", "card", t));
          })
          .trigger("scroll"));
    });
  }
  function postAds() {
    $(".inpost-ad").each(function () {
      var a = $("#ads-top").text();
      $(this).html('<div class="widget">' + a + "</div>");
    });
  }
  function v(s, t, i, o, n) {
    ("block1" != o &&
      "block2" != o &&
      "block3" != o &&
      "video" != o &&
      "grid1" != o) ||
      (i.match("recent", "random")
        ? ((e = showMoreText),
          (e = "" != e ? e : message("showMore")),
          s
            .parent()
            .find(".widget-title")
            .append('<a class="simple-viewmore" href="/search">' + e + "</a>"))
        : ((e = showMoreText),
          (e = "" != e ? e : message("showMore")),
          s
            .parent()
            .find(".widget-title")
            .append(
              '<a class="simple-viewmore" href="/search/label/' +
                i +
                '">' +
                e +
                "</a>"
            ))),
      "trending" == o ||
      "featured" == o ||
      "block1" == o ||
      "block2" == o ||
      "block3" == o ||
      "video" == o ||
      "grid1" == o ||
      "related" == o ||
      "card" == o ||
      "sidebar" == o ||
      "comments" == o
        ? b(s, t, i, o, n)
        : s.html(noResults());
  }
  function g(postNum, keyLabel, postSearch, t) {
    var i = Math.floor(Math.random() * postNum + 1),
      $getKey = String(keyLabel);
    return (
      $getKey.match("recent")
        ? (t = "/search/?amp=1&max-results=" + postNum)
        : $getKey.match("random")
        ? (t = "/search/?amp=1&start-index=" + i + "&max-results=" + postNum)
        : $getKey.match("search")
        ? (t = "/search/?q=" + postSearch + "&by-date=true&max-results=5&amp=1")
        : $getKey.match("show")
        ? (t = "/feeds/comments/default?alt=json&max-results=" + postNum)
        : ($getKey.match("random") &&
            $getKey.match("recent") &&
            $getKey.match("search")) ||
          (t = "/search/label/" + $getKey + "?amp=1&max-results=" + postNum),
      t
    );
  }
  function b(e, c, m, f, u, v) {
    $.ajax({
      type: "GET",
      url: g(c, m, u),
      cache: !0,
      dataType: "comments" == f ? "json" : "html",
      beforeSend: function (a) {
        switch (f) {
          case "megamenu":
            e
              .append('<div class="my-menu"><div class="loading-icon"/></div>')
              .addClass("loaded"),
              e.addClass("mega-menu");
            break;
          case "trending":
            e.html('<div class="loading-icon"/>')
              .parent()
              .find(".widget-content")
              .addClass("open-iki");
            break;
          case "search":
          case "featured":
          case "block1":
          case "block2":
          case "block3":
          case "grid1":
          case "video":
          case "sidebar":
          case "comments":
          case "related":
          case "card":
            e.html('<div class="loading-icon"/>')
              .parent()
              .addClass("type-" + f + " open-iki");
        }
      },
      success: function (c) {
        var m = "";
        switch (f) {
          case "megamenu":
            m += '<div class="my-menu"><div class="mega-posts-wrapper">';
            break;
          case "trending":
            m += '<div class="breaking-ticker">';
            break;
          case "search":
            m += '<div class="my-ajax">';
            break;
          case "featured":
            m += '<div class="featured-posts-wrapper">';
            break;
          case "block1":
            m +=
              '<div class="block-posts-wrapper block-style-one ' +
              gridPost() +
              '">';
            break;
          case "block2":
            m += '<div class="block-posts-wrapper block-style-two">';
            break;
          case "block3":
            m += '<div class="square-wrapper ' + gridPost() + '">';
            break;
          case "video":
            m += '<div class="video-wrapper flex flex-col gap-4">';
            break;
          case "grid1":
            m += '<div class="slider slider-posts-wrapper responsive">';
            break;
          case "sidebar":
            m += '<div class="sidebar-wrapper ' + sidebarGrid() + '">';
            break;
          case "comments":
            m += '<div class="comment-list">';
            break;
          case "related":
            m += '<div class="related-posts-wrapper ' + gridPost() + '">';
            break;
          case "card":
            m += '<div class="post-wrap">';
            break;
          default:
            m += "<ul>";
        }
        var g =
          "comments" == f
            ? c.feed.entry
            : JSON.parse($(c).find("#native-feed").text()).feed.entry;
        // console.log(g);
        if (undefined != g) {
          for (var b = 0; b < g.length; b++) {
            if ("comments" === f) {
              var k = avatar(g, b),
                w = g[b].link[2].href,
                y = g[b].author[0].name.$t,
                x = g[b].title.$t ? g[b].title.$t : message("noTitle");
            }else {
              (w = getLink(g, b)), (x = getTitle(g, b));
              var C = getDate(g, b),
                T = getDateTime(g, b),
                S =
                  ((y = getAuthor(g, b)),
                  (k = getAuthorImg(g, b)),
                  getCate(g, b)),
                A = getThumb(g, b),
                M = getThumbType(g, b),
                PI = getId(g, b),
                PS = getSnippet(g, b),
                LB = getLabels(PS),
                allowLB = settings("allowStatus"),
                noLB = LB[1] || LB[2] ? statusBG("h-20") : statusBG(),
                AllLB =
                  allowLB == true ? LB[0] + LB[1] + LB[2] + LB[3] + noLB : "";
            }
            var z = "";
            function loadPosts(
              options,
              usePostTag = true,
              useClassFilter = true
            ) {
              const obj = (name) => options?.[name];
              var mClass = obj("mainClass"),
                lnClass = obj("linkClass"),
                spanClass = obj("spanClass"),
                disLabel = obj("disableLabel"),
                disAuthor = obj("disableLabel"),
                style = iF(options?.style, ' style="', '"'),
                html_ = "".concat(
                  obj("postSlider") == true
                    ? `<div class="post-slider-cloned"><div class="p-[0_5px_10px]">`
                    : "",
                  `<div class="${mClass} post post-id-${PI.substr(
                    -6
                  )} post-type`,
                  allowLB == true ? " has-status-labels" : "",
                  useClassFilter == true
                    ? iF(settings("classFilter"), " ")
                    : "",
                  `" data-post-id="${PI}">`,
                  `<div class="${mClass.split(" ")[0]}-thumb${obj(
                    "childClass"
                  )}">`,
                  `<a class="post-filter-inner ct-icons ${
                    iF(lnClass, "", " ") + M
                  }" href="${w}"${style}>`,
                  spanClass
                    ? `<span class="post-filter-link ${spanClass}">`
                    : "",
                  `<img class="snip-thumbnail" alt="${x}" data-src="${A}"/>`,
                  spanClass ? "</span>" : "",
                  `${disLabel == true ? statusBG() : AllLB}</a></div>`,
                  `<div class="${iF(
                    obj("boxClass"),
                    "",
                    "",
                    "entry-post-content"
                  )}">`,
                  usePostTag == true
                    ? `<div class="post-tag text-line1"><span>${S}</span></div>`
                    : "",
                  `<h2 class="entry-title"><a href="${w}">${x}</a></h2>`,
                  '<div class="post-snip">',
                  disAuthor == true
                    ? ""
                    : `<img class="post-author-image" src="${k}"/><span class="post-author">${y}</span>`,
                  `<span class="post-date">${C}</span></div>`,
                  obj("flexGhost") == true
                    ? '<div class="flex-[1_0_auto] !m-0"></div>'
                    : "",
                  "</div></div>",
                  obj("postSlider") == true ? "</div></div>" : ""
                );
              return html_;
            }
            switch (f) {
              case "megamenu":
                m += loadPosts({ mainClass: "mega-posts" }, false, false);
                break;
              case "trending":
                m += loadPosts(
                  {
                    mainClass: "tickerNews",
                    disableLabel: true,
                    disableAuthor: true,
                  },
                  false,
                  false
                );
                break;
              case "search":
                m += loadPosts({ mainClass: "search-box" }, false);
                break;
              case "featured":
                m += loadPosts({
                  mainClass: "featured-post relative block overflow-hidden",
                  childClass: " wrapper-absolute-element",
                  linkClass: "absolute-element",
                  disableLabel: true,
                });
                break;
              case "block1":
                m += loadPosts({
                  mainClass: "block-posts block-style-one " + gridPostSpan(),
                });
                break;
              case "block2":
                m +=
                  0 === b
                    ? loadPosts({
                        mainClass: "block-posts block-style-two ",
                      })
                    : (1 === b ? '<div class="block-posts-break">' : "") +
                      loadPosts({
                        mainClass: "block-posts block-style-two ",
                        disableLabel: true,
                      });
                break;
              case "block3":
                m += loadPosts({
                  mainClass: "square-posts " + gridPostSpan(),
                });
                break;
              case "video":
                var VIDEO = loadPosts(
                  {
                    mainClass:
                      "video-module" +
                      elseIf(
                        b < 1,
                        " relative overflow-hidden block wrapper-absolute-element",
                        {
                          d: " flex",
                        }
                      ),
                    linkClass: elseIf(b < 1, "absolute-element", {
                      d: "w-[100px] h-[100px] rounded-[10px_0_0_10px]",
                    }),
                    boxClass: elseIf(
                      b < 1,
                      "entry-post-feature-content absolute-after-element"
                    ),
                    spanClass: "video-nos",
                    disableLabel: true,
                  },
                  false
                );
                m +=
                  (1 === b
                    ? '<div class="video-box grid grid-cols-2 gap-4 md:grid-cols-1">'
                    : "") + VIDEO;
                break;
              case "grid1":
                m += loadPosts({
                  postSlider: true,
                  mainClass: "slider-posts",
                  spanClass: "background-layer",
                });
                break;
              case "comments":
                m += "".concat(
                  `<div class="comments-box"><a class="engine-link" href="${w}"> `,
                  `<span class="comment-image"><img class="snip-thumbnail" data-src="${k}"/></span> `,
                  `<div class="comment-hero"><h2 class="entry-title cmm-title">${y}</h2>`,
                  `<p class="comment-snippet">${x}</p></div></a></div>`
                );
                break;
              case "sidebar":
                m += loadPosts({
                  mainClass: "sidebar-posts " + sidebarGridSpan(),
                });
                break;
              case "related":
                m += loadPosts(
                  { mainClass: "related-posts " + gridPostSpan() },
                  false
                );
                break;
              case "card":
                m += "".concat(
                  `<div class="post-card"><div class="post-image"><a class="post-filter-link" href="${w}">`,
                  `<img class="snip-thumbnail" alt="${x}" data-src="${A}"/></a></div>`,
                  `<div class="entry-post-content"><div class="card-healine">${u}</div>`,
                  `<h2 class="entry-title"><a href="${w}">${x}</a></h2>`,
                  `<div class="post-snip"><span class=" post-author">${y}</span>`,
                  `<span class="post-date">${C}</span></div></div></div>`
                );
                break;
              default:
                e
                  .html('<div class="loading-icon"/>')
                  .parent()
                  .addClass("open-iki"),
                  (m += noResults()),
                  e.parent().html(m);
            }
          }
          m += z += "</ul>";
        } else if ("megamenu" === f)
          m = '<div class="my-menu">' + noResults() + "</div>";
        else m = noResults();
        function addLinkClass() {
          // const lnClass = iF(firsChild,'','>:first-child ') + "a.post-filter-inner"
          new LazyLoad({ elements_selector: ".snip-thumbnail" });
          // e.find(".snip-thumbnail").addClass("lazy-img");
        }
        switch (f) {
          case "megamenu":
            (m += "</div></div>"),
              e.addClass(f).find(".my-menu").replaceWith(m);
            timeout(addLinkClass, 0.3);
            break;
          // case "trending || block1 || block2 || block3 || video || grid1 || sidebar || related || featured comments || card":
          //   e.html(m), (m += "</div></div>");
          //   break;
          case "trending || featured comments || card":
            e.html(m), (m += "</div></div>");
            break;
          case "block1":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            break;
          case "block2":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            break;
          case "block3":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            break;
          case "video":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            break;
          case "grid1":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            slider(".slider-posts-wrapper.responsive");
            break;
          case "sidebar":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            break;
          case "related":
            e.html(m), (m += "</div></div>");
            timeout(addLinkClass, 0.3);
            break;
          case "search":
            e.html(m),
              (m += "</div>"),
              b > 0 &&
                e.append(
                  `'<div class="link-snip"><a href="${v}">${showMoreText}</a></div>`
                ) &&
                timeout(addLinkClass, 0.3);
            break;
          default:
            (m += "</div>"), e.html(m);
        }
        // if ("megamenu" === f)
        //   e.find("img.snip-thumbnail").lazyimg({ onScroll: !1 });
        // else e.find("img.snip-thumbnail").lazyimg();
      },
      error: function () {
        if ("megamenu" === f)
          e.append('<div class="my-menu">' + noResults() + "</div>");
        else e.html(noResults());
      },
    });
  }
  // $(".post-body b").each(function () {
  // 	var $this = $(this),
  // 		$type = $this.text().trim();
  // 	if ($type.match("{contactform}")) {
  // 		$this.replaceWith('<div class="contact-form"/>');
  // 		$(".contact-form").append($("#ContactForm1"));
  // 	}
  // 	if ($type.match("{leftsidebar}")) {
  // 		$("body").addClass("is-left");
  // 		$this.remove();
  // 	}
  // 	if ($type.match("{fullwidth}")) {
  // 		$("body").addClass("no-sidebar");
  // 		$this.remove();
  // 	}
  // 	if (
  // 		$type.match("{quality}") ||
  // 		$type.match("{type}") ||
  // 		$type.match("{file}") ||
  // 		$type.match("{year}") ||
  // 		$type.match("{duration}") ||
  // 		$type.match("{episode}") ||
  // 		$type.match("{rating}") ||
  // 		$type.match("{cc}") ||
  // 		$type.match("{completed}") ||
  // 		$type.match("{khdub}") ||
  // 		$type.match("{ongoing}") ||
  // 		$type.match("{upcoming}")
  // 	) {
  // 		$this.remove();
  // 	}
  // });
  $("a.simple-viewmore, .label-item a").attr("href", function ($this, href) {
    return href.replace(href, href + "?&max-results=" + settings("postPerPage"));
  });
  function k() {
    $("#feed-view, #sidebar-container").each(function () {
      1 == fixedSidebar &&
        $(this).theiaStickySidebar({
          containerSelector: "#center-container > .container",
          additionalMarginTop: 30,
          additionalMarginBottom: 30,
        });
    });
  }
  $(".original-menu li").each(function (e, s) {
    var t = $(this);
    if ((i = t.find("a").attr("href")).match("megamenu")) {
      var i;
      if (2 === (i = i.split("/")).length) (s = i[0]), (e = i[1]);
      (c = "recent" == e || "random" == e ? "/search" : "/search/label/" + e),
        t.children("a").attr("href", c),
        t.addClass("sub-has"),
        t.mouseenter(function () {
          t.hasClass("loaded") ||
            ("megamenu" == s
              ? b(t, 5, e, s)
              : t
                  .append('<div class="my-menu">' + noResults() + "</div>")
                  .addClass("loaded"));
        });
    }
  }),
    $(".ticker-pro .HTML .widget-content").each(function (a, e, s) {
      var t,
        i = $(this);
      if (2 === (t = (t = i.text().trim()).split("/")).length) {
        (s = t[0]), (e = t[1]);
        if ("trending" === s) a = 4;
        $(window)
          .on("load resize scroll", function t() {
            $(window).scrollTop() + $(window).height() >= i.offset().top &&
              ($(window).off("load resize scroll", t), v(i, a, e, s));
          })
          .trigger("scroll");
      }
    }),
    // slider(".breaking-ticker.multiple"),
    $("#search-flex").each(function () {
      $(".search-flex-close").on("click", function () {
        searchPosts();
      }),
        $(window).on("keydown", function (a) {
          13 == a.keyCode && searchPosts();
        });
    }),
    postCard(),
    $("#main-feature .HTML .widget-content").each(function (
      postNum,
      postLabel,
      blockType
    ) {
      var $this = $(this),
        $key = $this.text(),
        $getKey = $key.trim().split("/");
      function getBlockPostType() {
        (postNum = $getKey[0]),
          (blockType = $getKey[1]),
          (postLabel = $getKey[2]);
        return scrollToElement($this, v($this, postNum, postLabel, blockType));
      }
      if ($getKey.length === 3 && $key.match("featured")) {
        getBlockPostType();
      } else if ($key.match("block3")) {
        if (!isNaN($getKey[0])) getBlockPostType();
      }
    }),
    $("#hfeed-feature .HTML .widget-content").each(function (
      postNum,
      postLabel,
      blockType
    ) {
      var $this = $(this),
        $getKey = $this.text().trim().split("/");

      function scrollToElements() {
        $(window)
          .on("load resize scroll", function global() {
            $(window).scrollTop() + $(window).height() >= $this.offset().top &&
              ($(window).off("load resize scroll", global),
              v($this, postNum, postLabel, blockType));
          })
          .trigger("scroll");
      }
      if (2 === $getKey.length) {
        (blockType = $getKey[0]), (postLabel = $getKey[1]);
        switch (blockType) {
          case "block1":
            postNum = settings("block1", true) || 4;
          case "block2":
            postNum = settings("block2", true) || 5;
            break;
          case "video":
            postNum = settings("video", true) || 4;
            break;
          case "grid1":
            postNum = settings("grid1", true) || 8;
        }
        // $(window)
        //   .on("load resize scroll", function global() {
        //     $(window).scrollTop() + $(window).height() >= $this.offset().top &&
        //       ($(window).off("load resize scroll", global),
        //       v($this, postNum, postLabel, blockType));
        //   })
        //   .trigger("scroll");
        scrollToElements();
      }
    }),
    $(".sidebar .HTML .widget-content").each(function (
      postNum,
      postLabel,
      blockType
    ) {
      var $this = $(this),
        $key = $this.text(); // key text for showing block(ex: 4/sidebar/{label})
      if (contains($key, "sidebar,comments")) {
        var $getKey = $key.split("/");
        if (!isNaN($getKey[0])) {
          (postNum = $getKey[0]),
            (blockType = $getKey[1]),
            (postLabel = $getKey[2]);
          scrollToElement($this, v($this, postNum, postLabel, blockType));
        }
      }
    }),
    $(".related-posts").each(function (postNum, postLabel, blockType) {
      var $this = $(this);
      (postLabel = $this.find(".related-tag").attr("label")),
        (postNum = relatedPostsNum);
      scrollToElement($this, v($this, postNum, postLabel, "related"));
    });
  var w = new Date();
  w.setDate(w.getDate()),
    $(".date-format").html(
      "Today | " +
        w.getDate() +
        ", " +
        monthsName[w.getMonth()] +
        " " +
        w.getFullYear()
    ),
    $(".dark-toggle-flex").click(function () {
      localStorage.setItem(
        "mode",
        "darkmode" === localStorage.getItem("mode") ? "mydark" : "darkmode"
      ),
        $("#mainContent").addClass("dark"),
        $("#darkroom, #darkroom1, #darkroom2").each(function () {
          var a = $(this);
          "darkmode" === localStorage.getItem("mode")
            ? a.attr("src", a.attr("data-dark"))
            : ($("#mainContent").removeClass("dark"),
              a.attr("src", a.attr("data-normal")));
        });
    }),
    $("img.snip-thumbnail").addClass("lazy-img"),
    $("#original-menu").Menuiki(),
    $(".menu li").each(function () {
      0 < $(this).find("ul").length && $(this).addClass("drop-down");
    }),
    $("#mobile-menu").each(function () {
      var a = $(this);
      $("#original-menuList").clone().appendTo(a),
        $(".hamburger, .hide-mobile-menu").on("click", function () {
          $("body").toggleClass("spring-open");
        });
    }),
    $(".mobile-menu ul .mega-menu").removeClass("sub-tab"),
    $(".mobile-menu ul li a").on("click", function () {
      $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170);
    }),
    [
      { ...selectorOjb(".social-mobile", ".footer-primary ul.colorful-ico") },
      { ...selectorOjb(".footer-menu.mobile-menu", ".footer-outer ul") },
      { ...(themeSettings?.cloneElement || {}) },
    ].forEach((e) => {
      cloneElement(e.selector, e.cloneSelector);
    }),
    $(".search-button-flex").on("click", function () {
      (localStorage.search_id = ""),
        $("#search-flex").fadeIn(200).find("input").focus(),
        $("body").addClass("active-search");
    }),
    $(".overlay, #overlay-id").on("click", function () {
      $("body").removeClass("active-search spring-open");
    }),
    $("#header-wrapper .hamburger-container").each(function () {
      var a = $(this);
      if (1 == fixedMenu && 0 < a.length) {
        var e = $(document).scrollTop(),
          s = a.offset().top,
          t = a.height(),
          i = s + t + 50;
        $(window).scroll(function () {
          var o = $(document).scrollTop();
          o < $("#footer-section").offset().top - t &&
            (o > i ? a.addClass("fixed-nos") : a.removeClass("fixed-nos"),
            o > e ? a.removeClass("show") : a.addClass("show"),
            (e = $(document).scrollTop()));
        });
      }
    }),
    $("#load-more-link").each(function () {
      var a = $(this).data("load");
      a && $("#load-more-link").show(),
        $("#load-more-link").on("click", function (e) {
          $("#load-more-link").hide(),
            $.ajax({
              url: a,
              success: function (e) {
                var s = $(e).find(".grid-posts");
                s
                  .find(".grid-posts article.post")
                  .addClass("loading-frame load-time"),
                  $(".grid-posts").append(s.html()),
                  (a = $(e).find("#load-more-link").data("load"))
                    ? $("#load-more-link").show()
                    : ($("#load-more-link").hide(),
                      $("#blog-pager .no-more").addClass("show"));
                      // console.log(a+'&amp=1');
                      fetch(a+'&amp=1')
                      .then((response) => {
                        return response.text();
                      })
                      .then(function(html) {
                        // Initialize the DOM parser
                        // var parser = new DOMParser();

                        // // Parse the text
                        // var doc = parser.parseFromString(html, "text/html");

                        // You can now even select part of that html as you would in the regular DOM
                        // Example:
                        // var docArticle = doc.querySelector('article').innerHTML;

                        var jsonText = $('<div>').html(html).find('#native-feed').text()
                        console.log(JSON.parse(jsonText));
                      })
              },
              beforeSend: function () {
                $("#blog-pager .loading").show();
              },
              complete: function () {
                $("#blog-pager .loading").hide(),
                  $(".grid-posts article.post").addClass(
                    gridPostSpan() + iF(settings("classFilter"), " ")
                  ),
                  new LazyLoad({ elements_selector: ".snip-thumbnail" }),
                  k();
              },
            }),
            // $.ajax({
            //   url: a,
            //   success: function (e) {
            //     var s = $(e).find(".grid-posts");
            //     s
            //       .find(".grid-posts article.post")
            //       .addClass("loading-frame load-time"),
            //       $(".grid-posts").append(s.html()),
            //       (a = $(e).find("#load-more-link").data("load"))
            //         ? $("#load-more-link").show()
            //         : ($("#load-more-link").hide(),
            //           $("#blog-pager .no-more").addClass("show"));
            //   },
            //   beforeSend: function () {
            //     $("#blog-pager .loading").show();
            //   },
            //   complete: function () {
            //     $("#blog-pager .loading").hide(),
            //       $(".grid-posts article.post").addClass(
            //         gridPostSpan() + iF(settings("classFilter"), " ")
            //       ),
            //       new LazyLoad({ elements_selector: ".snip-thumbnail" }),
            //       k();
            //   },
            // }),
            e.preventDefault();
          // async function getLabelAwait() {
          //   await getLabel(".blog-posts")
          // }
          async function getLabelAwait() {
            let myPromise = new Promise(function (resolve, reject) {
              resolve(getLabel(".blog-posts"));
            });
            await myPromise;
          }

          getLabelAwait();
        });
    }),
    k(),
    $(".post-body iframe").each(function () {
      var a = $(this);
      a.attr("src").match("www.youtube.com") &&
        a.wrap('<div class="video-frame"/>');
    }),
    $(".post-body blockquote").each(function () {
      var a = $(this),
        e = a.text().toLowerCase().trim(),
        s = a.html();
      if (e.match("(alert-success)")) {
        const e = s.replace("(alert-success)", "");
        a.replaceWith('<div class="alert-message success">' + e + "</div>");
      }
      if (e.match("(alert-passed)")) {
        const e = s.replace("(alert-passed)", "");
        a.replaceWith('<div class="alert-message passed">' + e + "</div>");
      }
      if (e.match("(alert-warning)")) {
        const e = s.replace("(alert-warning)", "");
        a.replaceWith('<div class="alert-message warning">' + e + "</div>");
      }
      if (e.match("(alert-error)")) {
        const e = s.replace("(alert-error)", "");
        a.replaceWith('<div class="alert-message error">' + e + "</div>");
      }
      if (e.match("(code-box)")) {
        const e = s.replace("(code-box)", "");
        (newTemp = e.replace(/"/g, "'")),
          a.replaceWith(
            '<pre class="code-box">' +
              e +
              '<button class="tune">Copy Now</button><input id="showlink" readonly="readonly" type="text" value=" ' +
              newTemp +
              ' "/></pre>'
          );
      }
    }),
    $(".tune, .copy-post").on("click", function () {
      $(".copy-post").addClass("copied"),
        $(".code-box, .copy-post").find("#showlink").select(),
        document.execCommand("copy"),
        $(".tune").text("Copied"),
        setTimeout(function () {
          $(".tune").text("Copy"), $(".copy-post").removeClass("copied");
        }, 5e3);
    }),
    $(".post-body a").each(function () {
      var a = $(this),
        e = a.text(),
        s = preShortCode(e, "text");
      if (
        (e.match("getButton") &&
          s &&
          (a.replaceText(/([^{\(]+(?=\)))/, ""),
          a.each(function () {
            var a = $(this),
              e = a.text(),
              s = preShortCode(e, "text"),
              t = preShortCode(e, "icon"),
              i = preShortCode(e, "color"),
              o = preShortCode(e, "size");
            a
              .addClass(o ? "main-button button l-bt" : "main-button button")
              .text(s),
              0 != t && a.addClass(t),
              0 != i && a.attr("style", "background:" + i + ";");
          })),
        e.match("getCard"))
      ) {
        var t = preShortCode(e, "type");
        e = preShortCode(e, "title");
        var i = a.attr("href"),
          o = a.attr("target");
        switch (t) {
          case "download":
          case "product":
          case "custom":
            a.replaceText(/([^{\(]+(?=\)))/, ""),
              a.each(function () {
                var a = $(this),
                  e = a.text(),
                  s = preShortCode(e, "button"),
                  n = preShortCode(e, "icon"),
                  c = preShortCode(e, "title"),
                  r = preShortCode(e, "info");
                (r = r ? '<span class="card-data">' + r + "</span>" : ""),
                  a.replaceWith(
                    '<div class="card-wrap"><div class="card-header"><div class="card-icon"><span class="material-symbols-rounded">' +
                      (n ||
                        ("download" == t
                          ? "download"
                          : "product" == t
                          ? "shopping_cart"
                          : "folder_open")) +
                      '</span></div><div class="card-info"><span class="card-title">' +
                      (c || message("noTitle")) +
                      "</span>" +
                      r +
                      '</div></div><a class="card-button main-button" href="' +
                      (i || "#") +
                      '" target="' +
                      (o || "_self") +
                      '">' +
                      s +
                      "</a></div>"
                  );
              });
        }
      }
    }),
    $(".post-body strike").each(function () {
      var a = $(this),
        e = a.text(),
        s = e.toLowerCase().trim();
      if (
        (s.match("(toc)") &&
          ((e = 0 != (e = preShortCode(e, "title")) ? e : "Table of Contents"),
          a.replaceWith(
            '<div class="tociki-pro"><div class="tociki-inner"><a href="javascript:;" class="tociki-title" role="button" title="Table of Contents"><span class="tociki-title-text">' +
              e +
              '</span></a><ol id="tociki"></ol></div></div>'
          ),
          $(".tociki-title").each(function (a) {
            (a = $(this)).on("click", function () {
              a.toggleClass("opened"), $("#tociki").slideToggle(180);
            });
          }),
          $("#tociki").toc({ content: ".post-body", headings: "h2,h3,h4" }),
          $("#tociki li a").each(function (a) {
            (a = $(this)).click(function () {
              return (
                $("html,body").animate(
                  { scrollTop: $(a.attr("href")).offset().top },
                  500
                ),
                !1
              );
            });
          })),
        e.trim().match("(nextPage)") &&
          a.replaceWith("\x3c!-- nextpage --\x3e"),
        ("(ads)" === e.trim() ||
          "(ads1)" === e.trim() ||
          "(ads2)" === e.trim()) &&
          a.replaceWith('<div class="inpost-ad"/>'),
        (htmlorder = a.html()),
        s.match("(contact-form)") &&
          (a.replaceWith('<div class="contact-form"/>'),
          $(".contact-form").append($("#ContactForm1"))),
        s.match("(caps)"))
      ) {
        const e = htmlorder.replace("(caps)", "");
        a.replaceWith('<span class="firstword">' + e + "</span>");
      }
      if (s.match("(left-sidebar)")) {
        htmlorder.replace("(left-sidebar)", "");
        a.replaceWith(
          "<style>.flex-section .outer-container{flex-direction:row-reverse;}</style>"
        );
      }
      if (s.match("(right-sidebar)")) {
        htmlorder.replace("(right-sidebar)", "");
        a.replaceWith(
          "<style>.flex-section .outer-container{flex-direction:initial;}</style>"
        );
      }
      if (s.match("(full-width)")) {
        htmlorder.replace("(full-width)", "");
        a.replaceWith(
          "<style>.item-view #feed-view{width:100%}.item-view #sidebar-container{display:none}</style>"
        );
      }
    }),
    $(".item-post").each(function () {
      var a = $(this),
        e = a.find(".post-body"),
        s = a.find(".pagination"),
        t = e.html().split(/\x3c!-- nextpage --\x3e/i),
        i = t.length;
      1 < i &&
        ((tata = function () {
          var a = window.location.href,
            o = a.match(/[?]/g) ? "&" : "?";
          (komu = new URL(a.replace("#", o))),
            (manu = komu.searchParams.get("page")),
            (index = Number(0 > manu ? 1 : manu || 1) - 1),
            e.html(t[index]);
          var n = index + 1;
          s.html(
            (1 < n
              ? '<a href="#page=' + (n - 1) + '" class="prev btn">Previous</a>'
              : "") +
              '<span class="info"> Page ' +
              n +
              " of " +
              i +
              "</span>" +
              (n < i
                ? '<a href="#page=' + (n + 1) + '" class="next btn">Next</a>'
                : "")
          ),
            s.find(".btn").on("click", function () {
              $("html, body").animate({ scrollTop: 0 }, 500);
            }),
            postCard(),
            postAds();
        }),
        $(window).on("hashchange", tata),
        tata());
    }),
    postAds(),
    $(".top-ads").each(function () {
      var a = $("#main-ads-post").text();
      $("#upper-ad .widget").length &&
        $(this).html('<div class="widget">' + a + "</div>");
    }),
    $(".below-ads").each(function () {
      var a = $("#main-ads-post").text();
      $("#lower-ad .widget").length &&
        $(this).html('<div class="widget">' + a + "</div>");
    }),
    $("#post-placeholder").each(function () {
      var a = $("#main-ads-post").text();
      $(this).html('<div class="widget">' + a + "</div>");
    }),
    $(".share-runs .window-piki, .share-wrapper-icons .window-piki").on(
      "click",
      function () {
        var a = $(this),
          $link = a.data("url"),
          $width = a.data("width"),
          $height = a.data("height");
        window
          .open(
            $link,
            "_blank",
            "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" +
              $width +
              ",height=" +
              $height +
              ",left=" +
              Math.round(window.screen.width / 2 - $width / 2) +
              ",top=" +
              Math.round(window.screen.height / 2 - $height / 2)
          )
          .focus();
      }
    ),
    $(".show-hid a, .share-top, .close-check").on("click", function () {
      $("body").toggleClass("show-share");
    }),
    $(".sidebar").each(function (a, e) {
      var s = $(this),
        t = s.find(".sibForm .widget-content").data("shortcode");
      t &&
        ((a = preShortCode(t, "title")),
        (e = preShortCode(t, "caption")),
        0 != a && s.find(".follow-by-email-title").html(a),
        0 != e && s.find(".follow-by-email-caption").html(e));
    }),
    $(".author-description a").each(function () {
      $(this).attr("target", "_blank");
    }),
    $(
      ".about-author .author-description span a, .profile-info .profile-textblock a"
    ).each(function () {
      var a = $(this),
        e = a.text().trim(),
        s = a.attr("href");
      a.replaceWith(
        '<li class="' +
          e +
          '"><a class="fas fa-' +
          e +
          '" href="' +
          s +
          '" title="' +
          e +
          '" target="_blank"/></li>'
      ),
        $(".profile-info .description-links").append(
          $(".profile-info .profile-textblock li")
        ),
        $(".about-author .description-links").append(
          $(".author-description span li")
        ),
        $(".description-links").addClass("show");
    }),
    $(".primary-nav").each(function () {
      var a = $("a.prev-post-link").attr("href"),
        e = $("a.next-post-link").attr("href");
      $.ajax({
        url: a,
        type: "get",
        success: function (a) {
          (a = $(a).find(".hentry h1.entry-title").text()),
            $(".post-prev a .navigation-posts p").text(a);
        },
      }),
        $.ajax({
          url: e,
          type: "get",
          success: function (a) {
            (a = $(a).find(".hentry h1.entry-title").text()),
              $(".post-next a .navigation-posts p").text(a);
          },
        });
    }),
    $(".related-runs .widget-title h3").each(function () {
      var a = $(this),
        e = relatedPostsText;
      "" != e && a.text(e);
    }),
    $(".comments-section").each(function () {
      var a = $(this),
        e = commentsSystem,
        s =
          '<div class="fb-comments" data-width="100%" data-href="' +
          $(location).attr("href") +
          '" data-numposts="5"></div>',
        t = "comments-system-" + e;
      "blogger" == e
        ? $(this).addClass(t).show()
        : "disqus" == e
        ? (((e = document.createElement("script")).type = "text/javascript"),
          (e.async = !0),
          (e.src = "//" + disqusShortname + ".disqus.com/embed.js"),
          (
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]
          ).appendChild(e),
          $("#comments").remove(),
          $(this).append('<div id="disqus_thread"/>').addClass(t).show())
        : "facebook" == e
        ? ($("#comments").remove(), $(this).append(s).addClass(t).show())
        : "hide" == e
        ? $(this).hide()
        : $(this).addClass("comments-system-default").show(),
        $(".avatar-image-container img").each(function () {
          var a = this.src;
          $(this)
            .removeAttr("src")
            .attr(
              "src",
              a.replace(
                "//resources.blogblog.com/img/blank.gif",
                "//1.bp.blogspot.com/-LKSLshqXW6E/YSZH9r_szcI/AAAAAAAACHA/RseV8bfVcLw4tQIpisLh2cjCDDM4i0fJwCLcBGAsYHQ/s1600/avatar%2Bpiki.png"
              )
            );
        });
      var i = $(this).find(
          ".comments .toplevel-thread > ol > .comment .comment-actions .comment-reply"
        ),
        o = $(this).find(".comments .toplevel-thread > #top-continue");
      i.on("click", function () {
        o.show(), $(".comment-replybox-thread").hide();
      }),
        o.on("click", function () {
          o.hide(), $(".comment-replybox-thread").show();
        });
      var n = a.find(".comments .comment-reply"),
        c = a.find(".comments #top-continue"),
        r = a.find("#show-comment-form");
      n.on("click", function () {
        c.show(), a.addClass("comment-section-visible"), r.remove();
      }),
        c.on("click", function () {
          c.hide();
        }),
        r.on("click", function () {
          a.addClass("comment-section-visible"), r.remove(), k();
        });
    }),
    $("p.comment-content").each(function () {
      var a = $(this);
      a.replaceText(
        /(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g,
        '<img src="$1"/>'
      ),
        a.replaceText(
          /(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g,
          '<div class="video-frame"><iframe id="youtube" width="100%" height="360" src="https://www.youtube.com/embed/$1" frameborder="0" allow="autoplay; accelerometer; gyroscope; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>'
        );
    });
}),
  $("#cookies-iki").each(function () {
    var a = $(this),
      e = a.find(".widget.HTML").text(),
      s = a.find(".cookies-bt");
    a.length > 0 &&
      (e &&
        ((buttons = preShortCode(e, "buttons")),
        (days = preShortCode(e, "days")),
        0 != buttons && s.text(buttons),
        (days = 0 != days ? Number(days) : 7)),
      "1" !== $.cookie("cookiesairmag") &&
        (a.css("display", "block"),
        setTimeout(function () {
          a.addClass("cookies-show");
        }, 10)),
      $(".cookies-bt")
        .off("click")
        .on("click", function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            $.cookie("cookiesairmag", "1", { expires: days, path: "/" }),
            a.removeClass("cookies-show"),
            setTimeout(function () {
              a.css("display", "none");
            }, 500);
        }),
      (cookieChoices = {}));
  }),
  $(".backTop").each(function () {
    var a = $(this);
    $(window).on("scroll", function () {
      100 <= $(this).scrollTop() ? a.fadeIn(250) : a.fadeOut(250);
    }),
      a.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
      });
  });

setTimeout(function () {
  settings("allowAnimation") == true && awaitAnimate();
    // [].forEach.call([".snip-thumbnail", ".video-thumbnail"], e => {
    //   new LazyLoad({ elements_selector: e });
    // });


}, 100);
//  [].forEach.call([".snip-thumbnail", ".video-thumbnail"], e => {
//     new LazyLoad({ elements_selector: e });
//   });
      window.lazyLoadOptions = {
        callback_loading: function() {
          e.getAttribute("data-src")
        },
        callback_loaded: function() {
          e.getAttribute("data-src")
        }
      };
      // Listen to the initialization event
      // and get the instance of LazyLoad
      window.addEventListener(
        "LazyLoad::Initialized",
        function (event) {
          window.lazyLoadInstance = event.detail.instance;
        },
        false
      );
    // function logElementEvent(e) {
    //   console.log(e.getAttribute("data-src"));
    // }

    // window.lazyLoadOptions = {
    //   threshold: 0,
    //   // Assign the callbacks defined above
    //   callback_enter: function (e) { logElementEvent(e); },
    //   callback_exit: function (e) { logElementEvent(e); },
    //   callback_cancel: function (e) { logElementEvent(e); },
    //   callback_loading: function (e) { logElementEvent(e); },
    //   callback_loaded: function (e) { logElementEvent(e); },
    //   callback_error: function (e) { logElementEvent(e); e.src = "https://via.placeholder.com/440x560/?text=Error+Placeholder"; },
    //   callback_finish: function (e) { logElementEvent(e); }
    // };
    // window.addEventListener(
    //   "LazyLoad::Initialized",
    //   function (e) {
    //     console.log(e.detail.instance);
    //   },
    //   false
    // );
function awaitAnimate() {
  var classContainPost = [".grid-posts .post-type", ".sidebar .widget"],
    addAnimation = {
      id: "animate-fade-in",
      style: { add: "opacity:1", rm: "opacity:0" },
    };
  [...classContainPost]?.forEach((value) => {
    return $scrollToAction(value, { ...addAnimation });
  });
  StyleSheets({
    xl: $animateDelay(".grid-posts .post-type,.square-posts"),
  });
}
function gridPost() {
  return "grid grid-cols-8 gap-x-4 gap-y-8 md:gap-x-3 md:gap-y-6 smmd:grid-cols-9";
}
function gridPostSpan() {
  return "relative box-border overflow-hidden col-span-2 smmd:col-span-3 sm:col-span-4";
}
function sidebarGrid() {
  return "grid grid-cols-4 gap-x-2 gap-y-4 smmd:grid-cols-6 mdlg:gap-x-4 mdlg:gap-y-8";
}
function sidebarGridSpan() {
  return "relative flex flex-col box-border overflow-hidden col-span-2 mdlg:col-span-1 smmd:col-span-2 item1";
}
insertTailWindCSS();
function arrClasses(classes, prefix = "") {
  // return classes.split(" ").map((e) => prefix + e);
  return toArraySplit(classes, prefix, " ");
}
function insertTailWindCSS() {
  // Main Feature wrapper-absolute-element absolute-element absolute-after-element
  var gridAll = "#ft-post";
  [
    `${gridAll} .widget`,
    `${gridAll} .featured-box`,
    `${gridAll} .post-filter-inner`,
    `${gridAll} .entry-post-feature-content`,
  ].forEach((selector, i) =>
    $Qs(selector).addClass(
      i === 0
        ? "container-absolute-element"
        : i === 1
        ? "wrapper-absolute-element"
        : i === 2
        ? "absolute-element"
        : i === 3
        ? "absolute-after-element"
        : ""
    )
  );

  // Add any classes to the selector
  [
    ...arrClasses("relative flex flex-wrap w-full items-center justify-center"),
  ].forEach((classes) =>
    $Qs("#main-section>[data-section=section]").addClass(classes)
  );

  [...arrClasses("max-w-[var(--max-width-container)] mx-auto")].forEach(
    (classes) => {
      $Qs("[data-section=section]>*").addClass(classes);
    }
  );

  [...arrClasses("w-full rounded box-border mx-0 my-[15px] p-[15px]")].forEach(
    (classes) => $Qs("section>div>div.widget").addClass(classes)
  );

  [
    arrClasses(
      "relative flex items-center flex-row content-center justify-center text-2xl md:text-xl float-none w-full box-border mt-0 mb-3.5 mx-0"
    ),
    arrClasses(
      "border border-neutral-200 grow h-[3px] mr-2.5 border-solid border-[1px_0]",
      "before:"
    ),
    arrClasses(
      "border border-neutral-200 grow h-[3px] ml-2.5 border-solid border-[1px_0]",
      "after:"
    ),
  ].forEach((e) => {
    [...e].forEach((classes) => {
      $Qs("#main-feature .widget-title>h3").addClass(classes);
      $Qs("#main-feed .widget-title>h3").addClass(classes);
    });
  });

  [
    ...arrClasses(
      "grid grid-cols-[minmax(100px,1fr)_var(--sidebar-width)] gap-x-[2%] lg:grid-cols-1 lg:flex-col w-[min(100%,94vw)] lg:w-full"
    ),
  ].forEach((classes) => $Qs("#container-wrapper").addClass(classes));
  [
    ...arrClasses(
      "relative bg-[color:var(--body-bg-color)] box-border mb-[30px] rounded-[10px] lg:rounded-none"
    ),
  ].forEach((classes) => $Qs("#main-feed").addClass(classes));

  // Grid Posts
  [arrClasses(gridPost()), arrClasses(gridPostSpan())].forEach((e, i) => {
    [...e].forEach((classes) =>
      $Qs(i > 0 ? ".grid-posts>*" : ".grid-posts").addClass(classes)
    );
  });
  // Sidebar
  [arrClasses(sidebarGrid()), arrClasses(sidebarGridSpan())].forEach((e, i) => {
    [...e].forEach((classes) =>
      $Qs(i > 0 ? ".sidebar-posts>*" : ".sidebar-posts").addClass(classes)
    );
  });
  settings("enableViewMore") === true &&
    ["#main-feature .widget-title", "#main-feed .widget-title"].forEach((e) =>
      $Qs(e).addClass("has-viewmore")
    );
}
// SlickSlider
getSlickSlider();
function getSlickSlider() {
  var cdnUrl = "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/";
  $Qs("head").createChild({
    tagName: "link",
    attr: [
      getAttr("rel", "stylesheet"),
      getAttr("type", "text/css"),
      getAttr("href", cdnUrl + "slick-theme.css"),
    ],
  });
  $Qs("#hosted-plugins").createChild({
    tagName: "script",
    attr: [
      getAttr("type", "text/javascript"),
      getAttr("src", cdnUrl + "slick.min.js"),
    ],
  });
  $(function() {
    // slider(".breaking-ticker.multiple");
    $("#ticker .widget-content").each(function () {
      var $this = $(this);
      $("#ticker .breaking-ticker").before(
        '<div class="ticker-story" style="display:none;"><span>Trending</span></div>'
      );
      var html =
        '<div class="has-post-hover transition-all" tabindex="0" style="all: unset;right: -55px;width: 100%;height: 100%;border-radius: 0;position: absolute;background: url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcM3AJA5KQOMO3IcLqMGaYlCZto8u7iiN51ox0Ib_AD-6W1RKL2XREdq9Bzgu7YSfGRB_27f4aMQgiBaFtFvggKvb-vmf599nqoDd8vlAT_D6aFZx07WySjF0Z7ol97b3pJGLwxQyN8UuokHtgcITTB8X_k6cYDXsIWjBU-PvkG01WIsgLtm2F8iDJ3A/s640-rw/nak-leng-ptus-somnerch-2009-phumihdtv.webp);background-repeat: no-repeat;background-position: center 50%;background-size: contain;box-shadow: 0px 60px 5px 0px #777;margin-top: 54px;z-index: 2;"></div>';
      $("#ticker .tickerNews").hover(
        function () {
          $(this).css("height", "400px").append(html);
        },
        function () {
          $(this).css("height", "").find(".has-post-hover").remove();
        }
      );
    });
  });
}
// Theme Settings
anySettings();
function anySettings() {
  if (settings("allowStatus") == true) {
    getLabel(".blog-posts");
    getLabel(".sidebar-posts");
    [].forEach.call([".blog-posts", ".sidebar-posts"], (selector) =>
      $Qs(selector).addClass("has-status-labels")
    );
    $Qs("[data-post-id] a.post-filter-inner>:first-child").appendAB(statusBG());
  }
  if (settings("classFilter")) {
    [].forEach.call([".grid-posts .post", ".popular-post.post"], (selector) =>
      $Qs(selector).addClass(settings("classFilter"))
    );
  }
  if (settings("disableCategorySnippet") == true) {
    [...arrClasses("no-category no-snippet no-readmore")].forEach((classes) =>
      $Qs("body").addClass(classes)
    );
  }
  if (settings("noSidebar") == true) {
    $Qs("body").addClass("noSidebar");
    // $Qs(".tickerNews .entry-post-content").remove()
  }
}
// Get and Remove Labels Function
removeLabels(".post-body b");
function statusBG(h) {
  return (
    '<div class="status-bottom-bg absolute w-full' +
    iF(h, " ") +
    ' bg-gradient-to-t from-black to-transparent z-[4] bottom-0"></div>'
  );
}
function getLabel(selector) {
  $Qs(selector + " [data-post-id]").forEach((e) => {
    var dataId = e.dataset.postId,
      url = href("current");

    if (url?.includes("/p/")) return;
    else
      $Qs.get({
        url: iF(dataId, "/feeds/posts/default/", "?alt=json"),
        dataType: "json",
        success: function (data) {
          var $content = data.entry.content.$t,
            $label = getLabels($content),
            $dataSelector = `[data-post-id="${dataId}"] a.post-filter-inner`,
            $selector = `${selector} ${$dataSelector}>:first-child`;
          [].forEach.call(
            [$label[0], $label[1], $label[2], $label[3]],
            (labels) => $Qs($selector).appendAB(labels)
          );
          $Qs(`[data-post-id="${dataId}"]`).addClass("has-status-labels");
          if ($label[1] || $label[2])
            $Qs(`${selector} ${$dataSelector} .status-bottom-bg`).addClass(
              "h-20"
            );
        },
      });
  });
}
videoPlayer();
function videoPlayer(selector) {
  $(".blog-posts article.post").each(function() {
    var $this = $(this),
      dataId = $this.data('content-id'),
      url = href("current");
            // $('#main-video-player').css("display", "none")

    if (url?.includes("/p/")) return;
    else
      $.ajax({
        url: iF(dataId, "/feeds/posts/default/", "?alt=json"),
        type: "GET",
        dataType: "json",
        beforeSend: function() {
          $this.find("#main-video-player").addClass("pre-hidden")
        },
        success: function (data) {
          var $content = data.entry.content.$t,
            $this = $('<div>').html($content);
            // $list = $this.find('script').text();
            // $list = $list.split('"file":').slice(1).map(e=> {
            //   var file = e.trim().split(',')[0]?.replace(/"/g, '');
            //   return `<iframe id="videoPlayer" data-video-src="${file}" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="${file}"></iframe>`
            // }).join('\n')
            // console.log($list)

            // var video = $this.find("#main-video-player [data-video-src]:nth-child(1)").data("video-src")
            // console.log(video)
        },
      });
  });
}
