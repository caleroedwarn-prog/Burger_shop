from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from models import Product
from routers import products, order

Base.metadata.create_all(bind = engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    # Browsers block a website from talking to a different address, unless the backend says "this one is allowes". 5173 is the address Vite shows when you run npn run dev
)

app.include_router(products.router)
app.include_router(order.router)

#this makes /products and /order exists, If you forget this two lines. the app gets 404 for everything

@app.get("/")
def home():
    return {"message": "Burger Shop Backend is running ..."}

def seed_products():
    db = SessionLocal()
    try:
        count = db.query(Product).count()

        if count == 0:
            sample_products = [
                Product(
                    name = "Classic Burger",
                    description = "Beef patty, lettuce, tomato, and our house sauce",
                    price = 2500,
                    image = "",
                    category = ""

                ),

                Product(
                    name = "Classic Burger",
                    description = "Beef patty, lettuce, tomato, and our house sauce",
                    price = 2500,
                    image = "",
                    category = ""

                ),

                Product(
                    name = "Classic Burger",
                    description = "Beef patty, lettuce, tomato, and our house sauce",
                    price = 2500,
                    image = "",
                    category = ""

                ),

                Product(
                    name = "Classic Burger",
                    description = "Beef patty, lettuce, tomato, and our house sauce",
                    price = 2500,
                    image = "",
                    category = ""

                ),
            ]
            db.add_all(sample_products)
            db.commit()

    finally:
        db.close() 
seed_products()        
