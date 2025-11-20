import { Card, Avatar, Button } from 'antd';
import { UserOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import type { PetaniRekap } from '../services/petaniRekapService';

interface PetaniRekapCardProps {
  petani: PetaniRekap;
  onClick: () => void;
}

const PetaniRekapCard = ({ petani, onClick }: PetaniRekapCardProps) => {
  // Generate avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      '#16a34a', '#15803d', '#047857', '#059669', '#10b981', 
      '#14b8a6', '#0d9488', '#0891b2', '#0284c7', '#2563eb'
    ];
    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors[charCode % colors.length];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Format luas lahan to hectare
  const luasLahanHektar = (petani.luas_lahan / 10000).toFixed(2);

  return (
    <Card
      hoverable
      className="shadow-md hover:shadow-xl transition-all duration-300 border-0 h-full flex flex-col"
      style={{ backgroundColor: '#ffffff' }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <Avatar
          size={80}
          icon={<UserOutlined />}
          style={{
            backgroundColor: getAvatarColor(petani.nama),
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}
        >
          {getInitials(petani.nama)}
        </Avatar>

        {/* Nama Petani */}
        <h3 className="text-lg font-bold text-center mb-1" style={{ color: '#15803d' }}>
          {petani.nama}
        </h3>

        {/* Varietas */}
        <div className="mb-3">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: '#dcfce7',
              color: '#15803d'
            }}
          >
            {petani.varietas || 'Tidak ada data'}
          </span>
        </div>

        {/* Info Singkat */}
        <div className="w-full space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <EnvironmentOutlined style={{ color: '#16a34a' }} />
            <span>{luasLahanHektar} ha</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <PhoneOutlined style={{ color: '#16a34a' }} />
            <span>{petani.nomor_hp || '-'}</span>
          </div>
        </div>

        {/* Button Lihat Detail */}
        <Button
          type="primary"
          block
          style={{
            backgroundColor: '#16a34a',
            borderColor: '#16a34a',
            fontWeight: '600'
          }}
          className="hover:bg-green-700 hover:border-green-700"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Lihat Detail
        </Button>
      </div>
    </Card>
  );
};

export default PetaniRekapCard;
