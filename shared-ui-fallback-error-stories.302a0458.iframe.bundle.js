"use strict";(self.webpackChunkitmoji_client=self.webpackChunkitmoji_client||[]).push([[247],{"./src/shared/ui/fallback/error.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,공용_예외_처리_클래스:()=>공용_예외_처리_클래스,기본_상태:()=>기본_상태});var _shared_api__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/api/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"대체 UI/에러 페이지",component:__webpack_require__("./src/shared/ui/fallback/error.tsx").B,parameters:{nextjs:{react:{rsc:!1},appDirectory:!0}}},기본_상태={},공용_예외_처리_클래스={args:{error:new _shared_api__WEBPACK_IMPORTED_MODULE_0__.WJ("예외 메시지가 여기에 표시돼요")}},__namedExportsOrder=["기본_상태","공용_예외_처리_클래스"];기본_상태.parameters={...기본_상태.parameters,docs:{...기본_상태.parameters?.docs,source:{originalSource:"{}",...기본_상태.parameters?.docs?.source}}},공용_예외_처리_클래스.parameters={...공용_예외_처리_클래스.parameters,docs:{...공용_예외_처리_클래스.parameters?.docs,source:{originalSource:"{\n  args: {\n    error: new Exception('예외 메시지가 여기에 표시돼요')\n  }\n}",...공용_예외_처리_클래스.parameters?.docs?.source}}}},"./src/shared/ui/fallback/error.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>FallbackError});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_Button_mantine_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Button/Button.mjs"),next_navigation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@storybook+nextjs@8.5.1_esbuild@0.24.2_next@15.1.6_@babel+core@7.26.0_babel-plugin-react-comp_tdcnqkufl43wy2cd2fexkzvl4a/node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.mjs"),_shared_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/api/index.ts"),_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/ui/icon.tsx"),_ui_factor__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/shared/ui/fallback/ui-factor.tsx");const FallbackError=({error,reset,withoutRefresh=!1,...props})=>{const{back,refresh}=(0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)(),comment=error&&_shared_api__WEBPACK_IMPORTED_MODULE_2__.WJ.extractMessage(error);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_factor__WEBPACK_IMPORTED_MODULE_4__.O,{iconQuery:"fluent-emoji:sad-but-relieved-face",comment:comment||"이용에 불편을 드려 죄송해요",description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[comment?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:["이용에 불편을 드려 죄송해요"," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br",{})]}):null,"다시 시도해도 동일한 증상이 지속적으로 나타나는 경우 ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br",{className:"hidden sm:block"}),"관리자에게 문의해 주세요."]}),...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p",{className:"mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-12",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Button_mantine_core__WEBPACK_IMPORTED_MODULE_5__.$,{variant:"default",color:"gray",title:"이전 페이지 이동",onClick:back,children:"뒤로가기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Button_mantine_core__WEBPACK_IMPORTED_MODULE_5__.$,{variant:"default",color:"gray",onClick:()=>{withoutRefresh||refresh(),null==reset||reset()},leftSection:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon__WEBPACK_IMPORTED_MODULE_3__.I,{query:"fluent:arrow-clockwise-32-regular"}),children:"다시시도"}),props.children]})})};FallbackError.__docgenInfo={description:"",methods:[],displayName:"FallbackError",props:{withoutRefresh:{defaultValue:{value:"false",computed:!1},required:!1}}}},"./src/shared/ui/fallback/ui-factor.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>FallbackUIFactor});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_Title_mantine_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Title/Title.mjs"),_icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/ui/icon.tsx"),_lib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/lib/index.ts");const FallbackUIFactor=({comment,description,iconQuery,className,children,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:(0,_lib__WEBPACK_IMPORTED_MODULE_2__.cn)("px-5 pb-16 pt-12",className),...props,children:[!!iconQuery&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"mx-auto mb-8 size-fit rounded-full border-solid border-gray-300 bg-gray-50 p-6 dark:border-dark-400 dark:bg-dark-600",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon__WEBPACK_IMPORTED_MODULE_1__.I,{query:iconQuery,className:"size-16 md:size-24"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Title_mantine_core__WEBPACK_IMPORTED_MODULE_3__.h,{order:2,className:"break-keep text-center text-xl md:text-2xl",children:comment}),!!description&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{className:"mt-4 break-keep text-center md:mt-6 md:text-lg",children:description}),children]});FallbackUIFactor.__docgenInfo={description:"",methods:[],displayName:"FallbackUIFactor"}},"./src/shared/ui/icon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>Icon});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),_iconify_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@iconify+react@5.2.0_react@19.0.0/node_modules/@iconify/react/dist/iconify.js"),_lib__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/lib/index.ts");const Icon=({query,width,height,className,style,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{className:(0,_lib__WEBPACK_IMPORTED_MODULE_2__.cn)("flex size-4 items-center justify-center",className),style:{...style,width,height},...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_iconify_react__WEBPACK_IMPORTED_MODULE_1__.In,{icon:query,className:"size-full",width:"1em",height:"1em"})});Icon.__docgenInfo={description:"",methods:[],displayName:"Icon"}}}]);