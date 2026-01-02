
import React, { useRef, useState } from 'react';
import { Upload, X, FileImage, Video, AlertCircle, Trash2 } from 'lucide-react';

interface MediaUploadProps {
  onUpload: (data: { url: string; type: 'image' | 'video'; mimeType: string; name: string }) => void;
  accept?: 'image/*' | 'video/*' | 'all';
  maxSizeMB?: number;
  label?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ 
  onUpload, 
  accept = 'all', 
  maxSizeMB = 10,
  label = "Upload Media"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    video: ['video/mp4', 'video/quicktime', 'video/webm']
  };

  const handleFile = (file: File) => {
    setError(null);
    
    const isImage = allowedTypes.image.includes(file.type);
    const isVideo = allowedTypes.video.includes(file.type);

    if (accept === 'image/*' && !isImage) {
      setError('Please upload a valid image (JPG, PNG, WEBP).');
      return;
    }
    if (accept === 'video/*' && !isVideo) {
      setError('Please upload a valid video (MP4, MOV, WEBM).');
      return;
    }
    if (!isImage && !isVideo) {
      setError('Unsupported file type.');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onUpload({
        url: result,
        type: isImage ? 'image' : 'video',
        mimeType: file.type,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative cursor-pointer border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center gap-3 ${
          isDragging ? 'border-blue-500 bg-blue-500/5' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept={accept === 'all' ? 'image/*,video/*' : accept}
          className="hidden"
        />
        
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-500 transition-colors">
          <Upload className="w-6 h-6" />
        </div>
        
        <div className="text-center">
          <p className="text-sm font-black text-white uppercase tracking-widest">{label}</p>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-tighter">
            {accept === 'all' ? 'JPG, PNG, MP4 (Max 10MB)' : accept.replace('/*', '').toUpperCase() + ' (Max 10MB)'}
          </p>
        </div>

        {error && (
          <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-red-500 text-[10px] font-black uppercase">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
