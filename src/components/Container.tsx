export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-mainxl mx-auto px-[16px] mainxl:px-0 overflow-visible">
      {children}
    </div>
  );
};
