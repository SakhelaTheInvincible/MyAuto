export const Links = () => {
  return (
    <div className="text-[#6F7383] flex items-center gap-2 mt-[32px]">
      <div>მთავარი</div>
      <Arrow />
      <div>ძიება</div>
      <Arrow />
      <div className="text-[#FD4100]">იყიდება</div>
    </div>
  );
};

const Arrow = () => {
  return (
    <div className="border-r-2 border-b-2 relative border-[#6F7383] -rotate-45 w-[6px] h-[6px]"></div>
  );
};
