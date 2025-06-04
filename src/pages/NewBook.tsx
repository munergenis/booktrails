import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Spinner,
} from '@heroui/react';

import type { Book, Chapter } from '@/lib/interfaces/Book';
import { useState, type FormEventHandler } from 'react';
import { checkImageUrl } from '@/lib/helpers/utils';
import { useCollections } from '@/features/collections/hooks/useCollections';
import { CollectionSelectItem } from '@/Shared/components/CollectionSelectItem';
import { useBooks } from '@/features/books/hooks/useBooks';
import { Link, useNavigate } from 'react-router';

type NewBookFormData = Omit<Book, 'id'>;
type ChaptersType = 'none' | 'count' | 'detail';
const chaptersTypes: { key: ChaptersType; value: string }[] = [
  { key: 'none', value: 'Skip for now' },
  { key: 'count', value: 'Total' },
  { key: 'detail', value: 'Detail' },
];

// title: string;
// author?: string | undefined;
// series?: string | undefined;
// pages?: number | undefined;
// chapters?: Chapter[] | undefined;
// collectionId?: string | undefined;
// coverUrl?: string | undefined;

export const NewBook = () => {
  const navigate = useNavigate();
  const { addBook } = useBooks();
  const { collectionsQuery } = useCollections();

  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Chapters state
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: crypto.randomUUID() },
  ]);
  const [chaptersType, setChaptersType] = useState<ChaptersType>('none');
  const [preChCount, setPreChCount] = useState(0);
  const [mainChCount, setMainChCount] = useState(1);
  const [postChCount, setPostChCount] = useState(0);

  const collections = collectionsQuery.data || [];

  const handleAddChapter = () => {
    setChapters((pChapters) => [...pChapters, { id: crypto.randomUUID() }]);
  };
  const handleDeleteChapter = (id: string) => {
    setChapters((pChapters) => pChapters.filter((ch) => ch.id !== id));
  };

  const handleChapterDetailChange = (
    id: string,
    field: 'title' | 'pages' | 'type',
    value: string | number
  ) => {
    setChapters((pChapters) =>
      pChapters.map((chapter) =>
        chapter.id === id ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrors({});

    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const data = raw as unknown as NewBookFormData;

    if (data.coverUrl) {
      setImageLoading(true);
      const isValid = await checkImageUrl(data.coverUrl);
      setImageLoading(false);
      if (!isValid) {
        setErrors({ coverUrl: 'Url does not provide a valid image' });
        return;
      }
    }

    let chaptersData: Chapter[] | undefined;

    if (chaptersType === 'none') {
      chaptersData = undefined;
    } else if (chaptersType === 'count') {
      const totalChapters = preChCount + mainChCount + postChCount;
      let preCounter = 0;
      let mainCounter = 0;
      chaptersData = [];

      for (let i = 0; i < totalChapters; i++) {
        let type: 'pre' | 'main' | 'post';

        if (preCounter === preChCount) {
          if (mainCounter === mainChCount) {
            type = 'post';
          } else {
            type = 'main';
            mainCounter += 1;
          }
        } else {
          type = 'pre';
          preCounter += 1;
        }
        const newChapter: Chapter = {
          id: crypto.randomUUID(),
          type,
        };
        chaptersData.push(newChapter);
      }
    } else {
      chaptersData = chapters;
    }
    data.chapters = chaptersData;

    const formData = Object.fromEntries(
      Object.entries(data).filter((entry) => entry[1] !== '')
    ) as unknown as NewBookFormData;

    addBook.mutate(formData, { onSuccess: () => navigate('/books') });
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <h2>Add New Book</h2>
      </CardHeader>

      <CardBody>
        <Form
          onSubmit={handleSubmit}
          validationErrors={errors}
        >
          <Input
            name="title"
            label="Title"
            isRequired
            minLength={1}
            validate={(value) => {
              if (value.trim() === '') {
                return 'Title could not be empty';
              }
            }}
          />
          <Input
            name="author"
            label="Author"
            minLength={3}
          />
          <Input
            name="series"
            label="Series"
            minLength={3}
          />
          <NumberInput
            name="pages"
            label="Pages"
            isClearable
            minValue={1}
          />

          <Select
            name="collectionId"
            placeholder="Collection"
            aria-label="Collection"
            items={collections}
            isLoading={collectionsQuery.isLoading}
            renderValue={(items) =>
              items.map((item) => (
                <CollectionSelectItem
                  key={item.key}
                  collection={item.data!}
                />
              ))
            }
          >
            {(item) => (
              <SelectItem
                key={item.id}
                textValue={item.name}
              >
                <CollectionSelectItem collection={item} />
              </SelectItem>
            )}
          </Select>

          <Input
            type="url"
            name="coverUrl"
            label="Cover URL"
            minLength={3}
            isClearable
            isDisabled={imageLoading}
            endContent={imageLoading && <Spinner />}
          />

          <Divider />

          <Select
            label="Chapters"
            items={chaptersTypes}
            isRequired
            defaultSelectedKeys={[chaptersType]}
            value={chaptersType}
            onChange={(v) => setChaptersType(v.target.value as ChaptersType)}
          >
            {chaptersTypes.map((type) => (
              <SelectItem key={type.key}>{type.value}</SelectItem>
            ))}
          </Select>

          {chaptersType === 'count' && (
            <div className="space-y-2 px-4 w-full py-2">
              <NumberInput
                label="Pre-Chapters"
                minValue={0}
                value={preChCount}
                onValueChange={setPreChCount}
                isClearable
              />
              <NumberInput
                label="Chapters"
                minValue={1}
                value={mainChCount}
                onValueChange={setMainChCount}
                isClearable
                isRequired
              />
              <NumberInput
                label="Post-Chapters"
                minValue={0}
                value={postChCount}
                onValueChange={setPostChCount}
                isClearable
              />
            </div>
          )}

          {chaptersType === 'detail' && (
            <div className="flex flex-col gap-y-2 w-full">
              <div className="px-4 flex flex-col divide-y divide-gray-100">
                {chapters.map((chapter, idx) => (
                  <div
                    className="space-y-1 py-2"
                    key={chapter.id}
                  >
                    <Input
                      isRequired
                      label={`#${idx + 1} Title`}
                      value={chapter.title}
                      onValueChange={(value) =>
                        handleChapterDetailChange(chapter.id, 'title', value)
                      }
                    />
                    <div className="flex gap-x-2 items-end">
                      <Select
                        isRequired
                        label="Type"
                        items={[
                          { id: 'pre', name: 'Pre' },
                          { id: 'main', name: 'Main' },
                          { id: 'post', name: 'Post' },
                        ]}
                        value={chapter.type}
                        onChange={(e) =>
                          handleChapterDetailChange(
                            chapter.id,
                            'type',
                            e.target.value
                          )
                        }
                      >
                        {(item) => (
                          <SelectItem key={item.id}>{item.name}</SelectItem>
                        )}
                      </Select>
                      <NumberInput
                        label="Pages"
                        isClearable
                        minValue={1}
                        value={chapter.pages}
                        onValueChange={(value) =>
                          handleChapterDetailChange(chapter.id, 'pages', value)
                        }
                      />
                      {chapters.length > 1 && (
                        <Button
                          type="button"
                          onPress={() => handleDeleteChapter(chapter.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="self-end"
                type="button"
                onPress={handleAddChapter}
              >
                Add
              </Button>
            </div>
          )}

          <div className="flex space-x-2 w-full">
            <Button type="submit">Add</Button>
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
              to="/books"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};
