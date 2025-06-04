import { useCollections } from '@/features/collections/hooks/useCollections';
import { checkImageUrl } from '@/lib/helpers/utils';
import type { Collection } from '@/lib/interfaces/Book';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Spinner,
} from '@heroui/react';

import { useState, type FormEventHandler } from 'react';
import { Link, useNavigate } from 'react-router';

type NewCollectionFormData = Omit<Collection, 'id'>;

export const NewCollection = () => {
  const navigate = useNavigate();

  const { addCollection } = useCollections();
  const [loadingImage, setLoadingImage] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrors({});

    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const data = raw as NewCollectionFormData;

    if (data.coverUrl) {
      setLoadingImage(true);
      const isValid = await checkImageUrl(data.coverUrl);
      setLoadingImage(false);
      if (!isValid) {
        setErrors({
          coverUrl: 'Url does not provide an image',
        });
        return;
      }
    }

    const formData: NewCollectionFormData = {
      name: data.name,
      coverUrl: data.coverUrl || undefined,
    };

    addCollection.mutate(formData, {
      onSuccess: () => navigate('/collections'),
    });
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <h2>Create New Collection</h2>
      </CardHeader>

      <CardBody>
        <Form
          onSubmit={handleSubmit}
          validationErrors={errors}
        >
          <Input
            name="name"
            isRequired
            label="Name"
            minLength={2}
            maxLength={60}
            validate={(value) => {
              if (value.trim() === '') {
                return 'Name could not be empty';
              }
            }}
          />
          <Input
            name="coverUrl"
            label="Cover URL"
            type="url"
            isDisabled={loadingImage}
            endContent={loadingImage && <Spinner />}
          />
          <div className="space-x-2 flex w-full">
            <Button type="submit">Create</Button>
            <Button
              type="reset"
              variant="flat"
            >
              Reset
            </Button>
            <Button
              className="ml-auto border-0"
              as={Link}
              type="button"
              color="danger"
              variant="ghost"
              to="/collections"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};
