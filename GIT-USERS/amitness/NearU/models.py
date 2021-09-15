from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Company(db.Model):
    __table__name = "company"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    location = db.Column(db.String(255))
    description = db.Column(db.String(2000))
    org_type = db.Column(db.String(20))
    logo = db.Column(db.String(100))

    def __init__(self, name, location, description, org_type, logo):
        self.name = name
        self.location = location
        self.description = description
        self.org_type = org_type
        self.logo = logo

    def __repr__(self):
        return "<Company %r>" % self.name


class Events(db.Model):
    __tablename__ = "Events"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    location = db.Column(db.String(255))
    dateTime = db.Column(db.DateTime)
    description = db.Column(db.Text)
    organizer = db.Column(db.String(255))
    banner = db.Column(db.String(255))

    def __init__(self, title, location, dateTime, description, organizer, banner):
        self.title = title
        self.location = location
        self.dateTime = dateTime
        self.description = description
        self.organizer = organizer
        self.banner = banner

    def __repr__(self):
        return "<Event %r>" % self.title


class Reviews(db.Model):
    __tablename__ = "Reviews"
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text)
    rating = db.Column(db.Float)
    eventID = db.Column(db.Integer, db.ForeignKey("Events.id"))

    def __init__(self, comment, rating, eventID):
        self.comment = comment
        self.rating = rating
        self.eventID = eventID


class Landmark(db.Model):
    __tablename__ = "Landmarks"
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(20))
    description = db.Column(db.Text)
    image = db.Column(db.String(1000))

    def __init__(self, location, description, image):
        self.location = location
        self.description = description
        self.image = image
