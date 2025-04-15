# 🧑🏻‍💻 IT-MOJI (잇모지) 프론트엔드 레포지토리

![잇모지 인트로](/public/images/open-graph.jpg)

<br />

> **목차**
>
> 1. [🚀 프로젝트 소개](#-프로젝트-소개)
>    - [주요 기능](#주요-기능)
>    - [모각코 운영진 대상 사용법 안내 영상](#모각코-운영진-대상-사용법-안내-영상)
> 2. [📚 사용 기술](#-사용-기술)
> 3. [✅ 컨벤션 가이드](#-컨벤션-가이드)
>    - [코드 컨벤션](#코드-컨벤션)
>    - [커밋 메시지 컨벤션](#커밋-메시지-컨벤션)
>    - [깃 브랜치 전략](#깃-브랜치-전략)
> 4. [⚒️ 개발 환경](#️-개발-환경)
>    - [요구 환경](#요구-환경)
>    - [환경 변수](#환경-변수)
>    - [실행 가이드](#실행-가이드)
> 5. [🔗 참조 문서](#-참조-문서)
> 6. [🎖️ Contributors](#️-contributors)

<br />
<br />

## 🚀 프로젝트 소개

IT-MOJI는 **IT인들끼리 모여 지식을 나누는 모임**이라는 뜻으로 24년 02월 부터 시작된 [모각코 스터디](https://github.com/Dev-Explorers/mogakko-2024) 커뮤니티를 편하게 운영하기 위해 시작된 프로젝트에요. 현재는 MVP인 `출석 관리 - 디스코드 TIL 텍스트 파싱` 기능까지 구현되어 있지만, 추후 `스터디원 모집 관리`, `스터디원 출석 집계 및 통계 관리` 등 다양한 기능이 추가될 예정이에요.

<br />

### 주요 기능

- 스터디원 출석 관리 기능
  - 디스코드 TIL 텍스트 파싱 기능
  - 출석 옵션 및 배지 관리 기능
- 공지사항 관리 기능

<br />

> **출시 예정 기능**
>
> - 스터디원 출석 관리 기능
>   - 출석 집계 및 통계 관리 기능
> - 스터디원 모집 관리 기능
>   - 모집 공고 관리 기능
> - 스터디원 등급 관리 기능
>   - 보상 및 휴가 관리 기능
> - 스터디 소개글 관리 기능 (CMS)
> - 스터디 행사 관리 기능

<br />

### 모각코 운영진 대상 사용법 안내 영상

#### 디스코드 TIL 텍스트 파싱 기능 사용법 안내 영상 (소리 O)

<video src="https://github.com/user-attachments/assets/d2c163ac-4513-4572-ab22-5b6fa321e42d"></video>

<br />

## 📚 사용 기술

- 프레임워크: `Next.js`, `React`, `React Compiler (Beta)`
- 언어: `TypeScript`
- 서버 상태관리: `Tanstack Query`
- 클라이언트 상태관리: `Zustand`
- 폼 상태관리: `Mantine Form`
- 스키마 유효성 검사: `Zod`
- 스타일 프레임워크: `TailWindCSS`, `Mantine`, `Motion`, `Iconify React`
- 테스트: `StoryBook`, `Vitest`, `MSW`
- 패키지 매니저: `pnpm`
- 서비스 배포: `AWS Amplify`
- 스토리북 배포: `GitHub Pages`, `GitHub Actions`

<br />

## ✅ 컨벤션 가이드

### 코드 컨벤션

> 추후 위키에 추가될 예정이에요.

<br />

### 커밋 메시지 컨벤션

> 커밋 메시지 컨벤션은 기본적으로 `Husky`와 `commitlint`를 통해 관리돼요.

<br />

**커밋 메시지 형식**

```text
[유형]: 제목

본문
```

<br />

**커밋 메시지 유형**

| 커밋 유형  | 의미                                                     |
| :--------- | :------------------------------------------------------- |
| `feat`     | 새로운 기능의 추가                                       |
| `fix`      | 버그 수정                                                |
| `docs`     | 문서 수정                                                |
| `style`    | 코드 포맷팅, 세미 콜론 등 코드 자체의 변경이 없는 경우   |
| `refactor` | 코드 리팩토링                                            |
| `test`     | 테스트 코드, 리팩토링 테스트 코드의 추가                 |
| `chore`    | 패키지 매니저 수정 또는 그 외 기타 수정 ex) .gitignore   |
| `design`   | CSS 등 사용자 UI 디자인 변경                             |
| `comment`  | 필요한 주석의 추가 및 변경                               |
| `rename`   | 파일 또는 폴더 명을 수정하거나 옮기는 작업만 수행한 경우 |
| `remove`   | 파일을 삭제하는 작업만 수행한 경우                       |
| `hotfix`   | 급하게 치명적인 버그를 고쳐야 하는 경우                  |

<br />

**상세 컨벤션**

1. 제목과 본문을 빈행으로 분리
   - 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
   - 제목 끝에는 마침표(.) 금지
   - 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)
   - 본문에 여러가지 항목이 있다면 글머리 기호(-)를 통해 가독성 높이기
2. 한 커밋에는 한 가지 문제만 담기
   - 추적 가능하게 유지해주기 (너무 많은 문제를 한 커밋에 담으면 추적하기 어려움)

<br />

### 깃 브랜치 전략

```bash
├── main
    ├── hotfix
    └── dev
        ├── feature/*
        └── refactor/*
```

<br />

| 브랜치명     | 용도                                                            |
| :----------- | :-------------------------------------------------------------- |
| `main`       | 서비스 출시 브랜치에요                                          |
| `hotfix`     | 출시된 버전에서 발생한 치명적인 버그를 급히 수정하는 브랜치에요 |
| `dev`        | 서비스 출시 전 개발 및 테스트를 수행하는 브랜치에요             |
| `feature/*`  | 새로운 기능의 개발 및 테스트를 수행하는 브랜치에요              |
| `refactor/*` | 개발된 기능을 리팩터링하는 브랜치에요                           |

<br />

> 브랜치 명에 와일드 카드(\*)로 표시된 이름의 경우 대시(케밥) 케이스를 적용해요. ex) `feature/attendance-badge`

<br />

## ⚒️ 개발 환경

### 요구 환경

- [node.js @^20](https://nodejs.org/ko)
- [pnpm @9.1.0](https://pnpm.io/ko/)

<br />

### 환경 변수

환경 변수는 프로젝트 루트 주소 하위의 `.env.local` 파일에 입력해 주세요.

- `MOCK_ENABLED`: MSW 사용 여부를 나타내요. 값이 `true`인지만 판단해요.
- `NEXT_PUBLIC_DOMAIN_ADDRESS`: Next.js 서버 실행 주소에요.
- `NEXT_PUBLIC_SERVER_DOMAIN_ADDRESS`: 백엔드 API 서버 실행 주소에요. MSW가 실행 중이라면 아무 주소나 입력해도 돼요.
- `STORYBOOK_DOMAIN_ADDRESS`: 스토리북 문서 주소에요. 리다이렉트에 사용되며, 필수 값은 아니에요.
- `SWAGGER_DOMAIN_ADDRESS`: 스웨거 문서 주소에요. 리다이렉트에 사용되며, 필수 값은 아니에요.

```bash
# 환경 변수 예시

MOCK_ENABLED=true

NEXT_PUBLIC_DOMAIN_ADDRESS=http://localhost:3000
NEXT_PUBLIC_SERVER_DOMAIN_ADDRESS=http://localhost:5000

STORYBOOK_DOMAIN_ADDRESS=http://localhost:6006
SWAGGER_DOMAIN_ADDRESS=http://localhost:8080
```

<br />

### 실행 가이드

**1. 프로젝트 가져오기**

```bash
git clone https://github.com/it-moji/it-moji-client.git ./
```

**2. 의존성 설치하기**

```bash
pnpm install
```

**3. 개발 서버 실행하기**

```bash
pnpm dev:service
```

<br />

## 🔗 참조 문서

- [스토리북](https://it-moji.github.io/it-moji-client)
- [API 명세서 (스웨거)](https://api.it-moji.com/swagger)

<br />

## 🎖️ Contributors

<table>
  <tr>
    <th>
      <a href="https://github.com/LC-02s">@LC-02s</a> <code>Lead</code>
    </th>
    <th>
      <a href="https://github.com/ChaeYubin">@ChaeYubin</a>
    </th>
  </tr>
  <tr>
    <td>
      <img src="https://avatars.githubusercontent.com/u/110769195?v=4" alt="@LC-02s 프로필" width="120px" height="120px" />
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/63189595?v=4" alt="@ChaeYubin 프로필" width="120px" height="120px" />
    </td>
  </tr>
</table>

<br />

> [!IMPORTANT]
>
> IT-MOJI는 현재 외부인의 기여를 받지 않고 있어요.
>
> 제안해 주실 내용이 있다면, [이슈](https://github.com/it-moji/it-moji-client/issues)를 등록해 주시거나, [chanlee1007@naver.com](mailto:chanlee1007@naver.com)으로 연락 부탁드릴게요.

<br />
