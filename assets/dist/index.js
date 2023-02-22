!function(){var e={251:function(){wp.hooks.addFilter("wsu.Accessibility","wsuwp/accessibility-checker",((e,t,n)=>(""===n.getEditedPostAttribute("title").trim()&&e.errors.push({message:"Missing page title"}),e)))}},t={};function n(l){var i=t[l];if(void 0!==i)return i.exports;var s=t[l]={exports:{}};return e[l](s,s.exports,n),s.exports}!function(){"use strict";var e=window.wp.element;function t(){return t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},t.apply(this,arguments)}const{useState:l,useEffect:i,useRef:s}=wp.element,{Popover:a,Button:r}=wp.components;var o=n=>{const[o,c]=l(!1),[u,m]=l(!1),g=s(null);function d(e){m(!1)}function h(e){u||c((e=>!e)),m(void 0===e)}return i((()=>(document.addEventListener("click",d),()=>{document.removeEventListener("click",d)})),[]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(r,{ref:g,isLink:!0,onClick:h},"Details"),o&&(0,e.createElement)(a,t({className:"wsu-gutenberg-accessibility-panel__details-view",headerTitle:n.label,onClose:h,position:"bottom left"},WSUWP_DATA.wpVersion.includes("6.1")?{anchor:g.current.closest(".wsu-gutenberg-accessibility-panel__report-table-row")}:{getAnchorRect:()=>{const e=g.current.closest(".wsu-gutenberg-accessibility-panel__report-table-row")?.getBoundingClientRect()||null;return e?(e.x=e.right-e.width-e.width/2-25-8,e.y=e.y-e.height-10,e):null}}),(0,e.createElement)("h4",{className:"wsu-gutenberg-accessibility-panel__details-heading"},n.label),(0,e.createElement)("div",{className:"wsu-gutenberg-accessibility-panel__details-content"},n.children)))};const{ExternalLink:c}=wp.components,u=t=>(0,e.createElement)(e.Fragment,null,t.logs.length>0?(0,e.createElement)(e.Fragment,null,(0,e.createElement)("table",{className:"wsu-gutenberg-accessibility-panel__report-table"},(0,e.createElement)("tbody",null,t.logs.map(((n,l)=>(0,e.createElement)("tr",{key:`${t.type}-${l}`,className:"wsu-gutenberg-accessibility-panel__report-table-row"},(0,e.createElement)("td",null,n.message),(0,e.createElement)("td",null,n.detailsView&&(0,e.createElement)(o,{label:n.detailsViewLabel},(0,e.createElement)(n.detailsView,null))))))))):(0,e.createElement)("p",{className:"wsu-gutenberg-accessibility-panel__report-empty-message"},t.emptyMessage));var m=t=>{const{report:n,isLoading:l,error:i,permalink:s}=t,a=[{label:"Errors",icon:"dismiss",logs:n.errors},{label:"Alerts",icon:"warning",logs:n.alerts},{label:"Warnings",icon:"flag",logs:n.warnings}];return(0,e.createElement)(e.Fragment,null,l||i?i?(0,e.createElement)("p",null,"💥 ",i):(0,e.createElement)("p",null,"loading..."):(0,e.createElement)(e.Fragment,null,a.map((t=>(0,e.createElement)("div",{key:`section-${t.label}`,className:"wsu-gutenberg-accessibility-panel__section"},(0,e.createElement)("h3",{className:"wsu-gutenberg-accessibility-panel__section-heading"},(0,e.createElement)("span",{className:`dashicon dashicons dashicons-${t.icon}`})," ",t.label),(0,e.createElement)(u,{type:t.label,logs:t.logs,emptyMessage:`✅ 0 ${t.label.toLowerCase()} to display.`}))))),(0,e.createElement)(c,{className:"wsu-gutenberg-accessibility-panel__wave-link",href:"https://wave.webaim.org/report#/"+s},"Review on WAVE"))};const{PluginDocumentSettingPanel:g}=wp.editPost;var d=t=>(0,e.createElement)(g,{name:"wsu-accessibility",title:"Accessibility & Usability",className:"wsu-gutenberg-accessibility-panel"},(0,e.createElement)(m,t));const{useState:h,useEffect:p,useRef:b}=wp.element;n(251),wp.hooks.addFilter("wsu.Accessibility","wsuwp/accessibility-checker",((t,n)=>{const l=[],i=[];function s(t,n){return(0,e.createElement)(e.Fragment,null,lodash.isString(n)&&(0,e.createElement)("p",null,n),(0,e.createElement)("table",{className:"wsu-gutenberg-accessibility-panel__details-table"},(0,e.createElement)("thead",null,(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Link Text"),(0,e.createElement)("th",null,"Href"))),(0,e.createElement)("tbody",null,t.map(((t,n)=>(0,e.createElement)("tr",{key:"link-"+n},(0,e.createElement)("td",null,t.textContent||"(Not found. Possibly an image link)"),(0,e.createElement)("td",null,t.getAttribute("href"))))))))}if(Array.from(n.querySelectorAll("a")).forEach((e=>{const t=e.getAttribute("href"),n=e.getAttribute("target");null!==t&&""!==t.trim()&&"#"!==t.trim()&&"http://"!==t.trim()&&"https://"!==t.trim()||l.push(e),"_blank"===n&&i.push(e)})),l.length>0){const e=l.length>1?"s":"";t.errors.push({message:`${l.length} link${e} with missing or invalid href${e}`,detailsViewLabel:"Links with missing or invalid hrefs",detailsView:s.bind(void 0,l)})}if(i.length>0){const e=i.length>1?"s":"";t.alerts.push({message:`${i.length} link${e} set to open in a new tab`,detailsViewLabel:"Links set to open in a new tab",detailsView:s.bind(void 0,i,"Links opening in a new window causes accessibility, usability, and security problems. Consider removing open in a new window. Or adding additional information to the link that indicates the link opens into a new window.")})}return t})),wp.hooks.addFilter("wsu.Accessibility","wsuwp/accessibility-checker",((t,n)=>{const l=Array.from(n.querySelectorAll("a"));function i(t,n){return(0,e.createElement)(e.Fragment,null,lodash.isString(n)&&(0,e.createElement)("p",null,n),(0,e.createElement)("table",{className:"wsu-gutenberg-accessibility-panel__details-table"},(0,e.createElement)("thead",null,(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Link Text"),(0,e.createElement)("th",null,"Href"))),(0,e.createElement)("tbody",null,t.map(((t,n)=>(0,e.createElement)("tr",{key:"link-"+n},(0,e.createElement)("td",null,t.textContent||"(Not found. Possibly an image link)"),(0,e.createElement)("td",null,t.getAttribute("href"))))))))}return function(e,t){const n=t.filter((e=>{const t=e.textContent.trim().toLowerCase();return!(e.ariaLabel||!t.startsWith("http://")&&!t.startsWith("https://"))}));if(n.length>0){const t=n.length>1?"s":"";e.warnings.push({message:`${n.length} link${t} containing the URL protocol (http://, https://) in the link text`,detailsViewLabel:"Link text containing the URL protocol",detailsView:i.bind(this,n,"Link text should not contain the URL protocol (http://, https://). Link text without the URL protocol should be relatively short, such as the website's homepage. If you have a long URL consider using a text link instead of a URL.")})}}(t,l),function(e,t){const n=["click here","get more info","get more information","here","learn more","more here","more info","more","read more","see more info","see more information","see more","view more"],l=t.filter((e=>{const t=e.textContent.trim().toLowerCase();return!(e.ariaLabel||!n.includes(t))}));if(l.length>0){const t=l.length>1?"s":"";e.alerts.push({message:`${l.length} link${t} with generic text`,detailsViewLabel:"Links with generic text",detailsView:i.bind(this,l)})}}(t,l),function(e,t){const n=new RegExp(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/\S+$/),l=t.filter((e=>{if(e.ariaLabel)return!1;const t=e.textContent.trim().toLowerCase();return n.test(t)}));if(l.length>0){const t=l.length>1?"s":"";e.warnings.push({message:`${l.length} link${t} may contain a long URL in the link text`,detailsViewLabel:"Link text containing a long URL",detailsView:i.bind(this,l,"Link text containing a URL should be relatively short, such as the website's homepage without the URL protocol (http://, https://). If you have a long URL consider using a text link instead of a URL.")})}}(t,l),t})),wp.hooks.addFilter("wsu.Accessibility","wsuwp/accessibility-checker",((t,n)=>{const l=[],i=[],s=[];function a(t,n){return(0,e.createElement)("table",{className:"wsu-gutenberg-accessibility-panel__details-table"},(0,e.createElement)("thead",null,(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Preview"),(0,e.createElement)("th",null,"Filename"),n&&(0,e.createElement)("th",null,"Alt Text"))),(0,e.createElement)("tbody",null,t.map(((t,l)=>{const i=t.getAttribute("src")?.split("/").pop(),s=t.alt?.trim();return(0,e.createElement)("tr",{key:"image-"+l},(0,e.createElement)("td",null,(0,e.createElement)("img",{src:t.getAttribute("src")})),(0,e.createElement)("td",null,i),n&&(0,e.createElement)("td",null,s))}))))}if(Array.from(n.querySelectorAll("img")).forEach((e=>{const t=e.closest("a"),n=e.alt.trim();n||t?t&&-1!==t.tabIndex&&!n?i.push(e):t&&n&&s.push(e):l.push(e)})),l.length>0){const e=l.length>1?"s":"";t.warnings.push({message:`${l.length} image${e} missing alt text`,detailsViewLabel:"Images missing alt text",detailsView:a.bind(void 0,l,!1)})}if(i.length>0){const e=i.length>1?"s":"";t.errors.push({message:`${i.length} linked image${e} missing alt text`,detailsViewLabel:"Linked images missing alt text",detailsView:a.bind(void 0,i,!1)})}if(s.length>0){const e=s.length>1?"s":"";t.warnings.push({message:`${s.length} image${e} where alt text should be the destination`,detailsViewLabel:"Images where alt text should be the destination",detailsView:a.bind(void 0,s,!0)})}return t})),wp.hooks.addFilter("wsu.Accessibility","wsuwp/accessibility-checker",((t,n)=>{let l=null===n.querySelector("h1")?1:0;const i=Array.from(n.querySelectorAll("h1, h2, h3, h4, h5, h6"));let s=!1;const a=i.map((e=>{const t=parseInt(e.tagName[1]),n=!(t>l+1),i=s?"minus":n?"yes-alt":"dismiss";return l=t,s=!0===s||!n,{icon:i,tag:e.tagName,content:e.textContent}}));return s&&t.alerts.push({message:"Incorrect heading order",detailsViewLabel:"Incorrect heading order",detailsView:function(t){return(0,e.createElement)("table",{className:"wsu-gutenberg-accessibility-panel__details-table"},(0,e.createElement)("thead",null,(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Valid"),(0,e.createElement)("th",null,"Level"),(0,e.createElement)("th",null,"Content"))),(0,e.createElement)("tbody",null,t.map(((t,n)=>(0,e.createElement)("tr",{key:"heading-"+n},(0,e.createElement)("td",null,(0,e.createElement)("span",{className:`dashicon dashicons dashicons-${t.icon}`})),(0,e.createElement)("td",null,t.tag),(0,e.createElement)("td",null,t.content))))))}.bind(void 0,a)}),t})),wp.hooks.addFilter("wsu.Accessibility","wsuwp/accessibility-checker",((t,n)=>{const l=[];if(Array.from(n.querySelectorAll("p")).forEach((e=>{const t=e.textContent;if(""!==t.trim()&&(Array.from(e.querySelectorAll("strong, b")).forEach((t=>{(function(e,t){let n=t.parentNode;for(;n;){if(n===e)return!0;n=n.parentNode}return!1})(e,t)&&t.parentNode.removeChild(t)})),""===e.textContent.trim())){const e=t.length>75?"…":"";l.push(t.substring(0,75).trim()+e)}})),l.length>0){const n=l.length>1?"s":"",i=1===l.length?"s":"";t.warnings.push({message:`${l.length} paragraph${n} contain${i} only bold text`,detailsViewLabel:"Paragraphs with only bolded text",detailsView:function(t){return(0,e.createElement)("table",{className:"wsu-gutenberg-accessibility-panel__details-table"},(0,e.createElement)("thead",null,(0,e.createElement)("tr",null,(0,e.createElement)("th",null,"Paragraph Text"))),(0,e.createElement)("tbody",null,t.map(((t,n)=>(0,e.createElement)("tr",{key:"para-"+n},(0,e.createElement)("td",null,t))))))}.bind(void 0,l)})}return t}));const w=wp.plugins.registerPlugin,{applyFilters:E}=wp.hooks,{useSelect:y,useDispatch:f}=wp.data,k=()=>{const t={errors:[],alerts:[],warnings:[],data:{}},{editPost:n}=f("core/editor"),{editor:l,postId:i,editedPostContent:s,permalink:a,isSaving:r}=y((e=>{const t=e("core/editor");return{editor:t,postTitle:t.getEditedPostAttribute("title"),postId:t.getCurrentPostId(),editedPostContent:t.getEditedPostContent(),permalink:t.getPermalink(),isSaving:t.isSavingPost()||t.isAutosavingPost()}})),{html:o,isLoading:c,error:u}=function(e,t){const[n,l]=h({html:null,isLoading:!1,error:null}),i=b(null);return p((()=>{try{return l({html:null,isLoading:!0,error:null}),i.current?.abort(),"undefined"!=typeof AbortController&&(i.current=new AbortController),(async()=>{const n=await fetch(WSUWP_DATA.siteUrl+"/wp-json/wsu-gutenberg-accessibility/v1/parse-gutenberg-content",{method:"POST",body:new URLSearchParams({postId:e,content:t}),signal:i.current?.signal}),s=await n.json();n.ok?l({html:s.html,isLoading:!1,error:null}):l({html:null,isLoading:!1,error:`${s.code} | ${s.message} ${n.status} (${n.statusText})`})})(),()=>{i.current?.abort()}}catch(e){l({html:null,isLoading:!1,error:e.message})}}),[e,t]),n}(i,s);if(null!==o){const e=(new DOMParser).parseFromString(o,"text/html");E("wsu.Accessibility",t,e,l),setTimeout((()=>{n({meta:{wsuwp_accessibility_report:JSON.stringify(t)}})}),0)}return(0,e.createElement)(d,{report:t,isLoading:c,error:u,permalink:a})};w("wsu-plugin-accessibility",{render:()=>null!==wp.data.select("core/editor").getCurrentPostLastRevisionId()&&(0,e.createElement)(k,null),icon:""})}()}();