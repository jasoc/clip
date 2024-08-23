from authentication import get_current_user
from core.responses import http_response
from fastapi import APIRouter, Body, Depends, HTTPException, status
from typing import Annotated, List
from database.models import Dashboard
from schemas import DashboardModel, HttpResponseModel, UserModel
from utils import context

dashboards_router = APIRouter()


@dashboards_router.post("/", response_model=HttpResponseModel[DashboardModel], status_code=status.HTTP_201_CREATED)
async def create_dashboard(dashboard: DashboardModel, current_user: Annotated[UserModel, Depends(get_current_user)]):
    db_dashboard = None
    new_dashboard = None
    with context.db_session() as db:
        db_dashboard = db.query(Dashboard).filter(Dashboard.name == dashboard.name).first()
        if db_dashboard:
            raise HTTPException(status_code=400, detail=f"A dashboard with name {dashboard.name} already exists")
        new_dashboard = Dashboard()
        new_dashboard.name = dashboard.name
        new_dashboard.json_grid = dashboard.json_grid
        new_dashboard.user_id = current_user.id
        db.add(new_dashboard)
        db.commit()
        db.refresh(new_dashboard)
    return http_response(status_code=status.HTTP_201_CREATED, data=DashboardModel.from_db_model(new_dashboard).model_dump())


@dashboards_router.get("/", response_model=HttpResponseModel[List[DashboardModel]], status_code=status.HTTP_200_OK)
async def read_dashboards(_: Annotated[UserModel, Depends(get_current_user)], skip: int = 0, limit: int = 100):
    dashboards = None
    with context.db_session() as db:
        dashboards = db.query(Dashboard).offset(skip).limit(limit).all()
    return http_response(data=[DashboardModel.from_db_model(dashboard).model_dump() for dashboard in dashboards])


@dashboards_router.get("/{dashboard_id}", response_model=HttpResponseModel[DashboardModel])
async def read_dashboard(_: Annotated[UserModel, Depends(get_current_user)], dashboard_id: str):
    dashboards = None
    with context.db_session() as db:
        dashboard = db.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
    if dashboard is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dashboard not found")
    return http_response(data=DashboardModel.from_db_model(dashboard).model_dump())


@dashboards_router.put("/{dashboard_id}", response_model=HttpResponseModel[DashboardModel])
async def update_dashboard(_: Annotated[UserModel, Depends(get_current_user)], dashboard_id: str, body_dashboard: DashboardModel):
    db_dashboard = None
    with context.db_session() as db:
        db_dashboard = db.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
        if db_dashboard is None:
            raise HTTPException(status_code=404, detail="Dashboard not found")
        db_dashboard.name = body_dashboard.name
        db_dashboard.json_grid = body_dashboard.json_grid
        db.commit()
        db.refresh(db_dashboard)
    return http_response(data=DashboardModel.from_db_model(db_dashboard).model_dump())


@dashboards_router.delete("/{dashboard_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dashboard(current_user: Annotated[UserModel, Depends(get_current_user)], dashboard_id: str):
    db_dashboard = None
    with context.db_session() as db:
        db_dashboard = db.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
        if db_dashboard is None:
            raise HTTPException(status_code=404, detail="Dashboard not found")
        db.delete(db_dashboard)
        db.commit()
    return http_response(status_code=status.HTTP_200_OK)
