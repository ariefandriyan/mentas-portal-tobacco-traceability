import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Descriptions } from 'antd';
import type { PetaniRekap } from '../services/petaniRekapService';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Legend Control Component
function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <div style="background: white; padding: 12px 16px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;">
          <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #15803d;">Varietas Tembakau</h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png" style="width: 16px; height: 26px;">
              <span style="font-size: 13px; color: #374151;">Paiton</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" style="width: 16px; height: 26px;">
              <span style="font-size: 13px; color: #374151;">Samporis</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png" style="width: 16px; height: 26px;">
              <span style="font-size: 13px; color: #374151;">Kasturi</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png" style="width: 16px; height: 26px;">
              <span style="font-size: 13px; color: #374151;">Campuran</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png" style="width: 16px; height: 26px;">
              <span style="font-size: 13px; color: #374151;">Lainnya</span>
            </div>
          </div>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

// Custom green marker icon
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom blue marker icon
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom yellow marker icon
const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom orange marker icon
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Function to get marker icon based on variety
const getMarkerIcon = (varietas: string | null): L.Icon => {
  if (!varietas) return greenIcon;
  
  const varietasLower = varietas.toLowerCase();
  
  // Paiton variants - Green
  if (varietasLower.includes('paiton')) {
    return greenIcon;
  }
  // Samporis variants - Blue
  else if (varietasLower.includes('samporis') || varietasLower.includes('samoris')) {
    return blueIcon;
  }
  // Kasturi - Red
  else if (varietasLower.includes('kasturi')) {
    return redIcon;
  }
  // Mixed varieties - Yellow
  else if (varietasLower.includes('dan') || varietasLower.includes(',')) {
    return yellowIcon;
  }
  // Other varieties - Orange
  else {
    return orangeIcon;
  }
};

interface MapProps {
  petaniData: PetaniRekap[];
}

// Component to set bounds
function SetBounds({ petaniData }: { petaniData: PetaniRekap[] }) {
  const map = useMap();

  useEffect(() => {
    if (petaniData.length > 0) {
      const validCoordinates = petaniData
        .filter(p => p.koordinat)
        .map(p => {
          const [lat, lng] = p.koordinat.split(',').map(c => parseFloat(c.trim()));
          return [lat, lng] as [number, number];
        })
        .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));

      if (validCoordinates.length > 0) {
        const bounds = L.latLngBounds(validCoordinates);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [petaniData, map]);

  return null;
}

const PetaniMap = ({ petaniData }: MapProps) => {
  // Default center (Desa Klinter coordinates)
  const defaultCenter: [number, number] = [-7.7361531, 112.8814121];

  // Parse coordinates
  const markers = petaniData
    .filter(petani => petani.koordinat)
    .map(petani => {
      const [lat, lng] = petani.koordinat.split(',').map(c => parseFloat(c.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        return { petani, position: [lat, lng] as [number, number] };
      }
      return null;
    })
    .filter(marker => marker !== null);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: '600px', width: '100%', borderRadius: '12px' }}
      className="shadow-lg"
    >
      {/* Google Maps Satellite Tile Layer */}
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
      />

      <SetBounds petaniData={petaniData} />

      {markers.map((marker, index) => (
        <Marker 
          key={index} 
          position={marker.position}
          icon={getMarkerIcon(marker.petani.varietas)}
        >
          <Popup maxWidth={400} className="custom-popup">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 rounded-t-lg">
              <h3 className="text-xl font-bold text-white mb-0">
                {marker.petani.nama}
              </h3>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto bg-white">
              <Descriptions column={1} size="small" className="mb-3" bordered>
                <Descriptions.Item label={<span className="font-semibold">Umur</span>}>
                  {marker.petani.umur} tahun
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">No. HP</span>}>
                  {marker.petani.nomor_hp || '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Jabatan</span>}>
                  {marker.petani.jabatan || '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Kelompok Tani</span>}>
                  {marker.petani.kelompok_tani || '-'}
                </Descriptions.Item>
              </Descriptions>

              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>📍</span> Alamat Petani
                </p>
                <p className="text-sm text-gray-600 mb-3 pl-6">{marker.petani.alamat_petani}</p>
                
                <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🌾</span> Alamat Lahan
                </p>
                <p className="text-sm text-gray-600 mb-3 pl-6">{marker.petani.alamat_lahan}</p>
              </div>

              <Descriptions column={1} size="small" className="mt-3" bordered>
                <Descriptions.Item label={<span className="font-semibold">Luas Lahan</span>}>
                  <span className="text-green-700 font-semibold">
                    {marker.petani.luas_lahan.toLocaleString('id-ID')} m² ({(marker.petani.luas_lahan / 10000).toFixed(2)} ha)
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Aksesibilitas</span>}>
                  {marker.petani.aksesibilitas || '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Varietas</span>}>
                  {marker.petani.varietas || '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Tanggal Tanam</span>}>
                  {formatDate(marker.petani.tanggal_tanam)}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Tanggal Panen</span>}>
                  {formatDate(marker.petani.tanggal_panen)}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Estimasi Panen</span>}>
                  {marker.petani.estimasi_panen || '-'}
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-semibold">Penggunaan Pestisida</span>}>
                  <span className="text-sm">{marker.petani.penggunaan_pestisida || '-'}</span>
                </Descriptions.Item>
              </Descriptions>

              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>💰</span> Informasi Pembeli
                </p>
                <Descriptions column={1} size="small" bordered>
                  <Descriptions.Item label={<span className="font-semibold">Sudah Ada Pembeli</span>}>
                    <span className={marker.petani.sudah_ada_pembeli?.toLowerCase().includes('ya') 
                      ? 'text-green-600 font-semibold' 
                      : 'text-gray-600'}>
                      {marker.petani.sudah_ada_pembeli || '-'}
                    </span>
                  </Descriptions.Item>
                  {marker.petani.nama_pembeli && (
                    <>
                      <Descriptions.Item label={<span className="font-semibold">Nama Pembeli</span>}>
                        {marker.petani.nama_pembeli}
                      </Descriptions.Item>
                      <Descriptions.Item label={<span className="font-semibold">Alamat Pembeli</span>}>
                        {marker.petani.alamat_pembeli || '-'}
                      </Descriptions.Item>
                      <Descriptions.Item label={<span className="font-semibold">No. HP Pembeli</span>}>
                        {marker.petani.no_hp_pembeli || '-'}
                      </Descriptions.Item>
                    </>
                  )}
                  <Descriptions.Item label={<span className="font-semibold">Est. Harga Jual/kg</span>}>
                    {marker.petani.estimasi_harga_jual_per_kilo 
                      ? <span className="text-green-700 font-semibold">
                          Rp {marker.petani.estimasi_harga_jual_per_kilo.toLocaleString('id-ID')}
                        </span>
                      : '-'}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      <Legend />
    </MapContainer>
  );
};

export default PetaniMap;
