// Copyright 2005 Google Inc.
// All Rights Reserved
//
// Tests for the XPath parser. To run the test, open the file from the
// file system. No server support is required.
//
//
// Author: Steffen Meschkat <mesch@google.com>

logging__ = true;
xpathdebug__ = false;

function test_xpath(form) {
  try {
    var i = form.cases.selectedIndex;
    var options = form.cases.options;
    var text = options[i].value;
    var expr = xpathParse(text);

    el('result').innerHTML = 
      '<tt><b>' + text + '</b></tt>' +
      '<pre>' + expr.parseTree('') + '</pre>';
    
    options[i].selected = false;
    if (i < options.length - 1) {
      options[i+1].selected = true;
    } else {
      options[0].selected = true;
    }
    
  } catch (e) {
    Log.write('' + e);
  }
}
