# Chaerok

> 생각을 잇는 당신의 두 번째 뇌

Chaerok은 단순한 AI 채팅 서비스가 아니라, 사용자의 기억·생각·프로젝트·문서를 시간의 흐름 속에서 연결해 주는 AI Personal Memory Platform입니다. 사용자는 AI를 직접 조작하기보다, 기억이 자동으로 정리되고 관련 맥락이 자연스럽게 이어지는 경험을 받게 됩니다.

## 제품 철학

- AI를 판매하지 않는다.
- 토큰을 판매하지 않는다.
- 사용자는 AI를 사용하는 것이 아니라 채록을 사용한다.
- AI는 항상 조용히 동작한다.

## 핵심 경험

1. 기록한다
2. 자동 정리된다
3. 관련 기억이 연결된다
4. 필요한 순간 먼저 보여준다

## 주요 기능

- 메모, 링크, 이미지 저장
- 로컬 기반 태깅 및 요약
- 검색 및 브리핑
- 확장 프로그램 연동 경험
- 클라우드 동기화 및 멀티 디바이스 확장 가능
- 향후 OCR, PDF 파싱, 지식 그래프, 기억 연결 기능 확장 예정

## 가격 정책

### Free
- 로컬 우선(Local First)
- 메모/링크/이미지 저장
- 로컬 AI 태깅 및 요약
- 검색
- 정규식 기반 브리핑
- 로컬 벡터 검색

### Mind (₩4,900/월)
- Free의 모든 기능 포함
- OCR
- PDF Parsing
- 파일 첨부
- 이미지 이해
- Cloud Sync
- Multi Device
- Long Context
- Knowledge Graph
- AI Memory Connection

## 아키텍처 개요

Chaerok은 로컬 우선 설계를 기반으로, 필요할 때만 클라우드 기능을 사용하는 하이브리드 구조를 지향합니다.

- Local: 태깅, 요약, 분류, 임베딩, 검색
- Cloud: OCR, PDF, Vision, Long Context, Reasoning

## 기술 스택

- React
- TypeScript
- Vite
- Express
- Firebase
- Tailwind CSS

## 로컬 실행

### 요구 사항

- Node.js 18 이상
- npm

### 설치

```bash
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 다음 값을 설정하세요.

```env
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
```

배포 서버(예: Vercel, Netlify, Cloudflare Pages, 서버리스 호스트)에도 동일한 환경 변수를 등록해야 합니다.

### 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속하면 개발 서버를 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

## 프로젝트 구조

- src/: React 앱 진입점 및 UI 컴포넌트
- public/: 정적 에셋 및 SEO 리소스
- server.ts: Vite/Express 개발 서버

## 로드맵

- Phase 1: Personal Memory
- Phase 2: Project Memory
- Phase 3: Team Memory
- Phase 4: Life OS

## 라이선스

본 저장소는 프로젝트 내부 사용을 위한 참고용 구조로 정리되어 있습니다.
