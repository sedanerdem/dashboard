import React from 'react';
import { Search, Bell, MessageSquare, Command } from 'lucide-react';

const TopBar = () => {
    return (
        <div style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-app)',
            position: 'relative'
        }}>
            {/* Decorative Line */}
            <div style={{
                position: 'absolute',
                bottom: '-1px',
                left: '32px',
                width: '100px',
                height: '1px',
                background: 'var(--accent-primary)',
                boxShadow: '0 0 10px var(--accent-primary)'
            }} />

            {/* Left: Breadcrumbs/Title */}
            <div>
                <div style={{
                    fontSize: '10px',
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '4px',
                    letterSpacing: '1px'
                }}>
            // SYSTEM.NAV
                </div>
                <h1 style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    Mission Control
                </h1>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                    <input
                        placeholder="SEARCH_DATABASE..."
                        className="input-glass"
                        style={{
                            paddingLeft: '44px',
                            width: '300px',
                            background: 'rgba(0, 243, 255, 0.03)'
                        }}
                    />
                    <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)' }} />
                    <div style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid var(--border-color)',
                        padding: '2px 6px'
                    }}>
                        <Command size={10} /> K
                    </div>
                </div>

                {/* Icons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-icon" style={{ position: 'relative' }}>
                        <Bell size={20} />
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '6px',
                            height: '6px',
                            background: 'var(--neon-red)',
                            boxShadow: '0 0 5px var(--neon-red)'
                        }} />
                    </button>
                    <button className="btn-icon">
                        <MessageSquare size={20} />
                    </button>
                </div>

                {/* User Profile HUD */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingLeft: '32px',
                    borderLeft: '1px solid var(--border-color)'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>OPERATOR</div>
                        <div style={{ fontSize: '10px', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>ONLINE</div>
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default TopBar;
