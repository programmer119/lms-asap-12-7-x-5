# EduPulse LMS Prototype

공공 교육서비스 LMS 프로젝트의 정적 웹 프로토타입입니다.

## 로컬 실행

```powershell
python -m http.server 5173
```

브라우저에서 `http://127.0.0.1:5173`을 엽니다.

## 정적 배포

별도 빌드 없이 아래 파일을 Netlify, Vercel, GitHub Pages, S3 정적 호스팅에 업로드하면 됩니다.

- `index.html`
- `styles.css`
- `app.js`

## 프로토타입 범위

- 운영 대시보드
- 강좌 관리
- 학습자/기관별 현황
- 월간 리포트
- 검색, 탭 전환, 화면 밀도 전환, 월별 리포트 조작
