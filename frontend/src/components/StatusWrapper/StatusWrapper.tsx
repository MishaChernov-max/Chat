export type StatusWrapperType = {
  isLoading: boolean;
  isError: string | null;
  children: React.ReactNode;
};
function StatusWrapper({ children }: StatusWrapperType) {
  // if (isLoading) {
  //   return <h2>Идет загрузка...</h2>;
  // }
  // if (isError) {
  //   return <h2>Возникла ошибка{isError}</h2>;
  // }
  return <>{children}</>;
}
export default StatusWrapper;
