import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Alert, Card, Spin, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const SupabaseTest = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');
  const [farmersCount, setFarmersCount] = useState<number>(0);
  const [plantationsCount, setPlantationsCount] = useState<number>(0);

  const checkConnection = async () => {
    setStatus('checking');
    setError('');

    try {
      // Test farmers table
      const { count: fCount, error: fError } = await supabase
        .from('farmers')
        .select('*', { count: 'exact', head: true });

      if (fError) throw fError;

      // Test plantations table
      const { count: pCount, error: pError } = await supabase
        .from('plantations')
        .select('*', { count: 'exact', head: true });

      if (pError) throw pError;

      setFarmersCount(fCount || 0);
      setPlantationsCount(pCount || 0);
      setStatus('connected');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setStatus('error');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card title="Supabase Connection Test" className="shadow-lg">
        {status === 'checking' && (
          <div className="text-center py-8">
            <Spin size="large" tip="Testing connection..." />
          </div>
        )}

        {status === 'connected' && (
          <Alert
            message="Connection Successful!"
            description={
              <div className="space-y-2">
                <p>✅ Successfully connected to Supabase</p>
                <p>📊 Found {farmersCount} farmers in database</p>
                <p>🌱 Found {plantationsCount} plantations in database</p>
              </div>
            }
            type="success"
            icon={<CheckCircleOutlined />}
            showIcon
          />
        )}

        {status === 'error' && (
          <div>
            <Alert
              message="Connection Failed"
              description={
                <div className="space-y-2">
                  <p>❌ Failed to connect to Supabase</p>
                  <p className="text-red-600 font-mono text-sm">{error}</p>
                  <div className="mt-4">
                    <strong>Troubleshooting:</strong>
                    <ul className="list-disc ml-5 mt-2">
                      <li>Check if .env file exists with correct credentials</li>
                      <li>Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY</li>
                      <li>Run supabase-schema.sql in Supabase SQL Editor</li>
                      <li>Restart development server after changing .env</li>
                    </ul>
                  </div>
                </div>
              }
              type="error"
              icon={<CloseCircleOutlined />}
              showIcon
            />
          </div>
        )}

        <div className="mt-4 text-center">
          <Button 
            icon={<ReloadOutlined />} 
            onClick={checkConnection}
            loading={status === 'checking'}
          >
            Test Again
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Database Information:</h3>
          <div className="space-y-1 text-sm font-mono">
            <p>URL: {import.meta.env.VITE_SUPABASE_URL || 'Not configured'}</p>
            <p>Anon Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Configured' : '✗ Missing'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupabaseTest;
