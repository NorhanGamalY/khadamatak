import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'السبت', uv: 250 },
  { name: 'الأحد', uv: 650 },
  { name: 'الاثنين', uv: 200 },
  { name: 'الثلاثاء', uv: 800 },
  { name: 'الأربعاء', uv: 400 },
  { name: 'الخميس', uv: 600 },
  { name: 'الجمعة', uv: 900 },
];

const MyChart = () => (
    
  <div className="bg-white p-4 m-5 rounded-xl shadow-sm border border-gray-100">
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{fontSize: 12}} />
          <YAxis tick={{fontSize: 12}} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="uv" 
            stroke="#8b5cf6"
            strokeWidth={2} 
            dot={{ r: 4 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default MyChart;