from sqlalchemy import create_engine

import settings
import sql
import models as _


def connect_db():
    sql_engine = create_engine(settings.DATABASE)
    sql.DBSessionMaker.configure(bind=sql_engine)
    sql.Base.metadata.bind = sql_engine


def create_db_session():
    sql.set_session(sql.DBSessionMaker())
    sql.DBSession = sql.DBSessionMaker()
