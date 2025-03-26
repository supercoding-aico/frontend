// ✅ utils/presence.js
export const sendPresence = (stompClient, teamId, userId, pathname) => {
  const isInChat = pathname.includes('/chat');

  if (!stompClient || !stompClient.connected || !teamId || !userId) {
    console.log('[Presence] stompClient 준비 안됨:', stompClient);
    return;
  }

  const type = isInChat ? 'active' : 'inactive';
  const destination = `/app/room/${type}`;

  stompClient.publish({
    destination,
    body: JSON.stringify({ teamId, userId }),
  });

  console.log(`[Presence] ${type} 상태 전송됨`);
};
