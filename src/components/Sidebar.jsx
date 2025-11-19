import React from 'react';
import { LayoutDashboard, KanbanSquare, BarChart3, Calendar, Users, Settings, Hexagon, Sun, Moon } from 'lucide-react';

const Sidebar = ({ onThemeChange, onModeChange, currentMode, currentView, onViewChange }) => {
    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: 'DASHBOARD' },
        { id: 'kanban', icon: <KanbanSquare size={18} />, label: 'KANBAN' },
        { id: 'analytics', icon: <BarChart3 size={18} />, label: 'ANALYTICS' },
        { id: 'calendar', icon: <Calendar size={18} />, label: 'CALENDAR' },
        { id: 'team', icon: <Users size={18} />, label: 'TEAM' },
        { id: 'system', icon: <Settings size={18} />, label: 'SYSTEM' },
    ];

    const themes = [
        { name: 'Cyan', color: 'var(--neon-cyan)', value: 'var(--neon-cyan)' },
        { name: 'Purple', color: 'var(--neon-purple)', value: 'var(--neon-purple)' },
        { name: 'Red', color: 'var(--neon-red)', value: 'var(--neon-red)' },
        { name: 'Green', color: 'var(--neon-green)', value: 'var(--neon-green)' },
        { name: 'Yellow', color: 'var(--neon-yellow)', value: 'var(--neon-yellow)' },
    ];

    return (
        <div style={{
            width: '280px',
            background: 'var(--bg-sidebar)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
            height: '100%',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Logo */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '60px',
                paddingLeft: '8px'
            }}>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Hexagon size={32} color="var(--accent-primary)" strokeWidth={1.5} />
                    <div style={{
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        background: 'var(--accent-primary)',
                        boxShadow: '0 0 10px var(--accent-primary)'
                    }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        letterSpacing: '2px',
                        fontFamily: 'var(--font-mono)',
                        textShadow: '0 0 10px rgba(0, 243, 255, 0.3)'
                    }}>
                        LEGION
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '1px' }}>OS v2.0</span>
                </div>
            </div>

            {/* Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: 'auto' }}>
                {menuItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'dashboard' || item.id === 'kanban') {
                                    onViewChange(item.id);
                                }
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '14px 16px',
                                cursor: 'pointer',
                                background: isActive ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)' : 'transparent',
                                borderLeft: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                transition: 'all 0.3s',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Theme Switcher */}
            <div style={{ marginBottom: '32px', paddingLeft: '16px' }}>
                <div style={{
                    fontSize: '10px',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '1px'
                }}>
                    // SYSTEM_THEME
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    {themes.map((theme) => (
                        <div
                            key={theme.name}
                            onClick={() => onThemeChange(theme.value)}
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '2px',
                                background: theme.color,
                                cursor: 'pointer',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.2s',
                                boxShadow: '0 0 5px ' + theme.color
                            }}
                            title={theme.name}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.2)';
                                e.currentTarget.style.boxShadow = '0 0 10px ' + theme.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 0 5px ' + theme.color;
                            }}
                        />
                    ))}
                </div>

                <div style={{
                    fontSize: '10px',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '1px'
                }}>
                    // VISUAL_MODE
                </div>
                <div style={{ display: 'flex', background: 'var(--bg-panel)', border: '1px solid var(--border-color)', padding: '2px', borderRadius: '4px' }}>
                    <button
                        onClick={() => onModeChange('dark')}
                        style={{
                            flex: 1,
                            background: currentMode === 'dark' ? 'var(--accent-primary)' : 'transparent',
                            color: currentMode === 'dark' ? '#000' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '6px',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.3s'
                        }}
                    >
                        <Moon size={12} /> DARK
                    </button>
                    <button
                        onClick={() => onModeChange('light')}
                        style={{
                            flex: 1,
                            background: currentMode === 'light' ? 'var(--accent-primary)' : 'transparent',
                            color: currentMode === 'light' ? '#fff' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '6px',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.3s'
                        }}
                    >
                        <Sun size={12} /> LIGHT
                    </button>
                </div>
            </div>

            {/* Bottom User Profile (Mock) */}
            <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--bg-panel)',
                        border: '1px solid var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{ width: '32px', height: '32px', background: '#fff' }} />
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>COMMANDER</div>
                        <div style={{ fontSize: '10px', color: 'var(--accent-primary)' }}>LEVEL 99</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
