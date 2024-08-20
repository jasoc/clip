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
    db_dashboard = context.db_session.query(Dashboard).filter(Dashboard.name == dashboard.name).first()
    if db_dashboard:
        raise HTTPException(status_code=400, detail="Dashboard already exists")
    new_dashboard = Dashboard()
    new_dashboard.name = dashboard.name
    new_dashboard.json_grid = dashboard.json_grid
    new_dashboard.owner_id = current_user.id
    context.db_session.add(new_dashboard)
    context.db_session.commit()
    context.db_session.refresh(new_dashboard)
    return new_dashboard

@dashboards_router.get("/", response_model=HttpResponseModel[List[DashboardModel]], status_code=status.HTTP_200_OK)
async def read_dashboards(current_user: Annotated[UserModel, Depends(get_current_user)], skip: int = 0, limit: int = 100):
    print(context.db_session)
    dashboards = context.db_session.query(Dashboard).offset(skip).limit(limit).all()
    return http_response(data=dashboards)

@dashboards_router.get("/{dashboard_id}", response_model=HttpResponseModel[DashboardModel])
async def read_dashboard(current_user: Annotated[UserModel, Depends(get_current_user)], dashboard_id: str):
    dashboard = context.db_session.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
    if dashboard is None:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    return http_response(data=dashboard)

@dashboards_router.put("/{dashboard_id}", response_model=HttpResponseModel[DashboardModel])
async def update_dashboard(current_user: Annotated[UserModel, Depends(get_current_user)], dashboard_id: int, body_dashboard: DashboardModel):
    db_dashboard = context.db_session.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
    if db_dashboard is None:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    db_dashboard.name = body_dashboard.name
    db_dashboard.json_grid = body_dashboard.json_grid
    context.db_session.commit()
    context.db_session.refresh(db_dashboard)
    return http_response(data=db_dashboard)

@dashboards_router.delete("/{dashboard_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dashboard(current_user: Annotated[UserModel, Depends(get_current_user)], dashboard_id: int):
    db_dashboard = context.db_session.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
    if db_dashboard is None:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    context.db_session.delete(db_dashboard)
    context.db_session.commit()
    return http_response(status_code=status.HTTP_204_NO_CONTENT)
