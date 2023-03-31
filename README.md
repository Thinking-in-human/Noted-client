<img width="400px" src="https://user-images.githubusercontent.com/110869913/229155539-6ab87d36-3d0b-4ac6-97dc-6acc25412230.jpg"/>
Noted는 PDF 불러오기부터 수정된 PDF를 저장하는 것까지 핵심 기능만을 제공하여 누구나 쉽게 PDF를 편집하고 메모를 남길 수 있는 PDF Editor 서비스 입니다. AWS S3 cloud 서비스를 이용하기 때문에,언제 어디서든 사용자가 작업한 PDF를 열어서 수정할 수 있습니다.

<br/>

## 𝌞 CONTENTS
  * [🎬 Preview](#-preview)
  * [📌 Introduction](#-introduction)
  * [🌍 Service Architecture](#-service-architecture)
  * [🌋 Challenges](#-challenges)
    * [Login](login)
    * [1)로그인 인증 관리를 어떻게 효율적으로 관리할 수 있을까?](로그인-인증-관리를-어떻게-효율적으로-관리할-수-있을까?)
    * [2)토큰이 탈취당할 위험에 대처하는 방법](토큰이-탈취당할-위험에-대처하는-방법)
    * [PDF](pdf)
    * [1) PDF를 어떻게 불러올까?](PDF를-어떻게-불러올까?)
    * [2) 불러온 PDF를 어떻게 화면에 보여줄 수 있을까?](불러온-PDF를-어떻게-화면에-보여줄-수-을까?)
    * [3) 어떻게 저장할까?](어떻게-저장할까?)
    * [Editor](editor)
    * [1) Canvas API를 통해서 undo/redo를 어떻게 구현할까?](Canvas-API를-통해서-undo/redo를-어떻게-구현할까?)
    * [2) 캔버스에 원하는 크기대로 지울 수 있는가?](캔버스에-원하는-크기대로-지울-수-있는가?)
    * [3) S3에 저장된 글꼴 파일을 텍스트에 어떻게 적용할 수 있을까?](S3에-저장된-글꼴-파일을-텍스트에-어떻게-적용할-수-있을까?)
    * [4) bold 적용하기](bold-적용하기)
  * [🌐 Tech Stacks](#-tech-stacks)
  * [🔗 Repository Link](#repository-link)
  * [👨‍💻 Member](#member)

<br/>

## 🎬 Preview

(시연 동영상)

<br/>

## 📌 Introduction

### Motivation

평소에 E-book을 읽을때마다 “나의 생각을 옆에 메모할 수 있으면 좋겠다.”라는 생각을 했습니다. 그렇게 시중에 제공되고 있는 서비스들을 찾아보니 태블릿 사용자를 위한 서비스는 많았으나 웹기반으로 된 PDF 에디터는 동시수정 등 다양한 기능들을 제공하는 대신, 유료인 것들이 많았습니다. 

따라서, 저희가 배운 MERN 스택을 이용하여 필기 및 간단한 텍스트 입력이 가능한 PDF 에디터를 구현해볼 수 있지 않을까? 라는 생각에 개발을 시작하게 되었습니다.

### Schedule
**프로젝트 기간 : 2023.03.06 ~ 2023.03.31 / 기획 10일 개발 15일**

<details>
<summary>1 주차 : 기획 및 설계</summary>
<div markdown="1">
- 아이디어 수집<br/>
- 기술 스택 선정<br/>
- Git 작업 플로우 결정<br/>
- 코드 컨벤션, 커밋 룰 등 팀 협업 규칙 정립<br/>
- Figma를 사용한 Mockup 제작<br/>
- MongoDb를 이용한 DB Schema 설계<br/>
- Notion을 이용한 칸반 작성<br/>
</div>
</details>

<details>
<summary>2주차 ~ 3주차 : 기능 개발</summary>
<div markdown="1">
- 백엔드 서버 구현<br/>
- AWS S3 세팅<br/>
- Firebase 구글 로그인 & JWT(access token, refresh token) 구현<br/>
- 프론트 엔드 기능 구현<br/>
- 리드미 작성<br/>
- 팀 프로젝트 발표 준비 및 발표<br/>
- 배포<br/>

</div>
</details>

<br/>

## 🌍 Service Architecture

<br/>

## 🌋 Challenges

개발을 진행하면서 많은 시행착오들이 있었지만, 그 중 제일 핵심적인 것들은 크게 3가지 였습니다. 

## 1. Login
### 1) 로그인 인증 관리를 어떻게 효율적으로 관리할 수 있을까?

저희는 Firebase Google 인증을 사용하여 Google 계정으로 로그인할 수 있도록 하였습니다. 그러다 사용자별 로컬 파일 데이터를 AWS의 S3 저장소에 생성해줘야하기 때문에 회원관리의 필요성을 느끼게 되었습니다. 그래서 Firebase Google 인증도 사용하고 서버에 부담이 되지 않는 JWT(JSON Web Token)를 생성하여 서버에서 사용자를 인증하는 동시에 안전하고 효율적인 인증 관리를 하도록 하였습니다.

 JWT는 인증에 필요한 정보들을 암호화시킨 JSON 토큰으로 서버에 따로 DB를 만들지 않고 클라이언트가 서버에 접속을 하면 서버에서 해당 클라이언트에게 인증되었다는 것을 확인하기 때문에 서버에 부담이 없습니다.

### 2) 토큰이 탈취당할 위험에 대처하는 방법

JWT는 토큰을 탈취 당하면 대처가 어렵기 때문에 위험성이 있어 그대로 사용하는 것이 아닌 Access Token, Refresh Token으로 이중으로 나누어 인증을 하는 방식을 사용하였습니다. JWT는 발급한 후 삭제가 불가능하기 때문에 접근에 관여하는 토큰에 유효시간을 부여하는 식으로 Accress Token은 1시간, Refresh Token은 2주로 설정해주었습니다.

저희은 access token과 refresh token을 쿠키에 담아 클라이언트에게 보내기 때문에 5가지 시나리오를 작성하여 구현하였습니다.

- 5가지 시나리오
  1) access token과 refresh token이 둘다 유효한 경우 → <OpenPef> 페이지로 이동
  2) access token이 만료되고 refresh token도 만료된 경우 → <Login> 페이지로 이동
  3) access token이 만료되고 refresh token은 만료되지 않은 경우 → 새 access token 발급한 후 <OpenPef> 페이지 이동
  4) access token이 만료되지 않은 경우 → <OpenPef> 페이지로 이동 <br/>
  (refresh token은 access token을 재발급해주기 위한 수단이기 때문에 access token만 유효하다면 메인 페이지로 넘어가도록 하였습니다.)
  5) 쿠키에 access token과 refresh token이 없는 경우 → <Login> 페이지로 이동
  <img width="700px" src="https://user-images.githubusercontent.com/110869913/229177945-d8f8e5c9-5a40-4c89-bc18-6976e98dfba6.png"/>

## 2. PDF

### 1) PDF를 어떻게 불러올까?

웹에디터라면 기본적으로 사용자의 Local 저장소에 있는 파일을 불러올 수 있어야한다고 생각했고, 인터넷이 되는 곳이라면 어디에서든 작업중이던 PDF를 불러올 수 있도록 하기 위하여 mongoDB에 PDF 파일을 저장하려고 하였습니다. 하지만, mongoDB에서 제공하는 document의 최대용량이 16MB로 PDF 파일 자체를 저장하기에는 한계가 있었습니다. 따라서, 아마존에서 제공하는 클라우드 기반 storage 서비스인 AWS S3(Simple Storage Service)에 PDF 파일을 저장하고 S3 URL을 mongoDB에 저장하기로 하였습니다. 하지만, schema 구조를 작성하다보니 이미 생성된 user_id와 document_id를 조합하여 S3 URL을 구성하였습니다.

- Local 저장소에 있는 PDF 업로드 하기
    
    PDF는 Portable Document Format의 약자로 다양한 운영 체제에서 일관되게 보여지고 인쇄할 수 있는 전자문서 형식입니다. 따라서, 서버에 요청을 보낼때, PDF 파일 자체가 전송되는 것이 아니라 HTTP request body에 담아 서버로 전송해야 했습니다. 그리고 HTTP request body 에 담아서 보내기 위해서는 FormData API를 사용해야 합니다. FormData API는 파일과 같은 바이너리 데이터와 Key-Value 쌍을 포함하는 양식 데이터를 쉽게 구성하고 전송할 수 있는 방법으로, append 메서드를 사용하여 사용자가 선택한 파일을 추가하여 서버로 전송하였습니다. 이때, PDF 파일을 보내는 것이기 때문에 HTTP Header에 들어가는 content-type은 multipart/form-data로 설정합니다. 그리고 최종적으로 withCredential을 ture로 설정하여 CORS 요청을 허용하고 인증된 회원임을 증명해야하기 때문에 쿠키값도 함께 전달할 수 있게 하였습니다. 
    
    <img width="700px" src="https://user-images.githubusercontent.com/110869913/229178753-52c17257-42a6-464a-98eb-68cb41e7088f.png"/>

    서버에서는 요청이 들어오면 MongdoDB에 PDF model을 생성하고, 이때 생성되는 document_ID 값과 user ID값을 기반으로 S3에 파일을 업로드 합니다.
    
    <img width="700px" src="https://user-images.githubusercontent.com/110869913/229178824-b9e71675-1f76-4c60-b09a-5077aba76f71.png"/>
    
    S3 업로드가 완료되면 해당 document_id를 User의 pdfDocuments 배열에 추가합니다. 그리고 PDF가 랜더링 되는 페이지로 이동합니다. 
    
- S3에 저장되어 있는 PDF 불러오기
    
    저희는 로그인한 사용자별로 작성한 PDF 문서들을 관리해야했기 때문에 DB에 저장되는 schema를 구성할 때, User에 대한 Model을 만들고 mongoose의 Model.populate라는 query를 사용하여 PDF Model을 참조하도록 하였습니다. 
    
    따라서, 사용자가 로그인하면 user_id 값으로 pdfDocument 배열을 순회하며 S3에 저장된 파일들의 리스트를 보여줍니다. 사용자가 파일의 제목을 클릭하면 PDF가 랜더링 되는 페이지로 이동합니다. 

    <img width="600px" src="https://user-images.githubusercontent.com/110869913/229180109-7afb4443-0df8-42db-a8c9-4f812a9fc21c.png"/>    

→ 왜 한번에 S3 url로 안불러오고 서버를 거쳤는가? 
클라이언트 -> 서버 -> S3 파일 가져오기 순서를 거치면 서버가 인증 프로세스를 처리하고 권한이 있는 사용자만 파일에 액세스할 수 있도록 할 수 있습니다.

또한,  많은 사용자가 파일에 액세스하거나 대용량 파일인 경우, S3에서 직접 파일을 가져오면 S3 버킷에 과부하가 걸리고 성능에 영향을 미칠 수 있습니다. 

### 2) 불러온 PDF를 어떻게 화면에 보여줄 수 있을까?

 초기에는 PDF 랜더링을 직접 구현하려고 하였으나, 2주라는 제한된 시간을 적절히 사용하는 것도 중요한 요소 중 하나이기 때문에 ‘에디터’라는 메인 기능에 집중하기 위하여 라이러리를 사용하기로 하였습니다. 

 PDF를 랜더링하는 라이브러리에는 대표적으로 PDF.js, react-PDF, PDFkit 등이 있는데 PDF.js는 HTML5, CSS3, JavaScript와 같은 웹 표준 기술만으로 PDF 파일을 렌더링하기 때문에 특정 플러그인이나 소프트웨어가 필요하지 않다는 장점이 있습니다. 

 그리고 React-PDF는 문서, 페이지, 텍스트와 같이 미리 빌드된 여러 컴포넌트를 제공하기 때문에 React 환경에서 PDF 파일을 쉽게 렌더링할 수 있고 가볍다는 장점이 있습니다. 하지만, React-PDF는 내부에서 PDF.js를 사용하여 PDF 파일을 렌더링하는 high level API이기 때문에, 저희가 직접 PDF.js를 사용해보는 취지로 PDF.js를 선택하게 되었습니다.

~~(React와 PDF.js를 기반으로 한 라이브러리로 이기 때문에 저희가 직접 PDF.js를 사용해보는 취지로 PDF.js를 선택하게 되었습니다.)~~

하지만 라이브러리를 사용하는 것 또한 내장 메서드들이 어떻게 동작하는지 파악하기 위해 API 문서와 github open source 코드들을 이해해야 했습니다.  

PDFjs의 공식문서를 보면 pdfjsLib에서 getDocument 메소드를 호출하여 PDF를 불러옵니다.

[PDFjs-example](https://mozilla.github.io/pdf.js/examples/)

```jsx
var loadingTask = pdfjsLib.getDocument('helloworld.pdf');
loadingTask.promise.then(function(pdf) {
  // you can now use *pdf* here
});
```

그리고 pdfjsLib 모듈에 들어가서 getDocument 메소드를 찾아봤더니, `{PDFDocumentLoadingTask}`을 반환합니다.

[PDF.js/pdfjsLib/getDocument](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js)

```jsx
/**
 * This is the main entry point for loading a PDF and interacting with it.
 *
 * NOTE: If a URL is used to fetch the PDF data a standard Fetch API call (or
 * XHR as fallback) is used, which means it must follow same origin rules,
 * e.g. no cross-domain requests without CORS.
 *
 * @param {string | URL | TypedArray | ArrayBuffer | DocumentInitParameters}
 *   src - Can be a URL where a PDF file is located, a typed array (Uint8Array)
 *         already populated with data, or a parameter object.
 * @returns {PDFDocumentLoadingTask}
 */
function getDocument(src) {
  if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
    if (typeof src === "string" || src instanceof URL) {
      src = { url: src };
    } else if (isArrayBuffer(src)) {
      src = { data: src };
    }
  }
```

그리고 반환값인 PDFDocumentLoadingTask에 대해 살펴보면, PDF문서로 resolve하는 promise 속성이 있기때문에 .promise를 붙여줘야 합니다.

[PDFDocumentLoadingTask](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDocumentLoadingTask.html)

### 3) 어떻게 저장할까?

 처음에는 puppeteer로 저장하는 방식을 생각했었다.  puppeteer를 활용하면 가상 브라우저를 통해 원하는 URL의 sanapshot을 찍어 pdf로 만들 수 있기 때문이다. 하지만 puppeteer로 우리 브라우저에 접근한다면 몇가지 문제가 있었다.

1. 우리 브라우저에 접근하기 위해서는 유저의 아이디와 비밀번호를 puppeteer에 넘겨주어야 했다. 우선, 우리는 구글 auth를 이용한 로그인 방식을 이용하고 있기에, 유저의 비밀번호를 취득할 수 없었다. 그렇다고 저장을 puppeteer가 접근 할 수 있는 별도의 로그인 로직을 만든다는건, 비효율적이며 저장 로직의 본질을 벗어난 것이라 생각했다.
2. 로그인에 성공한다 하더라도, 현재 유저가 작업한 상태는 puppeteer가 접근했을 때 반영되지 않는다. 현재 작업 영역의 상태를 반영시키기 위해서는, 현재 유저가 작업한 모든 내용을 puppeteer가 모두 똑같이 수행해야 하는 과정이 필요했다.
3. 모든 상태를 그린다 하더라도, 현재 페이지에 렌더링된 PDF의 각 요소(텍스트, 이미지, 링크 등)를 puppeteer는 구분하지 못할 것이었다. 왜냐하면, 우리가 페이지에 보여주고 있는 PDF는 `canvas API`로 작업을 하기 위해 `canvas` 태그로 렌더링 되어있었고, 원본 PDF의 요소(텍스트, 이미지, 링크 등)

```jsx
// 처음 구상했던 puppeteer를 활용한 PDF 저장 방식
const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("URL", { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

router.get("/save-pdf", async function (req, res, next) {
  printPDF().then((pdf) => {
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    console.log(pdf, "pdf");
    res.send(pdf);
  });
});
```

## 3. Editor

### 1) Canvas API를 통해서 undo/redo를 어떻게 구현할까? 

- **Canvas API 선택 이유?**

Canvas를 사용하는 이유는 JavaScript를 사용하여 웹 페이지에서 그래픽을 조작하고 그릴 수 있는 방법을 제공하기 때문입니다. pdf.js 라이브러리를 사용하여 PDF 파일을 구문 분석하고 이미지 데이터를 추출하게 되면 PDF 페이지를 이미지로 렌더링을 할 수 있습니다.

- **Canvas API 기본 원리**

PDF 페이지와 동일한 크기로 Canvas를 만들고 getContext('2d') 메서드를 사용하여 캔버스에 대한 2D 렌더링 컨텍스트를 가져옵니다. 그런 다음 page.render 메서드를 사용하여 PDF 페이지를 캔버스에 그립니다.

- **Stack 구조로 undo/redo 구현**

### 2) 캔버스에 원하는 크기대로 지울 수 있는가?

어찌어찌 하다가 잘 되지 않아 전체를 지우는 방법으로 구현하였다…

### 3) S3에 저장된 글꼴 파일을 텍스트에 어떻게 적용할 수 있을까?

저희는 S3에서 저장된 글꼴 파일을 받아와 텍스트에 적용하면 바로 적용이 되는 줄 알았습니다. 하지만 S3가 건네준 데이터는 스트림(데이터)을 읽을 수 있는 객체인 readableStream이였고 텍스트에 글꼴을 적용하기 위해서는 readableStream을 url로 변환해야했습니다.

찾아본 결과 Blob이라는 객체를 통해서  source(src)를 속성으로 가지는 모든 HTML 태그와 CSS 속성에서 사용 가능한 url로 변환할 수 있는 것을 확인하였습니다. Blob은 주로 텍스트, 이미지, 사운드, 비디오와 같은 대다수 용량이 큰 데이터를 객체 형태로 저장할 수 있는 객체입니다.

readableStream을 Blob 객체로 변환할 수 없어 arrayBuffer로 변환한 후에 Blob객체를 만들고 그 Blob객체를 url로 변환하였습니다. 이 url을 font-face에 src로 넣어주어 저희가 지정한 폰트명으로 해당 경로의 파일을 로드하여 글꼴을 적용하였습니다.

### 4) bold 적용하기


<br/>

## 🌐 Tech Stacks

### Client

`JavaScript, React, React-Redux Toolkit, styled-components, Firebase, PDF.js, pdf-lib`

### Server

`JavaScript, Node.js, Express.js, MongoDB & Mongoose, Amazon S3, JWT`

### Test

`Jest, Cypress`

### Deployment

`Netlify, AWS Elastic Beanstalk`


<br/>

## 🔗 Repository Link

### Deploy

(배포 후 링크 걸기)

- Noted

### Github Repositories

(깃헙 링크 걸기)

- FrontEnd Repo
- BackEnd Repo

<br/>

## 👨‍💻 Member

(이름에 깃헙 링크 걸기)

신휘재 : 

이지숙 : leejisook0718@gmail.com

장예진 : skyaiwn08@gmail.com

