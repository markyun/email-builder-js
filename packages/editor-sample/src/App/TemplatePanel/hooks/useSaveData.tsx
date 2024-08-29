import { useState } from 'react';
import { useDocument } from '../../documents/editor/EditorContext';


/*
import { useSaveData } from '../hooks/useSaveData';

  const { isLoading, error, save } = useSaveData();

  const handleClick = async () => {
    save().then((res) => {
      if (res?.ok) {
        if (res.status >= 200 && res.status < 300) {
          toast.success('Szablon został zapisany');

          setTimeout(() => {
            const previewURL = getPreviewTemplateURL();
            window.open(previewURL, '_blank');
          }, 1000);
        }
      } else {
        toast.error('Wystąpił błąd podczas zapisywania szablonu');
      }
      return res;
    });
  };

*/
export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const document = useDocument();

  const save = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(window?.email?.generator?.updateTemplate || window.location.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': window?.email?.generator?.csrf || '',
        },

        body: JSON.stringify({
          template_id: window?.email?.generator?.templateID || '',
          template_json: document,
        }),
      });

      return response;
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { save, isLoading, error };
};
