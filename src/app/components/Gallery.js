'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Gallery() {
  const images = [
    '/photos/1.jpg',
    '/photos/2.jpg',
    '/photos/3.jpg',
    '/photos/4.jpg',
    '/photos/5.jpg',
    '/photos/6.jpg',
    '/photos/7.jpg',
    '/photos/8.jpg',
    '/photos/9.jpg',
    '/photos/10.jpg',
    '/photos/11.jpg',
    '/photos/12.jpg',
    '/photos/13.jpg',
    '/photos/14.jpg',
    '/photos/15.jpg',
    // 여기에 사진 경로 계속 추가해도 됨!
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* 이미지 갤러리 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(src)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
          >
            <Image
              src={src}
              alt={`우리 딸 사진 ${idx + 1}`}
              width={400}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          <div style={{ maxWidth: '90%', maxHeight: '90%' }}>
            <Image
              src={selectedImage}
              alt="확대된 사진"
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
