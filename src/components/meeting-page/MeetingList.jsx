import { useState } from 'react';
import Modal from 'react-modal';
import { useMeetingList } from '@hooks/meeting/useMeetingList';
import '@styles/components/meeting-page/meeting-list.scss';

const MeetingList = ({ teamId }) => {
  const { data: meetingList = [], isLoading } = useMeetingList(teamId);
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

  const uniqueParticipants = (participants = []) => [
    ...new Set(participants.map((p) => p.nickname || '익명')),
  ];

  if (isLoading) return <p>회의록 불러오는 중...</p>;

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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='meetingModal'
        overlayClassName='modalOverlay'
      >
        {selectedMeeting && (
          <div className='modalContent'>
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
              {uniqueParticipants(selectedMeeting.participants).map((name, idx) => (
                <li key={idx}>{name}</li>
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
