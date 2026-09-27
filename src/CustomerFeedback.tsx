import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Apnar project-er firebase.ts path onujayi thik kore neben
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function CustomerFeedback() {
  const [customerName, setCustomerName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState('5');
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Real-time feedback fetch korar jonno
  useEffect(() => {
    const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setFeedbacks(list);
    });
    return () => unsubscribe();
  }, []);

  // Name theke initials (jemon: "Nusrat Rahman" -> "NR") ber korar helper function
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Feedback submit handler
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !feedbackText.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'feedbacks'), {
        name: customerName,
        comment: feedbackText,
        rating: rating,
        createdAt: serverTimestamp(),
      });
      setCustomerName('');
      setFeedbackText('');
      alert('Thank you! Your feedback has been submitted successfully.');
    } catch (error) {
      console.error('Error submitting feedback: ', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Feedback Form Section */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '35px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '50px', border: '1px solid #f3f4f6' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px', textAlign: 'center' }}>Share Your Experience</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginBottom: '25px' }}>We value your honest feedback to improve our quality and service.</p>
        
        <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Your Name</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="e.g. Nusrat Rahman" 
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px' }}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Rating</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: '#fff', outline: 'none', fontSize: '15px' }}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5/5 - Outstanding)</option>
              <option value="4">⭐⭐⭐⭐ (4/5 - Very Good)</option>
              <option value="3">⭐⭐⭐ (3/5 - Good)</option>
              <option value="2">⭐⭐ (2/5 - Fair)</option>
              <option value="1">⭐ (1/5 - Needs Improvement)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Your Feedback</label>
            <textarea 
              value={feedbackText} 
              onChange={(e) => setFeedbackText(e.target.value)} 
              placeholder="Tell us about your experience with our products or service..." 
              rows={4}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical', fontSize: '15px' }}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            style={{ padding: '14px', backgroundColor: '#166534', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      {/* Live Feedback Grid Section */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Customer Reviews ({feedbacks.length})</h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>What our valued customers are saying</p>
        </div>
        
        {feedbacks.length === 0 ? (
          <p style={{ fontSize: '15px', color: '#6b7280', textAlign: 'center', padding: '30px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            No reviews yet. Be the first one to share your feedback!
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {feedbacks.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '24px', 
                  border: '1px solid #e5e7eb', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}
              >
                <div>
                  {/* Rating Stars */}
                  <div style={{ fontSize: '16px', color: '#d97706', marginBottom: '14px' }}>
                    {item.rating === '5' ? '★★★★★' : item.rating === '4' ? '★★★★☆' : item.rating === '3' ? '★★★☆☆' : item.rating === '2' ? '★★☆☆☆' : '★☆☆☆☆'}
                  </div>

                  {/* Comment Text */}
                  <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' }}>
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                {/* User Info with Avatar Initials */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '50%', 
                    backgroundColor: '#064e3b', 
                    color: '#ffffff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    letterSpacing: '0.5px'
                  }}>
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Verified Customer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}