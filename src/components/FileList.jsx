import { FileText, X, ArrowUp, ArrowDown } from 'lucide-react';

export function FileList({ files, onRemove, onMove }) {
    if (files.length === 0) return null;

    return (
        <div className="flex-col gap-md">
            {files.map((file, index) => (
                <div
                    key={`${file.name}-${index}`}
                    className="card"
                    style={{
                        padding: 'var(--space-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--bg-tertiary)',
                    }}
                >
                    <div
                        className="flex-center"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
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

                    <div className="flex-center gap-sm">
                        <button
                            className="btn-icon"
                            onClick={() => onMove(index, -1)}
                            disabled={index === 0}
                            title="Move Up"
                            style={{
                                padding: 'var(--space-xs)',
                                color: index === 0 ? 'var(--bg-tertiary)' : 'var(--text-secondary)',
                                cursor: index === 0 ? 'default' : 'pointer',
                            }}
                        >
                            <ArrowUp size={18} />
                        </button>
                        <button
                            className="btn-icon"
                            onClick={() => onMove(index, 1)}
                            disabled={index === files.length - 1}
                            title="Move Down"
                            style={{
                                padding: 'var(--space-xs)',
                                color: index === files.length - 1 ? 'var(--bg-tertiary)' : 'var(--text-secondary)',
                                cursor: index === files.length - 1 ? 'default' : 'pointer',
                            }}
                        >
                            <ArrowDown size={18} />
                        </button>
                        <button
                            className="btn-icon"
                            onClick={() => onRemove(index)}
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
                </div>
            ))}
        </div>
    );
}
