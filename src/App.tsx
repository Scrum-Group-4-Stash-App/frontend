import BrandLogo from "./components/BrandLogo";
import MenuOverlay from "./components/MenuOverlay";
import NavigationMenu from "./components/NavMenu";
import UserCard from "./components/UserCard";

import profileImg from "./assets/Images/profileimg.jpg";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#3A3A3A",
        padding: "30px",
      }}
    >
              <MenuOverlay
          logo={<BrandLogo />}
          footer={
            <UserCard
              image={profileImg}
              name="Emmanuel Ugwoke"
              status="Active"
            />
          }
        >
          <NavigationMenu />
        </MenuOverlay>
    </div>
  );
}

export default App;