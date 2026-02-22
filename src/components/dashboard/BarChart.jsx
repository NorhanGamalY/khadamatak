import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const barData = [
  { name: 'القاهرة', users: 750 },
  { name: 'الإسكندرية', users: 300 },
  { name: 'المنصورة', users: 950 },
  { name: 'حلوان', users: 280 },
  { name: 'شرم الشيخ', users: 550 },
  { name: 'العلمين', users: 750 },
  { name: 'دمياط', users: 50 },
];

const RegionChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 m-5">
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{fontSize: 12}} />
          <YAxis tick={{fontSize: 12}} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Bar dataKey="users" fill="#293871" barSize={90} radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default RegionChart;