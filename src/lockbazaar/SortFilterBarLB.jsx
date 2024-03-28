import React, {useContext, useCallback, useState, useMemo} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterButton from '../filters/FilterButton.jsx'

function SortFilterBar() {

    const {
        filters,
        addFilter,
        filterCount,
        removeFilter,
        removeFilters,
        filterFieldsByFieldName
    } = useContext(FilterContext)

    const handleDeleteFilter = useCallback((keyToDelete, valueToDelete) => () => {
        removeFilter(keyToDelete, valueToDelete)
        keyToDelete==='sellerName' && removeFilters(['id'])
    }, [removeFilter, removeFilters])

    const filterValues = useMemo(() => {
        const {search, id, tab, name, sort, image, ...rest} = filters
        return Object.keys(rest)
            .map(key => {
                const value = filters[key]
                return Array.isArray(value)
                    ? value.map(subValue => ({key, value: subValue}))
                    : {key, value}
            })
            .flat()
    }, [filters])

    const cleanChipLabel = useCallback((label, value) => {
        if (label === 'Belt') {
            if (value === 'Unranked') {
                return label
            }
            if (value.includes('Black')) {
                return value.replace(/(Black)\s(\d+)/, '$1 Belt $2')
            } else {
                return value + ' Belt'
            }
        }
        return value
    }, [])

    const {sort} = filters

    const [highlight, setHighlight] = useState('all')
    if (filters?.status && highlight !== filters?.status) {
        setHighlight(filters?.status)
    } else if (filters?.isBest && highlight !== 'isBest') {
        setHighlight('isBest')
    } else if (!filters?.isBest && !filters?.status && highlight !== 'all') {
        setHighlight('all')
    }

    const handleSort = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
    }, [addFilter])

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428

    const divStyle = {
        margin: '16px 0px 26px 0px', opacity: 0.8
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <div style={combinedDivStyle}>
            <div style={{textAlign: 'left'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26, marginTop: 10}}>
                    <ToggleButton selected={sort === 'belt' || !sort} style={{padding: 7}} value={'belt'}
                                  onClick={handleSort('belt')}>Belt</ToggleButton>
                    <ToggleButton selected={sort === 'lock'} style={{padding: 7}} value={'lock'}
                                  onClick={handleSort('lock')}>Name</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{textAlign: 'right', flexGrow: 1}}>
                {filterCount > 0 &&
                    <div>
                        <span style={{fontSize: '.7rem', marginRight: 5}}>FILTER</span>
                        <ToggleButtonGroup style={{height: 26, marginTop: 10}}>
                            {filterValues.map(({key, value: filter}, index) =>
                                <ToggleButton
                                    key={index}
                                    selected={true}
                                    value={`${cleanChipLabel(filterFieldsByFieldName[key]?.label, filter)}`}
                                    variant='outlined'
                                    style={{padding: 7}}
                                    onClick={handleDeleteFilter(key, filter)}
                                >{cleanChipLabel(filterFieldsByFieldName[key]?.label, filter)}</ToggleButton>
                            )}
                        </ToggleButtonGroup>
                        <FilterButton/>
                    </div>
                }
                {filterCount === 0 &&
                    <div>
                        <FilterButton/>
                    </div>
                }
            </div>
        </div>
    )
}

export default SortFilterBar