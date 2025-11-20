import { Card, Tag, Progress } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import type { Plantation } from '../types/farmer';

interface PlantationCardProps {
  plantation: Plantation;
  farmerName?: string;
}

const PlantationCard = ({ plantation, farmerName }: PlantationCardProps) => {
  const getStatusColor = (status: Plantation['status']) => {
    switch (status) {
      case 'planting':
        return 'blue';
      case 'growing':
        return 'green';
      case 'harvesting':
        return 'orange';
      case 'harvested':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusProgress = (status: Plantation['status']) => {
    switch (status) {
      case 'planting':
        return 25;
      case 'growing':
        return 50;
      case 'harvesting':
        return 75;
      case 'harvested':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Card
      hoverable
      className="h-full"
      title={
        <div className="flex items-center justify-between">
          <span className="text-base">{plantation.location}</span>
          <Tag color={getStatusColor(plantation.status)}>
            {plantation.status.toUpperCase()}
          </Tag>
        </div>
      }
    >
      <div className="space-y-3">
        {farmerName && (
          <div className="text-gray-600">
            <strong>Farmer:</strong> {farmerName}
          </div>
        )}
        <div className="flex items-center text-gray-600">
          <EnvironmentOutlined className="mr-2" />
          <span>{plantation.size} hectares</span>
        </div>
        <div>
          <Tag color="green">{plantation.tobaccoVariety}</Tag>
          <Tag color="blue">{plantation.soilType}</Tag>
        </div>
        <div className="flex items-center text-gray-600">
          <CalendarOutlined className="mr-2" />
          <span className="text-sm">
            Planted: {new Date(plantation.plantingDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <CalendarOutlined className="mr-2" />
          <span className="text-sm">
            Expected Harvest: {new Date(plantation.expectedHarvestDate).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-sm text-gray-600 mb-2">Progress:</div>
          <Progress
            percent={getStatusProgress(plantation.status)}
            status="active"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
        <div className="text-sm text-gray-600">
          <strong>Irrigation:</strong> {plantation.irrigationType}
        </div>
      </div>
    </Card>
  );
};

export default PlantationCard;
