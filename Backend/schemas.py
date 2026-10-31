from pydantic import BaseModel, Field, ConfigDict
import datetime
from typing import Optional


class ProductOut(BaseModel):
    #what we send back for one burger.
    id: int
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    category: str

    model_config = ConfigDict(from_attributes=True)

class OrderItemIn(BaseModel):
    #one Burger line the app sends
    product_id: int
    quantity: int = Field(ge=1)

class OrderCreate(BaseModel):
    #The whole order the app sends
    customerName: str = Field(min_length=2)
    phone: str = Field(min_length=9)
    address: str = Field(min_length=3)
    items: list[OrderItemIn]  = Field(min_length = 1)

class OrderOut(BaseModel):
    #What we send back after savings

    id: int
    customerName: str
    phone: str
    address: str
    total: float
    status: str
    createdAt: datetime.datetime