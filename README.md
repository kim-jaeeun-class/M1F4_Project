# M1F4_Project
휴먼교육센터 9기 프로젝트 &lt;배워보다>
====================================

소개
----

프로젝트 구성
------------
    0_templete
        templete                        전체 기본 디자인 양식
        chatbot                         gemini ai 연동 챗봇
    ///////////////////////////////////////////////////////////////////////
    1_main
        mainpage                        서비스 메인 페이지
            make_account                    회원 가입
            find_id                         id 찾기
            find_pw                         비밀번호 찾기
            login                           로그인
    ///////////////////////////////////////////////////////////////////////
    2_lecture
        lecture_main                    수강 신청 메인 페이지
            lecture_child                   수강 신청 게시글(상세 페이지)
        lecture_require                 강의 요청 메인
            lecture_require_detail          강의 요청 게시글(상세 페이지)
            lecture_require_write           강의 요청 게시글 작성/수정 페이지
    ///////////////////////////////////////////////////////////////////////
    3_mypage
        mypage_main                     마이페이지 메인 페이지
            info_edit                       개인 정보 수정
            studylist                       수강 내역 / 봉사 시간 확인
    ///////////////////////////////////////////////////////////////////////
    4_cs
        csMain                          cs 메인 페이지
            csMainView                      공지 사항 게시글(상세 페이지)
            csMainWrite                     공지 사항 작성 페이지
            csMainWriteView                 공지 사항 작성 완료 페이지
        csFAQ                           FAQ 페이지
        csQnA                           QnA 페이지
            csQnAView                       QnA 게시글(상세 페이지)
            csQnAWrite                      QnA 작성 페이지
            csQbAWriterView                 QnA 작성 완료 페이지
    ///////////////////////////////////////////////////////////////////////
    5_community : 추후 이름 정리되면 갱신

뭘 더 써야 하나