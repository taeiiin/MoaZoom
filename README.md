readme 작성이 아래와 같이 끝났어. 근데 readme에서 이미지 업로드되는 시간이 너무 길어서, 이미지가 빠르게 뜨게 하고 싶어. 어떻게 개선할 수 있을까?

# 🔎 모아줌 (moaZOOM)
![image](https://github.com/user-attachments/assets/33c7c971-054f-453f-ae34-240ab79dcb62)
캠퍼스 위치별로 생성된 모임 리스트를 한눈에 보고 참여할 수 있는 지도 기반 그룹 매칭/정보 공유 커뮤니티

<br/><br/>

---

# 목차
1. [개요](#개요)
3. [기획 소개](#기획-소개)
4. [개발 환경](#개발-환경)
5. [최종 프로젝트 소개](#최종-프로젝트-소개)
6. [개선 목표 & 보완점](#개선-목표--보완점)
7. [소감](#소감)


---
  
<br/>

## 개요
- **프로젝트 이름:** 모아줌 (moaZOOM)
- **개발 기간:** 2022년 2학기
- **참여 인원:** 3명 (강태인, 김주연, 박가연)

<br/>

## 기획 소개
- **기획 배경:**
  - 에브리타임 및 교내 커뮤니티 애플리케이션 외의 플랫폼 미비
  - 교내 그룹 매칭 및 정보가 모두 게시글로 작성되기 때문에 해당하는 위치를 정확하게 알기 어려움
  - 제공된 정보의 지속성 및 유효성을 댓글 이외의 방법으로 판단하기 힘듦
  
<br/>

- **프로젝트 목표:**
  - 교내에서 학생 간 목적에 맞는 소모임을 캠퍼스 지도에 표시하는 방식을 통해 위치 공개적으로 그룹 매칭을 주선
  - 교내 인증을 통한 회원제로 운영하여 안전하고 신뢰성 있는 매칭을 보장
  - 커뮤니티 기능을 지도의 마킹 기능으로 제공하여 위치별 정보를 한눈에 알아볼 수 있도록 시각화

<br/>
  
- **벤치마킹:**
  <div align="center">
    
  ![image](https://github.com/user-attachments/assets/10ff5d95-5346-42c7-9c50-56c91f56c951)
  |기능|  모아줌  |당근마켓|에브리타임|
  |------|----|---|---|
  |위치 정보 제공|**O**|O|X|
  |커뮤니티 기능|**O**|O|O|
  |그룹 매칭 기능|**O**|X|X|
  
  </div>


<br/>

- **주요 기능:**
  - 캠퍼스 지도 : 기본적으로 교내 지도 제공
  - 그룹 매칭 기능 : 지도의 마커 색상을 다르게 하여 목적별로 그룹 매칭
  - 위치별 정보 공유 : 실시간으로 각 위치에 대해 분실물, 시설 문제점 등 정보를 제공하고 정보의 성격에 따라 정보 지속 시간을 다르게 표시
  - 커뮤니티 : 마커 정보를 세부적으로 탐색 및 댓글/쪽지 기능 이용


<br/>

## 개발 환경
- **IDE:** Atom, VSCode, MySQL WorkBench
- **개발 언어:** HTML, CSS, JavaScript, Node.js, SQL
- **기술 스택:** 카카오 맵 API, Node.js, MySQL
- **담당 파트**
  - 백엔드 nodeJS & DB 담당
  - DB 구현 및 데이터 연동
  - nodeJS를 이용해 서버와 클라이언트 연결
  - Javascript 이용해 페이지 이동 및 각종 이벤트 처리
  - 웹 페이지 동작 문제 처리
  
<br/>


## 최종 프로젝트 소개

![메인](https://github.com/user-attachments/assets/3b5d12e2-f1ed-4b4a-b371-4195eafd85bc "Main Page")
- **메인 페이지:**
  - 그룹 매칭글과 정보글 모두 볼 수 있고, API를 통해 지도를 볼 수 있음
  - 지도에서는 클릭 시 마커를 생성하여 글 목록을 확인 가능
  - 상단의 로고를 누르면 다른 페이지에서 메인 페이지로 복귀
  - 상단 바의 빨간 동그라미 버튼은 정보 공유 페이지로, 초록 동그라미 버튼은 그룹 매칭 페이지로 연결, 메인 페이지의 ALL 버튼은 마커 표시/숨기기 기능
  - 오른쪽 상단의 인물 버튼은 마이페이지로, 문 버튼은 로그아웃 기능으로 연결

![정보공유](https://github.com/user-attachments/assets/ee2015b9-c6ee-4dd0-9b3c-4d4e76bdf105)
- **정보 공유 페이지:**
  - 정보 공유 페이지에서는 회원들이 입력한 각종 정보들을 확
  - 모든 글은 3일 존재한 뒤 자동으로 삭제
  - 글 입력은 지도 오른쪽의 + 버튼을 누르거나 지도에 마커를 찍어 작성 가능
  - 글 작성 창이 뜨면 로그인된 경우 제목과 내용을 입력한 뒤 글 게시 가능
  - 글 작성 후 정보 공유 페이지를 재접속하면 작성한 글이 보이고, view 버튼을 누르면 글 상세 페이지로 가서 각 정보를 확인 가능

![그룹매칭](https://github.com/user-attachments/assets/6bb71bf4-d9a1-47a1-944f-89008fb48c8b)
- **그룹 매칭 페이지:**
  - 그룹 매칭 페이지에서는 회원들이 모집하는 그룹들을 확인
  - 정보 공유글과 마찬가지로 그룹 모집글의 경우에도 3일이 지나면 글이 자동으로 삭제
  - plus 버튼 혹은 지도를 클릭해 마커를 통해 글 작성이 가능. 제목과 내용, 모임 날짜와 시간, 모집 인원 등 작성
  - view 버튼을 누르면 그룹 상세 페이지로 이동해 글 전문을 확인
  - join 버튼을 누르면 이미 참가한 그룹이거나 꽉 찬 그룹이 아닌 경우 그룹에 참여가 되며, 현재 몇 명이 참여 중인지 alert창을 통해 확인 가능
  
![글 상세1](https://github.com/user-attachments/assets/3a29b33b-2e87-496d-bfcb-86241361bf6c)
![글 상세2](https://github.com/user-attachments/assets/60bf869e-22ff-4d1c-ad2e-0a1de82eea16)
- **글 상세 페이지:**
  - 각 정보 공유 페이지와 그룹 매칭 페이지에서 view 버튼을 누르면 뜨는 글 상세 페이지
  - 정보 공유글의 경우 제목/본문과 글 삭제 마감 날짜를 확인 가능하며 그룹 매칭 페이지의 경우 모집 중이라는 정보와 제목/본문과 모집 인원/날짜/시간을 확인
  - 두 페이지 모두 댓글을 남길 수 있음 : 댓글은 회원 정보에서 학번(ID)의 앞 두자리와 전공 데이터를 가져와 합쳐 닉네임화 시켜 작성하도록 하였기 때문에 로그인 이후에만 이용 가능
![회원가입](https://github.com/user-attachments/assets/1eedbd7f-5fc6-4614-9482-d36f0a1f3acb)
![로그인](https://github.com/user-attachments/assets/87a7d83d-06f8-494c-a71e-f0424a6af964)

- **회원가입 및 로그인:**
  - 마이페이지에 접속 시 로그인되지 않은 상태라면 로그인 페이지로 연결
  - 로그인 시 회원 정보가 없을 경우 회원가입 페이지로 이동
  - 회원가입은 학번(ID), 비밀번호, 이름, 전화번호, email, 전공 정보를 입력

![마이페이지](https://github.com/user-attachments/assets/6763053e-333b-45be-a3ca-4bc377df2a5d)
- **마이페이지:**
  - 회원 정보를 확인
  - 내가 작성한 글 목록에서 정보글과 그룹매칭글을 구분하여 확인할 수 있으며, 참여한 그룹 기록 또한 확인이 가능
  - 작성글의 경우 시간이 지나면 목록에서 사라지지만 그룹 참여 기록의 경우 지속

<br/>

## 개선 목표 & 보완점
- **보완할 부분:**
  - 관리자 계정 부재로 인한 유해성 게시물 삭제 어려움 : 관리자 계정 생성을 통해 위의 유해성 게시물 관리 및 회원 정보 관리
  - 회원 정보 수정 기능 미구현 : 정보 수정 페이지 개발
  - 대댓글 및 글쓴이 강조 기능 미구현 : DB에서 댓글에 대한 댓글 테이블을 생성하고 댓글 인덱스를 받아와 대댓글 기능을 구현
- **추가 개발 가능 부분:**
  - 익명 1:1 채팅 기능
  - 관리자 계정 생성으로 게시물 관리 강화
  - 지도 기능 확장 (위치 마커 카테고리화 및 DB 연동)

<br/>

## 소감
노드를 이용해 서버 코드를 작성하고 각 html 파일에 클라이언트 코드들을 작성해 그 사이에서 데이터를 주고받을 수 있도록 연동하는 기능을 개발하면서 웹 백엔드가 어떤 방식으로 작동하는 구조에 대해 더 이해할 수 있었다. 노드JS에서 목표했던 기능을 전부 구현할 수 있어 뿌듯했고, DB와 웹사이트 구조를 체계적으로 사용하는 방법에 대해 더 고민해볼 수 있었던 시간이었다.