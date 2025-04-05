'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function LoginWidget() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
  
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('로그인 실패!');
    } else {
      setUser(data.user);
      setShowLoginForm(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowLoginForm(false);
  };

  if (user) {
    return (
      <div style={{ textAlign: 'right', color: '#fff', fontSize: '0.9rem' }}>
        <p style={{ margin: 0 }}>{user.email}</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '0.3rem',
            padding: '5px 10px',
            fontSize: '0.8rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#fff',
            color: '#d63384',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#fff' }}>
      {showLoginForm ? (
        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '5px 8px',
              border: '1px solid #ffc0cb',
              borderRadius: '6px',
              outline: 'none',
              fontSize: '0.8rem',
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '5px 8px',
              border: '1px solid #ffc0cb',
              borderRadius: '6px',
              outline: 'none',
              fontSize: '0.8rem',
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: '#ff85a2',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            확인
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowLoginForm(true)}
          style={{
            backgroundColor: '#fff',
            color: '#d63384',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          관리자 로그인
        </button>
      )}
    </div>
  );
}
