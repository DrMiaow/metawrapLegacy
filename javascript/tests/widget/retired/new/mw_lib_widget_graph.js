/*

    @file mw_lib_widget_graph.js

    $Id: mw_lib_widget_graph.js,v 1.1 2006/12/21 07:42:25 james Exp $
          
    @author     James Mc Parlane
          
    PROJECT:    MetaWrap JavaScript Library
          
    COMPONENT:  -
        
    @date       3 August 2005
          

    GENERAL INFO:

        Massive Technologies
        PO Box 567
        Darlinghurst 2010
        NSW, Australia
        email:  james@massive.com.au
        tel:    (+61-2) 9331 8699
        fax:    (+61-2) 9331 8699
        mob:    (+61) 407-909-186
  

    LICENSE:
  
    Copyright (C) 2001  Massive Technologies, Pty Ltd.

    MetaWrap is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

*/

/*
 * $Log: mw_lib_widget_graph.js,v $
 * Revision 1.1  2006/12/21 07:42:25  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.11  2006/05/08 12:49:01  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.10  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.9  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.8  2005/08/17 08:06:38  james
 * created page ouput
 *
 * Revision 1.7  2005/08/09 14:42:22  james
 * Started creating some simple tests.
 *
 * Revision 1.6  2005/08/09 08:28:00  james
 * Getting first batch of tests ready..
 *
 * Revision 1.5  2005/08/08 13:55:30  james
 * Building towards a framework that can test javascript and produce a nice graph.
 *
 * Revision 1.4  2005/08/04 07:43:26  james
 * Making grapher code more pretty
 *
 * Revision 1.3  2005/08/04 05:46:53  james
 * Getting graph widget into fighting shape
 *
 */

/*! \page mw_javascript_lib_macro MetaWrap - JavaScript - Macro
 *
 * \subsection mw_javascript_lib_acro Overview
 */

//alert("$Id: mw_lib_widget_graph.js,v 1.1 2006/12/21 07:42:25 james Exp $");
 
/*! \defgroup mw_javascript_lib_macro  MetaWrap - JavaScript - Macro
 *@{
 */ 
 
 // Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page.Output","mw_lib_page_output.js");
MwUse("MetaWrap.Widget","mw_lib_widget.js");

 
/*! @name  MetaWrap.CSS Namespace */
//@{

var isIE = (document.all) ? true : false;

/*!
    @fn         MetaWrap.Widget.Graph = function Graph()
    @return     MetaWrap.Widget.Graph  
    @brief      Create MetaWrap.Widget.Graph Namespace and class
    @author     James Mc Parlane
    @date       3 August 2005
*/
MetaWrap.Widget.Graph = function Graph()
{
    this.m_version = '0.0.1';
    this.m_destination = null;
    this.m_orientation = 'horizontal';
    this.m_adjustmin = false;
    this.m_showbar = true;
    this.m_center = true;
    this.m_showline = false;
    this.m_title = '';
    this.m_ycaption = '';
    this.m_xcaption = '';
    this.m_xwidth = 30;
    this.m_xvalheight = 50;
    this.m_linecolour = 'black';
    this.m_line_width = 1;
    this.m_markcolor = 'red';
    this.m_marksize = 4;
    this.m_showvalues = true;
    this.m_values = new Array();
    this.draw = MetaWrap_Widget_Graph_draw;
    this.clear = MetaWrap_Widget_Graph_clear;
    this.flush = MetaWrap_Widget_Graph_flush;
    this.write = MetaWrap_Widget_Graph_write;
    return this;
}

/*!
    @fn         function MetaWrap_Widget_Graph_clear()
    @return     void 
    @brief      Clear our graph
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Widget_Graph_clear()
{
    this.m_destination.clear();
}

/*!
    @fn         function MetaWrap_Widget_Graph_flush()
    @return     void 
    @brief      Flush output buffer to the graph
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Widget_Graph_flush()
{
    this.m_destination.flush();
}

/*!
    @fn         function MetaWrap_Widget_Graph_write(p_string)
    @return     void 
    @brief      Write to the output buffer for the graph
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Widget_Graph_write(p_string)
{
    this.m_destination.write(p_string);
}

/*!
    @fn         function MetaWrap_Widget_Graph_Draw()
    @return     void 
    @brief      Draw the graph
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Widget_Graph_draw()
{
    if (this.m_orientation == 'vertical')
        MetaWrap_Widget_Graph_DrawV(this);
    else
        MetaWrap_Widget_Graph_DrawH(this);
}

/*!
    @fn         function MetaWrap_Widget_Graph_DrawH(p_graph)
    @param      p_graph The MetaWrap.Widget.Graph object we are drawing
    @return     void 
    @brief      Draw the graph horizontally
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Widget_Graph_DrawH(p_graph)
{
    var i, e, h, v, g, step, rect;
    var he, heTop, heAxis, heX;
    var yMin, yMax, yStep, ratio;

    // find the biggest value
    yMax = -1;
    for (i=0; i < p_graph.m_values.length; i++)
    {
        if (p_graph.m_values[i][0] > yMax)   yMax = p_graph.m_values[i][0];
    }

    // find the smallest value
    if (!p_graph.m_adjustmin)
    {
        yMin = 0;
    }else
    {
        yMin = yMax;
        for (i=0; i < p_graph.m_values.length; i++)
        {
            if (p_graph.m_values[i][0] < yMin)   yMin = p_graph.m_values[i][0];
        }
    }

    // Calculate scale values
    var n = Math.pow(10,Math.floor(Math.log(yMax) / Math.LN10));
    var np = n / 10;
    var nn = n * 10;

    if (n > 1)
    {
        if ((yMax % n) == 0)
        {
            yMax += n;
        }

        yMin = Math.floor(yMin / n) * n;
        yMax = Math.ceil(yMax / n) * n;
    }
    else
    {
        if ((yMax % n) == 0)
        {
            yMax += n;
        }
    }

    ratio = 300 / (yMax - yMin); // 300 = y axis length in pixels

    yStep = (yMax - yMin) / 8;
    
    if (yStep <= np)            
    {
        yStep = np;
    }
    else     
    if (yStep <= (2 * np)) 
    {
        yStep = 2 * np;
    }
    else 
    if (yStep <= (5 * np)) 
    {
        yStep = 5 * np;
    }
    else
    {
        yStep = n;
    }

    step=Math.round(yStep*ratio);  // scale step in pixels
    heTop = 10;
    he = step * ((yMax - yMin) / yStep); // total graph height in pixels
    heAxis = 5;
    heX = p_graph.m_xvalheight;

    if (p_graph.m_center)
    {
        p_graph.write('<center>');
    }

    p_graph.write('<div id="graph_canvas" >');

    // Title
    p_graph.write('<table border="0" cellspacing="0" cellpadding="0" id="wrapper" class="graph">');
    p_graph.write('<tr><td colspan=' + (p_graph.m_values.length + 3) + ' align=center><h3>' + p_graph.m_title + '</h3></td></tr>');

    // Y Caption
    p_graph.write('<tr><td style="position:relative">');
    p_graph.write('<table border=0 cellspacing=0 cellpadding=0 id=graph>');
    p_graph.write('<tr>');
    p_graph.write('<td valign=middle nowrap align=center height=' + (heTop + he + heAxis + heX) + '>');
    p_graph.write('<div class=ycaption><br>' + p_graph.m_ycaption + '</div>');
    p_graph.write('</td>');

    // Scale
    p_graph.write('<td valign=top style="position:relative" id=scalewrapper>');
    
    
    
    
    p_graph.write('<table cellspacing=0 cellpadding=0 border=0 class=yvalue_h id=scale>');

    h=heTop;
    
    for (i = yMax; i >= yMin; i-=yStep)
    {
        p_graph.write('<tr><td height=' + h + ' valign=bottom align=right>' + i + '</td></tr>');
        h=step;
    }

    p_graph.write('</table>');
    
    p_graph.write('</td>');

    // Left Grid
    p_graph.write('<td valign=bottom align=right width=5 style="position:relative">');
    p_graph.write('<table cellspacing=0 cellpadding=0 border=0 width="100%" class=gridtable>');

    h=heTop;
    for (i=yMax; i >= yMin; i-=yStep)
    {
        p_graph.write('<tr><td height=' + h + '><img src=dot.gif border=0></td></tr>');
        h=step + ' class=gridleft';
    }

    p_graph.write('<tr><td height=' + heAxis + ' class=gridleft><img src=dot.gif border=0></td></tr>');
    p_graph.write('<tr><td height=' + heX + '><img src=dot.gif border=0></td></tr>');
    p_graph.write('</table>');
    p_graph.write('</td>');

    // Plot Bars
    for (var x=0; x < p_graph.m_values.length; x++)
    {
        v=p_graph.m_values[x][0];
        g = (x < (p_graph.m_values.length-1)) ? 'grid' : 'gridright';
        p_graph.write('<td valign=bottom align=center width=' + p_graph.m_xwidth + ' style="position:relative">');

        
        /*
        // Grid
        if (isIE)
        {
            p_graph.write('<table cellspacing=0 cellpadding=0 border=0 width="100%" class=gridtable>');

            h=heTop;
            for (i=yMax; i >= yMin; i-=yStep)
            {
                p_graph.write('<tr><td height=' + h + '><img src=dot.gif border=0></td></tr>');
                h=step + ' class=' + g;
            }
            
            p_graph.write('</table>');
        }
        */
        

        // Bar
        h = Math.ceil((yMax-v)*ratio);
        
        if (h > he) 
        {
            h = he;
        }
        
        p_graph.write('<table cellspacing=0 cellpadding=0 border=0 width="100%" class=datatable>');
        p_graph.write('<tr><td valign=bottom align=center height=' + (heTop + h) + ' class=xyvalue>'
                    + (p_graph.m_showvalues ? v : '<img src=dot.gif border=0>') + '</td></tr>');
        h = he - h;
        p_graph.write('<tr><td height=' + h + ' align=center>');
        p_graph.write('<table width="50%" cellspacing=0 cellpadding=0 ' + ((p_graph.m_showbar) ? 'class=bar' : '') + ' id=bar>');
        p_graph.write('<tr><td height=' + h + '><img src=dot.gif border=0></td></tr></table></td></tr>');
        p_graph.write('<tr><td height=' + heAxis + ' class=gridbottom><img src=dot.gif border=0></td></tr>');
        p_graph.write('<tr><td height=' + heX + ' valign=top align=center class=xvalue_h>' + p_graph.m_values[x][1] + '</td></tr>');
        p_graph.write('</table>');
        p_graph.write('</td>');
    }

    // X Caption
    p_graph.write('</tr>');
    p_graph.write('<tr>');
    p_graph.write('<td colspan=3></td>');
    p_graph.write('<td align=center colspan=' + p_graph.m_values.length + '><h5>' + p_graph.m_xcaption + '</h5></td>');
    p_graph.write('</tr>');
    p_graph.write('</table>');
    p_graph.write('</td></tr></table>');
    p_graph.write('</div>');
    
    if (p_graph.m_center)
    {
        p_graph.write('</center>');
    }
    
    
    

    // Push this out into the document - we are going to need to access it
    // in the next stage where we will get its location and overlay points and lines.    
    p_graph.flush();

    var l_wrapper = document.getElementById('wrapper');    
    
    if (!l_wrapper) 
    {
        alert("wrapper not found");
    }
    else
    {       
        // Adjust scale width
        rect = document.getElementById('scale').getClientRects()(0);
        
        var l_scalewrapper = document.getElementById('scalewrapper');
        
        if (l_scalewrapper)
        {
            l_scalewrapper.width = rect.right - rect.left;
        }

        // Make wrapper table width fixed
        e = document.getElementById('graph');
        rect = e.getClientRects()(0);
        document.getElementById('wrapper').width = e.width = rect.right - rect.left;

        var l_graph = new jsGraphics("graph_canvas");
        
        l_graph.setColor(p_graph.m_linecolour);
        l_graph.setStroke(p_graph.m_line_width);

        // Plot Lines
        if (isIE && p_graph.m_showline)
        {
            // Make wrapper table position fixed
            e = document.getElementById('wrapper');
            rect = e.getClientRects()(0);
            //e.style.position = 'absolute';
            e.style.top = rect.top;
            e.style.left = rect.left;

            e = document.getElementsByName('bar');
            
            for (i=1; i < e.length; i++)
            {
                var from = e[i-1].getClientRects()(0);
                
                var to = e[i].getClientRects()(0);
                                
               l_graph.drawLine(
                               from.left - 4 + (from.right - from.left) / 2, from.top,
                               to.left - 4 + (to.right - to.left) / 2  , to.top               
                   ); // co-ordinates related to "myCanvas"
                                
            
            }
        }
        
        l_graph.paint();
        
        
    }

    
    // And finally output this 
    //p_graph.flush();
}


/*!
    @fn         function MetaWrap_Widget_Graph_DrawH(p_graph)
    @param      p_graph The MetaWrap.Widget.Graph object we are drawing
    @return     void 
    @brief      Draw the graph vertically
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Widget_Graph_DrawV(p_graph)
{
    var i, e, v, g, step, rect;
    var yMin, yMax, yStep, ratio;

    // find the biggest value
    yMax = -1;
    
    for (i=0; i < p_graph.m_values.length; i++)
    {
        if (p_graph.m_values[i][0] > yMax)
        {   
            yMax = p_graph.m_values[i][0];
        }
    }

    // find the smallest value
    if (!p_graph.m_adjustmin)
    {
        yMin = 0;
    }
    else
    {
        yMin = yMax;
        for (i=0; i < p_graph.m_values.length; i++)
        {
            if (p_graph.m_values[i][0] < yMin)
            {   
                yMin = p_graph.m_values[i][0];
            }
        }
    }

    // Calculate scale values
    var n = Math.pow(10,Math.floor(Math.log(yMax) / Math.LN10));
    var np = n / 10;
    var nn = n * 10;

    if (n > 1)
    {
        if ((yMax % n) == 0)
        {
            yMax += n;
        }

        yMin = Math.floor(yMin / n) * n;
        yMax = Math.ceil(yMax / n) * n;
    }
    else
    {
        if ((yMax % n) == 0)
        {
            yMax += n;
        }
    }

    ratio = 300 / (yMax - yMin); // 300 = y axis length in pixels

    yStep = (yMax - yMin) / 8;
    
    if (yStep <= np) 
    {           
        yStep = np;
    }
    else 
    if (yStep <= (2 * np)) 
    {
        yStep = 2 * np;
    }
    else 
    if (yStep <= (5 * np)) 
    {
        yStep = 5 * np;
    }
    else
    {
        yStep = n;
    }

    step = Math.round(yStep*ratio);  // scale step in pixels

    // Title
    p_graph.write('<table align=center border=0 cellspacing=0 cellpadding=0 id=wrapper class=graph>');
    p_graph.write('<tr><td colspan=2 align=center><h2>' + p_graph.m_title + '</h2></td></tr>');

    // X Caption
    p_graph.write('<tr>');
    p_graph.write('<td valign=middle nowrap align=center width=' + p_graph.m_xwidth + '>');
    p_graph.write('<SPAN class=ycaption><br>' + p_graph.m_xcaption + '</SPAN>');
    p_graph.write('</td>');
    p_graph.write('<td>');
    p_graph.write('<table border=0 cellspacing=0 cellpadding=0 id=graph style="position:relative">');

    // Plot Bars
    for (var x = 0; x < p_graph.m_values.length; x++)
    {
        v = p_graph.m_values[x][0];

        p_graph.write('<tr><td valign=middle align=right height=' + p_graph.m_xwidth + ' class=xvalue_v>' + p_graph.m_values[x][1] + '</td>');
        p_graph.write('<td height=' + p_graph.m_xwidth + ' class=gridleft><img src=dot.gif border=0 width=5></td>');
        p_graph.write('<td  width=' + Math.ceil(yMax*ratio) + ' height=' + p_graph.m_xwidth + ' valign=middle align=left style="position:relative">');

        if (isIE)
        {
            p_graph.write('<table cellspacing=0 cellpadding=0 border=0 class=gridtable><tr>');
            
            g = (x==0) ? 'gridright' : 'grid';
            
            for (i=yMin; i < yMax; i+=yStep) 
            {
                p_graph.write('<td><img src=dot.gif border=0 height=' + p_graph.m_xwidth + ' width=' + step + ' class=' + g + '></td>');
            }
                                
            p_graph.write('</tr></table>');
        }

        p_graph.write('<table cellpadding=0 cellspacing=0 border=0 class=datatable>');
        p_graph.write('<tr><td id=bar' + ((p_graph.m_showbar) ? ' class=bar' : '') + '><img src=dot.gif border=0 height=' + (p_graph.m_xwidth/2) + ' width=' + Math.ceil(v*ratio) + '>');
        p_graph.write('<td class=xyvalue>&nbsp;' + v + '</td></tr>');
        p_graph.write('</table>');
        p_graph.write('</td></tr>');
    }

    // Scale
    p_graph.write('<tr><td valign=middle align=right height=5 class=xvalue_v></td>');
    p_graph.write('<td height=5 class=gridleft><img src=dot.gif border=0 width=5></td>');
    p_graph.write('<td height=5 valign=top align=left style="position:relative">');

    p_graph.write('<table cellspacing=0 cellpadding=0 border=0 class=gridtable><tr>');
    
    for (i=yMin; i < yMax; i+=yStep) 
    {
        p_graph.write('<td align=left class=gridbottom><img src=dot.gif border=0 height=5 width=' + step + ' ></td>');
    }
    
    p_graph.write('</tr></table>');
    
    p_graph.write('</td></tr>');

    p_graph.write('<tr><td></td><td></td>');
    p_graph.write('<td valign=top align=left style="position:relative">');
    p_graph.write('<table cellspacing=0 cellpadding=0 border=0 class=gridtable><tr>');
    
    for (i=yMin; i <= yMax; i+=yStep) 
    {
        p_graph.write('<td align=left valign=top class=yvalue_v>' + i + '<br><img src=dot.gif border=0 height=1 width=' + step + ' ></td>');
    }
    
    p_graph.write('</tr></table></td></tr>');

    // Y Caption
    p_graph.write('<tr><td></td><td></td><td valign=top align=center class=xcaption>' + (isIE ? '<br>' : '') + p_graph.m_ycaption + '</td></tr>');

    p_graph.write('</table></td></tr>'); // id=graph
    p_graph.write('</table>'); // id=wrapper

    // Push this out into the document - we are going to need to access it
    // in the next stage where we will get its location and overlay points and lines.    
    p_graph.flush();

    // get the wrapper object
    var l_wrapper = document.getElementById('wrapper');

    if (!l_wrapper)
    {
        alert("wrapper not found");
    }
    else
    {
        // Stablish parenthood
        //p_graph.m_destination.appendChild(l_wrapper);

        // Plot Lines
        if (p_graph.m_showline)
        {
            // Make wrapper table position fixed
            e = document.getElementById('wrapper');
            rect = e.getClientRects()(0);
            e.style.position = 'absolute';
            e.style.top = rect.top;
            e.style.left = rect.left;

            e = document.getElementsByName('bar');
            for (i = 1; i < e.length; i++)
            {
                var from = e[i-1].getClientRects()(0);
                
                var to = e[i].getClientRects()(0);
                
                //DrawLine(p_graph,p_graph.m_line_width, p_graph.m_linecolour, p_graph.m_marksize, p_graph.m_markcolor,
                //      from.right - 4, from.top - 4 + (from.bottom - from.top) / 2,
                //      to.right   - 4, to.top - 4 + (to.bottom - to.top) / 2);
            }
        }
        
        // And finally output this
        p_graph.flush();
    }
}



/*!
    @fn         function DrawLine(p_graph,size,color,marksize,markcolor,x1,y1,x2,y2)
    @param      p_graph
    @param      size
    @param      color
    @param      marksize
    @param      markcolor
    @param      x1
    @param      y1
    @param      x2
    @param      y2
    @return     void 
    @brief      Draw a line
    @author     James Mc Parlane
    @date       3 August 2005
*/
function DrawLine(p_graph,size,color,marksize,markcolor,x1,y1,x2,y2)
{
    var d = p_graph.m_destination;

    var w = Math.abs(x2 - x1);
    var h = Math.abs(y2 - y1);
    var x, y, xInc, yInc;

    if (w > h)
    {
        xInc = (x1 < x2) ? 1 : -1;
        yInc = (y1 < y2) ? (h / w) : -(h / w);
    }
    else
    {
        yInc = (y1 < y2) ? 1 : -1;
        xInc = (x1 < x2) ? (w / h) : -(w / h);
    }

    x = x1;
    y = y1;
    while ((xInc > 0 && x <= x2) || (xInc < 0 && x >= x2) || (yInc > 0 && y <= y2) || (yInc < 0 && y >= y2))
    {
        p_graph.write('<SPAN STYLE=\"position: absolute;');
        p_graph.write('left: ' + Math.round(x) + 'px; top: ' + Math.round(y) + 'px;');
        p_graph.write('width: ' + size + 'px; height: ' + size + 'px;');
        p_graph.write(' clip: rect(0 ' + size + ' ' + size + ' 0); background-color: ' + color + ';\"></SPAN>');
        x += xInc;
        y += yInc;
    }

    p_graph.write('<SPAN STYLE=\"position: absolute;');
    p_graph.write('left: ' + Math.round(x1) + 'px; top: ' + Math.round(y1) + 'px;');
    p_graph.write('width: ' + marksize + 'px; height: ' + marksize + 'px;');
    p_graph.write(' clip: rect(0 ' + marksize + ' ' + marksize + ' 0); background-color: ' + markcolor + ';\"></SPAN>');

    p_graph.write('<SPAN STYLE=\"position: absolute;');
    p_graph.write('left: ' + Math.round(x2) + 'px; top: ' + Math.round(y2) + 'px;');
    p_graph.write('width: ' + marksize + 'px; height: ' + marksize + 'px;');
    p_graph.write(' clip: rect(0 ' + marksize + ' ' + marksize + ' 0); background-color: ' + markcolor + ';\"></SPAN>');
}

//@}