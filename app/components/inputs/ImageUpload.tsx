'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='airbnb'
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='
            relative 
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed
            border-2
            flex
            flex-col
            justify-center
            items-center
            gap-4
            p-20
            text-neutral-600'
          >
            <TbPhotoPlus size={50} />
            <div
              className='
                font-semibold 
                text-lg'
            >
              Click Upload
            </div>
            {value && (
              <div
                className='
                    absolute 
                    inset-0 
                    w-full 
                    h-full'
              >
                <Image
                  alt='Upload'
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
