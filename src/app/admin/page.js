'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return alert('파일을 선택하세요!');
    setUploading(true);
    const fileName = `${Date.now()}_${selectedFile.name}`;
    const { error } = await supabase.storage.from('photos').upload(fileName, selectedFile);
    setUploading(false);
    if (error) alert('업로드 실패');
    else alert('업로드 성공!');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🖼️ 사진 전시 관리자 페이지</h2>

      {!user && (
        <p style={{ color: 'gray', marginTop: '1rem' }}>
          👉 업로드하려면 <a href="/login">로그인</a> 해주세요.
        </p>
      )}

      {user && (
        <>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button onClick={handleUpload} disabled={uploading} style={{ marginLeft: '1rem' }}>
            {uploading ? '업로드 중...' : '업로드'}
          </button>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>로그인된 사용자: {user.email}</p>
        </>
      )}
    </div>
  );
}
