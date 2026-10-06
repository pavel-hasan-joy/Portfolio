"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2, ZoomIn, ZoomOut, Maximize2, RotateCw, AlertCircle } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfCanvasViewerProps {
  filePath: string;
  onNumPagesChange?: (numPages: number) => void;
  currentPage: number;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

export default function PdfCanvasViewer({
  filePath,
  onNumPagesChange,
  currentPage,
  scale,
  setScale,
}: PdfCanvasViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoadError(false);
    onNumPagesChange?.(numPages);
  }

  function onDocumentLoadError() {
    setLoadError(true);
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">
          CV Document Being Finalized
        </h3>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Pavel Hasan Joy is currently updating his official 2026 CV document. In the meantime, you can explore his verified credentials, GitHub repositories, and LinkedIn profile.
        </p>
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 w-full text-left font-mono">
          <p className="text-emerald-400 font-semibold mb-1">💡 For Developer:</p>
          <p>Drop your PDF file into <span className="text-zinc-200">public/cv/pavel-hasan-joy-CV.pdf</span> to activate live canvas rendering.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="text-sm font-medium tracking-wide">Rendering Document Canvas...</span>
          </div>
        }
      >
        <div className="shadow-2xl rounded-lg overflow-hidden border border-zinc-800/80 bg-white">
          <Page
            pageNumber={currentPage}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            loading={
              <div className="w-[300px] sm:w-[500px] h-[650px] bg-zinc-900 animate-pulse flex items-center justify-center text-zinc-500 text-xs">
                Loading Page {currentPage}...
              </div>
            }
          />
        </div>
      </Document>
    </div>
  );
}
