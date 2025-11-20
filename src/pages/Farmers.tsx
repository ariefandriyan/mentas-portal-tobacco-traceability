import { Row, Col, Input, Select, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import FarmerCard from '../components/FarmerCard';
import { useFarmers } from '../hooks/useFarmers';
import type { Farmer } from '../types/farmer';

const { Search } = Input;
const { Option } = Select;

const Farmers = () => {
  const { farmers, loading, error } = useFarmers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');

  const filteredFarmers = useMemo(() => {
    return farmers
      .filter((farmer: Farmer) =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.tobaccoVariety.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: Farmer, b: Farmer) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'experience':
            return b.experience - a.experience;
          case 'landSize':
            return b.landSize - a.landSize;
          default:
            return 0;
        }
      });
  }, [farmers, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" tip="Loading farmers..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Farmers</h1>
        <p className="text-gray-600 mb-6">
          Meet the dedicated farmers who make our village thrive
        </p>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} md={16}>
            <Search
              placeholder="Search by name, location, or tobacco variety..."
              prefix={<SearchOutlined />}
              size="large"
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              size="large"
              value={sortBy}
              onChange={setSortBy}
              className="w-full"
            >
              <Option value="name">Sort by Name</Option>
              <Option value="experience">Sort by Experience</Option>
              <Option value="landSize">Sort by Land Size</Option>
            </Select>
          </Col>
        </Row>

        <div className="text-gray-600 mb-4">
          Showing {filteredFarmers.length} farmer{filteredFarmers.length !== 1 ? 's' : ''}
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {filteredFarmers.map((farmer: Farmer) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={farmer.id}>
            <FarmerCard farmer={farmer} />
          </Col>
        ))}
      </Row>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No farmers found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Farmers;
