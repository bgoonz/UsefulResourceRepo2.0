import * as React from 'react'
import * as _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { fetchItemList } from '../../core/action/itemsList'
import ItemCards from '../../components/ItemCard/ItemCard'
import MainFilters from '../../components/mainFilters/mainFilters'
import Pagination from 'bulma-pagination-react'
import Hero from 'ashishdotme-ui/components/hero'
import Filter from 'ashishdotme-ui/components/filter'
import { DropdownItem } from 'ashishdotme-ui/components/dropdown/dropdown'
import history from '../../core/history'
import { Movie } from '../../core/models/movie'
import { ItemState } from '../../core/reducers'

export interface ResultsCallbackProps {
  fetchItemList: () => void
}

export interface ResultsValueProps {
  results: Movie[]
}

export interface ResultsRouteParameters {
  id: string | undefined
}

export interface ItemsListProps
  extends ResultsCallbackProps,
    ResultsValueProps,
    RouteComponentProps<ResultsRouteParameters, {}> {}

export interface State {
  loading: boolean
  searchTerm?: string
  selectedGenre: DropdownItem
  selectedWatchedYear: DropdownItem
  sortOrder: string
  sortList: DropdownItem[]
  sortBy: DropdownItem
  showSortMenu: boolean
  error: any
}

class ItemsList extends React.Component<ItemsListProps, State> {
  constructor(props: ItemsListProps) {
    super(props)
    this.state = {
      error: undefined,
      sortOrder: 'Descending',
      sortList: [
        { key: 'viewingDate', value: 'Viewing Date' },
        { key: 'imdbRating', value: 'Rating' },
        { key: 'year', value: 'Year' },
        { key: 'title', value: 'Title' },
      ],
      sortBy: { key: 'viewingDate', value: 'Viewing Date' },
      selectedGenre: { key: '-1', value: 'All' },
      selectedWatchedYear: { key: '-1', value: 'All' },
      searchTerm: undefined,
      loading: false,
      showSortMenu: false,
    }
  }

  componentDidMount(): void {
    this.props.fetchItemList()
  }

  public handleSearchChange = (value: any) => {
    this.setState({ searchTerm: value })
  }

  public handleSortChange = (value: DropdownItem) => {
    this.setState({ sortBy: value })
  }

  public handleGenreChange = (value: DropdownItem) => {
    this.setState({ selectedGenre: value })
  }

  public handleWatchedYearChange = (value: DropdownItem) => {
    this.setState({ selectedWatchedYear: value })
  }

  public handleSortOrder = () => {
    this.setState({
      sortOrder: this.state.sortOrder === 'Descending' ? 'Ascending' : 'Descending',
    })
  }

  public handlePageChange = (page: any, filteredResults: any) => {
    if (page > 0 && page * 12 - 11 <= filteredResults.length) {
      window.scrollTo(0, 0)
      history.push(`/page/${page}`)
    }
  }

  public getSortedItems = (results: any[]) => {
    const { sortBy, sortOrder } = this.state
    if (sortBy) {
      results = results.sort((a, b) =>
        a[sortBy.key] !== b[sortBy.key]
          ? sortOrder === 'Ascending'
            ? a[sortBy.key] < b[sortBy.key]
              ? -1
              : 1
            : a[sortBy.key] > b[sortBy.key]
            ? -1
            : 1
          : 0,
      )
    }
    return results
  }

  public getFilteredItems = (results: Movie[]) => {
    const { selectedGenre, selectedWatchedYear, searchTerm } = this.state
    if (selectedGenre.key !== '-1') {
      results = results.filter((item) => item.genre.includes(selectedGenre.value))
    }
    if (selectedWatchedYear.key !== '-1') {
      results = results.filter((item) => moment(item.viewingDate).year().toString() === selectedWatchedYear.value)
    }
    if (searchTerm && !_.isEmpty(searchTerm)) {
      results = results.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    return results
  }

  render() {
    const { results } = this.props
    const { sortBy, sortOrder, sortList, selectedGenre, selectedWatchedYear } = this.state
    let filteredResults = this.getFilteredItems(results)
    filteredResults = this.getSortedItems(filteredResults)
    let currentPage = 1
    if (this.props.match.params.id && Number(this.props.match.params.id) > 0) {
      if (Number(this.props.match.params.id) * 12 - 11 <= filteredResults.length) {
        currentPage = Number(this.props.match.params.id)
      } else {
        currentPage = 1
      }
    }
    let slicedResults = filteredResults.slice((currentPage - 1) * 12, currentPage * 12)
    if (slicedResults.length === 0) {
      currentPage = 1
      slicedResults = filteredResults.slice(0, currentPage * 12)
    }
    const pages = Math.ceil(filteredResults.length / 12)
    return (
      <>
        <Hero title='Movies' subTitle='🎬 movies I have watched in my lifetime'>
          <Filter
            classname={'m-t-xl'}
            numOfFilters={2}
            sortOrder={sortOrder}
            sortByTitle='Sort'
            sortList={sortList}
            sortByValue={sortBy}
            handleChangeSort={this.handleSortChange}
            handleChangeSortOrder={this.handleSortOrder}
            handleChangeSearch={this.handleSearchChange}
          ></Filter>
        </Hero>
        <section className='section'>
          <div className='component-items'>
            <div className='container'>
              <MainFilters
                results={results}
                filteredResults={filteredResults}
                selectedGenre={selectedGenre}
                selectedWatchedYear={selectedWatchedYear}
                handleGenreChange={this.handleGenreChange}
                handleWatchedYearChange={this.handleWatchedYearChange}
              />
              <div className='tile is-ancestor card-tiles-container'>
                <ItemCards results={slicedResults} />
              </div>
              {filteredResults.length > 12 && (
                <Pagination
                  pages={pages}
                  currentPage={currentPage}
                  onChange={(page: any) => this.handlePageChange(page, filteredResults)}
                  prevClassName={'button has-text-white is-link'}
                  nextClassName={'button has-text-white is-link'}
                />
              )}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export const mapStateToProps = (state: ItemState) => {
  return {
    results: state.fetchItemsList.itemsList,
  }
}

export const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      fetchItemList: fetchItemList,
    },
    dispatch,
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsList))
