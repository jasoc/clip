from pydantic import BaseModel


class DashboardModel(BaseModel):
    id: str = None
    name: str = None
    json_grid: str = None
