from database.models import Dashboard
from pydantic import BaseModel


class DashboardModel(BaseModel):
    id: str = None
    name: str = None
    json_grid: str = None
    user_id: str = None

    @staticmethod
    def from_db_model(dashboard_model: Dashboard):
        dashboard = DashboardModel()
        dashboard.id = str(dashboard_model.id)
        dashboard.name = dashboard_model.name
        dashboard.json_grid = dashboard_model.json_grid
        dashboard.user_id = str(dashboard_model.user_id)
        return dashboard