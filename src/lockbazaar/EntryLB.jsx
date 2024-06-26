import React, {useCallback, useMemo, useEffect, useRef, useState, useContext} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import {AccordionActions} from '@mui/material'
import BeltStripe from '../speedpicks/BeltStripe.jsx'
import queryString from 'query-string'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FieldValue from '../util/FieldValue.jsx'
import Tracker from '../app/Tracker.jsx'
import FilterChip from '../filters/FilterChip.jsx'
import FilterContext from '../context/FilterContext.jsx'
import EntryActionsLB from './EntryActionsLB.jsx'
import EntryDetailsLB from './EntryDetailsLB.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import EntrySellersDisplay from './EntrySellersDisplay.jsx'

const Entry = ({entry, expanded, onExpand}) => {

    const {getSellerFromId} = useContext(LoadingContextLB)
    const {filters, addFilter} = useContext(FilterContext)


    const countryListings = filters.country
        ? entry.listings
            .map(listing => {
                let terseListing = {...listing}
                terseListing.country = listing?.country?.replace('United States of America', 'United States')
                terseListing.country = terseListing.country.replace('Netherlands (Kingdom of the)', 'Netherlands')
                return terseListing
            })
            .filter(listing => !!listing.country)
            .filter(listing => [filters.country].includes(listing.country))
        : entry.listings

    const shippableListings = filters.shipsTo
        ? countryListings
            .filter(listing => !!listing.shipsTo)
            .filter(listing => listing.shipsTo.some(r => [filters.shipsTo].includes(r)))
        : countryListings

    const sellerView = !!filters.sellerName

    const sellersListings = sellerView
        ? shippableListings.filter(listing => listing.sellerName === filters.sellerName)
        : shippableListings

    const sellerButtonDisabled = sellerView

    const allSellers = sellersListings.map((listing) => {
            return getSellerFromId(listing.sellerId)
        }
    )
    const uniqueSellers = [...new Set(allSellers)].sort()
    const sortSellers = uniqueSellers.sort((item1, item2) => item1.username.localeCompare(item2.username))

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback((_, isExpanded) => {
        onExpand && onExpand(isExpanded ? entry.id : false)
    }, [entry.id, onExpand])

    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        addFilter('sellerName', event.target.value)
        window.scrollTo({top: 0})
    }, [addFilter])

    useEffect(() => {
        if (expanded && ref && !scrolled) {
            const isMobile = window.innerWidth <= 600
            const offset = isMobile ? 70 : 74
            const {id} = queryString.parse(location.search)
            const isIdFiltered = id === entry.id

            setScrolled(true)

            setTimeout(() => {
                window.scrollTo({
                    left: 0,
                    top: ref.current.offsetTop - offset,
                    behavior: isIdFiltered ? 'auto' : 'smooth'
                })
            }, isIdFiltered ? 0 : 100)
        } else if (!expanded) {
            setScrolled(false)
        }
    }, [expanded, entry, scrolled])

    const style = {
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottom: '1px solid #444',
        textAlign: 'left'
    }

    const makeModels = useMemo(() => {
        return (
            <Stack direction='column' spacing={0} sx={{flexWrap: 'wrap'}}>
                {entry.makeModels?.map(({make, model}, index) =>
                    <Typography key={index}
                                style={{fontWeight: 500, fontSize: '1.07rem', lineHeight: 1.25, marginBottom: '4px'}}>
                        {make && make !== model ? `${make} ${model}` : model}
                    </Typography>
                )}
            </Stack>
        )
    }, [entry.makeModels])

    const {width} = useWindowSize()
    const smallWindow = width <= 480

    const nameDivWidth = !smallWindow ? '65%' : '70%'
    const summaryFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const summarySellersWidth = !smallWindow ? '20%' : '100%'

    return (
        <Accordion expanded={expanded} onChange={handleChange} style={style} ref={ref} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              sx={{
                                  '& .MuiAccordionSummary-content': {
                                      display: 'block'
                                  }
                              }}>
                <div style={summaryFlexStyle}>
                    <div style={{display: 'flex', width: '80%'}}>
                        <BeltStripe value={entry.belt}/>
                        <div style={{
                            margin: '12px 0px 8px 8px',
                            width: nameDivWidth,
                            flexShrink: 0,
                            flexDirection: 'column'
                        }}>
                            <FieldValue
                                value={makeModels}
                                textStyle={entry.belt === 'Unranked' ? {
                                    color: '#aaa',
                                    marginLeft: '0px'
                                } : {marginLeft: '0px'}}
                                style={{marginBottom: '2px', fontSize: '.5rem'}}
                            />

                            {
                                !!entry.version &&
                                <FieldValue
                                    name='Version'
                                    value={<Typography
                                        style={{fontSize: '0.95rem', lineHeight: 1.25}}>{entry.version}</Typography>}
                                    textStyle={entry.belt === 'Unranked' ? {color: '#aaa'} : {}}
                                />
                            }
                        </div>
                        <div style={{margin: '8px 0px 0px 0px', width: '40%', display: 'flex', alignItems: 'center'}}>
                            {
                                entry.lockingMechanisms?.length > 0 &&
                                <FieldValue
                                    value={
                                        <Stack direction='row' spacing={0} sx={{flexWrap: 'wrap'}}>
                                            {entry.lockingMechanisms?.map((lockingMechanism, index) =>
                                                <FilterChip
                                                    key={index}
                                                    value={lockingMechanism}
                                                    field='lockingMechanisms'
                                                />
                                            )}
                                        </Stack>
                                    }
                                />
                            }
                        </div>
                    </div>
                    {!sellerView &&
                        <div style={{
                            margin: '8px 0px 0px 0px',
                            width: summarySellersWidth,
                            display: 'flex',
                        }}>
                            <EntrySellersDisplay sortSellers={sortSellers} handleFilter={handleFilter}
                                                 sellerButtonDisabled={sellerButtonDisabled}/>
                        </div>
                    }
                </div>
                {sellerView &&
                    <div style={{}}>
                        <EntryDetailsLB listings={sellersListings} sellerView={sellerView}/>
                    </div>
                }
            </AccordionSummary>
            {
                expanded &&
                <React.Fragment>
                    {!sellerView &&
                        <AccordionDetails style={{backgroundColor: '#272727'}} sx={{padding: '8px 16px 0px 16px'}}>
                            <EntryDetailsLB listings={sellersListings} sellerView={sellerView}/>
                        </AccordionDetails>
                    }
                    <AccordionActions disableSpacing style={{backgroundColor: '#272727'}}>
                        <EntryActionsLB entry={entry}/>
                        <Tracker feature='lock' id={entry.id} lockMake={entry?.makeModels[0].make} lockModel={entry?.makeModels[0].model}/>
                    </AccordionActions>
                </React.Fragment>
            }
        </Accordion>
    )
}

export default Entry
