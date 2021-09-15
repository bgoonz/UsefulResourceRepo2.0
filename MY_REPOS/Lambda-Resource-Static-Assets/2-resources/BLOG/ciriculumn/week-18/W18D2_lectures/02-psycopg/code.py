import psycopg2

CONNECTION_PARAMETERS = {
    'dbname': 'petrack',
    'user': 'vet_app',
    'password': 'password',
    'host': 'localhost',
}

with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
# with psycopg2.connect(dbname='petrack', user='vet_app', ...) as conn:
    with conn.cursor() as cursor:
        cursor.execute("""
            SELECT id, first_name, last_name, email
            FROM owners
            ORDER BY last_name
        """)
        print("owners")

        # Parse all results of our query execution, collected in list
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        
        # Parse the next result of our query execution
        while row := cursor.fetchone():
            print(row)
            
        cursor.execute("""
            SELECT id, first_name, last_name, email
            FROM owners
            WHERE last_name like %(filter)s
            ORDER BY last_name
        """, {'filter': 'M%'})
        print("\nowners M%")
        print(cursor.fetchall())

        cursor.execute("""
            INSERT INTO owners(first_name, last_name, email)
            VALUES
            (%(first_name)s, %(last_name)s, %(email)s)
        """, {
            'first_name': 'Carlsbad',
            'last_name': 'Koch',
            'email': 'carl@koch.com'
        })
        cursor.execute("""
            SELECT id, first_name, last_name, email
            FROM owners
            ORDER BY last_name
        """)
        print("\nowners after insert")
        print(cursor.fetchall())

        cursor.execute("""
            SELECT p.id, p.name, pt.type, p.age, p.has_microchip
            FROM pets p
            JOIN pet_types pt ON (p.pet_type_id = pt.id)
            ORDER BY name
        """)
        print("\npets")
        print(cursor.fetchall())
