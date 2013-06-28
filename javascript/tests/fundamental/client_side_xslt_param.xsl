<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE params SYSTEM "params.dtd">
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:template match="/">
  <html>
  <head>
	<script language="JavaScript">
		alert("load css");
	</script>
	

	
	<!--
	<style type="text/css">
	
	&css;
		
	</style>		
	-->
	
	
	<LINK href="client_side_xslt_param.css" rel="stylesheet" type="text/css" />
	
  </head>
  <body onload="/*MwJsOnLoad()*/" >
  <!---->
  <h2>My CD Collection</h2>
  
  <!--
  <a href="javascript://Green" onclick="MwJsLoadStylesheet('client_side_xslt.css');" >MsJsLoadStylesheet("client_side_xslt.css")</a><br/>
  <a href="javascript://Red"   onclick="MwJsLoadStylesheet('client_side_xslt2.css');" >MsJsLoadStylesheet("client_side_xslt2.css")</a><br/>
  <a href="javascript://Blue"  onclick="MwJsLoadStylesheet('client_side_xslt3.css');" >MsJsLoadStylesheet("client_side_xslt3.css")</a><br/>
  <a href="javascript://Restore"  onclick="MwJsLoadStylesheet('html.css');" >MsJsLoadStylesheet("html.css")</a><br/>
  <a href="javascript://Remove Red" onclick="MwJsRemoveNamedStylesheet('client_side_xslt2.css');" >MsJsRemoveNamedStylesheet("client_side_xslt2.css")</a><br/>  
  <a href="javascript://Remove All" onclick="MwJsRemoveAllStylesheets();" >MsJsRemoveAllStylesheets()</a><br/>
  <a href="javascript://Clear All Styles" onclick="MwJsCSSClearAllStyles();" >MwJsCSSClearAllStyles()</a><br/>
  -->
  

    <table border="1">
      <tr bgcolor="#9acd32">
        <th align="left">Title</th>
        <th align="left">Artist</th>
      </tr>
      <xsl:for-each select="catalog/cd">
      <tr>
        <td><xsl:value-of select="title"/> &red; </td>
        <td><xsl:value-of select="artist"/></td>
      </tr>
      </xsl:for-each>
    </table>    
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>