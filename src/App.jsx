import { useState } from 'react';
import { Download, Loader2, Trash2 } from 'lucide-react';
import { Dropzone } from './components/Dropzone';
import { FileList, FileItem } from './components/FileList';
import { mergePDFs } from './utils/pdfUtils';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Toaster, toast } from 'sonner';

function App() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFilesAdded = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} file(s) added`);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((f, i) => `${f.name}-${i}` === active.id);
        const newIndex = items.findIndex((f, i) => `${f.name}-${i}` === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleClearAll = () => {
    setFiles([]);
    toast.info('All files cleared');
  };

  const handleMerge = async () => {
    if (files.length === 0) return;

    setIsMerging(true);
    try {
      const mergedPdfBytes = await mergePDFs(files);
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('PDFs merged successfully!');
    } catch (error) {
      console.error('Error merging PDFs:', error);
      toast.error('Failed to merge PDFs. Please try again.');
    } finally {
      setIsMerging(false);
    }
  };

  const activeFile = activeId ? files.find((f, i) => `${f.name}-${i}` === activeId) : null;

  return (
    <div className="container">
      <Toaster position="top-center" theme="dark" />
      <header className="app-header">
        <h1 className="app-title">PDF Combiner</h1>
        <p className="app-subtitle">Securely merge your PDF files locally. No uploads, ever.</p>
      </header>

      <main className="flex-col gap-lg">
        <Dropzone onFilesAdded={handleFilesAdded} />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <FileList
            files={files}
            onRemove={handleRemoveFile}
          />
          <DragOverlay>
            {activeFile ? (
              <FileItem
                file={activeFile}
                index={0}
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {files.length > 0 && (
          <div className="flex-center gap-md">
            <button
              className="btn btn-secondary"
              onClick={handleClearAll}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              <Trash2 size={20} />
              Clear All
            </button>

            <button
              className="btn btn-primary"
              disabled={isMerging}
              onClick={handleMerge}
            >
              {isMerging ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Merging...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Merge PDFs
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
