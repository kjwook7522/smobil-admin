# SS-Mobility 재고관리 앱

![Lines of code](https://img.shields.io/tokei/lines/github/kjwook7522/smobil-admin)
<img src="https://img.shields.io/badge/language-javascript-yellow" />
<br />

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/kjwook7522/smobil-admin/react)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/kjwook7522/smobil-admin/redux)


SS-mobility 회사 내부 창고와 기사님들의 재고를 관리하기 위한 웹 앱입니다. 주요기능으로는 구글 로그인으로 허용된 사용자만 접근이 가능하며, 접근가능한 사용자들은 개인의 트렁크 공간을 가지게 됩니다. 트렁크를 통해서 창고에 있는 재고를 옮기며 재고관리를 할 수 있습니다.

###### (이 프로젝트는 ss-mobility의 외주를 받아 제작하게 되었습니다.)

## 🛠  개발 스택
* HTML5
* CSS3
* Javascript
* React (16.13.1)
* Redux


## 🔌 외부 API 활용
* Google Auth (구글 로그인)
* Google Spread Sheet (구글 엑셀)


## 🗂  디렉토리 구조
```
.
├── public
└── src
    ├── actions
    ├── reducers
    ├── common
    ├── pages
    |   ├── page components
    |       └── components
    |   ...
    |
    ├── store.js
    ├── App.js
    └── index.js
```


## 📕 사용법

#### 로그인 및 접속
ss-mobility는 기사님들의 간편한 로그인과 Google Sheets를 활용한 재고관리를 위해 Google OAuth를 이용한 소셜로그인만 지원하고 있습니다. 구글 로그인을 통해 개인정보의 추가 입력없이 서비스를 이용할 수 있습니다.

<img width="100%" alt="main-login" src="https://user-images.githubusercontent.com/29251371/115712425-b539cb00-a3af-11eb-96ac-6a619d3c7141.png">


#### 메인화면
메인 화면에서는 기사님의 이름을 확인 할 수 있고 카테고리 별로 현재 창고에 있는 상품과 그 수량을 확인 할 수 있습니다. 그리고 기사님이 실제로 창고에서 상품을 트렁크에 담았을 때 담기 버튼을 눌러서 상품의 재고를 관리할 수 있습니다.

<div>
    <img width="48%" alt="main" src="https://user-images.githubusercontent.com/29251371/115715997-abb26200-a3b3-11eb-922b-f2d965617967.png">
    <img width="48%" alt="category" src="https://user-images.githubusercontent.com/29251371/115717063-c933fb80-a3b4-11eb-8509-7b2d24a15b63.png">
</div>


#### 내 트렁크
내 트렁크는 현재 트렁크에 담긴 제품을 확인하는 곳입니다. 상품명과 수량을 확인할 수 있습니다.
재고 버튼을 통해 다시 창고로 상품을 재고처리할 수 있고 판매 버튼을 통해 기사님이 물건을 판매했을 때 판매처리를 할 수 있습니다.

<img width="100%" alt="my-trunk" src="https://user-images.githubusercontent.com/29251371/115716179-e1574b00-a3b3-11eb-8858-53885208774a.png">



## 💂🏼 백오피스

관리자는 창고 전체 재고 관리, 신규 제품 추가, 기사 관리, 판매 기록 등의 기능을 사용할 수 있습니다

<div>
    <img width="47%" alt="스크린샷 2021-04-22 오후 9 53 21" src="https://user-images.githubusercontent.com/29251371/115718358-0056dc80-a3b6-11eb-9284-e37dc754d40e.png">
    <img width="47%" alt="스크린샷 2021-04-22 오후 9 53 26" src="https://user-images.githubusercontent.com/29251371/115718373-0482fa00-a3b6-11eb-9905-140b8dfc833b.png">
    <br />
    <img width="47%" alt="스크린샷 2021-04-22 오후 9 53 26" src="https://user-images.githubusercontent.com/29251371/115718378-05b42700-a3b6-11eb-9251-26c469a75bff.jpg">
    <img width="47%" alt="스크린샷 2021-04-22 오후 9 53 26" src="https://user-images.githubusercontent.com/29251371/115718380-064cbd80-a3b6-11eb-86dd-279d9a9b0549.jpg">
</div>