from app import db
from models import Events, Company, Landmark, Reviews
import pandas


def insert_events():
    event_data = pandas.read_csv("events.csv", quotechar='"')
    for i in range(len(event_data)):
        event = Events(
            event_data["title"][i],
            event_data["location"][i],
            event_data["dateTime"][i],
            event_data["description"][i],
            event_data["organizer"][i],
            event_data["banner"][i],
        )
        db.session.add(event)
    db.session.commit()


# Insert hotels/shops
def insert_company():
    companies = pandas.read_csv("company.csv", quotechar='"', na_filter=False)
    for i in range(len(companies)):
        company = Company(
            companies["name"][i],
            companies["location"][i],
            companies["description"][i],
            companies["org_type"][i],
            companies["logo"][i],
        )
        db.session.add(company)
    db.session.commit()


if __name__ == "__main__":
    insert_events()
    insert_company()
