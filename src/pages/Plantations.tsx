import { Row, Col, Input, Select, Tag, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import PlantationCard from '../components/PlantationCard';
import { usePlantations } from '../hooks/usePlantations';
import { useFarmers } from '../hooks/useFarmers';
import type { Plantation } from '../types/farmer';

const { Search } = Input;
const { Option } = Select;

const Plantations = () => {
  const { plantations, loading: loadingPlantations, error: plantationsError } = usePlantations();
  const { farmers, loading: loadingFarmers } = useFarmers();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPlantations = useMemo(() => {
    return plantations.filter((plantation: Plantation) => {
      const matchesSearch =
        plantation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantation.tobaccoVariety.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantation.soilType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus =
        statusFilter === 'all' || plantation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [plantations, searchTerm, statusFilter]);

  const getFarmerName = (farmerId: string) => {
    const farmer = farmers.find((f: { id: string }) => f.id === farmerId);
    return farmer?.name || 'Unknown';
  };

  const statusCounts = useMemo(() => ({
    all: plantations.length,
    planting: plantations.filter((p: Plantation) => p.status === 'planting').length,
    growing: plantations.filter((p: Plantation) => p.status === 'growing').length,
    harvesting: plantations.filter((p: Plantation) => p.status === 'harvesting').length,
    harvested: plantations.filter((p: Plantation) => p.status === 'harvested').length,
  }), [plantations]);

  if (loadingPlantations || loadingFarmers) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" tip="Loading plantations..." />
      </div>
    );
  }

  if (plantationsError) {
    return (
      <Alert
        message="Error"
        description={plantationsError.message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Plantations</h1>
        <p className="text-gray-600 mb-6">
          Track all tobacco plantations and their current status
        </p>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} md={16}>
            <Search
              placeholder="Search by location, variety, or soil type..."
              prefix={<SearchOutlined />}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
            >
              <Option value="all">All Status ({statusCounts.all})</Option>
              <Option value="planting">Planting ({statusCounts.planting})</Option>
              <Option value="growing">Growing ({statusCounts.growing})</Option>
              <Option value="harvesting">Harvesting ({statusCounts.harvesting})</Option>
              <Option value="harvested">Harvested ({statusCounts.harvested})</Option>
            </Select>
          </Col>
        </Row>

        <div className="flex flex-wrap gap-2 mb-4">
          <Tag
            color={statusFilter === 'all' ? 'blue' : 'default'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('all')}
          >
            All ({statusCounts.all})
          </Tag>
          <Tag
            color={statusFilter === 'planting' ? 'blue' : 'default'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('planting')}
          >
            Planting ({statusCounts.planting})
          </Tag>
          <Tag
            color={statusFilter === 'growing' ? 'green' : 'default'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('growing')}
          >
            Growing ({statusCounts.growing})
          </Tag>
          <Tag
            color={statusFilter === 'harvesting' ? 'orange' : 'default'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('harvesting')}
          >
            Harvesting ({statusCounts.harvesting})
          </Tag>
          <Tag
            color={statusFilter === 'harvested' ? 'default' : 'default'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('harvested')}
          >
            Harvested ({statusCounts.harvested})
          </Tag>
        </div>

        <div className="text-gray-600">
          Showing {filteredPlantations.length} plantation{filteredPlantations.length !== 1 ? 's' : ''}
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {filteredPlantations.map((plantation: Plantation) => (
          <Col xs={24} sm={12} lg={8} key={plantation.id}>
            <PlantationCard
              plantation={plantation}
              farmerName={getFarmerName(plantation.farmerId)}
            />
          </Col>
        ))}
      </Row>

      {filteredPlantations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No plantations found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Plantations;
