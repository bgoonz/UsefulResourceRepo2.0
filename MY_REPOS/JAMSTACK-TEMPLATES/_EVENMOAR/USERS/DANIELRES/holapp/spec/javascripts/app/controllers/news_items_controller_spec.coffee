#= require spec_helper

describe 'NewsItemsCtrl', ->
  beforeEach ->
    @controller('NewsItemsCtrl', { $scope: @scope })
    @NewsItem = @model('NewsItem')
    @items = [ new @NewsItem({ id: 1, summary: 'Second news item', body: 'Second news item details' }) ]

    @http.whenGET('api/news/items').respond(200, @items)
    @http.flush()


  describe 'load', ->

    it 'sets up the list of current news items', ->
      expect(@scope.items.length).toEqual(1)


  describe 'addItem', ->

    it 'creates an item via api', ->
      @http.expectPOST('api/news/items').respond(201, { summary: 'S', body: 'B' } )
      @scope.addItem( { summary: 'S', body: 'B' } )
      @http.flush()

    it 'adds the item to the display list', ->
      @http.whenPOST('api/news/items').respond(201, { summary: 'S', body: 'B' })
      @scope.addItem( { summary: 'S', body: 'B' } )
      @http.flush()
      expect(@scope.items.first().summary).toEqual('S')
