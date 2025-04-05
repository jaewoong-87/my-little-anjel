export const metadata = {
  title: '우리 딸 전시회',
  description: '세상에서 제일 귀여운 사진들 모음 💕',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'Pretendard, sans-serif', backgroundColor: '#f9f9f9', color: '#333' }}>
        <header style={{
          background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
          padding: '2rem 1rem',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}>
          <h1 style={{ margin: 0, color: '#fff', fontSize: '2.5rem' }}>🎀 우리 딸의 작은 전시회 🎀</h1>
          <p style={{ marginTop: '0.5rem', color: '#fff', fontSize: '1rem' }}>사랑을 담은 순간들</p>
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
