import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/parent');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(id, password);
    // Error will be shown if login fails and isAuthenticated remains false
    if (!useAuthStore.getState().isAuthenticated) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>조이킨더 통합 포털</h2>
        <p className="login-subtitle">학부모 및 교직원 전용</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input 
              type="text" 
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              placeholder="아이디를 입력하세요"
              required 
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="비밀번호를 입력하세요"
              required 
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">로그인</button>
        </form>
        <div className="login-footer">
          <p>테스트 계정:</p>
          <ul>
            <li>학부모: parent1 / joy1234</li>
            <li>선생님: teacher1 / joy1234</li>
            <li>운영자: admin / joy1234</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
