export type TypingUsersType = {
  typingUsers: string[];
};

function TypingUsers({ typingUsers }: TypingUsersType) {
  return (
    <>
      <div>
        {typingUsers.map((u) => (
          <span>{u} Печатает...</span>
        ))}
      </div>
    </>
  );
}
export default TypingUsers;
