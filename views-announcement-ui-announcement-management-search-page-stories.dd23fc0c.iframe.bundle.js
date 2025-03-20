"use strict";(self.webpackChunkitmoji_client=self.webpackChunkitmoji_client||[]).push([[935],{"./src/views/announcement/ui/announcement-management-search-page.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>announcement_management_search_page_stories,검색결과_없음:()=>검색결과_없음});var jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),announcement=__webpack_require__("./src/entities/announcement/index.ts"),config=__webpack_require__("./src/shared/config/index.ts"),announcement_list=__webpack_require__("./src/widgets/announcement-list/index.ts"),api=__webpack_require__("./src/shared/api/index.ts"),lib=__webpack_require__("./src/shared/lib/index.ts"),ui=__webpack_require__("./src/shared/ui/index.ts");const AnnouncementManagementSearchPage=async({searchPost,defaultQuery,defaultType})=>{const{data}=await searchPost(),isEmpty=data.content.length<1,href=(0,lib.Tb)({params:[[announcement.Cx.Enum.query,defaultQuery],[announcement.Cx.Enum.type,defaultType],[announcement.Cx.Enum.page,data.number,api._U],[announcement.Cx.Enum.size,data.size,api.yQ]],pathname:config.b.ADMIN.ANNOUNCEMENT.SEARCH()});return(0,jsx_runtime.jsxs)(ui.Ls,{children:[(0,jsx_runtime.jsxs)(ui.iL,{children:[(0,jsx_runtime.jsx)(ui.In,{query:"fluent-emoji:magnifying-glass-tilted-left",className:"mr-2 size-5"}),"공지사항 검색"]}),(0,jsx_runtime.jsx)("div",{className:"mb-6 flex items-center justify-end",children:(0,jsx_runtime.jsx)(announcement_list.DO,{defaultQuery,defaultType})}),(0,jsx_runtime.jsx)("div",{className:"overflow-x-auto pb-3",children:(0,jsx_runtime.jsx)(announcement_list.yJ,{className:"min-w-[48rem]",children:(0,jsx_runtime.jsx)(ui.Di,{render:isEmpty,component:(0,jsx_runtime.jsx)(announcement_list.wC,{comment:"검색 결과가 없어요 ㅠ"}),children:(0,jsx_runtime.jsx)(announcement_list._9,{contents:data.content})})})}),!isEmpty&&(0,jsx_runtime.jsxs)("div",{className:"mt-2 flex flex-col items-center justify-center md:flex-row md:justify-between",children:[(0,jsx_runtime.jsxs)("p",{className:"mb-2 px-1 py-2 text-sm md:mb-0",children:["총 ",data.totalElements,"개의 검색결과가 있어요"]}),(0,jsx_runtime.jsx)(announcement_list.KD,{page:data.number,total:data.totalPages,baseURL:href([announcement.Cx.Enum.page])})]})]})};AnnouncementManagementSearchPage.__docgenInfo={description:"",methods:[],displayName:"AnnouncementManagementSearchPage"};const announcement_management_search_page_stories={title:"관리자 페이지/공지사항 관리/검색",component:AnnouncementManagementSearchPage,parameters:{nextjs:{appDirectory:!0,router:{basePath:config.b.ADMIN.ANNOUNCEMENT.SEARCH()}}}},검색결과_없음={render:args=>(0,jsx_runtime.jsx)(AnnouncementManagementSearchPage,{...args}),args:{searchPost:()=>(0,announcement.QK)({})}},__namedExportsOrder=["검색결과_없음"];검색결과_없음.parameters={...검색결과_없음.parameters,docs:{...검색결과_없음.parameters?.docs,source:{originalSource:"{\n  render: args => <AnnouncementManagementSearchPage {...args} />,\n  args: {\n    searchPost: () => searchPostEmptyMock({})\n  }\n}",...검색결과_없음.parameters?.docs?.source}}}},"./src/widgets/announcement-list/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_9:()=>AnnouncementList,yJ:()=>AnnouncementTable,rl:()=>CategoryTabs,wC:()=>EmptyList,KD:()=>PageController,DO:()=>SearchInput});var jsx_runtime=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/jsx-runtime.js"),Table=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Table/Table.mjs"),Badge=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Badge/Badge.mjs"),Button=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Button/Button.mjs"),announcement=__webpack_require__("./src/entities/announcement/index.ts"),config=__webpack_require__("./src/shared/config/index.ts"),lib=__webpack_require__("./src/shared/lib/index.ts"),ui=__webpack_require__("./src/shared/ui/index.ts"),Text=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Text/Text.mjs"),Loader=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Loader/Loader.mjs"),events=__webpack_require__("./node_modules/.pnpm/@mantine+modals@7.16.3_@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@_nnwu5lb4sjitw35ixq6q3ifdkq/node_modules/@mantine/modals/esm/events.mjs"),react=__webpack_require__("./node_modules/.pnpm/next@15.1.6_@babel+core@7.26.0_babel-plugin-react-compiler@19.0.0-beta-decd7b8-20250118_react_l43wdczbubi7wfmk54u7tu3xru/node_modules/next/dist/compiled/react/index.js"),dist=__webpack_require__("./node_modules/.pnpm/react-hot-toast@2.5.1_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/react-hot-toast/dist/index.mjs");const DeleteButton=({id,fetcher=announcement.ys,revalidate=announcement.Xq,onStart,onSuccess=dist.Ay.success,onFailed=dist.Ay.error,...props})=>{const[isPending,setIsPending]=(0,react.useState)(!1),onConfirm=async()=>{setIsPending(!0),null==onStart||onStart(),await fetcher(id).then((()=>revalidate(id))).then((()=>{onSuccess("공지사항 삭제에 성공했어요")})).catch((()=>{setIsPending(!1),onFailed("공지사항 삭제에 실패했어요")}))};return(0,jsx_runtime.jsx)(Button.$,{onClick:()=>events.jQ.openConfirmModal({title:(0,jsx_runtime.jsx)("span",{className:"font-bold",children:"공지사항 삭제"}),children:(0,jsx_runtime.jsxs)(Text.E,{size:"sm",children:["정말 삭제하시겠어요? ",(0,jsx_runtime.jsx)("br",{}),"삭제하면 다시는 복구할 수 없어요"]}),labels:{confirm:"삭제",cancel:isPending?"닫기":"취소"},radius:"md",confirmProps:{color:"red"},groupProps:{gap:8,mt:"md"},onConfirm}),color:"red",variant:"light",disabled:isPending,...props,children:isPending?(0,jsx_runtime.jsx)(Loader.a,{size:"xs",color:"gray"}):"삭제"})};DeleteButton.__docgenInfo={description:"",methods:[],displayName:"DeleteButton",props:{fetcher:{defaultValue:{value:"(id: number) =>\nserver.request(POST_ENDPOINT.DETAIL(id), {\n  schema: z.any(),\n  method: 'DELETE',\n})",computed:!1},required:!1},revalidate:{defaultValue:{value:"async (id: number) =>\n[POST_TAG.LIST, POST_TAG.PINNED_LIST, POST_TAG.SEARCH, POST_TAG.DETAIL(id)].forEach(revalidateTag)",computed:!1},required:!1},onSuccess:{defaultValue:{value:"toast.success",computed:!0},required:!1},onFailed:{defaultValue:{value:"toast.error",computed:!0},required:!1}}};const AnnouncementItem=({id,title,createdAt,viewCount,postCategory,pinned:isPinned=!1})=>(0,jsx_runtime.jsxs)(Table.X.Tr,{className:(0,lib.cn)(isPinned&&"bg-gray-50 dark:bg-dark-700"),children:[(0,jsx_runtime.jsx)(Table.X.Td,{className:"text-center",children:(0,jsx_runtime.jsx)(Badge.E,{variant:"light",color:isPinned?"gray":"blue",children:announcement.jH[postCategory]})}),(0,jsx_runtime.jsx)(Table.X.Td,{children:(0,jsx_runtime.jsxs)(ui.qv,{href:config.b.ADMIN.ANNOUNCEMENT.DETAIL(id),title:`페이지 이동: ${title}`,className:"hover:underline",children:[isPinned?(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"📌   "}):null,title]})}),(0,jsx_runtime.jsx)(Table.X.Td,{className:"text-center",children:(0,lib.i1)(createdAt)}),(0,jsx_runtime.jsx)(Table.X.Td,{className:"text-center",children:viewCount}),(0,jsx_runtime.jsx)(Table.X.Td,{className:"text-center",children:(0,jsx_runtime.jsx)(Button.$,{href:config.b.ADMIN.ANNOUNCEMENT.MODIFY(id),title:`수정하러 가기: ${title}`,component:ui.qv,size:"xs",variant:"light",color:"gray",children:"수정"})}),(0,jsx_runtime.jsx)(Table.X.Td,{className:"text-center",children:(0,jsx_runtime.jsx)(DeleteButton,{id,size:"xs",variant:"light"})})]});AnnouncementItem.__docgenInfo={description:"",methods:[],displayName:"AnnouncementItem",props:{pinned:{defaultValue:{value:"false",computed:!1},required:!1}}};const AnnouncementList=({contents,pinned})=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:contents.map((props=>(0,jsx_runtime.jsx)(AnnouncementItem,{...props,pinned},props.id)))});AnnouncementList.__docgenInfo={description:"",methods:[],displayName:"AnnouncementList"};const AnnouncementTable=({className,children})=>(0,jsx_runtime.jsxs)(Table.X,{className:(0,lib.cn)("relative",className),children:[(0,jsx_runtime.jsx)("caption",{className:"sr-only",children:"카테고리, 제목, 날짜, 조회수로 구성된 ITMOJI 공지사항에 대한 표에요"}),(0,jsx_runtime.jsxs)("colgroup",{children:[(0,jsx_runtime.jsx)("col",{}),(0,jsx_runtime.jsx)("col",{width:"54%"}),(0,jsx_runtime.jsx)("col",{}),(0,jsx_runtime.jsx)("col",{}),(0,jsx_runtime.jsx)("col",{}),(0,jsx_runtime.jsx)("col",{})]}),(0,jsx_runtime.jsx)(Table.X.Thead,{children:(0,jsx_runtime.jsxs)(Table.X.Tr,{children:[(0,jsx_runtime.jsx)(Table.X.Th,{className:"text-center",children:"카테고리"}),(0,jsx_runtime.jsx)(Table.X.Th,{children:"제목"}),(0,jsx_runtime.jsx)(Table.X.Th,{className:"text-center",children:"날짜"}),(0,jsx_runtime.jsx)(Table.X.Th,{className:"text-center",children:"조회수"}),(0,jsx_runtime.jsx)(Table.X.Th,{className:"text-center",children:"수정"}),(0,jsx_runtime.jsx)(Table.X.Th,{className:"text-center",children:"삭제"})]})}),(0,jsx_runtime.jsx)(Table.X.Tbody,{children})]});AnnouncementTable.__docgenInfo={description:"",methods:[],displayName:"AnnouncementTable"};var Pagination=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Pagination/Pagination.mjs"),Group=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Group/Group.mjs");const PageController=({page,total,baseURL})=>{const href=(0,lib.Pm)(baseURL),handleClick=e=>{e.currentTarget.dataset.disabled&&e.preventDefault()};return(0,jsx_runtime.jsx)(Pagination.d.Root,{value:page,total,getItemProps:page=>({component:ui.qv,href:href([announcement.my.Enum.page,page]),onClick:handleClick}),children:(0,jsx_runtime.jsxs)(Group.Y,{gap:8,children:[(0,jsx_runtime.jsx)(Pagination.d.First,{component:ui.qv,href:baseURL,onClick:handleClick}),(0,jsx_runtime.jsx)(Pagination.d.Previous,{component:ui.qv,href:href([announcement.my.Enum.page,page-1]),onClick:handleClick}),(0,jsx_runtime.jsx)(Pagination.d.Items,{}),(0,jsx_runtime.jsx)(Pagination.d.Next,{component:ui.qv,href:href([announcement.my.Enum.page,page+1]),onClick:handleClick}),(0,jsx_runtime.jsx)(Pagination.d.Last,{component:ui.qv,href:href([announcement.my.Enum.page,total]),onClick:handleClick})]})})};PageController.__docgenInfo={description:"",methods:[],displayName:"PageController"};var Tabs=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Tabs/Tabs.mjs"),FloatingIndicator=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/FloatingIndicator/FloatingIndicator.mjs");const CategoryTabs=({baseURL,current})=>{const all="ALL",selected=null!=current?current:all,[rootRef,setRootRef]=(0,react.useState)(null),[controlsRefs,setControlsRefs]=(0,react.useState)({}),{push}=(0,lib.rd)();return(0,jsx_runtime.jsx)(Tabs.t,{variant:"none",value:selected,onChange:category=>(category=>{push(category===all?baseURL:(0,lib.Pm)(baseURL)([announcement.my.Enum.category,category]))})(category),children:(0,jsx_runtime.jsxs)(Tabs.t.List,{ref:setRootRef,className:"relative",children:[[all,...announcement.m8.options].map((category=>{return(0,jsx_runtime.jsx)(Tabs.t.Tab,{value:category,ref:(val=category,node=>setControlsRefs((prev=>Object.assign(prev,{[val]:node})))),className:"z-[1] font-medium text-gray-700 transition-colors data-[active]:text-black dark:text-gray-100 dark:data-[active]:text-white",children:category===all?"전체":announcement.jH[category]},category);var val})),(0,jsx_runtime.jsx)(FloatingIndicator.g,{target:controlsRefs[selected],parent:rootRef,className:"rounded-md border border-solid border-gray-200 bg-white shadow-sm dark:border-dark-400 dark:bg-dark-600"})]})})};CategoryTabs.__docgenInfo={description:"",methods:[],displayName:"CategoryTabs",props:{baseURL:{required:!0,tsType:{name:"string"},description:""},current:{required:!0,tsType:{name:"union",raw:"PostCategory | null",elements:[{name:"z.infer",elements:[{name:"PostCategorySchema"}],raw:"z.infer<typeof PostCategorySchema>"},{name:"null"}]},description:""}}};const EmptyList=({comment})=>(0,jsx_runtime.jsx)("tr",{children:(0,jsx_runtime.jsx)("td",{colSpan:6,children:(0,jsx_runtime.jsxs)("div",{className:"flex flex-col items-center justify-center space-y-6 px-5 py-24",children:[(0,jsx_runtime.jsx)("div",{className:"flex items-center justify-center rounded-full border border-solid border-gray-300 bg-gray-50 p-8 dark:border-dark-400 dark:bg-dark-700",children:(0,jsx_runtime.jsx)(ui.In,{query:"fluent-emoji:zany-face",className:"size-16"})}),(0,jsx_runtime.jsx)("p",{className:"break-keep text-center text-sm md:text-base",children:comment||"공지사항이 없어요 ㅠ"})]})})});EmptyList.__docgenInfo={description:"",methods:[],displayName:"EmptyList"};var Select=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/Select/Select.mjs"),TextInput=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/TextInput/TextInput.mjs"),ActionIcon=__webpack_require__("./node_modules/.pnpm/@mantine+core@7.16.1_@mantine+hooks@7.16.1_react@19.0.0__@types+react@19.0.8_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs"),use_input_state=__webpack_require__("./node_modules/.pnpm/@mantine+hooks@7.16.1_react@19.0.0/node_modules/@mantine/hooks/esm/use-input-state/use-input-state.mjs"),navigation=__webpack_require__("./node_modules/.pnpm/@storybook+nextjs@8.5.1_esbuild@0.24.2_next@15.1.6_@babel+core@7.26.0_babel-plugin-react-comp_tdcnqkufl43wy2cd2fexkzvl4a/node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.mjs");const SearchInput=({defaultQuery="",defaultType=announcement.qY.Enum.TITLE})=>{const[query,setQuery]=(0,use_input_state.D)(defaultQuery),[type,setType]=(0,react.useState)(defaultType),{push,back}=(0,lib.rd)(),pathname=(0,navigation.usePathname)(),handleSubmit=()=>{push((0,lib.Pm)(config.b.ADMIN.ANNOUNCEMENT.SEARCH())([announcement.Cx.Enum.query,query],[announcement.Cx.Enum.type,type]))};return(0,react.useEffect)((()=>{query||pathname!==config.b.ADMIN.ANNOUNCEMENT.SEARCH()||back()}),[query,pathname,back]),(0,jsx_runtime.jsxs)("div",{className:"w-full max-w-md items-center space-y-2 sm:flex sm:space-x-2 sm:space-y-0",children:[(0,jsx_runtime.jsx)(Select.l,{className:"w-32 min-w-32",data:announcement.qY.options.map((type=>({value:type,label:announcement.$e[type]}))),defaultValue:defaultType,onChange:value=>setType(value),value:type,allowDeselect:!1,checkIconPosition:"right"}),(0,jsx_runtime.jsx)(TextInput.k,{type:"search",className:"w-full",value:query,onChange:setQuery,onKeyDown:e=>{"Enter"===e.key&&handleSubmit()},placeholder:"검색어를 입력해주세요",rightSection:(0,jsx_runtime.jsx)(ActionIcon.M,{variant:"subtle",color:"gray",onClick:handleSubmit,children:(0,jsx_runtime.jsx)(ui.In,{query:"fluent:search-32-regular"})})})]})};SearchInput.__docgenInfo={description:"",methods:[],displayName:"SearchInput",props:{defaultQuery:{defaultValue:{value:"''",computed:!1},required:!1},defaultType:{defaultValue:{value:"SearchPostTypeSchema.Enum.TITLE",computed:!0},required:!1}}}}}]);