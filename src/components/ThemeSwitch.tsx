import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface ThemeSwitchProps {
  enabled?: boolean; // Make the enabled prop optional
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ enabled = true }) => {
  const [theme, setTheme] = useState<string | null>(null); // Initialize as null

  // This effect will run once when the component mounts
  useEffect(() => {
    // Get saved theme from cookies
    const savedTheme = Cookies.get("theme");

    // Apply theme immediately if available
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no theme is saved, default to dark
      setTheme("colored");
    }
  }, []); // This effect runs only once when the component mounts

  // Effect to update the theme on `theme` change
  useEffect(() => {
    if (theme !== null) {
      // Apply the theme to the document root element immediately
      document.documentElement.setAttribute("data-theme", theme);
      Cookies.set("theme", theme, { expires: 365 });
    }
  }, [theme]); // Runs when `theme` changes

  // Toggle theme between dark and light
  const toggleTheme = () => {
    if (!enabled) return; // If theme switch is disabled, do nothing
    const newTheme = theme === "colored" ? "light" : "colored";
    setTheme(newTheme); // This will update the state and apply the theme

    // Enable transitions after theme has been applied
    document.body.classList.add("theme-loaded");
  };

  if (theme === null) return null; // Avoid rendering the button until the theme is set

  return (
    <button
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-start w-12 h-6 border-2 rounded-full bg-gray-300 dark:bg-gray-700 transition-all duration-300 ease-in-out ${
        !enabled ? "cursor-not-allowed opacity-50" : "" // If disabled, apply disabled styles
      }`}
      disabled={!enabled} // Disable the button if `enabled` is false
    >
      <div
        className={`absolute w-4 h-4 bg-theme_switch_ball rounded-full transform transition-transform duration-300 ease-in-out ${
          theme === "colored" ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ThemeSwitch;
