import { Modal, Descriptions, Tag, Avatar, Empty, Image, Button } from 'antd';
import { UserOutlined, EnvironmentOutlined, CompassOutlined } from '@ant-design/icons';
import type { PetaniRekap } from '../services/petaniRekapService';
import { useState } from 'react';

interface PetaniDetailModalProps {
  petani: PetaniRekap | null;
  visible: boolean;
  onClose: () => void;
}

const PetaniDetailModal = ({ petani, visible, onClose }: PetaniDetailModalProps) => {
  const [imageError, setImageError] = useState(false);

  if (!petani) return null;

  // Try to load farmer image
  const getFarmerImage = () => {
    try {
      // Use dynamic import for the image
      return new URL(`../assets/farmers/${petani.id}.jpeg`, import.meta.url).href;
    } catch (error) {
      return null;
    }
  };

  const farmerImageUrl = getFarmerImage();

  // Format date to Indonesian
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get avatar color and initials
  const getAvatarColor = (name: string) => {
    const colors = [
      '#16a34a', '#15803d', '#047857', '#059669', '#10b981', 
      '#14b8a6', '#0d9488', '#0891b2', '#0284c7', '#2563eb'
    ];
    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors[charCode % colors.length];
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const luasLahanHektar = (petani.luas_lahan / 10000).toFixed(2);

  // Parse koordinat to get lat/lng
  const parseKoordinat = (koordinat: string | null): [number, number] | null => {
    if (!koordinat) return null;
    
    // Try parsing formats like "-7.123, 112.456" or "-7.123,112.456"
    const coords = koordinat.split(',').map(c => parseFloat(c.trim()));
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      return [coords[0], coords[1]];
    }
    return null;
  };

  const position = parseKoordinat(petani.koordinat);

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="petani-detail-modal"
    >
      {/* Header with Avatar and Name */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-6 -mx-6 -mt-6 mb-4 rounded-t-lg">
        <div className="flex items-center gap-4">
          {farmerImageUrl && !imageError ? (
            <img
              src={farmerImageUrl}
              alt={petani.nama}
              className="rounded-full border-4 border-white shadow-lg"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <Avatar
              size={80}
              icon={<UserOutlined />}
              style={{
                backgroundColor: getAvatarColor(petani.nama),
                fontSize: '32px',
                fontWeight: 'bold',
                border: '3px solid white'
              }}
            >
              {getInitials(petani.nama)}
            </Avatar>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {petani.nama}
            </h2>
            <Tag color="green" className="text-sm font-semibold">
              {petani.varietas || 'Tidak ada data'}
            </Tag>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
        {/* Informasi Dasar */}
        <Descriptions 
          title={<span className="font-bold text-green-800">Informasi Dasar</span>}
          column={2} 
          bordered 
          size="small"
          className="mb-4"
        >
          <Descriptions.Item label={<span className="font-semibold">Nama Petani</span>} span={2}>
            {petani.nama}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Alamat</span>} span={2}>
            {petani.alamat_petani || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">No. HP</span>}>
            {petani.nomor_hp || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Varietas</span>}>
            {petani.varietas || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Kelompok Tani</span>}>
            {petani.kelompok_tani || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Jabatan</span>}>
            {petani.jabatan || '-'}
          </Descriptions.Item>
        </Descriptions>

        {/* Informasi Lahan */}
        <Descriptions 
          title={<span className="font-bold text-green-800">Informasi Lahan</span>}
          column={2} 
          bordered 
          size="small"
          className="mb-4"
        >
          <Descriptions.Item label={<span className="font-semibold">Luas Lahan</span>}>
            <span className="text-green-700 font-semibold">{luasLahanHektar} ha</span>
            <span className="text-gray-500 text-xs ml-2">({petani.luas_lahan} m²)</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Koordinat</span>}>
            {petani.koordinat || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Alamat Lahan</span>} span={2}>
            {petani.alamat_lahan || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Aksesibilitas</span>} span={2}>
            {petani.aksesibilitas || '-'}
          </Descriptions.Item>
        </Descriptions>

        {/* Informasi Penanaman */}
        <Descriptions 
          title={<span className="font-bold text-green-800">Informasi Penanaman</span>}
          column={2} 
          bordered 
          size="small"
          className="mb-4"
        >
          <Descriptions.Item label={<span className="font-semibold">Tanggal Tanam</span>}>
            {formatDate(petani.tanggal_tanam)}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Estimasi Panen</span>}>
            {petani.estimasi_panen || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={<span className="font-semibold">Penggunaan Pestisida</span>} span={2}>
            {petani.penggunaan_pestisida || '-'}
          </Descriptions.Item>
        </Descriptions>

        {/* Informasi Panen */}
        {petani.tanggal_panen && (
          <Descriptions 
            title={<span className="font-bold text-green-800">Informasi Panen</span>}
            column={1} 
            bordered 
            size="small"
            className="mb-4"
          >
            <Descriptions.Item label={<span className="font-semibold">Tanggal Panen</span>}>
              {formatDate(petani.tanggal_panen)}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Informasi Pembeli */}
        {petani.sudah_ada_pembeli === 'Ya' && petani.nama_pembeli && (
          <Descriptions 
            title={<span className="font-bold text-green-800">Informasi Pembeli</span>}
            column={2} 
            bordered 
            size="small"
            className="mb-4"
          >
            <Descriptions.Item label={<span className="font-semibold">Nama Pembeli</span>}>
              {petani.nama_pembeli}
            </Descriptions.Item>
            <Descriptions.Item label={<span className="font-semibold">No. HP Pembeli</span>}>
              {petani.no_hp_pembeli || '-'}
            </Descriptions.Item>
            <Descriptions.Item label={<span className="font-semibold">Alamat Pembeli</span>} span={2}>
              {petani.alamat_pembeli || '-'}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Estimasi Harga */}
        {petani.estimasi_harga_jual_per_kilo && (
          <Descriptions 
            title={<span className="font-bold text-green-800">Estimasi Harga</span>}
            column={1} 
            bordered 
            size="small"
            className="mb-4"
          >
            <Descriptions.Item label={<span className="font-semibold">Est. Harga Jual/kg</span>}>
              <span className="text-green-700 font-semibold">
                Rp {petani.estimasi_harga_jual_per_kilo.toLocaleString('id-ID')}
              </span>
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Dokumentasi Placeholder */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-solid border-green-200">
          <h4 className="font-bold text-green-800 mb-3">📸 Dokumentasi</h4>
          {farmerImageUrl && !imageError ? (
            <div className="flex justify-center">
              <Image
                src={farmerImageUrl}
                alt={`Dokumentasi ${petani.nama}`}
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
                className="rounded-lg shadow-md"
                onError={() => setImageError(true)}
                preview={{
                  mask: 'Klik untuk memperbesar'
                }}
              />
            </div>
          ) : (
            <Empty 
              description="Dokumentasi tidak tersedia"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="py-4"
            />
          )}
        </div>

        {/* Peta Lokasi Lahan */}
        <div className="mt-4">
          <h4 className="font-bold text-green-800 mb-3">📍 Lokasi Lahan</h4>
          {position ? (
            <div className="rounded-lg border-2 border-gray-200 shadow-sm bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <EnvironmentOutlined style={{ fontSize: '32px', color: '#16a34a' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Koordinat Lahan:</p>
                  <p className="font-mono font-semibold text-gray-800 text-lg">{petani.koordinat}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<EnvironmentOutlined />}
                  href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-auto py-3"
                  style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Lihat di Google Maps</span>
                    <span className="text-xs opacity-90">Buka lokasi di peta</span>
                  </div>
                </Button>
                
                <Button
                  type="default"
                  size="large"
                  icon={<CompassOutlined />}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-auto py-3"
                  style={{ borderColor: '#16a34a', color: '#16a34a' }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Petunjuk Arah</span>
                    <span className="text-xs opacity-75">Dari lokasi Anda</span>
                  </div>
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <EnvironmentOutlined className="text-green-600" />
                  <span>
                    <strong>Alamat:</strong> {petani.alamat_lahan || 'Tidak ada data'}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gray-100 rounded-lg border border-gray-300 text-center">
              <EnvironmentOutlined style={{ fontSize: '48px', color: '#9ca3af' }} />
              <p className="text-gray-500 mt-2">Koordinat lokasi tidak tersedia</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PetaniDetailModal;
