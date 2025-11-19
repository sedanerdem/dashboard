import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Draggable } from '@hello-pangea/dnd';
import { X, GripVertical } from 'lucide-react';

const TaskCard = ({ task, index, deleteTask, updateTask }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(task.content);
    const [editTags, setEditTags] = useState(task.tags || []);
    const [newTag, setNewTag] = useState('');

    const handleSave = () => {
        if (!editContent.trim()) return;
        updateTask(task.id, editContent, editTags);
        setIsEditing(false);
    };

    const addTag = () => {
        if (newTag.trim() && !editTags.includes(newTag.trim())) {
            setEditTags([...editTags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setEditTags(editTags.filter(tag => tag !== tagToRemove));
    };

    if (isEditing) {
        return (
            <div style={{
                background: 'var(--bg-app)',
                padding: '16px',
                border: '1px solid var(--accent-primary)',
                marginBottom: '16px',
                boxShadow: 'var(--shadow-glow)',
            }}>
                <textarea
                    autoFocus
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input-glass"
                    style={{
                        width: '100%',
                        resize: 'none',
                        marginBottom: '12px',
                        minHeight: '60px'
                    }}
                />

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        {editTags.map(tag => (
                            <span key={tag} style={{
                                fontSize: '10px',
                                padding: '2px 6px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontFamily: 'var(--font-mono)'
                            }}>
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--accent-primary)',
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex'
                                    }}
                                >
                                    <X size={10} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                        placeholder="ADD_TAG..."
                        className="input-glass"
                        style={{
                            width: '100%',
                            fontSize: '12px',
                            padding: '6px 8px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '6px' }}
                    >
                        SAVE
                    </button>
                    <button
                        onClick={() => {
                            setEditContent(task.content);
                            setEditTags(task.tags || []);
                            setIsEditing(false);
                        }}
                        className="btn btn-ghost"
                        style={{ flex: 1, padding: '6px' }}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => {
                const child = (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            setEditContent(task.content);
                            setEditTags(task.tags || []);
                            setIsEditing(true);
                        }}
                        style={{
                            background: snapshot.isDragging ? 'var(--bg-app)' : 'rgba(255, 255, 255, 0.02)',
                            padding: '16px',
                            marginBottom: '16px',
                            boxShadow: snapshot.isDragging
                                ? 'var(--shadow-glow)'
                                : 'none',
                            cursor: 'grab',
                            border: '1px solid',
                            borderColor: isHovered ? 'var(--accent-primary)' : 'var(--border-color)',
                            color: 'var(--text-primary)',
                            transition: 'all 0.2s',
                            position: 'relative',
                            ...provided.draggableProps.style
                        }}
                    >
                        {/* Decoration Corner */}
                        <div style={{
                            position: 'absolute',
                            top: '-1px',
                            left: '-1px',
                            width: '8px',
                            height: '8px',
                            borderTop: '2px solid var(--accent-primary)',
                            borderLeft: '2px solid var(--accent-primary)',
                            opacity: isHovered ? 1 : 0.3,
                            transition: 'opacity 0.2s'
                        }} />

                        <div style={{
                            fontSize: '13px',
                            lineHeight: '1.5',
                            paddingRight: '20px',
                            marginBottom: '12px'
                        }}>
                            {task.content}
                        </div>

                        {isHovered && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask();
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--neon-red)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                <X size={14} />
                            </button>
                        )}

                        {task.tags && task.tags.length > 0 && (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {task.tags.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '9px',
                                        padding: '2px 6px',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-secondary)',
                                        fontFamily: 'var(--font-mono)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Drag Handle Visual */}
                        <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            opacity: 0.2
                        }}>
                            <GripVertical size={12} />
                        </div>
                    </div>
                );

                if (snapshot.isDragging) {
                    return createPortal(child, document.body);
                }

                return child;
            }}
        </Draggable>
    );
};

export default TaskCard;
