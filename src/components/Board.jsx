import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Column from './Column';

const Board = ({ data, onDragEnd, addTask, deleteTask, updateTask, addColumn, deleteColumn, updateColumnTitle }) => {
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState('');

    const handleAddColumn = () => {
        if (!newColumnTitle.trim()) return;
        addColumn(newColumnTitle);
        setNewColumnTitle('');
        setIsAddingColumn(false);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{
                display: 'flex',
                height: '100%',
                overflowX: 'auto',
                alignItems: 'flex-start',
                gap: '24px',
                paddingBottom: '24px'
            }}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ display: 'flex', height: '100%' }}
                        >
                            {data.columnOrder.map((columnId, index) => {
                                const column = data.columns[columnId];
                                const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                                return (
                                    <Draggable key={column.id} draggableId={column.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={{ ...provided.draggableProps.style, height: '100%', marginRight: '24px' }}
                                            >
                                                <Column
                                                    column={column}
                                                    tasks={tasks}
                                                    addTask={addTask}
                                                    deleteTask={deleteTask}
                                                    updateTask={updateTask}
                                                    deleteColumn={deleteColumn}
                                                    updateColumnTitle={updateColumnTitle}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <div style={{ minWidth: '300px' }}>
                    {isAddingColumn ? (
                        <div style={{
                            background: 'var(--bg-panel)',
                            padding: '16px',
                            border: '1px solid var(--accent-primary)',
                            boxShadow: '0 0 15px rgba(0, 243, 255, 0.1)',
                        }}>
                            <div style={{
                                fontSize: '12px',
                                color: 'var(--accent-primary)',
                                marginBottom: '8px',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '1px'
                            }}>
                                // NEW_SECTOR
                            </div>
                            <input
                                autoFocus
                                value={newColumnTitle}
                                onChange={(e) => setNewColumnTitle(e.target.value)}
                                placeholder="ENTER_SECTOR_NAME..."
                                className="input-glass"
                                style={{
                                    width: '100%',
                                    marginBottom: '12px',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '14px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '8px',
                                    outline: 'none'
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleAddColumn();
                                    if (e.key === 'Escape') setIsAddingColumn(false);
                                }}
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={handleAddColumn}
                                    className="btn-primary"
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        fontSize: '12px'
                                    }}
                                >
                                    INITIALIZE
                                </button>
                                <button
                                    onClick={() => setIsAddingColumn(false)}
                                    className="btn-ghost"
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        border: '1px solid var(--border-color)'
                                    }}
                                >
                                    ABORT
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingColumn(true)}
                            style={{
                                width: '100%',
                                height: '60px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px dashed var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                transition: 'all 0.3s',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <span>+ DEPLOY_NEW_SECTOR</span>
                        </button>
                    )}
                </div>
            </div>
        </DragDropContext>
    );
};

export default Board;
