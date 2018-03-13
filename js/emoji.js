if (!window.Emoji) var Emoji = {
  EMOJI_SPRITES_NUM: 3,
  opts: {},
  last: 0,
  shownId: !1,
  hasNewStickers: !1,
  preventMouseOver: !1,
  ttShift: 45,
  stickers: {},
  TAB_EMOJI: 0,
  TAB_RECENT_STICKERS: -1,
  init: function (e, i) {
    var t = Emoji.last;
    if (i.txt = e, i.id = t, i.fieldWrap = gpeByClass("_emoji_field_wrap", e), i.emojiWrap = domByClass(i.fieldWrap, "_emoji_wrap"), i.emojiBtn = domByClass(i.emojiWrap, "_emoji_btn"), i.emojiWrap && data(i.emojiWrap, "optId", t), e.emojiId = t, i.forceTxt) i.editable = 0, placeholderInit(e);
    else {
      if (i.editable = 1, setTimeout(function () {
          placeholderInit(e, {
            editable: 1,
            editableFocus: Emoji.editableFocus,
            global: i.global
          }), i.shouldFocus && Emoji.editableFocus(e, !1, !0)
        }, 0), browser.mozilla) try {
        document.execCommand("enableObjectResizing", !1, !1), cur.destroy.push(function () {
          document.execCommand("enableObjectResizing", !1, !0)
        })
      } catch (e) {}
      addEvent(window, "mousemove", Emoji.preventMouseOverHandle), addEvent(e, browser.opera && !browser.chrome ? "click" : "mousedown", function (D) {
        return D.target && "IMG" == D.target.tagName && Emoji.getCode(D.target) ? (Emoji.editableFocus(e, D.target, D.offsetX > 8), cancelEvent(D)) : void(Emoji.shown && Emoji.ttClick(t, geByClass1("emoji_smile", i.controlsCont), !0))
      }), i.noLineBreaks && addEvent(e, "blur", function (i) {
        e.textContent || e.innerText || each(geByTag("br", e), function (e, i) {
          re(i)
        })
      }), addEvent(e, "keypress keydown keyup paste", function (D) {
        if (D.canceled) return !1;
        if ("keydown" == D.type) {
          var o = i.ctrlSend ? i.ctrlSend() : i.noEnterSend;
          if (D.keyCode == KEY.RETURN || 10 == D.keyCode) {
            if (i.forceEnterSend && i.onSend) return i.onSend(), cancelEvent(D);
            var s = cur.ctrl_submit && !i.noCtrlSend;
            if ((s || o) && (D.ctrlKey || browser.mac && D.metaKey) || !s && !D.shiftKey && !(D.ctrlKey || browser.mac && D.metaKey)) {
              var r = data(e, "composer");
              if (!Emoji.emojiEnter(t, D) || !Emoji.stickerHintMove(D) || r && r.wdd && isVisible(r.wdd.listWrap)) return !1;
              if (!o || D.ctrlKey || browser.mac && D.metaKey) return Emoji.ttClick(t, geByClass1("emoji_smile", i.controlsCont), !0), i.onSend && i.onSend(), cancelEvent(D)
            }
            if (i.noLineBreaks) return cancelEvent(D)
          }
          if (D.ctrlKey && D.keyCode == KEY.RETURN) {
            var n = this.value;
            if (i.editable) Emoji.insertHTML("<div><br/></div>");
            else {
              if ("number" == typeof this.selectionStart && "number" == typeof this.selectionEnd) {
                var a = this.selectionStart;
                this.value = n.slice(0, a) + "\n" + n.slice(this.selectionEnd), this.selectionStart = this.selectionEnd = a + 1
              } else if (document.selection && document.selection.createRange) {
                this.focus();
                var c = document.selection.createRange();
                c.text = "\r\n", c.collapse(!1), browser.opera && !browser.chrome && (c.moveEnd("character", 0), c.moveStart("character", 0)), c.select()
              }
              e.autosize.update(), setTimeout(function () {
                e.autosize.update()
              }, 0)
            }
            return !1
          }
          if (D.keyCode == KEY.TAB && !(D.ctrlKey || browser.mac && D.metaKey)) {
            var l = geByClass1("_sticker_hints", domPN(i.txt));
            if (l && isVisible(l)) {
              var m = geByClass1("over", l);
              if (m ? Emoji.stickerHintKeyOut(t, m) : Emoji.stickerHintKeyOver(t, geByClass1("emoji_sticker_item", l)), !Emoji.shown) return cancelEvent(D)
            }
            return Emoji.shown ? (Emoji.editableFocus(e, !1, !0, void 0, !0), Emoji.ttClick(t, geByClass1("emoji_smile", i.controlsCont), !0)) : Emoji.ttClick(t, geByClass1("emoji_smile", i.controlsCont), !1, !0, void 0, !0), cancelEvent(D)
          }
          if (D.keyCode == KEY.ESC) {
            var l = geByClass1("_sticker_hints", domPN(i.txt)),
              E = !1;
            if (l && isVisible(l) && (Emoji.stickerHintKeyOut(t, geByClass1("emoji_sticker_item", l)), Emoji.stickersHintsHide(l, i, 100), E = !0), Emoji.shown && (Emoji.editableFocus(e, !1, !0, void 0, !0), Emoji.ttClick(t, geByClass1("emoji_smile", i.controlsCont), !0), E = !0), E) return cancelEvent(D);
            if (i.onEsc) return i.onEsc(D)
          }
        }
        return "paste" == D.type ? (Emoji.onEditablePaste(e, i, t, D), i.checkEditable && setTimeout(i.checkEditable.pbind(t, e), 0), Emoji.checkStickersKeywords(t, i)) : "keyup" == D.type ? (!i.noLineBreaks || e.textContent || e.innerText || each(geByTag("br", e), function (e, i) {
          re(i)
        }), i.checkEditable && i.checkEditable(t, e), Emoji.checkStickersKeywords(t, i)) : "keydown" == D.type && (i.checkEditable && setTimeout(i.checkEditable.pbind(t, e), 0), Emoji.checkStickersKeywords(t, i)), i.onKeyAction && i.onKeyAction(D), cur.onReplyFormSizeUpdate && cur.onReplyFormSizeUpdate(D), !0
      })
    }
    return window.Notifier && Notifier.addRecvClbk("emoji", 0, Emoji.lcRecv, !0), Emoji.initStickersKeywords(), Emoji.checkNewStickers(i), Emoji.opts[Emoji.last] = i, Emoji.last++
  },
  preventMouseOverHandle: function () {
    Emoji.preventMouseOver = !1
  },
  lcRecv: function (e) {
    switch (e.act) {
      case "updateTabs":
        Emoji.updateTabs(e.newStickers, e.keywords)
    }
  },
  correctCaret: function (e) {
    var i = getCaretBoundingRect(e).bottom;
    (i < 0 || i > e.offsetHeight) && (e.scrollTop += i - e.offsetHeight)
  },
  insertWithBr: function (e, i) {
    if (i) {
      var t = i.replace(/\n/g, "<br/>"),
        D = ce("div", {
          innerHTML: t
        });
      Emoji.cleanCont(D), Emoji.insertHTML(D.innerHTML)
    }
  },
  insertWithoutNL: function (e, i) {
    if (i) {
      var t = i.replace(/\n/g, ""),
        D = ce("div", {
          innerHTML: t
        });
      Emoji.cleanCont(D), Emoji.insertHTML(D.innerHTML)
    }
  },
  focusTrick: function (e, i, t, D, o) {
    o || (o = e);
    var s = ce("TEXTAREA", {
      className: "emoji_tmp_textarea"
    });
    e.parentNode.appendChild(s), s.focus(), setTimeout(function () {
      var r = o.scrollTop;
      re(s), e.focus(), o.scrollTop = r, Emoji.setRange(D), i(clean(val(s))), t(e)
    }, 0)
  },
  finalizeInsert: function (e) {
    Emoji.cleanCont(e), setTimeout(Emoji.correctCaret.pbind(e), 10)
  },
  getClipboard: function (e) {
    return e.clipboardData ? clean(e.clipboardData.getData("text")) : !!window.clipboardData && clean(window.clipboardData.getData("Text"))
  },
  processImagePaste: function (e, i, t, D) {
    function o(e) {
      var D, o;
      if (e.name = e.filename = "upload_" + (new Date).toISOString() + "_" + irand(0, 100) + ".png", hasClass(i, "_im_text")) {
        if (t.uploadActions) return void t.uploadActions.paste([e])
      } else "post_field" == i.id ? D = cur.wallAddMedia : (o = data(i, "composer"), D = o && o.addMedia);
      D && isFunction(t.initUploadForImagePasteCallback) && t.initUploadForImagePasteCallback(i, D, e)
    }

    function s(e) {
      for (var t = Math.floor(1e3 * Math.random()), o = geByTag("img", i), s = 0, r = o.length; s < r; s++) {
        var n = o[s];
        n["_before_paste_" + t] = !0
      }
      return setTimeout(function () {
        for (var o = geByTag("img", i), s = !1, r = 0, n = o.length; r < n; r++) {
          var a = o[r];
          a["_before_paste_" + t] || (e(a.src), re(a), s = !0)
        }
        s || D()
      }, 1)
    }

    function r(e) {
      if (!e.match(/^webkit\-fake\-url\:\/\//)) {
        var i = new Image;
        return i.crossOrigin = "anonymous", i.onload = function () {
          var e = document.createElement("canvas");
          e.width = i.width, e.height = i.height;
          var t = e.getContext("2d");
          t.drawImage(i, 0, 0, e.width, e.height), e.toBlob(function (e) {
            o(e)
          }, "image/png"), D(!0)
        }, i.src = e
      }
    }
    if (null != e.clipboardData) {
      var n = e.clipboardData;
      if (n.items) {
        for (var a = !1, c = 0, l = n.items.length; c < l; c++) {
          var m = n.items[c];
          if (m.type.match(/^image\//)) {
            var E = new FileReader;
            E.onload = function (e) {
              return r(e.target.result)
            }, E.readAsDataURL(m.getAsFile()), a = !0
          } else if ("text/plain" === m.type) return D()
        }
        return a
      }
      if (-1 !== Array.prototype.indexOf.call(n.types, "text/plain")) return D();
      s(function (e) {
        return r(e)
      })
    } else D()
  },
  onEditablePaste: function (e, i, t, D, o) {
    var s = !1;
    "true" === e.getAttribute("contenteditable") && (s = Emoji.getRange());
    var r = this.getClipboard(D),
      n = r && s && !o;
    D.clipboardData && inArray("text/html", D.clipboardData.types) && inArray("Files", D.clipboardData.types) && cancelEvent(D);
    var a = this.processImagePaste(D, e, i, function (t) {
      t || (n ? (i.noLineBreaks ? this.insertWithoutNL(s, r) : this.insertWithBr(s, r), setTimeout(this.finalizeInsert.bind(this, e), 0)) : s && this.focusTrick(e, i.noLineBreaks ? this.insertWithoutNL.pbind(s) : this.insertWithBr.pbind(s), this.finalizeInsert.bind(this, e), s))
    }.bind(this));
    (a || n) && cancelEvent(D)
  },
  cleanCont: function (e) {
    for (var i = e.firstChild; i;) {
      var t = i.nextSibling;
      switch (i.nodeType) {
        case 1:
          if ("tmp_paste_cont" == i.id) break;
          if ("DIV" == i.tagName || "P" == i.tagName || "SPAN" == i.tagName) i.setAttribute("style", ""), i.className = "", i.id = "", Emoji.cleanCont(i);
          else if ("IMG" == i.tagName) Emoji.getCode(i) || re(i);
          else if ("BR" != i.tagName) {
            var D = Emoji.editableVal(i, {
                saveEmoji: !0
              }),
              o = cf(clean(D).replace(/\n/g, "<br/>"));
            o.lastChild;
            i.parentNode.replaceChild(o, i)
          }
          break;
        case 3:
          var s = clean(i.textContent || i.innerText);
          s && s.match(Emoji.emojiRegEx) && (s = s.replace(Emoji.emojiRegEx, Emoji.emojiReplace), i.parentNode.replaceChild(cf(s), i))
      }
      i = t
    }
  },
  focus: function (e, i) {
    Emoji.editableFocus(e, !1, !0);
    var t = e.parentNode;
    if (i) {
      var D = getXY(t)[1],
        o = scrollGetY(),
        s = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : boxLayerBG.offsetHeight,
        r = getSize(t)[1];
      o + s < D + r ? scrollToY(D - s + r + 60, 100) : o > D && scrollToY(D - 60, 100)
    }
  },
  destroy: function (e) {
    Emoji.opts[e].txt.blur(), Emoji.opts[e].imagesLoader && Emoji.opts[e].imagesLoader.destroy(), delete Emoji.opts[e]
  },
  editableFocus: function (e, i, t, D, o) {
    if (!e || o && document.activeElement === e) return !1;
    if (e = ge(e), e.focus(), e.phonfocus && e.phonfocus(), "undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
      var s = window.getSelection();
      if (!browser.opera || browser.chrome || t) {
        var r = document.createRange();
        i ? r.selectNode(i) : r.selectNodeContents(e), browser.mozilla && "<br>" === e.innerHTML && (e.innerHTML = ""), D || r.collapse(!t);
        var s = window.getSelection();
        s.removeAllRanges(), s.addRange(r)
      } else s.collapse(i || e, 0)
    } else if ("undefined" != typeof document.body.createTextRange) {
      var n = document.body.createTextRange();
      n.moveToElementText(i || e), n.collapse(!t), n.select()
    }
  },
  getRange: function () {
    if (window.getSelection) {
      if (sel = window.getSelection(), sel.getRangeAt && sel.rangeCount) return sel.getRangeAt(0)
    } else if (document.selection && document.selection.createRange) return document.selection.createRange();
    return null
  },
  setRange: function (e) {
    window.getSelection ? (sel = window.getSelection(), sel.removeAllRanges(), sel.addRange(e)) : document.selection && e.select && e.select()
  },
  val: function (e, i) {
    if (void 0 === i) return Emoji.editableVal(e);
    i = Emoji.emojiToHTML(i, !0), i = i.replace(/ $/, "&nbsp;"), e.setValue ? (e.setValue(i), e.phonblur && e.phonblur()) : e.innerHTML = i, Emoji.updateStickersHints();
    var t = data(e, "composer");
    return t && window.Composer && setTimeout(Composer.updateAutoComplete.pbind(t)), !0
  },
  editableVal: function (e, i) {
    if (!e) return "";
    if ("TEXTAREA" == e.tagName) return val(e);
    for (var t = e.firstChild, D = "", o = new RegExp("^(DIV|P|LI|OL|TR|TD|BLOCKQUOTE)$"); t;) {
      switch (t.nodeType) {
        case 3:
          var s = t.data.replace(/^\n|\n$/g, " ").replace(/[\n\xa0]/g, " ").replace(/[ ]+/g, " ");
          D += s;
          break;
        case 1:
          var s = Emoji.editableVal(t);
          if (t.tagName && t.tagName.match(o) && s) {
            "\n" != s.substr(-1) && (s += "\n");
            for (var r = t.previousSibling; r && 3 == r.nodeType && "" == trim(r.nodeValue);) r = r.previousSibling;
            !r || r.tagName && (r.tagName.match(o) || "BR" == r.tagName) || (s = "\n" + s)
          } else if ("IMG" == t.tagName) {
            var n = Emoji.getCode(t);
            n && (s += i && i.saveEmoji ? Emoji.getEmojiHTML(n) : Emoji.codeToChr(n))
          } else "BR" == t.tagName && (s += "\n");
          D += s
      }
      t = t.nextSibling
    }
    return D
  },
  cssEmoji: {
    D83DDE0A: [0, ":-)"],
    D83DDE03: [1, ":-D"],
    D83DDE09: [2, ";-)"],
    D83DDE06: [3, "xD"],
    D83DDE1C: [4, ";-P"],
    D83DDE0B: [5, ":-p"],
    D83DDE0D: [6, "8-)"],
    D83DDE0E: [7, "B-)"],
    D83DDE12: [8, ":-("],
    D83DDE0F: [9, ";-]"],
    D83DDE14: [10, "3("],
    D83DDE22: [11, ":'("],
    D83DDE2D: [12, ":_("],
    D83DDE29: [13, ":(("],
    D83DDE28: [14, ":o"],
    D83DDE10: [15, ":|"],
    D83DDE0C: [16, "3-)"],
    D83DDE20: [17, ">("],
    D83DDE21: [18, ">(("],
    D83DDE07: [19, "O:)"],
    D83DDE30: [20, ";o"],
    D83DDE33: [21, "8|"],
    D83DDE32: [22, "8o"],
    D83DDE37: [23, ":X"],
    D83DDE1A: [24, ":-*"],
    D83DDE08: [25, "}:)"],
    2764: [26, "<3"],
    D83DDC4D: [27, ":like:"],
    D83DDC4E: [28, ":dislike:"],
    "261D": [29, ":up:"],
    "270C": [30, ":v:"],
    D83DDC4C: [31, ":ok:"]
  },
  imgEmoji: {
    D83DDE15: 1,
    D83DDE1F: 1,
    D83DDE2E: 1,
    D83DDE34: 1
  },
  getEmojiHTML: function (e, i, t, D) {
    if (e.match(Emoji.emojiJoinersRegEx)) {
      if (e = e.replace("FE0F", "") + "FE0F", !inArray(e, Emoji.emojiWithJoiners)) {
        for (var o = e.replace("FE0F", "").split(Emoji.emojiJoinersRegEx), s = "", r = 0; r < o.length; r++) o[r] && (s += Emoji.getEmojiHTML(o[r], Emoji.codeToChr(o[r]), t, D));
        return s
      }
      i && (i = i.replace(/\uFE0F/g, ""), i += Emoji.codeToChr("FE0F"))
    }
    var n = browser.msie && intval(browser.version) > 8 ? ' contenteditable="false"' : "";
    if (void 0 != Emoji.cssEmoji[e]) {
      var a = 17 * -Emoji.cssEmoji[e][0];
      return "<img" + n + ' src="/images/blank.gif" emoji="' + e + '" ' + (i ? 'alt="' + i + '"' : i) + ' class="emoji_css" style="background-position: 0px ' + a + 'px;" />'
    }
    if (Emoji.imgEmoji[e] || !i || t) {
      if (D) {
        var c = e.toLowerCase(),
          l = parseInt(c, 16) % Emoji.EMOJI_SPRITES_NUM;
        return '<i class="emoji emoji_sprite_' + l + " emoji_" + c + '" emoji="' + e + '" ' + (i ? 'alt="' + i + '"' : "") + "></i>"
      }
      return '<img class="emoji" ' + (i ? 'alt="' + i + '"' : "") + ' src="/images/emoji/' + e + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.png" />'
    }
    return i
  },
  codeToChr: function (e) {
    for (var i = Math.round(e.length / 4), t = "", D = 0; i--;) t += String.fromCharCode(parseInt(e.substr(D, 4), 16)), D += 4;
    return t
  },
  checkEditable: function (e, i, t) {
    var D = i.scrollHeight,
      o = Emoji.opts[e];
    if (!o) return !1;
    o.scPaddings || (o.scPaddings = intval(getStyle(i, "paddingTop")) + intval(getStyle(i, "paddingBottom"))), D -= o.scPaddings;
    var s = o.tt;
    if (D > t.height + (browser.mozilla && o.isChat ? 0 : 5)) {
      if (!o.isSized) {
        setStyle(i, {
          height: t.height + "px",
          overflowY: "auto"
        });
        var r = geByClass1("emoji_smile", o.controlsCont),
          n = geByClass1("emoji_smile_icon_promo", o.controlsCont),
          a = ge("im_upload"),
          c = sbWidth();
        setStyle(r, vk.rtl ? {
          left: 1 + c
        } : {
          right: 1 + c
        }), n && setStyle(n, vk.rtl ? {
          left: 2 + c
        } : {
          right: 2 + c
        }), a && setStyle(a.parentNode, vk.rtl ? {
          left: 1 + c
        } : {
          right: 1 + c
        }), s && setStyle(s, vk.rtl ? {
          left: (o.ttDiff || 31) + c
        } : {
          right: (o.ttDiff || 31) + c
        }), o.isSized = !0
      }
    } else if (o.isSized) {
      setStyle(i, {
        height: "auto",
        overflowY: "hidden"
      });
      var r = geByClass1("emoji_smile", o.controlsCont),
        n = geByClass1("emoji_smile_icon_promo", o.controlsCont),
        a = ge("im_upload");
      setStyle(r, vk.rtl ? {
        left: 1
      } : {
        right: 1
      }), n && setStyle(n, vk.rtl ? {
        left: 2
      } : {
        right: 2
      }), a && setStyle(a.parentNode, vk.rtl ? {
        left: 1
      } : {
        right: 1
      }), s && setStyle(s, vk.rtl ? {
        left: o.ttDiff || 31
      } : {
        right: o.ttDiff || 31
      }), o.isSized = !1
    }
    o.onResize && o.onResize()
  },
  stickersHintsShow: function (e, i, t) {
    if (isVisible(e) || fadeIn(e, t), !i.stickerEventsInited) {
      var D = e && geByClass1("_sticker_hints_inner", e);
      i.onHintsWheel = Emoji.onWheelStickersHints.pbind(D), addEvent(D, "DOMMouseScroll wheel", i.onHintsWheel), addEvent(document, "keydown", Emoji.stickerHintMove), i.onHintsMouseDown = function () {
        i.hintsClicked = !0, setTimeout(function () {
          delete i.hintsClicked
        }, 0)
      }, addEvent(e, "mousedown", i.onHintsMouseDown), i.txt && (i.onTxtFocus && (removeEvent(i.txt, "focus", i.onTxtFocus), delete i.onTxtFocus), i.onTxtBlur = function (D) {
        return i.hintsClicked ? (cancelEvent(D), !0) : void Emoji.stickersHintsHide(e, i, t)
      }, addEvent(i.txt, "blur", i.onTxtBlur)), i.stickerEventsInited = !0
    }
    Emoji.checkStickersHintsSize(e, i)
  },
  stickersHintsHide: function (e, i, t) {
    if (fadeOut(e, t), removeEvent(document, "keydown", Emoji.stickerHintMove), i.onHintsMouseDown && removeEvent(e, "mousedown", Emoji.onHintsMouseDown), i.onHintsWheel) {
      var D = e && geByClass1("_sticker_hints_inner", e);
      removeEvent(D, "DOMMouseScroll wheel", Emoji.onHintsWheel)
    }
    i.txt && (i.onTxtBlur && (removeEvent(i.txt, "blur", i.onTxtBlur), delete i.onTxtBlur), i.onTxtFocus = function () {
      var e = i.txt && geByClass1("_sticker_hints", domPN(i.txt));
      e && !isVisible(e) && (delete i.stickerHintsString, Emoji.checkStickersKeywords(i.id, i, !1))
    }, addEvent(i.txt, "focus", i.onTxtFocus)), delete i.stickerEventsInited, delete Emoji.shownHintId
  },
  stickerHintOver: function (e) {
    Emoji.stickerHintOut(e), addClass(e, "over")
  },
  stickerHintOut: function (e) {
    each(geByClass("over", domPN(e)), function () {
      removeClass(this, "over")
    })
  },
  stickerHintClick: function (e, i, t) {
    var D = Emoji.opts[e] || {},
      o = D.txt,
      s = o && geByClass1("_sticker_hints", domPN(o)),
      r = "suggestion_" + Emoji.getStickersHintsQuery(o);
    return i < 0 ? Emoji.previewSticker(!1, t, {
      stickerId: -i,
      sticker_referrer: r
    }) : (val(o, ""), Emoji.stickerClick(e, i, 256, t, r), D.checkEditable && D.checkEditable(e, o)), Emoji.stickersHintsHide(s, D, 0), !1
  },
  stickerHintKeyOver: function (e, i) {
    Emoji.stickerHintOver(i), Emoji.shownHintId = e
  },
  stickerHintKeyOut: function (e, i) {
    Emoji.stickerHintOut(i), delete Emoji.shownHintId
  },
  stickerHintMove: function (e) {
    var i = Emoji.shownHintId;
    if (void 0 === i) return !0;
    var t = Emoji.opts[i],
      D = t && geByClass1("_sticker_hints", domPN(t.txt));
    if (D && isVisible(D)) {
      var o = geByClass1("over", D) || geByClass1("emoji_sticker_item", D);
      switch (e.keyCode) {
        case KEY.LEFT:
          return o = domPS(o), o && (Emoji.stickerHintOver(o), Emoji.checkStickersHintsScroll(o)), cancelEvent(e), !1;
        case KEY.RIGHT:
          return o = domNS(o), o && (Emoji.stickerHintOver(o), Emoji.checkStickersHintsScroll(o)), cancelEvent(e), !1;
        case KEY.ENTER:
          return o.click(), cancelEvent(e), !1
      }
    }
    return !0
  },
  checkStickersHintsSize: function (e, i, t) {
    t && (addClass(e, "_margin_transition"), removeClassDelayed(e, "_margin_transition")), setStyle(e, {
      marginLeft: 0
    });
    var D = 10,
      o = getXY(e),
      s = getSize(e),
      r = i.tt && getXY(i.tt);
    for (i.tt && r && r[0] && o[0] + s[0] + D > r[0] && o[1] + s[1] > r[1] && setStyle(e, {
        marginLeft: r[0] - o[0] - s[0] - D
      }); getXY(e)[0] < 0 && domFC(e);) re(domFC(e));
    domFC(e) || Emoji.stickersHintsHide(e, i, 0)
  },
  getStickersHintsQuery: function (e) {
    var i = Emoji.val(e);
    if (i.length > 30) return "";
    var t = window.cur.wallLayer ? wkcur : window.cur,
      D = t.reply_to && window.Wall && Wall.getReplyName(t.reply_to[0]);
    return D && D[1] && (i = i.replace(new RegExp("^(" + escapeRE(D[1]) + ")"), "")), each(Emoji.cssEmoji, function (e, t) {
      var D = new RegExp("(\\s|^)(" + escapeRE(t[1]) + (")" == t[1][t[1].length - 1] ? "+" : "") + ")([\\s\\.,]|$)", "g");
      i = i.replace(D, function (i, t, D, o) {
        return (t || "") + Emoji.codeToChr(e) + (o || "")
      })
    }), i = i.replace(/^[\s\uFEFF\xA0]+|[\.!\?\n]+$/g, "").toLowerCase().replace("ё", "е")
  },
  checkStickersKeywords: function (e, i, t) {
    if (i.noStickers || !window.stickersKeywords || !window.stickersKeywordsData || !window.stickersKeywordsData.length) return !1;
    var D = t ? 0 : 100,
      o = i.txt,
      s = geByClass1("_sticker_hints", domPN(o)),
      r = function () {
        var t = Emoji.getStickersHintsQuery(o);
        if (!s && (s = Emoji.initStickersHints(o), !s)) return !1;
        if (t != i.stickerHintsString) {
          if (t && stickersKeywords[t] && stickersKeywords[t].length) {
            var r = Emoji.sortStickersHints(o, stickersKeywords[t]),
              n = window.devicePixelRatio >= 2 ? "128" : "64",
              a = "";
            each(r, function () {
              a += rs(Emoji.hintsStickerItem(), {
                optId: e,
                selId: 0,
                stickerId: Math.abs(this),
                class: this < 0 ? "promo" : "",
                onclick: "Emoji.stickerHintClick(" + e + ", " + this + ", this)",
                stickerSize: n
              })
            }), Emoji.showStickersHints(s, i, a)
          } else Emoji.stickersHintsHide(s, i, D);
          i.stickerHintsString = t
        }
      };
    t ? r() : (clearTimeout(i.stickerHintTT), i.stickerHintTT = setTimeout(r, s && isVisible(s) ? 0 : 200))
  },
  showStickersHints: function (e, i, t) {
    var D = e && geByClass1("_sticker_hints_inner", e);
    return !!D && (val(D, t), Emoji.stickersHintsShow(e, i, 100), D.scrollLeft = 0, void Emoji.checkStickersHintsScroll(e, D.scrollLeft))
  },
  checkStickersHintsScroll: function (e, i) {
    var t = domClosest("_sticker_hints", e),
      D = t && geByClass1("_sticker_hints_inner", t),
      o = t && geByClass1("_sticker_left", t),
      s = t && geByClass1("_sticker_right", t);
    if (!D) return !1;
    if (hasClass(e, "emoji_sticker_item")) {
      var r = e.offsetLeft - 8 - getSize(o)[0],
        n = e.offsetLeft + getSize(e)[1] + 2 + getSize(s)[0] - D.clientWidth;
      D.scrollLeft > r && (D.scrollLeft = r), D.scrollLeft < n && (D.scrollLeft = n), i = D.scrollLeft
    }
    toggle(o, i > 0), toggle(s, i + D.clientWidth < D.scrollWidth)
  },
  scrollStickersHints: function (e, i, t) {
    var D = domClosest("_sticker_hints", e),
      o = D && geByClass1("_sticker_hints_inner", D),
      s = D && geByClass1("_sticker_left", D),
      r = D && geByClass1("_sticker_right", D);
    if (!o) return !1;
    var n = o.scrollLeft + i * (o.clientWidth - 2 * getSize(e)[0]),
      a = geByClass("emoji_sticker_item", o);
    each(a, function (e, t) {
      return i > 0 && t.offsetLeft - 8 - getSize(s)[0] > n ? (n = a[e - 1] && a[e - 1].offsetLeft - 8 - getSize(s)[0] || n, !1) : i < 0 && t.offsetLeft + getSize(t)[1] + 2 + getSize(r)[0] - o.clientWidth > n ? (n = t.offsetLeft + getSize(t)[1] + 2 + getSize(r)[0] - o.clientWidth || n, !1) : void 0
    }), n = Math.max(0, Math.min(o.scrollWidth - o.clientWidth, n)), animate(o, {
      scrollLeft: n
    }, {
      duration: Math.abs(o.scrollLeft - n) + 50,
      transition: Fx.Transitions.easeOutCubic
    }), Emoji.checkStickersHintsScroll(o, n)
  },
  onWheelStickersHints: function (e, i) {
    var t;
    "wheel" == i.type ? t = Math.abs(i.deltaY) > Math.abs(i.deltaX) ? -i.deltaY : -i.deltaX : void 0 !== i.wheelDeltaY ? t = i.wheelDeltaY : void 0 !== i.wheelDelta ? t = i.wheelDelta : i.detail && 2 === i.axis && (t = -i.detail), Math.abs(t) >= 120 && (t = 74 * Math.max(-1, Math.min(1, t))), e.scrollLeft -= t, Emoji.checkStickersHintsScroll(e, e.scrollLeft), cancelEvent(i)
  },
  sortStickersHints: function (e, i) {
    var t = (Emoji.stickers[-1] || {}).stickers || [],
      D = [],
      o = {};
    return each(t, function () {
      inArray(this[0], i) && (D.push(this[0]), o[this[0]] = 1)
    }), each(i, function () {
      o[this] || D.push(this)
    }), D
  },
  initStickersHints: function (e) {
    return !!e && domPN(e).insertBefore(se('<div class="_sticker_hints sticker_hints_tt"><div class="sticker_hints_arrow sticker_left _sticker_left" onclick="Emoji.scrollStickersHints(this, -1, event)"></div><div class="_sticker_hints_inner sticker_hints_inner"></div><div class="sticker_hints_arrow sticker_right _sticker_right" onclick="Emoji.scrollStickersHints(this, 1, event)"></div></div>'), e)
  },
  updateStickersHints: function (e) {
    Emoji.opts && each(Emoji.opts, function (i, t) {
      e && delete t.stickerHintsString, Emoji.checkStickersKeywords(i, t, !0)
    })
  },
  initStickersKeywords: function () {
    if (!window.stickersKeywordsData) {
      var e = ls.get("stickers_keywords");
      e && e.time && e.time > vkNow() - 864e5 * (2 + Math.random()) && (window.stickersKeywordsData = e.keywords)
    }
    window.stickersKeywordsData && Emoji.setStickersKeywords(window.stickersKeywordsData)
  },
  cachedStickersKeywordsTime: function () {
    var e = ls.get("stickers_keywords");
    return e && e.time ? Math.floor(e.time / 1e3) : 0
  },
  setStickersKeywords: function (e, i) {
    if (!e) return !1;
    window.stickersKeywords = {};
    var t = ce("div"),
      D = "\n",
      o = [],
      s = "";
    if (e.forEach(function (e) {
        var i = e.words || [],
          t = e.user_stickers || [],
          r = e.promoted_stickers || [],
          n = t.concat(r.map(function (e) {
            return -e
          }));
        i.forEach(function (e) {
          s += D + e, o.push(n)
        })
      }), val(t, s), s = t.textContent || t.innerText, s.slice(D.length).split(D).forEach(function (e, i) {
        window.stickersKeywords[e] = o[i]
      }), !Emoji.stickers[-1]) {
      var r = ls.get("recent_stickers");
      r && (Emoji.stickers[-1] = r)
    }
    i && (ls.set("stickers_keywords", {
      time: vkNow(),
      keywords: e
    }), Emoji.updateStickersHints(!0))
  },
  emojiEnter: function (e, i) {
    var t = Emoji.opts[e],
      D = (t.ctrlSend ? t.ctrlSend() : t.noEnterSend) || cur.ctrl_submit && !t.noCtrlSend;
    if (t.emojiFocused && t.emojiOvered && t.openedByTabKey && (D ? !(i.ctrlKey || browser.mac && i.metaKey) : !i.shiftKey)) {
      if (0 === t.curTab) {
        var o = geByTag1("img", t.emojiOvered) || geByTag1("i", t.emojiOvered);
        Emoji.addEmoji(e, Emoji.getCode(o), t.emojiOvered)
      }
      return cancelEvent(i)
    }
    return !0
  },
  insertHTML: function (e) {
    if (browser.msie && parseInt(browser.version) < 12)
      if (document.selection) {
        var i = document.selection.createRange();
        i.pasteHTML && i.pasteHTML(e)
      } else {
        var i = document.getSelection().getRangeAt(0),
          t = document.createElement("span");
        i.surroundContents(t), t.innerHTML = e, i.collapse(!1)
      }
    else e && document.execCommand("insertHTML", !1, e)
  },
  addEmoji: function (e, t, D) {
    if (e === !1 || t === !1) return !1;
    var o = Emoji.opts[e];
    if (o.editable) {
      var s = Emoji.getEmojiHTML(t, Emoji.codeToChr(t), !0),
        n = o.txt,
        a = !!window.getSelection && window.getSelection();
      if (a && a.rangeCount)
        if (r = a.getRangeAt(0), r.commonAncestorContainer) var c = r.commonAncestorContainer;
        else var c = r.parentElement ? r.parentElement() : r.item(0);
      else var c = !1;
      for (el = c; el && el != n;) el = el.parentNode;
      var l = n.lastChild || {};
      browser.mozilla && "BR" == l.tagName && !l.previousSibling && re(n.lastChild), el || Emoji.editableFocus(n, !1, !0), Emoji.insertHTML(s);
      var m = geByClass("emoji", n);
      m.push.apply(m, geByClass("emoji_css", n));
      for (i in m) {
        var E = m[i].previousSibling;
        if (E && 3 == E.nodeType && E.textContent && 32 == E.textContent.charCodeAt(0)) {
          var d = E.previousSibling;
          d && 3 == d.nodeType && d.textContent && 160 == d.textContent.charCodeAt(d.textContent.length - 1) && re(E)
        }
      }
      n.check && n.check(), setTimeout(Emoji.correctCaret.pbind(n), 5)
    } else {
      var C = o.txt,
        j = C.value;
      if (browser.iphone || browser.ipad) var u = Emoji.codeToChr(t);
      else var u = Emoji.cssEmoji[t][1] + " ";
      var F, f;
      void 0 != C.selectionStart && void 0 != C.selectionEnd ? (F = C.selectionEnd, C.value = j.slice(0, C.selectionStart) + u + j.slice(F), C.selectionStart = C.selectionEnd = F + u.length) : "undefined" != typeof document.selection && "undefined" != typeof document.selection.createRange && (C.focus(), f = document.selection.createRange(), f.text = u, f.select())
    }
    o.checkEditable && o.checkEditable(e, o.txt), Emoji.checkStickersKeywords(e, o), o.saveDraft && o.saveDraft(), Emoji.incrRecentEmojiRate(e, t)
  },
  showShadow: function () {
    return !(browser.msie && browser.version < 10)
  },
  scrollToggleArrow: function (e, i, t, D) {
    var o = geByClass1("emoji_tabs_" + i + "_s", t.tt);
    D ? (e ? show : hide)(o) : e ? fadeIn(o, 200) : fadeOut(o, 200), t[i + "Shown"] = e
  },
  scrollTabs: function (e, i) {
    var t = Emoji.opts[e];
    if (t) {
      var D = geByClass1("emoji_tabs_wrap", t.tt),
        o = D.firstChild.clientWidth - D.clientWidth;
      if (i) {
        var s = 2 == i ? D.scrollLeft : D.scrollLeft + 170;
        if (s >= o) {
          s = o;
          var r = geByClass1("emoji_tabs_r_s", t.tt);
          fadeOut(r, 200), t.rShown = !1, Emoji.scrollToggleArrow(!1, "r", t)
        }
        s && !t.lShown && Emoji.scrollToggleArrow(!0, "l", t)
      }
      if (!i || 2 == i) {
        var s = 2 == i ? D.scrollLeft : Math.max(D.scrollLeft - 170, 0);
        s <= 0 && (s = 0, Emoji.scrollToggleArrow(!1, "l", t)), s < o && !t.rShown && Emoji.scrollToggleArrow(!0, "r", t)
      }
      2 != i && (t.scrollLeft = s, animate(D, {
        scrollLeft: s
      }, 300))
    }
  },
  scrollToTab: function (e, i) {
    var t = Emoji.opts[i],
      D = t.tt,
      o = geByClass1("emoji_tabs_wrap", D),
      s = geByClass1("emoji_tab_" + e, D);
    if (s) {
      var r = data(o, "tween");
      if (!r || !r.isTweening || e != t.curTab) {
        var n = getSize(s)[0],
          a = s.offsetLeft,
          c = getSize(o)[0],
          l = a - c / 2 + 10;
        a + n < o.scrollLeft ? o.scrollLeft = Math.max(a, o.scrollLeft - c / 2) : a + n - o.scrollLeft > c && (o.scrollLeft = Math.min(a + n - o.scrollLeft, o.scrollLeft + c / 2)), animate(o, {
          scrollLeft: l
        }, 300, function () {
          Emoji.scrollTabs(i, 2)
        }), Emoji.selectTab(i, e, s)
      }
    }
  },
  selectTab: function (e, i, t) {
    var D = Emoji.opts[e],
      o = D.tt,
      s = geByClass1("emoji_tabs", o),
      r = geByClass1("emoji_tab_sel", s);
    removeClass(r, "emoji_tab_sel"), addClass(t, "emoji_tab_sel"), D.curTab = i, cur.stickersTab = i, ls.set("stickers_tab", i)
  },
  tabsWheel: function (e, i) {
    cancelEvent(e);
    var t = Emoji.opts[i],
      D = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX,
      o = geByClass1("emoji_tabs_wrap", t.tt),
      s = o.scrollLeft;
    o.scrollLeft += D, s != o.scrollLeft && Emoji.scrollTabs(i, 2)
  },
  show: function (e, i) {
    var t = data(domPN(e), "optId");
    isUndefined(t) || Emoji.ttShow(t, e, i)
  },
  hide: function (e, i, t) {
    var D = data(domPN(e), "optId");
    isUndefined(D) || Emoji.ttHide(D, e, i, t)
  },
  ttShow: function (e, i, t) {
    var D = Emoji.opts[e];
    clearTimeout(D.ctt), clearTimeout(D.stt), D.scrolling && (D.afterScrollFn = !1), D.ttShown || (i ? D.obj = i : i = D.obj, Emoji.ttClick(e, i, !1, !0, t))
  },
  ttHide: function (e, i, t, D) {
    var o = Emoji.opts[e];
    if (clearTimeout(o.stt), o.ttShown) {
      if (o.scrolling) return void(o.afterScrollFn = Emoji.ttHide.pbind(e, i, t, D));
      i = i || o.obj || geByClass1("emoji_smile", o.controlsCont);
      var s = function () {
          Emoji.ttClick(e, i, !0, !1, t)
        },
        r = o.ttShowT || 0;
      D || vkNow() - r < 200 ? s() : (clearTimeout(o.ctt), o.ctt = setTimeout(s, 300))
    }
  },
  ttClick: function (e, i, t, D, o, s) {
    var r = Emoji.opts[e];
    if (r && !(t && !Emoji.shown || D && Emoji.shown) && (i || (i = Emoji.shown || ge(cur.peer == -3 ? "imw_smile" : "im_smile")))) {
      i.tt && i.tt.destroy && i.tt.destroy(), !r.tt && r.sharedTT && r.sharedTT.emojiTT && (r.tt = r.sharedTT.emojiTT, r.emojiScroll = r.sharedTT.emojiScroll, r.allEmojiId = r.sharedTT.emojiAllId);
      var n = r.tt;
      if (!n) {
        var a = ls.get("stickers_tab");
        a || (a = Emoji.TAB_EMOJI), r.curTab = cur.stickersTab = Emoji.TAB_EMOJI, a == Emoji.TAB_EMOJI || r.noStickers || (Emoji.stickers[Emoji.TAB_RECENT_STICKERS] = ls.get("recent_stickers"), r.curTab = cur.stickersTab = a);
        var c = '<div class="emoji_tabs_l_s" onclick="Emoji.scrollTabs(' + e + ', 0);"><div class="emoji_sprite emoji_tabs_l_sc"></div><div class="emoji_sprite emoji_tabs_l_si"></div></div><div class="emoji_tabs_r_s" onclick="Emoji.scrollTabs(' + e + ', 1);"><div class="emoji_sprite emoji_tabs_r_sc"></div><div class="emoji_sprite emoji_tabs_r_si"></div></div>';
        c += Emoji.getTabsCode([
          [0, 1]
        ], e), c += '<span class="emoji_tabs_wrap"><span id="emoji_tabs_cont_' + e + '" class="emoji_tabs_cont">', r.noStickers || window.emojiStickers === !1 || void 0 === window.emojiStickers || (c += Emoji.getTabsCode(window.emojiStickers, e));
        var l = "",
          m = 'onclick="Emoji.showStickersStore(' + e + ');"',
          E = "showTooltip(this, {text: '" + getLang("global_store_stickers") + "', shift: [4,6,6], showdt: 0, black: 1});";
        m += r.rPointer ? " onmouseover=\"addClass(this.parentNode.parentNode.parentNode, 'emoji_shop_over');" + E + '"  onmouseout="removeClass(this.parentNode.parentNode.parentNode, \'emoji_shop_over\');"' : ' onmouseover="' + E + '"', c += "</span></span>", r.noStickers || (c += '<a class="fl_r emoji_shop" ' + m + '><div class="emoji_sprite emoji_shop_icon">' + (Emoji.hasNewStickers ? '<div class="emoji_shop_icon_badge">' + Math.abs(Emoji.hasNewStickers) + "</div>" : "") + "</div></a>"), Emoji.showShadow() || (l += " emoji_no_opacity"), r.noStickers && (l += " emoji_no_tabs");
        var n = ce("div", {
          id: "emoji_block_" + e,
          className: "emoji_tt_wrap tt_down" + l,
          innerHTML: '<div class="emoji_block_cont"><div class="emoji_block_rel"><div class="emoji_list_cont"><div class="emoji_cats_title_helper"></div><div class="emoji_list"><div class="emoji_scroll emoji_scroll_smiles"></div><div class="emoji_scroll emoji_scroll_stickers"></div></div></div></div><div class="emoji_tabs clear_fix">' + c + "</div></div>",
          onmouseover: function (i) {
            hasClass(n, "emoji_animated") || Emoji.ttShow(e, !1, i)
          },
          onmouseout: function (i) {
            hasClass(n, "emoji_animated") || Emoji.ttHide(e, !1, i)
          }
        });
        r.tt = n, Emoji.reappendEmoji(e, n), Emoji.emojiOver(e, geByClass1("emoji_scroll_smiles", n).firstChild), each(["emoji_tabs_l_s", "emoji_tabs_r_s", "emoji_tabs_wrap"], function () {
          addEvent(geByClass1(this, r.tt), "DOMMouseScroll wheel", function (i) {
            Emoji.tabsWheel(i, e)
          })
        }), r.sharedTT && (r.sharedTT.emojiTT = n), Emoji.checkEmojiSlider(r)
      }
      if (clearTimeout(r.ttEmojiHide), Emoji.shownId !== !1 && Emoji.shownId != e && Emoji.ttClick(Emoji.shownId, geByClass1("emoji_smile", Emoji.opts[Emoji.shownId].controlsCont), !0), Emoji.preventMouseOver = !1, r.emojiExpanded || Emoji.emojiExpand(e, n), Emoji.shown) {
        hide(n), setStyle(n, "opacity", 0);
        var d = geByClass1("_sticker_hints", domPN(r.txt));
        d && isVisible(d) && Emoji.checkStickersHintsSize(d, r, !0), Emoji.shown = !1, Emoji.shownId = !1, r.ttShown = !1, r.emojiFocused = !1, cur.onMouseClick = !1, removeEvent(document, "keydown", Emoji.emojiMove), removeClass(i, "emoji_smile_on"), r.onHide && r.onHide()
      } else {
        r.openedByTabKey = !!s, show(n), setStyle(n, "opacity", 1), Emoji.repositionEmoji(e, i, n);
        var d = geByClass1("_sticker_hints", domPN(r.txt));
        d && isVisible(d) && Emoji.checkStickersHintsSize(d, r, !0), Emoji.shownId = e, Emoji.shown = i, cur.emojiList = geByClass1("emoji_list", n), r.ttShown = !0, r.ttShowT = vkNow(), r.emojiFocused = !0, removeEvent(document, "keydown", Emoji.emojiMove), setTimeout(function () {
          cur.onMouseClick = function (i) {
            for (var t = i.target; t;) {
              if ("im_texts" == t.id || hasClass(t, "emoji_tt_wrap") || hasClass(t, "imw_emoji_wrap")) return !1;
              t = t.parentNode
            }
            Emoji.ttClick(e, !1, !0)
          }, addEvent(document, "keydown", Emoji.emojiMove)
        }, 0), addClass(i, "emoji_smile_on"), r.emojiScroll && r.emojiExpanded && (r.emojiScroll.update(), browser.msie && 0 === r.curTab && r.emojiOvered && Emoji.scrollToListEl(e, r.emojiOvered)), Emoji.tabSwitch(r.curTab, r.curTab, e), r.onRecentEmojiUpdate && r.onRecentEmojiUpdate(), r.onShow && r.onShow()
      }
      return each(geByClass("emoji_smile_icon_promo"), function (e, i) {
        removeEvent(geByClass1("emoji_smile_icon", i.parentNode), "mouseover"), re(i), Emoji.noNewStickers = !0
      }), r.noStickersStore ? addClass(geByClass1("emoji_tabs", "emoji_block_" + e), "emoji_tabs_no_store") : removeClass(geByClass1("emoji_tabs", "emoji_block_" + e), "emoji_tabs_no_store"), cancelEvent(o)
    }
  },
  curEmojiKeys: {},
  curEmojiCats: {
    1: ["D83DDE04", "D83DDE01", "D83DDE0A", "D83DDE03", "D83EDD23", "D83DDE06", "D83DDE09", "D83DDE1C", "D83DDE0B", "D83EDD17", "D83DDE0D", "D83DDE0E", "D83DDE12", "D83DDE0F", "D83DDE42", "D83DDE43", "D83DDE14", "D83DDE22", "D83DDE2D", "D83DDE29", "D83DDE28", "D83DDE10", "D83DDE0C", "D83EDD24", "D83DDE07", "D83DDE30", "D83EDD27", "D83DDE32", "D83EDD22", "D83DDE33", "D83DDE37", "D83DDE02", "2764", "D83DDC8B", "D83DDE1A", "D83DDE15", "D83DDE2F", "D83DDE26", "D83DDE35", "D83DDE44", "D83EDD14", "D83DDE20", "D83DDE21", "D83DDE1D", "D83DDE34", "D83DDE18", "D83DDE17", "D83DDE19", "D83DDE1F", "D83DDE41", "2639", "D83DDE2C", "D83DDE36", "D83EDD10", "D83DDE2B", "263A", "D83DDE00", "D83DDE25", "D83DDE1B", "D83DDE16", "D83DDE24", "D83DDE23", "D83DDE27", "D83DDE11", "D83DDE05", "D83DDE2E", "D83DDE1E", "D83DDE13", "D83DDE31", "D83EDD13", "D83EDD11", "D83DDE2A", "D83EDD12", "D83EDD15", "D83EDD25", "D83EDD20", "D83DDE08", "D83DDC7F", "D83DDC7D", "D83DDC7B", "D83DDE38", "D83DDE39", "D83DDE3C", "D83DDE3D", "D83DDE3E", "D83DDE3F", "D83DDE3B", "D83DDE40", "D83DDE3A", "D83DDE48", "D83DDE49", "D83DDE4A", "D83DDCA9", "D83DDC80", "D83DDC79", "D83DDC7A"],
    2: ["D83CDF31", "D83CDF32", "D83CDF33", "D83CDF34", "D83CDF37", "D83CDF38", "D83CDF45", "D83CDF46", "D83CDF47", "D83CDF48", "D83CDF49", "D83CDF4A", "D83CDF4B", "D83CDF4C", "D83CDF4D", "D83CDF4E", "D83CDF4F", "D83CDF50", "D83CDF51", "D83DDC00", "D83DDC01", "D83DDC02", "D83DDC03", "D83DDC04", "D83DDC05", "D83DDC06", "D83DDC07", "D83DDC08", "D83DDC09", "D83DDC0A", "D83DDC0B", "D83DDC0C", "D83DDC0D", "D83DDC0E", "D83DDC0F", "D83DDC10", "D83DDC11", "D83DDC12", "D83DDC13", "D83DDC14", "D83DDC15", "D83DDC16", "D83DDC17", "D83DDC18", "D83DDC19", "D83DDC1A", "D83DDC1B", "D83DDC1C", "D83DDC1D", "D83DDC1E", "D83DDC1F", "D83DDC20", "D83DDC21", "D83DDC22", "D83DDC23", "D83DDC24", "D83DDC25", "D83DDC26", "D83DDC27", "D83DDC28", "D83DDC2A", "D83DDC2B", "D83DDC2C", "D83DDC2D", "D83DDC2E", "D83DDC2F", "D83DDC30", "D83DDC32", "D83DDC33", "D83DDC34", "D83DDC35", "D83DDC36", "D83DDC37", "D83DDC38", "D83DDC39", "D83DDC3A", "D83DDC3B", "D83DDC3C", "D83DDC3D", "D83DDC3E", "2600", "2601", "26C4", "26C5", "2728", "D83CDF0D", "D83CDF1B", "D83CDF1D", "D83CDF1E", "D83CDF30", "D83CDF35", "D83CDF39", "D83CDF3A", "D83CDF3B", "D83CDF3C", "D83CDF3D", "D83CDF3E", "D83CDF3F", "D83CDF40", "D83CDF41", "D83CDF42", "D83CDF43", "D83CDF44", "D83DDCA6", "D83DDCA7", "D83EDD89", "D83EDD8D", "D83EDD8F", "D83EDD8B", "D83EDD8A", "D83EDD88", "D83EDD85", "D83EDD86"],
    3: ["D83DDC4D", "D83DDC4E", "261D", "270C", "D83DDC4C", "D83DDD95D83CDFFB", "D83EDD18D83CDFFB", "D83DDC4F", "D83DDC4A", "D83DDCAA", "270B", "D83DDD90D83CDFFB", "D83DDD96D83CDFFB", "D83DDE4F", "D83DDE4C", "270A", "D83DDC46", "D83DDC47", "D83DDC48", "D83DDC49", "D83DDC4B", "D83DDC50", "D83EDD1ED83CDFFB", "D83EDD1D", "D83EDD19D83CDFFB", "D83EDD1BD83CDFFB", "D83EDD1CD83CDFFB", "D83DDC40", "D83DDC42", "D83DDC43", "270DD83CDFFB", "D83DDC45", "D83DDC6B", "D83DDC6C", "D83DDC6D", "D83DDC8F", "D83DDC91", "D83DDC6F", "D83DDC6A", "D83DDC70", "D83DDC66", "D83DDC67", "D83DDC68", "D83DDC69", "D83DDC71", "D83DDC6E", "D83DDC72", "D83DDC73", "D83DDC82", "D83DDC74", "D83DDC75", "D83DDC76", "D83DDC77", "D83DDC78", "D83DDC7C", "D83DDE47", "D83EDD30D83CDFFB", "D83DDC85", "D83DDC84", "D83DDC44", "D83DDC83", "D83CDF8E", "D83CDF85", "D83DDEB6", "D83DDC71200D2640FE0F", "D83DDC6E200D2640FE0F", "D83DDC77200D2640FE0F", "D83DDD75200D2640FE0F", "D83DDE47200D2640FE0F", "D83DDE4B200D2642FE0F", "D83DDE4B", "D83DDC81200D2642FE0F", "D83DDC81", "D83DDE45200D2642FE0F", "D83DDE45", "D83DDE46200D2642FE0F", "D83DDE46", "D83DDE4E200D2642FE0F", "D83DDE4E", "D83DDC86200D2642FE0F", "D83DDC86", "D83DDC87200D2642FE0F", "D83DDC87", "D83EDD37D83CDFFB200D2642FE0F", "D83EDD37D83CDFFB200D2640FE0F", "D83EDD26D83CDFFB200D2642FE0F", "D83DDE4D200D2642FE0F", "D83DDEB6200D2640FE0F", "D83EDD33D83CDFFB", "D83CDFC3200D2640FE0F", "D83DDC6F200D2642FE0F", "D83CDFCC200D2640FE0F", "D83DDC31", "D83EDD21", "D83DDD7A", "D83DDC73200D2640FE0F", "D83DDC82200D2640FE0F"],
    4: ["D83CDF52", "D83CDF53", "D83CDF54", "D83CDF55", "D83CDF56", "D83CDF57", "D83CDF5A", "D83CDF5B", "D83CDF5C", "D83CDF5D", "D83CDF5E", "D83CDF5F", "D83CDF60", "D83CDF61", "D83CDF62", "D83CDF63", "D83CDF64", "D83CDF65", "D83CDF66", "D83CDF67", "D83CDF68", "D83CDF69", "D83CDF6A", "D83CDF6B", "D83CDF6C", "D83CDF6D", "D83CDF6E", "D83CDF6F", "D83CDF70", "D83CDF71", "D83CDF72", "D83CDF73", "D83CDF74", "D83CDF75", "D83CDF76", "D83CDF77", "D83CDF78", "D83CDF79", "D83CDF7A", "D83CDF7B", "D83CDF7C", "D83EDD59", "D83EDD5D", "D83EDD5C", "D83EDD58", "D83EDD57", "D83EDD56", "D83EDD53", "D83EDD50", "D83EDD42", "D83EDD51", "D83EDD43", "D83EDD55"],
    5: ["26BD", "26BE", "D83CDFAF", "D83CDFB1", "D83CDFBD", "D83CDFBE", "D83CDFBF", "D83CDFC0", "D83CDFC1", "D83CDFC2", "D83CDFC3", "D83CDFC4", "D83CDFC6", "D83CDFC7", "D83CDFC8", "D83CDFC9", "D83CDFCA", "D83DDC5F", "D83DDEA3", "D83DDEB4", "D83DDEB5", "26F3", "26EA", "D83EDD3DD83CDFFB200D2642FE0F", "D83EDD3DD83CDFFB200D2640FE0F", "D83EDD3ED83CDFFB200D2642FE0F", "D83EDD3C200D2642FE0F", "D83EDD38D83CDFFB200D2642FE0F", "D83CDFCB200D2640FE0F", "26F9200D2640FE0F", "D83CDFC4200D2640FE0F", "D83CDFCA200D2640FE0F", "D83DDEB5200D2640FE0F", "D83DDEB4200D2640FE0F", "D83EDD3A"],
    6: ["D83DDE85", "D83DDE86", "D83DDE87", "D83DDE88", "D83DDE8A", "D83DDE8C", "D83DDE8D", "D83DDE8E", "D83DDE8F", "D83DDE90", "D83DDE91", "D83DDE92", "D83DDE93", "D83DDE94", "D83DDE95", "D83DDE96", "D83DDE97", "D83DDE98", "D83DDE99", "D83DDE9A", "D83DDE9B", "D83DDE9C", "D83DDE9D", "D83DDE9E", "D83DDE9F", "D83DDEA0", "D83DDEA1", "D83DDEA4", "D83DDEA7", "D83DDEA8", "26F5", "D83DDE80", "D83DDE81", "D83DDE82", "D83DDE83", "D83DDE84", "26FD", "2708", "D83DDEF5"],
    7: ["23F0", "23F3", "260E", "2615", "267B", "26A1", "2702", "2709", "270F", "2712", "D83CDC04", "D83CDCCF", "D83CDF02", "D83CDF1F", "D83CDF80", "D83CDF81", "D83CDF82", "D83CDF83", "D83CDF84", "D83CDF88", "D83CDF89", "D83CDF8A", "D83CDF8B", "D83CDF8C", "D83CDF8D", "D83CDF8F", "D83CDF90", "D83CDF92", "D83CDF93", "D83CDFA3", "D83CDFA4", "D83CDFA7", "D83CDFA8", "D83CDFA9", "D83CDFAA", "D83CDFAB", "D83CDFAC", "D83CDFAD", "D83CDFB0", "D83CDFB2", "D83CDFB3", "D83CDFB4", "D83CDFB7", "D83CDFB8", "D83CDFB9", "D83CDFBA", "D83CDFBB", "D83DDC51", "D83DDC52", "D83DDC53", "D83DDC54", "D83DDC55", "D83DDC56", "D83DDC57", "D83DDC58", "D83DDC59", "D83DDC5A", "D83DDC5B", "D83DDC60", "D83DDC5C", "D83DDC5D", "D83DDC5E", "D83DDC61", "D83DDC62", "D83DDC63", "D83DDC7E", "D83DDC88", "D83DDC89", "D83DDC8A", "D83DDC8C", "D83DDC8D", "D83DDC8E", "D83DDC90", "D83DDC92", "D83DDCA1", "D83DDCA3", "D83DDCA5", "D83DDCB0", "D83DDCB3", "D83DDCB4", "D83DDCB5", "D83DDCB6", "D83DDCB7", "D83DDCB8", "D83DDCBA", "D83DDCBB", "D83DDCBC", "D83DDCBD", "D83DDCBE", "D83DDCBF", "D83DDCC4", "D83DDCC5", "D83DDCC7", "D83DDCC8", "D83DDCC9", "D83DDCCA", "D83DDCCB", "D83DDCCC", "D83DDCCD", "D83DDCCE", "D83DDCD0", "D83DDCD1", "D83DDCD2", "D83DDCD3", "D83DDCD4", "D83DDCD5", "D83DDCD6", "D83DDCD7", "D83DDCD8", "D83DDCD9", "D83DDCDA", "D83DDCDC", "D83DDCDD", "D83DDCDF", "D83DDCE0", "D83DDCE1", "D83DDCE2", "D83DDCE6", "D83DDCED", "D83DDCEE", "D83DDCEF", "D83DDCF0", "D83DDCF1", "D83DDCF7", "D83DDCF9", "D83DDCFA", "D83DDCFB", "D83DDCFC", "D83DDD06", "D83DDD0E", "D83DDD11", "D83DDD14", "D83DDD16", "D83DDD26", "D83DDD27", "D83DDD28", "D83DDD29", "D83DDD2A", "D83DDD2B", "D83DDD2C", "D83DDD2D", "D83DDD2E", "D83DDD31", "D83DDDFF", "D83DDEAA", "D83DDEAC", "D83DDEBD", "D83DDEBF", "D83DDEC0"],
    8: ["D83DDC93", "D83DDC94", "D83DDC95", "D83DDC96", "D83DDC97", "D83DDC98", "D83DDC99", "D83DDC9A", "D83DDC9B", "D83DDC9C", "D83DDC9D", "D83DDC9E", "D83DDC9F", "D83DDCAC", "D83DDCAD", "D83DDD1E", "26A0", "26D4", "D83DDC29", "D83CDD98", "D83CDF1A", "D83DDDA4", "D83DDCA8", "D83DDD25"],
    9: ["D83CDDE8D83CDDF3", "D83CDDE9D83CDDEA", "D83CDDEAD83CDDF8", "D83CDDEBD83CDDF7", "D83CDDECD83CDDE7", "D83CDDEED83CDDF9", "D83CDDEFD83CDDF5", "D83CDDF0D83CDDF7", "D83CDDF7D83CDDFA", "D83CDDFAD83CDDF8", "D83CDDFAD83CDDE6", "D83CDDF0D83CDDFF", "D83CDDE7D83CDDFE", "D83CDDE6D83CDDFA", "D83CDDE6D83CDDF9", "D83CDDE7D83CDDEA", "D83CDDE7D83CDDF7", "D83CDDFBD83CDDF3", "D83CDDEDD83CDDF0", "D83CDDE9D83CDDF0", "D83CDDEED83CDDF1", "D83CDDEED83CDDF3", "D83CDDEED83CDDE9", "D83CDDEED83CDDEA", "D83CDDE8D83CDDE6", "D83CDDE8D83CDDF4", "D83CDDF2D83CDDF4", "D83CDDF2D83CDDFE", "D83CDDF2D83CDDFD", "D83CDDF3D83CDDF1", "D83CDDF3D83CDDFF", "D83CDDF3D83CDDF4", "D83CDDE6D83CDDEA", "D83CDDF5D83CDDF1", "D83CDDF5D83CDDF9", "D83CDDF5D83CDDF7", "D83CDDF8D83CDDE6", "D83CDDF8D83CDDEC", "D83CDDF9D83CDDF7", "D83CDDF5D83CDDED", "D83CDDEBD83CDDEE", "D83CDDE8D83CDDF1", "D83CDDE8D83CDDED", "D83CDDF8D83CDDEA", "D83CDDFFD83CDDE6", "D83CDFF3200DD83CDF08FE0F"]
  },
  curEmojiRecent: {},
  emojiWithJoiners: ["D83DDC71200D2640FE0F", "D83DDC6E200D2640FE0F", "D83DDC77200D2640FE0F", "D83DDD75200D2640FE0F", "D83DDE47200D2640FE0F", "D83DDC81200D2642FE0F", "D83DDE45200D2642FE0F", "D83DDE46200D2642FE0F", "D83DDE4E200D2642FE0F", "D83DDE4D200D2642FE0F", "D83DDC86200D2642FE0F", "D83DDC87200D2642FE0F", "D83DDEB6200D2640FE0F", "D83CDFC3200D2640FE0F", "D83CDFCB200D2640FE0F", "26F9200D2640FE0F", "D83CDFC4200D2640FE0F", "D83CDFCA200D2640FE0F", "D83DDEB5200D2640FE0F", "D83DDEB4200D2640FE0F", "D83DDC6F200D2642FE0F", "D83CDFCC200D2640FE0F", "D83DDE4B200D2642FE0F", "D83DDC73200D2640FE0F", "D83DDC82200D2640FE0F", "D83CDFF3200DD83CDF08FE0F", "D83EDD26D83CDFFB200D2642FE0F", "D83EDD37D83CDFFB200D2640FE0F", "D83EDD37D83CDFFB200D2642FE0F", "D83EDD3DD83CDFFB200D2642FE0F", "D83EDD3DD83CDFFB200D2640FE0F", "D83EDD3ED83CDFFB200D2642FE0F", "D83EDD3C200D2642FE0F", "D83EDD38D83CDFFB200D2642FE0F", "D83EDD37200D2642FE0F", "D83EDD37D83CDFFC200D2642FE0F", "D83EDD37D83CDFFD200D2642FE0F", "D83EDD37D83CDFFE200D2642FE0F", "D83EDD37D83CDFFF200D2642FE0F", "D83EDD26200D2642FE0F", "D83EDD26D83CDFFC200D2642FE0F", "D83EDD26D83CDFFD200D2642FE0F", "D83EDD26D83CDFFE200D2642FE0F", "D83EDD26D83CDFFF200D2642FE0F", "D83EDD37200D2640FE0F", "D83EDD37D83CDFFC200D2640FE0F", "D83EDD37D83CDFFD200D2640FE0F", "D83EDD37D83CDFFE200D2640FE0F", "D83EDD37D83CDFFF200D2640FE0F", "D83EDD3D200D2642FE0F", "D83EDD3DD83CDFFC200D2642FE0F", "D83EDD3DD83CDFFD200D2642FE0F", "D83EDD3DD83CDFFE200D2642FE0F", "D83EDD3DD83CDFFF200D2642FE0F", "D83EDD3D200D2640FE0F", "D83EDD3DD83CDFFC200D2640FE0F", "D83EDD3DD83CDFFD200D2640FE0F", "D83EDD3DD83CDFFE200D2640FE0F", "D83EDD3DD83CDFFF200D2640FE0F", "D83EDD3E200D2642FE0F", "D83EDD3ED83CDFFC200D2642FE0F", "D83EDD3ED83CDFFD200D2642FE0F", "D83EDD3ED83CDFFE200D2642FE0F", "D83EDD3ED83CDFFF200D2642FE0F", "D83EDD38200D2642FE0F", "D83EDD38D83CDFFC200D2642FE0F", "D83EDD38D83CDFFD200D2642FE0F", "D83EDD38D83CDFFE200D2642FE0F", "D83EDD38D83CDFFF200D2642FE0F", "D83EDD19D83CDFFB", "D83EDD19D83CDFFC", "D83EDD19D83CDFFD", "D83EDD19D83CDFFE", "D83EDD19D83CDFFF", "D83EDD1BD83CDFFB", "D83EDD1BD83CDFFC", "D83EDD1BD83CDFFD", "D83EDD1BD83CDFFE", "D83EDD1BD83CDFFF", "D83EDD1CD83CDFFB", "D83EDD1CD83CDFFC", "D83EDD1CD83CDFFD", "D83EDD1CD83CDFFE", "D83EDD1CD83CDFFF"],
  emojiLoadMore: function (e) {
    var i = Emoji.opts[e];
    if (!i.emojiMoreSt) {
      i.emojiMoreSt = 1;
      var t = {
        act: "get_emoji_list"
      };
      Emoji.hasNewStickers < 0 && (t.new_shown = 1), ajax.post("al_im.php", t, {
        onDone: function (t, D) {
          Emoji.stickers = t, i.emojiMoreSt = 0, Emoji.stickers[-1] && (ls.set("recent_stickers", Emoji.stickers[-1]), Emoji.updateRecentEmoji(e)), i.allEmojiId = 0, i.sharedTT && (i.sharedTT.emojiAllId = 0), Emoji.onStickersLoad && (i.afterLoad = 1), Emoji.onStickersLoad && window.emojiStickers && (Emoji.onStickersLoad(), Emoji.onStickersLoad = !1);
          var o = Emoji.emojiGetRecentFromStorage();
          o ? Emoji.curEmojiRecent = Emoji.filterEmoji(o) : (Emoji.emojiOldRecentPrepare(D, e), Emoji.updateEmojiCont(e)), Emoji.updateRecentEmoji(e), i.onRecentEmojiUpdate && i.onRecentEmojiUpdate()
        },
        onFail: function () {
          i.emojiMoreSt = 0
        }
      }), Emoji.curEmojiRecent && i.onRecentEmojiUpdate && i.onRecentEmojiUpdate()
    }
  },
  filterEmoji: function (e) {
    var i = Object.keys(e);
    e: for (var t in Emoji.curEmojiCats)
      for (var D in Emoji.curEmojiCats[t]) {
        var o = Emoji.curEmojiCats[t][D],
          s = i.indexOf(o);
        if (s != -1 && (i.splice(s, 1), 0 == i.length)) break e
      }
    var r = {};
    for (var t in e) i.indexOf(t) == -1 && (r[t] = e[t]);
    return i.length > 0 && Emoji.setRecentEmojiList(r), r
  },
  emojiGetRecentFromStorage: function () {
    try {
      return JSON.parse(localStorage.getItem("emoji_recent_list"))
    } catch (e) {
      return !1
    }
  },
  emojiOldRecentPrepare: function (e) {
    var i = {};
    for (var t in e) {
      var D = e[t];
      if (isString(D)) var o = 1,
        s = D;
      else var o = D,
        s = t;
      i[s] = o
    }
    Emoji.setRecentEmojiList(Emoji.filterEmoji(i))
  },
  getRecentEmojiSorted: function () {
    var e = [];
    for (var i in Emoji.curEmojiRecent) {
      var t = Emoji.curEmojiRecent[i];
      e.push([i, t])
    }
    e.sort(function (e, i) {
      return i[1] - e[1]
    });
    var D = [];
    for (var i in e) D.push(e[i][0]);
    return D.slice(0, 20)
  },
  incrRecentEmojiRate: function (e, i) {
    var t = 6;
    Emoji.emojiRecentRateTime || (Emoji.emojiRecentRateTime = vkNow() / 1e3 - t);
    var D = vkNow() / 1e3 - Emoji.emojiRecentRateTime;
    if (D >= t) {
      var o = Math.min(100, Math.floor(D / t));
      for (var s in Emoji.curEmojiRecent) s != i && (Emoji.curEmojiRecent[s] *= Math.pow(.998076, o));
      Emoji.emojiRecentRateTime += t * o
    }
    Emoji.curEmojiRecent[i] || (Emoji.curEmojiRecent[i] = 0), Emoji.curEmojiRecent[i] += 1;
    var r = Emoji.getRecentEmojiSorted();
    Emoji.curEmojiCats[-1] = r, r.length >= 20 && r.indexOf(i) == -1 && (r.splice(-1), r.push(i));
    var n = {};
    for (var s in r) {
      var i = r[s];
      n[i] = Emoji.curEmojiRecent[i]
    }
    Emoji.setRecentEmojiList(n), window.Notifier && Notifier.lcSend("recent_emoji_set", n)
  },
  setRecentEmojiList: function (e) {
    localStorage.setItem("emoji_recent_list", JSON.stringify(e)), Emoji.curEmojiRecent = e
  },
  updateEmojiCont: function (e) {
    var i = Emoji.opts[e];
    0 == i.curTab && (val(geByClass1("emoji_scroll_smiles", i.tt), Emoji.ttEmojiList(e)), Emoji.updateEmojiCatTitle(e))
  },
  ttEmojiList: function (e) {
    var i = Emoji.curEmojiCats,
      t = "",
      D = Emoji.emojiGetRecentFromStorage();
    D && Emoji.setRecentEmojiList(D), Emoji.curEmojiCats[-1] = Emoji.getRecentEmojiSorted();
    var o = [-1, 1, 3, 8, 2, 4, 5, 6, 7, 9];
    for (var s in o) {
      var r = o[s],
        n = i[r];
      if (n.length) {
        var a = r == -1 ? "recent" : r,
          c = '<div class="emoji_cat_title_helper" data-id="' + r + '" id="emoji_recent_list' + e + "_" + r + '"><div class="emoji_cat_title">' + getLang("global_emoji_cat_" + a) + "</div></div>";
        c += Emoji.emojiGetCatCont(e, n), t += c
      }
    }
    return t
  },
  emojiGetCatCont: function (e, i) {
    for (var t = "", D = "", o = i.length - 1, s = 0; s <= o; s++) D += Emoji.emojiWrapItem(e, i[s], s), (s > 0 && s % 10 == 9 || s >= o) && (t += '<div class="emoji_smiles_row">' + D + "</div>", D = "");
    return t
  },
  updateRecentEmoji: function (e) {
    var i = Emoji.getRecentEmojiSorted(),
      t = Emoji.emojiGetCatCont(e, i),
      D = ge("emoji_recent_list" + e + "_-1");
    if (D) {
      for (var o = D.nextSibling; o && (o = o.nextSibling, hasClass(o.previousSibling, "emoji_smiles_row"));) re(o.previousSibling);
      for (var s = ce("div", {
          innerHTML: t
        }), r = D.nextSibling, n = D.parentNode; o = s.firstChild;) n.insertBefore(o, r)
    }
  },
  updateRecentStickers: function (e) {
    var i = Emoji.opts[e];
    if (Emoji.stickers[-1] && i && i.emojiExpanded) {
      var t = ge("emoji_recent_stickers_cont" + e);
      if (t) {
        val(t, "");
        for (var D = window.devicePixelRatio >= 2 ? "128" : "64", o = Emoji.stickers[-1].stickers, s = 0; s < o.length; s++) {
          var r = se(rs(Emoji.stickerItem(), {
            optId: e,
            selId: Emoji.TAB_RECENT_STICKERS,
            stickerId: o[s][0],
            size: o[s][1],
            stickerSize: D
          }));
          t.appendChild(r);
          var n = 68 * Math.ceil((s + 1) / 4);
          i.needLoadStickers.unshift([e + "_" + Emoji.TAB_RECENT_STICKERS + "_" + o[s][0], n])
        }
      }
    }
  },
  updateEmojiCatTitle: function (e) {
    var i = Emoji.opts[e];
    if (i && i.emojiScroll) {
      for (var t, D, o = ge("emoji_block_" + e), s = geByClass("emoji_cat_title_helper", o), r = i.emojiScroll.data.scrollTop, n = geByClass1("emoji_cats_title_helper", i.tt), a = getSize(s[0])[1], c = s.length - 1; c >= 0; c--)
        if (r > s[c].offsetTop - a) {
          t = s[c], D = c;
          break
        }
      if (!t) return debugLog("title not found");
      var l = intval(attr(t, "data-id"));
      if (i.curEmojiCatId != l) {
        i.curEmojiCatId = l;
        var m = [t],
          E = s[D - 1];
        E && (addClass(E, "emoji_cat_title_fix"), setStyle(E.firstChild, "transform", "translateY(" + (t.offsetTop - E.offsetTop - a) + "px)"));
        for (var d = t.nextSibling; d;) hasClass(d, "emoji_cat_title_fix") && m.push(d), d = d.nextSibling;
        for (var c in m) removeClass(m[c], "emoji_cat_title_fix"), setStyle(m[c].firstChild, "transform", "translateY(0px)");
        val(n, ""), i.emojiTitleHelperIsSet = 0
      }!i.emojiTitleHelperIsSet && r >= t.offsetTop && r > 0 ? (val(n, val(t)), i.emojiTitleHelperIsSet = 1) : i.emojiTitleHelperIsSet && (r < t.offsetTop || 0 == r) && (val(n, ""), i.emojiTitleHelperIsSet = 0)
    }
  },
  emojiWrapItem: function (e, i, t) {
    var D = Emoji.cssEmoji[i];
    if (D) var o = ' title="' + D[1] + '"';
    else var o = "";
    if (browser.mobile) var s = "";
    else var s = ' onmouseover="return Emoji.emojiOver(' + e + ', this, true);"';
    return '<a class="emoji_smile_cont ' + ("2764" != i && t && t < 54 ? "emoji_smile_shadow" : "") + '" ' + o + " onmousedown=\"Emoji.addEmoji(Emoji.shownId, '" + i + '\', this); return cancelEvent(event);" onclick="return cancelEvent(event);"' + s + '><div class="emoji_bg"></div><div class="emoji_shadow"></div>' + Emoji.getEmojiHTML(i, !1, !1, !0) + "</a>"
  },
  reappendEmoji: function (e, i) {
    var t = Emoji.opts[e];
    if (t && t.rceCont && (t.addMediaBtn ? t.sendWrap.insertBefore(t.rceCont, t.addMediaBtn) : t.sendWrap.appendChild(t.rceCont)), i) {
      t.controlsCont;
      t.emojiWrap ? t.emojiWrap.appendChild(i) : t.obj.appendChild(i), clearTimeout(cur.ttEmojiHide), hide(i)
    }
  },
  ttCalcHeight: function (e, i, t) {
    window.headH = window.headH || ge("page_header") && getSize(ge("page_header"))[1] || 0;
    var D = (window.pageNode && window.browser.mozilla ? Math.min(getSize(pageNode)[1], window.lastWindowHeight) : window.lastWindowHeight) || getScroll()[3],
      o = window.scrollGetY ? scrollGetY() : getScroll()[1],
      s = getXY(i)[1],
      r = getSize(i)[1],
      n = geByClass1("emoji_list", t),
      a = Emoji.opts[e].emojiSmileHeigh,
      c = headH,
      l = Emoji.opts[e].emojiRowsCount,
      m = 9,
      E = 8;
    isAncestor(i, pageNode) || (c = 0), setStyle(n, {
      height: l * a + E
    });
    for (var d, C = o + c, j = o + D, u = i, F = getSize(t)[1], f = 0, _ = 0, v = 0; u !== bodyNode && (u = domClosestOverflowHidden(u));) {
      var g = getXY(u)[1];
      C = Math.max(C, g), j = Math.min(j, g + getSize(u)[1])
    }
    for (f = s - m - C, _ = j - s - r - m, d = f < F && _ < F ? f >= _ : f >= F, v = d ? f : _; v < F && l > 3;) l--, F -= a;
    Emoji.opts[e].emojiRowsCount = l, Emoji.opts[e].emojiSmileHeigh = a, setStyle(n, {
      height: l * a + E
    }), toggleClass(t, "tt_down", d), toggleClass(t, "tt_up", !d)
  },
  repositionEmoji: function (e, i, t) {
    var D, o = Emoji.opts[e];
    if (o) {
      if (t.parentNode && getXY && getStyle && setStyle && geByClass && (D = geByClass1("emoji_rpointer", t))) {
        var s = parseInt(getStyle(t, "width")),
          r = 266,
          n = 7,
          a = 10,
          c = getXY(i)[0],
          l = parseInt(getStyle(i, "width")),
          m = getXY(t.parentNode)[0];
        c + l / 2 < r + n + a ? (setStyle(t, "left", -s - m), setStyle(D, "left", c + l / 2 - 2 * a + "px")) : (setStyle(t, "left", ""), setStyle(D, "left", ""))
      } else setStyle(t, "left", "");
      var E = geByClass1("emoji_list", t),
        d = geByClass1("emoji_smile_cont", E);
      Emoji.opts[e].emojiSmileHeigh = d && getSize(d)[1] || 26, Emoji.opts[e].emojiRowsCount = 9, Emoji.ttCalcHeight(e, i, t)
    }
  },
  emojiOver: function (e, i, t) {
    if (browser.mobile || t && Emoji.preventMouseOver) return !0;
    var D = Emoji.opts[e];
    addClass(i, "emoji_over"), D.emojiOvered && D.emojiOvered != i && removeClass(D.emojiOvered, "emoji_over"), D.emojiOvered = i
  },
  emojiExpand: function (e, i) {
    var t = Emoji.opts[e];
    addClass(i, "emoji_expanded"), Emoji.emojiLoadMore(e), t.emojiScroll ? t.emojiScroll.update() : (t.emojiScroll = new uiScroll(geByClass1("emoji_list", i), {
      theme: "default emoji no_transition",
      shadows: !0,
      global: !0,
      ondragstart: function () {
        t.scrolling = !0
      },
      ondragstop: function () {
        t.scrolling = !1, isFunction(t.afterScrollFn) && t.afterScrollFn()
      },
      onscrollstart: function () {
        window.tooltips && tooltips.destroyAll()
      },
      onupdate: function () {
        t.curTab == Emoji.TAB_EMOJI ? Emoji.updateEmojiCatTitle(e) : Emoji.updateShownStickers(e)
      }
    }), t.imagesLoader = imagesLoader(t.emojiScroll.scroller, {
      use_iframe: !0,
      need_load_class: "emoji_need_load"
    }), t.sharedTT && (t.sharedTT.emojiScroll = t.emojiScroll)), t.emojiExpanded = !0
  },
  updateShownStickers: function (e, i) {
    var t = Emoji.opts[e];
    if (t.emojiScroll && t.stickersSplitersPos) {
      t.needLoadStickers || (t.needLoadStickers = []);
      var D = t.emojiScroll.data.scrollTop,
        o = t.emojiScroll.data.viewportHeight,
        s = D,
        r = D + o,
        n = t.needLoadStickers;
      clearTimeout(t.preloadStickersTimer);
      for (var a = [], c = 0; c < n.length; c++) {
        var l = n[c];
        if (l[1] + 72 >= s && l[1] <= r) {
          var m = ge("emoji_sticker_item" + l[0]);
          if (!m) continue;
          var E = attr(m, "data-src");
          val(m, '<img class="emoji_sticker_image" src="/images/blank.gif" data-src="' + E + '"/>'), a.push([E, l[0]])
        }
      }
      if (Emoji.loadStickers(e, a), a.length || Emoji.preloadStickers(e), !(i || t.scrollAnimation || Emoji.onStickersLoad)) {
        for (var d = -1, c = 0; c < t.stickersSplitersPos.length; c++) {
          var l = t.stickersSplitersPos[c];
          if (!(l[1] - 30 < D)) break;
          d = l[0]
        }
        t.curTab != d && Emoji.scrollToTab(d, e)
      }
    }
  },
  loadStickers: function (e, i) {
    var t = Emoji.opts[e];
    if (i.length) {
      for (var D = {}, o = 0; o < i.length; o++) {
        var s = i[o][0] + ":" + i[o][1];
        t.imagesLoading[s] && (D[s] = t.imagesLoading[s], delete t.imagesLoading[s], i.splice(o, 1), o--)
      }
      for (var o in t.imagesLoading) {
        var r = t.imagesLoading[o];
        if (!r) return;
        r.src = ""
      }
      t.imagesLoading = D;
      for (var o in i) {
        var s = i[o][0] + ":" + i[o][1];
        t.imagesLoading[s] = t.imagesLoader.iloader.add(i[o][0], Emoji.onStickerLoaded, e + ":" + i[o][1])
      }
    }
  },
  preloadStickers: function (e) {
    var i = Emoji.opts[e];
    i.imagesLoading && Object.keys(i.imagesLoading).length > 0 || (clearTimeout(i.preloadStickersTimer), i.preloadStickersTimer = setTimeout(function () {
      for (var t = i.emojiScroll.data.scrollTop, D = i.emojiScroll.data.viewportHeight, o = t + D, s = {
          top: t - D,
          bottom: t
        }, r = {
          top: o,
          bottom: o + D
        }, n = geByClass1("emoji_scroll_stickers", i.tt).firstChild, a = []; n;) {
        if (hasClass(n, "emoji_sticker_item") && !hasClass(n, "__loaded")) {
          var c = n.offsetTop;
          if (c >= s.top && c <= s.bottom || c >= r.top && c <= r.bottom) {
            var l = n.id.replace("emoji_sticker_item", ""),
              m = attr(n, "data-src");
            val(n, '<img class="emoji_sticker_image" src="/images/blank.gif" data-src="' + m + '"/>'), a.push([m, l])
          }
        }
        n = n.nextSibling
      }
      Emoji.loadStickers(e, a)
    }, 50))
  },
  onStickerLoaded: function (e) {
    var i = String(this).split(":"),
      t = i[1],
      D = intval(i[0]),
      o = Emoji.opts[D],
      s = ge("emoji_sticker_item" + t);
    if (s) {
      var r = geByTag1("img", s);
      if (r) {
        addClass(s, "__loaded"), attr(r, "src", e), delete Emoji.opts[D].imagesLoading[e + ":" + t];
        for (var n = 0; n < o.needLoadStickers.length; n++) {
          var a = o.needLoadStickers[n];
          if (t == a[0]) {
            o.needLoadStickers.splice(n, 1);
            break
          }
        }
        Object.keys(Emoji.opts[D].imagesLoading).length || Emoji.preloadStickers(D)
      }
    }
  },
  emojiMove: function (e) {
    var i = Emoji.shownId,
      t = Emoji.opts[i];
    if (Emoji.shown && t.emojiFocused && t.openedByTabKey) {
      var D = null;
      if (t.emojiOvered) switch (e.keyCode) {
        case KEY.LEFT:
          D = Emoji.getEmojiEl(t.emojiOvered, "left"), cancelEvent(e);
          break;
        case KEY.RIGHT:
          D = Emoji.getEmojiEl(t.emojiOvered, "right"), cancelEvent(e);
          break;
        case KEY.UP:
          D = Emoji.getEmojiEl(t.emojiOvered, "up");
          break;
        case KEY.DOWN:
          D = Emoji.getEmojiEl(t.emojiOvered, "down");
          break;
        case KEY.ENTER:
          if (!Emoji.emojiEnter(i, e)) return cancelEvent(e), !1;
          break;
        default:
          return !0
      } else D = Emoji.getFirstEmojiEl(i);
      if (D) return Emoji.preventMouseOver = !0, Emoji.emojiOver(i, D), Emoji.scrollToListEl(i, D), !1
    }
    return !0
  },
  scrollToListEl: function (e, i) {
    var t = Emoji.opts[e];
    if (t && t.emojiScroll) {
      var D = 30,
        o = i.offsetTop,
        s = Math.max(o + D - t.emojiScroll.data.viewportHeight, Math.min(t.emojiScroll.data.scrollTop, o - D));
      t.emojiScroll.data.scrollTop != s && t.emojiScroll.scrollTop(s)
    }
  },
  anim: function (e, i) {
    clearInterval(cur._imAnim);
    var t = 300,
      D = 45 / (t / 13),
      o = 1 / (t / 13),
      s = Math.floor(t / 13),
      r = 0,
      n = domLC(e),
      a = domFC(e),
      c = i ? 0 : 45,
      l = i ? 45 : 0,
      m = i ? 1 : 0,
      E = i ? 0 : 1;
    cur._imAnim = setInterval(function () {
      ++r;
      var t = r >= s ? l : c + D * r * (i ? 1 : -1),
        d = t - 45,
        C = r >= s ? E : m + o * r * (i ? -1 : 1),
        j = 1 - C;
      n.style.WebkitTransform = n.style.OTransform = n.style.transform = "rotate(" + t + "deg)", a.style.WebkitTransform = a.style.OTransform = a.style.transform = "rotate(" + d + "deg)", n.style.opacity = C, a.style.opacity = j, r >= s && (clearInterval(cur._imAnim), (i ? addClass : removeClass)(e, "emoji_smile_on"), n.style.WebkitTransform = n.style.OTransform = n.style.transform = a.style.WebkitTransform = a.style.OTransform = a.style.transform = n.style.opacity = a.style.opacity = "")
    }, 13)
  },
  tplSmile: function (e) {
    return '<div class="emoji_smile_wrap _emoji_wrap">  <div class="emoji_smile _emoji_btn" title="' + e + '" onmouseover="return Emoji.show(this, event);" onmouseout="return Emoji.hide(this, event);" onclick="return cancelEvent(event);">    <div class="emoji_smile_icon"></div>  </div></div>'
  },
  emojiToHTML: function (e, i, t) {
    if (browser.ipad || browser.iphone) return e;
    e = (e + "").replace(/&nbsp;/g, " ").replace(/<br>/g, "\n");
    for (var D = {
        D83DDE07: /(\s|^)([0OО]:\))([\s\.,]|$)/g,
        D83DDE09: /(\s|^)(;-\)+)([\s\.,]|$)/g,
        D83DDE06: /(\s|^)([XХxх]-?D)([\s\.,]|$)/g,
        D83DDE0E: /(\s|^)(B-\))([\s\.,]|$)/g,
        D83DDE0C: /(\s|^)(3-\))([\s\.,]|$)/g,
        D83DDE20: /(\s|^)(&gt;\()([\s\.,]|$)/g,
        D83DDE30: /(\s|^)(;[oоOО])([\s\.,]|$)/g,
        D83DDE33: /(\s|^)(8\|)([\s\.,]|$)/g,
        D83DDE32: /(\s|^)(8-?[oоOО])([\s\.,]|$)/g,
        D83DDE0D: /(\s|^)(8-\))([\s\.,]|$)/g,
        D83DDE37: /(\s|^)(:[XХ])([\s\.,]|$)/g,
        D83DDE28: /(\s|^)(:[oоOО])([\s\.,]|$)/g,
        2764: /(\s|^)(&lt;3)([\s\.,]|$)/g
      }, o = 0; o < 2; o++)
      for (var s in D) e = e.replace(D[s], function (e, i, t, D) {
        return (i || "") + Emoji.getEmojiHTML(s) + (D || "")
      });
    var D = {
      D83DDE0A: /(:-\))([\s\.,]|$)/g,
      D83DDE03: /(:-D)([\s\.,]|$)/g,
      D83DDE1C: /(;-[PР])([\s\.,]|$)/g,
      D83DDE0B: /(:-[pр])([\s\.,]|$)/g,
      D83DDE12: /(:-\()([\s\.,]|$)/g,
      "263A": /(:-?\])([\s\.,]|$)/g,
      D83DDE0F: /(;-\])([\s\.,]|$)/g,
      D83DDE14: /(3-?\()([\s\.,]|$)/g,
      D83DDE22: /(:&#039;\()([\s\.,]|$)/g,
      D83DDE2D: /(:_\()([\s\.,]|$)/g,
      D83DDE29: /(:\(\()([\s\.,]|$)/g,
      D83DDE10: /(:\|)([\s\.,]|$)/g,
      D83DDE21: /(&gt;\(\()([\s\.,]|$)/g,
      D83DDE1A: /(:-\*)([\s\.,]|$)/g,
      D83DDE08: /(\}:\))([\s\.,]|$)/g,
      D83DDC4D: /(:like:)([\s\.,]|$)/g,
      D83DDC4E: /(:dislike:)([\s\.,]|$)/g,
      "261D": /(:up:)([\s\.,]|$)/g,
      "270C": /(:v:)([\s\.,]|$)/g,
      D83DDC4C: /(:ok:|:ок:)([\s\.,]|$)/g
    };
    for (var s in D) e = e.replace(D[s], function (e, i, t) {
      return Emoji.getEmojiHTML(s) + (t || "")
    });
    return e = e.replace(/\n/g, "<br>"), i && (e = e.replace(Emoji.emojiRegEx, Emoji.emojiReplace)), e
  },
  emojiReplace: function (e) {
    var i = 0,
      t = "",
      D = "",
      o = "",
      s = [],
      r = [],
      n = !0;
    e.match(/\uFE0F\u20E3/g) && (e = e.replace(/\uFE0F/g, ""));
    do {
      var o = e.charCodeAt(i++);
      if (o) {
        var a = o.toString(16).toUpperCase(),
          c = e.charAt(i - 1);
        if (8419 != o) t += a, D += c, c.match(Emoji.emojiCharSeq) || (r.push(t), s.push(D), t = "", D = "");
        else {
          var l = i - 2,
            m = e.charAt(l);
          r.push("003" + m + "20E3"), s.push(m), t = "", D = ""
        }
      } else n = !1
    } while (n);
    t && (r.push(t), s.push(D));
    var E = "",
      d = !1,
      C = !1;
    t = "", D = "";
    for (var i in r) {
      var a = r[i],
        c = s[i];
      if (a && "FE0F" != a)
        if (c.match(/\uD83C[\uDFFB-\uDFFF]/)) t += a, D += c;
        else if (d) t += a, D += c, d = !1;
      else if (inArray(a, Emoji.emojiJoiners)) t ? (d = !0, t += a, D += c) : E += c, C = !1;
      else {
        if (c.match(/\uD83C[\uDDE6-\uDDFF]/)) {
          if (C) {
            t += a, D += c, C = !1;
            continue
          }
          C = !0
        } else C && (C = !1);
        t && (E += Emoji.getEmojiHTML(t, D, !0)), t = a, D = c
      }
    }
    return t && (E += Emoji.getEmojiHTML(t, D, !0)), E
  },
  emojiCharSeq: /[0-9\uD83D\uD83C\uD83E]/,
  emojiRegEx: /((?:[\u203C\u2049\u2122\u2328\u2601\u260E\u261d\u2626\u262A\u2638\u2639\u263a\u267B\u267F\u2702\u2708]|[\u2600\u26C4\u26BE\u2705\u2764]|[\u2194-\u2199\u21AA\u21A9]|[\u231A-\u231B]|[\u23E9-\u23EF]|[\u23F0-\u23F4]|[\u23F8-\u23FA]|[\u24C2]|[\u25AA-\u25AB]|[\u25B6\u25C0]|[\u25FB-\u25FE]|[\u2602-\u2618]|[\u2648-\u2653]|[\u2660-\u2668]|[\u26A0-\u26FA]|[\u2692-\u269C]|[\u262E-\u262F]|[\u2622-\u2623]|[\u2709-\u2764]|[\u2795-\u2797]|[\u27A1]|[\u27BF]|[\u2934-\u2935]|[\u2B05-\u2B07]|[\u2B1B]|[\u2B50\u2B55]|[\u303D]|[\u3297\u3299]|[\uE000-\uF8FF]|[\uD83D\uD83C\uD83E][\uDC00-\uDFFF]|[0-9]\u20E3|[\u0023-\u0039\u203C-\u21AA\u1F3F3]\uFE0F\u20E3|[\u200C\u200D\u2640\u2642\uFE0F])+)/g,
  emojiJoiners: ["2640", "2642", "200D", "200C"],
  emojiJoinersRegEx: /2640|2642|200D|200C/g,
  emojiFlags: ["D83CDDE8", "D83CDDF3", "D83CDDE9", "D83CDDEA", "D83CDDEA", "D83CDDF8", "D83CDDEB", "D83CDDF7", "D83CDDEC", "D83CDDE7", "D83CDDEE", "D83CDDF9", "D83CDDEF", "D83CDDF5", "D83CDDF0", "D83CDDF7", "D83CDDF7", "D83CDDFA", "D83CDDFA", "D83CDDF8", "D83CDDFA", "D83CDDE6", "D83CDDF0", "D83CDDFF", "D83CDDE7", "D83CDDFE", "D83CDDE6", "D83CDDFA", "D83CDDE6", "D83CDDF9", "D83CDDE7", "D83CDDEA", "D83CDDE7", "D83CDDF7", "D83CDDFB", "D83CDDF3", "D83CDDED", "D83CDDF0", "D83CDDE9", "D83CDDF0", "D83CDDEE", "D83CDDF1", "D83CDDEE", "D83CDDF3", "D83CDDEE", "D83CDDE9", "D83CDDEE", "D83CDDEA", "D83CDDE8", "D83CDDE6", "D83CDDE8", "D83CDDF4", "D83CDDF2", "D83CDDF4", "D83CDDF2", "D83CDDFE", "D83CDDF2", "D83CDDFD", "D83CDDF3", "D83CDDF1", "D83CDDF3", "D83CDDFF", "D83CDDF3", "D83CDDF4", "D83CDDE6", "D83CDDEA", "D83CDDF5", "D83CDDF1", "D83CDDF5", "D83CDDF9", "D83CDDF5", "D83CDDF7", "D83CDDF8", "D83CDDE6", "D83CDDF8", "D83CDDEC", "D83CDDF9", "D83CDDF7", "D83CDDF5", "D83CDDED", "D83CDDEB", "D83CDDEE", "D83CDDE8", "D83CDDF1", "D83CDDE8", "D83CDDED", "D83CDDF8", "D83CDDEA", "D83CDDFF", "D83CDDE6", "D83CDFF3", "D83CDF08"],
  getCode: function (e) {
    var i = !1;
    if ("emoji_css" == e.className) i = e.getAttribute("emoji");
    else if (e.className.indexOf("emoji") != -1) {
      var t = e.src && e.src.match(/\/([a-zA-Z0-9]+)(_2x)?.png/);
      i = t ? t[1] : e.getAttribute("emoji")
    }
    return i
  },
  getTabCont: function (e, i) {
    var t = window.devicePixelRatio >= 2 ? "128" : "64",
      D = "";
    if (i) {
      var o = "",
        s = Emoji.opts[e].forceStickerPack;
      for (var r in window.emojiStickers) {
        var n = window.emojiStickers[r][0],
          a = window.emojiStickers[r][1],
          c = (window.emojiStickers[r][3], window.emojiStickers[r][4] && s == n);
        if (a || c) {
          var l = Emoji.stickers[n];
          if (l) {
            var m = '<div class="clear emoji_stickers_spliter" id="emoji_tab_cont_' + n + "_" + e + '"></div>';
            n == Emoji.TAB_RECENT_STICKERS && (m += '<div class="emoji_recent_stickers_cont" id="emoji_recent_stickers_cont' + e + '">');
            var E = l.stickers;
            for (var d in E) m += rs(Emoji.stickerItem(), {
              optId: e,
              selId: n,
              stickerId: E[d][0],
              size: E[d][1],
              stickerSize: t
            });
            n == Emoji.TAB_RECENT_STICKERS ? o = m + "</div>" : c ? D = m + D : D += m
          }
        }
      }
      D = o + D
    } else D = Emoji.ttEmojiList(e);
    return D
  },
  updateStickersCont: function (e) {
    var i = Emoji.opts[e],
      t = Emoji.getTabCont(e, Emoji.TAB_RECENT_STICKERS),
      D = geByClass1("emoji_scroll_stickers", i.tt);
    D.innerHTML = t, i.initedStickers = 1, i.imagesLoading = [], clearTimeout(i.preloadStickersTimer);
    for (var o = [], s = [], r = D.firstChild, n = !1; r;) {
      if (!n && hasClass(r, "emoji_recent_stickers_cont") && (r = r.firstChild, n = !0), hasClass(r, "emoji_sticker_item")) {
        var a = r.id.replace("emoji_sticker_item", "");
        o.push([a, r.offsetTop])
      } else if (hasClass(r, "emoji_stickers_spliter")) {
        var a = r.id.replace("emoji_tab_cont_", "").split("_");
        s.push([intval(a[0]), r.offsetTop])
      }!r.nextSibling && n && (r = r.parentNode), r = r.nextSibling
    }
    i.needLoadStickers = o, i.stickersSplitersPos = s
  },
  stickerItem: function () {
    return '<a id="emoji_sticker_item%optId%_%selId%_%stickerId%" data-pack-id="%selId%" data-src="/images/stickers/%stickerId%/%stickerSize%.png" class="emoji_sticker_item" onclick="Emoji.stickerClick(%optId%, %stickerId%, %size%, this, \'keyboard\');"></a>'
  },
  hintsStickerItem: function () {
    return '<a id="emoji_sticker_item%optId%_%selId%_%stickerId%" data-pack-id="%selId%" class="emoji_sticker_item %class%" onclick="%onclick%" onmouseover="Emoji.stickerHintOver(this)" onmouseout="Emoji.stickerHintOut(this)"><img class="emoji_sticker_image" src="/images/stickers/%stickerId%/%stickerSize%.png" /></a>'
  },
  tabSwitch: function (e, i, t, D) {
    if (void 0 != e) {
      var o = Emoji.opts[t],
        s = o.tt;
      "number" == typeof e && (e = geByClass1("emoji_tab_" + e, s));
      var r = geByClass1("emoji_scroll_smiles", s),
        n = geByClass1("emoji_scroll_stickers", s);
      if (val(geByClass1("emoji_cats_title_helper", s), ""), o.curEmojiCatId = null, i == Emoji.TAB_EMOJI) hide(n), show(r), o.emojiInited || (val(r, Emoji.getTabCont(t, Emoji.TAB_EMOJI)), o.emojiInited = !0), o.imagesLoader && o.imagesLoader.processLoad(), o.emojiOvered && 0 === o.curTab && Emoji.emojiOver(t, Emoji.getFirstEmojiEl(t)), o.curTab != Emoji.TAB_EMOJI && o.emojiScroll && o.emojiScroll.scrollTop(0), Emoji.updateRecentEmoji(t), Emoji.updateEmojiCatTitle(t);
      else {
        hide(r), show(n);
        var a = Emoji.stickers && clone(Emoji.stickers);
        a && delete a[Emoji.TAB_RECENT_STICKERS], !a || isEmpty(a) || !a[i] && i != Emoji.TAB_RECENT_STICKERS ? (Emoji.onStickersLoad = Emoji.tabSwitch.pbind(i, i, t, D), Emoji.stickersLoadingProgress(t, i, e), o.stickersInited = !1, o.curTab = null, Emoji.emojiLoadMore(t)) : o.stickersInited || (Emoji.updateStickersCont(t), o.stickersInited = !0), (o.curTab != i || o.afterLoad) && (Emoji.scrollToStickerPack(t, i, o.curTab == Emoji.TAB_EMOJI), o.afterLoad = 0), Emoji.updateShownStickers(t, !0)
      }
      Emoji.onStickersLoad && i != Emoji.TAB_EMOJI || Emoji.selectTab(t, i, e)
    }
  },
  getFirstEmojiEl: function (e) {
    for (var i = Emoji.opts[e], t = geByClass1("emoji_scroll_smiles", i.tt).firstChild; t;) {
      if (hasClass(t, "emoji_smiles_row")) return t.firstChild;
      t = t.nextSibling
    }
    return null
  },
  getEmojiEl: function (e, i) {
    for (var t, D = 0, o = e.parentNode, s = 0, r = o.firstChild; r && (s++, r !== e);) r = r.nextSibling;
    for (; e && !t;) {
      if ("left" == i || "right" == i) t = "left" == i ? e.previousSibling : e.nextSibling, t || ("left" == i ? (i = "up", s = 10) : (i = "down", s = 1));
      else {
        if ("up" != i && "down" != i) break;
        for (var n = o; n && (n = "up" == i ? n.previousSibling : n.nextSibling, n && !hasClass(n, "emoji_smiles_row")););
        if (!n) break;
        if (s && n)
          for (var a = 0, r = n.firstChild; r && a < s;) {
            if (a++, a >= s) {
              t = r;
              break
            }
            r = r.nextSibling
          }
        if (t || !n) break;
        t = "up" == i || s && "down" == i ? n.lastChild : n.firstChild
      }
      if (D++, D > 20) {
        debugLog("ERR!!");
        break
      }
    }
    return t
  },
  stickerClick: function (e, i, t, D, o) {
    var s = Emoji.opts[e],
      r = parseInt(attr(D, "data-pack-id")),
      n = !0;
    if (window.emojiStickers && each(window.emojiStickers, function (e, i) {
        if (i[0] == r) return n = !!i[1], !1
      }), n) {
      Emoji.stickers[-1] || (Emoji.stickers[-1] = {
        stickers: []
      });
      for (var a in Emoji.stickers[-1].stickers) Emoji.stickers[-1].stickers[a][0] == i && Emoji.stickers[-1].stickers.splice(a, 1);
      Emoji.stickers[-1].stickers.unshift([i, t]), ls.set("recent_stickers", Emoji.stickers[-1]), Emoji.updateRecentStickers(e)
    }
    s.onStickerSend && s.onStickerSend(i, o), Emoji.ttHide(e, !1, !1, !0), s.recentSticker = i
  },
  stickerOver: function (e, i) {
    var t = {
      act: "a_stickers_hover",
      sticker_id: e,
      from: cur.module
    };
    if (isObject(i.tt) && "IMG" === i.firstChild.nodeName) return i.tt.show();
    var D = function (e, t) {
      var D = (cur.tooltips || []).length,
        o = ["subscribe_post_tt", "sticker_extra_tt", "sticker_extra_tt" + D, e.image ? "" : "tt_text_only"];
      if (o = o.join(" "), e.show) {
        var s = {
          index: D,
          className: o,
          content: t,
          shift: function () {
            return [-138, 0, -200]
          },
          hasover: 1,
          slideX: 15,
          showsp: 150,
          cache: 1,
          forcetodown: !0,
          no_shadow: !0,
          dir: "left",
          onShowStart: function (e) {
            var i = e.container,
              t = getSize(e.container),
              D = t[1],
              o = 225,
              s = 10;
            D >= o || (el_diff = intval((o - D) / 2) + s, el_cur_top = intval(getStyle(i, "top", !0)), el_top = el_cur_top + el_diff, setStyle(i, "top", el_top))
          }
        };
        gpeByClass("_im_peer_history_w", i) && (s.appendParentCls = "_im_peer_history_w"), showTooltip(i, s)
      }
    };
    ajax.post("al_im.php", t, {
      onDone: D
    })
  },
  selectPeer: function (e) {
    if (void 0 !== e) {
      var i = Emoji.opts[e];
      if (i.peer) return i.peer
    }
    var t = cur.peer || (cur.mbTo ? cur.mbTo[0] : "");
    if (t == -3 && cur.wdd.imw_dd) {
      var D = 0;
      for (var o in cur.wdd.imw_dd.selected) t = cur.wdd.imw_dd.selected[o][0], D += 1;
      D > 1 && (t = "")
    }
    return t
  },
  showMyStickers: function () {
    cur.boxMyStickers = showBox("al_im.php", {
      act: "stickers_my"
    }, {
      dark: 1,
      stat: ["im.css", "imn.js", "sorter.js"]
    })
  },
  showStickersStore: function (e, i) {
    var t = Emoji.selectPeer(e !== !1 ? e : void 0),
      D = {
        act: "stickers_store",
        peer: t,
        box: 1
      };
    i && (D.from = i), cur.boxStickersStore = showBox("al_im.php", D, {
      dark: 1,
      stat: ["im.css", "imn.js", "page_help.css", "sorter.js"]
    }), each(geByClass("emoji_smile_icon_promo"), function (e, i) {
      geByClass1("emoji_smile_icon", i.parentNode), re(i)
    }), each(geByClass("emoji_shop_icon_badge"), function (e, i) {
      re(i)
    }), Emoji.hasNewStickers = !1
  },
  previewSticker: function (e, i, t, D) {
    if (t = t || {}, D && checkEvent(D)) return !0;
    var o = {
        act: "sticker_preview",
        pack_id: e
      },
      s = Emoji.selectPeer();
    if (t.peer ? o.peer = t.peer : s && (o.peer = s), t.preview && (o.preview = 1), t.stickerId && (o.sticker_id = t.stickerId), o.sticker_referrer = t.sticker_referrer || "store", t.name) {
      var r = nav.objLoc[0].split("/");
      "stickers" == r[0] && r[1] != t.name && nav.setLoc({
        0: "stickers/" + t.name
      })
    }
    return cur.boxStickersPreview = showBox("al_im.php", o, {
      dark: 1,
      stat: ["im.css", "imn.js"],
      onFail: function (i) {
        if (window.emojiStickersDisabled || (window.emojiStickersDisabled = {}), e && (window.emojiStickersDisabled[e] = !0), i) return !0
      }
    }), cancelEvent(D), !1
  },
  isStickerPackEnabled: function (e, i) {
    var t = !1;
    if (!window.emojiStickers && i) return ajax.post("al_im.php", {
      act: "a_stickers_list"
    }, {
      onDone: function (e) {
        window.emojiStickers = e, i()
      }
    }), 0;
    if (!window.emojiStickers) return !1;
    for (var D in window.emojiStickers)
      if (window.emojiStickers[D][0] == e) {
        t = !!window.emojiStickers[D][1];
        break
      }
    return t
  },
  clickSticker: function (e, i, t) {
    if (window.emojiStickersDisabled && window.emojiStickersDisabled[e]) return !0;
    if (i) {
      var D = Emoji.isStickerPackEnabled(e, Emoji.clickSticker.pbind(e, i, t));
      if (0 === D) return !1;
      if (D) {
        var o = !1;
        if (i.getAttribute("contenteditable")) o = i;
        else {
          for (var s = i.parentNode, r = !1;
            (s = s.parentNode) && !hasClass(s, "js-im-page");) {
            if (hasClass(s, "fc_tab")) {
              r = !0;
              break
            }
            if (hasClass(s, "mv_chat")) break
          }
          if (!s) return !1;
          r ? o = geByClass1("fc_editable", s) : hasClass(s, "js-im-page") ? o = geByClass1("_im_text") : hasClass(s, "mv_chat") && (o = domByClass(s, "mv_chat_reply_input"))
        }
        if (o) {
          var n = Emoji.opts[o.emojiId];
          Emoji.ttClick(o.emojiId, geByClass1("_emoji_btn", o.parentNode.parentNode), !1, !0);
          var a = geByClass1("emoji_tab_" + e, n.tt),
            c = Emoji.stickers && clone(Emoji.stickers);
          c && delete c[-1], !c || isEmpty(c) ? (Emoji.onStickersLoad = Emoji.tabSwitch.pbind(e, e, o.emojiId), Emoji.stickersLoadingProgress(o.emojiId, e, a)) : (n.initedStickers = 0, Emoji.tabSwitch(a, e, o.emojiId))
        }
      }
    }
    return i && D || Emoji.previewSticker(e, !1, {
      sticker_referrer: "message"
    }), t && cancelEvent(t), !1
  },
  stickersLoadingProgress: function (e, i, t) {
    var D = Emoji.opts[e];
    removeClass(geByClass1("emoji_tab_sel", D.tt), "emoji_tab_sel"), addClass(t, "emoji_tab_sel"), geByClass1("emoji_scroll_stickers", D.tt).innerHTML = '<div class="emoji_scroll_progress">' + rs(vk.pr_tpl, {
      id: "",
      cls: "pr_big"
    }) + "</div>"
  },
  buyStickers: function (e, i, t, D, o) {
    if (t) {
      t.innerHTML;
      if (hasClass(t, "secondary")) return !0
    }
    var s = Emoji.selectPeer();
    return ajax.post("/al_im.php", {
      act: "a_stickers_buy",
      pack_id: e,
      hash: D,
      peer: s,
      sticker_referrer: unclean(o)
    }, {
      onDone: function (i, t, D, o, s) {
        if (each(geByClass("_sticker_btn_" + e), function () {
            this.innerHTML = o, this.onmouseover = "", this.onclick = "", addClass(this, "secondary")
          }), cur.boxStickersPreview && cur.boxStickersPreview.hide(), s && cur.boxStickersStore && cur.boxStickersStore.hide(), showDoneBox(i), t) {
          Emoji.updateTabs(t, D, !0);
          try {
            vk.widget && Rpc.callMethod("proxy", "updateStickers")
          } catch (e) {}
          window.Videoview && Videoview.onStickersPurchased(e)
        }
        var r = cur.tabbedStickersBox;
        if (r && r.tbUpdate)
          for (var n in r.tbUpdate) r.tbUpdate[n] = 1;
        var a = cur.emojiId && cur.emojiId[cur.peer];
        if (a) {
          var c = geByClass1("emoji_tab_" + e, Emoji.opts[a].tt);
          c && Emoji.tabSwitch(c, e, a)
        }
      },
      showProgress: lockButton.pbind(t),
      hideProgress: unlockButton.pbind(t),
      onFail: function (e) {
        return e && setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0
      }
    }), cancelEvent(i)
  },
  stickerAct: function (e, i, t, D, o) {
    if (o && hasClass(e, "secondary")) return !0;
    var s = (e.innerHTML, o ? hasClass(e, "secondary") : hasClass(e, "_im_sticker_activated"));
    s ? state = 1 : state = 0;
    var r = cur.tabbedStickersBox;
    if (r)
      for (var n in r.tbUpdate) r.tbUpdate[n] = 1;
    return ajax.post("/al_im.php", {
      act: "a_stickers_switch",
      pack_id: i,
      hash: t,
      state: state,
      from_btn: o ? 1 : 0
    }, {
      onDone: function (t, D, s, r) {
        o || (e.innerHTML = t, e.onmouseover = "", setStyle(e, {
          width: "auto"
        }), toggleClass(e, "_im_sticker_activated", !state)), each(geByClass("_sticker_btn_" + i), function () {
          this.innerHTML = r, this.onmouseover = "", toggleClass(this, "secondary", !state)
        }), Emoji.updateTabs(D, s, !0);
        var n = e.parentNode.parentNode;
        if (!o) {
          if (cur.stickersSorter.destroy(), state) {
            show("im_stickers_deact");
            var a = ge("im_stickers_deact_wrap");
            a.firstChild ? a.insertBefore(n, a.firstChild) : a.appendChild(n), setStyle(n, {
              cursor: "default"
            })
          } else {
            var a = geByTag1("div", "im_stickers_my_wrap");
            a.appendChild(n);
            var c = ge("im_stickers_deact_wrap");
            c.childNodes.length || hide("im_stickers_deact")
          }
          cur.stickersSorterInit()
        }
      },
      showProgress: lockButton.pbind(e),
      hideProgress: unlockButton.pbind(e)
    }), cancelEvent(D)
  },
  getTabsCode: function (e, i) {
    var t = [];
    e && t.push.apply(t, e), t.length > 1 && (Emoji.hasNewStickers = !1);
    var D = Emoji.opts[i].forceStickerPack,
      o = "",
      s = "";
    for (var r in t) {
      var n = t[r][0],
        a = t[r][1],
        c = t[r][3],
        l = t[r][4] && n == D;
      if (a || c || l) {
        if (a || l) var m = "return Emoji.tabSwitch(this, " + n + ", " + i + ");";
        else var m = "return Emoji.previewSticker(" + n + ", false, {sticker_referrer: 'keyboard'});";
        if (t[r][2] && (Emoji.hasNewStickers = t[r][2]), n === -1) o += '<a class="emoji_tab emoji_tab_img_cont emoji_tab_recent emoji_tab_' + n + (cur.stickersTab == n ? " emoji_tab_sel" : "") + '" onclick="' + m + '"><span class="emoji_tab_icon emoji_sprite emoji_tab_icon_recent"></span></a>';
        else if (n) {
          var E = '<a class="emoji_tab emoji_tab_img_cont emoji_tab_' + n + (cur.stickersTab == n ? " emoji_tab_sel" : "") + (a || l ? "" : " emoji_tab_promo") + '" onclick="' + m + '"><img width="22" height="22" src="/images/store/stickers/' + n + "/thumb_" + (window.devicePixelRatio >= 2 ? "44" : "22") + '.png" class="emoji_tab_img"/></a>';
          l ? s = E + s : s += E
        } else o += '<a class="emoji_tab emoji_tab_' + n + (cur.stickersTab == n ? " emoji_tab_sel" : "") + (a ? "" : " emoji_tab_promo") + '" onclick="' + m + '"><div class="emoji_tab_icon emoji_sprite emoji_tab_icon_' + n + '"></div></a>'
      }
    }
    return o + s
  },
  updateTabs: function (e, i, t) {
    e && t && window.Notifier && Notifier.lcSend("emoji", {
      act: "updateTabs",
      newStickers: e,
      keywords: i
    });
    var D = 0;
    void 0 === i ? (Emoji.initStickersKeywords(), window.stickersKeywordsData || (D = 1)) : (window.stickersKeywordsData = i, Emoji.setStickersKeywords(window.stickersKeywordsData, t)), void 0 === e ? window.emojiStickers && window.stickersKeywordsData || ajax.post("al_im.php", {
      act: "a_stickers_list",
      need_keywords: D,
      cache_time: Emoji.cachedStickersKeywordsTime()
    }, {
      onDone: Emoji.updateTabs
    }) : window.emojiStickers = e;
    for (var o in Emoji.opts) {
      var s = Emoji.opts[o];
      if (!s.noStickers) {
        var r = "";
        r += Emoji.getTabsCode(window.emojiStickers, o);
        var n = ge("emoji_tabs_cont_" + o);
        n && (n.innerHTML = r), Emoji.checkEmojiSlider(s), Emoji.checkNewStickers(s), s.stickersInited = !1
      }
    }
    var a = Emoji.stickers && clone(Emoji.stickers);
    a && delete a[Emoji.TAB_RECENT_STICKERS], Emoji.onStickersLoad && window.emojiStickers && !isEmpty(a) && (Emoji.onStickersLoad(), Emoji.onStickersLoad = !1)
  },
  checkNewStickers: function (e) {
    var i = e.txt;
    if (!e.noStickers && !e.noStickersStore && window.emojiStickers && i.getAttribute("contenteditable")) {
      for (var t in window.emojiStickers)
        if (window.emojiStickers[t][2]) {
          Emoji.hasNewStickers = window.emojiStickers[t][2];
          break
        }
      Emoji.hasNewStickers < 0 && !Emoji.noNewStickers && setTimeout(function () {
        each(geByClass("emoji_smile_icon"), function (e, i) {
          var t = i.parentNode;
          geByClass1("emoji_smile_icon_promo", t) || (t.appendChild(ce("div", {
            className: "emoji_smile_icon_promo"
          })), addEvent(i, "mouseover", function () {
            showTooltip(this, {
              text: getLang("global_store_stickers_new_available"),
              shift: [7, 1, 4],
              showdt: 0,
              black: 1
            })
          }))
        })
      }, hasClass(i, "fc_editable") ? 200 : 0)
    }
  },
  checkEmojiSlider: function (e) {
    var i = geByClass1("emoji_tabs_wrap", e.tt),
      t = !1;
    if (i) {
      if (i.firstChild.clientWidth && i.firstChild.clientWidth > i.clientWidth + i.scrollLeft) t = !0;
      else {
        var D = i.firstChild.childNodes;
        D.length > 6 && (e.scrollLeft || 0) < 34 * (D.length - 6) - 16 && (t = !0)
      }
      var o = vk.rtl ? "l" : "r";
      t ? (e.sliderShown = !0, Emoji.scrollToggleArrow(!0, o, e, !0)) : e.sliderShown && (e.sliderShown = !1, Emoji.scrollToggleArrow(!1, o, e, !0))
    }
  },
  giftSticker: function (e, i, t, D) {
    D = D || {};
    var o = {
      act: "stickers_gift_box",
      pack_id: e,
      peers: i
    };
    return D.from && (o.from = D.from), o.sticker_referrer = D.sticker_referrer || "store", boxLayerWrap.scrollTop = 0, showBox("/al_im.php", o, {
      stat: ["wide_dd.js", "wide_dd.css", "notifier.css", "notifier.js"],
      dark: 1
    }), cancelEvent(t)
  },
  showStickerTT: function (e) {
    var i = e.getAttribute("data-title");
    i && showTooltip(e, {
      text: i,
      slide: 15,
      shift: [74 - getSize(e)[0] / 2, 120, 5],
      className: "sticker_hint_tt",
      hasover: 1
    })
  },
  scrollToStickerPack: function (e, i, t) {
    var D = Emoji.opts[e],
      o = ge("emoji_tab_cont_" + i + "_" + e),
      s = o && i != Emoji.TAB_RECENT_STICKERS ? o.offsetTop + getSize(o)[1] : 0;
    D.scrollAnimation = 1, D.emojiScroll.scrollTop(s, t ? 0 : 200, function () {
      D.scrollAnimation = 0
    }), Emoji.scrollToTab(i, e)
  },
  __eof: 1
};
try {
  stManager.done("emoji.js")
} catch (e) {}