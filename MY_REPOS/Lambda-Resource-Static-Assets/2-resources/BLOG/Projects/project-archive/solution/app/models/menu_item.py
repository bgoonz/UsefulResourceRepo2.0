from .db import db


class MenuItem(db.Model):
    __tablename__ = "menu_items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Float, nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey("menus.id"))
    menu_type_id = db.Column(db.Integer, db.ForeignKey("menu_item_types.id"))

    menu = db.relationship("Menu", back_populates="items")
    type = db.relationship("MenuItemType")
