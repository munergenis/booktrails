import type { Book, Chapter } from '@/lib/interfaces/Book';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Link,
  Progress,
} from '@heroui/react';

import fallbackLogo from '/book-transparent-256.webp';
import { getChaptersWithLabels } from '@/lib/helpers/utils';
import { useProgress } from '@/features/progress/hooks/useProgress';

interface BookCardProps {
  book: Book;
  imageSrc?: string;
  title: string;
  progress: number;
  chapters?: Chapter[];
  id: string;
}

export const BookCard = ({
  book,
  imageSrc,
  title,
  progress,
  chapters,
  id,
}: BookCardProps) => {
  const { progressQuery, toggleChapter, toggleBook } = useProgress();
  const progressData = progressQuery.data;

  const chaptersWithLabels = getChaptersWithLabels(chapters || []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <Card
        className="sticky top-20 z-20"
        isBlurred
      >
        <CardHeader className="flex justify-between gap-x-2 sm:hidden">
          <h2 className="">{title}</h2>
          {book.collectionId && (
            <Button
              as={Link}
              href={`/collections/${book.collectionId}`}
            >
              See collection &rarr;
            </Button>
          )}
        </CardHeader>
        <CardBody className="flex flex-row gap-2">
          <Image
            src={imageSrc ?? fallbackLogo}
            width={180}
            className="aspect-square object-contain"
          />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-x-2">
              <div>
                <h2 className="hidden sm:flex">{title}</h2>
                {book.series && <p>{book.series}</p>}
                {book.author && <p className="text-sm italic">{book.author}</p>}
              </div>
              {book.collectionId && (
                <Button
                  className="hidden sm:flex"
                  as={Link}
                  href={`/collections/${book.collectionId}`}
                >
                  See collection &rarr;
                </Button>
              )}
            </div>
            <Progress
              color={progress === 100 ? 'success' : 'default'}
              value={progress}
              showValueLabel
              label={
                <Checkbox
                  isSelected={progress === 100}
                  color="success"
                  onValueChange={() => toggleBook.mutate({ bookId: id })}
                >
                  Mark as {progress === 100 ? 'not read' : 'Read'}
                </Checkbox>
              }
            />
          </div>
        </CardBody>
      </Card>

      {chapters && (
        <>
          <Divider />
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <span className="text-xl font-semibold">Chapters</span>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 items-start">
              {chaptersWithLabels.map((ch) => (
                <div className="flex justify-between w-full">
                  <Checkbox
                    key={ch.id}
                    color="default"
                    isSelected={progressData?.chaptersRead[id]?.includes(ch.id)}
                    lineThrough={progressData?.chaptersRead[id]?.includes(
                      ch.id
                    )}
                    onValueChange={() =>
                      toggleChapter.mutate({ bookId: id, chapterId: ch.id })
                    }
                  >
                    <span>{ch.label}</span>
                  </Checkbox>
                  {ch.pages && <span>{ch.pages}p</span>}
                </div>
              ))}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};
