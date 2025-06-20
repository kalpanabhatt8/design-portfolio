import { Outlet } from 'react-router-dom';
import { useTheme } from './utils/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';

const LayoutInner = () => {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background wrapper */}
      <div className="absolute inset-0 -z-10">
        {/* Background color layer */}
        <div
          className={`w-full h-full ${
            theme === "dark" ? "bg-dark-background" : "bg-light-background"
          }`}
        ></div>

        {/* Texture layer with dynamic opacity */}
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "opacity-60" : "opacity-30"
          }`}
          style={{
            backgroundImage: `url('/textures/${theme === 'dark' ? 'graphy-dark' : 'graphy-light'}.png')`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 min-h-screen transition-colors duration-500 ${
          theme === "dark" ? "text-dark-text" : "text-light-text"
        }`}
      >
        <CustomCursor />
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutInner;