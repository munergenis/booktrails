import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Progress,
} from '@heroui/react';

import tempLogo from '/booktrail-transparent-256.webp';

interface ItemCardProps {
  imageSrc?: string;
  title: string;
  progress: number;
}

export const ItemCard = ({ imageSrc, title, progress }: ItemCardProps) => {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Image
          src={imageSrc ?? tempLogo}
          width={80}
        />
        <div className="">
          <h3>{title}</h3>
        </div>
      </CardHeader>
      <CardBody>
        <Progress
          color="primary"
          value={progress}
          label={`${progress}%`}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <div>hello</div>
      </CardFooter>
    </Card>
  );
};
