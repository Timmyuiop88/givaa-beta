import { useState } from 'react';
import { useEdgeStore } from '../lib/edgestore';
import { useCreateCampaign } from './useCampaigns';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export function useCampaignForm(initialData = null, mode = "create") {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [formData, setFormData] = useState(() => {
    if (initialData && mode === "edit") {
      const galleryImages = initialData.gallery || initialData.gallery_images || [];
      
      return {
        ...initialData,
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : '',
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().split('T')[0] : '',
        category_id: initialData.Category?.category_id || '',
        gallery_images: galleryImages,
      };
    }
    return {
      title: '',
      category_id: '',
      description: '',
      cover_image: null,
      gallery_images: [],
      goal_amount: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      status: 'DRAFT',
      visibility: 'PUBLIC',
    };
  });
  
  const [tempImages, setTempImages] = useState(() => {
    if (initialData && mode === "edit") {
      const galleryImages = initialData.gallery || initialData.gallery_images || [];
      
      return {
        cover: initialData.cover_image ? {
          preview: initialData.cover_image,
          isExisting: true
        } : null,
        gallery: galleryImages.map(url => ({
          preview: url,
          isExisting: true
        }))
      };
    }
    return {
      cover: null,
      gallery: []
    };
  });
  
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const createCampaign = useCreateCampaign();
  const toast = useToast();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (file, type = 'cover') => {
    if (!file) return;
    
    if (type === 'cover') {
      setTempImages(prev => ({
        ...prev,
        cover: {
          file,
          preview: URL.createObjectURL(file)
        }
      }));
    } else {
      setTempImages(prev => ({
        ...prev,
        gallery: [...prev.gallery, {
          file,
          preview: URL.createObjectURL(file)
        }]
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setTempImages(prev => {
      const newGallery = [...prev.gallery];
      newGallery.splice(index, 1);

      setFormData(prevData => ({
        ...prevData,
        gallery_images: newGallery.map(img => img.preview)
      }));

      return {
        ...prev,
        gallery: newGallery
      };
    });
  };

  const uploadImages = async () => {
    let cover_image = null;
    let gallery = [];

    try {
      if (tempImages.cover?.file) {
        const res = await edgestore.publicImages.upload({
          file: tempImages.cover.file,
          onProgressChange: (progress) => {
            setUploadProgress(progress);
          },
        });
        cover_image = res.url;
      } else if (tempImages.cover?.preview) {
        cover_image = tempImages.cover.preview;
      }

      if (tempImages.gallery.length > 0) {
        const uploadPromises = tempImages.gallery.map(async (img) => {
          if (img.file) {
            const res = await edgestore.publicImages.upload({
              file: img.file,
              onProgressChange: (progress) => {
                setUploadProgress(progress);
              },
            });
            return res.url;
          }
          return img.preview;
        });

        gallery = await Promise.all(uploadPromises);
      }

      return {
        cover_image: cover_image || formData.cover_image,
        gallery_images: gallery
      };
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const { cover_image, gallery_images } = await uploadImages();
      
      const endpoint = mode === "edit" 
        ? `/api/campaigns/${initialData.campaign_id}`
        : '/api/campaigns';
      
      const method = mode === "edit" ? "PUT" : "POST";
      
      console.log('Submitting with gallery images:', gallery_images);
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cover_image,
          gallery_images,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save campaign');
      }

      toast({
        title: `Campaign ${mode === "edit" ? "updated" : "created"} successfully!`,
        status: 'success',
      });
      router.push('/user/campaigns');
    } catch (error) {
      toast({
        title: `Failed to ${mode === "edit" ? "update" : "create"} campaign`,
        description: error.message,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(s => s + 1);
    setProgress(p => Math.min(p + 33, 100));
  };

  const prevStep = () => {
    setStep(s => s - 1);
    setProgress(p => Math.max(p - 33, 0));
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      router.push('/user/campaigns');
    }
  };

  return {
    step,
    progress,
    formData,
    tempImages,
    loading,
    handleInputChange,
    handleImageSelect,
    removeGalleryImage,
    handleSubmit,
    nextStep,
    prevStep,
    uploadProgress,
    handleCancel,
  };
} 