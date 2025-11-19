import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, X, Cpu } from 'lucide-react';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, addTask, deleteTask, deleteColumn, updateColumnTitle, updateTask, dragHandleProps }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(column.title);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const handleAdd = () => {
        if (!content.trim()) {
            setIsAdding(false);
            return;
        }
        addTask(column.id, content, tags);
        setContent('');
        setTags([]);
        setIsAdding(false);
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleTitleSubmit = () => {
        if (title.trim() !== column.title) {
            updateColumnTitle(column.id, title);
        }
        setIsEditingTitle(false);
    };

    return (
        <div style={{
            background: 'var(--bg-panel)',
            minWidth: '320px',
            width: '320px',
            padding: '0',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative',
            boxShadow: 'var(--shadow-void)'
        }}>
            {/* HUD Header Decoration */}
            <div style={{
                height: '4px',
                background: 'var(--accent-primary)',
                width: '60%',
                boxShadow: '0 0 10px var(--accent-primary)'
            }} />

            <div
                {...dragHandleProps}
                style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'grab',
                    borderBottom: '1px solid var(--border-color)',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)'
                }}
            >
                {isEditingTitle ? (
                    <input
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleTitleSubmit();
                            if (e.key === 'Escape') {
                                setTitle(column.title);
                                setIsEditingTitle(false);
                            }
                        }}
                        className="input-glass"
                        style={{ width: '100%' }}
                    />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Cpu size={16} color="var(--accent-primary)" />
                        <h2
                            onClick={() => setIsEditingTitle(true)}
                            style={{
                                margin: 0,
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontFamily: 'var(--font-mono)'
                            }}
                        >
                            {column.title}
                        </h2>
                        <span style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            padding: '2px 6px',
                            fontSize: '10px',
                            color: 'var(--accent-primary)',
                            fontFamily: 'var(--font-mono)'
                        }}>
                            {tasks.length}
                        </span>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this column?')) {
                                deleteColumn(column.id);
                            }
                        }}
                        className="btn-icon"
                        style={{ width: '28px', height: '28px' }}
                    >
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            background: snapshot.isDraggingOver ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                            transition: 'background 0.2s',
                        }}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                deleteTask={() => deleteTask(column.id, task.id)}
                                updateTask={updateTask}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
                {isAdding ? (
                    <div style={{ marginTop: 'auto' }}>
                        <textarea
                            autoFocus
                            placeholder="ENTER_TASK_DATA..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAdd();
                                }
                                if (e.key === 'Escape') {
                                    setIsAdding(false);
                                    setContent('');
                                    setTags([]);
                                }
                            }}
                            className="input-glass"
                            style={{
                                width: '100%',
                                resize: 'none',
                                marginBottom: '8px',
                                minHeight: '80px'
                            }}
                        />

                        {/* Tag Input Area */}
                        <div style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                                {tags.map((tag, index) => (
                                    <span key={index} style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid var(--accent-primary)',
                                        color: 'var(--accent-primary)',
                                        padding: '2px 8px',
                                        fontSize: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        fontWeight: '600',
                                        fontFamily: 'var(--font-mono)'
                                    }}>
                                        {tag}
                                        <button
                                            onClick={() => handleRemoveTag(tag)}
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
                                placeholder="ADD_TAGS [ENTER]"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && tagInput.trim()) {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                    if (e.key === 'Escape') {
                                        setTagInput('');
                                    }
                                }}
                                className="input-glass"
                                style={{
                                    width: '100%',
                                    fontSize: '10px',
                                    padding: '6px 8px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={handleAdd}
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                            >
                                INITIALIZE
                            </button>
                            <button
                                onClick={() => setIsAdding(false)}
                                className="btn btn-ghost"
                                style={{ flex: 1 }}
                            >
                                ABORT
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="btn btn-ghost"
                        style={{
                            width: '100%',
                            border: '1px dashed var(--border-color)',
                            color: 'var(--text-secondary)',
                            justifyContent: 'center'
                        }}
                    >
                        <Plus size={16} /> NEW_ENTRY
                    </button>
                )}
            </div>
        </div>
    );
};

export default Column;
