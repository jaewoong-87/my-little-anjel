import Gallery from './components/Gallery';

export default function HomePage() {
  return (
    <div>
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>💖 오늘의 추억 💖</h2>
        <p>우리 초록이의 귀엽고 사랑스러운 순간들을 담은 전시회입니다.</p>
      </section>
      <Gallery />
    </div>
  );
}
