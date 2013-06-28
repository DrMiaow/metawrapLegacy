<?xml version="1.0" encoding="UTF-8"?>
<root xmlns="http://www.w3.org/1999/XSL/Format" 
font-size="16pt">
<layout-master-set>
 <simple-page-master 
 margin-right="15mm" margin-left="15mm" 
 margin-bottom="15mm" margin-top="15mm" 
 page-width="210mm" page-height="297mm" 
  master-name="bookpage">
 <region-body region-name="bookpage-body"

  margin-bottom="5mm" margin-top="5mm" />
   </simple-page-master>
   </layout-master-set>
   <page-sequence master-reference="bookpage">
   <title>Hello world example</title>

   <flow flow-name="bookpage-body">
   <block>Hello XSLFO!</block>
   </flow>
   </page-sequence>
</root>
