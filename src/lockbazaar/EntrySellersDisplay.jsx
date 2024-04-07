import React from 'react'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'

function EntrySellersDisplay({sortSellers, handleFilter, sellerButtonDisabled}) {

    const sellersText = sortSellers.length > 1 ? 'Sellers' : 'Seller'

    const {width} = useWindowSize()
    const mobile424 = width <= 424

    const sellerFlexStyle =  !mobile424 ? {} :  {display: 'flex', marginLeft:30}

    return (
        <div style={sellerFlexStyle}>
            <div style={{margin: '6px 10px 3px 0px', fontSize: '.85rem', color: '#999'}}>
                {sellersText}:
            </div>
            {sortSellers.map((seller, index) =>
                <Button variant='text' size='small'
                        key={index}
                        style={{
                            textTransform: 'none',
                            lineHeight: '.9rem',
                            minWidth: 40,
                            textAlign: 'left'
                        }}
                        color='primary'
                        value={seller?.username}
                        onClick={handleFilter}
                        disabled={sellerButtonDisabled}
                >
                    {seller?.username}
                </Button>
            )}
        </div>

    )
}

export default EntrySellersDisplay