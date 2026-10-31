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
    # ---------- BEEF ----------
    Product(
        name="Classic Beef Burger",
        description="Grilled beef patty with lettuce, tomato, onion and our house sauce on a sesame bun.",
        price=2500,
        image="/classic-beef-burger.jpg",
        category="Beef",
    ),
    Product(
        name="Cheese Burger",
        description="Juicy beef patty topped with melted cheddar, fresh lettuce and tomato.",
        price=3000,
        image="/cheese-burger.jpg",
        category="Beef",
    ),
    Product(
        name="Double Beef Burger",
        description="Two beef patties, double cheese and extra sauce for the really hungry.",
        price=4500,
        image="/double-beef-burger.jpg",
        category="Beef",
    ),
    Product(
        name="BBQ Bacon Burger",
        description="Beef patty with crispy bacon, cheddar and smoky BBQ sauce.",
        price=4000,
        image="/bbq-bacon-burger.jpg",
        category="Beef",
    ),
    Product(
        name="Smash Burger",
        description="Smashed beef patty with crispy edges, melted cheese and pickles.",
        price=3500,
        image="/smash-burger.jpg",
        category="Beef",
    ),

    # ---------- CHICKEN ----------
    Product(
        name="Crispy Chicken Burger",
        description="Crispy fried chicken fillet with lettuce and creamy mayo.",
        price=2800,
        image="/crispy-chicken-burger.jpg",
        category="Chicken",
    ),
    Product(
        name="Spicy Chicken Burger",
        description="Crispy chicken with hot pepper sauce, lettuce, tomato and onion.",
        price=3200,
        image="/spicy-chicken-burger.jpg",
        category="Chicken",
    ),
    Product(
        name="Grilled Chicken Burger",
        description="Grilled chicken breast with fresh salad and light garlic sauce.",
        price=3000,
        image="/grilled-chicken-burger.jpg",
        category="Chicken",
    ),

    # ---------- VEGGIE ----------
    Product(
        name="Veggie Burger",
        description="Grilled vegetable patty with fresh salad, tomato and house sauce.",
        price=2200,
        image="/veggie-burger.jpg",
        category="Veggie",
    ),

    # ---------- FISH ----------
    Product(
        name="Fish Fillet Burger",
        description="Crispy fish fillet with tartar sauce, lettuce and a slice of cheese.",
        price=3300,
        image="/fish-fillet-burger.jpg",
        category="Fish",
    ),

    # ---------- COMBOS ----------
    Product(
        name="Classic Combo",
        description="Classic Beef Burger with a portion of fries and a cold drink.",
        price=4500,
        image="/classic-combo.jpg",
        category="Combos",
    ),
    Product(
        name="Spicy Chicken Combo",
        description="Spicy Chicken Burger with a portion of fries and a cold drink.",
        price=5500,
        image="/spicy-chicken-combo.jpg",
        category="Combos",
    ),
    Product(
        name="Double Beef Combo",
        description="Double Beef Burger with a large portion of fries and a cold drink.",
        price=6500,
        image="/double-beef-combo.jpg",
        category="Combos",
    ),

    # ---------- FRIES ----------
    Product(
        name="French Fries",
        description="Golden, crispy fries lightly salted.",
        price=1000,
        image="/french-fries.jpg",
        category="Fries",
    ),
    Product(
        name="Large Fries",
        description="A large portion of golden, crispy fries to share.",
        price=1500,
        image="/large-fries.jpg",
        category="Fries",
    ),

    # ---------- DRINKS ----------
    Product(
        name="Cold Soft Drink",
        description="Ice-cold soft drink served in a cup.",
        price=500,
        image="/cold-drink.jpg",
        category="Drinks",
    ),
    Product(
        name="Fresh Juice",
        description="Freshly pressed fruit juice, served chilled.",
        price=1000,
        image="/fresh-juice.jpg",
        category="Drinks",
    ),
]
            
            db.add_all(sample_products)
            db.commit()

    finally:
        db.close() 
seed_products()        
