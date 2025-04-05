export const metadata = {
  title: '우리 딸 전시회',
  description: '세상에서 제일 귀여운 사진들 모음 💕',
};

import LoginWidget from './components/LoginWidget';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'Pretendard, sans-serif', backgroundColor: '#f9f9f9', color: '#333' }}>
        <header style={{
          background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>🎀 우리 딸의 작은 전시회 🎀</h1>
            <p style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>사랑을 담은 순간들</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <LoginWidget />
          </div>
        </header>

        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>{children}</main>

        <footer style={{
          backgroundColor: '#222',
          color: '#fff',
          textAlign: 'center',
          padding: '1.5rem',
          marginTop: '4rem',
          fontSize: '0.9rem',
        }}>
          <p>👨‍👧 아빠가 만든 사랑의 전시회 &copy; {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
