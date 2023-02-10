/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/bolded-paragraphs.js":
/*!*******************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/bolded-paragraphs.js ***!
  \*******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const boldedParagraphsCheck = (report, doc) => {
  const boldedParagraphs = [];
  const paragraphs = Array.from(doc.querySelectorAll("p"));
  function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node) {
      if (node === parent) {
        return true;
      }

      // Traverse up to the parent
      node = node.parentNode;
    }

    // Go up until the root but couldn't find the `parent`
    return false;
  }
  function detailsView(boldedParagraphs) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      className: "wsu-gutenberg-accessibility-panel__details-table"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Paragraph Text"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, boldedParagraphs.map((p, idx) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: `para-` + idx
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, p)))));
  }
  paragraphs.forEach(p => {
    const text = p.textContent;
    if (text.trim() !== "") {
      const boldElements = Array.from(p.querySelectorAll("strong, b"));
      boldElements.forEach(e => {
        if (isDescendant(p, e)) {
          e.parentNode.removeChild(e);
        }
      });
      if (p.textContent.trim() === "") {
        const more = text.length > 75 ? "…" : "";
        boldedParagraphs.push(text.substring(0, 75).trim() + more);
      }
    }
  });
  if (boldedParagraphs.length > 0) {
    const plural = boldedParagraphs.length > 1 ? "s" : "";
    const singular = boldedParagraphs.length === 1 ? "s" : "";
    report.warnings.push({
      message: `${boldedParagraphs.length} paragraph${plural} contain${singular} only bold text`,
      detailsViewLabel: "Paragraphs with only bolded text",
      detailsView: detailsView.bind(undefined, boldedParagraphs)
    });
  }
  return report;
};
wp.hooks.addFilter("wsu.Accessibility", "wsuwp/accessibility-checker", boldedParagraphsCheck);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/heading-order.js":
/*!***************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/heading-order.js ***!
  \***************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const headingOrderCheck = (report, doc) => {
  let previousHeadingLevel = doc.querySelector("h1") === null ? 1 : 0;
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  function getHeadingLevel(heading) {
    return parseInt(heading.tagName[1]);
  }
  function detailsView(headingData) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      className: "wsu-gutenberg-accessibility-panel__details-table"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Valid"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Level"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Content"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, headingData.map((h, idx) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: `heading-` + idx
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `dashicon dashicons dashicons-${h.icon}`
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, h.tag), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, h.content)))));
  }
  let hasFailed = false;
  const headingData = headings.map(h => {
    const headingLevel = getHeadingLevel(h);
    const isValid = !(headingLevel > previousHeadingLevel + 1);
    const icon = hasFailed ? "minus" : isValid ? "yes-alt" : "dismiss";
    previousHeadingLevel = headingLevel;
    hasFailed = hasFailed === true ? true : !isValid;
    return {
      icon: icon,
      tag: h.tagName,
      content: h.textContent
    };
  });
  if (hasFailed) {
    report.alerts.push({
      message: "Incorrect heading order",
      detailsViewLabel: "Incorrect heading order",
      detailsView: detailsView.bind(undefined, headingData)
    });
  }
  return report;
};
wp.hooks.addFilter("wsu.Accessibility", "wsuwp/accessibility-checker", headingOrderCheck);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/image-alts.js":
/*!************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/image-alts.js ***!
  \************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const imageAltsCheck = (report, doc) => {
  const missingAlts = [];
  const linkedImagesMissingAlts = [];
  const linkedImagesWithAlts = [];
  const images = Array.from(doc.querySelectorAll("img"));
  function detailsView(imgs, showAlt) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      className: "wsu-gutenberg-accessibility-panel__details-table"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Preview"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Filename"), showAlt && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Alt Text"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, imgs.map((i, idx) => {
      // const id = extractId(i.className);
      const filename = i.getAttribute("src")?.split("/").pop();
      const alt = i.alt?.trim();
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
        key: `image-` + idx
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: i.getAttribute("src")
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, filename), showAlt && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, alt));
    })));
  }
  images.forEach(i => {
    const link = i.closest("a");
    const alt = i.alt.trim();
    if (!alt && !link) {
      missingAlts.push(i);
    } else if (link && link.tabIndex !== -1 && !alt) {
      linkedImagesMissingAlts.push(i);
    } else if (link && alt) {
      linkedImagesWithAlts.push(i);
    }
  });
  if (missingAlts.length > 0) {
    const plural = missingAlts.length > 1 ? "s" : "";
    report.warnings.push({
      message: `${missingAlts.length} image${plural} missing alt text`,
      detailsViewLabel: "Images missing alt text",
      detailsView: detailsView.bind(undefined, missingAlts, false)
    });
  }
  if (linkedImagesMissingAlts.length > 0) {
    const plural = linkedImagesMissingAlts.length > 1 ? "s" : "";
    report.errors.push({
      message: `${linkedImagesMissingAlts.length} linked image${plural} missing alt text`,
      detailsViewLabel: "Linked images missing alt text",
      detailsView: detailsView.bind(undefined, linkedImagesMissingAlts, false)
    });
  }
  if (linkedImagesWithAlts.length > 0) {
    const plural = linkedImagesWithAlts.length > 1 ? "s" : "";
    report.warnings.push({
      message: `${linkedImagesWithAlts.length} image${plural} where alt text should be the destination`,
      detailsViewLabel: "Images where alt text should be the destination",
      detailsView: detailsView.bind(undefined, linkedImagesWithAlts, true)
    });
  }
  return report;
};
wp.hooks.addFilter("wsu.Accessibility", "wsuwp/accessibility-checker", imageAltsCheck);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/index.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/index.js ***!
  \*******************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _missing_hrefs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./missing-hrefs */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/missing-hrefs.js");
/* harmony import */ var _image_alts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-alts */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/image-alts.js");
/* harmony import */ var _heading_order__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./heading-order */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/heading-order.js");
/* harmony import */ var _bolded_paragraphs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bolded-paragraphs */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/bolded-paragraphs.js");





/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/missing-hrefs.js":
/*!***************************************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/missing-hrefs.js ***!
  \***************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const missingHrefsCheck = (report, doc) => {
  const missingHrefs = [];
  const links = Array.from(doc.querySelectorAll("a"));
  function detailsView(missingHrefs) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      className: "wsu-gutenberg-accessibility-panel__details-table"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Link Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Href"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, missingHrefs.map((l, idx) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: `link-` + idx
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, l.textContent), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, l.getAttribute("href"))))));
  }
  links.forEach(l => {
    const href = l.getAttribute("href");
    if (href === null || href.trim() === "" || href.trim() === "#" || href.trim() === "http://" || href.trim() === "https://") {
      missingHrefs.push(l);
    }
  });
  if (missingHrefs.length > 0) {
    const plural = missingHrefs.length > 1 ? "s" : "";
    report.errors.push({
      message: `${missingHrefs.length} link${plural} with missing or invalid href${plural}`,
      detailsViewLabel: "Links with missing or invalid hrefs",
      detailsView: detailsView.bind(undefined, missingHrefs)
    });
  }
  return report;
};
wp.hooks.addFilter("wsu.Accessibility", "wsuwp/accessibility-checker", missingHrefsCheck);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/details-view.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/details-view.js ***!
  \***********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const {
  useState,
  useEffect,
  useRef
} = wp.element;
const {
  Popover,
  Button
} = wp.components;
const DetailsView = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [skipNext, setSkipNext] = useState(false);
  const toggleButton = useRef(null);

  // hack to prevent reopening popover when clicking the button to close
  useEffect(() => {
    document.addEventListener("click", resetSkipNext);
    return () => {
      document.removeEventListener("click", resetSkipNext);
    };
  }, []);
  function resetSkipNext(e) {
    setSkipNext(false);
  }
  function toggle(e) {
    if (!skipNext) {
      setIsOpen(state => !state);
    }
    setSkipNext(e === undefined);
  }
  function getAnchorProp() {
    return WSUWP_DATA.wpVersion.includes("6.1") ? {
      anchor: props.anchor.current
    } : {
      getAnchorRect: () => {
        const rect = props.anchor.current?.getBoundingClientRect() || null;
        if (rect) {
          rect.x = rect.right - rect.width - rect.width / 2 - 25 - 8; // 😵🥴
          rect.y = rect.y - rect.height - 10;
          return rect;
        }
        return null;
      }
    };
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Button, {
    ref: toggleButton,
    isLink: true,
    onClick: toggle
  }, "Details"), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Popover, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "wsu-gutenberg-accessibility-panel__details-view",
    headerTitle: props.label,
    onClose: toggle,
    position: "bottom left"
  }, getAnchorProp()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", {
    className: "wsu-gutenberg-accessibility-panel__details-heading"
  }, props.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "wsu-gutenberg-accessibility-panel__details-content"
  }, props.children)));
};
/* harmony default export */ __webpack_exports__["default"] = (DetailsView);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/hooks.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/hooks.js ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useOutputMarkup": function() { return /* binding */ useOutputMarkup; }
/* harmony export */ });
const {
  useState,
  useEffect,
  useRef
} = wp.element;
const useOutputMarkup = function (postId, gutenbergContent) {
  const [output, setOutput] = useState({
    html: null,
    isLoading: false,
    error: null
  });
  const abortControllerRef = useRef(null);
  useEffect(() => {
    try {
      setOutput({
        html: null,
        isLoading: true,
        error: null
      });
      abortControllerRef.current?.abort();
      if (typeof AbortController !== "undefined") {
        abortControllerRef.current = new AbortController();
      }
      (async () => {
        const response = await fetch(WSUWP_DATA.siteUrl + `/wp-json/wsu-gutenberg-accessibility/v1/parse-gutenberg-content`, {
          method: "POST",
          body: new URLSearchParams({
            postId: postId,
            content: gutenbergContent
          }),
          signal: abortControllerRef.current?.signal
        });
        const responseJson = await response.json();
        if (response.ok) {
          setOutput({
            html: responseJson.html,
            isLoading: false,
            error: null
          });
        } else {
          setOutput({
            html: null,
            isLoading: false,
            error: `${responseJson.code} | ${responseJson.message} ${response.status} (${response.statusText})`
          });
        }
      })();
      return () => {
        abortControllerRef.current?.abort();
      };
    } catch (ex) {
      setOutput({
        html: null,
        isLoading: false,
        error: ex.message
      });
    }
  }, [postId, gutenbergContent]);
  return output;
};


/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/index.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/index.js ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _report_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./report-panel */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/report-panel.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/hooks.js");
/* harmony import */ var _default_checks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./default-checks */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/default-checks/index.js");

// FIXME: Doesn't work on the first save because the endpoint requires a postId
// FIXME: If the editor clicks save before the report finishes loading the meta data will be lost. Could lock the save buttons during load?



const registerPlugin = wp.plugins.registerPlugin;
const {
  applyFilters
} = wp.hooks;
const {
  useSelect,
  useDispatch
} = wp.data;
const AccessibilityChecker = () => {
  const report = {
    errors: [],
    alerts: [],
    warnings: [],
    data: {}
  };
  const {
    editPost
  } = useDispatch("core/editor");
  const {
    postId,
    editedPostContent,
    permalink,
    isSaving
  } = useSelect(select => {
    const editor = select("core/editor");
    return {
      postId: editor.getCurrentPostId(),
      editedPostContent: editor.getEditedPostContent(),
      permalink: editor.getPermalink(),
      isSaving: editor.isSavingPost() || editor.isAutosavingPost()
    };
  });
  const {
    html,
    isLoading,
    error
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_2__.useOutputMarkup)(postId, editedPostContent);
  if (html !== null) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    applyFilters("wsu.Accessibility", report, doc);
    setTimeout(() => {
      editPost({
        meta: {
          wsuwp_accessibility_report: JSON.stringify(report)
        }
      });
    }, 0);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_report_panel__WEBPACK_IMPORTED_MODULE_1__["default"], {
    report: report,
    isLoading: isLoading,
    error: error,
    permalink: permalink
  });
};
const AccessibilityCheckerInitiator = () => {
  // const status = wp.data.select("core/editor").getCurrentPost().status;
  // return status !== "auto-draft" && <AccessibilityChecker />;

  const lastRevisionId = wp.data.select("core/editor").getCurrentPostLastRevisionId();
  return lastRevisionId !== null && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AccessibilityChecker, null);
};
registerPlugin("wsu-plugin-accessibility", {
  render: AccessibilityCheckerInitiator,
  icon: ""
});

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/report-panel.js":
/*!***********************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/report-panel.js ***!
  \***********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _report__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./report */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/report.js");


const {
  PluginDocumentSettingPanel
} = wp.editPost;
const ReportPanel = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginDocumentSettingPanel, {
    name: "wsu-accessibility",
    title: "Accessibility",
    className: "wsu-gutenberg-accessibility-panel"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_report__WEBPACK_IMPORTED_MODULE_1__["default"], props));
};
/* harmony default export */ __webpack_exports__["default"] = (ReportPanel);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/report.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/report.js ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _details_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./details-view */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/details-view.js");


const {
  ExternalLink
} = wp.components;
const {
  useRef
} = wp.element;
const ReportTable = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.logs.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "wsu-gutenberg-accessibility-panel__report-table"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, props.logs.map((l, idx) => {
    const tableRow = useRef(null);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      ref: tableRow,
      key: `rr-${idx}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, l.message), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_details_view__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: l.detailsViewLabel,
      anchor: tableRow
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(l.detailsView, null))));
  })))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "wsu-gutenberg-accessibility-panel__report-empty-message"
  }, props.emptyMessage));
};
const Report = props => {
  const {
    report,
    isLoading,
    error,
    permalink
  } = props;
  const reportSections = [{
    label: "Errors",
    icon: "dismiss",
    logs: report.errors
  }, {
    label: "Alerts",
    icon: "warning",
    logs: report.alerts
  }, {
    label: "Warnings",
    icon: "flag",
    logs: report.warnings
  }];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !isLoading && !error ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, reportSections.map(section => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: `section-${section.label}`,
    className: "wsu-gutenberg-accessibility-panel__section"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wsu-gutenberg-accessibility-panel__section-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicon dashicons dashicons-${section.icon}`
  }), " ", section.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ReportTable, {
    logs: section.logs,
    emptyMessage: `0 ${section.label.toLowerCase()} to display.`
  })))) : error ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, error) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "loading..."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ExternalLink, {
    className: "wsu-gutenberg-accessibility-panel__wave-link",
    href: `https://wave.webaim.org/report#/` + permalink
  }, "Review on WAVE"));
};
/* harmony default export */ __webpack_exports__["default"] = (Report);

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/index.js":
/*!******************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/index.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accessibility_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessibility-checker */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/accessibility-checker/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/style.scss");



/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/style.scss":
/*!********************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/style.scss ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*************************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwsuwp_plugin_gutenberg_accessibility"] = self["webpackChunkwsuwp_plugin_gutenberg_accessibility"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("../../../../../../../../../repos/wsu/wsuwp-plugin-gutenberg-accesssibility/assets/src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map