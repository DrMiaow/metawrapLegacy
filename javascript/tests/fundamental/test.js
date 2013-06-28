var g_test_id = 1;

function passFail(p_name,p_test,p_cond,p_display)
{
    document.write('<div class="wrap">')
    document.write("<h3 id='test" + g_test_id + "' >#" + g_test_id + " " + p_name + "</h3>");
    document.write('<a name="' + g_test_id + '"/>');
    
    var l_test = p_test;
    l_test = l_test.replace("&","&amp;");
    l_test = l_test.replace("<","&lt;");
    l_test = l_test.replace(">","&gt;");
    
    document.write("<h5>Test Code</h5>");

    document.write("<pre>" + l_test + "</pre>");

    eval(p_test);
    
    document.write("<h5>Pass Fail Condition</h5>");
    document.write("<pre>" + p_cond + "</pre>");

    document.write("<p>");
        
    try
    {    
        document.write("<h5>Result</h5>");
        if (eval(p_cond))
        {
            document.write("<pre>PASS</pre>");
        }
        else
        {
            document.write("<pre>FAIL</pre>");
            document.write("<style>#test" + g_test_id + "{ color:red;}</style>");
            
        }
    }
    catch(l_e)    
    {
        document.write(" FAIL (ERROR) " + l_e.msg);    
    }
    document.write("</p>");
    
    if (p_display != null)
    {
      document.write("<h5>Value Of '" + p_display + "' At End Of test </h5>");
      document.write("<pre>" + eval(p_display) + "</pre>");
    }    
    document.write("</div>");
    
    g_test_id++;
    
}