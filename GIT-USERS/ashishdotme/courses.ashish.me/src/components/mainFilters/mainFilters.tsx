import * as React from 'react'
import * as _ from 'lodash'
import moment from 'moment'
import Dropdown from 'ashishdotme-ui/components/dropdown'
import { DropdownItem } from 'ashishdotme-ui/components/dropdown/dropdown'
import { Course } from '../../core/models/course'

export interface MainFiltersProps {
  results: Course[]
  filteredResults: Course[]
  selectedCategory: any
  selectedCompletedYear: any
  handleCategoryChange: (value: DropdownItem) => any
  handleCompletedDateChange: (value: DropdownItem) => any
}

const MainFilters = (props: MainFiltersProps) => {
  let results = _.cloneDeep(props.results)
  let categoriesList: DropdownItem[] = [{ key: '-1', value: 'All' }]
  let yearsList: DropdownItem[] = [{ key: '-1', value: 'All' }]
  results.forEach((item: any, index: number) => {
    const categories = item.category.split(',').map((categoriesObj) => categoriesObj.trim())
    categories.forEach((category, index) => {
      categoriesList.push({ key: index, value: category })
    })
    const completedDate = moment(item.completedDate).year().toString()
    yearsList.push({
      key: index,
      value: completedDate,
    })
  })
  categoriesList = _.uniqBy(categoriesList, 'value')
  yearsList = _.uniqBy(yearsList, 'value')
  return (
    <>
      <div className='level has-padding-bottom-10'>
        <div className='level-left is-mobile'>
          <Dropdown
            classname='m-r-md m-t-md'
            title='Category'
            list={categoriesList}
            sortByValue={props.selectedCategory}
            onChange={props.handleCategoryChange}
          />
          <Dropdown
            classname='m-t-md'
            title='Completed Year'
            list={yearsList}
            sortByValue={props.selectedCompletedYear}
            onChange={props.handleCompletedDateChange}
          />
        </div>
        <div className='level-right'>
          <p className='title is-4'>
            <span className='tag is-large is-info has-margin-right-5'>{props.filteredResults.length}</span>
            <span> Courses</span>
          </p>
        </div>
      </div>
    </>
  )
}
export default MainFilters
