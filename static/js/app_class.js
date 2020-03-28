// import data from data.js
const tableData = data;
// Reference the HTML table using d3 
// D3 is a JavaScript library that produces sophisticated
//  and highly dynamic graphics in an HTML webpage. 
// It is often used by data professionals to create dashboards, 
// or a collection of visual data (such as graphs and maps), 
// for presentation.
var tbody = d3.select("tbody");

// write function to build dynamic table 
// first clear out any existing data with tbody.html("")
// forEach loops through the table, dataRow is the argument for when we call
// each row of data.
// 'tr' is html tags for table rows
// Next loop through each field in dataRow argument
// the fields will be table data in html table and will
// be wrapped in <td> tags.
// Object.values means referencing one object from the array
// forEach(val) is each item in the object
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }
// "Select" will select the very first element that matches our 
// selector string: “#datetime”. The selector string is 
// the item we’re telling D3.js to look for. look for 
// #datetime ID in the html
// property('value') - look for date values and grab the
// information and hold it in the "date" variable.
// === strict equality; == loose equality
function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    }
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  }
  // Attach an event to listen for the form button
  d3.selectAll("#filter-btn").on("click", handleClick);
  // Build the table when the page loads
  buildTable(tableData);