import React, { useState } from 'react';
import useStore from '../store/useStore';
import useAuthStore from '../store/useAuthStore';

const SnsFeed = () => {
  const { snsPosts, addSnsPost, updateSnsPost, deleteSnsPost, addSnsComment, likeSnsPost } = useStore();
  const { user } = useAuthStore();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [commentInputs, setCommentInputs] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    addSnsPost({
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      content: newPostContent,
      image: newPostImage || null
    });
    setNewPostContent('');
    setNewPostImage('');
    setFileInputKey(Date.now()); // 리셋
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const content = commentInputs[postId];
    if (!content || !content.trim()) return;

    addSnsComment(postId, {
      authorId: user.id,
      authorName: user.name,
      content
    });

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
  };

  const handleEditSave = (postId) => {
    if (!editContent.trim()) return;
    updateSnsPost(postId, editContent);
    setEditingPostId(null);
  };

  const handleDeleteClick = (postId) => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deleteSnsPost(postId);
    }
  };

  const getProfileBadge = (role) => {
    if (role === 'teacher') return <span className="role-badge teacher">선생님</span>;
    if (role === 'admin') return <span className="role-badge admin">원장님</span>;
    return <span className="role-badge parent">학부모</span>;
  };

  return (
    <div className="sns-feed-container">
      <div className="sns-composer">
        <form onSubmit={handlePostSubmit}>
          <textarea 
            placeholder="오늘 우리 반의 즐거운 소식을 나누어 보세요!" 
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows="3"
          ></textarea>
          <div className="composer-actions">
            <label htmlFor={`media-upload-${fileInputKey}`} className="media-upload-btn">
              {newPostImage ? '✅ 첨부됨 (변경)' : '📸 사진/동영상'}
            </label>
            <input 
              id={`media-upload-${fileInputKey}`}
              key={fileInputKey}
              type="file" 
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="media-input-hidden"
              style={{ display: 'none' }}
            />
            <button type="submit" className="btn btn-primary btn-small">게시하기</button>
          </div>
          
          {newPostImage && (
            <div className="media-preview-container">
              {newPostImage.startsWith('data:video/') ? (
                <video src={newPostImage} className="media-preview" />
              ) : (
                <img src={newPostImage} alt="preview" className="media-preview" />
              )}
              <button type="button" className="remove-media-btn" onClick={() => { setNewPostImage(''); setFileInputKey(Date.now()); }}>&times;</button>
            </div>
          )}
        </form>
      </div>

      <div className="sns-posts">
        {snsPosts.map(post => (
          <div key={post.id} className="sns-post-card">
            <div className="post-header">
              <div className="author-info">
                <strong>{post.authorName}</strong>
                {getProfileBadge(post.authorRole)}
              </div>
              <div className="post-meta">
                <span className="post-date">{new Date(post.date).toLocaleString()}</span>
                {user && user.id === post.authorId && (
                  <div className="post-options">
                    <button onClick={() => handleEditClick(post)} className="icon-btn" title="수정">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button onClick={() => handleDeleteClick(post.id)} className="icon-btn delete" title="삭제">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="post-content">
              {editingPostId === post.id ? (
                <div className="edit-mode">
                  <textarea 
                    value={editContent} 
                    onChange={(e) => setEditContent(e.target.value)}
                    rows="3"
                    className="edit-textarea"
                  />
                  <div className="edit-actions">
                    <button onClick={() => setEditingPostId(null)} className="btn btn-small">취소</button>
                    <button onClick={() => handleEditSave(post.id)} className="btn btn-primary btn-small">저장</button>
                  </div>
                </div>
              ) : (
                <p>{post.content}</p>
              )}
              
              {post.image && (
                (post.image.match(/\.(mp4|webm|ogg)$/i) || post.image.startsWith('data:video/')) ? (
                  <video src={post.image} controls className="post-video" style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', maxHeight: '400px', backgroundColor: '#000' }} />
                ) : (
                  <img src={post.image} alt="post content" className="post-image" />
                )
              )}
            </div>

            <div className="post-actions">
              <button onClick={() => likeSnsPost(post.id)} className="like-btn">
                ❤️ 좋아요 {post.likes > 0 && <span>{post.likes}</span>}
              </button>
            </div>

            <div className="post-comments">
              {post.comments.length > 0 && (
                <div className="comments-list">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <strong>{comment.authorName}</strong>
                        <span className="comment-date">{new Date(comment.date).toLocaleTimeString()}</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                <input 
                  type="text" 
                  placeholder="댓글을 남겨보세요..." 
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                />
                <button type="submit">등록</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnsFeed;
