# SS-Mobility 재고관리 앱

SS-mobility 회사 내부 창고와 기사님들의 재고를 관리하기 위한 웹 앱입니다. 주요기능으로는 구글 로그인으로 허용된 사용자만 접근이 가능하며, 접근가능한 사용자들은 개인의 트렁크 공간을 가지게 됩니다. 트렁크를 통해서 창고에 있는 재고를 옮기며 재고관리를 할 수 있습니다.

###### (이 프로젝트는 ss-mobility의 외주를 받아 제작하게 되었습니다.)

## 🛠  기술 스택
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


## 시작하기
처음 프로젝트를 실행하기 위해 아래 명령어로 시작한다.
```
npm start
```
