## 초과근무 프로젝트

- 개요 : 초과 근무한 시간을 기록하고 조회는 것을 도와주기 위한 프로젝트 입니다.
- 사용한 툴
  - FE : nextjs, redux, tailwindCss, motionFramer, react-hook-form
  - BE : mysql, prismaORM, iron-session
- 기능 :

  - 일반사용자 : 초과근무 시간 기록, 저장, 자기 근무만 조회, 정렬, 개인정보 수정, 공지사항 조회
  - 관리자 : 일반 사용자 기능 + 초과근무 수정, 삭제, 모든 유저 근무 조회, 날짜별 근무 조회, 공지사항 작성, 공지사항 수정, 공지사항 삭제

- 특징
  - 기능
    - 로그인 : 휴대폰으로 인증번호를 보내서 확인 후 로그인 하는 형태입니다.
    - 이메일 로그인은 응답시간이 오래 걸리는 문제로 개선 중에 있습니다.(별도 큐 서비스 를 붙일 예정)
    - 초과근무 시간은 로그아웃 후 다시 로그인 해도 기록이 남아 있으며 계속 타이머가 작동합니다.
    - 초과근무 시간이 다음날로 넘어갈 경우 (현재는)수동으로 관리자가 확인 후 삭제해야 합니다.
    - 공지사항은 1일 단위로 업데이트 됩니다.(공지사항을 작성하더라도 24시간 후 업데이트 합니다.)
  - 랜더링 형태
    - 공지사항과 공지사항 내용은 SSG 형태 입니다.
    - 나머지는 모두 CSR 형태 입니다.
- 개선해야 할 점

  - 사용자가 문의사항이 많을 것 같은데 피드백 받을 통로가 없음
  - 초과근무 기록이 매우 많아 질 텐데(1일 최소 회원수 이상의 기록) 다양한 검색 방법 이 필요
  - 공지사항 편집 삭제 를 할 경우는 24 시간 보다 즉시 수정되도록 하는 방법도 필요함

- 추가예정
  - 각 기능별 테스트 코드
  - 이메일 로그인 기능 추가(메일링 서비스를 붙이거나 만들어야함, 서버리스라 레디스 같은 것은 못 사용 할 수도 있음)
  - 특정 시간에만 작동하는 db 정리 기능(서버리스라서 별도의 서비스를 붙일 필요가 있음)
  - 사용자와 관리자 간에 의사소통 을 위한 질문답변 통로(채팅, 게시판 등)
