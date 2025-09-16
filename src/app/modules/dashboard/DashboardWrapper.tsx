import { useEffect, useState } from 'react';
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";
import { useThemeMode } from "../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

const DashboardWrapper = () => {
  const { setToolbarType } = useLayout();
  const { mode } = useThemeMode();
  
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Handle system theme dynamically
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set initial system theme based on user preference
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
      
      // Listen for changes in system theme
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      // Clean up event listener on component unmount
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [mode]);

  // Update filter based on theme mode (light, dark, or system)
  const logoStyles = {
    filter: mode === 'dark' || (mode === 'system' && systemTheme === 'dark') ? '' : 'brightness(0) saturate(100%)',
    marginRight: '10px',
  };

  // Adjust heading color based on theme mode (light, dark, or system)
  const headingStyles = {
    color: mode === 'dark' || (mode === 'system' && systemTheme === 'dark') ? 'white' : 'black',
    marginTop: '15px',
  };

  // Set the toolbar type
  setToolbarType('dashboard');

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            alt="Logo"
            src={toAbsoluteUrl('media/logos/logo-removebg-preview.svg')}
            className="h-70px mt-2 app-sidebar-logo-default"
            style={logoStyles} // Apply dynamic logo styles
          />
          <h4 className="app-sidebar-logo-default" style={headingStyles}> {/* Apply dynamic heading styles */}
            Edubridge
          </h4>
        </div>
      </Content>
    </>
  );
};

export default DashboardWrapper;
