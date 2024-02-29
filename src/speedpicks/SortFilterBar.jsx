import React, {useContext, useCallback, useState} from 'react'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import FilterContext from '../context/FilterContext'

function SortFilterBar() {

    const {filters, addFilter, clearFilters, setFilters} = useContext(FilterContext)
    const {sort} = filters
    const [view, setView] = useState('all')

    console.log(filters)
    const handleClick = useCallback(value => () => {
        setTimeout(() => addFilter('sort', value, true), 0)
    }, [addFilter])

    const handleFilterFieldValue = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        console.log(event.target.value)
        const [field,value] = event.target.value.split(',')
        console.log(field)
        //setOpen(false)
        clearFilters()
        addFilter(field, value)
        //setView(field)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [addFilter, clearFilters])

    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        const {value} = event.target
        setFilters({status: value})
        setView(value)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [setFilters])

    const handleClear = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
        setView('all')
    }, [clearFilters])

    return (
        <div style={{display: 'flex', margin: '6px 0px 26px 0px', opacity: 0.8}}>
            <div style={{textAlign: 'left'}}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>SORT</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={sort === 'lock' || !sort} style={{padding: 7}} value={'lock'}
                                  onClick={handleClick('lock')}>Lock</ToggleButton>
                    <ToggleButton selected={sort === 'belt'} style={{padding: 7}} value={'belt'}
                                  onClick={handleClick('belt')}>Belt</ToggleButton>
                    <ToggleButton selected={sort === 'picker'} style={{padding: 7}} value={'picker'}
                                  onClick={handleClick('picker')}>Picker</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{
                textAlign: 'right', flexGrow: 1
            }}>
                <span style={{fontSize: '.7rem', marginRight: 5}}>FILTER</span>
                <ToggleButtonGroup style={{height: 26}}>
                    <ToggleButton selected={view === 'all'} style={{padding: 7}} value={'all'}
                                  onClick={handleClear}>All</ToggleButton>
                    <ToggleButton selected={view === 'belt'} style={{padding: 7}} value={['status', 'approved']}
                                  onClick={handleFilterFieldValue}>Test</ToggleButton>
                    <ToggleButton selected={view === 'approved'} style={{padding: 7}} value={'approved'}
                                  onClick={handleFilter}>Approved</ToggleButton>
                    <ToggleButton  selected={view === 'pending'} style={{padding: 7}} value={'pending'}
                                  onClick={handleFilter}>Pending</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>

    )
}

export default SortFilterBar