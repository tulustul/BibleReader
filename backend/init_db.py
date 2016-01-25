import os
import subprocess
import sys

import sqlalchemy

import db
import models
import sql

ROOT = os.path.join('..', 'trans')


def insert_data(force):
    for lang in os.listdir(ROOT):
        language = save_lang(lang)
        for tran in os.listdir(os.path.join(ROOT, lang)):
            tran_path = os.path.join(ROOT, lang, tran)
            text_path = os.path.join(tran_path, 'text')
            if os.path.exists(text_path) and not force:
                load_text(text_path, language)
            else:
                parse_text(force, tran_path, text_path, language)


def save_lang(lang):
    lang_path = os.path.join(ROOT, lang, 'name')
    if os.path.exists(lang_path):
        with open(lang_path) as f:
            lang_name = f.read()
        language = models.Language(
            short_name=lang,
            name=lang_name,
        )
        sql.DBSession.add(language)
        sql.DBSession.flush()
        return language
    else:
        print('No "name" file for language "{}"'.format(lang))


def save_tran(tran, language):
    translation = models.Translation(
        name=tran.strip(),
        language=language.id,
    )
    sql.DBSession.add(translation)
    sql.DBSession.flush()
    return translation


def parse_text(force, path, text_path, language):
    parse_path = os.path.join(path, 'parse.py')
    if os.path.exists(parse_path):
        orig_working_dict = os.getcwd()
        os.chdir(path)
        result = subprocess.call(['python', 'parse.py'])
        os.chdir(orig_working_dict)
        if result == 0 and os.path.exists(text_path):
            load_text(text_path, language)
        else:
            print('Failed to parse {}'.format(path))
    else:
        print('Missing parse function for {}'.format(path))


def load_text(path, language):
    with open(path, encoding='utf-8') as f:
        lines = f.readlines()
        translation = save_tran(lines[0], language)

        for line in lines[1:]:
            line = line.strip()
            book, chapter, verse, line = line.split(maxsplit=3)
            verse = models.Verse(
                book=book,
                chapter=chapter,
                verse=verse,
                text=line,
                search=sqlalchemy.func.to_tsvector(line),
                translation=translation.id,
            )
            sql.DBSession.add(verse)
    sql.DBSession.flush()


if __name__ == '__main__':
    force = len(sys.argv) > 1 and sys.argv[1] == 'force'

    db.connect_db()
    db.create_db_session()

    if force:
        sql.Base.metadata.drop_all(sql.Base.metadata.bind)

    sql.Base.metadata.create_all(sql.Base.metadata.bind)
    insert_data(force)
    sql.DBSession.commit()
