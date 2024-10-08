from database import (
    DBSession,
)
from database.models import (
    User,
)


def test_insert_sqlalchemy():
    with DBSession.disposable() as s:
        obj = User()
        obj.email = "user@test.com"
        obj.name = "Franco"
        obj.surname = "Franchi"
        s.add(obj)
        s.commit()
