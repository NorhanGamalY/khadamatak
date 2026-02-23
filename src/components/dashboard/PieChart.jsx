import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const pieData = [
    { name: 'تجارة', value: 50, color: '#8979FF' },
    { name: 'سباكة', value: 20, color: '#FF928A' },
    { name: 'نقاشه', value: 5, color: '#537FF1' },
    { name: 'كهرباء', value: 5, color: '#3CC3DF' },
    { name: 'زراعة', value: 5, color: '#FFAE4C' },
    { name: 'فني تكييف', value: 15, color: '#6FD195' },
];

const ServicesChart = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 m-5 ">
        <div className="h-64 ">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%" cy="50%"
                        innerRadius={0}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend align="center" verticalAlign="bottom" iconType="circle" iconSize={10}
                        formatter={(value) => (
                            <span className="text-gray-700 px-1 font-medium">
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);
export default ServicesChart;