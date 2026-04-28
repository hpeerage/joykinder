import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import useAuthStore from '../../store/useAuthStore';

const MedicationForm = () => {
  const { addMedicationRequest } = useStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    medicineType: '',
    dosage: '',
    time: '',
    storage: 'room',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicationRequest({
      ...formData,
      parentName: user?.name,
    });
    alert('투약의뢰서가 제출되었습니다.');
    navigate('/parent');
  };

  return (
    <div className="parent-dashboard">
      <nav className="admin-nav">
        <div className="container">
          <h2>투약의뢰서 작성</h2>
          <Link to="/parent" className="back-home">뒤로가기</Link>
        </div>
      </nav>

      <div className="container admin-content">
        <div className="admin-form-card wide">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>아이 이름</label>
                <input type="text" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} placeholder="이름을 입력하세요" required />
              </div>
              <div className="form-group">
                <label>약의 종류</label>
                <input type="text" value={formData.medicineType} onChange={(e) => setFormData({...formData, medicineType: e.target.value})} placeholder="예: 해열제, 시럽" required />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>투약 용량</label>
                <input type="text" value={formData.dosage} onChange={(e) => setFormData({...formData, dosage: e.target.value})} placeholder="예: 5ml, 1정" required />
              </div>
              <div className="form-group">
                <label>투약 시간</label>
                <input type="text" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} placeholder="예: 식후 30분, 오후 2시" required />
              </div>
            </div>

            <div className="form-group">
              <label>보관 방법</label>
              <select value={formData.storage} onChange={(e) => setFormData({...formData, storage: e.target.value})}>
                <option value="room">실온 보관</option>
                <option value="fridge">냉장 보관</option>
              </select>
            </div>

            <div className="form-group">
              <label>주의 사항 및 기타</label>
              <textarea 
                value={formData.notes} 
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="선생님이 알아야 할 특이사항을 적어주세요"
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">의뢰서 제출하기</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicationForm;
