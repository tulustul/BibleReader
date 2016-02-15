from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Text,
)
from sqlalchemy.orm import relationship
from sqlalchemy_utils import TSVectorType

import sql


class Language(sql.BaseEntity):
    __tablename__ = 'language'
    code = Column(String(5))
    name = Column(String(100))

    translations = relationship('Translation', cascade='delete, all')
    books = relationship('LanguageBook', cascade='delete, all')


class LanguageBook(sql.BaseEntity):
    __tablename__ = 'language_book'
    language = Column(Integer, ForeignKey('language.id'))
    book = Column(String(5))
    book_translated = Column(String(5))


class Translation(sql.BaseEntity):
    __tablename__ = 'translation'
    name = Column(String(100))
    language = Column(Integer, ForeignKey('language.id'))
    books = relationship('TranslationBook', cascade='delete, all')


class TranslationBook(sql.BaseEntity):
    __tablename__ = 'translation_book'
    translation = Column(Integer, ForeignKey('translation.id'))
    book = Column(String(5))
    book_name = Column(String(50))


class Verse(sql.BaseEntity):
    __tablename__ = 'verse'
    text = Column(Text)
    search = Column(TSVectorType)
    chapter = Column(Integer)
    verse = Column(Integer)
    book = Column(String(5))
    translation = Column(Integer, ForeignKey('translation.id'))
