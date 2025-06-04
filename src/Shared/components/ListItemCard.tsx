import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Progress,
} from '@heroui/react';

import fallbackBookLogo from '/book-transparent-256.webp';
import fallbackCollectionLogo from '/collection-transparent-256.webp';

interface ListItemCardProps {
  href: string;
  imageSrc?: string;
  title: string;
  subtitle?: string;
  author?: string;
  progress: number;
  itemType?: string;
}

export const ListItemCard = ({
  href,
  imageSrc,
  title,
  subtitle,
  author,
  progress,
  itemType = 'book',
}: ListItemCardProps) => {
  return (
    <Link
      href={href}
      className="block"
    >
      <Card>
        <CardHeader className="gap-x-4 items-start">
          <Image
            src={
              imageSrc ||
              (itemType === 'book' ? fallbackBookLogo : fallbackCollectionLogo)
            }
            width={80}
            className="aspect-[11/16] rounded-sm object-fill image-smooth"
          />
          <div className="">
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
            {author && <p className="text-sm italic">{author}</p>}
          </div>
        </CardHeader>
        <Divider />
        <CardFooter>
          <Progress
            color={progress === 100 ? 'success' : 'default'}
            value={progress}
            label={`${progress}%`}
          />
        </CardFooter>
      </Card>
    </Link>
  );
};
