function onOpen() {
  // New entry in menu
  SpreadsheetApp.getUi() // (or DocumentApp or FormApp)
      .createMenu('Translate my sheet')
      .addItem('Start translating', 'showSidebar')
      //.addItem('Write Hello In Cell L8', 'writeHelloInCell')
      //.addItem('Show Alert', 'showAlert')
      //.addItem('Show Toast', 'showToast')
      //.addItem('Send email to Joey Bronner', 'sendEmailToJoeyBronner')
      .addToUi();
  
  // New sidebar
  
}

function writeHelloInCell() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var cell = sheet.getRange("L8");
  cell.setValue("Hello");
}

function sendEmailToJoeyBronner() {
  if (GmailApp.sendEmail('joeybronner@gmail.com', 'Sujet', 'Corps du message')) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Email envoyé :)", "Email", 4); // Time in seconds
  }
  
}

function showToast() {
  var source = "Salut, c'est traduit automatiquement. C'est magique.";
  var sourceLangage = "fr";
  var targetLangage = "en";
  var translation = LanguageApp.translate(source, sourceLangage, targetLangage);
  
  SpreadsheetApp.getActiveSpreadsheet().toast(translation, "Toast", 3); // Time in seconds
}

function showSidebar() {
  // Define HTML file used in the sidebar
  var html = HtmlService.createHtmlOutputFromFile('Page')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('Translate my sheet')
      .setWidth(300);
  
  // Open sidebar
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}

function translateFullSheet(source,target) {
  
  var s = source;
  var t = target;
  
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = activeSpreadsheet.getActiveSheet();
  
  var cell = activeSheet.getRange('a1');
 
  SpreadsheetApp.getActiveSpreadsheet().toast("Your page translation is finished.", "Translation completed", 3); // Time in seconds

}

function translate(radioFull, radioSelected, sourceLangage,targetLangage) {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = activeSpreadsheet.getActiveSheet();
  var activeCell = activeSheet.getActiveCell();
  
  // Translation
  var activeCellText = activeCell.getValue();
  if (activeCellText != "") {
    var activeCellTranslation = LanguageApp.translate(activeCellText, sourceLangage, targetLangage);
    // Write translation
    activeCell.setValue(activeCellTranslation); 
  } else {
    // Error message
    SpreadsheetApp.getActiveSpreadsheet().toast("No values in cell", "Translation completed", 4); // Time in seconds
  }
  

  
  if (radioFull) {
    // Code for translate full page
    var lrow = activeSpreadsheet.getLastRow();
    var lcol = activeSpreadsheet.getLastColumn();
    SpreadsheetApp.getActiveSpreadsheet().toast("full and last row : " + lrow, "Translation completed", 4); // Time in seconds
  } else {
    //Code for translate selected range of cells
    SpreadsheetApp.getActiveSpreadsheet().toast("selected", "Translation completed", 4); // Time in seconds
  }
}


function showAlert() {
  var ui = SpreadsheetApp.getUi(); // Same variations
  var result = ui.alert(
     "Title",
     "That's a nice question?",
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    ui.alert('Confirmation received.');
  } else {
    ui.alert('Permission denied.');
  }
}