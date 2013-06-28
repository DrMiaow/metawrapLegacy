

/*!
    @fn         function error(p_msg)
    @param      p_msg The message string
    @return     void 
    @brief      Simple global error handler
    @author     James Mc Parlane
    @date       3 August 2005
*/
function error(p_msg)
{
    alert(p_msg);
}

/*!
    @fn         function debug(p_msg)
    @param      p_msg The message string
    @return     void 
    @brief      Simple global debug handler
    @author     James Mc Parlane
    @date       3 August 2005
*/
function debug(p_msg)
{
    alert(p_msg);
}

/*!
    @fn         function trace(p_msg)
    @param      p_msg The message string
    @return     void 
    @brief      Simple global trace handler
    @author     James Mc Parlane
    @date       3 August 2005
*/
function trace(p_msg)
{
    window.status = p_msg;
}

/*!
    @fn         function ASSERT(p_cond,p_msg)
    @param      p_cond The condition that must be true
    @param      p_msg The message string to display if p_cond is false
    @return     void 
    @brief      Simple assertion handler. If p_cond is false then display p_msg
    @author     James Mc Parlane
    @date       3 August 2005
*/
function ASSERT(p_cond,p_msg)
{
    if (!p_cond)
    {
        alert(p_msg);
    }
}

/// Test parameters
var g_title = "";
var g_xcaption = "";
var g_ycaption = "";
var g_test_name = "";
var g_test_domain = "";
var g_test_domain_units = "";
var js = 1;
var j = js;
var t = 1000;
var divs = 15;
var inc = Math.floor(t/divs);
var tt = 1000;
var g_nsavg = 1;
var g_rfns = 1;
var l_count = 0;
var g_timer = null;
var g_whitespace = " ";
var g_comment_size = 64;
var g_use_namespaces = false;
var g_use_rootfunctions = false;
var g_use_functionlength = false;
var g_use_function = true;
var g_use_whitespace = false;
var g_use_comment = false;
var g_sample_code = "";
var g_measure_parse_time = false;
var g_start_parse_time = null;
var g_end_parse_time = null;
var g_testcode = "";
var g_testcodesetup = "";


/*!
    @fn         function functionbody()
    @return     string The function body
    @brief      Generates the test function body
    @author     James Mc Parlane
    @date       3 August 2005
*/
function functionbody()
{
    return "{\r\n\
    x = 1;\r\n\
    y = 2;\r\n\
}\r\n";
}

/*!
    @fn         function anamespace(p_depth)
    @param      p_depth The depth of the namespace
    @return     string A namespace reference eg. F.F.F.F
    @brief      Generates a namespace reference of depth p_depth
    @author     James Mc Parlane
    @date       3 August 2005
*/
function anamespace(p_depth)
{    
    if (!p_depth) 
    {
        return "";
    }

    var l_name = "";
    var n;
    for(n = 1;n<p_depth;n++)
    {
        l_name += namespacename(g_nsavg);
        l_name += ".";
    }
    
    l_name += namespacename(g_nsavg);

    return l_name;
}



/*!
    @fn         function namespace_path(i)
    @param      p_depth The depth of the namespace
    @return     string A namespace path reference from the root eg. R.F.F.F.F
    @brief      Generates a namespace reference of depth p_depth from the root.
    @author     James Mc Parlane
    @date       3 August 2005
*/
function namespace_path(p_depth)
{
    // no namespaces means no path
    if (!g_use_namespaces) return "";
    if (p_depth > 0)
        return "R." + anamespace(p_depth);
    else
        return "R";
}


/*!
    @fn         function namespace_dec(p_depth)
    @param      p_depth The depth of the namespace
    @return     string A namespace reference eg. F.F.F.F
    @brief      Generates a namespace declaration of depth p_depth
    @author     James Mc Parlane
    @date       3 August 2005
*/
function namespace_dec(p_depth)
{
    return namespace_path(p_depth) + " = new Object();\r\n";
}


/*!
    @fn         function namespaces(p_depth)
    @param      p_depth The maxium depth of the namespace
    @return     string Generates a set of namespane declarations from depth 1 to depth p_depth
    @brief      Generates a namespace declaration of depth p_depth
    @author     James Mc Parlane
    @date       3 August 2005
*/
function namespaces(p_depth)
{
    // no namspaces? the return nothing
    if (!g_use_namespaces) 
    {
        return "";
    }
    
    // The root level
    var l_name = "var R = new Object();\r\n";
    
    // Generate all the namespace declarations from 1 to p_depth
    var n;
    for(n = 1;n<p_depth;n++)
    {
        l_name += namespace_dec(n);
    }

    // return the result
    return l_name;
}

/*!
    @fn         function whitespace(p_size)
    @param      p_size The size of the whitespace to generate
    @return     string A block of whitespace
    @brief      Generates a block of whitespace p_size*g_whitespace
    @author     James Mc Parlane
    @date       3 August 2005
*/
function whitespace(p_size)
{
    // no whitespace required? then return an empty string
    if (!g_use_whitespace) 
    {
        return "";
    }
   
    // Make a string of p_size copies of g_whitespace
    var l_name = "";    
    var n;    
    for(n = 0;n<p_size;n++)
    {
        l_name += g_whitespace;
    }

    return l_name;
}

/*!
    @fn         function singlecomment(p_size)
    @param      p_size The size of the comment
    @return     string A comment
    @brief      Generates a namespace declaration of depth p_depth
    @author     James Mc Parlane
    @date       3 August 2005
*/
function singlecomment(p_size)
{
    var l_name = "    /*";
    var n;
    
    for(n = 0;n<p_size;n++)
    {
        l_name += "X";
    }
    
    l_name += "*/\r\n";

    return l_name;
}

/*!
    @fn         function comment(p_count)
    @param      p_count The number of comments to generate
    @return     string A comment
    @brief      Generates a block of p_count comments of g_comment_size sized comments
    @author     James Mc Parlane
    @date       3 August 2005
*/
function comment(p_count)
{
    // no whitespace required? then return an empty string
    if (!g_use_comment) 
    {
        return "";
    }

    var l_name = "";
    var n;
    for(n = 0;n<p_count;n++)
    {
        l_name += singlecomment(g_comment_size);
    }
    return l_name;
}

/*!
    @fn         function functiondeclaration()  
    @return     string A function declaration
    @brief      Generates a function declaration depending on the style of the function
    @author     James Mc Parlane
    @date       3 August 2005
*/
function functiondeclaration()  
{
    if (g_use_namespaces)
    {   
        return "FUNCTIONNAMESPACE.TESTNAME = function()";
    }   
    else
    {
        return "function FUNCTIONNAMESPACETESTNAME()";  
    }
}

/*!
    @fn         function functioncall()  
    @return     string A function cal
    @brief      Generates a function declaration depending on the style of the function
    @author     James Mc Parlane
    @date       3 August 2005
*/
function functioncall()  
{
    if (g_use_namespaces)
    {   
        return "FUNCTIONNAMESPACE.TESTNAME()";
    }   
    else
    {
        return "TESTNAME()";  
    }
}

/*!
    @fn         function rootfunctions(p_count)
    @param      p_count The number of root functions to generate
    @return     string A function declaration
    @brief      Generates a set of p_count functions
    @author     James Mc Parlane
    @date       3 August 2005
*/
function rootfunctions(p_count)
{
    // no root functions - then just return an empty string
    if (!g_use_rootfunctions)
    { 
        return "";
    }
    
    var l_name = "";
    
    var n;
    
    for(n = 0;n<i;n++)
    {
        l_name += "function " + functionname(g_rfns) + n + "(x)\r\n{\r\n return x + 1;\r\n}\r\n";
    }

    return l_name;
}

/*!
    @fn         function functionname(p_size)
    @param      p_size The size of the function name
    @return     string A function declaration
    @brief      Generates a functionname with p_size characters in the name
    @author     James Mc Parlane
    @date       3 August 2005
*/
function functionname(p_size)
{
    var l_name = "F";
    
    // If we are not using function name then just return thr shortest we can
    if (!g_use_functionlength) return l_name;
    
    var n;
    for(n = 1;n<p_size;n++)
    {
        l_name += "F";
    }
    return l_name;
}

/*!
    @fn         function namespacename(p_size)
    @param      p_size The size of the namespace
    @return     string A function declaration
    @brief      Generates a namespace name with p_size characters in the name
    @author     James Mc Parlane
    @date       3 August 2005
*/
function namespacename(p_size)
{
    var l_name = "N";
    
    
    var n;
    for(n = 1;n<p_size;n++)
    {
        l_name += "N";
    }
    
    return l_name;
}


/*!
    @fn         function parsetimer()
    @return     string Code that measures and logs the parse_time
    @brief      Generates code that measures and logs the parse_time
    @author     James Mc Parlane
    @date       3 August 2005
*/
function parsetimer_prefix()
{
    // no load time code - return nothing
    if (!g_measure_parse_time) return "";
    
    return "\r\n\
if (false) {\r\n";
}

/*!
    @fn         function parsetimer()
    @return     string Code that measures and logs the parse_time
    @brief      Generates code that measures and logs the parse_time
    @author     James Mc Parlane
    @date       3 August 2005
*/
function parsetimer_suffix()
{
    // no load time code - return nothing
    if (!g_measure_parse_time) return "";  
    return "\r\n}\r\n\
g_end_parse_time = (new Date()).getTime();\r\n\
var l_load_duration = (g_end_parse_time - g_start_parse_time);\r\n\
l_results[KEY] = new Object();\r\n\
l_results[KEY].m_total = l_load_duration;\r\n\
l_results[KEY].m_one = 0;\r\n\
l_results[KEY].m_frequency = 0;\r\n\
";
    
}


// the code we will run for each test
var l_test_code = new String('{\r\n\
PARSETIMERPREFIX\
ROOTFUNCTIONS\
NAMESPACES\
FUNCTIONDECLARATION\r\n\
FUNCTIONBODY\
var l_start_time = (new Date()).getTime();\r\n\
var l_test = 0;\r\n\
var i = 0;\r\n\
var k = KEY;\r\n\
TESTCODESETUP\r\n\
for(i = 0;i < ITERATIONS;i++)\r\n\
{\r\n\
COMMENT\
    TESTCODEFUNCTIONCALL;WHITESPACE\r\n\
}\r\n\
var l_end_time = (new Date()).getTime();\r\n\
var l_duration = (l_end_time - l_start_time);\r\n\
l_results[KEY] = new Object();\r\n\
l_results[KEY].m_total = l_duration;\r\n\
l_results[KEY].m_one = l_duration/ITERATIONS;\r\n\
l_results[KEY].m_frequency = Math.floor(1/(l_duration/ITERATIONS));\r\n\
}\
PARSETIMERSUFFIX\
');

// Our final results
var l_results = new Array();

var l_regexp_functionname = new RegExp("TESTNAME","g");
var l_regexp_itterations = new RegExp("ITERATIONS","g");
var l_regexp_key = new RegExp("KEY","g");
var l_regexp_rootfunctions = new RegExp("ROOTFUNCTIONS","g");
var l_regexp_namespaces = new RegExp("NAMESPACES","g");
var l_regexp_whitespace = new RegExp("WHITESPACE","g");
var l_regexp_functionnamespace = new RegExp("FUNCTIONNAMESPACE","g");
var l_regexp_functiondeclaration = new RegExp("FUNCTIONDECLARATION","g");
var l_regexp_functionbody = new RegExp("FUNCTIONBODY","g");
var l_regexp_comment = new RegExp("COMMENT","g");
var l_regexp_functioncall = new RegExp("FUNCTIONCALL","g");
var l_regexp_testcodesetup = new RegExp("TESTCODESETUP","g");
var l_regexp_testcode = new RegExp("TESTCODE","g");
var l_regexp_parsetimer_prefix = new RegExp("PARSETIMERPREFIX","g");
var l_regexp_parsetimer_suffix = new RegExp("PARSETIMERSUFFIX","g");


var l_total = new Object();
l_total.m_total = 0;
l_total.m_one = 0;
l_total.m_frequency = 0;


/*!
    @fn         function TestOnLoad()
    @return     void
    @brief      Called at the start of the test
    @author     James Mc Parlane
    @date       3 August 2005
*/
function TestOnLoad()
{
    var l_aims = new MetaWrap.Page.Output(document.getElementById('aims'));

    l_aims.write("<h1>Aims</h1>");

    l_aims.write("<p>" + g_test_name + "</p>");
    l_aims.flush();

    var l_method = new MetaWrap.Page.Output(document.getElementById('method'));

    l_method.write("<h1>Method</h1>");
    
    if (!g_measure_parse_time)
    {
        l_method.write("<p>In this test " + tt +" iterations of the main function are performed.</p>");
    }
    else
    {
            l_method.write("<p>In this test the test code is parsed " + tt +" times for each measurement.</p>");
    }
    //l_method.write("The " + g_test_domain + " varies from " + j +" to " + t + " in increments of " + inc + " " + g_test_domain_units + ".</p>");

    // if we are testing with function length    
    if (g_use_functionlength)
    {
        l_method.write("<p>");
        l_method.write("The length of the function name varies from " + js +" to " + t + " in increments of " + inc + " characters.</p>");
        l_method.write("</p>");
    }


    // if we are testing with namespaces    
    if (g_use_namespaces)
    {
        l_method.write("<p>");
        l_method.write("The depth of the namespace varies from " + js +" to " + t + " in increments of " + inc + ". Each namespace is " + g_nsavg + " characters long</p>");
        l_method.write("</p>");
    }

    // if we are testing with root functions    
    if (g_use_rootfunctions)
    {
        l_method.write("<p>");
        l_method.write("g_use_rootfunctions");
        l_method.write("</p>");
    }

    // if we are testing with variable whitespace
    if (g_use_whitespace)
    {
        l_method.write("<p>");
        l_method.write("The number of whitespace characters varies from " + js +" to " + t + " in increments of " + inc + ".</p>");;
        l_method.write("</p>");
    }

    // if we are testing with comments
    if (g_use_comment)
    {
        l_method.write("<p>");
        l_method.write("The number of comments varies from " + j +" to " + t + " in increments of " + inc + ". Each of the comments is " + g_comment_size + " characters long</p>");
        l_method.write("</p>");
    }
    
    l_method.flush();

    g_timer = setTimeout("RunTest()",10);
}

function RunTest()
{
    clearTimeout(g_timer);
    g_timer = null;

    if (j < t)
    {
        var l_rawdata = new MetaWrap.Page.Output(document.getElementById('rawdata'));    
        l_rawdata.clear();
        l_rawdata.write("<h1>Raw Data</h1>");
        l_rawdata.write(Math.floor(100*(j/(t-js)))+"%");
        l_rawdata.flush();

        var l_new_test = l_test_code;       
       
       
        
        l_new_test = l_new_test.replace(l_regexp_functiondeclaration,functiondeclaration());
        l_new_test = l_new_test.replace(l_regexp_parsetimer_prefix,parsetimer_prefix());        
        l_new_test = l_new_test.replace(l_regexp_parsetimer_suffix,parsetimer_suffix());        
        l_new_test = l_new_test.replace(l_regexp_itterations,tt);       
        l_new_test = l_new_test.replace(l_regexp_key,j)
        l_new_test = l_new_test.replace(l_regexp_functioncall,functioncall())        
        l_new_test = l_new_test.replace(l_regexp_rootfunctions,rootfunctions(j));
        l_new_test = l_new_test.replace(l_regexp_namespaces,namespaces(j));
        l_new_test = l_new_test.replace(l_regexp_whitespace,whitespace(j));
        l_new_test = l_new_test.replace(l_regexp_functionnamespace,namespace_path(j-1));
        l_new_test = l_new_test.replace(l_regexp_functionname,functionname(j));
        l_new_test = l_new_test.replace(l_regexp_testcodesetup,g_testcodesetup);       
        l_new_test = l_new_test.replace(l_regexp_testcode,g_testcode);       
        l_new_test = l_new_test.replace(l_regexp_functionbody,functionbody());      
        l_new_test = l_new_test.replace(l_regexp_comment,comment(j));        
        

        if ((g_sample_code == "") && (j != js))
        {
            g_sample_code = "/* sample taken at j = " + j + " */\r\n" + l_new_test;
        }
        
        g_start_parse_time = (new Date()).getTime();

        if (!g_measure_parse_time)
        {
            // Now execute it
            eval(l_new_test);
        }
        else
        {
            var l_e = 0;
            // Now execute it lots
            for(l_e = 0;l_e<tt;l_e++)
            {
                eval(l_new_test);
            }
        }
            

        l_total.m_total += l_results[j].m_total;
        l_total.m_one += l_results[j].m_one;
        l_total.m_frequency += l_results[j].m_frequency;

        l_count++;

        j += inc;

        g_timer = setTimeout("RunTest()",10);
    }
    else
    {
        GenerateReport();
    }
}



function GenerateReport()
{
    var l_return = "";

    // Create a new graph object
    var l_graph = new MetaWrap.Widget.Graph(0);

    // Create a new outputter
    l_graph.m_destination = new MetaWrap.Page.Output(document.getElementById('mygraph'));


    var l_rawdata = new MetaWrap.Page.Output(document.getElementById('rawdata'));

    

    l_rawdata.write("<h1>Raw Data</h1>");
    l_rawdata.write("<center>");
    l_rawdata.write("<h3>" + g_test_name + "</h3>");
    l_rawdata.write("<table border=1>");
    l_rawdata.write("<tr>");
    l_rawdata.write("<td>Test</td>");
    l_rawdata.write("<td>Duration</td>");
    if (!g_measure_parse_time)
    {
        l_rawdata.write("<td>Per Call</td>");
        l_rawdata.write("<td>Frequency</td>");
    }
    l_rawdata.write("<tr>");
  

    var l_max_one_width = 0;

    for(var l_result in l_results)
    {
        l_rawdata.write("<tr>");
        l_rawdata.write("<td>" + l_result  +  "</td>");
        l_rawdata.write("<td>" + l_results[l_result].m_total  +  "</td>");
        if (!g_measure_parse_time)
        {
            l_rawdata.write("<td>" + l_results[l_result].m_one  +  "</td>");        
            l_rawdata.write("<td>" + l_results[l_result].m_frequency + "</td>");
        }
        l_rawdata.write("</tr>");

        if (!g_measure_parse_time)
        {
            l_graph.m_values.push([l_results[l_result].m_frequency,l_result]);
        }
        else        
        {
           l_graph.m_values.push([l_results[l_result].m_total,l_result]);
        }
        
        var l_one_width = String(l_results[l_result].m_one).length;
        if (l_one_width > l_max_one_width)
        {
            l_max_one_width = l_one_width;
        }

    }
    l_rawdata.write("<tr bgcolor=orange >");
    l_rawdata.write("<td>Average</td>");
    l_rawdata.write("<td>" + Math.floor(l_total.m_total/l_count) + "</td>");
    if (!g_measure_parse_time)    
    {
        l_rawdata.write("<td>" + String(l_total.m_one/l_count).substring(0,l_max_one_width) + "</td>");
        l_rawdata.write("<td>" + l_total.m_frequency/l_count + "</td>");
    }
    l_rawdata.write("<tr>");
    l_rawdata.write("</table>");
    l_rawdata.write("</center>");

    l_rawdata.clear();
    l_rawdata.flush();
    
    var l_samplecode = new MetaWrap.Page.Output(document.getElementById('samplecode'));    
    l_samplecode.write("<h1>Sample Code</h1>");
    l_samplecode.write("<pre>");
    l_samplecode.write(g_sample_code);
    l_samplecode.write("</pre>");
    l_samplecode.clear();
    l_samplecode.flush();
    


    l_graph.m_line_width = 2;
    
    
    l_graph.m_title = g_title;
    l_graph.m_xcaption = g_xcaption;
    l_graph.m_ycaption = g_ycaption;


    //l_graph.m_orientation = 'vertical';
    l_graph.m_orientation = 'horizontal';

    l_graph.m_showline = true;
    l_graph.m_showbar = true;

    l_graph.draw();

}