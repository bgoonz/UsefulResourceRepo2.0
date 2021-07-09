from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("books/", views.BookSearch.as_view(), name="booksearch"),
    path("results/", views.SearchResults.as_view(), name="search_results"),
    path("checkout/<pk>/", views.bookcheckout, name="checkout"),
    path("confirmation/<book_pk>/", views.confirmcheckout, name="confirmcheckout"),
    path("add_thirty/<loan_id>", views.add_thirty, name="add_thirty"),
    path("bookreturn/", views.BookReturn.as_view(), name="bookreturn"),
    path("returnresults/", views.ReturnResults.as_view(), name="return_results"),
    path("returnconfirmation/<book_pk>/", views.confirmcheckin, name="confirmcheckin"),
    path("borrowers/", views.borrowers.as_view(), name="borrowers"),
    path("borrowers/search", views.BorrowerList.as_view(), name="borrowersearch"),
    path("borrowerdetails/<card_id>", views.borrowerdetails, name="borrowerdetails"),
    path("payfine/<fine_id>", views.payfine, name="payfine"),
    path("refresh_citations/", views.refresh_citations, name="refresh_citations"),
    path("newborrower/", views.newborrower, name="newborrower"),
    path("confirmborrower/", views.confirmnewborrower, name="confirmnewborrower"),
]
