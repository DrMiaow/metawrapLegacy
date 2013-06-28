// Copyright 2005 Google Inc.
// All Rights Reserved
//
// An XML parse and a minimal DOM implementation that just supportes
// the subset of the W3C DOM that is used in the XSLT implementation.
//
// References: 
//
// [DOM] W3C DOM Level 3 Core Specification
//       <http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/>.
//
// 
// Author: Steffen Meschkat <mesch@google.com>


// Resolve entities in XML text fragments. According to the DOM
// specification, the DOM is supposed to resolve entity references at
// the API level. I.e. no entity references are passed through the
// API. See "Entities and the DOM core", p.12, DOM 2 Core
// Spec. However, different browsers actually pass very different
// values at the API.
//
function xmlResolveEntities(s) {

  // NOTE: The split() method in IE omits empty result strings. This
  // is utterly annoying. So we don't use it.
  var parts = stringSplit(s, '&');

  var ret = parts[0];
  for (var i = 1; i < parts.length; ++i) {
    var rp = stringSplit(parts[i], ';');
    if (rp.length == 1) {
      // no entity reference: just a & but no ;
      ret += parts[i];
      continue;
    }
    
    var ch;
    switch (rp[0]) {
      case 'lt': 
        ch = '<';
        break;
      case 'gt': 
        ch = '>';
        break;
      case 'amp': 
        ch = '&';
        break;
      case 'quot': 
        ch = '"';
        break;
      case 'apos': 
        ch = '\'';
        break;
      case 'nbsp': 
        ch = String.fromCharCode(160);
        break;
      default:
        // Cool trick: let the DOM do the entity decoding. We assign
        // the entity text through non-W3C DOM properties and read it
        // through the W3C DOM. W3C DOM access is specified to resolve
        // entities. 
        var span = window.document.createElement('span');
        span.innerHTML = '&' + rp[0] + '; ';
        ch = span.childNodes[0].nodeValue.charAt(0);
    }
    ret += ch + rp[1];
  }

  return ret;
}


// Parses the given XML string with our custom, JavaScript XML parser. Written
// by Steffen Meschkat (mesch@google.com).
function xmlParse(xml) {
  var regex_empty = /\/$/;

  // See also <http://www.w3.org/TR/REC-xml/#sec-common-syn> for
  // allowed chars in a tag and attribute name. TODO(mesch): the
  // following is still not completely correct.

  var regex_tagname = /^([\w:-]*)/;
  var regex_attribute = /([\w:-]+)\s?=\s?('([^\']*)'|"([^\"]*)")/g;

  var xmldoc = new XDocument();
  var root = xmldoc;

  // For the record: in Safari, we would create native DOM nodes, but
  // in Opera that is not possible, because the DOM only allows HTML
  // element nodes to be created, so we have to do our own DOM nodes.

  // xmldoc = document.implementation.createDocument('','',null);
  // root = xmldoc; // .createDocumentFragment();
  // NOTE(mesch): using the DocumentFragment instead of the Document
  // crashes my Safari 1.2.4 (v125.12).
  var stack = [];

  var parent = root;
  stack.push(parent);

  var x = xml.split(/</);
  for (var i = 1; i < x.length; ++i) {
    var xx = x[i].split(/>/);
    var tag = xx[0];
    var text = xmlResolveEntities(xx[1] || '');

    if (tag.charAt(0) == '/') {
      stack.pop();
      parent = stack[stack.length-1];

    } else if (tag.charAt(0) == '?') {
      // Ignore XML declaration and processing instructions
    } else if (tag.charAt(0) == '!') {
      // Ignore notation and comments
    } else {
      var empty = tag.match(regex_empty);
      var tagname = regex_tagname.exec(tag)[1];
      var node = xmldoc.createElement(tagname);

      var att;
      while (att = regex_attribute.exec(tag)) {
        var val = xmlResolveEntities(att[3] || att[4] || '');
        node.setAttribute(att[1], val);
      }
      
      if (empty) {
        parent.appendChild(node);
      } else {
        parent.appendChild(node);
        parent = node;
        stack.push(node);
      }
    }

    if (text && parent != root) {
      parent.appendChild(xmldoc.createTextNode(text));
    }
  }

  return root;
}


// Our W3C DOM Node implementation. Note we call it XNode because we
// can't define the identifier Node. We do this mostly for Opera, where
// we can't reuse the HTML DOM for parsing our own XML.
function XNode(type, name, value, owner) {
  this.nodeType = type;
  this.nodeName = name;
  this.nodeValue = value;
  this.attributes = [];
  this.childNodes = [];

  this.firstChild = null;
  this.lastChild = null;
  this.nextSibling = null;
  this.previousSibling = null;
  this.parentNode = null;
  this.ownerDocument = owner;
}


XNode.prototype.appendChild = function(node) {
  // firstChild
  if (this.childNodes.length == 0) {
    this.firstChild = node;
  }

  // previousSibling
  node.previousSibling = this.lastChild;

  // nextSibling
  node.nextSibling = null;
  if (this.lastChild) {
    this.lastChild.nextSibling = node;
  }

  // parentNode
  node.parentNode = this;

  // lastChild
  this.lastChild = node;

  // childNodes
  this.childNodes.push(node);
}


XNode.prototype.hasAttributes = function() {
  return this.attributes.length > 0;
}


XNode.prototype.setAttribute = function(name, value) {
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName == name) {
      this.attributes[i].nodeValue = value;
      return;
    }
  }
  this.attributes.push(new XNode(DOM_ATTRIBUTE_NODE, name, value));
}


XNode.prototype.getAttribute = function(name) {
  for (var i = 0; i < this.attributes.length; ++i) {
    if (this.attributes[i].nodeName == name) {
      return this.attributes[i].nodeValue;
    }
  }
  return null;
}


function XDocument() {
  XNode.call(this, DOM_DOCUMENT_NODE, '#document', null, this);
  this.documentElement = null;
}

XDocument.prototype = new XNode(DOM_DOCUMENT_NODE, '#document');

XDocument.prototype.appendChild = function(node) {
  XNode.prototype.appendChild.call(this, node);
  this.documentElement = this.childNodes[0];
}

XDocument.prototype.createElement = function(name) {
  return new XNode(DOM_ELEMENT_NODE, name, null, this);
}

XDocument.prototype.createDocumentFragment = function() {
  return new XNode(DOM_DOCUMENT_FRAGMENT_NODE, '#document-fragment',
                   null, this);
}

XDocument.prototype.createTextNode = function(value) {
  return new XNode(DOM_TEXT_NODE, '#text', value, this);
}

XDocument.prototype.createAttribute = function(name) {
  return new XNode(DOM_ATTRIBUTE_NODE, name, null, this);
}

XDocument.prototype.createComment = function(data) {
  return new XNode(DOM_COMMENT_NODE, '#comment', data, this);
}

XNode.prototype.getElementsByTagName = function(name, list) {
  if (!list) {
    list = [];
  }

  if (this.nodeName == name) {
    list.push(this);
  }

  for (var i = 0; i < this.childNodes.length; ++i) {
    this.childNodes[i].getElementsByTagName(name, list);
  }

  return list;
}
