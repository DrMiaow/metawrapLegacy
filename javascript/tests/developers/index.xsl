<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mw="http://xsd.metawrap.com/metawrap/metawrap.xsd" version="1.0">
	<xsl:import href="index_import.xsl"/>
	<xsl:key name="groups" match="/mw:metawrap/mw:actions/mw:action[@enabled='true']" use="@group"/>	
	<xsl:key name="objects" match="/mw:metawrap/mw:actions/mw:action[@enabled='true']" use="@object"/>	
	<xsl:key name="services" match="/mw:metawrap/mw:actions/mw:action[@enabled='true']" use="@service|../@service"/>	
	<xsl:key name="versions" match="/mw:metawrap/mw:actions/mw:action[@enabled='true']" use="@version|../@version"/>
	<xsl:key name="names" match="/mw:metawrap/mw:actions/mw:action[@enabled='true']" use="@name"/>

	<xsl:variable name="allow_get" select="'true'"/>
	<xsl:variable name="allow_upload" select="'true'"/>
	<xsl:variable name="allow_post" select="'true'"/>
	<xsl:variable name="allow_batch" select="'true'"/>

	<xsl:template match="/">



		<html lang="en">
			<head>
				<meta name="generator" content="HTML Tidy for HTML5 (experimental) for Windows https://github.com/w3c/tidy-html5/tree/c63cc39"/>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
				<meta charset="utf-8"/>
				<title>ThumbWhere API</title>
				<meta name="author" content="James McParlane"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>    
				<!--[if lt IE 9]>
				  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
				<![endif]-->
				<!-- Le styles -->
				<link href="./assets/themes/twitter/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
				<link href="./assets/themes/twitter/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet"/>
				<link href="./assets/themes/twitter/bootstrap/css/bootstrap-custom.css" rel="stylesheet"/>
				<link href="./assets/style.css" rel="stylesheet" type="text/css" media="all"/>
				<link href="./assets/pygments.css" rel="stylesheet" type="text/css"/>			


				<script language="JavaScript" type="text/javascript" src="../base/mw_lib.js"/>
				<script language="JavaScript" type="text/javascript" src="../network/mw_lib_network.js"/>    
				<script language="JavaScript" type="text/javascript" src="../xml/mw_lib_xml.js"/>
				<script language="JavaScript" type="text/javascript" src="../xml/mw_lib_xml_serialise.js"/>
				<script language="JavaScript" type="text/javascript" src="../xml/mw_lib_xml_action.js"/>
				<script language="JavaScript" type="text/javascript" src="../logger/mw_lib_logger.js"/>

				<script>
						MetaWrap.XML.Action.WS = {};
						var l_api_server = "";
				</script>

			</head>
			<body>

				<div class="page">
					<header class="site-header">
						<nav class="api-thumbwhere-header">
							<a href="http://www.thumbwhere.com/" class="thumbwhere-logo" target="_blank">
								<img src="./assets/thumbwhere-logo-100.png" alt="ThumbWhere"/>
							</a>
						</nav>
						<nav class="api-header api-stripes">
							<a href="http://www.thumbwhere.com/" class="header-logo" target="_blank">
								<img src="./assets/api-logo.png" alt="ThumbWhere Social Media Server"/>
							</a>
							<h1 class="api-page-title">
								<a class="brand" href="./">ThumbWhere API</a>
							</h1>
							<img class="api-color-line-header" src="./assets/api-color-line.png"/>
						</nav>
					</header>
					<div class="container content-container">
						<div class="row">
							<div class="span3 api-navigation well" data-role="api-navigation" style="position: static; top: 20px;">
								<ul class="nav nav-list">
									<li class="active">
										<a href="#introduction-anchor">Introduction</a>
									</li>
									<li>
										<a href="#overview-anchor">How ThumbWhere Works</a>
									</li>
									<li>
										<a href="#gettingstarted-anchor">Getting Started</a>
									</li>
									<li>
										<a href="#coreconcepts-anchor">Core Concepts</a>
									</li>
								</ul>

								<ul class="nav nav-list" data-role="api-nav">
									<li class="nav-header">API</li>



									<xsl:for-each select="/mw:metawrap/mw:actions[@public='true']/mw:action[(@enabled='true') and (generate-id() = generate-id(key('services',@service|../@service)[1]))]">
										<xsl:sort select="@service"/>
										<xsl:variable name="service" select="@service|../@service"/>


										<!-- Set the li below to active if it somsone clicks on the a below.-->
										<li class="active">			  
											<a href="#service-{$service}-anchor">
												<xsl:value-of select="position()" />. <xsl:value-of select="$service" /> API</a>

											<ul data-role="sub-nav" data-position="{position()}">

												<h5>Actions</h5>



												<xsl:for-each select="/mw:metawrap/mw:actions/mw:action[(@public='true') and (@enabled='true')]">
													<xsl:sort select="@name"/>

														<li>
															<a href="#service-{$service}-{@name}-anchor">
																<!--xsl:value-of select="mw:doc/mw:short" /-->
																<xsl:value-of select="@name" />
															</a>
														</li>

													
												</xsl:for-each>

												<h5>Resources</h5>				

												<xsl:for-each select="/mw:metawrap/mw:resources[@public='true']/mw:resource[(@enabled='true')]">
													<xsl:sort select="@object"/>
													<xsl:variable name="object" select="@object"/>

														<li>
															<a href="#service-{$service}-{@name}-anchor">
																<xsl:value-of select="doc/short" />
															</a>
														</li>
													
												</xsl:for-each>

											</ul>

										</li>


									</xsl:for-each>
								</ul>


								<ul>

									<li>
										<a href="#glossaryterms-anchor">Glossary terms</a>
									</li>
									<li>
										<a href="#messagestructure-anchor">Message structure and response</a>
									</li>
									<li>
										<a href="#errormessages-anchor">Error messages</a>
									</li>
									<li>
										<a href="#datatypes-anchor">Datatypes</a>
									</li>
								</ul>



								<ul class="nav nav-list">
									<li class="nav-header">Other resources</li>
									<li>
										<a href="https://github.com/ThumbWhere/ThumbWhere-JavaScript-WebServiceLibrary" target="_blank">JavaScript API</a>
									</li>			
									<li>
										<a href="https://github.com/ThumbWhere/ThumbWhere-dotNET-WebServiceLibrary" target="_blank">.NET API</a>
									</li>						
									<li>
										<a href="https://github.com/ThumbWhere/ThumbWhere-PHP5-WebServiceLibrary" target="_blank">PHP API</a>
									</li>
									<li>
										<a href="https://github.com/ThumbWhere/ThumbWhere-Drupal7-Module" target="_blank">Drupal Module</a>
									</li>			
									<li>
										<a href="https://getsatisfaction.com/thumbwhere" target="_blank">Forums</a>
									</li>
									<li>
										<a href="http://wiki.thumbwhere.com/" target="_blank">Wiki</a>
									</li>						
									<li>
										<a href="http://twitter.com/thumbwhere" target="_blank">Twitter</a>
									</li>			
									<li>
										<a href="http://blog.thumbwhere.com" target="_blank">Blog</a>
									</li>

								</ul>
							</div>

							<div class="span9 api-main-content" data-role="main-content">
								<!--Body content-->
								<a id="introduction-anchor"/>
								<h1>Introduction 
									<small>to ThumbWhere API</small>
								</h1>

								<h3 id="see_what_you_can_do">ThumbWhere</h3>
								<p>ThumbWhere is software as a services (<a href="http://en.wikipedia.org/wiki/Software_as_a_service" target="_blank">SaaS</a>) that provides a ready made set of handy back end services for authoring social media applications..</p> 
								<p>We host your workflow and data and do all the heavy lifting for your application, leaving you to concentrate on what you do best, making compelling applications..</p> 
								<br/>
								<p>ThumbWhere provides a comprehensive and advanced API for your applications to interact with the ThumbWhere Services, so that with minimal effort your application to interact in incredible ways with the rest of the internet.</p> 
								<br/>
								<p>
									<img src="./assets/ThumbWhere-Webservices-Conversation.png" alt="The ThumbWhere WebServices Spectrum"/>
								</p>
								<br/>
								<p>The API interface supports a continum of Workflow, Action and Resource based web services.</p>
								<p>
									<img src="./assets/thumbwhere-webservices-spectrum.png" alt="The ThumbWhere WebServices Spectrum"/>
								</p>

								<h3 id="getting_started">Getting Started</h3>
								<p>We've started off by publicly releasing only the core parts of our API along with some easy to follow examples for how to use them. This should be enough to get you up and running.</p>
								<ul>
									<li>Learn 
										<a href="#howapiworks-anchor">how ThumbWhere works</a>.</li>
									<li>Easy step by step guide to 
										<a href="#gettingstarted-anchor">get you started</a>.</li>
									<li>Core concepts of 
										<a href="#coreconcepts">the ThumbWhere API</a>.</li>
									<li>Questions? Ideas? Post them on our 
										<a href="http://feedback.thumbwhere.com" target="_blank">developer forum</a>.</li>
									<li>Want More? Try our
										<a href="http://wiki.thumbwhere.com/" target="_blank">Wiki</a>

										<a href="http://twitter.com/thumbwhere" target="_blank">Twitter account</a>
			or our
										<a href="http://blog.thumbwhere.com" target="_blank">Blog</a>.

									</li>

								</ul>
								<h3 id="free_to_publish">But First, Some Ground Rules</h3>
								<p>ThumbWhere thinks it should be YOU who profits from your work. What you create you own and are free to give away or
          sell. That also means that everything connected with use of your creation is your responsibility. ThumbWhere will not
          accept liability if your creation causes harm. It is also entirely up to you whether and on what terms to commercialize
          your creation.</p>
								<p>Just as "what is yours is yours", "what is ours is ours". The software, trademarks documentation, and any
          other materials we provide to help you develop apps, including especially the interface specifications "API"
          belong to ThumbWhere. It may happen that working on an app suggests an idea to you for an improvement in the API or our
          materials. If you suggest any improvements to us and we adopt them, they become part of the platform used by everyone,
          and belong to us.</p>
								<p>The interface between your apps and the ThumbWhere platform will evolve over time, but we will do our best to maintain
          backwards compatibility through versioned APIs.</p>          
								<p>There will be documentation covering more of our features soon. We're even working on an iOS and Android SDK for
          later this year to provide libraries which make linking api to your apps a breeze.</p>
								<p>Feel free to post on the 
									<a href="http://www.thumbwhere.com" target="_blank">developer forum</a> to share what you are doing with api,
          or to ask for information/support.</p>
							</div>


							<div class="span9 api-main-content" data-role="main-content">
								<!--Body content-->
								<a id="overview-anchor"/>
								<h1>How ThumbWhere works</h1>
								<h2 id="overview">Overview</h2>		  
								<p>ThumbWhere is a system of 4 components:</p>
								<ol>
									<li>
										<strong>Apps</strong> - These are programs that do things for people. Apps you develop could do anything from simply
            posting photos to Twitter, turning your lights on at night or all the way up to, well anything you can imagine. They are not limited to smartphone apps. 
			It's basically everything that makes use of the ThumbWhere system APIs.</li>
									<li>
										<strong>Workflow</strong> - These are small programs using our visual tool that you have entered into the ThumbWhere portal. These perform a series of instructions that you want ThumbWhere to perform in response to something that has happened to the world.</li>
									<li>
										<strong>Actions</strong> - These are commands that you can invoke via the web services. You can trigger inbuilt workflow or you can be workflow that you have defined.</li>
									<li>
										<strong>Resources</strong> - This is your data. It could be photos, it could be stiock market prices, it could be a list of users, mp3 files, videos, anthing. Through the web services you can create, read, update, delete and query this data.
									</li>
								</ol>          
								<p>All requests and responses and new values are sent and returned in XML with UTF8 encoding so it's easy to generate or parse.</p>
							</div>

							<div class="span9 api-main-content" data-role="main-content">
								<!--Body content-->
								<a id="gettingstarted-anchor"/>
								<h1>Getting started</h1>

								<p>First make sure you have an API Key. 
									<a href="http://www.thumbwhere.com/getstarted" target="_blank">here</a> or if you still need to buy a kit go 
									<a href="http://www.thumbwhere.com/buy" target="_blank">here</a>.</p>
								<p>The fastest way to learn how to build apps which control the api system is to use the simple test web app built into
          every bridge. This lets you directly input commands and send them to the lights. You can look at the source HTML and
          JavaScript code for some directions on how to do something different.</p>
								<h3 id="step_1">Step 1</h3>
								
								<p>Blah blah  blah..</p>
								
							</div>

							<div class="span9 api-main-content" data-role="main-content">
								<a id="coreconcepts-anchor"/>
								<!--Body content-->
								<h1>Core concepts</h1>

								<p>The api system is built around the idea of everything in your system having a unique URL served by the bridge.
          Interacting with these URLs lets you modify them or find out their current state as explained above.</p>
								<h4 id="api_web_addresses">Hue web addresses</h4>
								<p>A api resource web address will always start with the following.</p>
								<p>
									<code>http://&lt;bridge IP address&gt;/api</code>
								</p>
								
							</div>

							<div class="span9 api-main-content" data-role="main-content">		  
								<!--Body content-->
								

								
							<xsl:for-each select="/mw:metawrap/mw:actions[@public='true']/mw:action[(@enabled='true')]">
										<xsl:sort select="@service"/>
										<xsl:variable name="service" select="@service|../@service"/>										
										<xsl:variable name="service_position" select="position()"/>
										
										<h1 id="service-admin-anchor"><xsl:value-of select="position()" />.  <xsl:value-of select="$service" />  API</h1>

												<xsl:for-each select="/mw:metawrap/mw:actions[@public='true']/mw:action[(@public='true') and (@enabled='true')]">
													<xsl:sort select="@object"/>
													<xsl:variable name="object" select="@object"/>
													<xsl:variable name="action_position" select="position()"/>

																					
								<h2 id="service-{$service}-{@name}-anchor"><xsl:value-of select="$service_position" />.<xsl:value-of select="$action_position" />. <xsl:value-of select="@name" /> </h2>
								<table>
									<thead>
										<tr>
											<th>URL</th>
											<th>
												<code>/api/&lt;username&gt;/lights/&lt;id&gt;</code>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">Method</td>
											<td style="text-align: left;">
												<code>PUT</code>
											</td>
										</tr>
										<tr>
											<td style="text-align: left;">Version</td>
											<td style="text-align: left;">1.0</td>
										</tr>
										<tr>
											<td style="text-align: left;">Permission</td>
											<td style="text-align: left;">Whitelist</td>
										</tr>
									</tbody>
								</table>
								<h3 id="151_description">1.5.1. Description</h3>
								<p>Used to rename lights. A light can have its name changed when in any state, including when it is unreachable or
          off.</p>
								<h3 id="152_body_arguments">1.5.2. Body arguments</h3>
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>
												<strong>Type</strong>
											</th>
											<th>
												<strong>Description</strong>
											</th>
											<th>
												<strong>Required</strong>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">Name</td>
											<td style="text-align: left;">string 0, 32</td>
											<td style="text-align: left;">The new name for the light. If the name is already taken a space and number will be
                appended by the bridge e.g. "Bedroom Light 1".</td>
											<td style="text-align: left;">Required</td>
										</tr>
									</tbody>
								</table>
								<h3 id="153_body">1.5.3. Body</h3>
								<div class="highlight">
									<pre>
										<code class="json">
											<span class="p">[{</span>
											<span class="nt">"success"</span>
											<span class="p">:{</span>
											<span class="nt">"/lights/1/name"</span>
											<span class="p">:</span>
											<span class="s2">"Bedroom Light"</span>
											<span class="p">}}]</span>
										</code>
									</pre>
								</div>
								<h3 id="154_response">1.5.4. Response</h3>
								<p>A response to a successful 
									<code>PUT</code> request contains confirmation of the arguments passed in. Note: If the new value is too large to return
          in the response due to internal memory constraints then a value of "Updated." is returned.</p>
								<h3 id="155_response_example">1.5.5. Response example</h3>
								<div class="highlight">
									<pre>
										<code class="json">
											<span class="p">{</span>
											<span class="nt">"hue"</span>
											<span class="p">:</span>
											<span class="mi">50000</span>
											<span class="p">,</span>
											<span class="nt">"on"</span>
											<span class="p">:</span>
											<span class="kc">true</span>
											<span class="p">,</span>
											<span class="nt">"bri"</span>
											<span class="p">:</span>
											<span class="mi">200</span>
											<span class="p">}</span>
										</code>
									</pre>
								</div>
								
								
								</xsl:for-each>
								</xsl:for-each>
							</div>

							<div class="span9 api-main-content" data-role="main-content">

								<!--Body content-->
								<h1 id="glossary-anchor">Glossary terms</h1>

								<p>The following terms are used in the documentation and may not be immediately obvious to the user.</p>
								<table>
									<thead>
										<tr>
											<th>Term</th>
											<th>
												<strong>Description</strong>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">bridge</td>
											<td style="text-align: left;">The ThumbWhere base station that is wired to your network.</td>
										</tr>
										<tr>
											<td style="text-align: left;">ISO 8601:2004</td>
											<td style="text-align: left;">A date in the format YYYY-MM-DDThh:mm:ss</td>
										</tr>
										<tr>
											<td style="text-align: left;">breathe cycle</td>
											<td style="text-align: left;">The light or lights do one smooth transition from the current state to a higher
                brightness in the current color to a lower brightness in the current color and back to the original state.</td>
										</tr>
										<tr>
											<td style="text-align: left;">alert effect</td>
											<td style="text-align: left;">Alert effects are used to set the lamp to a time limited dynamic effect i.e. the
                lamps will change there lamps during a short time period and then return to their previous value. Example is the
                select breathe cycle.</td>
										</tr>
										<tr>
											<td style="text-align: left;">dynamic effect</td>
											<td style="text-align: left;">Dynamic effects are changes over time of the light state which continue until the
                user stops the effect. Example is the color loop.</td>
										</tr>
										<tr>
											<td style="text-align: left;">Link button</td>
											<td style="text-align: left;">The circular button on the top of the api bridge.
												<br/>
												<img src="./assets/smartbridge.jpg" alt="Bridge link button"/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="span9 api-main-content" data-role="main-content">

								<!--Body content-->
								<h1 id="messagestructure-anchor">Message structure and response</h1>		   
								<p>The CLIP API consists of a set of commands that can be called over a REST web service. The API commands fall into one
          of 4 categories, depending on the HTTP method used:</p>
								<h3 id="method_get">Method: GET</h3>
								<p>Used for: Reading specific data from the bridge.
									<br/>
									<strong>Returns</strong>: JSON containing the requested resource.</p>
								<h3 id="method_put">Method: PUT</h3>
								<p>Used for: Modifying existing data on the bridge.
									<br/>
									<strong>Returns</strong>: A list containing one item per parameter modified.
									<br/>
									<strong>Example</strong>: 
									<code>[{"success":{"/lights/1/state/api":254}}]</code>
								</p>
								<h3 id="method_post">Method: POST</h3>
								<p>Used for: Adding new data to the bridge.
									<br/>
									<strong>Returns</strong>: A list containing one item per resource created.
									<br/>
									<strong>Example</strong>: 
									<code>[{"success":{"id":"/schedules/7"}}]</code>
								</p>
								<h3 id="method_delete">Method: DELETE</h3>
								<p>Used for: Deleting data from the bridge
									<br/>
									<strong>Returns</strong>: A list containing one item per resource deleted.
									<br/>
									<strong>Example</strong>: 
									<code>[{"success":"/groups/1 deleted"}]</code>
								</p>
								<p>Commands using 
									<code>PUT</code> and 
									<code>POST</code> methods will normally require a message body to be attached to the request. The message body must be
          formatted using JavaScript Object Notation (JSON). More details and examples for formatting the message body can be found
          in the documentation for each command.</p>
							</div>

							<div id="errormessages-anchor" class="span9 api-main-content" data-role="main-content">		  
								<!--Body content-->
								<h1>Error messages</h1>		  
								<p>Where error messages are used in the API documentation, it is recommended that a link to the error messages page with
          a suitable anchor tag be provided.</p>
								<p>If an API call fails to execute an error message is returned. This will take the following form:</p>
								<div class="highlight">
									<pre>
										<code class="json">
											<span class="p">{</span>
											<span class="nt">"error"</span>
											<span class="p">:</span>
											<span class="p">{</span>
											<span class="nt">"type"</span>
											<span class="p">:</span>
											<span class="err">&lt;ID&gt;</span>
											<span class="p">,</span>
											<span class="nt">"address"</span>
											<span class="p">:</span>
											<span class="err">&lt;/resource/parameteraddress&gt;</span>
											<span class="p">,</span>
											<span class="nt">"description"</span>
											<span class="p">:</span>
											<span class="err">&lt;description&gt;</span>
											<span class="p">}</span>
											<span class="p">}</span>
										</code>
									</pre>
								</div>
								<p>One error message per failed action will be returned using a priority system. The priority system uses the error
          number, with a lower number meaning a higher priority. In the case of a 
									<code>PUT</code> command, an error may be given for each parameter on which a change was attempted.</p>
								<p>The following tables list all error codes that are used by the bridge.</p>
								<p>Key:</p>
								<table>
									<thead>
										<tr>
											<th>
												<code>&lt;resource&gt;</code>
											</th>
											<th>Resource being acted on e.g. /lights/1</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">
												<code>&lt;method_name&gt;</code>
											</td>
											<td style="text-align: left;">HTTP Method e.g. 
												<code>PUT/POST/DELETE/GET</code>
											</td>
										</tr>
										<tr>
											<td style="text-align: left;">
												<code>&lt;parameter&gt;</code>
											</td>
											<td style="text-align: left;">URI of the parameter being modified e.g. 
												<code>/lights/1/name</code>
											</td>
										</tr>
										<tr>
											<td style="text-align: left;">
												<code>&lt;value&gt;</code>
											</td>
											<td style="text-align: left;">Value the parameter is being set to e.g. 128</td>
										</tr>
									</tbody>
								</table>
								<h3 id="generic_errors">Generic Errors</h3>
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>
												<strong>Description</strong>
											</th>
											<th>
												<strong>Details</strong>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">1</td>
											<td style="text-align: left;">unauthorized user</td>
											<td style="text-align: left;">This will be returned if an invalid username is used in the request, or if the
                username does not have the rights to modify the resource.</td>
										</tr>
										<tr>
											<td style="text-align: left;">2</td>
											<td style="text-align: left;">body contains invalid JSON</td>
											<td style="text-align: left;">This will be returned if the body of the message contains invalid JSON.</td>
										</tr>
										<tr>
											<td style="text-align: left;">3</td>
											<td style="text-align: left;">resource, 
												<code>&lt;resource&gt;</code>, not available</td>
											<td style="text-align: left;">This will be returned if the addressed resource does not exist. E.g. the user
                specifies a light ID that does not exist.</td>
										</tr>
										<tr>
											<td style="text-align: left;">4</td>
											<td style="text-align: left;">method, 
												<code>&lt;method_name&gt;</code>, not available for resource, 
												<code>&lt;resource&gt;</code>
											</td>
											<td style="text-align: left;">This will be returned if the method (
												<code>GET/POST/PUT/DELETE</code>) used is not supported by the URL e.g. 
												<code>DELETE</code> is not supported on the 
												<code>/config</code> resource</td>
										</tr>
										<tr>
											<td style="text-align: left;">5</td>
											<td style="text-align: left;">missing parameters in body</td>
											<td style="text-align: left;">Will be returned if required parameters are not present in the message body. The
                presence of invalid parameters should not trigger this error as long as all required parameters are present.</td>
										</tr>
										<tr>
											<td style="text-align: left;">6</td>
											<td style="text-align: left;">parameter, 
												<code>&lt;parameter&gt;</code>, not available</td>
											<td style="text-align: left;">This will be returned if a parameter sent in the message body does not exist. This
                error is specific to 
												<code>PUT</code> commands; invalid parameters in other commands are simply ignored.</td>
										</tr>
										<tr>
											<td style="text-align: left;">7</td>
											<td style="text-align: left;">invalid value, 
												<code>&lt;value&gt;</code>, for parameter, 
												<code>&lt;parameter&gt;</code>
											</td>
											<td style="text-align: left;">This will be returned if the value set for a parameter is of the incorrect format or
                is out of range.</td>
										</tr>
										<tr>
											<td style="text-align: left;">8</td>
											<td style="text-align: left;">parameter, 
												<code>&lt;parameter&gt;</code>, is not modifiable</td>
											<td style="text-align: left;">This will be returned if an attempt to modify a read only parameter is made.</td>
										</tr>
										<tr>
											<td style="text-align: left;">901</td>
											<td style="text-align: left;">Internal error, 
												<code>&lt;error code&gt;</code>
											</td>
											<td style="text-align: left;">This will be returned if there is an internal error in the processing of the command.
                This indicates an error in the bridge, not in the message being sent.</td>
										</tr>
									</tbody>
								</table>
								<h3 id="command_specific_errors">Command Specific Errors</h3>
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>
												<strong>Description</strong>
											</th>
											<th>
												<strong>Details</strong>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">101</td>
											<td style="text-align: left;">link button not pressed</td>
											<td style="text-align: left;">The link button has not been pressed in the last 30 seconds.</td>
										</tr>
										<tr>
											<td style="text-align: left;">201</td>
											<td style="text-align: left;">parameter, 
												<code>&lt;parameter&gt;</code>, is not modifiable. Device is set to off.</td>
											<td style="text-align: left;">This will be returned if a user attempts to modify a parameter that cannot be
                modified due to the current state of the device. This will most commonly be returned if the
                api/sat/bri/effect/xy/ct parameters are modified while the on parameter is false.</td>
										</tr>
										<tr>
											<td style="text-align: left;">301</td>
											<td style="text-align: left;">group could not be created. Group table is full.</td>
											<td style="text-align: left;">The bridge can store a maximum of 16 groups. This error will be returned when trying
                to add a new group if the limit has been reached.</td>
										</tr>
										<tr>
											<td style="text-align: left;">302</td>
											<td style="text-align: left;">device, 
												<code>&lt;id&gt;</code>, could not be added to group. Device's group table is full.</td>
											<td style="text-align: left;">The lamp can store a maximum of 16 groups. This error will be returned when trying to
                add a new group if the limit has been reached.</td>
										</tr>
									</tbody>
								</table>
							</div>	  

							<div class="span9 api-main-content" data-role="main-content">		  
								<!--Body content-->
								<h1 id="datatypes-anchor">Datatypes</h1>		  
								<p>All data types have a short hand used throughout the API. All uses of the shorthand in the main API documentation
          should link through to the data types page, with an appropriate anchor, and/or display the data type description on
          hover.</p>
								<p>Below is a list of data types used by the API and their short hand used in the API documentation.</p>
								<table>
									<thead>
										<tr>
											<th>Short Hand</th>
											<th>
												<strong>Description</strong>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="text-align: left;">string n..m</td>
											<td style="text-align: left;">A string in UTF8 encoding where n..m specifies the minimum number of characters, n,
                and maximum number, m.
												<br/>
												<br/>If n and m are not specified then only certain values are accepted as specified in the description.</td>
										</tr>
										<tr>
											<td style="text-align: left;">uint8</td>
											<td style="text-align: left;">8 bit, unsigned, non-wrapping integer. i.e. an integer in the range of 0 to 255 where
                integer values outside this range are invalid.</td>
										</tr>
										<tr>
											<td style="text-align: left;">uint16</td>
											<td style="text-align: left;">16 bit, unsigned, non-wrapping integer. i.e. an integer in the range of 0 to 65535
                where integer values outside this range are invalid.</td>
										</tr>
										<tr>
											<td style="text-align: left;">uint16w</td>
											<td style="text-align: left;">16 bit, unsigned, wrapping integer. i.e. an integer in the range of 0 to 65535 where
                integer values outside this range are truncated to 16 bit e.g. 65536 wraps to 0.</td>
										</tr>
										<tr>
											<td style="text-align: left;">list n..m of x</td>
											<td style="text-align: left;">A list of items of type x. Where x is another entry in this table. A list is
                formatted as comma separated values totally enclosed in square brackets e.g. 
												<code>[1,2,3]</code>.
												<br/>n..m specifies the minimum number of entries in list, n, and maximum number, m.</td>
										</tr>
										<tr>
											<td style="text-align: left;">bool</td>
											<td style="text-align: left;">A Boolean value which can take the values 
												<em>true</em> or 
												<em>false</em> only.</td>
										</tr>
										<tr>
											<td style="text-align: left;">object</td>
											<td style="text-align: left;">An object value is a JSON compliant object. This is of the format of zero or more key
                value pairs encapsulated in curly braces {}.</td>
										</tr>
										<tr>
											<td style="text-align: left;">float n</td>
											<td style="text-align: left;">A float object is a numeric value expressed in decimal format with n decimal places
                kept. Further provided decimal data is truncated. E.g 0.9988</td>
										</tr>
									</tbody>
								</table>
							</div>

						</div>
					</div>
					<!-- /container -->
					<footer class="site-footer api-stripes">
						<img class="api-color-line-footer" src="./assets/api-color-line.png"/>
						<p>© 2004-2013 ThumbWhere Pty Ltd</p>
					</footer>
				</div>
				<script type="text/javascript" src="./assets/jquery-1.8.3.min.js"/> 
				<script type="text/javascript" src="./assets/jquery.cookie.js"/> 
				<script type="text/javascript" src="./assets/script.js"/>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
<!-- Stylus Studio meta-information - (c) 2004-2007. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios ><scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="no" url="index.xml" htmlbaseurl="" outputurl="" processortype="internal" useresolver="yes" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator=""/></scenarios><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/><MapperBlockPosition></MapperBlockPosition><TemplateContext></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
-->
