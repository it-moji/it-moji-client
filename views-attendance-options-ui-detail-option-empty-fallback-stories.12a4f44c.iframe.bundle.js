"use strict";(self.webpackChunkitmoji_client=self.webpackChunkitmoji_client||[]).push([[590],{"./src/views/attendance-options/ui/detail-option-empty-fallback.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,기본_상태:()=>기본_상태});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),_detail_option_fallback_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/views/attendance-options/ui/detail-option-fallback-ui.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"관리자 페이지/출석 관리/출석 옵션 설정/상세 옵션 대체 UI - 빈값",component:_detail_option_fallback_ui__WEBPACK_IMPORTED_MODULE_1__.WO,parameters:{nextjs:{appDirectory:!0}}},기본_상태={render:arg=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"my-4 flex min-h-64 border-x-0 border-y border-solid border-gray-300 py-3 dark:border-dark-400",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_detail_option_fallback_ui__WEBPACK_IMPORTED_MODULE_1__.WO,{...arg})})},__namedExportsOrder=["기본_상태"];기본_상태.parameters={...기본_상태.parameters,docs:{...기본_상태.parameters?.docs,source:{originalSource:'{\n  render: arg => <div className="my-4 flex min-h-64 border-x-0 border-y border-solid border-gray-300 py-3 dark:border-dark-400">\n      <DetailOptionListEmptyFallback {...arg} />\n    </div>\n}',...기본_상태.parameters?.docs?.source}}}},"./src/views/attendance-options/ui/detail-option-fallback-ui.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{PW:()=>DetailOptionListErrorFallback,WO:()=>DetailOptionListEmptyFallback});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_Button_mantine_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Button/Button.mjs"),_shared_lib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/lib/index.ts"),_shared_ui__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/ui/index.ts");const DetailOptionListFallbackUI=({query,comment,children,className})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:(0,_shared_lib__WEBPACK_IMPORTED_MODULE_1__.cn)("flex w-full flex-col items-center justify-center pb-4",className),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_2__.In,{query,className:"size-7 text-gray-600 dark:text-dark-300"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{className:"mt-3 break-keep font-medium text-gray-600 dark:text-dark-300",children:comment}),children]}),DetailOptionListErrorFallback=({onReset})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailOptionListFallbackUI,{query:"fluent:warning-28-regular",comment:"상세 옵션 조회에 실패했어요",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Button_mantine_core__WEBPACK_IMPORTED_MODULE_3__.$,{variant:"default",size:"compact-md",className:"mx-auto mt-7",leftSection:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_2__.In,{query:"fluent:arrow-clockwise-16-regular"}),onClick:onReset,children:"재시도"})}),DetailOptionListEmptyFallback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailOptionListFallbackUI,{query:"fluent-emoji:thinking-face",comment:"상세 옵션이 없어요"});DetailOptionListFallbackUI.__docgenInfo={description:"",methods:[],displayName:"DetailOptionListFallbackUI"},DetailOptionListErrorFallback.__docgenInfo={description:"",methods:[],displayName:"DetailOptionListErrorFallback"},DetailOptionListEmptyFallback.__docgenInfo={description:"",methods:[],displayName:"DetailOptionListEmptyFallback"}}}]);