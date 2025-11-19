import React from 'react';
import { CheckCircle2, Circle, Clock, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon, trend }) => (
    <div style={{
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.05) 50%)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '1px'
            }}>
                {title}
            </div>
            <div style={{ color: 'var(--accent-primary)' }}>
                {icon}
            </div>
        </div>

        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {value}
        </div>

        {trend && (
            <div style={{ fontSize: '12px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={12} /> {trend}
            </div>
        )}
    </div>
);

const Dashboard = ({ data }) => {
    const totalTasks = Object.keys(data.tasks).length;
    const columns = Object.values(data.columns);

    // Calculate stats
    const tasksByColumn = columns.map(col => ({
        name: col.title,
        count: col.taskIds.length,
        percentage: totalTasks > 0 ? Math.round((col.taskIds.length / totalTasks) * 100) : 0
    }));

    return (
        <div style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '32px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '2px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <Activity color="var(--accent-primary)" /> SYSTEM_OVERVIEW
            </h1>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '48px'
            }}>
                <StatCard
                    title="TOTAL_ENTITIES"
                    value={totalTasks}
                    icon={<Circle size={24} />}
                    trend="+12% this week"
                />
                {tasksByColumn.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.name.toUpperCase()}
                        value={stat.count}
                        icon={<CheckCircle2 size={24} />}
                        trend={`${stat.percentage}% of total`}
                    />
                ))}
            </div>

            {/* Progress Widget */}
            <div style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-color)',
                padding: '32px',
                marginBottom: '32px'
            }}>
                <h2 style={{
                    fontSize: '16px',
                    marginBottom: '24px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)'
                }}>
                    // SECTOR_DISTRIBUTION
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {tasksByColumn.map((stat, index) => (
                        <div key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                                <span style={{ color: 'var(--text-primary)' }}>{stat.name}</span>
                                <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{stat.percentage}%</span>
                            </div>
                            <div style={{
                                height: '8px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${stat.percentage}%`,
                                    background: 'var(--accent-primary)',
                                    boxShadow: '0 0 10px var(--accent-primary)',
                                    transition: 'width 1s ease-out'
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
