import { Logo } from "../assets/Logo";

export const Navbar = () => {
  return (
    <div className="bg-white py-[17px] mainxl:px-0 px-[16px]">
      <nav className="max-w-[1050px] mx-auto">
        <Logo />
      </nav>
    </div>
  );
};
