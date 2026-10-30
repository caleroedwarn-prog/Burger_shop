from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Product
from schemas import ProductOut

router = APIRouter()

@router.get("/products", response_model=list[ProductOut]) # What ever this function returns, convert it to the datashape ProductOut (and a list of the datashape)
def get_products(db: Session = Depends(get_db)): # function being actually called, db:  Session: needs the database session and i will call it db, Depends(get_db) : call the function and give me whatever it returns(get_db is usualy a small funtion that opens a database connection and closes it when finished)
    products = db.query(Product).all() # db : the database connection we received , .querry(Product): I want to look at the Product table, .all(): Give me every single row that exists in that table, product becomes a normal python list that contains all the products from the database
    return products

@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product
