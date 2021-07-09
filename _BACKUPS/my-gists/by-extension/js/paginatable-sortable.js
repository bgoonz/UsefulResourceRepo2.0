paginationPages: computed('page', 'totalPages', function() {
        var page = this.get('page');
        var totalPages = this.get('totalPages');
        var pages = [];
        var i = Math.max(0, page - pagesRange);
        var max = Math.min(totalPages, page + pagesRange);

        for (i; i < max; i++) {
            pages.push(i+1);
        }

        return pages;
    }),