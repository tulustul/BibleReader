import os
import sys

import sqlalchemy

import db
import models
import sql
from tools import loader

ROOT = os.path.join('..', 'trans')


def insert_data(force):
    for lang in loader.list_languages():
        print('Saving {}'.format(lang))
        language = save_lang(loader.load_language(lang))
        for tran in loader.list_translations(language=lang):
            print('Saving {}'.format(tran))
            save_tran(loader.load_translation(tran), language)


def save_lang(lang):
    language = models.Language(
        code=lang['code'],
        name=lang['name'],
    )
    sql.DBSession.add(language)
    for book, book_translated in lang['books'].items():
        language_book = models.LanguageBook(
            language=language.id,
            book=book,
            book_translated=book_translated,
        )
        sql.DBSession.add(language_book)
    sql.DBSession.flush()
    return language


def save_tran(tran, language):
    translation = models.Translation(
        name=tran['name'],
        language=language.id,
    )
    sql.DBSession.add(translation)
    sql.DBSession.flush()

    for book, book_translated in tran['books'].items():
        translation_book = models.TranslationBook(
            translation=translation.id,
            book=book,
            book_name=book_translated,
        )
        sql.DBSession.add(translation_book)

    for book, chapters in tran['text'].items():
        for chapter, verses in chapters.items():
            for verse_number, verse in verses.items():
                verse = models.Verse(
                    book=book,
                    chapter=chapter,
                    verse=verse_number,
                    text=verse,
                    search=sqlalchemy.func.to_tsvector(verse),
                    translation=translation.id,
                )
                sql.DBSession.add(verse)

    sql.DBSession.flush()
    return translation


if __name__ == '__main__':
    force = len(sys.argv) > 1 and sys.argv[1] == 'force'

    db.connect_db()
    db.create_db_session()

    if force:
        sql.Base.metadata.drop_all(sql.Base.metadata.bind)

    sql.Base.metadata.create_all(sql.Base.metadata.bind)
    insert_data(force)
    sql.DBSession.commit()
