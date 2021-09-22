from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import Owner, Pet, PetType

with app.app_context():
    db.drop_all()
    db.create_all()

    dog = PetType(type="Dog")
    cat = PetType(type="Cat")
    jackelope = PetType(type="Jackelope")

    carlo = Owner(first_name="Carlo", last_name="Missoni", email="carlo@yahoo.com")
    fido = Pet(name="Fido", type=dog, age=6, owners=[carlo])
    sparky = Pet(name="Sparky", type=dog, age=1, owners=[carlo])

    maria = Owner(first_name="Maria", last_name="Missoni", email="maria@outlook.com")
    fido.owners.append(maria)

    db.session.add(dog)
    db.session.add(cat)
    db.session.add(jackelope)
    db.session.add(carlo)
    db.session.commit()
