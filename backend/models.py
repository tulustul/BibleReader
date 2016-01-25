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
    short_name = Column(String(5))
    name = Column(String(100))

    translations = relationship('Translation', cascade='delete, all')


class Translation(sql.BaseEntity):
    __tablename__ = 'translation'
    name = Column(String(100))
    language = Column(Integer, ForeignKey('language.id'))


class Verse(sql.BaseEntity):
    __tablename__ = 'verse'
    text = Column(Text)
    search = Column(TSVectorType)
    chapter = Column(Integer)
    verse = Column(Integer)
    book = Column(String(50))
    translation = Column(Integer, ForeignKey('translation.id'))
