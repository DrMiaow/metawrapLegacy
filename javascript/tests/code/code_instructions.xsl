<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
    $Id: code_instructions.xsl,v 1.7 2007/04/21 06:19:35 james Exp $

    $Log: code_instructions.xsl,v $
    Revision 1.7  2007/04/21 06:19:35  james
    Working on state machine

    Revision 1.6  2006/02/20 12:16:04  james
    Adding dispatch code

    Revision 1.5  2006/02/19 13:23:44  james
    Added code gen to DBC components of actions

    Revision 1.4  2006/02/19 11:53:31  james
    Added some code generation for the 'call' instruction

    Revision 1.3  2006/02/15 11:58:26  james
    Merged code generation into single shared XSLT. There is an issue with
    namespaces that can't be avoided - have to not include a specific
    namespace declaration in the XML and  XSLT or have everything in
    the same schema. At the moment everything has a separate schema
    This may change at some point to allow a single XML file solution.

    Revision 1.2  2006/02/14 21:43:21  james
    Trying to move namespace issues out of xslt

    Revision 1.1  2006/02/13 10:54:26  james
    Attempting to share code XSLT between state and action


-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- 
        
        This stylesheet contains rules for state instructions.
        
    -->

    <!-- Process a 'var' element 
        Transform
            &lt;var name="X"/&gt;
        Into
        var X;
    -->
    <xsl:template match="var" mode="instruction" >
        <xsl:variable name="name" select="@name"/>
        // --- var name = <xsl:value-of select="$name"/>
        var <xsl:value-of select="$name"/>;
    </xsl:template> 

    <!-- Process a 'copy' element 

    Transform
        &lt;copy from="A.B['C']" into="X"/&gt;
    Into
        X = MetaWrap.Code.getValue('A.B['C']');

    Transform
        &lt;copy from="X" into="A.B['C']"/&gt;
    Into
        MetaWrap.Code.putValue(cookie,"A.B['C']");

    Transform
        &lt;copy from="X" into="Y"/&gt;
    Into
        Y = X;


    -->
    <xsl:template match="copy" mode="instruction" >
        <xsl:variable name="from" select="@from"/>
        <xsl:variable name="to" select="@to"/>      
        // --- copy from='<xsl:value-of select="$from"/>' to='<xsl:value-of select="$to"/>'
        <xsl:choose>
            <!-- if both $from and $to are locally declared variables-->
            <xsl:when test="../var[@name=$to] and ../var[@name=$from]">
                // Var To Var
                <xsl:value-of select="$to"/> = <xsl:value-of select="$from"/>;          
            </xsl:when>             
            <!-- if $to is a locally declared variable-->           
            <xsl:when test="../var[@name=$to]">
                // From (Constant | Handle) to Var
                <xsl:choose>
                    <!-- if $from is a constant of some kind -->
                    <xsl:when test="$from = 'null' or $from = 'undefined' or $from = 'true' or $from = 'false' or starts-with($from,'&quot;') or starts-with($from,&quot;&apos;&quot;) or contains('0123456789',substring($from,1,1))" >
                        // From Constant To Var
                        <xsl:value-of select="$to"/> = <xsl:value-of select="$from"/>;
                    </xsl:when>
                    <xsl:otherwise>
                        // Handle To Var
                        <xsl:value-of select="$to"/> = MetaWrap.Code.getHandle("<xsl:value-of select="$from"/>");
                    </xsl:otherwise>                    
                </xsl:choose>                       
            </xsl:when>     
            <!-- if $from is a locally declared variable-->                     
            <xsl:when test="../var[@name=$from]">
                <xsl:choose>
                    <!-- if $to is a constant of some kind -->              
                    <xsl:when test="$to = 'null' or $to = 'undefined' or $to = 'true' or $to = 'false' or starts-with($to,'&quot;') or starts-with($to,&quot;&apos;&quot;) or contains('0123456789',substring($to,1,1))" >
                        // From Var To Constant
                        <xsl:value-of select="$to"/> = <xsl:value-of select="$from"/>;                      
                    </xsl:when>
                    <xsl:otherwise>
                        // Var To Handle
                        MetaWrap.Code.varToHandle(<xsl:value-of select="$from"/>,"<xsl:value-of select="$to"/>");                       
                    </xsl:otherwise>                    
                </xsl:choose>           
            </xsl:when>
            <!-- if neither $from nor $to are locally declared variables -->                                    
            <xsl:otherwise>
                // (Handle | Constant) To Handle
                <xsl:choose>
                    <!-- if $from is a constant of some kind -->
                    <xsl:when test="$from = 'null' or $from = 'undefined' or $from = 'true' or $from = 'false' or starts-with($from,'&quot;') or starts-with($from,&quot;&apos;&quot;) or contains('0123456789',substring($from,1,1))" >
                        // From Constant To Var
                        MetaWrap.Code.varToHandle(<xsl:value-of select="$from"/>,"<xsl:value-of select="$to"/>");
                    </xsl:when>
                    <xsl:otherwise>
                        // Handle To Handle
                        MetaWrap.Code.copy.handleToHandle(<xsl:value-of select="$from"/>,"<xsl:value-of select="$to"/>");
                    </xsl:otherwise>                    
                </xsl:choose>                   
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> 
    
    <!-- ========= END OF COPY ========= -->
    
    <!-- ========= START OF COMPARE ========= 
    
    Transform
        &lt;compare op="notequal" with="A" to="B" result="C"/&gt;
    Into
        C = (A != B);

    --> 

    <!-- Process a 'compare' element -->
    <xsl:template match="compare" mode="instruction" >
        <xsl:variable name="op" select="@op"/>
        <xsl:variable name="with" select="@with"/>
        <xsl:variable name="to" select="@to"/>
        <xsl:variable name="result" select="@result"/>      
        // --- compare op='<xsl:value-of select="$op"/>' with='<xsl:value-of select="$with"/>' to='<xsl:value-of select="$to"/>' result='<xsl:value-of select="$result"/>'      
        // With ( Var | Constant | Handle ) , To ( Var | Constant | Handle ) , Result ( Var | Handle )      
        <xsl:choose>
            <!-- if $from, $with and $result are locally declared variables -->
            <xsl:when test="../var[@name=$with] and ../var[@name=$to] and ../var[@name=$result]">
                // * With Var , To Var , Result Var             
                <xsl:call-template name="compareRRR">
                    <xsl:with-param name="OP" select="$op"/>                
                    <xsl:with-param name="R1" select="$with"/>
                    <xsl:with-param name="R2" select="$to"/>
                    <xsl:with-param name="R3" select="$result"/>                    
                </xsl:call-template> 
            </xsl:when>                     
            <!-- if $with is a locally declared variable-->         
            <xsl:when test="../var[@name=$with]">
                // With Var , To (Constant | Handle ) , Result ( Var | Handle )
                <xsl:choose>
                    <!-- if $to is a constant of some kind -->
                    <xsl:when test="$to = 'null' or $to = 'undefined' or $to = 'true' or $to = 'false' or starts-with($to,'&quot;') or starts-with($to,&quot;&apos;&quot;) or contains('0123456789',substring($to,1,1))" >
                        // With Var , To Constant , Result ( Var | Handle )                     
                        <xsl:choose>                        
                            <!-- if $result is a var -->
                            <xsl:when test="../var[@name=$result]">
                                // * With Var , To Constant , Result Var                                                                
                                <xsl:call-template name="compareRRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>                        
                            </xsl:when>
                            <!-- only other choice is that $result is a Handle  -->                         
                            <xsl:otherwise>
                                // * With Var , To Constant, Result Handle
                                <xsl:call-template name="compareRRH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>                            
                            </xsl:otherwise>                                                
                        </xsl:choose>                                                   
                    </xsl:when>
                    <!-- if $to is a locally declared variable-->           
                    <xsl:when test="../var[@name=$to]">
                        // * With Var , To Var , Result Handle (Result must Be Handle, its not Var and Constant makes no sense)
                        <xsl:call-template name="compareRRH">
                            <xsl:with-param name="OP" select="$op"/>                
                            <xsl:with-param name="R1" select="$with"/>
                            <xsl:with-param name="R2" select="$to"/>
                            <xsl:with-param name="H3" select="$result"/>                    
                        </xsl:call-template> 
                    </xsl:when>
                    <xsl:otherwise>
                        // With Var , To Handle , Result ( Var | Handle )                       
                        <xsl:choose>                        
                            <!-- if $result is a var -->
                            <xsl:when test="../var[@name=$result]">
                                // * With Var , To Handle , Result Var
                                <xsl:call-template name="compareHRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="H1" select="$to"/>
                                    <xsl:with-param name="R2" select="$with"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>                            </xsl:when>
                            <!-- only other choice is that $result is a Handle  -->                         
                            <xsl:otherwise>
                                // * With Var , To Handle , Result Handle
                                <xsl:call-template name="compareRHH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="H2" select="$to"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>
                            </xsl:otherwise>                                                
                        </xsl:choose>                           
                    </xsl:otherwise>                    
                </xsl:choose>                       
            </xsl:when>                 
            <!-- if $from is a locally declared variable-->                     
            <xsl:when test="../var[@name=$to]">
                // With !Var To Var Result ???          
                <xsl:choose>
                    <!-- if $to is a constant of some kind -->              
                    <xsl:when test="$with = 'null' or $with = 'undefined' or $with = 'true' or $with = 'false' or starts-with($with,'&quot;') or starts-with($with,&quot;&apos;&quot;) or contains('0123456789',substring($with,1,1))" >
                        // With Constant To Var, Result ( Var | Handle )                        
                        <xsl:choose>                        
                            <!-- if $result is a var -->
                            <xsl:when test="../var[@name=$result]">
                                // * With Constant , To Var , Result Var
                                <xsl:call-template name="compareRRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>                                                                
                            </xsl:when>
                            <!-- only other choice is that $result is a Handle  -->                         
                            <xsl:otherwise>
                                // * With Constant To Var, Result Handle                                
                                <xsl:call-template name="compareRRH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>                                
                            </xsl:otherwise>                                                
                        </xsl:choose>                                                   
                    </xsl:when>
                    <xsl:otherwise>
                        // With Handle , To Var , Result ( Var | Handle )
                        <xsl:choose>                        
                            <!-- if $result is a var -->
                            <xsl:when test="../var[@name=$result]">
                                // * With Handle , To Var , Result Var
                                <xsl:call-template name="compareHRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="H1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>                                                                
                            </xsl:when>
                            <!-- only other choice is that $result is a Handle  -->                         
                            <xsl:otherwise>
                                // * With Handle , To Var , Result Handle
                                <xsl:call-template name="compareRHH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$to"/>
                                    <xsl:with-param name="H2" select="$with"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <!-- if $result is a locally declared variable-->                       
            <xsl:when test="../var[@name=$result]">
                // With ( Constant | Handle ) , To ( Constant | Handle ) , Result Var                       
                <xsl:choose>                
                    <!-- if $to is a constant of some kind -->
                    <xsl:when test="$to = 'null' or $to = 'undefined' or $to = 'true' or $to = 'false' or starts-with($to,'&quot;') or starts-with($to,&quot;&apos;&quot;) or contains('0123456789',substring($to,1,1))" >
                        // With ( Constant | Handle ) To Constant, Result var                       
                        <xsl:choose>                        
                            <!-- if $with is a constant of some kind -->
                            <xsl:when test="$with = 'null' or $with = 'undefined' or $with = 'true' or $with = 'false' or starts-with($with,'&quot;') or starts-with($with,&quot;&apos;&quot;) or contains('0123456789',substring($with,1,1))" >
                                // * With Constant To Constant, Result var
                                <xsl:call-template name="compareRRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="R3" select="$result"/>
                                </xsl:call-template>
                            </xsl:when>
                            <xsl:otherwise>
                                // * With Handle To Constant, Result Var
                                <xsl:call-template name="compareHRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="H1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>                                                                                                
                            </xsl:otherwise>                                                
                        </xsl:choose>                           
                    </xsl:when>                 
                    <!-- $to must be a Handle then -->
                    <xsl:otherwise>
                        // With ( Constant | Handle ) , To Handle , Result Var                                              
                        <xsl:choose>                        
                            <!-- if $with is a constant of some kind -->
                            <xsl:when test="$with = 'null' or $with = 'undefined' or $with = 'true' or $with = 'false' or starts-with($with,'&quot;') or starts-with($with,&quot;&apos;&quot;) or contains('0123456789',substring($with,1,1))" >
                                // * With Constant To Handle, Result var
                                <xsl:call-template name="compareHRR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="H1" select="$to"/>
                                    <xsl:with-param name="R2" select="$with"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>
                            </xsl:when>
                            <xsl:otherwise>
                                // * With Handle To Handle, Result Var
                                <xsl:call-template name="compareHHR">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="H1" select="$with"/>
                                    <xsl:with-param name="H2" select="$to"/>
                                    <xsl:with-param name="R3" select="$result"/>                    
                                </xsl:call-template>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <!-- if neither $from nor $to are locally declared variables -->            
            <xsl:otherwise>
                // With ( Handle | Constant) , To ( Handle | Constant ) , Result Handle             
                <xsl:choose>
                    <!-- if $with is a constant of some kind -->
                    <xsl:when test="$with = 'null' or $with = 'undefined' or $with = 'true' or $with = 'false' or starts-with($with,'&quot;') or starts-with($with,&quot;&apos;&quot;) or contains('0123456789',substring($with,1,1))" >
                        // With Constant , To ( Handle | Constant ) , Result Handle
                        <xsl:choose>
                            <!-- if $to is a constant of some kind -->
                            <xsl:when test="$to = 'null' or $to = 'undefined' or $to = 'true' or $to = 'false' or starts-with($to,'&quot;') or starts-with($to,&quot;&apos;&quot;) or contains('0123456789',substring($to,1,1))" >
                                // * With Constant, To Constant, Result Handle
                                <xsl:call-template name="compareRRH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="R2" select="$to"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>                                
                            </xsl:when>
                            <xsl:otherwise>
                                // * With Constant, To Handle, Result Handle
                                <xsl:call-template name="compareRHH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$with"/>
                                    <xsl:with-param name="H2" select="$to"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>                                                                
                            </xsl:otherwise>    
                        </xsl:choose>                                                               
                    </xsl:when>
                    <xsl:otherwise>
                        // With Handle  To ( Handle | Constant ) , Result Handle
                        <xsl:choose>
                            <!-- if $to is a constant of some kind -->
                            <xsl:when test="$to = 'null' or $to = 'undefined' or $to = 'true' or $to = 'false' or starts-with($to,'&quot;') or starts-with($to,&quot;&apos;&quot;) or contains('0123456789',substring($to,1,1))" >
                                // * With Handle , To Constant , Result Handle                              
                                <xsl:call-template name="compareRHH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="R1" select="$to"/>
                                    <xsl:with-param name="H2" select="$with"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>                                                                                                
                            </xsl:when>
                            <xsl:otherwise>
                                // * With Handle , To Handle , Result Handle
                                <xsl:call-template name="compareHHH">
                                    <xsl:with-param name="OP" select="$op"/>                
                                    <xsl:with-param name="H1" select="$with"/>
                                    <xsl:with-param name="H2" select="$to"/>
                                    <xsl:with-param name="H3" select="$result"/>                    
                                </xsl:call-template>                                                                
                            </xsl:otherwise>    
                        </xsl:choose>                                                                                       
                    </xsl:otherwise>                                                
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>       
    </xsl:template> 
    
    <!-- 'compare' with $with=Reference $to=Refernce $result=Reference -->
    <xsl:template name="compareRRR">
        <xsl:param name="OP" /> 
        <xsl:param name="R1" />
        <xsl:param name="R2" />     
        <xsl:param name="R3" />                             
        <xsl:choose>
            <xsl:when test="$OP = 'equal'">
                // Equal - A comparison for equality. 
                <xsl:value-of select="$R3"/> = (<xsl:value-of select="$R1"/> == <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'greaterthan'">
                //  GreaterThan - A comparison for greater than. 
                <xsl:value-of select="$R3"/> = (<xsl:value-of select="$R1"/> &gt; <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'greaterthanequal'">
                // GreaterThanEqual - A comparison for greater than or equal to.                        
                <xsl:value-of select="$R3"/> = (<xsl:value-of select="$R1"/> &gt;= <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'lessthan'">
                // LessThan - A comparison for less than.                       
                <xsl:value-of select="$R3"/> = (<xsl:value-of select="$R1"/> &lt; <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'lessthanequal'">
                // LessThanEqual - A comparison for less than or equal to. 
                <xsl:value-of select="$R3"/> = (<xsl:value-of select="$R1"/> &lt;= <xsl:value-of select="$R2"/>);                       
            </xsl:when>
            <xsl:when test="$OP = 'notequal'">
                // NotEqual - A comparison for inequality               
                <xsl:value-of select="$R3"/> = (<xsl:value-of select="$R1"/> != <xsl:value-of select="$R2"/>);
            </xsl:when>
        </xsl:choose>   
    </xsl:template>
    
    <!-- 'compare' with $with=Reference $to=Refernce $result=Reference -->
    <xsl:template name="compareHRR">
        <xsl:param name="OP" /> 
        <xsl:param name="H1" />
        <xsl:param name="R2" />     
        <xsl:param name="R3" />                             
        <xsl:choose>
            <xsl:when test="$OP = 'equal'">
                // Equal - A comparison for equality. 
                <xsl:value-of select="$R3"/> = (MetaWrap.Code.getHandle("<xsl:value-of select="$H1"/>") == <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'greaterthan'">
                //  GreaterThan - A comparison for greater than. 
                <xsl:value-of select="$R3"/> = (MetaWrap.Code.getHandle("<xsl:value-of select="$H1"/>") &gt; <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'greaterthanequal'">
                // GreaterThanEqual - A comparison for greater than or equal to.                        
                <xsl:value-of select="$R3"/> = (MetaWrap.Code.getHandle("<xsl:value-of select="$H1"/>") &gt;= <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'lessthan'">
                // LessThan - A comparison for less than.                       
                <xsl:value-of select="$R3"/> = (MetaWrap.Code.getHandle("<xsl:value-of select="$H1"/>") &lt; <xsl:value-of select="$R2"/>);
            </xsl:when>
            <xsl:when test="$OP = 'lessthanequal'">
                // LessThanEqual - A comparison for less than or equal to. 
                <xsl:value-of select="$R3"/> = (MetaWrap.Code.getHandle("<xsl:value-of select="$H1"/>") &lt;= <xsl:value-of select="$R2"/>);                        
            </xsl:when>
            <xsl:when test="$OP = 'notequal'">
                // NotEqual - A comparison for inequality               
                <xsl:value-of select="$R3"/> = (MetaWrap.Code.getHandle("<xsl:value-of select="$H1"/>") != <xsl:value-of select="$R2"/>);
            </xsl:when>
        </xsl:choose>   
    </xsl:template> 
    
    <!-- 'compare' with $with=Reference $to=Refernce $result=Reference -->
    <xsl:template name="compareRRH">
        <xsl:param name="OP" /> 
        <xsl:param name="R1" />
        <xsl:param name="R2" />     
        <xsl:param name="H3" />                             
        <xsl:choose>
            <xsl:when test="$OP = 'equal'">
                // Equal - A comparison for equality. 
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> == <xsl:value-of select="$R2"/>,"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'greaterthan'">
                //  GreaterThan - A comparison for greater than. 
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &gt; <xsl:value-of select="$R2"/>,"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'greaterthanequal'">
                // GreaterThanEqual - A comparison for greater than or equal to.                        
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &gt;= <xsl:value-of select="$R2"/>,"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'lessthan'">
                // LessThan - A comparison for less than.                       
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &lt; <xsl:value-of select="$R2"/>,"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'lessthanequal'">
                // LessThanEqual - A comparison for less than or equal to. 
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &lt;= <xsl:value-of select="$R2"/>,"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'notequal'">
                // NotEqual - A comparison for inequality               
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> != <xsl:value-of select="$R2"/>,"<xsl:value-of select="$H3"/>");
            </xsl:when>
        </xsl:choose>
    </xsl:template> 
    
    <!-- 'compare' with $with=Handle $to=Handle $result=Handle -->
    <xsl:template name="compareHHH">
        <xsl:param name="OP" /> 
        <xsl:param name="H1" />
        <xsl:param name="H2" />     
        <xsl:param name="H3" />                             
        MetaWrap.Code.compare.allHandle("<xsl:value-of select="$OP"/>","<xsl:value-of select="$H1"/>","<xsl:value-of select="$H2"/>","<xsl:value-of select="$H3"/>");       
    </xsl:template>     
    
    <!-- 'compare' with $with=Handle $to=Handle $result=Handle -->
    <xsl:template name="compareHHR">
        <xsl:param name="OP" /> 
        <xsl:param name="H1" />
        <xsl:param name="H2" />     
        <xsl:param name="R3" />                             
        <xsl:value-of select="$R3"/> = MetaWrap.Code.compare.handleToHandle("<xsl:value-of select="$OP"/>","<xsl:value-of select="$H1"/>","<xsl:value-of select="$H2"/>");      
    </xsl:template>     
    
    
    <!-- 'compare' with $with=Reference $to=Handle $result=Handle -->
    <xsl:template name="compareRHH">
        <xsl:param name="OP" /> 
        <xsl:param name="R1" />
        <xsl:param name="H2" />     
        <xsl:param name="H3" />     
        <xsl:choose>
            <xsl:when test="$OP = 'equal'">
                // Equal - A comparison for equality. 
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> == MetaWrap.Code.getHandle("<xsl:value-of select="$H2"/>"),"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'greaterthan'">
                //  GreaterThan - A comparison for greater than. 
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &gt; MetaWrap.Code.getHandle("<xsl:value-of select="$H2"/>"),"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'greaterthanequal'">
                // GreaterThanEqual - A comparison for greater than or equal to.                        
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &gt;= MetaWrap.Code.getHandle("<xsl:value-of select="$H2"/>"),"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'lessthan'">
                // LessThan - A comparison for less than.                       
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &lt; MetaWrap.Code.getHandle("<xsl:value-of select="$H2"/>"),"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'lessthanequal'">
                // LessThanEqual - A comparison for less than or equal to. 
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> &lt;= MetaWrap.Code.getHandle("<xsl:value-of select="$H2"/>"),"<xsl:value-of select="$H3"/>");
            </xsl:when>
            <xsl:when test="$OP = 'notequal'">
                // NotEqual - A comparison for inequality               
                MetaWrap.Code.varToHandle(<xsl:value-of select="$R1"/> != MetaWrap.Code.getHandle("<xsl:value-of select="$H2"/>"),"<xsl:value-of select="$H3"/>");
            </xsl:when>
        </xsl:choose>                               
    </xsl:template>     
    
    <!-- ========= END OF COMPARE ========= -->
    
    <!-- ========= START OF RETURN ========= --> 
    
    <!-- Process a 'return' element -->
    <xsl:template match="return" mode="instruction" >
        // Return a ( Handle | Constant | Variable )
        <xsl:variable name="with" select="@with"/>  
        <xsl:variable name="call" select="@call"/> 
        <xsl:choose>
            <!-- if both $from and $to are locally declared variables-->
            <xsl:when test="$call != ''">
                // Return a Variable
                return <xsl:value-of select="$call"/>;
            </xsl:when>             
            <xsl:when test="../var[@name=$with]">
                // Return a Variable
                return <xsl:value-of select="$with"/>;
            </xsl:when> 
            <xsl:when test="$with = 'null' or $with = 'undefined' or $with = 'true' or $with = 'false' or starts-with($with,'&quot;') or starts-with($with,&quot;&apos;&quot;) or contains('0123456789',substring($with,1,1))" >
                // Return a Constant                        
                return <xsl:value-of select="$with"/>;              
            </xsl:when> 
            <xsl:otherwise>                     
                // Return value from a handle
                return MetaWrap.Code.getHandle("<xsl:value-of select="$with"/>");               
            </xsl:otherwise>            
        </xsl:choose>           
        </xsl:template> 


    <!-- ========= END OF RETURN ========= -->
    
    <!-- ========= START OF CALL ========= --> 
    
    <!-- Process a 'call' element -->
    <xsl:template match="call" mode="instruction" >
        // Call a function
        <xsl:variable name="result" select="@result"/>  
        <xsl:variable name="function" select="@function"/>          
        <xsl:choose>
            <!-- if both $from and $to are locally declared variables-->
            <xsl:when test="../var[@name=$result]">
                // result from call goes into a variable
                // Get a reference to function
                // call the function
                <xsl:value-of select="$result"/> = MetaWrap.Code.getHandle("<xsl:value-of select="$function"/>")(
           		<xsl:for-each select="reference">
					<xsl:variable name="name" select="@name"/>  
					// A reference to '<xsl:value-of select="$name"/>'
					<xsl:value-of select="$name"/>,
				</xsl:for-each>
				null
			// End of the function call
			);               
            </xsl:when> 
            <xsl:otherwise>                     
                // result from call goes into a handle
				MetaWrap.Code.varToHandle(
                MetaWrap.Code.getHandle("<xsl:value-of select="$function"/>")(
           		<xsl:for-each select="reference">
					<xsl:variable name="name" select="@name"/>  
					// A reference to '<xsl:value-of select="$name"/>'
					<xsl:value-of select="$name"/>,
				</xsl:for-each>
				null
				)
				,"<xsl:value-of select="$result"/>");                
            </xsl:otherwise>            
        </xsl:choose>           
        </xsl:template> 

    <!-- ========= END OF CALL ========= -->
        

</xsl:stylesheet>