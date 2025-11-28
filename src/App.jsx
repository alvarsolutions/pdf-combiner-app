import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Dropzone } from './components/Dropzone';
import { FileList } from './components/FileList';
import { mergePDFs } from './utils/pdfUtils';

function App() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFilesAdded = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveFile = (index, direction) => {
    const newFiles = [...files];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < newFiles.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
    }
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
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">PDF Combiner</h1>
        <p className="app-subtitle">Securely merge your PDF files locally. No uploads, ever.</p>
      </header>

      <main className="flex-col gap-lg">
        <Dropzone onFilesAdded={handleFilesAdded} />

        <FileList
          files={files}
          onRemove={handleRemoveFile}
          onMove={handleMoveFile}
        />

        <div className="flex-center">
          <button
            className="btn btn-primary"
            disabled={files.length === 0 || isMerging}
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
      </main>
    </div>
  );
}

export default App;
