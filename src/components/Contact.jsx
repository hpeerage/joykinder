import React, { useState } from 'react';
import useStore from '../store/useStore';

const Contact = () => {
  const { addInquiry, content } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    let formatted = '';
    
    if (value.length < 4) {
      formatted = value;
    } else if (value.length < 7) {
      if (value.startsWith('02')) {
        formatted = value.substr(0, 2) + '-' + value.substr(2);
      } else {
        formatted = value.substr(0, 3) + '-' + value.substr(3);
      }
    } else if (value.length < 11) {
      if (value.startsWith('02')) {
        if (value.length < 10) {
          formatted = value.substr(0, 2) + '-' + value.substr(2, 3) + '-' + value.substr(5);
        } else {
          formatted = value.substr(0, 2) + '-' + value.substr(2, 4) + '-' + value.substr(6);
        }
      } else {
        formatted = value.substr(0, 3) + '-' + value.substr(3, 3) + '-' + value.substr(6);
      }
    } else {
      formatted = value.substr(0, 3) + '-' + value.substr(3, 4) + '-' + value.substr(7, 4);
    }
    
    setPhone(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = {
      name: e.target[0].value,
      phone: e.target[1].value,
      content: e.target[2].value,
    };

    // Simulate API call
    setTimeout(() => {
      addInquiry(formData);
      alert('상담 신청이 접수되었습니다. 조이킨더에서 곧 연락드리겠습니다!');
      setIsSubmitting(false);
      setPhone('');
      e.target.reset();
    }, 1000);
  };

  return (
    <section id="contact" className="section bg-green">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>상담 안내</h2>
            <p>조이킨더의 따뜻한 공동체에 함께하고 싶은 분들의 연락을 기다립니다.</p>
            <ul className="info-list">
              <li>📍 {content.address}</li>
              <li>📞 {content.phone}</li>
              <li>📧 {content.email}</li>
            </ul>
          </div>
          <div className="contact-form">
            <form id="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="이름" required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="연락처 (숫자만 입력해도 자동 변환)" 
                  value={phone}
                  onChange={handlePhoneChange}
                  required 
                  disabled={isSubmitting} 
                />
              </div>
              <div className="form-group">
                <input type="email" placeholder="이메일 (선택)" disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <textarea placeholder="문의 내용" rows="5" required disabled={isSubmitting}></textarea>
              </div>
              <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                {isSubmitting ? '신청 중...' : '상담 신청하기'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
