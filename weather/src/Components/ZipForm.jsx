import React from 'react';

function EnterZip(props) {
    return (
      <div className="search-form">
        <form onSubmit={props.handleZipSubmit}>
          <label>
            Please enter you zip code here and click 'submit' to find your local weather!
            <input type="number" value={props.selectedZipCode} onChange={props.handleInputChange} />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
    );
}


export default EnterZip;
