export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // 휴대폰 번호 형식 (010-xxxx-xxxx)
  const mobileMatch = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (mobileMatch) {
    return `${mobileMatch[1]}-${mobileMatch[2]}-${mobileMatch[3]}`;
  }

  // 지역번호 전화번호 형식 (02-xxxx-xxxx 또는 031-xxx-xxxx)
  const areaMatch = cleaned.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);
  if (areaMatch) {
    return `${areaMatch[1]}-${areaMatch[2]}-${areaMatch[3]}`;
  }

  // 기타 번호 형식 (예: 1577-xxxx)
  const specialMatch = cleaned.match(/^(\d{4})(\d{4})$/);
  if (specialMatch) {
    return `${specialMatch[1]}-${specialMatch[2]}`;
  }

  // 형식에 맞지 않는 경우
  return phoneNumber;
};
