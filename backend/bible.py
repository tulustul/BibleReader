import collections

import flask
import sqlalchemy

import db
import models
import sql


app = flask.Flask(__name__)


VersesMetadata = collections.namedtuple('VersesMetadata', [
    'book', 'chapter', 'verse_from', 'verse_to'
])


def parse_verse_string(verse_string):
    book, verse = verse_string.split()
    chapter, verse = verse.split(':')
    if '-' in verse:
        verse_from, verse_to = verse.split('-')
        verse = None
    return VersesMetadata(
        book=book,
        chapter=chapter,
        verse_from=verse or verse_from,
        verse_to=verse or verse_to,
    )


@app.route('/api/v1/translations')
def translations():
    languages = [
        {
            'id': language.id,
            'name': language.name,
            'short_name': language.short_name,
            'translations': [
                {
                    'id': translation.id,
                    'name': translation.name,
                }
                for translation in language.translations
            ],
        }
        for language in sql.DBSession.query(models.Language)
    ]
    return flask.Response(
        flask.json.dumps({'languages': languages}),
        mimetype='application/json',
        headers={
            'Access-Control-Allow-Origin': '*',
        }
    )


@app.route('/api/v1/verses/<verse_string>')
def verses(verse_string):
    verses_metadata = parse_verse_string(verse_string)
    translation_ids = flask.request.args.get('t', '')
    if translation_ids:
        translation_ids = translation_ids.split(',')

    translations = sql.DBSession.query(models.Translation).filter(
        models.Translation.id.in_(translation_ids)
    )

    translations_json = []
    translations_map = {}
    for translation in translations:
        translations_json.append({
            'id': translation.id,
            'name': translation.name,
            'verses': [],
        })
        translations_map[translation.id] = translations_json[-1]['verses']

    verses = sql.DBSession.query(models.Verse).filter(
        models.Verse.translation.in_(translation_ids),
        models.Verse.book == verses_metadata.book,
        models.Verse.chapter == int(verses_metadata.chapter),
        models.Verse.verse >= int(verses_metadata.verse_from),
        models.Verse.verse <= int(verses_metadata.verse_to),
    ).order_by(models.Verse.verse)

    for verse in verses:
        translations_map[verse.translation].append({
            'verse': verse.verse,
            'text': verse.text,
        })

    result = {
        'book': verses_metadata.book,
        'chapter': verses_metadata.chapter,
        'translations': translations_json,
    }

    return flask.Response(
        flask.json.dumps(result),
        mimetype='application/json',
        headers={
            'Access-Control-Allow-Origin': '*',
        }
    )


@app.route('/api/v1/search/<search_term>')
def search(search_term):
    translation_ids = flask.request.args.get('t', '')

    search_term = search_term.replace(' ', '&')

    filters = [models.Verse.search.match(search_term)]

    if translation_ids:
        filters.append(models.Verse.translation.in_(
            translation_ids.split(',')
        ))

    verses = sql.DBSession.query(models.Verse).filter(*filters).limit(50)

    verses_json = []
    for verse in verses:
        verses_json.append({
            'translation': verse.translation,
            'book': verse.book,
            'chapter': verse.chapter,
            'verse': verse.verse,
            'text': verse.text,
        })

    return flask.Response(
        flask.json.dumps(verses_json),
        mimetype='application/json',
        headers={
            'Access-Control-Allow-Origin': '*',
        }
    )

if __name__ == '__main__':
    db.connect_db()
    app.run(debug=True)
