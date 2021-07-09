from libsite.models import Author, Book, Borrower

borrowers = []
with open("borrowers.csv", "r") as f:
    header = True
    for r in f:
        if header:
            header = False
            continue
        borrowers.append(r.strip().split(","))

for i in borrowers:
    b = Borrower(
        card_id=i[0],
        ssn=i[1],
        bname=i[2] + " " + i[3],
        address=i[5] + " " + i[6] + " " + i[7],
        phone=i[8],
    )
    b.save()


with open("books.csv", "r", encoding="utf8") as f:
    header = True
    for r in f:
        if header:
            header = False
            continue
        r = r.strip().split("\t")
        b = Book(isbn=r[0], title=r[2], cover=r[4], publisher=r[5], pages=r[6])
        b.save()
        for auth in r[3].split(","):
            if Author.objects.filter(name=auth).exists():
                a = Author.objects.get(name=auth)
                b.authors.add(a)
            else:
                a = b.authors.create(name=auth)
