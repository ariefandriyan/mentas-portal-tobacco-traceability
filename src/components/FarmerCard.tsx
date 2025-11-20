import { Card, Tag, Avatar } from 'antd';
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { Farmer } from '../types/farmer';

interface FarmerCardProps {
  farmer: Farmer;
}

const FarmerCard = ({ farmer }: FarmerCardProps) => {
  return (
    <Card
      hoverable
      className="h-full"
      cover={
        <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          {farmer.photo ? (
            <img
              alt={farmer.name}
              src={farmer.photo}
              className="h-full w-full object-cover"
            />
          ) : (
            <Avatar size={100} icon={<UserOutlined />} />
          )}
        </div>
      }
    >
      <Card.Meta
        title={<span className="text-lg font-semibold">{farmer.name}</span>}
        description={
          <div className="space-y-2 mt-2">
            <div className="flex items-center text-gray-600">
              <UserOutlined className="mr-2" />
              <span>{farmer.age} years old • {farmer.experience} years experience</span>
            </div>
            <div className="flex items-center text-gray-600">
              <EnvironmentOutlined className="mr-2" />
              <span>{farmer.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <PhoneOutlined className="mr-2" />
              <span>{farmer.phone}</span>
            </div>
            <div className="mt-3">
              <Tag color="green">{farmer.landSize} hectares</Tag>
              <Tag color="blue">{farmer.tobaccoVariety}</Tag>
            </div>
            {farmer.certifications && farmer.certifications.length > 0 && (
              <div className="mt-2">
                {farmer.certifications.map((cert, index) => (
                  <Tag key={index} color="gold" className="mt-1">
                    {cert}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default FarmerCard;
