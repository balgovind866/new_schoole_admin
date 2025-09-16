import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div  style={{ maxWidth: '300px', minWidth: '200px' }}>
      <div className='position-relative'>
        <span className='svg-icon svg-icon-1 position-absolute ms-4 top-50 translate-middle-y'>
                <a>
                  <i className=" ki-duotone ki-magnifier fs-3">
                      <span className="path1"></span>
                      <span className="path2"></span>
                  </i>
                </a>
        </span>
        <input
          type='text'
          className='form-control form-control-sm form-control-solid ps-12'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar