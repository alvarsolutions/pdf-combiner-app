import { FileText, X, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence, motion } from 'framer-motion';

export function FileItem({ file, index, onRemove, dragHandleProps, style, isDragging, isOverlay }) {
    return (
        <div
            className={`card ${isDragging ? 'dragging' : ''} ${isOverlay ? 'overlay' : ''}`}
            style={{
                padding: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                backgroundColor: isOverlay ? 'var(--bg-secondary)' : (isDragging ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'),
                border: '1px solid var(--bg-tertiary)',
                cursor: 'default',
                opacity: isDragging && !isOverlay ? 0.3 : 1,
                ...style,
            }}
        >
            <div
                {...dragHandleProps}
                style={{
                    cursor: 'grab',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--space-xs)',
                }}
            >
                <GripVertical size={20} />
            </div>

            <div
                className="flex-center"
                style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--accent-primary)',
                    flexShrink: 0,
                }}
            >
                <FileText size={20} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <p
                    style={{
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {file.name}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
            </div>

            <button
                className="btn-icon"
                onClick={() => onRemove && onRemove(index)}
                title="Remove"
                style={{
                    padding: 'var(--space-xs)',
                    color: 'var(--danger)',
                    marginLeft: 'var(--space-sm)',
                }}
            >
                <X size={18} />
            </button>
        </div>
    );
}

function SortableItem({ file, index, onRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: `${file.name}-${index}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        position: 'relative',
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
        >
            <FileItem
                file={file}
                index={index}
                onRemove={onRemove}
                dragHandleProps={{ ...attributes, ...listeners }}
                isDragging={isDragging}
            />
        </motion.div>
    );
}

export function FileList({ files, onRemove }) {
    if (files.length === 0) return null;

    return (
        <div className="flex-col gap-md">
            <SortableContext
                items={files.map((f, i) => `${f.name}-${i}`)}
                strategy={verticalListSortingStrategy}
            >
                <AnimatePresence mode='popLayout'>
                    {files.map((file, index) => (
                        <SortableItem
                            key={`${file.name}-${index}`}
                            file={file}
                            index={index}
                            onRemove={onRemove}
                        />
                    ))}
                </AnimatePresence>
            </SortableContext>
        </div>
    );
}
