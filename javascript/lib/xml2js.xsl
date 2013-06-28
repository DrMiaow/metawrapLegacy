<?xml version="1.0" encoding="UTF-8"?>
<!--
    $Id: xml2js.xsl,v 1.2 2008/06/03 09:36:55 james Exp $

    $Log: xml2js.xsl,v $
    Revision 1.2  2008/06/03 09:36:55  james
    Updated js lib

    Revision 1.13  2007/11/07 02:03:50  james
    Support for new wirewrap operations

    Revision 1.12  2007/10/24 10:35:00  james
    *** empty log message ***

    Revision 1.11  2007/10/24 09:44:12  james
    Working out the semantics of the new skin system

    Revision 1.10  2007/08/10 08:24:21  james
    Added bahavior lib

    Revision 1.9  2005/11/02 20:55:58  james
    Changed wirewrap to allow window event handlers to be added

    Revision 1.8  2005/11/01 11:57:02  james
    Updated stylesheet

    Revision 1.7  2005/10/05 14:09:50  james
    Added nexted behaviors

    Revision 1.6  2005/10/05 13:26:30  james
    Added nexted behaviors

    Revision 1.5  2005/10/04 13:43:46  james
    Got some more testcases working for wirewrap

    Revision 1.4  2005/10/03 00:20:37  james
    Working on wirewrap testcases.
    Porting to use new addEventListener

    Revision 1.3  2005/08/31 12:41:53  james
    Testcase 3 now processes style and behavior xml
    on browsers that have XSLT support.

    Revision 1.2  2005/08/31 10:23:19  james
    Adding xsd directort for schema definitions

    Revision 1.1  2005/08/25 12:23:15  james
    Moved code

    Revision 1.7  2005/07/03 04:42:48  james
    Normalising library

    Revision 1.6  2005/07/03 03:03:25  james
    Updated testcase

    Revision 1.5  2005/07/02 13:31:09  james
    Testing under Eclipse

    Revision 1.4  2005/07/02 13:15:12  james
    Getting schema definition w3 compliant

    Revision 1.3  2005/07/02 06:58:09  james
    Commenting XSLT and XSD

    Revision 1.2  2005/07/02 05:31:14  james
    Adding AOP to MetaWrap javascript library.

    
    @brief: Coverts a wirewrap xml file into behavior.js file
    
    http://www.quirksmode.org/js/events_compinfo.html
    
 -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:wr="http://xsd.metawrap.com/wirewrap/1.0/wirewrap.xsd" version="1.0">
    <xsl:output method="text" standalone="yes" />
    
    <xsl:template match="/wr:wirewrap">
    
    	<!-- Handle root level event handlers-->
		<xsl:for-each select="wr:onload">
            <xsl:text>MetaWrap.Page.Element.addEventListener(window,"load",function(){</xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>},false);</xsl:text>
		</xsl:for-each>

		<xsl:for-each select="wr:onunload">
            <xsl:text>MetaWrap.Page.Element.addEventListener(window,"unload",function(){</xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>},false);</xsl:text>
		</xsl:for-each>
        
        <xsl:text>l_rules = {</xsl:text>   
        
		<xsl:text>   
		'nothing' : function(p_e)
		{
		}  
		</xsl:text> 
		
	    <xsl:call-template name="selector">
	    	<xsl:with-param name="p_selector" select="''"/>		    
	    </xsl:call-template>

        <xsl:text>};MetaWrap.Wirewrap.register(l_rules);l_rules = null;</xsl:text>        
    </xsl:template>
   
    
	<xsl:template name="selector">
    
		<xsl:param name="p_selector"/>
		
        <xsl:for-each select="wr:selector">
        	
            <xsl:if test="wr:constructor|wr:onabort|wr:onblur|wr:onchange|wr:onclick|wr:ondblclick|wr:onerror|wr:onfocus|wr:onkeydown|wr:onkeypress|wr:onkeyup|wr:onload|wr:onmousedown|wr:onmouseout|wr:onmouseover|wr:onmouseup|wr:onreset|wr:onsubmit|wr:onunload|wr:remove|wr:replace|wr:before|wr:after|wr:prefix|wr:suffix|wr:add|wr:swap">
        	
	    		<!--<xsl:if test="parent::wr:selector/preceding-sibling::wr:selector)">-->
					<xsl:text>,</xsl:text>
				<!--</xsl:if>-->
        	
        	        	        
	            <xsl:text>'</xsl:text><xsl:if test="$p_selector != ''"><xsl:value-of select="$p_selector"/><xsl:text> </xsl:text></xsl:if><xsl:value-of select="@css"/><xsl:text>' : function(p_e){</xsl:text>
	                        
	            <!-- Constructor gets executed as soon as we see the matching element -->                        
	            <xsl:value-of select="wr:constructor"/>
	            
	            <xsl:if test="wr:onabort">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"abort",function(){</xsl:text>
	                    <xsl:value-of select="wr:onabort"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	
	            <xsl:if test="wr:onblur">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"blur",function(){</xsl:text>
	                    <xsl:value-of select="wr:onblur"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	
	            <xsl:if test="wr:onchange">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"change",function(){</xsl:text>
	                    <xsl:value-of select="wr:onchange"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onclick">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"click",function(){</xsl:text>
	                    <xsl:value-of select="wr:onclick"/>
	                <xsl:text>},false);</xsl:text>
	                
	            </xsl:if>
	
	            <xsl:if test="wr:ondblclick">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"dblclick",function(){</xsl:text>
	                    <xsl:value-of select="wr:ondblclick"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	
	            <xsl:if test="wr:onerror">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"error",function(){</xsl:text>
	                    <xsl:value-of select="wr:onerror"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onfocus">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"focus",function(){</xsl:text>
	                    <xsl:value-of select="wr:onfocus"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onkeydown">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"keydown",function(){</xsl:text>
	                    <xsl:value-of select="wr:onkeydown"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onkeypress">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"keypress",function(){</xsl:text>
	                    <xsl:value-of select="wr:onkeypress"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onkeyup">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"keyup",function(){</xsl:text>
	                    <xsl:value-of select="wr:onkeyup"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onload">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"load",function(){</xsl:text>
	                    <xsl:value-of select="wr:onload"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onmousedown">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"mousedown",function(){</xsl:text>
	                    <xsl:value-of select="wr:onmousedown"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            <xsl:if test="wr:onmouseout">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"mouseout",function(){</xsl:text>
	                    <xsl:value-of select="wr:onmouseout"/>
	                <xsl:text>},false);</xsl:text>
	                
	            </xsl:if>
	            
	            <xsl:if test="wr:onmouseover">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"mouseover",function(){</xsl:text>
	                    <xsl:value-of select="wr:onmouseover"/>
	                <xsl:text>},false);</xsl:text>
	                
	            </xsl:if>
	            
	            <xsl:if test="wr:onmouseup">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"mouseup",function(){</xsl:text>
	                    <xsl:value-of select="wr:onmouseup"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onreset">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"reset",function(){</xsl:text>
	                    <xsl:value-of select="wr:onreset"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onresize">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"resize",function(){</xsl:text>
	                    <xsl:value-of select="wr:onresize"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onsubmit">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"submit",function(){</xsl:text>
	                    <xsl:value-of select="wr:onsubmit"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
	            
	            <xsl:if test="wr:onunload">
	                <xsl:text>MetaWrap.Page.Element.addEventListener(p_e,"unload",function(){</xsl:text>
	                    <xsl:value-of select="wr:onunload"/>
	                <xsl:text>},false);</xsl:text>
	            </xsl:if>
                
                <xsl:for-each select="wr:swap">
                    <xsl:text>
                    var l_selected = MetaWrap.Page.getElementsBySelector("</xsl:text><xsl:value-of select="@css"/><xsl:text>");                   
                    if (l_selected.length == 1)
                    {                    
                        MetaWrap.Page.Element.swapElements(p_e,l_selected[0]);
                    }
                    else
                    if (l_selected.length == 0)
                    {
                        alert("unable to find using '</xsl:text><xsl:value-of select="@css"/><xsl:text>' to swap");
                    }
                    else
                    {
                        alert("swap '</xsl:text><xsl:value-of select="@css"/><xsl:text>' needs to match with only one item - but we are matching with " + l_selected.length);
                    }
                    </xsl:text>                    
                </xsl:for-each>                   
                
                <xsl:for-each select="wr:before">
                    <xsl:text>MetaWrap.Page.Element.before(p_e,"</xsl:text><xsl:call-template name="xml-to-one-line-of-js">
                        <xsl:with-param name="p_xml" select="."/>
                    </xsl:call-template><xsl:text>");</xsl:text>
                </xsl:for-each>               

                <xsl:for-each select="wr:after">
                    <xsl:text>MetaWrap.Page.Element.after(p_e,"</xsl:text><xsl:call-template name="xml-to-one-line-of-js">
                        <xsl:with-param name="p_xml" select="."/>
                    </xsl:call-template><xsl:text>");</xsl:text>
                 </xsl:for-each>
                 
                <xsl:if test="wr:replace">
                    <xsl:text>p_e = MetaWrap.Page.Element.replaceContent(p_e,"</xsl:text><xsl:call-template name="xml-to-one-line-of-js">
                        <xsl:with-param name="p_xml" select="wr:replace"/>
                    </xsl:call-template><xsl:text>");</xsl:text>
                </xsl:if>                
                
                <xsl:for-each select="wr:prefix">
                    <xsl:text>MetaWrap.Page.Element.prefix(p_e,"</xsl:text><xsl:call-template name="xml-to-one-line-of-js">
                        <xsl:with-param name="p_xml" select="."/>
                    </xsl:call-template><xsl:text>");</xsl:text>
                </xsl:for-each>    
                
                <xsl:for-each select="wr:suffix">
                    <xsl:text>MetaWrap.Page.Element.suffix(p_e,"</xsl:text><xsl:call-template name="xml-to-one-line-of-js">
                        <xsl:with-param name="p_xml" select="."/>
                    </xsl:call-template><xsl:text>");</xsl:text>
                </xsl:for-each>  
             
                <xsl:for-each select="wr:add">
                
                    <xsl:choose>
                      <xsl:when test="wr:component">
                        <xsl:text>alert('add a component');</xsl:text>
                      </xsl:when>
                      <xsl:when test="wr:fragment">
                        <xsl:text>alert('add a fragment');</xsl:text>
                      </xsl:when>                      
                      <xsl:otherwise>
                        <xsl:text>MetaWrap.Page.Element.suffix(p_e,"</xsl:text><xsl:call-template name="xml-to-one-line-of-js">
                            <xsl:with-param name="p_xml" select="."/>
                        </xsl:call-template><xsl:text>");</xsl:text>                      
                      </xsl:otherwise>
                    </xsl:choose>                    
                
                </xsl:for-each>                 

                <xsl:if test="wr:remove">
                    <xsl:text>MetaWrap.Page.Element.remove(p_e);</xsl:text>                                       
                </xsl:if>                
	            	            	            
				<xsl:text>}</xsl:text>

	        </xsl:if>
            
	            
			<xsl:if test="$p_selector != ''">
				<xsl:call-template name="selector">
						<xsl:with-param name="p_selector" select="concat($p_selector,' ',@css)"/>				
				</xsl:call-template>
			</xsl:if>
			
			<xsl:if test="$p_selector = ''">
				<xsl:call-template name="selector">
						<xsl:with-param name="p_selector" select="@css"/>				
				</xsl:call-template>
			</xsl:if>           
			
            
        </xsl:for-each>		
			
	</xsl:template>
    

 <xsl:template name="xml-to-one-line-of-js">
    <xsl:param name="p_xml"/>
    
    <xsl:variable name="l_quote"><xsl:call-template name="replace-string">
        <xsl:with-param name="text" select="$p_xml"/>
        <xsl:with-param name="from" select="'&quot;'"/>
        <xsl:with-param name="to" select="'\&quot;'"/>
    </xsl:call-template></xsl:variable>

    <xsl:variable name="l_cr"><xsl:call-template name="replace-string">
        <xsl:with-param name="text" select="$l_quote"/>
        <xsl:with-param name="from" select="'&#x0D;'"/>
        <xsl:with-param name="to" select="'\n'"/>
    </xsl:call-template></xsl:variable>                

    <xsl:call-template name="replace-string">
        <xsl:with-param name="text" select="$l_cr"/>
        <xsl:with-param name="from" select="'&#x0A;'"/>
        <xsl:with-param name="to" select="'\r'"/>
    </xsl:call-template>
    
 </xsl:template>


 <xsl:template name="replace-string">
    <xsl:param name="text"/>
    <xsl:param name="from"/>
    <xsl:param name="to"/>

    <xsl:choose>
      <xsl:when test="contains($text, $from)">

    <xsl:variable name="before" select="substring-before($text, $from)"/>
    <xsl:variable name="after" select="substring-after($text, $from)"/>
    <xsl:variable name="prefix" select="concat($before, $to)"/>

    <xsl:value-of select="$before"/>
    <xsl:value-of select="$to"/>
        <xsl:call-template name="replace-string">
      <xsl:with-param name="text" select="$after"/>
      <xsl:with-param name="from" select="$from"/>
      <xsl:with-param name="to" select="$to"/>
    </xsl:call-template>
      </xsl:when> 
      <xsl:otherwise>
        <xsl:value-of select="$text"/>  
      </xsl:otherwise>
    </xsl:choose>            
 </xsl:template>

 

    
    
</xsl:stylesheet>