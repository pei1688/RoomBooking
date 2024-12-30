import SideNavgation from "../_components/SideNavgation";

function Layout({ children }) {
  return (
    <div className="lg:grid  lg:px-0 md:grid-cols-[4rem_1fr] lg:grid-cols-[14rem_1fr]  md:mb-0   lg:gap-10 mt-10 md:mt-0 ">
      {/* 側邊導航，在小螢幕縮小寬度 */}

        <SideNavgation />
 

      {/* 主要內容區域 */}
      <div className="w-full ">{children}</div>
    </div>
  );
}

export default Layout;
