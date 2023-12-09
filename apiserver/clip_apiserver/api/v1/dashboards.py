from database.models.dashboard import Dashboard
from fastapi import APIRouter, Body, Response

from typing import Annotated

from fastapi import Depends, status
from fastapi.responses import JSONResponse
from schemas import UserSchema
from schemas.dashboard import DashboardSchema
from sqlalchemy import select
from utils import get_logger
from authentication import get_current_user
from database import DBSession

logger = get_logger("dashboards_router")

dashboards_router = APIRouter()

@dashboards_router.post("/create")
async def dashboards_create(body: Annotated[DashboardSchema, Body()], _: Annotated[UserSchema, Depends(get_current_user)]):
    with DBSession.disposable() as session:
        statement = select(Dashboard).filter_by(id=body.id)
        if session.scalars(statement).one_or_none() is not None:
            return JSONResponse(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                content={"error": f"A dashboard with name {body.name} already exists."},
            )
        obj = Dashboard()
        obj.name = body.name
        obj.json_grid = body.json_grid
        obj.columns = body.columns
        obj.rows = body.rows
        session.add(obj)
        session.commit()
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=None)

@dashboards_router.post("/update")
async def dashboards_update(body: Annotated[DashboardSchema, Body()], _: Annotated[UserSchema, Depends(get_current_user)]):
    with DBSession.disposable() as session:
        statement = select(Dashboard).filter_by(id=body.id)
        existing_dashboard = session.scalars(statement).one_or_none()
        if existing_dashboard is None:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"error": f"A dashboard with name {body.name} does not exist."},
            )
        existing_dashboard.name = body.name
        existing_dashboard.json_grid = body.json_grid
        existing_dashboard.columns = body.columns
        existing_dashboard.rows = body.rows
        session.commit()
        return JSONResponse(status_code=status.HTTP_200_OK, content=None)

@dashboards_router.get("/", status_code=status.HTTP_200_OK, response_model=list[DashboardSchema])
async def dashboards_get(_: Annotated[UserSchema, Depends(get_current_user)]):
    with DBSession.disposable() as session:
        dashboards = session.scalars(select(Dashboard))
        res: list[DashboardSchema] = []
        for dashboard in dashboards.all():
            ds = DashboardSchema()
            ds.id = dashboard.id
            ds.name = dashboard.name
            ds.json_grid = dashboard.json_grid
            ds.columns = dashboard.columns
            ds.rows = dashboard.rows
            res.append(ds)
        return res
