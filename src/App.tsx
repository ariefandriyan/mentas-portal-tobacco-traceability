import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, Row, Col, Divider } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Header from './components/Header';
import Home from './pages/Home';
import Farmers from './pages/Farmers';
import Plantations from './pages/Plantations';
import SupabaseTest from './components/SupabaseTest';
import appLogo from './assets/app_logo.PNG';
import ktngLogo from './assets/ktng_logo.PNG';
import supportLogo from './assets/support_logo.PNG';
import './App.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#16a34a',
          colorSuccess: '#22c55e',
          colorWarning: '#eab308',
          colorInfo: '#14b8a6',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Router>
        <Layout className="min-h-screen" style={{ backgroundColor: '#f0fdf4' }}>
          <Content style={{ backgroundColor: '#f0fdf4', padding: 0 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/farmers" element={
                <>
                  <Header />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Farmers />
                  </div>
                </>
              } />
              <Route path="/plantations" element={
                <>
                  <Header />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Plantations />
                  </div>
                </>
              } />
              <Route path="/test-supabase" element={
                <>
                  <Header />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <SupabaseTest />
                  </div>
                </>
              } />
            </Routes>
          </Content>
          <Footer 
            style={{ 
              backgroundColor: '#166534',
              padding: '48px 24px 24px',
              borderTop: '4px solid #22c55e'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <Row gutter={[32, 32]} className="mb-8">
                {/* About Section */}
                <Col xs={24} md={10}>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={appLogo} alt="App Logo" className="h-12 object-contain" />
                    <h3 className="text-xl font-bold text-white m-0">
                      Profil Petani Tembakau<br />Desa Klinter
                    </h3>
                  </div>
                  <p className="text-green-100 text-sm leading-relaxed">
                    Platform digital untuk dokumentasi dan monitoring aktivitas pertanian tembakau 
                    di Desa Klinter, Kecamatan Kejayan, Kabupaten Pasuruan, Jawa Timur.
                  </p>
                </Col>

                {/* Contact Section */}
                <Col xs={24} md={7}>
                  <h4 className="text-lg font-bold text-white mb-4">Kontak</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-green-100 text-sm">
                      <EnvironmentOutlined className="text-green-300 mt-1" />
                      <span>Desa Klinter, Kec. Kejayan<br />Kab. Pasuruan, Jawa Timur 67172</span>
                    </div>
                  </div>
                </Col>

                {/* Partners/Sponsors Section */}
                <Col xs={24} md={7}>
                  <h4 className="text-lg font-bold text-white mb-4">Didukung Oleh</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all">
                      <img src={ktngLogo} alt="KTNG Logo" className="h-12 object-contain" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all">
                      <img src={supportLogo} alt="Support Logo" className="h-12 object-contain" />
                    </div>
                  </div>
                </Col>
              </Row>

              <Divider style={{ borderColor: '#22c55e', opacity: 0.3, margin: '24px 0' }} />

              {/* Copyright */}
              <div className="text-center">
                <p className="text-green-200 text-sm m-0">
                  © {new Date().getFullYear()} MENTAS APPS. All rights reserved.
                </p>
                <p className="text-green-300 text-xs mt-2 m-0 opacity-75">
                  Dikembangkan dengan ❤️ untuk kemajuan pertanian tembakau Indonesia
                </p>
              </div>
            </div>
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
