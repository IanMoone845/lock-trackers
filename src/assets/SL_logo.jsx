import * as React from 'react'
const SvgComponent = (props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        style={{
            enableBackground: 'new 0 0 150 150',
        }}
        viewBox='0 0 150 150'
        {...props}
    >
        <path d='M63.7 46.1c-4.2-5.8-8.8-9.3-18.5-9.3-8.8 0-14.1 4-14.1 11.2 0 8.2 6.5 11.4 18.4 14.1 17.3 3.7 26.3 10.2 26.3 25.6 0 12.8-8.6 24.6-29.2 24.6-14.7 0-25-4.5-32.1-14.1l11.3-7.8c5.1 6.1 10.2 9.3 20 9.3 11.8 0 15.6-5.2 15.6-11.4 0-6.8-3.9-11.1-18.8-14.3C26 70.5 16.7 62.6 16.7 48c0-12.9 8.5-23.8 28.6-23.8 13.7 0 23.3 4.6 29.4 14.1l-11 7.8zM135.9 84.1c0 16.2-8 28.1-24.5 28.1-7.2 0-11.9-1.7-15.1-5.1v27.6H83V48.9h13.3v5c3.1-3.9 8.1-6.1 15.2-6.1 14.9 0 24.4 10.1 24.4 27.9v8.4zm-13.2-.6v-7.2c0-10.8-4.4-16.9-13.2-16.9-8.7 0-13.1 6-13.2 16.2v8c0 9.7 3.1 17.3 13.2 17.3 9.4-.1 13.2-7.7 13.2-17.4z' />
        <path d='M146 4v142H4V4h142m4-4H0v150h150V0z' />
    </svg>
)
export default SvgComponent
