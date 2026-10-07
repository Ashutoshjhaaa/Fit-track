import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useAppContext } from '../context/AppContext';

const CaloriesChart = () => {

    const { allActivityLogs, allFoodLogs } = useAppContext();

    const getData = () => {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });

            const dailyFood = allFoodLogs.filter(log => (log.date === dateString || log.createdAt?.split('T')[0] === dateString));
            const dailyActivity = allActivityLogs.filter(log => (log.date === dateString || log.createdAt?.split('T')[0] === dateString));

            const intake = dailyFood.reduce((sum, item) => sum + item.calories, 0);
            const burn = dailyActivity.reduce((sum, item) => sum + (item.calories || 0), 0);

            data.push({
                name: dayName,
                Intake: intake,
                Burn: burn,
                date: dateString
            });
        }
        return data;
    };

    const data = getData();

    return (
        <div className="w-full h-[300px] mt-4 select-none" style={{ minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8E8EA0', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8E8EA0', fontSize: 12 }} />
                    <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
                        contentStyle={{ 
                            backgroundColor: '#1C1D26', 
                            borderRadius: '12px', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            color: '#FFFFFF'
                        }} 
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', color: '#8E8EA0' }} />
                    <Bar dataKey="Intake" fill="#F2305A" radius={[4, 4, 0, 0]} barSize={12} name="Intake" />
                    <Bar dataKey="Burn" fill="#FF8552" radius={[4, 4, 0, 0]} barSize={12} name="Burn" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CaloriesChart;
