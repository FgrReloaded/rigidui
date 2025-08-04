"use client"
import React, { useState, useRef, useCallback, useEffect, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, X, File, FileText, FileVideo, FileAudio, Check, AlertCircle, Image as ImageIcon, Crop as CropIcon } from 'lucide-react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface FileWithPreview {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string | null;
  preview?: string | null;
  croppedPreview?: string | null;
  originalFile?: File;
}



interface FileUploaderContextType {
  files: FileWithPreview[];
  maxFiles: number;
  maxSize: number;
  accept: string[];
  onFilesReady?: (files: File[]) => void;
  addFiles: (files: FileList) => void;
  removeFile: (fileId: string) => void;
  clearAllFiles: () => void;
  updateFile: (fileId: string, updates: Partial<FileWithPreview>) => void;
  formatFileSize: (bytes: number) => string;
  validateFile: (file: File) => string | null;
  getFileIcon: (file: File) => React.ReactNode;
  openCropDialog: (file: FileWithPreview) => void;
  cropDialogOpen: boolean;
  setCropDialogOpen: (open: boolean) => void;
  currentCropFile: FileWithPreview | null;
  setCurrentCropFile: (file: FileWithPreview | null) => void;
}

const FileUploaderContext = createContext<FileUploaderContextType | null>(null);

const useFileUploader = () => {
  const context = useContext(FileUploaderContext);
  if (!context) {
    throw new Error('FileUploader components must be used within a FileUploader');
  }
  return context;
};

const FileUploaderProgress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
      style={{ width: `${value}%` }}
    />
  </div>
));
FileUploaderProgress.displayName = "FileUploaderProgress";

interface FileUploaderPreviewProps {
  file: FileWithPreview;
  className?: string;
}

function FileUploaderPreview({ file, className }: FileUploaderPreviewProps) {
  const { getFileIcon } = useFileUploader();

  if (file.preview) {
    return (
      <div className={cn("w-12 h-12 rounded-md overflow-hidden shrink-0 border", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={file.croppedPreview || file.preview}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("w-12 h-12 bg-muted rounded-md flex items-center justify-center shrink-0 border", className)}>
      {file.error ? (
        <AlertCircle className="w-6 h-6 text-destructive" />
      ) : (
        getFileIcon(file.file)
      )}
    </div>
  );
}

interface CropTriggerProps {
  file: FileWithPreview;
  className?: string;
  children?: React.ReactNode;
}

function CropTrigger({ file, className, children }: CropTriggerProps) {
  const { openCropDialog } = useFileUploader();

  const handleClick = () => {
    openCropDialog(file);
  };

  if (children) {
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn(
        "shrink-0 h-8 w-8 rounded-full opacity-70 hover:opacity-100 hover:bg-primary/10 hover:text-primary",
        className
      )}
      title="Crop image"
    >
      <CropIcon className="w-4 h-4" />
    </Button>
  );
}

interface FileUploaderDropZoneProps {
  className?: string;
  disabled?: boolean;
}

function FileUploaderDropZone({ className, disabled }: FileUploaderDropZoneProps) {
  const {
    files,
    maxFiles,
    maxSize,
    accept,
    addFiles,
    formatFileSize
  } = useFileUploader();

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  }, [addFiles]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getReadableFileTypes = useCallback(() => {
    return accept.map(type => {
      if (type === 'image/*') return 'Images';
      if (type === 'application/pdf') return 'PDF';
      if (type === 'text/*') return 'Text files';
      if (type === 'video/*') return 'Videos';
      if (type === 'audio/*') return 'Audio';
      return type;
    });
  }, [accept]);

  const isDisabled = disabled || files.length >= maxFiles;

  return (
    <Card
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 border-muted",
        dragActive && "border-primary bg-primary/5",
        isDisabled && "opacity-50 pointer-events-none",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors",
          dragActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50 text-muted-foreground"
        )}>
          <Upload className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-semibold mb-2">
          {dragActive ? "Drop files here" : "Upload Files"}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop files here or click to browse
        </p>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {getReadableFileTypes().map((type, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>

        <Button
          onClick={openFileDialog}
          variant="outline"
          className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          disabled={isDisabled}
        >
          Choose Files
        </Button>

        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} files, up to {formatFileSize(maxSize)} each
        </p>
      </CardContent>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
    </Card>
  );
}

interface FileItemProps {
  file: FileWithPreview;
  enableCropping?: boolean;
}

function FileItem({ file, enableCropping }: FileItemProps) {
  const { removeFile, formatFileSize } = useFileUploader();

  return (
    <Card className="relative overflow-hidden group">
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-200",
        file.error ? "bg-destructive/5" : "bg-primary/5"
      )} />
      <CardContent className="p-4 relative">
        <div className="flex items-center gap-3">
          <FileUploaderPreview file={file} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium truncate">
                {file.name}
              </p>
              {file.status === 'complete' && !file.error && (
                <Check className="w-4 h-4 text-green-500 shrink-0" />
              )}
              {file.croppedPreview && (
                <Badge variant="secondary" className="text-xs">
                  Cropped
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-2">
              {formatFileSize(file.size)} • {file.type}
            </p>

            {file.error ? (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {file.error}
              </p>
            ) : (
              <FileUploaderProgress
                value={file.progress}
                className="h-1 rounded-full bg-secondary"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            {enableCropping && file.preview && !file.error && (
              <CropTrigger file={file} />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFile(file.id)}
              className="shrink-0 h-8 w-8 rounded-full opacity-70 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FileUploaderFileListProps {
  className?: string;
  showHeader?: boolean;
  enableCropping?: boolean;
}

function FileUploaderFileList({
  className,
  showHeader = true,
  enableCropping = false
}: FileUploaderFileListProps) {
  const {
    files,
    maxFiles,
    clearAllFiles
  } = useFileUploader();

  if (files.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {showHeader && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFiles}
            className="text-xs hover:bg-destructive/10 hover:text-destructive"
          >
            Clear All
          </Button>
        </div>
      )}

      {files.map((fileData) => (
        <FileItem
          key={fileData.id}
          file={fileData}
          enableCropping={enableCropping}
        />
      ))}
    </div>
  );
}

interface FileUploaderCropProps {
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
}

function FileUploaderCrop({
  aspectRatio,
  minWidth = 50,
  minHeight = 50,
}: FileUploaderCropProps) {
  const {
    updateFile,
    cropDialogOpen,
    setCropDialogOpen,
    currentCropFile,
    setCurrentCropFile
  } = useFileUploader();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

  const createCroppedImage = useCallback(async (
    image: HTMLImageElement,
    crop: Crop,
    fileName: string
  ): Promise<File> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const pixelCrop = convertToPixelCrop(crop, image.naturalWidth, image.naturalHeight);

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        const file = new globalThis.File([blob], fileName, {
          type: 'image/png',
          lastModified: Date.now()
        });
        resolve(file);
      }, 'image/png', 1.0);
    });
  }, []);

  const handleCropComplete = useCallback(async () => {
    if (!completedCrop || !imgRef || !currentCropFile) return;

    try {
      const croppedFile = await createCroppedImage(
        imgRef,
        completedCrop,
        currentCropFile.name
      );

      const croppedPreview = URL.createObjectURL(croppedFile);

      updateFile(currentCropFile.id, {
        file: croppedFile,
        croppedPreview,
        size: croppedFile.size,
        originalFile: currentCropFile.originalFile || currentCropFile.file
      });

      setCropDialogOpen(false);
      setCurrentCropFile(null);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  }, [completedCrop, imgRef, currentCropFile, createCroppedImage, updateFile, setCropDialogOpen, setCurrentCropFile]);

  const handleCropCancel = useCallback(() => {
    setCropDialogOpen(false);
    setCurrentCropFile(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
  }, [setCropDialogOpen, setCurrentCropFile]);

  const initializeCrop = useCallback((imageWidth: number, imageHeight: number) => {
    const newCrop = centerCrop(
      aspectRatio
        ? makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspectRatio,
          imageWidth,
          imageHeight
        )
        : { x: 0, y: 0, width: 90, height: 90, unit: '%' },
      imageWidth,
      imageHeight,
    );
    setCrop(newCrop);
    setCompletedCrop(newCrop);
  }, [aspectRatio]);

  return (
    <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-sm font-medium">
            Crop Image
          </DialogTitle>
        </DialogHeader>
        {currentCropFile && (
          <div className="space-y-3">
            <div className="flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                minWidth={minWidth}
                minHeight={minHeight}
                className="max-w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={setImgRef}
                  src={currentCropFile.croppedPreview || currentCropFile.preview!}
                  alt="Crop preview"
                  onLoad={(e) => {
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    initializeCrop(naturalWidth, naturalHeight);
                  }}
                  className="max-w-full max-h-[40vh] object-contain rounded"
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={handleCropCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleCropComplete} disabled={!completedCrop}>
                Apply
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export interface FileUploaderProps {
  onFilesReady?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  className?: string;
  children?: React.ReactNode;
}

export function FileUploader({
  onFilesReady,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024,
  accept = ['image/*', 'application/pdf', 'text/*'],
  className,
  children
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [currentCropFile, setCurrentCropFile] = useState<FileWithPreview | null>(null);

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
        if (file.croppedPreview) URL.revokeObjectURL(file.croppedPreview);
      });
    };
  }, [files]);

  const getFileIcon = useCallback((file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-4 h-4" aria-hidden="true" />;
    if (file.type.startsWith('video/')) return <FileVideo className="w-4 h-4" aria-hidden="true" />;
    if (file.type.startsWith('audio/')) return <FileAudio className="w-4 h-4" aria-hidden="true" />;
    if (file.type === 'application/pdf') return <FileText className="w-4 h-4" aria-hidden="true" />;
    return <File className="w-4 h-4" aria-hidden="true" />;
  }, []);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const validateFile = useCallback((file: File) => {
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }

    const fileType = file.type;
    const isAccepted = accept.some(type => {
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.slice(0, -1));
      }
      return fileType === type;
    });

    if (!isAccepted) {
      return 'File type not supported';
    }

    return null;
  }, [maxSize, accept, formatFileSize]);

  const addFiles = useCallback((newFiles: FileList) => {
    if (files.length >= maxFiles) return;

    const filesToAdd = Array.from(newFiles).slice(0, maxFiles - files.length);

    const processedFiles = filesToAdd.map(file => {
      const error = validateFile(file);
      const isImage = file.type.startsWith('image/');

      return {
        id: Math.random().toString(36).substring(2, 11),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: error ? 0 : 100,
        status: error ? 'error' : 'complete',
        error,
        preview: isImage ? URL.createObjectURL(file) : null
      } as FileWithPreview;
    });

    const newFileList = [...files, ...processedFiles];
    setFiles(newFileList);

    const validFiles = newFileList.filter(f => !f.error).map(f => f.file);
    if (onFilesReady) {
      onFilesReady(validFiles);
    }
  }, [files, maxFiles, validateFile, onFilesReady]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      if (fileToRemove?.croppedPreview) {
        URL.revokeObjectURL(fileToRemove.croppedPreview);
      }

      const updatedFiles = prevFiles.filter(f => f.id !== fileId);

      if (onFilesReady) {
        const validFiles = updatedFiles.filter(f => !f.error).map(f => f.file);
        onFilesReady(validFiles);
      }

      return updatedFiles;
    });
  }, [onFilesReady]);

  const clearAllFiles = useCallback(() => {
    files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
      if (file.croppedPreview) URL.revokeObjectURL(file.croppedPreview);
    });

    setFiles([]);
    if (onFilesReady) {
      onFilesReady([]);
    }
  }, [files, onFilesReady]);

  const updateFile = useCallback((fileId: string, updates: Partial<FileWithPreview>) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.map(f =>
        f.id === fileId ? { ...f, ...updates } : f
      );

      if (onFilesReady) {
        const validFiles = updatedFiles.filter(f => !f.error).map(f => f.file);
        onFilesReady(validFiles);
      }

      return updatedFiles;
    });
  }, [onFilesReady]);

  const openCropDialog = useCallback((file: FileWithPreview) => {
    setCurrentCropFile(file);
    setCropDialogOpen(true);
  }, []);

  const contextValue: FileUploaderContextType = {
    files,
    maxFiles,
    maxSize,
    accept,
    onFilesReady,
    addFiles,
    removeFile,
    clearAllFiles,
    updateFile,
    formatFileSize,
    validateFile,
    getFileIcon,
    openCropDialog,
    cropDialogOpen,
    setCropDialogOpen,
    currentCropFile,
    setCurrentCropFile,
  };

  return (
    <FileUploaderContext.Provider value={contextValue}>
      <div className={cn("w-full space-y-4", className)}>
        {children}
      </div>
    </FileUploaderContext.Provider>
  );
}

FileUploader.DropZone = FileUploaderDropZone;
FileUploader.FileList = FileUploaderFileList;
FileUploader.Crop = FileUploaderCrop;
FileUploader.Progress = FileUploaderProgress;
FileUploader.Preview = FileUploaderPreview;

export { FileUploaderDropZone, FileUploaderFileList, FileUploaderCrop, FileUploaderProgress, FileUploaderPreview };
