/**
 *
 * Toolbar menu creation.
 *
 * Called on worbook opening.
 *
 **/
function onOpen() {
    SpreadsheetApp.getUi() // (or DocumentApp or FormApp)
        .createMenu('Translate my sheet')
        .addItem('Start translating', 'showSidebar')
        .addSeparator()
        .addItem('About this add-on?', 'showAbout')
        .addToUi();
}

/**
 *
 * Sidebar title, content & size.
 *
 **/
function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('index')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setTitle('Translate my sheet')
        .setWidth(300);

    // Open sidebar
    SpreadsheetApp.getUi().showSidebar(html);
}

function showAbout() {
  var html = HtmlService.createHtmlOutputFromFile('about')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('About')
      .setWidth(650)
      .setHeight(300);
  SpreadsheetApp.getActive().show(html);
}

/**
 *
 * Sidebar title, content & size.
 *
 **/
function translate(radioFull, radioSelected, sourceLangage, targetLangage) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Translation in progress...", "", -1);
    try {
        var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var activeSheet = activeSpreadsheet.getActiveSheet();
        var activeCell = activeSheet.getActiveCell();
        if (radioFull) {
            translateFullPage(activeSpreadsheet, sourceLangage, targetLangage);
        } else if (radioSelected) {
            translateSelectedCells(activeSpreadsheet, sourceLangage, targetLangage);
        }
        SpreadsheetApp.getActiveSpreadsheet().toast("Done.", "", 3);
    } catch (err) {
      SpreadsheetApp.getActiveSpreadsheet().toast("An error occured:" + err);
    }
}

/**
 *
 * Code for translate full page content from a source to a target langage. 
 *
 **/
function translateFullPage(activeSpreadsheet, sourceLangage, targetLangage) {
    var lrow = activeSpreadsheet.getLastRow();
    var lcol = activeSpreadsheet.getLastColumn();
    for (var i = 1; i <= lrow; i++) {
        for (var j = 1; j <= lcol; j++) {
            if (SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(i, j).getValue() != "") {
                var activeCellText = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(i, j).getValue();
                var activeCellTranslation = LanguageApp.translate(activeCellText, sourceLangage, targetLangage);
                SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(i, j).setValue(activeCellTranslation);
            }
        }
    }
}

/**
 *
 * Code for translate only selected cells content in a sheet from a source to a target langage. 
 *
 **/
function translateSelectedCells(activeSpreadsheet, sourceLangage, targetLangage) {
    var activeCellText = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getValue();
    if (activeCellText != "") {
        var activeCellTranslation = LanguageApp.translate(activeCellText, sourceLangage, targetLangage);
        SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().setValue(activeCellTranslation);
    }
}

/**
 *
 * OTHER METHODS / FUNCTIONS. (can be deleted)
 *
 **/
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

function sendEmailToJoeyBronner() {
    if (GmailApp.sendEmail('joeybronner@gmail.com', '[TranslateMySheet]', 'Corps du message')) {
        SpreadsheetApp.getActiveSpreadsheet().toast("Email sent.", "Thank's", 4);
    }
}