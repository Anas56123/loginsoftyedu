'use client'
import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X, RefreshCw, Check, AlertCircle, Link as LinkIcon, Copy, CheckCircle } from 'lucide-react';
import supabase from '@/Data/Supabase/Supabase';

interface FilePreviewProps {
  onFileSelect: (file: File) => void;
}

const DragDropArea = ({ onFileSelect }: FilePreviewProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessingDone, setIsProcessingDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setError(null);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const uploadToSupabase = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from('images') // Your bucket name
      .upload(filePath, file, {
        cacheControl: '31536000', // Cache for 1 year
        upsert: false
      });

    if (error) {
      throw new Error(error.message);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const processFile = useCallback((file: File) => {
    setError(null);
    setImageUrl(null);
    setIsProcessingDone(false);

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Image size should be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setSelectedFile(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleReset = useCallback(async () => {
    if (imageUrl) {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const filePath = urlParts[urlParts.length - 1];

      try {
        // Delete file from Supabase
        const { error } = await supabase.storage
          .from('images')
          .remove([filePath]);

        if (error) {
          throw error;
        }
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    }

    setPreview(null);
    setError(null);
    setImageUrl(null);
    setIsProcessingDone(false);
    setIsCopied(false);
  }, [imageUrl]);

  const handleCopyLink = useCallback(async () => {
    if (imageUrl) {
      await navigator.clipboard.writeText(imageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [imageUrl]);

  const handleSubmit = async () => {
    if (!selectedFile) return;

    console.log(selectedFile);
    
    setIsLoading(true);
    try {
      const url = await uploadToSupabase(selectedFile);
      setImageUrl(url);
      setIsProcessingDone(true);
      onFileSelect(selectedFile);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message || 'Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div
        className={`relative min-h-64 w-full rounded-lg border-2 border-dashed transition-colors duration-200 flex flex-col items-center justify-center p-6 
          ${isDragging ? 'border-blue-500 bg-blue-50' : 
            error ? 'border-blue-300 bg-blue-50' :
            isProcessingDone ? 'border-green-300 bg-green-50' :
            'border-gray-300 bg-gray-50 hover:border-gray-400'}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading || isProcessingDone}
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="text-sm text-gray-500">Uploading image...</p>
          </div>
        ) : preview ? (
          <div className="relative w-full h-full flex items-center justify-center group">
            <img
              src={preview}
              alt="Preview"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={handleReset}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Remove image"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            {isProcessingDone && (
              <Check className="absolute top-4 right-4 h-6 w-6 text-green-500 bg-white rounded-full" />
            )}
          </div>
        ) : error ? (
          <div className="space-y-4 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <div className="space-y-2">
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            {isDragging ? (
              <Upload className="mx-auto h-12 w-12 text-blue-500" />
            ) : (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Drag and drop your image here, or click to select
              </p>
              <p className="text-xs text-gray-400">
                Supports: JPG, PNG, GIF (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedFile && !isProcessingDone && (
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Uploading...</span>
            </div>
          ) : (
            'Upload Image'
          )}
        </button>
      )}

      {imageUrl && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Permanent Image Link</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={imageUrl}
              readOnly
              className="flex-1 p-2 text-sm bg-gray-50 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            This link will remain active permanently unless you delete the image.
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropArea;
