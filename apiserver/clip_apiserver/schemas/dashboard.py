from pydantic import BaseModel

class DashboardSchema(BaseModel):
    id: str = None
    name: str = None
    json_grid: str = None
    columns: int = None
    rows: int = None
