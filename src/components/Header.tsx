import { Layout, Menu, Drawer, Button } from 'antd';
import { HomeOutlined, BarChartOutlined, EnvironmentOutlined, TeamOutlined, MenuOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useState } from 'react';
import appLogo from '../assets/app_logo.PNG';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setDrawerVisible(false);
    }
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <a onClick={() => scrollToSection('home')} className="cursor-pointer">Home</a>,
    },
    {
      key: 'statistik',
      icon: <BarChartOutlined />,
      label: <a onClick={() => scrollToSection('statistik')} className="cursor-pointer">Statistik</a>,
    },
    {
      key: 'peta',
      icon: <EnvironmentOutlined />,
      label: <a onClick={() => scrollToSection('peta')} className="cursor-pointer">Peta Lahan</a>,
    },
    {
      key: 'petani',
      icon: <TeamOutlined />,
      label: <a onClick={() => scrollToSection('petani')} className="cursor-pointer">Data Petani</a>,
    },
    {
      key: 'aplikasi',
      icon: <AppstoreOutlined />,
      label: (
        <a 
          href="https://petanitembakau.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cursor-pointer"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <span>Aplikasi</span>
          <span 
            style={{ 
              marginLeft: '8px',
              backgroundColor: '#eab308',
              color: '#000',
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 700,
              display: 'inline-block'
            }}
          >
            development
          </span>
        </a>
      ),
    },
  ];

  return (
    <AntHeader 
      className={transparent ? "" : "shadow-md"}
      style={{ 
        backgroundColor: transparent ? 'rgba(0, 0, 0, 0.5)' : '#15803d',
        borderBottom: transparent ? 'none' : '3px solid #22c55e',
        position: transparent ? 'absolute' : 'relative',
        width: '100%',
        zIndex: 20,
        backdropFilter: transparent ? 'blur(10px)' : 'none',
        padding: '0 16px',
        height: 'auto',
        lineHeight: 'normal'
      }}
    >
      <div className="w-full flex items-center justify-between py-3 md:py-0" style={{ minHeight: '64px' }}>
        {/* Logo and Title */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <img src={appLogo} alt="Logo" className="h-8 md:h-10 object-contain flex-shrink-0" />
          <span className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
            <span className="hidden sm:inline">Profil Petani Tembakau Desa Klinter</span>
            <span className="sm:hidden">Desa Klinter</span>
          </span>
        </div>

        {/* Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '20px', color: '#fff' }} />}
          onClick={() => setDrawerVisible(true)}
          className="flex items-center justify-center"
          style={{ 
            border: 'none',
            background: 'transparent',
            padding: '4px 8px'
          }}
        />

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div className="flex items-center gap-2">
              <img src={appLogo} alt="Logo" className="h-8 object-contain" />
              <span className="text-base font-bold text-green-800">Menu</span>
            </div>
          }
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={280}
          styles={{
            header: {
              backgroundColor: '#dcfce7',
              borderBottom: '2px solid #16a34a'
            }
          }}
        >
          <Menu
            mode="vertical"
            items={menuItems}
            style={{ 
              backgroundColor: 'transparent',
              border: 'none'
            }}
            className="drawer-menu"
          />
        </Drawer>
      </div>
    </AntHeader>
  );
};

export default Header;
