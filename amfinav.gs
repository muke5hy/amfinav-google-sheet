function getMutualFundNav() {
  // The code below logs the background color for the active range.
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  
  var url = "https://www.amfiindia.com/spages/NAVAll.txt";
  var html = UrlFetchApp.fetch(url).getContentText();
  var lines = html.split('\n');
  
  var sheet = []
  lines.forEach(function(line) {
  if (!isNaN(line[0]) && line[0] != " "  && line[0] != "\r"){
      var scheme = line.split(';')
      
      sheet.push(scheme)
   }
  });
  activeSheet.getRange(2, 1, sheet.length, sheet[0].length).setValues(sheet)
}
