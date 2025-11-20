import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Header from './components/Header';
import Home from './pages/Home';
import Farmers from './pages/Farmers';
import Plantations from './pages/Plantations';
import SupabaseTest from './components/SupabaseTest';
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
            className="text-center"
            style={{ 
              backgroundColor: '#166534',
              color: '#f0fdf4',
              borderTop: '3px solid #22c55e'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <p className="mb-2 font-semibold">Profil Petani Tembakau Desa Klinter</p>
              <p className="text-sm opacity-90">
                Desa Klinter, Kecamatan Kejayan, Kabupaten Pasuruan ©{new Date().getFullYear()}
              </p>
            </div>
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
