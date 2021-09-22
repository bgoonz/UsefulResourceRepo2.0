import * as React from 'react'
import * as _ from 'lodash'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import { fetchItemList } from '../../core/action/itemsList'
import ItemCards from '../../components/ItemCard/ItemCard'
import Pagination from 'bulma-pagination-react'
import Filter from 'ashishdotme-ui/components/filter'
import { DropdownItem } from 'ashishdotme-ui/components/dropdown/dropdown'
import history from '../../core/history'
import { Link } from '../../core/models/link'
import { ItemState } from '../../core/reducers'

export interface ResultsCallbackProps {
  fetchItemList: () => void
}

export interface ResultsValueProps {
  results: Link[]
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
  sortOrder: string
  sortList: DropdownItem[]
  sortBy: DropdownItem
  showSortMenu: boolean
  error: any
  showShortenUrl: boolean
  shortenUrl: string
  originalUrl: string
  clickSubmit: boolean
  copied: boolean
}

class ItemsList extends React.Component<ItemsListProps, State> {
  constructor(props: ItemsListProps) {
    super(props)
    this.state = {
      error: '',
      sortOrder: 'Descending',
      sortList: [
        { key: 'createdAt', value: 'Created Date' },
        { key: 'hits', value: 'Hits' },
        { key: 'url', value: 'URL' },
      ],
      sortBy: { key: 'createdAt', value: 'Created Date' },
      searchTerm: undefined,
      loading: false,
      showSortMenu: false,
      showShortenUrl: false,
      shortenUrl: '',
      originalUrl: '',
      clickSubmit: true,
      copied: false,
    }
  }

  componentDidMount(): void {
    this.props.fetchItemList()
  }

  public handleUserInput = (e) => {
    const value = e.target.value
    this.setState({ originalUrl: value })
  }

  public handleSubmit = () => {
    const { originalUrl, clickSubmit } = this.state
    this.setState({ clickSubmit: true, error: '' })
    if (clickSubmit && originalUrl && !_.isEmpty(originalUrl)) {
      this.setState({ loading: true, showShortenUrl: false })
      const urlToShorten = originalUrl.trim()
      let reqObj = {
        url: urlToShorten.endsWith('/') ? originalUrl.slice(0, -1) : originalUrl,
      }

      axios
        .post('https://api.ashish.me/shorten', reqObj)
        .then((json) => {
          setTimeout(() => {
            this.props.fetchItemList()
            this.setState({
              loading: false,
              showShortenUrl: true,
              shortenUrl: `https://go.ashish.me/#${json.data.message}`,
            })
          }, 0)
        })
        .catch(() => {
          this.setState({
            loading: false,
            error: 'Server Error',
          })
        })
    } else {
      this.setState({ error: 'Server Error' })
    }
  }

  public handleSearchChange = (value: any) => {
    this.setState({ searchTerm: value })
  }

  public handleSortChange = (value: DropdownItem) => {
    this.setState({ sortBy: value })
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

  public getFilteredItems = (results: Link[]) => {
    const { searchTerm } = this.state
    if (searchTerm && !_.isEmpty(searchTerm)) {
      results = results.filter((item) => item.url.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    return results
  }

  render() {
    const { results } = this.props
    const { sortBy, sortOrder, sortList } = this.state
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
        <section className='hero is-link is-fullheight-with-navbar'>
          <div className='hero-body'>
            <div className='container'>
              <div className='landing has-text-centered'>
                <input
                  name='originalUrl'
                  className='input is-rounded is-large'
                  placeholder='Paste your link..'
                  value={this.state.originalUrl}
                  onChange={this.handleUserInput.bind(this)}
                />
                <button
                  className={
                    this.state.loading
                      ? 'button is-primary is-large m-t-md is-rounded is-loading'
                      : 'button is-primary is-large m-t-md is-rounded'
                  }
                  name='action'
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
                {!_.isEmpty(this.state.error) && (
                  <div className='shorten-error m-t-md'>Please check your link and try again</div>
                )}
                {this.state.showShortenUrl && (
                  <div className='shorten-url-content m-t-xl has-text-centered'>
                    <div className='field has-addons'>
                      <div className='control shorten-url'>
                        <a target='_blank' href={this.state.shortenUrl} rel='noopener noreferrer'>
                          <input className='input' type='text' value={this.state.shortenUrl} disabled />
                        </a>
                      </div>
                      <div className='control'>
                        <CopyToClipboard text={this.state.shortenUrl} onCopy={() => this.setState({ copied: true })}>
                          <button
                            disabled={this.state.shortenUrl ? false : true}
                            className={`button ${this.state.copied ? 'is-link' : 'is-primary'} mb-2`}
                          >
                            {this.state.copied ? 'Copied' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className='section'>
          <div className='component-items'>
            <div className='container'>
              <Filter
                classname={'m-t-md'}
                numOfFilters={2}
                sortOrder={sortOrder}
                sortByTitle='Sort'
                sortList={sortList}
                sortByValue={sortBy}
                handleChangeSort={this.handleSortChange}
                handleChangeSortOrder={this.handleSortOrder}
                handleChangeSearch={this.handleSearchChange}
              ></Filter>
              <div className='is-ancestor card-tiles-container m-t-xl m-b-xl'>
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
