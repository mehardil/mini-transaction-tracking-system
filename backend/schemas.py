from pydantic import BaseModel, Field
from datetime import datetime

class TransactionCreate(BaseModel):
    transaction_id: str = Field(..., min_length=1)
    user_id: str = Field(..., min_length=1)
    amount: float = Field(..., gt=0)
    timestamp: datetime
    device_id: str = Field(..., min_length=1)

