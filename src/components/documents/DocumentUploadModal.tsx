import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, FileText, Image, Receipt } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface DocumentUploadModalProps {
  onUpload: (file: File, type: 'document' | 'image' | 'receipt') => void;
  onClose: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ onUpload, onClose }) => {
  const [selectedType, setSelectedType] = useState<'document' | 'image' | 'receipt' | null>(null);
  const { showToast } = useToast();

  const documentTypes = [
    { type: 'document', icon: FileText, label: 'Document', description: 'Upload PDF or Word documents' },
    { type: 'image', icon: Image, label: 'Image', description: 'Upload images or photos' },
    { type: 'receipt', icon: Receipt, label: 'Receipt', description: 'Upload transaction receipts' }
  ] as const;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedType) {
      try {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showToast('File size must be less than 5MB', 'error');
          return;
        }

        // Validate file type
        const validTypes = {
          document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
          image: ['image/jpeg', 'image/png', 'image/gif'],
          receipt: ['image/jpeg', 'image/png', 'application/pdf']
        };

        if (!validTypes[selectedType].includes(file.type)) {
          showToast('Invalid file type', 'error');
          return;
        }

        onUpload(file, selectedType);
        onClose();
      } catch (error) {
        showToast('Failed to upload file', 'error');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upload Document
          </h3>
        </div>

        <div className="space-y-4">
          {/* Document Type Selection */}
          <div className="grid grid-cols-1 gap-3">
            {documentTypes.map(({ type, icon: Icon, label, description }) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedType(type)}
                className={`w-full flex items-start gap-3 p-4 rounded-lg border-2 transition-colors ${
                  selectedType === type
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 ${
                  selectedType === type
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400'
                }`} />
                <div className="text-left">
                  <p className={`font-medium ${
                    selectedType === type
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* File Upload */}
          {selectedType && (
            <div className="mt-6">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept={
                  selectedType === 'image'
                    ? 'image/*'
                    : selectedType === 'document'
                    ? '.pdf,.doc,.docx'
                    : '.pdf,image/*'
                }
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400"
              >
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload {selectedType}
                </p>
              </label>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentUploadModal;