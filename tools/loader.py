import collections
import os
import sys

ROOT = 'trans'


class BibleFormatError(Exception):

    def __init__(self, path, line_number, line):
        super().__init__()
        self.path = path
        self.line_number = line_number
        self.line = line

    def __str__(self):
        return '{}:{}\t{}'.format(
            self.path,
            self.line_number,
            self.line,
        )


def list_translations():
    for language in os.listdir(ROOT):
        for translation in os.listdir(os.path.join(ROOT, language)):
            if translation.endswith('.bible'):
                yield '{}/{}'.format(language, translation)


def load_translation(translation_path, continue_on_error=False):
    language = translation_path.split('/')[0]
    with open(os.path.join(ROOT, translation_path), encoding='utf8') as f:
        lines = f.readlines()
        translation = {
            'path': translation_path,
            'language': language,
            'title': lines[0],
            'books': {},
            'text': collections.defaultdict(dict)
        }
        handler = None
        line_no = 0
        for line in lines:
            line_no += 1

            if not line:
                continue

            line = line.strip()

            if line.startswith('# BOOKS LIST'):
                handler = handle_book
                continue
            elif line.startswith('# TEXT'):
                handler = handle_text
                continue

            if handler:
                try:
                    handler(translation, line)
                except ValueError:
                    error = BibleFormatError(
                        path=translation_path,
                        line_number=line_no,
                        line=line,
                    )
                    if continue_on_error:
                        print(error, file=sys.stderr)
                    else:
                        raise error

    return translation


def handle_book(translation, line):
    book, name = line.split(maxsplit=1)
    translation['books'][book] = name


def handle_text(translation, line):
    book, verse, text = line.split(maxsplit=2)
    chapter, verse = verse.split(':')

    chapter = int(chapter)
    verse = int(verse)

    book_dict = translation['text'][book]

    if chapter not in book_dict:
        book_dict[chapter] = {}

    book_dict[int(chapter)][int(verse)] = text.strip()
