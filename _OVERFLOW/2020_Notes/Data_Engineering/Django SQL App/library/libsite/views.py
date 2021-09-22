from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import CreateView, ListView, DetailView
from .models import (
    Borrower,
    Book,
    Book_Loan,
    Search_For_Checkout,
    Search_For_Checkin,
    make_card_id,
    Search_For_Borrower,
)
from .models import Fine, Update_Fines
from django.views.generic.base import TemplateView
from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.db.models import Q
from datetime import timedelta, datetime
from django.db import models
from datetime import datetime, timedelta
from django.db.models import Max
from django.db.models import F


def index(request):
    return render(request, "index.html", {})


class BookSearch(TemplateView):
    template_name = "booksearch.html"


class SearchResults(ListView):
    model = Book
    template_name = "booksearchresults.html"

    def get_queryset(self):
        query = self.request.GET.get("q")
        if query:
            books_matched = Search_For_Checkout(query)
            return books_matched
        else:
            return None


def bookcheckout(request, pk):
    book = get_object_or_404(Book, pk=pk)
    # book returns True id available, else date due
    context = {"book": book}
    if not book.is_available:
        return render(request, "book404.html", context)
    return render(request, "bookcheckout.html", context)


def confirmcheckout(request, book_pk):
    card_no = request.POST.get("q")
    book = get_object_or_404(Book, pk=book_pk)
    borrower = get_object_or_404(Borrower, pk=card_no)
    context = {}
    context["borrower"] = borrower
    context["book"] = book
    if not book.is_available:
        return render(request, "book404.html", context)
    # logic to create loan
    if borrower.num_loans > 2:
        context["success"] = False
    else:
        book.is_available = False
        book.save()
        context["book"] = book
        l = Book_Loan(book=book, borrower=borrower)
        l.save()
        context["loan"] = l
        context["success"] = True
    return render(request, "confirmcheckout.html", context)


def add_thirty(context, loan_id):
    l = Book_Loan.objects.get(pk=loan_id)
    l.date_out -= timedelta(days=30)
    l.due_date -= timedelta(days=30)
    l.save()
    return redirect("refresh_citations")


class BookReturn(TemplateView):
    template_name = "bookreturn.html"


class ReturnResults(ListView):
    model = Book
    template_name = "bookreturnresults.html"

    def get_queryset(self):
        query = self.request.GET.get("q")
        if query:
            books_matched = Search_For_Checkin(query)
            return books_matched
        else:
            return None


def confirmcheckin(request, book_pk):
    card_no = request.POST.get("q")
    book = get_object_or_404(Book, pk=book_pk)
    borrower = book.book_loan_set.get(date_in__isnull=True).borrower
    l = book.book_loan_set.get(date_in__isnull=True)
    l.date_in = datetime.now()
    l.save()
    book.is_available = True
    book.save()
    context = {}
    context["borrower"] = borrower
    context["book"] = book
    context["loan"] = l
    return render(request, "confirmcheckin.html", context)


def newborrower(request):
    return render(request, "newborrower.html")


def confirmnewborrower(request):
    try:
        name = request.POST.get("name")
        ssn = request.POST.get("ssn")
        if Borrower.objects.filter(ssn=ssn).exists():
            return HttpResponse("<h2>SSN already exists!</h2>")

        address = request.POST.get("address")

        b = Borrower(ssn=ssn, bname=name, address=address, card_id=make_card_id())
        b.save()
        return render(request, "confirmnewborrower.html", {"borrower": b})
    except:
        return HttpResponse("<h2>Provide name, ssn, and address!</h2>")


class borrowers(TemplateView):
    template_name = "borrowers.html"


class BorrowerList(ListView):
    model = Borrower
    template_name = "borrowersearch.html"

    def get_queryset(self):
        query = self.request.GET.get("q")
        if query:
            borrowers_matched = Search_For_Borrower(query)
            return borrowers_matched
        else:
            return None


def borrowerdetails(request, card_id):
    b = get_object_or_404(Borrower, pk=card_id)
    books = b.loans.filter(book_loan__date_in__isnull=True)
    fines = Fine.objects.filter(Q(loan_id__borrower__card_id=card_id) & Q(paid=False))
    context = {}
    context["borrower"] = b
    context["books"] = books
    context["fines"] = fines
    return render(request, "borrowerdetails.html", context)


def payfine(context, fine_id):
    f = Fine.objects.get(loan_id_id=fine_id)
    if f.loan_id.date_in is None:
        return HttpResponse("<h2>Loan not ended!</h2>")
    f.paid = True
    f.save()
    return redirect("borrowers")


def refresh_citations(context):
    Update_Fines()
    return redirect("borrowers")
