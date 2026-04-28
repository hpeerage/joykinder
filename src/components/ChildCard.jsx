import React, { useState } from 'react';
import useStore from '../store/useStore';
import useAuthStore from '../store/useAuthStore';

const ChildCard = ({ student, onClose }) => {
  const { studentNotes, addStudentNote } = useStore();
  const { user } = useAuthStore();
  const [newNote, setNewNote] = useState('');

  // Filter notes specific to this student
  const notes = studentNotes.filter(n => n.studentId === student.id).sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addStudentNote({
      studentId: student.id,
      authorId: user.id,
      authorRole: user.role,
      content: newNote
    });
    setNewNote('');
  };

  return (
    <div className="child-card-modal-overlay" onClick={onClose}>
      <div className="child-card-modal" onClick={e => e.stopPropagation()}>
        <div className="child-card-header">
          <div className="child-profile-wrapper">
            <img src={student.photo} alt={student.name} className="child-photo" />
            <div className="child-info">
              <h2>{student.name} <span>({student.classId})</span></h2>
              <div className="child-tags">
                {student.allergies && student.allergies !== '없음' && (
                  <span className="tag allergy">알러지: {student.allergies}</span>
                )}
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="child-card-body">
          <div className="child-details-section">
            <h3>기본 정보 및 특이사항</h3>
            <p className="child-notes-box">{student.notes || '등록된 특이사항이 없습니다.'}</p>
          </div>

          <div className="child-communication-section">
            <h3>1:1 알림장 (선생님 ↔ 학부모)</h3>
            
            <div className="notes-list">
              {notes.length === 0 ? (
                <p className="no-notes">아직 등록된 1:1 메시지가 없습니다.</p>
              ) : (
                notes.map(note => (
                  <div key={note.id} className={`note-message ${note.authorRole === user.role ? 'my-message' : 'other-message'}`}>
                    <div className="note-bubble">
                      <p>{note.content}</p>
                      <span className="note-time">{new Date(note.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form className="note-input-form" onSubmit={handleNoteSubmit}>
              <input 
                type="text" 
                placeholder="메시지를 입력하세요..." 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-small">전송</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
