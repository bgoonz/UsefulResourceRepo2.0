from .db import db


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer,
                            db.ForeignKey("employees.id"),
                            nullable=False)
    table_id = db.Column(db.Integer,
                         db.ForeignKey("tables.id"),
                         nullable=False)
    finished = db.Column(db.Boolean, nullable=False)

    employee = db.relationship("Employee", back_populates="orders")
    table = db.relationship("Table", back_populates="orders")
    details = db.relationship("OrderDetail", back_populates="order")

    @property
    def total(self):
        return sum([detail.menu_item.price for detail in self.details])
