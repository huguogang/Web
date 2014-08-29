var utils = {
    /*
     * read simple CSV file (no quotation or escape ...)
     * @return 2-D array
     */
    readCSV: function(strCSV) {
        var rows = strCSV.split('\n');
        var ret = _.map(rows, function(row) {
            return row.trim().split(',');
        });
        return ret;
    },
    arrayEquals: function(arr1, arr2) {
        if(arr1.length !== arr2.length) {
            return false;
        }
        return _.every(arr1, function(ele, index) {
            return ele === arr2[index];
        });
    }
};
