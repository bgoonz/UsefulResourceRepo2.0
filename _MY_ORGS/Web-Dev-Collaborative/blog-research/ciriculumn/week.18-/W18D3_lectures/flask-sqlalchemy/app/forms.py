from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, SelectField, StringField
from wtforms.validators import DataRequired, Email


class PetForm(FlaskForm):
    age = IntegerField("Age", [DataRequired()])
    has_microchip = BooleanField("Has microchip?")
    name = StringField("Name", [DataRequired()])
    pet_type_id = SelectField("Pet type", [DataRequired()])
    owner_id = SelectField("Owner", [DataRequired()])


class OwnerForm(FlaskForm):
    first_name = StringField("First name", [DataRequired()])
    last_name = StringField("Last name", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
