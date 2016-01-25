from sqlalchemy import (
    Column,
    Integer,
    types,
)
from sqlalchemy.ext.compiler import compiles

from sqlalchemy.ext.declarative import (
    declarative_base,
    AbstractConcreteBase,
)

from sqlalchemy.orm import (
    sessionmaker,
    class_mapper,
    joinedload,

)


DBSessionMaker = sessionmaker()
DBSession = DBSessionMaker()
Base = declarative_base()


def get_session():
    global DBSession
    return DBSession


def set_session(session):
    global DBSession
    DBSession = session


class tsvector(types.TypeDecorator):
    impl = types.UnicodeText


@compiles(tsvector, 'postgresql')
def compile_tsvector(element, compiler, **kw):
    return 'tsvector'


class BaseEntity(AbstractConcreteBase, Base):
    id = Column(Integer, primary_key=True)

    @classmethod
    def get_query_options(cls, *relations):
        if len(relations) == 1 and relations[0] == '*':
            return [joinedload(c.key) for c in class_mapper(cls).relationships]
        else:
            return [joinedload(relation) for relation in relations]

    @classmethod
    def query(cls, *relations):
        query = get_session().query(cls)
        return query.options(cls.get_query_options(*relations))

    @classmethod
    def count(cls):
        query = get_session().query(cls)
        return query.count()

    @classmethod
    def all(cls, *relations):
        return cls.query(*relations).all()

    @classmethod
    def get(cls, id_, *relations):
        return cls.query(*relations).get(id_)

    @classmethod
    def columns(cls, *columns):
        return get_session().query(*columns)

    @classmethod
    def delete(cls, id_):
        get_session().delete(cls.get(id_))
        get_session().flush()

    def save(self):
        if self.id is None:
            get_session().add(self)
        else:
            get_session().merge(self)
        get_session().flush()
