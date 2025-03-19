import { PROJECT_STATUS } from '@constants/projectStatus';

export const PROJECT_FORM_FIELDS = [
  { id: 'content', label: '내용', type: 'text' },
  { id: 'startDate', label: '시작일', type: 'date' },
  { id: 'endDate', label: '종료일', type: 'date' },
  { id: 'status', label: '상태', type: 'radio', options: PROJECT_STATUS },
];
