<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:import href="client_side_xslt_import.xsl"/>
<xsl:template match="/">
  <html>
  <head>
    <script language="JavaScript" type="text/javascript">     
        alert("in transformed document");
    </script>   
  
    <script language="JavaScript" type="text/javascript" src="../base/mw_lib.js" ></script>
    <script language="javascript" type="text/javascript">MwPath("../page/");</script>    
    <script language="JavaScript" type="text/javascript" src="../network/mw_lib_network.js"></script>    
    <script language="JavaScript" type="text/javascript" src="../pipeline/mw_lib_pipeline.js"></script>
    <script language="JavaScript" type="text/javascript" src="../cookie/mw_lib_cookie.js"></script>    
    <script language="JavaScript" type="text/javascript" src="../page/mw_lib_page.js"></script>
    <script language="javascript" type="text/javascript" src="../page/mw_lib_page_element.js"></script>
    <script language="javascript" type="text/javascript" src="../page/mw_lib_page_element_addhandler.js"></script>
    <script language="JavaScript" type="text/javascript" src="../css/mw_lib_css.js" ></script>        
    <script language="JavaScript" type="text/javascript" src="../xml/mw_lib_xml.js"></script>
    <script language="JavaScript" type="text/javascript" src="../xslt/mw_lib_xml_xslt.js"></script>
    <!--
    <script language="JavaScript" type="text/javascript" src="../wirewrap/mw_lib_wirewrap.js"></script>
    -->
  </head>
  <body>
   
  <h2>My CD Collection</h2>
  <a href="javascript://Green" onclick="MwJsLoadStylesheet('client_side_xslt.css');" >MsJsLoadStylesheet("client_side_xslt.css")</a><br/>
  <a href="javascript://Red"   onclick="MwJsLoadStylesheet('client_side_xslt2.css');" >MsJsLoadStylesheet("client_side_xslt2.css")</a><br/>
  <a href="javascript://Blue"  onclick="MwJsLoadStylesheet('client_side_xslt3.css');" >MsJsLoadStylesheet("client_side_xslt3.css")</a><br/>
  <a href="javascript://Restore"  onclick="MwJsLoadStylesheet('default.css');" >MsJsLoadStylesheet("default.css")</a><br/>
  <a href="javascript://Remove Red" onclick="MwJsRemoveNamedStylesheet('client_side_xslt2.css');" >MsJsRemoveNamedStylesheet("client_side_xslt2.css")</a><br/>  
  <a href="javascript://Remove All" onclick="MwJsRemoveAllStylesheets();" >MsJsRemoveAllStylesheets()</a><br/>
  <a href="javascript://Clear All Styles" onclick="MwJsCSSClearAllStyles();" >MwJsCSSClearAllStyles()</a><br/>

    <table border="1">
      <tr>
        <th align="left">Title</th>
        <th align="left">Artist</th>
      </tr>
      <xsl:for-each select="catalog/cd">
      <tr>
        <td><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="artist"/></td>
      </tr>
      </xsl:for-each>
    </table>    
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>