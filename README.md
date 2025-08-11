# M1F4_Project  
휴먼교육센터 9기 프로젝트 **<배워보다>**

---

## 1. 소개  

### 1-1. 배워보다 기획 동기
- 다양한 이유로 의무교육을 받지 못하는 이들에게 다시 배움의 기회를 제공하고자 한다.
- 디지털 격차로 인해 온라인 학습조차 어려운 분들을 위한 지역 중심의 누구나 배울 수 있는 환경을 만든다.


### 1-2. 배워보다의 개발 목표  
- 정보 취약 계층의 디지털 역량 격차 해소  
- 직관적인 UI를 통해 인터넷에 익숙하지 않은 사람들도 알아보기 쉽게 한다.
- 봉사자, 기관, 상점 등 다양한 이해 관계자와 협력 네트워크 구축  

---

### 1-3. 배워보다의 주요 서비스  
- 플랫폼에서 원하는 강의 제안  
- Kakao Map API를 통한 교육 장소 안내  
- 봉사 시간 인증  

---

### 1-4. 팀 구성  
| 이름 | 역할 |
|------|------|
| 고현지 | 커뮤니티 페이지, PPT, 스토리보드 제작 |
| 김재은 | 발표, 메인 페이지, 수강/강의 신청, 스토리보드 제작 |
| 윤성연 | 발표, 회원가입, 챗봇 AI 연동, Kakao Map API 연동, 스토리보드 제작 |
| 최연지 | 팀장, 고객센터, PPT, 스토리보드 제작 |

---

## 2. 페이지 구성  

#### 0_templete
- **templete** : 전체 기본 디자인 양식  
- **chatbot** : Gemini AI 연동 챗봇  

---

#### 1_main
- **mainpage** : 서비스 메인 페이지  
    - `make_account` : 회원 가입  
    - `find_id` : ID 찾기  
    - `find_pw` : 비밀번호 찾기  
    - `login` : 로그인  

---

#### 2_lecture
- **lecture_main** : 수강 신청 메인 페이지  
    - `lecture_child` : 수강 신청 게시글 (상세 페이지)  
- **lecture_require** : 강의 요청 메인  
    - `lecture_require_detail` : 강의 요청 게시글 (상세 페이지)  
    - `lecture_require_write` : 강의 요청 게시글 작성/수정 페이지  

---

#### 3_mypage
- **mypage_main** : 마이페이지 메인 페이지  
    - `info_edit` : 개인정보 수정  
    - `studylist` : 수강 내역 / 봉사 시간 확인  

---

#### 4_cs
- **csMain** : CS 메인 페이지  
    - `csMainView` : 공지 사항 게시글 (상세 페이지)  
    - `csMainWrite` : 공지 사항 작성 페이지  
    - `csMainWriteView` : 공지 사항 작성 완료 페이지  
- **csFAQ** : FAQ 페이지  
- **csQnA** : QnA 페이지  
    - `csQnAView` : QnA 게시글 (상세 페이지)  
    - `csQnAWrite` : QnA 작성 페이지  
    - `csQnAWriterView` : QnA 작성 완료 페이지  

---

#### 5_community
- 추후 이름 확정 시 갱신 예정  

---

## 3. 연락처  
- **윤성연** : datascience123@naver.com  
- (그 외 팀원 연락처는 각자 기입)  
