import { useState } from 'react';
import Modal from 'react-modal';
import { useMeetingList } from '@hooks/meeting/useMeetingList';
import '@styles/components/meeting-page/meeting-list.scss';
import DropdownMenu from '@components/common/DropdownMenu';
import { useDeleteMeeting } from '@hooks/meeting/useDeleteMeeting';

const MeetingList = ({ teamId }) => {
  const { data: meetingList = [], isLoading } = useMeetingList(teamId);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { mutate: deleteMeetingMutate } = useDeleteMeeting(teamId);

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

  const handleEditMeeting = () => {
    console.log(1);
  };
  const handleDeleteMeeting = (meetingId) => {
    deleteMeetingMutate(meetingId);
  };

  if (isLoading) return <p>회의록 불러오는 중...</p>;

  return (
    <div className='meetingList'>
      <h4>📋 회의록 리스트</h4>
      {meetingList.length > 0 ? (
        meetingList.map((meeting) => (
          <div key={meeting.meetingId} className='meetingItem' onClick={() => openModal(meeting)}>
            <div className='date'>{new Date(meeting.date).toLocaleString()}</div>
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu
                menuId={meeting.meetingId}
                isOpen={openDropdownId === meeting.meetingId}
                onToggle={(id) => setOpenDropdownId((prev) => (prev === id ? null : id))}
                options={[
                  { label: '회의록 수정', onClick: () => handleEditMeeting() },
                  { label: '회의록 삭제', onClick: () => handleDeleteMeeting(meeting.meetingId) },
                ]}
              />
            </div>
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
