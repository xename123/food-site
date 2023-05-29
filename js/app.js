(() => {
  "use strict";
  const modules_flsModules = {};
  function isWebp() {
    function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
      let className = support === true ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    });
  }
  function functions_getHash() {
    if (location.hash) return location.hash.replace("#", "");
  }
  function setHash(hash) {
    hash = hash ? `#${hash}` : window.location.href.split("#")[0];
    history.pushState("", "", hash);
  }
  let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = !showmore ? true : false;
        !showmore ? target.style.removeProperty("height") : null;
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        !showmore ? target.style.removeProperty("overflow") : null;
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        document.dispatchEvent(
          new CustomEvent("slideUpDone", {
            detail: {
              target,
            },
          })
        );
      }, duration);
    }
  };
  let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty("height") : null;
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        document.dispatchEvent(
          new CustomEvent("slideDownDone", {
            detail: {
              target,
            },
          })
        );
      }, duration);
    }
  };
  let bodyLockStatus = true;
  let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px";
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
      document.documentElement.classList.add("lock");
      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  function tabs() {
    const tabs = document.querySelectorAll("[data-tabs]");
    let tabsActiveHash = [];
    if (tabs.length > 0) {
      const hash = functions_getHash();
      if (hash && hash.startsWith("tab-"))
        tabsActiveHash = hash.replace("tab-", "").split("-");
      tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add("_tab-init");
        tabsBlock.setAttribute("data-tabs-index", index);
        tabsBlock.addEventListener("click", setTabsAction);
        initTabs(tabsBlock);
      });
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length)
        mdQueriesArray.forEach((mdQueriesItem) => {
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            setTitlePosition(
              mdQueriesItem.itemsArray,
              mdQueriesItem.matchMedia
            );
          });
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
    }
    function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach((tabsMediaItem) => {
        tabsMediaItem = tabsMediaItem.item;
        let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
        let tabsTitleItems =
          tabsMediaItem.querySelectorAll("[data-tabs-title]");
        let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
        let tabsContentItems =
          tabsMediaItem.querySelectorAll("[data-tabs-item]");
        tabsTitleItems = Array.from(tabsTitleItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems = Array.from(tabsContentItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems.forEach((tabsContentItem, index) => {
          if (matchMedia.matches) {
            tabsContent.append(tabsTitleItems[index]);
            tabsContent.append(tabsContentItem);
            tabsMediaItem.classList.add("_tab-spoller");
          } else {
            tabsTitles.append(tabsTitleItems[index]);
            tabsMediaItem.classList.remove("_tab-spoller");
          }
        });
      });
    }
    function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
      if (tabsActiveHashBlock) {
        const tabsActiveTitle = tabsBlock.querySelector(
          "[data-tabs-titles]>._tab-active"
        );
        tabsActiveTitle
          ? tabsActiveTitle.classList.remove("_tab-active")
          : null;
      }
      if (tabsContent.length) {
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          tabsTitles[index].setAttribute("data-tabs-title", "");
          tabsContentItem.setAttribute("data-tabs-item", "");
          if (tabsActiveHashBlock && index == tabsActiveHash[1])
            tabsTitles[index].classList.add("_tab-active");
          tabsContentItem.hidden =
            !tabsTitles[index].classList.contains("_tab-active");
        });
      }
    }
    function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
        if (tabsBlock.hasAttribute("data-tabs-animate"))
          return tabsBlock.dataset.tabsAnimate > 0
            ? Number(tabsBlock.dataset.tabsAnimate)
            : 500;
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
        const isHash = tabsBlock.hasAttribute("data-tabs-hash");
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          if (tabsTitles[index].classList.contains("_tab-active")) {
            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate);
            else tabsContentItem.hidden = false;
            if (isHash && !tabsContentItem.closest(".popup"))
              setHash(`tab-${tabsBlockIndex}-${index}`);
          } else if (tabsBlockAnimate)
            _slideUp(tabsContentItem, tabsBlockAnimate);
          else tabsContentItem.hidden = true;
        });
      }
    }
    function setTabsAction(e) {
      const el = e.target;
      if (el.closest("[data-tabs-title]")) {
        const tabTitle = el.closest("[data-tabs-title]");
        const tabsBlock = tabTitle.closest("[data-tabs]");
        if (
          !tabTitle.classList.contains("_tab-active") &&
          !tabsBlock.querySelector("._slide")
        ) {
          let tabActiveTitle = tabsBlock.querySelectorAll(
            "[data-tabs-title]._tab-active"
          );
          tabActiveTitle.length
            ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
                (item) => item.closest("[data-tabs]") === tabsBlock
              ))
            : null;
          tabActiveTitle.length
            ? tabActiveTitle[0].classList.remove("_tab-active")
            : null;
          tabTitle.classList.add("_tab-active");
          setTabsStatus(tabsBlock);
        }
        e.preventDefault();
      }
    }
  }
  function menuInit() {
    if (document.querySelector(".icon-menu"))
      document.addEventListener("click", function (e) {
        if (bodyLockStatus && e.target.closest(".icon-menu")) menuOpen();
        if (bodyLockStatus && e.target.closest(".menu-header__close"))
          functions_menuClose();
      });
  }
  function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
  }
  function functions_menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
  }
  function functions_FLS(message) {
    setTimeout(() => {
      if (window.FLS) console.log(message);
    }, 0);
  }
  function uniqArray(array) {
    return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  }
  function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue])
        return item.dataset[dataSetValue].split(",")[0];
    });
    if (media.length) {
      const breakpointsArray = [];
      media.forEach((item) => {
        const params = item.dataset[dataSetValue];
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      let mdQueries = breakpointsArray.map(function (item) {
        return (
          "(" +
          item.type +
          "-width: " +
          item.value +
          "px)," +
          item.value +
          "," +
          item.type
        );
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];
      if (mdQueries.length) {
        mdQueries.forEach((breakpoint) => {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);
          const itemsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType)
              return true;
          });
          mdQueriesArray.push({
            itemsArray,
            matchMedia,
          });
        });
        return mdQueriesArray;
      }
    }
  }
  class Popup {
    constructor(options) {
      let config = {
        logging: true,
        init: true,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-popup-youtube",
        youtubePlaceAttribute: "data-popup-youtube-place",
        setAutoplayYoutube: true,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: true,
        closeEsc: true,
        bodyLock: true,
        hashSettings: {
          location: true,
          goHash: true,
        },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      this.youTubeCode;
      this.isOpen = false;
      this.targetOpen = {
        selector: false,
        element: false,
      };
      this.previousOpen = {
        selector: false,
        element: false,
      };
      this.lastClosed = {
        selector: false,
        element: false,
      };
      this._dataValue = false;
      this.hash = false;
      this._reopen = false;
      this._selectorOpen = false;
      this.lastFocusEl = false;
      this._focusEl = [
        "a[href]",
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        "button:not([disabled]):not([aria-hidden])",
        "select:not([disabled]):not([aria-hidden])",
        "textarea:not([disabled]):not([aria-hidden])",
        "area[href]",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        '[tabindex]:not([tabindex^="-"])',
      ];
      this.options = {
        ...config,
        ...options,
        classes: {
          ...config.classes,
          ...options?.classes,
        },
        hashSettings: {
          ...config.hashSettings,
          ...options?.hashSettings,
        },
        on: {
          ...config.on,
          ...options?.on,
        },
      };
      this.bodyLock = false;
      this.options.init ? this.initPopups() : null;
    }
    initPopups() {
      this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const buttonOpen = e.target.closest(
            `[${this.options.attributeOpenButton}]`
          );
          if (buttonOpen) {
            e.preventDefault();
            this._dataValue = buttonOpen.getAttribute(
              this.options.attributeOpenButton
            )
              ? buttonOpen.getAttribute(this.options.attributeOpenButton)
              : "error";
            this.youTubeCode = buttonOpen.getAttribute(
              this.options.youtubeAttribute
            )
              ? buttonOpen.getAttribute(this.options.youtubeAttribute)
              : null;
            if (this._dataValue !== "error") {
              if (!this.isOpen) this.lastFocusEl = buttonOpen;
              this.targetOpen.selector = `${this._dataValue}`;
              this._selectorOpen = true;
              this.open();
              return;
            } else
              this.popupLogging(
                `Ой ой, не заполнен атрибут у ${buttonOpen.classList}`
              );
            return;
          }
          const buttonClose = e.target.closest(
            `[${this.options.attributeCloseButton}]`
          );
          if (
            buttonClose ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
          ) {
            e.preventDefault();
            this.close();
            return;
          }
        }.bind(this)
      );
      document.addEventListener(
        "keydown",
        function (e) {
          if (
            this.options.closeEsc &&
            e.which == 27 &&
            e.code === "Escape" &&
            this.isOpen
          ) {
            e.preventDefault();
            this.close();
            return;
          }
          if (this.options.focusCatch && e.which == 9 && this.isOpen) {
            this._focusCatch(e);
            return;
          }
        }.bind(this)
      );
      if (this.options.hashSettings.goHash) {
        window.addEventListener(
          "hashchange",
          function () {
            if (window.location.hash) this._openToHash();
            else this.close(this.targetOpen.selector);
          }.bind(this)
        );
        window.addEventListener(
          "load",
          function () {
            if (window.location.hash) this._openToHash();
          }.bind(this)
        );
      }
    }
    open(selectorValue) {
      if (bodyLockStatus) {
        this.bodyLock =
          document.documentElement.classList.contains("lock") && !this.isOpen
            ? true
            : false;
        if (
          selectorValue &&
          typeof selectorValue === "string" &&
          selectorValue.trim() !== ""
        ) {
          this.targetOpen.selector = selectorValue;
          this._selectorOpen = true;
        }
        if (this.isOpen) {
          this._reopen = true;
          this.close();
        }
        if (!this._selectorOpen)
          this.targetOpen.selector = this.lastClosed.selector;
        if (!this._reopen) this.previousActiveElement = document.activeElement;
        this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        );
        if (this.targetOpen.element) {
          if (this.youTubeCode) {
            const codeVideo = this.youTubeCode;
            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
            const iframe = document.createElement("iframe");
            iframe.setAttribute("allowfullscreen", "");
            const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
            iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
            iframe.setAttribute("src", urlVideo);
            if (
              !this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              )
            ) {
              this.targetOpen.element
                .querySelector(".popup__text")
                .setAttribute(`${this.options.youtubePlaceAttribute}`, "");
            }
            this.targetOpen.element
              .querySelector(`[${this.options.youtubePlaceAttribute}]`)
              .appendChild(iframe);
          }
          if (this.options.hashSettings.location) {
            this._getHash();
            this._setHash();
          }
          this.options.on.beforeOpen(this);
          document.dispatchEvent(
            new CustomEvent("beforePopupOpen", {
              detail: {
                popup: this,
              },
            })
          );
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          );
          document.documentElement.classList.add(
            this.options.classes.bodyActive
          );
          if (!this._reopen) !this.bodyLock ? bodyLock() : null;
          else this._reopen = false;
          this.targetOpen.element.setAttribute("aria-hidden", "false");
          this.previousOpen.selector = this.targetOpen.selector;
          this.previousOpen.element = this.targetOpen.element;
          this._selectorOpen = false;
          this.isOpen = true;
          setTimeout(() => {
            this._focusTrap();
          }, 50);
          this.options.on.afterOpen(this);
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", {
              detail: {
                popup: this,
              },
            })
          );
          this.popupLogging(`Открыл попап`);
        } else
          this.popupLogging(
            `Ой ой, такого попапа нет.Проверьте корректность ввода. `
          );
      }
    }
    close(selectorValue) {
      if (
        selectorValue &&
        typeof selectorValue === "string" &&
        selectorValue.trim() !== ""
      )
        this.previousOpen.selector = selectorValue;
      if (!this.isOpen || !bodyLockStatus) return;
      this.options.on.beforeClose(this);
      document.dispatchEvent(
        new CustomEvent("beforePopupClose", {
          detail: {
            popup: this,
          },
        })
      );
      if (this.youTubeCode)
        if (
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          )
        )
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ).innerHTML = "";
      this.previousOpen.element.classList.remove(
        this.options.classes.popupActive
      );
      this.previousOpen.element.setAttribute("aria-hidden", "true");
      if (!this._reopen) {
        document.documentElement.classList.remove(
          this.options.classes.bodyActive
        );
        !this.bodyLock ? bodyUnlock() : null;
        this.isOpen = false;
      }
      this._removeHash();
      if (this._selectorOpen) {
        this.lastClosed.selector = this.previousOpen.selector;
        this.lastClosed.element = this.previousOpen.element;
      }
      this.options.on.afterClose(this);
      document.dispatchEvent(
        new CustomEvent("afterPopupClose", {
          detail: {
            popup: this,
          },
        })
      );
      setTimeout(() => {
        this._focusTrap();
      }, 50);
      this.popupLogging(`Закрыл попап`);
    }
    _getHash() {
      if (this.options.hashSettings.location)
        this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#");
    }
    _openToHash() {
      let classInHash = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      const buttons = document.querySelector(
        `[${this.options.attributeOpenButton} = "${classInHash}"]`
      )
        ? document.querySelector(
            `[${this.options.attributeOpenButton} = "${classInHash}"]`
          )
        : document.querySelector(
            `[${this.options.attributeOpenButton} = "${classInHash.replace(
              ".",
              "#"
            )}"]`
          );
      if (buttons && classInHash) this.open(classInHash);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);
      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }
    _focusTrap() {
      const focusable = this.previousOpen.element.querySelectorAll(
        this._focusEl
      );
      if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus();
      else focusable[0].focus();
    }
  }
  modules_flsModules.popup = new Popup({});
  let addWindowScrollEvent = false;
  setTimeout(() => {
    if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(windowScroll);
      });
    }
  }, 0);
  const productCart = document.querySelector(".nav-page__cart");
  document.addEventListener("click", documentActions);
  function documentActions(e) {
    const el = e.target;
    if (
      productCart &&
      el.closest(".nav-page__cart") &&
      !el.closest(".nav-page__products")
    )
      productCart.classList.toggle("nav-page__cart_active");
    else if (productCart && !el.closest(".nav-page__products"))
      productCart.classList.remove("nav-page__cart_active");
    if (el.closest(".tabs-meal__button")) {
      const productItem = el.closest(".tabs-meal__item").dataset.id;
      const productButton = el.closest(".tabs-meal__button");
      addToCart(productItem, productButton);
    }
    if (el.closest(".buy-product__button")) {
      const productId = el.closest(".buy-product__button").dataset.pid;
      const productButton = el.closest(".buy-product__button");
      const input = document.querySelector(".buy-product__input");
      const inputValue = input.value;
      updateCart(productId, productButton, inputValue);
    }
    if (el.closest(".nav-page__delete")) {
      const productId = el.closest(".nav-page__item").dataset.cartId;
      updateCart(productId, el, null, false);
    }
    if (el.closest(".buy-product__more")) {
      const input = document.querySelector(".buy-product__input");
      input.value = ++input.value;
    }
    if (el.closest(".buy-product__less")) {
      const input = document.querySelector(".buy-product__input");
      input.value = --input.value;
    }
    if (el.closest(".card-product__image"))
      if (el.closest(".card-product__image_main")) return false;
      else {
        const currentImage = el.closest(".card-product__image").innerHTML;
        const mainImage = document.querySelector(".card-product__image_main");
        mainImage.innerHTML = currentImage;
      }
  }
  function updateCart(itemId, productButton, inputValue, productAdd = true) {
    fetch("dilivery.html")
      .then((response) => response.text())
      .then((data) => {
        var parser = new DOMParser();
        var htmlDocument = parser.parseFromString(data, "text/html");
        const cart = document.querySelector(".nav-page__cart");
        const cartIcon = document.querySelector(".nav-page__cart._icon-cart");
        const cartProduct = document.querySelector(
          `[data-cart-id='${itemId}']`
        );
        const cartQuantity = document.querySelector(".nav-page__cart > span");
        const cartlist = document.querySelector(".nav-page__products");
        let quantityOfProducts = 0;
        if (inputValue) {
          quantityOfProducts = inputValue;
        } else quantityOfProducts = 1;
        if (productAdd) {
          if (cartQuantity)
            if (inputValue)
              cartQuantity.innerHTML = +cartQuantity.innerHTML + +inputValue;
            else cartQuantity.innerHTML = ++cartQuantity.innerHTML;
          else
            cartIcon.insertAdjacentHTML(
              "beforeend",
              `<span>${quantityOfProducts}</span>`
            );
          if (!cartProduct) {
            const product = htmlDocument.querySelector(`[data-id="${itemId}"]`);
            const cartProductImage =
              product.querySelector(".tabs-meal__image").innerHTML;
            const cartProductName =
              product.querySelector(".tabs-meal__name").innerHTML;
            const cartProductPrice =
              product.querySelector(".tabs-meal__price").innerHTML;
            const cartProductContent = `\n      <a href="product.html" class="nav-page__image nav-page__image-i">${cartProductImage}</a>\n    <div class="nav-page__body">\n      <a href="" class="nav-page__name">${cartProductName}</a>\n    <div class="nav-page__price">${cartProductPrice}</div>\n      <div class="nav-page__quantity">Количество: <span>${quantityOfProducts}</span></div>\n      <button type="submit" class="nav-page__delete">удалить</button>\n    </div>\n      `;
            cartlist.insertAdjacentHTML(
              "beforeend",
              `<div data-cart-id='${itemId}' class="nav-page__item">${cartProductContent}</div>`
            );
          } else {
            const cartProductQuantity = cartProduct.querySelector(
              ".nav-page__quantity > span"
            );
            if (inputValue)
              cartProductQuantity.innerHTML =
                +cartProductQuantity.innerHTML + +inputValue;
            else
              cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
          }
          productButton.classList.remove("_hold");
        } else {
          const cartProductQuantity = cartProduct.querySelector(
            ".nav-page__quantity span"
          );
          cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
          if (!parseInt(cartProductQuantity.innerHTML)) cartProduct.remove();
          const cartQuantityValue = --cartQuantity.innerHTML;
          if (cartQuantityValue) cartQuantity.innerHTML = cartQuantityValue;
          else {
            cartQuantity.remove();
            cart.classList.remove("_active");
          }
        }
      });
  }
  function addToCart(itemId, productButton) {
    if (!productButton.classList.contains("_hold")) {
      productButton.classList.add("_hold");
      productButton.classList.add("_fly");
      const cart = document.querySelector(".nav-page__cart");
      const productItem = document.querySelector(`[data-id="${itemId}"] `);
      const productImage = productItem.querySelector(".tabs-meal__image");
      const productImageFly = productImage.cloneNode(true);
      const productImageFlyWidth = productImage.offsetWidth;
      const productImageFlyHeight = productImage.offsetHeight;
      const productImageFlyTop = productImage.getBoundingClientRect().top;
      const productImageFlyLeft = productImage.getBoundingClientRect().left;
      productImageFly.setAttribute("class", "_flyImage _flyImage-ibg");
      productImageFly.style.cssText = `\n    left: ${productImageFlyLeft}px;\n    top: ${productImageFlyTop}px;\n    width: ${productImageFlyWidth}px;\n    height: ${productImageFlyHeight}px`;
      document.body.append(productImageFly);
      const cartFlyLeft = cart.getBoundingClientRect().left;
      const cartFlyTop = cart.getBoundingClientRect().top;
      productImageFly.style.cssText = `\n    left: ${cartFlyLeft}px;\n    top: ${cartFlyTop}px;\n    width: 0px;\n    height: 0px;\n    opacity: 0;`;
      productImageFly.addEventListener("transitionend", () => {
        if (productButton.classList.contains("_fly")) {
          productImageFly.remove();
          updateCart(itemId, productButton);
          productButton.classList.remove("_fly");
        }
      });
    }
  }
  window["FLS"] = true;
  isWebp();
  menuInit();
  tabs();
})();
