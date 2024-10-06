export function firstPage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13.414" height="8.829" viewBox="0 0 13.414 8.829">
    <g transform="translate(1 1.414)">
      <path d="M12,12,9,9l3-3" transform="translate(-1 -6)" style={{ fill: 'none', stroke: 'rgb(253, 65, 0)', strokeLinecap: 'round', strokeWidth: '2px', strokeLinejoin: 'round' }} />
      <path d="M12,12,9,9l3-3" transform="translate(-6 -6)" style={{ fill: 'none', stroke: 'rgb(253, 65, 0)', strokeLinecap: 'round', strokeWidth: '2px', strokeLinejoin: 'round' }} />
      <line y2="6" transform="translate(0)" style={{ fill: 'none', stroke: 'rgb(253, 65, 0)', strokeLinecap: 'round', strokeWidth: '2px' }} />
    </g>
    </svg>
  );
}

export function previousPage() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="5.414" height="8.829" viewBox="0 0 5.414 8.829">
    <path
      d="M12,12,9,9l3-3"
      transform="translate(-8 -4.586)"
      style={{
        fill: 'none',
        stroke: 'rgb(253, 65, 0)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2px',
      }}
    />
  </svg>
  )
}

export function nextPage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="5.414" height="8.829" viewBox="0 0 5.414 8.829">
    <path
      d="M9,12l3-3L9,6"
      transform="translate(-7.586 -4.586)"
      style={{
        fill: 'none',
        stroke: 'rgb(253, 65, 0)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2px',
      }}
    />
  </svg>
  )
}

export function lastPage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13.414" height="8.829" viewBox="0 0 13.414 8.829">
    <g transform="translate(-1134.586 -2682.586)">
      <path
        d="M9,12l3-3L9,6"
        transform="translate(1127 2678)"
        style={{
          fill: 'none',
          stroke: 'rgb(253, 65, 0)',
          strokeLinecap: 'round',
          strokeWidth: '2px',
          strokeLinejoin: 'round',
        }}
      />
      <path
        d="M9,12l3-3L9,6"
        transform="translate(1132 2678)"
        style={{
          fill: 'none',
          stroke: 'rgb(253, 65, 0)',
          strokeLinecap: 'round',
          strokeWidth: '2px',
          strokeLinejoin: 'round',
        }}
      />
      <line
        y2="6"
        transform="translate(1147 2684)"
        style={{
          fill: 'none',
          stroke: 'rgb(253, 65, 0)',
          strokeLinecap: 'round',
          strokeWidth: '2px',
        }}
      />
    </g>
  </svg>
  )
}