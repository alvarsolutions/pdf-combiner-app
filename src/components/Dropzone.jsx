import { useRef, useState } from 'react';
import { FilePlus } from 'lucide-react';

export function Dropzone({ onFilesAdded }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === 'application/pdf'
        );

        if (files.length > 0) {
            onFilesAdded(files);
        }
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files).filter(
            (file) => file.type === 'application/pdf'
        );

        if (files.length > 0) {
            onFilesAdded(files);
        }
        // Reset input so same files can be selected again if needed
        e.target.value = '';
    };

    return (
        <div
            className={`card flex-center dropzone ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
                minHeight: '200px',
                borderStyle: 'dashed',
                borderColor: isDragging ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept=".pdf"
                multiple
                style={{ display: 'none' }}
            />
            <div className="flex-col flex-center gap-md" style={{ color: isDragging ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                <FilePlus size={48} />
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>
                        {isDragging ? 'Drop files here' : 'Click or drag PDF files here'}
                    </p>
                    <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                        Supports multiple files
                    </p>
                </div>
            </div>
        </div>
    );
}
