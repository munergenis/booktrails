import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { removeAllData, setInitialData2 } from '@/lib/data/initialData';

import { ListItemCard } from '@/Shared/components/ListItemCard';
import { getBookProgress } from '@/lib/helpers/utils';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useEffect } from 'react';
import { useProgress } from '@/features/progress/hooks/useProgress';
import { useQueryClient } from '@tanstack/react-query';

export const Home = () => {
  const qc = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { booksQuery } = useBooks();
  const { progressQuery, recentQuery } = useProgress();

  const books = booksQuery.data || [];
  const progress = progressQuery.data;
  const recent = recentQuery.data?.map((id) => books.find((b) => b.id === id));

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    const booksInStorage = localStorage.getItem('books');
    if (!booksInStorage && !hasVisited) {
      // Solo mostrar demo si nunca ha entrado y no hay libros
      localStorage.setItem('hasVisited', 'true');
      // Cargar datos de demo en memoria
      setInitialData2();
      qc.resetQueries({ queryKey: ['books'] });
      qc.resetQueries({ queryKey: ['collections'] });
      qc.resetQueries({ queryKey: ['userName'] });
      qc.resetQueries({ queryKey: ['recent'] });
      qc.resetQueries({ queryKey: ['progress'] });
    }
  }, [qc]);

  return (
    <>
      <div>
        <div>
          Recent <h2 className="inline">Books</h2>
        </div>

        <Divider className="mb-4" />

        <div className="space-y-4">
          {recent && recent.length > 0 ? (
            recent.map(
              (book) =>
                book && (
                  <ListItemCard
                    key={book.id}
                    href={`/books/${book.id}`}
                    imageSrc={book.coverUrl}
                    title={book.title}
                    subtitle={book.series}
                    author={book.author}
                    progress={progress ? getBookProgress(book, progress) : 0}
                  />
                )
            )
          ) : (
            <div className="py-4 text-sm italic">
              Once You read a Book or a Chapter your recent books will appear
              here
            </div>
          )}
        </div>
      </div>

      <div>
        {/* TODO: Remove */}
        <Button
          onPress={onOpen}
          color="danger"
        >
          Reset All
        </Button>
        {/* <Button onPress={setInitialData2}>Init</Button> */}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-red-200">
          {(onClose) => (
            <>
              <ModalHeader className="text-red-700">
                Delete All Data!?
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const inputVal = new FormData(e.currentTarget)
                      .get('delete')
                      ?.toString();

                    if (inputVal?.toLowerCase() === 'delete') {
                      removeAllData();
                      onClose();
                      qc.invalidateQueries({ queryKey: ['books'] });
                      qc.invalidateQueries({ queryKey: ['collections'] });
                      qc.invalidateQueries({ queryKey: ['userName'] });
                      qc.invalidateQueries({ queryKey: ['recent'] });
                      qc.invalidateQueries({ queryKey: ['progress'] });
                    }
                  }}
                >
                  <Input
                    classNames={{
                      label: 'text-red-700',
                      description: 'text-red-700 text-sm font-semibold',
                    }}
                    variant="faded"
                    color="danger"
                    label='Type "Delete" to confirm'
                    name="delete"
                    description="You will lose all your Books, Collections, and Progress saved!"
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
