import loader
from bible_schema import schema


def compare(schema, data, prefix, object_type):
    schema = set(schema)
    data = set(data)
    if data != schema:
        extra_objects = data - schema
        missing_objects = schema - data
        if extra_objects:
            print(
                '{} have extra {} {}'
                .format(prefix, object_type, extra_objects)
            )
        if missing_objects:
            print(
                '{} have missing {} {}'
                .format(prefix, object_type, missing_objects)
            )


if __name__ == '__main__':

    schema_books = set(schema.keys())

    # translation = loader.load_translation('en/King James Version, American Edition.bible')

    # data = {
    #     book: {
    #         chapter: len(verses)
    #         for chapter, verses in chapters.items()
    #     }
    #     for book, chapters in translation['text'].items()
    # }
    # print(data)

    for translation in loader.list_translations():
        translation = loader.load_translation(
            translation, continue_on_error=True,
        )

        path = translation['path']

        data = {
            book: {
                chapter: len(verses)
                for chapter, verses in chapters.items()
            }
            for book, chapters in translation['text'].items()
        }

        compare(
            schema=schema_books,
            data=data.keys(),
            prefix=path,
            object_type='books',
        )

        for book in schema:
            if len(schema[book]) != len(data[book]):
                print(
                    '{} {} have different chapters number. '
                    'Should be {}, is {}.'
                    .format(path, book, len(schema[book]), len(data[book]))
                )

            compare(
                schema=schema[book].keys(),
                data=data[book].keys(),
                prefix='{} {}'.format(path, book),
                object_type='chapters',
            )

            chapters = set(schema[book].keys()) & set(data[book].keys())

            for chapter in chapters:
                schema_chapter = schema[book][chapter]
                data_chapter = data[book][chapter]

                if schema_chapter != data_chapter:
                    print(
                        '{} {} {} have different verses number. '
                        'Should be {}, is {}.'
                        .format(
                            path, book, chapter,
                            schema_chapter,
                            data_chapter,
                        )
                    )

                text_chapter = translation['text'][book][chapter]
                for i in range(1, len(text_chapter) + 1):
                    if i not in text_chapter:
                        print(
                            '{} {} {} have missing verse ({})'
                            .format(path, book, chapter, i)
                        )
