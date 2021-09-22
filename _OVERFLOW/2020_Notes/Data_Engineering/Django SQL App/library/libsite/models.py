from django.db import models
from django.db.models import Q
from datetime import datetime, timedelta
from django.db.models import Max
from django.db.models import F
from django.db.models import Sum


""" TO DO:
1. Filter for unpaid fines, open loans
2. Create Card_no function
3. Update/Create fines function
4. Pay Fine function

  """


def get_duedate():
    return datetime.today() + timedelta(days=14)


def Search_For_Checkout(key):
    res = Book.objects.filter(Q(pk=key))
    res = res.union(Book.objects.filter(Q(authors__name__icontains=key)))
    res = res.union(Book.objects.filter(Q(title__icontains=key)))
    if len(res) > 1:
        return res[:100]
    else:
        return res


def Search_For_Checkin(key):
    res = (
        Book.objects.filter(is_available=False)
        .filter(book_loan__date_in__isnull=True)
        .filter(
            Q(title__icontains=key)
            | Q(borrower__bname__icontains=key)
            | Q(isbn=key)
            | Q(borrower__card_id=key)
        )
    )
    if len(res) > 1:
        return res[:100]
    else:
        return res


def Search_For_Borrower(key):
    res = Borrower.objects.filter(Q(bname__icontains=key) | Q(card_id=key))
    if len(res) > 1:
        return res[:100]
    else:
        return res


def New_Borrower(name=None, SSN=None, address=None, phone=None):
    # LOGIC TO GENERATE CARD_ID
    card_id = make_card_id()
    new_borrower = Borrower(
        card_id=card_id, ssn=SSN, bname=name, address=address, phone=phone
    )
    new_borrower.save()
    return None


def Make_Fine(book, amt=0.00):
    loan = Book_Loan.objects.get(Q(book=book) & Q(date_in__isnull=True))
    try:
        f = Fine.objects.get(loan_id=loan)
        return False
    except:
        f = Fine(loan_id=loan, fine_amt=amt, paid=False)
        f.save()
        return True


def Update_Fines():
    overdue = Book_Loan.objects.filter(
        (Q(date_in__isnull=True) & Q(due_date__lt=datetime.now().date()))
        | (Q(date_in__isnull=False) & Q(due_date__gt=F("date_in")))
    )
    for l in overdue:
        if l.date_in is None:
            amt = (datetime.now().date() - l.due_date).days * 0.25
            try:
                f = Fine.objects.get(loan_id=l)
                f.fine_amt = amt
                f.save()
            except:
                f = Fine(loan_id=l, fine_amt=amt, paid=False)
                f.save()
        else:
            amt = (l.date_in - l.due_date).days * 0.25
            try:
                f = Fine.objects.get(loan_id=l)
                f.fine_amt = amt
                f.save()
            except:
                f = Fine(loan_id=l, fine_amt=amt, paid=False)
                f.save()


def make_card_id():
    l = 6
    max = str(int(Borrower.objects.aggregate(Max("card_id"))["card_id__max"]) + 1)
    while len(max) < l:
        max = "0" + max
    return max


###############################################################################


class Author(models.Model):
    author_id = models.AutoField(primary_key=True)  # PK
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    isbn = models.CharField(max_length=20, unique=True, primary_key=True)
    title = models.TextField()
    authors = models.ManyToManyField(Author)
    cover = models.URLField(max_length=200, blank=True, null=True)
    publisher = models.CharField(max_length=200, blank=True, null=True)
    pages = models.PositiveIntegerField(blank=True, null=True)
    is_available = models.BooleanField(default=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def all_authors(self):
        all_authors = ""
        authors = self.authors.all()
        start = True
        for auth in authors:
            if start:
                all_authors = all_authors + auth.name
                start = False
            else:
                all_authors = all_authors + ", " + auth.name
        return all_authors

    @property
    def get_borrower(self):
        return self.book_loan_set.get(date_in__isnull=True).borrower

    @property
    def due_date(self):
        if self.book_loan_set.filter(date_in__isnull=True).exists():
            return self.book_loan_set.get(date_in__isnull=True).due_date
        else:
            return None


class Borrower(models.Model):
    card_id = models.CharField(
        max_length=20, primary_key=True, default=make_card_id
    )  # PK
    ssn = models.CharField(max_length=20, unique=True)
    bname = models.CharField(max_length=300)
    address = models.CharField(max_length=300)
    phone = models.CharField(max_length=20, blank=True, null=True)
    loans = models.ManyToManyField(Book, through="Book_Loan")

    def __str__(self):
        return self.bname

    @property
    def num_loans(self):
        return self.loans.filter(book_loan__date_in__isnull=True).count()


class Book_Loan(models.Model):
    loan_id = models.AutoField(primary_key=True)  # PK
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrower = models.ForeignKey(Borrower, on_delete=models.CASCADE)
    date_out = models.DateField(blank=True, auto_now_add=True)
    due_date = models.DateField(blank=True, default=get_duedate)
    date_in = models.DateField(blank=True, null=True)
    unpaid_fine = models.BooleanField(default=False, blank=True)


class Fine(models.Model):
    loan_id = models.OneToOneField(Book_Loan, on_delete=models.CASCADE)
    fine_amt = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00, blank=True
    )
    paid = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return str(self.fine_amt)

    @property
    def book_title(self):
        return self.loan_id.book.title

    def pay_fine(self):
        self.book_loan.date_in.isnull()
        self.paid = True
        self.save()
