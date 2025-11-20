import { useState, useEffect } from 'react';
import { Row, Col, Statistic, Card, Spin, FloatButton, Input, Select, Slider } from 'antd';
import { UserOutlined, EnvironmentOutlined, GoldOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';
import { usePetaniRekap } from '../hooks/usePetaniRekap';
import type { PetaniRekap } from '../services/petaniRekapService';
import bgImage from '../assets/bg_image.PNG';
import appLogo from '../assets/app_logo.PNG';
import ktngLogo from '../assets/ktng_logo.PNG';
import supportLogo from '../assets/support_logo.PNG';
import Header from '../components/Header';
import PetaniMap from '../components/PetaniMap';
import PetaniRekapCard from '../components/PetaniRekapCard';
import PetaniDetailModal from '../components/PetaniDetailModal';

const Home = () => {
  const { petaniRekap, loading } = usePetaniRekap();
  const [selectedPetani, setSelectedPetani] = useState<PetaniRekap | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVarietas, setSelectedVarietas] = useState<string | undefined>(undefined);
  const [luasLahanRange, setLuasLahanRange] = useState<[number, number]>([0, 10]); // in hectares

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hitung total petani
  const totalPetani = petaniRekap.length;

  // Hitung total luas lahan (konversi dari m2 ke hektar: 1 hektar = 10,000 m2)
  const totalLuasLahanHektar = petaniRekap.reduce((sum: number, petani: PetaniRekap) => {
    return sum + (petani.luas_lahan / 10000);
  }, 0);

  // Hitung lahan aktif (yang sudah ada tanggal tanam)
  const lahanAktif = petaniRekap.filter((p: PetaniRekap) => p.tanggal_tanam !== null).length;

  // Get unique varietas for filter options
  const varietasOptions = Array.from(new Set(petaniRekap.map(p => p.varietas).filter(Boolean)))
    .map(v => ({ label: v, value: v }));

  // Filter petani based on search and filters
  const filteredPetaniRekap = petaniRekap.filter((petani) => {
    // Search filter (nama, alamat, kelompok tani)
    const matchesSearch = searchQuery === '' || 
      petani.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      petani.alamat_petani?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      petani.kelompok_tani?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Varietas filter
    const matchesVarietas = !selectedVarietas || petani.varietas === selectedVarietas;
    
    // Luas lahan filter (convert m² to hectare)
    const luasHektar = petani.luas_lahan / 10000;
    const matchesLuasLahan = luasHektar >= luasLahanRange[0] && luasHektar <= luasLahanRange[1];
    
    return matchesSearch && matchesVarietas && matchesLuasLahan;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" tip="Memuat data..." />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Full Width with Header */}
      <div 
        id="home"
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Header dengan background transparan */}
        <Header transparent />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-end px-8 md:px-16 lg:px-24 py-20" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="max-w-2xl text-right">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-2xl leading-tight">
              PROFIL DESA KLINTER
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg text-white/95 leading-relaxed drop-shadow-lg">
              Desa Klinter adalah salah satu desa di Kecamatan Kejayan, Kabupaten Pasuruan, Jawa Timur, dengan kode pos 67172. 
              Luas wilayah desa ini sekitar 2,04 km², dan jumlah penduduk mencapai 2.177 jiwa. Desa Klinter dikenal sebagai 
              salah satu pusat penghasil tembakau di Kabupaten Pasuruan. Di desa ini terdapat beberapa kelompok tani tembakau, 
              seperti Kelompok Tani Jaya, Tani Subur, dan Tani Makmur.
            </p>
          </div>
        </div>

        {/* Logo Section - Bottom Left */}
        <div className="absolute bottom-8 left-8 flex items-center gap-4 z-10">
          <div className="rounded-lg p-3 shadow-xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <img src={appLogo} alt="App Logo" className="h-12 md:h-16 object-contain" />
          </div>
          <div className="rounded-lg p-3 shadow-xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <img src={ktngLogo} alt="KTNG Logo" className="h-12 md:h-16 object-contain" />
          </div>
          <div className="rounded-lg p-3 shadow-xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <img src={supportLogo} alt="Support" className="h-12 md:h-16 object-contain" />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Statistics Cards */}
      <div id="statistik" className="scroll-mt-20">
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card 
            className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
            style={{ backgroundColor: '#dcfce7', borderTop: '4px solid #16a34a' }}
          >
            <Statistic
              title={<span className="text-base font-semibold text-green-900">Total Petani</span>}
              value={totalPetani}
              prefix={<UserOutlined style={{ color: '#16a34a' }} />}
              valueStyle={{ color: '#15803d', fontSize: '2.5rem', fontWeight: 'bold' }}
            />
            <div className="mt-2 text-sm text-green-800">Petani Terdaftar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
            style={{ backgroundColor: '#d1fae5', borderTop: '4px solid #059669' }}
          >
            <Statistic
              title={<span className="text-base font-semibold text-green-900">Total Luas Lahan</span>}
              value={totalLuasLahanHektar.toFixed(2)}
              suffix="hektar"
              prefix={<EnvironmentOutlined style={{ color: '#059669' }} />}
              valueStyle={{ color: '#047857', fontSize: '2.5rem', fontWeight: 'bold' }}
            />
            <div className="mt-2 text-sm text-green-800">Area Perkebunan</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
            style={{ backgroundColor: '#bbf7d0', borderTop: '4px solid #22c55e' }}
          >
            <Statistic
              title={<span className="text-base font-semibold text-green-900">Lahan Aktif</span>}
              value={lahanAktif}
              prefix={<GoldOutlined style={{ color: '#22c55e' }} />}
              valueStyle={{ color: '#16a34a', fontSize: '2.5rem', fontWeight: 'bold' }}
            />
            <div className="mt-2 text-sm text-green-800">Sedang Bercocok Tanam</div>
          </Card>
        </Col>
      </Row>

      {/* About Section */}
      <div className="mt-12">
      <Card 
        className="shadow-lg border-0"
        style={{ backgroundColor: '#ffffff' }}
        title={
          <span className="text-2xl font-bold" style={{ color: '#15803d' }}>
            Tentang Desa Kami
          </span>
        }
      >
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-base mb-4">
            Desa Klinter memiliki sejarah panjang dalam budidaya tembakau yang telah berlangsung selama beberapa generasi. 
            Para petani kami berdedikasi untuk menghasilkan tembakau berkualitas tinggi dengan menerapkan praktik pertanian 
            yang berkelanjutan dan ramah lingkungan. Dengan memadukan pengetahuan tradisional dan teknik pertanian modern, 
            kami memastikan hasil panen terbaik sambil menjaga kelestarian tanah untuk generasi mendatang.
          </p>
          <p className="text-gray-700 leading-relaxed text-base">
            Setiap petani dalam komunitas kami membawa keahlian unik dan berkontribusi pada kesuksesan kolektif desa. 
            Dari lahan keluarga kecil hingga operasi yang lebih besar, setiap perkebunan memainkan peran vital dalam 
            ekosistem pertanian kami. Kami bangga dengan varietas tembakau lokal seperti Paiton, Samporis, dan Kasturi 
            yang telah menjadi kebanggaan Desa Klinter.
          </p>
        </div>
      </Card>
      </div>

      {/* Features Grid */}
      <Row gutter={[24, 24]} className="mt-8">
        <Col xs={24} md={8}>
          <Card 
            className="text-center h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1"
            style={{ backgroundColor: '#dcfce7' }}
          >
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#15803d' }}>
              Praktik Berkelanjutan
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Kami memprioritaskan metode pertanian ramah lingkungan untuk memastikan keberlanjutan jangka panjang 
              dan kualitas tanah yang terjaga.
            </p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            className="text-center h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1"
            style={{ backgroundColor: '#d1fae5' }}
          >
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#047857' }}>
              Produk Berkualitas
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tembakau kami memenuhi standar kualitas tertinggi melalui kultivasi yang cermat dan proses pengolahan 
              yang teliti.
            </p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            className="text-center h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:-translate-y-1"
            style={{ backgroundColor: '#bbf7d0' }}
          >
            <div className="text-5xl mb-4">👨‍🌾</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#16a34a' }}>
              Petani Berpengalaman
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Puluhan tahun pengalaman dan dedikasi menjadikan petani kami sebagai tulang punggung komunitas dan 
              penjaga tradisi pertanian.
            </p>
          </Card>
        </Col>
      </Row>
      </div>

      {/* Map Section */}
      <div id="peta" className="scroll-mt-20">
      <Card 
        className="shadow-lg border-0 mt-8"
        style={{ backgroundColor: '#ffffff' }}
        title={
          <span className="text-2xl font-bold" style={{ color: '#15803d' }}>
            🗺️ Peta Lahan Petani Tembakau Desa Klinter
          </span>
        }
      >
        <p className="text-gray-600 mb-4">
          Klik pada marker untuk melihat detail informasi petani dan lahan mereka
        </p>
        
        {/* Legend */}
        {/* <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-700 mb-3">Legenda Varietas:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <span className="text-sm text-gray-700">Paiton</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-700">Samporis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <span className="text-sm text-gray-700">Kasturi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700">Campuran</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-700">Lainnya</span>
            </div>
          </div>
        </div> */}

        <PetaniMap petaniData={petaniRekap} />
      </Card>
      </div>

      {/* Daftar Petani Section */}
      <div id="petani" className="scroll-mt-20">
      <Card 
        className="shadow-lg border-0 mt-8"
        style={{ backgroundColor: '#ffffff' }}
        title={
          <span className="text-2xl font-bold" style={{ color: '#15803d' }}>
            👨‍🌾 Daftar Petani Tembakau Desa Klinter
          </span>
        }
      >
        {/* <p className="text-gray-600 mb-6">
          Klik pada kartu petani untuk melihat informasi lengkap
        </p> */}
        
        {/* Search and Filter Section */}
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <Row gutter={[16, 16]}>
            {/* Search Input */}
            <Col xs={24} md={8}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Cari Petani
              </label>
              <Input
                placeholder="Cari nama, alamat, atau kelompok tani..."
                prefix={<SearchOutlined style={{ color: '#16a34a' }} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                size="large"
              />
            </Col>

            {/* Varietas Filter */}
            <Col xs={24} md={8}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🌱 Filter Varietas
              </label>
              <Select
                placeholder="Semua Varietas"
                value={selectedVarietas}
                onChange={setSelectedVarietas}
                allowClear
                size="large"
                style={{ width: '100%' }}
                options={[
                  { label: 'Semua Varietas', value: undefined },
                  ...varietasOptions
                ]}
              />
            </Col>

            {/* Luas Lahan Range Filter */}
            <Col xs={24} md={8}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📏 Luas Lahan: {luasLahanRange[0]} - {luasLahanRange[1]} ha
              </label>
              <Slider
                range
                min={0}
                max={10}
                step={0.1}
                value={luasLahanRange}
                onChange={(value) => setLuasLahanRange(value as [number, number])}
                tooltip={{ formatter: (value) => `${value} ha` }}
                styles={{
                  track: { backgroundColor: '#16a34a' },
                  tracks: { backgroundColor: '#16a34a' }
                }}
              />
            </Col>
          </Row>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Menampilkan <span className="font-bold text-green-700">{filteredPetaniRekap.length}</span> dari {petaniRekap.length} petani
            </span>
          </div>
        </div>
        
        <Row gutter={[24, 24]}>
          {filteredPetaniRekap.map((petani) => (
            <Col xs={24} sm={12} md={8} lg={6} key={petani.id}>
              <PetaniRekapCard 
                petani={petani} 
                onClick={() => {
                  setSelectedPetani(petani);
                  setModalVisible(true);
                }}
              />
            </Col>
          ))}
        </Row>
      </Card>
      </div>

      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <FloatButton
          icon={<UpOutlined />}
          type="primary"
          style={{
            right: 24,
            bottom: 24,
            backgroundColor: '#16a34a',
            width: 50,
            height: 50
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Detail Modal */}
      <PetaniDetailModal
        petani={selectedPetani}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPetani(null);
        }}
      />
    </div>
  );
};

export default Home;
