
/**
 * @OnlyCurrentDoc
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Mutual Fund NAV')
      .addItem('Scheme data', 'getSchemes')
      .addItem('Refresh data', 'getMutualFundNav')
      .addItem("Get historical data", 'getSchemeHistorical')
      .addSeparator()
      .addItem("Clear sheet", 'clearSheet')
      .addToUi();  
}


/**
 * @OnlyCurrentDoc
 */
function getSchemeHistorical() {
  var ui = SpreadsheetApp.getUi();
  var userProperties = PropertiesService.getUserProperties();
  var api_key = userProperties.getProperty("")

  var result = ui.prompt('Get data for an scheme','',ui.ButtonSet.OK_CANCEL);
  
  var button = result.getSelectedButton();
  var user_input = result.getResponseText().replace(/\s+/g, '');
  if (button == ui.Button.OK) {
    if (user_input) {
      ui.alert('Data populated','',ui.ButtonSet.OK);
    }
  }
}


function getMutualFundNav() {
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  
  var url = "https://www.amfiindia.com/spages/NAVAll.txt";
  var html = UrlFetchApp.fetch(url).getContentText();
  var lines = html.split('\n');
  
  var sheet = []
  sheet.push(lines[0].split(';'))
  lines.forEach(function(line) {
  if (!isNaN(line[0]) && line[0] != " "  && line[0] != "\r"){
      var scheme = line.split(';')
      
      sheet.push(scheme)
   }
  });
  activeSheet.getRange(1, 1, sheet.length, sheet[0].length).setValues(sheet);
  activeSheet.setFrozenRows(1);
}


function getSchemes(){
  var url = "http://portal.amfiindia.com/DownloadSchemeData_Po.aspx?mf=0"
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var activeSheet = ss.getSheetByName("Schemes");
  if (activeSheet == null){
    activeSheet = ss.insertSheet("Schemes")
  }
  
  var html = UrlFetchApp.fetch(url).getContentText();
  var lines = html.split('\n');
  
  var sheet = []
  var len = lines[0].length;
  lines.forEach(function(line) {
  if (line[0] != " "  && line[0] != "\r"){
      var scheme = line.split(',')
      
      if (scheme.length > 7){
        sheet.push(scheme)
      }
   }
  });
  
  activeSheet.getRange(1, 1, sheet.length, sheet[1].length).setValues(sheet)
  activeSheet.setFrozenRows(1);
  
}
function clearSheet(){
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  activeSheet.clear();
}
  
