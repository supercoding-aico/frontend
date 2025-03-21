import { useState } from 'react';
import Modal from 'react-modal';
import { useMeetingList } from '@hooks/meeting/useMeetingList';
import '@styles/components/meeting-page/meeting-list.scss';

const MeetingList = ({ teamId }) => {
  const { meetingList, loading } = useMeetingList(teamId);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (meeting) => {
    setSelectedMeeting(meeting);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMeeting(null);
    setModalIsOpen(false);
  };

  if (loading) return <p>회의록 불러오는 중...</p>;

  return (
    <div className='meetingList'>
      <h4>📋 회의록 리스트</h4>
      {meetingList.length > 0 ? (
        meetingList.map((meeting) => (
          <div key={meeting.meetingId} className='meetingItem' onClick={() => openModal(meeting)}>
            <span className='date'>{new Date(meeting.date).toLocaleString()}</span>
          </div>
        ))
      ) : (
        <p className='noMeeting'>저장된 회의록이 없습니다.</p>
      )}

      {/* ✅ 모달 창 (회의록 상세보기) */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='meetingModal'
        overlayClassName='modalOverlay'
      >
        {selectedMeeting && (
          <div className='modalContent'>
            <h3>📌 회의록 상세보기</h3>
            <p>
              <strong>📅 날짜:</strong> {new Date(selectedMeeting.date).toLocaleString()}
            </p>
            <p>
              <strong>📝 요약:</strong>
            </p>
            <div className='meetingSummary'>{selectedMeeting.meeting}</div>
            <p>
              <strong>👥 참가자:</strong>
            </p>
            <ul>
              {selectedMeeting.participants.map((p, index) => (
                <li key={index}>{p.nickname || '익명'}</li>
              ))}
            </ul>
            <button className='closeBtn' onClick={closeModal}>
              닫기
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MeetingList;
