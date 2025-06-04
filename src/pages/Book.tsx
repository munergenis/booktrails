import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Form,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { useNavigate, useParams } from 'react-router';

import { BookCard } from '@/features/books/components/BookCard';
import { getBookProgress } from '@/lib/helpers/utils';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useProgress } from '@/features/progress/hooks/useProgress';

export const Book = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const id = useParams().id!;
  const navigate = useNavigate();

  const { booksQuery, removeBook } = useBooks();
  const { progressQuery } = useProgress();

  const isLoading = booksQuery.isLoading;
  const books = booksQuery.data ?? [];
  const book = books.find((b) => b.id === id);

  const progress = progressQuery.data;

  if (isLoading) {
    return <p className="italic text-center py-8">Loading book...</p>;
  }

  if (!book) {
    return (
      <div>
        <p className="italic text-center py-8">Book not found :(</p>
        <div className="flex justify-center">
          <Button
            as={Link}
            href="/books"
          >
            &larr; Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="/books">Books</BreadcrumbItem>
        <BreadcrumbItem href={`/books/${book.id}`}>{book.title}</BreadcrumbItem>
      </Breadcrumbs>

      <BookCard
        book={book}
        id={book.id}
        title={book.title}
        chapters={book.chapters}
        progress={progress ? getBookProgress(book, progress) : 0}
        imageSrc={book.coverUrl}
      />

      <Button
        className="mt-4"
        color="danger"
        onPress={onOpen}
      >
        Delete
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Book</ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const inputVal = new FormData(e.currentTarget)
                      .get('delete')
                      ?.toString();

                    if (inputVal?.toLowerCase() === 'delete') {
                      removeBook.mutate(book.id, {
                        onSuccess: () => navigate('/books'),
                      });
                    }
                  }}
                >
                  <Input
                    placeholder='Type "Delete" to confirm'
                    name="delete"
                  />
                  <Button
                    type="submit"
                    color="danger"
                  >
                    Delete
                  </Button>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
