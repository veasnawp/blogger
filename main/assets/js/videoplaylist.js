/*! Load Pager */

$Qs(window).ready(function() {
  function PlayerQuery() {
    $("#container-wrapper").each(function () {
      function isNumeric(value) {
        var type = typeof value;
        return (type === 'number' || type === 'string') && !Number.isNaN(value - Number.parseFloat(value));
      }
      var $this = $(this),
      url = href('current'),
      url = url.split('?page='),
      pageNo = (url[1] + '&m=4').split('m')[0]?.replace('&', ''),
      url = url[0],
      ep = (pageNo <= 8) ? '0' + pageNo : pageNo,
      i = 1,
      $img = $this.find('img.hidden').attr('src'),
      IMAGE = new Image();
      if( !isNumeric(pageNo) ) var pageNo = 1;
      IMAGE.src = $img
      IMAGE.width
      IMAGE.height
      IMAGE.sizes = `(max-width: ${IMAGE.width}px) 100vw, ${IMAGE.width}px`

      var $image = `<img width="${IMAGE.width}" height="${IMAGE.height}" data-src="${$img}" class="video-thumbnail lazy" data-sizes="${IMAGE.sizes}">`,
      imgButton = '<div id="phumikhmer-play"><div class="embed-phumikhmer-play">'
      imgButton += `${ICONS('player')}</div></div>${$image}</div>`

      $Qs('#main-video-player [data-video-id]').addClass('embed-phumikhmer').addClass('embed-thumbnail')
      .data('loading', 'phumikhmer-player')
      .appendAB('<div class="skip-ads hidden"></div>', 'before').appendAB(`<div style="padding:5px; background-color:#111" id="pkb-title"><h2 class="phumikhmer-video-title">This is Title | ${ep} Episodes</h2></div><!--next-->`)
      .html(imgButton);

      var $postBody = $this.find(".post-body"),
        $mainVideo = $this.find('#main-video-player'),
        $content = $mainVideo.html().split(/<!--next-->/i).slice(0, -1)
        // console.log(no);
        // console.log($content);

        pagination();
        function pagination() {
          var mainElm = $Qs('#main-video-player')
          if (mainElm != null) {
            mainElm.html($content[pageNo-1], true);
            if( $content.length > 1 ) {
              mainElm.html('<div class="video-playlist-container" id="video-playlist"></div>');
            };
          }

          $content.forEach(function(e) {
            // var $this = $('div').html(e).find('#videoPlayer')
            // console.log(e);
            var next = $Qs('#video-playlist'),
            // newNext = $Qs('#ct-video-playlist'),
            zero = ''; if (i <= 8) var zero = '0';
            var episodes = '<h3><span>Episode '+zero+i+'</span></h3>'

            if( pageNo == i ) {
              next.html(`<div id="videoEpisode" class="playlist-numbers current" data-video="video-playlist" style="pointer-events: none;">${episodes}</div>`);
            } else {
              next.html(`<a href="${url}?page=${i}"><div id="videoEpisode" class="playlist-numbers" data-video="video-playlist">${episodes}</div></a>`);
            }

            // if (addOptions?.enableScrollTop == true && eps > 1)
            //   $Qs('#video-container').scroll('smooth');

            // if (newNext != null) {
            //   var innerHTML_ = '';
            //   let title = ctPll?.title||mainTitle,
            //   hoverTitle = `${title} [EP.${i}]${iF(ctPll?.suffix, ' — ')}`,
            //   urlThumb = ctPll?.thumbnail || image?.url;
            //   var ctPllImage = {
            //     url: urlThumb,
            //     alt: hoverTitle,
            //     title: hoverTitle,
            //     class: 'playlist-thumbnail',
            //     lazy: ctPll?.lazy,
            //     srcset: ctPll?.srcset||false,
            //   },
            //   thumbnails = loadImage(true, ctPllImage),
            //   id = parseInt(Math.random() * 10000) + zero + i;

            //   innerHTML_ += `<div class="video-thumbnail thumbnail-${id}">`
            //   innerHTML_ += thumbnails
            //   innerHTML_ += '<div class="icon-play-circle"></div></div>'
            //   innerHTML_ += `<div class="video-info" data-video="episode-${zero+i}" title="${hoverTitle}"><h3>${hoverTitle}</h3><span>Eps.${zero+i} — ${title}</span></div>`

            //   // loadImage(ctPllImage, '.video-thumbnail', false);

            //   if( no == i ) {
            //     newNext.html(`<div id="videoEpisode" class="pkb-playlist-numbers current" data-video="video-playlist-title" style="pointer-events: none;">${innerHTML_}</div>`);
            //   } else {
            //     newNext.html(`<div id="videoEpisode" class="pkb-playlist-numbers" data-video="video-playlist-title"><a href="${url}?page=${i}">${innerHTML_}</a></div>`);
            //   }
            // }
            i++;
          });
        }
        // console.log($postBody)
      // 1 < i &&
      //   (( tata = function() {
      //     var a = window.location.href,
      //       o = a.match(/[?]/g) ? "&" : "?",
      //       url = new URL(a.replace("#", o)),
      //       pageLink = url.searchParams.get("page");
      //       console.log(o)
      //       console.log(url)
      //       console.log(a.split('?page='))
      //       var index = Number(0 > pageLink ? 1 : pageLink || 1) - 1;
      //       console.log(index);
      //       $postBody.html($content[index]);
      //     var n = index + 1;
      //     $pagination.html(
      //       (1 < n
      //         ? '<a href="#page=' + (n - 1) + '"><div id="videoEpisode" class="playlist-numbers" data-video="video-playlist"><h3><span>Episode 0'+(n - 1)+'</span></h3></div></a>'
      //         : "") +
      //         '<span class="info"> Page ' +
      //         n +
      //         " of " +
      //         i +
      //         "</span>" +
      //         (n < i
      //           ? '<a href="#page=' + (n + 1) + '"><div id="videoEpisode" class="playlist-numbers" data-video="video-playlist"><h3><span>Episode 0'+(n + 1)+'</span></h3></div></a>'
      //           : "")
      //     ),
      //       $pagination.find("#videoEpisode").on("click", function () {
      //         $("html, body").animate({ scrollTop: 0 }, 500);
      //       });
      //   }),
      //   $(window).on("hashchange", tata),
      //   tata());


    })
  }
  var timer = setInterval(function() {
      clearInterval(timer);
      new PlayerQuery();
      // new LazyLoad({ elements_selector: ".video-thumbnail" })
  }, 100);
  // var timer = setInterval(function() {
  //   if (typeof options != 'undefined') {
  //     clearInterval(timer);
  //     new PlayerQuery(options, addOptions);
  //   }
  // }, 100);
});
function ICONS(name) {
  let icons = {
    player: '<svg aria-hidden="true" focusable="false" class="svg-player" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 512" width="45" height="45"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>',
  };
  return icons?.[name];
}
function iF(val, p = '', s = '', d = '') {
  return val ? p+val+s : d;
}
function onLoadVideo(videoAds, notSupportAuto) {
  var iframe = $qs('[data-loading="phumikhmer-player"]'),
  loading = $Qs('#phumikhmer-play')
  if(loading != null) loading.on("click", function() {
    if(typeof videoAds != 'undefined') {
      loadAds(videoAds?.sourceAds, videoAds?.youtubeAds, videoAds?.counter, notSupportAuto);
    } else {
      iframe.innerHTML = iFrame(iframe.dataset.videoId, '', notSupportAuto);
    }
  });
}
function replaceLink(url) {
  function replace(regex, replace) {
    url = url.replace(/%3A/gi, ':');
    url = url.replace(/%2F/gi, '/');
    return url.replace(regex, replace+'$1');
  }
  var link = url,
  yt = 'https://www.youtube.com/embed/',
  ytr = /(?:https:\/\/)?(?:http:\/\/)?(?:www\.)?(?:\/\/)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g,
  ytr2 = /(?:https:\/\/)?(?:http:\/\/)?(?:www\.)?(?:\/\/)?(?:youtu\.be)\/?(.+)/g,
  ok = 'https://www.ok.ru/videoembed/',
  okr = /(?:https:\/\/)?(?:http:\/\/)?(?:www\.)?(?:\/\/)?(?:ok\.ru)\/(?:video\/)?(.+)/g,
  fb = 'https://www.facebook.com/plugins/video.php?href=www.facebook.com/',
  fbr = /(?:https:\/\/)?(?:http:\/\/)?(?:www\.)?(?:\/\/)?(?:facebook\.com)\/?(.+)/g

  if(link.includes('youtube.com/watch?v='))
    link = replace(ytr, yt);
  else if(link.includes('youtu.be'))
    link = replace(ytr2, yt);
  else if(link.includes('ok.ru/video/'))
    link = replace(okr, ok);
  else if(link.includes('facebook.com'))
    link = replace(fbr, fb);

  return link;
}
function skipAds(setCounter) {
  var counter = setCounter||5,
  skip = $Qs('.skip-ads'),
  iframe = $Qs('div[data-loading="phumikhmer-player"]'),
  currentTime = setInterval(function(){
    skip.removeClass('hidden');
    if(counter <= 0){
      clearInterval(currentTime);
      skip.css('width', '15%').css('pointer-events', null).html('<b id="skip-ad-now">Skip</b>');
      iframe.css(null);
    } else if (counter > 0) {
      skip.css('pointer-events', 'none').html('<b id="skip-ad-now">Skip after '+(counter--)+'s</b>');
    }
  }, 1000);
}
function loadIframe(notSupportAuto) {
  var loading = '[data-loading="phumikhmer-player"]',
  iframe = $Qs(loading),
  skip = $Qs('.skip-ads');
  setTimeout(function() {
    getSkip();
  }, 8000);
  // Load iframe when clicked on the skip button
  function getSkip() {
    skip.on("click", function() {
      $Qs('#pkb-title').css('display', null);
      iframe.css('pointer-events', null).
      html(iFrame($selector(loading).dataset.videoId, {notSupportAuto}));
      skip.css('width', null).addClass('hidden').html(null);
    });
  }
}
function loadAds(sourceAds, youtubeAds, counter, notSupportAuto) {
  var loading = '[data-loading="phumikhmer-player"]',
  iframe = $Qs(loading),
  skip = $Qs('.skip-ads')

  skip.html('<b id="skip-ad-now">Skip</b>');
  $Qs('#pkb-title').css('display', 'none');
  iframe.css('pointer-events', 'none').
  html(youtubeAds ? iFrame(youtubeAds, {YTads:youtubeAds}) : '<div id="video-ads"><video id="video" autoplay="" playsinline="" style="pointer-events: none;"><source src="'+sourceAds+'" type="video/mp4"></video></div>');

  loadIframe(notSupportAuto);
  skipAds(counter);

  // Load iframe when video ad is ended
  document.getElementsByTagName('video')[0].onended = function() {
    skip.css('width', null).addClass('hidden').html(null);
    $Qs('#pkb-title').css('display', null);
    iframe.css('pointer-events', null).
    html(iFrame($selector(loading).dataset.videoId, {notSupportAuto}));
  };
  skip.html(null);
}
function iFrame(src, opt) {
  var link = replaceLink(src),
  notFound = '<div style="position: absolute; top: 0; display: flex; align-items: center; justify-content: center; font-size: 2em; font-weight: 700;  width: 100%; height: 100%;color: #ccc;  z-index: 2;cursor: default;"><span style="text-align: center;width: 100%;padding: 10px;background: #565656;">Video has not been found. . .</span></div>',
  auto = filterIncludes(['drive.google', 'docs.google', 'facebook.com', ...opt?.notSupportAuto||[]], src) ? '' : '?autoplay=1'

  return link  ? `<iframe frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src="${link+auto}" ></iframe>${opt?.YTads ? '<video class="hidden"></video>':''}`: notFound;
}
function loadImage(returnImage, img, selector, before = false, onScrolling) {
  const IMAGE = new Image();
  IMAGE.src = img?.url;
  // return image
  function getAttr(property, value) {
    if (returnImage) var val = ` ${property}="${value}"`
    else val = {property, value}
    return val;
  }
  var imgWidth = IMAGE.width <= 0 ? '' : getAttr('width', IMAGE.width),
  imgHeight = IMAGE.height <= 0 ? '' : getAttr('height', IMAGE.height),
  imgSizes = IMAGE.width <= 0 ? '' : getAttr('sizes', `(max-width: ${IMAGE.width}px) 100vw, ${IMAGE.width}px`),
  data = img?.dataSrc == true ? 'data-src' : 'src',
  imgLazy = img?.lazy == true ? getAttr('loading', 'lazy') : '',
  imgSrcset = img?.srcset == true && IMAGE.width > 0 ? getAttr('srcset', loadSrcset(IMAGE, img)) : '',
  imgAlt = img?.alt ? getAttr('alt', img?.alt) : '',
  imgTitle = img?.title ? getAttr('title', img?.title) : '',
  imgClass = getAttr('class', `phumikhmer-image${img?.lazy == true ? ' lazy':''}${iF(img?.class, ' ')}`)

  if (returnImage) {
    var IMAGEs = `<img${imgWidth+imgHeight} ${data}="${IMAGE.src}"${imgLazy+imgSrcset+imgAlt+imgTitle+imgClass+imgSizes}>`
    return img?.url ? IMAGEs : '';
  } else {
    loadImageAsync()
    async function loadImageAsync() {
      await IMAGE.decode();
        appendAoB({
          tagName: 'img',
          attr: [
            imgWidth,
            imgHeight,
            getAttr(data, IMAGE.src),
            imgLazy, imgSrcset,
            imgAlt, imgTitle, imgClass, imgSizes,
          ]
        }, selector, before ? true : false, onScrolling);
    };
  }
}
function loadSrcset(image, images) {
  var url = images?.url;
  image.src = url;
  function Srcset(w, h, nDivide = 1, nMulti = 1, nAdd = 0) {
    return Math.round(nAdd + nMulti*(h * 300 / w)/nDivide);
  }
  function replaceUrl(width, height) {
    let value = url;
    function replace(regex, type) {
      return image.src.replace(regex, `-${width}x${height}.${type?.toLowerCase()}`) + ` ${width}w`;
    }
    if (value?.includes('.png') || value?.includes('.PNG')) {
      value = replace(/.png/gi, 'png');
    } else if (value?.includes('.jpg') || value?.includes('.JPG')) {
      value = replace(/.jpg/gi, 'jpg');
    } else if (value?.includes('.jpeg') || value?.includes('.JPEG')) {
      value = replace(/.jpeg/gi, 'jpeg');
    } else if (value?.includes('.webp') || value?.includes('.WEBP')) {
      value = replace(/.webp/gi, 'webp');
    } else {
      value = image.src;
    }
    return iF(value);
  }
  let srcset = '',
  url_lg = replaceUrl('1024', '768'),
  url_md = replaceUrl('768', '576'),
  url_sm = replaceUrl('300', Srcset(image.width, image.height)),
  url_eq = replaceUrl('150', Srcset(image.width, image.height, 2)),
  widthHeightEqual = image.width == image.height,
  widthHeightNotEqual = image.width != image.height;
  if (images?.srcset) {
    if (widthHeightEqual && image.width >= 300) {
      let useUrl = `${image.src} ${image.width}w, `;
      if (widthHeightEqual && image.width == 300) {
        srcset = useUrl + url_eq;
      } else if (widthHeightEqual && image.width > 300) {
        srcset = useUrl + url_sm +', '+ url_eq + ', '+
        replaceUrl(image.width/2, Srcset(image.width, image.height, 1, 2)) + ', '+
        replaceUrl(image.width/2+100, Srcset(image.width, image.height, 1, 2, 100));
      }
    } else if (widthHeightNotEqual && (image.width > 300 && image.height > 300)) {
      let useUrl = `${image.src} ${image.width}w, ${url_sm}`;
      if (widthHeightNotEqual && image.width > 1024) {
        srcset = `${useUrl}, ${url_lg}, ${url_md}`;
      } else if (widthHeightNotEqual && 768 < image.width < 1024) {
        srcset = `${useUrl}, ${url_md}`;
      } else if (widthHeightNotEqual && 300 < image.width < 768) {
        srcset = useUrl;
      }
    } else if (image.width < 300 || image.height < 300) {
      srcset = `${image.src} ${image.width}w`;
    } else {
      srcset = '';
    }
  }
  return srcset;
}
function appendAoB(attributes, selector, before = true, useScrollTop) {
  Element.prototype.appendAfterOrBefore = function(element) {
    if (element != null) {
      element.appendAoB(this, before)
    }
  }, false;

  var NewElement = document.createElement(attributes?.tagName||'div');
  if(attributes?.class) NewElement.classList = attributes?.class;
  if(attributes?.id) NewElement.id = attributes?.id;
  if(attributes?.style) NewElement.setAttribute('style', attributes?.style);
  var attr = attributes?.attr;
  if(typeof attr != 'undefined') attr?.map(load => {
    if(load?.property != undefined) NewElement.setAttribute(load?.property, load?.value||'')
  });
  if(attributes?.innerHTML) NewElement.innerHTML = attributes?.innerHTML;

  const $this = $Qs(selector)
  if (useScrollTop) {
    var onScroll=false;
    $Qs(window).on("scroll",function(){
      (0 != document.documentElement.scrollTop && false === onScroll || 0 != document.body.scrollTop && false === onScroll) &&
      (!function() {
        if (attributes?.customElement)
          (attributes?.element).appendAfterOrBefore($this);
        else NewElement.appendAfterOrBefore($this);
      }(), onScroll=true)
    },true);
  } else {
    if (attributes?.customElement)
      (attributes?.element).appendAfterOrBefore($this);
    else NewElement.appendAfterOrBefore($this);
  }
}
function preAdSense(id, slot) {
  var ad = `\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-${id}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>\n`;
  ad += `<script>\n (adsbygoogle = window.adsbygoogle || []).push({}); </script>\n`

  return ad;
}
function StyleSheets(inlineStyle) {
  var id = parseInt(Math.random() * 100000),
  getStyle = document.createElement('style'),
  head = document.getElementsByTagName("head")[0];
  getStyle.id = `pkb-blocks-${id}-inline-style`;
  getStyle.textContent = inlineStyle;
  head.appendChild(getStyle);
}
function featurePost(featurePostSettings, addOptions) {

  if (typeof featurePostSettings == 'undefined') {
    return;
  }
  var html_ = '',
  url = window.location.href,
  pathname = new URL(url).pathname,
  homeUrl = pathname.split('/')[0],
  pageNum = url.substring(url.lastIndexOf('?page=') + 0),
  currentUrl = url.replace(pageNum, ''),

  image = featurePostSettings?.image||addOptions?.image,
  caption = featurePostSettings?.caption,
  title = featurePostSettings?.title,
  link = featurePostSettings?.link,
  author = featurePostSettings?.author,
  postDate = featurePostSettings?.date,
  category = featurePostSettings?.category,
  maxResult = featurePostSettings?.maxResult,
  description = featurePostSettings?.description||addOptions?.desc,
  mainClass = 'phumikhmer-feature-post',
  getFeaturePost = $selector('#pkb-feature-post');

  html_ += `<div class="${mainClass}-column">`
    html_ += `<div class="${mainClass}-inner-column">`
      html_ += `<div class="${mainClass}-image-wrap">`
        html_ += `<figure class="${mainClass}__figure">`
          html_ += `<div class="${mainClass}__image">`
            // html_ += `<img width="${image.width}" src="${image.src}" >`
            // html_ += loadImage(true, image)
          html_ += `</div>`
          if (caption) html_ += `<figcaption class="pkb-image-caption">${caption}</figcaption>`
        html_ += `</figure>`
  html_ += `</div></div></div>`
  html_ += `<div class="${mainClass}-column">`
    html_ += `<div class="${mainClass}-inner-column has-description">`
        html_ += `<div class="${mainClass}-description">`
        if (link == true && title) html_ += `<a href="${currentUrl}"><h2 class="${mainClass}__title">${title}</h2></a>`
        else html_ += `<h2 class="${mainClass}__title">${title}</h2>`
          html_ += `<div class="pkb-divider"><hr class="pkb-block-divider__hr"></div>`
          if (author) {
            html_ += `<div class="pkb-block-post-author">`
              html_ += `<div class="pkb-block-post-author__content">`
                html_ += `<p class="pkb-block-post-author__name">${author}</p>`
            html_ += `</div></div>`
          }
          if (postDate) {
            html_ += `<div class="pkb-block-post-date">`
              html_ += `<time>${DateTime()}</time>`
            html_ += `</div>`
          }
          if(typeof category != 'undefined') {
            html_ += `<div class="pkb-taxonomy-category pkb-block-post-terms">`
            html_ += category?.map(cat => {
              // let cats = toCapitalized(cat);
              return `<a href="${homeUrl}/search/label/${cat}${maxResult||''}" rel="category tag">${cat}</a>`
            }).join(' , ');
            html_ += `</div>`
          }
          if (description){
            html_ += `<div class="pkb-block-post-description">`
              html_ += `<p class="pkb-block-post-description__text">${description}</p>`
            html_ += `</div>`
          }
  html_ += `</div></div></div>`
  getFeaturePost.innerHTML = html_;
  var timer = setInterval(function() {
      clearInterval(timer);
      innerElements()
  }, 50);
  function innerElements() {
    loadImage('', image, `.${mainClass}__image`, false);
  }

  return getFeaturePost;
}
function $selector(selector) {
  var $this = document.querySelector(selector)
  if ($this != null) return $this;
}
function $remove(selector, newElement) {
  var element = newElement ? newElement : $selector(selector);
  if (element != null) return element.remove();
}
function filterIncludes(arrayValues, src) {
  const values = arrayValues?.filter(value => src?.includes(value));
  return values.length
};


