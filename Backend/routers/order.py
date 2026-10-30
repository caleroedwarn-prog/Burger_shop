from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Product, Order, OrderItem
from schemas import OrderCreate, OrderOut

router = APIRouter()

@router.post("/order", response_model=OrderOut)
def create_order(order_data: OrderCreate, db = Depends(get_db)):
    total = 0.0
    order_items = []

    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        margin = product.price * item.quantity

        if product is None:
            raise HTTPException(
                status_code=404,
                detail = "Product not found"
            )
        total += margin
        new_item = Order(
            customer_name=product.id,
            quantity=item.quantity,
            price_at_purchase = product.price
        )
        order_items.append(new_item)

    new_order = Order(
        customer_name=order_data.customerName,
        phone=order_data.phone,
        address=order_data.address,
        total=total,
        status="pending",
        items=order_items
    )
    db.add(new_order)
    db.commit()
    db.refrech(new_order)

    return{
        "id": new_order.id,
        "customerName": new_order.customer_name,
        "address": new_order.address,
        "total": new_order.total,
        "status": new_order.status,
        "createdAt": new_order.created_at
    }