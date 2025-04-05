'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '../../../lib/supabase';

export default function Gallery() {
  const staticImages = Array.from({ length: 15 }, (_, i) => `/photos/${i + 1}.jpg`);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 모달 이미지 상태
  const fileInputRef = useRef();

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error('❌ 초기 사용자 정보 가져오기 실패:', error.message);
      } else {
        setUser(data?.user || null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    if (supabase) {
      console.log('🟢 Supabase 클라이언트 연결됨');
    }

    fetchImages();

    return () => subscription.unsubscribe();
  }, []);

  async function fetchImages() {
    const { data, error } = await supabase.storage.from('photos').list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (!error && data) {
      const urls = data.map(file =>
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${file.name}`
      );
      setUploadedImages(urls);
    } else {
      console.error('❌ 이미지 가져오기 실패:', error?.message);
      setUploadedImages([]);
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let imageToUpload = file;

    if (file.size > 5 * 1024 * 1024) {
      imageToUpload = await resizeImage(file, 1024);
    }

    const ext = file.name.split('.').pop();
    const safeName = `img_${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from('photos').upload(safeName, imageToUpload, { upsert: true });

    if (error) {
      alert('업로드 실패: ' + error.message);
    } else {
      alert('업로드 성공!');
      fetchImages();
    }
  };

  const resizeImage = (file, maxWidth) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const resized = new File([blob], file.name, { type: file.type });
          resolve(resized);
        }, file.type);
      };

      reader.readAsDataURL(file);
    });
  };

  const allImages = [...staticImages, ...uploadedImages];

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {user && (
          <div
            onClick={() => fileInputRef.current.click()}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              backgroundColor: 'rgba(200,200,200,0.2)',
              border: '2px dashed #aaa',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '3rem', color: '#999' }}>+</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {allImages.map((src, idx) => (
          <div
            key={idx}
            style={{ borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => handleImageClick(src)}
          >
            <Image
              src={src}
              alt={`전시 이미지 ${idx + 1}`}
              width={400}
              height={400}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedImage && (
        <div
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={selectedImage}
            alt="확대 이미지"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 30px rgba(255,255,255,0.3)',
            }}
          />
        </div>
      )}
    </>
  );
}
