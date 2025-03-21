import { useState, useEffect } from 'react';
import axios from '@axios/axios';

export const useMeetingList = (teamId) => {
  const [meetingList, setMeetingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/meeting/${teamId}?page=0`);
      console.log(response.data, '미팅리스트');
      setMeetingList(response.data || []);
    } catch (error) {
      console.error('회의록 리스트 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [teamId]);

  return { meetingList, loading, fetchMeetings };
};
